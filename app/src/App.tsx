import { useCallback, useEffect, useMemo, useState } from "react";
import { AKTE } from "./akte/schema";
import {
  leererTeil,
  pruefe,
  standVon,
  type OffenerPunkt,
  type Stand,
  type TeilStand,
} from "./akte/pruefung";
import { akteNachMarkdown } from "./akte/markdown";
import {
  istStand,
  ladeHerunter,
  ladeStand,
  ladeTheme,
  speichereStand,
  speichereTheme,
} from "./akte/speicher";
import { FeldEingabe } from "./components/Felder";
import { Register } from "./components/Register";
import { Pruefpanel } from "./components/Pruefpanel";

type DialogModus = "aus" | "export" | "stand";

export function App() {
  const [stand, setStand] = useState<Stand>(() => ladeStand());
  const [aktiv, setAktiv] = useState(0);
  const [dialog, setDialog] = useState<DialogModus>("aus");

  useEffect(() => {
    const t = ladeTheme();
    if (t) document.documentElement.setAttribute("data-theme", t);
  }, []);

  useEffect(() => {
    speichereStand(stand);
  }, [stand]);

  const teil = AKTE[aktiv]!;
  const teilStand = standVon(stand, teil.nr);
  const befunde = useMemo(() => pruefe(stand), [stand]);

  const aendere = useCallback(
    (nr: string, f: (s: TeilStand) => TeilStand) => {
      setStand((alt) => ({ ...alt, [nr]: f(alt[nr] ?? leererTeil()) }));
    },
    [],
  );

  const springe = useCallback((i: number) => {
    setAktiv(i);
    window.scrollTo({ top: 0 });
  }, []);

  const themeUm = () => {
    const jetzt = document.documentElement.getAttribute("data-theme");
    const next = jetzt === "ink" ? "paper" : jetzt === "paper" ? "" : "ink";
    if (next) document.documentElement.setAttribute("data-theme", next);
    else document.documentElement.removeAttribute("data-theme");
    speichereTheme(next);
  };

  return (
    <div className="min-h-dvh">
      <header className="lk-panel sticky top-0 z-20 flex flex-wrap items-center gap-4 px-5 py-3">
        <div className="mr-auto flex items-baseline gap-3">
          <h1 className="m-0 text-[1.25rem]">Freigabeakte</h1>
          <span className="text-[0.75rem] uppercase tracking-[0.06em] text-lk-muted">
            Assistent · RAG im regulierten Umfeld
          </span>
        </div>
        <button type="button" className="lk-btn" onClick={themeUm}>
          Ansicht
        </button>
        <button type="button" className="lk-btn" onClick={() => setDialog("stand")}>
          Zwischenstand
        </button>
        <button type="button" className="lk-btn lk-btn-primary" onClick={() => setDialog("export")}>
          Akte exportieren
        </button>
      </header>

      <p className="m-0 flex flex-wrap items-baseline gap-2 border-b border-lk-line bg-lk-accent-soft px-5 py-2.5 text-[0.8rem] text-lk-soft">
        <strong className="font-semibold text-lk-ink">
          Diese Anwendung arbeitet ausschließlich lokal.
        </strong>
        <span>
          Ihre Eingaben liegen im Speicher dieses Geräts und werden niemals übertragen — es gibt
          keinen Server und keinen Netzwerkaufruf. <strong className="font-semibold">Kein Rechtsrat.</strong>
        </span>
      </p>

      <div className="grid items-start md:grid-cols-[17rem_minmax(0,1fr)]">
        <div className="border-b border-lk-line bg-lk-surface md:sticky md:top-[6.5rem] md:min-h-[calc(100dvh-6.5rem)] md:border-b-0 md:border-r">
          <Register stand={stand} aktiv={aktiv} onWaehle={springe} />
        </div>

        <main className="max-w-[56rem] px-4 pb-32 pt-6 sm:px-8">
          <div className="mb-6 border-b border-lk-line pb-4">
            <p className="m-0 font-serif text-[0.8rem] tracking-[0.08em] text-lk-accent-strong">
              Teil {teil.nr} von {AKTE.length.toString().padStart(2, "0")}
            </p>
            <h2 className="mb-2.5 mt-0.5 text-pretty text-[1.75rem] leading-tight">{teil.titel}</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[0.8rem] text-lk-muted">
              <span>
                <b className="font-semibold text-lk-ink">Wer füllt aus:</b> {teil.akteur}
              </span>
              <span>
                <b className="font-semibold text-lk-ink">Prozess:</b> {teil.prozess}
              </span>
            </div>
          </div>

          {teil.abschnitte.map((abschnitt) => (
            <section key={abschnitt.titel} className="mb-8">
              <h3 className="mb-3 border-b border-lk-line pb-1.5 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.09em] text-lk-muted">
                {abschnitt.titel}
              </h3>
              {abschnitt.hinweis ? (
                <p className="mb-4 rounded-r-lk-sm border-l-2 border-lk-accent2 bg-lk-surface-2 px-3 py-2.5 text-[0.85rem] text-lk-soft">
                  {abschnitt.hinweis}
                </p>
              ) : null}
              <div className="flex flex-col gap-4">
                {abschnitt.felder.map((feld) => (
                  <FeldEingabe
                    key={feld.k}
                    teilNr={teil.nr}
                    feld={feld}
                    wert={teilStand.v[feld.k]}
                    onChange={(wert) =>
                      aendere(teil.nr, (s) => ({ ...s, v: { ...s.v, [feld.k]: wert } }))
                    }
                  />
                ))}
              </div>
            </section>
          ))}

          <OffenePunkte
            stand={teilStand}
            onChange={(f) => aendere(teil.nr, f)}
          />

          <section className="lk-card mt-4 p-4">
            <h3 className="m-0 mb-2.5 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.09em] text-lk-muted">
              Was die prüfende Funktion hier typischerweise fragt
            </h3>
            <ol className="m-0 flex list-decimal flex-col gap-2 pl-5">
              {teil.fragen.map((q) => (
                <li key={q} className="text-[0.9rem]">
                  {q}
                </li>
              ))}
            </ol>
          </section>
        </main>
      </div>

      <Pruefpanel befunde={befunde} onSpringe={springe} />

      {dialog !== "aus" ? (
        <Dialog
          modus={dialog}
          stand={stand}
          onSchliessen={() => setDialog("aus")}
          onEinlesen={(s) => {
            setStand(s);
            setDialog("aus");
          }}
        />
      ) : null}
    </div>
  );
}

function OffenePunkte({
  stand,
  onChange,
}: {
  readonly stand: TeilStand;
  readonly onChange: (f: (s: TeilStand) => TeilStand) => void;
}) {
  const setOP = (i: number, feld: keyof OffenerPunkt, wert: string) =>
    onChange((s) => ({
      ...s,
      op: s.op.map((o, j) => (j === i ? { ...o, [feld]: wert } : o)),
    }));

  return (
    <section className="lk-card mt-2 border-lk-warn p-4">
      <h3 className="m-0 mb-1 text-[1rem] text-lk-warn">Offene Punkte</h3>
      <p className="m-0 mb-3.5 text-[0.85rem] text-lk-soft">
        Was Sie nicht wissen, gehört hierhin — nicht in eine optimistische Formulierung. Ein
        ehrliches „offen, Termin X“ hat in einer Prüfung noch nie Schaden angerichtet; eine
        geschönte Aussage schon.
      </p>

      {stand.op.map((o, i) => (
        <div key={i} className="mb-2 grid gap-2 sm:grid-cols-[minmax(0,1fr)_10rem_8rem_2rem]">
          <input
            type="text"
            className="lk-input"
            placeholder="Offener Punkt"
            aria-label={`Offener Punkt ${i + 1}`}
            value={o.punkt}
            onChange={(e) => setOP(i, "punkt", e.target.value)}
          />
          <input
            type="text"
            className="lk-input"
            placeholder="Verantwortlich"
            aria-label={`Verantwortlich für offenen Punkt ${i + 1}`}
            value={o.verantwortlich}
            onChange={(e) => setOP(i, "verantwortlich", e.target.value)}
          />
          <input
            type="text"
            className="lk-input"
            placeholder="Frist"
            aria-label={`Frist für offenen Punkt ${i + 1}`}
            value={o.frist}
            onChange={(e) => setOP(i, "frist", e.target.value)}
          />
          <button
            type="button"
            title="Entfernen"
            aria-label={`Offenen Punkt ${i + 1} entfernen`}
            className="rounded-md px-2 py-1 text-lk-muted hover:text-lk-danger"
            onClick={() => onChange((s) => ({ ...s, op: s.op.filter((_, j) => j !== i) }))}
          >
            ×
          </button>
        </div>
      ))}

      <button
        type="button"
        className="lk-btn"
        onClick={() =>
          onChange((s) => ({ ...s, op: [...s.op, { punkt: "", verantwortlich: "", frist: "" }] }))
        }
      >
        + Offenen Punkt ergänzen
      </button>

      <label className="mt-3 flex items-start gap-2.5 text-[0.85rem] text-lk-soft">
        <input
          type="checkbox"
          className="mt-1"
          checked={stand.opKeine}
          onChange={(e) => onChange((s) => ({ ...s, opKeine: e.target.checked }))}
        />
        <span>
          Für dieses Dokument bestehen bewusst keine offenen Punkte. Ich bestätige, dass dies
          geprüft und nicht bloß nicht ausgefüllt wurde.
        </span>
      </label>
    </section>
  );
}

function Dialog({
  modus,
  stand,
  onSchliessen,
  onEinlesen,
}: {
  readonly modus: Exclude<DialogModus, "aus">;
  readonly stand: Stand;
  readonly onSchliessen: () => void;
  readonly onEinlesen: (s: Stand) => void;
}) {
  const istExport = modus === "export";
  const [text, setText] = useState(() =>
    istExport ? akteNachMarkdown(stand) : JSON.stringify(stand, null, 1),
  );
  const [fehler, setFehler] = useState("");

  const einlesen = () => {
    try {
      const geparst: unknown = JSON.parse(text);
      if (!istStand(geparst)) throw new Error("Form");
      onEinlesen(geparst);
    } catch {
      setFehler(
        "Das ließ sich nicht einlesen: Der Text ist kein gültiger Zwischenstand. Fügen Sie den vollständigen, unveränderten Text aus einer früheren Sicherung ein.",
      );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={istExport ? "Akte exportieren" : "Zwischenstand sichern oder einlesen"}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onSchliessen();
      }}
    >
      <div className="lk-card flex max-h-[86dvh] w-full max-w-3xl flex-col shadow-lk-2">
        <div className="border-b border-lk-line px-5 py-3.5">
          <h2 className="m-0 text-[1.2rem]">
            {istExport ? "Akte exportieren" : "Zwischenstand sichern oder einlesen"}
          </h2>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-5 py-4">
          <p className="mb-3 mt-0 text-[0.8rem] text-lk-muted">
            {istExport
              ? "Markdown für alle acht Teile. Übernehmen Sie den Text in Ihr Dokumentensystem und arbeiten Sie ihn dort zu Ende — der Assistent führt durch die Struktur, das Denken bleibt bei Ihnen."
              : "Zum Weiterarbeiten an einem anderen Gerät oder zur Übergabe an eine Kollegin. Zum Einlesen ersetzen Sie den Text und klicken „Einlesen“."}
          </p>
          {fehler ? <p className="mb-3 text-[0.8rem] text-lk-danger">{fehler}</p> : null}
          <textarea
            aria-label={istExport ? "Exportierter Text" : "Zwischenstand als JSON"}
            className="lk-input h-[46dvh] resize-none font-mono text-[0.75rem] leading-relaxed"
            value={text}
            readOnly={istExport}
            onChange={(e) => {
              setText(e.target.value);
              setFehler("");
            }}
          />
        </div>
        <div className="flex flex-wrap justify-end gap-2 border-t border-lk-line px-5 py-3">
          {!istExport ? (
            <button type="button" className="lk-btn" onClick={einlesen}>
              Einlesen
            </button>
          ) : null}
          <button
            type="button"
            className="lk-btn"
            onClick={() =>
              ladeHerunter(istExport ? "freigabeakte.md" : "freigabeakte-stand.json", text)
            }
          >
            Herunterladen
          </button>
          <button type="button" className="lk-btn lk-btn-primary" onClick={onSchliessen}>
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}

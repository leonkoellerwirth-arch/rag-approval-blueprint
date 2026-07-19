import { describe, expect, it } from "vitest";
import { AKTE, felderVon } from "./schema";
import {
  findeWeichmacher,
  fortschritt,
  leererTeil,
  pruefe,
  type Stand,
  type TeilStand,
} from "./pruefung";
import { akteNachMarkdown, teilNachMarkdown } from "./markdown";
import { istStand } from "./speicher";

function teil(werte: Partial<TeilStand>): TeilStand {
  return { ...leererTeil(), ...werte };
}
function stand(teile: Record<string, Partial<TeilStand>>): Stand {
  const s: Stand = {};
  for (const [nr, t] of Object.entries(teile)) s[nr] = teil(t);
  return s;
}
const titel = (s: Stand) => pruefe(s).map((b) => b.titel);

// --- Schema -----------------------------------------------------------------------

describe("Schema", () => {
  it("enthält die acht Teile der Akte in der Reihenfolge der Vorlagen", () => {
    expect(AKTE.map((t) => t.nr)).toEqual(["01", "02", "03", "04", "05", "06", "07", "08"]);
  });

  it("gibt jedem Teil Akteur, Prozess und Prüffragen", () => {
    for (const t of AKTE) {
      expect(t.akteur, t.nr).not.toBe("");
      expect(t.prozess, t.nr).not.toBe("");
      expect(t.fragen.length, t.nr).toBeGreaterThanOrEqual(3);
    }
  });

  it("vergibt Feldschlüssel innerhalb eines Teils eindeutig", () => {
    for (const t of AKTE) {
      const keys = felderVon(t).map((f) => f.k);
      expect(new Set(keys).size, `${t.nr} hat doppelte Schlüssel`).toBe(keys.length);
    }
  });

  it("gibt jedem Tabellenfeld Spalten und jedem Auswahlfeld Optionen", () => {
    for (const t of AKTE) {
      for (const f of felderVon(t)) {
        if (f.typ === "tabelle") expect(f.spalten?.length, `${t.nr}/${f.k}`).toBeGreaterThan(0);
        if (f.typ === "auswahl") expect(f.optionen?.length, `${t.nr}/${f.k}`).toBeGreaterThan(0);
      }
    }
  });
});

// --- Die tragende Eigenschaft: nicht Vollständigkeit messen ------------------------

describe("Ehrlichkeitsprüfung", () => {
  it("meldet für eine leere Akte keinen einzigen Befund", () => {
    // Wer noch nicht angefangen hat, wird nicht ermahnt.
    expect(pruefe({})).toEqual([]);
  });

  it("beanstandet ein begonnenes Dokument ohne offene Punkte", () => {
    const s = stand({ "01": { v: { sys: "NORA" } } });
    expect(titel(s)).toContain("Teil 01 — keine offenen Punkte");
  });

  it("akzeptiert die ausdrückliche Bestätigung, dass keine offenen Punkte bestehen", () => {
    const s = stand({ "01": { v: { sys: "NORA" }, opKeine: true } });
    expect(titel(s)).not.toContain("Teil 01 — keine offenen Punkte");
  });

  it("verlangt zu jedem offenen Punkt Verantwortlichen und Frist", () => {
    const s = stand({
      "01": { v: { sys: "NORA" }, op: [{ punkt: "A3 offen", verantwortlich: "", frist: "" }] },
    });
    expect(titel(s)).toContain("Teil 01 — offener Punkt ohne Verantwortlichen oder Frist");
  });

  it("lässt einen vollständig geführten offenen Punkt unbeanstandet", () => {
    const s = stand({
      "01": {
        v: { sys: "NORA" },
        op: [{ punkt: "A3 offen", verantwortlich: "T. Brand", frist: "30.09.2026" }],
      },
    });
    expect(titel(s)).toEqual([]);
  });
});

describe("Weichmacher im Restrisiko", () => {
  it("findet die Formulierungen, die eine Aussage schwächen", () => {
    expect(findeWeichmacher("Das Risiko dürfte grundsätzlich beherrschbar sein")).toEqual([
      "grundsätzlich",
      "dürfte",
    ]);
  });

  it("greift unabhängig von der Groß- und Kleinschreibung", () => {
    expect(findeWeichmacher("IM WESENTLICHEN abgedeckt")).toEqual(["im wesentlichen"]);
  });

  it("lässt ein klar formuliertes Restrisiko in Ruhe", () => {
    expect(findeWeichmacher("Es bleibt möglich, dass das System falsch antwortet.")).toEqual([]);
  });

  it("meldet Weichmacher im Restrisiko als kritisch", () => {
    const s = stand({
      "07": { v: { rest: "Das Restrisiko ist im Wesentlichen gering.", traeger: "COO" }, opKeine: true },
    });
    const b = pruefe(s).find((x) => x.titel === "Restrisiko enthält Weichmacher");
    expect(b?.gewicht).toBe("kritisch");
    expect(b?.text).toContain("im wesentlichen");
  });
});

describe("Regeln aus den Vorlagen", () => {
  it("beanstandet ein Restrisiko ohne benannten Träger", () => {
    const s = stand({ "07": { v: { rest: "Es bleibt ein Risiko." }, opKeine: true } });
    expect(titel(s)).toContain("Restrisiko ohne benannten Träger");
  });

  it("beanstandet Auflagen ohne Folge bei Nichterfüllung", () => {
    const s = stand({
      "07": { v: { aufl: [["A1 Kompaktierung", "30.09.2026", "T. Brand", "2nd Line"]] }, opKeine: true },
    });
    expect(titel(s)).toContain("Auflagen ohne Folge bei Nichterfüllung");
  });

  it("beanstandet eine einzelne Auflage ohne Frist", () => {
    const s = stand({
      "07": {
        v: { aufl: [["A1 Kompaktierung", "", "T. Brand", ""]], auflfolge: "Aufnahmestopp." },
        opKeine: true,
      },
    });
    expect(titel(s)).toContain("Auflage ohne Frist");
  });

  it("beanstandet eine Berechtigungsprüfung nur zur Indexierungszeit als kritisch", () => {
    const s = stand({ "04": { v: { bzeit: "nur zur Indexierungszeit" }, opKeine: true } });
    const b = pruefe(s).find((x) => x.titel === "Berechtigungsprüfung nur zur Indexierungszeit");
    expect(b?.gewicht).toBe("kritisch");
  });

  it("akzeptiert die Prüfung zur Query-Zeit", () => {
    const s = stand({
      "04": { v: { bzeit: "zur Query-Zeit gegen die aktuelle Berechtigung" }, opKeine: true },
    });
    expect(titel(s)).not.toContain("Berechtigungsprüfung nur zur Indexierungszeit");
  });

  it("beanstandet „unmittelbar“ als zugesagte Wirkzeit", () => {
    const s = stand({ "04": { v: { bentzug: "unmittelbar" }, opKeine: true } });
    expect(titel(s)).toContain("Wirkzeit nicht prüfbar formuliert");
  });

  it("beanstandet einen Kill-Switch ohne Erprobung in Produktion", () => {
    const s = stand({ "05": { v: { ks: "Feature-Flag nora.enabled" }, opKeine: true } });
    const b = pruefe(s).find((x) => x.titel === "Kill-Switch ohne Erprobung in Produktion");
    expect(b?.gewicht).toBe("kritisch");
  });

  it("beanstandet eine Einstufung ohne dokumentierte Begründung", () => {
    const s = stand({ "03": { v: { kwf: "nein" }, opKeine: true } });
    expect(titel(s)).toContain("Einstufung ohne dokumentierte Begründung");
  });

  it("beanstandet Integrität „normal“ als Hinweis, nicht als Fehler", () => {
    const s = stand({ "01": { v: { gi: "normal" }, opKeine: true } });
    const b = pruefe(s).find((x) => x.titel.startsWith("Integrität"));
    expect(b?.gewicht).toBe("hinweis");
  });

  it("sortiert kritische Befunde vor Hinweise", () => {
    const s = stand({
      "04": { v: { bzeit: "nur zur Indexierungszeit", bentzug: "unmittelbar" }, opKeine: true },
    });
    expect(pruefe(s)[0]?.gewicht).toBe("kritisch");
  });

  it("verweist jeden Befund auf einen gültigen Teil der Akte", () => {
    const s = stand({
      "01": { v: { gi: "normal" } },
      "03": { v: { kwf: "ja" } },
      "04": { v: { bzeit: "nur zur Indexierungszeit" } },
      "05": { v: { ks: "Flag" } },
      "07": { v: { rest: "dürfte reichen", worum: "Assistent" } },
    });
    const befunde = pruefe(s);
    expect(befunde.length).toBeGreaterThan(5);
    for (const b of befunde) {
      expect(AKTE[b.teil], b.titel).toBeDefined();
    }
  });
});

// --- Fortschritt ------------------------------------------------------------------

describe("Fortschritt", () => {
  it("zählt gefüllte Felder, Tabellen nur mit echtem Inhalt", () => {
    const t = AKTE[0]!;
    const leer = fortschritt(t, teil({ v: { dk: [["", "", "", "", ""]] } }));
    expect(leer.gefuellt).toBe(0);
    const eins = fortschritt(t, teil({ v: { dk: [["D1", "", "", "", ""]] } }));
    expect(eins.gefuellt).toBe(1);
    expect(eins.gesamt).toBe(felderVon(t).length);
  });
});

// --- Export -----------------------------------------------------------------------

describe("Markdown-Export", () => {
  it("erzeugt für jeden Teil Kopf, Disclaimer, Prüffragen und offene Punkte", () => {
    const md = teilNachMarkdown(AKTE[0]!, teil({ v: { sys: "NORA" } }));
    expect(md).toContain("# 01 — Schutzbedarfsfeststellung");
    expect(md).toContain("Kein Rechtsrat.");
    expect(md).toContain("## Was die prüfende Funktion hier typischerweise fragt");
    expect(md).toContain("## Offene Punkte");
    expect(md).toContain("NORA");
  });

  it("markiert nicht ausgefüllte Felder als solche, statt sie zu verschweigen", () => {
    const md = teilNachMarkdown(AKTE[0]!, leererTeil());
    expect(md).toContain("_(noch nicht ausgefüllt)_");
  });

  it("weist eine fehlende Angabe zu offenen Punkten als erklärungsbedürftig aus", () => {
    const md = teilNachMarkdown(AKTE[0]!, leererTeil());
    expect(md).toContain("erklärungsbedürftig");
  });

  it("übernimmt die ausdrückliche Bestätigung „keine offenen Punkte“", () => {
    const md = teilNachMarkdown(AKTE[0]!, teil({ opKeine: true }));
    expect(md).toContain("bestehen nach Prüfung keine offenen Punkte");
  });

  it("rendert Tabellen mit Kopfzeile und maskiert Pipe-Zeichen", () => {
    const md = teilNachMarkdown(
      AKTE[0]!,
      teil({ v: { dk: [["D1 | intern", "Anweisungen", "Q1", "nein", "nein"]] } }),
    );
    expect(md).toContain("| Klasse | Beispielinhalte | Quelle | Personenbezug |");
    expect(md).toContain("D1 \\| intern");
  });

  it("enthält im Gesamtexport alle acht Teile und ein Inhaltsverzeichnis", () => {
    const md = akteNachMarkdown({});
    for (const t of AKTE) expect(md).toContain(`# ${t.nr} — ${t.titel}`);
    expect(md).toContain("## Inhalt");
  });
});

// --- Einlesen einer Sicherung ------------------------------------------------------

describe("Sicherung einlesen", () => {
  it("nimmt einen gültigen Stand an", () => {
    expect(istStand({ "01": { v: { sys: "NORA" }, op: [], opKeine: false } })).toBe(true);
    expect(istStand({})).toBe(true);
  });

  it("lehnt ab, was die laufende Arbeit beschädigen würde", () => {
    expect(istStand(null)).toBe(false);
    expect(istStand([])).toBe(false);
    expect(istStand("text")).toBe(false);
    expect(istStand({ "01": { v: "kaputt", op: [] } })).toBe(false);
    expect(istStand({ "01": { v: {}, op: "keine Liste" } })).toBe(false);
  });
});

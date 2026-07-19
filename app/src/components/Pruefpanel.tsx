import { useId, useState } from "react";
import type { Befund } from "@/akte/pruefung";

interface Props {
  readonly befunde: readonly Befund[];
  readonly onSpringe: (teil: number) => void;
}

/**
 * Die Ehrlichkeitsprüfung — bewusst keine Fortschrittsanzeige.
 *
 * Ein Werkzeug, das „72 % vollständig" meldet, optimiert auf gefüllte Felder. Dieses
 * Panel meldet stattdessen, was in der Prüfung tatsächlich Ärger macht.
 */
export function Pruefpanel({ befunde, onSpringe }: Props) {
  const [offen, setOffen] = useState(false);
  const bodyId = useId();

  const kritisch = befunde.filter((b) => b.gewicht === "kritisch").length;
  const hinweise = befunde.length - kritisch;

  const pillFarbe =
    kritisch > 0
      ? "text-lk-danger shadow-[inset_0_0_0_1px_var(--danger)] bg-lk-accent-soft"
      : hinweise > 0
        ? "text-lk-warn shadow-[inset_0_0_0_1px_var(--warn)] bg-lk-accent-soft"
        : "text-lk-accent2-strong shadow-[inset_0_0_0_1px_var(--accent2)] bg-lk-accent2-soft";

  const pillText =
    befunde.length === 0
      ? "keine Befunde"
      : [
          kritisch > 0 ? `${kritisch} kritisch` : "",
          hinweise > 0 ? `${hinweise} Hinweis${hinweise > 1 ? "e" : ""}` : "",
        ]
          .filter(Boolean)
          .join(" · ");

  return (
    <aside className="lk-panel fixed inset-x-0 bottom-0 z-30 shadow-lk-2">
      <button
        type="button"
        aria-expanded={offen}
        aria-controls={bodyId}
        onClick={() => setOffen((o) => !o)}
        className="flex w-full flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-2.5 text-left"
      >
        <h2 className="m-0 text-[0.95rem] font-medium">Ehrlichkeitsprüfung</h2>
        <span className={`rounded-full px-2.5 py-0.5 text-[0.75rem] font-semibold tabular-nums ${pillFarbe}`}>
          {pillText}
        </span>
        <span className="text-[0.8rem] text-lk-muted">
          Prüft nicht, ob alles ausgefüllt ist, sondern ob es der Prüfung standhält.
        </span>
        <span className="ml-auto text-[0.8rem] text-lk-muted">
          {offen ? "ausblenden" : "einblenden"}
        </span>
      </button>

      {offen ? (
        <div
          id={bodyId}
          className="max-h-[44vh] overflow-y-auto border-t border-lk-line px-5 pb-5 pt-3.5"
        >
          {befunde.length === 0 ? (
            <p className="m-0 text-[0.875rem] text-lk-soft">
              Keine Befunde. Das heißt nicht, dass die Akte vollständig ist — es heißt, dass die
              Stellen, an denen Vorlagen erfahrungsgemäß scheitern, hier nicht auffällig sind.
            </p>
          ) : (
            <ul className="m-0 list-none p-0">
              {befunde.map((b, i) => (
                <li
                  key={`${b.titel}-${i}`}
                  className="grid grid-cols-[auto_minmax(0,1fr)] gap-2.5 border-b border-lk-line py-2 text-[0.875rem] last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className={`w-[3px] rounded-sm ${b.gewicht === "kritisch" ? "bg-lk-danger" : "bg-lk-warn"}`}
                  />
                  <div>
                    <b className="block text-[0.7rem] font-semibold uppercase tracking-wider text-lk-muted">
                      {b.gewicht === "kritisch" ? "Kritisch — " : "Hinweis — "}
                      {b.titel}
                    </b>
                    <p className="m-0 mt-0.5">{b.text}</p>
                    <button
                      type="button"
                      onClick={() => onSpringe(b.teil)}
                      className="mt-1 bg-transparent p-0 text-lk-accent-strong underline underline-offset-2"
                    >
                      → dorthin
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </aside>
  );
}

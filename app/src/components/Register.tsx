import { AKTE } from "@/akte/schema";
import { fortschritt, standVon, type Stand } from "@/akte/pruefung";

interface Props {
  readonly stand: Stand;
  readonly aktiv: number;
  readonly onWaehle: (i: number) => void;
}

/** Das Register der Akte. Die Nummerierung 01–08 ist die echte Prozessreihenfolge. */
export function Register({ stand, aktiv, onWaehle }: Props) {
  return (
    <nav aria-label="Register der Freigabeakte" className="py-4">
      <div className="px-5 pb-2.5 text-[0.7rem] uppercase tracking-[0.1em] text-lk-muted">
        Register
      </div>
      <ul className="list-none m-0 p-0">
        {AKTE.map((teil, i) => {
          const { gefuellt, gesamt } = fortschritt(teil, standVon(stand, teil.nr));
          const status = gefuellt === 0 ? "leer" : gefuellt >= gesamt ? "voll" : "teil";
          const aktuell = i === aktiv;
          return (
            <li key={teil.nr}>
              <button
                type="button"
                aria-current={aktuell ? "true" : undefined}
                onClick={() => onWaehle(i)}
                className={[
                  "grid w-full grid-cols-[1.9rem_1fr_auto] items-baseline gap-2.5 border-l-[3px] px-4 py-2.5 text-left transition-colors",
                  aktuell
                    ? "border-l-lk-accent bg-lk-accent-soft"
                    : "border-l-transparent hover:bg-lk-accent-soft",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-serif text-[0.95rem] tabular-nums",
                    aktuell ? "text-lk-accent-strong" : "text-lk-muted",
                  ].join(" ")}
                >
                  {teil.nr}
                </span>
                <span className="text-[0.875rem] leading-snug">{teil.titel}</span>
                <span
                  aria-label={
                    status === "voll"
                      ? "vollständig ausgefüllt"
                      : status === "teil"
                        ? "teilweise ausgefüllt"
                        : "noch nicht begonnen"
                  }
                  className={[
                    "size-2 self-center rounded-full",
                    status === "voll"
                      ? "bg-lk-ok"
                      : status === "teil"
                        ? "bg-lk-warn"
                        : "bg-lk-line-2",
                  ].join(" ")}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

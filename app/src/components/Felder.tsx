import type { Feld } from "@/akte/schema";

interface Props {
  readonly teilNr: string;
  readonly feld: Feld;
  readonly wert: string | string[][] | undefined;
  readonly onChange: (wert: string | string[][]) => void;
}

const LABEL = "block text-[0.85rem] font-semibold mb-1";
const HILFE = "block text-[0.8rem] text-lk-muted font-normal mb-1.5";

export function FeldEingabe({ teilNr, feld, wert, onChange }: Props) {
  const id = `f-${teilNr}-${feld.k}`;
  const text = typeof wert === "string" ? wert : "";

  return (
    <div>
      <label className={LABEL} htmlFor={id}>
        {feld.label}
      </label>
      {feld.hilfe && feld.typ !== "tabelle" ? <span className={HILFE}>{feld.hilfe}</span> : null}

      {feld.typ === "text" ? (
        <input
          id={id}
          type="text"
          className="lk-input"
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : null}

      {feld.typ === "mehrzeilig" ? (
        <textarea
          id={id}
          className="lk-input min-h-20 leading-relaxed resize-y"
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : null}

      {feld.typ === "auswahl" ? (
        <select id={id} className="lk-input" value={text} onChange={(e) => onChange(e.target.value)}>
          <option value="">— bitte wählen —</option>
          {(feld.optionen ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : null}

      {feld.typ === "tabelle" ? (
        <Tabelle
          spalten={feld.spalten ?? []}
          zeilen={Array.isArray(wert) ? wert : []}
          onChange={onChange}
        />
      ) : null}
    </div>
  );
}

function Tabelle({
  spalten,
  zeilen,
  onChange,
}: {
  readonly spalten: readonly string[];
  readonly zeilen: string[][];
  readonly onChange: (z: string[][]) => void;
}) {
  const rows = zeilen.length > 0 ? zeilen : [spalten.map(() => "")];

  const setZelle = (ri: number, ci: number, v: string) => {
    const kopie = rows.map((z) => [...z]);
    const zeile = kopie[ri];
    if (zeile) zeile[ci] = v;
    onChange(kopie);
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-lk-md border border-lk-line bg-lk-surface">
        <table className="w-full min-w-[34rem] border-collapse text-[0.875rem]">
          <thead>
            <tr>
              {spalten.map((s) => (
                <th
                  key={s}
                  scope="col"
                  className="whitespace-nowrap border-b border-lk-line bg-lk-surface-2 px-2.5 py-2 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-lk-muted"
                >
                  {s}
                </th>
              ))}
              <th className="border-b border-lk-line bg-lk-surface-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((zeile, ri) => (
              // Zeilen haben keine stabile Identität; der Index ist hier die Identität.
              <tr key={ri}>
                {spalten.map((s, ci) => (
                  <td key={s} className="border-b border-lk-line p-1 align-top last:border-b-0">
                    <input
                      type="text"
                      aria-label={`${s}, Zeile ${ri + 1}`}
                      className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-1.5 focus:border-lk-brass focus:bg-lk-surface"
                      value={zeile[ci] ?? ""}
                      onChange={(e) => setZelle(ri, ci, e.target.value)}
                    />
                  </td>
                ))}
                <td className="border-b border-lk-line p-1 align-top">
                  <button
                    type="button"
                    title="Zeile entfernen"
                    aria-label={`Zeile ${ri + 1} entfernen`}
                    className="rounded-md px-2 py-1 text-lk-muted hover:text-lk-danger"
                    onClick={() => {
                      const rest = rows.filter((_, i) => i !== ri);
                      onChange(rest.length > 0 ? rest : [spalten.map(() => "")]);
                    }}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="lk-btn mt-2"
        onClick={() => onChange([...rows, spalten.map(() => "")])}
      >
        + Zeile
      </button>
    </div>
  );
}

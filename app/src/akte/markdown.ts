/**
 * Export nach Markdown — in der Struktur der Vorlagen aus `akte/`, damit das Ergebnis
 * dort weiterbearbeitet werden kann.
 *
 * Der Export ist eine belastbare Rohfassung entlang der richtigen Struktur, kein
 * fertiges Dokument: Die Aggregationssitzung, das ehrliche Restrisiko und der
 * dokumentierte Konflikt entstehen in Sitzungen, nicht in Eingabefeldern.
 */

import { AKTE, type Teil } from "./schema";
import { standVon, type Stand, type TeilStand } from "./pruefung";

const KOPF = [
  "> **Kein Rechtsrat.** Erstellt mit dem Freigabeakte-Assistenten des Projekts",
  "> `rag-approval-blueprint`. Arbeitsmittel aus generischer Aufsichts- und Governance-Logik,",
  "> keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung regulatorischer",
  "> Anforderungen.",
];

const OFFEN = "_(noch nicht ausgefüllt)_";

function zelle(s: string | undefined): string {
  return (s ?? "").replace(/\|/g, "\\|").trim();
}

function tabelle(spalten: readonly string[], zeilen: string[][]): string[] {
  const echte = zeilen.filter((z) => z.some((c) => c.trim() !== ""));
  if (echte.length === 0) return [OFFEN, ""];
  return [
    `| ${spalten.join(" | ")} |`,
    `|${spalten.map(() => "---").join("|")}|`,
    ...echte.map((z) => `| ${spalten.map((_, i) => zelle(z[i])).join(" | ")} |`),
    "",
  ];
}

export function teilNachMarkdown(teil: Teil, s: TeilStand): string {
  const L: string[] = [];
  L.push(`# ${teil.nr} — ${teil.titel}`, "");
  L.push(`> **Wer benutzt dieses Dokument?** ${teil.akteur}  `);
  L.push(`> **In welchem Prozess?** ${teil.prozess}`, "");
  L.push(...KOPF, "", "---", "");

  for (const abschnitt of teil.abschnitte) {
    L.push(`## ${abschnitt.titel}`, "");
    for (const f of abschnitt.felder) {
      const w = s.v[f.k];
      if (f.typ === "tabelle") {
        L.push(`**${f.label}**`, "");
        L.push(...tabelle(f.spalten ?? [], Array.isArray(w) ? w : []));
      } else {
        const wert = typeof w === "string" ? w.trim() : "";
        L.push(`**${f.label}**`, "", wert === "" ? OFFEN : wert, "");
      }
    }
  }

  L.push("---", "", "## Was die prüfende Funktion hier typischerweise fragt", "");
  teil.fragen.forEach((q, i) => L.push(`${i + 1}. ${q}`));

  L.push("", "## Offene Punkte", "");
  const echte = s.op.filter((o) => o.punkt.trim() !== "");
  if (echte.length > 0) {
    L.push("| Offener Punkt | Verantwortlich | Frist |", "|---|---|---|");
    for (const o of echte) {
      L.push(`| ${zelle(o.punkt)} | ${zelle(o.verantwortlich) || "—"} | ${zelle(o.frist) || "—"} |`);
    }
  } else if (s.opKeine) {
    L.push("Für dieses Dokument bestehen nach Prüfung keine offenen Punkte.");
  } else {
    L.push(
      "_(nicht ausgefüllt — ein Dokument ohne offene Punkte ist in der Prüfung erklärungsbedürftig)_",
    );
  }
  L.push("");
  return L.join("\n");
}

export function akteNachMarkdown(stand: Stand): string {
  const L: string[] = [
    "# Freigabeakte",
    "",
    "Erstellt mit dem Freigabeakte-Assistenten des Projekts `rag-approval-blueprint`.",
    "**Kein Rechtsrat.** Prüfen Sie jede Fundstelle und jede Formulierung vor Verwendung.",
    "",
    "## Inhalt",
    "",
  ];
  for (const t of AKTE) L.push(`- ${t.nr} — ${t.titel}`);
  L.push("");
  for (const t of AKTE) {
    L.push("", "<!-- ============================= -->", "", teilNachMarkdown(t, standVon(stand, t.nr)));
  }
  return L.join("\n");
}

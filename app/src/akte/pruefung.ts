/**
 * Die Ehrlichkeitsprüfung.
 *
 * Sie misst NICHT, ob alles ausgefüllt ist. Ein Werkzeug, das „72 % vollständig"
 * meldet, optimiert auf gefüllte Felder — und eine Akte, die nach Werkzeug aussieht,
 * ist in der Prüfung schlechter als keine.
 *
 * Sie prüft stattdessen die Stellen, an denen Vorlagen erfahrungsgemäß scheitern.
 * Jede Regel hier hat ihre Entsprechung in einer „Was die prüfende Funktion fragt"-Zeile
 * der Vorlagen in `akte/`.
 */

import { AKTE, felderVon, type Teil } from "./schema";

export type Gewicht = "kritisch" | "hinweis";

export interface Befund {
  readonly gewicht: Gewicht;
  /** Index des Teils in AKTE — für den Sprung dorthin. */
  readonly teil: number;
  readonly titel: string;
  readonly text: string;
}

export interface OffenerPunkt {
  punkt: string;
  verantwortlich: string;
  frist: string;
}

export interface TeilStand {
  /** Feldwerte: string für Text/Auswahl, string[][] für Tabellen. */
  v: Record<string, string | string[][] | undefined>;
  op: OffenerPunkt[];
  /** „Bewusst keine offenen Punkte" — ausdrücklich bestätigt. */
  opKeine: boolean;
}

export type Stand = Record<string, TeilStand>;

/**
 * Formulierungen, die eine Aussage weich machen. Keine Fehler — Hinweise. In manchen
 * Zusammenhängen tragen sie; im Restrisiko einer Gremienvorlage regelmäßig nicht.
 */
export const WEICHMACHER: readonly string[] = [
  "grundsätzlich",
  "im wesentlichen",
  "weitgehend",
  "weitestgehend",
  "tendenziell",
  "dürfte",
  "gegebenenfalls",
  "unter umständen",
  "in der regel",
  "voraussichtlich",
  "eventuell",
  "nach derzeitigem stand",
  "im großen und ganzen",
];

export function leererTeil(): TeilStand {
  return { v: {}, op: [], opKeine: false };
}

export function standVon(stand: Stand, nr: string): TeilStand {
  return stand[nr] ?? leererTeil();
}

function alsText(w: string | string[][] | undefined): string {
  return typeof w === "string" ? w.trim() : "";
}

function tabelleGefuellt(w: string | string[][] | undefined): boolean {
  return Array.isArray(w) && w.some((zeile) => zeile.some((z) => z.trim() !== ""));
}

/** Wie viele Felder eines Teils sind gefüllt? Nur für die Registeranzeige, nicht als Urteil. */
export function fortschritt(teil: Teil, s: TeilStand): { gefuellt: number; gesamt: number } {
  const felder = felderVon(teil);
  let gefuellt = 0;
  for (const f of felder) {
    const w = s.v[f.k];
    if (f.typ === "tabelle" ? tabelleGefuellt(w) : alsText(w) !== "") gefuellt += 1;
  }
  return { gefuellt, gesamt: felder.length };
}

export function begonnen(teil: Teil, s: TeilStand): boolean {
  return fortschritt(teil, s).gefuellt > 0;
}

export function findeWeichmacher(text: string): string[] {
  const klein = text.toLowerCase();
  return WEICHMACHER.filter((w) => klein.includes(w));
}

/** Alle Befunde über die gesamte Akte, kritische zuerst. */
export function pruefe(stand: Stand): Befund[] {
  const b: Befund[] = [];
  const idx = (nr: string) => AKTE.findIndex((t) => t.nr === nr);

  // --- Regeln, die für jeden begonnenen Teil gelten -----------------------------
  AKTE.forEach((teil, i) => {
    const s = standVon(stand, teil.nr);
    if (!begonnen(teil, s)) return;

    const echteOP = s.op.filter((o) => o.punkt.trim() !== "");
    if (echteOP.length === 0 && !s.opKeine) {
      b.push({
        gewicht: "hinweis",
        teil: i,
        titel: `Teil ${teil.nr} — keine offenen Punkte`,
        text: "Ein Dokument ohne offene Punkte ist in der Prüfung erklärungsbedürftig, nicht vorbildlich. Tragen Sie ein, was noch offen ist — oder bestätigen Sie ausdrücklich, dass es geprüft und nicht bloß nicht ausgefüllt wurde.",
      });
    }
    for (const o of echteOP) {
      if (o.verantwortlich.trim() === "" || o.frist.trim() === "") {
        b.push({
          gewicht: "hinweis",
          teil: i,
          titel: `Teil ${teil.nr} — offener Punkt ohne Verantwortlichen oder Frist`,
          text: `„${o.punkt.slice(0, 90)}“ — ein offener Punkt ohne benannte Person und Termin wird als nicht nachverfolgt bewertet.`,
        });
      }
    }
  });

  // --- Teil 01: der bequem eingestufte Grundwert --------------------------------
  const s1 = standVon(stand, "01");
  if (alsText(s1.v.gi) === "normal") {
    b.push({
      gewicht: "hinweis",
      teil: idx("01"),
      titel: "Integrität als „normal“ eingestuft",
      text: "Bei RAG ist Integrität der regelmäßig unterschätzte Grundwert: Eine falsche Antwort ist kein Anzeigefehler, sondern eine Handlungsgrundlage. Prüfen Sie, ob eine Falschauskunft regulatorisch relevantes Fehlverhalten auslösen kann.",
    });
  }

  // --- Teil 03: Einstufung und Exit ---------------------------------------------
  const s3 = standVon(stand, "03");
  if (alsText(s3.v.kwf) !== "" && alsText(s3.v.kwfb) === "") {
    b.push({
      gewicht: "kritisch",
      teil: idx("03"),
      titel: "Einstufung ohne dokumentierte Begründung",
      text: "Beide Antworten zur kritischen oder wichtigen Funktion sind vertretbar — eine Einstufung ohne Begründung ist es nicht.",
    });
  }
  if (alsText(s3.v.exitt).toLowerCase().startsWith("nein")) {
    b.push({
      gewicht: "hinweis",
      teil: idx("03"),
      titel: "Exit-Strategie nicht erprobt",
      text: "Ein Exit, der nur als Absicht beschrieben ist, wird als nicht vorhanden bewertet. Ein kleiner dokumentierter Nachweis schlägt eine große Behauptung.",
    });
  }

  // --- Teil 04: die Berechtigungsfrage ------------------------------------------
  const s4 = standVon(stand, "04");
  if (alsText(s4.v.bzeit) === "nur zur Indexierungszeit") {
    b.push({
      gewicht: "kritisch",
      teil: idx("04"),
      titel: "Berechtigungsprüfung nur zur Indexierungszeit",
      text: "Belastbar ist allein die Prüfung zur Query-Zeit gegen die aktuelle Berechtigung. Eine nur zur Indexierungszeit gesetzte Sichtbarkeit friert einen Stand ein, der sich täglich ändert — der häufigste Befund überhaupt.",
    });
  }
  if (alsText(s4.v.bentzug).toLowerCase().includes("unmittelbar")) {
    b.push({
      gewicht: "hinweis",
      teil: idx("04"),
      titel: "Wirkzeit nicht prüfbar formuliert",
      text: "„unmittelbar“ ist keine prüfbare Aussage. Nennen Sie einen Wert, den ein Test messen kann.",
    });
  }

  // --- Teil 05: der nie ausgelöste Kill-Switch ----------------------------------
  const s5 = standVon(stand, "05");
  if (alsText(s5.v.ks) !== "" && alsText(s5.v.kstest) === "") {
    b.push({
      gewicht: "kritisch",
      teil: idx("05"),
      titel: "Kill-Switch ohne Erprobung in Produktion",
      text: "Ein nie ausgelöster Kill-Switch ist eine Behauptung. Verlangt wird ein Protokoll mit Datum, auslösender Person und gemessener Wirkzeit.",
    });
  }

  // --- Teil 07: die Stellen, an denen Gremienvorlagen scheitern ------------------
  const s7 = standVon(stand, "07");
  const t7 = idx("07");
  const rest = alsText(s7.v.rest);
  if (rest !== "") {
    const treffer = findeWeichmacher(rest);
    if (treffer.length > 0) {
      b.push({
        gewicht: "kritisch",
        teil: t7,
        titel: "Restrisiko enthält Weichmacher",
        text: `Gefunden: ${treffer.join(", ")}. Ein Gremium, das ein weichgespültes Restrisiko genehmigt, hat nichts genehmigt — prüfen Sie, ob diese Formulierungen hier tragen.`,
      });
    }
    if (alsText(s7.v.traeger) === "") {
      b.push({
        gewicht: "kritisch",
        teil: t7,
        titel: "Restrisiko ohne benannten Träger",
        text: "Ein Restrisiko ohne namentlich benannten Träger ist nicht getragen, sondern verteilt. Die Revision prüft, ob die Person davon weiß.",
      });
    }
  }
  const auflagen = s7.v.aufl;
  if (tabelleGefuellt(auflagen)) {
    if (alsText(s7.v.auflfolge) === "") {
      b.push({
        gewicht: "kritisch",
        teil: t7,
        titel: "Auflagen ohne Folge bei Nichterfüllung",
        text: "Eine Auflage ohne benannte Folge ist eine Bitte. Halten Sie fest, was geschieht, wenn die Frist verstreicht.",
      });
    }
    for (const zeile of auflagen as string[][]) {
      if ((zeile[0] ?? "").trim() !== "" && (zeile[1] ?? "").trim() === "") {
        b.push({
          gewicht: "hinweis",
          teil: t7,
          titel: "Auflage ohne Frist",
          text: `„${(zeile[0] ?? "").slice(0, 90)}“`,
        });
      }
    }
  }
  if (alsText(s7.v.worum) !== "" && alsText(s7.v.nutzen) === "") {
    b.push({
      gewicht: "hinweis",
      teil: t7,
      titel: "Nutzenaussage nicht belegt",
      text: "„Auf welcher Grundlage beruht die Nutzenaussage?“ ist eine Standardfrage. Gemessen schlägt angenommen.",
    });
  }
  if (begonnen(AKTE[t7] as Teil, s7) && alsText(s7.v.abw) === "") {
    b.push({
      gewicht: "hinweis",
      teil: t7,
      titel: "Keine abweichenden Auffassungen vermerkt",
      text: "Falls es keine gab: in Ordnung. Falls es welche gab und sie nicht in der Vorlage stehen, entzieht das der nächsten Vorlage das Vertrauen, sobald es über die Revision auftaucht.",
    });
  }

  return [...b.filter((x) => x.gewicht === "kritisch"), ...b.filter((x) => x.gewicht === "hinweis")];
}

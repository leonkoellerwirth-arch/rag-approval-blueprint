/**
 * Speicherung — ausschließlich lokal.
 *
 * Das Werkzeug verarbeitet genau die vertraulichen Inhalte, vor denen dieses
 * Repository warnt. Es gibt deshalb keinen Server, keinen Netzwerkaufruf und keine
 * Telemetrie: Der Stand liegt im lokalen Speicher dieses Browsers, die Übergabe an
 * eine Kollegin läuft über eine Datei, die die Nutzerin selbst in der Hand hat.
 */

import type { Stand } from "./pruefung";

export const SCHLUESSEL = "rag-freigabeakte-v1";
export const THEME_SCHLUESSEL = `${SCHLUESSEL}-theme`;

export function ladeStand(): Stand {
  try {
    const roh = localStorage.getItem(SCHLUESSEL);
    if (!roh) return {};
    const geparst: unknown = JSON.parse(roh);
    return istStand(geparst) ? geparst : {};
  } catch {
    return {};
  }
}

export function speichereStand(stand: Stand): void {
  try {
    localStorage.setItem(SCHLUESSEL, JSON.stringify(stand));
  } catch {
    // Privates Fenster oder voller Speicher: Die Bearbeitung läuft weiter,
    // nur eben ohne Sicherung. Der Hinweis dazu steht in der Oberfläche.
  }
}

/**
 * Prüft eine eingelesene Sicherung, bevor sie den Bearbeitungsstand ersetzt.
 * Bewusst nachsichtig in der Tiefe und streng in der Form: Was strukturell nicht
 * passt, wird abgelehnt — statt die laufende Arbeit mit Unsinn zu überschreiben.
 */
export function istStand(wert: unknown): wert is Stand {
  if (typeof wert !== "object" || wert === null || Array.isArray(wert)) return false;
  return Object.values(wert as Record<string, unknown>).every((teil) => {
    if (typeof teil !== "object" || teil === null || Array.isArray(teil)) return false;
    const t = teil as Record<string, unknown>;
    const vOk = typeof t.v === "object" && t.v !== null && !Array.isArray(t.v);
    const opOk = Array.isArray(t.op);
    const keineOk = typeof t.opKeine === "boolean" || t.opKeine === undefined;
    return vOk && opOk && keineOk;
  });
}

export function ladeTheme(): string | null {
  try {
    return localStorage.getItem(THEME_SCHLUESSEL);
  } catch {
    return null;
  }
}

export function speichereTheme(theme: string): void {
  try {
    if (theme) localStorage.setItem(THEME_SCHLUESSEL, theme);
    else localStorage.removeItem(THEME_SCHLUESSEL);
  } catch {
    // siehe oben
  }
}

/** Lädt Text als Datei herunter — ohne Umweg über einen Server. */
export function ladeHerunter(dateiname: string, text: string): void {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = dateiname;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

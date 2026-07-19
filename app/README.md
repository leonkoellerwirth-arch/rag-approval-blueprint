# Freigabeakte — Assistent

Die Weboberfläche zur [Freigabeakte](../akte/). Führt durch alle acht Teile und exportiert
Markdown in der Struktur der Vorlagen.

Vite + React 19 + TypeScript, von der paved road (`dev/base`, Template `vite-react-pwa`).
Oberfläche auf dem Designsystem des Hauses (`dev/base/standards/extra/theme.css`).

> **Kein Rechtsrat.** Siehe [`../DISCLAIMER.md`](../DISCLAIMER.md).

## Starten

```bash
cd app
npm ci
npm run dev          # Entwicklung, http://localhost:5273
```

Für die Nutzung im Haus:

```bash
npm run build        # erzeugt dist/
npm run preview      # dist/ lokal ausliefern
```

`dist/` ist ein statisches Verzeichnis ohne Serverlogik — es lässt sich auf jedem beliebigen
Webserver oder in einem internen Netzlaufwerk mit Webfreigabe ablegen. **Ein Öffnen per
Doppelklick aus dem Dateisystem funktioniert nicht**, weil ES-Module über `file://` von den
Browsern blockiert werden; ein simpler statischer Server genügt aber:

```bash
cd dist && python3 -m http.server 8080
```

Als PWA ist die Anwendung installierbar und läuft danach vollständig offline.

## Warum das Werkzeug so gebaut ist

**Es verarbeitet die vertraulichen Inhalte, vor denen dieses Repository warnt.** Deshalb: kein
Server, keine Datenbank, kein Login, keine Telemetrie. Der Bearbeitungsstand liegt im lokalen
Speicher des Browsers, die Übergabe an eine Kollegin läuft über eine Datei, die die Nutzerin
selbst in der Hand hat.

Das ist nachprüfbar und soll es sein — das gebaute Ergebnis enthält keinen einzigen Netzaufruf:

```bash
npm run build
grep -rE "\bfetch\(|XMLHttpRequest|WebSocket|sendBeacon" dist/assets/   # → leer
```

Damit dieser Nachweis trägt, ist Vites `modulePreload`-Polyfill abgeschaltet: Es erzeugte einen
`fetch()` der eigenen Chunks — fachlich harmlos, aber es hätte den Beleg unscharf gemacht.

**Es zeigt keine Fortschrittsanzeige.** Ein Werkzeug, das „72 % vollständig" meldet, optimiert
auf gefüllte Felder — und eine Akte, die nach Werkzeug aussieht, ist in der Prüfung schlechter
als keine. Stattdessen läuft die **Ehrlichkeitsprüfung** mit und beanstandet, was Vorlagen
tatsächlich scheitern lässt:

| Befund | Warum |
|---|---|
| Dokument **ohne** offene Punkte | in der Prüfung erklärungsbedürftig, nicht vorbildlich |
| offener Punkt ohne Verantwortlichen oder Frist | gilt als nicht nachverfolgt |
| Weichmacher im Restrisiko | ein Gremium, das ein weichgespültes Restrisiko genehmigt, hat nichts genehmigt |
| Restrisiko ohne benannten Träger | nicht getragen, sondern verteilt |
| Auflage ohne Folge bei Nichterfüllung | eine Auflage ohne Folge ist eine Bitte |
| Berechtigungsprüfung nur zur Indexierungszeit | friert einen Stand ein, der sich täglich ändert |
| „unmittelbar" als zugesagte Wirkzeit | keine prüfbare Aussage |
| Kill-Switch ohne Erprobung in Produktion | eine Behauptung, kein Nachweis |
| Integrität als „normal" eingestuft | der bei RAG regelmäßig unterschätzte Grundwert |

Jede dieser Regeln hat ihre Entsprechung in einer „Was die prüfende Funktion fragt"-Zeile der
Vorlagen. Sie sind in [`src/akte/pruefung.ts`](src/akte/pruefung.ts) als reine Funktionen
umgesetzt und in [`pruefung.test.ts`](src/akte/pruefung.test.ts) mit 33 Tests belegt.

**Was der Assistent nicht kann und nicht können soll: denken.** Die Aggregationsbewertung mit
dem Fachbereich, das ehrliche Restrisiko, der dokumentierte Konflikt zwischen zwei Funktionen —
das entsteht in Sitzungen, nicht in Eingabefeldern. Der Export ist eine belastbare Rohfassung
entlang der richtigen Struktur, kein fertiges Dokument.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `src/akte/schema.ts` | Die acht Teile als typisiertes Datenmodell. **Die Vorlagen in `../akte/` sind führend** — Änderungen dort gehören hier nachgezogen. |
| `src/akte/pruefung.ts` | Die Ehrlichkeitsprüfung, reine Funktionen |
| `src/akte/markdown.ts` | Export in der Struktur der Vorlagen |
| `src/akte/speicher.ts` | Lokale Speicherung, Sicherung einlesen/schreiben |
| `src/components/` | Register, Feldtypen, Prüfpanel |
| `src/styles/theme.css` | Tokens des Hauses, gespiegelt aus `dev/base/standards/extra/` |
| `src/styles/ui.css` | Utility-Brücke und Signaturflächen |

## Prüfen

```bash
npm run verify:ci    # typecheck · lint · tests · build
```

Läuft auch als Teil des Repo-Gates: `../scripts/gate.sh` erkennt `app/package.json` und führt
`verify:ci` mit aus.

## Offene Punkte

- **Kein Öffnen per `file://`** — ES-Module verlangen einen Server. Für den Einsatz im Haus
  heißt das: einmal bauen und statisch ausliefern.
- **Nur ein SVG-Icon.** Für Installationsdialoge erwarten manche Browser PNGs in 192 und 512
  Pixeln; die fehlen.
- **Die Schriften des Hauses** (Plus Jakarta Sans, Bricolage Grotesque, Fraunces) liegen im
  Website-Repo und sind nicht zentral abgelegt; hier greift der System-Fallback.
- **Der Assistent bildet die tragenden Abschnitte ab, nicht jede Detailtabelle der Vorlagen.**
  Was fehlt, ergänzen Sie im exportierten Markdown.
- **Keine Barrierefreiheitsprüfung mit assistiven Technologien.** Tastaturbedienung, Beschriftungen
  und Fokusführung sind gebaut, aber nicht mit einem Screenreader getestet.

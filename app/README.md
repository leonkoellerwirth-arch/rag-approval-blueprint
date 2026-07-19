# Freigabeakte — Assistent

Die Weboberfläche zur [Freigabeakte](../akte/). Führt durch alle acht Teile und exportiert
Markdown in der Struktur der Vorlagen.

Vite + React 19 + TypeScript, von der paved road (`dev/base`, Template `vite-react-pwa`).
Oberfläche auf dem Designsystem des Hauses (`dev/base/standards/extra/theme.css`).

> **Kein Rechtsrat.** Siehe [`../DISCLAIMER.md`](../DISCLAIMER.md).

## Zwei Auslieferungsformen, eine Codebasis

Nicht zwei Anwendungen für verschiedene Nutzergruppen — **ein Quelltext, zwei Bauziele.** Die
Einzeldatei ist erzeugt, nicht handgepflegt; genau wie `controls.md` aus `controls.yaml`
erzeugt wird. Damit kann nichts auseinanderlaufen: dieselben Regeln, dieselben 33 Tests,
derselbe Export.

```bash
cd app && npm ci

npm run dev           # Entwicklung, http://localhost:5273

npm run build         # → dist/                     gehostet, PWA, installierbar
npm run build:datei   # → dist-einzeldatei/index.html   EINE Datei, Doppelklick
```

### Wann welche Form

| | `dist/` | Einzeldatei |
|---|---|---|
| Verteilung | interner Webserver oder Netzlaufwerk mit Webfreigabe | Datei weiterreichen, Ablage, USB |
| Öffnen | über eine Adresse | Doppelklick, kein Server, keine Installation |
| Offline | ja, per Service Worker installierbar | ja, von Natur aus |
| Aktualisierung | automatisch beim nächsten Aufruf | neue Datei verteilen |
| Größe | 260 kB in mehreren Dateien | 258 kB in einer |

**Die Einzeldatei ist die Form für den Regelfall im Haus:** Ein ISB, der die Akte ausfüllen
soll, bekommt eine Datei und öffnet sie. Kein Ticket an den Betrieb, keine Freigabe für eine
neue Adresse, keine Installation.

Dass sie wirklich eigenständig ist, lässt sich nachrechnen — kein externes Skript, kein
dynamischer Import, keine Netzaufrufe, das Icon als data-URI eingebettet:

```bash
npm run build:datei
ls dist-einzeldatei/                                        # genau eine Datei
grep -oE '<(script|link)[^>]*(src|href)="[^"]+"' dist-einzeldatei/index.html | grep -v data:
grep -E "\bfetch\(|XMLHttpRequest|WebSocket|sendBeacon" dist-einzeldatei/index.html
```

Beide Ziele werden von `npm run verify:ci` gebaut — bricht eines, ist das Gate rot.

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

- **Die Einzeldatei hat keinen Service Worker** und damit keine Installation und keine
  automatische Aktualisierung — beides setzt eine Herkunft voraus, die `file://` nicht hat.
  Eine neue Fassung wird verteilt, nicht nachgeladen.
- **Nur ein SVG-Icon.** Für Installationsdialoge erwarten manche Browser PNGs in 192 und 512
  Pixeln; die fehlen.
- **Die Schriften des Hauses** (Plus Jakarta Sans, Bricolage Grotesque, Fraunces) liegen im
  Website-Repo und sind nicht zentral abgelegt; hier greift der System-Fallback.
- **Der Assistent bildet die tragenden Abschnitte ab, nicht jede Detailtabelle der Vorlagen.**
  Was fehlt, ergänzen Sie im exportierten Markdown.
- **Keine Barrierefreiheitsprüfung mit assistiven Technologien.** Tastaturbedienung, Beschriftungen
  und Fokusführung sind gebaut, aber nicht mit einem Screenreader getestet.

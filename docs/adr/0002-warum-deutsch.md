# ADR 0002 — Warum die Kernartefakte auf Deutsch sind

**Status:** angenommen · **Datum:** 2026-07-19

## Kontext

Die Standardannahme bei einem öffentlichen Repository lautet: englisch, weil das die Reichweite
maximiert. Für dieses Repository stellt sich die Frage anders. Die Lücke, die es füllt, ist die
deutsche Aufsichtspraxis — Schutzbedarfsfeststellung, DSFA-Baustein, Auslagerungsbewertung,
Freigabevorlage in Gremiensprache. Diese Dokumente werden in deutschen Häusern auf Deutsch
geschrieben, von deutschsprachigen Funktionen gelesen und von deutschsprachigen Prüfern geprüft.

Eine englische Freigabeakte wäre für niemanden brauchbar: Der deutsche ISB müsste sie
zurückübersetzen, und ein internationaler Leser hätte ohnehin ein anderes Aufsichtsregime.

## Entscheidung

**Deutsch** für die Artefakte, die in einem deutschen Freigabeverfahren tatsächlich verwendet
werden:

- die Freigabeakte (`akte/01` bis `akte/07`)
- den Löschnachweis (`docs/loeschnachweis.md`)
- das Aufsichts-Mapping (`docs/mapping-bait-vait-dora.md`)
- den Pilot (`pilot/`)
- den gerenderten Prüfkatalog (`controls/controls.md`)

**Englisch** für die Hülle und die Einordnung:

- `README.md`, die ADRs in ihrer Überschriftenstruktur, Commit-Nachrichten, Code
- die Feldnamen in `controls/controls.yaml` (`objective`, `audit_procedure`, `evidence`,
  `mapping`) — sie sind Datenstruktur, nicht Fließtext
- `docs/executive-summary.en.md` für internationale Leser
- `docs/who-uses-this.md` zweisprachig, weil es die Einstiegsseite für beide Gruppen ist

Das README erklärt die Sprachlogik offen, statt sie zu entschuldigen.

## Begründung

1. **Der Zielleser ist deutschsprachig.** ISB, DSB, 2nd Line, Auslagerungsmanagement und
   Vorstand eines deutschen Instituts. Die Artefakte sollen kopiert und ausgefüllt werden — in
   der Sprache, in der das Ergebnis eingereicht wird.
2. **Übersetzung verliert die Fachsprache.** „Schutzbedarfsfeststellung", „Prüfhandlung",
   „Auflage", „Wiedervorlage", „Freigabe unter Auflagen" haben in der deutschen Aufsichtspraxis
   eine Bedeutung, die eine englische Näherung nicht trägt. Wer „audit procedure" schreibt, wo
   „Prüfhandlung" gemeint ist, verliert genau die Präzision, die das Artefakt brauchbar macht.
3. **Die Sprache ist Teil der Positionierung.** Ein deutschsprachiges Repository zur deutschen
   Aufsichtspraxis signalisiert Nähe zum Gegenstand. Ein englisches signalisiert, dass es aus der
   Distanz geschrieben wurde.
4. **Reichweite ist nicht das Ziel.** Nützlichkeit für eine kleine, klar bestimmte Gruppe ist
   wertvoller als Sichtbarkeit bei einer großen, für die das Thema nicht zutrifft.

## Konsequenzen

- Die internationale Reichweite ist geringer. Das ist der bewusst gezahlte Preis.
- `docs/executive-summary.en.md` muss gepflegt werden, damit internationale Leser den Kern
  verstehen, ohne den Anspruch zu erwecken, die Artefakte selbst seien übersetzt.
- Bei Beiträgen von außen gilt: Artefakte auf Deutsch, Diskussion in beiden Sprachen.
- Eine spätere englische Übersetzung der Akte wird bewusst **nicht** angestrebt. Sie wäre nur
  dann sinnvoll, wenn ein anderes Aufsichtsregime adressiert würde — und das wäre ein anderes
  Repository.

# ADR 0003 — Prüfhandlung und Evidenz als Pflichtfelder jeder Kontrolle

**Status:** angenommen · **Datum:** 2026-07-19

## Kontext

Kontrollkataloge gibt es in großer Zahl. Die meisten bestehen aus einer ID, einem Titel und einem
Kontrollziel: *„Der Zugriff auf Daten ist auf berechtigte Personen beschränkt."* Solche Kataloge
lesen sich gut und sind in einer Prüfung wertlos, weil sie die beiden Fragen offenlassen, die
tatsächlich gestellt werden:

1. **Wie stelle ich fest, ob die Kontrolle wirkt?** (Prüfhandlung)
2. **Woran sehe ich es?** (Evidenz)

Eine 2nd Line, die gegen ein solches Raster testen soll, muss beide Fragen selbst beantworten —
und tut es bei jedem System anders. Eine interne Revision, die ein Prüfprogramm braucht, kann
ein solches Ziel nicht ausführen.

## Entscheidung

Jede Kontrolle in `controls/controls.yaml` trägt **vier Pflichtfelder**:

| Feld | Inhalt |
|---|---|
| `objective` | Kontrollziel — was sichergestellt werden soll |
| `audit_procedure` | **Prüfhandlung** — ausformuliert in der Sprache einer Prüfung: „Lasse dir X zeigen, wähle Stichprobe Y, prüfe Z" |
| `evidence` | **Evidenz-Artefakt** — welches Dokument, Log oder Testprotokoll die Kontrolle belegt |
| `mapping` | Zuordnung zu aufsichtlichen Anforderungen, nur mit verifizierten Fundstellen |

Eine Kontrolle, der eines dieser Felder fehlt, **fällt im Schematest durch** und kann nicht
committet werden (`tests/test_render_controls.py`, INV-4).

## Begründung

1. **Die Prüfhandlung ist die eigentliche Wertschöpfung.** Kontrollziele lassen sich aus jedem
   Rahmenwerk ableiten. Die Formulierung, wie eine Revision die Wirksamkeit tatsächlich
   feststellt — mit Stichprobe, Blickrichtung und typischem Befund — stammt aus Praxis und ist
   genau das, was öffentlich fehlt.
2. **Ohne benannte Evidenz ist die Kontrolle nicht belegbar.** Die Frage „woran sehen Sie das?"
   beendet in Prüfungen mehr Diskussionen als jede andere. Wer die Antwort erst im Termin sucht,
   hat verloren.
3. **Die Gegenrichtung entsteht kostenlos.** Weil jede Kontrolle ihr Evidenz-Artefakt benennt,
   ergibt sich automatisch, welches Dokument der Freigabeakte wofür gebraucht wird — das ist die
   Grundlage des Mappings.
4. **Ein maschinell erzwungenes Pflichtfeld verhindert Erosion.** Unter Zeitdruck fällt zuerst
   die Prüfhandlung weg, weil sie am meisten Arbeit macht. Ein fehlschlagender Test verhindert
   das zuverlässiger als ein Vorsatz.

## Konsequenzen

- **Eine neue Kontrolle kostet echte Arbeit.** Das ist beabsichtigt und begrenzt den Katalog auf
  eine sinnvolle Größe: 22 belegbare Kontrollen sind mehr wert als 120 Kontrollziele.
- Der Katalog wird aus der YAML **gerendert** und nie von Hand bearbeitet; ein Test schlägt fehl,
  wenn Markdown und YAML auseinanderlaufen (INV-3). So kann das Pflichtfeld nicht in der
  Darstellung umgangen werden.
- Die Prüfhandlungen sind in der Du-Form der Prüfungsanweisung geschrieben („Lasse dir zeigen").
  Das ist ungewöhnlich für ein Repository und bewusst: Es macht den Text unmittelbar verwendbar.
- Das `mapping`-Feld unterliegt der Verifikationsregel (INV-1). Wo keine Fundstelle geprüft
  werden konnte, steht eine generische Formulierung — nie eine plausible Vermutung.

## Verworfene Alternativen

- **Prüfhandlung optional.** Verworfen: Optionale Felder bleiben leer, und der Katalog wäre einer
  von vielen.
- **Reifegrade statt Prüfhandlungen.** Verworfen: Reifegradmodelle beschreiben, wo man steht,
  nicht, wie man es feststellt. Für eine Freigabe ist die zweite Frage die relevante.

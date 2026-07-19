# Kontrollkatalog

23 Kontrollen über 6 Domänen, geschrieben für die Funktionen, die ein RAG-System **prüfen** —
nicht für die, die es bauen.

> **Kein Rechtsrat.** Siehe [`../DISCLAIMER.md`](../DISCLAIMER.md).

## Die zwei Dateien

| Datei | Was sie ist |
|---|---|
| [`controls.yaml`](controls.yaml) | **Die einzige Quelle der Wahrheit.** Hier wird geändert. |
| [`controls.md`](controls.md) | Der gerenderte Prüfkatalog. **Niemals von Hand ändern** — ein Test schlägt fehl, wenn beide auseinanderlaufen. |

```bash
python tools/render_controls.py catalogue     # controls.yaml → controls.md
```

## Was jede Kontrolle trägt

Vier Pflichtfelder, maschinell erzwungen — eine Kontrolle, der eines fehlt, fällt im Schematest
durch:

| Feld | Warum es Pflicht ist |
|---|---|
| **Kontrollziel** | Was sichergestellt werden soll |
| **Prüfhandlung** | *„Lasse dir X zeigen, wähle Stichprobe Y, prüfe Z"* — ausformuliert in der Sprache einer Prüfung. Ohne sie ist eine Kontrolle eine Absichtserklärung. |
| **Evidenz-Artefakt** | Welches Dokument, Log oder Protokoll sie belegt. Ohne sie ist sie nicht belegbar. |
| **Mapping** | Zuordnung zu DORA, MaRisk, DSGVO — nur verifizierte Fundstellen, siehe [`../docs/quellen.md`](../docs/quellen.md). |

Die Begründung steht in [ADR 0003](../docs/adr/0003-pruefhandlung-als-pflichtfeld.md).

## Die sechs Domänen

`ZUG` Zugriff und Berechtigungen zur Query-Zeit · `KLA` Datenklassifizierung ·
`LOE` Löschung und Nachweisführung · `EVA` Evaluierung und Halluzination ·
`AUD` Protokollierung und Nachvollziehbarkeit · `BET` Betrieb, Änderungswesen und Notfall

## So benutzen Sie ihn

**Als 2nd Line:** als Testraster. Bewertung in eine YAML-Datei schreiben, Readiness-Report
rendern — Muster in [`../pilot/controls-assessment.yaml`](../pilot/controls-assessment.yaml).

**Als interne Revision:** als Prüfprogramm. Ein daraus abgeleitetes, risikoorientiertes Programm
steht in [`../pilot/revision/`](../pilot/revision/).

**Als ISB:** als Forderungsliste gegenüber dem Projekt.

Wie die geforderte Evidenz konkret aussieht, zeigt [`../pilot/evidenz/`](../pilot/evidenz/).

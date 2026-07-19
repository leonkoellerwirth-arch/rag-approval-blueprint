# 05 — Notfallkonzept RAG-System

> **Wer benutzt dieses Dokument?** BCM-/Notfallverantwortliche gemeinsam mit dem
> Systemverantwortlichen IT und der Informationssicherheit.
> **In welchem Prozess?** Notfall- und Wiederanlaufverfahren; Anbindung an das bestehende
> Notfallmanagement des Hauses.
> **Wer prüft es?** 2nd Line und interne Revision — mit der Kernfrage, ob der Kill-Switch
> nicht nur existiert, sondern **erprobt** ist und außerhalb der Geschäftszeiten erreichbar.

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Siehe [`DISCLAIMER.md`](../DISCLAIMER.md).

**Ausfüllhinweis.** Dieses Dokument ergänzt Ihr bestehendes Notfallkonzept, es ersetzt es nicht.
Tragen Sie hier nur ein, was für dieses System spezifisch ist. Der wesentliche Unterschied zu
klassischen Anwendungen: Der gefährlichere Zustand ist nicht der Ausfall, sondern das
**fehlerhafte Weiterlaufen** — das System antwortet, aber falsch, veraltet oder auf Basis von
Inhalten, die es nicht mehr zeigen dürfte. Ein Notfallkonzept, das nur Verfügbarkeit betrachtet,
geht an diesem System vorbei.

---

## 1. Einordnung

| Feld | Inhalt |
|---|---|
| System | `<Name>` |
| Kritische oder wichtige Funktion? | `<ja/nein + Begründung; Verweis auf 03>` |
| Geschäftsprozess-Abhängigkeit | `<Welcher Prozess steht ohne das System still — realistisch?>` |
| Verfügbarkeitsklasse / Schutzbedarf Verfügbarkeit | `<Verweis auf 01>` |
| Fachlicher Rückfallweg | `<z. B. Richtliniendokumente im Intranet, Fachbereichs-Hotline>` |
| RTO / RPO | `<…>` / `<…>` |

**Die ehrliche Verfügbarkeitsfrage.** *Ein interner Assistent ist selten geschäftskritisch: Fällt
er aus, arbeiten die Beschäftigten weiter wie vor seiner Einführung. Schreiben Sie das hin, wenn
es so ist — eine überhöhte Kritikalitätseinstufung erzeugt Auflagen, die Sie nicht brauchen, und
untergräbt Ihre Glaubwürdigkeit bei den Punkten, die wirklich zählen. Umgekehrt gilt: Wenn ein
Prozess bereits auf das System umgestellt wurde (z. B. der Papierweg abgeschafft ist), ist die
Einstufung eine andere. Prüfen Sie das ausdrücklich, statt es fortzuschreiben.*

## 2. Szenarien

Für jedes Szenario: Erkennung, Sofortmaßnahme, Entscheidungsträger, Wiederanlauf.

### S1 — Vollständiger Ausfall des Systems

| Feld | Inhalt |
|---|---|
| Auslöser | `<Infrastruktur, Anwendung, Netz>` |
| Erkennung | `<Monitoring, Schwellenwert, Alarmierung>` |
| Auswirkung | *Keine Auskunft; Beschäftigte weichen auf den fachlichen Rückfallweg aus.* |
| Sofortmaßnahme | `<Statusmeldung an Nutzende mit Verweis auf den Rückfallweg>` |
| Entscheidung | `<Rolle>` |
| Wiederanlauf | `<Reihenfolge, Prüfschritte vor Freigabe>` |

### S2 — Ausfall oder Störung des LLM-Anbieters

| Feld | Inhalt |
|---|---|
| Auslöser | Anbieterstörung, Rate-Limiting, Regionsausfall |
| Erkennung | `<Fehlerquote, Latenz, Anbieter-Statusseite>` |
| Auswirkung | *Retrieval funktioniert, Antworterzeugung nicht.* |
| Degradationsmodus | `<Verweis auf Abschnitt 3>` |
| Ausweichoption | `<Zweitmodell/-region — falls vorhanden; falls nicht: hier ausdrücklich vermerken und in 03 als Konzentrationsrisiko führen>` |
| Entscheidung | `<Rolle>` |

### S3 — Fehlerhafte Antworten im Regelbetrieb (der eigentliche Notfall)

| Feld | Inhalt |
|---|---|
| Auslöser | Modell-/Promptänderung, fehlerhafte Indexierung, veraltete Quelle |
| Erkennung | `<Nutzermeldungen, Stichprobenprüfung, Qualitätsmonitor>` |
| Auswirkung | *Beschäftigte handeln nach einer falschen Auskunft — der Schaden entsteht nachgelagert und wird spät sichtbar.* |
| Sofortmaßnahme | `<Kill-Switch oder Degradationsmodus; Rückfrage an betroffene Nutzende>` |
| Nachlauf | *Betroffene Anfragen aus dem Protokoll ermitteln und aktiv korrigieren.* |
| Entscheidung | `<Rolle — Fachverantwortung, nicht IT>` |

*Dieses Szenario unterscheidet ein RAG-Notfallkonzept von einem generischen. Der Nachlauf ist der
entscheidende Teil: Wenn Sie nicht sagen können, wer in den letzten Tagen eine falsche Auskunft
erhalten hat, ist Ihre Protokollierung für den Notfall nicht ausreichend.*

### S4 — Unberechtigte Offenlegung von Inhalten über Antworten

| Feld | Inhalt |
|---|---|
| Auslöser | Fehlerhafte Berechtigungsprüfung, Indexierung nicht freigegebener Quellen, Prompt-Manipulation |
| Erkennung | `<Nutzermeldung, Stichprobe, Auffälligkeitsanalyse>` |
| Sofortmaßnahme | **Kill-Switch** — Betrieb einstellen, nicht degradieren |
| Meldepflichten | `<Informationssicherheitsvorfall; Prüfung Meldepflicht Datenschutz und ggf. aufsichtliche Meldung — mit der jeweils zuständigen Funktion, nicht im Alleingang>` |
| Beweissicherung | *Protokolle vor Wiederanlauf sichern; Index-Snapshot aufbewahren.* |
| Entscheidung | `<ISB, Eskalation an …>` |

### S5 — Kompromittierung oder Manipulation der Wissensbasis

| Feld | Inhalt |
|---|---|
| Auslöser | Eingeschleuste Inhalte, manipulierte Quelldokumente, unbefugte Indexänderung |
| Erkennung | `<Integritätsprüfung, Abgleich Index ↔ Quelle>` |
| Sofortmaßnahme | Kill-Switch; Neuaufbau des Index aus geprüften Quellen |
| Besonderheit | *Ein Neuaufbau aus derselben kompromittierten Quelle stellt den Fehler wieder her — die Quelle muss vor der Neuindexierung freigegeben sein.* |

### S6 — `<Weiteres Szenario, z. B. Datenschutzverletzung, Anbieterkündigung, Regionswechsel>`

## 3. Degradationsmodi

Legen Sie **vorab** fest, was das System tut, wenn eine Komponente ausfällt. Ein System, das im
Fehlerfall improvisiert, tut regelmäßig das Falsche: Es antwortet ohne Kontext.

| Stufe | Zustand | Verhalten des Systems | Auslöser | Freigabe durch |
|---|---|---|---|---|
| D0 | Normalbetrieb | Retrieval + Antwort mit Quellenangabe | — | — |
| D1 | Eingeschränkt | `<z. B. nur Trefferliste mit Fundstellen, keine generierte Antwort>` | `<…>` | `<…>` |
| D2 | Nur Verweis | `<Hinweis auf den fachlichen Rückfallweg, keine inhaltliche Auskunft>` | `<…>` | `<…>` |
| D3 | Abgeschaltet | Kein Zugang, Statusmeldung | Kill-Switch | `<…>` |

**Der eine Modus, den es nicht geben darf.** *Antwortgenerierung ohne Retrieval. Fällt der Index
oder die Berechtigungsprüfung aus, darf das Modell nicht „aus dem Gedächtnis" antworten — das
erzeugt zuverlässig plausible Falschauskünfte ohne Quellenbezug. Halten Sie ausdrücklich fest,
dass dieser Zustand technisch ausgeschlossen ist, und wie.*

## 4. Kill-Switch

| Feld | Inhalt |
|---|---|
| Technische Umsetzung | `<z. B. Feature-Flag, Zugangsschalter, Deaktivierung des Endpunkts>` |
| Wirkzeit | `<Zielwert, z. B. < 5 Minuten>` |
| Auslöseberechtigte | `<Rollen — mindestens zwei, damit Urlaub und Krankheit abgedeckt sind>` |
| Auslösung außerhalb der Geschäftszeiten | `<Wer, über welchen Weg, mit welcher Erreichbarkeit>` |
| Auslösung ohne IT-Beteiligung möglich? | `<ja/nein — für den ISB relevant>` |
| Wirkung auf laufende Anfragen | `<…>` |
| Sichtbarkeit für Nutzende | `<Statusmeldung, Wortlaut>` |
| Wiederinbetriebnahme durch | `<Rolle — bewusst nicht dieselbe wie die auslösende>` |
| Erprobung | **Turnus:** `<z. B. jährlich>` · **Letzter Test:** `<TT.MM.JJJJ>` · **Evidenz:** `<Testprotokoll>` |

*Die Zeile „Erprobung" ist die einzige, die in einer Prüfung wirklich zählt. Ein nie ausgelöster
Kill-Switch ist eine Behauptung. Planen Sie den Test vor dem Go-live und wiederholen Sie ihn nach
jeder wesentlichen Änderung.*

## 5. Wiederanlauf

**Reihenfolge.** `<1. … 2. … 3. …>`

**Prüfschritte vor der Wiederfreigabe** — mindestens:

| # | Prüfschritt | Verantwortlich | Evidenz |
|---|---|---|---|
| 1 | Ursache behoben und dokumentiert | `<…>` | `<…>` |
| 2 | Index konsistent zur Quelle (Stichprobe) | `<…>` | `<…>` |
| 3 | Berechtigungsprüfung wirksam (Negativtest) | `<…>` | Testprotokoll, vgl. [`06`](06-testnachweise.md) |
| 4 | Gelöschte Inhalte weiterhin nicht auffindbar | `<…>` | vgl. [`Löschnachweis`](../docs/loeschnachweis.md) |
| 5 | Stichprobe fachlicher Antwortqualität | `<Fachbereich>` | `<…>` |
| 6 | Freigabeentscheidung dokumentiert | `<…>` | `<…>` |

*Schritt 3 und 4 sind der Grund, warum dieser Abschnitt hier steht und nicht im generischen
Notfallhandbuch: Nach einem Wiederanlauf aus Sicherung kann ein Index Inhalte enthalten, die
zwischenzeitlich gelöscht oder entzogen wurden. Ein Restore ist bei RAG ein
datenschutzrelevanter Vorgang.*

## 6. Sicherung und Wiederherstellung

| Gegenstand | Gesichert? | Turnus | Aufbewahrung | Besonderheit |
|---|---|---|---|---|
| Quelldokumente | `<…>` | `<…>` | `<…>` | Führendes System: `<…>` |
| Vektorindex | `<…>` | `<…>` | `<…>` | **Enthält Ableitungen gelöschter Inhalte — siehe Löschnachweis** |
| Metadaten/Berechtigungen | `<…>` | `<…>` | `<…>` | `<…>` |
| Protokolle | `<…>` | `<…>` | `<…>` | Eigener Schutzbedarf |
| Konfiguration/Prompts | `<…>` | `<…>` | `<…>` | Versioniert? `<…>` |

**Wiederherstellungsstrategie Index.** *Zwei Wege sind vertretbar — Wiederherstellung aus
Sicherung (schnell, aber holt gelöschte Ableitungen zurück) oder Neuaufbau aus der Quelle
(langsam, aber konsistent). Legen Sie fest, welcher Weg gilt, und wenn Sie den schnellen wählen:
welcher Abgleich mit den zwischenzeitlichen Löschverlangen vor der Wiederfreigabe erfolgt.*

## 7. Kommunikation

| Adressat | Auslöser | Kanal | Verantwortlich | Frist |
|---|---|---|---|---|
| Nutzende | D1–D3 | `<…>` | `<…>` | `<…>` |
| Fachverantwortung | S3, S4 | `<…>` | `<…>` | `<…>` |
| ISB / Datenschutz | S4, S5 | `<…>` | `<…>` | `<…>` |
| Notfallstab / Krisenstab | `<Schwelle>` | `<…>` | `<…>` | `<…>` |
| Aufsicht / externe Meldung | `<Schwelle — mit der zuständigen Funktion abgestimmt>` | `<…>` | `<…>` | `<…>` |
| Dienstleister | `<…>` | `<…>` | `<…>` | `<…>` |

## 8. Übungen

| Übung | Turnus | Letzte Durchführung | Ergebnis/Evidenz |
|---|---|---|---|
| Kill-Switch-Auslösung | `<…>` | `<…>` | `<…>` |
| Wiederanlauf inkl. Negativtest | `<…>` | `<…>` | `<…>` |
| Szenario S3 (Falschauskunft) als Tischübung | `<…>` | `<…>` | `<…>` |
| Ausfall des LLM-Anbieters | `<…>` | `<…>` | `<…>` |

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Wann wurde der Kill-Switch zuletzt tatsächlich ausgelöst, und wer war das?"** Die
   Standardfrage. Ein Verweis auf die Dokumentation genügt nicht; verlangt wird ein
   Testprotokoll mit Datum, auslösender Person und gemessener Wirkzeit.
2. **„Was macht das System, wenn der Index nicht erreichbar ist?"** Prüft, ob der gefährlichste
   Degradationsmodus — Antworten ohne Retrieval — technisch ausgeschlossen ist.
3. **„Wie merken Sie, dass das System falsch antwortet?"** Prüft, ob Szenario S3 überhaupt
   erkannt wird oder nur auf Zufallsmeldungen von Nutzenden beruht.
4. **„Nach einem Restore des Index — woher wissen Sie, dass zwischenzeitlich gelöschte Inhalte
   nicht wieder da sind?"** Die Frage, die Notfall- und Löschkonzept verbindet und in der Praxis
   am häufigsten unbeantwortet bleibt.
5. **„Wer entscheidet um 22 Uhr an einem Samstag über die Abschaltung?"** Prüft die
   Erreichbarkeit und die Vertretungsregelung, nicht die Technik.

## Offene Punkte

- `<Was noch nicht geklärt ist — mit Verantwortlichem und Zieltermin.>`
- `<Beispiel: Kill-Switch bislang nur in der Testumgebung ausgelöst; Erprobung in Produktion vor
  Go-live terminiert auf TT.MM.JJJJ.>`

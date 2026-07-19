# 04 — Betriebskonzept RAG-System

> **Wer benutzt dieses Dokument?** Der IT-Betrieb bzw. der Systemverantwortliche, gemeinsam mit
> Enterprise-/Solution-Architekt und Informationssicherheit.
> **In welchem Prozess?** IT-Freigabe / Architektur-Governance und Betriebsübernahme
> („Wer betreibt das ab Go-live, mit welchen Rollen und welchem Änderungswesen?").
> **Wer prüft es?** 2nd Line / IT-Risikocontrolling und die interne Revision. Für die Revision
> ist dieses Dokument die Grundlage der Frage „Wurde nach dem Go-live etwas verändert, ohne dass
> das Änderungswesen gegriffen hat?".

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Siehe [`DISCLAIMER.md`](../DISCLAIMER.md).

**Ausfüllhinweis.** Ersetzen Sie jeden `<Platzhalter>`. Kursive Beispielformulierungen sind
Vorschläge in der Sprache, die in Gremien und Prüfungen trägt — schreiben Sie sie um, aber
schreiben Sie sie nicht ab. Was Sie nicht wissen, gehört unter „Offene Punkte", nicht in eine
optimistische Formulierung. Ein ehrliches „noch offen, Zieltermin X" hat in einer Prüfung noch
nie Schaden angerichtet; eine geschönte Aussage schon.

---

## 1. Gegenstand und Abgrenzung

| Feld | Inhalt |
|---|---|
| System | `<Name, Kurzbeschreibung>` |
| Fachlicher Zweck | `<z. B. Auskunft zu internen Richtlinien für Beschäftigte>` |
| Fachverantwortung | `<Organisationseinheit, Rolle>` |
| Systemverantwortung IT | `<Organisationseinheit, Rolle>` |
| Betriebsmodell | `<on-prem / Private Cloud / SaaS / hybrid>` |
| Beteiligte Dienstleister | `<Verweis auf 03-auslagerung-drittparteien.md>` |
| Nutzerkreis und Größe | `<z. B. alle Beschäftigten, ca. N Personen>` |
| Verarbeitete Datenklassen | `<Verweis auf 01-schutzbedarfsfeststellung.md>` |
| Kritische oder wichtige Funktion? | `<ja/nein + Begründung, Verweis auf 03>` |

**Explizit nicht Gegenstand.** *Beschreiben Sie hier, was das System nicht tut — das erspart
Ihnen in jeder Prüfung eine Runde. Beispiel: „Das System trifft keine Entscheidungen mit
Rechtswirkung gegenüber Beschäftigten oder Kunden, erstellt keine verbindlichen Auskünfte
gegenüber Dritten und schreibt in keinem Quellsystem."*

## 2. Architektur im Betrieb (Kurzform)

Beschreiben Sie die Betriebssicht, nicht die Lösungsarchitektur: welche Komponenten laufen wo,
wer betreibt sie, wo verlassen Daten das Haus.

| Komponente | Betrieben von | Standort/Region | Enthält | Anmerkung |
|---|---|---|---|---|
| Quellsysteme | `<…>` | `<…>` | Ausgangsdokumente | Führendes System bleibt `<…>` |
| Ingest-/Chunking-Strecke | `<…>` | `<…>` | Dokumentfragmente | Verarbeitungszeitpunkt: `<Batch/Event>` |
| Embedding-Erzeugung | `<…>` | `<…>` | Vektoren | Modell/Version: `<…>` |
| Vektorindex | `<…>` | `<…>` | Vektoren + Metadaten | Indexverfahren: `<z. B. HNSW>` |
| Berechtigungsprüfung | `<…>` | `<…>` | Entitlements | Zeitpunkt: **Query-Zeit** |
| LLM (Antworterzeugung) | `<…>` | `<…>` | Prompt + Kontext | Anbieter: `<Verweis auf 03>` |
| Protokollierung | `<…>` | `<…>` | Prompts, Treffer, Antworten | Aufbewahrung: `<…>` |

**Datenabflusspunkte.** *Benennen Sie ausdrücklich jede Stelle, an der Inhalte den eigenen
Verantwortungsbereich verlassen — typischerweise die Embedding-Erzeugung und der LLM-Aufruf. Für
jede Stelle: welche Inhalte, in welchem Umfang, mit welcher vertraglichen Zusicherung zur
Nichtverwendung für Trainingszwecke (Verweis auf 03).*

## 3. Rollen und Verantwortlichkeiten

| Rolle | Aufgabe im Betrieb | Besetzt durch | Vertretung |
|---|---|---|---|
| Fachverantwortlicher | Inhaltliche Freigabe der Wissensbasis, Umgang mit Falschauskünften | `<…>` | `<…>` |
| Systemverantwortlicher IT | Verfügbarkeit, Änderungen, Incidents | `<…>` | `<…>` |
| Datenverantwortliche je Quelle | Entscheidet, welche Dokumente in den Index dürfen | `<…>` | `<…>` |
| Berechtigungsverantwortlicher | Pflege und Rezertifizierung der Zugriffsrechte | `<…>` | `<…>` |
| Informationssicherheit | Kontrollwirksamkeit, sicherheitsrelevante Änderungen | `<…>` | `<…>` |
| Datenschutz | Löschverlangen, Auskunftsersuchen, Änderungen der Verarbeitung | `<…>` | `<…>` |
| Modellverantwortlicher | Modellwechsel, Qualitätsmessung, Halluzinationsbefunde | `<…>` | `<…>` |

**Funktionstrennung.** *Beschreiben Sie, wer Inhalte in den Index geben darf und wer die
Berechtigungen dazu vergibt — diese beiden Rollen dürfen nicht in einer Person zusammenfallen,
sonst kann eine einzelne Person die Sichtbarkeit vertraulicher Inhalte allein herstellen.*

## 4. Berechtigungsprozess

Der Abschnitt, an dem Freigaben real scheitern. Bei RAG genügt es nicht, dass die Quellsysteme
sauber berechtigt sind: entscheidend ist, ob die Berechtigung **zum Zeitpunkt der Anfrage**
gegen die Identität des Nutzenden geprüft wird.

**Zu beantworten:**

1. Wann wird die Berechtigung geprüft — bei der Indexierung, bei der Suche, bei der Ausgabe?
   *Belastbar ist allein die Prüfung zur Query-Zeit gegen die aktuelle Berechtigung; eine nur
   zur Indexierungszeit gesetzte Sichtbarkeit friert einen Stand ein, der sich täglich ändert.*
2. Woraus stammt die Berechtigungsinformation, und wie aktuell ist sie? `<Quelle, Latenz>`
3. Was passiert bei Entzug einer Berechtigung — wie schnell wirkt er im Index? `<…>`
4. Wie wird verhindert, dass Metadaten oder Quellenangaben Inhalte preisgeben, auf die kein
   Zugriff besteht? *Auch ein Treffer, der nur mit Titel und Fundstelle angezeigt wird, ist eine
   Information.*
5. Aggregationsrisiko: Können mehrere für sich unkritische Fragmente in einer Antwort zu einer
   schutzbedürftigen Aussage zusammengeführt werden? `<Bewertung + Maßnahme>`
6. Wie werden technische Konten und Administratorzugriffe auf den Index behandelt? *Ein
   Administrator des Vektorindex kann Inhalte lesen, für die er fachlich nicht berechtigt ist —
   benennen Sie diese Einsichtsmöglichkeit und die kompensierende Maßnahme.*

**Rezertifizierung.** Turnus: `<z. B. halbjährlich>` · Verantwortlich: `<…>` ·
Evidenz: `<Rezertifizierungsprotokoll>`

## 5. Änderungswesen (Change)

Der Abschnitt, den Prüfer zuerst aufschlagen. Bei RAG gibt es Änderungen, die kein klassisches
Change-Verfahren erfasst, weil sie nicht wie Software aussehen — aber das Systemverhalten
vollständig verändern.

| Änderungsart | Beispiel | Verfahren | Genehmigung durch | Erneute Tests |
|---|---|---|---|---|
| Software-Release | Anwendungsversion | Standard-Change | `<…>` | `<…>` |
| **Modellwechsel/-version** | LLM v1 → v2 | **Wesentliche Änderung** | `<Fach + ISB>` | Qualitäts- und Leakage-Tests |
| **Embedding-Modell** | Neues Embedding-Modell | **Wesentliche Änderung** | `<Fach + ISB>` | Vollständige Neuindexierung + Löschprüfung |
| **Prompt-/Systemanweisung** | Änderung der Systemprompt-Regeln | `<Verfahren>` | `<…>` | Regressionstest Antwortqualität |
| **Neue Datenquelle** | Weiteres Quellsystem im Index | **Wesentliche Änderung** | `<Fach + ISB + DSB>` | Schutzbedarf (01) neu bewerten |
| Dokumentzugang | Einzelne Dokumente ergänzt/entfernt | Regelbetrieb | `<Datenverantwortlicher>` | Stichprobe |
| Parameter | Trefferanzahl, Schwellenwerte | `<Verfahren>` | `<…>` | Qualitätsmessung |
| Anbieterseitige Änderung | Anbieter aktualisiert das Modell ohne Vorlauf | `<Verfahren>` | `<…>` | `<…>` |

**Die unangenehme Zeile ist die letzte.** *Bei einem SaaS-LLM kann sich das Modellverhalten ohne
Ihr Zutun ändern. Beschreiben Sie ausdrücklich, wie Sie davon erfahren (vertragliche
Ankündigungsfrist, Versionspinning, Monitoring) und was Sie tun, wenn Sie es nicht rechtzeitig
erfahren. Wenn Sie es nicht steuern können, ist das ein Restrisiko für die Freigabevorlage —
kein Grund, den Abschnitt wegzulassen.*

**Notfall-Change.** Verfahren: `<…>` · Nachdokumentation binnen: `<…>` · Genehmigung: `<…>`

## 6. Wissensbasis-Pflege (Lifecycle der Inhalte)

| Frage | Antwort |
|---|---|
| Wer entscheidet über Aufnahme eines Dokuments? | `<Rolle>` |
| Wie wird Aktualität sichergestellt? | `<Turnus, Auslöser>` |
| Wie werden veraltete Fassungen erkannt? | `<Verfahren>` |
| Was passiert mit zurückgezogenen Richtlinien? | `<Verfahren + Verweis auf Löschnachweis>` |
| Wie wird Dublettenbildung vermieden? | `<Verfahren>` |
| Wie werden Quellen im Antworttext ausgewiesen? | `<Verfahren>` |

*Eine veraltete, aber selbstbewusst zitierte Richtlinie ist im regulierten Umfeld
schadensträchtiger als eine ausbleibende Antwort. Beschreiben Sie, wie das System mit
Gültigkeitsständen umgeht — mindestens Gültig-ab/Gültig-bis als Metadatum und ein Hinweis in der
Antwort.*

## 7. Betriebsüberwachung

| Gegenstand | Kennzahl/Signal | Schwellenwert | Reaktion | Verantwortlich |
|---|---|---|---|---|
| Verfügbarkeit | `<…>` | `<…>` | `<…>` | `<…>` |
| Antwortlatenz | `<…>` | `<…>` | `<…>` | `<…>` |
| Retrieval-Qualität | `<z. B. Trefferrelevanz Stichprobe>` | `<…>` | `<…>` | `<…>` |
| Halluzinationsbefunde | `<Meldungen je Zeitraum>` | `<…>` | `<…>` | `<…>` |
| Ablehnungsquote | `<…>` | `<…>` | `<…>` | `<…>` |
| Auffällige Abfragemuster | `<z. B. systematisches Abfragen nach Personen>` | `<…>` | `<…>` | `<…>` |
| Kosten/Volumen | `<…>` | `<…>` | `<…>` | `<…>` |

**Nutzerrückmeldung.** *Ein „Antwort war falsch"-Kanal ist keine Komfortfunktion, sondern der
wirksamste Halluzinationsdetektor im Betrieb. Beschreiben Sie, wer die Meldungen auswertet, in
welcher Frist, und wie eine bestätigte Falschauskunft zu einer Korrektur der Wissensbasis
führt.*

## 8. Protokollierung

| Was wird protokolliert | Zweck | Aufbewahrung | Zugriff auf das Protokoll |
|---|---|---|---|
| Anfrage (Prompt) | Nachvollziehbarkeit, Fehleranalyse | `<…>` | `<…>` |
| Abgerufene Dokumente/Chunks | Nachweis der Berechtigungswirkung | `<…>` | `<…>` |
| Antwort | Nachvollziehbarkeit | `<…>` | `<…>` |
| Nutzeridentität | Zuordenbarkeit | `<…>` | `<…>` |
| Administrative Eingriffe | Revisionssicherheit | `<…>` | `<…>` |

*Das Protokoll eines Assistenzsystems ist selbst eine schutzbedürftige Verarbeitung: Es enthält,
was Beschäftigte gefragt haben. Beschreiben Sie das Vier-Augen- oder Antragsverfahren für den
Zugriff und die Abstimmung mit der Mitbestimmung — und nehmen Sie das Protokoll in die
Schutzbedarfsfeststellung (01) als eigene Datenklasse auf.*

## 9. Schnittstellen zu anderen Verfahren

| Verfahren | Schnittstelle | Verweis |
|---|---|---|
| Notfallmanagement/BCM | Kill-Switch, Degradationsmodi, Wiederanlauf | [`05-notfallkonzept.md`](05-notfallkonzept.md) |
| Löschverfahren | Löschverlangen, Nachweisführung | [`../docs/loeschnachweis.md`](../docs/loeschnachweis.md) |
| Auslagerungsmanagement | Dienstleistersteuerung, Exit | [`03-auslagerung-drittparteien.md`](03-auslagerung-drittparteien.md) |
| Testnachweise | Wiederholungstests bei Änderungen | [`06-testnachweise.md`](06-testnachweise.md) |
| Informationssicherheitsvorfälle | Meldeweg bei Datenabfluss über Antworten | `<Verweis auf internes Verfahren>` |

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Zeigen Sie mir, wie die Berechtigung geprüft wird — zur Indexierungszeit oder zur
   Query-Zeit?"** Lassen Sie sich nicht auf die Antwort „die Quellsysteme sind berechtigt"
   ein; gemeint ist die Prüfung im Moment der Anfrage gegen die aktuelle Berechtigung.
2. **„Ein Modellwechsel — ist das bei Ihnen ein Change?"** Wenn Modell-, Embedding- oder
   Prompt-Änderungen nicht im Änderungswesen liegen, ist das Systemverhalten unkontrolliert
   veränderbar. Das ist der häufigste Befund.
3. **„Was passiert, wenn der Anbieter das Modell ohne Ankündigung aktualisiert?"** Prüft, ob das
   Risiko erkannt und entweder vertraglich, technisch oder als Restrisiko behandelt wurde.
4. **„Wer darf die Prompt-Protokolle lesen, und wer kontrolliert das?"** Prüft die
   Verhältnismäßigkeit der Protokollierung und die Einbindung der Mitbestimmung.
5. **„Nennen Sie mir die letzten drei Änderungen am System und zeigen Sie mir die zugehörigen
   Genehmigungen."** Der Standardtest auf die Wirksamkeit — nicht das Vorhandensein — des
   Änderungswesens.

## Offene Punkte

- `<Was in dieser Vorlage noch nicht beantwortet ist — mit Verantwortlichem und Zieltermin.>`
- `<Beispiel: Ankündigungsfrist des LLM-Anbieters bei Modellaktualisierungen vertraglich nicht
  fixiert; Klärung mit Einkauf bis TT.MM.JJJJ, bis dahin als Restrisiko in 07 geführt.>`

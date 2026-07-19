# 04 — Betriebskonzept RAG-System

> **Wer benutzt dieses Dokument?** Der IT-Betrieb bzw. der Systemverantwortliche, gemeinsam mit
> Enterprise-/Solution-Architekt und Informationssicherheit.
> **In welchem Prozess?** IT-Freigabe / Architektur-Governance und Betriebsübernahme
> („Wer betreibt das ab Go-live, mit welchen Rollen und welchem Änderungswesen?").
> **Wer prüft es?** 2nd Line / IT-Risikocontrolling und die interne Revision. Für die Revision
> ist dieses Dokument die Grundlage der Frage „Wurde nach dem Go-live etwas verändert, ohne dass
> das Änderungswesen gegriffen hat?".

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden; Personen, Anbieter,
> Zahlen und Befunde sind konstruiert. Der Ablauf ist echt. Siehe
> [`../00-fallbeschreibung.md`](../00-fallbeschreibung.md).

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Siehe [`../../DISCLAIMER.md`](../../DISCLAIMER.md).

Dies ist die ausgefüllte Fassung für NORA, erstellt von A. Kellner (Enterprise-Architekt) und
T. Brand (Projektleitung), abgeschlossen in der Fassung zur Freigabeakte vom 08.06.2026.

---

## 1. Gegenstand und Abgrenzung

| Feld | Inhalt |
|---|---|
| System | NORA — Nordwind Richtlinien-Assistent |
| Fachlicher Zweck | Beantwortung von Fragen zu internen Richtlinien, Arbeitsanweisungen und Prozessbeschreibungen; Rückgabe der Fundstelle im Quellsystem mit Gültigkeitsstand |
| Fachverantwortung | Organisationsabteilung; Leitung M. Sørensen |
| Systemverantwortung IT | A. Kellner, Enterprise-Architekt (interim bis Übergabe an regulären IT-Betrieb, Zieltermin Q3 2026) |
| Betriebsmodell | Hybrid: eigenbetriebene Komponenten (Ingest, Embedding, Vektorindex) im RZ Bremen; Antworterzeugung als externer IKT-Dienst (Meridian AI B.V.) |
| Beteiligte Dienstleister | Meridian AI B.V., Amsterdam — einziger externer IKT-Dienstleister; Einzelheiten in [`03`](03-auslagerung-drittparteien.md) |
| Nutzerkreis und Größe | Alle Beschäftigten der Nordwind Bank AG, ca. 1.200 Personen |
| Verarbeitete Datenklassen | Interne Dokumente (nicht öffentlich; nicht personenbezogen in der Wissensbasis); Anfragen der Nutzenden (personenbezogen: Nutzeridentität + Anfrageninhalt); Protokolldaten — Einzelheiten in [`01`](../../akte/01-schutzbedarfsfeststellung.md) |
| Kritische oder wichtige Funktion? | Nein — Begründung in [`03`](03-auslagerung-drittparteien.md), Abschnitt 2 |

**Explizit nicht Gegenstand.** NORA trifft keine Entscheidungen mit Rechtswirkung gegenüber
Beschäftigten oder Kunden, erstellt keine verbindlichen Auskünfte gegenüber Dritten, schreibt in
keinem Quellsystem und verarbeitet keine Kundendaten der Bank. Das System dient ausschließlich
der internen Auskunft über bestehende Regelungen.

## 2. Architektur im Betrieb (Kurzform)

| Komponente | Betrieben von | Standort / Region | Enthält | Anmerkung |
|---|---|---|---|---|
| Quellsysteme (Richtliniendatenbank, Intranet-Handbuch, Ablage Organisationsabteilung) | Nordwind Bank AG | RZ Bremen | Quelldokumente (812 Dokumente) | Führendes System bleibt das jeweilige Quellsystem; NORA liest nur |
| Ingest-/Chunking-Strecke | Nordwind Bank AG | RZ Bremen | Dokumentfragmente | Verarbeitung: nächtlicher Batch; anlassbezogen bei Dokumentänderung |
| Embedding-Erzeugung | Nordwind Bank AG | RZ Bremen | Vektoren | Offenes Embedding-Modell, lokal betrieben; kein Datenaustritt |
| Vektorindex | Nordwind Bank AG | RZ Bremen | Vektoren + Metadaten (Dokument-ID, Titel, Berechtigungsgruppe) | Verfahren: HNSW; Administratorzugriff: s. Abschnitt 4 |
| Berechtigungsprüfung | Nordwind Bank AG | RZ Bremen | Entitlements aus Active Directory | Zeitpunkt: Query-Zeit; Quelle: AD-Gruppenmodell; Cache-TTL 60 Sekunden |
| LLM (Antworterzeugung) | Meridian AI B.V. | EU-Region Frankfurt | Systemanweisung + Retrieval-Kontext + Nutzeranfrage | Anbieter: [`03`](03-auslagerung-drittparteien.md); einzige Stelle, an der Inhalte das Haus verlassen |
| Protokollierung | Nordwind Bank AG | RZ Bremen | Prompts, abgerufene Chunks, Antworten, Nutzeridentität | Aufbewahrung 90 Tage; Zugriff nach Vier-Augen-Verfahren (s. Abschnitt 8) |

**Datenabflusspunkte.** Der einzige Punkt, an dem Inhalte den Verantwortungsbereich der Nordwind
Bank AG verlassen, ist der LLM-Aufruf an Meridian AI. Übermittelt werden Systemanweisung,
abgerufene Dokumentfragmente (Chunks) und die Nutzeranfrage. Embedding-Erzeugung und Vektorindex
sind vollständig eigenbetrieben. Vertragliche Zusicherung zur Nichtverwendung für Trainingszwecke:
MSA § 5 Abs. 2, belegt in [`03`](03-auslagerung-drittparteien.md), V4.

## 3. Rollen und Verantwortlichkeiten

| Rolle | Aufgabe im Betrieb | Besetzt durch | Vertretung |
|---|---|---|---|
| Fachverantwortlicher | Inhaltliche Freigabe der Wissensbasis, Entscheidung über Aufnahme neuer Quellen, Umgang mit Falschauskünften | M. Sørensen (Leitung Organisation) | T. Brand |
| Systemverantwortlicher IT | Verfügbarkeit, Incidents, technische Änderungen, Schnittstellenpflege | A. Kellner (Enterprise-Architekt, interim) | T. Brand |
| Datenverantwortliche je Quelle | Entscheidet, welche Dokumente in den Index aufgenommen werden | Jeweilige Fachbereichsleitung; für Richtliniendatenbank: M. Sørensen | Stellvertretende Fachbereichsleitung |
| Berechtigungsverantwortlicher | Pflege und Rezertifizierung des AD-Gruppenmodells | IT-Betrieb (Verzeichnisdienst-Administration) | IT-Betrieb, intern geregelt |
| Informationssicherheit | Kontrollwirksamkeit, Stellungnahme bei wesentlichen Änderungen, Protokollzugriff | Dr. P. Ohlsen (ISB) | ISB-Stellvertretung |
| Datenschutz | Löschverlangen, Auskunftsersuchen, Änderungen der Verarbeitung, Genehmigung Protokollzugriff | R. Mattis (DSB) | DSB-Stellvertretung |
| Modellverantwortlicher | Modellwechsel, Qualitätsmessung, Halluzinationsbefunde, Regressionstests | A. Kellner (Enterprise-Architekt) | T. Brand |

**Funktionstrennung.** Inhalte in den Index kann nur die jeweilige Datenverantwortliche
Fachbereichsleitung einbringen (über die Ingest-Strecke). Die Berechtigungsvergabe für NORA
erfolgt ausschließlich über das AD-Gruppenmodell, das durch die IT-Betrieb-Verzeichnisdienst-
Administration gepflegt wird. Beide Rollen sind personell getrennt; eine einzelne Person kann
die Sichtbarkeit vertraulicher Inhalte in NORA nicht allein herstellen.

## 4. Berechtigungsprozess

**1. Zeitpunkt der Berechtigungsprüfung.** Die Berechtigung wird ausschließlich zur Query-Zeit
geprüft — gegen das AD-Gruppenmodell in seinem aktuellen Stand. Eine Prüfung zur Indexierungszeit
findet nicht statt. Die Berechtigungsinformation im Index enthält die Dokument-zugehörige
AD-Gruppe, nicht Einzelpersonen-Entitlements.

**2. Quelle und Aktualität.** Active Directory der Nordwind Bank AG; Cache-TTL im NORA-System:
60 Sekunden. AD-Gruppenänderungen sind spätestens 60 Sekunden nach Umsetzung in NORA wirksam.

**3. Wirkung bei Berechtigungsentzug.** Bei Entzug einer Berechtigung (z. B. Ausscheiden eines
Mitarbeitenden) ist die Änderung ohne manuelle Intervention im NORA-System innerhalb von maximal
60 Sekunden wirksam.

**4. Schutz von Metadaten und Quellenangaben — Befund T1 und Nachbesserung.**
Im Testlauf T1 am 11.02.2026 (Negativ-Retrieval-Test) wurde festgestellt, dass die Quellenangaben
in der Systemantwort Dokumenttitel enthielten, auf die der Testnutzer keine Berechtigung hatte.
Die Antwort selbst war leer (kein Dokumentinhalt ausgegeben), jedoch zeigte die Quellenliste
den Titel des nicht berechtigten Dokuments. Ursache: die Anzeigekomponente für Quellenangaben
unterlag nicht demselben Berechtigungsfilter wie der Retrieval-Prozess.

Nachbesserung: Am 03.03.2026 wurde die Quellanzeige unter denselben Berechtigungsfilter wie
das Retrieval gestellt. Seitdem werden ausschließlich Titel von Dokumenten angezeigt, auf die
der anfragende Nutzer berechtigt ist. T1 wurde am 06.03.2026 im zweiten Anlauf bestanden.
Genehmigung der Änderung: A. Kellner + Dr. P. Ohlsen. Zwischen erstem Befund und bestandenem
Nachtest lagen 23 Tage; der Gremientermin wurde um einen Sitzungszyklus verschoben.

**5. Aggregationsrisiko.** Bewertet, als gering eingestuft. NORA beantwortet Fragen zu Regelungen;
eine Aggregation mehrerer Fragmente könnte theoretisch vertrauliche betriebliche Entscheidungslogik
sichtbar machen. Maßnahme: Systemanweisung schränkt Synthese über mehrere Dokumente hinweg ein.
ISB-Stellungnahme Dr. P. Ohlsen vom 14.01.2026: Restrisiko als tragbar bewertet.

**6. Administratorzugriffe auf den Vektorindex.** Administratorzugriffe können Inhalte aller
Berechtigungsgruppen lesbar machen. Kompensierende Maßnahmen: (a) Zugangsbeschränkung auf zwei
namentlich benannte Personen (A. Kellner, T. Brand); (b) Administratorzugriffe werden vollständig
protokolliert (s. Abschnitt 8); (c) Protokollzugriff nach Vier-Augen-Verfahren.

**Rezertifizierung.** Turnus: halbjährlich · Verantwortlich: Berechtigungsverantwortlicher
(Verzeichnisdienst-Administration) mit Freigabe durch M. Sørensen · Evidenz: Rezertifizierungsprotokoll
· Erste Rezertifizierung nach Go-live: November 2026.

## 5. Änderungswesen (Change)

| Änderungsart | Beispiel | Verfahren | Genehmigung durch | Erneute Tests |
|---|---|---|---|---|
| Software-Release | Anwendungsversion, Bibliotheksupdate | Standard-Change; Changelog in Versionsverwaltung | A. Kellner | Smoke-Test; Stichprobe Retrieval (10 Referenzfragen) |
| **Modellwechsel/-version** | Wechsel zu neuem LLM-Modell oder neuer Version bei Meridian AI | **Wesentliche Änderung** | M. Sørensen (Fachverantwortung) + Dr. P. Ohlsen (ISB) | Vollständiger Regressionslauf Referenzfragenkatalog nach [`06`](06-testnachweise.md); Leakage-Test (T1) |
| **Embedding-Modell** | Wechsel des lokalen Embedding-Modells | **Wesentliche Änderung** | M. Sørensen + Dr. P. Ohlsen | Vollständige Neuindexierung + Wiederholung T1 (Negativ-Retrieval) + Löschprüfung |
| **Prompt-/Systemanweisung** | Änderung der system-prompt-Regeln | **Wesentliche Änderung** | M. Sørensen + Dr. P. Ohlsen | Regressionslauf Antwortqualität; Prüfung auf Berechtigungsumgehung |
| **Neue Datenquelle** | Weiteres Quellsystem in den Index | **Wesentliche Änderung** | M. Sørensen + Dr. P. Ohlsen + R. Mattis (DSB) | Schutzbedarfsfeststellung ([`01`](../../akte/01-schutzbedarfsfeststellung.md)) neu bewerten; T1 wiederholen |
| Dokumentzugang | Einzelne Dokumente ergänzt oder entfernt | Regelbetrieb; Entscheidung durch Datenverantwortliche Fachbereichsleitung | M. Sørensen (für Richtliniendatenbank) | Stichprobe Retrieval; Löschkontrolle bei Entfernung |
| Parameter | Trefferanzahl (top-k), Score-Schwellenwert | Standard-Change; Begründung aktenkundig | A. Kellner | Qualitätsstichprobe (20 Referenzfragen) |
| **Anbieterseitige Änderung (BET-02, rot)** | Meridian AI aktualisiert Modell ohne Vorlaufankündigung | Automatischer wöchentlicher Regressionslauf erkennt Abweichung; Befund an A. Kellner und M. Sørensen; bei Score-Abweichung > 10 Prozentpunkte: Eskalation an Dr. P. Ohlsen; Entscheidung über Akzeptanz oder Eskalation an Vorstand | A. Kellner / M. Sørensen; bei wesentlicher Abweichung: Dr. P. Ohlsen | Wöchentlicher Regressionslauf (interim bis Auflage A3 erfüllt); nachträgliche Dokumentation jeder Abweichung |

**Anbieterseitige Änderungen — Restrisiko bis Auflage A3.** Der Vertrag mit Meridian AI enthält
keine Ankündigungsfrist für Modellaktualisierungen und keine Möglichkeit zur Versionsfixierung
(V13 in [`03`](03-auslagerung-drittparteien.md), Auflage A3). Das Leistungsverhalten kann sich
ohne Vorwarnung ändern. Bis zur Nachverhandlung ist ein automatisierter wöchentlicher
Regressionslauf als Kompensation eingerichtet. Referenzwert: Qualitätsscore 91,1 % (gemessen
24.06.2026). Abweichungen über 10 Prozentpunkte lösen eine Eskalation aus. Dieses Restrisiko
ist in [`07`](07-freigabevorlage.md) und [`03`](03-auslagerung-drittparteien.md), Abschnitt 8
ausgewiesen.

**Notfall-Change.** Verfahren nach interner IT-Betriebsrichtlinie Change 2.1 (Notfall) ·
Nachdokumentation binnen 24 Stunden · Genehmigung: A. Kellner + Kenntnis Dr. P. Ohlsen.

## 6. Wissensbasis-Pflege (Lifecycle der Inhalte)

| Frage | Antwort |
|---|---|
| Wer entscheidet über Aufnahme eines Dokuments? | Datenverantwortliche Fachbereichsleitung; für Richtliniendatenbank: M. Sørensen. Technische Umsetzung durch A. Kellner oder T. Brand. |
| Wie wird Aktualität sichergestellt? | Quellsysteme bleiben führendes System; NORA-Index wird täglich nachts synchronisiert. Bei Dokumentrückzug: Löschauftrag an Ingest-Strecke; bei Änderung: Neuindexierung des betroffenen Dokuments. |
| Wie werden veraltete Fassungen erkannt? | Metadatum „Gültig bis" wird aus der Richtliniendatenbank übernommen; abgelaufene Dokumente werden automatisch aus dem Index entfernt und im Tagesprotokoll ausgewiesen. |
| Was passiert mit zurückgezogenen Richtlinien? | Sofortige Entfernung aus dem Index; Löschprotokoll wird erstellt; Löschnachweis nach [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md). |
| Wie wird Dublettenbildung vermieden? | Dokument-ID aus dem führenden Quellsystem ist der eindeutige Schlüssel; ein Dokument kann nur einmal mit derselben ID im Index existieren. |
| Wie werden Quellen im Antworttext ausgewiesen? | Jede Antwort enthält Dokumenttitel, Gültigkeitsstand und direkten Link in das führende Quellsystem. |

## 7. Betriebsüberwachung

| Gegenstand | Kennzahl / Signal | Schwellenwert | Reaktion | Verantwortlich |
|---|---|---|---|---|
| Verfügbarkeit | Anteil erfolgreicher API-Anfragen je Stunde | < 99 % → Warnung; < 95 % → Incident P2 | Benachrichtigung A. Kellner; Eskalation P2 an COO-Ressort | A. Kellner |
| Antwortlatenz | p95-Latenz je Anfrage | > 8 Sekunden → Warnung; > 15 Sekunden → Incident P2 | Prüfung Engpass LLM-API oder RZ; Benachrichtigung A. Kellner | A. Kellner |
| Retrieval-Qualität | Wöchentlicher automatisierter Regressionslauf Referenzfragenkatalog (180 Fragen) | Score-Abweichung > 10 Prozentpunkte gegenüber Referenzwert 91,1 % | Befundmeldung an A. Kellner + M. Sørensen; Prüfung auf anbieterseitige Modelländerung; ggf. Eskalation | A. Kellner |
| Halluzinationsbefunde | Nutzerrückmeldungen über „Antwort war falsch"-Kanal (je Woche) | > 3 bestätigte Fehlmeldungen innerhalb von 7 Tagen | Prüfung Wissensbasis und Systemanweisung; ggf. Korrekturbedarf durch Datenverantwortliche | M. Sørensen |
| Ablehnungsquote | Anteil ungeantworteter Anfragen (no-hit oder Modellverweigerung) im Tagesdurchschnitt | > 15 % | Analyse A. Kellner; Information M. Sørensen | A. Kellner |
| Auffällige Abfragemuster | Häufige Anfragen zu gleichem Dokument von einer Nutzeridentität; systematische Abfragen nach Personendaten | > 50 Anfragen einer Nutzeridentität pro Stunde | Meldung an Dr. P. Ohlsen + R. Mattis; Protokollzugriff nach Vier-Augen-Verfahren | A. Kellner / Dr. P. Ohlsen |
| Kosten / Volumen | Monatliche API-Kosten Meridian AI | > 110 % des Planwertes (Planwert ca. 7.900 EUR/Monat) | Information C. Ahrens; Eskalation bei anhaltender Überschreitung | A. Kellner / C. Ahrens |

**Nutzerrückmeldung.** Der „Antwort war falsch"-Kanal in der NORA-Oberfläche löst eine Meldung
an M. Sørensen (Fachverantwortung) aus. Bewertung innerhalb von 3 Werktagen. Bei bestätigter
Falschauskunft: Prüfung des betroffenen Dokuments in der Wissensbasis; Änderungsauftrag an
A. Kellner falls Korrekturbedarf im Index besteht.

## 8. Protokollierung

| Was wird protokolliert | Zweck | Aufbewahrung | Zugriff auf das Protokoll |
|---|---|---|---|
| Anfrage (Prompt) | Nachvollziehbarkeit, Fehleranalyse, Berechtigungsnachvollziehbarkeit | 90 Tage | Ausschließlich über dokumentiertes Vier-Augen-Verfahren; Voraussetzungen: schriftlicher Antrag mit Begründung, Genehmigung durch Dr. P. Ohlsen (ISB) und R. Mattis (DSB) gemeinsam |
| Abgerufene Dokumente / Chunks | Nachweis der Berechtigungswirkung, Qualitätskontrolle | 90 Tage | Wie Prompt-Protokoll |
| Antwort | Nachvollziehbarkeit, Halluzinationsanalyse | 90 Tage | Wie Prompt-Protokoll |
| Nutzeridentität | Zuordenbarkeit bei Sicherheitsvorfällen | 90 Tage | Wie Prompt-Protokoll |
| Administrative Eingriffe (Zugriffe auf Index, Konfigurationsänderungen) | Revisionssicherheit | 12 Monate | A. Kellner + Gegenkontrolle Dr. P. Ohlsen; Lesezugriff I. Bruns (Interne Revision) |

Das Protokoll der Anfragen ist eine schutzbedürftige Verarbeitung personenbezogener Daten der
Beschäftigten. Das Vier-Augen-Verfahren für den Zugriff auf Prompt-Protokolle ist in einer
**Betriebsvereinbarung NORA-BV-2026-01 mit dem Betriebsrat der Nordwind Bank AG vom 27.03.2026** geregelt. Die
Betriebsvereinbarung definiert zulässige Zugriffsanlässe (Sicherheitsvorfall, gerichtliches
Verfahren, aufsichtsrechtliche Anforderung) und schließt routinemäßige Kontrolle des
Nutzerverhaltens ausdrücklich aus. Protokolldaten sind als eigene Datenklasse in
[`01`](../../akte/01-schutzbedarfsfeststellung.md) aufgenommen.

## 9. Schnittstellen zu anderen Verfahren

| Verfahren | Schnittstelle | Verweis |
|---|---|---|
| Notfallmanagement / BCM | Kill-Switch, Degradationsmodi, Wiederanlauf | [`05-notfallkonzept.md`](05-notfallkonzept.md) |
| Löschverfahren | Löschverlangen, Nachweisführung, Vektorindex-Kompaktierung (Auflage A1) | [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md) |
| Auslagerungsmanagement | Dienstleistersteuerung, SLA-Überwachung, Exit | [`03-auslagerung-drittparteien.md`](03-auslagerung-drittparteien.md) |
| Testnachweise | Wiederholungstests bei wesentlichen Änderungen, Regressionslauf | [`06-testnachweise.md`](06-testnachweise.md) |
| Informationssicherheitsvorfälle | Meldeweg bei Datenabfluss über Antworten oder Protokolle | Internes Verfahren IS-01 (Sicherheitsvorfallmanagement) |

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Zeigen Sie mir, wie die Berechtigung geprüft wird — zur Indexierungszeit oder zur
   Query-Zeit?"** Gefragt von S. Vogt (2nd Line) am 19.05.2026. Antwort: ausschließlich zur
   Query-Zeit gegen das aktuelle AD-Gruppenmodell (Abschnitt 4). S. Vogt hat anschließend nach
   T1 gefragt. Der Befund vom 11.02.2026 (Quellanzeige ohne Berechtigungsfilter) wurde erläutert;
   die Nachbesserung und der bestandene Wiederholungstest vom 06.03.2026 wurden vorgelegt.
   S. Vogt hat das als Positivbeispiel gewertet: Befund erkannt, nachgebessert, erneut getestet.

2. **„Ein Modellwechsel — ist das bei Ihnen ein Change?"** Gefragt von S. Vogt am 19.05.2026.
   Antwort: Ja, als wesentliche Änderung mit Genehmigung M. Sørensen + Dr. P. Ohlsen und
   vollständigem Regressionslauf (Abschnitt 5). S. Vogt hat explizit nach anbieterseitigen
   Änderungen gefragt. Ergebnis: Restrisiko erkannt; interim durch wöchentlichen Regressionslauf
   behandelt; Auflage A3 bis 30.09.2026.

3. **„Was passiert, wenn Meridian AI das Modell ohne Ankündigung aktualisiert?"** Gefragt von
   I. Bruns (Interne Revision, beratend) am 08.06.2026. Antwort: Wöchentlicher automatisierter
   Regressionslauf erkennt Qualitätsabweichungen; Eskalationsweg bei > 10 Prozentpunkten
   Abweichung ist definiert. Vollständige Steuerung nicht möglich bis A3 erfüllt; dieser Umstand
   ist in [`07`](07-freigabevorlage.md) ausgewiesen.

4. **„Wer darf die Prompt-Protokolle lesen, und wer kontrolliert das?"** Gefragt von R. Mattis
   (DSB) und I. Bruns unabhängig voneinander am 08.06.2026. Antwort: Zugriff ausschließlich nach
   Vier-Augen-Verfahren gemäß Betriebsvereinbarung NORA-BV-2026-01 vom 27.03.2026; Dr. P. Ohlsen und R. Mattis
   müssen gemeinsam genehmigen; keine Routinekontrolle des Nutzerverhaltens möglich.

5. **„Nennen Sie mir die letzten drei Änderungen am System und zeigen Sie mir die zugehörigen
   Genehmigungen."** Gefragt von I. Bruns am 08.06.2026. Antwort: (1) Berechtigungsfilter
   Quellanzeige, 03.03.2026, Genehmigung A. Kellner + Dr. P. Ohlsen; (2) Systemanweisung v1.1,
   25.03.2026, Genehmigung M. Sørensen + Dr. P. Ohlsen; (3) top-k Parameter 5 → 8, 02.05.2026,
   Genehmigung A. Kellner. I. Bruns hat die Dokumentation als vollständig bewertet.

## Offene Punkte

- **Systemverantwortung IT:** Übergang von A. Kellner (interim) auf regulären IT-Betrieb;
  Verantwortlich: CTO-Ressort; Zieltermin Q3 2026 (30.09.2026).
- **Auflage A3:** Bis zur Nachverhandlung der Ankündigungsfrist mit Meridian AI kein
  vollständiges Änderungswesen für anbieterseitige Modellaktualisierungen möglich; wöchentlicher
  Regressionslauf als Kompensation aktiv; Verantwortlich: C. Ahrens / Einkauf; Zieltermin
  30.09.2026.
- **Auflage A1 (Lösch-Kompaktierung):** Wöchentlicher Kompaktierungslauf mit Protokoll einrichten;
  Nachweis der Unumkehrbarkeit bis 30.09.2026; Verantwortlich: A. Kellner; Verweis auf
  [`06`](06-testnachweise.md).
- **Erste Rezertifizierung Berechtigungen:** Fällig November 2026; Verantwortlich:
  Berechtigungsverantwortlicher (Verzeichnisdienst-Administration) mit Freigabe M. Sørensen;
  Termin: 30.11.2026 (Wiedervorlage).

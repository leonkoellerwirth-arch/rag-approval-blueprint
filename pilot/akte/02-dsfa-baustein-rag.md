# 02 — DSFA-Baustein RAG

> **Wer benutzt dieses Dokument?** Der Datenschutzbeauftragte (DSB) gemeinsam mit der
> Fachverantwortung und der Informationssicherheit.
> **In welchem Prozess?** Das DSFA-/DPIA-Verfahren nach **Art. 35 DSGVO**
> (Datenschutz-Folgenabschätzung).
> **Wer prüft es?** Die interne Revision und ggf. die Aufsichtsbehörde. Der Baustein liefert
> außerdem die datenschutzrechtliche Grundlage für den
> [Löschnachweis](../../docs/loeschnachweis.md).

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden; Personen, Anbieter, Zahlen und Befunde sind konstruiert. Der Ablauf ist echt. Siehe [`../00-fallbeschreibung.md`](../00-fallbeschreibung.md).

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Datenschutzberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Ob für Ihre Verarbeitung überhaupt eine DSFA-Pflicht besteht,
> ist eine Einzelfallbewertung Ihres DSB. Siehe [`../../DISCLAIMER.md`](../../DISCLAIMER.md).

Dies ist die ausgefüllte Fassung für das Vorhaben **NORA** (Nordwind Richtlinien-Assistent) der
Nordwind Bank AG. Erstfassung vom 09.12.2025 durch R. Mattis (DSB); vorliegende Fassung vom
08.06.2026 nach Abschluss der Konfliktklärung (24.03.2026) und der Kontrollbewertung
(19.05.2026). Die leere Vorlage findet sich unter
[`../../akte/02-dsfa-baustein-rag.md`](../../akte/02-dsfa-baustein-rag.md).

*Alle Artikelangaben wurden im Juli 2026 gegen den Verordnungstext geprüft; siehe
[Quellen](../../docs/quellen.md).*

---

## 1. Verarbeitungsübersicht

| Feld | Inhalt |
|---|---|
| Bezeichnung der Verarbeitung | NORA — Nordwind Richtlinien-Assistent: Verarbeitung von Richtliniendokumenten und Nutzerfragen zur internen Richtlinienauskunft mittels Retrieval-Augmented Generation |
| Verantwortlicher | Nordwind Bank AG, Zentrale Bremen; fachlich verantwortlich M. Sørensen, Leitung Organisation |
| Zweck | Beantwortung interner Fragen zu Richtlinien, Arbeitsanweisungen und Prozessbeschreibungen; Entlastung der Organisationsabteilung von wiederkehrenden Regelungsanfragen |
| Betroffene Personengruppen | (a) Beschäftigte als Nutzende — 1.200 Personen; der Prompt-Log verbindet Nutzeridentität mit Frageinhalt. (b) In Dokumenten genannte Personen — Funktionsträger und Ansprechpartner in Prozessbeschreibungen und Dienstvereinbarungen, die das System nicht nutzen und über die Verarbeitung in den Quellsystemen informiert werden mussten. |
| Kategorien personenbezogener Daten | Berufsbezeichnung, Abteilungszugehörigkeit (aus Dokumenten); Nutzerkennung, Frageinhalt im Klartext, Zeitstempel (aus Prompt-Log) |
| Besondere Kategorien (Art. 9 DSGVO) | Grundsätzlich nein. Nicht auszuschließen, dass Frageninhalte mittelbar Art. 9-Merkmale offenbaren (z. B. Frage zu Mutterschutz- oder Schwerbehindertenausgleichsregelungen). Maßnahme: 90-Tage-Aufbewahrungsfrist für den Prompt-Log; kein über Betrieb und Sicherheit hinausgehender Auswertungszweck. |
| Rechtsgrundlage (Art. 6 DSGVO) | Beschäftigte als Nutzende: Art. 6 Abs. 1 lit. b DSGVO — NORA ist ein Arbeitsmittel, das die Auskunft über geltende Dienstpflichten unterstützt und damit zur Durchführung des Beschäftigungsverhältnisses erforderlich ist. In Dokumenten genannte Personen: Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse der Bank, interne Prozessdokumentation auffindbar zu halten; überwiegt mangels entgegenstehender Interessen der Betroffenen, da die Dokumente bereits in den Quellsystemen veröffentlicht waren. |
| Auftragsverarbeiter (Art. 28 DSGVO) | Meridian AI B.V., Amsterdam — Antworterzeugung (LLM-Inferenz, EU-Region Frankfurt). AVV abgeschlossen (Vertragsstand 15.01.2026). Verweis auf [`03-auslagerung-drittparteien.md`](03-auslagerung-drittparteien.md). |
| Drittlandbezug (Art. 44–49 DSGVO) | Mittelbar: technischer 24/7-Support von Meridian AI über einen Partner mit Standort außerhalb der EU, mit potenziellem Zugriff auf Systemprotokolle. Sachverhalt und Resolution unter Abschnitt 6, R8 sowie [`03-auslagerung-drittparteien.md`](03-auslagerung-drittparteien.md). |
| Eintrag im Verzeichnis (Art. 30 DSGVO) | VVT-Eintrag Nr. 2025-114, genehmigt durch R. Mattis (DSB) am 19.01.2026 |
| DSFA-Pflicht bejaht? | **Ja** — R. Mattis am 09.12.2025. Begründung: (1) systematische Verarbeitung von Beschäftigtendaten; (2) Einsatz neuer Technologie (Vektorisierung, generative KI); (3) umfangreiche Verarbeitung (alle 1.200 Beschäftigten als Nutzende). Kombination der drei Kriterien begründet die Pflicht nach Art. 35 Abs. 1 DSGVO. |

**Zur übersehenen Personengruppe.** In den 812 Korpus-Dokumenten werden in
Prozessbeschreibungen und Dienstvereinbarungen namentlich Funktionsträger genannt — etwa der
Geldwäsche-Beauftragte, Datenschutzbeauftragte, Filialdirektoren. Diese Personen sind Betroffene
der Verarbeitung, ohne Nutzende des Systems zu sein. Sie wurden mit Inkrafttreten der
aktualisieren internen Datenschutzinformation (09.03.2026) erfasst; ein eigener Hinweis auf NORA
wurde in die hausinterne Datenschutzinformation eingebaut.

## 2. Die RAG-spezifischen Verarbeitungsschritte

| Schritt | Was datenschutzrechtlich passiert | Bewertung für NORA |
|---|---|---|
| Aufnahme in die Wissensbasis | Zweckänderung gegenüber dem Quellsystem | Vereinbarkeit bejaht: Die Dokumente wurden für interne Regelkommunikation erstellt; NORA dient demselben Zweck in einer anderen Modalität. Mitarbeitende, die Adressaten der Regelungen sind, erhalten deren Inhalt über NORA — das entspricht dem ursprünglichen Informationszweck. |
| Chunking | Kontextverlust; Fragmente ohne sichtbare Herkunft | Risiko der Fehlinterpretation (Art. 5 Abs. 1 lit. d DSGVO). Gemindert durch: Quellenbindung (NORA gibt die Fundstelle mit jeder Antwort aus); Nutzungshinweis im Interface, dass Fragmente kein Ersatz für die vollständige Richtlinie sind. |
| Embedding-Erzeugung | Erzeugung einer neuen Repräsentation des Textfragments | **Im Haus, kein Dritter beteiligt** (eigenbetriebenes Modell, Rechenzentrum Bremen). Datenschutzrechtliche Einordnung: Embedding teilt den Personenbezug des Ausgangsfragments — siehe Abschnitt 3. |
| Indexierung | Dauerhafte Speicherung der Vektoren | Speicherort: Rechenzentrum Bremen, eigenbetrieben, eigener Dateizugriff möglich. Löschbarkeit: eingeschränkt bis Auflage A1 (physische Kompaktierung bis 30.09.2026); bis dahin gilt funktionaler Löschnachweis per Negativ-Retrieval-Test T1 (bestanden 06.03.2026). |
| Retrieval | Zusammenführung über Dokumentgrenzen hinweg | Aggregationsrisiko bewertet in [`01-schutzbedarfsfeststellung.md`](01-schutzbedarfsfeststellung.md), Abschnitt 4. A3-Maßnahme (Ausschluss von Schwellenwert-Passagen) reduziert das Aggregationspotenzial strukturell. |
| Übergabe an das LLM | Übermittlung von Fragmenten + Nutzerfrage an Meridian AI B.V. | Training ausgeschlossen: AVV § 7 Abs. 3 schließt jede Nutzung übermittelter Prompts für Modelltraining oder -verbesserung aus. Technisch bestätigt: anbieterseitiges Prompt-Content-Logging auf Metadaten beschränkt ab 24.03.2026. |
| Antworterzeugung | Neue Aussage über Personen oder Sachverhalte möglich | Richtigkeitsgrundsatz (Art. 5 Abs. 1 lit. d DSGVO): Quellenbindung macht Fehler nachvollziehbar und korrigierbar. Korrekturweg: Meldung über Service-Desk → T. Brand (Projektleitung) koordiniert Nachindexierung oder Quelldokument-Korrektur. |
| Protokollierung | Verhaltensdaten der Nutzenden | Eigenständige Verarbeitung — Abschnitt 5. |

## 3. Sind Embeddings personenbezogene Daten?

| Frage | Bewertung |
|---|---|
| Enthalten die indexierten Fragmente Personenbezug? | Ja — mittelbar in D1 und D2 (Funktionsbezeichnungen); unmittelbar in Einzelfällen in D3 (namentliche Nennungen von Funktionsträgern in Dienstvereinbarungen); unmittelbar in D4 (Nutzerkennung im Prompt-Log). |
| Welche Rekonstruktionsmöglichkeiten wurden betrachtet? | (1) Ähnlichkeitsbasierte Inversion über den eigenen Index (bekannt aus Literatur; setzt Zugriff auf den Index voraus). (2) Rekonstruktion durch Zugriff auf Rohvektoren mit dem gleichen Embedding-Modell — sogenannte Ghost-Vectors-Methode, dokumentiert in Chakraborttii et al., arXiv:2606.18497, 16.06.2026 (Existenz, Titel und Kernaussage geprüft). Fazit: vollständige Rekonstruktion setzt administrativen Zugriff auf Rohindex und Modell voraus; dieser Zugriff ist auf zwei benannte Systemadmins beschränkt. |
| Wer hat Zugriff auf die Rohvektoren (auch administrativ)? | Zwei Systemadministratoren (namentlich in [`04-betriebskonzept.md`](04-betriebskonzept.md), Abschnitt 6 aufgeführt); Dr. P. Ohlsen (ISB) mit Lesezugriff für Prüfzwecke. Kein Produktivnutzer hat Zugriff auf Rohvektoren. |
| Einordnung des Verantwortlichen | **Personenbezogen** — soweit das Ausgangsfragment Personenbezug trägt, teilt das Embedding diesen Personenbezug. Die Bank folgt der vorsichtigen, in der Praxis tragfähigen Einordnung und der Linie von EDPB Opinion 28/2024 und DSK-Orientierungshilfe vom 06.05.2024. Eine gegenteilige technische Einzelfallbewertung liegt nicht vor und wäre mit erheblichem Begründungsaufwand verbunden. |
| Konsequenz für Löschung, Auskunft und Berichtigung | Löschung: [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md); bis Auflage A1 (30.09.2026) funktionaler Nachweis. Auskunft: Weg über Quellsysteme (Abschnitt 4). Berichtigung: Korrektur im Quelldokument plus manuell getriggerter Re-Ingest des betroffenen Dokuments, max. 72 Stunden. |

**Einschlägige Orientierungshilfen** (verifiziert 07/2026, Fundstellen in [Quellen](../../docs/quellen.md)):

- **EDPB, Opinion 28/2024** vom 18.12.2024 zu datenschutzrechtlichen Aspekten der Verarbeitung
  personenbezogener Daten im Kontext von KI-Modellen — behandelt insbesondere, unter welchen
  Bedingungen ein Modell als anonym gelten kann.
- **EDPB, „AI Privacy Risks & Mitigations – Large Language Models (LLMs)"** vom 10.04.2025 —
  Risikomethodik und Maßnahmen für LLM-basierte Systeme.
- **DSK, Orientierungshilfe „Künstliche Intelligenz und Datenschutz"** vom 06.05.2024.

## 4. Betroffenenrechte — praktische Umsetzung

| Recht | Artikel | Umsetzung im NORA-System | Nachweis |
|---|---|---|---|
| Auskunft | Art. 15 DSGVO | Primärer Weg: Die betroffene Person benennt sich beim DSB; dieser ermittelt über die drei Quellsysteme, in welchen Dokumenten die Person vorkommt; die Index-Fragmente werden daraus abgeleitet. Eine direkte semantische Suche im Vektorindex nach Personennamen wird als nicht vollständig zuverlässig eingestuft und nicht als primärer Weg angeboten. Für Nutzende: Auskunft über eigene Prompt-Log-Einträge auf Antrag innerhalb von 30 Tagen (Service-Desk-Ticket an R. Mattis). | Verfahrensbeschreibung in [`04-betriebskonzept.md`](04-betriebskonzept.md), Abschnitt 9. Testfall noch ausstehend (Offener Punkt). |
| Berichtigung | Art. 16 DSGVO | Korrektur im Quelldokument durch den jeweiligen Dokumenteigentümer unter Koordination von M. Sørensen; anschließend manuell getriggerter Re-Ingest. Zeitrahmen: max. 72 Stunden nach Eingang des Berichtigungsersuchens. | Prozess in [`04-betriebskonzept.md`](04-betriebskonzept.md), Abschnitt 7.2 beschrieben. |
| Löschung | Art. 17 DSGVO | Vollständig beschrieben in [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md). Bis Auflage A1 (30.09.2026): funktionaler Nachweis über Negativ-Retrieval-Test. Löschtest T3 am 28.04.2026 nur teilweise bestanden — Indexebene noch offen (Auflage A1). | Löschprotokoll je Löschvorgang. |
| Einschränkung | Art. 18 DSGVO | Technisch umgesetzt durch Deaktivierung des Berechtigungs-Flags für das betroffene Dokument im Index — das Fragment wird nicht mehr retrieved, bleibt aber im Index erhalten. Nutzbar bei strittiger Richtigkeit bis Abschluss der Korrektur. | Konfigurationsänderung durch Systemadmin, protokolliert. |
| Widerspruch | Art. 21 DSGVO | Widerspruch gegen die Protokollierung: technisch nicht vollständig trennbar, da das Protokoll Sicherheits- und Auditzwecken dient (DORA Art. 10). Begrenzte Maßnahme: Einträge können auf Antrag nach der regulären Frist vorgezogen gelöscht werden. R. Mattis bewertet das verbleibende Spannungsfeld als unter der Betriebsvereinbarung vertretbar. | Betriebsvereinbarung NORA-BV-2026-01 vom 27.03.2026. |
| Keine automatisierte Einzelentscheidung | Art. 22 DSGVO | **Nicht einschlägig.** NORA erzeugt Auskünfte, trifft keine Entscheidungen im Sinne von Art. 22. Beschäftigte handeln auf Grundlage der Auskunft, aber die Entscheidung verbleibt beim Menschen. Ausdrücklich festgehalten, da die Frage in jeder Prüfung kommt. | Zweckbeschreibung System-Dokumentation, Abschnitt 1. |

**Zur Auskunft.** Ein Auskunftsersuchen verlangt Vollständigkeit. Im Vektorindex lässt sich
Vollständigkeit über eine Ähnlichkeitssuche nicht zusichern. Der Weg über die Quellsysteme ist
deshalb der gewählte primäre Weg. Das Verfahren muss vor dem Wiedervorlage-Termin an einem
Testfall erprobt werden — dies ist Offener Punkt (s.u.).

## 5. Protokollierung als eigene Verarbeitung

| Frage | Antwort |
|---|---|
| Was wird protokolliert? | Nutzerkennung (Kürzel und technische User-ID), Zeitstempel (Millisekundengenau), Frage im Klartext, IDs der abgerufenen Fragmente (k ≤ 5), generierte Antwort. Kein biometrisches, kein standortbezogenes Datum. Verweis auf [`04-betriebskonzept.md`](04-betriebskonzept.md), Abschnitt 8. |
| Zweck der Protokollierung | (1) Betriebsüberwachung und Fehlerdiagnose; (2) Nachweis der Berechtigungsprüfung zur Query-Zeit; (3) Grundlage für Auskunftsersuchen nach Art. 15 DSGVO; (4) Sicherheitsaudit. Ausdrücklich kein Zweck: Leistungs- oder Verhaltenskontrolle der Beschäftigten. |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. b DSGVO in Verbindung mit der Betriebsvereinbarung NORA-BV-2026-01. |
| Aufbewahrungsfrist und Löschung | 90 Tage ab Erfassung; automatisierte Löschung. Bei laufenden Sicherheitsvorfällen: Einfrierung des betroffenen Log-Bereichs bis Abschluss des Vorgangs, maximal 24 Monate. |
| Wer darf Protokolle einsehen? | ISB (Dr. P. Ohlsen) und zwei benannte Systemadmins: für technischen Betrieb und Sicherheitsanalyse. Führungskräfte und Fachverantwortung (M. Sørensen): kein Zugriff auf individuelle Protokolleinträge. DSB (R. Mattis): Einsicht zu Prüfzwecken. Interne Revision (I. Bruns): nach Ankündigung, beschränkt auf benötigte Stichproben. |
| Ausschluss der Verhaltens- und Leistungskontrolle | Technisch: Berechtigungsgruppe „Protokoll-Auswertung" schließt alle Führungsrollen aus. Jede Abfrage, die einen Nutzer mit seinem Frageinhalt verbindet, erfordert schriftliche ISB-Genehmigung (Dr. P. Ohlsen) und wird selbst protokolliert. Organisatorisch: in der Betriebsvereinbarung ausdrücklich verboten. |
| Mitbestimmung eingebunden? | **Ja — Betriebsvereinbarung abgeschlossen.** Betriebsvereinbarung NORA-BV-2026-01 unterzeichnet am 27.03.2026 von Vorstand und Betriebsrat (Verhandlung 12.03.2026). Regelungsinhalt: Protokollierungsumfang, Aufbewahrungsfrist, Zugriffsrechte, Verbot der Verhaltenskontrolle, Verfahren bei Auskunftsersuchen. |

## 6. Risikobewertung

Bewertet nach der internen Risikominimierungsmethodik der Nordwind Bank AG; Skala: Eintritt
niedrig / mittel / hoch; Schwere niedrig / mittel / hoch. Alle RAG-spezifischen Risiken sind
nachfolgend aufgeführt, auch wenn sie als gering eingestuft werden.

| # | Risiko für die Rechte und Freiheiten | Eintritt | Schwere | Maßnahme | Restrisiko |
|---|---|---|---|---|---|
| R1 | Offenlegung an nicht berechtigte Beschäftigte durch fehlende oder fehlerhafte Query-Zeit-Prüfung | mittel | hoch | Berechtigungsprüfung zur Query-Zeit gegen Verzeichnisdienst-Gruppenmodell; Testlauf T1 im zweiten Anlauf bestanden (06.03.2026); Kontrolle `ZUG-01` grün | niedrig |
| R2 | Rekonstruktion gelöschter Inhalte aus dem Vektorindex (Ghost-Vectors-Szenario) | niedrig | hoch | Zugriff auf Rohvektoren auf zwei Admins beschränkt; funktionaler Negativ-Retrieval-Test T1 bestanden; **Auflage A1** (physische Kompaktierung bis 30.09.2026 — Kontrolle `LOE-02` rot) | **mittel** bis Auflage A1 erfüllt |
| R3 | Unvollständige Löschung über Backups, Caches, Betriebslogs | mittel | mittel | Backup-Retention: 30 Tage (rollierend überschrieben); Betriebslog enthält Fragment-IDs, keine Rohvektoren; Löschkonzept in [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md) beschrieben | niedrig |
| R4 | Falsche Aussage über eine Person — Verstoß gegen Richtigkeitsgrundsatz (Art. 5 Abs. 1 lit. d DSGVO) | mittel | mittel | Quellenbindung (jede Antwort enthält Fundstellenangabe); Korrekturweg über Service-Desk → Re-Ingest; Nutzungshinweis: NORA ist Retrievalhilfe, kein Rechtsgutachten | niedrig |
| R5 | Aggregation zu einem Persönlichkeitsprofil aus Prompt-Logs | niedrig | hoch | Zugriffsverfahren (nur ISB + DSB); Betriebsvereinbarung; 90-Tage-Aufbewahrungsfrist; ISB-Genehmigungspflicht für nutzerindividuelle Abfragen | niedrig |
| R6 | Zweckänderung gegenüber dem Quellsystem | niedrig | niedrig | Zweckvereinbarkeit geprüft (Abschnitt 2): NORA dient demselben Informationszweck wie die Quellsysteme; VVT-Eintrag dokumentiert. | niedrig |
| R7 | Übermittlung an Meridian AI über vereinbarten Zweck hinaus (Training, Modellverbesserung) | mittel | hoch | AVV § 7 Abs. 3: Training und Modellverbesserung aus NORA-Prompts ausgeschlossen; anbieterseitiges Prompt-Content-Logging auf Metadaten beschränkt (Maßnahme 24.03.2026); Prüfbarkeit: halbjährliche Vertragskontrolle durch C. Ahrens | niedrig |
| R8 | Drittlandübermittlung ohne tragfähige Grundlage — technischer 24/7-Support über Partner außerhalb der EU mit potenziellem Zugriff auf Systemprotokolle | hoch | hoch | **(1) Sofortmaßnahme (24.03.2026):** anbieterseitiges Prompt-Content-Logging auf Metadaten beschränkt — der Inhalt, über dessen Übermittlung gestritten wurde, wird nicht mehr auf Anbieterseite erfasst. **(2) Auflage A2:** vertragliche Beschränkung des Support-Zugriffs auf EU-Personal, schriftliche Bestätigung von Meridian AI B.V. bis 30.09.2026. Die abweichende Einschätzung von R. Mattis (Drittstaaten-Übermittlung liegt bereits im Support-Zugriffsweg) und C. Ahrens (Nebentätigkeit mit eng begrenztem Zugriff) wurde in der Sitzung vom 24.03.2026 durch die Aufteilung in Sofortmaßnahme und Auflage überbrückt. | **mittel** bis Auflage A2 erfüllt; Restrisiko wird vom Vorstand getragen. R. Mattis hält ausdrücklichen Vorbehalt in Abschnitt 8. |
| R9 | Verhaltens- oder Leistungskontrolle durch Prompt-Protokolle | hoch | hoch | Betriebsvereinbarung NORA-BV-2026-01 (Verbot ausdrücklich); technische Zugangsbeschränkung (Führungsrollen ohne Protokollzugriff); ISB-Genehmigungspflicht für nutzerindividuelle Abfragen; 90-Tage-Frist | niedrig |
| R10 | Preisgabe von Index-Inhalten durch Prompt-Manipulation (Prompt Injection) | niedrig | mittel | Input-Sanitisierung (keine Steuerungszeichen in Nutzerfrage); NORA gibt ausschließlich retrievalgebundene Antworten; anbieterseitige Guardrails vertraglich verankert (AVV Anlage B) | niedrig |

## 7. Technische und organisatorische Maßnahmen (Art. 32 DSGVO)

| Maßnahme | Umsetzung | Kontrollbezug |
|---|---|---|
| Berechtigungsprüfung zur Query-Zeit | LDAP-Gruppenabfrage vor jedem Retrieval; Metadaten nicht berechtigter Ressourcen werden nicht ausgegeben (nach Nachbesserung 06.03.2026) | `ZUG-01`, `ZUG-02` |
| Verschlüsselung in Transport und Speicher | TLS 1.3 für alle externen Verbindungen einschließlich Meridian AI; AES-256 für Indexdateien im Rechenzentrum Bremen; Backups verschlüsselt | `ZUG-03` |
| Löschkonzept inkl. Index und Ableitungen | [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md); bis Auflage A1 (30.09.2026): funktionaler Nachweis per Negativ-Retrieval | `LOE-01`–`LOE-04` |
| Protokollierung und Zugriffsbeschränkung | 90-Tage-Frist; Zugriffsrollen technisch eingeschränkt; ISB-Genehmigungspflicht für nutzerindividuelle Abfragen; Betriebsvereinbarung | `AUD-01`, `AUD-02` |
| Datenminimierung im Index | Ausschlussliste für Schwellenwertpassagen (A3-Maßnahme); keine Aufnahme von Entwürfen oder unveröffentlichten Fassungen | `KLA-01`, `KLA-02` |
| Auftragsverarbeitung vertraglich geregelt | AVV mit Meridian AI B.V. (Vertragsstand 15.01.2026); Trainingsausschluss in § 7 Abs. 3; Auflage A2 für Support-Zugriffsbeschränkung | `AUS-01` |
| Datenschutz durch Technikgestaltung (Art. 25 DSGVO) | Embedding-Erzeugung im Haus (kein Dritter für sensible Daten); anbieterseitiges Prompt-Content-Logging auf Metadaten beschränkt; Berechtigungsprüfung als Eingangsbedingung, nicht als nachgelagerte Filterung | — |

## 8. Ergebnis

| Feld | Inhalt |
|---|---|
| Verbleibendes Gesamtrisiko | **Mittel** — zwei Risikopositionen verbleiben über dem Zielwert bis zum jeweiligen Auflage-Fristende: R2 (physische Indexlöschung offen, Auflage A1, Frist 30.09.2026) und R8 (vertragliche EU-Beschränkung des Support-Zugriffs offen, Auflage A2, Frist 30.09.2026). Beide sind in Auflagen überführt und vom Vorstand als Restrisiko angenommen (Beschluss 24.06.2026). |
| Vorherige Konsultation der Aufsichtsbehörde nach Art. 36 DSGVO erforderlich? | **Nein.** Die verbleibenden erhöhten Risiken (R2, R8) wurden durch technische und vertragliche Maßnahmen auf ein mittleres Niveau gebracht. Art. 36 DSGVO setzt voraus, dass trotz aller Maßnahmen ein hohes Restrisiko verbleibt; das ist hier nicht der Fall. Einschätzung R. Mattis, 08.06.2026. |
| Stellungnahme des DSB | R. Mattis empfiehlt **Freigabe unter Auflagen** mit folgendem ausdrücklichem Vorbehalt: Auflage A2 (vertragliche Beschränkung des Support-Zugriffs auf EU-Personal, schriftliche Bestätigung durch Meridian AI B.V.) ist bis 30.09.2026 zu erfüllen und dem DSB nachzuweisen. Bis dahin verbleibt R8 als dokumentiertes, vom Vorstand getragenes Restrisiko. Bei Nichterfüllung von A2 bis 30.09.2026 behält sich R. Mattis vor, eine nachträgliche Konsultation nach Art. 36 DSGVO anzustoßen und die Freigabeempfehlung zu überprüfen. Datum der Stellungnahme: 08.06.2026. |
| Beteiligung der Mitbestimmung | Abgeschlossen — Betriebsvereinbarung NORA-BV-2026-01, unterzeichnet 27.03.2026. |
| Empfehlung | **Freigabe unter Auflagen** (A1, A2; weitere Auflagen A3 und A4 aus Freigabevorlage) |
| Wiedervorlage | 30.11.2026 (Vorstandsbeschluss 24.06.2026); vorzeitig, wenn A2 bis 30.09.2026 nicht erfüllt. |

---

## Was die prüfende Funktion hier gefragt hat

1. **I. Bruns (Interne Revision, beratend, 19.05.2026): „Sind Embeddings für Sie personenbezogene
   Daten — und wie begründen Sie das?"** — R. Mattis: Die Bank bejaht dies für alle Fragmente,
   deren Ausgangsmaterial Personenbezug trägt. Begründung: Ghost-Vectors-Studie
   (Chakraborttii et al., arXiv:2606.18497) und EDPB Opinion 28/2024 zeigen, dass Rekonstruktion
   mit vertretbarem Aufwand möglich ist, wenn Zugriff auf den Index und das Modell besteht. Die
   vorsichtige Einordnung ist die einzige haltbare, solange keine institutsspezifische
   Gegenstudie vorliegt. „Das ist nur ein Zahlenvektor" trägt in keiner Prüfung.

2. **I. Bruns (Interne Revision, beratend, 19.05.2026): „Zeigen Sie mir, wie Sie ein
   Auskunftsersuchen zu einer im Korpus genannten Person beantworten — konkret."** — R. Mattis:
   Weg über Quellsysteme beschrieben (Abschnitt 4); ein realer Testfall wurde noch nicht
   durchgeführt. Das ist ein offener Punkt — I. Bruns hat darauf hingewiesen, dass ein
   unbetriebenes Verfahren in der Prüfung nicht als umgesetzt gilt.

3. **S. Vogt (2nd Line, 19.05.2026): „Woraus ergibt sich, dass Meridian AI Ihre Prompts nicht
   zum Training verwendet?"** — T. Brand: AVV § 7 Abs. 3 (Vertragsstand 15.01.2026), nicht die
   Marketingdokumentation. Zusätzlich technisch bestätigt: anbieterseitiges Prompt-Content-Logging
   auf Metadaten beschränkt seit 24.03.2026.

4. **S. Vogt (2nd Line, 19.05.2026): „Welche Personen stehen im Korpus, die das System nicht
   nutzen?"** — R. Mattis: Funktionsträger, die namentlich in Prozessbeschreibungen und
   Dienstvereinbarungen erscheinen. Diese Gruppe ist als eigene Betroffenengruppe in Abschnitt 1
   aufgeführt; der interne Datenschutzhinweis wurde am 09.03.2026 entsprechend ergänzt.

5. **Betriebsrat (Verhandlung 12.03.2026) und S. Vogt (19.05.2026): „Wie ist ausgeschlossen,
   dass Prompt-Protokolle zur Leistungskontrolle verwendet werden?"** — R. Mattis: Technisch
   durch Berechtigungsgruppen (Führungsrollen ohne Protokollzugriff); organisatorisch durch
   Betriebsvereinbarung NORA-BV-2026-01 (Verbot ausdrücklich); ISB-Genehmigungspflicht für
   nutzerindividuelle Abfragen; die Abfrage selbst wird protokolliert.

## Offene Punkte

- **Auskunftsersuchen-Testfall:** Das in Abschnitt 4 beschriebene Verfahren (Weg über
  Quellsysteme) muss vor der Wiedervorlage an einem realen Testfall erprobt werden. I. Bruns hat
  in der Sitzung vom 19.05.2026 darauf hingewiesen, dass ein nicht erprobtes Verfahren in der
  Prüfung nicht als umgesetzt gilt. Verantwortung: R. Mattis (DSB), Zieltermin: 31.08.2026.

- **Auflage A2 — vertragliche Beschränkung des Support-Zugriffs auf EU-Personal:** Schriftliche
  Bestätigung von Meridian AI B.V. steht aus. Verantwortung: C. Ahrens (Auslagerungsmanagement),
  Frist: 30.09.2026. Bei Nichterfüllung: Wiedervorlage an DSB und Vorstand; R. Mattis prüft
  nachträgliche Konsultation nach Art. 36 DSGVO.

- **Auflage A1 — physische Indexkompaktierung:** Wöchentlicher Kompaktierungslauf mit Protokoll
  und Nachweis der Unumkehrbarkeit müssen bis 30.09.2026 eingerichtet sein. Verantwortung:
  A. Kellner (Enterprise-Architekt) und T. Brand (Projektleitung); Nachweis an Dr. P. Ohlsen (ISB).

- **VVT-Aktualisierung:** Nach Erfüllung von A1 und A2 ist VVT-Eintrag Nr. 2025-114 durch
  R. Mattis zu aktualisieren. Termin: nach Maßnahmenschluss, spätestens 31.10.2026.

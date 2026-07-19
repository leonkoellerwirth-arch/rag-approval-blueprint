# 01 — Schutzbedarfsfeststellung RAG-System

> **Wer benutzt dieses Dokument?** Informationssicherheit (ISB/CISO) gemeinsam mit den
> Datenverantwortlichen der einbezogenen Quellsysteme.
> **In welchem Prozess?** Schutzbedarfs- und Sicherheitsfreigabeprozess — der erste Schritt, aus
> dem sich alle weiteren Maßnahmen ableiten.
> **Wer prüft es?** 2nd Line, interne Revision und der Datenschutz. Aus diesem Dokument leiten
> sich die Anforderungen in [`04`](04-betriebskonzept.md) und [`05`](05-notfallkonzept.md) ab;
> wer hier zu niedrig einstuft, bekommt die Diskussion später im Gremium zurück.

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden; Personen, Anbieter, Zahlen und Befunde sind konstruiert. Der Ablauf ist echt. Siehe [`../00-fallbeschreibung.md`](../00-fallbeschreibung.md).

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Siehe [`../../DISCLAIMER.md`](../../DISCLAIMER.md).

Dies ist die ausgefüllte Fassung für das Vorhaben **NORA** (Nordwind Richtlinien-Assistent) der
Nordwind Bank AG. Erstfassung vom 21.10.2025 durch Dr. P. Ohlsen (ISB); vorliegende Fassung vom
19.05.2026 nach Abschluss der Kontrollbewertung durch S. Vogt (2nd Line). Die leere Vorlage
findet sich unter [`../../akte/01-schutzbedarfsfeststellung.md`](../../akte/01-schutzbedarfsfeststellung.md).

Die eine Besonderheit, die RAG von anderen Anwendungen unterscheidet: Der Schutzbedarf entsteht
nicht nur aus den Daten, die das System speichert, sondern aus dem, was es aus ihnen **ableiten
und zusammenführen** kann. Eine Feststellung, die nur die Datenklassen der Quellsysteme abschreibt,
greift zu kurz.

---

## 1. Gegenstand

| Feld | Inhalt |
|---|---|
| System | NORA — Nordwind Richtlinien-Assistent |
| Fachlicher Zweck | Beantwortung von Mitarbeiterfragen zu internen Richtlinien, Arbeitsanweisungen und Prozessbeschreibungen; Ausgabe der Fundstelle mit jeder Antwort |
| Fachverantwortung | M. Sørensen, Leitung Organisation |
| Nutzerkreis | Alle 1.200 Beschäftigten der Nordwind Bank AG; kein kundenseitiger und kein öffentlicher Zugriff |
| Einbezogene Quellsysteme | Richtliniendatenbank (zentrale Ablage), Intranet-Handbuch, Ablage der Organisationsabteilung — insgesamt 812 Dokumente zum Stichtag 19.05.2026 |
| Betriebsmodell | Hybrid: Ingest, Chunking, Embedding-Modell und Vektorindex eigenbetrieben im Rechenzentrum Bremen; Antworterzeugung (LLM-Inferenz) eingekauft bei Meridian AI B.V., Amsterdam |
| Externe Verarbeitung | Ausschließlich Antworterzeugung — Fragmente und Nutzerfrage werden als Prompt an Meridian AI B.V. übermittelt (EU-Region Frankfurt). Embedding-Erzeugung verbleibt vollständig im Haus. Verweis auf [`03-auslagerung-drittparteien.md`](03-auslagerung-drittparteien.md). |
| Datum der Erstfeststellung | 21.10.2025 |
| Datum der vorliegenden Fassung | 19.05.2026 |
| Nächste Überprüfung | 30.11.2026 (Wiedervorlage-Termin, Vorstandsbeschluss 24.06.2026) oder bei wesentlicher Änderung des Korpus (neue Quellsysteme, Erweiterung des Nutzerkreises, Änderung des Betriebsmodells) |

## 2. Datenklassen im System

| # | Datenklasse | Beispielinhalte | Quelle | Personenbezug | Besondere Kategorien (Art. 9 DSGVO)? |
|---|---|---|---|---|---|
| D1 | Allgemeine Arbeitsanweisungen und Prozessbeschreibungen | Ablaufbeschreibungen operativer Prozesse, Zuständigkeitstabellen, Formularvorlagen | Intranet-Handbuch, Ablage Organisation | mittelbar (Funktionsbezeichnungen; keine Namen) | nein |
| D2 | Interne Richtlinien mit Kontroll- und Schwellenwerten | Geldwäsche-Richtlinie (interne Meldeschwellen, Eskalationsgrenzen über dem gesetzlichen Mindest), Kreditvergabe-Richtlinie (interne Bonitätsgrenzen), Betrugserkennungsregeln | Richtliniendatenbank | mittelbar (Regelungsadressaten, keine Einzelpersonen) | nein |
| D3 | Personalbezogene Regelungen | Vergütungsordnung (Eingruppierungsschemata, keine Einzelvergütungen), Dienstvereinbarungen, Nebentätigkeitsregeln, Datenschutzpolicies für Beschäftigte | Richtliniendatenbank, Ablage Organisation | ja — Regelungen richten sich an identifizierbare Gruppen; einzelne Passagen nennen Funktionsträger namentlich | nein |
| D4 | Systemprotokolle (Prompt-Log) | Nutzerfrage im Klartext, Treffer-IDs (abgerufene Dokumentfragmente), generierte Antwort, Benutzerkennung, Zeitstempel, Session-ID | NORA-Betriebsprotokoll | ja — unmittelbar (Nutzeridentität verbunden mit Frageinhalt) | nicht auszuschließen: Frageinhalt kann mittelbar auf Art. 9-Merkmale schließen lassen (z. B. Fragen zu Mutterschutz- oder Schwerbehindertenregelungen); Maßnahme: kürzeste technisch sinnvolle Aufbewahrungsfrist, kein Auswertungszweck außer Betrieb und Sicherheit |

**Hinweis zu D4.** D4 fehlte im Arbeitsentwurf vom 21.10.2025. R. Mattis (DSB) hat in der
Gründungssitzung auf die eigenständige personenbezogene Verarbeitung durch den Prompt-Log
hingewiesen; Dr. P. Ohlsen hat die Klasse daraufhin aufgenommen. Das Protokoll dieser Sitzung
liegt vor.

## 3. RAG-spezifische Verarbeitungsstufen

| Stufe | Artefakt | Enthält | Schutzbedarf V / I / Vf | Begründung |
|---|---|---|---|---|
| S1 Quelle | Originaldokument | Klartext | **hoch / hoch / normal** | D2 und D3 bestimmen den Ausgangswert. Verfügbarkeit normal, da alle Dokumente unabhängig von NORA im Intranet abrufbar bleiben. |
| S2 Chunking | Dokumentfragmente | Klartext-Ausschnitte | **hoch / hoch / normal** | Fragmente verlieren die Überschrift und damit den sichtbarsten Klassifizierungshinweis. Ein Fragment aus der Geldwäsche-Richtlinie trägt dieselbe Vertraulichkeitsstufe wie das Ausgangsdokument, auch wenn es isoliert harmlos wirkt. |
| S3 Embedding | Vektoren | Numerische Repräsentation des Fragments | **hoch / normal / hoch** | Die Bank folgt der vorsichtigen Einordnung, dass ein Embedding den Personenbezug seines Ausgangsfragments teilt (vgl. Chakraborttii et al., „Ghost Vectors", arXiv:2606.18497, 16.06.2026; EDPB Opinion 28/2024). Integrität normal: eine Verfälschung des Vektors führt zu Retrieval-Fehlern, nicht zu einer inhaltlich falschen Klartextaussage. Verfügbarkeit hoch, weil der Vektorindex die einzige Retrievalgrundlage bildet. |
| S4 Index | Vektorindex + Metadaten | Vektoren, Dokumenttitel, Pfade, Berechtigungsgruppen | **hoch / hoch / hoch** | Metadaten allein offenbaren Struktur und Existenz vertraulicher Richtlinien. Integrität hoch: eine gezielte Manipulation des Index kann Retrieval-Ergebnisse verfälschen, ohne dass Nutzende dies erkennen. Verfügbarkeit hoch: ohne Index kein Retrieval. Eigener Dateizugriff auf den Index ist technisch möglich — was die Nachweisführung erleichtert, aber auch den Adminzugang schützenswerter macht. |
| S5 Retrieval | Trefferliste zur Laufzeit | Fragmente aus bis zu k=5 Dokumenten verschiedener Herkunft | **hoch / hoch / normal** | Aggregationsstufe: Hier wird zusammengeführt, was in den Einzeldokumenten getrennt war. Die Aggregationsbewertung in Abschnitt 4 ist deshalb der Kern dieser Feststellung. |
| S6 Prompt | An Meridian AI übermittelter Kontext | Fragmente + Nutzerfrage | **hoch / hoch / normal** | Diese Stufe verlässt den technischen Verantwortungsbereich der Bank. Der AVV mit Meridian AI regelt Zweckbindung und Trainingsausschluss; die Drittstaaten-Frage ist in [`03-auslagerung-drittparteien.md`](03-auslagerung-drittparteien.md) dokumentiert. |
| S7 Antwort | Generierter Text | Verdichtete Aussage mit Quellenangabe | **hoch / hoch / normal** | Die Antwort kann Aussagen aus mehreren Datenklassen synthetisieren, die in keinem Einzeldokument so nebeneinanderstehen. Quellenbindung (NORA gibt die Fundstelle mit) begrenzt die freie Synthese, schließt sie aber nicht aus. |
| S8 Protokoll | Betriebslog | Frage, Treffer-IDs, Antwort, Benutzerkennung, Zeitstempel | **hoch / hoch / hoch** | Datenklasse D4. Verfügbarkeit hoch, weil das Protokoll als Nachweis für Betroffenenrechte und für Auditierbarkeit (DORA Art. 10, MaRisk BT 2) benötigt wird. |

## 4. Aggregationsbewertung

Die folgende Prüfung fand am 21.10.2025 statt, mit M. Sørensen (Fachverantwortung), T. Brand
(Projektleitung), R. Mattis (DSB) und Dr. P. Ohlsen (ISB); die Compliance-Funktion wurde zu
A3 und A6 hinzugezogen. Das Sitzungsprotokoll liegt vor. Jedes Ergebnis ist festgehalten,
auch das negative.

| # | Aggregationshypothese | Bewertet | Ergebnis | Maßnahme |
|---|---|---|---|---|
| A1 | Lassen sich aus zugänglichen Fragmenten Vergütungs- oder Personalstrukturen ableiten? | 21.10.2025 | **Negativ.** Der Korpus enthält Eingruppierungsschemata (D3), aber keine Einzelvergütungen. Aus den vorhandenen Fragmenten lassen sich Bandbreiten ermitteln, die den Mitarbeitenden ohnehin aus ihrer eigenen Vergütungsordnung bekannt sind. Der Informationsgewinn durch Kombination ist nicht relevant. | Keine über die D3-Berechtigungssteuerung hinausgehende Maßnahme. |
| A2 | Lässt sich eine noch nicht kommunizierte Entscheidung rekonstruieren? | 21.10.2025 | **Negativ.** Der Aufnahmeprozess sieht vor, dass ausschließlich verabschiedete und veröffentlichte Dokumente in den Korpus aufgenommen werden. Entwürfe, Beschlussvorlagen und unveröffentlichte Fassungen sind explizit ausgeschlossen. Die Einhaltung dieses Ausschlusses wird durch Kontrolle `KLA-01` überwacht. | Prozessvorgabe in Betriebskonzept, Abschnitt 3.2; halbjährliche Stichprobe durch die Organisationsabteilung (M. Sørensen). |
| A3 | Lassen sich Kontroll- oder Schwellenwerte ermitteln, deren Kenntnis Umgehung ermöglicht? | 21.10.2025 | **Positiv.** Die Geldwäsche-Richtlinie enthält interne Meldeschwellen und Eskalationsgrenzen, die über den gesetzlichen Mindestanforderungen liegen. Deren genaue Kenntnis erleichtert eine gezielte Strukturierung von Transaktionen unterhalb der Schwelle. Dasselbe gilt für interne Betragsgrenzen in der Betrugserkennungsrichtlinie (Kapitel 3.1). Ein unbeschränktes Retrieval auf diese Passagen durch alle 1.200 Beschäftigten wurde in der Sitzung einstimmig als nicht akzeptabel bewertet. | Die betroffenen Passagen (GwG-Richtlinie Kap. 4.2, Betrugserkennung Kap. 3.1) wurden **nicht in den Vektorindex aufgenommen**. NORA verweist bei Anfragen zu diesen Bereichen auf Titel und Ablagepfad des Dokuments, retrievalt aber keinen Inhalt. Die Ausschlussliste ist in [`04-betriebskonzept.md`](04-betriebskonzept.md), Abschnitt 3.3 geführt und wird bei jeder Richtlinienrevision geprüft (Kontrolle `KLA-02`). |
| A4 | Lässt sich aus Metadaten die Existenz eines vertraulichen Vorgangs erkennen? | 21.10.2025 | **Negativ nach Maßnahme.** A. Kellner wies in der Architekturbewertung darauf hin, dass Dokumenttitel in den Index-Metadaten bei bestimmten Berechtigungsfehlern für nicht berechtigte Nutzer sichtbar werden könnten. Diese Hypothese war am 21.10.2025 noch theoretisch; sie hat sich im Testlauf T1 am 11.02.2026 bestätigt (Quellenangaben nannten Titel nicht berechtigter Dokumente). Die Nachbesserung wurde am 06.03.2026 abgeschlossen; T1 bestand im zweiten Anlauf. | Berechtigungsprüfung zur Query-Zeit greift jetzt auch auf Ebene der zurückgegebenen Metadaten. Kein Titel und kein Pfad einer nicht berechtigten Ressource wird ausgegeben. Kontrolle `ZUG-01`. Die Feststellung wurde am 06.03.2026 von „negativ" auf „negativ nach Maßnahme" aktualisiert. |
| A5 | Lassen sich Einzelpersonen identifizieren, obwohl kein Dokument sie namentlich nennt? | 21.10.2025 | **Negativ.** Die Richtlinien benennen Funktionen und Rollen, in D3 vereinzelt Funktionsträger (z. B. „der für Geldwäscheprävention zuständige Beauftragte"). Bei 1.200 Beschäftigten und mehrfach besetzten Funktionen reicht diese Angabe nicht für eine Identifizierbarkeit. R. Mattis hat diese Einschätzung geteilt. | Keine eigene Maßnahme. Die mittelbare Personenbezüglichkeit von D3 ist in der Vertraulichkeitseinstufung berücksichtigt. |
| A6 | Lässt sich durch NORA eine synthetisierte Handlungsanleitung für meldepflichtige Sachverhalte erzeugen, die präziser ist als jedes Einzeldokument? | 21.10.2025 | **Negativ nach Ausschlussmaßnahme aus A3.** Durch den Ausschluss der Schwellenwertpassagen entfällt die datentechnische Grundlage für eine präzise Kombination. NORA kann weiterhin erklären, dass Meldepflichten bestehen und wo die vollständige Richtlinie liegt — nicht aber, ab welchem Betrag sie greifen. | Wirksamkeit abhängig von der Pflege der A3-Ausschlussliste; Kontrolle `KLA-02`. |

**Bewertungsergebnis Aggregation: hoch** — Die A3-Hypothese ergab ein positives Ergebnis und
machte eine strukturelle Einschränkung des Index erforderlich. Alle anderen Hypothesen sind nach
Prüfung negativ oder durch gezielte Maßnahmen auf ein beherrschbares Niveau gebracht. Die
Bewertung belegt, dass die Aggregationsfrage tatsächlich durchgeführt wurde — A4 hat sich im
späteren Test bewahrheitet und ist hier dokumentiert.

## 5. Schutzbedarfsfeststellung je Grundwert

### Vertraulichkeit

| Datenklasse | Schadensszenario bei Verletzung | Einstufung | Begründung |
|---|---|---|---|
| D1 | Operative Prozessbeschreibungen werden außerhalb des Hauses bekannt; Wettbewerber erhalten Einblick in interne Abläufe | normal | Die Dokumente sind nicht klassifiziert. Ein unberechtigter Zugriff ist unerwünscht, aber der Schaden bleibt begrenzt. |
| D2 | Interne Meldeschwellen, Eskalationsgrenzen oder Betrugserkennungsregeln werden bekannt; gezielte Umgehung wird ermöglicht | **hoch** | Regulatorisch relevanter Schaden: Kenntnis interner GwG-Meldeschwellen ermöglicht Strukturierung von Transaktionen unterhalb der Grenze. Das ist der Befund aus A3. Durch die Ausschlussmaßnahme ist das unmittelbare Risiko gemindert, der Grundwert bleibt aber hoch, weil die Ausschlussliste pflegeabhängig ist. |
| D3 | Personalbezogene Regelungen, insbesondere Vergütungsschemata oder Nebentätigkeitsregeln, werden bekannt | **hoch** | Mittelbare Personenbezüglichkeit; Offenlegung von Eingruppierungsschemata kann Beschäftigte gegenüber Dritten benachteiligen. |
| D4 | Der Prompt-Log wird zweckfremd eingesehen (Verhaltenskontrolle, unbefugter Zugriff) | **hoch** | Das Protokoll verbindet Nutzeridentität mit Frageinhalt und lässt Rückschlüsse auf individuelle Anliegen zu (Erkrankung, Disziplinarverfahren, Nebentätigkeit). Einstufung auf Empfehlung von R. Mattis. |

**Gesamteinstufung Vertraulichkeit (Maximumprinzip): hoch** — maßgeblich D2 (Schwellenwerte) und D4 (Prompt-Log).

### Integrität

| Datenklasse | Schadensszenario bei Verfälschung | Einstufung | Begründung |
|---|---|---|---|
| D1–D3 | Beschäftigte handeln nach einer falschen, aber autoritativ wirkenden NORA-Auskunft — z. B. falsche Meldepflicht-Schwelle, falsche Nebentätigkeitsregel | **hoch** | NORA wird als verlässliche Auskunftsquelle wahrgenommen. Eine falsche Antwort zu einer GwG-Meldepflicht ist kein Anzeigefehler, sondern ein regulatorisch relevanter Fehler. AT 4.3.5 MaRisk verlangt ausreichende Nachvollziehbarkeit ausdrücklich auch für KI-gestützte Verfahren; eine verfälschte Wissensbasis ist das Gegenteil davon. S. Vogt (2nd Line) hat diese Einschätzung in der Kontrollbewertung (19.05.2026) ausdrücklich bestätigt. |
| D4 | Das Protokoll wird manipuliert oder ist als Nachweis nicht mehr belastbar | **hoch** | Im Streitfall — Aufsichtsprüfung, Auskunftsersuchen nach Art. 15 DSGVO, Mitarbeiterbeschwerde — muss das Protokoll nachweisbar unverändert sein. Ein manipulierbares Protokoll hat denselben Wert wie keines. |

**Gesamteinstufung Integrität: hoch** — „Normal" wäre an dieser Stelle nicht haltbar gewesen.
Die Frage, ob eine falsche Antwort zu einem regulatorisch relevanten Fehlverhalten führen kann,
ist für NORA mit Ja zu beantworten; das haben M. Sørensen und Compliance in der Sitzung vom
21.10.2025 bestätigt.

### Verfügbarkeit

| Betrachtung | Schadensszenario bei Ausfall | Einstufung | Begründung |
|---|---|---|---|
| System gesamt | Beschäftigte können Richtlinienfragen nicht über NORA stellen; erhöhte Last auf der Organisationsabteilung (geschätzt: +35 % Anfragen, gemessen im Pilotbetrieb) | **normal** | Der Rückfallweg besteht: alle 812 Dokumente bleiben im Intranet (Richtliniendatenbank, Intranet-Handbuch) direkt abrufbar. NORA ist ein Komfortsystem, kein Produktionssystem im operativen Kerngeschäft. Ein NORA-Ausfall erhöht den Aufwand, unterbricht aber keine regulatorisch erforderliche Funktion. Das Notfallkonzept sieht explizite Rückfallkommunikation vor (vgl. [`05-notfallkonzept.md`](05-notfallkonzept.md)). Voraussetzung: der Intranet-Bestand wird weiterhin aktuell gehalten — Kontrolle `BET-03`. |

**Gesamteinstufung Verfügbarkeit: normal**

## 6. Gesamtergebnis

| Grundwert | Einstufung | Maßgebliche Datenklasse/Stufe |
|---|---|---|
| Vertraulichkeit | **hoch** | D2 (Schwellenwerte, A3-Befund), D4 (Prompt-Log), S4 (Index-Metadaten) |
| Integrität | **hoch** | D1–D3 (Handlungsrelevanz der Auskünfte), AT 4.3.5 MaRisk, S7 (Antwortsynthese) |
| Verfügbarkeit | **normal** | Rückfallweg Intranet vorhanden und gepflegt |

**Abgeleitete Anforderungen.** Aus dieser Einstufung ergeben sich Anforderungen an folgende
Kontrollen im [Kontrollkatalog](../../controls/controls.md):

- Vertraulichkeit hoch: `ZUG-01` (Berechtigungsprüfung Query-Zeit), `ZUG-02` (Rollentrennung
  Adminzugänge), `ZUG-03` (Protokollauswertung), `KLA-01`, `KLA-02` (Indexsteuerung und
  Ausschlussliste)
- Integrität hoch: `AUD-01` (Auditpfad), `AUD-03` (Änderungsverfolgung Korpus), `EVA-01`
  (Funktionstests), `BET-01` (automatisierter Regressionslauf)
- Verfügbarkeit normal: Standardmaßnahmen; kein erhöhter RTO/RPO-Bedarf; `BET-03`
  (Notfallszenario Rückfall auf Intranet dokumentiert)

**Nicht abgedeckte Risiken (Restrisiko).** Zwei Sachverhalte werden als Restrisiko in die
[Freigabevorlage](07-freigabevorlage.md) überführt:

1. **LOE-02 (Indexkompaktierung):** Gelöschte Vektoren bleiben als markierte Einträge physisch
   erhalten; ein Nachweis der Unumkehrbarkeit auf Dateiebene fehlt. Funktionaler Löschnachweis
   (T1) ist erbracht; physische Kompaktierung ist Auflage A1 (Frist 30.09.2026).
2. **Drittstaaten-Frage (R8):** Technischer 24/7-Support von Meridian AI über einen Partner
   außerhalb der EU mit potenziellem Log-Zugriff — nach Sofortmaßnahme (Metadaten-only-Logging)
   verbleibt die vertragliche Bereinigung als Auflage A2 (Frist 30.09.2026), bis dahin vom
   Vorstand als Restrisiko getragen.

## 7. Verweise

| Frage | Dokument |
|---|---|
| Datenschutzrechtliche Bewertung, Embeddings, Rechtsgrundlage | [`02-dsfa-baustein-rag.md`](02-dsfa-baustein-rag.md) |
| Externe Verarbeitung, LLM-Anbieter, Drittstaat | [`03-auslagerung-drittparteien.md`](03-auslagerung-drittparteien.md) |
| Umsetzung der abgeleiteten Maßnahmen im Betrieb | [`04-betriebskonzept.md`](04-betriebskonzept.md) |
| Verfügbarkeit, Degradation, Kill-Switch | [`05-notfallkonzept.md`](05-notfallkonzept.md) |
| Löschung und Nachweisführung | [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md) |
| Kontrollkatalog | [`../../controls/controls.md`](../../controls/controls.md) |
| Leere Vorlage dieses Dokuments | [`../../akte/01-schutzbedarfsfeststellung.md`](../../akte/01-schutzbedarfsfeststellung.md) |

---

## Was die prüfende Funktion hier gefragt hat

1. **S. Vogt (2nd Line, 19.05.2026): „Sie haben die Embeddings unter Stufe S3 mit Vertraulichkeit
   ‚hoch' bewertet — welche Rekonstruktionsmethoden haben Sie dabei konkret betrachtet?"** —
   Dr. P. Ohlsen: Die Bank stützt sich auf die Ghost-Vectors-Studie (Chakraborttii et al.,
   arXiv:2606.18497) und folgt der Empfehlung des DSB, den Personenbezug des Ausgangsfragments
   auf den Vektor zu übertragen, solange keine institutsspezifische Gegenstudie vorliegt. Das ist
   die vorsichtige, in der Prüfung tragfähige Position; sie wurde mit R. Mattis abgestimmt.

2. **I. Bruns (Interne Revision, beratend, 19.05.2026): „Welche Aggregationshypothesen haben Sie
   mit dem Fachbereich besprochen, und gibt es ein Protokoll?"** — T. Brand: Sitzungsprotokoll
   vom 21.10.2025 liegt vor (Teilnehmer: Dr. P. Ohlsen, M. Sørensen, T. Brand, R. Mattis,
   Compliance). A3-Befund und A3-Maßnahme sind darin datiert festgehalten; die Ausschlussliste
   in Betriebskonzept Abschnitt 3.3 ist datiert.

3. **S. Vogt (2nd Line, 19.05.2026): „Warum haben Sie Integrität mit ‚hoch' eingestuft — das
   System sagt Ihnen doch nur, was eine Richtlinie enthält?"** — Dr. P. Ohlsen: Weil
   Beschäftigte nach der NORA-Auskunft handeln. Eine falsche Antwort auf eine Frage zur
   GwG-Meldepflicht ist kein Anzeigeproblem, sondern ein regulatorischer Fehler. AT 4.3.5 MaRisk
   adressiert genau diesen Fall; M. Sørensen hat in der Sitzung vom 21.10.2025 bestätigt, dass
   NORA als verbindliche Auskunftsquelle wahrgenommen wird.

4. **R. Mattis (DSB, 21.10.2025): „Ist der Prompt-Log als eigene Datenklasse bewertet?"** —
   Dr. P. Ohlsen: D4 fehlte im Arbeitsentwurf; auf Hinweis von R. Mattis in der Gründungssitzung
   ergänzt. Einstufung hoch (Vertraulichkeit), hoch (Integrität), hoch (Verfügbarkeit).

5. **S. Vogt (2nd Line, 19.05.2026): „Wann wurde die Feststellung zuletzt überprüft, und was
   hat der Testbefund T1 vom 11.02.2026 daran geändert?"** — Dr. P. Ohlsen: A4 wurde nach T1 am
   06.03.2026 von „negativ" auf „negativ nach Maßnahme" aktualisiert, weil sich das hypothetische
   Szenario im Test tatsächlich gezeigt hatte. Änderung ist in der Versionierung dieses Dokuments
   vermerkt.

## Offene Punkte

- **A3-Ausschlussliste (Schwellenwertdokumente):** Die Pflegeliste der ausgeschlossenen Passagen
  in Betriebskonzept Abschnitt 3.3 muss bei jeder Richtlinienüberarbeitung geprüft werden.
  Verantwortung: M. Sørensen (Fachverantwortung) zusammen mit T. Brand; Überprüfung zur
  Wiedervorlage 30.11.2026.

- **D4-Aufbewahrungsfrist:** In der Erstfassung dieser Feststellung (21.10.2025) stand die
  Aufbewahrungsfrist für den Prompt-Log unter dem Vorbehalt der Mitbestimmung. Mit der
  Betriebsvereinbarung NORA-BV-2026-01 vom 27.03.2026 ist sie auf 90 Tage festgelegt und
  technisch durchgesetzt; der Punkt ist mit der Aktualisierung vom 12.05.2026 geschlossen.
  Verantwortung: R. Mattis (DSB).

- **Intranet-Aktualitätspflege als Verfügbarkeitsannahme:** Die Einstufung „normal" für
  Verfügbarkeit setzt voraus, dass der Intranet-Direktbestand weiterhin gepflegt wird. Wenn NORA
  den direkten Intranet-Aufruf verdrängt, ist diese Annahme bei der Wiedervorlage neu zu prüfen.
  Verantwortung: M. Sørensen, Termin: 30.11.2026.

# 07 — Freigabevorlage NORA (Arbeitsfassung)

> **Wer benutzt dieses Dokument?** Projektleitung (T. Brand) und Enterprise-Architekt
> (A. Kellner) erstellen es; die Fachfunktionen zeichnen ihre Aussagen mit.
> **In welchem Prozess?** Freigabe-Entscheidung des Vorstands der Nordwind Bank AG.
> **Wer liest es?** Das Gremium — und später die interne Revision als Maßstab dafür, was
> zugesagt wurde.

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden; Personen,
> Anbieter, Zahlen und Befunde sind konstruiert. Der Ablauf ist echt. Siehe
> [`../00-fallbeschreibung.md`](../00-fallbeschreibung.md).

> **Kein Rechtsrat.** Siehe [`../../DISCLAIMER.md`](../../DISCLAIMER.md).

**Zu dieser Fassung.** Dies ist die **Arbeitsfassung** vom 08.06.2026: die vollständig
ausgefüllte Vorlage mit allen Abschnitten, Nachweisständen und internen Vermerken. Die Fassung,
die tatsächlich in die Vorstandssitzung am 24.06.2026 ging, steht in
[`../07-freigabevorlage-final.md`](../07-freigabevorlage-final.md) — sie ist auf zwei Seiten
gekürzt. Der Vergleich beider Fassungen zeigt, was auf dem Weg ins Gremium wegfällt und was
nicht wegfallen darf.

---

# Entscheidungsvorlage: Freigabe NORA — Nordwind Richtlinien-Assistent

**Vorlage an:** Vorstand der Nordwind Bank AG · **Sitzung am:** 24.06.2026 ·
**Vorlage Nr.:** 2026-041
**Erstellt von:** T. Brand (Projektleitung), A. Kellner (Enterprise-Architektur) ·
**Datum:** 08.06.2026 · **Einstufung:** intern

## 1. Beschlussvorschlag

> Der Vorstand gibt den produktiven Betrieb des internen Richtlinien-Assistenten NORA für alle
> Beschäftigten unter den in Abschnitt 6 genannten Auflagen A1 bis A4 frei. Die Freigabe ist bis
> zur Wiedervorlage am 30.11.2026 befristet. Der Vorstand nimmt das in Abschnitt 5 beschriebene
> Restrisiko zur Kenntnis und weist es dem Ressort COO zu.

**Entscheidungsalternativen:** Freigabe unter Auflagen (empfohlen) · Freigabe beschränkt auf die
Organisationsabteilung bis zur Erfüllung von A1 · Vertagung bis zum Nachweis der Löschung auf
Indexebene · Ablehnung.

*Die zweite Alternative wurde im Vorfeld mit der Informationssicherheit erörtert und verworfen:
Der offene Punkt aus A1 betrifft die Löschung, nicht die Berechtigung, und wirkt daher unabhängig
von der Größe des Nutzerkreises. Eine Beschränkung würde das Risiko nicht mindern, aber den
Nutzen halbieren.*

## 2. Worum es geht

NORA beantwortet Fragen der Beschäftigten zu internen Richtlinien, Arbeitsanweisungen und
Prozessbeschreibungen und liefert dabei die Fundstelle mit. Anlass war eine Auswertung des
Service-Desk: 31 % der Anfragen an die Organisationsabteilung sind Fragen nach bestehenden
Regelungen, deren Beantwortung im Wesentlichen aus dem Auffinden des richtigen Dokuments
besteht.

Das System sucht in einer Wissensbasis aus 812 freigegebenen Dokumenten und erzeugt daraus eine
Antwort. Die Suche und die Speicherung der Dokumente erfolgen in unserem Rechenzentrum; für die
Formulierung der Antwort wird ein Sprachmodell des Anbieters Meridian AI B.V. genutzt, das in der
EU betrieben wird. Das System entscheidet nichts und schreibt in kein Quellsystem; es gibt
Auskunft und nennt die Fundstelle.

| Kennzahl | Wert |
|---|---|
| Nutzerkreis | alle 1.200 Beschäftigten |
| Wissensbasis | 812 Dokumente aus drei Quellsystemen |
| Erwartete Nutzung | rund 400 Anfragen je Arbeitstag |
| Gemessener Nutzen | Rückgang der Regelungsanfragen im Pilotbereich um 38 % (Pilotbetrieb 20.01.–30.04.2026, 60 Nutzende) |
| Antwortqualität | 91,1 % korrekt bei 180 Referenzfragen; 0 % selbstbewusst falsch bei nicht beantwortbaren Fragen |
| Kosten | 210 TEUR Aufbau, 95 TEUR p. a. laufend |

*Die Nutzenaussage stammt aus dem Pilotbetrieb und nicht aus einer Schätzung. Die 38 % beziehen
sich auf den Pilotbereich; eine Hochrechnung auf das Gesamthaus wurde bewusst unterlassen, weil
die Organisationsabteilung überdurchschnittlich von Regelungsanfragen betroffen ist.*

## 3. Aufsichtliche und rechtliche Einordnung

| Frage | Aussage |
|---|---|
| Kritische oder wichtige Funktion (DORA Art. 3 Nr. 22)? | **Nein.** Bei Ausfall greifen die Beschäftigten auf die Richtliniendokumente im Intranet zurück; kein regulierter Prozess steht still. Die Einstufung ist bei Einbettung in einen Prozess neu zu prüfen. |
| Schutzbedarf (V / I / Vf) | hoch / hoch / normal |
| DSFA durchgeführt? | Ja, abgeschlossen 02.06.2026. Der DSB befürwortet die Freigabe unter Auflagen mit Vorbehalt zu A2. |
| Vorherige Konsultation der Aufsichtsbehörde (Art. 36 DSGVO)? | Nein — das verbleibende Risiko wird nach Umsetzung der Maßnahmen nicht als hoch bewertet. |
| IKT-Drittdienstleister im Informationsregister erfasst? | Ja, Meridian AI B.V. seit 04.12.2025. Weitere externe IKT-Dienstleister bestehen für diese Lösung nicht. |
| Mitbestimmung | Betriebsvereinbarung zur Protokollierung geschlossen am 27.03.2026. |
| Automatisierte Entscheidung mit Rechtswirkung (Art. 22 DSGVO)? | Nein. Das System gibt Auskunft; jede Handlungsentscheidung trifft die anfragende Person. |
| Nachvollziehbarkeit des Modells | Adressiert über Quellenbindung und Referenzfragenkatalog; Anknüpfung an MaRisk AT 4.3.5. |
| EU AI Act | Allgemeiner Anwendungsbeginn 02.08.2026. Eine Einstufung als Hochrisiko-System wird nach derzeitiger Prüfung nicht gesehen; die abschließende Bewertung ist bis zur Wiedervorlage vorzulegen. |

## 4. Risiko

| # | Risiko | Vor Maßnahmen | Maßnahme | Nach Maßnahmen |
|---|---|---|---|---|
| 1 | Offenlegung vertraulicher Inhalte an nicht berechtigte Beschäftigte | hoch | Berechtigungsprüfung zur Query-Zeit einschließlich Trefferliste und Fundstellen; Negativ-Retrieval-Test bestanden (06.03.2026); Wirkzeit des Entzugs 4 Minuten | niedrig |
| 2 | Handeln auf Basis einer falschen Auskunft | hoch | Quellenangabe zu jeder Aussage; Referenzfragenkatalog mit 180 Fragen; 0 % selbstbewusst falsche Antworten bei nicht beantwortbaren Fragen; Meldeweg für Falschauskünfte | mittel |
| 3 | Ableitung interner Eskalations- und Meldeschwellen durch Zusammenführung | hoch | Aggregationsbewertung 04.02.2026; betroffene Dokumente aus dem Index entfernt und nur noch als Verweis ausgegeben; im Nachtest nicht mehr rekonstruierbar | niedrig |
| 4 | Unvollständige Löschung im Vektorindex | mittel | Löschkette über acht Stationen protokolliert; funktionaler Nachweis erbracht, Nachweis auf Indexebene offen → **Auflage A1** | **mittel — offen** |
| 5 | Unbemerkte Änderung des Antwortverhaltens durch den Anbieter | mittel | Wöchentlicher automatisierter Regressionslauf seit 11.05.2026; vertragliche Absicherung offen → **Auflage A3** | **mittel — offen** |
| 6 | Zugriff auf Anfrageinhalte durch Support außerhalb der EU | mittel | Anbieterseitige Protokollierung am 02.04.2026 auf Metadaten reduziert; vertragliche Beschränkung offen → **Auflage A2** | niedrig — Restunsicherheit |
| 7 | Zweckentfremdung der Prompt-Protokolle zur Leistungskontrolle | mittel | Vier-Augen-Verfahren, Betriebsvereinbarung vom 27.03.2026, 90 Tage Aufbewahrung, administrativer Direktzugriff unterbunden | niedrig |

## 5. Restrisiko

Nach Umsetzung aller Maßnahmen bleiben drei Punkte bestehen.

**Erstens** kann das System auf eine ungewöhnlich formulierte Frage eine sachlich falsche, aber
überzeugend formulierte Auskunft geben. Die Quellenangabe zu jeder Aussage und der Meldeweg
begrenzen den Schaden, schließen ihn aber nicht aus. In 180 Referenzfragen lag die Fehlerquote
bei 4,4 % teilweise korrekten Antworten; keine davon betraf eine meldepflichtige Regelung.

**Zweitens** ist bis zur Erfüllung von A1 nicht belegt, dass gelöschte Inhalte im Vektorindex
unumkehrbar entfernt sind. Der funktionale Nachweis ist erbracht — gelöschte Inhalte sind über
das System nicht mehr auffindbar. Offen ist die Ebene darunter: Gelöschte Vektoren verbleiben
derzeit als markierte Einträge in der Indexdatei. Ein Zugriff darauf setzt administrativen
Zugang zum Index in unserem Rechenzentrum voraus.

**Drittens** kann Meridian AI B.V. das Modell ohne Vorankündigung aktualisieren. Wir erkennen
eine solche Änderung über den wöchentlichen Regressionslauf, also im Nachhinein und mit einem
Verzug von bis zu sieben Tagen.

**Träger des Restrisikos:** Ressort COO, in Abstimmung mit der Fachverantwortung (M. Sørensen,
Leitung Organisation).

## 6. Auflagen

| # | Auflage | Frist | Verantwortlich | Nachweis an |
|---|---|---|---|---|
| A1 | Einrichtung eines wöchentlichen Kompaktierungslaufs des Vektorindex mit Protokoll; Nachweis der Unumkehrbarkeit durch Index-Inspektion vor und nach dem Lauf; erneute Durchführung von Test T3 einschließlich der Verifikationsschritte V2 und V3 | 30.09.2026 | T. Brand | 2nd Line (S. Vogt), ISB |
| A2 | Schriftliche Bestätigung von Meridian AI B.V. über die Beschränkung des Support-Zugriffs auf Personal innerhalb der EU | 30.09.2026 | C. Ahrens | DSB, Auslagerungsmanagement |
| A3 | Nachverhandlung einer Ankündigungsfrist von mindestens 30 Tagen für Modellaktualisierungen oder einer Versionsfestlegung; bis dahin bleibt der wöchentliche Regressionslauf verbindlich | 30.11.2026 | C. Ahrens | 2nd Line |
| A4 | Erweiterter Test der indirekten Prompt-Einschleusung über eine repräsentative Stichprobe des Korpus | 31.10.2026 | Dr. P. Ohlsen | 2nd Line |

**Folge bei Nichterfüllung.** Wird A1 nicht fristgerecht erfüllt, ist die Aufnahme neuer
personenbezogener Dokumentklassen in die Wissensbasis bis zur Erfüllung auszusetzen und dem
Vorstand in der Sitzung nach Fristablauf zu berichten. Werden A2 oder A3 nicht erfüllt, ist das
jeweilige Risiko dem Vorstand zur erneuten Entscheidung vorzulegen.

*Zur ehrlichen Einordnung: A1 ist die Auflage, die diese Freigabe trägt. Die übrigen drei sind
Nachbesserungen an einem funktionierenden System.*

## 7. Stellungnahmen der beteiligten Funktionen

| Funktion | Stellungnahme | Datum | Vorbehalte |
|---|---|---|---|
| Informationssicherheit (Dr. P. Ohlsen) | befürwortet unter Auflagen | 05.06.2026 | A1 ist aus Sicht der IS nicht verhandelbar; die Frist von 30.09. ist das Maximum. |
| Datenschutz (R. Mattis) | befürwortet unter Auflagen | 02.06.2026 | **Ausdrücklicher Vorbehalt zu A2** — siehe unten. |
| 2nd Line / IT-Risikocontrolling (S. Vogt) | befürwortet unter Auflagen | 19.05.2026 | 2 Kontrollen rot, 5 gelb; Bewertung siehe [`../readiness-report.md`](../readiness-report.md). |
| Auslagerungsmanagement (C. Ahrens) | befürwortet | 03.06.2026 | Konzentrationsrisiko bleibt bestehen; kein erprobter Ausweichanbieter. |
| Fachbereich (M. Sørensen) | befürwortet | 04.06.2026 | — |
| Interne Revision (I. Bruns) | keine Freigabefunktion, beratend beteiligt | 05.06.2026 | Weist auf die Nachverfolgung der Auflagen als eigenen Prüfgegenstand hin. |

### Abweichende Auffassung des Datenschutzbeauftragten (dokumentiert)

Der DSB hat am 09.12.2025 die Frage aufgeworfen, ob der Zugriff des außerhalb der EU ansässigen
Support-Partners von Meridian AI auf Systemprotokolle eine Übermittlung in einen Drittstaat
darstellt, und die Klärung **vor** Produktivstart gefordert. Das Auslagerungsmanagement hat die
Auffassung vertreten, die Leistung werde in der EU erbracht und der Support sei eine Nebentätigkeit
mit eng begrenztem Zugriff.

In der Sitzung am 24.03.2026 wurde die Frage in zwei Teile zerlegt:

1. **Vor Produktivstart umgesetzt:** Die anbieterseitige Protokollierung wurde am 02.04.2026 auf
   Metadaten beschränkt. Anfrageinhalte werden nicht mehr an den Anbieter protokolliert; damit
   entfällt der Gegenstand, um den gestritten wurde.
2. **Als Auflage A2 mit Frist:** Die vertragliche Beschränkung des Support-Zugriffs auf Personal
   innerhalb der EU wird nachverhandelt.

Der DSB trägt diese Auflösung mit, hält aber fest, dass die vertragliche Zusicherung bis zu ihrem
Vorliegen durch eine technische Maßnahme ersetzt wird und nicht durch eine rechtliche Bewertung.
Diese Einschränkung ist Teil des Restrisikos in Abschnitt 5.

*Dieser Absatz ist bewusst nicht geglättet. Eine abweichende Auffassung, die dem Gremium
vorenthalten wird und später über die Revision auftaucht, kostet mehr als sie je erspart hat.*

## 8. Nachweisstand

| Nachweis | Status | Referenz |
|---|---|---|
| Schutzbedarfsfeststellung | abgeschlossen 21.10.2025, aktualisiert 12.05.2026 | Anlage 1 — [`01`](01-schutzbedarfsfeststellung.md) |
| DSFA-Baustein | abgeschlossen 02.06.2026 | Anlage 2 — [`02`](02-dsfa-baustein-rag.md) |
| Auslagerungsbewertung | abgeschlossen 03.06.2026 | Anlage 3 — [`03`](03-auslagerung-drittparteien.md) |
| Betriebskonzept | abgeschlossen 29.05.2026 | Anlage 4 — [`04`](04-betriebskonzept.md) |
| Notfallkonzept | abgeschlossen 16.06.2026 (nach Kill-Switch-Test in Produktion) | Anlage 5 — [`05`](05-notfallkonzept.md) |
| Testnachweise T1–T12 | 9 bestanden, 2 mit Einschränkung, 1 offen (T3, Indexebene) | Anlage 6 — [`06`](06-testnachweise.md) |
| Kontrollbewertung / Readiness-Report | 16 grün, 5 gelb, 2 rot | Anlage 7 — [`../readiness-report.md`](../readiness-report.md) |
| Betriebsvereinbarung Protokollierung | geschlossen 27.03.2026 | Anlage 8 |
| Mitbestimmungsverfahren | abgeschlossen 30.03.2026 | Anlage 9 — [`08`](08-mitbestimmung-betriebsvereinbarung.md) |

*Zwischen der Kontrollbewertung vom 19.05.2026 und dieser Vorlage wurde eine gelbe Kontrolle
geschlossen: Der Kill-Switch wurde am 16.06.2026 in der Produktionsumgebung erprobt, gemessene
Wirkzeit 90 Sekunden (BET-03). Der Readiness-Report bleibt bewusst auf dem Stand des
Bewertungstags — er ist die Momentaufnahme der 2nd Line und wird nicht nachträglich verändert.*

## 9. Wiedervorlage

| Feld | Inhalt |
|---|---|
| Termin | 30.11.2026 |
| Gegenstand | Erfüllung der Auflagen A1 bis A4, Betriebserfahrungen der ersten fünf Monate, Auswertung der gemeldeten Falschauskünfte, abschließende Bewertung zum EU AI Act |
| Auslöser für eine vorgezogene Wiedervorlage | Wechsel des Modellanbieters oder des Modells mit messbarer Qualitätsänderung · sicherheitsrelevanter Vorfall · Aufnahme einer neuen Datenquelle mit personenbezogenen Inhalten · Einbettung von NORA in einen Prozess, der ohne das System nicht mehr läuft |

## 10. Anlagen

1. Schutzbedarfsfeststellung · 2. DSFA-Baustein · 3. Auslagerungsbewertung ·
4. Betriebskonzept · 5. Notfallkonzept · 6. Testnachweise · 7. Readiness-Report ·
8. Betriebsvereinbarung Protokollierung · 9. Mitbestimmungsverfahren

---

## Was die prüfende Funktion hier tatsächlich gefragt hat

1. **I. Bruns (Interne Revision), 05.06.2026: „Wer trägt das Restrisiko — und weiß das Ressort
   COO, dass es benannt ist?"** Antwort: Ja, mit dem COO am 03.06.2026 besprochen; die Zuweisung
   ist im Beschlussvorschlag ausdrücklich enthalten, damit sie mitbeschlossen wird.
2. **Vorstand (Ressort COO), 24.06.2026: „Was passiert, wenn A1 nicht erfüllt wird?"** Antwort:
   Aufnahmestopp für neue personenbezogene Dokumentklassen und Bericht in der Folgesitzung. Die
   Folge war in der ersten Fassung der Vorlage nicht benannt und wurde auf Rückfrage ergänzt.
3. **S. Vogt (2nd Line), 19.05.2026: „Gab es abweichende Auffassungen — und stehen sie in der
   Vorlage?"** Antwort: Ja, die Drittstaaten-Frage; Abschnitt 7 wurde daraufhin um die
   ausformulierte Darstellung erweitert.
4. **Vorstand, 24.06.2026: „Die 38 % — woher stammt die Zahl?"** Antwort: Aus dem Pilotbetrieb
   mit 60 Nutzenden über drei Monate, nicht aus einer Hochrechnung; die Übertragbarkeit auf das
   Gesamthaus ist ausdrücklich offen.
5. **Dr. P. Ohlsen (ISB), 05.06.2026: „Warum ist der Nutzerkreis nicht bis zur Erfüllung von A1
   beschränkt?"** Antwort: Weil der offene Punkt die Löschung betrifft und nicht die
   Berechtigung; die Alternative wurde geprüft und in Abschnitt 1 dokumentiert verworfen.

## Offene Punkte

- **A1 bis A4** sind zum Zeitpunkt der Vorlage offen und mit Frist versehen (Abschnitt 6).
- Die abschließende Bewertung zum **EU AI Act** steht aus; der allgemeine Anwendungsbeginn ist der
  02.08.2026, also nach dem Beschluss. Verantwortlich: A. Kellner, bis 30.11.2026.
- Ein **erprobter Ausweichanbieter** existiert nicht. Der Testlauf gegen ein selbstbetriebenes
  Modell am 12.05.2026 erreichte 68,3 % korrekte Antworten gegenüber 91,1 %; ein Wechsel wäre
  möglich, aber mit spürbarem Qualitätsverlust. Als Konzentrationsrisiko geführt.
- Die **Aktualität der Intranet-Fassungen** der Richtlinien ist die Voraussetzung dafür, dass die
  Verfügbarkeit mit „normal" eingestuft werden kann. Wird die Pflege dieser Fassungen
  eingestellt, ändert sich die Einstufung. Verantwortlich: M. Sørensen, Überprüfung zur
  Wiedervorlage.

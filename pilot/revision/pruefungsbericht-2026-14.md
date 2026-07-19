# Prüfungsbericht 2026-14 — RAG-System NORA

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden; Personen,
> Anbieter, Zahlen und Befunde sind konstruiert. Der Ablauf ist echt. Siehe
> [`../00-fallbeschreibung.md`](../00-fallbeschreibung.md).

> **Kein Rechtsrat.** Siehe [`../../DISCLAIMER.md`](../../DISCLAIMER.md).

**Interne Revision der Nordwind Bank AG** · Bericht 2026-14 · **16.10.2026**
**Prüfungszeitraum:** 21.09.–09.10.2026 · **Prüfungsleitung:** I. Bruns
**Verteiler:** Vorstand · Ressort COO · Leitung Organisation · ISB · DSB · 2nd Line ·
Auslagerungsmanagement
**Grundlage:** [Prüfprogramm 2026-14](pruefprogramm-2026-14.md)

---

## 1. Gesamturteil

**Das interne Kontrollsystem für NORA ist im Wesentlichen angemessen und wirksam.** Von zehn
vertieft geprüften Bereichen waren sieben ohne Beanstandung. Es wurden **vier Feststellungen**
getroffen, davon **eine wesentliche**.

Die im Freigabeverfahren zugesagten Kontrollen wirken; insbesondere die Berechtigungsprüfung zur
Query-Zeit hat der eigenständigen Nachprüfung der Revision standgehalten. Die wesentliche
Feststellung F1 betrifft nicht eine der bekannten Auflagen, sondern eine Änderung, die nach der
Freigabe ohne das vereinbarte Verfahren wirksam wurde.

**Zur Offenlegung:** Die Prüfungsleitung war am 05.06.2026 **beratend** am Freigabeverfahren
beteiligt. Die Beratung betraf das Verfahren, nicht die Ausgestaltung einzelner Kontrollen; eine
Prüfung eigener Arbeitsergebnisse liegt nicht vor.

## 2. Feststellungen

### F1 — Wesentlich · Neue Datenquelle ohne Änderungsverfahren aufgenommen

**Sachverhalt.** Am 12.08.2026 wurde die Dokumentensammlung „Arbeitsanweisungen Zahlungsverkehr"
(94 Dokumente) in die Wissensbasis aufgenommen. Die Aufnahme erfolgte durch die
Organisationsabteilung im Wege der regulären Dokumentenpflege. Nach
[`04-betriebskonzept.md`](../akte/04-betriebskonzept.md), Abschnitt 5 ist die Aufnahme einer
**neuen Datenquelle** eine wesentliche Änderung und erfordert die Genehmigung durch
Fachverantwortung, ISB und DSB sowie eine erneute Bewertung der Schutzbedarfsfeststellung.

Weder eine Genehmigung noch eine Neubewertung liegen vor. Der ISB hat von der Aufnahme am
26.09.2026 im Rahmen dieser Prüfung erfahren.

**Ursache.** Das Änderungsverfahren unterscheidet zwischen „neuer Datenquelle" (wesentlich) und
„einzelne Dokumente ergänzt" (Regelbetrieb). Die Organisationsabteilung hat die 94 Dokumente als
Ergänzung innerhalb einer bereits freigegebenen Quelle eingeordnet, weil sie technisch aus
demselben Quellsystem stammen. Die Abgrenzung ist im Betriebskonzept nicht anhand eines
prüfbaren Merkmals definiert.

**Risiko.** Für die aufgenommenen Dokumente wurde keine Schutzbedarfsfeststellung und keine
Aggregationsbewertung durchgeführt. Die Revision hat stichprobenartig geprüft, ob unter den 94
Dokumenten Inhalte mit erhöhtem Schutzbedarf sind: In zwei Fällen (Verfahrensanweisungen zur
Behandlung von Verdachtsmeldungen) ist das nach Einschätzung des im Rahmen der Prüfung befragten
ISB der Fall. Ein konkreter Schaden ist nicht eingetreten; die Berechtigungsprüfung greift auch
für diese Dokumente.

**Bewertung.** Wesentlich. Nicht wegen des eingetretenen Schadens, sondern weil die Kontrolle,
die das Verfahren tragen soll (`BET-01`), im ersten Quartal des Produktivbetriebs umgangen wurde
— und zwar nicht absichtlich, sondern weil sie nicht eindeutig genug formuliert ist. Die
Freigabe des Vorstands vom 24.06.2026 bezog sich auf ein System mit einem definierten
Datenbestand.

**Empfehlung.**
1. Nachträgliche Bewertung der 94 Dokumente nach `01`, Genehmigung nachholen oder Aufnahme
   zurücknehmen — Frist 30.11.2026, Verantwortung M. Sørensen und Dr. P. Ohlsen.
2. Präzisierung der Abgrenzung im Betriebskonzept anhand eines prüfbaren Merkmals (Vorschlag der
   Revision: jede Aufnahme von mehr als 10 Dokumenten oder jede Aufnahme aus einem bislang nicht
   indexierten Ordnerbaum gilt als neue Datenquelle) — Frist 31.12.2026, Verantwortung A. Kellner.
3. Aufnahme des Sachverhalts in die Wiedervorlage vom 30.11.2026.

**Stellungnahme der geprüften Stelle (M. Sørensen, 08.10.2026).** *„Die Einordnung als Ergänzung
war aus unserer Sicht folgerichtig, weil das Quellsystem bereits freigegeben war. Wir schließen
uns der Empfehlung an und halten die vorgeschlagene Abgrenzung für praktikabel."*

---

### F2 — Mittel · Auflage A1 erfüllt, aber Wirksamkeitsnachweis lückenhaft

**Sachverhalt.** Der wöchentliche Kompaktierungslauf wurde am 04.08.2026 eingerichtet, also
fristgerecht vor dem 30.09.2026. Von den zehn seither fälligen Läufen sind acht protokolliert;
für die Kalenderwochen 36 und 38 fehlen Protokolle. Auf Nachfrage wurde erklärt, die Läufe seien
erfolgt, das Protokoll sei durch einen Fehler in der Aufbewahrung nicht geschrieben worden.

Die erneute Durchführung von T3 mit Index-Inspektion (V2, V3) fand am 22.09.2026 statt und ist
bestanden: 38.514 physische Einträge vor der Kompaktierung, 38.402 danach, Tombstones von 112 auf
0, Dateigröße von 491,8 MB auf 486,1 MB.

**Bewertung.** Mittel. Die Auflage ist inhaltlich erfüllt und der Nachweis der Unumkehrbarkeit
erbracht. Beanstandet wird die Lückenhaftigkeit der laufenden Protokollierung: Ein Nachweis, der
in zwei von zehn Fällen fehlt, trägt die Aussage „wöchentlich" nicht.

**Empfehlung.** Überwachung der Protokollerzeugung durch eine Fehlermeldung bei ausbleibendem
Lauf — Frist 31.12.2026, Verantwortung T. Brand.

---

### F3 — Mittel · Bearbeitungsfrist für gemeldete Falschauskünfte nicht festgelegt

**Sachverhalt.** Seit Produktivstart sind 61 Meldungen eingegangen, davon 54 bearbeitet und 7
offen. Die durchschnittliche Bearbeitungsdauer beträgt 11 Arbeitstage, die längste 34
Arbeitstage. Die im Readiness-Report vom 19.05.2026 als Auflage zu `AUD-03` vorgesehene
Festlegung einer Bearbeitungsfrist ist bis zum Prüfungsende nicht erfolgt; die Frist der Auflage
(30.11.2026) läuft noch.

In drei der geprüften zehn Fälle führte die Meldung zu einer Korrektur der Wissensbasis; in
sieben Fällen war die Auskunft zutreffend und die Meldung unbegründet.

**Bewertung.** Mittel. Der Meldeweg funktioniert und wird genutzt — die Auswertung ist belastbar.
Ohne Frist ist jedoch nicht bestimmt, ab wann eine unbearbeitete Meldung ein Mangel ist. Der Fall
mit 34 Arbeitstagen betraf eine Auskunft zu einer Meldeschwelle; hier ist eine kurze Frist
sachlich geboten.

**Empfehlung.** Differenzierte Frist festlegen (Vorschlag: 5 Arbeitstage bei Meldungen mit Bezug
zu regulatorischen Pflichten, 20 Arbeitstage im Übrigen) — Frist 30.11.2026 im Rahmen der
bestehenden Auflage, Verantwortung M. Sørensen.

---

### F4 — Gering · Zwei Protokollzugriffe ohne dokumentierten Anlass

**Sachverhalt.** Seit Produktivstart wurden fünf Zugriffe auf die Prompt-Protokolle vorgenommen.
Drei sind vollständig dokumentiert und dem Betriebsrat gemeldet. Bei zwei Zugriffen vom
19.08.2026 fehlt die Anlassdokumentation; das Vier-Augen-Prinzip war eingehalten, die Meldung an
den Betriebsrat erfolgte fristgerecht. Nach Auskunft der Beteiligten handelte es sich um die
Analyse einer technischen Störung.

**Bewertung.** Gering. Verfahren im Kern eingehalten, Dokumentation unvollständig.

**Empfehlung.** Anlassfeld im Zugriffsverfahren als Pflichtfeld ausgestalten — Frist 31.12.2026,
Verantwortung R. Mattis.

## 3. Bereiche ohne Beanstandung

| Prüfungshandlung | Ergebnis |
|---|---|
| **P1 `ZUG-01`** | Die Revision hat mit fünf eigenen Identitäten und drei selbst gewählten Dokumenten aus drei Sichtbarkeitsgruppen geprüft. In keinem Fall wurden Inhalte, Titel oder Fundstellen nicht berechtigter Dokumente ausgegeben; die protokollierten Retrieval-Ergebnisse zeigen, dass nicht berechtigte Fragmente nicht abgerufen werden. **Die Kontrolle wirkt.** |
| **P3 `BET-02`** | Regressionsläufe seit 01.07.2026 lückenlos (14 von 14). Die Verhandlung zur Ankündigungsfrist läuft; Zwischenstand vom 30.09.2026 liegt vor. Auflage A3 nicht fällig. |
| **P4 `BET-03`** | Kill-Switch-Protokoll vom 16.06.2026 vollständig. Unangekündigter Erreichbarkeitstest am 02.10.2026 um 21:40 Uhr: Rufbereitschaft nach 4 Minuten erreicht, Auslöseberechtigte benannt. |
| **P8 `KLA-03`** | Wiederholung von T10 am 15.09.2026 bestanden. Eigene Stichprobe über fünf abgelöste Richtlinien ohne Befund; Gültigkeitsangaben werden in der Antwort ausgewiesen. |
| **P9 `EVA-04`** | Erweiterter Test auf indirekte Prompt-Einschleusung am 25.09.2026 durchgeführt, Stichprobe von 120 Dokumenten, keine erfolgreiche Einschleusung. Auflage A4 erfüllt. |
| **P10** übrige 14 Kontrollen | Benannte Evidenz vorhanden und aktuell. |
| **P11** Belastbarkeit der Vorlage | **Beide Kennzahlen der Vorstandsvorlage sind belegt.** Die 91,1 % sind aus dem Messprotokoll vom 05.05.2026 nachvollziehbar; die −38 % beruhen auf der Ticketauswertung des Pilotbereichs im Zeitraum 20.01.–30.04.2026. Die Vorlage weist zutreffend darauf hin, dass keine Hochrechnung auf das Gesamthaus erfolgt ist. |

**Zu P11.** *Die Revision hebt hervor, dass die Freigabevorlage die Grenzen ihrer eigenen
Nutzenaussage benannt hat. Das ist nicht selbstverständlich und hat die Prüfung dieses Punktes
erheblich verkürzt.*

## 4. Maßnahmenübersicht

| Nr. | Feststellung | Gewicht | Maßnahme | Frist | Verantwortung |
|---|---|---|---|---|---|
| F1.1 | Neue Datenquelle | wesentlich | Bewertung nachholen oder Aufnahme zurücknehmen | 30.11.2026 | M. Sørensen / Dr. P. Ohlsen |
| F1.2 | Neue Datenquelle | wesentlich | Abgrenzung im Betriebskonzept präzisieren | 31.12.2026 | A. Kellner |
| F2 | Kompaktierungsprotokolle | mittel | Fehlermeldung bei ausbleibendem Lauf | 31.12.2026 | T. Brand |
| F3 | Bearbeitungsfrist | mittel | Differenzierte Frist festlegen | 30.11.2026 | M. Sørensen |
| F4 | Anlassdokumentation | gering | Anlassfeld als Pflichtfeld | 31.12.2026 | R. Mattis |

**Nachschau:** Die Erledigung wird im Rahmen der Maßnahmennachverfolgung geprüft; Bericht an den
Vorstand mit dem Quartalsbericht I/2027.

## 5. Bezug zur Wiedervorlage

Die Wiedervorlage an den Vorstand ist für den 30.11.2026 vorgesehen. Die Revision empfiehlt, F1
und F3 dort ausdrücklich zu behandeln, da beide vor diesem Termin fällig sind.

---

## Was dieser Bericht über das Verfahren zeigt

- **Die schwerste Feststellung war keine der bekannten Auflagen.** A1 bis A4 waren im Blick aller
  Beteiligten und wurden abgearbeitet. Der wesentliche Befund entstand dort, wo niemand hinsah:
  bei einer Routinehandlung, die formal in ein Verfahren fiel, das sie nicht als solche erkannte.
  Genau das ist der Grund, warum `BET-01` im Kontrollkatalog den Hinweis „der häufigste Befund im
  Betrieb" trägt.
- **Eine unpräzise Kontrolle ist eine unwirksame Kontrolle.** F1 ist kein Verschulden der
  Organisationsabteilung. Die Abgrenzung „neue Datenquelle" gegen „einzelne Dokumente" war nicht
  anhand eines prüfbaren Merkmals definiert — und ohne prüfbares Merkmal entscheidet im
  Zweifelsfall der Aufwand.
- **Die Prüfung der Vorlage selbst lohnt sich.** P11 hat bestätigt, was dem Vorstand gesagt
  wurde. Hätte sie es nicht bestätigt, wäre das die schwerste denkbare Feststellung gewesen —
  schwerer als jeder technische Mangel.
- **Sieben von zehn Bereichen ohne Beanstandung ist ein gutes Ergebnis**, kein
  Selbstverständlichkeit. Es ist die Folge davon, dass die Kontrollfunktionen ab Tag 1 beteiligt
  waren.

## Offene Punkte

- Der Prüfungszeitraum endete vor Ablauf der Frist für Auflage A3; nur Zwischenstand feststellbar.
- Die Aggregationsbewertung wurde nicht erneut geprüft, da sie zum Freigabezeitpunkt ohne Befund
  war und im Prüfungszeitraum keine Änderung der Wissensbasis vorlag — mit Ausnahme des unter F1
  festgestellten Sachverhalts, dessen Bewertung noch aussteht.
- Eine Prüfung des Dienstleisters Meridian AI B.V. vor Ort ist nicht erfolgt und war nicht
  Gegenstand; sie wäre bei einer Einstufung als kritische oder wichtige Funktion zu erwägen.

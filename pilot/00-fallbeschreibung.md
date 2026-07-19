# Pilot — Fallbeschreibung

> ⚠️ **Fiktives Institut, realer Prozess.** Die „Nordwind Bank AG" existiert nicht. Institut,
> Personen, Anbieter, Zahlen, Termine und Befunde sind frei erfunden und lehnen sich an kein
> reales Haus und keinen realen Kundenfall an. Was echt ist, ist der **Ablauf**: die Reihenfolge
> der Beteiligungen, die Art der Fragen, der Konflikt und die Form der Entscheidung.

> **Kein Rechtsrat.** Siehe [`../DISCLAIMER.md`](../DISCLAIMER.md).

---

## Warum es diesen Pilot gibt

Ein Vorlagensatz beweist sich nicht dadurch, dass er vollständig ist, sondern dadurch, dass
jemand ihn einmal von Anfang bis Ende benutzt hat. Dieser Ordner enthält einen vollständig
durchgespielten Freigabelauf: alle sieben Vorlagen ausgefüllt, eine Kontrollbewertung mit zwei
roten Kontrollen, ein dokumentierter Konflikt zwischen zwei Fachfunktionen samt Auflösung, und
am Ende eine Entscheidungsvorlage, die eine **Freigabe unter Auflagen** vorschlägt.

**Der Pilot ist bewusst nicht makellos.** Ein Beispiel, in dem alle Kontrollen grün sind, alle
Tests beim ersten Anlauf bestehen und alle Funktionen einer Meinung sind, würde jeder erfahrenen
Prüferin sofort auffallen — so läuft keine Freigabe. Die zwei roten Kontrollen und der
Drittstaaten-Konflikt bleiben drin, weil sie das Realistischste an diesem Dokumentensatz sind.

**Lesezeit:** etwa fünf Minuten für diese Seite und die
[Freigabevorlage](07-freigabevorlage-final.md). Wer den ganzen Lauf sehen will, liest danach die
ausgefüllten Vorlagen in [`akte/`](akte/) und den
[Readiness-Report](readiness-report.md).

## Das Institut

| Feld | Angabe *(fiktiv)* |
|---|---|
| Institut | Nordwind Bank AG |
| Art | Regionale Universalbank, CRR-Kreditinstitut |
| Bilanzsumme | rund 14 Mrd. EUR |
| Beschäftigte | rund 1.200 |
| Standorte | Zentrale plus 34 Filialen |
| Aufsichtlicher Rahmen | DORA (anwendbar seit 17.01.2025), MaRisk; BAIT seit 17.01.2025 nicht mehr anwendbar |
| Interne Revision | eigene Abteilung, 9 Personen |
| Informationssicherheit | ISB mit zwei Mitarbeitenden, direkt an den COO berichtend |

## Das Vorhaben

**NORA — Nordwind Richtlinien-Assistent.** Ein interner Assistent, der Fragen zu internen
Richtlinien, Arbeitsanweisungen und Prozessbeschreibungen beantwortet und dabei die Fundstelle
mitliefert.

| Feld | Angabe *(fiktiv)* |
|---|---|
| Nutzerkreis | alle 1.200 Beschäftigten |
| Wissensbasis | 812 Dokumente aus drei Quellsystemen (Richtliniendatenbank, Intranet-Handbuch, Ablage der Organisationsabteilung) |
| Erwartete Nutzung | rund 400 Anfragen pro Arbeitstag |
| Auslöser | Auswertung des Service-Desk: 31 % der Anfragen an die Organisationsabteilung sind Fragen nach bestehenden Regelungen |
| Nutzenerwartung | Entlastung der Organisationsabteilung; im Pilotbetrieb gemessen: Rückgang der Regelungsanfragen um 38 % im Pilotbereich |
| Kosten | 210 TEUR Aufbau, 95 TEUR p. a. laufend |

### Architektur in fünf Zeilen

| Komponente | Umsetzung *(fiktiv)* |
|---|---|
| Ingest und Chunking | eigenbetrieben, Rechenzentrum Bremen |
| Embedding-Modell | offenes Modell, **eigenbetrieben** — Inhalte verlassen dafür das Haus nicht |
| Vektorindex | eigenbetrieben, HNSW-basiert, **eigener Dateizugriff möglich** |
| Berechtigungsprüfung | zur Query-Zeit gegen das Verzeichnisdienst-Gruppenmodell |
| Antworterzeugung (LLM) | **Meridian AI B.V.**, Amsterdam — Modellinferenz in der EU-Region Frankfurt |

*Die Entscheidung, Embedding und Index selbst zu betreiben und nur die Antworterzeugung
einzukaufen, ist im Pilot bewusst so gesetzt: Sie ist in mittelgroßen Häusern verbreitet und
erzeugt genau die Konstellation, in der die Löschnachweisfrage beantwortbar ist (eigener
Index) — und die Drittparteifrage trotzdem gestellt werden muss (eingekaufte Inferenz).*

## Beteiligte

| Rolle | Funktion im Verfahren *(fiktive Personen)* |
|---|---|
| M. Sørensen | Leitung Organisation, **Fachverantwortung** und Auftraggeberin |
| T. Brand | Projektleitung NORA |
| A. Kellner | Enterprise-Architekt, führt die Freigabeakte zusammen |
| Dr. P. Ohlsen | Informationssicherheitsbeauftragte |
| R. Mattis | Datenschutzbeauftragter |
| S. Vogt | 2nd Line, IT-Risikocontrolling |
| C. Ahrens | Auslagerungsmanagement / DORA-Verantwortlicher |
| I. Bruns | Leitung Interne Revision (beratend beteiligt, ohne Freigabefunktion) |
| Vorstand | Entscheidungsgremium; Ressort COO |

*Die interne Revision ist beratend beteiligt und zeichnet nicht mit — sie prüft später, was
entschieden wurde. Diese Trennung ist im Pilot bewusst dargestellt, weil sie in der Praxis
regelmäßig verwischt wird.*

## Zeitlicher Ablauf des Freigabelaufs

| Datum *(fiktiv)* | Ereignis |
|---|---|
| 09.09.2025 | Projektstart; Architekt und ISB werden ab Tag 1 eingebunden |
| 21.10.2025 | Schutzbedarfsfeststellung, erste Fassung |
| 18.11.2025 | Einordnung durch das Auslagerungsmanagement: Meridian AI ist IKT-Drittdienstleister |
| 09.12.2025 | DSFA-Baustein, erste Fassung — **Drittstaaten-Frage wird aufgeworfen** |
| 20.01.2026 | Pilotbetrieb mit 60 Nutzenden aus der Organisationsabteilung |
| 11.02.2026 | Testlauf T1 (Negativ-Retrieval) — **nicht bestanden**, Quellenangaben zeigten Titel nicht berechtigter Dokumente |
| 06.03.2026 | Nachbesserung, T1 im zweiten Anlauf bestanden |
| 24.03.2026 | Konfliktklärung Drittstaaten-Frage zwischen Datenschutz und Auslagerungsmanagement |
| 28.04.2026 | Löschtest T3 — **nur teilweise bestanden**, Indexebene nicht belegbar |
| 19.05.2026 | Kontrollbewertung durch die 2nd Line ([Readiness-Report](readiness-report.md)) |
| 08.06.2026 | Finale Freigabeakte an den Vorstand |
| **24.06.2026** | **Vorstandsbeschluss: Freigabe unter vier Auflagen** |
| 30.11.2026 | Wiedervorlage vorgesehen |

**Zwei Beobachtungen aus diesem Ablauf**, die für die Übertragung wichtiger sind als die
Termine selbst:

1. **Der erste Berechtigungstest ist gescheitert** — und zwar an genau der Stelle, die
   [`ZUG-01`](../controls/controls.md) als typischen Befund beschreibt: Die Antwort war leer, die
   Quellenliste nannte den Titel. Zwischen Befund und bestandenem Nachtest lagen drei Wochen.
   Wer diesen Test erst kurz vor dem Gremientermin ansetzt, verliert einen Sitzungszyklus.
2. **Neun Monate vom Projektstart bis zum Beschluss** — davon etwa zwei Monate reine Wartezeit
   auf Gremien- und Abstimmungstermine. Das ist kein Bürokratieproblem, sondern der Normalfall.
   Es ist der Grund, warum [`06 Testnachweise`](../akte/06-testnachweise.md) verlangt, Nachweise
   *während* der Entwicklung zu erzeugen.

## Der dokumentierte Konflikt: die Drittstaaten-Frage

**Der Sachverhalt.** Meridian AI B.V. hat ihren Sitz in den Niederlanden und betreibt die
Modellinferenz in einer EU-Region. Bei der Vertragsprüfung stellte sich heraus, dass der
technische Support des Anbieters im 24/7-Betrieb über ein Partnerunternehmen mit Standort
außerhalb der EU erbracht wird und dieser Support im Störungsfall Zugriff auf Systemprotokolle
hat, die Anfrageinhalte enthalten können.

**Die beiden Positionen.**

| | Datenschutz (R. Mattis) | Auslagerungsmanagement (C. Ahrens) |
|---|---|---|
| Einschätzung | Ein Zugriffsweg aus einem Drittstaat ist eine Übermittlung, unabhängig vom Speicherort. Die Bewertung nach Art. 44–49 DSGVO ist nachzuholen. | Die Leistung wird in der EU erbracht; der Support ist eine Nebentätigkeit mit eng begrenztem Zugriff und war im Anbieterprofil so nicht erkennbar. |
| Konsequenz gefordert | Klärung vor Freigabe | Aufnahme als Auflage, Betrieb kann starten |

**Wie es aufgelöst wurde.** In der Sitzung am 24.03.2026 einigten sich beide Funktionen auf eine
Trennung der Frage in zwei Teile:

1. **Sofort umzusetzen (vor Produktivstart):** technische Reduktion der Angriffsfläche — die
   Systemprotokolle beim Anbieter werden auf Metadaten beschränkt, Anfrageinhalte werden nicht
   mehr an den Anbieter protokolliert. Damit entfällt der Inhalt, um den gestritten wurde.
2. **Als Auflage mit Frist (A2):** vertragliche Beschränkung des Support-Zugriffs auf Personal
   innerhalb der EU, mit schriftlicher Bestätigung des Anbieters; bis dahin wird die
   verbleibende Unsicherheit als Restrisiko in der Freigabevorlage ausgewiesen und vom Vorstand
   getragen.

**Warum dieser Konflikt im Pilot bleibt.** Weil er zeigt, wie eine Meinungsverschiedenheit
zwischen zwei Fachfunktionen sauber aufgelöst wird: nicht durch Rechthaben, sondern durch
Zerlegung in einen sofort behebbaren technischen Teil und einen vertraglichen Teil mit Frist und
benanntem Restrisikoträger. Die abweichende Auffassung ist in
[`akte/07`](akte/07-freigabevorlage.md), Abschnitt 7 ausdrücklich vermerkt — geglättet worden
wäre sie in vielen Häusern.

## Was rot geblieben ist

Zwei Kontrollen wurden von der 2nd Line als **nicht erfüllt** bewertet und in Auflagen überführt:

| Kontrolle | Befund | Auflage |
|---|---|---|
| [`LOE-02`](../controls/controls.md) Verifikation der Löschung im Vektorindex | Der Negativ-Retrieval-Test nach Löschung war erfolgreich, ein Nachweis auf Ebene der Indexdatei fehlte jedoch: gelöschte Vektoren blieben als markierte Einträge physisch erhalten, eine Kompaktierung war nicht eingerichtet. | A1 — wöchentlicher Kompaktierungslauf mit Protokoll, Nachweis der Unumkehrbarkeit bis 30.09.2026 |
| [`BET-02`](../controls/controls.md) Umgang mit anbieterseitigen Modelländerungen | Der Vertrag enthält keine Ankündigungsfrist für Modellaktualisierungen und keine Möglichkeit zur Versionsfestlegung. Eine Änderung des Antwortverhaltens könnte unbemerkt eintreten. | A3 — Nachverhandlung; bis dahin wöchentlicher automatisierter Regressionslauf gegen den Referenzfragenkatalog |

*`LOE-02` ist der Befund, um den es diesem Repository geht: Der funktionale Test war grün, und
in vielen Freigaben wäre die Löschung damit als nachgewiesen gegolten. Erst der Blick unter die
API-Ebene hat die Lücke sichtbar gemacht.*

## Wo Sie was finden

| Datei | Inhalt |
|---|---|
| [`akte/01`](akte/01-schutzbedarfsfeststellung.md) – [`akte/07`](akte/07-freigabevorlage.md) | alle sieben Vorlagen ausgefüllt |
| [`controls-assessment.yaml`](controls-assessment.yaml) | die Kontrollbewertung der 2nd Line als Datei |
| [`readiness-report.md`](readiness-report.md) | daraus gerendert, mit `tools/render_controls.py` |
| [`07-freigabevorlage-final.md`](07-freigabevorlage-final.md) | die Vorlage in der Fassung, die ins Gremium ging |

## Offene Punkte

- Der Pilot bildet eine mittelgroße Regionalbank ab. In einem Konzern kämen Gruppenfunktionen,
  eine gruppenweite Auslagerungssteuerung und ein zusätzlicher Abstimmungsweg hinzu; in einem
  kleinen Institut fielen Rollen zusammen und der Ablauf wäre kürzer.
- Die Beteiligung der Mitbestimmung ist im Pilot als abgeschlossen dargestellt, aber nicht
  ausgearbeitet — eine Betriebsvereinbarung zur Protokollierung wäre in der Realität ein eigener,
  mitunter der längste Strang.
- Der Pilot zeigt keinen abgelehnten Fall. Ein zweiter Durchlauf mit dem Ergebnis „keine
  Freigabe" wäre lehrreich und ist für eine spätere Version vorgemerkt.
- Die Kostenangaben sind erfunden und nicht als Richtwert geeignet.

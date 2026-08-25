# Filtern nach dem Abruf ist keine Berechtigungsprüfung

> **Fiktives Institut, realer Prozess.** Die „Südhafen Direktbank AG" existiert nicht. Institut,
> Personen, Anbieter, Zahlen und Befunde sind erfunden. Was echt ist, ist der Ablauf. **Kein
> Rechtsrat** — siehe [`DISCLAIMER.md`](../DISCLAIMER.md).

Eine Direktbank ohne Filialnetz baut einen Kundenassistenten. Er beantwortet Fragen zu Produkten
und Gebühren, und er beantwortet Fragen zu den eigenen Verträgen und Umsätzen der anfragenden
Person. Rund 900.000 Kundinnen und Kunden, rund 12.000 Anfragen am Tag, 1,4 Millionen Euro
Aufbau, Termin zur Frühjahrskampagne bereits an das Marketing zugesagt.

Am 17. Februar fragt ein Testkunde: *„Wie hoch war meine letzte Abbuchung?"* Er bekommt einen
Betrag. Der Betrag gehört einem anderen Kunden.

## Der erste Befund war ein Fehler

Die Berechtigungsprüfung fand zur Indexierungszeit statt. Zur Anfragezeit filterte das System
über ein Metadatenfeld `kundennummer`. Ein Fehler in der Ingest-Strecke hatte dieses Feld bei
einem Teil der Fragmente leer gelassen — und ein leeres Filterfeld hat in der eingesetzten
Konfiguration nicht ausgeschlossen, sondern durchgelassen.

Das ist ein Bug. Bugs werden behoben. Sechs Wochen später wurde nachgebessert und erneut
getestet.

## Der zweite Befund war die Architektur

Beim Wiederholungstest trat kein Kreuztreffer mehr auf. Die Prüfung ergab aber, dass die
Filterung weiterhin **nach** dem Retrieval stattfindet: Das System ruft Fragmente über den
gesamten Bestand ab und verwirft anschließend die, die nicht zur anfragenden Person gehören.

Das ist kein Fehler mehr. Das ist der Entwurf.

Was daraus folgt, ist unabhängig davon, ob der Filter gerade funktioniert:

- Fremde Kundendaten verlassen den Sicherheitsbereich, **bevor** die Prüfung greift.
- Je nach Trefferlage werden sie an das Modell des Anbieters übergeben — also an einen Dritten,
  bevor irgendjemand geprüft hat, ob die anfragende Person sie sehen darf.
- Jeder künftige Fehler in der Filterstufe ist wieder ein Datenabfluss, nicht bloß ein falsches
  Ergebnis. Die Fehlerklasse ist nicht behoben, nur ihre aktuelle Instanz.
- Der Nachweis, dass niemals etwas durchrutscht, muss für jede Anfrage geführt werden, statt
  einmal für die Architektur.

**Der Unterschied zwischen „noch nicht" und „so nicht" liegt genau hier.** Ein Filter, der nach
dem Abruf greift, kann beliebig gut sein und bleibt eine Kompensation. Eine Berechtigungsprüfung,
die vor dem Abruf greift, macht die Frage gegenstandslos.

Diese Lektion hat mit Bankenaufsicht nichts zu tun. Sie gilt für jedes Retrieval-System über
Daten mit unterschiedlichen Zugriffsrechten — Personalakten, Mandantendaten, Projektablagen,
Ticketsysteme. Die Bequemlichkeit ist immer dieselbe: Ein Metadatenfilter ist in zwei Zeilen
geschrieben, eine identitätsgebundene Suche kostet Umbau.

## Warum es trotzdem nicht daran allein lag

Von 23 Kontrollen standen am Ende 4 auf grün, 11 auf gelb und 8 auf rot. Die elf gelben sind
nicht die Nachricht — das wären in einer normalen Freigabe Auflagen mit Frist und
Verantwortlichem.

Die Nachricht sind die drei roten, die **keine Frist heilen kann**:

| Kontrolle | Befund |
|---|---|
| `ZUG-01` | Die Berechtigungsprüfung wirkt erst nach dem Abruf. |
| `BET-04` | Kundendaten gehen an einen Anbieter ohne EU-Verarbeitung; die Rechtsgrundlage der Drittlandübermittlung ist nicht belegt. |
| `LOE-02` | Die Löschung im verwalteten Vektorindex ist nicht nachweisbar, weil der Anbieter zur physischen Entfernung keine Auskunft gibt. |

Alle drei sind Konstruktions- und Vertragsentscheidungen. Keine davon lässt sich durch mehr
Sorgfalt in der Umsetzung schließen. Eine Auflage mit Frist wäre hier keine Auflage, sondern eine
Vertagung.

## Der eigentliche Fehler passierte zehn Wochen vorher

Die Informationssicherheit wurde am 12. Januar eingebunden — zehn Wochen nach Projektstart und
**nach** der Anbieterauswahl. Zu diesem Zeitpunkt waren Verträge geschlossen, eine Architektur
gebaut, ein Termin kommuniziert.

Damit war jeder Einwand automatisch ein Angriff auf einen Plan statt ein Beitrag zu einem
Entwurf. Das ist der einzige strukturelle Unterschied zu dem Fall, der freigegeben wurde — und er
erklärt das Ergebnis besser als jede technische Einzelheit.

## Wie man ein Nein aufschreibt

Das ist beruflich die unangenehmste Lage im ganzen Verfahren: Das System ist gebaut, das Budget
ist ausgegeben, der Termin ist kommuniziert, und die Person, die Nein sagen muss, sitzt in einer
Stabsfunktion ohne Weisungsbefugnis gegenüber denen, die Ja hören wollen.

Drei Dinge entscheiden, ob daraus eine Sachentscheidung wird statt eines Konflikts zwischen
Personen:

**Kontrollweise begründen, nicht im Gesamturteil.** „Das System ist nicht sicher" ist eine
Meinung. „`ZUG-01` rot, weil die Prüfung nach dem Abruf greift, Nachweis: Testprotokoll vom
31. März" ist überprüfbar. Wer widersprechen will, muss die Kontrolle angreifen, nicht die
Person.

**Den Termindruck in der Vorlage benennen.** Die Marketing-Zusage lag vor der
Freigabeentscheidung. Das steht ausdrücklich in der Vorlage — nicht als Vorwurf, sondern weil ein
Gremium wissen muss, welcher Druck auf einer Empfehlung lastet. Eine Vorlage, die den Druck
verschweigt, unter dem sie entstanden ist, ist unvollständig.

**Bedingungen mitliefern.** Die Vorlage nennt fünf Bedingungen, unter denen das Vorhaben
genehmigungsfähig wäre: drei Architekturänderungen, zwei vertragliche. Vier Wochen nach dem
Beschluss hat das Projekt mit der Neukonzeption begonnen. Ein Nein ohne Weg zum Ja ist eine
Blockade; ein Nein mit Bedingungen ist ein Auftrag.

## Die Akte liegt offen

Der vollständige Fall steht in diesem Repository: [Fallbeschreibung](../pilot-abgelehnt/00-fallbeschreibung.md),
[Kontrollbewertung](../pilot-abgelehnt/controls-assessment.yaml),
[Readiness-Report](../pilot-abgelehnt/readiness-report.md),
[Entscheidungsvorlage](../pilot-abgelehnt/07-freigabevorlage-final.md).

Er bleibt abgelehnt stehen. Das ist eine Invariante des Repositorys, keine Nachlässigkeit: Eine
Methode, die nur Freigaben produziert, hat nichts bewiesen.

*English version: [Filtering after retrieval is not an authorisation check](filterung-nach-dem-abruf.en.md).*

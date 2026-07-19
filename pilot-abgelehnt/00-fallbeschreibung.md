# Zweiter Pilot — der Fall, der keine Freigabe bekommt

> ⚠️ **Fiktives Institut, realer Prozess.** Die „Südhafen Direktbank AG" existiert nicht.
> Institut, Personen, Anbieter, Zahlen und Befunde sind frei erfunden und lehnen sich an kein
> reales Haus und keinen realen Kundenfall an. Was echt ist, ist der **Ablauf** — und die Art,
> wie ein Nein begründet und dokumentiert wird.

> **Kein Rechtsrat.** Siehe [`../DISCLAIMER.md`](../DISCLAIMER.md).

---

## Warum es diesen zweiten Fall gibt

Der [erste Pilot](../pilot/00-fallbeschreibung.md) endet mit einer Freigabe unter Auflagen. Das
ist der häufigste Ausgang — aber nicht der einzige, und es ist der bequemere. Er zeigt nicht, was
zu tun ist, wenn ein Vorhaben **nicht** genehmigungsfähig ist.

Diese Situation ist beruflich die unangenehmste im ganzen Verfahren. Das System ist gebaut, das
Budget ist ausgegeben, ein Termin ist kommuniziert — und die Person, die Nein sagen muss, sitzt
in einer Stabsfunktion ohne Weisungsbefugnis gegenüber denen, die Ja hören wollen. Wer das
schon einmal erlebt hat, weiß: Die Qualität der **Dokumentation** entscheidet darüber, ob aus
dem Nein eine Sachentscheidung wird oder ein Konflikt zwischen Personen.

**Was dieser Fall zeigen soll:**

1. Wie ein Nein so begründet wird, dass es überprüfbar ist statt persönlich.
2. Dass ein Nein immer mit dem **Weg zum Ja** verbunden gehört — sonst ist es nur eine Blockade.
3. Wie man den Unterschied zwischen „noch nicht" und „so nicht" sichtbar macht.
4. Dass die Ablehnung eines Vorhabens kein Scheitern des Verfahrens ist, sondern sein Beweis.

**Lesezeit:** fünf Minuten für diese Seite und die
[Entscheidungsvorlage](07-freigabevorlage-final.md).

## Das Institut

| Feld | Angabe *(fiktiv)* |
|---|---|
| Institut | Südhafen Direktbank AG |
| Art | Direktbank ohne Filialnetz, CRR-Kreditinstitut |
| Bilanzsumme | rund 31 Mrd. EUR |
| Kundinnen und Kunden | rund 900.000 Privatkunden |
| Beschäftigte | rund 780 |
| Aufsichtlicher Rahmen | DORA (anwendbar seit 17.01.2025), MaRisk |
| Besonderheit | Der Kundenservice ist der einzige Kundenkontaktpunkt — es gibt keine Filiale, in die jemand ausweichen kann |

## Das Vorhaben

**KIRA — Kundenassistent für Rückfragen und Auskünfte.** Ein Assistent im Online-Banking und in
der App, der Kundenfragen beantwortet: zu Produkten, zu Gebühren — **und zu den eigenen
Verträgen und Umsätzen der anfragenden Person**.

| Feld | Angabe *(fiktiv)* |
|---|---|
| Nutzerkreis | alle rund 900.000 Kundinnen und Kunden |
| Wissensbasis | 1.430 Produkt- und Prozessdokumente **plus** Vertrags- und Umsatzdaten aus dem Kernbanksystem |
| Erwartete Nutzung | rund 12.000 Anfragen pro Tag |
| Geschäftsziel | Entlastung des Kundenservice um 25 %, Reduktion der Wartezeiten |
| Zieltermin | Produktivstart zur Frühjahrskampagne, Marketing-Zusage bereits erfolgt |
| Kosten | 1,4 Mio. EUR Aufbau, 620 TEUR p. a. |

### Architektur

| Komponente | Umsetzung *(fiktiv)* |
|---|---|
| Ingest und Chunking | eigenbetrieben |
| Embedding-Erzeugung | **Anbieter Halcyon Systems Inc., US-Region Oregon** |
| Vektorindex | **verwalteter Dienst desselben Anbieters**, Region Oregon |
| Kundendatenzugriff | Live-Abfrage des Kernbanksystems zur Query-Zeit |
| Berechtigungsprüfung | **nur zur Indexierungszeit**; zur Query-Zeit filtert ein Metadatenfeld `kundennummer` |
| Antworterzeugung (LLM) | Halcyon Systems Inc., US-Region Oregon |

*Die entscheidenden Unterschiede zum ersten Pilotfall stecken in dieser Tabelle: kundenbezogene
Daten statt interner Richtlinien, ein Anbieter außerhalb der EU statt eines EU-Anbieters, ein
verwalteter Index statt eines eigenbetriebenen — und eine Berechtigungslogik, die auf einem
Metadatenfeld beruht statt auf einer echten Prüfung zur Anfragezeit.*

## Beteiligte

| Rolle | Funktion im Verfahren *(fiktive Personen)* |
|---|---|
| J. Reinhardt | Leitung Digitalvertrieb, Auftraggeberin und Sponsorin |
| K. Öztürk | Projektleitung KIRA |
| B. Salzmann | Enterprise-Architekt |
| Dr. H. Wiegand | Informationssicherheitsbeauftragter |
| L. Feddersen | Datenschutzbeauftragte |
| N. Pallas | 2nd Line, IT-Risikocontrolling |
| E. Bruckner | Auslagerungsmanagement / DORA-Verantwortlicher |
| Vorstand | Entscheidungsgremium; Ressorts Vertrieb und COO |

## Zeitlicher Ablauf

| Datum *(fiktiv)* | Ereignis |
|---|---|
| 03.11.2025 | Projektstart; Beauftragung durch den Vertriebsvorstand |
| 12.01.2026 | Erste Einbindung der Informationssicherheit — **nach** der Anbieterauswahl |
| 26.01.2026 | Auslagerungsmanagement stellt fest: Einordnung als IKT-Drittdienstleister nicht erfolgt |
| 17.02.2026 | Erster Negativ-Retrieval-Test — **nicht bestanden**, siehe unten |
| 24.02.2026 | Nachbesserung angekündigt; Zieltermin wird bekräftigt |
| 31.03.2026 | Wiederholung des Tests — **erneut nicht bestanden** |
| 20.04.2026 | Löschtest — nicht durchführbar, Anbieter macht keine Angaben zur Indexebene |
| 05.05.2026 | Kontrollbewertung der 2nd Line ([Readiness-Report](readiness-report.md)) |
| 19.05.2026 | Eskalationsgespräch Vertrieb / Informationssicherheit / Datenschutz |
| 02.06.2026 | Vorlage an den Vorstand mit **Empfehlung: keine Freigabe** |
| **09.06.2026** | **Vorstandsbeschluss: keine Freigabe. Neuvorlage nach Umsetzung der Bedingungen.** |
| 31.03.2027 | Angestrebte Neuvorlage |

## Der Befund, an dem alles hängt

**Am 17.02.2026 erhielt ein Testkunde in der Antwort auf die Frage „Wie hoch war meine letzte
Abbuchung?" einen Betrag, der zu einem anderen Kunden gehörte.**

Ursache war keine Panne, sondern die Konstruktion: Die Berechtigungsprüfung fand zur
Indexierungszeit statt; zur Anfragezeit wurde lediglich über ein Metadatenfeld `kundennummer`
gefiltert. Bei semantisch ähnlichen Anfragen lieferte die Vektorsuche Fragmente, deren
Metadatenfeld durch einen Fehler in der Ingest-Strecke leer war — und ein leeres Filterfeld hat
in der eingesetzten Konfiguration nicht ausgeschlossen, sondern durchgelassen.

Nach der Nachbesserung wurde am 31.03.2026 erneut getestet. Diesmal trat kein Kreuztreffer mehr
auf, aber die Prüfung ergab, dass die Filterung weiterhin **nach** dem Retrieval erfolgt: Das
System ruft Fragmente aller Kunden ab und verwirft anschließend die nicht passenden. Damit
verlassen fremde Kundendaten den Sicherheitsbereich, bevor die Prüfung greift — und sie werden,
je nach Trefferlage, an das Modell des Anbieters übergeben.

*Genau das ist der Unterschied zwischen einem behebbaren Fehler und einem konstruktiven Mangel.
Der erste Testbefund war ein Fehler. Der zweite war die Architektur.*

## Warum es am Ende acht rote Kontrollen waren

| # | Befund | Kontrolle | Bewertung |
|---|---|---|---|
| 1 | Berechtigungsprüfung wirkt erst nach dem Retrieval; Kreuztreffer im Test | `ZUG-01` | rot |
| 2 | Kundendaten werden an einen Anbieter ohne EU-Verarbeitung übermittelt; Rechtsgrundlage der Drittlandübermittlung nicht belegt | `BET-04` | rot |
| 3 | Löschung im verwalteten Vektorindex nicht nachweisbar; Anbieter macht keine Angaben zur physischen Entfernung | `LOE-02` | rot |
| 4 | Kein Referenzfragenkatalog; Qualität wird über Daumen-hoch-Rückmeldungen gemessen | `EVA-01` | rot |
| 5 | Einordnung als IKT-Drittdienstleister und Eintrag im Informationsregister fehlten bei Projektstart | `BET-04` | rot |
| 6 | Auskünfte zu Gebühren und Produktkonditionen gegenüber Kunden ohne Prüfpfad; Verhältnis zu vorvertraglichen Informationspflichten ungeklärt | `EVA-03` | rot |
| 7 | Keine Aggregationsbewertung, obwohl Vertrags- und Umsatzdaten mit Produktinformationen zusammengeführt werden | `ZUG-04` | rot |
| 8 | Kein Verfahren, Löschverlangen nach einer Wiederherstellung erneut anzuwenden | `LOE-03` | rot |
| — | Zusätzlich: bei nicht existierenden Produkten wurden 7 von 20 Fragen frei erfunden beantwortet | `EVA-02` | rot |

Insgesamt: **4 grün, 11 gelb, 8 rot** von 23 Kontrollen. Die elf gelben sind dabei nicht die
Nachricht — sie wären in einer normalen Freigabe Auflagen. Die Nachricht sind die drei roten
Kontrollen, die sich **nicht durch eine Frist heilen lassen**: `ZUG-01` (Berechtigungsprüfung
wirkt erst nach dem Abruf), `BET-04` (Kundendaten außerhalb der EU ohne belastbare Grundlage) und
`LOE-02` (Löschung nicht nachweisbar, weil der Anbieter keine Auskunft gibt). Das sind
Konstruktionsentscheidungen, keine Umsetzungslücken.

**Zur Einordnung als kritische oder wichtige Funktion.** Anders als im ersten Pilotfall lautet
die Antwort hier **ja**: KIRA sollte in den einzigen Kundenkontaktkanal eines Instituts ohne
Filialnetz eingebettet werden, mit dem erklärten Ziel, den Kundenservice um 25 % zu entlasten.
Damit hängt die Erreichbarkeit für Kundinnen und Kunden nach dem geplanten Personalabbau am
System. Das erhöht die Anforderungen aus DORA erheblich — und keine davon war zum
Bewertungszeitpunkt erfüllt.

## Was der Fall über den Prozess zeigt

**Der Zeitpunkt der ersten Einbindung erklärt fast alles.** Die Informationssicherheit wurde am
12.01.2026 eingebunden — zehn Wochen nach Projektstart und **nach** der Anbieterauswahl. Zu
diesem Zeitpunkt waren Verträge geschlossen, eine Architektur gebaut und ein Termin kommuniziert.
Jeder Einwand war damit automatisch ein Angriff auf einen Plan statt ein Beitrag zu einem
Entwurf. Im ersten Pilotfall war die Informationssicherheit ab Tag 1 dabei; das ist der einzige
strukturelle Unterschied zwischen den beiden Fällen, und er erklärt das Ergebnis besser als
jede technische Einzelheit.

**Der Druck war real und wurde benannt.** Die Marketing-Zusage für die Frühjahrskampagne lag vor
der Freigabeentscheidung. In der Vorlage ist das ausdrücklich vermerkt — nicht als Vorwurf,
sondern weil ein Gremium wissen muss, welcher Termindruck auf einer Empfehlung lastet. *Eine
Vorlage, die den Druck verschweigt, unter dem sie entstanden ist, ist unvollständig.*

**„Keine Freigabe" heißt nicht „nie".** Die Vorlage enthält fünf Bedingungen, unter denen das
Vorhaben genehmigungsfähig wäre — drei davon sind Architekturänderungen, zwei sind vertraglich.
Vier Wochen nach dem Beschluss hat das Projekt mit der Neukonzeption begonnen. *Ein Nein ohne
Weg zum Ja ist eine Blockade; ein Nein mit Bedingungen ist ein Auftrag.*

## Was hier bewusst nicht enthalten ist

Dieser zweite Fall enthält **nicht** noch einmal alle acht ausgefüllten Vorlagen. Das wäre
Wiederholung ohne Erkenntnisgewinn — die Vorlagen sind im
[ersten Pilot](../pilot/) vollständig ausgefüllt zu sehen. Hier steht das, was den zweiten Fall
ausmacht:

| Datei | Inhalt |
|---|---|
| diese Seite | Fall, Beteiligte, Ablauf, die sechs Befunde |
| [`controls-assessment.yaml`](controls-assessment.yaml) | die Kontrollbewertung der 2nd Line |
| [`readiness-report.md`](readiness-report.md) | daraus gerendert |
| [`07-freigabevorlage-final.md`](07-freigabevorlage-final.md) | die Vorlage mit der Empfehlung „keine Freigabe" und den fünf Bedingungen |

## Offene Punkte

- Der Fall zeigt eine Ablehnung, die von den Fachfunktionen **und** vom Gremium getragen wird.
  Der schwierigere Fall — das Gremium entscheidet gegen die Empfehlung der Fachfunktionen —
  ist hier nicht dargestellt. Für diesen Fall gilt: Die abweichende Auffassung gehört ins
  Protokoll, und die Fachfunktion dokumentiert ihre Bewertung unverändert. Ein ausgearbeitetes
  Beispiel dafür fehlt und ist vorgemerkt.
- Das Verhältnis von automatisierten Kundenauskünften zu vorvertraglichen Informations- und
  Beratungspflichten ist hier nur als Befund benannt, nicht ausgearbeitet. Das ist eine
  Rechtsfrage, für die dieses Repository nicht der richtige Ort ist.
- Ob und wann KIRA nach der Neukonzeption freigegeben wurde, ist bewusst offengelassen. Der
  Fall endet mit dem Beschluss, nicht mit einem Happy End.

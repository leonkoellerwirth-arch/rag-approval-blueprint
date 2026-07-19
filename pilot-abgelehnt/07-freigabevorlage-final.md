# Die Vorlage, mit der ein Vorhaben abgelehnt wurde

> ⚠️ **Fiktives Institut, realer Prozess.** Südhafen Direktbank AG ist frei erfunden; Personen,
> Anbieter, Zahlen und Befunde sind konstruiert. Der Ablauf ist echt. Siehe
> [`00-fallbeschreibung.md`](00-fallbeschreibung.md).
>
> **Kein Rechtsrat.** Siehe [`../DISCLAIMER.md`](../DISCLAIMER.md).

**Worauf es bei dieser Vorlage ankommt.** Eine Vorlage, die eine Freigabe empfiehlt, muss
überzeugen. Eine Vorlage, die eine Ablehnung empfiehlt, muss **überprüfbar** sein. Der
Unterschied ist praktisch: Sie wird von Menschen gelesen, die eine andere Entscheidung wollten,
und sie wird später von der Revision gelesen, die wissen will, ob die Sache sauber begründet
war.

Drei Regeln, die dieser Vorlage ihre Form geben:

1. **Befund vor Bewertung.** Jede Aussage beginnt mit dem, was beobachtet wurde — Datum, Test,
   Ergebnis. Die Wertung kommt danach und ist als Wertung erkennbar.
2. **Kein Nein ohne Weg zum Ja.** Fünf Bedingungen, unter denen das Vorhaben genehmigungsfähig
   wäre. Ohne sie ist eine Ablehnung eine Blockade und wird als solche behandelt.
3. **Der Termindruck wird benannt, nicht beklagt.** Das Gremium muss wissen, unter welchem Druck
   die Empfehlung entstanden ist — sonst kann es die Empfehlung nicht einordnen.

---

<br>

**SÜDHAFEN DIREKTBANK AG — VORSTANDSVORLAGE**

**Vorlage 2026-018 · Sitzung vom 09.06.2026 · Ressorts Vertrieb und COO · Einstufung: intern**

# Freigabeentscheidung Kundenassistent KIRA

**Vorgelegt von:** K. Öztürk (Projektleitung) und B. Salzmann (Enterprise-Architektur), unter
Beifügung der abweichenden Stellungnahmen der Informationssicherheit, des Datenschutzes und der
2nd Line · 02.06.2026

## Beschlussvorschlag

> Der Vorstand erteilt dem Kundenassistenten KIRA **keine Freigabe** für den produktiven Betrieb.
> Er beauftragt den Projektbereich, die unter „Bedingungen für eine Neuvorlage" genannten Punkte
> B1 bis B5 umzusetzen, und nimmt die Vorlage nach deren Erfüllung erneut zur Entscheidung
> entgegen, angestrebt zum 31.03.2027. Der Vorstand nimmt zur Kenntnis, dass der für die
> Frühjahrskampagne kommunizierte Termin damit nicht gehalten werden kann.

**Entscheidungsalternativen:** Keine Freigabe (empfohlen) · Freigabe für einen begrenzten
Kundenkreis · Freigabe unter Auflagen mit Fristen · Vertagung.

**Warum die zweite und dritte Alternative nicht tragen.** Eine Beschränkung auf einen kleineren
Kundenkreis mindert das Risiko nicht: Der Befund zu ZUG-01 tritt bei **jeder einzelnen Anfrage**
ein, nicht ab einer bestimmten Zahl von Nutzenden. Und Auflagen mit Fristen setzen voraus, dass
die Kontrolle im Grundsatz wirkt und nur der Nachweis fehlt — das ist hier bei drei Kontrollen
nicht der Fall. Sie betreffen die Konstruktion des Systems und die Vertragslage, nicht deren
Dokumentation.

## Sachverhalt

KIRA soll Kundinnen und Kunden im Online-Banking Fragen zu Produkten, Gebühren und **ihren
eigenen Verträgen und Umsätzen** beantworten. Ziel ist die Entlastung des Kundenservice um 25 %.
Suche, Vektorindex und Antworterzeugung laufen bei Halcyon Systems Inc. in der US-Region Oregon;
die Kundendaten werden zur Anfragezeit aus dem Kernbanksystem beigesteuert.

| | |
|---|---|
| Nutzerkreis | rund 900.000 Kundinnen und Kunden · rund 12.000 Anfragen je Tag |
| Wissensbasis | 1.430 Dokumente **plus** Vertrags- und Umsatzdaten |
| Kosten | 1,4 Mio. EUR Aufbau · 620 TEUR p. a. |
| Aufsichtliche Einordnung | Nach Auffassung der 2nd Line **kritische oder wichtige Funktion** (DORA Art. 3 Nr. 22) — abweichende Auffassung des Projektbereichs, siehe unten |
| Kontrollbewertung | **4 grün · 11 gelb · 8 rot** von 23 Kontrollen |

## Die drei Befunde, die der Freigabe entgegenstehen

**1. Die Berechtigungsprüfung wirkt erst nach dem Abruf** *(Kontrolle ZUG-01)*

Am 17.02.2026 erhielt ein Testkunde auf die Frage nach seiner letzten Abbuchung einen Betrag, der
zu einem anderen Kunden gehörte. Ursache war ein leeres Metadatenfeld, das in der eingesetzten
Konfiguration nicht ausschließt, sondern durchlässt. Nach Nachbesserung trat im Wiederholungstest
am 31.03.2026 kein solcher Treffer mehr auf; die Prüfung ergab jedoch, dass die Filterung
weiterhin **nach** dem Abruf erfolgt. Das System ruft Fragmente aller Kundinnen und Kunden ab und
verwirft anschließend die nicht passenden.

*Bewertung:* Die Kontrolle ist damit nicht wirksam, sondern nachgelagert. Fremde Kundendaten
verlassen den Sicherheitsbereich, bevor die Prüfung greift.

**2. Kundendaten werden ohne belastbare Grundlage in die USA übermittelt** *(Kontrolle BET-04)*

Halcyon Systems Inc. verarbeitet ausschließlich in der US-Region Oregon; eine EU-Region wird
nicht angeboten. Der Anbieter war bei Projektstart nicht als IKT-Drittdienstleister eingeordnet
und nicht im Informationsregister erfasst; beides wurde am 26.01.2026 nachgeholt — nach
Vertragsschluss. Eine Transferfolgenabschätzung liegt nicht vor. Eine Exit-Strategie ist nicht
beschrieben, ein Ausweichanbieter nicht bewertet.

*Bewertung:* Die Übermittlung von Vertrags- und Umsatzdaten von rund 900.000 Personen ohne
dokumentierte Grundlage ist nicht vertretbar.

**3. Die Löschung ist nicht nachweisbar** *(Kontrolle LOE-02)*

Der Vektorindex ist ein verwalteter Dienst des Anbieters; eine Prüfung auf Ebene der Indexdateien
ist dem Institut nicht möglich. Auf schriftliche Anfrage vom 07.04.2026 hat der Anbieter am
20.04.2026 mitgeteilt, gelöschte Vektoren würden „gemäß interner Aufbewahrungsrichtlinie"
entfernt — ohne Frist, ohne Verfahren, ohne Zusicherung zur physischen Entfernung.

*Bewertung:* Ein Löschverlangen nach Art. 17 DSGVO kann derzeit nicht nachweisbar vollzogen
werden. Das ist keine Dokumentationslücke, sondern eine fehlende Fähigkeit.

**Die übrigen fünf roten Kontrollen** — fehlender Referenzfragenkatalog, erfundene Antworten auf
Fragen zu nicht existierenden Produkten (7 von 20 in der Stichprobe der 2nd Line), fehlende
Quellenbindung bei Gebührenauskünften, fehlende Aggregationsbewertung und fehlendes
Löschverfahren nach Wiederherstellung — sind gravierend, aber **behebbar ohne Umbau**. Sie
allein hätten eine Freigabe unter Auflagen zugelassen.

## Bedingungen für eine Neuvorlage

| | Bedingung | Art |
|---|---|---|
| **B1** | Umbau auf eine Berechtigungsprüfung, die **vor** dem Abruf wirkt (Filterung im Index statt Verwerfen nach dem Treffer), anschließend Negativ-Retrieval-Test mit mindestens 200 kundenübergreifenden Anfragen, extern begleitet | Architektur |
| **B2** | Verarbeitung der Kundendaten in der EU — oder eine dokumentierte, belastbare Grundlage der Drittlandübermittlung einschließlich Transferfolgenabschätzung **und** eine verbindliche Anbieterzusage zu Verfahren und Frist der physischen Löschung; alternativ Verlagerung des Index in den eigenen Verantwortungsbereich oder Krypto-Shredding mit institutsseitiger Schlüsselhoheit | Architektur / Vertrag |
| **B3** | Durchgängige Quellenbindung mit Fundstelle und Stand für alle Auskünfte zu Gebühren und Konditionen, sowie eine rechtliche Bewertung der Auskunftserteilung gegenüber Kundinnen und Kunden | Architektur / Recht |
| **B4** | Aggregationsbewertung gemeinsam mit Datenschutz und Fachbereich, mit dokumentierten Hypothesen und Maßnahmen | Verfahren |
| **B5** | Referenzfragenkatalog durch den Fachbereich, mit hinterlegten Sollantworten, getrennter Kategorie für nicht beantwortbare Fragen und definiertem Schwellenwert; danach Wiederholung der Qualitäts- und Regressionstests | Verfahren |

Die elf gelb bewerteten Kontrollen sind in der
[Kontrollbewertung](readiness-report.md) mit Maßnahmen hinterlegt und bis zur Neuvorlage
mitzuerledigen.

**Aufwandsabschätzung des Projektbereichs für B1 bis B5:** 7 bis 9 Monate, 480 bis 620 TEUR
zusätzlich. *Diese Zahl stammt vom Projektbereich und wurde von der 2nd Line nicht geprüft.*

## Stellungnahmen

| Funktion | Stellungnahme | Datum |
|---|---|---|
| Informationssicherheit (Dr. H. Wiegand) | **keine Freigabe** | 28.05.2026 |
| Datenschutz (L. Feddersen) | **keine Freigabe** | 29.05.2026 |
| 2nd Line (N. Pallas) | **keine Freigabe** | 05.05.2026 |
| Auslagerungsmanagement (E. Bruckner) | **keine Freigabe**, solange B2 offen ist | 27.05.2026 |
| Fachbereich / Digitalvertrieb (J. Reinhardt) | Freigabe unter Auflagen befürwortet | 01.06.2026 |

### Abweichende Auffassung des Fachbereichs (dokumentiert)

Die Leitung Digitalvertrieb hält eine Freigabe unter Auflagen für vertretbar und begründet dies
mit drei Punkten: Der Kreuztreffer vom 17.02.2026 sei behoben und im Wiederholungstest nicht
mehr aufgetreten; der Anbieter sei ein etabliertes Unternehmen mit Standardvertragsklauseln; und
eine Verzögerung um mehr als ein Jahr gefährde die Wirtschaftlichkeit des Vorhabens insgesamt.
Sie hält die Einordnung als kritische oder wichtige Funktion für überzogen, weil der
Kundenservice weiterhin telefonisch erreichbar bleibe.

**Erwiderung der 2nd Line.** Der behobene Einzelfall ist nicht der Befund; der Befund ist die
Reihenfolge von Abruf und Prüfung, die unverändert besteht. Standardvertragsklauseln ersetzen
keine Transferfolgenabschätzung. Zur Einordnung: Der Personalabbau im Kundenservice um 25 % ist
Teil des Geschäftsfalls dieses Vorhabens — die telefonische Erreichbarkeit bleibt also gerade
nicht unverändert.

*Beide Auffassungen stehen hier nebeneinander, weil das Gremium entscheidet und nicht die
Fachfunktion. Die Aufgabe der Vorlage ist, die Entscheidung möglich zu machen — nicht, sie
vorwegzunehmen.*

## Hinweis zum Termindruck

Für die Frühjahrskampagne wurde extern ein Termin kommuniziert, bevor die Freigabeentscheidung
vorlag. Dieser Umstand hat auf die fachliche Bewertung keinen Einfluss gehabt, ist für das
Gremium aber entscheidungserheblich: Eine Ablehnung hat hier eine Außenwirkung, die eine
Ablehnung ohne kommunizierten Termin nicht hätte. *Der Hinweis steht in der Vorlage, weil ein
Gremium nicht nachträglich erfahren sollte, unter welchem Druck eine Empfehlung entstanden ist.*

---

## Beschluss (Protokollauszug)

> Der Vorstand erteilt KIRA keine Freigabe für den produktiven Betrieb. Der Projektbereich wird
> beauftragt, die Bedingungen B1 bis B5 umzusetzen; die Neuvorlage wird zum 31.03.2027
> angestrebt. Der Vorstand stellt fest, dass die Einbindung der Kontrollfunktionen erst nach der
> Anbieterauswahl erfolgt ist, und beauftragt den COO, für künftige Vorhaben mit
> Kundendatenbezug eine verbindliche Beteiligung ab der Konzeptphase sicherzustellen. Die
> Kommunikation zur Frühjahrskampagne wird zurückgezogen.
>
> *Südhafen Direktbank AG, Vorstandssitzung vom 09.06.2026, TOP 4.*

**Der zweite Satz des Beschlusses ist der wichtigere.** *Er richtet sich nicht gegen dieses
Vorhaben, sondern gegen die Ursache — und ist damit der einzige Teil der Entscheidung, der über
den Einzelfall hinaus wirkt.*

---

## Was dieser Fall zeigt

- **Der Zeitpunkt der Einbindung entscheidet über das Ergebnis.** Der einzige strukturelle
  Unterschied zum [ersten Pilotfall](../pilot/00-fallbeschreibung.md) ist, dass die
  Kontrollfunktionen dort ab Tag 1 dabei waren und hier zehn Wochen nach Projektstart, nach der
  Anbieterauswahl. Alles Weitere folgt daraus.
- **„Behoben" ist nicht dasselbe wie „nicht mehr vorhanden".** Der Kreuztreffer trat im
  Wiederholungstest nicht mehr auf — die Ursache bestand fort. Ein Test, der einen Symptomfall
  nicht mehr reproduziert, belegt keine wirksame Kontrolle.
- **Ein Nein ist überprüfbar zu formulieren, nicht überzeugend.** Befund, Datum, Test, Ergebnis —
  danach die Wertung, als Wertung erkennbar. Wer eine Ablehnung mit Adjektiven begründet, macht
  sie angreifbar.
- **Ein Nein braucht den Weg zum Ja.** Fünf Bedingungen, davon drei architektonische. Vier Wochen
  nach dem Beschluss hat der Projektbereich mit der Neukonzeption begonnen — das ist das Ergebnis
  einer Ablehnung, die einen Auftrag enthält, statt nur eine Verweigerung.
- **Die abweichende Auffassung gehört in die Vorlage.** Auch und gerade, wenn sie vom
  Auftraggeber kommt.

## Offene Punkte

- Der Fall zeigt ein Gremium, das der Empfehlung folgt. Der schwierigere Fall — das Gremium
  entscheidet **gegen** die Fachfunktionen — ist nicht dargestellt. Für ihn gilt: Die abweichende
  Bewertung bleibt unverändert dokumentiert, sie wandert ins Protokoll, und die Fachfunktion
  vermerkt, dass ihre Empfehlung nicht übernommen wurde. Ein ausgearbeitetes Beispiel fehlt.
- Ob KIRA nach der Neukonzeption freigegeben wurde, bleibt offen. Der Fall endet mit dem
  Beschluss.

# 08 — Mitbestimmung und Betriebsvereinbarung

> **Wer benutzt dieses Dokument?** Projektleitung und Personalabteilung gemeinsam mit dem
> Datenschutzbeauftragten; Adressat ist der Betriebsrat.
> **In welchem Prozess?** Das Mitbestimmungsverfahren — Unterrichtung, Beratung und der Abschluss
> einer Betriebsvereinbarung, bevor das System in Betrieb geht.
> **Wer prüft es?** Die interne Revision (liegt eine wirksame Vereinbarung vor?), der Datenschutz
> (trägt sie die Zweckbindung?) und im Streitfall die Einigungsstelle.

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Governance-Logik, keine
> Rechtsberatung. Arbeitsrecht ist einzelfallabhängig und in öffentlich-rechtlichen Häusern gilt
> ein anderes Regime (siehe Abschnitt 1). Ziehen Sie Ihre Rechtsabteilung hinzu. Siehe
> [`DISCLAIMER.md`](../DISCLAIMER.md).

**Ausfüllhinweis — warum dieses Dokument existiert.** In fast jedem Freigabelauf für ein
Assistenzsystem ist die Mitbestimmung der **längste** Strang: nicht der technisch schwierigste,
aber der mit den meisten Terminen und der geringsten Steuerbarkeit. Wer sie am Ende „noch
schnell" einholt, verliert Monate. Wer sie ab Tag 1 mitführt, hat sie zum Freigabetermin
abgeschlossen.

Der Grund ist einfach: Ein RAG-System protokolliert, **wer wann was gefragt hat**. Das ist eine
Verhaltensinformation über Beschäftigte — unabhängig davon, ob jemand sie auswerten will.

*Alle Fundstellen wurden im Juli 2026 gegen den Gesetzestext geprüft; siehe
[Quellen](../docs/quellen.md).*

---

## 1. Anwendbarkeit prüfen (zuerst)

| Frage | Antwort |
|---|---|
| Besteht ein Betriebsrat? | `<ja/nein>` |
| Welches Recht gilt? | `<BetrVG / Landespersonalvertretungsgesetz / Bundespersonalvertretungsgesetz / kirchliches Arbeitsrecht>` |
| Zuständigkeit | `<örtlicher Betriebsrat / Gesamtbetriebsrat / Konzernbetriebsrat>` |
| Besteht bereits eine Rahmen-BV zu IT-Systemen? | `<ja/nein — falls ja: greift sie hier, oder braucht es eine eigene?>` |
| Tarifvorbehalt geprüft? | `<§ 77 Abs. 3 BetrVG — ist der Gegenstand tariflich geregelt?>` |
| Sprecherausschuss für leitende Angestellte betroffen? | `<…>` |

**Der Zuständigkeitsfehler, der Zeit kostet.** *Ein Assistenzsystem, das konzernweit einheitlich
eingeführt wird, ist regelmäßig Sache des Gesamt- oder Konzernbetriebsrats, nicht des örtlichen.
Wer mit dem falschen Gremium verhandelt, hat am Ende eine Vereinbarung, die nicht trägt. Klären
Sie die Zuständigkeit schriftlich, bevor die erste Sitzung stattfindet.*

**Für öffentlich-rechtliche Institute** — Sparkassen, Landesbanken, Anstalten öffentlichen Rechts
— gilt statt des BetrVG das jeweilige **Personalvertretungsrecht** des Bundes oder des Landes.
Die Systematik ist ähnlich, die Fundstellen sind andere; diese Vorlage nennt bewusst nur die
BetrVG-Fundstellen und ist im Übrigen sinngemäß zu übertragen.

## 2. Warum die Mitbestimmung hier greift

Die einschlägige Norm ist **§ 87 Abs. 1 Nr. 6 BetrVG** (Mitbestimmungsrechte). Der Betriebsrat
hat mitzubestimmen bei der

> „Einführung und Anwendung von technischen Einrichtungen, die dazu bestimmt sind, das Verhalten
> oder die Leistung der Arbeitnehmer zu überwachen"

**Der entscheidende Punkt.** Nach gefestigter Rechtsprechung des Bundesarbeitsgerichts genügt die
**objektive Eignung** der Einrichtung zur Überwachung; auf eine Überwachungsabsicht des
Arbeitgebers kommt es **nicht** an. Ein Prompt-Protokoll, das Nutzeridentität, Zeitpunkt und
Anfrage verbindet, ist objektiv geeignet, Verhalten abzubilden — auch dann, wenn niemand vorhat,
es auszuwerten, und auch dann, wenn der Zugriff darauf technisch beschränkt ist.

*Erfahrungsgemäß ist genau das der Satz, der in der Projektsitzung Widerspruch auslöst („Wir
werten das doch gar nicht aus!"). Er ist trotzdem richtig, und ihn früh auszusprechen ist
billiger, als ihn später vom Betriebsrat zu hören.*

### Weitere einschlägige Vorschriften — mit ausdrücklichem KI-Bezug

Der Gesetzgeber hat die Mitwirkung bei künstlicher Intelligenz an drei Stellen ausdrücklich
adressiert. Das ist für die Argumentation nützlich, weil es die Diskussion aus dem
Grundsätzlichen holt:

| Fundstelle | Titel | Was sie sagt |
|---|---|---|
| **§ 90 Abs. 1 Nr. 3 BetrVG** | Unterrichtungs- und Beratungsrechte | Der Arbeitgeber hat den Betriebsrat über die Planung „von Arbeitsverfahren und Arbeitsabläufen **einschließlich des Einsatzes von Künstlicher Intelligenz**" rechtzeitig und unter Vorlage der erforderlichen Unterlagen zu unterrichten. |
| **§ 80 Abs. 3 Satz 2 BetrVG** | Allgemeine Aufgaben | Muss der Betriebsrat „die Einführung oder Anwendung von Künstlicher Intelligenz beurteilen, gilt insoweit die Hinzuziehung eines **Sachverständigen als erforderlich**". |
| **§ 95 Abs. 2a BetrVG** | Auswahlrichtlinien | Die Mitbestimmung bei Auswahlrichtlinien gilt auch dann, „wenn bei der Aufstellung der Richtlinien … **Künstliche Intelligenz** zum Einsatz kommt". |
| **§ 77 BetrVG** | Durchführung gemeinsamer Beschlüsse, Betriebsvereinbarungen | Formvorschriften für die Betriebsvereinbarung (Abs. 2: schriftlich niederzulegen und von beiden Seiten zu unterzeichnen; bei elektronischem Abschluss signieren beide Seiten dasselbe Dokument) und der Tarifvorbehalt (Abs. 3). |

**Was § 80 Abs. 3 Satz 2 praktisch bedeutet.** *Der Betriebsrat darf für die Beurteilung eines
KI-Systems einen Sachverständigen hinzuziehen, und die Erforderlichkeit ist gesetzlich
festgestellt — sie muss nicht mehr im Einzelfall begründet werden. Rechnen Sie damit, planen Sie
Zeit und Kosten dafür ein, und behandeln Sie es nicht als Misstrauensvotum. Ein gut
informierter Sachverständiger verkürzt das Verfahren regelmäßig, weil die Fragen präziser werden.*

**§ 95 Abs. 2a** ist bei einem reinen Auskunftssystem meist **nicht** einschlägig — es stellt
keine Auswahlrichtlinien auf. Prüfen und verneinen Sie es ausdrücklich, statt es zu übergehen;
die Frage kommt.

## 3. Verfahrensplan

| Schritt | Inhalt | Termin | Verantwortlich | Status |
|---|---|---|---|---|
| 1 | Frühzeitige Information über das Vorhaben (§ 90 Abs. 1 Nr. 3) | `<…>` | `<…>` | `<…>` |
| 2 | Systemvorführung für den Betriebsrat | `<…>` | `<…>` | `<…>` |
| 3 | Übergabe der Unterlagen (Protokollierungskonzept, DSFA-Auszug, Rollenmodell) | `<…>` | `<…>` | `<…>` |
| 4 | Ggf. Hinzuziehung eines Sachverständigen (§ 80 Abs. 3 Satz 2) | `<…>` | `<…>` | `<…>` |
| 5 | Verhandlung der Betriebsvereinbarung | `<…>` | `<…>` | `<…>` |
| 6 | Beschluss des Gremiums | `<…>` | `<…>` | `<…>` |
| 7 | Unterzeichnung (§ 77 Abs. 2) und Bekanntmachung im Betrieb | `<…>` | `<…>` | `<…>` |
| 8 | Nachweis in die Freigabeakte ([`07`](07-freigabevorlage.md), Abschnitt 3) | `<…>` | `<…>` | `<…>` |

**Realistische Dauer:** `<…>` — *planen Sie von der ersten Information bis zur Unterschrift eher
drei bis sechs Monate als sechs Wochen, und legen Sie den Beginn vor den Pilotbetrieb. Auch ein
Pilot mit echten Beschäftigten ist mitbestimmungspflichtig.*

## 4. Inhalte der Betriebsvereinbarung (Prüfliste)

Die Punkte, an denen Verhandlungen tatsächlich hängen — und ohne die eine Vereinbarung später
nicht trägt.

| # | Regelungsgegenstand | Geregelt? | Formulierung/Verweis |
|---|---|---|---|
| B1 | Zweck des Systems, abschließend beschrieben | `<…>` | `<…>` |
| B2 | **Welche Daten protokolliert werden** — Anfrage, Treffer, Antwort, Identität, Zeitpunkt | `<…>` | `<…>` |
| B3 | **Aufbewahrungsfrist** und automatisierte Löschung | `<…>` | `<…>` |
| B4 | **Ausdrückliches Verbot der Verhaltens- und Leistungskontrolle** | `<…>` | `<…>` |
| B5 | **Verwertungsverbot** für arbeitsrechtliche Maßnahmen | `<…>` | `<…>` |
| B6 | Zugriffsberechtigte auf die Protokolle, abschließend benannt | `<…>` | `<…>` |
| B7 | **Verfahren für den Protokollzugriff** — Anlass, Vier-Augen-Prinzip, Beteiligung des Betriebsrats | `<…>` | `<…>` |
| B8 | Auswertung nur aggregiert und anonymisiert; Schwelle für Kleinstgruppen | `<…>` | `<…>` |
| B9 | Umgang mit Auffälligkeiten (z. B. massenhafte Abfragen zu Personen) | `<…>` | `<…>` |
| B10 | Freiwilligkeit der Nutzung; kein Nachteil bei Nichtnutzung | `<…>` | `<…>` |
| B11 | Keine automatisierte Entscheidung über Beschäftigte | `<…>` | `<…>` |
| B12 | Information der Beschäftigten über Funktionsweise und Grenzen | `<…>` | `<…>` |
| B13 | **Verfahren bei wesentlichen Änderungen** (Modellwechsel, neue Datenquelle, Ausweitung des Nutzerkreises) | `<…>` | `<…>` |
| B14 | Rechte des Betriebsrats zur Überprüfung der Einhaltung | `<…>` | `<…>` |
| B15 | Laufzeit, Kündigung, Nachwirkung | `<…>` | `<…>` |
| B16 | Umgang mit dem Sachverständigen (Kosten, Zugang, Vertraulichkeit) | `<…>` | `<…>` |

**B5 ist der Punkt, an dem Verhandlungen kippen.** *Ein Verwertungsverbot — die Protokolle dürfen
nicht Grundlage arbeitsrechtlicher Maßnahmen sein — ist für den Betriebsrat regelmäßig die
Kernforderung und für die Arbeitgeberseite scheinbar ein Kontrollverzicht. In der Sache ist es
selten einer: Wer ein Assistenzsystem einführt, will Auskunft erteilen, nicht überwachen. Ein
klares Verwertungsverbot kostet also wenig und löst mehr Widerstand auf als jede andere
Zusicherung. Halten Sie einen eng umrissenen Ausnahmefall offen (etwa den Verdacht einer
Straftat), damit die Klausel nicht an der Wirklichkeit zerbricht.*

**B13 wird am häufigsten vergessen.** *Eine Vereinbarung, die den heutigen Stand regelt, aber
nichts über Modellwechsel und neue Datenquellen sagt, ist nach dem ersten wesentlichen Change
inhaltlich überholt — und die Diskussion beginnt von vorn, dann unter Zeitdruck. Verknüpfen Sie
B13 ausdrücklich mit dem Änderungswesen aus [`04`](04-betriebskonzept.md), Abschnitt 5.*

## 5. Schnittstellen zur übrigen Freigabeakte

| Frage | Dokument |
|---|---|
| Was genau wird protokolliert? | [`04-betriebskonzept.md`](04-betriebskonzept.md), Abschnitt 8 |
| Datenschutzrechtliche Bewertung der Protokollierung | [`02-dsfa-baustein-rag.md`](02-dsfa-baustein-rag.md), Abschnitt 5 |
| Schutzbedarf der Protokolldaten (Datenklasse D4) | [`01-schutzbedarfsfeststellung.md`](01-schutzbedarfsfeststellung.md) |
| Löschung der Protokolle | [`../docs/loeschnachweis.md`](../docs/loeschnachweis.md), Station S8 |
| Nachweis gegenüber dem Gremium | [`07-freigabevorlage.md`](07-freigabevorlage.md), Abschnitt 3 |
| Kontrolle und Prüfhandlung | [`../controls/controls.md`](../controls/controls.md), `AUD-02`, `AUD-04` |

## 6. Ergebnis

| Feld | Inhalt |
|---|---|
| Betriebsvereinbarung geschlossen am | `<TT.MM.JJJJ>` |
| Bezeichnung/Nummer | `<…>` |
| Unterzeichnende | `<…>` |
| Laufzeit / Kündigungsfrist | `<…>` |
| Bekanntmachung im Betrieb erfolgt am | `<…>` |
| Offene Regelungspunkte | `<…>` |
| Einigungsstelle angerufen? | `<nein / ja — Stand>` |

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Liegt eine wirksame Betriebsvereinbarung vor — und deckt sie das ab, was das System heute
   tut?"** Die Revision vergleicht den Regelungsgegenstand mit dem tatsächlichen
   Protokollierungsumfang. Abweichungen sind der Regelbefund, wenn B13 fehlt.
2. **„Wer hat seit Inkrafttreten auf die Protokolle zugegriffen, aus welchem Anlass, und war der
   Betriebsrat beteiligt?"** Prüft, ob das Verfahren aus B7 gelebt wird oder nur vereinbart ist.
3. **„War der Betriebsrat vor dem Pilotbetrieb beteiligt oder erst davor der Produktivsetzung?"**
   Auch ein Pilot mit echten Beschäftigten löst die Mitbestimmung aus.
4. **„Ist die richtige Ebene beteiligt worden?"** Bei einem konzernweit eingeführten System die
   Frage nach Gesamt- oder Konzernbetriebsrat.
5. **„Was passiert mit der Vereinbarung, wenn Sie das Modell wechseln?"** Die Verbindung zwischen
   B13 und dem Änderungswesen — und die Stelle, an der Mitbestimmung und IT-Governance in vielen
   Häusern nicht verbunden sind.

## Offene Punkte

- `<Was noch offen ist — mit Verantwortlichem und Zieltermin.>`
- `<Beispiel: Zuständigkeit zwischen örtlichem Betriebsrat und Gesamtbetriebsrat noch nicht
  schriftlich geklärt; Abstimmung mit der Personalabteilung bis TT.MM.JJJJ.>`
- Diese Vorlage nennt ausschließlich Fundstellen des **BetrVG**. Für öffentlich-rechtliche
  Institute (Sparkassen, Landesbanken, Anstalten) gilt Personalvertretungsrecht des Bundes oder
  der Länder; die entsprechenden Fundstellen sind hier bewusst nicht aufgeführt, weil sie je
  Land abweichen und nicht geprüft wurden.
- Die Aussage zur **objektiven Eignung** in Abschnitt 2 gibt die gefestigte Auslegung des
  § 87 Abs. 1 Nr. 6 BetrVG wieder, ist hier aber nicht mit einer einzelnen Entscheidung belegt.
  Lassen Sie den aktuellen Stand vor Verwendung durch Ihre Rechtsabteilung bestätigen.
- Kein Muster-Wortlaut für die Betriebsvereinbarung selbst. Das ist Absicht: Ein Mustertext
  verleitet zum Übernehmen, und eine BV muss zur Systemwirklichkeit passen, nicht zur Vorlage.
  Die Prüfliste in Abschnitt 4 ist der Ersatz.

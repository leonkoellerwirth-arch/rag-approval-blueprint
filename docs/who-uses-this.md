# Wer benutzt das — und wofür / Who uses this, and for what

> **Kein Rechtsrat / Not legal advice.** Siehe [`DISCLAIMER.md`](../DISCLAIMER.md).

Ein Freigabelauf scheitert selten an einer einzelnen Funktion. Er scheitert daran, dass zehn
Funktionen dasselbe System aus zehn Blickwinkeln bewerten und niemand die Artefakte vorbereitet
hat, die jede einzelne von ihnen braucht. Diese Seite ordnet jedem Akteur seinen Prozess, sein
primäres Artefakt und seine typische Eingangsfrage zu.

*An approval run rarely fails on one function. It fails because ten functions assess the same
system from ten angles and nobody prepared the artifact each of them needs. This page maps each
actor to their process, their primary artifact, and the question they open with.*

## Die Matrix / The matrix

| Akteur | Unternehmensprozess | Primäres Artefakt | Typische Frage des Akteurs |
|---|---|---|---|
| Enterprise-/Solution-Architekt | IT-Freigabe / Architektur-Governance (Architekturboard) | [Freigabeakte](../akte/) komplett, Kontext-Diagramm | „Was muss ich vorlegen, damit das Board freigibt?" |
| Informationssicherheit (ISB/CISO) | Schutzbedarfs- & Sicherheitsfreigabeprozess | [01 Schutzbedarf](../akte/01-schutzbedarfsfeststellung.md), [Kontrollkatalog](../controls/controls.md), [Löschnachweis](loeschnachweis.md) | „Welche Kontrollen fordere ich, und wie werden sie belegt?" |
| Datenschutz (DSB) | DSFA-/DPIA-Verfahren | [02 DSFA-Baustein](../akte/02-dsfa-baustein-rag.md), [Löschnachweis](loeschnachweis.md) | „Wo ist die RAG-spezifische DSFA-Grundlage inkl. Embeddings?" |
| 2nd Line / IT-Risikocontrolling | Risikobewertung & Kontrolltests | [Kontrollkatalog](../controls/controls.md) (Prüfhandlungen!), [Mapping](mapping-bait-vait-dora.md) | „Gegen welches Raster teste ich, und was ist die Evidenz?" |
| Interne Revision / externe Prüfer | Prüfungsplanung & Prüfungshandlungen | [Kontrollkatalog](../controls/controls.md), [06 Testnachweise](../akte/06-testnachweise.md), [07 Freigabevorlage](../akte/07-freigabevorlage.md) | „Gibt es ein Prüfprogramm für dieses System?" |
| Auslagerungsmanagement / DORA-Verantwortliche | IKT-Drittpartei- & Auslagerungsprozess | [03 Auslagerung/Drittparteien](../akte/03-auslagerung-drittparteien.md), [Mapping (DORA)](mapping-bait-vait-dora.md) | „Ist der LLM-Anbieter sauber als IKT-Dienstleister bewertet, inkl. Exit?" |
| KI-/Digital-Projektleiter, Product Owner | Projekt-Stage-Gates & Gremienvorlagen | [07 Freigabevorlage](../akte/07-freigabevorlage.md), [06 Testnachweise](../akte/06-testnachweise.md) | „Wie setze ich das Projekt von Tag 1 genehmigungsfähig auf?" |
| BCM-/Notfallverantwortliche | Notfall- & Wiederanlaufverfahren | [05 Notfallkonzept](../akte/05-notfallkonzept.md) | „Was passiert bei Ausfall/Fehlverhalten — gibt es einen Kill-Switch?" |
| Betriebsrat / Personalvertretung | Mitbestimmungsverfahren, Betriebs-/Dienstvereinbarung | [08 Mitbestimmung](../akte/08-mitbestimmung-betriebsvereinbarung.md) | „Was wird über die Beschäftigten protokolliert — und wer darf das lesen?" |
| Vorstand / Entscheidungsgremium | Freigabe-Entscheidung | [07 Freigabevorlage](../akte/07-freigabevorlage.md) (2 Seiten) | „Risiko, Restrisiko, Auflagen — auf zwei Seiten." |

Jede Vorlage in [`akte/`](../akte/) nennt in ihrem Kopf, **welcher Akteur sie in welchem Prozess
verwendet**. Wer eine Vorlage öffnet, weiß in der ersten Zeile, ob sie für ihn ist.

---

## Ihr Prozess, unser Artefakt, Ihre typischen Fragen

### Enterprise-/Solution-Architekt

**Ihr Prozess.** Sie bringen das System durch das Architekturboard und sind faktisch der
Generalunternehmer der Freigabe: Sie sammeln die Beiträge der Fachfunktionen ein und müssen
erklären, warum die Gesamtarchitektur tragfähig ist. Ihr Risiko ist nicht die Technik — es ist
die Vertagung, weil ein Beitrag fehlt.

**Unser Artefakt.** Die vollständige Freigabeakte als Ihre Vorlagenliste, plus das
Kontext-Diagramm im README, das zeigt, an welcher Stelle des Prozesses welches Dokument greift.
Nutzen Sie [`07-freigabevorlage.md`](../akte/07-freigabevorlage.md) rückwärts: Was dort auf zwei
Seiten stehen muss, definiert, was Sie vorher einsammeln.

**Ihre typischen Fragen.** Welche Dokumente verlangt das Board? Wer liefert welchen Teil, und bis
wann? Welche Entscheidungen muss ich als Architekturentscheidung dokumentieren, statt sie
stillschweigend zu treffen?

### Informationssicherheit (ISB/CISO)

**Ihr Prozess.** Sie stellen den Schutzbedarf fest, leiten daraus Maßnahmen ab und geben das
System sicherheitsseitig frei — oder eben nicht. Bei RAG ist die unangenehme Frage nicht der
Perimeter, sondern die Aggregation: Ein Assistent, der über tausend Dokumente hinweg antwortet,
kann Berechtigungsgrenzen zusammenfassen, die im Dateisystem sauber getrennt waren.

**Unser Artefakt.** [`01-schutzbedarfsfeststellung.md`](../akte/01-schutzbedarfsfeststellung.md)
für die Feststellung je Datenklasse, der [Kontrollkatalog](../controls/controls.md) als Ihre
Forderungsliste mit vorformulierten Prüfhandlungen, und der
[Löschnachweis](loeschnachweis.md) für die Frage, die erfahrungsgemäß am längsten offen bleibt.

**Ihre typischen Fragen.** Wird zur Query-Zeit gegen die Berechtigung des Nutzenden gefiltert
oder nur zur Indexierungszeit? Was passiert mit Embeddings gelöschter Quelldokumente? Welche
Prompts, Antworten und Treffer werden protokolliert — und wer darf dieses Protokoll lesen?

### Datenschutz (DSB)

**Ihr Prozess.** Sie führen die Datenschutz-Folgenabschätzung und verantworten das
Verarbeitungsverzeichnis. RAG bringt Ihnen einen Verarbeitungsschritt, für den es kaum
Bausteine gibt: die Vektorisierung. Ein Embedding ist kein Klartext, aber auch keine
Anonymisierung — und es liegt in einem Index, der anders löscht als eine Datenbank.

**Unser Artefakt.** [`02-dsfa-baustein-rag.md`](../akte/02-dsfa-baustein-rag.md) als
RAG-spezifischer Baustein für Ihre bestehende DSFA-Methodik — nicht als Ersatz dafür — und der
[Löschnachweis](loeschnachweis.md) als operationalisierte Antwort auf das Recht auf Löschung.

**Ihre typischen Fragen.** Auf welcher Rechtsgrundlage werden Beschäftigtendaten in den Index
aufgenommen? Sind Embeddings personenbezogene Daten, und wie begründen Sie Ihre Einordnung? Wie
wird ein Löschverlangen technisch vollzogen und nachgewiesen? Werden Prompts zum Training des
Anbieters verwendet — und woraus ergibt sich das?

### 2nd Line / IT-Risikocontrolling

**Ihr Prozess.** Sie bewerten das Risiko unabhängig von der 1st Line und testen Kontrollen. Sie
brauchen kein Architekturdokument, sondern ein Raster: Kontrolle, Soll-Zustand, Testschritt,
Evidenz, Ergebnis.

**Unser Artefakt.** Der [Kontrollkatalog](../controls/controls.md) — bewusst so geschnitten, dass
jede Kontrolle eine ausformulierte **Prüfhandlung** und ein benanntes **Evidenz-Artefakt** trägt.
Das [Mapping](mapping-bait-vait-dora.md) zeigt, an welcher aufsichtlichen Anforderung Sie die
Kontrolle aufhängen. Der [Readiness-Report](../pilot/readiness-report.md) zeigt das Format, in
dem Sie das Ergebnis zurückspielen können.

**Ihre typischen Fragen.** Gegen welches Raster teste ich? Was ist die Stichprobe, und ist sie
begründbar? Ist die Evidenz aussagekräftig oder nur ein Screenshot? Welche Kontrollen sind
kompensierend, und was kompensieren sie genau?

### Interne Revision / externe Prüfer

**Ihr Prozess.** Sie planen eine Prüfung und brauchen ein Prüfprogramm, das Sie ausführen und
dokumentieren können. Ihre Unabhängigkeit verlangt, dass Sie nicht die Formulierungen der
Projektseite übernehmen — aber ein sauber vorbereitetes Prüffeld spart Ihnen die halbe
Prüfungsvorbereitung.

**Unser Artefakt.** Der [Kontrollkatalog](../controls/controls.md) ist in der Sprache der
Prüfhandlung geschrieben („Lasse dir X zeigen, wähle Stichprobe Y, prüfe Z"). [`06
Testnachweise`](../akte/06-testnachweise.md) definiert, welche Tests die Freigabe verlangt und in
welchem Evidenzformat; [`pilot/evidenz/`](../pilot/evidenz/) zeigt ausgefüllte Muster davon.
[`07 Freigabevorlage`](../akte/07-freigabevorlage.md) zeigt, was dem Gremium tatsächlich
vorgelegt wurde — und damit, woran Sie die Umsetzung messen.

Und als einziger Akteur finden Sie hier **Ihr eigenes Arbeitsergebnis** als Muster:
[`pilot/revision/`](../pilot/revision/) enthält ein risikoorientiertes Prüfprogramm, aus dem
Kontrollkatalog abgeleitet, und den Prüfungsbericht dazu — vier Feststellungen, eine davon
wesentlich, und keine von ihnen betraf eine der bekannten Auflagen.

**Ihre typischen Fragen.** Gibt es ein Prüfprogramm für dieses System? Sind die Auflagen aus der
Freigabe nachverfolgt und mit Fristen versehen? Wurde nach dem Go-live etwas geändert, ohne dass
das Änderungswesen gegriffen hat? Existiert die Evidenz noch, oder nur die Behauptung? Und die
Frage, die im Pilot-Prüfungsbericht am meisten hergibt: Tragen die Zahlen, die dem Vorstand
vorgelegt wurden?

### Auslagerungsmanagement / DORA-Verantwortliche

**Ihr Prozess.** Sie bewerten, ob ein Bezug von Dritten eine Auslagerung ist, führen das
Informationsregister und verantworten Vertragsinhalte und Exit. Ein Cloud-LLM ist für Sie kein
KI-Thema, sondern ein IKT-Drittdienstleister mit Subunternehmerkette.

**Unser Artefakt.** [`03-auslagerung-drittparteien.md`](../akte/03-auslagerung-drittparteien.md)
führt die Bewertung entlang der DORA-Logik: Einordnung, Unterstützung einer kritischen oder
wichtigen Funktion, Vertragsinhalte, Subunternehmer, Konzentrationsrisiko, Exit-Strategie. Das
[Mapping](mapping-bait-vait-dora.md) verbindet das mit den Kontrollen.

**Ihre typischen Fragen.** Ist der Anbieter sauber eingeordnet, und wer sind seine
Subunternehmer? Unterstützt der Dienst eine kritische oder wichtige Funktion? Steht der Eintrag
im Informationsregister? Ist der Exit beschrieben — und ist er erprobt oder nur behauptet?

### KI-/Digital-Projektleiter, Product Owner

**Ihr Prozess.** Sie führen das Vorhaben durch die Stage-Gates und beschaffen Gremientermine.
Ihre teuerste Erfahrung ist die Vertagung: Das System ist fertig, aber die Akte nicht — und der
nächste Gremientermin ist in sechs Wochen.

**Unser Artefakt.** [`07 Freigabevorlage`](../akte/07-freigabevorlage.md) als Zielbild, von dem
aus Sie rückwärts planen, und [`06 Testnachweise`](../akte/06-testnachweise.md), weil
Nachweise entstehen müssen, *während* gebaut wird — nicht danach. Lesen Sie zuerst den
[Pilot](../pilot/): Er zeigt Ihnen den ganzen Lauf in fünf Minuten.

**Ihre typischen Fragen.** Wie setze ich das Projekt von Tag 1 genehmigungsfähig auf? Wen muss
ich wann einbinden, damit niemand am Ende zum ersten Mal draufschaut? Welche Nachweise muss die
Entwicklung mitliefern? Was ist realistisch eine Auflage statt eines Blockers?

### BCM-/Notfallverantwortliche

**Ihr Prozess.** Sie verantworten Notfallvorsorge und Wiederanlauf. Bei einem Assistenzsystem
ist die interessante Frage selten der Totalausfall — sie ist das *fehlerhafte Weiterlaufen*: Das
System antwortet, aber falsch, oder auf Basis von Dokumenten, die es nicht mehr zeigen dürfte.

**Unser Artefakt.** [`05-notfallkonzept.md`](../akte/05-notfallkonzept.md) mit Ausfallszenarien,
Degradationsmodi, Kill-Switch und Wiederanlauf — einschließlich der Frage, wer den Kill-Switch
außerhalb der Geschäftszeiten tatsächlich betätigen darf.

**Ihre typischen Fragen.** Gibt es einen Kill-Switch, und ist er erprobt? Was ist der definierte
Degradationsmodus — Abschalten oder Antworten ohne Retrieval? Wie merken wir überhaupt, dass das
System fehlerhaft antwortet? Wer entscheidet über die Wiederinbetriebnahme?

### Betriebsrat / Personalvertretung

**Ihr Prozess.** Sie prüfen, ob eine technische Einrichtung geeignet ist, Verhalten oder Leistung
der Beschäftigten zu überwachen, und verhandeln darüber eine Vereinbarung. Bei einem
Assistenzsystem ist die Antwort auf die erste Frage regelmäßig ja: Ein Protokoll, das Frage,
Zeitpunkt und Identität verbindet, ist objektiv dazu geeignet — unabhängig davon, ob jemand es
auswerten will.

**Unser Artefakt.** [`08-mitbestimmung-betriebsvereinbarung.md`](../akte/08-mitbestimmung-betriebsvereinbarung.md)
führt das Verfahren von der Unterrichtung bis zur Unterschrift und enthält eine Prüfliste mit
sechzehn Regelungsgegenständen — bewusst **ohne** Mustertext, weil eine Vereinbarung zur
Systemwirklichkeit passen muss und nicht zur Vorlage. Der Pilot zeigt einen realen Verlauf
einschließlich der Punkte, um die am längsten gerungen wurde.

**Ihre typischen Fragen.** Was genau wird protokolliert, wie lange, und wer darf es lesen? Ist
die Verwendung für arbeitsrechtliche Maßnahmen ausgeschlossen — und mit welchen Ausnahmen? Was
passiert mit der Vereinbarung, wenn das Modell gewechselt wird? Wurden wir vor dem Pilotbetrieb
beteiligt oder erst davor der Produktivsetzung? Und: Wird die Nutzung freiwillig sein?

*Hinweis für die Arbeitgeberseite: § 80 Abs. 3 Satz 2 BetrVG stellt fest, dass die Hinzuziehung
eines Sachverständigen als erforderlich gilt, wenn der Betriebsrat die Einführung oder Anwendung
künstlicher Intelligenz beurteilen muss. Planen Sie Zeit und Kosten dafür ein — im Pilotfall hat
der Sachverständige die Verhandlung verkürzt, nicht verlängert.*

### Vorstand / Entscheidungsgremium

**Ihr Prozess.** Sie entscheiden. Sie brauchen keine Architektur, sondern eine belastbare
Aussage: Was ist das Risiko, was bleibt nach den Maßnahmen übrig, unter welchen Auflagen geben
wir frei, und wann sehen wir das wieder.

**Unser Artefakt.** [`07-freigabevorlage.md`](../akte/07-freigabevorlage.md) — zwei Seiten,
Gremiensprache, mit Restrisiko, Auflagen und Wiedervorlage. Der
[Pilot](../pilot/07-freigabevorlage-final.md) zeigt eine ausgefüllte Fassung, inklusive einer
Freigabe unter Auflagen statt eines makellosen Ergebnisses.

**Ihre typischen Fragen.** Risiko, Restrisiko, Auflagen — auf zwei Seiten. Wer trägt das
Restrisiko? Was passiert, wenn wir nicht freigeben? Wann und mit welchem Ergebnis kommt das
wieder auf die Tagesordnung?

---

## Offene Punkte

- Die Matrix bildet die Funktionstrennung eines mittelgroßen Instituts ab. In kleineren Häusern
  fallen Rollen zusammen (ISB und Datenschutz, 2nd Line und Auslagerungsmanagement); in
  Konzernstrukturen kommen Gruppenfunktionen und lokale Auslagerungsbeauftragte hinzu. Die
  Zuordnung ist als Ausgangspunkt gedacht, nicht als Organigramm.
- Der **Fachbereich** ist bewusst nicht als eigene Zeile aufgeführt, obwohl er in jedem
  Freigabelauf beteiligt ist: Er ist Auftraggeber und Fachverantwortung zugleich und taucht damit
  in fast jedem Artefakt auf, statt eines zu besitzen. Der Betriebsrat hat seit v0.2.0 eine eigene
  Zeile und mit [`akte/08`](../akte/08-mitbestimmung-betriebsvereinbarung.md) ein eigenes
  Artefakt.
- Für Versicherer, Kapitalverwaltungsgesellschaften und Zahlungsinstitute sind die Prozessnamen
  teilweise andere; die Artefakte bleiben anwendbar, die Prozessspalte nicht durchgängig.

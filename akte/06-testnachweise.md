# 06 — Testnachweise für die Freigabe

> **Wer benutzt dieses Dokument?** Projektleitung / Product Owner gemeinsam mit Entwicklung und
> Qualitätssicherung — und zwar **während** gebaut wird, nicht danach.
> **In welchem Prozess?** Projekt-Stage-Gates und Freigabevorbereitung.
> **Wer prüft es?** Informationssicherheit, Datenschutz, 2nd Line und interne Revision. Für die
> Revision ist dieses Dokument die Brücke zwischen Kontrollkatalog und tatsächlicher Evidenz.

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Siehe [`DISCLAIMER.md`](../DISCLAIMER.md).

**Ausfüllhinweis.** Dieses Dokument beantwortet zwei Fragen: *Welche Tests verlangt die Freigabe?*
und *In welcher Form wird das Ergebnis so festgehalten, dass es in einer Prüfung Bestand hat?*
Der zweite Teil wird regelmäßig unterschätzt. Ein bestandener Test, von dem nur eine Folie mit
einem grünen Haken übrig ist, ist keine Evidenz. Legen Sie das Evidenzformat fest, **bevor** Sie
testen — nachträglich lässt es sich nicht mehr erzeugen, ohne dass es nachträglich aussieht.

---

## 1. Testarten und Freigaberelevanz

| # | Testart | Freigaberelevant | Verantwortlich | Kontrollbezug |
|---|---|---|---|---|
| T1 | Berechtigungswirkung zur Query-Zeit (Negativ-Retrieval) | **Ja — blockierend** | `<ISB + Entwicklung>` | `ZUG-*` |
| T2 | Berechtigungsentzug: Wirksamkeit und Latenz | **Ja — blockierend** | `<…>` | `ZUG-*` |
| T3 | Löschung: Quelle → Chunks → Embeddings → Caches → Protokolle | **Ja — blockierend** | `<DSB + Betrieb>` | `LOE-*` |
| T4 | Aggregations-/Leakage-Test über Dokumentgrenzen | **Ja** | `<ISB>` | `KLA-*`, `ZUG-*` |
| T5 | Antwortqualität und Halluzinationsrate (Referenzfragen) | **Ja** | `<Fachbereich>` | `EVA-*` |
| T6 | Umgang mit Prompt-Manipulation / indirekter Prompt Injection | **Ja** | `<ISB>` | `EVA-*`, `ZUG-*` |
| T7 | Protokollierung: Vollständigkeit und Auswertbarkeit | **Ja** | `<Betrieb>` | `AUD-*` |
| T8 | Kill-Switch und Degradationsmodi | **Ja** | `<BCM + Betrieb>` | `BET-*` |
| T9 | Wiederanlauf inkl. Konsistenzprüfung nach Restore | **Ja** | `<Betrieb>` | `BET-*`, `LOE-*` |
| T10 | Aktualität: veraltete Fassungen werden nicht als gültig zitiert | **Ja** | `<Fachbereich>` | `EVA-*` |
| T11 | Last-/Verfügbarkeitstest | `<je nach Einstufung>` | `<…>` | `BET-*` |
| T12 | Regressionstest nach Modell-/Prompt-/Embedding-Wechsel | **Ja — wiederkehrend** | `<…>` | `BET-*`, `EVA-*` |

*Die IDs in der Spalte „Kontrollbezug" verweisen auf den
[Kontrollkatalog](../controls/controls.md). Passen Sie sie an Ihren eigenen Katalog an, wenn Sie
einen führen — aber lassen Sie die Spalte nicht leer: Ein Test ohne Kontrollbezug ist für die
2nd Line nicht verwertbar, und eine Kontrolle ohne Test ist für die Revision nur eine Absicht.*

## 2. Die vier Tests, an denen Freigaben scheitern

Für diese Tests genügt „durchgeführt" nicht — hier wird das Verfahren selbst geprüft.

### T1 — Negativ-Retrieval (Berechtigungswirkung)

**Frage.** Sieht ein Nutzender ausschließlich Inhalte, für die er berechtigt ist — auch dann,
wenn er gezielt danach fragt?

**Vorgehen.**
1. Wählen Sie mindestens `<N>` Dokumente, die einer eng begrenzten Gruppe vorbehalten sind
   (z. B. Personal-, Revisions- oder Vorstandsunterlagen).
2. Formulieren Sie je Dokument `<3–5>` Anfragen, die den Inhalt gezielt anzielen — auch
   indirekt („Was steht in der Regelung zu …?", „Fasse die Vorgaben für … zusammen").
3. Führen Sie die Anfragen unter der Identität eines **nicht** berechtigten Testnutzers aus.
4. Prüfen Sie nicht nur die Antwort, sondern auch: Trefferliste, Quellenangaben, Metadaten,
   Zwischenergebnisse und Protokolleinträge.

**Bestanden, wenn.** Weder Inhalt noch Existenzhinweis (Titel, Fundstelle, Zusammenfassung) für
nicht berechtigte Nutzende sichtbar ist.

**Typischer Befund.** *Die Antwort ist leer, aber die Quellenliste nennt den Dateinamen. Das ist
nicht bestanden — der Dateiname einer Kündigungsvorlage ist bereits eine Information.*

**Evidenz.** Testprotokoll nach Abschnitt 4, mit Nutzeridentität, Anfragewortlaut,
vollständiger Systemantwort und Zeitstempel.

### T2 — Berechtigungsentzug

**Frage.** Wie schnell wirkt der Entzug einer Berechtigung im Index?

**Vorgehen.** Berechtigung eines Testnutzers entziehen, anschließend im Abstand von
`<z. B. 1 Min / 15 Min / 1 h / 24 h>` dieselbe Anfrage wiederholen und den ersten Zeitpunkt
festhalten, ab dem der Zugriff zuverlässig ausbleibt.

**Bestanden, wenn.** Die gemessene Latenz die in [`04`](04-betriebskonzept.md) zugesagte Wirkzeit
einhält. *Wenn Sie dort keine Wirkzeit zugesagt haben, holen Sie das nach — „unmittelbar" ist
keine prüfbare Aussage.*

### T3 — Löschnachweis

**Frage.** Ist ein gelöschtes Dokument über keinen Weg mehr auffindbar oder rekonstruierbar?

**Vorgehen.** Vollständig beschrieben in
[`../docs/loeschnachweis.md`](../docs/loeschnachweis.md); dort sind auch die Verifikationsschritte
für den Vektorindex hinterlegt. Der Test umfasst mindestens Quelle, Chunk-Speicher,
Vektorindex (einschließlich soft-gelöschter Einträge), Caches, Sicherungen und Protokolle.

**Bestanden, wenn.** Für jede Station ein dokumentierter Nachweis vorliegt — und die Aussage zum
Vektorindex nicht auf einem API-Aufruf beruht, der lediglich eine Löschmarkierung setzt.

### T4 — Aggregation und Leakage über Dokumentgrenzen

**Frage.** Entsteht aus mehreren für sich harmlosen Fragmenten eine schutzbedürftige Aussage?

**Vorgehen.** Definieren Sie `<N>` Aggregationshypothesen mit dem Fachbereich („Lässt sich aus
den zugänglichen Inhalten die Vergütungsstruktur / eine Personalmaßnahme / eine noch nicht
kommunizierte Entscheidung ableiten?") und prüfen Sie diese gezielt mit mehrstufigen Anfragen.

**Bestanden, wenn.** Keine Hypothese bestätigt wird — oder der bestätigte Fall bewertet, mit
einer Maßnahme versehen und in [`01`](01-schutzbedarfsfeststellung.md) aufgenommen ist.

*Dieser Test lässt sich nicht automatisieren und braucht Fachwissen, nicht Technik. Planen Sie
eine gemeinsame Sitzung mit dem Fachbereich ein.*

## 3. Referenzfragenkatalog (für T5 und T12)

Der Katalog ist das Rückgrat jeder Wiederholbarkeit: Ohne feste Fragenmenge lässt sich nach einem
Modellwechsel nicht sagen, ob das System besser oder schlechter geworden ist.

| Feld | Vorgabe |
|---|---|
| Umfang | `<z. B. 100–200 Fragen>` |
| Zusammenstellung durch | `<Fachbereich, nicht Entwicklung>` |
| Kategorien | Faktenfragen · Fragen mit Fallunterscheidung · Fragen ohne Antwort in der Wissensbasis · veraltete Sachverhalte · Fragen an der Berechtigungsgrenze |
| Erwartete Antwort | Je Frage hinterlegt, mit Fundstelle |
| Bewertungsskala | `<korrekt / teilweise / falsch / unbegründete Verweigerung>` |
| Schwellenwert Freigabe | `<z. B. ≥ X % korrekt, 0 % falsch-und-selbstbewusst in Kategorie „ohne Antwort">` |
| Versionierung | `<Katalog eingefroren, Änderungen dokumentiert>` |

**Die wichtigste Kategorie ist „Fragen ohne Antwort in der Wissensbasis".** *Ein System, das auf
eine unbeantwortbare Frage eine plausible Antwort erfindet, ist im regulierten Umfeld
gefährlicher als eines, das zu oft „weiß ich nicht" sagt. Messen Sie diese Kategorie getrennt und
setzen Sie den Schwellenwert dort strenger.*

## 4. Evidenzformat

Jedes Testergebnis wird in derselben Struktur abgelegt. Ein Format, das für alle Tests gilt,
erspart der Revision Rückfragen und Ihnen die Rekonstruktion.

| Feld | Inhalt | Warum die Prüfung das braucht |
|---|---|---|
| Test-ID und Bezeichnung | `<T1 …>` | Zuordnung zum Katalog |
| Kontrollbezug | `<ZUG-01 …>` | Verbindung Kontrolle ↔ Nachweis |
| Umgebung | `<Produktion / produktionsnah — mit Unterschieden>` | Ein Testergebnis aus einer Umgebung ohne echte Berechtigungen sagt nichts |
| Systemstand | `<Anwendungs-, Modell-, Embedding-Version, Indexstand>` | Ohne Versionsstand ist der Test nicht reproduzierbar |
| Datum, Uhrzeit | `<…>` | Zeitliche Einordnung zur Freigabe |
| Durchführende Person | `<Name, Rolle>` | Unabhängigkeit beurteilbar |
| Testdaten / Stichprobe | `<Auswahl und Begründung>` | Repräsentativität |
| Vorgehen | `<Schritte, nachvollziehbar>` | Wiederholbarkeit |
| Rohdaten | `<Anfragen und vollständige Antworten, Auszüge aus Protokollen>` | Der eigentliche Nachweis |
| Ergebnis | `<bestanden / nicht bestanden / mit Einschränkung>` | Aussage |
| Abweichungen und Maßnahmen | `<Befund, Maßnahme, Frist, Verantwortlicher>` | Anschluss an die Auflagen in [`07`](07-freigabevorlage.md) |
| Ablage | `<Pfad/System, revisionssicher>` | Auffindbarkeit in der Prüfung |
| Aufbewahrung bis | `<…>` | Prüfbarkeit über die Zeit |

**Umgang mit personenbezogenen Inhalten in der Evidenz.** *Testprotokolle zu T1 und T4 enthalten
naturgemäß genau die Inhalte, die schutzbedürftig sind. Legen Sie fest, wie die Protokolle
abgelegt und wer sie einsehen darf, und stimmen Sie das mit dem Datenschutz ab — sonst erzeugt
der Nachweis der Vertraulichkeit ein neues Vertraulichkeitsproblem. Wo möglich: Fundstelle und
Trefferstatus dokumentieren statt des vollständigen Inhalts.*

## 5. Zeitliche Einordnung

| Zeitpunkt | Tests | Ergebnis fließt ein in |
|---|---|---|
| Vor Pilotbetrieb | T1, T3, T8 | Entscheidung über den Pilotstart |
| Vor Freigabe | T1–T10 | [`07-freigabevorlage.md`](07-freigabevorlage.md) |
| Nach wesentlicher Änderung | T12, plus betroffene Tests | Änderungswesen ([`04`](04-betriebskonzept.md)) |
| Wiederkehrend | `<z. B. T1, T3 halbjährlich>` | Kontrollnachweis für die 2nd Line |
| Anlassbezogen | `<nach Vorfall, nach Prüfungsfeststellung>` | Maßnahmenverfolgung |

## 6. Teststatus (Übersicht für die Freigabe)

| Test | Status | Datum | Ergebnis | Offene Maßnahme |
|---|---|---|---|---|
| T1 | `<offen/bestanden/nicht bestanden>` | `<…>` | `<…>` | `<…>` |
| T2 | `<…>` | `<…>` | `<…>` | `<…>` |
| T3 | `<…>` | `<…>` | `<…>` | `<…>` |
| … | | | | |

*Diese Tabelle wandert in verdichteter Form in die Freigabevorlage. Führen Sie sie mit, statt sie
am Ende zu erzeugen.*

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Zeigen Sie mir das Rohprotokoll zu Test T1 — nicht die Zusammenfassung."** Der Test auf
   die Existenz echter Evidenz. Eine Ergebnisfolie ohne Anfragewortlaut und Systemantwort wird
   regelmäßig nicht als Nachweis akzeptiert.
2. **„In welcher Umgebung wurde getestet, und mit welchen Berechtigungen?"** Ein Berechtigungstest
   in einer Umgebung mit Testdaten und Testrollen belegt die Wirkung in Produktion nicht.
3. **„Wie ist die Stichprobe zustande gekommen?"** Prüft, ob repräsentativ oder bequem gewählt
   wurde. Eine begründete kleine Stichprobe ist besser als eine unbegründete große.
4. **„Was wurde nach dem letzten Modellwechsel erneut getestet?"** Verbindet Testnachweise mit dem
   Änderungswesen — der häufigste Bruch zwischen zwei ansonsten sauberen Dokumenten.
5. **„Welcher Test ist nicht bestanden worden, und was ist daraus geworden?"** Wenn alle Tests
   beim ersten Anlauf bestanden wurden, prüft die Revision das Testverfahren statt des Systems.

## Offene Punkte

- `<Was noch offen ist — mit Verantwortlichem und Zieltermin.>`
- `<Beispiel: Referenzfragenkatalog umfasst bislang N Fragen ohne die Kategorie „ohne Antwort in
  der Wissensbasis"; Ergänzung durch den Fachbereich bis TT.MM.JJJJ.>`

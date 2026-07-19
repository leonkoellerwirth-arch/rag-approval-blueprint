# 06 — Testnachweise für die Freigabe NORA

> **Wer benutzt dieses Dokument?** Projektleitung / Product Owner gemeinsam mit Entwicklung und
> Qualitätssicherung — und zwar **während** gebaut wird, nicht danach.
> **In welchem Prozess?** Projekt-Stage-Gates und Freigabevorbereitung.
> **Wer prüft es?** Informationssicherheit, Datenschutz, 2nd Line und interne Revision. Für die
> Revision ist dieses Dokument die Brücke zwischen Kontrollkatalog und tatsächlicher Evidenz.

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden; Personen,
> Anbieter, Zahlen und Befunde sind konstruiert. Der Ablauf ist echt.
> Siehe [`../00-fallbeschreibung.md`](../00-fallbeschreibung.md).

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Siehe [`../../DISCLAIMER.md`](../../DISCLAIMER.md).

Dies ist die ausgefüllte Pilotfassung für NORA (Nordwind Richtlinien-Assistent), fertiggestellt
am 08.06.2026 durch T. Brand (Projektleitung) und Dr. P. Ohlsen (ISB) als Teil der Freigabeakte.
Das leere Vorlagenformat findet sich unter
[`../../akte/06-testnachweise.md`](../../akte/06-testnachweise.md).

---

## 1. Testarten und Freigaberelevanz

| # | Testart | Freigaberelevant | Verantwortlich | Kontrollbezug |
|---|---|---|---|---|
| T1 | Berechtigungswirkung zur Query-Zeit (Negativ-Retrieval) | **Ja — blockierend** | Dr. P. Ohlsen (ISB) + T. Brand (Entwicklung) | `ZUG-01`, `ZUG-02` |
| T2 | Berechtigungsentzug: Wirksamkeit und Latenz | **Ja — blockierend** | Dr. P. Ohlsen (ISB) | `ZUG-03` |
| T3 | Löschung: Quelle → Chunks → Embeddings → Index → Caches → Protokolle | **Ja — blockierend** | R. Mattis (DSB) + T. Brand (Betrieb) | `LOE-01`, `LOE-02` |
| T4 | Aggregations-/Leakage-Test über Dokumentgrenzen | **Ja** | Dr. P. Ohlsen (ISB) + M. Sørensen (Fachbereich) | `KLA-01`, `ZUG-04` |
| T5 | Antwortqualität und Halluzinationsrate (Referenzfragen) | **Ja** | M. Sørensen (Organisationsabteilung) | `EVA-01`, `EVA-02` |
| T6 | Umgang mit Prompt-Manipulation / indirekter Prompt Injection | **Ja** | Dr. P. Ohlsen (ISB) | `EVA-03`, `ZUG-02` |
| T7 | Protokollierung: Vollständigkeit und Auswertbarkeit | **Ja** | T. Brand (Betrieb) | `AUD-01`, `AUD-02` |
| T8 | Kill-Switch und Degradationsmodi | **Ja** | T. Brand (Betrieb) + S. Vogt (2nd Line) | `BET-01`, `BET-03` |
| T9 | Wiederanlauf inkl. Konsistenzprüfung nach Restore | **Ja** | T. Brand (Betrieb) | `BET-03`, `LOE-03` |
| T10 | Aktualität: veraltete Fassungen werden nicht als gültig zitiert | **Ja** | M. Sørensen (Organisationsabteilung) | `EVA-02` |
| T11 | Last-/Verfügbarkeitstest | Nicht blockierend (Verfügbarkeit normal) | T. Brand | `BET-01` |
| T12 | Regressionstest nach Modell-/Prompt-/Embedding-Wechsel | **Ja — wiederkehrend** | T. Brand (Betrieb) + M. Sørensen (Fachbereich) | `BET-02`, `EVA-01` |

*Die IDs in der Spalte „Kontrollbezug" verweisen auf den
[Kontrollkatalog](../../controls/controls.md).*

## 2. Die vier Tests, an denen Freigaben scheitern

### T1 — Negativ-Retrieval (Berechtigungswirkung)

**Frage.** Sieht ein Nutzender ausschließlich Inhalte, für die er berechtigt ist — auch dann,
wenn er gezielt danach fragt?

**Erster Testlauf: nicht bestanden — 11.02.2026**

Testnutzer: `nora-test-basis@nordwindbank.example` — Mitglied der Gruppe „Alle Beschäftigten",
nicht Mitglied der Gruppe „HR-Personal". Getestetes Dokument: „Richtlinie HR-2024-07
Gehaltsband-Anpassungen" (Einstufung: vertraulich, ausschließlich für Gruppe HR-Personal).

Fünf Anfragen wurden unter der Identität des Testnutzers gestellt:

| # | Anfragewortlaut |
|---|---|
| 1 | „Wie werden Gehaltsanpassungen geregelt?" |
| 2 | „Welche Vorgaben gelten für die Anpassung von Gehältern?" |
| 3 | „Wer genehmigt Sonderprämien für Beschäftigte?" |
| 4 | „Was steht in den Regelungen zur leistungsabhängigen Vergütung?" |
| 5 | „Wie läuft das Verfahren bei einer Gehaltserhöhung ab?" |

Ergebnis aller fünf Anfragen: Antworttext lautete „Ich konnte keine Informationen zu Ihrer
Anfrage in den für Sie zugänglichen Unterlagen finden." — auf den ersten Blick korrekt. Die
Quellenangabe im UI lautete jedoch:

> Quellen: [1] **Richtlinie HR-2024-07 Gehaltsband-Anpassungen**, Abschnitt 3
> [2] **Richtlinie HR-2024-07 Gehaltsband-Anpassungen**, Abschnitt 5

**Befund: nicht bestanden.** Der Titel „Richtlinie HR-2024-07 Gehaltsband-Anpassungen" ist
eine schutzbedürftige Information — allein das Bekanntwerden des Dokuments, das eine
Vergütungsrichtlinie enthält, verletzt die Vertraulichkeit.

**Ursache.** Die UI-Komponente für die Quellenangaben las das rohe Retrieval-Ergebnis aus dem
gemeinsamen Antwort-Objekt aus, bevor der Berechtigungsfilter die Metadaten aus dem Objekt
entfernt hatte. Der Antworttext wurde vom LLM korrekt unterdrückt (das Modell erhielt keine
Fundstellen), aber die Quellenangabe im UI umging den Filter, weil sie an einer früheren Stelle
in der Rendering-Pipeline eingebaut war.

**Maßnahme.** Der Berechtigungsfilter wurde von der Ausgabeschicht in die Retrieval-Pipeline
selbst verlegt: Er filtert jetzt alle Treffer inklusive Metadaten, bevor das Ergebnisobjekt an
die nachgelagerten Komponenten übergeben wird. Damit ist der Filter für Antworttext, Trefferliste
und Quellenangaben gemeinsam wirksam. Code-Review durch A. Kellner (Enterprise-Architekt) am
28.02.2026; Befund geschlossen.

**Zweiter Testlauf: bestanden — 06.03.2026**

Dieselben fünf Anfragen, dieselbe Testnutzeridentität. Alle Anfragen lieferten:
Antworttext „Ich konnte keine Informationen zu Ihrer Anfrage in den für Sie zugänglichen
Unterlagen finden." — Quellenangabe: leer. Kein Titel, kein Pfad, kein Abschnittsverweis aus
nicht berechtigten Dokumenten sichtbar. Evidenz: [`NORA-TP-T1-20260306`](../evidenz/NORA-TP-T1-20260306.md) — vollständiges Protokoll im Evidenzformat.

*Zwischen Befund (11.02.2026) und bestandenem Nachtest lagen drei Wochen. Wer diesen Test erst
kurz vor dem Gremientermin ansetzt, verliert einen Sitzungszyklus.*

### T2 — Berechtigungsentzug

**Frage.** Wie schnell wirkt der Entzug einer Berechtigung im Index?

**Vorgehen.** Berechtigung des Testnutzers `nora-test-personal@nordwindbank.example` für die
Gruppe „HR-Personal" wurde am 06.03.2026 um 09:00 Uhr entzogen. Anschließend wurde Anfrage 1
aus T1 im Abstand von 1 Min, 5 Min, 15 Min und 30 Min wiederholt.

**Ergebnis: bestanden — 06.03.2026.** Der Zugriff auf Dokumente der Gruppe „HR-Personal" blieb
beim 1-Minuten-Test noch bestehen (ein gecachtes Retrieval-Ergebnis), war aber beim 5-Minuten-Test
bereits nicht mehr vorhanden. Gemessene Wirkzeit: **4 Minuten** — deutlich unter der im
[Betriebskonzept](../../akte/04-betriebskonzept.md) zugesagten Wirkzeit von 15 Minuten.
Evidenz: NORA-TP-T2-20260306.

### T3 — Löschnachweis

**Frage.** Ist ein gelöschtes Dokument über keinen Weg mehr auffindbar oder rekonstruierbar?

Das vollständige Verfahren ist in [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md)
beschrieben; dort sind auch die Verifikationsschritte V1–V3 für den HNSW-Vektorindex hinterlegt.

**Testablauf: teilweise bestanden — 28.04.2026**

Testdokument: „Richtlinie IT-2022-09 Netzwerksegmentierung" (abgelöst, aus dem Index zu
entfernen). Systemstand: NORA-Anwendung v0.9.1, Embedding-Modell v2.1, HNSW-Index-Build
2026-04-14.

**V1 — Negativ-Retrieval-Test (funktional): bestanden.**

Drei Anfragen, die das Dokument vor der Löschung zuverlässig getroffen hatten:

| # | Anfrage | Ergebnis vor Löschung | Ergebnis nach Löschung |
|---|---|---|---|
| 1 | „Welche Vorgaben gelten für die Netzwerksegmentierung?" | Treffer: IT-2022-09, Abschnitt 2 | Kein Treffer |
| 2 | „Wie sind Netzwerkzonen bei der Nordwind Bank definiert?" | Treffer: IT-2022-09, Abschnitt 4 | Kein Treffer |
| 3 | „Was steht in der Richtlinie zur Firewall-Konfiguration?" | Treffer: IT-2022-09, Abschnitt 6 | Kein Treffer |

V1 grün: Keine Anfrage liefert nach der Löschung Inhalte oder Titelhinweise des Dokuments.

**V2 — Index-Inspektion (physisch): nicht bestanden.**

Die Inspektion der HNSW-Indexdatei unterhalb der API-Ebene (Werkzeug: hnsw-inspect v0.4,
Commit-Hash 7f3a2c1) ergab:

| Messgröße | Vor Löschung | Nach API-Löschaktion |
|---|---|---|
| Einträge laut API | 38.420 | 38.407 (13 als gelöscht markiert) |
| Physische Einträge in der Indexdatei | 38.420 | **38.420** (unverändert) |
| Indexdateigröße | 487 MB | 487 MB (unverändert) |

Die 13 dem gelöschten Dokument zugehörigen Vektoren verblieben als Tombstone-Einträge physisch
in der Indexdatei. Eine Kompaktierung war nicht konfiguriert; ohne sie werden Tombstone-Einträge
nicht entfernt. Auf der Speicherebene kann ein Angreifer mit Dateizugriff die Einträge direkt
auslesen — dies entspricht dem Befund aus der Arbeit Ghost Vectors (arXiv:2606.18497, Abschnitt 4),
die im [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md) ausgewertet ist.

V2 rot: Die Löschung ist auf Indexdatei-Ebene nicht vollzogen.

**V3 — Unumkehrbarkeit: nicht belegt** (V2-Voraussetzung nicht erfüllt).

**Bewertung.** Kontrolle `LOE-02` (Verifikation der Löschung im Vektorindex) als **nicht erfüllt**
bewertet. Auflage A1: wöchentlicher Kompaktierungslauf mit Protokoll; Nachweis der physischen
Entfernung und Unumkehrbarkeit durch T. Brand an Dr. P. Ohlsen und R. Mattis bis 30.09.2026.
Evidenz des Testlaufs: Löschprotokoll [`NORA-LP-2026-014`](../evidenz/NORA-LP-2026-014.md) — es führt die Stationen S1 bis S8 sowie die Verifikationsschritte V1 bis V3 und hält den negativen Befund zu V2 mit Zahlen fest.

### T4 — Aggregation und Leakage über Dokumentgrenzen

**Frage.** Entsteht aus mehreren für sich harmlosen Fragmenten eine schutzbedürftige Aussage?

**Vorgehen.** M. Sørensen (Organisationsabteilung) und Dr. P. Ohlsen (ISB) definierten gemeinsam
sechs Aggregationshypothesen und prüften diese mit jeweils drei mehrstufigen Anfragen.

**Ergebnis: bestanden mit Befund.**

Fünf der sechs Hypothesen ließen sich nicht bestätigen. Eine Hypothese wurde bestätigt:
Durch Kombination von vier Fragmenten aus unterschiedlichen Dokumenten (Geldwäsche-Handbuch,
Meldeprozess-Richtlinie, Schwellenwert-Übersicht) konnten die internen Eskalationsschwellen
(Meldegrenzen im Sinne der Geldwäscheprävention) abgeleitet werden. Diese Information ist
regulatorisch sensibel, weil sie für Mitarbeitende bestimmt ist, die Meldepflichten auslösen,
jedoch nicht für den gesamten Beschäftigtenkreis.

**Maßnahme.** Die betroffenen drei Dokumente wurden aus dem Index entfernt; sie sind in NORA
künftig nur noch über einen Zeigerverweis zugänglich (Hinweis „Für dieses Dokument wenden Sie
sich bitte an die Compliance-Abteilung."). Die Zeigerliste wird von M. Sørensen geführt. Befund
in [`../../akte/01-schutzbedarfsfeststellung.md`](../../akte/01-schutzbedarfsfeststellung.md)
aufgenommen. Evidenz: NORA-TP-T4-20260506.

## 3. Referenzfragenkatalog (für T5 und T12)

| Feld | Vorgabe NORA |
|---|---|
| Umfang | 180 Fragen |
| Zusammenstellung durch | Organisationsabteilung (M. Sørensen + zwei Fachreferentinnen), nicht Entwicklung |
| Kategorien | Faktenfragen (90) · Fragen mit Fallunterscheidung (30) · Fragen ohne Antwort in der Wissensbasis (25) · veraltete Sachverhalte (15) · Fragen an der Berechtigungsgrenze (20) |
| Erwartete Antwort | Je Frage hinterlegt, mit Fundstelle und Dokumentversion |
| Bewertungsskala | korrekt / teilweise korrekt / falsch / unbegründete Verweigerung |
| Schwellenwert Freigabe | ≥ 90 % korrekt; **0 % falsch-und-selbstbewusst** in der Kategorie „ohne Antwort in der Wissensbasis" |
| Versionierung | Katalog eingefroren am 15.01.2026 (v1.0); Änderungen dokumentiert mit Begründung und Datum |

Die Kategorie „Fragen ohne Antwort in der Wissensbasis" umfasst 25 Fragen zu Sachverhalten,
die in keinem der 812 indizierten Dokumente vorkommen (z. B. aktuelle Zinssätze, externe
Rechtsvorschriften, Fragen zu Personalentscheidungen). Der Schwellenwert 0 % gilt ausschließlich
für diese Kategorie und für die Beurteilung „falsch-und-selbstbewusst" — ein System, das auf eine
nicht beantwortbare Frage eine plausible Antwort erfindet, ist im regulierten Umfeld gefährlicher
als eines, das zu oft „weiß ich nicht" sagt.

## 4. Evidenzformat

Jedes Testergebnis ist in der folgenden Struktur abgelegt. T1 und T4 enthalten
naturgemäß schutzbedürftige Inhalte (Dokumenttitel, Anfragewortlaut). Die Protokolle für T1
und T4 sind in einer gesonderten Ablage mit eingeschränktem Leserecht (Gruppe „NORA-Prüfer":
Dr. P. Ohlsen, R. Mattis, S. Vogt, I. Bruns) abgelegt; vollständige Inhalte werden nicht
in allgemeine Projektmappen geschrieben.

| Feld | Inhalt (Beispiel T1 zweiter Lauf) |
|---|---|
| Test-ID und Bezeichnung | T1 — Negativ-Retrieval (zweiter Lauf) |
| Kontrollbezug | `ZUG-01`, `ZUG-02` |
| Umgebung | Produktionsnahe Testumgebung mit echten Berechtigungsgruppen aus dem Verzeichnisdienst |
| Systemstand | NORA v0.9.1, Embedding-Modell v2.1, HNSW-Index-Build 2026-02-28 |
| Datum, Uhrzeit | 06.03.2026, 10:15–11:02 Uhr |
| Durchführende Person | Dr. P. Ohlsen (ISB) |
| Testdaten / Stichprobe | Dokument HR-2024-07 (gewählt weil höchste Schutzstufe und in T1-Erstlauf als Befunddokument identifiziert); 5 Anfragen aus Erstlauf unverändert übernommen |
| Vorgehen | Anfragen unter Testnutzeridentität `nora-test-basis` über API-Client; Protokollierung vollständiger HTTP-Antworten |
| Rohdaten | HTTP-Response-Logs, vollständig; Ablage NORA-Testablage/Freigabe-2026/T1-20260306 |
| Ergebnis | Bestanden |
| Abweichungen und Maßnahmen | Keine |
| Ablage | NORA-Testablage/Freigabe-2026/T1-20260306 (revisionssicher, Leseschutz) |
| Aufbewahrung bis | 30.11.2031 (5 Jahre nach Vorstandsbeschluss) |

## 5. Zeitliche Einordnung

| Zeitpunkt | Tests | Ergebnis fließt ein in |
|---|---|---|
| Vor Pilotbetrieb (Januar 2026) | T1, T3, T8 | Entscheidung Pilotbetrieb 20.01.2026 mit 60 Nutzenden aus Organisationsabteilung |
| Vor Freigabe (bis 08.06.2026) | T1–T10 | [`07-freigabevorlage.md`](../../akte/07-freigabevorlage.md) |
| Nach wesentlicher Änderung | T12; plus T1 und T3 bei Änderungen an Berechtigungs- oder Löschlogik | Änderungswesen ([`../../akte/04-betriebskonzept.md`](../../akte/04-betriebskonzept.md)) |
| Wiederkehrend | T1 und T3 halbjährlich; T12 wöchentlich automatisiert | Kontrollnachweis für 2nd Line (S. Vogt) |
| Anlassbezogen | T1 nach Berechtigungsstrukturänderung; T5/T12 nach Modellwechsel | Maßnahmenverfolgung Auflagen A1–A4 |

## 6. Teststatus (Übersicht für die Freigabe)

| Test | Status | Datum | Ergebnis | Offene Maßnahme |
|---|---|---|---|---|
| T1 | Bestanden (nach Nachbesserung) | 06.03.2026 | 2. Lauf bestanden; 1. Lauf 11.02.2026 nicht bestanden (Quellenangabe zeigte Titel nicht berechtigter Dokumente) | — |
| T2 | Bestanden | 06.03.2026 | Berechtigungsentzug wirksam nach 4 Min (zugesagt: 15 Min) | — |
| T3 | Teilweise bestanden | 28.04.2026 | V1 (Negativ-Retrieval) grün; V2 (Index-Inspektion) rot: Tombstone-Einträge physisch erhalten, keine Kompaktierung | **A1**: wöchentl. Kompaktierung + Unumkehrbarkeitsnachweis bis 30.09.2026 (T. Brand) |
| T4 | Bestanden mit Befund | 06.05.2026 | Geldwäsche-Meldeschwellen aus Fragmenten ableitbar; betroffene Dokumente aus Index entfernt | — (Zeigerliste geführt von M. Sørensen) |
| T5 | Bestanden | 20.05.2026 | 91,1 % korrekt; 0 % falsch-und-selbstbewusst (Kat. „ohne Antwort"); 4,4 % teilweise korrekt; 4,5 % unbegründete Verweigerung | — |
| T6 | Bestanden mit Einschränkung | 27.05.2026 | Direkte Prompt Injection: bestanden. Indirekte Injection über indexiertes Dokument: nur eingeschränkter Testumfang (3 Szenarien) → gelbe Kontrolle | Folgetest mit erweitertem Umfang bis 30.09.2026 (Dr. P. Ohlsen) |
| T7 | Bestanden | 19.05.2026 | Protokollierung vollständig und auswertbar; Anfragewortlaut, Nutzeridentität, Zeitstempel, Retrieval-Treffer vorhanden | — |
| T8 | Bestanden | 16.06.2026 (Produktion) | TEST-Umgebung: Januar 2026 (gelb). Produktion: 16.06.2026, Wirkzeit 90 Sekunden, ausgelöst von T. Brand auf Anweisung Dr. P. Ohlsen | — |
| T9 | Bestanden | 02.06.2026 | Wiederanlauf inkl. Löschabgleich nach Restore abgeschlossen; Negativtest nach Restore bestanden | — |
| T10 | Bestanden mit Befund | 09.05.2026 | Zwei abgelöste Richtlinien wurden noch als gültig zitiert: „Datenschutzrichtlinie v3.2" (abgelöst durch v4.0 ab 01.01.2025) und „IT-Sicherheitsrichtlinie R-2022-09" (abgelöst durch R-2024-11). Metadatenfelder Gültig-ab und Gültig-bis eingeführt und rückwirkend befüllt. | — |
| T11 | Nicht blockierend | — | Kein Lasttest erforderlich (Verfügbarkeitsklasse normal); Grundlast 400 Anfragen/Tag liegt weit unterhalb der getesteten Kapazität aus der Entwicklungsphase | — |
| T12 | Bestanden (wiederkehrend) | Lauf 1: 26.05.2026 | Wöchentlicher automatisierter Lauf gegen Referenzfragenkatalog; Baseline: 91,1 % (T5-Ergebnis). Alarm bei Abweichung > 10 Prozentpunkte. Eingerichtet wegen fehlendem Ankündigungsrecht für Modelländerungen (BET-02) | **A3**: Nachverhandlung Vertrag Meridian AI bis 30.09.2026 (C. Ahrens) |

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Zeigen Sie mir das Rohprotokoll zu Test T1 — nicht die Zusammenfassung."** S. Vogt (2nd Line)
   verlangte am 03.06.2026 den vollständigen HTTP-Response-Log des ersten Testlaufs, nicht die
   Ergebnisnotiz. Das Protokoll des nicht bestandenen Erstlaufs (11.02.2026) ist der eigentliche
   Nachweis — es belegt die Lücke, die behoben wurde, und macht den Nachtest erst glaubwürdig.
   Ablage: NORA-Testablage/Freigabe-2026/T1-20260211 (Leseschutz).

2. **„In welcher Umgebung wurde getestet, und mit welchen Berechtigungen?"** I. Bruns (Interne
   Revision, beratend) am 08.06.2026. T1 und T2 wurden in einer produktionsnahen Umgebung mit
   echten Verzeichnisdienst-Gruppen durchgeführt, nicht mit Testdaten. Der Testnutzer
   `nora-test-basis` ist eine dedizierte Testidentität mit ausschließlich der Gruppe
   „Alle Beschäftigten" — identisch zur restriktivsten produktiven Berechtigungsstufe.

3. **„Wie ist die Stichprobe für T1 zustande gekommen?"** Dr. P. Ohlsen (ISB) am 11.02.2026,
   direkt nach dem Erstlauf. Die fünf Anfragen wurden vom ISB so formuliert, dass sie das
   Dokument zuverlässig treffen — mit direktem Bezug auf den Dokumentinhalt und mit indirekten
   Umschreibungen. Die Stichprobe ist bewusst nicht bequem gewählt; das ist im Testprotokoll
   begründet.

4. **„Was wurde nach dem letzten Modellwechsel erneut getestet?"** S. Vogt (2nd Line) am
   08.06.2026. Meridian AI hat während des Pilotbetriebs keine öffentlich kommunizierte
   Modellaktualisierung vorgenommen; T12 hat die Baseline während der gesamten Testphase
   gehalten. Das Fehlen eines Ankündigungsrechts im Vertrag ist der Grund, warum T12 als
   wöchentlicher Dauerlauf eingerichtet wurde und nicht als Einmalmessung gilt.

5. **„Welcher Test ist nicht bestanden worden, und was ist daraus geworden?"** T1 beim ersten
   Lauf (11.02.2026) und T3 im Indexinspektionsteil (28.04.2026). Beide Befunde sind in der
   Freigabevorlage ausdrücklich ausgewiesen: T1 als abgeschlossen (Nachtest bestanden), T3 als
   offene Auflage A1. Ein Nachweis, dass alle Tests beim ersten Anlauf bestanden wurden, wäre
   in diesem Fall schlicht unzutreffend gewesen.

## Offene Punkte

- T3 Auflage A1: wöchentlicher Kompaktierungslauf mit Protokoll und Nachweis der physischen
  Entfernung (V2 und V3) bis 30.09.2026. Verantwortlich: T. Brand. Abnehmer: Dr. P. Ohlsen
  und R. Mattis.
- T6 Folgetest indirekte Prompt Injection: erweiterter Testumfang (mindestens 10 Szenarien mit
  manipulierten indizierten Dokumenten) bis 30.09.2026. Verantwortlich: Dr. P. Ohlsen (ISB).
- T12 Auflage A3: Nachverhandlung des Vertrags mit Meridian AI B.V. um Ankündigungsfrist für
  Modellaktualisierungen und Möglichkeit zur Versionsfestlegung bis 30.09.2026. Verantwortlich:
  C. Ahrens (Auslagerungsmanagement). Bis dahin: wöchentlicher Regressionslauf als Interimslösung.
- Referenzfragenkatalog v1.0 enthält keine Fragen zur Geldwäscheprävention (Dokumente aus Index
  entfernt, vgl. T4). Für die Stichprobenprüfung der Zeigerverweis-Funktion ist bis 31.10.2026
  eine Ergänzung um 5 Testfragen durch M. Sørensen geplant.

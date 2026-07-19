# Aufsichts-Mapping: Anforderung → Kontrolle → Evidenz

> **Wer benutzt dieses Dokument?** 2nd Line / IT-Risikocontrolling, interne Revision und
> Auslagerungsmanagement.
> **In welchem Prozess?** Risikobewertung, Kontrolltests, Prüfungsplanung.
> **Wozu?** Um eine Kontrolle an einer aufsichtlichen Anforderung aufzuhängen — und um in der
> Gegenrichtung zu jeder Anforderung die Kontrolle und den Nachweis zu finden.

> **Kein Rechtsrat.** Dieses Dokument ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Ob und wie eine Anforderung auf Ihr Haus zutrifft, entscheidet
> Ihre zuständige Funktion. Siehe [`../DISCLAIMER.md`](../DISCLAIMER.md).

---

## Zuerst: Was heute überhaupt gilt

Diese Klarstellung steht bewusst am Anfang, weil sich seit Januar 2025 der Rahmen verschoben hat
und ein erheblicher Teil der frei verfügbaren Materialien diesen Stand noch nicht abbildet.

| Rahmenwerk | Stand (geprüft 07/2026) |
|---|---|
| **DORA** — Verordnung (EU) 2022/2554 | **Der maßgebliche Rahmen.** Anwendbar seit 17.01.2025 |
| **MaRisk** — Rundschreiben 06/2024 (BA) | Gilt fort. AT 9 (Auslagerung) betrifft nach DORA nur noch Auslagerungen **ohne** IT-Bezug |
| **VAIT / KAIT / ZAIT** | **Aufgehoben mit Ablauf des 16.01.2025** |
| **BAIT** — Rundschreiben 10/2017 (BA) | Für DORA-unterworfene Institute seit 17.01.2025 nicht mehr anwendbar; Kapitel 11 aufgehoben; **vollständige Aufhebung mit Ablauf des 31.12.2026** |
| **EU AI Act** — Verordnung (EU) 2024/1689 | Allgemeiner Anwendungsbeginn **02.08.2026**; Einstufung eines internen Assistenten ist Einzelfallprüfung — hier bewusst nicht gemappt |

**Warum die BAIT-Spalte trotzdem in diesem Dokument steht.** Weil Prüfungsfunktionen in
deutschen Häusern weiterhin in BAIT-Kapiteln denken, sprechen und ihre Prüfungspläne
strukturieren — Rundschreiben werden schneller aufgehoben als Sprachgewohnheiten. Die Spalte ist
eine **Übersetzungshilfe** in ein vertrautes Vokabular, keine Aussage über geltendes Recht. Sie
ist durchgehend als historisch gekennzeichnet, und die Kapitelbezeichnungen stammen aus
Sekundärquellen (siehe [Quellen](quellen.md), Abschnitt 2).

**Der praktische Rat:** Schreiben Sie Ihre Vorlage gegen DORA und MaRisk. Wenn eine
Prüfungsfunktion nach „BAIT Kapitel 6" fragt, nutzen Sie die Spalte, um zu zeigen, dass Sie
denselben Sachverhalt abgedeckt haben — nicht, um die Anforderung daraus abzuleiten.

## Wie das Mapping zu lesen ist

Jede Zeile beantwortet drei Fragen: **Was wird verlangt** (Anforderung) · **Womit begegnen wir
dem** (Kontrolle aus dem [Kontrollkatalog](../controls/controls.md)) · **Woran sehen wir es**
(Evidenz aus der [Freigabeakte](../akte/) bzw. dem
[Löschnachweis](loeschnachweis.md)).

Eine Zeile ohne Evidenzspalte wäre wertlos: Sie ist genau die Stelle, an der eine Prüfung
ansetzt.

---

## 1. IKT-Risikomanagement und Informationssicherheit

| Anforderung | Fundstelle | Kontrolle | Evidenz |
|---|---|---|---|
| Identifizierung der Informationsassets und der von ihnen unterstützten Funktionen | DORA Art. 8 · MaRisk AT 4.3 · *(BAIT Kap. 3, historisch)* | `KLA-01`, `KLA-02` | [`01 Schutzbedarfsfeststellung`](../akte/01-schutzbedarfsfeststellung.md); Verzeichnis der indexierten Quellen mit Freigabestatus |
| Schutz und Prävention: Zugriffsbeschränkung entsprechend der Berechtigung | DORA Art. 9 · MaRisk AT 7.2 · *(BAIT Kap. 6, historisch)* | `ZUG-01`, `ZUG-02`, `ZUG-03` | Testprotokoll Negativ-Retrieval (T1); Testprotokoll Berechtigungsentzug (T2); Rezertifizierungsprotokoll |
| Bewertung des Risikos aus Zusammenführung von Informationen | MaRisk AT 4.3 · DSGVO Art. 5 Abs. 1 lit. c, Art. 35 · *(BAIT Kap. 3, historisch)* | `ZUG-04` | Aggregationsbewertung in [`01`](../akte/01-schutzbedarfsfeststellung.md); Protokoll der Bewertungssitzung; Testprotokoll (T4) |
| Erkennung anomaler Aktivitäten | DORA Art. 10 · *(BAIT Kap. 5, historisch)* | `AUD-01` | Protokollierungskonzept; Auswertung auffälliger Abfragemuster nach [`04`](../akte/04-betriebskonzept.md) |
| Schutz vor Umgehung von Sicherheitsvorgaben durch Eingaben | DORA Art. 9, Art. 25 · *(BAIT Kap. 5, historisch)* | `EVA-04` | Testprotokoll Prompt-Manipulation (T6), direkt und indirekt |

**Die Zeile, die RAG von anderen Anwendungen trennt**, ist die dritte. Alle übrigen
Anforderungen kennt Ihr Haus bereits aus anderen Systemen. Die Aggregationsbewertung ist neu,
weil erst ein System, das über Dokumentgrenzen hinweg antwortet, sie erzwingt — und weil es
dafür keine etablierte Methodik gibt.

## 2. Datenschutz und Löschung

| Anforderung | Fundstelle | Kontrolle | Evidenz |
|---|---|---|---|
| Datenschutz-Folgenabschätzung bei voraussichtlich hohem Risiko | DSGVO Art. 35 | `ZUG-04`, `KLA-02` | [`02 DSFA-Baustein`](../akte/02-dsfa-baustein-rag.md) mit Risikobewertung |
| Recht auf Löschung — vollständig über die Ableitungskette | DSGVO Art. 17, Art. 5 Abs. 1 lit. e | `LOE-01`, `LOE-02` | [Löschprotokoll](loeschnachweis.md) je Station; Negativ-Retrieval nach Löschung; Nachweis der Unumkehrbarkeit |
| Löschung wirkt auch nach Wiederherstellung aus Sicherung | DSGVO Art. 17 · DORA Art. 12 · MaRisk AT 7.3 · *(BAIT Kap. 10, historisch)* | `LOE-03` | Wiederanlaufplan mit Prüfschritt Löschabgleich; Protokoll des letzten Restore |
| Speicherbegrenzung für Protokolldaten | DSGVO Art. 5 Abs. 1 lit. e, Art. 17 | `LOE-04` | Löschkonzept Protokolldaten mit Fristbegründung; Nachweis des ältesten Eintrags |
| Richtigkeit personenbezogener Daten — auch in erzeugten Aussagen | DSGVO Art. 5 Abs. 1 lit. d, Art. 16 | `EVA-02`, `EVA-03`, `AUD-03` | Messprotokoll Antwortqualität; Stichprobe Quellenprüfung; Auswertung der Nutzermeldungen |
| Sicherheit der Verarbeitung, Zweckbindung der Protokolle | DSGVO Art. 32, Art. 5 Abs. 1 lit. b | `AUD-02` | Berechtigungsübersicht Protokollzugriff; Zugriffsprotokoll; ggf. Vereinbarung mit der Mitbestimmung |
| Auftragsverarbeitung und Drittlandübermittlung | DSGVO Art. 28, Art. 44–49 | `BET-04` | [`03 Auslagerung`](../akte/03-auslagerung-drittparteien.md), Abschnitt 7 |

## 3. Nachvollziehbarkeit von Modellen

| Anforderung | Fundstelle | Kontrolle | Evidenz |
|---|---|---|---|
| Ausreichende Nachvollziehbarkeit von Modellen, ausdrücklich auch bei Merkmalen technologischer Innovation und künstlicher Intelligenz | **MaRisk AT 4.3.5** | `EVA-01`, `EVA-02`, `EVA-03` | Referenzfragenkatalog mit Sollantworten und Versionsstand; Messprotokoll; Stichprobe Quellenprüfung |
| Prüfung der IKT-Systeme und -Werkzeuge | DORA Art. 25 · *(BAIT Kap. 7, historisch)* | `EVA-01`, `EVA-04`, `BET-01` | [`06 Testnachweise`](../akte/06-testnachweise.md) mit Evidenzformat |

**MaRisk AT 4.3.5 ist der wirksamste Anknüpfungspunkt in diesem gesamten Mapping.** Er verlangt
Nachvollziehbarkeit für Modelle ausdrücklich auch dort, wo technologische Innovation und
künstliche Intelligenz im Spiel sind — im geltenden Rahmenwerk, unabhängig vom EU AI Act. Wer in
einer Diskussion die Frage hört, ob es für KI überhaupt schon Anforderungen gebe, hat hier die
Antwort.

## 4. Betrieb, Änderungswesen, Notfall

| Anforderung | Fundstelle | Kontrolle | Evidenz |
|---|---|---|---|
| Änderungen betrieblicher Prozesse und Strukturen sind geregelt | MaRisk AT 8.2 · *(BAIT Kap. 8, historisch)* | `BET-01` | Änderungshistorie einschließlich Modell-, Embedding- und Promptversionen; Genehmigungen; Testnachweise |
| Änderungen auf Seiten des Dienstleisters werden gesteuert | DORA Art. 28, Art. 30 · *(BAIT Kap. 9, historisch)* | `BET-02` | Vertragsstelle zu Ankündigungsfrist/Versionsfestlegung; Regressionsnachweis; sonst ausgewiesenes Restrisiko in [`07`](../akte/07-freigabevorlage.md) |
| Reaktion und Wiederherstellung; Notfallmanagement | DORA Art. 11 · MaRisk AT 7.3 · *(BAIT Kap. 10, historisch)* | `BET-03`, `LOE-03` | [`05 Notfallkonzept`](../akte/05-notfallkonzept.md); Testprotokoll Kill-Switch (T8) mit Datum und Wirkzeit |
| Testen der digitalen operationalen Widerstandsfähigkeit | DORA Art. 24 | `BET-03` | Übungsplan und Protokolle nach [`05`](../akte/05-notfallkonzept.md), Abschnitt 8 |
| Sicherungs- und Wiederherstellungsverfahren | DORA Art. 12 | `LOE-03` | Sicherungskonzept nach [`05`](../akte/05-notfallkonzept.md), Abschnitt 6 |
| Vorfallmanagement | DORA Art. 17 | `AUD-01` | Protokollauszug einer vollständigen Rekonstruktion |
| Lernen und Weiterentwickeln aus Vorfällen und Rückmeldungen | DORA Art. 13 | `AUD-03` | Auswertung der Nutzermeldungen mit Bearbeitungsstand und daraus erfolgten Korrekturen |

## 5. IKT-Drittparteien und Auslagerung

| Anforderung | Fundstelle | Kontrolle | Evidenz |
|---|---|---|---|
| Allgemeine Grundsätze für das Management des IKT-Drittparteirisikos | DORA Art. 28 · *(BAIT Kap. 9, historisch)* | `BET-04` | [`03 Auslagerung`](../akte/03-auslagerung-drittparteien.md), Abschnitte 1–2 |
| Führung eines Informationsregisters über alle vertraglichen Vereinbarungen | **DORA Art. 28 Abs. 3** | `BET-04` | Auszug aus dem Informationsregister mit Eintrag zum LLM- und zum Vektordatenbank-Anbieter |
| Einstufung als kritische oder wichtige Funktion | **DORA Art. 3 Nr. 22** | `BET-04` | Begründete Einstufung in [`03`](../akte/03-auslagerung-drittparteien.md), Abschnitt 2 |
| Vorherige Bewertung des IKT-Konzentrationsrisikos | **DORA Art. 29** | `BET-04` | [`03`](../akte/03-auslagerung-drittparteien.md), Abschnitt 5 |
| Wesentliche Vertragsbestimmungen | **DORA Art. 30** | `BET-02`, `BET-04` | Vertragsprüfliste V1–V13 in [`03`](../akte/03-auslagerung-drittparteien.md), Abschnitt 3 |
| Ausstiegsstrategien mit verbindlicher angemessener Übergangsfrist | **DORA Art. 30 Abs. 3 Buchst. f** | `BET-04` | [`03`](../akte/03-auslagerung-drittparteien.md), Abschnitt 6; Nachweis eines Exit-Tests oder ausgewiesenes Restrisiko |
| Auslagerungen ohne IT-Bezug | MaRisk AT 9 | — | Nach dem bestehenden Auslagerungsverfahren des Hauses |

## 6. Governance und Prüfung

| Anforderung | Fundstelle | Kontrolle | Evidenz |
|---|---|---|---|
| Verantwortung der Geschäftsleitung für den IKT-Risikorahmen | DORA Art. 5 · *(BAIT Kap. 1–2, historisch)* | — | [`07 Freigabevorlage`](../akte/07-freigabevorlage.md) mit Beschluss, Restrisikoträger und Wiedervorlage |
| IKT-Risikomanagementrahmen | DORA Art. 6 | alle | Freigabeakte insgesamt |
| Internes Kontrollsystem | MaRisk AT 4.3 | alle | [Readiness-Report](../pilot/readiness-report.md) als Kontrollbewertung |
| Prüfung durch die interne Revision | MaRisk BT 2 | alle | [Kontrollkatalog](../controls/controls.md) als Prüfprogramm; Testnachweise als Prüfungsevidenz |

---

## Gegenrichtung: von der Kontrolle zur Anforderung

Diese Zuordnung wird aus derselben Quelle erzeugt wie der Katalog. Die vollständige, immer
aktuelle Fassung steht je Kontrolle im [Prüfkatalog](../controls/controls.md) unter „Mapping" —
gerendert aus [`controls/controls.yaml`](../controls/controls.yaml), damit beide Richtungen nicht
auseinanderlaufen können.

## Offene Punkte

- **BAIT-Kapitelbezeichnungen** sind nicht gegen das Originaldokument geprüft (siehe
  [Quellen](quellen.md), Abschnitt 2). Sie sind Übersetzungshilfe, nicht Zitat.
- **Die 9. MaRisk-Novelle** (veröffentlicht Juni 2026) ist nicht eingearbeitet: Rundschreiben-Nummer
  und Inkrafttreten konnten nicht bestätigt werden. Alle MaRisk-Angaben beziehen sich auf
  Rundschreiben 06/2024.
- **Der EU AI Act ist bewusst nicht gemappt.** Der allgemeine Anwendungsbeginn ist der
  02.08.2026; ob ein interner Richtlinien-Assistent als Hochrisiko-System einzustufen ist, ist
  eine Einzelfallprüfung gegen Anhang III, für die keine einschlägige Auslegung auffindbar war.
  Eine plausible Vermutung wäre hier gefährlicher als eine offene Lücke.
- **Kein Mapping auf die technischen Regulierungsstandards zu DORA** (RTS/ITS). Sie konkretisieren
  mehrere der genannten Artikel und sind für eine förmliche Vorlage zu berücksichtigen.
- **Kein Mapping auf branchenspezifische Aufsicht außerhalb des Bankensektors.** Nach dem Wegfall
  von VAIT und KAIT ist für Versicherer und Kapitalverwaltungsgesellschaften eigenständig zu
  prüfen, welcher Rahmen an ihre Stelle tritt.
- **Kein Mapping auf ISO/IEC 27001, ISO/IEC 42001 oder das NIST AI RMF.** Solche Zuordnungen
  existieren bereits in guter Qualität an anderer Stelle; dieses Repository konzentriert sich auf
  die deutsche Aufsichtspraxis, die anderswo nicht abgedeckt ist.

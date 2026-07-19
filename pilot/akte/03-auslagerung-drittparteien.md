# 03 — Auslagerung und IKT-Drittparteien

> **Wer benutzt dieses Dokument?** Auslagerungsmanagement bzw. die DORA-Verantwortlichen,
> gemeinsam mit Einkauf, Rechtsabteilung und Informationssicherheit.
> **In welchem Prozess?** Der IKT-Drittpartei- und Auslagerungsprozess — Einordnung,
> Vertragsgestaltung, Informationsregister, Exit.
> **Wer prüft es?** 2nd Line, interne Revision und im Ernstfall die Aufsicht. Dieses Dokument
> liefert außerdem die Grundlage für die Drittland- und Auftragsverarbeitungsfragen in
> [`02`](02-dsfa-baustein-rag.md).

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden; Personen, Anbieter,
> Zahlen und Befunde sind konstruiert. Der Ablauf ist echt. Siehe
> [`../00-fallbeschreibung.md`](../00-fallbeschreibung.md).

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Ob und wie DORA auf Ihr Institut und diesen Bezug anzuwenden
> ist, entscheidet Ihre zuständige Funktion. Siehe [`../../DISCLAIMER.md`](../../DISCLAIMER.md).

Dies ist die ausgefüllte Fassung für NORA, erstellt von C. Ahrens (Auslagerungsmanagement) und
A. Kellner (Enterprise-Architekt), abgeschlossen in der Fassung zur Freigabeakte vom 08.06.2026;
Ersteinordnung 18.11.2025.

**Rechtsrahmen (verifiziert 07/2026, siehe [Quellen](../../docs/quellen.md)).** Maßgeblich ist die
**Verordnung (EU) 2022/2554 (DORA)**, anwendbar seit 17.01.2025. Die früher einschlägigen
BaFin-Rundschreiben zur IT sind weitgehend Geschichte: **VAIT, KAIT und ZAIT wurden mit Ablauf
des 16.01.2025 aufgehoben**; die **BAIT** gelten nur noch für einen Kreis von Übergangs- und
Nicht-DORA-Adressaten und werden **mit Ablauf des 31.12.2026 vollständig aufgehoben**. Die
Nordwind Bank AG ist CRR-Kreditinstitut und unterliegt seit 17.01.2025 vollständig DORA; BAIT
ist für dieses Haus nicht mehr anwendbar. **MaRisk AT 9 (Auslagerung)** betrifft nach dem
Anwendungsbeginn von DORA die Auslagerungen ohne IT-Bezug und ist hier nicht einschlägig.

---

## 1. Gegenstand des Fremdbezugs

| Feld | Inhalt |
|---|---|
| Dienstleister | Meridian AI B.V., Keizersgracht 555, 1017 DR Amsterdam, Niederlande (B.V. nach niederländischem Recht) |
| Bezogene Leistung | Modellinferenz (Antworterzeugung) über HTTP/REST-API: Systemanweisung, Retrieval-Kontext und Nutzeranfrage werden übermittelt; die generierte Antwort wird zurückgegeben |
| Weitere IKT-Dienstleister im Aufbau | Vektorindex, Embedding-Erzeugung und Hosting sind vollständig eigenbetrieben (Rechenzentrum Bremen, Nordwind Bank AG). Meridian AI B.V. ist der **einzige externe IKT-Dienstleister** der NORA-Lösung. Dieses Ergebnis ist das Resultat einer expliziten Komponentenprüfung und wird hier als positiver Befund festgehalten. |
| Vertragsverhältnis | Direktvertrag mit Meridian AI B.V. (MSA vom 01.12.2025) |
| Verarbeitungsregion | EU-Region Frankfurt; vertraglich fixiert in MSA § 2 Abs. 1; Änderungen erfordern 60-tägige schriftliche Ankündigung |
| Vertragsbeginn / Laufzeit / Kündigungsfrist | Beginn 01.12.2025; Laufzeit 12 Monate; Autoverlängerung um je 12 Monate; ordentliche Kündigung 3 Monate zum Laufzeitende |
| Verantwortlich im Haus | C. Ahrens, Auslagerungsmanagement / DORA-Verantwortlicher |

## 2. Einordnung

| Frage | Bewertung | Begründung |
|---|---|---|
| Handelt es sich um IKT-Dienstleistungen im Sinne von DORA? | ja | Meridian AI erbringt digitale Dienste (Modellinferenz), auf die die Nordwind Bank AG für den Betrieb von NORA angewiesen ist. |
| Handelt es sich um eine Auslagerung nach internem Verständnis? | ja, als IKT-Drittdienstleister | Einordnungsentscheidung durch C. Ahrens am 18.11.2025, aktenkundig. |
| Unterstützt die Leistung eine **kritische oder wichtige Funktion**? | nein | NORA ist ein Auskunfts-Assistenzsystem. Ein Ausfall bedeutet, dass alle 1.200 Beschäftigten auf die originären Quellsysteme zurückgreifen (Richtliniendatenbank, Intranet-Handbuch, Ablage Organisationsabteilung) — diese bleiben verfügbar. Kein geregelter Geschäftsprozess hängt ausschließlich von NORA ab; kein aufsichtsrechtlicher Meldeprozess oder reguliertes Verfahren setzt den NORA-Betrieb voraus. Maßgebliche Definition: DORA Art. 3 Nr. 22. |
| Falls nein: Was wäre die Folge eines Ausfalls? | Betriebliche Unannehmlichkeit; kein Ausfall eines regulierten Prozesses | Beschäftigte erhalten Auskünfte langsamer; die Organisationsabteilung erhält mehr direkte Anfragen (Ausgangslage vor NORA). |
| Eintrag im **Informationsregister** erforderlich? | ja | DORA Art. 28 Abs. 3 verlangt ein Register aller vertraglichen Vereinbarungen über die Nutzung von IKT-Dienstleistungen; Meridian AI ist als IKT-Drittdienstleister einzutragen. |

Die Einstufung als nicht-kritische Funktion ist eine Momentaufnahme und muss neu bewertet werden,
sobald NORA in einen Prozess eingebettet wird, der ohne das System nicht mehr durchgeführt werden
kann. S. Vogt (2nd Line) hat diese Bedingung am 19.05.2026 ausdrücklich als Prüfpunkt für
künftige Systemerweiterungen vermerkt.

| Feld | Inhalt |
|---|---|
| Registereintrag vorhanden | ja — Informationsregister Nordwind Bank AG, Eintrag Nr. 2025-047 (IKT-Drittpartei: Meridian AI B.V.), eingetragen 18.11.2025 |
| Verantwortlich für die Pflege | C. Ahrens, Auslagerungsmanagement |
| Letzte Aktualisierung | 08.06.2026 |

## 3. Vertragsinhalte

DORA regelt die vertraglichen Mindestinhalte in **Art. 30**; für kritische oder wichtige
Funktionen gelten die erweiterten Anforderungen des Art. 30 Abs. 3. Da NORA keine kritische oder
wichtige Funktion unterstützt, sind die Grundanforderungen des Art. 30 einschlägig; die
Anforderungen des Art. 30 Abs. 3 Buchst. f wurden gleichwohl als Best-Practice-Mindeststandard
herangezogen.

| # | Vertragspunkt | Geregelt? | Fundstelle im Vertrag | Bewertung |
|---|---|---|---|---|
| V1 | Beschreibung der Leistung und der Verarbeitungsorte | ja | MSA § 2 Abs. 1, Anlage 1 | EU-Region Frankfurt vertraglich fixiert; Leistungsbeschreibung hinreichend konkret |
| V2 | Anzeige von Änderungen der Verarbeitungsorte | ja | MSA § 2 Abs. 3 | 60 Tage schriftliche Vorankündigung; Sonderkündigungsrecht für Nordwind Bank AG |
| V3 | Zusicherungen zu Vertraulichkeit und Verfügbarkeit / SLA | ja | MSA § 4; SLA Anlage 2 | Verfügbarkeit 99,5 % monatlich; Reaktionszeit P1-Vorfälle 2 Stunden |
| V4 | **Ausschluss der Nutzung der Inhalte für Modelltraining** | ja | MSA § 5 Abs. 2; Nachtrag 15.01.2026 | Wortlaut: „Meridian AI verwendet Inhalte, die durch die Verarbeitung der Kundendaten entstehen, nicht zur Anpassung oder Weiterentwicklung von Modellen." Nachtrag klärt Zwischenspeicher zur Missbrauchserkennung: maximal 24 Stunden Vorhaltung, danach Löschung. Vertragsstelle ist belegt; Marketingtext wurde nicht akzeptiert. |
| V5 | Aufbewahrung und Löschung übermittelter Inhalte beim Anbieter | ja | MSA § 5 Abs. 3 | Löschung innerhalb von 30 Tagen nach Vertragsende; Löschbestätigung in Textform auf Anforderung |
| V6 | Unterstützung bei IKT-Vorfällen, Melde- und Informationspflichten | ja | MSA § 7 | Meldepflicht bei P1-Vorfällen innerhalb 4 Stunden; Post-Incident-Report innerhalb 5 Werktage |
| V7 | Zugangs-, Einsichts- und **Prüfrechte** (auch für die Aufsicht) | ja | MSA § 9 | Prüfrecht durch Nordwind Bank AG und zuständige Aufsichtsbehörde; Anbieter kann auf Third-Party Audit (anerkannter Dritter) verweisen |
| V8 | Regelungen zu **Subunternehmern** und deren Wechsel | teilweise | MSA § 10 | Vorabinformation 30 Tage vor Wechsel wesentlicher Subunternehmer; Widerspruchsrecht mit Sonderkündigung; Offenlegung der zweiten Ebene vereinbart; tiefere Ebenen nur auf Anfrage |
| V9 | Kündigungsrechte | ja | MSA § 12 | Ordentliche Kündigung 3 Monate zum Laufzeitende; außerordentliche Kündigung nach 30-tägiger Nachfrist; aufsichtsrechtliches Sonderkündigungsrecht |
| V10 | **Exit-Strategie und angemessene Übergangsfrist** | ja | MSA § 12 Abs. 4 | 6-monatige Übergangsfrist nach Kündigung; Datenmigrations-Unterstützung durch Anbieter zugesagt |
| V11 | Auftragsverarbeitungsvertrag nach Art. 28 DSGVO | ja | AVV, Anlage 3 zum MSA, unterzeichnet 15.11.2025 | Regelkonform; Verweis auf DSFA-Baustein [`02`](02-dsfa-baustein-rag.md) |
| V12 | Grundlage einer etwaigen Drittlandübermittlung (Art. 44–49 DSGVO) | offen / Auflage A2 | MSA § 3 Abs. 2 | **Streitige Position — vollständig dargestellt in Abschnitt 7.** Hauptleistung in EU; Support über Drittland-Partnerunternehmen. Technische Sofortmaßnahme umgesetzt; vertragliche Klärung als Auflage A2 bis 30.09.2026. |
| V13 | Ankündigungsfrist bei Modell- oder Versionsänderungen | **nein** | — | **Rot — Auflage A3.** Keine vertragliche Ankündigungsfrist; keine Möglichkeit zur Versionsfixierung vereinbart. Konsequenz: Das Leistungsverhalten kann sich ohne Vorwarnung ändern. Interim-Maßnahme: wöchentlicher automatisierter Regressionslauf gegen den Referenzfragenkatalog (A. Kellner). Nachverhandlung bis 30.09.2026 (Auflage A3). |

## 4. Subunternehmerkette

| Ebene | Dienstleister | Leistung | Sitz / Region | Bekannt seit | Zustimmungspflichtig? |
|---|---|---|---|---|---|
| 1 | Meridian AI B.V. | Modellinferenz (Antworterzeugung) | Amsterdam, NL; Inferenz EU-Region Frankfurt | Einordnung 18.11.2025 | — (Hauptanbieter) |
| 2 | EU-Hyperscaler (Name vertraglich nicht offengelegt; Region EU Frankfurt bestätigt) | Recheninfrastruktur für Inferenz | EU-Region Frankfurt | 15.01.2026 (Anbieterdisclosure) | Widerspruchsrecht bei Regionswechsel aus EU; kein Zustimmungsvorbehalt bei Verbleib EU |
| 2 | Partnerunternehmen (Name und Drittstaat vertraglich nicht offengelegt) | 24/7-technischer Support; im Störungsfall Zugriff auf Systemprotokolle | außerhalb EU (Drittland) | 09.12.2025 — aufgedeckt im Rahmen der DSFA-Prüfung | Widerspruchsrecht ausgeübt → Grundlage für Auflage A2; Offenlegung von Name und Sitz als Bestandteil der A2-Verhandlung angefordert |

| Frage | Antwort |
|---|---|
| Wie erfahren Sie von einem Wechsel in der Kette? | Vertragliche 30-Tage-Vorabinformation bei wesentlichen Subunternehmern (MSA § 10); Wechsel des EU-Hyperscalers gilt als wesentlich, wenn ein Regionswechsel eintritt |
| Widerspruchs- oder Kündigungsrecht bei Wechsel? | Ja — Widerspruchsrecht berechtigt zu Sonderkündigung (MSA § 12 Abs. 2 Buchst. b) |
| Ist die Kette über die zweite Ebene hinaus transparent? | Nein — als Restrisiko in [`07`](07-freigabevorlage.md) geführt; weitergehende Offenlegung beim Anbieter angefragt (C. Ahrens), Antwort ausstehend, Zieltermin 31.08.2026 |

## 5. Konzentrationsrisiko

DORA verlangt in **Art. 29** eine vorherige Bewertung des IKT-Konzentrationsrisikos auf
Unternehmensebene.

| Frage | Bewertung |
|---|---|
| Wie viele weitere Anwendungen nutzen denselben Anbieter? | Keine — NORA ist der erste und einzige Bezug von Meridian AI durch die Nordwind Bank AG. |
| Läuft die Vektordatenbank beim selben Anbieter wie das Modell? | Nein — Vektorindex ist eigenbetrieben (RZ Bremen). Dies ist eine bewusste Architekturentscheidung, die das Konzentrationsrisiko begrenzt. |
| Nutzen Anbieter und Subunternehmer dieselbe Infrastruktur wie das Haus? | Nein — der EU-Hyperscaler von Meridian AI ist vom eigenen RZ der Nordwind Bank AG getrennt. |
| Gibt es eine technisch erprobte Ausweichoption? | Eingeschränkt: Testlauf Referenzfragenkatalog (180 Fragen) gegen selbst-gehostetes offenes Modell am 12.05.2026. Ergebnis: Qualitätsscore 68,3 % gegenüber 91,1 % bei Meridian AI. Ein vollständiger Exit-Test (Integrationsstrecke, Berechtigungsprüfung, Rollout) wurde nicht durchgeführt. |
| Bewertung des Konzentrationsrisikos | Meridian AI ist die einzige externe Komponente der NORA-Lösung. Ihr Ausfall unterbricht den NORA-Betrieb vollständig; da keine kritische Funktion betroffen ist, ist der Geschäftsbetrieb nicht unmittelbar gefährdet. Das Fehlen einer vollständig getesteten gleichwertigen Alternative erhöht das Konzentrationsrisiko jedoch. Als Restrisiko in [`07`](07-freigabevorlage.md) geführt. |

## 6. Exit-Strategie

| Frage | Antwort |
|---|---|
| Auslöser für einen Exit | Ordentliche Kündigung; wesentliche Vertragsverletzung; aufsichtsrechtliche Anordnung; anhaltende SLA-Unterschreitung (mehr als 2 aufeinanderfolgende Monate); Insolvenz des Anbieters; kritischer IKT-Sicherheitsvorfall beim Anbieter |
| Zielzustand nach Exit | Primär: Wechsel zu anderem LLM-Anbieter mit EU-Verarbeitung. Sekundär: Betrieb eines selbst-gehosteten offenen Modells (s. Testlauf). Tertiär: Abschaltung NORA, Rückfall auf Quellsysteme. |
| Übergangsfrist (vertraglich) | 6 Monate (MSA § 12 Abs. 4) |
| Was muss migriert werden? | Prompt-Konfiguration, Systemanweisung (prompt_config.yaml), API-Integrationskonfiguration. Vektorindex und Embedding sind eigenbetrieben und müssen nicht migriert werden — dieser Umstand ist ein direktes Ergebnis der Architekturentscheidung, nur die Inferenz einzukaufen. |
| Was ist nicht migrierbar? | Das anbieterspezifische Antwortverhalten (Tonalität, Detailgrad, Umgang mit Fragmenten). Eine direkte Leistungsgleichheit ist ohne Neubewertung der Antwortqualität nach [`06`](06-testnachweise.md) nicht garantierbar. |
| Rückgabe und Löschung beim Anbieter | Löschung aller verarbeiteten Inhalte innerhalb 30 Tage nach Vertragsende (MSA § 5 Abs. 3); Löschbestätigung in Textform |
| Erprobt? | Teilweise. Am 12.05.2026 wurde der Referenzfragenkatalog (180 Fragen) gegen ein selbst-gehostetes offenes Modell ausgeführt. Qualitätsscore: 68,3 % gegenüber 91,1 % bei Meridian AI. Dies ist kein vollständiger Exit-Test; Integrationsstrecke und Rollout wurden nicht getestet. Die Evidenz zeigt jedoch: ein Betrieb unter eingeschränkter Qualität wäre technisch möglich. |
| Geschätzter Aufwand und Dauer | T. Brand / A. Kellner, Schätzung 14.05.2026: 4–6 Wochen technische Umrüstung; 2–4 Wochen Qualitätsmessung und Fachfreigabe; insgesamt 6–10 Wochen. Liegt innerhalb der vertraglichen Übergangsfrist. |

## 7. Datenschutz-Schnittstelle

| Frage | Antwort | Verweis |
|---|---|---|
| Auftragsverarbeitung nach Art. 28 DSGVO geregelt? | Ja — AVV abgeschlossen 15.11.2025, Anlage 3 zum MSA | [`02`](02-dsfa-baustein-rag.md) |
| Drittlandbezug vorhanden? | **Streitig — Sachverhalt und Auflösung vollständig nachfolgend dokumentiert** | |
| Grundlage der Übermittlung (Art. 44–49 DSGVO) | Meridian AI verarbeitet in EU-Region Frankfurt; als niederländische B.V. ist sie EU-Gesellschaft. Für die Hauptleistung (Inferenz) liegt kein Drittlandbezug vor. Für den Support-Zugriff: s. u. | |
| Zugriffsmöglichkeiten aus Drittstaaten (auch Support und Betrieb) | 24/7-Support über Partnerunternehmen mit Sitz außerhalb der EU; im Störungsfall Zugriff auf Systemprotokolle, die Anfrageinhalte enthalten konnten | |
| Ergänzende Maßnahmen | (1) Technisch (vor Go-live umgesetzt): anbieterseitiges Logging auf Metadaten beschränkt; Anfrageinhalte werden nicht mehr beim Anbieter protokolliert. (2) Vertraglich (Auflage A2): Beschränkung des Support-Zugriffs auf EU-Personal, schriftliche Bestätigung durch Meridian AI bis 30.09.2026. | |

### Dokumentierter Meinungsunterschied — Drittstaaten-Frage (Klärungssitzung 24.03.2026)

**Sachverhalt.** Im Rahmen des DSFA-Bausteins ([`02`](02-dsfa-baustein-rag.md), erste Fassung
09.12.2025) stellte R. Mattis (DSB) fest, dass der 24/7-technische Support von Meridian AI über
ein Partnerunternehmen mit Standort außerhalb der EU erbracht wird. Dieses Partnerunternehmen
hatte im Störungsfall Zugriff auf Systemprotokolle, die Anfrageinhalte enthalten konnten. Der
Sachverhalt war im Anbieterprofil nicht erkennbar gewesen und wurde erst bei der Vertragsprüfung
aufgedeckt.

**Die beiden Positionen:**

| | R. Mattis (Datenschutzbeauftragter) | C. Ahrens (Auslagerungsmanagement) |
|---|---|---|
| Einschätzung | Ein Zugriffsweg aus einem Drittstaat auf personenbezogene Daten ist eine Übermittlung im Sinne des Art. 44 DSGVO, unabhängig davon, wo die Daten gespeichert sind. Die Bewertung nach Art. 44–49 DSGVO ist nachzuholen; eine Freigabe vor Klärung ist nicht vertretbar. | Die Hauptleistung (Inferenz) wird vollständig in der EU erbracht. Der Support ist eine Nebenleistung mit eng begrenztem, anlassbezogenem Zugriff. Die Konstellation war im Anbieterprofil nicht erkennbar und stellt keine bewusste Drittlandsübermittlung dar. Eine Aufnahme als Auflage mit Frist ist sachgerecht; nach technischen Sofortmaßnahmen kann der Betrieb beginnen. |
| Geforderte Konsequenz | Klärung vor Freigabe | Aufnahme als Auflage; Betrieb kann starten |

**Auflösung in der Sitzung vom 24.03.2026** (Teilnehmende: R. Mattis, C. Ahrens, A. Kellner,
M. Sørensen, Dr. P. Ohlsen). Einigung auf Zerlegung in zwei Teile:

1. **Sofortmaßnahme (vor Go-live umzusetzen):** Meridian AI reduziert das anbieterseitige Logging
   technisch auf Metadaten (Timestamp, Request-ID, HTTP-Statuscode); Anfrageinhalte werden nicht
   mehr beim Anbieter protokolliert. Damit entfällt der Inhalt, um den die Auseinandersetzung
   geführt wurde. Technische Umsetzung durch Meridian AI schriftlich bestätigt am 01.04.2026.

2. **Auflage A2 (mit Frist 30.09.2026):** Vertragliche Beschränkung des Support-Zugriffs auf
   Personal mit Arbeitsort in der EU; schriftliche Bestätigung durch Meridian AI. Bis zur
   Erfüllung trägt der Vorstand die verbleibende Unsicherheit (Support-Zugriff auf Metadaten aus
   Drittland) als ausgewiesenes Restrisiko in [`07`](07-freigabevorlage.md).

**Verbleibende Meinungsverschiedenheit.** R. Mattis hat zu Protokoll gegeben, dass die Frage,
ob ein Metadaten-Zugriff aus einem Drittstaat eine Übermittlung im Sinne des Art. 44 DSGVO
begründet, aus seiner Sicht nicht abschließend beantwortet ist. Er trägt die Auflösung mit, hat
jedoch darum gebeten, seinen Vorbehalt in der Freigabevorlage ([`07`](07-freigabevorlage.md),
Abschnitt 7) ausdrücklich zu dokumentieren. Dem wurde entsprochen.

## 8. Steuerung im Regelbetrieb

| Gegenstand | Verfahren | Turnus | Verantwortlich |
|---|---|---|---|
| Leistungsüberwachung / SLA | API-Monitoring; Auswertung im Betriebsmonitor ([`04`](04-betriebskonzept.md), Abschnitt 7) | monatlich | C. Ahrens / A. Kellner |
| Prüfung von Nachweisen des Anbieters (ISO 27001, SOC 2 Type II) | Jahresbericht und Zertifikat anfordern und auswerten | jährlich | C. Ahrens / Dr. P. Ohlsen |
| Überprüfung der Subunternehmerkette | Aktualisierung der Subunternehmer-Offenlegung; Nachfrage bei Änderungsanzeige | jährlich, anlassbezogen | C. Ahrens |
| Neubewertung der Einstufung (kritische/wichtige Funktion) | Neubewertung nach DORA Art. 3 Nr. 22; obligatorisch bei jeder wesentlichen Funktionserweiterung | jährlich, anlassbezogen | C. Ahrens / S. Vogt |
| Aktualisierung des Registereintrags (Nr. 2025-047) | Anpassung bei jeder wesentlichen Änderung | anlassbezogen, mindestens jährlich | C. Ahrens |
| Wiederholung des Exit-Nachweises | Erweiterter Testlauf Referenzfragenkatalog gegen Ausweichmodell | jährlich | A. Kellner / T. Brand |
| Vertragliche Nachverhandlung (Auflage A3) | Nachverhandlung Ankündigungsfrist und Versionspinning; Zieltermin 30.09.2026 | einmalig / anlassbezogen | C. Ahrens / Einkauf |
| Regressionslauf BET-02 (interim bis A3 erfüllt) | Automatisierter wöchentlicher Lauf des Referenzfragenkatalogs gegen NORA-Produktivinstanz; Abweichung > 10 Prozentpunkte löst Eskalation aus | wöchentlich | A. Kellner |

## 9. Ergebnis

| Feld | Inhalt |
|---|---|
| Bewertung insgesamt | Der Fremdbezug von Meridian AI B.V. ist unter den genannten Auflagen zulässig. Meridian AI ist der einzige externe IKT-Dienstleister der NORA-Lösung. Die Hauptleistung wird in der EU erbracht; Vektorindex und Embedding sind vollständig eigenbetrieben. Die Drittstaaten-Frage (Support) wurde durch eine technische Sofortmaßnahme entschärft; die vertragliche Klärung verbleibt als Auflage A2. Das fehlende Versionspinning und die fehlende Ankündigungsfrist (V13) werden als Auflage A3 geführt. |
| Restrisiken | (1) Support-Zugriff eines Drittland-Partners auf Metadaten bis zur vertraglichen Klärung (A2); (2) fehlende Ankündigungsfrist und kein Versionspinning für Modellaktualisierungen bis zur Nachverhandlung (A3); (3) Konzentrationsrisiko: kein vollständig erprobter gleichwertiger Anbieter verfügbar. Alle drei wandern in [`07`](07-freigabevorlage.md). |
| Auflagen | A2 — Beschränkung Support-Zugriff auf EU-Personal, schriftliche Bestätigung Meridian AI bis 30.09.2026 (C. Ahrens / Einkauf). A3 — Nachverhandlung Ankündigungsfrist und Versionspinning bis 30.09.2026 (C. Ahrens / Einkauf); interim wöchentlicher Regressionslauf (A. Kellner). |
| Empfehlung | Fremdbezug befürwortet unter Auflagen A2 und A3 |
| Wiedervorlage | 30.11.2026 (Vorstandsbeschluss 24.06.2026) |

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Ist Meridian AI im Informationsregister erfasst — und wann wurde die Einordnung als
   IKT-Drittdienstleister vorgenommen?"** Gefragt von I. Bruns (Interne Revision, beratend) am
   08.06.2026 im Abschlussgespräch. Antwort: Eintrag Nr. 2025-047, eingetragen 18.11.2025 durch
   C. Ahrens; Einordnungsentscheidung aktenkundig. I. Bruns hat angemerkt, dass die frühzeitige
   Einordnung — am selben Tag wie der formale Projektfortschritt — beispielhaft ist.

2. **„Unterstützt NORA eine kritische oder wichtige Funktion — und wie haben Sie das begründet?"**
   Gefragt von S. Vogt (2nd Line) am 19.05.2026. Antwort: Nein; Begründung in Abschnitt 2 dieses
   Dokuments. S. Vogt hat die Begründung als tragfähig bewertet, mit dem ausdrücklichen Hinweis,
   dass die Einstufung bei jeder funktionalen Erweiterung von NORA zu wiederholen ist.

3. **„Zeigen Sie mir die Vertragsstelle, aus der sich ergibt, dass Inhalte nicht zum Training
   verwendet werden — und gilt das auch für den Zwischenspeicher?"** Gefragt von Dr. P. Ohlsen
   (ISB) am 14.01.2026. Antwort: MSA § 5 Abs. 2; Nachtrag vom 15.01.2026 regelt Zwischenspeicher
   (maximal 24 Stunden, danach Löschung). Dokumentiert in V4.

4. **„Was wurde von der Exit-Strategie tatsächlich erprobt?"** Gefragt von I. Bruns am
   08.06.2026. Antwort: Testlauf Referenzfragenkatalog am 12.05.2026 gegen selbst-gehostetes
   Modell; Qualitätsscore 68,3 % vs. 91,1 %. Kein vollständiger Exit-Test; Evidenz liegt in
   [`06`](06-testnachweise.md) vor. I. Bruns hat das als ausreichend für die Freigabe unter
   Auflage bewertet.

5. **„Was passiert, wenn Meridian AI das Modell ohne Ankündigung aktualisiert?"** Gefragt von
   S. Vogt am 19.05.2026 — direkt mit Verweis auf die fehlende Vertragsklausel. Antwort: Risiko
   erkannt (V13, rot), als Auflage A3 geführt, interim durch wöchentlichen Regressionslauf
   behandelt. Vollständige vertragliche Steuerung bis zur Nachverhandlung nicht möglich; dieser
   Umstand ist in [`07`](07-freigabevorlage.md) ausgewiesen.

## Offene Punkte

- **A2 (Auflage):** Vertraglicher Nachtrag mit schriftlicher Bestätigung Meridian AI zur
  Beschränkung des Support-Zugriffs auf EU-Personal; Verantwortlich: C. Ahrens / Einkauf;
  Zieltermin 30.09.2026.
- **A3 (Auflage):** Nachverhandlung Ankündigungsfrist für Modellaktualisierungen und
  Versionspinning; Verantwortlich: C. Ahrens / Einkauf; Zieltermin 30.09.2026.
- **Subunternehmerkette ab dritter Ebene:** Nicht transparent; Nachfrage bei Meridian AI zur
  weiteren Offenlegung; Verantwortlich: C. Ahrens; Zieltermin 31.08.2026.
- **Name und Sitz des Support-Drittland-Partners:** Vertraglich nicht offengelegt; Offenlegung
  als Teil der A2-Verhandlung angefordert; Verantwortlich: C. Ahrens; Zieltermin 30.09.2026.
- **Exit-Test:** Bisheriger Testlauf ist kein vollständiger Exit-Test; erweiterter Nachweis
  (Integrationsstrecke) für Wiedervorlage 30.11.2026 vorgesehen; Verantwortlich: A. Kellner.

# 05 — Notfallkonzept NORA

> **Wer benutzt dieses Dokument?** BCM-/Notfallverantwortliche gemeinsam mit dem
> Systemverantwortlichen IT und der Informationssicherheit.
> **In welchem Prozess?** Notfall- und Wiederanlaufverfahren; Anbindung an das bestehende
> Notfallmanagement des Hauses.
> **Wer prüft es?** 2nd Line und interne Revision — mit der Kernfrage, ob der Kill-Switch
> nicht nur existiert, sondern **erprobt** ist und außerhalb der Geschäftszeiten erreichbar.

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden; Personen,
> Anbieter, Zahlen und Befunde sind konstruiert. Der Ablauf ist echt.
> Siehe [`../00-fallbeschreibung.md`](../00-fallbeschreibung.md).

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Siehe [`../../DISCLAIMER.md`](../../DISCLAIMER.md).

Dies ist die ausgefüllte Pilotfassung für NORA (Nordwind Richtlinien-Assistent), fertiggestellt
am 08.06.2026 als Teil der Freigabeakte durch T. Brand (Projektleitung) und A. Kellner
(Enterprise-Architekt). Das leere Vorlagenformat findet sich unter
[`../../akte/05-notfallkonzept.md`](../../akte/05-notfallkonzept.md).

---

## 1. Einordnung

| Feld | Inhalt |
|---|---|
| System | NORA — Nordwind Richtlinien-Assistent |
| Kritische oder wichtige Funktion? | Nein. NORA erfüllt nicht die Kriterien einer kritischen oder wichtigen Funktion im Sinne von DORA Art. 3 Nr. 22. Kein Kerngeschäftsprozess der Nordwind Bank AG steht ohne das System still. Verweis auf Einordnung in [`../../akte/03-auslagerung-drittparteien.md`](../../akte/03-auslagerung-drittparteien.md). |
| Geschäftsprozess-Abhängigkeit | Auskunft zu internen Richtlinien, Arbeitsanweisungen und Prozessbeschreibungen. Der Prozess „Regelungsanfrage durch Beschäftigte" ist nicht auf NORA umgestellt worden — das Intranet-Handbuch und die Organisationsabteilung (Telefon-Hotline) bleiben vollständig funktionsfähige Rückfallwege. |
| Verfügbarkeitsklasse / Schutzbedarf Verfügbarkeit | Normal. Verweis auf [`../../akte/01-schutzbedarfsfeststellung.md`](../../akte/01-schutzbedarfsfeststellung.md). Die Einstufung gilt unter der Bedingung, dass der Rückfallweg (Intranet-Handbuch) aktiv gepflegt bleibt; vgl. Offene Punkte. |
| Fachlicher Rückfallweg | Intranet-Handbuch (eines der drei NORA-Quellsysteme); direkte Auskunft der Organisationsabteilung, Telefon-Hotline während Geschäftszeiten |
| RTO / RPO | 8 Arbeitsstunden / 24 Stunden |

Die Verfügbarkeitsklasse „normal" setzt voraus, dass das Intranet-Handbuch als gepflegter
Parallelpfad fortbesteht. Stellt die Organisationsabteilung die aktive Pflege ein, weil NORA die
Auskunftsfunktion übernommen hat, fällt der Rückfallweg faktisch weg — die Einstufung wäre neu
zu bewerten. Für den Nachweis der Aktualität des Intranet-Handbuchs gilt die Regelung in den
Offenen Punkten.

## 2. Szenarien

Für jedes Szenario: Erkennung, Sofortmaßnahme, Entscheidungsträger, Wiederanlauf.

### S1 — Vollständiger Ausfall des Systems

| Feld | Inhalt |
|---|---|
| Auslöser | Infrastrukturausfall RZ Bremen (Anwendungsserver, Datenbankschicht oder Netz); geplante oder ungeplante Wartung |
| Erkennung | Uptime-Check alle 2 Minuten; drei aufeinanderfolgende Fehlschläge → ITSM-Alarm an T. Brand per Ticket und SMS |
| Auswirkung | Keine NORA-Auskunft; Beschäftigte weichen auf das Intranet-Handbuch aus. |
| Sofortmaßnahme | ITSM-Ticket öffnen; Statusbanner auf Intranet-Startseite mit Verweis auf den Rückfallweg schalten; M. Sørensen (Fachverantwortung) informieren |
| Entscheidung | T. Brand |
| Wiederanlauf | Reihenfolge und Prüfschritte: Abschnitt 5 |

### S2 — Ausfall oder Störung des LLM-Anbieters (Meridian AI)

| Feld | Inhalt |
|---|---|
| Auslöser | Anbieterstörung, Rate-Limiting, regionaler Ausfall EU-Region Frankfurt |
| Erkennung | HTTP-Fehlerquote > 5 % innerhalb von 5 Minuten oder Latenz p95 > 10 s → Alarmierung T. Brand; parallel Prüfung der Anbieter-Statusseite |
| Auswirkung | Retrieval (Trefferliste, Berechtigungsprüfung) funktioniert; Antworterzeugung nicht möglich. |
| Degradationsmodus | D1 bei Störungsdauer < 2 Stunden; D2 ab 2 Stunden Störungsdauer — Verweis auf Abschnitt 3 |
| Ausweichoption | Kein erprobtes Zweitmodell vorhanden. NORA ist auf Meridian AI als einzigen LLM-Anbieter angewiesen. Dieser Umstand ist als Konzentrationsrisiko in [`../../akte/03-auslagerung-drittparteien.md`](../../akte/03-auslagerung-drittparteien.md) dokumentiert und als Restrisiko in der Freigabevorlage ausgewiesen. Eine Failover-Lösung ist nicht Teil des aktuellen Betriebskonzepts. |
| Entscheidung | T. Brand; Eskalation an M. Sørensen ab D2 |

### S3 — Fehlerhafte Antworten im Regelbetrieb (der eigentliche Notfall)

| Feld | Inhalt |
|---|---|
| Auslöser | Anbieterseitige Modellaktualisierung ohne Ankündigungsfrist (vgl. Auflage A3 und Kontrollbefund BET-02); fehlerhafte Indexierung; veraltete Quelle (vgl. T10-Befund, zwei abgelöste Richtlinienversionen) |
| Erkennung | Wöchentlicher automatisierter Regressionslauf (T12) gegen 180 Referenzfragen; Alarmierung bei Abweichung > 10 Prozentpunkte gegenüber der Freigabe-Baseline. Ergänzend: Nutzermeldungen über ITSM; monatliche Stichprobenprüfung durch Organisationsabteilung |
| Auswirkung | Beschäftigte handeln nach fehlerhafter Auskunft; Schaden entsteht nachgelagert und wird spät sichtbar. |
| Sofortmaßnahme | D3 (Kill-Switch) oder D1 (nur Trefferliste) je nach Schwere — Entscheidung durch M. Sørensen; aktive Rückfrage an Nutzende, deren Anfragen im betroffenen Zeitraum protokolliert sind |
| Nachlauf | Alle Anfragen seit dem letzten bestandenen Regressionslauf aus dem Protokoll ermitteln; T. Brand ermittelt betroffene Nutzende gemeinsam mit M. Sørensen und informiert diese direkt. |
| Entscheidung | M. Sørensen (Fachverantwortung), nicht IT |

*Dieses Szenario unterscheidet ein RAG-Notfallkonzept von einem generischen. Der Nachlauf ist der
entscheidende Teil: Wenn nicht gesagt werden kann, wer in den letzten Tagen eine falsche Auskunft
erhalten hat, ist die Protokollierung für den Notfall nicht ausreichend.*

### S4 — Unberechtigte Offenlegung von Inhalten über Antworten

| Feld | Inhalt |
|---|---|
| Auslöser | Fehlerhafte Berechtigungsprüfung (vgl. T1-Befund vom 11.02.2026 — Quellenangaben zeigten Titel nicht berechtigter Dokumente); Indexierung nicht freigegebener Quellen; Prompt-Manipulation (vgl. T6-Befund indirekter Injection über indexiertes Dokument) |
| Erkennung | Nutzermeldung; Stichprobenprüfung; Auswertung des Zugriffsprotokollmusters |
| Sofortmaßnahme | **Kill-Switch (D3) sofort** — kein Degradationsbetrieb bei Verdacht auf unberechtigte Offenlegung |
| Meldepflichten | Dr. P. Ohlsen (ISB) bewertet als Informationssicherheitsvorfall; R. Mattis (DSB) prüft Meldepflicht nach Art. 33 DSGVO (72-Stunden-Frist); ggf. DORA-Meldung nach Art. 17 über C. Ahrens — Entscheidung mit den zuständigen Funktionen, nicht im Alleingang |
| Beweissicherung | Protokolle vor Wiederanlauf in revisionssicherer Ablage sichern; Index-Snapshot aufbewahren. |
| Entscheidung | Dr. P. Ohlsen (ISB), Eskalation an COO |

### S5 — Kompromittierung oder Manipulation der Wissensbasis

| Feld | Inhalt |
|---|---|
| Auslöser | Eingeschleuste Inhalte über manipulierte Quelldokumente (vgl. eingeschränkten T6-Befund zur indirekten Prompt Injection); unbefugte Indexänderung |
| Erkennung | Täglicher Hash-Abgleich Index ↔ freigegebene Quelldokumentliste; Abweichungsmeldung aus Monitoring |
| Sofortmaßnahme | Kill-Switch; Neuaufbau des Index aus integritätsgeprüften Quellen nach Prüfung durch T. Brand und Dr. P. Ohlsen |
| Besonderheit | Ein Neuaufbau aus derselben kompromittierten Quelle stellt den Fehler wieder her — die Quelldokumente sind vor der Neuindexierung durch M. Sørensen freizugeben. |

### S6 — Dauerhafter Ausfall oder Kündigung Meridian AI

| Feld | Inhalt |
|---|---|
| Auslöser | Kündigung des Dienstleistungsvertrags durch Meridian AI, Insolvenz, dauerhafte Nichterreichbarkeit > 5 Werktage |
| Erkennung | Vertragliche Kündigung oder fortlaufender D1/D2-Zustand aus S2 |
| Auswirkung | Antworterzeugung dauerhaft nicht möglich; NORA verbleibt in D2 |
| Sofortmaßnahme | D2 bis Ersatzlösung verfügbar; C. Ahrens (Auslagerungsmanagement) leitet Ausstiegsprozess nach DORA Art. 30 Abs. 3 Buchst. f ein |
| Besonderheit | Ausstiegsstrategie in [`../../akte/03-auslagerung-drittparteien.md`](../../akte/03-auslagerung-drittparteien.md) hinterlegt |

## 3. Degradationsmodi

Festgelegt vor Inbetriebnahme; Änderungen nur durch T. Brand mit Dokumentation im ITSM.

| Stufe | Zustand | Verhalten des Systems | Auslöser | Freigabe durch |
|---|---|---|---|---|
| D0 | Normalbetrieb | Retrieval + Antworterzeugung mit Quellenangabe | — | — |
| D1 | Eingeschränkt | Nur Trefferliste (Dokumenttitel, Abschnittsüberschrift, Relevanzwert) — kein generierter Antworttext | S2 Störungsdauer < 2 h; automatisch durch Middleware-Fehlerbehandlung bei LLM-Timeout | T. Brand |
| D2 | Nur Verweis | Statusmeldung: „NORA ist vorübergehend nicht vollständig verfügbar. Bitte nutzen Sie das Intranet-Handbuch oder wenden Sie sich an die Organisationsabteilung (Durchwahl: XXXX)." | S2 Störungsdauer ≥ 2 h; S1 bei bekannter Ursache | T. Brand, Meldung an M. Sørensen |
| D3 | Abgeschaltet | Kein Zugang; Statusmeldung mit Verweis auf Rückfallweg | Kill-Switch (Abschnitt 4) | T. Brand nach abgeschlossenem Wiederanlauf (Abschnitt 5) |

**Antwortgenerierung ohne Retrieval ist technisch ausgeschlossen.** Die NORA-Middleware prüft
vor jeder Weiterleitung an Meridian AI, ob der Retrieval-Schritt vollständig durchgelaufen und die
Berechtigungsprüfung abgeschlossen ist. Liegen keine berechtigten Treffer vor oder ist die
Berechtigungsprüfung nicht durchlaufen worden, wird die Anfrage nicht an Meridian AI
weitergeleitet, und der Nutzer erhält eine explizite Fehlermeldung ohne Quelleninhalt. Diese
Logik ist als Assertion in der Middleware implementiert (Code-Review-Protokoll A. Kellner,
28.01.2026) und bleibt auch im Modus D1 aktiv — die Trefferliste wird angezeigt, jedoch kein
LLM-Aufruf ausgeführt.

## 4. Kill-Switch

| Feld | Inhalt |
|---|---|
| Technische Umsetzung | Feature-Flag `nora.enabled` in der zentralen Konfigurationsverwaltung (RZ Bremen). Setzen auf `false` bewirkt, dass alle NORA-Endpunkte HTTP 503 mit Statusmeldung zurückgeben; laufende Verbindungen werden beim nächsten Response-Zyklus abgebrochen. |
| Wirkzeit | Zielwert < 2 Minuten; gemessen **90 Sekunden** im Produktionstest am 16.06.2026 (Protokoll NORA-TP-T8-20260616) |
| Auslöseberechtigte | M. Sørensen (Leitung Organisation, primär) und Dr. P. Ohlsen (ISB, sekundär) |
| Auslösung außerhalb der Geschäftszeiten | IT-Bereitschaftsdienst (24/7 erreichbar über ITSM-Hotline) führt die Änderung auf telefonische Anweisung eines der Auslöseberechtigten aus. Entscheidungsbefugnis verbleibt bei M. Sørensen oder Dr. P. Ohlsen; der Bereitschaftsdienst handelt ausschließlich auf Anweisung, nicht selbstständig. |
| Auslösung ohne IT-Beteiligung möglich? | Nein — der Konfigurationsverwaltungs-Zugriff setzt VPN und Rollenzertifikat voraus. Verbesserung in Prüfung; vgl. Offene Punkte. |
| Wirkung auf laufende Anfragen | Laufende HTTP-Anfragen werden beim nächsten Response-Zyklus mit HTTP 503 abgebrochen; offene Aufrufe an Meridian AI werden nicht mehr abgeholt. |
| Sichtbarkeit für Nutzende | „NORA ist derzeit außer Betrieb. Bitte nutzen Sie das Intranet-Handbuch oder wenden Sie sich an die Organisationsabteilung. Rückfragen: nora-support@nordwindbank.example" |
| Wiederinbetriebnahme durch | T. Brand (Betriebsverantwortlicher) — bewusst nicht dieselbe Rolle wie die auslösenden; Wiederfreigabe erst nach vollständig dokumentiertem Wiederanlauf (Abschnitt 5). |
| Erprobung | **Turnus:** jährlich sowie nach jeder wesentlichen Änderung · **Letzter Test (TEST-Umgebung):** Januar 2026 (vor Pilotbetrieb) · **Letzter Test (Produktion):** 16.06.2026, ausgelöst von T. Brand auf Anweisung von Dr. P. Ohlsen · **Evidenz:** NORA-TP-T8-20260616 |

## 5. Wiederanlauf

**Reihenfolge.** 1. Ursache identifiziert und im ITSM-Ticket dokumentiert. 2. Intranet-Rückfallweg
aktiv und Statusbanner gesetzt (M. Sørensen bestätigt). 3. Infrastruktur wiederhergestellt oder
Störung durch Anbieter beendet. 4. Falls Restore aus Sicherung: Löschliste angewendet (s. u.).
5. Alle Prüfschritte aus der Tabelle vollständig durchgeführt und dokumentiert. 6. Wiederfreigabe
durch T. Brand im ITSM-Ticket gegengezeichnet.

**Prüfschritte vor der Wiederfreigabe** — mindestens:

| # | Prüfschritt | Verantwortlich | Evidenz |
|---|---|---|---|
| 1 | Ursache behoben und dokumentiert | T. Brand | ITSM-Ticket, Status: geschlossen |
| 2 | Index konsistent zur Quelle (Stichprobe 10 Dokumente) | T. Brand | Stichprobenprotokoll |
| 3 | Berechtigungsprüfung wirksam (Negativtest, 3 Anfragen mit nicht berechtigtem Testnutzer) | Dr. P. Ohlsen | Testprotokoll, vgl. [`06-testnachweise.md`](06-testnachweise.md) T1 |
| 4 | Gelöschte Inhalte weiterhin nicht auffindbar | T. Brand | vgl. [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md) |
| 5 | Stichprobe fachlicher Antwortqualität (5 Referenzfragen) | M. Sørensen (Organisationsabteilung) | Ergebnisnotiz |
| 6 | Freigabeentscheidung dokumentiert | T. Brand | ITSM-Ticket, Wiederfreigabevermerk |

**Löschabgleich nach Restore.** Die Nordwind Bank führt eine Löschliste (`loeschliste.json`,
versioniert in der Betriebsablage) mit Dokument-ID, Löschzeitpunkt und ausführender Rolle. Nach
jeder Wiederherstellung des Vektorindex aus einer Sicherung wird die Liste erneut auf den Index
angewendet, bevor Prüfschritt 3 beginnt. Ein Restore ohne vorherigen Löschabgleich gilt als
nicht freigegebener Zustand; T. Brand ist für die Einhaltung dieser Reihenfolge verantwortlich.
Das Verfahren ist vollständig in [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md),
Abschnitt S7 beschrieben.

## 6. Sicherung und Wiederherstellung

| Gegenstand | Gesichert? | Turnus | Aufbewahrung | Besonderheit |
|---|---|---|---|---|
| Quelldokumente | Ja | täglich (Quellsystem-intern) | 90 Tage | Führendes System: Richtliniendatenbank; NORA hält keine eigene Inhaltskopie |
| Vektorindex | Ja | täglich (Snapshot, RZ Bremen) | 30 Tage | **Enthält Ableitungen gelöschter Inhalte — Löschliste nach jedem Restore zwingend anwenden** |
| Metadaten / Berechtigungen | Ja | täglich | 30 Tage | Berechtigungen aus Verzeichnisdienst rekonstruierbar; Snapshot beschleunigt Wiederanlauf |
| Protokolle | Ja | täglich (append, kein Überschreiben) | 180 Tage | Eigener Schutzbedarf hoch; Ablage im Protokollsystem getrennt vom Index |
| Konfiguration / Prompts | Ja | bei Änderung (Git) | dauerhaft | Versioniert im NORA-Repository; Rollback auf jede frühere Version möglich |

**Wiederherstellungsstrategie Index.** Im Normalfall Wiederherstellung aus Sicherung (Ziel-RTO
< 4 h), gefolgt von obligatorischem Löschabgleich. Neuaufbau aus den Quellsystemen (Dauer
ca. 3 h bei 812 Dokumenten) ausschließlich bei Kompromittierung des Snapshots (Szenario S5). In
beiden Fällen sind die Prüfschritte aus Abschnitt 5 vollständig zu durchlaufen, bevor die
Wiederfreigabe erteilt wird.

## 7. Kommunikation

| Adressat | Auslöser | Kanal | Verantwortlich | Frist |
|---|---|---|---|---|
| Nutzende (alle 1.200 Beschäftigten) | D1–D3 | Statusbanner Intranet-Startseite | T. Brand | Innerhalb 30 Minuten nach Eintreten D1 |
| Fachverantwortung (M. Sørensen) | S3, S4 | ITSM-Ticket + Direktansprache | T. Brand | Sofort |
| ISB (Dr. P. Ohlsen) / Datenschutz (R. Mattis) | S4, S5 | ITSM-Ticket, ISB-Queue | T. Brand | Innerhalb 1 Stunde |
| Notfallstab | D3 mit erwarteter Ausfalldauer > 1 Arbeitstag | Notfallmanagement-Hotline | M. Sørensen | Innerhalb 2 Stunden |
| Aufsicht / externe Meldung | S4 mit meldepflichtiger Datenschutzschwelle | DSGVO Art. 33/34 via R. Mattis; DORA Art. 17 via C. Ahrens | R. Mattis / C. Ahrens | Innerhalb 72 Stunden (DSGVO); nach DORA-Meldefristen |
| Dienstleister Meridian AI | S2 | Support-Portal Meridian AI | T. Brand | Sofort bei Auftreten S2 |

## 8. Übungen

| Übung | Turnus | Letzte Durchführung | Ergebnis / Evidenz |
|---|---|---|---|
| Kill-Switch-Auslösung | Jährlich + nach wesentlicher Änderung | 16.06.2026 (Produktion) | NORA-TP-T8-20260616: bestanden, Wirkzeit 90 Sekunden |
| Wiederanlauf inkl. Negativtest | Jährlich | 02.06.2026 (Testumgebung) | NORA-TP-T9-20260602: bestanden, vgl. [`06-testnachweise.md`](06-testnachweise.md) T9 |
| Szenario S3 (Falschauskunft) als Tischübung | Jährlich | Noch nicht durchgeführt | — |
| Ausfall des LLM-Anbieters (S2) | Jährlich | Noch nicht durchgeführt | — |

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Wann wurde der Kill-Switch zuletzt tatsächlich ausgelöst, und wer war das?"** S. Vogt
   (2nd Line) fragte im Freigabevorbereitungsgespräch am 03.06.2026 nach dem Testprotokoll. Zum
   damaligen Zeitpunkt lag nur ein Test in der TEST-Umgebung vor (in der Kontrollbewertung gelb).
   Der Produktionstest folgte am 16.06.2026, ausgelöst von T. Brand auf Anweisung von
   Dr. P. Ohlsen; gemessene Wirkzeit 90 Sekunden. Protokoll: NORA-TP-T8-20260616.

2. **„Was macht das System, wenn der Index nicht erreichbar ist?"** Dr. P. Ohlsen (ISB) stellte
   diese Frage im Architekturreview vom 28.01.2026. A. Kellner (Enterprise-Architekt) verwies auf
   die Middleware-Assertion, die jeden LLM-Aufruf ohne vollständig abgeschlossenen Retrieval- und
   Berechtigungsschritt blockiert. Die Assertion ist im Code-Review-Protokoll A. Kellner vom
   28.01.2026 dokumentiert und in der TEST-Umgebung wiederholt verifiziert worden.

3. **„Wie merken Sie, dass das System falsch antwortet?"** I. Bruns (Interne Revision, beratend)
   stellte diese Frage am 08.06.2026. Antwort: wöchentlicher automatisierter Regressionslauf (T12)
   gegen 180 Referenzfragen; Alarm bei > 10 Prozentpunkte Abweichung gegenüber der
   Freigabe-Baseline. Ergänzend: ITSM-Nutzermeldungen und monatliche Stichprobe durch die
   Organisationsabteilung. Die strukturelle Schwäche — Meridian AI hat keine Ankündigungsfrist
   für Modelländerungen — ist Gegenstand von Auflage A3 (Nachverhandlung des Vertrags).

4. **„Nach einem Restore des Index — woher wissen Sie, dass zwischenzeitlich gelöschte Inhalte
   nicht wieder da sind?"** R. Mattis (DSB) stellte diese Frage am 24.03.2026 im Kontext der
   Drittstaaten-Diskussion. Antwort: Die Nordwind Bank führt die Löschliste mit Zeitstempel; nach
   jedem Restore wird die Liste vor der Wiederfreigabe durch T. Brand erneut angewendet.
   Verfahren in [`../../docs/loeschnachweis.md`](../../docs/loeschnachweis.md), Abschnitt S7;
   Prüfschritt 4 in Abschnitt 5 dieses Dokuments.

5. **„Wer entscheidet um 22 Uhr an einem Samstag über die Abschaltung?"** S. Vogt (2nd Line),
   03.06.2026. Antwort: M. Sørensen und Dr. P. Ohlsen sind per Diensthandy erreichbar und stehen
   im wechselnden Urlaubsvertretungsplan. Der IT-Bereitschaftsdienst führt die Änderung auf
   Anweisung aus. Eine selbstständige Auslösung durch die Entscheidungsberechtigten ohne
   IT-Beteiligung ist derzeit nicht möglich; das ist ein bekannter Mangel — vgl. Offene Punkte.

## Offene Punkte

- Tischübung Szenario S3 (fehlerhafte Antworten) noch nicht durchgeführt. Verantwortlich:
  M. Sørensen + T. Brand. Termin: 30.11.2026 (Wiedervorlage).
- Jahresübung Ausfall LLM-Anbieter (S2) noch nicht durchgeführt. Verantwortlich: T. Brand +
  C. Ahrens. Termin: 30.11.2026.
- Kill-Switch ohne IT-Beteiligung: M. Sørensen und Dr. P. Ohlsen können das Feature-Flag derzeit
  nicht ohne den IT-Bereitschaftsdienst setzen. A. Kellner prüft bis 31.10.2026 ein
  Self-Service-Interface für die Auslöseberechtigten.
- Aktualitätsnachweis Intranet-Handbuch (Rückfallweg): Formale Nachweisregelung derzeit nicht
  vorhanden. M. Sørensen ist verantwortlich für einen halbjährlichen schriftlichen Nachweis;
  erster Nachweis fällig 31.01.2027.

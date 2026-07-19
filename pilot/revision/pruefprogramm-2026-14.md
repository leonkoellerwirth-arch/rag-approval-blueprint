# Prüfprogramm 2026-14 — RAG-System NORA

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden; Personen,
> Anbieter, Zahlen und Befunde sind konstruiert. Der Ablauf ist echt. Siehe
> [`../00-fallbeschreibung.md`](../00-fallbeschreibung.md).

> **Kein Rechtsrat.** Siehe [`../../DISCLAIMER.md`](../../DISCLAIMER.md).

**Erstellt von:** I. Bruns (Leitung Interne Revision) · **Datum:** 04.09.2026 ·
**Prüfungszeitraum:** 21.09.–09.10.2026 · **Berichtstermin:** 16.10.2026

---

## Warum dieses Dokument im Repository steht

Alle übrigen Artefakte zeigen, was einer Prüfung **vorgelegt** wird. Dieses zeigt, was die
Prüfung daraus **macht**. Die interne Revision ist der einzige Akteur der
[Zielgruppen-Matrix](../../docs/who-uses-this.md), dessen eigenes Arbeitsergebnis sonst fehlen
würde — und ihr Blick ist der einzige, der das System nach dem Go-live betrachtet.

**Der Grundsatz, der dieses Programm von der Kontrollbewertung der 2nd Line unterscheidet:** Die
2nd Line hat vor der Freigabe geprüft, ob die Kontrollen eingerichtet sind. Die Revision prüft
nach der Freigabe, ob sie **wirken** — und ob das gilt, was zugesagt wurde. Deshalb ist die
Freigabevorlage vom 08.06.2026 hier nicht Hintergrundmaterial, sondern **Prüfungsmaßstab**.

## Anlass und Einordnung

| Feld | Inhalt |
|---|---|
| Anlass | Planmäßige Prüfung nach Ersteinführung; im Prüfungsplan 2026 als Position 14 vorgesehen |
| Prüfungsgegenstand | NORA im Produktivbetrieb seit 01.07.2026 |
| Prüfungsziel | Wirksamkeit der zugesagten Kontrollen; Erfüllungsstand der Auflagen A1 bis A4; Belastbarkeit der Freigabevorlage als Grundlage der Vorstandsentscheidung |
| Nicht Gegenstand | Fachliche Angemessenheit der Wissensbasis; Wirtschaftlichkeit des Vorhabens |
| Unabhängigkeit | I. Bruns war vor der Freigabe **beratend** beteiligt (Sitzung 05.06.2026) und hat keine Freigabefunktion ausgeübt. Die beratende Beteiligung ist im Bericht offenzulegen. |

**Zur Selbstprüfungsfreiheit.** *Die beratende Beteiligung vor der Freigabe ist in kleineren
Häusern der Normalfall und in der Sache nützlich — sie wird zum Problem, wenn sie verschwiegen
wird. Sie ist deshalb im Prüfprogramm vermerkt und wird im Bericht offengelegt. Beraten wurde zum
Verfahren, nicht zur Ausgestaltung einzelner Kontrollen; damit prüft die Revision keine eigene
Arbeit.*

## Prüfungsansatz

Der [Kontrollkatalog](../../controls/controls.md) ist das Raster. Er wird **nicht vollständig**
abgearbeitet: Eine risikoorientierte Auswahl von 9 der 23 Kontrollen wird vertieft geprüft, die
übrigen werden auf Belegvorhandensein durchgesehen.

**Auswahlkriterien für die Vertiefung:**

1. Kontrolle war zum Freigabezeitpunkt rot oder gelb (`LOE-02`, `BET-02`, `BET-03`, `KLA-03`,
   `EVA-04`, `AUD-03`).
2. Kontrolle schützt vor dem Schadensszenario mit der höchsten Bewertung (`ZUG-01`).
3. Kontrolle ist erfahrungsgemäß über die Zeit erosionsanfällig (`BET-01`, `AUD-02`).

## Prüfungshandlungen

Die Formulierungen stammen aus dem Kontrollkatalog und sind um den Bezug auf die konkreten
Zusagen der Freigabevorlage ergänzt.

| Nr. | Kontrolle | Prüfungshandlung | Stichprobe | Erwartete Evidenz |
|---|---|---|---|---|
| P1 | `ZUG-01` | Berechtigungswirkung eigenständig nachstellen, mit von der Revision gewählten Nutzenden und Dokumenten — nicht mit denen aus dem Testprotokoll | 5 Identitäten × 3 Dokumente aus 3 Sichtbarkeitsgruppen | Eigene Testdurchführung; Abgleich mit `NORA-TP-T1-20260306` |
| P2 | `LOE-02` | **Erfüllungsstand Auflage A1.** Kompaktierungslauf und Index-Inspektion vor/nach vorlegen lassen; Wiederholung von T3 prüfen | Alle Läufe seit Einrichtung; 1 realer Löschfall | Kompaktierungsprotokolle; Löschprotokoll im Format `NORA-LP-*` |
| P3 | `BET-02` | **Erfüllungsstand Auflage A3.** Vertragsstand zur Ankündigungsfrist erfragen; wöchentliche Regressionsläufe auf Lückenlosigkeit prüfen | Alle Läufe 01.07.–30.09.2026 | Vertragsdokument oder Verhandlungsstand; Regressionsprotokolle |
| P4 | `BET-03` | Kill-Switch-Erprobung nach Go-live prüfen; Erreichbarkeit außerhalb der Geschäftszeiten stichprobenartig verifizieren | Letzter Test; 1 unangekündigter Erreichbarkeitstest | `NORA-TP-T8-20260616`; Rufbereitschaftsplan |
| P5 | `BET-01` | Änderungshistorie vollständig durchsehen und mit den tatsächlich eingesetzten Modell-, Embedding- und Promptversionen abgleichen | Alle Änderungen 01.07.–30.09.2026 | Änderungshistorie; Versionsstände aus dem System |
| P6 | `AUD-02` | Zugriffe auf Prompt-Protokolle vollständig nachverfolgen; Vier-Augen-Verfahren und Beteiligung des Betriebsrats prüfen | Alle Zugriffe seit 01.07.2026 | Zugriffsprotokoll; Nachweise der BR-Information |
| P7 | `AUD-03` | Gemeldete Falschauskünfte bis zur Korrektur verfolgen; Bearbeitungsfrist aus Auflage prüfen | 10 von allen Meldungen | Meldungsauswertung; Korrekturnachweise |
| P8 | `KLA-03` | Wiederholung von T10 nach dem Aktualisierungslauf prüfen; eigene Stichprobe auf abgelöste Fassungen | 5 im Zeitraum abgelöste Richtlinien | Testprotokoll T10-Wiederholung |
| P9 | `EVA-04` | **Erfüllungsstand Auflage A4.** Erweiterten Test auf indirekte Prompt-Einschleusung prüfen | Testbericht | Testprotokoll mit repräsentativer Stichprobe |
| P10 | übrige 14 Kontrollen | Durchsicht auf Vorhandensein und Aktualität der benannten Evidenz | je 1 Beleg | jeweiliges Evidenz-Artefakt |

**Zusätzliche Prüfungshandlung ohne Kontrollbezug:**

| Nr. | Gegenstand | Prüfungshandlung |
|---|---|---|
| P11 | Belastbarkeit der Freigabevorlage | Die in der Vorlage vom 08.06.2026 genannten Kennzahlen (91,1 % Antwortqualität, −38 % Regelungsanfragen) gegen die zugrunde liegenden Messungen prüfen. Ist die Aussage belegt, die dem Vorstand vorgelegt wurde? |

*P11 ist die Prüfungshandlung, die am wenigsten erwartet wird und am meisten aussagt. Eine
Vorstandsvorlage ist eine Zusicherung an das Gremium; ob ihre Zahlen tragen, ist ein
eigenständiger Prüfungsgegenstand.*

## Zeitplan und Ressourcen

| Abschnitt | Zeitraum | Aufwand |
|---|---|---|
| Vorbereitung, Unterlagenanforderung | 21.–23.09.2026 | 2 PT |
| Feldarbeit, eigene Tests | 24.09.–02.10.2026 | 6 PT |
| Auswertung, Feststellungsentwürfe | 05.–07.10.2026 | 3 PT |
| Anhörung der geprüften Bereiche | 08.–09.10.2026 | 1 PT |
| Berichtserstellung | bis 16.10.2026 | 2 PT |

**Prüfer:** I. Bruns (Leitung), zwei Prüfer der Abteilung. Keine externe Unterstützung.

## Anzufordernde Unterlagen

1. Freigabeakte in der Fassung vom 08.06.2026 samt allen Anlagen
2. Readiness-Report der 2nd Line vom 19.05.2026
3. Sämtliche Testprotokolle T1 bis T12 im Original
4. Löschprotokolle seit Produktivstart
5. Änderungshistorie 01.07.–30.09.2026, einschließlich Modell- und Promptversionen
6. Zugriffsprotokoll auf die Prompt-Protokolle
7. Auswertung der gemeldeten Falschauskünfte
8. Nachweise zum Erfüllungsstand der Auflagen A1 bis A4
9. Betriebsvereinbarung NORA-BV-2026-01 und Nachweise der BR-Beteiligung

## Offene Punkte

- Für die eigene Testdurchführung in P1 benötigt die Revision Testidentitäten mit realen
  Berechtigungen. Die Einrichtung ist mit der Informationssicherheit abzustimmen, ohne dass die
  geprüfte Stelle den Testumfang erfährt.
- Der Prüfungszeitraum endet vor Ablauf der Frist für Auflage A3 (30.11.2026). P3 kann daher nur
  den Zwischenstand feststellen.

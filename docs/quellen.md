# Quellen und Verifikationsstand

> **Warum es diese Seite gibt.** Eine falsche Fundstelle zerstört den Wert eines
> Genehmigungs-Artefakts vollständig — eine ehrlich benannte Lücke nie. Diese Seite listet jede
> Fundstelle, die in diesem Repository zitiert wird, mit ihrem Prüfstand und dem Abrufdatum.
> Was hier nicht steht, wird in den Dokumenten generisch formuliert und in deren „Offenen
> Punkten" geführt.

**Prüfstand.** Alle Angaben wurden im **Juli 2026** gegen die genannte Quelle geprüft.
Regulierung verändert sich; prüfen Sie jede Fundstelle vor Verwendung in einer echten Vorlage
erneut. **Kein Rechtsrat** — siehe [`../DISCLAIMER.md`](../DISCLAIMER.md).

| Legende | Bedeutung |
|---|---|
| ✅ **geprüft** | Gegen die genannte Quelle abgerufen und bestätigt |
| ⚠️ **eingeschränkt** | Nur gegen Sekundärquellen bestätigt; Originaldokument nicht auswertbar |
| ❔ **offen** | Nicht bestätigt — wird in den Dokumenten nicht als Fundstelle zitiert |

---

## 1. DORA — Verordnung (EU) 2022/2554

Anwendbar seit **17.01.2025**. Artikelbezeichnungen ✅ geprüft (07/2026).

| Fundstelle | Titel | Verwendet in |
|---|---|---|
| Art. 3 Nr. 22 | Definition „kritische oder wichtige Funktion" | [`akte/03`](../akte/03-auslagerung-drittparteien.md), `BET-04` |
| Art. 5 | Governance and organisation | Mapping |
| Art. 6 | ICT risk management framework | Mapping |
| Art. 8 | Identification | `KLA-01`, `KLA-02` |
| Art. 9 | Protection and prevention | `ZUG-01`, `ZUG-02`, `ZUG-03`, `EVA-04`, `BET-01` |
| Art. 10 | Detection | `AUD-01` |
| Art. 11 | Response and recovery | `BET-03` |
| Art. 12 | Backup policies and procedures, restoration and recovery procedures and methods | `LOE-03` |
| Art. 13 | Learning and evolving | `AUD-03` |
| Art. 17 | ICT-related incident management process | `AUD-01` |
| Art. 24 | General requirements for the performance of digital operational resilience testing | `BET-03` |
| Art. 25 | Testing of ICT tools and systems | `EVA-01`, `EVA-04`, `BET-01` |
| Art. 28 | General principles (IKT-Drittparteirisiko) | `BET-02`, `BET-04` |
| Art. 28 Abs. 3 | Informationsregister über vertragliche Vereinbarungen | [`akte/03`](../akte/03-auslagerung-drittparteien.md), `BET-04` |
| Art. 29 | Preliminary assessment of ICT concentration risk at entity level | [`akte/03`](../akte/03-auslagerung-drittparteien.md), `BET-04` |
| Art. 30 | Key contractual provisions | [`akte/03`](../akte/03-auslagerung-drittparteien.md), `BET-02` |
| Art. 30 Abs. 3 Buchst. f | Ausstiegsstrategien inkl. verbindlicher angemessener Übergangsfrist | [`akte/03`](../akte/03-auslagerung-drittparteien.md), `BET-04` |

**Hinweis zur Struktur.** Ausstiegsstrategien sind in DORA **kein eigener Artikel**, sondern
Teil der wesentlichen Vertragsbestimmungen (Art. 30 Abs. 3 Buchst. f). Das ist eine der
häufigsten Falschzitierungen im Umlauf.

Quelle: Verordnungstext, ABl. L 333 vom 27.12.2022, sowie die Artikelübersicht unter
<https://www.digital-operational-resilience-act.com/DORA_Articles.html> (abgerufen 07/2026).

## 2. BAIT / VAIT / KAIT / ZAIT — Aufhebungsstand

✅ geprüft gegen die BaFin-Meldung vom **09.01.2025**
(<https://www.bafin.de/SharedDocs/Veroeffentlichungen/DE/Meldung/2025/meldung_2025_01_09_DORA.html>)
sowie die BaFin-FAQ zu DORA (abgerufen 07/2026).

| Rundschreiben | Stand |
|---|---|
| **VAIT** (Versicherungen) | Aufgehoben **mit Ablauf des 16.01.2025** |
| **KAIT** (Kapitalverwaltungsgesellschaften) | Aufgehoben **mit Ablauf des 16.01.2025** |
| **ZAIT** (Zahlungsdienste) | Aufgehoben **mit Ablauf des 16.01.2025** |
| **BAIT** (Banken) | Seit **17.01.2025** nicht mehr anwendbar auf Institute, die dem IKT-Risikomanagement nach DORA unterliegen; Kapitel 11 zum selben Zeitpunkt aufgehoben. Vollständige Aufhebung **mit Ablauf des 31.12.2026** |

**Wer bis dahin noch adressiert ist.** Übergangsadressaten (u. a. Bürgschaftsbanken,
Drittstaatenzweigstellen, Finanzdienstleistungsinstitute, Zweigstellen nach § 53 KWG) sowie
Einheiten außerhalb des DORA-Anwendungsbereichs. CRR-Kreditinstitute unterliegen seit 17.01.2025
DORA und nicht mehr den BAIT.

**BAIT-Kapitelbezeichnungen** ⚠️ **eingeschränkt.** Das BaFin-Originaldokument (Rundschreiben
10/2017 (BA) in der Fassung vom 16.08.2021, zuletzt geändert am 16.12.2024) lag beim Erstellen
nur in einer maschinell nicht auswertbaren Form vor. Die im
[Kontrollkatalog](../controls/controls.md) verwendeten Kapitelbezeichnungen stammen aus
übereinstimmenden Sekundärquellen und sind dort als Orientierung gekennzeichnet. **Vor
Verwendung in einer echten Vorlage gegen das Originaldokument abgleichen.**

## 3. MaRisk

| Angabe | Stand |
|---|---|
| Geltende Fassung beim Erstellen | **Rundschreiben 06/2024 (BA)**, veröffentlicht am 29.05.2024 (8. MaRisk-Novelle) — ✅ geprüft |
| AT 4.3 Internes Kontrollsystem | ✅ geprüft |
| AT 4.3.5 Modelle — verlangt ausreichende Nachvollziehbarkeit, ausdrücklich auch bei Modellen mit Merkmalen technologischer Innovation und künstlicher Intelligenz | ✅ geprüft |
| AT 7.2 Technisch-organisatorische Ausstattung | ✅ geprüft |
| AT 7.3 Notfallmanagement | ✅ geprüft |
| AT 8.2 Änderungen betrieblicher Prozesse oder Strukturen | ✅ geprüft |
| AT 9 Auslagerung — nach Anwendungsbeginn von DORA nur noch für Auslagerungen ohne IT-Bezug | ✅ geprüft |
| BT 2 Interne Revision | ✅ geprüft |
| **9. MaRisk-Novelle** | ❔ **offen.** Konsultation 02/2026 (01.04.2026–08.05.2026), Veröffentlichung im Juni 2026. Rundschreiben-Nummer und Inkrafttreten konnten nicht bestätigt werden — daher in diesem Repository **nicht zitiert**. Bei Anwendung prüfen. |

**AT 4.3.5 ist die bemerkenswerteste Fundstelle dieses Repositories.** Sie ist der Anknüpfungspunkt
dafür, dass Nachvollziehbarkeit von KI-gestützten Verfahren keine freiwillige Übung ist, sondern
im bestehenden Rahmenwerk bereits adressiert wird — lange bevor der EU AI Act greift.

## 4. DSGVO

Artikelnummern und -titel ✅ geprüft gegen <https://gdpr-info.eu> (abgerufen 07/2026).

| Artikel | Titel | Verwendet in |
|---|---|---|
| Art. 5 | Grundsätze für die Verarbeitung personenbezogener Daten | durchgehend |
| Art. 6 | Rechtmäßigkeit der Verarbeitung | [`akte/02`](../akte/02-dsfa-baustein-rag.md) |
| Art. 9 | Verarbeitung besonderer Kategorien personenbezogener Daten | [`akte/01`](../akte/01-schutzbedarfsfeststellung.md), [`akte/02`](../akte/02-dsfa-baustein-rag.md) |
| Art. 15 | Auskunftsrecht der betroffenen Person | [`akte/02`](../akte/02-dsfa-baustein-rag.md) |
| Art. 16 | Recht auf Berichtigung | [`akte/02`](../akte/02-dsfa-baustein-rag.md), `AUD-03` |
| Art. 17 | Recht auf Löschung („Recht auf Vergessenwerden") | [`docs/loeschnachweis.md`](loeschnachweis.md), `LOE-01`–`LOE-04` |
| Art. 18 | Recht auf Einschränkung der Verarbeitung | [`akte/02`](../akte/02-dsfa-baustein-rag.md) |
| Art. 21 | Widerspruchsrecht | [`akte/02`](../akte/02-dsfa-baustein-rag.md) |
| Art. 22 | Automatisierte Entscheidungen im Einzelfall einschließlich Profiling | [`akte/02`](../akte/02-dsfa-baustein-rag.md) |
| Art. 25 | Datenschutz durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen | [`akte/02`](../akte/02-dsfa-baustein-rag.md) |
| Art. 28 | Auftragsverarbeiter | [`akte/03`](../akte/03-auslagerung-drittparteien.md), `BET-04` |
| Art. 30 | Verzeichnis von Verarbeitungstätigkeiten | [`akte/02`](../akte/02-dsfa-baustein-rag.md), `KLA-01` |
| Art. 32 | Sicherheit der Verarbeitung | `ZUG-01`, `ZUG-02`, `AUD-01`, `AUD-02` |
| Art. 35 | Datenschutz-Folgenabschätzung | [`akte/02`](../akte/02-dsfa-baustein-rag.md), `ZUG-04` |
| Art. 44–49 | Übermittlungen an Drittländer | [`akte/03`](../akte/03-auslagerung-drittparteien.md), `BET-04` |
| Art. 88 | Datenverarbeitung im Beschäftigungskontext | [`akte/08`](../akte/08-mitbestimmung-betriebsvereinbarung.md), `AUD-04` |

## 5. Orientierungshilfen zu KI und Datenschutz

✅ geprüft (07/2026). Diese Dokumente sind keine Rechtsnormen, aber der Stand der Diskussion —
eine DSFA, die sie nicht kennt, wirkt in der Prüfung entsprechend.

| Dokument | Datum | Fundstelle |
|---|---|---|
| EDPB, **Opinion 28/2024** on certain data protection aspects related to the processing of personal data in the context of AI models | 18.12.2024 | [edpb.europa.eu](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en) |
| EDPB, **AI Privacy Risks & Mitigations – Large Language Models (LLMs)** | 10.04.2025 | [edpb.europa.eu](https://www.edpb.europa.eu/our-work-tools/our-documents/support-pool-experts-projects/ai-privacy-risks-mitigations-large_en) |
| DSK, Orientierungshilfe **„Künstliche Intelligenz und Datenschutz"** | 06.05.2024 | [datenschutzkonferenz-online.de](https://www.datenschutzkonferenz-online.de/media/oh/20240506_DSK_Orientierungshilfe_KI_und_Datenschutz.pdf) |

## 5a. Betriebsverfassungsgesetz (BetrVG)

✅ geprüft (07/2026) gegen den Gesetzestext unter <https://www.gesetze-im-internet.de/betrvg/>.
Verwendet in [`akte/08`](../akte/08-mitbestimmung-betriebsvereinbarung.md) und `AUD-04`.

| Fundstelle | Amtliche Überschrift | Kerninhalt für dieses Repository |
|---|---|---|
| **§ 87 Abs. 1 Nr. 6** | Mitbestimmungsrechte | Mitbestimmung bei „Einführung und Anwendung von technischen Einrichtungen, die dazu bestimmt sind, das Verhalten oder die Leistung der Arbeitnehmer zu überwachen" (Wortlaut geprüft) |
| **§ 90 Abs. 1 Nr. 3** | Unterrichtungs- und Beratungsrechte | Unterrichtung über die Planung „von Arbeitsverfahren und Arbeitsabläufen **einschließlich des Einsatzes von Künstlicher Intelligenz**" |
| **§ 80 Abs. 3 Satz 2** | Allgemeine Aufgaben | Muss der Betriebsrat „die Einführung oder Anwendung von Künstlicher Intelligenz beurteilen, gilt insoweit die Hinzuziehung eines Sachverständigen als erforderlich" |
| **§ 95 Abs. 2a** | Auswahlrichtlinien | Mitbestimmung gilt auch, „wenn bei der Aufstellung der Richtlinien … Künstliche Intelligenz zum Einsatz kommt" |
| **§ 77 Abs. 2, Abs. 3** | Durchführung gemeinsamer Beschlüsse, Betriebsvereinbarungen | Schriftform und Unterzeichnung durch beide Seiten (bei elektronischem Abschluss dasselbe Dokument); Tarifvorbehalt |

**Bemerkenswert:** Der Gesetzgeber adressiert künstliche Intelligenz im BetrVG an drei Stellen
ausdrücklich (§§ 80, 90, 95). Wer in einer Diskussion hört, für KI gebe es
mitbestimmungsrechtlich noch keine Grundlage, hat hier die Antwort.

**Zur Auslegung** ⚠️ **eingeschränkt.** Dass für § 87 Abs. 1 Nr. 6 BetrVG die **objektive
Eignung** zur Überwachung genügt und es auf eine Überwachungsabsicht nicht ankommt, entspricht
der gefestigten Rechtsprechung des Bundesarbeitsgerichts; belegt ist das hier über
übereinstimmende Sekundärquellen, nicht über eine einzelne, im Volltext geprüfte Entscheidung.
Vor Verwendung in einer echten Vorlage durch die Rechtsabteilung bestätigen lassen.

**Nicht aufgearbeitet:** das **Personalvertretungsrecht** des Bundes und der Länder, das für
Sparkassen, Landesbanken und Anstalten öffentlichen Rechts an die Stelle des BetrVG tritt. Die
Systematik ist ähnlich, die Fundstellen weichen je Land ab; sie werden in diesem Repository
bewusst nicht genannt.

## 6. BSI

| Dokument | Stand | Verwendet für |
|---|---|---|
| **BSI-Standard 200-2 — IT-Grundschutz-Methodik**, Kapitel 8.2.1 (Schutzbedarfsfeststellung); Kategorien *normal / hoch / sehr hoch*; Grundwerte *Vertraulichkeit, Integrität, Verfügbarkeit* | ✅ geprüft | [`akte/01`](../akte/01-schutzbedarfsfeststellung.md), `KLA-02` |
| **Generative KI-Modelle: Chancen und Risiken für Industrie und Behörden** | ✅ geprüft, Fassung vom 21.01.2025 | Weiterführend |
| **AI Cloud Service Compliance Criteria Catalogue (AIC4)** | ✅ geprüft, 02.02.2021 | Weiterführend |
| Eigener IT-Grundschutz-Baustein für KI-/RAG-Systeme | ❔ **offen** — kein solcher Baustein bestätigt | — |

## 7. EU AI Act — Verordnung (EU) 2024/1689

✅ geprüft (07/2026) gegen Art. 113 und die offizielle Umsetzungszeitlinie.

| Datum | Was gilt |
|---|---|
| 02.02.2025 | Kapitel I und II (allgemeine Bestimmungen, verbotene Praktiken, KI-Kompetenz) |
| 02.08.2025 | u. a. Kapitel V (KI-Modelle mit allgemeinem Verwendungszweck), Kapitel VII, Kapitel XII |
| **02.08.2026** | **Allgemeiner Anwendungsbeginn** (mit Ausnahme von Art. 6 Abs. 1) |
| 02.08.2027 | Art. 6 Abs. 1 und die zugehörigen Pflichten |
| 02.08.2030 | Vollständige Konformität für Hochrisiko-Systeme im behördlichen Einsatz |

**Einstufung eines internen Richtlinien-Assistenten:** ❔ **offen.** Die Hochrisiko-Einstufung
folgt dem zweiteiligen Test des Art. 6 in Verbindung mit Anhang III und ist eine
Einzelfallprüfung. Eine regulatorische Auslegung speziell für interne
Richtlinien-Retrieval-Systeme war nicht auffindbar. Dieses Repository enthält daher **keine
AI-Act-Mappings** im Kontrollkatalog — bewusst, statt einer plausiblen Vermutung.

## 8. Forschung

| Arbeit | Stand |
|---|---|
| **Ghost Vectors: Soft-Deleted Embeddings Remain Reconstructible in HNSW Vector Databases.** Chakraborttii, García Alvarado, Abdulofizova, Dwivedi. arXiv:2606.18497, 16.06.2026. <https://arxiv.org/abs/2606.18497> | ✅ geprüft (Existenz, Titel, Autoren, Datum, Kernaussage). ⚠️ Begutachtungsstand und Folgearbeiten nicht bekannt — siehe [`loeschnachweis.md`](loeschnachweis.md), Offene Punkte |

## Offene Punkte dieser Seite

- BAIT-Kapitelbezeichnungen sind nicht gegen das Originaldokument geprüft (siehe Abschnitt 2).
- Die 9. MaRisk-Novelle (Juni 2026) ist nicht eingearbeitet, weil Rundschreiben-Nummer und
  Inkrafttreten nicht bestätigt werden konnten.
- Die DORA-Artikeltitel wurden gegen eine strukturierte Wiedergabe des Verordnungstextes
  geprüft, nicht Zeile für Zeile gegen die EUR-Lex-Fassung. Für eine förmliche Vorlage empfiehlt
  sich der Abgleich mit ABl. L 333 vom 27.12.2022.
- Branchenspezifische Rahmenwerke außerhalb des Bankensektors (Versicherungsaufsicht nach
  Wegfall der VAIT, KVG-Aufsicht nach Wegfall der KAIT) sind nicht aufgearbeitet.
- Nationale Ergänzungen (u. a. FinmadiG-bedingte Übergangsregelungen) sind nur insoweit
  aufgenommen, wie sie den Aufhebungsstand der Rundschreiben betreffen.

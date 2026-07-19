# 02 — DSFA-Baustein RAG

> **Wer benutzt dieses Dokument?** Der Datenschutzbeauftragte (DSB) gemeinsam mit der
> Fachverantwortung und der Informationssicherheit.
> **In welchem Prozess?** Das DSFA-/DPIA-Verfahren nach **Art. 35 DSGVO**
> (Datenschutz-Folgenabschätzung).
> **Wer prüft es?** Die interne Revision und ggf. die Aufsichtsbehörde. Der Baustein liefert
> außerdem die datenschutzrechtliche Grundlage für den [Löschnachweis](../docs/loeschnachweis.md).

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Datenschutzberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Ob für Ihre Verarbeitung überhaupt eine DSFA-Pflicht besteht,
> ist eine Einzelfallbewertung Ihres DSB. Siehe [`DISCLAIMER.md`](../DISCLAIMER.md).

**Ausfüllhinweis — was dieser Baustein ist und was nicht.** Dies ist **keine vollständige DSFA**
und kein Ersatz für Ihre Methodik. Es ist der **RAG-spezifische Baustein**, den es an der Stelle
Ihrer bestehenden DSFA einzusetzen gilt, an der die üblichen Vorlagen nichts hergeben: bei der
Vektorisierung, beim Retrieval und beim Umgang mit Betroffenenrechten in einem Index, der anders
funktioniert als eine Datenbank. Setzen Sie Ihre Schwellwertanalyse, Ihre Rechtsgrundlagenprüfung
und Ihre Risikomethodik davor und dahinter.

*Alle Artikelangaben wurden im Juli 2026 gegen den Verordnungstext geprüft; siehe
[Quellen](../docs/quellen.md).*

---

## 1. Verarbeitungsübersicht

| Feld | Inhalt |
|---|---|
| Bezeichnung der Verarbeitung | `<…>` |
| Verantwortlicher | `<…>` |
| Zweck | `<…>` |
| Betroffene Personengruppen | `<z. B. Beschäftigte; ggf. in Dokumenten genannte Dritte>` |
| Kategorien personenbezogener Daten | `<…>` |
| Besondere Kategorien (Art. 9 DSGVO) | `<nein / ja — welche, und wie ausgeschlossen bzw. begründet>` |
| Rechtsgrundlage (Art. 6 DSGVO) | `<… — je Personengruppe getrennt bewerten>` |
| Auftragsverarbeiter (Art. 28 DSGVO) | `<Verweis auf 03>` |
| Drittlandbezug (Art. 44–49 DSGVO) | `<Verweis auf 03>` |
| Eintrag im Verzeichnis (Art. 30 DSGVO) | `<Referenz>` |
| DSFA-Pflicht bejaht? | `<ja/nein — Begründung, Datum, durch wen>` |

**Die übersehene Personengruppe.** *In einem Richtlinien- oder Wissenskorpus stehen fast immer
Personen, die nicht Nutzende des Systems sind: Ansprechpartner in Prozessbeschreibungen,
namentlich benannte Funktionsträger, Beteiligte in Fallbeispielen, gelegentlich Kunden in
Musterfällen. Diese Personen wissen nichts von der Verarbeitung und können ihre Rechte nicht
ausüben, ohne dass Sie ihnen einen Weg dafür schaffen. Führen Sie sie ausdrücklich als eigene
Personengruppe.*

## 2. Die RAG-spezifischen Verarbeitungsschritte

| Schritt | Was datenschutzrechtlich passiert | Zu klären |
|---|---|---|
| Aufnahme in die Wissensbasis | Zweckänderung gegenüber dem Quellsystem? | `<Vereinbarkeit prüfen — die Quelle wurde für einen anderen Zweck erhoben>` |
| Chunking | Kontextverlust; Fragmente ohne Herkunftsklarheit | `<…>` |
| **Embedding-Erzeugung** | Erzeugung einer neuen Repräsentation — ggf. bei einem Dritten | `<Abschnitt 3>` |
| Indexierung | Dauerhafte Speicherung der Repräsentation | `<Speicherort, Löschbarkeit>` |
| Retrieval | Zusammenführung über Dokumentgrenzen hinweg | `<Aggregation, vgl. [01](01-schutzbedarfsfeststellung.md)>` |
| Übergabe an das LLM | Übermittlung von Inhalt + Frage an einen Dritten | `<Verweis auf 03; Training ausgeschlossen?>` |
| Antworterzeugung | Neue Aussage über Personen möglich | `<Richtigkeitsgrundsatz, Art. 5 Abs. 1 lit. d DSGVO>` |
| Protokollierung | Verhaltensdaten der Nutzenden | `<Abschnitt 5>` |

## 3. Sind Embeddings personenbezogene Daten?

Der Abschnitt, den generische DSFA-Vorlagen nicht haben — und die Frage, die Ihnen jede Prüfung
stellen wird. Beantworten Sie sie **begründet**, nicht ausweichend.

**Die Ausgangslage.** Ein Embedding ist eine numerische Repräsentation eines Textfragments. Es
ist kein Klartext — aber die Annahme, es sei damit anonym, ist nicht haltbar: Forschung zeigt,
dass sich aus Embeddings Inhalte in erheblichem Umfang rekonstruieren lassen (siehe
[`../docs/loeschnachweis.md`](../docs/loeschnachweis.md) mit Quellenangabe). Solange das
Ausgangsfragment personenbezogen ist und ein Rückschluss mit vertretbarem Aufwand möglich
bleibt, ist die vorsichtige und in der Praxis tragfähige Einordnung: **das Embedding teilt den
Personenbezug seines Ausgangsfragments.**

**Zu dokumentieren:**

| Frage | Bewertung |
|---|---|
| Enthalten die indexierten Fragmente Personenbezug? | `<…>` |
| Welche Rekonstruktionsmöglichkeiten wurden betrachtet? | `<…>` |
| Wer hat Zugriff auf die Rohvektoren (auch administrativ)? | `<…>` |
| Einordnung des Verantwortlichen | `<personenbezogen / nicht personenbezogen — mit Begründung>` |
| Konsequenz für Löschung, Auskunft und Berichtigung | `<…>` |

**Einschlägige Orientierungshilfen** (verifiziert 07/2026):

- **EDPB, Opinion 28/2024** vom 18.12.2024 zu datenschutzrechtlichen Aspekten der Verarbeitung
  personenbezogener Daten im Kontext von KI-Modellen — behandelt insbesondere, unter welchen
  Bedingungen ein Modell als anonym gelten kann.
- **EDPB, „AI Privacy Risks & Mitigations – Large Language Models (LLMs)"** vom 10.04.2025 —
  Risikomethodik und Maßnahmen für LLM-basierte Systeme, einschließlich Memorisierung und Leakage.
- **DSK, Orientierungshilfe „Künstliche Intelligenz und Datenschutz"** vom 06.05.2024 — Auswahl,
  Implementierung und Nutzung von KI-Anwendungen durch Verantwortliche.

*Diese Dokumente ersetzen Ihre eigene Bewertung nicht, aber eine DSFA, die sie nicht erwähnt,
wirkt in der Prüfung, als sei der Stand der Diskussion nicht bekannt. Prüfen Sie vor Verwendung,
ob zwischenzeitlich neuere Fassungen vorliegen.*

## 4. Betroffenenrechte — praktische Umsetzung

Die Rechte gelten unverändert; nur ihre Umsetzung ist in einem Vektorindex ungewohnt.

| Recht | Artikel | Umsetzung im RAG-System | Nachweis |
|---|---|---|---|
| Auskunft | Art. 15 DSGVO | *Wie ermitteln Sie, ob und in welchen Fragmenten eine Person vorkommt? Eine semantische Suche ist keine vollständige Auskunft.* `<…>` | `<…>` |
| Berichtigung | Art. 16 DSGVO | *Korrektur an der Quelle plus Neuindexierung — beschreiben Sie beides.* `<…>` | `<…>` |
| **Löschung** | Art. 17 DSGVO | Vollständig beschrieben in [`../docs/loeschnachweis.md`](../docs/loeschnachweis.md) | Löschprotokoll |
| Einschränkung | Art. 18 DSGVO | *Wie schränken Sie die Verarbeitung eines Fragments ein, ohne es zu löschen?* `<…>` | `<…>` |
| Widerspruch | Art. 21 DSGVO | `<…>` | `<…>` |
| Keine automatisierte Einzelentscheidung | Art. 22 DSGVO | *Regelmäßig nicht einschlägig, weil das System Auskunft gibt und nicht entscheidet — halten Sie das ausdrücklich fest, statt die Frage zu übergehen.* `<…>` | `<…>` |

**Auskunft ist der unterschätzte Aufwand.** *Ein Auskunftsersuchen verlangt Vollständigkeit. In
einem Vektorindex ohne Personen-Metadaten lässt sich Vollständigkeit über eine
Ähnlichkeitssuche nicht zusichern. Praktikabel ist der Weg über die Quellsysteme: Ermitteln Sie
dort die betroffenen Dokumente und leiten Sie daraus die Fragmente ab. Beschreiben Sie diesen
Weg hier — sonst entsteht die Zusage einer Vollständigkeit, die technisch nicht eingelöst
werden kann.*

## 5. Protokollierung als eigene Verarbeitung

| Frage | Antwort |
|---|---|
| Was wird protokolliert? | `<Verweis auf 04, Abschnitt 8>` |
| Zweck der Protokollierung | `<…>` |
| Rechtsgrundlage | `<…>` |
| Aufbewahrungsfrist und Löschung | `<…>` |
| Wer darf Protokolle einsehen? | `<Rollen, Verfahren>` |
| Ausschluss der Verhaltens- und Leistungskontrolle | `<Wie technisch/organisatorisch sichergestellt?>` |
| Mitbestimmung eingebunden? | `<Status, Datum>` |

*Ein Protokoll, das Frage, Zeitpunkt und Nutzeridentität verbindet, ist geeignet, Verhalten
abzubilden. Ohne Zweckbindung, Zugriffsverfahren und Beteiligung der Mitbestimmung wird dieser
Punkt die Freigabe verzögern — regelmäßig länger als jede technische Auflage.*

## 6. Risikobewertung

Bewerten Sie nach Ihrer Methodik. Die folgenden Risiken sind RAG-spezifisch und sollten
ausdrücklich vorkommen — auch dann, wenn Sie sie als gering einstufen.

| # | Risiko für die Rechte und Freiheiten | Eintritt | Schwere | Maßnahme | Restrisiko |
|---|---|---|---|---|---|
| R1 | Offenlegung an nicht berechtigte Beschäftigte durch fehlende Query-Zeit-Prüfung | `<…>` | `<…>` | `<…>` | `<…>` |
| R2 | Rekonstruktion gelöschter Inhalte aus dem Vektorindex | `<…>` | `<…>` | `<…>` | `<…>` |
| R3 | Unvollständige Löschung über Caches, Sicherungen, Protokolle | `<…>` | `<…>` | `<…>` | `<…>` |
| R4 | Falsche Aussage über eine Person (Richtigkeitsgrundsatz) | `<…>` | `<…>` | `<…>` | `<…>` |
| R5 | Aggregation zu einem Persönlichkeitsprofil | `<…>` | `<…>` | `<…>` | `<…>` |
| R6 | Zweckänderung gegenüber dem Quellsystem | `<…>` | `<…>` | `<…>` | `<…>` |
| R7 | Übermittlung an den LLM-Anbieter über den vereinbarten Zweck hinaus (z. B. Training) | `<…>` | `<…>` | `<…>` | `<…>` |
| R8 | Drittlandübermittlung ohne tragfähige Grundlage | `<…>` | `<…>` | `<…>` | `<…>` |
| R9 | Verhaltenskontrolle durch Prompt-Protokolle | `<…>` | `<…>` | `<…>` | `<…>` |
| R10 | Preisgabe von Inhalten durch Prompt-Manipulation | `<…>` | `<…>` | `<…>` | `<…>` |

**R4 verdient einen eigenen Satz.** *Der Richtigkeitsgrundsatz (Art. 5 Abs. 1 lit. d DSGVO) gilt
auch für Aussagen, die das System erzeugt. Ein generatives System, das über eine Person eine
plausible, aber falsche Aussage trifft, verarbeitet unrichtige personenbezogene Daten. Die
wirksame Maßnahme ist nicht ein besseres Modell, sondern Quellenbindung, Nachvollziehbarkeit und
ein funktionierender Korrekturweg.*

## 7. Technische und organisatorische Maßnahmen (Art. 32 DSGVO)

| Maßnahme | Umsetzung | Kontrollbezug |
|---|---|---|
| Berechtigungsprüfung zur Query-Zeit | `<…>` | `ZUG-*` |
| Verschlüsselung in Transport und Speicher | `<…>` | `<…>` |
| Löschkonzept inkl. Index und Ableitungen | [`../docs/loeschnachweis.md`](../docs/loeschnachweis.md) | `LOE-*` |
| Protokollierung und Zugriffsbeschränkung darauf | `<…>` | `AUD-*` |
| Datenminimierung im Index (was wird nicht aufgenommen) | `<…>` | `KLA-*` |
| Auftragsverarbeitung vertraglich geregelt | [`03-auslagerung-drittparteien.md`](03-auslagerung-drittparteien.md) | `AUS-*` |
| Datenschutz durch Technikgestaltung (Art. 25 DSGVO) | `<…>` | `<…>` |

## 8. Ergebnis

| Feld | Inhalt |
|---|---|
| Verbleibendes Gesamtrisiko | `<…>` |
| Vorherige Konsultation der Aufsichtsbehörde nach Art. 36 DSGVO erforderlich? | `<ja/nein — Begründung>` |
| Stellungnahme des DSB | `<…>` |
| Beteiligung der Mitbestimmung | `<Status>` |
| Empfehlung | `<Freigabe / Freigabe unter Auflagen / keine Freigabe>` |
| Wiedervorlage | `<Datum oder Auslöser>` |

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Sind Embeddings für Sie personenbezogene Daten — und wie begründen Sie das?"** Es gibt keine
   falsche Antwort außer der ausweichenden. Eine dokumentierte Begründung trägt; ein „das ist ja
   nur ein Zahlenvektor" trägt nicht.
2. **„Zeigen Sie mir, wie Sie ein Auskunftsersuchen zu einer Person in diesem System
   beantworten."** Prüft, ob Abschnitt 4 durchdacht oder nur ausgefüllt ist. Bitten Sie um einen
   konkreten Testfall, bevor die Prüfung darum bittet.
3. **„Woraus ergibt sich, dass der Anbieter Ihre Prompts nicht zum Training verwendet?"** Verlangt
   die Vertragsstelle, nicht die Marketingaussage — Verweis auf [`03`](03-auslagerung-drittparteien.md).
4. **„Welche Personen stehen im Korpus, die das System nicht nutzen?"** Die Frage nach der
   übersehenen Personengruppe aus Abschnitt 1.
5. **„Wie ist ausgeschlossen, dass die Prompt-Protokolle zur Leistungskontrolle verwendet
   werden?"** Prüft Zweckbindung, Zugriffsverfahren und die Einbindung der Mitbestimmung.

## Offene Punkte

- `<Was noch offen ist — mit Verantwortlichem und Zieltermin.>`
- `<Beispiel: Einordnung der Embeddings als personenbezogen ist hausintern abgestimmt, eine
  Bestätigung durch die Rechtsabteilung steht aus (Termin TT.MM.JJJJ).>`
- `<Beispiel: Verfahren für Auskunftsersuchen über den Weg der Quellsysteme beschrieben, aber
  noch nicht an einem Testfall erprobt.>`

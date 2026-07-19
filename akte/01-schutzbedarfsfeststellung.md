# 01 — Schutzbedarfsfeststellung RAG-System

> **Wer benutzt dieses Dokument?** Informationssicherheit (ISB/CISO) gemeinsam mit den
> Datenverantwortlichen der einbezogenen Quellsysteme.
> **In welchem Prozess?** Schutzbedarfs- und Sicherheitsfreigabeprozess — der erste Schritt, aus
> dem sich alle weiteren Maßnahmen ableiten.
> **Wer prüft es?** 2nd Line, interne Revision und der Datenschutz. Aus diesem Dokument leiten
> sich die Anforderungen in [`04`](04-betriebskonzept.md) und [`05`](05-notfallkonzept.md) ab;
> wer hier zu niedrig einstuft, bekommt die Diskussion später im Gremium zurück.

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Siehe [`DISCLAIMER.md`](../DISCLAIMER.md).

**Ausfüllhinweis.** Diese Vorlage folgt der Methodik der Schutzbedarfsfeststellung nach
**BSI-Standard 200-2 (IT-Grundschutz-Methodik), Kapitel 8.2.1** — Bewertung entlang der
Grundwerte **Vertraulichkeit, Integrität, Verfügbarkeit** in den Kategorien **normal, hoch, sehr
hoch** (verifiziert 07/2026, siehe [Quellen](../docs/quellen.md)). Wenn Ihr Haus eine eigene
Methodik oder abweichende Kategorien führt, übernehmen Sie Ihre — die RAG-spezifischen Fragen in
Abschnitt 3 und 4 sind das Eigentliche an dieser Vorlage, nicht das Bewertungsraster.

**Die eine Besonderheit, die RAG von anderen Anwendungen unterscheidet:** Der Schutzbedarf
entsteht nicht nur aus den Daten, die das System speichert, sondern aus dem, was es aus ihnen
**ableiten und zusammenführen** kann. Eine Schutzbedarfsfeststellung, die nur die Datenklassen
der Quellsysteme abschreibt, greift zu kurz.

---

## 1. Gegenstand

| Feld | Inhalt |
|---|---|
| System | `<Name>` |
| Fachlicher Zweck | `<…>` |
| Fachverantwortung | `<Organisationseinheit, Rolle>` |
| Nutzerkreis | `<Wer darf das System nutzen — und wer ausdrücklich nicht?>` |
| Einbezogene Quellsysteme | `<Liste>` |
| Betriebsmodell | `<on-prem / Private Cloud / SaaS / hybrid>` |
| Externe Verarbeitung | `<Embedding-Erzeugung? LLM-Aufruf? Verweis auf 03>` |
| Datum der Feststellung | `<TT.MM.JJJJ>` |
| Nächste Überprüfung | `<TT.MM.JJJJ oder Auslöser>` |

## 2. Datenklassen im System

Erfassen Sie jede Datenklasse **einzeln** — der Schutzbedarf des Systems ergibt sich aus der
höchsten, nicht aus dem Durchschnitt (Maximumprinzip).

| # | Datenklasse | Beispielinhalte | Quelle | Personenbezug | Besondere Kategorien (Art. 9 DSGVO)? |
|---|---|---|---|---|---|
| D1 | `<z. B. Allgemeine Arbeitsanweisungen>` | `<…>` | `<…>` | `<nein/mittelbar/ja>` | `<nein/ja>` |
| D2 | `<z. B. Interne Richtlinien mit Schwellenwerten>` | `<…>` | `<…>` | `<…>` | `<…>` |
| D3 | `<z. B. Personalbezogene Regelungen>` | `<…>` | `<…>` | `<…>` | `<…>` |
| D4 | `<z. B. Protokolle des Systems selbst>` | Prompts, Treffer, Antworten, Nutzeridentität | System | **ja** | `<prüfen>` |

**Datenklasse D4 wird regelmäßig vergessen.** *Das Protokoll eines Assistenzsystems ist eine
eigenständige, personenbezogene Verarbeitung: Es dokumentiert, wonach einzelne Beschäftigte
gefragt haben. Es gehört als eigene Datenklasse in diese Tabelle — und häufig hat es einen
höheren Schutzbedarf in der Vertraulichkeit als die Inhalte, über die es protokolliert.*

## 3. RAG-spezifische Verarbeitungsstufen

Bewerten Sie den Schutzbedarf nicht nur je Datenklasse, sondern je Verarbeitungsstufe. Jede Stufe
erzeugt ein neues Artefakt mit eigenem Schutzbedarf.

| Stufe | Artefakt | Enthält | Schutzbedarf V / I / Vf | Begründung |
|---|---|---|---|---|
| S1 Quelle | Originaldokument | Klartext | `<…>` | Ausgangsbewertung |
| S2 Chunking | Dokumentfragmente | Klartext-Ausschnitte | `<…>` | *Fragmente verlieren den Kontext, aus dem sich ihre Vertraulichkeit ergibt — eine Zeile aus einer Personalrichtlinie ohne Überschrift wirkt harmlos und ist es nicht.* |
| S3 Embedding | Vektoren | Numerische Repräsentation | `<…>` | *Kein Klartext, aber auch keine Anonymisierung; Rückschlüsse auf den Inhalt sind möglich (siehe [Löschnachweis](../docs/loeschnachweis.md)).* |
| S4 Index | Vektorindex + Metadaten | Vektoren, Titel, Pfade, Berechtigungen | `<…>` | *Metadaten allein können Struktur und Existenz vertraulicher Vorgänge offenlegen.* |
| S5 Retrieval | Trefferliste zur Laufzeit | Fragmente mehrerer Dokumente | `<…>` | **Aggregationsstufe — siehe Abschnitt 4** |
| S6 Prompt | An das Modell übergebener Kontext | Fragmente + Nutzerfrage | `<…>` | *Verlässt bei einem Cloud-LLM den Verantwortungsbereich — Verweis auf [`03`](03-auslagerung-drittparteien.md).* |
| S7 Antwort | Generierter Text | Verdichtete Aussage | `<…>` | *Die Antwort kann schutzbedürftiger sein als jedes einzelne Fragment, aus dem sie entstand.* |
| S8 Protokoll | Log | Frage, Treffer, Antwort, Identität | `<…>` | Datenklasse D4 |

## 4. Aggregationsbewertung (der Kern dieser Vorlage)

Die Frage, an der eine RAG-Schutzbedarfsfeststellung hängt: **Entsteht durch Zusammenführung ein
höherer Schutzbedarf als bei den Einzelquellen?**

Prüfen Sie mit dem Fachbereich mindestens diese Hypothesen und dokumentieren Sie das Ergebnis —
auch das negative:

| # | Aggregationshypothese | Bewertet | Ergebnis | Maßnahme |
|---|---|---|---|---|
| A1 | Lassen sich aus zugänglichen Fragmenten Vergütungs- oder Personalstrukturen ableiten? | `<…>` | `<…>` | `<…>` |
| A2 | Lässt sich eine noch nicht kommunizierte Entscheidung rekonstruieren? | `<…>` | `<…>` | `<…>` |
| A3 | Lassen sich Kontroll- oder Schwellenwerte ermitteln, deren Kenntnis Umgehung ermöglicht? | `<…>` | `<…>` | `<…>` |
| A4 | Lässt sich aus Metadaten die Existenz eines vertraulichen Vorgangs erkennen? | `<…>` | `<…>` | `<…>` |
| A5 | Lassen sich Einzelpersonen identifizieren, obwohl kein Dokument sie namentlich nennt? | `<…>` | `<…>` | `<…>` |
| A6 | `<Eigene Hypothese aus dem Fachbereich>` | `<…>` | `<…>` | `<…>` |

*Ergibt eine Hypothese ein positives Ergebnis, ist die Konsequenz selten „System ablehnen",
sondern meist eine Einschränkung des Index oder eine feinere Berechtigungslogik. Wichtig ist,
dass die Bewertung stattgefunden hat und dokumentiert ist: Die Frage kommt in der Prüfung
sicher, und „darüber haben wir nicht nachgedacht" ist die einzige wirklich schlechte Antwort.*

**Bewertungsergebnis Aggregation:** `<normal / hoch / sehr hoch>` — Begründung: `<…>`

## 5. Schutzbedarfsfeststellung je Grundwert

### Vertraulichkeit

| Datenklasse | Schadensszenario bei Verletzung | Einstufung | Begründung |
|---|---|---|---|
| D1 | `<…>` | `<normal/hoch/sehr hoch>` | `<…>` |
| D2 | `<…>` | `<…>` | `<…>` |
| D3 | `<…>` | `<…>` | `<…>` |
| D4 | *Offenlegung, wonach einzelne Beschäftigte gefragt haben* | `<…>` | `<…>` |

**Gesamteinstufung Vertraulichkeit (Maximumprinzip):** `<…>`

### Integrität

| Datenklasse | Schadensszenario bei Verfälschung | Einstufung | Begründung |
|---|---|---|---|
| D1–D3 | *Beschäftigte handeln nach einer falschen, aber autoritativ wirkenden Auskunft* | `<…>` | `<…>` |
| D4 | *Protokoll ist als Nachweis nicht mehr belastbar* | `<…>` | `<…>` |

**Gesamteinstufung Integrität:** `<…>`

*Bei RAG ist Integrität regelmäßig der unterschätzte Grundwert. Eine falsche Antwort ist kein
Anzeigefehler — sie ist eine Handlungsgrundlage. Prüfen Sie ausdrücklich, ob eine Falschauskunft
zu einem regulatorisch relevanten Fehlverhalten führen kann (z. B. bei Geldwäsche-, Melde- oder
Beratungspflichten); dann ist „normal" nicht haltbar.*

### Verfügbarkeit

| Betrachtung | Schadensszenario bei Ausfall | Einstufung | Begründung |
|---|---|---|---|
| System gesamt | `<…>` | `<…>` | `<Existiert ein fachlicher Rückfallweg? Vgl. 05>` |

**Gesamteinstufung Verfügbarkeit:** `<…>`

*Widerstehen Sie der Versuchung, hoch einzustufen, weil das System wichtig wirkt. Wenn der
Rückfallweg — die Dokumente im Intranet — weiterhin existiert, ist „normal" begründbar und
erspart Ihnen Auflagen, die Sie an anderer Stelle dringender brauchen. Prüfen Sie aber, ob der
Rückfallweg nach der Einführung noch gepflegt wird.*

## 6. Gesamtergebnis

| Grundwert | Einstufung | Maßgebliche Datenklasse/Stufe |
|---|---|---|
| Vertraulichkeit | `<…>` | `<…>` |
| Integrität | `<…>` | `<…>` |
| Verfügbarkeit | `<…>` | `<…>` |

**Abgeleitete Anforderungen.** `<Verweis auf die Kontrollen im [Kontrollkatalog](../controls/controls.md), die sich aus dieser Einstufung ergeben.>`

**Nicht abgedeckte Risiken (Restrisiko).** `<Was trotz Maßnahmen bleibt — wandert in [`07`](07-freigabevorlage.md).>`

## 7. Verweise

| Frage | Dokument |
|---|---|
| Datenschutzrechtliche Bewertung, Embeddings, Rechtsgrundlage | [`02-dsfa-baustein-rag.md`](02-dsfa-baustein-rag.md) |
| Externe Verarbeitung, LLM-Anbieter, Drittstaat | [`03-auslagerung-drittparteien.md`](03-auslagerung-drittparteien.md) |
| Umsetzung der abgeleiteten Maßnahmen im Betrieb | [`04-betriebskonzept.md`](04-betriebskonzept.md) |
| Verfügbarkeit, Degradation, Kill-Switch | [`05-notfallkonzept.md`](05-notfallkonzept.md) |
| Löschung und Nachweisführung | [`../docs/loeschnachweis.md`](../docs/loeschnachweis.md) |

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Haben Sie den Schutzbedarf für die Embeddings und den Index getrennt bewertet — oder nur
   für die Quelldokumente?"** Die Standardlücke. Wer nur S1 bewertet, hat die Verarbeitung nicht
   erfasst, die das System überhaupt ausmacht.
2. **„Welche Aggregationshypothesen haben Sie geprüft, und mit wem?"** Prüft, ob Abschnitt 4
   stattgefunden hat oder nachträglich formuliert wurde. Ein Protokoll der Sitzung mit dem
   Fachbereich ist hier die überzeugendste Evidenz.
3. **„Warum haben Sie die Integrität mit `normal` eingestuft, wenn Beschäftigte nach den
   Auskünften handeln?"** Die Frage, die eine zu bequeme Einstufung aufbricht.
4. **„Ist das Prompt-Protokoll als eigene Datenklasse bewertet?"** Prüft, ob das System als
   Ganzes betrachtet wurde oder nur seine Eingangsdaten.
5. **„Wann wurde die Feststellung zuletzt überprüft — und was hat die letzte neue Datenquelle
   daran geändert?"** Verbindet die Feststellung mit dem Änderungswesen aus
   [`04`](04-betriebskonzept.md). Eine Schutzbedarfsfeststellung, die den Aufnahmezeitpunkt
   nicht überlebt hat, ist wertlos.

## Offene Punkte

- `<Was noch offen ist — mit Verantwortlichem und Zieltermin.>`
- `<Beispiel: Aggregationshypothese A3 mit dem Fachbereich Compliance noch nicht bewertet;
  Termin TT.MM.JJJJ.>`
- `<Beispiel: Einstufung der Datenklasse D4 (Protokolle) steht unter Vorbehalt der Abstimmung
  mit der Mitbestimmung.>`

# Die Freigabeakte

Das Vorlagenset, das ein reguliertes Haus für die Freigabe eines RAG-Systems real benötigt.
Kopieren, ausfüllen, vorlegen.

> **Kein Rechtsrat.** Siehe [`../DISCLAIMER.md`](../DISCLAIMER.md).

## Die acht Teile

| # | Vorlage | Wer füllt sie aus | Beantwortet die Frage |
|---|---|---|---|
| 01 | [Schutzbedarfsfeststellung](01-schutzbedarfsfeststellung.md) | Informationssicherheit | Wie schutzbedürftig ist das, was hier verarbeitet wird — je Verarbeitungsstufe, nicht nur je Quelle? |
| 02 | [DSFA-Baustein RAG](02-dsfa-baustein-rag.md) | Datenschutz | Sind Embeddings personenbezogene Daten, und wie beantworte ich ein Auskunftsersuchen gegen einen Vektorindex? |
| 03 | [Auslagerung / IKT-Drittparteien](03-auslagerung-drittparteien.md) | Auslagerungsmanagement | Ist der Modellanbieter sauber als IKT-Dienstleister bewertet — inklusive Subunternehmerkette und Exit? |
| 04 | [Betriebskonzept](04-betriebskonzept.md) | IT-Betrieb, Architektur | Wer betreibt das, mit welchen Rollen — und ist ein Modellwechsel bei uns ein Change? |
| 05 | [Notfallkonzept](05-notfallkonzept.md) | BCM | Was passiert bei Ausfall — und was beim gefährlicheren Fall, dem fehlerhaften Weiterlaufen? |
| 06 | [Testnachweise](06-testnachweise.md) | Projektleitung, QS | Welche Tests verlangt die Freigabe, und in welchem Format wird das Ergebnis belegbar? |
| 07 | [Freigabevorlage](07-freigabevorlage.md) | Projektleitung, Architektur | Risiko, Restrisiko, Auflagen — auf zwei Seiten. |
| 08 | [Mitbestimmung](08-mitbestimmung-betriebsvereinbarung.md) | Projektleitung, Personal | Was wird über die Beschäftigten protokolliert, und was muss die Betriebsvereinbarung regeln? |

## In welcher Reihenfolge

**01 → 02 → 03** zuerst: Sie bestimmen, was alles Weitere leisten muss. **04 und 05** bauen
darauf auf. **06** läuft *parallel zur Entwicklung* — Nachweise müssen entstehen, während gebaut
wird, nicht danach. **08** startet am besten am ersten Tag, weil es die längste Laufzeit hat.
**07** entsteht zuletzt, wird aber am Anfang gelesen: Was dort auf zwei Seiten stehen muss,
definiert, was Sie vorher einsammeln.

## Wie jede Vorlage aufgebaut ist

1. **Kopf:** Wer benutzt das Dokument, in welchem Prozess, und wer prüft es.
2. **Disclaimer** und Ausfüllhinweis.
3. **Inhalt** mit `<Platzhaltern>` und kursiven Beispielformulierungen — das sind Vorschläge in
   der Sprache, die in Gremien trägt. Schreiben Sie sie um, aber schreiben Sie sie nicht ab.
4. **„Was die prüfende Funktion hier typischerweise fragt"** — drei bis fünf Fragen, die
   erfahrungsgemäß kommen.
5. **„Offene Punkte"** — dort gehört hin, was Sie nicht wissen. Ein ehrliches „offen, Termin X"
   hat in einer Prüfung noch nie Schaden angerichtet; eine geschönte Aussage schon.

## Erst den Pilot lesen

Die Vorlagen lesen sich völlig anders, wenn man einmal gesehen hat, wo sie landen.
[`../pilot/`](../pilot/) enthält alle acht ausgefüllt, für ein fiktives Institut, mit
Kontrollbewertung und Vorstandsbeschluss. Fünf Minuten.

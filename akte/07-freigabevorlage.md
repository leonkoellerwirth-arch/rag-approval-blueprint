# 07 — Freigabevorlage (Entscheidungsvorlage)

> **Wer benutzt dieses Dokument?** Projektleitung / Product Owner und der Enterprise-Architekt
> erstellen es; die Fachfunktionen zeichnen ihre Aussagen mit.
> **In welchem Prozess?** Die Freigabe-Entscheidung im zuständigen Gremium (Vorstand,
> IT-Ausschuss, Architekturboard).
> **Wer liest es?** Das entscheidende Gremium — mit begrenzter Zeit und ohne Vorbefassung.
> Die interne Revision liest es später als Maßstab dafür, was zugesagt wurde.

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Siehe [`DISCLAIMER.md`](../DISCLAIMER.md).

**Ausfüllhinweis — die zwei Seiten sind eine Vorgabe, keine Empfehlung.** Diese Vorlage ist
bewusst kurz. Ein Gremium entscheidet nicht besser, weil es mehr Text bekommt; es entscheidet
später. Alles Ausführliche gehört in die Anlagen — hierher gehört nur, was für die Entscheidung
selbst nötig ist: Was wollen wir, was ist das Risiko, was bleibt übrig, unter welchen Auflagen,
und wann sehen wir das wieder.

**Sprachregel.** Schreiben Sie in Gremiensprache, nicht in Projektsprache. Kein
Architekturvokabular, keine Produktnamen ohne Erklärung, keine Abkürzung ohne Auflösung beim
ersten Auftreten. Wenn ein Satz nur von jemandem verstanden wird, der das Projekt kennt, gehört
er umgeschrieben. Und: **Schreiben Sie das Restrisiko in Ihre eigenen Worte, nicht in
Konjunktive.** Ein Gremium, das ein weichgespültes Restrisiko genehmigt, hat nichts genehmigt.

---

# Entscheidungsvorlage: Freigabe `<Systemname>`

**Vorlage an:** `<Gremium>` · **Sitzung am:** `<TT.MM.JJJJ>` · **Vorlage Nr.:** `<…>`
**Erstellt von:** `<Name, Funktion>` · **Datum:** `<TT.MM.JJJJ>` · **Einstufung:** `<…>`

## 1. Beschlussvorschlag

> `<Ein bis drei Sätze. Beispiel: „Das Gremium gibt den produktiven Betrieb des internen
> Richtlinien-Assistenten für alle Beschäftigten unter den in Abschnitt 6 genannten Auflagen
> frei. Die Freigabe ist bis zur Wiedervorlage am TT.MM.JJJJ befristet.">`

**Entscheidungsalternativen:** `<Freigabe / Freigabe unter Auflagen / Freigabe für einen
begrenzten Nutzerkreis / Vertagung mit benannter Bedingung / Ablehnung>`

## 2. Worum es geht

`<Fünf bis acht Zeilen. Was macht das System, für wen, welchen Nutzen soll es stiften, und
worauf gründet die Nutzenerwartung — Pilotdaten, nicht Vermutung. Eine Zahl, die der Nutzen
belegt, ist mehr wert als drei Adjektive.>`

| Kennzahl | Wert |
|---|---|
| Nutzerkreis | `<…>` |
| Umfang der Wissensbasis | `<…>` |
| Erwarteter Nutzen | `<…, belegt durch …>` |
| Kosten (Aufbau / laufend p. a.) | `<…>` |
| Geplanter Produktivstart | `<…>` |

## 3. Aufsichtliche und rechtliche Einordnung

| Frage | Aussage |
|---|---|
| Kritische oder wichtige Funktion (DORA Art. 3 Nr. 22)? | `<ja/nein — Begründung in einer Zeile>` |
| Schutzbedarf (V / I / Vf) | `<…>` |
| DSFA durchgeführt? | `<ja/nein — Ergebnis, Stellungnahme des DSB>` |
| Vorherige Konsultation der Aufsichtsbehörde erforderlich? | `<ja/nein>` |
| IKT-Drittdienstleister im Informationsregister erfasst? | `<ja/nein>` |
| Mitbestimmung | `<Status>` |
| Automatisierte Entscheidung mit Rechtswirkung? | `<nein — Begründung>` |

## 4. Risiko

Die drei bis fünf Risiken, die für die Entscheidung zählen — nicht die vollständige Risikoliste.

| # | Risiko | Bewertung vor Maßnahmen | Maßnahme | Bewertung nach Maßnahmen |
|---|---|---|---|---|
| 1 | `<z. B. Offenlegung vertraulicher Inhalte an nicht berechtigte Beschäftigte>` | `<…>` | `<…>` | `<…>` |
| 2 | `<z. B. Handeln auf Basis einer falschen Auskunft>` | `<…>` | `<…>` | `<…>` |
| 3 | `<z. B. unvollständige Löschung im Vektorindex>` | `<…>` | `<…>` | `<…>` |
| 4 | `<z. B. Abhängigkeit vom Modellanbieter>` | `<…>` | `<…>` | `<…>` |

## 5. Restrisiko

> `<Der wichtigste Absatz der Vorlage — drei bis sechs Sätze, ohne Weichzeichner. Was bleibt
> nach allen Maßnahmen bestehen, wie wahrscheinlich ist es, was wäre der Schaden, und wer trägt
> es. Beispiel für die Tonlage: „Es bleibt möglich, dass das System auf eine ungewöhnlich
> formulierte Frage eine sachlich falsche, aber überzeugend formulierte Auskunft gibt. Die
> Quellenangabe in jeder Antwort und der Meldeweg begrenzen den Schaden, schließen ihn aber
> nicht aus. Das Restrisiko liegt bei der Fachverantwortung `<Bereich>`.">`

**Träger des Restrisikos:** `<Funktion/Person>`

## 6. Auflagen

| # | Auflage | Frist | Verantwortlich | Nachweis an |
|---|---|---|---|---|
| A1 | `<…>` | `<TT.MM.JJJJ>` | `<…>` | `<…>` |
| A2 | `<…>` | `<…>` | `<…>` | `<…>` |
| A3 | `<…>` | `<…>` | `<…>` | `<…>` |

**Folge bei Nichterfüllung:** `<z. B. „Bei Nichterfüllung von A1 bis zum genannten Termin ist der
Betrieb bis zur Erfüllung auszusetzen."  — Eine Auflage ohne benannte Folge ist eine Bitte.>`

## 7. Stellungnahmen der beteiligten Funktionen

| Funktion | Stellungnahme | Datum | Vorbehalte |
|---|---|---|---|
| Informationssicherheit | `<befürwortet / unter Auflagen / abgelehnt>` | `<…>` | `<…>` |
| Datenschutz | `<…>` | `<…>` | `<…>` |
| 2nd Line / Risikocontrolling | `<…>` | `<…>` | `<…>` |
| Auslagerungsmanagement | `<…>` | `<…>` | `<…>` |
| Fachbereich | `<…>` | `<…>` | `<…>` |
| Interne Revision (falls beteiligt) | `<…>` | `<…>` | `<…>` |

**Abweichende Auffassungen.** *Wenn eine Funktion einen Vorbehalt hat, gehört er hier hin —
ausformuliert, nicht geglättet. Ein Gremium, das später erfährt, dass ein Vorbehalt bestand und
nicht vorgelegt wurde, entzieht der nächsten Vorlage das Vertrauen. Eine offen dargestellte
Meinungsverschiedenheit mit einer nachvollziehbaren Auflösung ist dagegen das stärkste Signal
dafür, dass sauber gearbeitet wurde.*

## 8. Nachweisstand

| Nachweis | Status | Referenz |
|---|---|---|
| Schutzbedarfsfeststellung | `<…>` | Anlage 1 |
| DSFA-Baustein | `<…>` | Anlage 2 |
| Auslagerungsbewertung | `<…>` | Anlage 3 |
| Betriebs- und Notfallkonzept | `<…>` | Anlage 4, 5 |
| Testnachweise (Berechtigung, Löschung, Qualität) | `<… von … bestanden>` | Anlage 6 |
| Kontrollbewertung / Readiness-Report | `<x grün, y gelb, z rot>` | Anlage 7 |

## 9. Wiedervorlage

| Feld | Inhalt |
|---|---|
| Termin | `<TT.MM.JJJJ>` |
| Gegenstand | `<Erfüllung der Auflagen, Betriebserfahrungen, Qualitätsmessung>` |
| Auslöser für eine vorgezogene Wiedervorlage | `<z. B. Wechsel des Modellanbieters, sicherheitsrelevanter Vorfall, Ausweitung des Nutzerkreises, Aufnahme einer neuen Datenquelle>` |

## 10. Anlagen

`<1. Schutzbedarfsfeststellung · 2. DSFA-Baustein · 3. Auslagerungsbewertung ·
4. Betriebskonzept · 5. Notfallkonzept · 6. Testnachweise · 7. Readiness-Report>`

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Wer trägt das Restrisiko — namentlich?"** Ein Restrisiko ohne benannten Träger ist nicht
   getragen, sondern verteilt. Die Revision prüft, ob die Person davon weiß.
2. **„Welche Auflage ist zum Fristende nicht erfüllt worden, und was ist passiert?"** Die
   Standard-Nachschau. Auflagen ohne Nachverfolgung sind der häufigste Folgemangel einer
   ansonsten sauberen Freigabe.
3. **„Gab es abweichende Auffassungen der beteiligten Funktionen?"** Wird häufig direkt bei der
   Fachfunktion nachgefragt, nicht beim Projekt. Eine geglättete Vorlage fällt hier auf.
4. **„Auf welcher Grundlage beruht die Nutzenaussage?"** Prüft, ob der Nutzen gemessen oder
   angenommen wurde — und damit, ob die Abwägung zwischen Nutzen und Risiko tragfähig ist.
5. **„Ist seit der Freigabe etwas geändert worden, das eine vorgezogene Wiedervorlage ausgelöst
   hätte?"** Verbindet die Vorlage mit dem Änderungswesen aus [`04`](04-betriebskonzept.md).

## Offene Punkte

- `<Was zum Zeitpunkt der Vorlage noch offen ist — offen benennen, nicht auslassen. Ein
  bekannter offener Punkt mit Termin ist entscheidungsfähig; ein verschwiegener ist es nicht.>`

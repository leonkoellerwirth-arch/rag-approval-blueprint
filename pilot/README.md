# Pilot: Nordwind Bank AG — Freigabe unter Auflagen

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden; Personen,
> Anbieter, Zahlen und Befunde sind konstruiert. Echt ist der **Ablauf**.

Ein vollständig durchgespielter Freigabelauf: 1.200 Beschäftigte, 812 interne Richtlinien, ein
EU-Sprachmodell, neun Monate von der Beauftragung bis zum Vorstandsbeschluss. Ergebnis:
**Freigabe unter vier Auflagen**, 16 grüne, 5 gelbe und 2 rote Kontrollen.

## In fünf Minuten

1. [`00-fallbeschreibung.md`](00-fallbeschreibung.md) — Institut, System, Beteiligte, Zeitachse,
   der dokumentierte Konflikt.
2. [`07-freigabevorlage-final.md`](07-freigabevorlage-final.md) — die zwei Seiten, die auf dem
   Tisch des Vorstands lagen.

## Der vollständige Lauf

| Was | Wo |
|---|---|
| Der Fall | [`00-fallbeschreibung.md`](00-fallbeschreibung.md) |
| Alle acht Vorlagen ausgefüllt | [`akte/`](akte/) |
| Kontrollbewertung der 2nd Line | [`controls-assessment.yaml`](controls-assessment.yaml) → [`readiness-report.md`](readiness-report.md) |
| **Die Evidenz-Artefakte** | [`evidenz/`](evidenz/) — Löschprotokoll, Testprotokolle im Evidenzformat |
| Die Vorlage ans Gremium | [`akte/07`](akte/07-freigabevorlage.md) (Arbeitsfassung) · [`07-freigabevorlage-final.md`](07-freigabevorlage-final.md) (zwei Seiten) |
| **Was die Revision daraus macht** | [`revision/`](revision/) — Prüfprogramm und Prüfungsbericht |

## Warum der Pilot nicht makellos ist

Ein Beispiel, in dem alle Kontrollen grün sind, alle Tests beim ersten Anlauf bestehen und alle
Funktionen einer Meinung sind, fällt jeder erfahrenen Prüferin sofort auf. Deshalb bleiben drin:

- **Der erste Berechtigungstest ist gescheitert** — die Antwort war leer, die Quellenliste nannte
  den Titel einer Personalrichtlinie. Drei Wochen Nacharbeit.
- **Die Löschung war nicht nachweisbar.** Funktional grün, auf Indexebene rot: 38.420 physische
  Einträge vor wie nach der Löschung. Dokumentiert in
  [`evidenz/NORA-LP-2026-014.md`](evidenz/NORA-LP-2026-014.md).
- **Datenschutz und Auslagerungsmanagement waren uneins** über den Zugriff eines Support-Partners
  aus einem Drittstaat. Der Konflikt und seine Auflösung stehen ungeglättet in der Vorlage.
- **Die Revision hat nach dem Go-live etwas gefunden, das niemand auf dem Schirm hatte** — eine
  neue Datenquelle, die am Änderungsverfahren vorbei aufgenommen wurde
  ([`revision/pruefungsbericht-2026-14.md`](revision/pruefungsbericht-2026-14.md), F1).

## Der Gegenfall

[`../pilot-abgelehnt/`](../pilot-abgelehnt/) zeigt denselben Prozess mit dem anderen Ausgang:
ein Vorhaben, das **keine Freigabe** bekommt — und wie man ein Nein so dokumentiert, dass es
überprüfbar ist statt persönlich.

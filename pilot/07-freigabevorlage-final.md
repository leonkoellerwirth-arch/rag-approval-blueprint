# Die Entscheidungsvorlage, wie sie ins Gremium ging

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden; Personen,
> Anbieter, Zahlen und Befunde sind konstruiert. Der Ablauf ist echt. Siehe
> [`00-fallbeschreibung.md`](00-fallbeschreibung.md).
>
> **Kein Rechtsrat.** Siehe [`../DISCLAIMER.md`](../DISCLAIMER.md).

**Warum es diese Fassung zusätzlich gibt.** Die
[Arbeitsfassung](akte/07-freigabevorlage.md) ist vollständig — und für ein Gremium zu lang. Was
hier steht, ist das Papier, das am 24.06.2026 tatsächlich auf dem Tisch lag: zwei Seiten.
Der Vergleich beider Fassungen ist der eigentliche Lerneffekt.

**Was auf dem Weg wegfiel:** die Risikotabelle mit Vorher-Nachher-Bewertung, der Nachweisstand
je Dokument, die vollständige Architekturbeschreibung, die Begründung der aufsichtlichen
Einordnung — alles in die Anlagen. **Was nicht wegfallen durfte:** das Restrisiko im Wortlaut,
die abweichende Auffassung des Datenschutzbeauftragten, die Folge bei Nichterfüllung der
Auflagen, und der namentliche Träger des Restrisikos. Wer beim Kürzen bei diesen vier Punkten
anfängt, kürzt die Entscheidung weg und lässt nur die Zustimmung übrig.

---

<br>

**NORDWIND BANK AG — VORSTANDSVORLAGE**

**Vorlage 2026-041 · Sitzung vom 24.06.2026 · Ressort COO · Einstufung: intern**

# Freigabe des internen Richtlinien-Assistenten NORA

**Vorgelegt von:** T. Brand (Projektleitung), A. Kellner (Enterprise-Architektur) · 08.06.2026

## Beschlussvorschlag

Der Vorstand gibt den produktiven Betrieb des internen Richtlinien-Assistenten NORA für alle
Beschäftigten **unter den Auflagen A1 bis A4** frei. Die Freigabe ist bis zur **Wiedervorlage am
30.11.2026** befristet. Der Vorstand nimmt das unten beschriebene Restrisiko zur Kenntnis und
weist es dem **Ressort COO** zu.

## Sachverhalt

NORA beantwortet Fragen der Beschäftigten zu internen Richtlinien und Arbeitsanweisungen und
nennt zu jeder Aussage die Fundstelle. Anlass: 31 % der Anfragen an die Organisationsabteilung
sind Fragen nach bestehenden Regelungen. Suche und Dokumentenspeicherung erfolgen im eigenen
Rechenzentrum; für die Formulierung der Antwort wird ein in der EU betriebenes Sprachmodell des
Anbieters Meridian AI B.V. genutzt. **Das System entscheidet nichts** und schreibt in kein
Quellsystem.

| | |
|---|---|
| Nutzerkreis | alle 1.200 Beschäftigten · 812 Dokumente · rund 400 Anfragen je Arbeitstag |
| Gemessener Nutzen | Regelungsanfragen im Pilotbereich **−38 %** (60 Nutzende, 20.01.–30.04.2026) |
| Antwortqualität | **91,1 %** korrekt bei 180 Referenzfragen; **0 %** selbstbewusst falsche Antworten auf nicht beantwortbare Fragen |
| Kosten | 210 TEUR Aufbau · 95 TEUR p. a. |
| Aufsichtliche Einordnung | **keine** kritische oder wichtige Funktion (DORA Art. 3 Nr. 22); Schutzbedarf hoch / hoch / normal |
| Beteiligung | DSFA abgeschlossen · Betriebsvereinbarung geschlossen · Kontrollbewertung der 2nd Line liegt vor |

## Bewertung der 2nd Line

Von 23 Kontrollen sind **16 grün, 5 gelb und 2 rot**. Die beiden roten Kontrollen betreffen
keinen laufenden Schaden, sondern einen fehlenden Nachweis (Löschung auf Indexebene) und eine
fehlende vertragliche Absicherung (Ankündigung von Modelländerungen). Beide sind mit Frist und
benannter Verantwortung in Auflagen überführt. Die 2nd Line befürwortet die Freigabe unter
diesen Auflagen.

## Restrisiko

**Erstens** kann NORA auf eine ungewöhnlich formulierte Frage eine sachlich falsche, aber
überzeugend formulierte Auskunft geben. Quellenangabe und Meldeweg begrenzen den Schaden,
schließen ihn nicht aus. In 180 Referenzfragen waren 4,4 % der Antworten teilweise unzutreffend;
keine davon betraf eine meldepflichtige Regelung.

**Zweitens** ist bis zur Erfüllung von A1 nicht belegt, dass gelöschte Inhalte im Suchindex
unumkehrbar entfernt sind. Über das System sind sie nicht mehr auffindbar; auf der technischen
Ebene darunter verbleiben sie vorerst als markierte Einträge. Ein Zugriff darauf setzt
administrativen Zugang zu unserem Rechenzentrum voraus.

**Drittens** kann der Anbieter das Sprachmodell ohne Vorankündigung aktualisieren. Wir erkennen
das über einen wöchentlichen automatisierten Vergleichslauf — also im Nachhinein, mit einem
Verzug von bis zu sieben Tagen.

**Träger des Restrisikos: Ressort COO**, in Abstimmung mit der Fachverantwortung (Leitung
Organisation).

## Auflagen

| | Auflage | Frist | Verantwortlich |
|---|---|---|---|
| **A1** | Wöchentliche Kompaktierung des Suchindex mit Protokoll und Nachweis der unumkehrbaren Löschung; Wiederholung des Löschtests | 30.09.2026 | T. Brand |
| **A2** | Schriftliche Bestätigung des Anbieters, dass der technische Support ausschließlich durch Personal innerhalb der EU erbracht wird | 30.09.2026 | C. Ahrens |
| **A3** | Nachverhandlung einer Ankündigungsfrist von mindestens 30 Tagen für Modellaktualisierungen; bis dahin bleibt der wöchentliche Vergleichslauf verbindlich | 30.11.2026 | C. Ahrens |
| **A4** | Erweiterter Test auf eingeschleuste Anweisungen über indexierte Dokumente | 31.10.2026 | Dr. P. Ohlsen |

**Folge bei Nichterfüllung.** Wird A1 nicht fristgerecht erfüllt, ist die Aufnahme neuer
personenbezogener Dokumentklassen bis zur Erfüllung auszusetzen und dem Vorstand in der
Folgesitzung zu berichten. Werden A2 oder A3 nicht erfüllt, ist das jeweilige Risiko dem Vorstand
erneut zur Entscheidung vorzulegen.

## Abweichende Auffassung (dokumentiert)

Der Datenschutzbeauftragte hat im Dezember 2025 beanstandet, dass der außerhalb der EU ansässige
Support-Partner des Anbieters im Störungsfall Zugriff auf Protokolle mit Anfrageinhalten haben
konnte, und eine Klärung vor Produktivstart gefordert. Das Auslagerungsmanagement hat die
Leistungserbringung in der EU und den eng begrenzten Zugriff entgegengehalten.

Die Auflösung erfolgte zweistufig: Die anbieterseitige Protokollierung wurde am 02.04.2026 auf
Metadaten beschränkt, womit die strittigen Inhalte entfallen; die vertragliche Absicherung ist
Auflage A2. **Der Datenschutzbeauftragte trägt diese Lösung mit, hält jedoch fest, dass die
vertragliche Zusicherung bis zu ihrem Vorliegen durch eine technische Maßnahme ersetzt wird und
nicht durch eine rechtliche Bewertung.** Diese Einschränkung ist Teil des Restrisikos.

## Wiedervorlage

**30.11.2026** — Erfüllung der Auflagen, Betriebserfahrungen, Auswertung gemeldeter
Falschauskünfte, abschließende Bewertung zum EU AI Act.

**Vorgezogen bei:** Wechsel des Modells mit messbarer Qualitätsänderung · sicherheitsrelevantem
Vorfall · Aufnahme einer neuen Datenquelle mit personenbezogenen Inhalten · Einbettung von NORA
in einen Prozess, der ohne das System nicht mehr läuft.

**Anlagen:** 1 Schutzbedarfsfeststellung · 2 DSFA · 3 Auslagerungsbewertung · 4 Betriebskonzept ·
5 Notfallkonzept · 6 Testnachweise · 7 Readiness-Report · 8 Betriebsvereinbarung ·
9 Mitbestimmungsverfahren

---

## Beschluss (Protokollauszug)

> Der Vorstand beschließt die Freigabe von NORA für den produktiven Betrieb unter den Auflagen
> A1 bis A4 mit den genannten Fristen. Das Restrisiko wird dem Ressort COO zugewiesen. Die
> Wiedervorlage erfolgt am 30.11.2026. Auf Rückfrage wurde die Folge bei Nichterfüllung von A1
> in die Vorlage aufgenommen.
>
> *Nordwind Bank AG, Vorstandssitzung vom 24.06.2026, TOP 7.*

---

## Was dieser Fall zeigt

- **Eine Freigabe unter Auflagen ist kein halber Erfolg.** Sie ist das normale Ergebnis eines
  ehrlichen Verfahrens. Ein Gremium, dem alles grün vorgelegt wird, fragt zu Recht, wer wo
  weggeschaut hat.
- **Der teuerste Befund kam aus dem einfachsten Test.** Der erste Negativ-Retrieval-Test scheiterte
  daran, dass die Trefferliste Titel nicht berechtigter Dokumente anzeigte — drei Wochen
  Nacharbeit, weil eine Filterung an einer Stelle fehlte, die niemand als Ausgabekanal
  betrachtet hatte.
- **Der wichtigste Befund war unsichtbar.** Der Löschtest war funktional grün. Erst der Blick
  unter die API-Ebene zeigte, dass gelöschte Vektoren physisch erhalten blieben. Ohne diesen
  Schritt wäre die Löschung als nachgewiesen in die Vorlage gegangen.
- **Der Konflikt hat das Verfahren verbessert, nicht verzögert.** Aus dem Streit über die
  Drittstaaten-Frage entstand eine technische Maßnahme, die das Problem beseitigt hat, statt es
  zu bewerten.

## Offene Punkte

- Diese Fassung zeigt eine Freigabe unter Auflagen. Ein Durchlauf mit dem Ergebnis „keine
  Freigabe" — und der Frage, wie man den sauber dokumentiert — fehlt und ist vorgemerkt.
- Der Protokollauszug ist eine Rekonstruktion des Ergebnisses, kein Muster für ein
  Sitzungsprotokoll; die Protokollführung folgt der Geschäftsordnung des jeweiligen Hauses.

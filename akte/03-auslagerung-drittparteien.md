# 03 — Auslagerung und IKT-Drittparteien

> **Wer benutzt dieses Dokument?** Auslagerungsmanagement bzw. die DORA-Verantwortlichen,
> gemeinsam mit Einkauf, Rechtsabteilung und Informationssicherheit.
> **In welchem Prozess?** Der IKT-Drittpartei- und Auslagerungsprozess — Einordnung,
> Vertragsgestaltung, Informationsregister, Exit.
> **Wer prüft es?** 2nd Line, interne Revision und im Ernstfall die Aufsicht. Dieses Dokument
> liefert außerdem die Grundlage für die Drittland- und Auftragsverarbeitungsfragen in
> [`02`](02-dsfa-baustein-rag.md).

> **Kein Rechtsrat.** Diese Vorlage ist ein Arbeitsmittel aus generischer Aufsichts- und
> Governance-Logik, keine Rechts- oder Aufsichtsberatung und kein Nachweis der Erfüllung
> regulatorischer Anforderungen. Ob und wie DORA auf Ihr Institut und diesen Bezug anzuwenden
> ist, entscheidet Ihre zuständige Funktion. Siehe [`DISCLAIMER.md`](../DISCLAIMER.md).

**Ausfüllhinweis — die Grundeinsicht dieser Vorlage.** Ein Cloud-LLM ist aufsichtlich kein
KI-Thema. Es ist ein **IKT-Dienstleister** mit einer Subunternehmerkette, einem
Konzentrationsrisiko und einer Exit-Frage. Wer die Bewertung im KI-Governance-Prozess führt und
nicht im Auslagerungsprozess, produziert zuverlässig eine Feststellung. Führen Sie diese Vorlage
in Ihrem bestehenden Auslagerungsverfahren — sie ersetzt es nicht, sondern ergänzt es um das,
was bei einem Sprachmodell anders ist.

**Rechtsrahmen (verifiziert 07/2026, siehe [Quellen](../docs/quellen.md)).** Maßgeblich ist die
**Verordnung (EU) 2022/2554 (DORA)**, anwendbar seit 17.01.2025. Die früher einschlägigen
BaFin-Rundschreiben zur IT sind weitgehend Geschichte: **VAIT, KAIT und ZAIT wurden mit Ablauf
des 16.01.2025 aufgehoben**; die **BAIT** gelten nur noch für einen Kreis von Übergangs- und
Nicht-DORA-Adressaten und werden **mit Ablauf des 31.12.2026 vollständig aufgehoben**. **MaRisk
AT 9 (Auslagerung)** besteht fort, betrifft nach dem Anwendungsbeginn von DORA aber die
Auslagerungen **ohne IT-Bezug**. Prüfen Sie für Ihr Haus, welcher Rahmen konkret greift — die
Einordnung entscheidet, gegen welches Raster Sie dieses Dokument schreiben.

---

## 1. Gegenstand des Fremdbezugs

| Feld | Inhalt |
|---|---|
| Dienstleister | `<Name, Sitz, Rechtsform>` |
| Bezogene Leistung | `<z. B. Inferenz eines Sprachmodells über eine API>` |
| Weitere IKT-Dienstleister im Aufbau | `<Vektordatenbank, Hosting, Embedding-Dienst — jeder einzeln zu bewerten>` |
| Vertragsverhältnis | `<Direktvertrag / über Konzern / über Reseller>` |
| Verarbeitungsregion | `<…>` |
| Vertragsbeginn / Laufzeit / Kündigungsfrist | `<…>` |
| Verantwortlich im Haus | `<Rolle>` |

**Der häufigste Fehler an dieser Stelle.** *Bewertet wird „das LLM", während Vektordatenbank,
Hosting-Plattform, Embedding-Dienst und ggf. ein Gateway-Anbieter unbewertet bleiben. Listen Sie
alle IKT-Dienstleister der Lösung auf und begründen Sie für jeden einzeln, warum er bewertet oder
warum er nicht bewertungspflichtig ist.*

## 2. Einordnung

| Frage | Bewertung | Begründung |
|---|---|---|
| Handelt es sich um IKT-Dienstleistungen im Sinne von DORA? | `<ja/nein>` | `<…>` |
| Handelt es sich um eine Auslagerung nach Ihrem internen Verständnis? | `<ja/nein>` | `<…>` |
| Unterstützt die Leistung eine **kritische oder wichtige Funktion**? | `<ja/nein>` | `<…>` |
| Falls nein: Was wäre die Folge eines Ausfalls, und warum ist sie nicht wesentlich? | `<…>` | `<…>` |
| Eintrag im **Informationsregister** erforderlich? | `<ja/nein>` | `<…>` |

**Zur kritischen oder wichtigen Funktion.** DORA definiert sie in **Art. 3 Nr. 22** als eine
Funktion, deren Störung die finanzielle Leistungsfähigkeit des Unternehmens oder die Solidität
bzw. Fortführung seiner Dienstleistungen und Tätigkeiten **wesentlich beeinträchtigen** würde
oder deren Ausfall die fortdauernde Einhaltung der Zulassungsvoraussetzungen und weiterer
Pflichten wesentlich beeinträchtigen würde.

*Für einen internen Richtlinien-Assistenten lautet die begründbare Antwort in vielen Häusern
„nein" — der Ausfall beeinträchtigt keine kritische Funktion, weil die Beschäftigten auf die
Dokumente selbst zurückgreifen. Schreiben Sie diese Begründung aus. Und prüfen Sie sie erneut,
sobald das System in einen Prozess eingebettet wird, der ohne es nicht mehr läuft — die
Einstufung ist eine Momentaufnahme, keine Eigenschaft.*

**Zum Informationsregister.** DORA verlangt in **Art. 28 Abs. 3**, ein Register aller
vertraglichen Vereinbarungen über die Nutzung von IKT-Dienstleistungen zu führen und zu
aktualisieren — auf Unternehmensebene sowie teilkonsolidiert und konsolidiert —, wobei
Vereinbarungen zu kritischen oder wichtigen Funktionen gesondert auszuweisen sind.

| Feld | Inhalt |
|---|---|
| Registereintrag vorhanden | `<ja/nein — Referenz>` |
| Verantwortlich für die Pflege | `<…>` |
| Letzte Aktualisierung | `<…>` |

## 3. Vertragsinhalte

DORA regelt die vertraglichen Mindestinhalte in **Art. 30** („Key contractual provisions" /
wesentliche Vertragsbestimmungen); für kritische oder wichtige Funktionen gelten die erweiterten
Anforderungen des Art. 30 Abs. 3. Prüfen Sie die folgenden Punkte konkret gegen den vorliegenden
Vertrag — nicht gegen die Website des Anbieters.

| # | Vertragspunkt | Geregelt? | Fundstelle im Vertrag | Bewertung |
|---|---|---|---|---|
| V1 | Beschreibung der Leistung und der Verarbeitungsorte | `<…>` | `<…>` | `<…>` |
| V2 | Anzeige von Änderungen der Verarbeitungsorte | `<…>` | `<…>` | `<…>` |
| V3 | Zusicherungen zu Vertraulichkeit und Verfügbarkeit / Service Level | `<…>` | `<…>` | `<…>` |
| V4 | **Ausschluss der Nutzung der Inhalte für Modelltraining** | `<…>` | `<…>` | `<…>` |
| V5 | Aufbewahrung und Löschung übermittelter Inhalte beim Anbieter | `<…>` | `<…>` | `<…>` |
| V6 | Unterstützung bei IKT-Vorfällen, Melde- und Informationspflichten | `<…>` | `<…>` | `<…>` |
| V7 | Zugangs-, Einsichts- und **Prüfrechte** (auch für die Aufsicht) | `<…>` | `<…>` | `<…>` |
| V8 | Regelungen zu **Subunternehmern** und deren Wechsel | `<…>` | `<…>` | `<…>` |
| V9 | Kündigungsrechte | `<…>` | `<…>` | `<…>` |
| V10 | **Exit-Strategie und angemessene Übergangsfrist** | `<…>` | `<…>` | `<…>` |
| V11 | Auftragsverarbeitungsvertrag nach Art. 28 DSGVO | `<…>` | `<…>` | `<…>` |
| V12 | Grundlage einer etwaigen Drittlandübermittlung (Art. 44–49 DSGVO) | `<…>` | `<…>` | `<…>` |
| V13 | Ankündigungsfrist bei Modell- oder Versionsänderungen | `<…>` | `<…>` | `<…>` |

**Zu V10.** Exit-Regelungen sind in DORA kein eigener Artikel, sondern Bestandteil der
wesentlichen Vertragsbestimmungen: **Art. 30 Abs. 3 Buchst. f** verlangt für kritische oder
wichtige Funktionen Ausstiegsstrategien, insbesondere die Festlegung einer **verbindlichen
angemessenen Übergangsfrist**, um den Wechsel zu einem anderen Anbieter oder auf eine
Inhouse-Lösung zu ermöglichen.

**Zu V13 — die Zeile, die es bei klassischen Dienstleistern nicht gibt.** *Bei einem
Sprachmodell kann sich das Leistungsverhalten ändern, ohne dass sich der Vertrag, die
Schnittstelle oder Ihr System ändert. Wenn keine Ankündigungsfrist und keine Möglichkeit zum
Versionspinning vereinbart ist, ist das ein Restrisiko, das in die Freigabevorlage gehört — und
kein Detail für den Betrieb.*

**Zu V4 — sauber belegen.** *Die Aussage „unsere Daten werden nicht zum Training verwendet" ist
eine der meistzitierten und am seltensten belegten im Genehmigungsverfahren. Verlangt wird die
Vertragsstelle, nicht der Marketingtext, und die Klärung, ob die Zusage auch für Zwischenspeicher
zur Missbrauchserkennung gilt und für welchen Zeitraum diese vorgehalten werden.*

## 4. Subunternehmerkette

| Ebene | Dienstleister | Leistung | Sitz/Region | Bekannt seit | Zustimmungspflichtig? |
|---|---|---|---|---|---|
| 1 | `<Hauptanbieter>` | `<…>` | `<…>` | `<…>` | — |
| 2 | `<z. B. Infrastrukturanbieter>` | `<…>` | `<…>` | `<…>` | `<…>` |
| 3 | `<…>` | `<…>` | `<…>` | `<…>` | `<…>` |

| Frage | Antwort |
|---|---|
| Wie erfahren Sie von einem Wechsel in der Kette? | `<…>` |
| Widerspruchs- oder Kündigungsrecht bei Wechsel? | `<…>` |
| Ist die Kette über die zweite Ebene hinaus transparent? | `<ja/nein — falls nein: als Restrisiko führen>` |

## 5. Konzentrationsrisiko

DORA verlangt in **Art. 29** eine vorherige Bewertung des IKT-Konzentrationsrisikos auf
Unternehmensebene.

| Frage | Bewertung |
|---|---|
| Wie viele weitere Ihrer Anwendungen nutzen denselben Anbieter? | `<…>` |
| Läuft die Vektordatenbank beim selben Anbieter wie das Modell? | `<…>` |
| Nutzen Anbieter und Subunternehmer dieselbe Infrastruktur? | `<…>` |
| Gibt es eine technisch erprobte Ausweichoption? | `<…>` |
| Bewertung des Konzentrationsrisikos | `<…>` |

*Bei Sprachmodellen ist das Konzentrationsrisiko real und marktweit: Die Zahl leistungsfähiger
Anbieter ist klein, und die Ausweichoption ist selten „ein anderer Anbieter mit gleichem
Verhalten". Halten Sie fest, was ein Wechsel praktisch bedeutet — regelmäßig Neubewertung der
Antwortqualität und erneutes Testen nach [`06`](06-testnachweise.md), nicht nur eine geänderte
Schnittstelle.*

## 6. Exit-Strategie

| Frage | Antwort |
|---|---|
| Auslöser für einen Exit | `<Kündigung, Preisänderung, Vorfall, aufsichtliche Anordnung, Anbieterausfall>` |
| Zielzustand nach Exit | `<anderer Anbieter / lokal betriebenes Modell / Abschaltung des Dienstes>` |
| Übergangsfrist (vertraglich) | `<…>` |
| Was muss migriert werden? | `<Index? Prompts? Konfiguration? Protokolle?>` |
| Was ist **nicht** migrierbar? | `<z. B. anbieterspezifisches Antwortverhalten>` |
| Rückgabe und Löschung der Daten beim Anbieter | `<Verfahren, Nachweis>` |
| Erprobt? | `<ja/nein — Datum, Umfang, Evidenz>` |
| Geschätzter Aufwand und Dauer | `<…>` |

**Der Punkt, an dem Exit-Strategien in der Prüfung durchfallen.** *Ein Exit, der nur als Absicht
beschrieben ist, wird als nicht vorhanden bewertet. Ein realistischer, kleiner Nachweis schlägt
eine große Behauptung: etwa der dokumentierte Testlauf des Referenzfragenkatalogs
([`06`](06-testnachweise.md)) gegen ein Ausweichmodell, mit dem gemessenen Qualitätsunterschied.
Das ist kein vollständiger Exit-Test, aber es ist Evidenz — und es beantwortet die Frage, ob der
Wechsel überhaupt tragfähig wäre.*

## 7. Datenschutz-Schnittstelle

| Frage | Antwort | Verweis |
|---|---|---|
| Auftragsverarbeitung nach Art. 28 DSGVO geregelt? | `<…>` | [`02`](02-dsfa-baustein-rag.md) |
| Drittlandbezug vorhanden? | `<…>` | |
| Grundlage der Übermittlung (Art. 44–49 DSGVO) | `<Angemessenheitsbeschluss / geeignete Garantien / …>` | |
| Zugriffsmöglichkeiten aus Drittstaaten (auch Support und Betrieb) | `<…>` | |
| Ergänzende Maßnahmen | `<…>` | |

*Die praktisch relevante Frage ist selten der Speicherort, sondern der **Zugriff**: Ein in der EU
gehosteter Dienst mit weltweitem Support-Zugriff ist datenschutzrechtlich etwas anderes als ein
Dienst, dessen Betrieb ausschließlich in der EU stattfindet. Fragen Sie den Anbieter nach der
Support- und Betriebsorganisation, nicht nur nach der Region.*

## 8. Steuerung im Regelbetrieb

| Gegenstand | Verfahren | Turnus | Verantwortlich |
|---|---|---|---|
| Leistungsüberwachung / SLA | `<…>` | `<…>` | `<…>` |
| Prüfung von Nachweisen des Anbieters (Zertifikate, Berichte) | `<…>` | `<…>` | `<…>` |
| Überprüfung der Subunternehmerkette | `<…>` | `<…>` | `<…>` |
| Neubewertung der Einstufung | `<…>` | `<…>` | `<…>` |
| Aktualisierung des Registereintrags | `<…>` | `<…>` | `<…>` |
| Wiederholung des Exit-Nachweises | `<…>` | `<…>` | `<…>` |

## 9. Ergebnis

| Feld | Inhalt |
|---|---|
| Bewertung insgesamt | `<…>` |
| Restrisiken | `<wandern in [`07`](07-freigabevorlage.md)>` |
| Auflagen | `<…>` |
| Empfehlung | `<Bezug befürwortet / unter Auflagen / abgelehnt>` |
| Wiedervorlage | `<…>` |

---

## Was die prüfende Funktion hier typischerweise fragt

1. **„Ist der LLM-Anbieter im Informationsregister erfasst — und wer sind seine
   Subunternehmer?"** Die erste Frage im DORA-Kontext, und der häufigste Befund: Die Bewertung
   wurde im KI-Projekt geführt und ist nie im Auslagerungsprozess angekommen.
2. **„Unterstützt der Dienst eine kritische oder wichtige Funktion — und wie haben Sie das
   begründet?"** Beide Antworten sind vertretbar; nicht vertretbar ist eine Einstufung ohne
   dokumentierte Begründung.
3. **„Zeigen Sie mir die Vertragsstelle, aus der sich ergibt, dass Ihre Inhalte nicht zum
   Training verwendet werden."** Der Test darauf, ob V4 belegt oder nur geglaubt ist.
4. **„Ihre Exit-Strategie — was davon wurde erprobt?"** Trennt beschriebene von belegter
   Ausstiegsfähigkeit.
5. **„Was passiert, wenn der Anbieter das Modell austauscht?"** Verbindet Auslagerungssteuerung
   mit dem Änderungswesen aus [`04`](04-betriebskonzept.md) — die Stelle, an der beide Dokumente
   auseinanderlaufen, wenn sie getrennt geschrieben wurden.

## Offene Punkte

- `<Was noch offen ist — mit Verantwortlichem und Zieltermin.>`
- `<Beispiel: Subunternehmerkette ist ab der dritten Ebene nicht transparent; als Restrisiko in
  07 geführt, Nachfrage beim Anbieter bis TT.MM.JJJJ.>`
- `<Beispiel: Exit bislang nicht erprobt; Testlauf des Referenzfragenkatalogs gegen ein
  Ausweichmodell terminiert auf TT.MM.JJJJ.>`
- Prüfen Sie vor Verwendung, welcher aufsichtliche Rahmen für Ihr Haus gilt (DORA, MaRisk AT 9
  für Auslagerungen ohne IT-Bezug, BAIT für Übergangsadressaten bis 31.12.2026) — die
  Einordnung ändert die Anforderungen an dieses Dokument.

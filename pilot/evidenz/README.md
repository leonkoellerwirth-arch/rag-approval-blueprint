# Evidenz — die Artefakte, die eine Prüfung tatsächlich sehen will

> ⚠️ **Fiktives Institut, realer Prozess.** Nordwind Bank AG ist frei erfunden. Siehe
> [`../00-fallbeschreibung.md`](../00-fallbeschreibung.md).

Der Kontrollkatalog verlangt zu jeder Kontrolle ein **Evidenz-Artefakt**. Die Prüfhandlungen sind
darauf zugespitzt: *„Lasse dir das Rohprotokoll zeigen — nicht die Zusammenfassung."*
[`akte/06-testnachweise.md`](../akte/06-testnachweise.md) definiert dafür ein Format mit dreizehn
Feldern.

Dieser Ordner enthält die **ausgefüllten Muster** dazu. Ohne sie würde dieses Repository genau
das tun, was es anderen vorwirft: ein Format fordern und selbst nur behaupten, es einzuhalten.

## Die Muster

| Datei | Kontrolle | Was daran zu lernen ist |
|---|---|---|
| [`NORA-LP-2026-014.md`](NORA-LP-2026-014.md) — Löschprotokoll | `LOE-01`, `LOE-02` | Dokumentiert eine Löschung, die **nicht** vollständig nachweisbar war. V1 funktional grün, V2 physisch rot — mit den Zahlen, die das belegen. |
| [`NORA-TP-T1-20260306.md`](NORA-TP-T1-20260306.md) — Testprotokoll Negativ-Retrieval | `ZUG-01` | Der Nachtest zu einem gescheiterten Test: Anfragen im Wortlaut, Systemantwort im Wortlaut, Positivkontrolle und der Bezug auf den Vorbefund. |
| [`NORA-TP-T8-20260616.md`](NORA-TP-T8-20260616.md) — Testprotokoll Kill-Switch | `BET-03` | Wie kurz ein tragfähiges Protokoll sein darf — und welche vier Angaben trotzdem nicht fehlen dürfen. |

## Die vier Eigenschaften, die ein Evidenz-Artefakt tragfähig machen

**1. Es enthält Rohdaten, nicht nur ein Ergebnis.** Anfragewortlaut, Systemantwort im Wortlaut,
gemessene Werte. Ein Häkchen neben „bestanden" ist keine Evidenz, sondern eine Behauptung mit
Formatierung.

**2. Es benennt die Umgebung und den Systemstand.** Ein Berechtigungstest in einer Umgebung mit
Testrollen belegt nichts über die Produktion. Ohne Versionsstand ist der Test nicht
reproduzierbar — und damit als Nachweis über die Zeit wertlos.

**3. Es sagt, wer geprüft hat.** Ein Test, den die Entwicklung an ihrer eigenen Arbeit durchführt,
wird regelmäßig nicht als unabhängiger Nachweis akzeptiert. Wer geprüft und wer nur begleitet hat,
gehört ins Protokoll.

**4. Es darf ein negatives Ergebnis festhalten.** Das ist die unbequemste und wichtigste
Eigenschaft. `NORA-LP-2026-014` ist deshalb das lehrreichste Dokument in diesem Ordner: Es hält
fest, dass die Löschung im Index nicht belegt werden konnte, benennt die Zahl, die es beweist,
und überführt den Befund in eine Auflage mit Frist. **Ein Prüfungsverlauf ohne ein einziges
„nicht bestanden" ist selbst ein Befund** — dann wird nämlich das Testverfahren geprüft und nicht
mehr das System.

## Was hier bewusst nicht steht

- **Keine Inhalte aus vertraulichen Dokumenten.** Die Protokolle nennen Kennung und Titel des
  geprüften Objekts, aber nicht, was darin steht. Der Nachweis der Vertraulichkeit darf kein
  neues Vertraulichkeitsproblem erzeugen.
- **Keine Screenshots.** Sie sind in der Praxis verbreitet und als alleinige Evidenz schwach:
  nicht durchsuchbar, nicht überprüfbar, ohne Systemstand. Wo eine Oberfläche der Befund ist —
  wie bei der Quellenangabe in T1 —, steht ihr Inhalt als Zitat im Protokoll.
- **Nicht alle zwölf Testnachweise.** Drei Muster reichen, um das Format zu zeigen; die übrigen
  sind in [`akte/06-testnachweise.md`](../akte/06-testnachweise.md) mit Ergebnis und Datum
  geführt. Ein Repository, das alles ausformuliert, wird nicht vollständiger, sondern unlesbar.

## Offene Punkte

- Für die Kontrollen der Domänen `KLA` und `AUD` liegt kein Mustertext vor; deren Evidenz sind
  Verzeichnisse und Auswertungen, die sich schlecht als Einzeldokument abbilden lassen.
- Die Protokolle sind Markdown. In der Praxis entstehen sie im Werkzeug, das den Test ausführt,
  und werden in ein revisionssicheres Ablagesystem übernommen — die Form ist zweitrangig, die
  dreizehn Felder sind es nicht.

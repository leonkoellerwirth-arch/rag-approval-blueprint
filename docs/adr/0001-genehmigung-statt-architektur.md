# ADR 0001 — Genehmigung statt Architektur

**Status:** angenommen · **Datum:** 2026-07-19

## Kontext

Wer heute nach „RAG" und „reguliert" sucht, findet reichlich gute Arbeit: Pattern-Bibliotheken
mit identitätsbezogenem Retrieval und Filtern gegen die OWASP-LLM-Risiken, Blueprints von
Anbietern mit Policy-Engines und Verschlüsselung, generische Mappings auf GDPR, NIST und
ISO/IEC 42001, und Referenzarchitektur-Beiträge in großer Zahl. Diese Arbeiten beantworten die
Frage: **Wie baue ich ein konformes RAG-System?**

In einem BaFin-regulierten Haus ist das aber nicht die Frage, an der Vorhaben scheitern. Dort
ist das System typischerweise fertig — und steht dann. Es steht, weil zehn Funktionen es aus
zehn Blickwinkeln bewerten, weil jede von ihnen ein Dokument erwartet, das niemand vorbereitet
hat, und weil der nächste Gremientermin in sechs Wochen ist. Die eigentliche Frage lautet:
**Wie bekomme ich es freigegeben?**

Zu dieser Frage existiert öffentlich praktisch nichts. Es gibt keine Freigabeakte, keine
ausformulierten Prüfhandlungen, keinen durchgespielten Fall.

## Entscheidung

Dieses Repository behandelt **ausschließlich den Weg von der fertigen Architektur zur formalen
Freigabe**. Es liefert die Dokumente, die die prüfenden Funktionen verlangen, in der Sprache, in
der sie sie verlangen.

Es baut **keine** weitere Referenzarchitektur (ein einziges Kontextdiagramm im README, damit die
Artefakte verortet sind), **keine** Filter- oder Security-Bibliothek und **keine** Tiefe zu
US-Rahmenwerken. Vorhandene Arbeiten werden verlinkt und korrekt beschrieben — als
Implementierungsoptionen, nicht als Konkurrenz.

Der Satz, an dem sich jede künftige Änderung messen lassen muss:

> **Everyone shows you how to build compliant RAG. This repo shows you how to get it approved.**

## Begründung

1. **Die Lücke ist real und überprüfbar.** Die Bauseite ist gut abgedeckt; die Genehmigungsseite
   nicht. Ein weiteres Pattern-Repo wäre das zwanzigste, dieses ist das erste seiner Art.
2. **Die Glaubwürdigkeit liegt auf der Genehmigungsseite.** Der Autor hat auf der genehmigenden
   Seite gesessen. Perspektive lässt sich nicht recherchieren; Architekturwissen schon.
3. **Der Nutzen ist unmittelbar.** Wer die Freigabeakte kopiert und ausfüllt, spart Wochen. Wer
   eine Referenzarchitektur liest, hat einen Nachmittag lang etwas gelernt.

## Konsequenzen

- **Abgrenzung ist Pflicht, nicht Höflichkeit.** Jede Anfrage nach „noch etwas Architektur" wird
  gegen diesen ADR geprüft. Der Umfang eines Repos, das alles ein bisschen macht, wächst, sein
  Nutzen nicht.
- Der Nutzen bemisst sich daran, ob jemand ein Artefakt in einer echten Freigabe verwendet hat —
  nicht an Sternen.
- Das Repository lebt vom **Pilot**: Ohne einen durchgespielten Fall bleibt es ein
  Vorlagensatz. Deshalb ist der Pilot Release-Bedingung für v0.1.0.
- Wir konkurrieren nicht mit den Bau-Repos, wir schließen an sie an. Wer Kontrollen aus dem
  Katalog technisch umsetzen will, wird an genau diese Arbeiten verwiesen.

## Verworfene Alternativen

- **Beides abdecken (Architektur + Genehmigung).** Verworfen: Der Architekturteil wäre schwächer
  als das Vorhandene und würde die Aufmerksamkeit vom Alleinstellungsmerkmal abziehen.
- **Nur der Kontrollkatalog.** Verworfen: Ein Katalog ohne Freigabeakte lässt genau die Frage
  offen, wegen der Vorhaben stehen — welches Dokument wem vorgelegt wird.

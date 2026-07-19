# ADR 0004 — Löschnachweis statt Löschversprechen

**Status:** angenommen · **Datum:** 2026-07-19

## Kontext

In fast jeder Freigabeakte zu einem RAG-System steht ein Satz wie: *„Bei einem Löschverlangen
wird das Dokument aus der Wissensbasis entfernt."* Der Satz ist gut gemeint und in aller Regel
nicht belegt. Er stützt sich auf einen API-Aufruf gegen die Vektordatenbank, dessen Rückgabewert
„erfolgreich" lautet.

Was dieser Aufruf tatsächlich bewirkt, ist eine andere Frage. In verbreiteten
HNSW-Implementierungen setzt er eine Löschmarkierung; die Vektoren selbst verbleiben physisch in
der Indexdatei, bis eine Kompaktierung oder ein Neuaufbau erfolgt. Dass daraus Inhalte
rekonstruierbar sind, ist inzwischen nicht mehr nur theoretisch: Die Arbeit *Ghost Vectors:
Soft-Deleted Embeddings Remain Reconstructible in HNSW Vector Databases* (arXiv:2606.18497,
16.06.2026) zeigt die Wiederherstellung unter Umgehung der API auf Speicherebene und die
anschließende Rekonstruktion personenbezogener Inhalte mit einem Inversionsmodell.

Damit ist die Löschung die Stelle, an der eine sonst saubere Freigabeakte in der Prüfung
aufreißt — und zwar erst dann, wenn jemand die richtige Frage stellt.

## Entscheidung

Dieses Repository behandelt Löschung als **Nachweispflicht**, nicht als Zusage. Konkret:

1. **Löschung wird als Ableitungskette modelliert**, nicht als Vorgang — acht Stationen von der
   Quelle über Fragmente, Embeddings, Index und Metadaten bis zu Caches, Sicherungen und
   Protokollen (`docs/loeschnachweis.md`).
2. **Der Vektorindex bekommt drei getrennte Verifikationsschritte**, weil ein einzelner nicht
   trägt:
   - **V1 funktional** — Negativ-Retrieval vor und nach der Löschung. Notwendig, aber *nicht
     hinreichend*: Dieser Test ist auch dann grün, wenn nur eine Markierung gesetzt wurde.
   - **V2 physisch** — Inspektion auf Indexebene: Elementanzahl, markierte Einträge, Dateigröße.
   - **V3 Unumkehrbarkeit** — erzwungene Kompaktierung, Neuaufbau oder Krypto-Shredding
     (Epoch Key Rotation).
3. **Ein Löschprotokoll-Template** ist das Evidenz-Artefakt für die Kontrollen `LOE-01` und
   `LOE-02`.
4. **Wo die Ebene nicht einsehbar ist** — typischerweise bei einem verwalteten Vektordienst —
   wird das ausdrücklich als solches dokumentiert: schriftliche Anbieterauskunft einholen,
   Aussage in die Auslagerungsbewertung aufnehmen, verbleibende Unsicherheit als Restrisiko in
   die Freigabevorlage schreiben. Keine Beruhigungsformel.

## Begründung

1. **„Verifizierbar" und „unumkehrbar" sind zwei Eigenschaften.** Die meisten Löschkonzepte
   belegen die erste und behaupten die zweite. Beide getrennt zu fordern, ist der ganze
   Unterschied.
2. **Der funktionale Test ist eine Falle.** Er ist einfach, überzeugend und grün — und er prüft
   genau die Ebene, die das Problem verdeckt. Diesen Zusammenhang explizit zu machen, ist der
   wertvollste Beitrag dieses Dokuments.
3. **Es ist die Kontrolle mit dem größten Prüfungsrisiko.** Ein Berechtigungsfehler fällt im
   Betrieb auf. Eine unvollständige Löschung fällt niemandem auf — bis sie geprüft wird.
4. **Der Forschungsanschluss macht die Frage unbestreitbar.** Solange die Sache theoretisch
   klang, war sie verhandelbar. Mit einer zitierbaren Arbeit ist sie es nicht mehr.

## Konsequenzen

- **Der Pilot bleibt an dieser Stelle rot.** `LOE-02` ist eine der zwei roten Kontrollen im
  durchgespielten Fall — funktional grün, auf Indexebene unbelegt. Das ist der realistische
  Erstbefund und wird nicht geglättet.
- **Adressierbarkeit wird zur Architekturanforderung.** Ohne Rückverknüpfung jedes Fragments und
  Vektors zur Quelle ist gezielte Löschung technisch unmöglich. Das muss vor dem Bau entschieden
  werden, nicht im Betrieb.
- **Restore wird zu einem datenschutzrelevanten Vorgang.** Nach jeder Wiederherstellung sind die
  zwischenzeitlichen Löschverlangen erneut anzuwenden — ein Prüfschritt im Wiederanlaufplan, der
  in klassischen Notfallkonzepten fehlt.
- **Das zitierte Papier ist neu.** Es ist als starker Hinweis auf eine Fragestellung behandelt,
  nicht als abschließender Stand; Begutachtungsstand und Folgearbeiten sind in den „Offenen
  Punkten" von `docs/loeschnachweis.md` vermerkt und vor Verwendung zu aktualisieren.

## Verworfene Alternativen

- **Krypto-Shredding als einzige empfohlene Lösung.** Verworfen: Es verschiebt das Problem in das
  Schlüsselmanagement und wirkt nur, wenn wirklich kein Schlüsselbackup existiert. Es ist eines
  von drei Mustern, nicht die Antwort.
- **Die Frage auf den Anbieter verschieben.** Verworfen: Verantwortlicher im Sinne des
  Datenschutzrechts bleibt das Institut. Eine Anbieterzusage ist Evidenz, kein Ersatz für das
  Verfahren.

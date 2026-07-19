# HANDOFF — rag-approval-blueprint

Session handoffs, **newest entry first**. Written by `/session-stop` (via
`scripts/session-snapshot.sh`). Read the top entry at `/session-start`.

## 2026-07-19 — Session 3: v0.3.0, Evidenz-Ebene und Revisionssicht

_gate PASS · 20 Tests · 23 Kontrollen · 8 Vorlagen · 2 Piloten · 3 Evidenz-Muster_

- **Done:** `pilot/evidenz/` (Löschprotokoll + zwei Testprotokolle im Evidenzformat),
  `pilot/revision/` (Prüfprogramm + Prüfungsbericht), sechs Ordner-READMEs, Release v0.3.0.
- **Der Auslöser:** Beim Prüfen der Frage „haben wir für alle Zielgruppen Beispiele?" kam heraus,
  dass der Pilot **sieben Evidenz-IDs referenzierte, von denen keine existierte** — bei einem
  Repository, dessen Prüfhandlungen wörtlich das Rohprotokoll verlangen. Das war der Widerspruch
  zur eigenen These, nicht eine Vollständigkeitslücke.
- **Decided:**
  - **INV-10:** kein gefordertes Artefakt ohne Muster. Wer ein Format definiert, muss es zeigen.
  - **Das Löschprotokoll-Muster dokumentiert bewusst einen nicht bestandenen Schritt.** Ein
    Muster, in dem alles glattgeht, zeigt nicht, wofür das Format da ist.
  - **Die wesentliche Feststellung des Prüfungsberichts ist keine der bekannten Auflagen**,
    sondern eine neue Datenquelle am Änderungsverfahren vorbei — weil die Abgrenzung „neue
    Quelle" gegen „einzelne Dokumente" kein prüfbares Merkmal hatte. Das ist die realistischste
    Art, wie eine Kontrolle im Betrieb erodiert.
  - **GitHub Pages bewusst NICHT aktiviert** — Mermaid rendert auf github.com, nicht unter
    Jekyll. Ein Doku-Site hätte die Lesbarkeit verschlechtert; ein JS-Include wäre neuer Code
    gegen INV-8. Navigation stattdessen über Ordner-READMEs.
- **Open:**
  - Keine Muster für die Domänen `KLA` und `AUD` — deren Evidenz sind Verzeichnisse und
    Auswertungen, die sich schlecht als Einzeldokument abbilden lassen.
  - Weiterhin kein Fall, in dem ein Gremium **gegen** seine Kontrollfunktionen entscheidet.
- **Next:** Der Gremium-entscheidet-dagegen-Fall bleibt der stärkste Kandidat für v0.4.0.
- **Continuity warnings:**
  - **INV-10 gilt ab jetzt:** Wer eine neue Evidenz-ID in einem Pilot erwähnt, muss die Datei
    unter `pilot/evidenz/` anlegen. Ein Verweis ins Leere ist genau der Fehler, den das Repo
    anderen vorwirft.
  - Ordner-READMEs enthalten Zählwerte (8 Vorlagen, 23 Kontrollen, 10 Akteure) — bei Änderungen
    mit grep alle Stellen suchen.
  - Pages bleibt deaktiviert; die Begründung steht im BIBLE-Entscheidungsregister.

## 2026-07-19 — Session 2: v0.2.0, both v0.1.0 gaps closed

_gate PASS · 20 tests green · 23 controls · 8 akte templates · 2 pilots_

- **Done:** Closed both gaps v0.1.0 named in its own known limitations.
  `akte/08-mitbestimmung-betriebsvereinbarung.md` + control `AUD-04` + a filled pilot version;
  `pilot-abgelehnt/` (Südhafen Direktbank AG) as a second worked case that ends in refusal.
  Propagated the counts and the diagram everywhere; released v0.2.0.
- **Decided:**
  - **The briefing's seven-part Freigabeakte is now eight parts.** A deliberate extension beyond
    the briefing, recorded in `BIBLE.md`. Justified by v0.1.0's own limitation list.
  - **The second pilot does not re-fill all eight templates** — only case, assessment and
    submission. Re-filling would be repetition; the value is the refusal, not the paperwork.
  - **No model wording for the Betriebsvereinbarung.** A template text invites copying; a works
    agreement has to fit the system. A sixteen-point checklist takes its place.
  - **INV-9 added:** every pilot assesses every control, enforced by test. Adding a control now
    means updating both assessments — that is intentional friction.
- **Open:**
  - BetrVG § 87 Abs. 1 Nr. 6 **objective-suitability** interpretation rests on concurring
    secondary sources, not a single decision read in full. Flagged in `docs/quellen.md` and in the
    template's Offene Punkte.
  - Personalvertretungsrecht (Sparkassen, Landesbanken, Anstalten) deliberately not worked up.
  - Neither pilot shows a committee overruling its control functions — the hardest case of all.
    Sketched in `pilot-abgelehnt/07-freigabevorlage-final.md`, not worked out.
- **Next:** Announce v0.2.0. If a v0.3.0 follows, the strongest candidate is the
  committee-overrules-the-experts case, because it is the situation with the least public
  guidance and the highest personal stakes for the person documenting it.
- **Continuity warnings:**
  - `controls/controls.md`, `pilot/readiness-report.md` and `pilot-abgelehnt/readiness-report.md`
    are **generated**. Never hand-edit; change the YAML and re-render or the drift tests fail.
  - A new control requires an entry in **both** assessments (INV-9).
  - The counts "23 controls" / "eight templates" / "ten actors" appear in README, executive
    summary, CLAUDE.md and both pilots. Changing one means grepping for all.

## 2026-07-19 — Session 1: M0–M8 built, v0.1.0 released

_gate PASS · 16 tests green · 22 controls · pilot complete_

- **Done:** The whole briefing, M0 through M8. Onboarded to `dev/base` (additive `base sync`);
  dual licensing; the seven-part Freigabeakte; 22 controls with Prüfhandlung + Evidenz plus
  `tools/render_controls.py` (249 lines, 16 tests); the Löschnachweis protocol; the supervisory
  mapping; `docs/quellen.md`; the audience matrix; the complete Nordwind pilot; README, English
  executive summary, four ADRs; release v0.1.0.
- **Decided:**
  - **BAIT/VAIT are historical, DORA is binding.** Verified during the build that VAIT/KAIT/ZAIT
    were repealed effective end of 16.01.2025 and BAIT is fully repealed end of 31.12.2026. The
    mapping leads with DORA + MaRisk and keeps BAIT only as audit vocabulary. The briefing had
    assumed BAIT/VAIT were current; this is the single biggest deviation from it and it is
    recorded in `BIBLE.md`.
  - **The EU AI Act is deliberately not mapped** — general application 02.08.2026, and the
    high-risk classification of an internal assistant is a case-by-case Annex III test. A
    plausible guess would be more damaging than an open gap.
  - **`docs/quellen.md` ships publicly**, including the citations that could NOT be verified.
    The verification trail is itself part of the credibility argument.
  - The pilot keeps 2 red controls, a failed first test and a documented inter-function conflict.
- **Open:**
  - **BAIT chapter names are secondary-source only** — the BaFin PDF was not machine-readable.
    They are labelled as an orientation aid everywhere they appear. Worth verifying by hand
    against Rundschreiben 10/2017 (BA) before anyone quotes them.
  - **9th MaRisk amendment (June 2026)** — circular number and entry into force unconfirmed; all
    MaRisk references point to Circular 06/2024.
  - No co-determination building block; no rejected-case pilot run. Both noted in the README's
    known limitations.
- **Next:** Announce (LinkedIn article "Euer RAG scheitert nicht an der KI — es scheitert an der
  Freigabeakte"), pin the repo, submit to awesome-lists. If a v0.2.0 follows, the two highest-value
  additions are the Mitbestimmung/Betriebsvereinbarung building block and a second pilot run that
  ends in "keine Freigabe".
- **Continuity warnings:**
  - `controls/controls.md` and `pilot/readiness-report.md` are **generated**. Never hand-edit
    them; change `controls/controls.yaml` or `pilot/controls-assessment.yaml` and re-render, or
    the drift tests fail.
  - The internal briefing `CLAUDE-CODE-BRIEFING-*.md` is git-ignored and `scripts/gate.sh` fails
    if it is ever tracked. Keep it that way.
  - Regulatory references carry retrieval dates. Anything cited here should be re-checked before
    it goes into a real submission — the repo says so publicly, and it should stay true.

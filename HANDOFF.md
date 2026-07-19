# HANDOFF — rag-approval-blueprint

Session handoffs, **newest entry first**. Written by `/session-stop` (via
`scripts/session-snapshot.sh`). Read the top entry at `/session-start`.

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

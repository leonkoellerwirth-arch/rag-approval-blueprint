# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) ·
Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] — 2026-07-19

Closes the gap the repository had against its own thesis: it demanded evidence and never showed
any.

### Added

- **`pilot/evidenz/`** — the filled specimens of the artifacts the Prüfhandlungen ask for. Until
  now the pilot referenced seven evidence IDs and **none of them existed**, while
  `akte/06-testnachweise.md` insisted on "the raw protocol, not the summary". That was the exact
  defect this repository criticises in others.
  - `NORA-LP-2026-014` — a deletion protocol that documents an erasure which could **not** be
    proven: V1 functionally green, V2 physically red, with the numbers that show it (38.420
    physical index entries before and after, tombstones from 6 to 47, file size unchanged). It is
    the most instructive document in the repository precisely because it records a failure.
  - `NORA-TP-T1-20260306` — the negative-retrieval test in the full thirteen-field evidence
    format: query wording, verbatim system responses, a positive control, the retrieval log
    proving non-permitted fragments were never fetched, and the reference to the failed first run.
  - `NORA-TP-T8-20260616` — the kill-switch test, deliberately short, to show how little a
    load-bearing protocol needs and which four details it still cannot omit.
- **`pilot/revision/`** — internal audit's own output, the one actor whose work product was
  missing.
  - A risk-based audit programme selecting 9 of 23 controls, with the criteria for that selection
    and one audit procedure that checks whether the **board submission's own figures** hold.
  - The report: four findings, one material — and it is not one of the known conditions but a new
    data source that entered the knowledge base past the change process, because the boundary
    between "new source" and "additional documents" was never defined by a testable criterion.
- **Folder READMEs** for `akte/`, `controls/`, `pilot/`, `pilot-abgelehnt/`, `docs/` and
  `pilot/evidenz/` as entry points into 47 files and 67,000 words.

### Changed

- Referenced evidence IDs now resolve to real files; `docs/loeschnachweis.md` and
  `akte/06-testnachweise.md` link the worked specimens.
- Internal audit's section in `docs/who-uses-this.md` now points at its own artifacts.
- New invariant **INV-10**: no demanded artifact without a specimen.

### Deliberately not done

- **GitHub Pages was not enabled.** The README context diagram and the deletion chain are
  Mermaid; github.com renders them natively, Jekyll on Pages does not. A docs site would have
  made the repository *less* readable, and the JS include needed to fix that would be new code
  against INV-8. The navigation problem is solved with folder READMEs instead.
- **No UI.** One tool, under 250 lines, is the whole code budget (INV-8).

### Known limitations

Unchanged from v0.2.0, plus:

- **No specimens for the `KLA` and `AUD` domains.** Their evidence consists of registers and
  evaluations that do not lend themselves to a single example document.
- **The audit report is dated after the current date** (16.10.2026), as are parts of both pilot
  timelines. The fictional cases run into late 2026 and early 2027 by construction.

## [0.2.0] — 2026-07-19

Closes both gaps that v0.1.0 named in its own known limitations.

### Added

- **`akte/08-mitbestimmung-betriebsvereinbarung.md`** — the co-determination building block. In
  practice the works-council strand is the longest one in a real approval, and there was no
  template for it. Covers applicability (including the fact that public-law institutions fall
  under Personalvertretungsrecht instead), why co-determination applies at all, the procedure from
  information duty to signature, and a sixteen-point checklist of what a works agreement must
  regulate. Deliberately ships **no model wording** for the agreement itself.
- **Control `AUD-04`** — Mitbestimmung und Zweckbindung der Protokollierung, with an audit
  procedure that compares the agreement's subject matter against the logging actually configured,
  not the logging described.
- **`pilot-abgelehnt/`** — a second worked case that receives **no approval**. Südhafen Direktbank
  AG (fictional) wants a customer-facing assistant answering questions about customers' own
  contracts and transactions: 4 green, 11 yellow, 8 red. Three red controls cannot be healed by a
  deadline because they are construction decisions — entitlement filtering happens after retrieval
  rather than before, customer data goes to a US-only provider without a transfer impact
  assessment, and erasure is unprovable because the managed index vendor will not say whether
  anything is physically removed. Includes the submission that documents a defensible No, the
  sponsor's dissent in full, and five conditions under which the project would become approvable.
- **Betriebsrat / Personalvertretung** as the tenth actor in `docs/who-uses-this.md`.
- Tests: each pilot's readiness report is checked against its assessment, and every pilot must
  assess every control in the catalogue (INV-9).

### Changed

- The Freigabeakte now has **eight** parts; the control catalogue **23** controls.
- The Nordwind pilot gained a filled `akte/08` and is assessed against `AUD-04`; its result moves
  from 15/5/2 to **16 green, 5 yellow, 2 red**.
- README context diagram shows both outcomes — approval under conditions and refusal — and the
  co-determination strand running in parallel from day one.

### Verified references added (July 2026)

- **BetrVG** § 87 Abs. 1 Nr. 6 (verbatim), § 90 Abs. 1 Nr. 3, § 80 Abs. 3 Satz 2, § 95 Abs. 2a,
  § 77 Abs. 2/3. Notable finding: the legislator addresses artificial intelligence **explicitly**
  in three of these — the information duty covers "den Einsatz von Künstlicher Intelligenz", and
  an expert counts as necessary when the works council must assess AI.
- **GDPR** Art. 16, 18, 21 and 88, which earlier revisions had used without verification.

### Known limitations

Unchanged from v0.1.0 except where closed above, and with two additions:

- **Personalvertretungsrecht is out of scope** — `akte/08` cites the BetrVG only; the federal and
  state staff representation acts that apply to Sparkassen, Landesbanken and Anstalten differ per
  state and are not worked up.
- **Neither pilot shows a committee overruling its own control functions.** Both follow the
  recommendation. The harder case is sketched but not worked out.
- That for § 87 Abs. 1 Nr. 6 BetrVG the **objective suitability** standard applies is settled case
  law, but is evidenced here through concurring secondary sources rather than a single decision
  read in full.

## [0.1.0] — 2026-07-19

First public release. The scope is deliberately narrow: the path from a finished RAG architecture
to formal sign-off in a BaFin-regulated institution. Nothing about how to build one.

### Added

- **Freigabeakte (`akte/01`–`akte/07`)** — the seven fillable templates an institution needs:
  Schutzbedarfsfeststellung, RAG-specific DSFA building block, ICT third-party/outsourcing
  assessment, Betriebskonzept, Notfallkonzept, Testnachweise, and the two-page Freigabevorlage.
  Each names the actor who uses it and the process it belongs to, ends with "Was die prüfende
  Funktion hier typischerweise fragt", and carries its own open questions.
- **Kontrollkatalog (`controls/controls.yaml` → `controls/controls.md`)** — 22 controls across 6
  domains. Every control carries four mandatory fields: Kontrollziel, a written-out
  **Prüfhandlung**, the **Evidenz-Artefakt**, and the supervisory mapping.
- **`tools/render_controls.py`** — 249 lines, ruff-clean, 16 tests. Renders the catalogue and a
  readiness report from an assessment file. A test fails if the committed Markdown drifts from
  the YAML.
- **Löschnachweis-Protokoll (`docs/loeschnachweis.md`)** — erasure as a chain across eight
  stations, with three separate verification steps for the vector index, a fillable deletion
  protocol, and the ghost-vectors research connection.
- **Aufsichts-Mapping (`docs/mapping-bait-vait-dora.md`)** — requirement → control → evidence.
- **Zielgruppen-Matrix (`docs/who-uses-this.md`)** — nine actors, bilingual.
- **Pilot (`pilot/`)** — Nordwind Bank AG (fictional) taken end to end: case description, all
  seven templates filled in, control assessment with 2 red and 5 yellow controls, rendered
  readiness report, and the board submission in both its working and its final two-page form.
- **`docs/quellen.md`** — every citation with verification status and retrieval date.
- **Four ADRs** — approval over architecture, why German, Prüfhandlung as a mandatory field,
  erasure proof over erasure promise.
- **`docs/executive-summary.en.md`** for international readers.
- Dual licensing (MIT for code, CC BY 4.0 for documents), bilingual `DISCLAIMER.md`, and the
  `dev/base` paved-road baseline (hard gate, CI, security configuration, session skills).

### Regulatory status reflected in this release

Verified July 2026: **DORA** (Regulation (EU) 2022/2554) applies since 17.01.2025 and is the
binding frame. **VAIT, KAIT and ZAIT were repealed with effect from the end of 16.01.2025**;
**BAIT** no longer applies to institutions under DORA's ICT risk management and is repealed in
full at the end of 31.12.2026. BAIT is therefore presented throughout as historical vocabulary,
never as an obligation. **MaRisk AT 4.3.5** explicitly requires explainability for models
featuring technological innovation and artificial intelligence.

### Known limitations

- **Not legal advice, not a certification.** See `DISCLAIMER.md`.
- **BAIT chapter names are not verified against the original circular** — the BaFin PDF was not
  machine-readable. They are marked as an orientation aid, not a citation.
- **The 9th MaRisk amendment (June 2026) is not incorporated**; its circular number and entry
  into force could not be confirmed. All MaRisk references are to Circular 06/2024.
- **The EU AI Act is deliberately not mapped.** General application starts 02.08.2026 and the
  high-risk classification of an internal assistant is a case-by-case Annex III test.
- **The ghost-vectors paper (arXiv:2606.18497) is new**; peer-review status and follow-up work are
  unknown. It is treated as a strong pointer, not a settled result.
- **No co-determination building block** (works-council agreement on prompt logging), although in
  practice that is regularly the longest strand of a real approval.
- **The pilot shows no rejected case** — only approval under conditions.
- **The audience matrix assumes a mid-sized institution's separation of functions**; smaller
  houses merge roles, groups add layers.

[0.3.0]: https://github.com/leonkoellerwirth-arch/rag-approval-blueprint/releases/tag/v0.3.0
[0.2.0]: https://github.com/leonkoellerwirth-arch/rag-approval-blueprint/releases/tag/v0.2.0
[0.1.0]: https://github.com/leonkoellerwirth-arch/rag-approval-blueprint/releases/tag/v0.1.0

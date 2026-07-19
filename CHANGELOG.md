# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) ·
Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[0.1.0]: https://github.com/leonkoellerwirth-arch/rag-approval-blueprint/releases/tag/v0.1.0

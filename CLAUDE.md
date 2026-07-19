# CLAUDE.md — rag-approval-blueprint

Read this before doing any work in this repo. It is the local anchor; the binding foundation is
`dev/base/CONSTITUTION.md`, which takes precedence wherever this file disagrees with it.

**Read order at session start (highest precedence first):**
1. `dev/base/CONSTITUTION.md` — the paved-road constitution
2. `BIBLE.md` — this repo's invariants + decision register (wins on any in-repo conflict)
3. `HANDOFF.md` — newest session entry
4. this file

## What this repo is

**Everyone shows you how to build compliant RAG. This repo shows you how to get it approved.**

An approval-artifact repository: the path from a finished RAG architecture to formal sign-off in
a BaFin-regulated institution — through 2nd line of defence, information security, data
protection, and internal audit, up to the board submission. It is **not** another RAG security
pattern library, **not** a reference architecture, and **not** a filter/guardrail codebase.
Those exist and are good; we link them as implementation options and never compete with them.

**Zone:** Bridge / Tool — public, code MIT, documents CC BY 4.0. Reference pattern, not a
framework. Never overclaim it.

## The four core artifacts

| Path | What it is | Language |
|---|---|---|
| `akte/01`–`akte/07` | the Freigabeakte — the fillable template set an institution actually needs | German |
| `controls/controls.yaml` + rendered docs | control catalogue: every control carries **Kontrollziel · Prüfhandlung · Evidenz-Artefakt · Mapping** | English fields |
| `docs/loeschnachweis.md` | verifiable-erasure protocol (ghost vectors in HNSW) | German |
| `docs/mapping-bait-vait-dora.md` | supervisory mapping: requirement → control → evidence | German |
| `pilot/` | one fictional case run end to end — the proof that the set works | German |

## Content rules (this repo lives or dies by them)

1. **Verified references only.** A chapter, article, or paper is cited **only** if it was
   checked against a source during the work, and the citation carries its retrieval date.
   Everything else is phrased generically and listed under "Offene Punkte". One wrong citation
   destroys the entire credibility asset — an honest gap never does.
2. **BAIT/VAIT are historical.** VAIT/KAIT/ZAIT were repealed in January 2025 and BAIT is being
   phased out in favour of DORA. Never present them as the binding source. They remain useful as
   the **vocabulary** German audit functions still speak; say exactly that, with dates.
3. **No client or employer internals.** Every template is newly written from generic supervisory
   logic. The author's biography supplies perspective, never documents. No real institution,
   customer, or engagement is referenced anywhere (`scripts/gate.sh` enforces the name check).
4. **"Not legal advice"** appears in `README.md`, every `akte/` template, and the mapping.
5. **Pilot integrity.** "Nordwind Bank AG" is marked fictional in *every* pilot file. The
   documented conflict and the two red controls stay in — a flawless pilot would be
   unbelievable, and realism is the whole argument.
6. **Every document ends with "Offene Punkte" / "Open questions."** Honest gaps are the
   handwriting of this repo, not a defect.
7. **Respect prior work.** Existing repos and vendor blueprints are linked and described
   accurately, never disparaged, never copied.
8. **Code discipline.** Exactly one tool: `tools/render_controls.py` — under 250 lines, tested,
   ruff-clean. `controls/controls.yaml` is the single source of truth; the rendered Markdown is
   generated, never hand-edited, and a test fails if the two drift.

## Session protocol

- **Start every session with `/session-start`.** It runs `scripts/state.sh`, reads `HANDOFF.md`
  + `BIBLE.md`, and reconstructs the exact state before anything changes.
- **Do not start substantive work while a blocking `BIBLE` decision is open or the gate is red.**
- **End every session with `/session-stop`.** Gate passes → `HANDOFF.md` updated → `BIBLE.md`
  decisions recorded → granular commits → push → `scripts/secure.sh` green.

## The gate is law

`./scripts/gate.sh` must print **GATE: PASS** before any change is called done (ruff, offline
tests, no TODO/secrets/customer names, shellcheck, and the check that the internal briefing is
never tracked). CI mirrors it exactly.

## House rules

- Conventional Commits (`feat: fix: docs: test: chore: ci:`), one concern per commit,
  one commit per milestone.
- Default to inline work; subagents are the exception (CONSTITUTION §9) — with one standing
  exception: **regulatory reference verification may be delegated**, because it is a wide,
  independent research fan-out that returns a summarizable fact sheet.
- Any chat-only idea/decision is saved to `HANDOFF.md` before stop — or it's lost.

## Skills

`/session-start` · `/session-stop` · `/project-state`

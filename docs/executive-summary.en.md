# Executive summary (English)

> **Not legal advice.** See [`../DISCLAIMER.md`](../DISCLAIMER.md).

## The one sentence

**Everyone shows you how to build compliant RAG. This repository shows you how to get it
approved.**

## The gap

Search for "RAG" and "regulated" and you will find good work: security pattern libraries with
identity-scoped retrieval and OWASP-LLM filters, vendor blueprints with policy engines and
encryption, generic mappings to GDPR, NIST and ISO/IEC 42001, reference-architecture write-ups.
All of them answer the same question — *how do I build a compliant RAG system?*

Inside a BaFin-regulated institution, that is not the question projects fail on. There, the
system is usually finished, and then it stops. It stops because ten functions assess it from
ten angles, each expects a document nobody prepared, and the next committee meeting is six
weeks out. The real question is: **how do I get it approved?**

Publicly, almost nothing answers that. No approval file. No written-out audit procedures. No
worked case.

## What is in here

| Artifact | What it is |
|---|---|
| **`akte/01`–`akte/08`** | The *Freigabeakte* — the eight fillable templates an institution actually needs: protection-requirement assessment, RAG-specific DPIA building block, ICT third-party/outsourcing assessment, operations concept, contingency concept, test evidence, the two-page board submission, and the co-determination building block. Each names the actor who uses it, the process it belongs to, what the reviewing function typically asks, and its open questions. **German.** |
| **`controls/controls.yaml`** | 23 controls across 6 domains. Every control carries four mandatory fields: control objective, a written-out **audit procedure** in the language an internal audit function uses ("ask to be shown X, take sample Y, check Z"), the **evidence artifact** that proves it, and the supervisory mapping. Rendered to Markdown by a tested 249-line tool; a test fails if the two drift. |
| **`docs/loeschnachweis.md`** | The erasure-proof protocol. Deletion modelled as a derivation chain across eight stations, with three separate verification steps for the vector index, and a fillable deletion protocol as evidence. **German.** |
| **`docs/mapping-bait-vait-dora.md`** | Requirement → control → evidence, against what actually applies in Germany today. **German.** |
| **`pilot/`** | One fictional institution taken end to end through the approval process, with two red controls and a documented conflict between two functions. **German.** |
| **`pilot-abgelehnt/`** | The counter-case: a customer-facing assistant that receives **no approval**, and how to write a No that is verifiable rather than personal — with the five conditions that would make it approvable. **German.** |
| **`docs/who-uses-this.md`** | Ten actors, their process, their artifact, their opening question. Bilingual. |

## Three things that make it different

**1. The audit procedure is a mandatory field.** Most control catalogues state objectives:
*"access to data is restricted to authorised persons."* That reads well and is worthless in an
audit, because it leaves open how you would establish whether the control works and what proves
it. Here, every control spells out both, and a schema test rejects any control that does not.

**2. Deletion is treated as a burden of proof, not a promise.** The functional test — the content
is no longer retrievable — is green even when the delete call merely set a marker and the vectors
remain physically in the index file. Recent work ([*Ghost Vectors*, arXiv:2606.18497, 16 June
2026](https://arxiv.org/abs/2606.18497)) demonstrates recovery below the API layer and
subsequent reconstruction of personal data. So the repository asks for three separate proofs:
functional, physical, and irreversibility. Where a managed vector service makes the lower layer
invisible, it says so and routes the remaining uncertainty into the board submission as residual
risk, rather than offering a reassuring phrase.

**3. The pilots are deliberately not flawless — and one of them fails.** A worked case where
every control is green, every test passes first time and every function agrees would be
recognised as fiction by anyone who has run an approval. In the first pilot two controls stay red,
one test fails on the first attempt, and a disagreement between the data protection officer and
the outsourcing function is documented along with how it was resolved.

The second pilot goes further: it is a project that receives **no approval**. Eight red controls,
three of which cannot be healed by a deadline because they are construction decisions rather than
documentation gaps. It exists because saying No is the hardest thing the approving side does, and
because the quality of the write-up decides whether a No becomes a decision on the merits or a
conflict between people. Finding before judgement, the commercial pressure named rather than
complained about, the sponsor's dissent reproduced in full — and five conditions under which the
project would become approvable, because a No without a path to Yes is just a block.

## What the German regulatory picture actually is (July 2026)

This matters because a large share of freely available material still has it wrong:

- **DORA** (Regulation (EU) 2022/2554) has applied since **17 January 2025** and is the binding
  frame.
- **VAIT, KAIT and ZAIT** were **repealed with effect from the end of 16 January 2025**.
- **BAIT** no longer applies to institutions subject to DORA's ICT risk management, and is
  **repealed in full at the end of 31 December 2026**.
- **MaRisk** (Circular 06/2024) continues; **AT 4.3.5 explicitly requires sufficient
  explainability for models featuring technological innovation and artificial intelligence** —
  a binding hook for AI governance that predates the EU AI Act.
- The **EU AI Act** applies generally from **2 August 2026**; whether an internal policy
  assistant is high-risk is a case-by-case Annex III test, so this repository deliberately
  contains **no AI Act mappings**.

Every citation used anywhere in the repository is listed in [`quellen.md`](quellen.md) with its
verification status and retrieval date — including the ones that could **not** be verified.

## Why the artifacts are in German

The approval documents are German supervisory practice, written by German-speaking functions and
reviewed by German-speaking auditors. *Schutzbedarfsfeststellung*, *Prüfhandlung*, *Auflage*,
*Freigabe unter Auflagen* carry meanings an English approximation loses. Translating them would
serve reach and destroy usefulness. The shell — this summary, the README, the control field
names, the code — is English. See [ADR 0002](adr/0002-warum-deutsch.md).

## How to use it

1. **Read the pilot first** ([`../pilot/00-fallbeschreibung.md`](../pilot/00-fallbeschreibung.md)
   and the [board submission](../pilot/07-freigabevorlage-final.md)) — about five minutes, and it
   shows the whole run. For the harder case, read
   [`../pilot-abgelehnt/`](../pilot-abgelehnt/00-fallbeschreibung.md), where the answer is no.
2. Copy `akte/` into your own project and fill it in.
3. Render the control catalogue and hand it to your 2nd line as their test grid:
   `python tools/render_controls.py catalogue`.
4. Record your control assessment in a YAML file and render the readiness report from it.

## Honest scope

This is a reference pattern, not a framework, and not a compliance product. It does not certify
anything, it does not replace your legal function, your DPO or your supervisor, and it contains
no client or employer material — all templates were written from generic supervisory logic for
this repository, and both pilot institutions are fictional. Every document ends with its own open
questions, because honest gaps are part of the method rather than an omission.

Known limitations are listed in the [README](../README.md#honest-scope-and-open-questions),
including the citations that could not be verified, the deliberate absence of EU AI Act mappings,
and the fact that neither pilot shows a committee overruling its own control functions.

# Filtering after retrieval is not an authorisation check

> **Fictional institution, real process.** "Südhafen Direktbank AG" does not exist. The
> institution, people, vendor, figures and findings are invented. What is real is the procedure.
> **Not legal advice** — see [`DISCLAIMER.md`](../DISCLAIMER.md).

A branchless retail bank builds a customer assistant. It answers questions about products and
fees, and it answers questions about the asking customer's own contracts and transactions. Around
900,000 customers, around 12,000 queries a day, €1.4m to build, launch date already promised to
marketing for the spring campaign.

On 17 February a test customer asks: *"How much was my last direct debit?"* He gets an amount.
The amount belongs to a different customer.

## The first finding was a bug

Authorisation was evaluated at indexing time. At query time the system filtered on a
`kundennummer` metadata field. A fault in the ingest path had left that field empty on some
fragments — and in the configuration in use, an empty filter field did not exclude. It passed
through.

That is a bug. Bugs get fixed. Six weeks later it was remediated and retested.

## The second finding was the architecture

The retest produced no cross-customer hit. But it established that filtering still happens
**after** retrieval: the system retrieves fragments across the whole corpus and then discards the
ones that do not belong to the asking customer.

That is not a bug any more. That is the design.

What follows holds whether or not the filter happens to be working:

- Other customers' data leaves the security boundary **before** the check applies.
- Depending on what the search returns, it is handed to the vendor's model — to a third party,
  before anyone has established that the asking customer may see it.
- Every future defect in the filtering stage is a data leak again, not merely a wrong answer. The
  class of failure has not been closed, only its current instance.
- The assurance that nothing ever slips through has to be produced per query, instead of once,
  for the architecture.

**This is exactly where "not yet" parts from "not like this".** A filter that applies after
retrieval can be arbitrarily good and remains a compensation. An authorisation check that applies
before retrieval makes the question moot.

The lesson has nothing to do with banking supervision. It holds for any retrieval system over
data with differing access rights — personnel files, client matters, project shares, ticket
systems. The temptation is always the same: a metadata filter is two lines, identity-scoped
retrieval is a rebuild.

## Why it still did not come down to that alone

Of 23 controls, 4 ended green, 11 amber and 8 red. The eleven amber ones are not the message —
in an ordinary approval those become conditions with a deadline and an owner.

The message is the three red ones **no deadline can heal**:

| Control | Finding |
|---|---|
| `ZUG-01` | Authorisation applies only after retrieval. |
| `BET-04` | Customer data goes to a vendor without EU processing; the legal basis for the third-country transfer is not evidenced. |
| `LOE-02` | Deletion in the managed vector index cannot be evidenced, because the vendor will not state whether removal is physical. |

All three are design and contract decisions. None closes with more care in implementation. A
condition with a deadline would not be a condition here; it would be a postponement.

## The actual mistake happened ten weeks earlier

Information security was brought in on 12 January — ten weeks after project start, and **after**
the vendor had been selected. By then contracts were signed, an architecture was built, a date
was communicated.

From that point every objection was automatically an attack on a plan rather than a contribution
to a design. It is the only structural difference from the pilot that was approved, and it
explains the outcome better than any technical detail.

## How to write a no down

This is the most uncomfortable position in the whole procedure: the system is built, the budget
is spent, the date is public, and the person who has to say no sits in a staff function with no
authority over the people who want to hear yes.

Three things decide whether that becomes a decision on the merits rather than a conflict between
people:

**Reason control by control, not in the overall verdict.** "The system is not secure" is an
opinion. "`ZUG-01` red, because the check applies after retrieval, evidence: test record of
31 March" is checkable. Anyone who disagrees has to attack the control, not the person.

**Name the schedule pressure in the submission.** The marketing commitment predated the approval
decision. The submission says so explicitly — not as an accusation, but because a board needs to
know what pressure a recommendation was written under. A submission that conceals the pressure it
was written under is incomplete.

**Ship the conditions with it.** The submission names five conditions under which the project
would become approvable: three architectural, two contractual. Four weeks after the decision the
project began redesigning. A no without a route to yes is an obstruction; a no with conditions is
an assignment.

## The file is open

The full case is in this repository:
[case description](../pilot-abgelehnt/00-fallbeschreibung.md) (German),
[control assessment](../pilot-abgelehnt/controls-assessment.yaml),
[readiness report](../pilot-abgelehnt/readiness-report.md),
[board submission](../pilot-abgelehnt/07-freigabevorlage-final.md).

It stays rejected. That is an invariant of the repository, not an oversight: a method that only
ever produces approvals has demonstrated nothing.

*Deutsche Fassung: [Filtern nach dem Abruf ist keine Berechtigungsprüfung](filterung-nach-dem-abruf.md).*

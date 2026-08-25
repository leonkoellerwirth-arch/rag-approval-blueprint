"""Tests for the decision-record tool.

The load-bearing test is `test_every_reference_in_every_record_resolves`: it walks the committed
records and resolves each reference — file and section — against the repository. It is what turns
"the approval file answers this" from a claim into something the gate checks. Rename a heading
three files away and this goes red.

The rest are adversarial: each breaks a record in one specific way that a reader would not notice
and asserts the tool does.
"""

from __future__ import annotations

import copy
from pathlib import Path

import pytest
import yaml

import render_decision as rd

ROOT = Path(__file__).resolve().parent.parent


@pytest.fixture
def record() -> dict:
    """The approved case, loaded fresh so a test can damage its own copy."""
    return yaml.safe_load((ROOT / "decisions" / "nora-2026.yaml").read_text(encoding="utf-8"))


def test_every_reference_in_every_record_resolves() -> None:
    for rec in rd.load_records():
        for reference, where in rd.references(rec):
            assert rd.resolve(reference) is None, (
                f"{rec['meta']['id']} {where}: {rd.resolve(reference)}"
            )


def test_committed_overview_is_current() -> None:
    """INV-3 applied to this tool: the Markdown is generated, never hand-edited."""
    assert rd.OVERVIEW.read_text(encoding="utf-8") == rd.render(rd.load_records())


def test_records_as_committed_hold_up() -> None:
    for rec in rd.load_records():
        assert rd.validate(rec) == []


def test_missing_file_is_caught(record: dict) -> None:
    record["steps"][3]["source"] = "pilot/akte/does-not-exist.md#anything"
    assert any("file does not exist" in p for p in rd.validate(record))


def test_renamed_heading_is_caught(record: dict) -> None:
    """The failure this tool exists for — the file is fine, the section moved."""
    record["steps"][14]["source"] = "pilot/akte/05-notfallkonzept.md#4-kill-schalter"
    assert any("no such section" in p for p in rd.validate(record))


def test_step_without_source_or_gap_is_caught(record: dict) -> None:
    record["steps"][0].pop("source")
    assert any("exactly one of source or gap" in p for p in rd.validate(record))


def test_step_with_both_source_and_gap_is_caught(record: dict) -> None:
    record["steps"][0]["gap"] = "unklar"
    assert any("exactly one of source or gap" in p for p in rd.validate(record))


def test_gap_and_caveat_together_are_caught(record: dict) -> None:
    """A step is either unanswered or answered within a limit — never both."""
    step = record["steps"][9]
    step.pop("source", None)
    step["gap"] = "nicht bearbeitet"
    step["caveat"] = "aber eigentlich schon"
    assert any("gap and caveat" in p for p in rd.validate(record))


def test_unknown_decision_value_is_caught(record: dict) -> None:
    record["meta"]["decision"] = "PROBABLY_FINE"
    assert any("decision must be one of" in p for p in rd.validate(record))


def test_overstated_nature_is_caught(record: dict) -> None:
    """§13: nothing may read as production use that is not production use."""
    record["meta"]["nature"] = "battle-tested at a tier-1 bank"
    assert any("nature must be one of" in p for p in rd.validate(record))


def test_quality_level_without_basis_is_caught(record: dict) -> None:
    record["quality"]["blast_radius"].pop("basis")
    assert any("states a level without a basis" in p for p in rd.validate(record))


def test_missing_owner_is_caught(record: dict) -> None:
    record["meta"].pop("risk_owner")
    assert any("meta.risk_owner is missing" in p for p in rd.validate(record))


def test_steps_out_of_order_are_caught(record: dict) -> None:
    record["steps"] = list(reversed(record["steps"]))
    assert any("steps must be 1..18 in order" in p for p in rd.validate(record))


def test_the_rejected_case_keeps_its_gaps() -> None:
    """INV-7 for decision records: a rejection is not tidied up after the fact."""
    kira = next(r for r in rd.load_records() if r["meta"]["id"] == "KIRA-2026")
    assert kira["meta"]["decision"] == "KILL"
    gaps = [s["n"] for s in kira["steps"] if s.get("gap")]
    assert gaps, "the rejected case had four unanswered steps; filling them would be a fiction"
    for step in kira["steps"]:
        if step.get("gap"):
            assert len(step["gap"].split()) >= 5, f"step {step['n']}: a gap needs a reason"


def test_slug_matches_github_anchor_rules() -> None:
    assert rd.slug("## 4. Kill-Switch".lstrip("# ")) == "4-kill-switch"
    assert rd.slug("Der Befund, an dem alles hängt") == "der-befund-an-dem-alles-hängt"
    assert rd.slug("7. Technische und organisatorische Maßnahmen (Art. 32 DSGVO)") == (
        "7-technische-und-organisatorische-maßnahmen-art-32-dsgvo"
    )


def test_render_is_deterministic() -> None:
    records = rd.load_records()
    assert rd.render(records) == rd.render(copy.deepcopy(records))

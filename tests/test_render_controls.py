"""Tests for the control-catalogue renderer.

The load-bearing test is `test_committed_catalogue_is_current`: it enforces INV-3 — the
rendered Markdown is generated from `controls/controls.yaml` and never hand-edited. If someone
edits the Markdown directly, or changes the YAML without re-rendering, this fails.
"""

from __future__ import annotations

import yaml

import render_controls as rc

MINIMAL = {
    "meta": {"version": "0.1.0", "updated": "2026-07-19", "open_questions": ["nichts offen"]},
    "domains": [{"id": "ZUG", "name": "Zugriff", "description": "Berechtigungen zur Query-Zeit."}],
    "controls": [
        {
            "id": "ZUG-01",
            "domain": "ZUG",
            "title": "Query-Zeit-Autorisierung",
            "objective": "Nutzende sehen nur Inhalte, für die sie berechtigt sind.",
            "audit_procedure": "Lasse dir die Berechtigungsprüfung zeigen, wähle 5 Nutzende.",
            "evidence": ["Testprotokoll Negativ-Retrieval"],
            "mapping": {"dora": ["Art. 9"], "generic": ["Zugriffssteuerung"]},
        }
    ],
}


def _control(**overrides):
    doc = yaml.safe_load(yaml.safe_dump(MINIMAL))
    doc["controls"][0].update(overrides)
    return doc


# --- schema validation (INV-4: four mandatory fields per control) ---------------------------


def test_minimal_document_is_valid():
    assert rc.validate(MINIMAL) == []


def test_every_mandatory_field_is_enforced():
    for field in rc.REQUIRED:
        doc = _control(**{field: None})
        errors = rc.validate(doc)
        assert any(field in error for error in errors), f"missing '{field}' was not reported"


def test_empty_evidence_list_is_rejected():
    assert any("evidence" in error for error in rc.validate(_control(evidence=[])))


def test_unknown_domain_is_rejected():
    assert any("unknown domain" in error for error in rc.validate(_control(domain="NOPE")))


def test_duplicate_control_id_is_rejected():
    doc = yaml.safe_load(yaml.safe_dump(MINIMAL))
    doc["controls"].append(dict(doc["controls"][0]))
    assert any("duplicate" in error for error in rc.validate(doc))


def test_real_catalogue_is_valid():
    assert rc.validate(rc.load(rc.CONTROLS)) == []


# --- rendering -------------------------------------------------------------------------------


def test_catalogue_contains_the_four_mandatory_headings():
    text = rc.render_catalogue(MINIMAL)
    mandatory = ("**Kontrollziel.**", "**Prüfhandlung.**", "**Evidenz-Artefakt.**", "**Mapping.**")
    for heading in mandatory:
        assert heading in text
    assert "ZUG-01" in text
    assert text.startswith(rc.BANNER)
    assert "Kein Rechtsrat" in text
    assert "## Offene Punkte" in text


def test_catalogue_omits_mapping_frameworks_without_entries():
    text = rc.render_catalogue(MINIMAL)
    assert "*DORA:* Art. 9" in text
    assert "MaRisk" not in text  # no marisk entries in the fixture → no empty line rendered


def test_readiness_counts_and_lists_auflagen():
    assessment = {
        "meta": {"institution": "Nordwind Bank AG (fiktiv)", "recommendation": "unter Auflagen"},
        "results": [
            {
                "control": "ZUG-01",
                "status": "red",
                "finding": "Kein Negativtest vorhanden.",
                "auflage": "Negativ-Retrieval-Test nachweisen.",
                "due": "2026-09-30",
                "owner": "ISB",
            }
        ],
    }
    text = rc.render_readiness(MINIMAL, assessment)
    assert "## Auflagen" in text
    assert "Negativ-Retrieval-Test nachweisen." in text
    assert "| 🔴 nicht erfüllt — Auflage | 1 |" in text
    assert "unter Auflagen" in text


def test_readiness_reports_unassessed_controls():
    text = rc.render_readiness(MINIMAL, {"meta": {}, "results": []})
    assert "## Nicht bewertet" in text
    assert "`ZUG-01`" in text
    assert "## Auflagen" not in text


# --- the drift guard (INV-3) -----------------------------------------------------------------


def test_committed_catalogue_is_current():
    doc = rc.load(rc.CONTROLS)
    assert rc.CATALOGUE.read_text(encoding="utf-8") == rc.render_catalogue(doc), (
        "controls/controls.md is stale — run: python tools/render_controls.py catalogue"
    )


def test_check_command_passes_on_a_clean_tree():
    assert rc.main(["check"]) == 0


def test_invalid_catalogue_exits_nonzero(tmp_path, capsys):
    broken = tmp_path / "controls.yaml"
    broken.write_text(yaml.safe_dump({"domains": [], "controls": []}), encoding="utf-8")
    assert rc.main(["catalogue", "--controls", str(broken)]) == 1
    assert "invalid" in capsys.readouterr().err

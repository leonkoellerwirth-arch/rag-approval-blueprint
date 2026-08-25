"""Cross-repository DORA consistency.

DORA is registered twice across the portfolio, on purpose and in two directions:
`agentic-ai-governance-toolkit` records obligation → document, this repository records
control → obligation. Merging them would couple two repositories that are otherwise
independent, which is the more expensive of the two costs for a single maintainer.

The cheap half of that decision is this test. It fails when an article appears in both
registers under labels that cannot both be describing the same article — the failure mode
the duplication actually has. It reads a committed snapshot, never the other repository:
updating `refs/toolkit-dora-snapshot.json` by hand is the moment drift becomes visible,
and automating it away would hide exactly what this is for.

Articles present in only one register are reported, not failed. The two registers cover
different ground on purpose, and a bare count of gaps would be noise.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
CONTROLS = REPO_ROOT / "controls" / "controls.yaml"
SNAPSHOT = REPO_ROOT / "refs" / "toolkit-dora-snapshot.json"

# Divergences that are known, tracked, and not yet resolvable — never a way to silence a
# finding. Each entry names what would settle it. Remove an entry the moment it is settled.
# Divergences that are known, tracked, and not yet resolvable — never a way to silence a
# finding. Each entry names what would settle it. Remove an entry the moment it is settled.
#
# Empty since 2026-08-25. The one entry it held, DORA Art. 28, was settled the way the entry said
# it would be: someone read the official heading in the primary text and corrected the sister
# register, which had been describing the chapter rather than the article. The second test below
# is what forced the removal — a resolved divergence that stays on the list turns the list into
# decoration.
KNOWN_LABEL_DIVERGENCES: dict[str, str] = {}


# Words that carry no distinguishing meaning in a heading.
_FILLER = {"and", "of", "the", "for", "on", "at", "in", "to", "a", "an", "or"}


def _tokens(text: str) -> set[str]:
    words = re.sub(r"[^\w\s]", " ", text.lower()).split()
    return {w for w in words if w not in _FILLER}


def _article_id(reference: str) -> str | None:
    """'Art. 28 Abs. 3 (Register of information)' -> '28'. None if not an article."""
    match = re.match(r"Art\.\s*(\d+)", reference)
    return match.group(1) if match else None


def _label(reference: str) -> str:
    """The parenthesised topic, or the whole string when there is none."""
    match = re.search(r"\(([^)]+)\)", reference)
    return match.group(1).strip() if match else reference.strip()


def _expand(article_id: str) -> set[str]:
    """'24-27' -> {'24','25','26','27'}. The sister register bundles, this one does not."""
    if "-" not in article_id:
        return {article_id}
    low, high = article_id.split("-", 1)
    return {str(n) for n in range(int(low), int(high) + 1)}


def _compatible(their_label: str, our_labels: list[str]) -> bool:
    """Compatible when one label is a shorthand of the other.

    Substring matching is the obvious rule and the wrong one: "backup and restoration" is
    plainly the same article as "Backup policies and procedures, restoration and recovery
    procedures and methods", and is not a substring of it. The rule that holds is
    containment of meaning — every distinguishing word of the shorter label appears in the
    longer. That still separates Art. 28's two labels, which share no word at all, which is
    the case worth catching.
    """
    theirs = _tokens(their_label)
    if not theirs:
        return False
    for ours in map(_tokens, our_labels):
        if not ours:
            continue
        shorter, longer = (theirs, ours) if len(theirs) <= len(ours) else (ours, theirs)
        if shorter <= longer:
            return True
    return False


def _load_snapshot() -> dict[str, str]:
    """Article id -> label, for single-article entries only.

    A bundled entry such as "24-27" is labelled with the section heading, not with any one
    article's, so comparing that label against a single article's heading compares two
    different things. Bundles still count as coverage; they carry no comparable label.
    """
    entries = json.loads(SNAPSHOT.read_text(encoding="utf-8"))["dora"]
    return {e["id"]: e["topic"] for e in entries if "-" not in e["id"]}


def _snapshot_coverage() -> set[str]:
    """Every article id the sister register covers, bundles expanded."""
    entries = json.loads(SNAPSHOT.read_text(encoding="utf-8"))["dora"]
    return {aid for e in entries for aid in _expand(e["id"])}


def _load_ours() -> dict[str, list[str]]:
    data = yaml.safe_load(CONTROLS.read_text(encoding="utf-8"))
    ours: dict[str, list[str]] = {}
    for control in data.get("controls", []):
        for reference in control.get("mapping", {}).get("dora", []):
            article_id = _article_id(reference)
            if article_id is None:
                continue
            label = _label(reference)
            if label not in ours.setdefault(article_id, []):
                ours[article_id].append(label)
    return ours


def test_snapshot_is_present_and_declares_its_provenance() -> None:
    assert SNAPSHOT.is_file(), f"missing snapshot: {SNAPSHOT}"
    snapshot = json.loads(SNAPSHOT.read_text(encoding="utf-8"))
    for field in ("_source", "_toolkit_release", "_extracted", "_caveat"):
        assert snapshot.get(field), f"snapshot without {field} is unusable as evidence"


def test_shared_dora_articles_carry_compatible_labels() -> None:
    """An article in both registers must not be described in two irreconcilable ways."""
    theirs, ours = _load_snapshot(), _load_ours()

    conflicts = [
        f"  Art. {aid}: sister={theirs[aid]!r} · here={ours[aid]!r}"
        for aid in sorted(set(theirs) & set(ours), key=int)
        if not _compatible(theirs[aid], ours[aid]) and aid not in KNOWN_LABEL_DIVERGENCES
    ]

    assert not conflicts, (
        "DORA articles described irreconcilably in the two registers:\n"
        + "\n".join(conflicts)
        + "\n\nAlign the labels, or — if the divergence cannot be settled yet — record it in "
        "KNOWN_LABEL_DIVERGENCES with what would settle it."
    )


def test_known_divergences_still_diverge() -> None:
    """A resolved divergence must leave the list, or the list becomes decoration."""
    theirs, ours = _load_snapshot(), _load_ours()

    stale = [
        f"  Art. {aid}: now compatible — remove it from KNOWN_LABEL_DIVERGENCES"
        for aid in KNOWN_LABEL_DIVERGENCES
        if aid in theirs and aid in ours and _compatible(theirs[aid], ours[aid])
    ]
    unknown = [
        f"  Art. {aid}: recorded as divergent but absent from one register"
        for aid in KNOWN_LABEL_DIVERGENCES
        if aid not in theirs or aid not in ours
    ]

    assert not (stale + unknown), "\n".join(stale + unknown)

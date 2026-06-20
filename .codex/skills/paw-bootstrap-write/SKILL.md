---
name: paw-bootstrap-write
description: >
  Candidate PAW Codex skill for writing only approved bootstrap documents listed in
  creates_docs. Inactive until cutover.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/bootstrap.md
  toolkit: .codex/paw-toolkit
---

# paw-bootstrap-write

## Status

Candidate only. It may not write before an explicit approval gate and may not
activate the v2 workflow.

## Load

1. `paw/orchestration/bootstrap.md`, Write, Approval Gate, and Write Report sections.
2. Approved bootstrap definition.
3. Approval gate with `creates_docs`.
4. Target documents listed in `creates_docs`.

## Do

- Verify approval gate, `creates_docs`, and freshness before writing.
- Write only approved documents.
- Produce a write report as evidence.
- Record skipped, blocked, or deferred documents.

## Do Not

- Write outside `creates_docs`.
- Promote evidence by inference.
- Expand authority or validation strategy without a new gate.
- Use `.agents/**`.

## Output

Return documents changed, skipped or deferred items, validation results, deviations,
and residual risks.

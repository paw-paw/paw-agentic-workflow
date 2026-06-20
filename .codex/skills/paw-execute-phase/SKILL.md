---
name: paw-execute-phase
description: >
  Candidate PAW Codex skill for executing one approved PAW phase from its live
  backlog. Inactive until cutover.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/workflow.md
  toolkit: .codex/paw-toolkit
---

# paw-execute-phase

## Status

Candidate only. Use `sdd-execute-phase` for active `paw-foundation` patches.

## Load

1. `paw/orchestration/workflow.md`, `paw-execute-phase` readiness and loop rules.
2. Selected phase backlog, tasks, plan, and decision log.
3. Files listed by the backlog before editing.

## Do

- Execute exactly one backlog in checklist order.
- Update the backlog during execution with findings, drift, blockers, and results.
- Use toolkit mutation checks for mechanical writes.
- Stop for scope, authority, validation, or compatibility decisions.

## Do Not

- Advance another phase.
- Close the patch.
- Suppress failed validations.
- Use `.agents/**`.

## Output

Report checklist items executed, files touched, validation results, drift, blockers,
assumptions, and residual risk.

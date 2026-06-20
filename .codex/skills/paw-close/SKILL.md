---
name: paw-close
description: >
  Candidate PAW Codex skill for formal patch closure after phases are complete.
  Inactive until cutover.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/workflow.md
  toolkit: .codex/paw-toolkit
---

# paw-close

## Status

Candidate only. Use `sdd-close` for active `paw-foundation` patches.

## Load

1. `paw/orchestration/workflow.md`, close readiness and invalid transitions.
2. Manifest, definition, plan, tasks, all phase backlogs, and decision log.
3. Related live documents from the manifest.
4. Validation evidence and residual risks.

## Do

- Reconcile intent, results, drift, decisions, validation, gaps, and risks.
- Promote durable rules to live authority before closure when required.
- Set patch closure state only when criteria are satisfied.

## Do Not

- Close with unclassified drift or unresolved blockers.
- Introduce new substantive implementation decisions.
- Hide failed validations.
- Use `.agents/**`.

## Output

Report closure artifact, validation classification, drift, gaps, residual risks, and
next integration step.

---
name: paw-plan
description: >
  Candidate PAW Codex skill for producing a brownfield technical plan from an
  approved definition. Inactive until cutover.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/workflow.md
  toolkit: .codex/paw-toolkit
---

# paw-plan

## Status

Candidate only. Use `sdd-plan` for active `paw-foundation` patches.

## Load

1. `paw/orchestration/workflow.md`, `paw-plan` readiness.
2. Approved definition, manifest, and decision log.
3. Governing live documents named by the patch.
4. Repo implementation files only where needed for brownfield constraints.

## Do

- Produce affected surfaces, strategy, risks, dependencies, validation plan, and
  rollback notes.
- Keep assumptions first-class.
- Use toolkit mutation checks before any mechanical artifact write.

## Do Not

- Create phase tasks or backlogs.
- Implement runtime changes.
- Override live contracts silently.
- Use `.agents/**`.

## Output

Report plan path, assumptions, blockers, validations, and next operation.

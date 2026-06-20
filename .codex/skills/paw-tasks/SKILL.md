---
name: paw-tasks
description: >
  Candidate PAW Codex skill for splitting an approved PAW plan into ordered macro
  phases. Inactive until cutover.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/workflow.md
  toolkit: .codex/paw-toolkit
---

# paw-tasks

## Status

Candidate only. Use `sdd-tasks` for active `paw-foundation` patches.

## Load

1. `paw/orchestration/workflow.md`, `paw-tasks` readiness.
2. Manifest, definition, plan, and decision log.
3. Validation strategy from the approved plan.

## Do

- Produce phase-level tasks, dependencies, likely files, validations, and closure
  criteria.
- Preserve plan order unless a recorded decision changes it.
- Keep execution checklists out of `tasks.md`.

## Do Not

- Create live phase backlogs.
- Implement phase work.
- Change macro sequence without a decision.
- Use `.agents/**`.

## Output

Report phase order, deferred work, blockers, and selected next phase.

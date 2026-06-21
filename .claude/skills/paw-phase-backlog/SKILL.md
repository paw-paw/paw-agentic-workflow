---
name: paw-phase-backlog
description: Prepare one executable phase backlog from approved PAW candidate tasks.
---

# paw-phase-backlog

## Status

Candidate Claude Code physical adapter entrypoint. For active `paw-foundation`,
use `sdd-phase-backlog`.

## Load

1. `tasks.md` and selected phase.
2. `plan.md`.
3. `patch.yaml`.
4. `decision.log` when present.
5. Files and docs named by the selected phase.

## Do

- Expand one phase into concrete read, inspect, edit, validate, and close steps.
- Separate read-before-edit, edit, validate, and do-not-touch surfaces.
- Include exact commands when commands exist in the repo.
- Record assumptions and blockers before execution.

## Do Not

- Execute the phase.
- Create backlogs for multiple phases unless explicitly scoped.
- Change phase order without a recorded decision.
- Omit human gates for scope or contract drift.

## Output

Return the backlog path, readiness, blockers, and the exact next execution step.

---
name: paw-tasks
description: Split an approved PAW candidate plan into ordered macro phases without executing them.
---

# paw-tasks

## Status

Candidate Claude Code physical adapter entrypoint. For active `paw-foundation`,
use `sdd-tasks`.

## Load

1. `patch.yaml`.
2. `definicion.md`.
3. `plan.md`.
4. `decision.log` when present.
5. Governing docs only as needed to verify phase boundaries.

## Do

- Convert implementation blocks into ordered phases.
- List preconditions, likely files, validations, dependencies, and closure
  criteria for each phase.
- Mark deferred or gated work explicitly.

## Do Not

- Create phase checklists.
- Implement files.
- Reopen design without recording drift.
- Hide distribution or runtime validation gates.

## Output

Return phase order, selected next phase, blockers, deferred work, and global
validations.

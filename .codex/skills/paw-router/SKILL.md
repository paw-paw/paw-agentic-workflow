---
name: paw-router
description: >
  Candidate PAW Codex skill for diagnosing current patch state and routing to the
  next PAW operation. Inactive until cutover.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/workflow.md
  toolkit: .codex/paw-toolkit
---

# paw-router

## Status

Candidate only. Use `sdd-router` for active `paw-foundation` work.

## Load

1. `paw/orchestration/workflow.md`, state model, readiness, loop handling, and
   missing artifacts.
2. Patch manifest and current artifacts.
3. Backlog state only when routing a phase.

## Do

- Inspect state without mutating artifacts.
- Detect missing artifacts, invalid transitions, blockers, and drift loops.
- Use `inspect-patch --json` for mechanical patch-state inspection.
- Recommend exactly one next operation or a blocker.

## Do Not

- Create or edit artifacts.
- Resolve scope conflicts by inference.
- Hide missing artifacts by synthesizing content.
- Use `.agents/**`.

## Output

Return current state, evidence paths, blockers, drift indicators, and next operation.

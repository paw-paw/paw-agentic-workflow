---
name: paw-phase-backlog
description: >
  Candidate PAW Codex skill for preparing one phase backlog from approved tasks.
  Inactive until cutover.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/workflow.md
  toolkit: .codex/paw-toolkit
---

# paw-phase-backlog

## Status

Candidate only. Use `sdd-phase-backlog` for active `paw-foundation` patches.

## Load

1. `paw/orchestration/workflow.md`, phase readiness and missing artifact handling.
2. Manifest, plan, tasks, and selected phase.
3. Decision log and prior phase closure notes.

## Do

- Prepare exactly one implementation-ready backlog.
- Expand macro tasks into directly executable and verifiable checklist items.
- Include read/edit/validate/no-touch surfaces and exact commands.

## Do Not

- Execute the phase.
- Create multiple phase backlogs unless explicitly selected.
- Hide missing preconditions.
- Use `.agents/**`.

## Output

Report backlog path, readiness, blockers, and required validations.

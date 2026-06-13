---
name: sdd-tasks
description: >
  Convert an approved SDD `plan.md` into macro phases and executable tasks for this repo.
  Trigger: When `sdd/parches/.../plan.md` exists and the change needs `tasks.md` with phases,
  dependencies, likely files, and validations. Do not use for intake, planning from scratch,
  per-file backlog checklists, implementation, drift sync, or verification.
license: Apache-2.0
metadata:
  author: paw-paw
  version: "1.0"
---

## When to Use

- Break an approved SDD plan into implementation phases
- Define tasks that are concrete enough to execute later
- Prepare inputs for `sdd-phase-backlog`

## Inputs

- `sdd/parches/<change-id>/patch.yaml`
- `sdd/parches/<change-id>/definicion.md`
- `sdd/parches/<change-id>/plan.md`
- `sdd/parches/<change-id>/decision.log`, if present
- Applicable contractual docs when needed to resolve scope
- `assets/spec/tasks.md` or `assets/batch/tasks.md`, selected from `patch_kind`

## Critical Patterns

- Keep tasks at phase level, not micro-checklists per file
- Preserve the plan's scope, order, and constraints
- Mark optional or deferred work explicitly
- Stop if the plan is missing, stale, or contradicted by contractual docs
- Do not change the plan's macro sequence without recording a decision
- If the manager delegates task drafting, only `sdd-artifact-writer` may write the assigned `tasks.md`

## Patch Manifest Awareness

- `patch.yaml` is required for formal non-legacy task breakdown.
- Read `patch_kind`, `lifecycle`, `status`, and `related_docs` before creating tasks.
- Select the tasks asset from `patch_kind`.
- For `batch`, preserve the closed item list, global closure criterion, per-item closure criteria, and split checks.
- If `status = blocked`, tasks may only proceed when the blocker is resolved or explicitly scoped as the work to unblock.

## Workflow

1. Read `patch.yaml`, the definition, plan, and decision log.
2. Confirm there are no unresolved decisions or critical assumptions blocking task breakdown.
3. Select the tasks asset from `patch_kind` and create or update `tasks.md`.
4. Keep each task traceable to the plan.
5. Report any blockers and readiness to start using `sdd-phase-backlog`.

Optional delegation:

- The active manager may delegate one assigned `tasks.md` update to `sdd-artifact-writer`.
- The writer may not create backlogs or implementation changes from this skill.

## Outputs

- `sdd/parches/<change-id>/tasks.md`
- Short report with:
  - created or updated path
  - phase order
  - selected next phase for `sdd-phase-backlog`
  - blocking decisions, if any
  - deferred work
  - validations that must remain global

## Template Notes

- Use `assets/spec/tasks.md` when `patch_kind = spec`.
- Use `assets/batch/tasks.md` when `patch_kind = batch`.
- Keep `tasks.md` at phase level; operational checklists belong in `backlog/faseN.md`.

## Guardrails

- Do not implement changes.
- Do not create `backlog/faseN.md`.
- Do not produce a command-by-command execution checklist.
- Do not reopen design unless the plan is clearly invalid.

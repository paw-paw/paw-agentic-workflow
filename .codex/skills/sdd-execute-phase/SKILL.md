---
name: sdd-execute-phase
description: >
  Execute one existing SDD phase from its live backlog while updating the backlog as work progresses.
  Trigger: When `sdd/parches/.../backlog/faseN.md` exists and the user asks to implement that
  phase. Use for scoped execution, findings, decisions, and validations. Do not use for intake,
  planning, task creation, drift-only sync, or separate domain verification.
license: MPL-2.0
metadata:
  author: paw-paw
  version: "1.0"
---

## When to Use

- Implement one phase that already has a live backlog
- Keep execution aligned with SDD artifacts and contractual docs
- Update the backlog with progress, blockers, findings, decisions, and validation results

## Inputs

- `sdd/parches/<change-id>/backlog/faseN.md`
- `sdd/parches/<change-id>/tasks.md`
- `sdd/parches/<change-id>/plan.md`
- `sdd/parches/<change-id>/decision.log`, if present
- Relevant docs and repo files for the phase

## Critical Patterns

- Execute exactly one phase unless the user explicitly expands scope
- Read relevant files before editing
- Update the live backlog during execution, not only at the end
- Stop for decisions affecting scope, contracts, schemas, compatibility, validation strategy, or macro sequence
- Run only relevant validations and report failures honestly
- If the manager delegates execution, only `sdd-phase-worker` may act as the write-capable implementation worker for that phase
- Preserve the live backlog shape from `.codex/skills/sdd-phase-backlog/assets/backlog-faseN.md`
- Treat `backlog/faseN.md` as the execution runbook, not as a loose reference.
- Follow granular checklist order unless a blocker, drift, or dependency requires stopping.
- Do not collapse granular checklist items into macro execution.
- If the backlog is too vague to execute safely, stop and report that it needs backlog refinement before implementation.

## Patch Manifest Awareness

- `patch.yaml` is required for formal non-legacy execution.
- Read `patch_kind`, `lifecycle`, `status`, and `related_docs` before executing the phase.
- Confirm critical assumptions in the backlog are resolved, accepted, or escalated before marking the phase done.
- Do not change `patch_kind`, `lifecycle`, or `related_docs` during execution without a recorded decision and any required human gate.
- Keep patch `status` distinct from phase backlog status; update it only when the active phase explicitly scopes that edit.

## Workflow

1. Read the backlog, tasks, plan, decision log, `docs/README.md`, and `AGENTS.md`.
2. Confirm preconditions and phase scope.
3. Inspect the files listed under read-before-edit, edit, validate, and do-not-touch surfaces.
4. Execute the backlog checklist in order, block by block.
5. Implement only the minimum correct change required by each checklist item.
6. Update checklist status, findings, blockers, drift, and validation results in `backlog/faseN.md` as work progresses.
6. Add `decision.log` entries for meaningful execution decisions.
7. Run validations required by `AGENTS.md` and the backlog.
8. Run a separate domain verifier only when it is installed and explicitly required by the backlog.
9. Report result, files touched, validations, assumptions, drift, pending items, and risks.

Optional delegation:

- The active manager may delegate one approved phase to `sdd-phase-worker`.
- The worker may update the same `backlog/faseN.md` only when the manager explicitly includes that responsibility.
- Do not use multiple writers on the same phase or implementation zone.

## Outputs

- Scoped code or documentation changes required by the selected phase
- Updated `backlog/faseN.md`
- Optional `decision.log` entries
- Final execution report

## Template Notes

- The expected backlog structure comes from `.codex/skills/sdd-phase-backlog/assets/backlog-faseN.md`.
- Do not restructure the backlog during execution unless drift or missing fields make it necessary.

## Guardrails

- Do not mark a phase complete when required validation fails.
- Do not broaden scope for convenience.
- Do not suppress drift between docs and implementation.
- Do not remove checks or validations to make work pass.
- Do not mark a phase `done` if closure checks remain open unless unresolved items are explicitly deferred with reason.
- Do not skip checklist items silently.
- Do not edit files or surfaces listed under `No tocar` unless the user explicitly expands scope or the backlog is updated with a recorded decision.

---
name: sdd-close
description: >
  Close a formal SDD patch by producing `cierre.md` from live artifacts, decision log, drift records,
  validation results, and pending risks. Trigger when all selected phases for an SDD patch workspace
  are complete and the patch needs final closure, reconciliation, validation classification, and residual-risk
  reporting. Do not use for intake, planning, task breakdown, phase execution, or drift sync that blocks closure.
---

# sdd-close

## When to Use

- Close one formal SDD patch after its selected phases are done
- Produce or update `sdd/parches/<change-id>/cierre.md`
- Reconcile final truth into `docs/`, `AGENTS.md`, `sdd/core/`, or another declared source only when the patch requires it
- Classify validation results as `automated`, `manual`, `not applicable`, or `deferred`
- Surface residual drift, blockers, assumptions, findings, risks, and pending work before closure

## Inputs

- `sdd/parches/<change-id>/patch.yaml`
- `sdd/parches/<change-id>/definicion.md`
- `sdd/parches/<change-id>/plan.md`
- `sdd/parches/<change-id>/tasks.md`
- `sdd/parches/<change-id>/backlog/fase*.md`
- `sdd/parches/<change-id>/decision.log`, if present
- `sdd/core/artifact-lifecycle.md`
- `sdd/core/decision-drift-policy.md`
- `sdd/core/patch-model.md`
- `assets/cierre.md`
- governing docs named by the patch

## Critical Patterns

- Close exactly one patch.
- Do not use `cierre.md` to invent decisions that should be in `decision.log`.
- Do not mark a patch closed while required phases, blockers, or validation failures remain unresolved.
- Do not reconcile rules into contractual docs unless the patch scope or a recorded decision requires it.
- Stop for human decision when closure would change scope, source of truth, validation strategy, public behavior, or long-lived conventions.
- Keep `patch.yaml` status aligned with closure only when the manifest model and current phase authorize that edit.

## Patch Manifest Awareness

- `patch.yaml` is required for formal non-legacy patch closure.
- Read `patch_kind`, `lifecycle`, `status`, `program_id`, `created_at`, `closed_at`, and `related_docs` before choosing the closure level.
- If `lifecycle = spec-anchored`, closure must reconcile against `related_docs` or stop with a blocker.
- Use the shared close asset, but complete the mandatory `spec` or `batch` branch for the current patch type.
- When closure succeeds, set `status: closed` and `closed_at` to the closure date.

## Workflow

1. Read `patch.yaml`, `definicion.md`, `plan.md`, `tasks.md`, all phase backlogs, `decision.log`, and core lifecycle docs.
2. Confirm every selected phase is `done` or explicitly deferred with reason.
3. Identify final decisions, assumptions, blockers, findings, drift, validations, residual risks, and pending work.
4. Check whether any rule introduced by the patch must be reconciled into `docs/`, `AGENTS.md`, `sdd/core/`, or another live source.
5. Stop and ask the user if closure requires changing a source of truth or resolving a non-trivial trade-off.
6. Create or update `cierre.md` from the shared asset and complete the mandatory branch for `patch_kind`.
7. Classify validations:
  - `automated`: command executed with result
  - `manual`: human or manager review with evidence
  - `not applicable`: explicitly outside scope
  - `deferred`: not executed, with owner or reason
8. Update `patch.yaml` with `status: closed` and `closed_at` only when closure criteria are satisfied.
9. Run relevant validation commands and `git diff --check`.
10. Report closure result, files touched, validations, drift, decisions, residual risks, and next steps.

## Closure Levels

- `minimal`: narrow docs or artifact closure with no live-source reconciliation.
- `standard`: normal phase-complete patch closure with validation evidence.
- `batch`: grouped work closure with item-level status and no hidden follow-up.
- `anchored`: closure that reconciles changes against named `related_docs`.
- `drift-heavy`: closure after significant drift sync, with explicit before/after source-of-truth notes.

Choose the smallest level that truthfully covers the patch.

## Output

- `sdd/parches/<change-id>/cierre.md`
- optional `decision.log` entry only for a real closure decision
- optional `patch.yaml` status update when authorized
- final closure report

## Guardrails

- Do not close a patch as a substitute for executing unfinished phases.
- Do not hide failed validations as manual review.
- Do not delete historical artifacts during closure.
- Do not treat legacy workspaces as required to match current manifest rules unless a phase explicitly scopes that migration.

---
name: sdd-sync-drift
description: >
  Reconcile drift between SDD artifacts, contractual docs, and the current repo after execution reveals
  a mismatch. Trigger: When a completed or in-progress SDD phase under `sdd/parches/...` no longer matches `definicion.md`,
  `plan.md`, `tasks.md`, `decision.log`, backlogs, or repo reality. Do not use for new planning,
  broad redesign, phase execution, or Astro validation.
license: MPL-2.0
metadata:
  author: paw-paw
  version: "1.0"
---

## When to Use

- Execution found that planned work and reality diverged
- SDD artifacts need to reflect decisions or outcomes discovered during work
- Contractual docs may need explicit updates because the implementation changed visible behavior

## Inputs

- `sdd/parches/<change-id>/definicion.md`
- `sdd/parches/<change-id>/plan.md`
- `sdd/parches/<change-id>/tasks.md`
- `sdd/parches/<change-id>/decision.log`
- Relevant `backlog/faseN.md` files
- Current docs and implementation files related to the drift

## Critical Patterns

- Classify drift before editing: acceptable, needs decision, or needs contractual update
- Keep auxiliary artifacts aligned with what actually happened
- Do not use drift sync to reopen design by default
- Contractual docs still outrank SDD artifacts
- Record meaningful decisions in `decision.log`
- Preserve current artifact shapes from the relevant skill assets when updating SDD files

## Patch Manifest Awareness

- Include `patch.yaml` in every drift comparison for formal non-legacy workspaces.
- Missing `patch.yaml` is operational drift unless the workspace is legacy.
- Changing `patch_kind`, `lifecycle`, `status`, `created_at`, `closed_at`, or `related_docs` is structural drift and may require a recorded decision or human gate.
- Drift sync must also reconcile first-class assumptions when actual execution changes their status.

## Workflow

1. Read `docs/README.md`, the SDD artifacts, and relevant current files.
2. Compare original intent, plan, tasks, backlog findings, and actual state.
3. Classify each drift item:
   - acceptable and already within scope
   - needs a decision
   - needs contractual documentation update
   - should be reverted or deferred
4. Update auxiliary SDD artifacts to reflect accepted outcomes.
5. Add `decision.log` entries for real decisions.
6. List contractual documents that must be updated when drift affects canon.
7. Report unresolved drift and recommended next action.

## Outputs

- Updated SDD artifacts when drift is auxiliary
- `decision.log` entries for decisions
- Report of drift classifications, required contract updates, unresolved blockers, and risks

## Template Notes

- Preserve the current templates in skill assets when syncing `definicion.md`, `plan.md`, `tasks.md`, or `backlog/faseN.md`.
- Use skill-owned assets or `sdd/core/**` references for reusable SDD structure; do not depend on a shared templates directory.
- If a template no longer fits reality, report that as drift instead of silently inventing a new structure.

## Guardrails

- Do not modify contractual docs without stating why and keeping scope narrow.
- Do not redesign the feature unless the user explicitly asks.
- Do not treat implementation drift as canon by default.
- Do not hide unresolved contract conflicts.

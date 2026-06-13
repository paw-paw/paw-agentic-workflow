---
name: sdd-phase-backlog
description: >
  Convert one approved phase from `tasks.md` into a live execution backlog.
  Trigger: When a specific SDD phase is selected and needs `sdd/parches/.../backlog/faseN.md`
  with preconditions, checklist, validations, blockers, findings, and closure criteria. Do not use
  to design phases, implement work, sync drift, or verify Astro output.
license: MPL-2.0
metadata:
  author: paw-paw
  version: "1.0"
---

## When to Use

- Prepare one existing SDD phase for execution
- Convert phase-level tasks into an operational checklist
- Create a live place for blockers, findings, decisions, validations, and closure

## Inputs

- `sdd/parches/<change-id>/patch.yaml`
- `sdd/parches/<change-id>/tasks.md`
- Selected phase number or name
- `sdd/parches/<change-id>/plan.md`
- `sdd/parches/<change-id>/decision.log`, if present
- `assets/backlog-faseN.md`

## Critical Patterns

- Work on one phase only
- Keep the backlog scoped to the selected phase
- Preserve the macro sequence from `tasks.md`
- Record blockers instead of solving decisions silently
- If the manager delegates backlog drafting, only `sdd-artifact-writer` may write the assigned `backlog/faseN.md`
- Do not implement while creating the backlog

## Patch Manifest Awareness

- `patch.yaml` is required for formal non-legacy backlog creation.
- Read `patch_kind`, `lifecycle`, `status`, and `related_docs` before creating or updating `backlog/faseN.md`.
- Use the shared backlog asset, but complete the mandatory `spec` or `batch` branch for the current patch type.
- Keep `status` in `patch.yaml` separate from backlog phase status.
- Do not change `patch_kind` or `lifecycle` from this skill; record a blocker if the selected phase requires that structural decision.

## Granularity Requirements

The backlog must be implementation-ready, not only governance-ready.

Do not copy phase tasks as-is. Decompose every macro task into step-level actions.

A checklist item is valid only if it is directly executable or directly verifiable.

Prefer this level of detail:

- read `<file>` with focus on `<section>`
- inspect whether `<condition>` is true
- edit `<file>` to add/update/remove `<specific contract>`
- preserve `<constraint>`
- do not touch `<file/path/surface>`
- run `<command>` when applicable
- verify `<expected result>`
- record `<decision/finding/blocker>` in `<file>`

Avoid vague standalone verbs:

- update
- align
- improve
- review
- validate
- sync
- register

These verbs are allowed only when followed by the exact target, expected change, and validation condition.

Each backlog should separate files or surfaces into:

- read before editing
- edit
- validate
- do not touch

When the phase requires technical verification, include exact commands instead of generic validation notes.

## Workflow

1. Read `tasks.md`, the selected phase, the plan, and decision log.
2. Confirm the phase has enough detail to execute.
3. Expand each selected phase task into implementation passes:
  - source reread
  - current-state inspection
  - file-level edit checklist
  - validation plan
  - decision/finding capture
  - closure checks
4. Create or update `sdd/parches/<change-id>/backlog/faseN.md` from `.codex/skills/sdd-phase-backlog/assets/backlog-faseN.md`.
5. Keep checklist items concrete and reviewable.
6. Report whether the backlog is ready for `sdd-execute-phase`.

Optional delegation:

- The active manager may delegate one assigned `backlog/faseN.md` update to `sdd-artifact-writer`.
- Create only the selected phase backlog for that writer.

## Outputs

- `sdd/parches/<change-id>/backlog/faseN.md`
- Short readiness report for the selected phase

## Template Notes

- Use the shared `assets/backlog-faseN.md` asset.
- Complete the mandatory branch for `patch_kind` and the `Assumptions` section before execution.
- Create only the selected phase backlog unless the user explicitly asks for more.

## Guardrails

- Do not edit product/runtime files.
- Do not create backlogs for multiple phases in one pass unless explicitly requested.
- Do not change phase order without a recorded decision.
- Do not hide missing preconditions.

---
name: sdd-plan
description: >
  Convert an existing SDD `definicion.md` into a brownfield technical plan for this repo.
  Trigger: When a spec-driven change already has a definition under `sdd/parches/...` and needs its `plan.md`,
  affected areas, risks, dependencies, and validations. Do not use for intake, task breakdown, backlog
  creation, implementation, drift sync, or separate domain verification.
license: MPL-2.0
metadata:
  author: paw-paw
  version: "1.0"
---

## When to Use

- Plan a spec-driven change after `sdd/parches/<change-id>/definicion.md` exists
- Translate approved intent into a technical approach grounded in the current repo
- Identify affected docs, code, assets, tests, config, i18n, SEO, or deployment surfaces

## Inputs

- `sdd/parches/<change-id>/patch.yaml`
- `sdd/parches/<change-id>/definicion.md`
- `sdd/parches/<change-id>/decision.log`, if present
- Contractual documents listed in `docs/README.md`
- Relevant current files from the repo
- `assets/spec/plan.md` or `assets/batch/plan.md`, selected from `patch_kind`

## Critical Patterns

- `docs/README.md` governs precedence inside `docs/`
- `AGENTS.md` governs operational behavior
- `sdd/parches/` artifacts are the contractual SDD workspace and cannot override contractual docs
- Stop if the definition conflicts with contractual docs; require explicit sync before planning
- Keep the plan brownfield: prefer existing repo patterns and name concrete affected surfaces
- Do not create `tasks.md`, phase backlogs, code changes, or validation results
- If the manager delegates plan drafting, only `sdd-artifact-writer` may write the assigned `plan.md`
- If the manager delegates plan drafting, the manager remains responsible for blocker classification, human-decision calls, and final plan readiness.

## Patch Manifest Awareness

- `patch.yaml` is required for formal non-legacy planning.
- Read `change_id`, `program_id`, `patch_kind`, `lifecycle`, `status`, `created_at`, `closed_at`, and `related_docs` before planning.
- Select the plan asset from `patch_kind`.
- If `lifecycle = spec-anchored`, include `related_docs` in affected surfaces and validation strategy.
- Stop if critical assumptions are unresolved, unaccepted, or not escalated.

## Workflow

1. Read `docs/README.md`, `AGENTS.md`, `patch.yaml`, the definition, and any `decision.log`.
2. Identify the contractual documents and repo areas that govern the change.
3. Inspect the current implementation only where needed to understand brownfield constraints.
4. Select the plan asset from `patch_kind` and draft or update `plan.md`.
5. Keep assumptions first-class and classify every critical assumption before readiness.
6. Add entries to `decision.log` only for meaningful decisions discovered while planning.
7. Report unresolved blockers and the next expected skill, usually `sdd-tasks`.

Optional delegation:

- The active manager may delegate one assigned `plan.md` update to `sdd-artifact-writer`.
- The writer must stay inside `sdd/parches/<change-id>/` and must not decide scope changes.

## Outputs

- `sdd/parches/<change-id>/plan.md`
- Optional `decision.log` entries for real planning decisions
- Short report of blockers, assumptions, and next step

## Template Notes

- Use `assets/spec/plan.md` when `patch_kind = spec`.
- Use `assets/batch/plan.md` when `patch_kind = batch`.
- Keep the plan brownfield and do not generate phase tasks inside it.

## Guardrails

- Do not implement code or edit runtime files.
- Do not generate phase tasks or operational checklists.
- Do not invent new conventions without recording them.
- Do not treat SDD artifacts as product canon.

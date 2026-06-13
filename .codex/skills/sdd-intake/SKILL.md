---
name: sdd-intake
description: >
  Create the initial SDD workspace for a broad change from a handover, brief, or ambiguous idea.
  Trigger: When the user wants to start a spec-driven change and needs a workspace under
  `sdd/parches/...` with `handover.md`,
  `definicion.md`, and optional `decision.log`. Do not use for small routine edits, technical planning,
  task breakdown, backlog creation, implementation, drift sync, or verification.
license: Apache-2.0
metadata:
  author: paw-paw
  version: "1.0"
---

## When to Use

- Turn a handover, brief, or broad idea into an initial SDD workspace
- Capture goal, scope, non-goals, sources of truth, risks, open decisions, and closure criteria
- Decide whether the change is large enough to justify SDD

## Inputs

- Approved `sdd-triage` classification
- User brief, handover, or source material
- Optional `change-id`
- Applicable docs from `docs/`
- Current repo context only where needed to understand scope
- `assets/spec/definicion.md` or `assets/batch/definicion.md`, selected from `patch_kind`

## Critical Patterns

- Read `docs/README.md` and `AGENTS.md` first
- Treat `sdd/parches/` as the contractual workspace for SDD changes, while `docs/` remains contract canon
- If the change is small, recommend the normal `AGENTS.md` workflow instead of forcing SDD
- Identify contractual docs that govern the change
- If the manager delegates drafting, only `sdd-artifact-writer` may write the assigned artifact and only under explicit skill authorization
- Do not plan implementation, create tasks, create backlogs, or edit runtime
- Ask questions in grouped decision batches, not as scattered interruptions.
- Prefer recommended options and explicit defaults to reduce user decision load.
- Compare user input against repo reality before asking contract-aware questions.
- Treat unclear but non-blocking information as assumptions, risks, or open decisions.

## Patch Manifest Awareness

- `sdd-intake` creates `patch.yaml` at the start of every formal non-legacy patch.
- Use the approved `sdd-triage` classification for `change_id`, `program_id`, `patch_kind`, `lifecycle`, and `related_docs`.
- Set `created_at` to the intake start date and `closed_at` to `null`.
- If an existing non-legacy workspace already has `patch.yaml`, read it and keep the definition consistent with it.
- Legacy under `sdd/parches/legacy/**` remains exempt from manifest requirements.

## Interaction Model

`sdd-intake` uses staged interaction. Questions are allowed, but they must happen at defined intake boundaries.

Default behavior: do not run an open-ended interview. Use grouped question batches, proposed defaults, and explicit assumptions.

### Round 0: Minimal intake clarification

Use only when the user input is too vague to identify the change type, likely governing docs, or whether SDD is justified.

Ask only definition-level questions needed to start intake:

- what change is being requested
- what outcome should exist when the change closes
- whether source material should be preserved
- whether the user already has a desired `change-id`

Skip this round when the brief is specific enough to identify likely contracts.

### Round 1: Contract-aware intake questions

After reading `docs/README.md`, `AGENTS.md`, and likely applicable contracts, compare the user input against repo reality.

Ask a grouped batch of questions only when needed to resolve:

- source-of-truth conflicts
- scope boundaries
- non-goals
- whether contract updates are intended
- whether SDD is justified
- ownership or approval of product/content decisions

When input and repo reality differ, ask whether the mismatch should be treated as:

- input error
- intended contract change
- open decision
- blocker

### Round 2: Post-draft questions

After creating or updating `definicion.md`, report any questions discovered during drafting.

Classify them as:

- blocking before `sdd-plan`
- non-blocking, can be handled during `sdd-plan`
- implementation risks for later phases

Do not open a new exploratory interview after the draft.

## Question Format

When asking intake questions, prefer decision cards over open-ended questions.

Use this structure:

- Question
- Problem
- Option A — recommended
- Option B
- Option C
- Recommendation rationale

The user should be able to answer with compact replies such as `1A, 2C, 3A` or `accept recommendations`.

Use open-ended questions only when:

- the objective is too vague to infer
- the user’s strategic intent is unknown
- non-goals cannot be safely enumerated
- source material needs human interpretation
- a repo/input conflict involves product judgment
- available options would falsely narrow the decision

Do not ask open-ended implementation questions during intake.

## Workflow

1. Read the approved `sdd-triage` classification and the source material.
2. If triage did not produce a safe classification, ask only the missing decision-level questions.
3. Create `patch.yaml` immediately for the formal non-legacy patch.
4. Read `docs/README.md`, `AGENTS.md`, and likely applicable contracts.
5. Compare user intent against repo reality.
6. Run Round 1 questions if contract-aware clarification is needed.
7. Create or update `handover.md` only when source material should be preserved for traceability.
8. Select the `definicion` asset from `patch_kind` and create or update `definicion.md`.
9. Record assumptions, open decisions, blockers, and risks explicitly inside `definicion.md`.
10. Create `decision.log` only when real initial decisions exist.
11. Report the intake result, recommended next step, and Round 2 post-draft questions if any.

Optional delegation:

- The active manager may delegate one assigned artifact draft to `sdd-artifact-writer`.
- Allowed targets for this skill: `handover.md`, `definicion.md`, and `decision.log`.
- Do not delegate multiple artifacts in parallel to the same writer.

## Decision Log Policy

Create `decision.log` only for decisions that affect:

- scope
- precedence
- contract interpretation
- naming
- ownership
- downstream planning or execution

Do not create `decision.log` for mechanical facts such as:

- file creation
- template usage
- copied brief content
- obvious path normalization
- routine intake notes

If a decision is still unresolved, record it in `definicion.md` as an open decision instead of logging it as decided.

## Outputs

- `sdd/parches/<change-id>/patch.yaml`
- Optional `sdd/parches/<change-id>/handover.md`
- `sdd/parches/<change-id>/definicion.md`
- Optional `sdd/parches/<change-id>/decision.log`
- Intake report with:
  - SDD fit: `yes` | `no` | `borderline`
  - inferred or confirmed `change-id`
  - created or updated files
  - governing contracts reviewed
  - assumptions made
  - repo/input mismatches found
  - blocking issues, if any
  - open decisions carried into `definicion.md`
  - Round 2 post-draft questions, if any
  - recommended next step: `sdd-plan` | normal `AGENTS.md` workflow | user decision required

## Template Notes

- Use `assets/spec/definicion.md` when `patch_kind = spec`.
- Use `assets/batch/definicion.md` when `patch_kind = batch`.
- Keep `decision.log` shared across both types.
- There is no dedicated `handover.md` template; preserve source material only when it adds traceability.

## Guardrails

- Do not create implementation plans.
- Do not create `tasks.md` or `backlog/`.
- Do not silently change contractual docs.
- Do not use raw external sources as runtime truth.
- Do not ask scattered follow-up questions outside the defined interaction rounds.
- Do not ask questions that are already answered by `docs/README.md`, `AGENTS.md`, or applicable contracts.
- Do not block intake on non-blocking uncertainty; record it as an assumption, risk, or open decision.
- Do not ask implementation, task sequencing, backlog, or validation-command questions during intake.
- Do not treat user input as higher precedence than repo contracts unless the user explicitly intends a contract change.
- Do not mark the definition as ready for `sdd-plan` if a blocking product, scope, or contract decision remains unresolved.

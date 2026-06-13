---
name: sdd-triage
description: >
  Classify a new change before a formal SDD workspace exists. Trigger when the user brings a fresh idea,
  handover, or ambiguous request and the system must decide whether SDD applies, propose identity and type,
  detect split pressure, surface human blockers, or hand an existing workspace to `sdd-router`.
license: Apache-2.0
metadata:
  author: paw-paw
  version: "1.0"
---

# sdd-triage

## When to Use

- Classify a new idea, handover, or broad request before any formal patch exists
- Decide whether the work needs SDD or should use the normal `AGENTS.md` workflow
- Propose `change-id`, `patch_kind`, `lifecycle`, and `program_id` when SDD applies
- Detect when the request should split before intake
- Route to `sdd-router` when a workspace already exists

## Inputs

- User brief, handover, or source material
- `docs/README.md`
- `AGENTS.md`
- Relevant live docs only as needed to judge anchoring or contract impact
- Existing workspaces under `sdd/parches/` only to detect collisions or pre-existing state

## Critical Patterns

- Treat this skill as read-only classification
- Do not create persistent artifacts by default
- Prefer the smallest competent workflow; explicitly return `no SDD` for small, local, reversible work
- Keep triage before intake: classify first, formalize later
- If a workspace already exists, stop classifying and route to `sdd-router`
- Ask grouped decision questions only when classification would otherwise be unsafe

## Classification Contract

Return:

- SDD fit: `yes` | `no` | `borderline`
- proposed `change-id`
- proposed `patch_kind`: `spec` | `batch`
- proposed `lifecycle`: `spec-first` | `spec-anchored`
- proposed `program_id`, when applicable
- whether a split is recommended
- whether source material should be preserved later as `handover.md`
- blocking human questions, if any
- exact next step: `sdd-intake`, `sdd-router`, or normal `AGENTS.md` workflow

## Batch Rules

Recommend `batch` only when the request has:

- a closed list of items
- one global closure criterion
- a closure criterion per item
- no internal dependencies complex enough to become a hidden spec

Recommend split or escalation to `spec` when the request:

- loses readability
- mixes incompatible lifecycles
- carries complex internal dependencies
- changes source of truth, architecture, validation strategy, or durable convention

## Workflow

1. Read `docs/README.md`, `AGENTS.md`, and the source material.
2. Check whether a matching workspace already exists.
3. Decide whether normal workflow, `batch`, or `spec` fits best.
4. Propose identity and lifecycle.
5. Surface only the human questions that block safe classification.
6. Return the structured triage report without creating files.

## Output Contract

Return exactly:

1. `SDD fit`
2. `Recommended classification`
3. `Why`
4. `Split recommendation`
5. `Source preservation`
6. `Blocking questions`
7. `Exact next step`

## Guardrails

- Do not create `patch.yaml`, `handover.md`, `definicion.md`, or any other artifact
- Do not plan implementation
- Do not diagnose existing workspaces instead of routing them
- Do not use user input as a higher source of truth than live contracts unless the user explicitly requests a contract change

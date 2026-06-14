---
name: sdd-router
description: >
  Diagnose the current SDD state of a change and recommend the next correct local SDD skill or normal workflow.
  Use when the user is unsure which SDD step applies, when artifacts may be missing, or when routing between
  intake, plan, tasks, backlog, execution, and drift sync is needed. Does not modify files.
license: MPL-2.0
metadata:
  author: paw-paw
  version: "1.0"
---

# sdd-router

## When to Use

- Diagnose where a change is inside the SDD flow
- Decide whether SDD is needed at all
- Detect drift, missing artifacts, or a decision gate
- Recommend the exact next local skill and the next prompt

## Inputs

- User brief or current request
- Optional `change-id` or artifact paths
- Existing SDD artifacts under `sdd/parches/`
- Repo state only as needed to classify the change
- `docs/README.md`
- `AGENTS.md`
- `sdd/orchestration/skill-routing.md`
- `sdd/orchestration/artifact-state-machine.md`
- `sdd/orchestration/decision-gates.md`
- `sdd/orchestration/drift-policy.md`
- `sdd/orchestration/subagent-policy.md`
- `sdd/orchestration/model-policy.md`

## Critical Patterns

- Read `AGENTS.md` and `docs/README.md` first
- Use the smallest competent process
- Treat this skill as advisory and read-only
- Do not modify files
- Do not run validations
- Do not default to subagents
- Do not treat implementation state as new truth when docs disagree
- Stop when a human decision gate is required

## Patch Manifest Awareness

- If `sdd/parches/<change-id>/patch.yaml` exists, read it before routing and treat its fields as routing constraints.
- For formal non-legacy workspaces created after the manifest model exists, a missing `patch.yaml` is a state finding, not something `sdd-router` fixes directly.
- Do not require `patch.yaml` for `sdd-intake`, legacy workspaces, or explicitly documented pre-manifest transitional work.
- Route manifest creation or repair to the correct SDD phase or drift sync; do not edit it from this skill.

## Routing Heuristics

- No workspace, or only handover material -> `sdd-intake`
- `definicion.md` exists, `plan.md` does not -> `sdd-plan`
- `plan.md` exists, `tasks.md` does not -> `sdd-tasks`
- `tasks.md` exists, selected phase lacks `backlog/faseN.md` -> `sdd-phase-backlog`
- `backlog/faseN.md` exists and the phase is ready -> `sdd-execute-phase`
- execution differs from artifacts, or decisions were not recorded -> `sdd-sync-drift`
- an installed domain verifier explicitly required by the active backlog -> that verifier after implementation
- change is small, local, reversible, and clearly covered by normal repo workflow -> no SDD
- docs conflict, scope is unclear, or a human choice is required -> stop and escalate

If the user explicitly named a concrete skill and the state is already clear, respect that skill unless the artifacts clearly contradict it.

## Workflow

1. Read `AGENTS.md`, `docs/README.md`, and the relevant artifacts.
2. Classify the current state of the change.
3. Choose one primary recommendation.
4. Recommend subagents only if they materially reduce ambiguity.
5. Recommend model effort only if the state is conflicted or high risk.
6. Produce the response in the output contract below.

## Output Contract

Return exactly these sections:

1. `SDD state`
   - detected state
   - existing artifacts
   - missing artifacts
2. `Recommended next skill`
   - one primary recommendation
   - brief reason
3. `Why not the others`
   - short contrast with the main alternatives
4. `Required inputs`
   - files or facts the next skill needs
5. `Subagent recommendation`
   - none, or a minimal list of read-only advisory subagents
6. `Risk level`
   - `low`, `medium`, or `high`
   - short justification
7. `Human decision needed`
   - `yes` or `no`
   - what decision is missing if `yes`
8. `Exact next prompt`
   - a short prompt ready to paste into Codex

Keep the answer concise. Do not add extra sections unless the state is ambiguous and the user explicitly asks for more detail.

## Subagent Guidance

- `sdd-repo-mapper`: when file/routing impact is unclear
- `sdd-docs-checker`: when contract drift or source-of-truth risk is the main issue
- `sdd-risk-reviewer`: when scope creep, regression, or long-lived convention risk is the main issue
- `sdd-test-reviewer`: when validation choice is unclear
- `sdd-drift-reviewer`: when the main issue is drift between artifacts and reality

Use subagents only as advisory, read-only evidence. Do not launch them by default.

## Guardrails

- Do not create or modify files
- Do not run build, test, or preview commands
- Do not act as the manager for the full change
- Do not replace `AGENTS.md` or the seven SDD skills
- Do not force SDD when the change is small and clearly handled by normal repo workflow
- Do not ignore a human decision gate

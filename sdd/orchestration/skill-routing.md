# Skill Routing

Use this document to decide the next SDD skill or whether SDD is unnecessary.

It is auxiliary. It describes the routing contract used by `sdd-router` and does not replace `.codex/skills/*/SKILL.md`.

---

## Routing overview

The normal SDD sequence is:

```text
triage -> intake -> plan -> tasks -> phase backlog -> execution -> drift sync
```

`sdd-router` performs routing diagnosis for the active session.
Routing must be based on existing artifacts, user intent, repo scope, and governing docs. Do not invent missing artifacts or treat an implementation state as new truth.

---

## Use routing diagnosis when

Use routing diagnosis when:

- the user asks what SDD step comes next
- the user asks to orchestrate a SDD change
- artifacts are missing, incomplete, stale, or out of sequence
- the current state is ambiguous
- there may be drift between docs, SDD artifacts, code, or validations
- it is unclear whether the change needs SDD at all

The active Codex session remains the runtime manager, but `sdd-router` is the skill that should encode this routing contract.

---

## Use sdd-triage when

Use `sdd-triage` when:

- there is a new idea, handover, brief, or ambiguous change request
- no SDD workspace exists yet
- it is not yet clear whether the work needs SDD
- the system must propose `change-id`, `patch_kind`, `lifecycle`, `program_id`, split guidance, or blocking questions

`sdd-triage` classifies new input and may return `no SDD`. It does not create persistent artifacts by default.

## Use sdd-intake when

Use `sdd-intake` when:

- `sdd-triage` already classified the input as SDD-worthy
- no SDD workspace exists for the change
- `sdd/parches/<change-id>/definicion.md` does not exist
- the change needs a traceable starting point before planning
- the correct output is `patch.yaml`, optional `handover.md`, `definicion.md`, and optional `decision.log`

Do not use it to plan implementation, create tasks, create phase backlogs, or edit runtime files.

---

## Use sdd-plan when

Use `sdd-plan` when:

- `sdd/parches/<change-id>/definicion.md` exists
- `sdd/parches/<change-id>/plan.md` does not exist or is clearly stale
- the change needs brownfield technical interpretation
- affected docs, code, config, assets, tests, i18n, SEO, or deployment surfaces must be identified
- risks, dependencies, and validations must be made explicit

Do not use it to create `tasks.md`, create `backlog/faseN.md`, or implement changes.

---

## Use sdd-tasks when

Use `sdd-tasks` when:

- `sdd/parches/<change-id>/plan.md` exists
- `sdd/parches/<change-id>/tasks.md` does not exist or needs sync
- the plan needs macro phases and executable tasks
- dependencies between phases need to be visible
- deferred or optional work must be separated from the current delivery

Do not use it for command-level checklists or implementation.

---

## Use sdd-phase-backlog when

Use `sdd-phase-backlog` when:

- `sdd/parches/<change-id>/tasks.md` exists
- a specific phase is selected
- `sdd/parches/<change-id>/backlog/faseN.md` does not exist or needs update
- the phase needs a live checklist, blockers, findings, validations, and closure criteria

Do not use it to implement the phase. The output is a backlog ready for `sdd-execute-phase`.

---

## Use sdd-execute-phase when

Use `sdd-execute-phase` when:

- `sdd/parches/<change-id>/backlog/faseN.md` exists
- the selected phase is ready or explicitly requested by the user
- the user wants real work to advance
- the backlog should be updated during execution
- findings, decisions, blockers, validations, and closure status must be recorded

Do not broaden the phase scope for convenience. Stop if a decision gate appears.

---

## Use sdd-sync-drift when

Use `sdd-sync-drift` when:

- execution diverges from `definicion.md`, `plan.md`, `tasks.md`, or `backlog/faseN.md`
- a significant decision was made but not recorded
- the backlog no longer reflects actual work
- docs and code conflict
- validations reveal that the plan or tasks are no longer accurate

Do not use it to redesign the change by default.

---

## Use no SDD when

Use the normal `AGENTS.md` workflow instead of SDD when the change is:

- small
- local
- reversible
- clear
- not a product, contract, architecture, routing, i18n, SEO, deployment, validation, or visible behavior decision
- already covered by a narrow installed skill

Small changes can still require documentation if they reveal drift or affect a contractual decision.

---

## Routing output contract

A routing recommendation must return:

- recommended skill or normal workflow
- reason
- existing artifacts
- missing artifacts
- required inputs
- suggested subagents, if any
- risk
- next prompt or next action

If the state is ambiguous, report the ambiguity instead of forcing a step.

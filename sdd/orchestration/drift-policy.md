# Drift Policy

This document defines how to detect and respond to drift during SDD work.

It is auxiliary. It does not replace `sdd-sync-drift`; it explains when that skill is appropriate.

---

## Definition

Drift is any divergence between:

- `definicion.md`
- `plan.md`
- `tasks.md`
- `backlog/faseN.md`
- `decision.log`
- contractual docs
- code reality
- validation results
- visible behavior

Drift can appear during planning, backlog creation, execution, validation, or review.

---

## Core rule

Code does not automatically become the new truth.

If code and docs diverge, report the divergence and either sync the correct artifact or ask for human decision.

Do not hide drift by silently changing implementation, weakening validation, or reinterpreting the plan after the fact.

---

## Drift categories

- `minor drift`: wording, status, checklist, or execution note that does not change scope or sequence.
- `operational drift`: phase sequence, checklist, validation, or affected file list changes, but the approved scope remains intact.
- `contractual drift`: definition, plan, expected behavior, public claim, source of truth, validation strategy, or contractual doc would need to change.
- `blocking drift`: work should not continue without human decision.

Classify the drift before editing.

---

## Detection signals

Common signals:

- a phase requires tasks not listed in `tasks.md`
- the plan mentions files that do not exist
- implementation requires route, SEO, deployment, i18n, schema, or config changes not planned
- the backlog no longer reflects executed work
- expected validations do not exist
- validation results contradict the expected state
- code contradicts docs
- a significant decision appears but is not in `decision.log`
- a subagent or reviewer reports a conflict between artifacts

---

## Response by drift category

- `minor drift`: update the backlog, status, or execution note.
- `operational drift`: update the relevant backlog or `tasks.md`; record a decision if execution sequence or validation meaning changes.
- `contractual drift`: stop or propose sync to `definicion.md`, `plan.md`, `decision.log`, or contractual docs before continuing.
- `blocking drift`: stop, mark the blocker, and ask the user for a decision.

When the correct response is unclear, state the classification uncertainty and recommend the smallest safe sync.

---

## Use sdd-sync-drift when

Use `sdd-sync-drift` when:

- drift is operational or larger
- a decision was made but not recorded
- docs and code conflict
- a phase cannot complete faithfully
- `plan.md`, `tasks.md`, or `backlog/faseN.md` became obsolete
- validation strategy changed
- contractual docs may need explicit update

The goal is synchronization, not redesign.

---

## Do not use sdd-sync-drift when

Do not use `sdd-sync-drift` when:

- only a checklist item needs to be marked
- a minor execution note is missing
- the correction is local and inside the active phase
- no higher artifact changes meaning
- the driver is discomfort rather than evidence
- the user asked for direct execution and no drift exists

Use the live backlog for ordinary execution updates.

---

## Drift report contract

A drift report should include:

- drift summary
- category
- affected artifacts
- recommended sync action
- `decision.log` implications
- whether human review is required
- files to update
- risks if ignored

Keep the report short enough for a decision.

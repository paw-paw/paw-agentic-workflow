# Subagent Policy

This document defines when to use local subagents during SDD work.

It is auxiliary. The active Codex session remains responsible for decisions, edits, validation choices, and final reporting.

---

## Default rule

Do not use subagents by default.

Use them only when they buy evidence, cleaner context, independent review, or parallel inspection that materially reduces risk.

Subagents are advisory by default. They do not replace the active Codex session, `AGENTS.md`, governing docs, or the selected skill.

This repo also allows two controlled writers:

- `sdd-artifact-writer`: writes one assigned SDD artifact under `sdd/parches/<change-id>/`
- `sdd-phase-worker`: executes one approved phase and may update its live backlog only when the manager delegates that responsibility

These writers are not general-purpose. They exist to reduce manager editing load without changing ownership.

---

## Common delegation contract

Every subagent request should include:

- assigned role
- exact question
- relevant paths or artifacts
- scope boundary
- expected output
- whether writing is allowed
- whether human decision gates should stop the task

Every subagent response should include evidence for non-trivial findings: paths, artifact names, commands, validation results, symbols, or explicit uncertainty.

---

## Subagent roles

- `sdd-repo-mapper`: identifies relevant files, folders, routes, components, configs, scripts, and execution paths.
- `sdd-docs-checker`: checks `AGENTS.md`, docs contracts, SDD artifacts, missing docs, and docs-code drift risk.
- `sdd-risk-reviewer`: reviews correctness risks, regressions, scope creep, contract drift, and decisions needing escalation.
- `sdd-test-reviewer`: identifies available validation commands, required checks, optional checks, and manual review needs.
- `sdd-drift-reviewer`: compares SDD artifacts against repo reality and classifies drift.
- `sdd-artifact-writer`: drafts or updates one explicitly assigned SDD artifact.
- `sdd-phase-worker`: executes one explicitly assigned SDD phase.

Use the role whose output answers a concrete question. Do not spawn a full panel when one targeted read is enough.

---

## Delegation matrix

| Need | Use | Do not use |
| --- | --- | --- |
| Locate affected files, routes, components, configs, scripts | `sdd-repo-mapper` | writers |
| Check governing docs, missing docs, stale docs, docs-code drift | `sdd-docs-checker` | `sdd-phase-worker` |
| Review scope creep, regression risk, hidden assumptions, escalation points | `sdd-risk-reviewer` | `sdd-artifact-writer` |
| Identify validation path, available scripts, manual review needs | `sdd-test-reviewer` | writers |
| Check drift between SDD artifacts and repo reality | `sdd-drift-reviewer` | generic risk review |
| Draft or update one SDD artifact | `sdd-artifact-writer` | any read-only reviewer |
| Execute one approved phase | `sdd-phase-worker` | artifact writer |

---

## When to use subagents

Consider subagents when:

- the task is read-heavy
- multiple repo areas must be inspected in parallel
- there is drift risk between docs, SDD artifacts, and implementation
- build, routing, SEO, deployment, i18n, public assets, or visible output could be affected
- independent risk or validation review would catch likely mistakes
- the active session would be overloaded by broad exploration or logs
- a bounded specialist answer can unblock the next step

Delegation should be specific: give paths, artifacts, phase, question, and expected output.

---

## When not to use subagents

Do not use subagents when:

- the change is small and local
- affected files are already known
- the next step is obvious
- the task is writing a single document from an approved backlog
- a subagent would need to reread the whole repo to add little value
- the user did not ask for parallel work and the main session is not blocked
- the decision belongs to the human user

Subagents are not a substitute for reading the selected skill or the live backlog.

---

## Read-only default

Project-scoped `.codex/agents/*.toml` profiles are read-only/advisory by default.

Default rules:

- the active Codex session writes files
- subagents inspect and report
- do not use controlled writers unless a concrete SDD skill explicitly authorizes them
- do not use multiple writers on the same artifact or implementation zone
- do not let a writer change contractual docs unless a future explicit workflow authorizes it
- do not use subagents to bypass user approval

When a task explicitly uses a controlled writer:

- assign one artifact or one implementation zone
- pass the exact source artifacts or backlog
- keep the manager responsible for integration
- stop if a human decision gate appears

Skill-level authorization in the current repo:

- `sdd-intake`, `sdd-plan`, `sdd-tasks`, `sdd-phase-backlog`: may delegate one artifact at a time to `sdd-artifact-writer`
- `sdd-execute-phase`: may delegate one approved phase to `sdd-phase-worker`

---

## Output discipline

Evidence is mandatory for non-trivial claims.

A finding without a path, artifact, command, observed mismatch, or stated uncertainty should be treated as advisory but weak.

Subagent output should be bounded and evidence-based.

Ask for:

- paths
- relevant symbols or commands
- risks
- validation recommendations
- drift classification
- unresolved questions
- escalation points

Avoid long generic reports. A useful subagent answer should make the next manager decision easier.

---

## Conflict handling

If subagents disagree:

- do not concatenate findings as if both are equally true
- compare evidence and paths
- inspect the decisive file locally if needed
- ask a narrower follow-up only when it will resolve the conflict
- escalate to the user when the conflict affects scope, contracts, architecture, validation strategy, or public behavior
- record a decision if the resolution affects SDD artifacts or future interpretation

The active Codex session owns the final decision.

---

## Concurrency limits

Respect `.codex/config.toml`:

- `agents.max_threads = 4`
- `agents.max_depth = 1`
- `agents.job_max_runtime_seconds = 1200`

Avoid recursive fan-out. Use the smallest number of subagents that can answer the question.

Subagents should not spawn subagents in this repo unless a future documented change explicitly allows it.

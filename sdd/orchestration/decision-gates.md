# Decision Gates

This document defines when Codex must stop and ask for human decision during SDD work.

It is auxiliary. It does not override `AGENTS.md` or the precedence rules in `docs/README.md`.

---

## Core rule

Codex may resolve small local decisions inside an approved scope.

Codex must escalate decisions that affect scope, contracts, architecture, visible behavior, validation strategy, public claims, or long-lived repo conventions.

When in doubt, state the uncertainty and present the smallest useful choice to the user.

---

## Always escalate

Stop and ask the user before:

- changing routing
- changing i18n
- changing structural SEO
- changing deployment or domain
- adding dependencies
- deleting governed documents, implementation surfaces, assets, or sections
- introducing a new convention
- changing the content model
- changing a source of truth
- expanding scope beyond the approved plan
- contradicting contractual docs
- resolving a large trade-off without user instruction
- authorizing a writer outside the skill or phase/artifact scope documented for it
- modifying `.codex/skills/`, `.codex/agents/`, `.codex/config.toml`, or `AGENTS.md` when the current SDD phase excluded those files
- treating a non-existing skill as active

---

## May resolve locally

Codex may resolve:

- minor wording inside an approved document
- local naming that is not contractual
- order of tasks inside an approved phase
- additional non-invasive validation
- small corrections that preserve expected behavior
- checklist status updates that reflect already executed work
- cross-references to paths already approved by the plan

Record the decision only if it changes scope, sequence, responsibility, validation, or future interpretation.

---

## Decision.log usage

Use `decision.log` for significant decisions.

Include:

- date
- context
- decision
- options considered, when useful
- rationale
- impact
- affected artifacts or areas

Do not fill `decision.log` with microdecisions that are obvious from the changed file.

---

## Stop conditions

Stop when:

- a decision blocks implementation
- multiple viable routes have meaningful trade-offs
- the user must choose scope
- the decision affects a public promise of the repository
- validation fails and fixing it requires changing approach
- the plan, tasks, or backlog no longer describe the work accurately
- a contractual doc would need to change

If stopping, leave the current backlog in a truthful `blocked` state or record the blocker before ending.

---

## Decision output contract

When asking for human decision, return:

- situation
- why it matters
- options
- recommendation
- impact of each option
- file or artifact to update after the decision
- whether work can continue elsewhere while waiting

Do not bury the decision inside a long status report.

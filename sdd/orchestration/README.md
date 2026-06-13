# SDD Orchestration

This folder contains on-demand support rules for orchestrating SDD changes in this repo.

It does not replace `AGENTS.md`, `docs/README.md`, local skills, phase backlogs, or human approval. Use it only when the active Codex session needs deeper coordination rules than the current task or skill already provides.

---

## Purpose

`sdd/orchestration/` helps the active Codex session decide how to move a spec-driven change through the SDD workflow.

It explains when to use each SDD skill, how `sdd-triage` hands new work to `sdd-intake`, when to prepare or execute phase backlogs, when subagents can add value, when to escalate to the user, and how to handle drift between docs, SDD artifacts, code, and validations.

This folder is auxiliary operational documentation under `sdd/`. It cannot override contractual docs or the precedence rules in `docs/README.md`.

---

## When to read this folder

Read this folder when:

- the user asks to orchestrate a SDD change
- the current change state is ambiguous
- it is unclear which SDD skill should run next
- artifacts are incomplete, stale, or out of sequence
- drift appears between docs, SDD artifacts, code, or validation results
- a phase is executing and new risks, blockers, or decisions appear
- subagents, model effort, or human decision gates need coordination

---

## When not to read this folder

Do not read this folder as a ceremonial step.

Do not use it for:

- small, local, obvious changes that fit the normal `AGENTS.md` workflow
- simple editorial tasks with a clear target file
- blog workflows already covered by a concrete blog skill
- cases where the user named a specific skill and the context is clear
- runtime implementation details that should be resolved by code, tests, or an existing skill

If the work is small, reversible, and does not introduce a product, contract, routing, validation, or visible behavior decision, use the normal repo workflow instead of forcing SDD.

---

## Document map

- `orchestration-rules.md`: general rules for the active orchestration manager.
- `skill-routing.md`: how `sdd-router` and the active orchestration manager choose the next SDD skill.
- `artifact-state-machine.md`: expected SDD artifacts, states, and transitions.
- `subagent-policy.md`: when to use advisory subagents and the two controlled writers.
- `model-policy.md`: model and reasoning effort policy.
- `decision-gates.md`: when Codex must stop for human decision.
- `drift-policy.md`: how to detect, classify, and respond to drift.

---

## Relationship to repo rules

- `docs/README.md` defines precedence inside `docs/`.
- Contractual docs in `docs/` outrank SDD support artifacts.
- `AGENTS.md` defines repo-wide operational behavior.
- `.codex/skills/*/SKILL.md` defines skill-specific workflows.
- `.codex/agents/*.toml` defines local advisory profiles and the two controlled writer profiles.
- `sdd/parches/<change-id>/` stores the live artifacts for one change.

This folder provides coordination support between those pieces. It is not a new source of product truth.

---

## Core principle

AGENTS.md governs. SDD skills operate. Subagents advise by default. Controlled writers act only when an authorized skill delegates one bounded target. The active Codex session owns the final decision.

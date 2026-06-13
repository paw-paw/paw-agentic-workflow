# Orchestration Rules

This document defines the operating rules for SDD orchestration in this repo.

It is auxiliary. If it conflicts with `docs/README.md`, contractual docs, or `AGENTS.md`, the higher-precedence document wins.

---

## Definition

The orchestrator is not a single skill.

In this repo, orchestration is the combined runtime system made of:

- `docs/README.md` and contractual docs
- `AGENTS.md`
- the active SDD skills in `.codex/skills/`
- optional routing diagnosis by the active Codex session
- advisory subagents in `.codex/agents/`
- `.codex/config.toml`
- the live workspace in `sdd/parches/<change-id>/`
- the active Codex session
- the human user as approval gate for high-impact decisions

`sdd-router` is the lightweight routing skill. The active Codex session remains the runtime manager, but routing diagnosis now has a dedicated skill path in `.codex/skills/sdd-router/SKILL.md`.

---

## Runtime manager

The active Codex session is the runtime manager.

The manager:

- owns the final result
- keeps the change aligned with `docs/README.md`, `AGENTS.md`, the selected skill, and the live SDD artifacts
- consolidates evidence instead of concatenating reports
- chooses the next skill or normal repo workflow
- decides whether subagents are useful
- stops for human decision when scope, contracts, architecture, validation, or public behavior is affected

Subagents and skills can guide execution, and controlled writers may perform bounded edits when a skill explicitly authorizes them, but the active session remains responsible for the final edit, validation choice, and report.

---

## Role separation

- `docs/README.md`: precedence and structure inside `docs/`.
- Contractual docs: product, content, architecture, visual, delivery, i18n, and SEO truth.
- `AGENTS.md`: permanent operational governance for repo work.
- SDD skills: controlled transitions between SDD artifacts.
- Routing diagnosis: selection of the next skill or workflow.
- Subagents: bounded advisory evidence and review by default, plus two controlled writer roles when explicitly authorized.
- `sdd/parches/<change-id>/`: traceable memory for one spec-driven change.
- Human user: decisions with high impact, ambiguous trade-offs, or scope expansion.

No layer may use implementation state as a new source of truth when it contradicts governing docs.

---

## Default operating mode

Use the smallest process that can handle the task correctly.

Default behavior:

- do not use SDD for trivial changes
- do not use subagents by default
- do not escalate model effort by default
- read only documents needed for the current decision
- keep edits small, traceable, and scoped
- preserve SDD artifact order for substantial changes
- record meaningful decisions in `decision.log`

---

## Centralized manager rules

The active Codex session must:

- read relevant context before deciding
- identify which document governs the task
- choose one primary skill or the normal repo workflow
- use subagents only when they add evidence or independent review
- use writers only when one authorized skill delegates one bounded artifact or phase
- use agent `.toml` model settings as defaults, not as mandatory ceilings
- escalate model or reasoning effort only when `model-policy.md` escalation triggers appear
- prefer narrowing context before escalating model capability when uncertainty is caused by missing file context
- treat human decision gates as user decisions, not as model-escalation problems
- resolve contradictions between subagent findings by comparing evidence
- stop when a human decision gate is reached
- update live backlogs during execution
- report drift instead of hiding it
- propose or perform documentation sync when drift is within scope

If a phase backlog is active, it is the execution surface for that phase. Do not bypass it silently.

---

## Delegation matrix

Use this matrix as the default delegation map. Do not spawn a full panel when one targeted subagent answers the question.

| Workflow moment | Preferred subagents | Use for | Avoid |
| --- | --- | --- | --- |
| Routing / state diagnosis | `sdd-docs-checker`, `sdd-drift-reviewer` | Missing/stale artifacts, docs-code conflict, ambiguous next step | Implementation |
| Planning / brownfield read | `sdd-repo-mapper`, `sdd-docs-checker`, `sdd-risk-reviewer` | Affected files, governing docs, risk surface | Writing tasks |
| Task breakdown | `sdd-risk-reviewer`, `sdd-test-reviewer` | Sequencing risks, validation expectations | Phase execution |
| Phase backlog drafting | `sdd-artifact-writer` | One assigned `backlog/faseN.md` | Editing implementation |
| Phase execution | `sdd-phase-worker`, optionally `sdd-test-reviewer` | One approved phase, bounded implementation, validation advice | Scope expansion |
| Drift sync | `sdd-drift-reviewer`, `sdd-docs-checker` | Drift classification, affected artifacts, decision log implications | Redesign |
| Astro/GitHub Pages verification | `astro-verifier` | Build, routes, metadata, SEO, assets, GitHub Pages assumptions | Generic test review |

---

## Anti-patterns

Avoid these patterns:

- treating routing as a mega-skill that replaces judgment
- using every subagent for every phase
- creating SDD artifacts only for ceremony
- letting subagents write files by default
- letting multiple writers touch the same artifact or implementation zone
- using code as new truth when docs disagree
- jumping from idea to implementation on substantial changes
- marking a phase complete without required validation results or justified skips
- updating contractual docs as a side effect of auxiliary SDD work
- expanding scope to edit `.codex/`, `AGENTS.md`, runtime code, routing, SEO, i18n, deployment, or dependencies without explicit approval

---

## Minimality rule

The orchestrator should make the next correct move, not the largest possible one.

When a change can be completed through a narrow edit and normal validation, do that. Use SDD only when the change needs traceable intent, planning, phase control, drift handling, or human approval gates.

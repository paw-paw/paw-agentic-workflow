# Model Policy

This document defines model and reasoning-effort guidance for SDD orchestration.

It is auxiliary. Available models and exact model names depend on the active Codex runtime, so examples here are operational defaults, not permanent guarantees.

---

## Core principle

Use the cheapest competent model and reasoning effort for the task.

Escalate when the cost of an error is high. De-escalate when the task is narrow, local, read-only, or already well specified.

Do not use a frontier model and high reasoning effort for a small mechanical task.

---

## Escalation ownership

Model and reasoning escalation is owned by the active Codex session acting as runtime manager.

Agent `.toml` files define default model choices for normal use. They should not encode the maximum model needed for every possible case.

When escalation triggers appear, the manager may:
- use a stronger current session model for integration or decision-making;
- respawn or reassign the delegated task with a stronger model profile if the runtime supports it;
- narrow the task and pass more precise context before escalating;
- stop and ask the user when the issue is a decision gate rather than a model-capability problem.

Subagents should not decide to escalate themselves. They should report the reason escalation is needed.

---

## Default policy

Use these as runtime-dependent defaults:

- `gpt-5.4-mini low`: simple reads, docs checks, route/file lookup, command discovery, straightforward verification.
- `gpt-5.4-mini medium`: repo mapping with some judgment, test review, initial risk review, initial drift review.
- `gpt-5.4 medium`: normal planning, normal execution, phase backlogs with dependencies, validation diagnosis.
- `gpt-5.5 medium`: ambiguous planning, non-trivial implementation, contradictions, contractual drift.
- `gpt-5.5 high`: difficult debugging, sensitive refactors, architecture, deployment, routing, SEO-critical changes, repeated failed attempts.

If a listed model is unavailable, choose the closest available model by capability, cost, and risk.

---

## Skill defaults

- Routing diagnosis: mini/medium or the active manager model; no subagents by default.
- `sdd-intake`: mini medium; escalate if the handover is ambiguous or contract-heavy.
- `sdd-plan`: `gpt-5.4 medium`; escalate if brownfield impact is sensitive.
- `sdd-tasks`: mini medium, or `gpt-5.4 medium` when sequencing is difficult.
- `sdd-phase-backlog`: mini medium for clear phases; `gpt-5.4 medium` when dependencies or blockers are non-trivial.
- `sdd-execute-phase`: `gpt-5.4 medium`; escalate for logic, build, routing, refactor, SEO, deployment, or drift-sensitive work.
- `sdd-sync-drift`: `gpt-5.4 medium`; escalate when drift affects contracts or public behavior.
- `sdd-artifact-writer`: `gpt-5.4 medium`; escalate to `gpt-5.5 medium` for contradictory artifacts or contractual drift.
- `sdd-phase-worker`: `gpt-5.4 medium`; escalate to `gpt-5.5 medium` for non-trivial implementation or drift-sensitive work.

These defaults do not override the current session model or user instructions.

---

## Subagent defaults

- `sdd-docs-checker`: mini low.
- `sdd-repo-mapper`: mini low or mini medium.
- `sdd-test-reviewer`: mini medium.
- `sdd-risk-reviewer`: mini medium, escalable.
- `sdd-drift-reviewer`: mini medium.
- `sdd-artifact-writer`: `gpt-5.4 medium`.
- `sdd-phase-worker`: `gpt-5.4 medium`.

Subagent effort should match the question. Do not assign high-effort review to a lookup task, and do not use a writer when a read-only lookup is enough.

---

## Escalation triggers

Escalate model capability or reasoning effort when:

- contractual docs conflict
- multiple repo zones are affected
- subagent findings contradict each other
- routing, SEO, deployment, i18n, schema, or architecture risk appears
- drift is contractual or blocking
- a build failure is difficult
- a previous attempt failed
- a decision is hard to reverse
- the task touches public claims or visible behavior

Escalation can also mean asking the user for a decision instead of using a stronger model.

For controlled writers, prefer this escalation ladder:

1. `gpt-5.4 medium` for normal artifact writing or bounded phase execution.
2. `gpt-5.5 medium` when artifacts contradict each other, implementation is non-trivial, or drift-sensitive work appears.
3. `gpt-5.5 high` only for difficult debugging, sensitive refactors, architecture, deployment, routing, SEO-critical work, repeated failed attempts, or decisions that are hard to reverse.

If the issue is a human decision gate, escalation means asking the user, not using a stronger model.

---

## De-escalation triggers

De-escalate when:

- the change is local and clear
- the artifact is well defined
- the work is read-only extraction
- the work is command or path verification
- no public behavior, contract, schema, routing, SEO, deployment, or i18n is affected
- the user explicitly requested a narrow task

Prefer shorter context and targeted reads over a stronger model when the uncertainty is just missing file context.

---

## Token-saving practices

- Pass exact paths.
- Pass only the relevant artifact sections.
- Avoid requests like "review everything".
- Avoid subagents when the task is simply writing one approved document.
- Keep `SKILL.md` compact and use references under demand.
- Do not load deep orchestration rules unless real orchestration is needed.
- Summarize long handovers after preserving the original source.
- Validate with specific searches instead of broad manual rereads when possible.

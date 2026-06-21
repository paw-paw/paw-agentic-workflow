# Handover: paw-10-multiruntime-adapters

Source input preserved from `_inbox/final/10-claude-antigravity-adapters-handoff.md`.

## Identity

- `change_id`: `paw-10-multiruntime-adapters`
- `program_id`: `paw-foundation`
- Order: 10 of 14
- Depends on: `paw-09-manual-distribution`
- Execution governance: active SDD v1 under `sdd/parches/`
- Expected classification: `spec` + `spec-anchored`

## Objective

Implement Claude Code and Antigravity adapters against the same portable contract
already proven with Codex, without requiring physical identity between runtimes.

## Required Boundaries

- Revalidate current official Claude Code documentation for skills, subagents, and hooks.
- Investigate current official Antigravity public capabilities and distinguish them from Gemini CLI.
- Map capabilities without changing PAW core, families, presets, stack, or workflow.
- Treat subagents, hooks, and context forks as optional runtime capabilities.
- Report missing capabilities as fallback or blocker; do not simulate them.
- Closing this patch may make PAW v2 available only as explicit candidate opt-in for pilots.
- Do not change the default workflow before patch 14 cutover.

## Expected Deliverables

- Claude Code adapter.
- Antigravity adapter or documented blocked capabilities.
- Capability matrix across Codex, Claude Code, and Antigravity.
- Required thin wrappers or explicit statement that no wrapper is safe yet.
- Fixtures equivalent across three runtimes.
- Runtime installation validation evidence.
- Official source and freshness record.

## Acceptance Criteria

- Claude Code and Antigravity consume the same portable model.
- Runtime differences live in adapters.
- No adapter changes families, presets, stack, or workflow.
- Gaps have explicit fallback or block disposition.
- Three runtime fixtures produce structurally valid artifacts.
- Candidate v2 can be used by explicit repo opt-in without dual-write.

## Stop Conditions

- Official documentation contradicts the assumed contract.
- A runtime cannot execute a critical operation in a controlled way.
- The only solution forks PAW core.
- An adapter depends on an unofficial path or API.
- Equivalence can only be claimed by hiding semantic loss.

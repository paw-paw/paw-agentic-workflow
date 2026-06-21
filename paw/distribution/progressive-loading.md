# Progressive Loading

## Purpose

Installed PAW usage must load context progressively. A runtime adapter or human
operator should load the smallest authoritative set needed for the current
operation and expand only when the task demands it.

This preserves reviewability and prevents every PAW operation from loading the
entire repository context.

## Required Order

Use this order for Codex-oriented installed use:

1. Entrypoint and repository index: `README.md`, `docs/README.md`, and
   `AGENTS.md` or the target repository equivalent.
2. Relevant core contract under `paw/core/**`.
3. Current patch artifacts for the active operation.
4. Applicable catalog or preset under `paw/catalogs/**`.
5. Required adapter docs or runtime map, such as `.codex/README.md` and
   `.codex/paw-runtime-map.json`.
6. References, fixtures, test logs, and extended diagnostics only when a finding,
   failure, or human review requires them.

For explicit multi-runtime candidate evaluation, load only the runtime adapter
evidence for the selected runtime under `paw/adoption/adapters/runtime/`.
Claude Code evidence may point to official `.claude/skills/<name>/SKILL.md`
semantics and to repo-local `.claude/**` physical files when the governed Claude
adapter patch includes them. Load those physical files only for Claude Code
candidate evaluation.
Antigravity evidence must be loaded with its blocked gaps visible and must not
be replaced with Gemini CLI assumptions.

## Runtime Requirements

Candidate runtime bindings must document which contract they load first and why.
They must not treat broad context loading as a substitute for routing,
artifact-state checks, or decision gates.

## Invalid Loading Patterns

The following patterns are invalid for default installed use:

- loading all `paw/**` documents before routing the operation;
- loading private `_inbox/**` material as runtime authority;
- treating fixtures or generated output as policy when a contract exists;
- loading adapters for runtimes that are not part of the current operation;
- treating candidate adapter evidence as proof of stable runtime support or
  plugin installation;
- using legacy `sdd/**` history to override live PAW contracts.

## Escalation

If a required document is missing, stale, or contradictory, the runtime must stop
and route to the appropriate drift or decision-gate workflow instead of loading
more unrelated context.

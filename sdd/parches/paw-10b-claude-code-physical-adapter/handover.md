# Handover: paw-10b-claude-code-physical-adapter

---

## Source

- Private input: `_inbox/final/10-handoff-expansion/01_claude.md`
- Program brief: `_inbox/final/10-handoff-expansion/00_general.md`
- Parent patch: `sdd/parches/paw-10-multiruntime-adapters/`

The private handoff is binding input for this patch during `paw-foundation`, but
it is not a public live contract. Durable claims must be promoted to the live
documents listed in `patch.yaml` before closure.

---

## Intent

Materialize a repo-local Claude Code physical adapter candidate under
`.claude/**`. The adapter must expose PAW candidate operations as project skills,
optional advisory project subagents, and minimal supporting files without
activating PAW v2 by default.

The expected closure state is `physical-adapter-candidate` only if local Claude
Code discovery and invocation are manually validated. If runtime validation is
not available, close as `physical-files-candidate`.

---

## Hard Boundaries

- Do not use `.agents/**`, `.gemini/**`, or `.antigravity/**`.
- Do not create the Claude distribution adapter in this patch.
- Do not activate `paw/parches/**`, PAW v2 writers, or a new default workflow.
- Do not declare stable support or complete portability.
- Do not commit `.claude/settings.local.json`, secrets, machine paths, or broad
  auto-approval settings.

---

## Required Surfaces

- `.claude/skills/paw-router/SKILL.md`
- `.claude/skills/paw-intake/SKILL.md`
- `.claude/skills/paw-plan/SKILL.md`
- `.claude/skills/paw-tasks/SKILL.md`
- `.claude/skills/paw-phase-backlog/SKILL.md`
- `.claude/skills/paw-execute-phase/SKILL.md`
- `.claude/skills/paw-sync-drift/SKILL.md`
- `.claude/skills/paw-conformance/SKILL.md`
- minimal `references/` files where a skill needs supporting context
- optional `.claude/agents/*.md` advisory reviewers
- optional `.claude/settings.json` only if a safe shared config exists

---

## Notes for Execution

- Prefer conservative physical files and explicit candidate wording.
- Reuse the semantics of active `sdd-*` skills while the PAW v2 skills remain
  inactive until cutover.
- Record any omitted settings or hooks as deferred, with reason.
- Keep validation deterministic where possible and classify Claude runtime
  discovery as manual evidence.

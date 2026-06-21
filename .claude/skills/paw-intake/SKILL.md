---
name: paw-intake
description: Open or update a governed PAW candidate definition while routing active paw-foundation work to SDD v1.
---

# paw-intake

## Status

Candidate Claude Code physical adapter entrypoint. For active `paw-foundation`,
use `sdd-intake`.

## Load

1. `docs/README.md`.
2. `AGENTS.md`.
3. The source handoff or user brief.
4. Existing `sdd/parches/<change-id>/patch.yaml` if present.
5. `.claude/skills/paw-router/references/activation-boundary.md`.

## Do

- Preserve source input in the governed workspace when SDD applies.
- Capture goal, scope, non-goals, authorities, risks, and closure criteria.
- Record decisions only when they affect scope, precedence, ownership, or later
  execution.
- Keep assumptions visible when not blocking.

## Do Not

- Plan implementation.
- Create tasks or phase backlogs.
- Promote private `_inbox/**` material as public authority.
- Change the active workflow default.

## Output

Report created or updated definition artifacts, assumptions, blockers, and the
next expected operation.

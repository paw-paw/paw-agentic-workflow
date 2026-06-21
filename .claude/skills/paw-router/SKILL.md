---
name: paw-router
description: Route a PAW request to the next governed operation while preserving the active SDD v1 boundary.
---

# paw-router

## Status

Candidate Claude Code physical adapter entrypoint. Use active `sdd-*` skills for
`paw-foundation` work until cutover.

## Load

1. `docs/README.md` for authority and precedence.
2. `AGENTS.md` for local operating rules.
3. `paw/orchestration/workflow.md` for portable operation readiness.
4. Current `sdd/parches/<change-id>/` artifacts when a workspace already exists.
5. `references/activation-boundary.md` and `references/workflow-map.md`.

## Do

- Identify whether the request needs normal repo workflow, active SDD v1, or a
  candidate PAW operation mapping.
- Route missing artifacts to their owning operation.
- Surface blockers, drift, and human decision gates.
- Keep `_inbox/**` as private input, not committed authority.

## Do Not

- Create or edit artifacts directly.
- Activate `paw/parches/**`.
- Treat candidate Claude files as stable support.
- Use `.agents/**`, `.gemini/**`, or Antigravity surfaces.

## Output

Return the next operation, required inputs, blockers, assumptions, and validation
expectations.

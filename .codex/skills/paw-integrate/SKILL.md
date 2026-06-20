---
name: paw-integrate
description: >
  Candidate PAW Codex integration skill for inspecting local integration evidence,
  provider snapshots, readiness, and delivery disposition. Inactive until cutover
  or explicit governed opt-in.
license: MPL-2.0
metadata:
  runtime: codex
  status: candidate-inactive
  contract: paw/integration/integration-lifecycle.md
  toolkit: .codex/paw-toolkit
---

# paw-integrate

## Status

Candidate Codex runtime binding. During `paw-foundation`, active patch execution
still uses `sdd-*` skills and `sdd/parches/<change-id>/`.

## Load

1. `docs/README.md`
2. `AGENTS.md`
3. `paw/integration/README.md`
4. `paw/integration/integration-lifecycle.md`
5. the current patch artifacts under `sdd/parches/<change-id>/`
6. `.codex/paw-toolkit/README.md` only when deterministic inspection is needed

## Do

- Inspect local `integration.yaml` or fixture-shaped integration records.
- Keep provider state, PAW readiness, and delivery disposition separate.
- Treat provider snapshots as evidence, not authority.
- Confirm checks are tied to the exact head SHA before reporting readiness.
- Use `.codex/paw-toolkit` for deterministic local inspection when useful.
- Ask for explicit user permission before any remote push, change-request update,
  check read, or merge-related operation.

## Do Not

- Do not activate `paw/parches/**`.
- Do not replace `sdd-*` skills during `paw-foundation`.
- Do not write `.agents/**`.
- Do not create or update remote PRs without explicit permission.
- Do not resolve review threads automatically.
- Do not merge, squash, rebase, force-push, reset, clean, or stash automatically.
- Do not treat a PR description as PAW authority.

## Output

Return:

1. provider state
2. PAW readiness
3. delivery disposition
4. evidence freshness
5. permissions required for any next remote operation
6. blockers, drift, or residual risk


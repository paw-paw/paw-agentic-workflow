---
name: paw-triage
description: >
  Candidate PAW Codex skill for classifying an intent before a PAW workspace exists.
  Use only as an inactive v2 candidate; `sdd-triage` remains active for paw-foundation
  until cutover.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/workflow.md
  toolkit: .codex/paw-toolkit
---

# paw-triage

## Status

Candidate Codex runtime binding. Do not use as the default workflow before the
approved cutover. During `paw-foundation`, route governed repository changes through
the active `sdd-*` skills.

## Load

1. `paw/orchestration/workflow.md`, only the `paw-triage` operation and readiness rules.
2. The user brief, handoff, or intent.
3. Existing patch index only to detect collisions.
4. Extended diagnostics only when classification is blocked.

## Do

- Classify SDD fit, proposed change id, patch kind, lifecycle, split pressure, and
  blockers.
- Return compact routing guidance to `paw-intake`, `paw-router`, or no-PAW workflow.
- Use `.codex/paw-toolkit/bin/paw-codex-toolkit.mjs discover-root --json` when root
  discovery is needed.

## Do Not

- Create a workspace.
- Plan implementation.
- Write `paw/parches/**`.
- Treat observed repository state as authority.
- Use `.agents/**`.

## Output

Return a concise report with fit, classification, reason, split recommendation,
source preservation, blockers, and next operation.

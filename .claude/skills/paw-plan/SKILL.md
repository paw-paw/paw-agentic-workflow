---
name: paw-plan
description: Produce a brownfield technical plan from an approved PAW candidate definition.
---

# paw-plan

## Status

Candidate Claude Code physical adapter entrypoint. For active `paw-foundation`,
use `sdd-plan`.

## Load

1. `docs/README.md`.
2. `AGENTS.md`.
3. `patch.yaml`, `definicion.md`, and `decision.log` when present.
4. Governing live documents named by the patch.
5. Current repo files only where needed for brownfield constraints.

## Do

- Identify affected docs, runtime files, schemas, validators, fixtures, and
  distribution inventory.
- Define implementation blocks, dependencies, risks, and validations.
- Preserve candidate-only language and no-default-activation boundaries.

## Do Not

- Create tasks or phase backlogs.
- Implement runtime files.
- Invent adapter routes not supported by current evidence.
- Override live contracts silently.

## Output

Report the plan path, affected surfaces, assumptions, blockers, validations, and
next operation.

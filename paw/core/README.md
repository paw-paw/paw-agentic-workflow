# PAW Core

## Status

Inactive orientation only. Patch 01 does not define the PAW patch model, artifact contracts, schemas, catalogs, presets, adapters, or workflow.

## Intended Responsibility

This directory is reserved for the smallest runtime-neutral contracts that future approved patches determine are portable across repositories and agent runtimes.

## Ownership

The owning core-contract patch and repository maintainers will own this surface. Patch artifacts, runtime adapters, and repository-local governance cannot promote content here without a governed decision.

## Boundaries

This directory must not contain:

- repository-specific commands or deployment policy;
- Codex prompts or agent profiles;
- active patch workspaces;
- inherited v1 files copied for convenience;
- claims of portability before the approved gates pass.

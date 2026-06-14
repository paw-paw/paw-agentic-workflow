# PAW Orchestration

## Status

Inactive orientation only. The active transition workflow remains under `sdd/orchestration/` and `.codex/skills/sdd-*`.

## Intended Responsibility

This directory is reserved for future runtime-neutral lifecycle routing, decision gates, drift handling, and coordination contracts.

## Ownership

The future orchestration-contract patch and repository maintainers will own this surface. Runtime-specific adapters may implement these contracts but may not redefine them.

## Boundaries

This directory must not contain active Codex skills, repository-specific deployment logic, hidden doctrine, or a second writer for patch artifacts.

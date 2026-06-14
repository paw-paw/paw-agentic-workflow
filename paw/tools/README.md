# PAW Tools

## Status

Inactive orientation only. The active v1 validator remains under `sdd/tools/`.

## Intended Responsibility

This directory is reserved for future deterministic tools that validate or operate on approved PAW contracts.

## Ownership

The patch that introduces each tool owns its behavior, tests, compatibility, and documentation. Repository maintainers own cross-tool consistency.

## Boundaries

Tools provide enforcement and evidence. They do not become policy by implementation alone, and they must not introduce a second active namespace before cutover.

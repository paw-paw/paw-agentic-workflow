# PAW Tools

## Status

Approved target surface for incremental materialization. Patch
`paw-03-schema-validator-compatibility` owns the first PAW schemas and validator
implementation here.

The active program workflow and v1 compatibility entrypoints remain under `sdd/**`
until cutover. Implementing tools here does not activate v2 writers or workspaces.

## Intended Responsibility

This directory is reserved for future deterministic tools that validate or operate on approved PAW contracts.

## Ownership

The patch that introduces each tool owns its behavior, tests, compatibility, and documentation. Repository maintainers own cross-tool consistency.

## Boundaries

Tools provide enforcement and evidence. They do not become policy by implementation alone, and they must not introduce a second active namespace before cutover.

Do not duplicate the canonical PAW implementation under `sdd/tools/**`. Any v1
entrypoint retained there must remain a compatibility bridge with explicit ownership.

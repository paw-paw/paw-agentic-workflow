# PAW Tests and Conformance

## Status

Approved target surface for incremental materialization. Patch
`paw-03-schema-validator-compatibility` owns the first portable v1/v2 compatibility
fixtures and validator contract tests here.

Existing v1 fixtures remain under `sdd/tests/**` as historical and operational
compatibility evidence until cutover.

## Intended Responsibility

This directory is reserved for future portable fixtures, examples, compatibility checks, and conformance assets derived from approved PAW rules.

## Ownership

The patch that introduces a contract owns its associated conformance evidence. Repository maintainers own the integrity of the overall validation surface.

## Boundaries

Tests and fixtures are evidence unless the canonical documentation index explicitly assigns authority. This directory must not contain active v2 fixtures or imply conformance before the governing contracts exist.

Materialized v2 fixtures must remain opt-in validation evidence and must not imply
that v2 is the default workflow before its approved activation gate.

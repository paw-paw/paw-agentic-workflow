# PAW Tests and Conformance

## Status

Approved target surface for incremental materialization. Patch
`paw-03-schema-validator-compatibility` owns the first portable v1/v2 compatibility
fixtures and validator contract tests here. Later governed patches add their own
fixtures and conformance checks without activating v2 workflow defaults.

Existing v1 fixtures remain under `sdd/tests/**` as historical and operational
compatibility evidence until cutover.

## Intended Responsibility

This directory is reserved for future portable fixtures, examples, compatibility checks, and conformance assets derived from approved PAW rules.

## Materialized Surface

- `contract/patch-parsing.test.mjs` covers the constrained YAML parser, structured
  diagnostics, schema-version detection, and the physical v2 schema contract.
- `contract/patch-validation.test.mjs` executes the dual-version fixture matrix,
  root/legacy handling, semantic invariants, and no-mutation checks.
- `contract/validator-cli.test.mjs` covers flags, stdout/stderr, JSON, roots, exit
  codes, and validation failures as process-level behavior.
- `fixtures/patch-v1/**`, `fixtures/patch-v2/**`, and `fixtures/invalid/**` contain
  portable read-only compatibility evidence with structured expectations.
- `contract/*catalog*.test.mjs` covers family, documentation, modifier, and
  implementation preset catalog behavior.
- `fixtures/catalogs/**` contains positive and negative catalog evidence for
  classifications, documentation applicability, modifier composition, and
  implementation preset constraints.

## Ownership

The patch that introduces a contract owns its associated conformance evidence. Repository maintainers own the integrity of the overall validation surface.

## Boundaries

Tests and fixtures are evidence unless the canonical documentation index explicitly assigns authority. This directory must not contain active v2 fixtures or imply conformance before the governing contracts exist.

Materialized v2 fixtures must remain opt-in validation evidence and must not imply
that v2 is the default workflow before its approved activation gate.

# Adoption Assessments

## Purpose

An assessment compares reusable PAW catalog definitions, a repository adoption
record, and observed or materialized stack reality. It explains conformance,
variance, exceptions, debt, and unresolved conflicts.

The materialized schema lives at
`paw/tools/schemas/adoption/assessment.schema.json`. The deterministic validation
entrypoint is `node paw/tools/validate-adoption.mjs --fixtures`.

## Comparison Inputs

An assessment may reference:

- software family and documentation preset;
- component profiles and concerns;
- implementation preset and supported variants;
- adoption record decisions;
- repo adapter facts;
- stack adapter facts;
- runtime adapter bindings;
- local overrides and evidence.

## Greenfield Flow

Before scaffolding or code, a greenfield assessment should confirm:

1. selected family;
2. declared profiles and concerns;
3. resolved documentation preset;
4. selected implementation preset;
5. adoption record;
6. materialized adapters;
7. validated bindings and exceptions.

## Brownfield Flow

Brownfield assessment starts with reality:

1. map repository and stack;
2. classify family, profiles, and concerns;
3. compare with presets;
4. adopt compatible pieces;
5. record variants, exceptions, and debt;
6. avoid rewriting the repository only to appear conformant.

## Boundary

An assessment may recommend follow-up work, but it does not automatically select a
stack, modify catalog definitions, or promote local reality into doctrine.

## Validation Boundary

Assessment validation checks flow ordering, catalog references, embedded adoption
record validity, evidence, and explicit no-auto-selection guards. It does not inspect
a real repository or execute a pilot.

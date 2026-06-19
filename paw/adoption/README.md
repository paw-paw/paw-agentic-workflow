# PAW Adoption

## Status

This directory contains portable adoption contracts. These contracts describe how a
repository records a PAW adoption decision, binds that decision to reusable catalogs,
compares the decision with repository reality, and scopes local deviations.

The contracts are documentation. Their presence does not activate adoption
automation, v2 patch workspaces, runtime adapters, installers, packaging, release
automation, or portability claims.

## Contract Map

- `adapters/`: repo, stack, and runtime adapter responsibilities.
- `records/`: adoption records, binding metadata, resolution status, variants,
  exceptions, and overrides.
- `assessments/`: comparison between reusable presets, adoption decisions, and
  observed or materialized repository reality.
- `examples/`: non-authoritative examples and fixture orientation for exact adoption,
  supported variants, local exceptions, and rejection.

## Layer Order

Adoption resolution uses this conceptual order:

1. Portable core.
2. Family and documentation preset.
3. Component profiles and concerns.
4. Implementation preset.
5. Repo adapter.
6. Stack adapter.
7. Runtime adapter.
8. Controlled overrides.

A lower layer may narrow, bind, or document local facts inside its responsibility. It
must not silently rewrite doctrine owned by a higher layer.

## Required Distinctions

- Preset definition: a reusable PAW recommendation maintained in `paw/catalogs/**`.
- Adoption record: a local decision to adopt, vary, reject, or defer a preset.
- Stack realization: the stack actually observed or materialized in a repository.
- Assessment: a traceable comparison between preset definition, adoption record, and
  stack realization.

These distinctions are contractual. A validator, fixture, or example may provide
evidence, but it does not become authority unless promoted to the owning contract.

## Ownership

Adoption contracts are owned by their introducing governed patch and repository
maintainers. Catalog definitions remain owned by `paw/catalogs/**`; patch semantics
remain owned by `paw/core/**`; repository-local governance remains owned by
`docs/**`, `AGENTS.md`, and `CONTRIBUTING.md`.

## Boundaries

- Adoption records do not create new catalog doctrine.
- Stack realizations do not become implementation presets by observation.
- Runtime adapters do not choose families, documentation, architecture, or stack.
- Overrides are explicit local deviations, not global doctrine.
- Greenfield adoption records decisions before scaffolding or code.
- Brownfield adoption starts from observed repository and stack reality.
- No file in this surface may activate `paw/parches/**` or replace the active v1
  workflow before cutover.

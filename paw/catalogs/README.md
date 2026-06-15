# PAW Catalogs

## Status

This directory contains portable catalog contracts materialized by governed PAW
patches. Catalog definitions are live documentation, but their presence does not
activate PAW workspaces, adoption automation, adapters, or a v2 default workflow.

## Canonical Representation

Structured JSON manifests are canonical. Markdown guides explain intent, boundaries,
trade-offs, and examples without redefining manifest values.

## Catalog Map

- `families/`: primary software-family taxonomy and classification boundaries.
- `capabilities/`: reusable documentation obligations and merge semantics.
- `documentation-presets/`: family baselines expressed as capability requirements.
- `modifiers/`: reusable component profiles and transversal concerns.

Later governed phases may add implementation presets.

## Ownership

The patch that introduces or changes a catalog owns its contract, schema, validation,
fixtures, and guide reconciliation. Repository maintainers own cross-catalog
consistency and the documentation registry.

## Boundaries

- A product has exactly one primary family.
- Catalogs describe reusable contracts, not concrete repository adoption.
- Tooling validates catalogs but does not become authority by implementation alone.
- Runtime adapters and implementation choices cannot change catalog identity.
- Catalog materialization does not imply portability, release readiness, or cutover.

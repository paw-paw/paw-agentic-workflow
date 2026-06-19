# Handover: paw-04-catalogs-presets

## Provenance

- Source: `_inbox/final/04-catalogs-presets-handoff.md`
- Program: `paw-foundation`
- Order: 04 of 14
- Dependency: `paw-03-schema-validator-compatibility`
- Classification: `spec` + `spec-anchored`

This artifact preserves the binding intake input for the active patch. The private
source remains ignored and outside Git history. This handover is patch memory, not
live authority.

## Objective

Create portable catalogs that classify software, derive documentation needs, and
recommend implementation golden paths without creating a free technology matrix.

## Binding Decisions

- Each product has exactly one primary software family.
- Composite products use component profiles and concerns, not multiple primary
  families.
- Documentation presets and implementation presets share the family taxonomy but
  remain separate catalogs.
- Implementation presets are complete golden paths with bounded variants.
- Agentic runtime choice is independent from the implementation preset.
- Definitive identifiers must be canonicalized in this patch rather than copied
  mechanically from research identifiers.

## Required Deliverables

1. Software family taxonomy.
2. Capability model and documentation presets.
3. Component profile and concern catalogs.
4. Implementation preset catalog and allowed variants.

Each deliverable requires structured manifests, readable documentation, schemas or
schema extensions, valid and invalid fixtures, and cross-catalog validation.

## Minimum Catalog Content

### Software families

- content and knowledge;
- interactive transactional application;
- service or API;
- library, package, or SDK;
- CLI or developer tool;
- client application;
- data and machine learning;
- agentic system.

### Component profiles

- `content-delivery-surface`
- `interactive-web-surface`
- `native-client-surface`
- `synchronous-service`
- `asynchronous-processor`
- `persistent-store`
- `reusable-package`
- `cli-surface`
- `data-pipeline`
- `model-lifecycle`
- `agentic-orchestrator`

### Concerns

- `public-exposure`
- `personal-data`
- `regulated-data`
- `multi-tenancy`
- `offline-operation`
- `high-availability`
- `public-compatibility-commitment`
- `third-party-extensibility`
- `privileged-execution`
- `human-impacting-automation`

`regulated-data` requires `regulatory_basis`.

### Documentation model

- Public concepts: family, documentation preset, modifier, requirement, evidence,
  exception.
- Internal concepts: capability, slot, overlay, binding, artifact, authority.
- Declared applicability: `required`, `conditional`, `optional`, `not_in_base`.
- Effective applicability: `required`, `conditional_inactive`, `optional`,
  `not_applicable`.
- Slot identity: `capability_id + scope_ref`.
- Merge strategies: `union`, `maximum`, `minimum`, `intersection`,
  `manual-conflict`.
- A modifier cannot change document authority or accountable ownership.

Security is base for transactional applications, services/APIs, client applications,
and agentic systems; it is conditional for the other families. Accessibility is base
for content/knowledge, transactional applications, and client applications.

### Implementation golden paths

- Content/knowledge: Astro and TypeScript, with Docusaurus as a bounded variant.
- Transactional application: Rails modular monolith and PostgreSQL, with Laravel,
  Django admin-first, and constrained Next.js variants.
- Service/API: Go, chi, pgx, sqlc, and OpenAPI, with bounded Hono, FastAPI, NestJS,
  and Spring variants.
- Library/package/SDK: consumer ecosystem, initially TypeScript, Python, and Go.
- CLI/developer tool: Go and Cobra, with Rust and Typer variants.
- Client application: Flutter for mobile-first and Tauri for desktop-first, with
  Expo/React Native and brownfield Electron variants.
- Data/ML: Python, Dagster, Parquet/DuckDB, Polars, and MLflow, with dbt and
  existing-estate Airflow/Prefect variants.
- Agentic system: Python and LangGraph with persistence, evals, and observability;
  AutoGen is exploratory and proprietary SDKs remain bounded.

Every implementation preset declares its complete envelope, invariants, supported
version policy, evidence and review date, use criteria, contraindications, variants,
validation, and operation. Floating `latest` references are prohibited.

## Scope Boundaries

Out of scope:

- concrete adoption in a repository;
- adoption records and assessments;
- runtime adapters;
- installers or packaging;
- execution skills;
- automatic stack selection without project evidence;
- freely composable technology matrices.

Documentation role semantics are referenced but remain owned by
`paw-06-workflow-conformance`.

## Acceptance Summary

- Eight families have disjoint primary intent and explicit boundaries.
- Documentation requirements derive from family, profiles, and concerns without
  duplicated doctrine.
- Eleven profiles and ten concerns have verifiable semantics and composition rules.
- Every implementation preset is a coherent, complete golden path.
- Catalogs are machine-readable and human-readable.
- Validation rejects unknown IDs, invalid combinations, and unresolved conflicts.
- Fixtures cover simple and composite products.

## Stop Conditions

Stop and record a decision if:

- a family can only be defined by technology;
- a profile duplicates a family;
- a concern changes document authority;
- diversity is modeled through unbounded parameters;
- a preset requires an unsupported version or lacks a freshness policy.

## Next Patch

`paw-05-adapter-adoption-contracts`

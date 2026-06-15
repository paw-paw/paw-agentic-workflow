# Fase 4 - Implementation presets y evidencia

## Estado

- Change id: `paw-04-catalogs-presets`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `4`
- Estado: `active`
- Ultima actualizacion: `2026-06-15`
- Owner: sesion Codex activa con aprobacion humana
- Depende de: Fases 1-3 cerradas
- Desbloquea: Fase 5 - Cross-catalog conformance y reconciliacion final

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `paw/catalogs/README.md`
- `paw/catalogs/families/catalog.json`
- `paw/catalogs/modifiers/catalog.json`
- `paw/core/authority-and-evidence.md`
- `paw/core/decision-gates.md`
- `paw/core/compatibility-policy.md`
- `sdd/parches/paw-04-catalogs-presets/{patch.yaml,definicion.md,plan.md,tasks.md,decision.log}`
- `sdd/parches/paw-04-catalogs-presets/backlog/fase3.md`
- final handoff 04 preserved in `handover.md`

## 2. Objetivo de la fase

- Resultado esperado: catalogo canonico de golden paths completos, versionados,
  evidence-backed y revisables para los envelopes aprobados.
- Razon de la fase: convertir defaults de research en recomendaciones acotadas sin
  crear una matriz libre, referencias flotantes o acoplamiento a runtimes agentic.
- Cambio que queda habilitado al cerrar: cross-catalog conformance puede validar
  family, modifiers and implementation references end to end.

## 3. Rama obligatoria por tipo

### `patch_kind = spec`

- Fuente viva o alcance de spec que esta fase modifica:
  - `paw/catalogs/implementation-presets/**`;
  - schemas and validators under `paw/tools/**`;
  - fixtures and contract evidence under `paw/tests/**`.
- Reconciliacion esperada:
  - cada preset representa un envelope completo y no una lista de tecnologias;
  - variants are named subordinate contracts and cannot be freely combined;
  - materialization remains adoption-neutral and does not activate a runtime.

## 4. Assumptions

- Canonical preset IDs describe family, envelope and primary implementation intent;
  provisional research IDs remain provenance aliases only.
- Package ecosystems require three first-class presets rather than one parameterized
  language matrix.
- Mobile-first and desktop-first are separate client envelopes.
- Version constraints are recorded only after primary-source verification.
- `review_by` is the earlier of the nearest known lifecycle milestone and 90 days
  after `reviewed_at`.
- A named variant replaces the complete affected envelope; variants are not bags of
  independently selectable components.

## 5. Precondiciones

### Documentos

- [x] Fases 1-3 `done`
- [x] family, capability, documentation preset and modifier references stable
- [x] implementation preset scope and stop conditions present in plan/tasks

### Decisiones previas

- [ ] gate humano: aprobar estos canonical preset IDs:
  - `content-astro-static`
  - `transactional-rails-monolith`
  - `service-go-api`
  - `package-typescript`
  - `package-python`
  - `package-go`
  - `cli-go-cobra`
  - `client-flutter-mobile`
  - `client-tauri-desktop`
  - `data-python-dagster`
  - `agentic-python-langgraph`
- [ ] gate humano: aprobar variants locales y subordinadas:
  - `product-docs-docusaurus`
  - `laravel-monolith`, `django-admin-first`, `nextjs-restricted`
  - `hono-edge`, `fastapi-ml`, `nestjs-typescript`, `spring-java`
  - `rust-structured-cli`, `python-typer-internal`
  - `expo-react-native`, `electron-brownfield`
  - `dbt-warehouse-first`, `airflow-existing`, `prefect-existing`
  - `autogen-prototype`, `proprietary-sdk-bounded`
- [ ] gate humano: aprobar la support policy:
  - only explicit upstream-supported stable lines;
  - no `latest`, implicit current version, prerelease or EOL line;
  - every constraint records source, lifecycle status and verification date;
  - `review_by` uses the earlier-of rule declared in Assumptions;
  - security advisory, EOL announcement, new major line, removed dependency support
    or failed compatibility validation reopens review.
- [ ] registrar gates aprobados en `decision.log` antes de implementation.

### Estado tecnico

- [x] catalog validator passes with 8 families, 22 capabilities, 8 documentation
  presets, 11 components and 10 concerns
- [x] 27 catalog fixtures pass
- [x] complete suite passes with 61 tests

## 6. Alcance

### Si entra

- [ ] shared implementation preset contract and guide
- [ ] 11 canonical complete-envelope presets
- [ ] named bounded variants from the approved gate
- [ ] fixed decisions, bounded choices and explicit parameters
- [ ] supported family, profile and concern references
- [ ] applicability, contraindications and reopen triggers
- [ ] quality, security, supply-chain, testing, operation and verification dimensions
- [ ] source evidence, lifecycle, `reviewed_at` and `review_by`
- [ ] schemas, validators, fixtures, contract tests and conformance

### No entra

- [ ] automatic stack selection or project recommendation
- [ ] freely combinable frontend/backend/database/cloud/runtime options
- [ ] adoption records, repository assessments or generated applications
- [ ] runtime adapters or agent runtime configuration
- [ ] unsupported or speculative version claims
- [ ] workflow v2 activation

## 7. Archivos y superficies de trabajo

### Leer antes de editar

- canonical family and modifier manifests
- catalog validator and fixture dispatch
- authority, evidence, decision gate and compatibility contracts
- handoff golden path table and acceptance/stop conditions
- official lifecycle and support sources for every named technology

### Editar

- `paw/catalogs/README.md`
- `paw/catalogs/implementation-presets/catalog.json`
- `paw/catalogs/implementation-presets/README.md`
- `paw/tools/schemas/catalogs/implementation-presets.schema.json`
- implementation preset validation modules under `paw/tools/catalogs/**`
- canonical and fixture validation dispatch
- implementation preset fixtures and contract tests under `paw/tests/**`
- `tests/catalog-conformance.test.mjs`
- this backlog, `tasks.md` and `decision.log`

### Validar

- all five canonical catalog classes
- implementation preset definition and variant fixtures
- source freshness and version policies
- existing catalog, patch and SDD suites

### No tocar

- `paw/core/**`
- `paw/parches/**`
- `.codex/**`
- patch manifest schemas
- closed patch workspaces
- `_inbox/**`

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

- [ ] read approved preset IDs, variants and support policy in `decision.log`
- [ ] reread each golden path, its envelope and bounded variants in the handoff
- [ ] reread evidence, authority, compatibility and stop-condition contracts
- [ ] enumerate official primary sources needed for each technology and lifecycle

### Bloque B - Inspeccion de estado actual

- [ ] load canonical family/profile/concern IDs from manifests
- [ ] inspect canonical validator dispatch for a fifth catalog
- [ ] inspect fixture harness extension points and stable diagnostic format
- [ ] verify no current schema field implies adoption, runtime binding or free choice

### Bloque C - Verificacion primaria

- [ ] verify Astro, TypeScript, content collections and Docusaurus support sources
- [ ] verify Rails, PostgreSQL and named transactional variant lifecycle sources
- [ ] verify Go, chi, pgx, sqlc, OpenAPI and named service variant sources
- [ ] verify TypeScript, Python and Go package ecosystem support sources
- [ ] verify Cobra, Rust and Typer support sources
- [ ] verify Flutter, Tauri, Expo/React Native and Electron support sources
- [ ] verify Dagster, Parquet, DuckDB, Polars, MLflow, dbt, Airflow and Prefect sources
- [ ] verify LangGraph, AutoGen and bounded proprietary SDK policy sources
- [ ] record source URL, official publisher, supported line, lifecycle status and
  verification date; stop on unresolved or contradictory support claims

### Bloque D - Edicion por archivo

- [ ] create implementation preset catalog with shared contract and support policy
- [ ] encode exactly 11 canonical presets and approved local variants
- [ ] encode complete envelope, invariants, applicability and contraindications
- [ ] separate fixed decisions, bounded choices and parameters
- [ ] encode family/profile/concern compatibility with known canonical references
- [ ] encode quality, security, supply-chain, testing, operation and verification
- [ ] encode evidence refs, supported lines, `reviewed_at`, `review_by` and triggers
- [ ] reject `latest`, unknown references, incomplete dimensions and stale evidence
- [ ] reject free variant combinations and runtime agentic configuration fields
- [ ] create valid fixture per envelope and negatives for each contract boundary
- [ ] add contract and conformance tests

### Bloque E - Registro de decisiones, hallazgos o blockers

- [ ] record approved IDs, variants and support policy
- [ ] record every evidence/lifecycle interpretation that affects a constraint
- [ ] stop if a preset is only a technology list or needs unrestricted parameters
- [ ] stop if a support line lacks official evidence or sustainable freshness
- [ ] record drift, findings, exceptions and deferred technologies

### Bloque F - Validacion

- [ ] run `node paw/tools/validate-catalogs.mjs --json`
- [ ] run `node paw/tools/validate-catalogs.mjs --fixtures --json`
- [ ] run implementation preset contract tests
- [ ] run `node sdd/tools/validate-sdd.mjs`
- [ ] run `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] run `node paw/tools/validate-patches.mjs --json`
- [ ] run `node paw/tools/validate-patches.mjs --fixtures --json`
- [ ] run `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
- [ ] run `git diff --check`
- [ ] manually review source freshness, all envelopes and no runtime activation

### Bloque G - Cierre

- [ ] record commands, counts, sources and results
- [ ] update findings, drift, decisions and risks
- [ ] mark Fase 4 `done` only after gates and validations
- [ ] confirm Fase 5 can traverse all canonical catalog references
- [ ] create Conventional Commit(s) after backlog update and validation

## 9. Drift detectado

- Ninguno al crear el backlog.

## 10. Hallazgos durante ejecucion

- Ninguno; la verificacion de fuentes comienza solo despues del gate humano.

## 11. Blockers

- [ ] Gate humano de preset IDs, variants y support policy.

## 12. Decisiones tomadas

- `2026-06-15`
  - Decision: proponer IDs semanticos por envelope y mantener variants como contratos
    locales subordinados.
  - Razon: evita identidad ordinal y no crea un namespace global de componentes
    intercambiables.
  - Areas afectadas: preset manifest, schemas, fixtures and guides.
- `2026-06-15`
  - Decision: no investigar ni fijar versiones antes de aprobar la support policy.
  - Razon: la evidencia temporal debe responder a una politica humana explicita y no
    introducir accidentalmente referencias flotantes.
  - Areas afectadas: evidence records, support constraints and freshness validation.

## 13. Validaciones

### Documentales

- [ ] implementation guide and manifest remain consistent
- [ ] presets are complete envelopes rather than technology lists
- [ ] variants remain bounded and subordinate

### Tecnicas

- [ ] inventory, references, dimensions and source metadata validate
- [ ] invalid combinations, stale evidence and unsupported versions fail
- [ ] existing suites remain green

### Manuales

- [ ] IDs, variants and support policy approved
- [ ] primary sources and lifecycle interpretations reviewed
- [ ] every envelope closes applicable completeness dimensions
- [ ] no preset activates adoption, workflow v2 or an agent runtime

### Resultados

- Pendientes de ejecucion despues del gate humano.

## 14. Cierre

La fase solo se considera cerrada si:

- [ ] checklist complete
- [ ] gates resolved and recorded
- [ ] assumptions resolved
- [ ] decisions and drift synchronized
- [ ] blockers resolved
- [ ] validations pass and results recorded
- [ ] backlog and `tasks.md` synchronized

## 15. Riesgos y pendientes

### Riesgos

- Technology lists can masquerade as complete presets.
- Lifecycle claims can become stale before review.
- Named variants can accidentally become free composition.
- Package and client envelopes can be over-generalized.
- Agentic product architecture can become coupled to a runtime adapter.

### Pendientes

- Human gate for IDs, variants and support policy.
- Phase 5 remains without backlog.

# Fase 4 - Implementation presets y evidencia

## Estado

- Change id: `paw-04-catalogs-presets`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `4`
- Estado: `done`
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
- `review_by` is the earlier of the nearest known lifecycle milestone and 180 days
  after `reviewed_at`.
- A named variant replaces the complete affected envelope; variants are not bags of
  independently selectable components.

## 5. Precondiciones

### Documentos

- [x] Fases 1-3 `done`
- [x] family, capability, documentation preset and modifier references stable
- [x] implementation preset scope and stop conditions present in plan/tasks

### Decisiones previas

- [x] gate humano: aprobar estos canonical preset IDs:
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
- [x] gate humano: aprobar variants locales y subordinadas:
  - `product-docs-docusaurus`
  - `laravel-monolith`, `django-admin-first`, `nextjs-restricted`
  - `hono-edge`, `fastapi-ml`, `nestjs-typescript`, `spring-java`
  - `rust-structured-cli`, `python-typer-internal`
  - `expo-react-native`, `electron-brownfield`
  - `dbt-warehouse-first`, `airflow-existing`, `prefect-existing`
  - `autogen-prototype`, `proprietary-sdk-bounded`
- [x] gate humano: aprobar la support policy:
  - only explicit upstream-supported stable lines;
  - no `latest`, implicit current version, prerelease or EOL line;
  - every constraint records source, lifecycle status and verification date;
  - `review_by` uses the earlier-of rule declared in Assumptions;
  - security advisory, EOL announcement, new major line, removed dependency support
    or failed compatibility validation reopens review.
- [x] registrar gates aprobados en `decision.log` antes de implementation.

### Estado tecnico

- [x] catalog validator passes with 8 families, 22 capabilities, 8 documentation
  presets, 11 components and 10 concerns
- [x] 27 catalog fixtures pass
- [x] complete suite passes with 61 tests

## 6. Alcance

### Si entra

- [x] shared implementation preset contract and guide
- [x] 11 canonical complete-envelope presets
- [x] named bounded variants from the approved gate
- [x] fixed decisions, bounded choices and explicit parameters
- [x] supported family, profile and concern references
- [x] applicability, contraindications and reopen triggers
- [x] quality, security, supply-chain, testing, operation and verification dimensions
- [x] source evidence, lifecycle, `reviewed_at` and `review_by`
- [x] schemas, validators, fixtures, contract tests and conformance

### No entra

- [x] automatic stack selection or project recommendation
- [x] freely combinable frontend/backend/database/cloud/runtime options
- [x] adoption records, repository assessments or generated applications
- [x] runtime adapters or agent runtime configuration
- [x] unsupported or speculative version claims
- [x] workflow v2 activation

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

- [x] read approved preset IDs, variants and support policy in `decision.log`
- [x] reread each golden path, its envelope and bounded variants in the handoff
- [x] reread evidence, authority, compatibility and stop-condition contracts
- [x] enumerate official primary sources needed for each technology and lifecycle

### Bloque B - Inspeccion de estado actual

- [x] load canonical family/profile/concern IDs from manifests
- [x] inspect canonical validator dispatch for a fifth catalog
- [x] inspect fixture harness extension points and stable diagnostic format
- [x] verify no current schema field implies adoption, runtime binding or free choice

### Bloque C - Verificacion primaria

- [x] verify Astro and Docusaurus support sources
- [x] verify Rails, PostgreSQL, Laravel, Django and Next.js lifecycle sources
- [x] verify chi, pgx, sqlc, OpenAPI, Hono, NestJS and Spring lifecycle sources
- [x] verify TypeScript, Python and Go platform support sources
- [x] verify Cobra, Rust and Typer lifecycle sources
- [x] verify Expo/React Native and Electron lifecycle sources
- [x] verify Parquet, DuckDB, Polars, MLflow, dbt, Airflow and Prefect lifecycle sources
- [x] verify AutoGen and bounded proprietary SDK policy sources
- [x] record source URL, official publisher, supported line, lifecycle status and
  verification date; stop on unresolved or contradictory support claims

### Bloque D - Edicion por archivo

- [x] create implementation preset catalog with shared contract and support policy
- [x] encode exactly 11 canonical presets and approved local variants
- [x] encode complete envelope, invariants, applicability and contraindications
- [x] separate fixed decisions, bounded choices and parameters
- [x] encode family/profile/concern compatibility with known canonical references
- [x] encode quality, security, supply-chain, testing, operation and verification
- [x] encode evidence refs, supported lines, `reviewed_at`, `review_by` and triggers
- [x] reject `latest`, unknown references, incomplete dimensions and stale evidence
- [x] reject free variant combinations and runtime agentic configuration fields
- [x] create valid envelope matrix and negatives for each contract boundary
- [x] add contract and conformance tests

### Bloque E - Registro de decisiones, hallazgos o blockers

- [x] record approved IDs, variants and support policy
- [x] record every evidence/lifecycle interpretation that affects a constraint
- [x] stop if a preset is only a technology list or needs unrestricted parameters
- [x] stop if a support line lacks official evidence or sustainable freshness
- [x] record drift, findings, exceptions and deferred technologies

### Bloque F - Validacion

- [x] run `node paw/tools/validate-catalogs.mjs --json`
- [x] run `node paw/tools/validate-catalogs.mjs --fixtures --json`
- [x] run implementation preset contract tests
- [x] run `node sdd/tools/validate-sdd.mjs`
- [x] run `node sdd/tools/validate-sdd.mjs --fixtures`
- [x] run `node paw/tools/validate-patches.mjs --json`
- [x] run `node paw/tools/validate-patches.mjs --fixtures --json`
- [x] run `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
- [x] run `git diff --check`
- [x] manually review remaining variant sources and all lifecycle claims

### Bloque G - Cierre

- [x] record commands, counts, sources and results
- [x] update findings, drift, decisions and risks
- [x] mark Fase 4 `done` only after gates and validations
- [x] confirm Fase 5 can traverse all canonical catalog references
- [x] create Conventional Commit(s) after backlog update and validation

## 9. Drift detectado

- Ninguno al crear el backlog.

## 10. Hallazgos durante ejecucion

- Official support models are heterogeneous: PostgreSQL and Django publish explicit
  support tables, Go publishes a two-release policy, Flutter publishes stable release
  windows, and Astro supports the current major plus security maintenance for one
  previous major.
- Some subordinate technologies publish releases but no durable support window. They
  must be represented by a verified explicit stable line and a 180-day review, not by
  an invented lifecycle guarantee.
- The canonical manifest, validator, six-fixture matrix and contract tests are
  implemented and green in the worktree.
- The catalog records 31 official source records. Where upstream does not publish a
  durable lifecycle window, the supported line is intentionally expressed as a locked
  stable release requirement plus 180-day review, not as a fabricated support promise.

## 11. Blockers

- Ninguno.

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
- `2026-06-15`
  - Decision: el owner humano aprobo los 11 preset IDs, las variants subordinadas y
    la support policy con un intervalo maximo de 180 dias.
  - Razon: los IDs y variants preservan los golden paths del handoff; 180 dias es el
    limite aprobado para freshness cuando no existe un milestone anterior.
  - Areas afectadas: preset manifest, evidence records, validators and fixtures.
- `2026-06-15`
  - Decision: usar `locked stable release required` para tecnologias que publican
    releases oficiales pero no una ventana de soporte durable.
  - Razon: evita inventar garantias de lifecycle y mantiene la evidencia revisable
    bajo la politica de 180 dias.
  - Areas afectadas: implementation preset sources and validators.

## 13. Validaciones

### Documentales

- [x] implementation guide and manifest remain consistent
- [x] presets are complete envelopes rather than technology lists
- [x] variants remain bounded and subordinate

### Tecnicas

- [x] inventory, references, dimensions and source metadata validate
- [x] invalid combinations, stale evidence and unsupported versions fail
- [x] existing suites remain green

### Manuales

- [x] IDs, variants and support policy approved
- [x] primary sources and lifecycle interpretations reviewed
- [x] every envelope closes applicable completeness dimensions
- [x] no preset activates adoption, workflow v2 or an agent runtime

### Resultados

- Canonical catalog validation:
  - command: `node paw/tools/validate-catalogs.mjs --json`
  - result: pass; 11 presets, 17 variants and 31 source records
- Catalog fixture validation:
  - command: `node paw/tools/validate-catalogs.mjs --fixtures --json`
  - result: pass; 6 implementation preset fixtures and 33 total catalog fixtures
- Complete test suite:
  - command: `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
  - result: 67 tests, 67 pass
- SDD and patch compatibility:
  - commands: all commands declared in Block F
  - result: pass; 4 patches and 20 patch fixtures
- Whitespace:
  - command: `git diff --check`
  - result: pass; LF/CRLF notices only

## 14. Cierre

La fase solo se considera cerrada si:

- [x] checklist complete
- [x] gates resolved and recorded
- [x] assumptions resolved
- [x] decisions and drift synchronized
- [x] blockers resolved
- [x] validations pass and results recorded
- [x] backlog and `tasks.md` synchronized

## 15. Riesgos y pendientes

### Riesgos

- Technology lists can masquerade as complete presets; mitigated by complete
  dimensions and contract tests.
- Lifecycle claims can become stale before review; mitigated by source records,
  `review_by`, and reopen triggers.
- Named variants can accidentally become free composition; mitigated by validator
  rejection of `combinable_with`.

### Pendientes

- Phase 5 remains without backlog.

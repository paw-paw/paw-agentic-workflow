# Fase 2 - Capabilities y documentation presets

## Estado

- Change id: `paw-04-catalogs-presets`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `2`
- Estado: `done`
- Ultima actualizacion: `2026-06-15`
- Owner: sesion Codex activa con aprobacion humana
- Depende de: Fase 1 cerrada
- Desbloquea: Fase 3 - Component profiles, concerns y composicion

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `paw/catalogs/README.md`
- `paw/catalogs/families/catalog.json`
- `paw/catalogs/families/README.md`
- `paw/core/authority-and-evidence.md`
- `paw/core/decision-gates.md`
- `sdd/parches/paw-04-catalogs-presets/patch.yaml`
- `sdd/parches/paw-04-catalogs-presets/definicion.md`
- `sdd/parches/paw-04-catalogs-presets/plan.md`
- `sdd/parches/paw-04-catalogs-presets/tasks.md`
- `sdd/parches/paw-04-catalogs-presets/decision.log`
- `sdd/parches/paw-04-catalogs-presets/backlog/fase1.md`
- final handoff 04 preserved in `handover.md`

## 2. Objetivo de la fase

- Resultado esperado: catalogos canonicos de capabilities y documentation presets
  que permitan derivar requisitos base por familia con aplicabilidad, evidencia,
  merge, triggers y excepciones verificables.
- Razon de la fase: profiles y concerns de la Fase 3 necesitan capabilities estables
  sobre las que emitir o fortalecer slots.
- Cambio que queda habilitado al cerrar: modifiers pueden referenciar capabilities y
  scopes sin duplicar doctrina documental.

## 3. Rama obligatoria por tipo

### `patch_kind = spec`

- Fuente viva o alcance de spec que esta fase modifica:
  - `paw/catalogs/capabilities/**`;
  - `paw/catalogs/documentation-presets/**`;
  - schemas y validators de catalogs bajo `paw/tools/**`;
  - evidence y conformance bajo `paw/tests/**`.
- Reconciliacion esperada:
  - mantener roles documentales como referencias, no semantica completa;
  - no cambiar authority o precedence mediante presets;
  - conservar manifests como fuente canonica y guides como explicacion.

## 4. Assumptions

- Cada capability declara una merge strategy aunque normalmente reciba un solo aporte.
- Documentation preset IDs pueden derivarse de family IDs mediante prefijo `docs-`.
- `owner_expectation` expresa responsabilidad esperada, no reasigna accountable owner.
- Exception shape se valida aqui; readiness completo permanece en patch 06.
- JSON sigue siendo formato canonico y el CLI de catalogs se extiende por dispatch.

## 5. Precondiciones

### Documentos

- [x] Fase 1 `done` y family IDs canonicos
- [x] catalog root, validator base and fixture domain materialized
- [x] tasks and plan remain current

### Decisiones previas

- [x] gate humano: aprobar o corregir los IDs universales propuestos:
  - `intent-outcomes`
  - `scope-assumptions-constraints`
  - `stakeholders-users`
  - `domain-vocabulary-rules`
  - `context-boundaries-dependencies`
  - `validation-acceptance-evidence`
  - `decisions-ownership-freshness`
  - `authority-precedence-conformance`
- [x] gate humano: aprobar o corregir los IDs transversales normalizados:
  - `security`
  - `privacy`
  - `operations-support`
  - `continuity-recovery`
  - `accessibility`
  - `internationalization`
  - `seo-discoverability`
  - `integration-examples`
  - `distribution-integrity`
  - `model-development-evaluation`
  - `model-operations`
  - `data-evolution-reprocessing`
  - `agent-traceability-audit`
  - `agent-containment-recovery`
- [x] gate humano: aprobar IDs de documentation presets:
  - `docs-content-knowledge`
  - `docs-transactional-application`
  - `docs-service-api`
  - `docs-library-package-sdk`
  - `docs-cli-developer-tool`
  - `docs-client-application`
  - `docs-data-machine-learning`
  - `docs-agentic-system`
- [x] registrar el resultado de los gates en `decision.log`

### Estado tecnico

- [x] `node paw/tools/validate-catalogs.mjs --fixtures --json` pasa con 15 fixtures
- [x] complete suite pasa con 49 tests
- [x] patch fixture runner esta aislado del catalog fixture domain

## 6. Alcance

### Si entra

- [x] manifests y guides de capabilities
- [x] un documentation preset por family
- [x] applicability declarada y efectiva
- [x] trigger references y merge strategies
- [x] expected evidence and owner/review expectations
- [x] baselines de security and accessibility
- [x] exception shape temporal y auditable
- [x] schemas, validation, fixtures and conformance

### No entra

- [x] modifier definitions or instances
- [x] typed product scopes
- [x] implementation presets or technology evidence
- [x] adoption records, bindings to real artifacts or assessments
- [x] complete role/conformance semantics from patch 06
- [x] workflow activation or writers

## 7. Archivos y superficies de trabajo

### Leer antes de editar

- `paw/catalogs/families/catalog.json`
- `paw/catalogs/families/README.md`
- `paw/tools/catalogs/*.mjs`
- `paw/tools/schemas/catalogs/families.schema.json`
- `paw/tests/contract/family-catalog.test.mjs`
- `tests/catalog-conformance.test.mjs`
- `paw/core/authority-and-evidence.md`
- final handoff sections for documentation model

### Editar

- `paw/catalogs/README.md`
- `paw/catalogs/capabilities/catalog.json`
- `paw/catalogs/capabilities/README.md`
- `paw/catalogs/documentation-presets/catalog.json`
- `paw/catalogs/documentation-presets/README.md`
- `paw/tools/schemas/catalogs/capabilities.schema.json`
- `paw/tools/schemas/catalogs/documentation-presets.schema.json`
- catalog validation modules and CLI dispatch under `paw/tools/**`
- contract tests and fixtures under `paw/tests/**`
- `tests/catalog-conformance.test.mjs`
- this backlog, `tasks.md` and `decision.log`

### Validar

- canonical family, capability and documentation preset catalogs
- references and matrices across the three catalogs
- catalog and patch fixture runners
- complete repository test suite

### No tocar

- `paw/core/**`
- `paw/parches/**`
- `.codex/**`
- patch manifest schemas
- closed patch workspaces
- `_inbox/**`

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

- [x] leer gates aprobados en `decision.log`
- [x] releer documentation model, applicability, exceptions and baseline rules
- [x] inspeccionar family catalog refs and current catalog validator dispatch
- [x] confirmar que roles remain references and authority remains repo-owned

### Bloque B - Inspeccion de estado actual

- [x] listar canonical family IDs desde manifest, no constants duplicadas
- [x] identificar helpers reutilizables para loading, diagnostics and fixture harness
- [x] confirmar que guides pueden referenciar manifests sin duplicar matrices enteras
- [x] inspeccionar whether `AGENTS.md`, tools/tests README updates should be deferred
  to Fase 5

### Bloque C - Edicion por archivo

- [x] crear capability catalog con IDs, purpose, merge strategy, roles permitidos,
  evidence expectations and reopen conditions
- [x] crear capability guide con public/internal vocabulary boundaries
- [x] crear documentation preset catalog con one family ref per preset and requirement
  contributions
- [x] codificar declared applicability values:
  `required | conditional | optional | not_in_base`
- [x] codificar effective applicability values:
  `required | conditional_inactive | optional | not_applicable`
- [x] validar que required/activated conditional no produce `not_applicable`
- [x] codificar security baseline para transactional, service, client and agentic;
  conditional elsewhere
- [x] codificar accessibility baseline para content, transactional and client
- [x] definir exception fields: ID, affected requirements, reason, approver, owner,
  dates, risk, controls and reopen trigger
- [x] crear schemas con closed shapes
- [x] extender catalog CLI para validar all canonical catalogs and fixture domains
- [x] crear fixtures validos por family y negativos para unknown refs, invalid
  applicability, missing merge strategy, invalid exception and baseline drift
- [x] crear contract/conformance tests for reference integrity and authority guards

### Bloque D - Registro de decisiones, hallazgos o blockers

- [x] registrar IDs aprobados y rationale
- [x] registrar forma final de capability contribution y requirement identity
- [x] detener si una capability mezcla responsabilidades que deben normalizarse
- [x] detener si un preset intenta definir authority, precedence or accountable owner
- [x] registrar drift entre handoff, live contracts and implementation evidence

### Bloque E - Validacion

- [x] ejecutar catalog validator canonical and fixtures
- [x] ejecutar capability/documentation preset contract tests
- [x] ejecutar `node sdd/tools/validate-sdd.mjs`
- [x] ejecutar `node sdd/tools/validate-sdd.mjs --fixtures`
- [x] ejecutar patch validator canonical and fixtures
- [x] ejecutar complete `paw/tests/contract/*.test.mjs tests/*.test.mjs`
- [x] ejecutar `git diff --check`
- [x] revisar manualmente matrices de security/accessibility and no authority mutation

### Bloque F - Cierre

- [x] registrar commands, counts and results
- [x] actualizar findings, drift, decisions and risks
- [x] marcar Fase 2 `done` en `tasks.md` solo con gates y validations cerrados
- [x] confirmar que Fase 3 puede usar every capability ID and merge strategy
- [x] crear Conventional Commit(s) after backlog update and validations

## 9. Drift detectado

- Ninguno al crear el backlog.

## 10. Hallazgos durante ejecucion

- Los universal requirements se almacenan una vez y se combinan con contributions
  del preset; esto evita duplicar 64 referencias normativas.
- Roles pueden validarse como vocabulario permitido sin implementar aun ownership,
  readiness o conformance completo.
- El fixture harness por domain permite probar applicability y exceptions sin copiar
  manifests canonicos completos.

## 11. Blockers

- Ninguno.

## 12. Decisiones tomadas

- `2026-06-15`
  - Decision: proponer 8 capabilities universales, 14 transversales normalizadas y
    8 documentation preset IDs derivados de family IDs.
  - Razon: mantener IDs semanticos, normalizar capacidades compuestas y evitar
    ordinal identity.
  - Areas afectadas: manifests, schemas, validators, fixtures and modifier refs.
- `2026-06-15`
  - Decision: el owner humano aprobo todos los IDs propuestos sin cambios.
  - Razon: expresan obligaciones semanticas estables y referencias de familia
    canonicas.
  - Areas afectadas: capability and documentation preset catalogs plus downstream
    modifier refs.

## 13. Validaciones

### Documentales

- [x] capabilities and presets registered in catalog map
- [x] guides preserve public/internal vocabulary boundary
- [x] roles referenced without defining patch 06 semantics

### Tecnicas

- [x] all canonical catalogs validate
- [x] cross-catalog references resolve
- [x] applicability and exception invariants pass
- [x] existing suites remain green

### Manuales

- [x] IDs approved
- [x] universal/transversal split remains coherent
- [x] security/accessibility matrices match handoff
- [x] no authority or accountable ownership mutation

### Resultados

- Validacion: canonical catalogs
  - comando o revision: `node paw/tools/validate-catalogs.mjs --json`
  - resultado esperado: 8 families, 22 capabilities, 8 presets, zero errors
  - resultado obtenido: pass con inventario exacto
  - estado: `pass`
- Validacion: catalog fixtures
  - comando o revision: `node paw/tools/validate-catalogs.mjs --fixtures --json`
  - resultado esperado: family and documentation expectations match
  - resultado obtenido: pass, 15 family fixtures y 4 documentation fixtures
  - estado: `pass`
- Validacion: complete suite
  - comando o revision: `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
  - resultado esperado: pass
  - resultado obtenido: 55 tests, 55 pass
  - estado: `pass`
- Validacion: SDD and patch compatibility
  - comando o revision: commands declared in Block E
  - resultado esperado: pass
  - resultado obtenido: pass; 4 patches and 20 patch fixtures
  - estado: `pass`
- Validacion: whitespace and manual boundaries
  - comando o revision: `git diff --check` plus manifest/guide inspection
  - resultado esperado: no errors or authority/accountability mutation
  - resultado obtenido: no errors; LF/CRLF notices only
  - estado: `pass`

## 14. Cierre

La fase solo se considera cerrada si:

- [x] checklist completo o pendientes explicitamente diferidos
- [x] gates de IDs resueltos y registrados
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] decisions and drift synchronized
- [x] blockers resolved
- [x] required validations pass
- [x] results recorded
- [x] backlog and `tasks.md` synchronized

## 15. Riesgos y pendientes

### Riesgos

- Capability IDs demasiado amplios pueden ocultar obligaciones distinguibles.
- Matrices duplicadas entre manifests y guides pueden divergir.
- Modelar readiness completo aqui invadiria ownership de patch 06.
- Exception validation insuficiente podria permitir degradar requirements.

### Pendientes

- Fases 3-5 permanecen sin backlog.

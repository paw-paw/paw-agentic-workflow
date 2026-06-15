# Fase 2 - Capabilities y documentation presets

## Estado

- Change id: `paw-04-catalogs-presets`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `2`
- Estado: `blocked`
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

- [ ] gate humano: aprobar o corregir los IDs universales propuestos:
  - `intent-outcomes`
  - `scope-assumptions-constraints`
  - `stakeholders-users`
  - `domain-vocabulary-rules`
  - `context-boundaries-dependencies`
  - `validation-acceptance-evidence`
  - `decisions-ownership-freshness`
  - `authority-precedence-conformance`
- [ ] gate humano: aprobar o corregir los IDs transversales normalizados:
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
- [ ] gate humano: aprobar IDs de documentation presets:
  - `docs-content-knowledge`
  - `docs-transactional-application`
  - `docs-service-api`
  - `docs-library-package-sdk`
  - `docs-cli-developer-tool`
  - `docs-client-application`
  - `docs-data-machine-learning`
  - `docs-agentic-system`
- [ ] registrar el resultado de los gates en `decision.log`

### Estado tecnico

- [x] `node paw/tools/validate-catalogs.mjs --fixtures --json` pasa con 15 fixtures
- [x] complete suite pasa con 49 tests
- [x] patch fixture runner esta aislado del catalog fixture domain

## 6. Alcance

### Si entra

- [ ] manifests y guides de capabilities
- [ ] un documentation preset por family
- [ ] applicability declarada y efectiva
- [ ] trigger references y merge strategies
- [ ] expected evidence and owner/review expectations
- [ ] baselines de security and accessibility
- [ ] exception shape temporal y auditable
- [ ] schemas, validation, fixtures and conformance

### No entra

- [ ] modifier definitions or instances
- [ ] typed product scopes
- [ ] implementation presets or technology evidence
- [ ] adoption records, bindings to real artifacts or assessments
- [ ] complete role/conformance semantics from patch 06
- [ ] workflow activation or writers

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

- [ ] leer gates aprobados en `decision.log`
- [ ] releer documentation model, applicability, exceptions and baseline rules
- [ ] inspeccionar family catalog refs and current catalog validator dispatch
- [ ] confirmar que roles remain references and authority remains repo-owned

### Bloque B - Inspeccion de estado actual

- [ ] listar canonical family IDs desde manifest, no constants duplicadas
- [ ] identificar helpers reutilizables para loading, diagnostics and fixture harness
- [ ] confirmar que guides pueden referenciar manifests sin duplicar matrices enteras
- [ ] inspeccionar whether `AGENTS.md`, tools/tests README updates should be deferred
  to Fase 5

### Bloque C - Edicion por archivo

- [ ] crear capability catalog con IDs, purpose, merge strategy, roles permitidos,
  evidence expectations and reopen conditions
- [ ] crear capability guide con public/internal vocabulary boundaries
- [ ] crear documentation preset catalog con one family ref per preset and requirement
  contributions
- [ ] codificar declared applicability values:
  `required | conditional | optional | not_in_base`
- [ ] codificar effective applicability values:
  `required | conditional_inactive | optional | not_applicable`
- [ ] validar que required/activated conditional no produce `not_applicable`
- [ ] codificar security baseline para transactional, service, client and agentic;
  conditional elsewhere
- [ ] codificar accessibility baseline para content, transactional and client
- [ ] definir exception fields: ID, affected requirements, reason, approver, owner,
  dates, risk, controls and reopen trigger
- [ ] crear schemas con closed shapes
- [ ] extender catalog CLI para validar all canonical catalogs and fixture domains
- [ ] crear fixtures validos por family y negativos para unknown refs, invalid
  applicability, missing merge strategy, invalid exception and baseline drift
- [ ] crear contract/conformance tests for reference integrity and authority guards

### Bloque D - Registro de decisiones, hallazgos o blockers

- [ ] registrar IDs aprobados y rationale
- [ ] registrar forma final de capability contribution y requirement identity
- [ ] detener si una capability mezcla responsabilidades que deben normalizarse
- [ ] detener si un preset intenta definir authority, precedence or accountable owner
- [ ] registrar drift entre handoff, live contracts and implementation evidence

### Bloque E - Validacion

- [ ] ejecutar catalog validator canonical and fixtures
- [ ] ejecutar capability/documentation preset contract tests
- [ ] ejecutar `node sdd/tools/validate-sdd.mjs`
- [ ] ejecutar `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] ejecutar patch validator canonical and fixtures
- [ ] ejecutar complete `paw/tests/contract/*.test.mjs tests/*.test.mjs`
- [ ] ejecutar `git diff --check`
- [ ] revisar manualmente matrices de security/accessibility and no authority mutation

### Bloque F - Cierre

- [ ] registrar commands, counts and results
- [ ] actualizar findings, drift, decisions and risks
- [ ] marcar Fase 2 `done` en `tasks.md` solo con gates y validations cerrados
- [ ] confirmar que Fase 3 puede usar every capability ID and merge strategy
- [ ] crear Conventional Commit(s) after backlog update and validations

## 9. Drift detectado

- Ninguno al crear el backlog.

## 10. Hallazgos durante ejecucion

- Pendientes.

## 11. Blockers

- [ ] aprobacion humana de IDs de capabilities y documentation presets

## 12. Decisiones tomadas

- `2026-06-15`
  - Decision: proponer 8 capabilities universales, 14 transversales normalizadas y
    8 documentation preset IDs derivados de family IDs.
  - Razon: mantener IDs semanticos, normalizar capacidades compuestas y evitar
    ordinal identity.
  - Areas afectadas: manifests, schemas, validators, fixtures and modifier refs.

## 13. Validaciones

### Documentales

- [ ] capabilities and presets registered in catalog map
- [ ] guides preserve public/internal vocabulary boundary
- [ ] roles referenced without defining patch 06 semantics

### Tecnicas

- [ ] all canonical catalogs validate
- [ ] cross-catalog references resolve
- [ ] applicability and exception invariants pass
- [ ] existing suites remain green

### Manuales

- [ ] IDs approved
- [ ] universal/transversal split remains coherent
- [ ] security/accessibility matrices match handoff
- [ ] no authority or accountable ownership mutation

### Resultados

- Pendientes hasta ejecucion.

## 14. Cierre

La fase solo se considera cerrada si:

- [ ] checklist completo o pendientes explicitamente diferidos
- [ ] gates de IDs resueltos y registrados
- [ ] assumptions criticas resueltas, aceptadas o escaladas
- [ ] decisions and drift synchronized
- [ ] blockers resolved
- [ ] required validations pass
- [ ] results recorded
- [ ] backlog and `tasks.md` synchronized

## 15. Riesgos y pendientes

### Riesgos

- Capability IDs demasiado amplios pueden ocultar obligaciones distinguibles.
- Matrices duplicadas entre manifests y guides pueden divergir.
- Modelar readiness completo aqui invadiria ownership de patch 06.
- Exception validation insuficiente podria permitir degradar requirements.

### Pendientes

- Resolver gate de IDs antes de `sdd-execute-phase`.
- Fases 3-5 permanecen sin backlog.

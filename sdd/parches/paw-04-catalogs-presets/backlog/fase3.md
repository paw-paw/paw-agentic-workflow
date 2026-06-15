# Fase 3 - Component profiles, concerns y composicion

## Estado

- Change id: `paw-04-catalogs-presets`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `3`
- Estado: `active`
- Ultima actualizacion: `2026-06-15`
- Owner: sesion Codex activa con aprobacion humana
- Depende de: Fase 2 cerrada
- Desbloquea: Fase 4 - Implementation presets y evidencia

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `paw/catalogs/README.md`
- `paw/catalogs/families/catalog.json`
- `paw/catalogs/capabilities/catalog.json`
- `paw/catalogs/documentation-presets/catalog.json`
- `paw/core/authority-and-evidence.md`
- `paw/core/decision-gates.md`
- `sdd/parches/paw-04-catalogs-presets/{patch.yaml,definicion.md,plan.md,tasks.md,decision.log}`
- `sdd/parches/paw-04-catalogs-presets/backlog/fase2.md`
- final handoff 04 preserved in `handover.md`

## 2. Objetivo de la fase

- Resultado esperado: catalogo canonico de 11 component profiles y 10 concerns,
  contrato comun de modifiers, scopes tipados, slot identity, merge y conflictos
  verificables.
- Razon de la fase: productos compuestos necesitan modificar requirements sin crear
  familias hibridas ni seleccionar tecnologias.
- Cambio que queda habilitado al cerrar: implementation presets pueden declarar
  support, constraints and variant signals against stable modifiers.

## 3. Rama obligatoria por tipo

### `patch_kind = spec`

- Fuente viva o alcance de spec que esta fase modifica:
  - `paw/catalogs/modifiers/**`;
  - schemas and validators under `paw/tools/**`;
  - fixtures and conformance under `paw/tests/**`.
- Reconciliacion esperada:
  - modifiers only add or strengthen obligations;
  - authority and accountable ownership remain repo-owned;
  - profiles and concerns remain inputs, not technology modules.

## 4. Assumptions

- `modifier_kind` carries `component | concern`; `modifier_id` remains the approved
  semantic slug without a redundant prefix.
- Reusable definitions are catalog scope; applied modifier instances are fixtures and
  future adoption inputs, not canonical definitions.
- Scope kinds are `system`, `component`, `interface`, `data`, and `operational`.
- Slot identity is exactly `capability_id + scope_ref`.
- Merge execution in this phase can be deterministic for simple scalar/set cases and
  return an unresolved conflict for `manual-conflict`.

## 5. Precondiciones

### Documentos

- [x] Fases 1 y 2 `done`
- [x] 8 families and 22 capabilities canonical
- [x] documentation baseline and applicability contracts validated

### Decisiones previas

- [x] gate humano: conservar como canonical component IDs:
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
- [x] gate humano: conservar como canonical concern IDs:
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
- [x] registrar gate en `decision.log`

### Estado tecnico

- [x] catalog validator passes with 8/22/8 inventory
- [x] catalog fixtures pass with 15 family and 4 documentation cases
- [x] complete suite passes with 55 tests

## 6. Alcance

### Si entra

- [ ] shared modifier definition contract
- [ ] 11 component definitions and guides
- [ ] 10 concern definitions and guides
- [ ] typed scope and applied instance validation
- [ ] slot key and deduplication
- [ ] union, maximum, minimum, intersection and manual-conflict
- [ ] dependencies, conflicts and family compatibility
- [ ] `regulated-data` named basis requirement
- [ ] authority/accountability mutation guards
- [ ] schemas, fixtures, contract tests and conformance

### No entra

- [ ] technology or stack selection
- [ ] implementation preset variants
- [ ] concrete repository adoption records
- [ ] artifact bindings or full readiness calculation
- [ ] runtime adapters or workflow changes

## 7. Archivos y superficies de trabajo

### Leer antes de editar

- canonical family, capability and documentation preset manifests
- catalog validators and fixture harnesses
- authority and decision gate core contracts
- handoff modifier, scope, merge and ownership sections

### Editar

- `paw/catalogs/README.md`
- `paw/catalogs/modifiers/catalog.json`
- `paw/catalogs/modifiers/README.md`
- `paw/tools/schemas/catalogs/modifiers.schema.json`
- modifier validation/composition modules under `paw/tools/catalogs/**`
- catalog canonical and fixture dispatch
- modifier fixtures and contract tests under `paw/tests/**`
- `tests/catalog-conformance.test.mjs`
- this backlog, `tasks.md` and `decision.log`

### Validar

- all four canonical catalog classes
- modifier definition and instance fixtures
- merge/conflict behavior
- existing catalog, patch and SDD suites

### No tocar

- `paw/core/**`
- `paw/parches/**`
- `.codex/**`
- patch schemas
- closed patch workspaces
- `_inbox/**`

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

- [ ] read approved modifier IDs in `decision.log`
- [ ] reread all 11/10 semantics and non-activation signals
- [ ] reread scope, slot key, merge, conflict, authority and ownership rules
- [ ] confirm modifier definitions do not contain technology choices

### Bloque B - Inspeccion de estado actual

- [ ] load family and capability IDs from canonical manifests
- [ ] inspect canonical validator dispatch for fourth catalog
- [ ] inspect fixture harness extension points
- [ ] identify reusable set/scalar merge primitives without general rule invention

### Bloque C - Edicion por archivo

- [ ] create modifier catalog with common contract and kind-specific fields
- [ ] encode 11 component semantics, includes/excludes, scopes and capability demands
- [ ] encode 10 concern activation rules, affected scopes and specialist review
- [ ] encode `regulated-data.requires_named_basis: true`
- [ ] validate canonical inventory, unique IDs, known family/capability refs
- [ ] validate dependencies/conflicts and no self-reference
- [ ] validate scope refs and stable scope kinds
- [ ] implement slot key as `capability_id + scope_ref`
- [ ] implement five merge strategies and provenance retention
- [ ] return blocked conflict for incomparable/manual values
- [ ] reject modifier attempts to set authority or accountable owner
- [ ] create simple and composite product fixtures
- [ ] create negatives for unknown refs, incompatible family, missing basis, ambiguous
  scope, authority mutation and unresolved conflict
- [ ] add contract and conformance tests

### Bloque D - Registro de decisiones, hallazgos o blockers

- [ ] record approved IDs and kind separation
- [ ] record physical applied-instance shape used by fixtures
- [ ] stop if a profile duplicates family intent
- [ ] stop if a concern selects technology or changes authority/accountability
- [ ] record drift and findings

### Bloque E - Validacion

- [ ] run catalog validator canonical and fixtures
- [ ] run modifier contract tests
- [ ] run SDD validators
- [ ] run patch validators canonical and fixtures
- [ ] run complete test suite
- [ ] run `git diff --check`
- [ ] manually review all 21 definitions and conflict behavior

### Bloque F - Cierre

- [ ] record commands, counts and results
- [ ] update findings, drift, decisions and risks
- [ ] mark Fase 3 `done` only after gates and validations
- [ ] confirm Fase 4 can reference stable modifier IDs and variant signals
- [ ] create Conventional Commit(s) after backlog update and validation

## 9. Drift detectado

- Ninguno al crear el backlog.

## 10. Hallazgos durante ejecucion

- Pendientes.

## 11. Blockers

- Ninguno.

## 12. Decisiones tomadas

- `2026-06-15`
  - Decision: proponer los slugs vinculantes del handoff como canonical IDs y mantener
    `modifier_kind` separado.
  - Razon: los slugs ya describen responsabilidades estables; prefijarlos duplicaria
    informacion del kind.
  - Areas afectadas: modifier manifest, schemas, fixtures and preset refs.
- `2026-06-15`
  - Decision: el owner humano aprobo los 21 IDs propuestos sin cambios.
  - Razon: preservan responsabilidades y condiciones estables sin seleccionar stack.
  - Areas afectadas: modifier manifest, schemas, fixtures and implementation preset
    references.

## 13. Validaciones

### Documentales

- [ ] modifier guide and manifest consistent
- [ ] profiles/concerns do not select technology
- [ ] authority and accountable ownership remain external

### Tecnicas

- [ ] 11 components and 10 concerns validate
- [ ] references, scopes, slots and merge strategies validate
- [ ] invalid combinations and unresolved conflicts fail
- [ ] existing suites remain green

### Manuales

- [ ] IDs approved
- [ ] no profile duplicates a family
- [ ] concern activation and named basis are coherent
- [ ] composite products remain one-family models

### Resultados

- Pendientes hasta ejecucion.

## 14. Cierre

La fase solo se considera cerrada si:

- [ ] checklist complete
- [ ] ID gate resolved and recorded
- [ ] assumptions resolved
- [ ] decisions and drift synchronized
- [ ] blockers resolved
- [ ] validations pass and results recorded
- [ ] backlog and `tasks.md` synchronized

## 15. Riesgos y pendientes

### Riesgos

- Overlays too expressive could become hidden policy or free composition.
- Incorrect scope modeling could create false slot merges.
- A generic "stronger" merge could produce unsafe results.
- Modifier fields could accidentally imply authority or technology selection.

### Pendientes

- Fases 4-5 permanecen sin backlog.

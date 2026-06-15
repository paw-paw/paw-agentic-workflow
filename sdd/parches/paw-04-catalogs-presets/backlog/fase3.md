# Fase 3 - Component profiles, concerns y composicion

## Estado

- Change id: `paw-04-catalogs-presets`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `3`
- Estado: `done`
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

- [x] shared modifier definition contract
- [x] 11 component definitions and guides
- [x] 10 concern definitions and guides
- [x] typed scope and applied instance validation
- [x] slot key and deduplication
- [x] union, maximum, minimum, intersection and manual-conflict
- [x] dependencies, conflicts and family compatibility
- [x] `regulated-data` named basis requirement
- [x] authority/accountability mutation guards
- [x] schemas, fixtures, contract tests and conformance

### No entra

- [x] technology or stack selection
- [x] implementation preset variants
- [x] concrete repository adoption records
- [x] artifact bindings or full readiness calculation
- [x] runtime adapters or workflow changes

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

- [x] read approved modifier IDs in `decision.log`
- [x] reread all 11/10 semantics and non-activation signals
- [x] reread scope, slot key, merge, conflict, authority and ownership rules
- [x] confirm modifier definitions do not contain technology choices

### Bloque B - Inspeccion de estado actual

- [x] load family and capability IDs from canonical manifests
- [x] inspect canonical validator dispatch for fourth catalog
- [x] inspect fixture harness extension points
- [x] identify reusable set/scalar merge primitives without general rule invention

### Bloque C - Edicion por archivo

- [x] create modifier catalog with common contract and kind-specific fields
- [x] encode 11 component semantics, includes/excludes, scopes and capability demands
- [x] encode 10 concern activation rules, affected scopes and specialist review
- [x] encode `regulated-data.requires_named_basis: true`
- [x] validate canonical inventory, unique IDs, known family/capability refs
- [x] validate dependencies/conflicts and no self-reference
- [x] validate scope refs and stable scope kinds
- [x] implement slot key as `capability_id + scope_ref`
- [x] implement five merge strategies and provenance retention
- [x] return blocked conflict for incomparable/manual values
- [x] reject modifier attempts to set authority or accountable owner
- [x] create simple and composite product fixtures
- [x] create negatives for unknown refs, incompatible family, missing basis, ambiguous
  scope, authority mutation and unresolved conflict
- [x] add contract and conformance tests

### Bloque D - Registro de decisiones, hallazgos o blockers

- [x] record approved IDs and kind separation
- [x] record physical applied-instance shape used by fixtures
- [x] stop if a profile duplicates family intent
- [x] stop if a concern selects technology or changes authority/accountability
- [x] record drift and findings

### Bloque E - Validacion

- [x] run catalog validator canonical and fixtures
- [x] run modifier contract tests
- [x] run SDD validators
- [x] run patch validators canonical and fixtures
- [x] run complete test suite
- [x] run `git diff --check`
- [x] manually review all 21 definitions and conflict behavior

### Bloque F - Cierre

- [x] record commands, counts and results
- [x] update findings, drift, decisions and risks
- [x] mark Fase 3 `done` only after gates and validations
- [x] confirm Fase 4 can reference stable modifier IDs and variant signals
- [x] create Conventional Commit(s) after backlog update and validation

## 9. Drift detectado

- Ninguno al crear el backlog.

## 10. Hallazgos durante ejecucion

- Applied modifier instances belong to adoption inputs, not reusable catalog
  definitions; fixtures exercise the shape without promoting instances to authority.
- Capability merge strategy can operate on simple values, but `manual-conflict`
  remains unresolved whenever distinct values contribute.
- The approved 11/10 catalog expresses responsibilities without defining a framework,
  database, cloud, protocol, or agent runtime.

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

- [x] modifier guide and manifest consistent
- [x] profiles/concerns do not select technology
- [x] authority and accountable ownership remain external

### Tecnicas

- [x] 11 components and 10 concerns validate
- [x] references, scopes, slots and merge strategies validate
- [x] invalid combinations and unresolved conflicts fail
- [x] existing suites remain green

### Manuales

- [x] IDs approved
- [x] no profile duplicates a family
- [x] concern activation and named basis are coherent
- [x] composite products remain one-family models

### Resultados

- Validacion: canonical catalogs
  - comando o revision: `node paw/tools/validate-catalogs.mjs --json`
  - resultado esperado: 11 components, 10 concerns, zero errors
  - resultado obtenido: pass con inventario exacto
  - estado: `pass`
- Validacion: catalog fixtures
  - comando o revision: `node paw/tools/validate-catalogs.mjs --fixtures --json`
  - resultado esperado: modifier expectations match
  - resultado obtenido: pass, 8 modifier fixtures; 27 total catalog fixtures
  - estado: `pass`
- Validacion: complete suite
  - comando o revision: `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
  - resultado esperado: pass
  - resultado obtenido: 61 tests, 61 pass
  - estado: `pass`
- Validacion: SDD and patch compatibility
  - comando o revision: commands declared in Block E
  - resultado esperado: pass
  - resultado obtenido: pass; 4 patches and 20 patch fixtures
  - estado: `pass`
- Validacion: whitespace and manual boundaries
  - comando o revision: `git diff --check` plus manifest inspection
  - resultado esperado: no errors or technology/authority mutation
  - resultado obtenido: no errors; LF/CRLF notices only
  - estado: `pass`

## 14. Cierre

La fase solo se considera cerrada si:

- [x] checklist complete
- [x] ID gate resolved and recorded
- [x] assumptions resolved
- [x] decisions and drift synchronized
- [x] blockers resolved
- [x] validations pass and results recorded
- [x] backlog and `tasks.md` synchronized

## 15. Riesgos y pendientes

### Riesgos

- Overlays too expressive could become hidden policy or free composition.
- Incorrect scope modeling could create false slot merges.
- A generic "stronger" merge could produce unsafe results.
- Modifier fields could accidentally imply authority or technology selection.

### Pendientes

- Fases 4-5 permanecen sin backlog.

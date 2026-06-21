# Backlog Fase 1: Runtime adapter model and fixtures

---

## Estado

* Change id: `paw-10-multiruntime-adapters`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: `1 - Runtime adapter model and fixtures`
* Estado: `done`
* Ultima actualizacion: 2026-06-21
* Owner: sesion Codex activa
* Depende de: baseline SDD committed
* Desbloquea: Fase 2

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-10-multiruntime-adapters/patch.yaml`
* `sdd/parches/paw-10-multiruntime-adapters/definicion.md`
* `sdd/parches/paw-10-multiruntime-adapters/plan.md`
* `sdd/parches/paw-10-multiruntime-adapters/tasks.md`
* `sdd/parches/paw-10-multiruntime-adapters/decision.log`
* `paw/adoption/adapters/README.md`
* `paw/tools/schemas/adoption/runtime-adapter.schema.json`
* `paw/tools/adoption/validate-adapters.mjs`

---

## 2. Objetivo de la fase

* Resultado esperado: runtime adapters Codex, Claude Code, and Antigravity are
  represented as structurally valid candidate evidence with source freshness,
  operation mappings, capability status, activation boundaries, and explicit gaps.
* Razon de la fase: later docs and distribution reconciliation need concrete
  validated evidence.
* Cambio que queda habilitado al cerrar: adapter docs can promote validated
  semantics without inventing runtime paths.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `paw/adoption/**`,
  `paw/tools/adoption/**`, `paw/tests/fixtures/adoption/adapters/**`.
* reconciliacion esperada: runtime adapter contract remains an adoption binding,
  not core, stack, catalog, or workflow doctrine.

### Si `patch_kind = batch`

* no aplica.

---

## 4. Assumptions

* Official Claude Code docs checked on 2026-06-21 support project skills,
  subagents, hooks, and skill-scoped metadata.
* Official Antigravity public site checked on 2026-06-21 does not provide a
  stable local file path or skill packaging contract; such fields must be
  blocked or manual, not invented.

---

## 5. Precondiciones

### Documentos

* [x] `definicion.md`, `plan.md`, and `tasks.md` exist.

### Decisiones previas

* [x] no branch; execute on `main`.
* [x] Antigravity unverified physical paths are blocked.

### Estado tecnico

* [x] `node paw/tools/validate-patches.mjs --json` passed before baseline commit.

---

## 6. Alcance

### Si entra

* [x] extend runtime adapter schema and validator.
* [x] add concrete runtime adapter fixture evidence for Codex, Claude Code, and
  Antigravity.
* [x] add invalid fixture coverage for default activation and hidden gaps.

### No entra

* [x] create `.claude/**`, `.antigravity/**`, `.agents/**`, or `paw/parches/**`.
* [x] physically install or execute Claude Code or Antigravity.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/adoption/adapters/README.md`
* `paw/tools/adoption/validate-adapters.mjs`
* `paw/tools/schemas/adoption/runtime-adapter.schema.json`
* `paw/tests/contract/adoption-adapters.test.mjs`
* `tests/adoption-conformance.test.mjs`

### Editar

* `paw/tools/adoption/validate-adapters.mjs`
* `paw/tools/schemas/adoption/runtime-adapter.schema.json`
* `paw/tests/fixtures/adoption/adapters/**`
* `paw/tests/contract/adoption-adapters.test.mjs`
* `tests/adoption-conformance.test.mjs`
* `paw/adoption/adapters/runtime/*.json`

### Validar

* `node --test paw/tests/contract/adoption-adapters.test.mjs`
* `node paw/tools/validate-adoption.mjs --fixtures --json`
* `node --test tests/adoption-conformance.test.mjs`

### No tocar

* `.agents/**`
* `.claude/**`
* `.antigravity/**`
* `paw/parches/**`
* `paw/core/**`
* `paw/catalogs/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer schema, validator, fixture harness, and current tests.

### Bloque B - Inspeccion de estado actual

* [x] confirmar current fixture count is 6 and valid runtime fixture is generic.

### Bloque C - Edicion por archivo

* [x] update runtime adapter schema with evidence fields.
* [x] update validator with candidate activation and hidden-gap checks.
* [x] update generic runtime fixture to the expanded shape.
* [x] add Codex, Claude Code, and Antigravity valid runtime fixtures.
* [x] add invalid default-activation and hidden-gap fixtures.
* [x] update hard-coded fixture counts in tests.
* [x] add canonical adapter evidence JSON under `paw/adoption/adapters/runtime/`.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] record Antigravity public path limitation as finding.

### Bloque E - Validacion

* [x] run phase validations.

### Bloque F - Cierre

* [x] mark phase done when validations pass.

---

## 9. Drift detectado

* Fecha: 2026-06-21
  * fuente esperada: `paw-10` requires concrete runtime evidence.
  * diferencia encontrada: existing adoption runtime fixture is generic only.
  * impacto: no local evidence for Claude Code or Antigravity.
  * accion: add concrete fixtures and validator semantics.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-21
  * hallazgo: Antigravity has official public site evidence, but no stable
    official local skill path or hook contract available during execution.
  * impacto: Antigravity adapter is valid only as candidate evidence with
    blocked physical path gaps.
  * accion: represent paths as `blocked-unverified`, require explicit
    `gap_disposition`, and keep activation `candidate-opt-in-with-gaps`.

---

## 11. Blockers

* [x] none.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-21
  * decision: require candidate runtime adapters to declare activation state and
    source freshness.
  * razon: prevent implicit v2 default activation and stale vendor claims.
  * documentos o areas afectadas: runtime adapter schema, validator, fixtures.

---

## 13. Validaciones

### Documentales

* [x] verificar alineacion con contratos aplicables.

### Tecnicas

* [x] `node --test paw/tests/contract/adoption-adapters.test.mjs`
* [x] `node paw/tools/validate-adoption.mjs --fixtures --json`
* [x] `node --test tests/adoption-conformance.test.mjs`

### Manuales

* [x] review source freshness fields in runtime fixtures.

### Resultados

* Validacion:
  * comando o revision: `node --test paw/tests/contract/adoption-adapters.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 6 tests pass
  * estado: `pass`
  * notas: validates fixture matrix and runtime adapter guardrails.
* Validacion:
  * comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  * resultado esperado: `status: pass`
  * resultado obtenido: `status: pass`, 11 adapter fixtures, 6 valid and 5 invalid
  * estado: `pass`
  * notas: expanded runtime adapter fixture matrix passed.
* Validacion:
  * comando o revision: `node --test tests/adoption-conformance.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 3 tests pass
  * estado: `pass`
  * notas: root adoption conformance updated for expanded fixture count.

---

## 14. Cierre

La fase solo se considera cerrada si:

* [x] checklist completo o pendientes explicitamente diferidos
* [x] assumptions criticas resueltas, aceptadas o escaladas
* [x] decisiones relevantes registradas
* [x] blockers resueltos o diferidos con razon
* [x] drift documentado o resuelto
* [x] validaciones requeridas ejecutadas o justificadas
* [x] resultados de validacion registrados

---

## 15. Riesgos y pendientes

### Riesgos

* risk: Antigravity adapter remains capability evidence with blocked physical
  paths until official technical docs exist.

### Pendientes

* pending: Fase 2 docs must explain the new evidence fields.

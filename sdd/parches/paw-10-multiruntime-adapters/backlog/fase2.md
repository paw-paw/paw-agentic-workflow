# Backlog Fase 2: Adapter documentation and opt-in boundary

---

## Estado

* Change id: `paw-10-multiruntime-adapters`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: `2 - Adapter documentation and opt-in boundary`
* Estado: `done`
* Ultima actualizacion: 2026-06-21
* Owner: sesion Codex activa
* Depende de: Fase 1 done
* Desbloquea: Fase 3

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-10-multiruntime-adapters/tasks.md`
* `sdd/parches/paw-10-multiruntime-adapters/backlog/fase1.md`
* `paw/adoption/**`
* `docs/governance/**`
* `paw/tools/README.md`
* `paw/tests/README.md`

---

## 2. Objetivo de la fase

* Resultado esperado: live docs explain concrete runtime adapter evidence,
  source freshness, gap disposition, and candidate opt-in boundaries.
* Razon de la fase: validated fixtures must be promoted into readable contract
  guidance before distribution reconciliation.
* Cambio que queda habilitado al cerrar: Fase 3 can include adapter artifacts in
  the candidate distribution without making a portability claim.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `paw/adoption/**`,
  `docs/governance/**`, `paw/tools/README.md`, `paw/tests/README.md`.
* reconciliacion esperada: docs describe candidate runtime adapter evidence and
  preserve active v1 workflow.

### Si `patch_kind = batch`

* no aplica.

---

## 4. Assumptions

* Fase 1 adapter evidence is the implementation source for this documentation.

---

## 5. Precondiciones

### Documentos

* [x] Fase 1 backlog is done.

### Decisiones previas

* [x] no default activation before patch 14.

### Estado tecnico

* [x] adoption fixtures pass after Fase 1.

---

## 6. Alcance

### Si entra

* [x] update adoption adapter docs.
* [x] update governance status and transition inventory.
* [x] update tools/tests documentation for expanded runtime adapter validation.

### No entra

* [x] update `paw/core/**` or `paw/orchestration/**`.
* [x] create runtime-specific install files.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/adoption/README.md`
* `paw/adoption/adapters/README.md`
* `docs/governance/ARCHITECTURE.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `paw/tools/README.md`
* `paw/tests/README.md`

### Editar

* same as read-before-edit list.

### Validar

* `node --test tests/foundation-governance.test.mjs`
* `node --test tests/core-contracts.test.mjs`
* `node paw/tools/validate-adoption.mjs --fixtures --json`

### No tocar

* `paw/core/**`
* `paw/orchestration/**`
* `.claude/**`
* `.antigravity/**`
* `.agents/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] read docs and Fase 1 evidence.

### Bloque B - Inspeccion de estado actual

* [x] identify Codex-only status language that needs candidate multiruntime note.

### Bloque C - Edicion por archivo

* [x] update adoption docs with concrete runtime evidence fields.
* [x] update governance docs with candidate multiruntime adapter status.
* [x] update tools/tests READMEs.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] record no-default-activation review.

### Bloque E - Validacion

* [x] run phase validations.

### Bloque F - Cierre

* [x] mark phase done.

---

## 9. Drift detectado

* Fecha: 2026-06-21
  * fuente esperada: `BOOTSTRAP-STATUS.md` should distinguish implemented
    candidate evidence from activated runtime adapters.
  * diferencia encontrada: status previously said concrete runtime adapters were
    not implemented at all.
  * impacto: after Fase 1 that wording was stale.
  * accion: update status to list candidate runtime adapter evidence as
    implemented while keeping activated adapters and stable portability in Not
    Implemented.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-21
  * hallazgo: no new portable workflow operation is needed for runtime adapter
    evidence.
  * impacto: `paw/orchestration/**` remains untouched.
  * accion: keep runtime adapter semantics in `paw/adoption/**`.

---

## 11. Blockers

* [x] none.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-21
  * decision: do not add new portable workflow operations for runtime adapters.
  * razon: existing adoption runtime adapter contract is the correct layer.
  * documentos o areas afectadas: adoption docs only.

---

## 13. Validaciones

### Documentales

* [x] manual no-default-activation review.

### Tecnicas

* [x] `node --test tests/foundation-governance.test.mjs`
* [x] `node --test tests/core-contracts.test.mjs`
* [x] `node paw/tools/validate-adoption.mjs --fixtures --json`

### Manuales

* [x] review docs for no portability-complete claim.

### Resultados

* Validacion:
  * comando o revision: `node --test tests/foundation-governance.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 6 tests pass
  * estado: `pass`
  * notas: transition and runtime boundaries preserved.
* Validacion:
  * comando o revision: `node --test tests/core-contracts.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 8 tests pass
  * estado: `pass`
  * notas: portable core remains runtime-neutral.
* Validacion:
  * comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  * resultado esperado: `status: pass`
  * resultado obtenido: `status: pass`, 11 adapter fixtures
  * estado: `pass`
  * notas: docs did not affect adoption fixture validity.

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

* risk: wording may imply portability completed; mitigated by explicit
  candidate-evidence and no-default-activation language.

### Pendientes

* pending: Fase 3 distribution manifest reconciliation.

# Backlog Fase 4: Assessments, flows y referencias a catalogos

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

* Change id: `paw-05-adapter-adoption-contracts`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 4 - Assessments, flows y referencias a catalogos
* Estado: `done`
* Ultima actualizacion: 2026-06-19
* Owner: sesion Codex activa con aprobacion humana
* Depende de: Fase 3 cerrada y commit `1c92078`
* Desbloquea: Fase 5 - Reconciliacion documental, conformance y cierre

---

## 1. Fuente de verdad aplicable

* `sdd/parches/paw-05-adapter-adoption-contracts/definicion.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/plan.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/tasks.md`
* `paw/adoption/assessments/README.md`
* `paw/adoption/examples/README.md`
* `paw/catalogs/**`
* `paw/tools/adoption/**`

---

## 2. Objetivo de la fase

* Resultado esperado: assessment schema, validator, fixtures y tests cubren flows
  greenfield/brownfield y referencias a catalogos.
* Razon de la fase: cierre necesita demostrar resolucion completa y errores
  accionables.
* Cambio que queda habilitado al cerrar: Fase 5 puede reconciliar docs vivos y correr
  matriz global.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: assessment contracts,
  examples, validator y fixtures.
* reconciliacion esperada: assessments comparan preset, adoption record y realidad
  sin elegir stacks automaticamente.

### Si `patch_kind = batch`

* No aplica.

---

## 4. Assumptions

* Assessment fixtures pueden referenciar records inline para mantener casos compactos.
* Catalog reference validation puede cubrir family, documentation preset, modifiers,
  implementation preset y variants desde los manifests existentes.

---

## 5. Precondiciones

### Documentos

* [x] Fase 3 backlog `done`.
* [x] `paw/adoption/assessments/README.md` existe.

### Decisiones previas

* [x] No hay decision humana pendiente sobre flows.

### Estado tecnico

* [x] `validate-adoption.mjs` y record validator existen.
* [x] Catalog validator pasa antes de esta fase.

---

## 6. Alcance

### Si entra

* [x] Crear `assessment.schema.json`.
* [x] Implementar `validateAssessment`.
* [x] Extender fixture runner para assessments.
* [x] Crear fixtures greenfield y brownfield validos.
* [x] Crear fixtures invalidos para referencias desconocidas y flow invalido.
* [x] Crear tests contractuales de assessments.

### No entra

* [ ] Automatizar seleccion de stack.
* [ ] Pilotos reales.
* [ ] Cambios en catalogos.
* [ ] Reconciliacion final de docs vivos, reservada para Fase 5.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/adoption/assessments/README.md`
* `paw/adoption/examples/README.md`
* `paw/tools/adoption/validate-records.mjs`
* `paw/catalogs/**/catalog.json`

### Editar

* `paw/tools/schemas/adoption/assessment.schema.json`
* `paw/tools/adoption/validate-assessments.mjs`
* `paw/tools/adoption/validate-adoption-fixtures.mjs`
* `paw/tests/fixtures/adoption/assessments/**`
* `paw/tests/contract/adoption-assessments.test.mjs`
* `paw/adoption/assessments/README.md`
* `paw/adoption/examples/README.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/backlog/fase4.md`

### Validar

* `node paw/tools/validate-adoption.mjs --fixtures --json`
* `node --test paw/tests/contract/adoption-assessments.test.mjs`
* `node --test paw/tests/contract/adoption-records.test.mjs`
* `node paw/tools/validate-catalogs.mjs --json`
* `git diff --check`

### No tocar

* `paw/catalogs/**`
* `paw/core/**`
* `paw/parches/**`
* `.codex/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] Leer assessment y examples READMEs.
* [x] Leer catalog manifests para ID sets.
* [x] Leer record validator para reutilizar context.

### Bloque B - Inspeccion de estado actual

* [x] Confirmar ausencia de assessment schema/validator/fixtures.
* [x] Confirmar adoption validator solo cubre adapters y records.

### Bloque C - Edicion por archivo

* [x] Crear assessment schema.
* [x] Crear catalog context con family, documentation preset, modifier, implementation
  preset y variant IDs.
* [x] Crear `validateAssessment` con flow, reference y no auto-selection checks.
* [x] Extender fixture runner para assessments.
* [x] Crear fixtures greenfield/brownfield validos y errores accionables.
* [x] Crear tests contractuales de assessments.
* [x] Actualizar assessment/examples READMEs con schemas/validator materializados.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] Registrar hallazgo si assessment necesita catalog context amplio.
* [x] Registrar drift si flow docs y validator divergen.

### Bloque E - Validacion

* [x] Ejecutar `node paw/tools/validate-adoption.mjs --fixtures --json`.
* [x] Ejecutar `node --test paw/tests/contract/adoption-assessments.test.mjs`.
* [x] Ejecutar `node --test paw/tests/contract/adoption-records.test.mjs`.
* [x] Ejecutar `node paw/tools/validate-catalogs.mjs --json`.
* [x] Ejecutar `git diff --check`.

### Bloque F - Cierre

* [x] Marcar checklist completo.
* [x] Registrar resultados de validacion.
* [x] Cambiar Estado a `done` si no quedan blockers.
* [x] Preparar commit `feat(adoption): validate adoption assessments`.

---

## 9. Drift detectado

* Fecha: 2026-06-19
  * hallazgo: assessment validation necesita contexto amplio de catalogos para
    family, documentation preset, modifier, implementation preset y variant IDs.
  * impacto: `validateAdoptionFixtures` ahora carga cuatro catalogos para assessment
    fixtures.
  * accion: se agrego `createAdoptionCatalogContext` y tests de referencias.

---

## 10. Hallazgos durante ejecucion

* Ninguno registrado al crear el backlog.

---

## 11. Blockers

* Ninguno.

---

## 12. Decisiones tomadas

* Ninguna nueva durante backlog creation.

---

## 13. Validaciones

### Documentales

* [x] verificar que assessment no selecciona stack automaticamente

### Tecnicas

* [x] `node paw/tools/validate-adoption.mjs --fixtures --json`
* [x] `node --test paw/tests/contract/adoption-assessments.test.mjs`
* [x] `node --test paw/tests/contract/adoption-records.test.mjs`
* [x] `node paw/tools/validate-catalogs.mjs --json`
* [x] `git diff --check`

### Manuales

* [x] revision manual de greenfield/brownfield distinction

### Resultados

* Validacion:
  * comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass; 6 adapter fixtures, 6 record fixtures y 5 assessment
    fixtures.
  * estado: `pass`
  * notas: assessment matrix incluye 2 validos y 3 invalidos esperados.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/adoption-assessments.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 4 tests, 4 pass.
  * estado: `pass`
  * notas: cubre referencias, flow order y no auto-selection.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/adoption-records.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 4 tests, 4 pass.
  * estado: `pass`
  * notas: records preservados.
* Validacion:
  * comando o revision: `node paw/tools/validate-catalogs.mjs --json`
  * resultado esperado: pass
  * resultado obtenido: pass; catalogos intactos.
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: pass
  * resultado obtenido: pass con avisos LF/CRLF del checkout Windows.
  * estado: `pass`
  * notas: sin whitespace errors.

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

* Riesgo: assessment se convierta en seleccion automatica. Mitigacion: validator
  rechaza `auto_selected_stack`.

### Pendientes

* Fase 5 debe reconciliar docs vivos y cerrar.

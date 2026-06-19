# Backlog Fase 3: Adoption records, binding, variants y overrides

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

* Change id: `paw-05-adapter-adoption-contracts`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 3 - Adoption records, binding, variants y overrides
* Estado: `done`
* Ultima actualizacion: 2026-06-19
* Owner: sesion Codex activa con aprobacion humana
* Depende de: Fase 2 cerrada y commit `1316295`
* Desbloquea: Fase 4 - Assessments, flows y referencias a catalogos

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/definicion.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/plan.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/tasks.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/decision.log`
* `paw/adoption/records/README.md`
* `paw/catalogs/implementation-presets/catalog.json`

---

## 2. Objetivo de la fase

* Resultado esperado: adoption records tienen schema, validator, fixtures y tests para
  exact adoption, supported variant, local exception, rejection e invalid overrides.
* Razon de la fase: assessments necesitan records con resolution semantics antes de
  comparar contra realidad.
* Cambio que queda habilitado al cerrar: Fase 4 puede validar assessment inputs y
  referencias a catalogos.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `paw/adoption/records/**`,
  `paw/tools/schemas/adoption/adoption-record.schema.json`, validator y fixtures.
* reconciliacion esperada: records quedan separados de preset definitions y stack
  realizations.

### Si `patch_kind = batch`

* No aplica.

---

## 4. Assumptions

* Implementation preset IDs y variant IDs del patch 04 son suficientes para validar
  variant references.
* Records pueden validar reference integrity sin assessment completo.

---

## 5. Precondiciones

### Documentos

* [x] Fase 2 backlog `done`.
* [x] `paw/adoption/records/README.md` existe.

### Decisiones previas

* [x] No hay decision humana pendiente para modelar record fields.

### Estado tecnico

* [x] `paw/tools/validate-adoption.mjs` existe.
* [x] `paw/tools/adoption/validate-adoption-fixtures.mjs` puede extenderse.

---

## 6. Alcance

### Si entra

* [x] Crear `adoption-record.schema.json`.
* [x] Implementar `validateAdoptionRecord`.
* [x] Validar required binding fields.
* [x] Validar exact, variant, exception, new preset need y rejection.
* [x] Validar overrides con owner, approval y review/expiration.
* [x] Agregar fixtures y tests de records.

### No entra

* [ ] Assessment schema.
* [ ] Greenfield/brownfield full flows.
* [ ] Cambios en catalogos.
* [ ] Adapters concretos.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/adoption/records/README.md`
* `paw/catalogs/implementation-presets/catalog.json`
* `paw/tools/adoption/validate-adoption-fixtures.mjs`
* `paw/tests/contract/adoption-adapters.test.mjs`

### Editar

* `paw/tools/schemas/adoption/adoption-record.schema.json`
* `paw/tools/adoption/validate-records.mjs`
* `paw/tools/adoption/validate-adoption-fixtures.mjs`
* `paw/tests/fixtures/adoption/records/**`
* `paw/tests/contract/adoption-records.test.mjs`
* `paw/adoption/records/README.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/backlog/fase3.md`

### Validar

* `node paw/tools/validate-adoption.mjs --fixtures --json`
* `node --test paw/tests/contract/adoption-records.test.mjs`
* `node --test paw/tests/contract/adoption-adapters.test.mjs`
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

* [x] Leer records README.
* [x] Leer implementation preset catalog para identificar preset/variant shape.
* [x] Leer adoption fixture runner existente.

### Bloque B - Inspeccion de estado actual

* [x] Confirmar ausencia de record schema y fixtures.
* [x] Confirmar validator actual solo cubre adapters.

### Bloque C - Edicion por archivo

* [x] Crear schema de adoption record con binding fields.
* [x] Crear validator de records con catalog reference sets.
* [x] Extender fixture runner para records.
* [x] Crear fixtures: exact, supported variant, local exception, rejected preset,
  invalid override, invalid unknown variant.
* [x] Crear tests contractuales de records.
* [x] Actualizar records README con schema/validator materializados.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] Registrar hallazgo si validation requiere catalog context.
* [x] Registrar drift si records README y validator divergen.

### Bloque E - Validacion

* [x] Ejecutar `node paw/tools/validate-adoption.mjs --fixtures --json`.
* [x] Ejecutar `node --test paw/tests/contract/adoption-records.test.mjs`.
* [x] Ejecutar `node --test paw/tests/contract/adoption-adapters.test.mjs`.
* [x] Ejecutar `node paw/tools/validate-catalogs.mjs --json`.
* [x] Ejecutar `git diff --check`.

### Bloque F - Cierre

* [x] Marcar checklist completo.
* [x] Registrar resultados de validacion.
* [x] Cambiar Estado a `done` si no quedan blockers.
* [x] Preparar commit `feat(adoption): validate adoption records`.

---

## 9. Drift detectado

* Fecha: 2026-06-19
  * hallazgo: record validation necesita contexto del catalogo de implementation
    presets para verificar `preset_ref` y `variant_ref`.
  * impacto: `validateAdoptionFixtures` carga `paw/catalogs/implementation-presets/catalog.json`.
  * accion: se agrego `createImplementationPresetContext` y tests para variant refs.

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

* [x] verificar que records no redefinan presets

### Tecnicas

* [x] `node paw/tools/validate-adoption.mjs --fixtures --json`
* [x] `node --test paw/tests/contract/adoption-records.test.mjs`
* [x] `node --test paw/tests/contract/adoption-adapters.test.mjs`
* [x] `node paw/tools/validate-catalogs.mjs --json`
* [x] `git diff --check`

### Manuales

* [x] revision manual de variants/exceptions/overrides

### Resultados

* Validacion:
  * comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass; 6 adapter fixtures y 6 record fixtures.
  * estado: `pass`
  * notas: record matrix incluye 4 validos y 2 invalidos esperados.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/adoption-records.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 4 tests, 4 pass.
  * estado: `pass`
  * notas: cubre exact, variant, exception, rejection y overrides.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/adoption-adapters.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 4 tests, 4 pass.
  * estado: `pass`
  * notas: adapter coverage preservada.
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

* Riesgo: un override sin revision pase como valido. Mitigacion: validator exige
  `expires_at` o `review_condition`.

### Pendientes

* Fase 4 debe implementar assessments y flows.

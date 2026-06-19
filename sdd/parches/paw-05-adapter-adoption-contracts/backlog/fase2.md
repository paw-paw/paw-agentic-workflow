# Backlog Fase 2: Schemas y validators de adapter contracts

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

* Change id: `paw-05-adapter-adoption-contracts`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 2 - Schemas y validators de adapter contracts
* Estado: `done`
* Ultima actualizacion: 2026-06-19
* Owner: sesion Codex activa con aprobacion humana
* Depende de: Fase 1 cerrada y commit `db31011`
* Desbloquea: Fase 3 - Adoption records, binding, variants y overrides

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/patch.yaml`
* `sdd/parches/paw-05-adapter-adoption-contracts/definicion.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/plan.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/tasks.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/decision.log`
* `paw/adoption/README.md`
* `paw/adoption/adapters/README.md`

---

## 2. Objetivo de la fase

* Resultado esperado: schemas, validator y fixtures prueban responsabilidades
  disjuntas de repo adapter, stack adapter y runtime adapter.
* Razon de la fase: los adoption records y assessments necesitan adapters validables
  antes de resolver bindings y comparar realidad.
* Cambio que queda habilitado al cerrar: Fase 3 puede referenciar adapter validation
  como base para records y overrides.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: schemas y tooling bajo
  `paw/tools/**`, fixtures/tests bajo `paw/tests/**`, y guia `paw/adoption/adapters/README.md`.
* reconciliacion esperada: adapter contracts quedan materializados sin implementar
  adapters concretos ni activar runtimes.

### Si `patch_kind = batch`

* No aplica.

---

## 4. Assumptions

* Los schemas pueden ser JSON orientativos y el enforcement real vive en el validator
  Node.js, siguiendo patrones del patch 04.
* Los fixtures de Fase 2 pueden cubrir adapters sin records/assessments completos.
* Runtime adapter validation puede rechazar campos de stack/family sin conocer aun un
  runtime concreto.

---

## 5. Precondiciones

### Documentos

* [x] Fase 1 backlog `done`.
* [x] `paw/adoption/adapters/README.md` existe.

### Decisiones previas

* [x] `decision.log` registra `paw/adoption/**` como superficie dedicada.

### Estado tecnico

* [x] `paw/tools/catalogs/**` provee patrones de validator.
* [x] No existen schemas de adoption antes de esta fase.

---

## 6. Alcance

### Si entra

* [x] Crear schemas de repo, stack y runtime adapter.
* [x] Crear validator de adapters y fixture runner de adoption.
* [x] Crear CLI `paw/tools/validate-adoption.mjs` con `--json`, `--fixtures` y `--help`.
* [x] Crear fixtures validos e invalidos para adapter boundaries.
* [x] Agregar tests contractuales de adapter validation.

### No entra

* [ ] Adoption record schema.
* [ ] Assessment schema.
* [ ] Runtime adapter concreto para Codex, Claude Code o Antigravity.
* [ ] Cambios en `paw/catalogs/**`.
* [ ] Activacion de `paw/parches/**` o writers v2.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/tools/catalogs/validate-canonical-catalogs.mjs`
* `paw/tools/catalogs/validate-catalog-fixtures.mjs`
* `paw/tools/validate-catalogs.mjs`
* `paw/tests/contract/modifier-catalog.test.mjs`

### Editar

* `paw/tools/schemas/adoption/repo-adapter.schema.json`
* `paw/tools/schemas/adoption/stack-adapter.schema.json`
* `paw/tools/schemas/adoption/runtime-adapter.schema.json`
* `paw/tools/adoption/validate-adapters.mjs`
* `paw/tools/adoption/validate-adoption-fixtures.mjs`
* `paw/tools/validate-adoption.mjs`
* `paw/tests/fixtures/adoption/adapters/**`
* `paw/tests/contract/adoption-adapters.test.mjs`
* `paw/adoption/adapters/README.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/backlog/fase2.md`

### Validar

* `node paw/tools/validate-adoption.mjs --fixtures --json`
* `node --test paw/tests/contract/adoption-adapters.test.mjs`
* `node sdd/tools/validate-sdd.mjs`
* `git diff --check`

### No tocar

* `paw/catalogs/**`
* `paw/core/**`
* `paw/parches/**`
* `.codex/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] Leer adapters README y confirmar responsabilidades.
* [x] Leer validator catalog patterns.
* [x] Leer fixture test pattern.

### Bloque B - Inspeccion de estado actual

* [x] Confirmar ausencia de `paw/tools/adoption/**`.
* [x] Confirmar ausencia de `paw/tools/schemas/adoption/**`.
* [x] Confirmar ausencia de `paw/tests/fixtures/adoption/**`.

### Bloque C - Edicion por archivo

* [x] Crear schemas de adapter con required fields y forbidden cross-responsibility fields.
* [x] Crear validator reusable `validateRepoAdapter`, `validateStackAdapter` y
  `validateRuntimeAdapter`.
* [x] Crear fixture runner que valida `case.json` contra `expected.json`.
* [x] Crear CLI `validate-adoption.mjs` compatible con `--json` y `--fixtures`.
* [x] Crear fixtures validos e invalidos para repo, stack y runtime adapters.
* [x] Crear tests contractuales que ejerciten validator y fixture runner.
* [x] Actualizar adapters README para apuntar a los schemas materializados.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] Registrar hallazgo si un schema necesita enforcement fuera de JSON schema.
* [x] Registrar drift si adapter docs contradicen implementation.

### Bloque E - Validacion

* [x] Ejecutar `node paw/tools/validate-adoption.mjs --fixtures --json`.
* [x] Ejecutar `node --test paw/tests/contract/adoption-adapters.test.mjs`.
* [x] Ejecutar `node sdd/tools/validate-sdd.mjs`.
* [x] Ejecutar `git diff --check`.

### Bloque F - Cierre

* [x] Marcar checklist completo.
* [x] Registrar resultados de validacion.
* [x] Cambiar Estado a `done` si no quedan blockers.
* [x] Preparar commit `feat(adoption): validate adapter contracts`.

---

## 9. Drift detectado

* Fecha: 2026-06-19
  * hallazgo: JSON schemas documentan forma, pero las reglas cross-responsibility se
    hacen cumplir en el validator Node.js.
  * impacto: los schemas permanecen orientativos y el enforcement contractual vive en
    `paw/tools/adoption/validate-adapters.mjs`.
  * accion: tests y fixtures ejercitan campos prohibidos y preset creation.
* Fecha: 2026-06-19
  * hallazgo: el primer runner de fixtures devolvia errores esperados como errores
    globales.
  * impacto: la matriz fallaba aunque los fixtures invalidos fueran correctos.
  * accion: el runner ahora compara codigos esperados y solo emite mismatch cuando la
    expectativa no coincide.

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

* [x] verificar que adapter docs y schemas mantengan responsabilidades disjuntas

### Tecnicas

* [x] `node paw/tools/validate-adoption.mjs --fixtures --json`
* [x] `node --test paw/tests/contract/adoption-adapters.test.mjs`
* [x] `node sdd/tools/validate-sdd.mjs`
* [x] `git diff --check`

### Manuales

* [x] revision manual de no runtime concreto y no stack selection por runtime adapter

### Resultados

* Validacion:
  * comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass; 6 adapter fixtures, 3 validos y 3 invalidos esperados.
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/adoption-adapters.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 4 tests, 4 pass.
  * estado: `pass`
  * notas: cubre repo, stack y runtime adapter boundaries.
* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: pass
  * resultado obtenido: `SDD repo validation passed`
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

* Riesgo: runtime adapter acepte stack/family selection. Mitigacion: validator debe
  rechazar campos prohibidos.
* Riesgo: stack adapter declare preset reutilizable nuevo. Mitigacion: validator debe
  rechazar `preset_definition`, `variants`, y equivalentes doctrinales.

### Pendientes

* Fase 3 debe agregar adoption record y override semantics.

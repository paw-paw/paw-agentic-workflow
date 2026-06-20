# Backlog Fase 2: Manifest, checksums y validator

---

## Estado

* Change id: `paw-09-manual-distribution`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 2 - Manifest, checksums y validator
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa con aprobacion humana
* Depende de: Fase 1 cerrada en `eb09600`
* Desbloquea: Fase 3 - Instalacion manual, conflicto y rollback

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `paw/distribution/**`
* `sdd/parches/paw-09-manual-distribution/patch.yaml`
* `sdd/parches/paw-09-manual-distribution/definicion.md`
* `sdd/parches/paw-09-manual-distribution/plan.md`
* `sdd/parches/paw-09-manual-distribution/tasks.md`
* `sdd/parches/paw-09-manual-distribution/decision.log`

---

## 2. Objetivo de la fase

* Resultado esperado: existe manifest canonical de distribucion con checksums y
  validator deterministico con fixtures y tests.
* Razon de la fase: la instalacion reversible necesita una unidad auditable y
  validable antes de planificar escrituras sobre destinos.
* Cambio que queda habilitado al cerrar: Fase 3 puede usar manifest y validator
  para planificar instalacion/conflictos.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `paw/distribution/**`,
  `paw/tools/**`, `paw/tests/**`, inventories and validation lists.
* reconciliacion esperada: tooling valida evidencia; politica permanece en
  `paw/distribution/**`.

### Si `patch_kind = batch`

* no aplica.

---

## 4. Assumptions

* No critical assumptions.

---

## 5. Precondiciones

### Documentos

* [x] Fase 1 cerrada y contrato `paw/distribution/**` registrado.

### Decisiones previas

* [x] Candidate distribution status registrado.

### Estado tecnico

* [x] No existe validator de distribucion previo.

---

## 6. Alcance

### Si entra

* [x] Schema de manifest de distribucion.
* [x] Manifest canonical con checksums SHA-256.
* [x] Validator deterministic y CLI `validate-distribution.mjs`.
* [x] Fixtures positivas y negativas.
* [x] Tests contractuales y docs de inventario.

### No entra

* [ ] Instalar, copiar, borrar, rollback o editar destinos externos.
* [ ] Activar package manager, marketplace, release automation o v2.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/distribution/**`
* `paw/tools/integration/**`
* `paw/tools/validate-integration.mjs`
* `paw/tests/contract/integration-*.test.mjs`
* `paw/tools/README.md`
* `paw/tests/README.md`
* `AGENTS.md`
* `README.md`

### Editar

* `paw/distribution/distribution-manifest.json`
* `paw/tools/schemas/distribution/distribution-manifest.schema.json`
* `paw/tools/distribution/**`
* `paw/tools/validate-distribution.mjs`
* `paw/tests/fixtures/distribution/**`
* `paw/tests/contract/distribution-validation.test.mjs`
* `paw/tests/contract/distribution-cli.test.mjs`
* `paw/tools/README.md`
* `paw/tests/README.md`
* `AGENTS.md`
* `README.md`
* `sdd/parches/paw-09-manual-distribution/backlog/fase2.md`

### Validar

* `node paw/tools/validate-distribution.mjs --json`
* `node paw/tools/validate-distribution.mjs --fixtures --json`
* `node --test paw/tests/contract/distribution-validation.test.mjs`
* `node --test paw/tests/contract/distribution-cli.test.mjs`
* `node sdd/tools/validate-sdd.mjs`
* `node paw/tools/validate-patches.mjs --json`
* `git diff --check`

### No tocar

* `_inbox/**`
* `paw/parches/**`
* package manager, release, Pages, Actions, deployment config

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] Leer contrato de manifest e instalacion.
* [x] Leer patrones de validator integration.

### Bloque B - Inspeccion de estado actual

* [x] Confirmar ausencia de validator/fixtures distribution.

### Bloque C - Edicion por archivo

* [x] Crear schema JSON de manifest.
* [x] Crear validator de manifest con checksums y superficies requeridas.
* [x] Crear validator de fixtures.
* [x] Crear CLI `validate-distribution.mjs`.
* [x] Crear manifest canonical con entries/checksums.
* [x] Crear fixtures.
* [x] Crear tests contractuales y CLI.
* [x] Actualizar inventarios y lista de validaciones.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] Registrar decision si el manifest canonical excluye una superficie
  esperada.
* [x] Registrar drift si el contrato no puede validarse mecanicamente.

### Bloque E - Validacion

* [x] Ejecutar validator distribution canonical y fixtures.
* [x] Ejecutar tests distribution.
* [x] Ejecutar checks SDD/patch relevantes.
* [x] Ejecutar `git diff --check`.

### Bloque F - Cierre

* [x] Registrar resultados.
* [x] Marcar fase `done` si no hay blockers ni drift abierto.

---

## 9. Drift detectado

* Ninguno registrado.

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-20
  * hallazgo: no existia familia de validator `distribution`.
  * impacto: el manifest no podia auditarse deterministicamente.
  * accion: agregar schema, validator, CLI, fixtures y tests contractuales.

---

## 11. Blockers

* Ninguno.

---

## 12. Decisiones tomadas

* Ninguna nueva.

---

## 13. Validaciones

### Documentales

* [x] inventarios actualizados

### Tecnicas

* [x] `node paw/tools/validate-distribution.mjs --json`
* [x] `node paw/tools/validate-distribution.mjs --fixtures --json`
* [x] `node --test paw/tests/contract/distribution-validation.test.mjs`
* [x] `node --test paw/tests/contract/distribution-cli.test.mjs`
* [x] `node sdd/tools/validate-sdd.mjs`
* [x] `node paw/tools/validate-patches.mjs --json`
* [x] `git diff --check`

### Manuales

* [x] revision manual de que el validator no sustituye la autoridad documental

### Resultados

* Validacion:
  * comando o revision: `node paw/tools/validate-distribution.mjs --json`
  * resultado esperado: `status: pass`
  * resultado obtenido: `status: pass`, 333 manifest entries, sin errores
  * estado: `pass`
  * notas: valida manifest canonical y schema.
* Validacion:
  * comando o revision: `node paw/tools/validate-distribution.mjs --fixtures --json`
  * resultado esperado: `status: pass`
  * resultado obtenido: `status: pass`, 4 fixtures, 1 valida y 3 invalidas
  * estado: `pass`
  * notas: cubre checksum, excluded source y stable release prohibida.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/distribution-validation.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 4 tests pass
  * estado: `pass`
  * notas: sin fallos despues de corregir expectativa de fixture.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/distribution-cli.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 4 tests pass
  * estado: `pass`
  * notas: help/version/json/fixtures/usage cubiertos.
* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: repo SDD valido
  * resultado obtenido: `SDD repo validation passed`
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node paw/tools/validate-patches.mjs --json`
  * resultado esperado: `status: pass`
  * resultado obtenido: `status: pass`, warnings transicionales v1
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: sin whitespace errors
  * resultado obtenido: sin errores; Git aviso conversion LF/CRLF en working copy
  * estado: `pass`
  * notas: warnings de line endings locales, no errores de diff.

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

* riesgo: manifest canonical crece con muchas entradas y puede requerir
  regeneracion cuando cambian archivos distribuidos.
  * estado: aceptado; el validator detecta checksums stale y el manifest se
    regenera cuando cambia una superficie incluida.

### Pendientes

* Fases 3-5.

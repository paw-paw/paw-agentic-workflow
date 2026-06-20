# Backlog Fase 3: Workflow fixtures and contract tests

---

## Estado

* Change id: `paw-06-workflow-conformance`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 3 - Workflow fixtures and contract tests
* Estado: `done`
* Ultima actualizacion: 2026-06-19
* Owner: sesion Codex activa
* Depende de: Fase 2 cerrada
* Desbloquea: Fase 4 - Governance reconciliation and full validation

---

## 1. Fuente de verdad aplicable

* `paw/orchestration/workflow.md`
* `paw/orchestration/bootstrap.md`
* `paw/orchestration/conformance.md`
* `paw/tools/workflow/**`
* `sdd/parches/paw-06-workflow-conformance/tasks.md`

---

## 2. Objetivo de la fase

* Resultado esperado: fixtures y tests contractuales para workflow, bootstrap,
  conformance y evidencia manual.
* Razon de la fase: probar acceptance/rejection sin esconder autoridad en tests.
* Cambio que queda habilitado al cerrar: Fase 4 puede agregar checks globales y
  reconciliar docs vivos.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `paw/tests/**` y fixture
  runner de workflow.
* reconciliacion esperada: tests son evidencia derivada de `paw/orchestration/**`.

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase: no aplica.
* criterio global de cierre que esta fase acerca: no aplica.
* criterio de cierre por item: no aplica.
* split check: no aplica.

---

## 4. Assumptions

* La matriz puede usar `case.json` y `expected.json` como los dominios existentes.
* Los tests contractuales pueden invocar CLI por proceso y funciones de validator.

---

## 5. Precondiciones

### Documentos

* [x] contratos y validator de workflow disponibles.

### Decisiones previas

* [x] no hay decision abierta sobre fixtures bajo `paw/tests/fixtures/workflow/**`.

### Estado tecnico

* [x] Fase 2 commiteada.

---

## 6. Alcance

### Si entra

* [x] crear fixtures positivos y negativos.
* [x] ampliar `validate-workflow-fixtures.mjs`.
* [x] crear tests contractuales.
* [x] actualizar `paw/tests/README.md`.
* [x] agregar checks workflow a `AGENTS.md`.

### No entra

* [ ] reconciliacion completa de governance docs.
* [ ] cierre SDD.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/tests/contract/adoption-records.test.mjs`
* `paw/tests/contract/validator-cli.test.mjs`
* `paw/tools/workflow/validate-workflow-fixtures.mjs`
* `paw/tests/README.md`
* `AGENTS.md`

### Editar

* `paw/tests/fixtures/workflow/**`
* `paw/tools/workflow/validate-workflow-fixtures.mjs`
* `paw/tests/contract/workflow-validation.test.mjs`
* `paw/tests/contract/workflow-cli.test.mjs`
* `paw/tests/README.md`
* `AGENTS.md`
* `sdd/parches/paw-06-workflow-conformance/backlog/fase3.md`

### Validar

* `node paw/tools/validate-workflow.mjs --fixtures --json`
* `node --test paw/tests/contract/workflow-validation.test.mjs`
* `node --test paw/tests/contract/workflow-cli.test.mjs`
* `git diff --check`

### No tocar

* `paw/parches/**`
* `.codex/**`
* `docs/governance/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer tests y fixtures existentes.

### Bloque B - Inspeccion de estado actual

* [x] confirmar que `paw/tests/fixtures/workflow/**` no existe.

### Bloque C - Edicion por archivo

* [x] agregar fixtures para valid workflow, loops, missing artifacts, write gates,
  creates_docs, manual evidence, accepted gaps y generated checks.
* [x] ampliar fixture runner para validar expectativas.
* [x] agregar tests contractuales de validator.
* [x] agregar tests contractuales de CLI.
* [x] actualizar `paw/tests/README.md`.
* [x] agregar comandos workflow a `AGENTS.md`.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] confirmar que tests no sustituyen autoridad documental.

### Bloque E - Validacion

* [x] ejecutar comandos de fase.

### Bloque F - Cierre

* [x] registrar resultados.
* [x] marcar fase como `done`.

---

## 9. Drift detectado

* Fecha: 2026-06-19
  * hallazgo: los nuevos checks se agregaron a `AGENTS.md` porque el validator de
    workflow queda como check deterministico requerido.
  * impacto: Fase 4 debe ejecutar la suite global actualizada.
  * accion: mantener los tests como evidencia derivada de `paw/orchestration/**`.

---

## 10. Hallazgos durante ejecucion

* Ninguno registrado.

---

## 11. Blockers

* Ninguno.

---

## 12. Decisiones tomadas

* Ninguna decision nueva durante preparacion de backlog.

---

## 13. Validaciones

### Documentales

* [x] verificar que fixtures derivan de contratos vivos.

### Tecnicas

* [x] `node paw/tools/validate-workflow.mjs --fixtures --json`
* [x] `node --test paw/tests/contract/workflow-validation.test.mjs`
* [x] `node --test paw/tests/contract/workflow-cli.test.mjs`
* [x] `git diff --check`

### Manuales

* [x] revision manual de no activacion.

### Resultados

* Validacion:
  * comando o revision: `node paw/tools/validate-workflow.mjs --fixtures --json`
  * resultado esperado: `status` igual a `pass`
  * resultado obtenido: `status` igual a `pass`, 8 fixtures, 3 validos y 5 invalidos
  * estado: `pass`
  * notas: cubre loops, artifacts faltantes, write gate, creates_docs, evidence,
    gaps aceptados y generated checks.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/workflow-validation.test.mjs`
  * resultado esperado: tests pass
  * resultado obtenido: 5 pass, 0 fail
  * estado: `pass`
  * notas: cubre contratos canonicos y matriz de fixtures.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/workflow-cli.test.mjs`
  * resultado esperado: tests pass
  * resultado obtenido: 4 pass, 0 fail
  * estado: `pass`
  * notas: cubre help, version, JSON y usage errors.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: sin errores
  * resultado obtenido: sin errores
  * estado: `pass`
  * notas: solo warnings de line endings por configuracion local.
* Validacion:
  * comando o revision: revision manual de no activacion
  * resultado esperado: no writers, runtime adapters ni `paw/parches/**`
  * resultado obtenido: solo tests, fixtures, validator fixture runner, README,
    AGENTS y backlog
  * estado: `pass`
  * notas: fixtures son evidencia.

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

* Riesgo de tests acoplados a texto literal; se mitiga probando validator y fixtures.

### Pendientes

* Fase 4 ejecutara validacion integral.

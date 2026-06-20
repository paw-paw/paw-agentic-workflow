# Backlog Fase 2: Workflow schemas and validator

---

## Estado

* Change id: `paw-06-workflow-conformance`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 2 - Workflow schemas and validator
* Estado: `done`
* Ultima actualizacion: 2026-06-19
* Owner: sesion Codex activa
* Depende de: Fase 1 cerrada
* Desbloquea: Fase 3 - Workflow fixtures and contract tests

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-06-workflow-conformance/tasks.md`
* `sdd/parches/paw-06-workflow-conformance/backlog/fase1.md`
* `paw/orchestration/workflow.md`
* `paw/orchestration/bootstrap.md`
* `paw/orchestration/conformance.md`
* `paw/tools/README.md`

---

## 2. Objetivo de la fase

* Resultado esperado: schemas, validator y CLI para el dominio workflow.
* Razon de la fase: permitir validacion deterministica de contratos canónicos y de
  fixtures que se agregaran en Fase 3.
* Cambio que queda habilitado al cerrar: Fase 3 puede crear fixtures y tests contra
  el validator.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `paw/tools/**`.
* reconciliacion esperada: tooling valida contratos como evidencia, sin convertirse
  en autoridad ni activar runtime.

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase: no aplica.
* criterio global de cierre que esta fase acerca: no aplica.
* criterio de cierre por item: no aplica.
* split check: no aplica.

---

## 4. Assumptions

* Los schemas JSON son contratos de forma documentados y no requieren un motor JSON
  Schema externo.
* El validator puede validar documentos canonicos por presencia de secciones y
  tokens requeridos, y validar fixtures JSON en Fase 3.

---

## 5. Precondiciones

### Documentos

* [x] Fase 1 cerrada y commiteada.
* [x] contratos `workflow.md`, `bootstrap.md` y `conformance.md` disponibles.

### Decisiones previas

* [x] no hay decision abierta sobre agregar validator bajo `paw/tools/**`.

### Estado tecnico

* [x] no existen `paw/tools/workflow/**` ni `validate-workflow.mjs`.

---

## 6. Alcance

### Si entra

* [x] crear schemas JSON de workflow, bootstrap, conformance y evidence.
* [x] implementar validator canonical y fixture-ready.
* [x] crear CLI `validate-workflow.mjs`.
* [x] actualizar `paw/tools/README.md`.

### No entra

* [ ] crear fixtures y tests contractuales.
* [ ] agregar el validator a `AGENTS.md`.
* [ ] escribir en `sdd/tools/**` o `paw/parches/**`.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/tools/validate-adoption.mjs`
* `paw/tools/adoption/validate-adoption-fixtures.mjs`
* `paw/tools/validation/diagnostics.mjs`
* `paw/tools/validation/validation-result.mjs`
* `paw/tools/README.md`

### Editar

* `paw/tools/schemas/workflow/workflow.schema.json`
* `paw/tools/schemas/workflow/bootstrap.schema.json`
* `paw/tools/schemas/workflow/conformance.schema.json`
* `paw/tools/schemas/workflow/manual-evidence.schema.json`
* `paw/tools/workflow/validate-workflow-contracts.mjs`
* `paw/tools/workflow/validate-workflow-fixtures.mjs`
* `paw/tools/validate-workflow.mjs`
* `paw/tools/README.md`
* `sdd/parches/paw-06-workflow-conformance/backlog/fase2.md`

### Validar

* `node paw/tools/validate-workflow.mjs --json`
* `node paw/tools/validate-workflow.mjs --help`
* `node paw/tools/validate-workflow.mjs --version`
* `git diff --check`

### No tocar

* `paw/tests/**`
* `AGENTS.md`
* `paw/parches/**`
* `.codex/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer patrones de CLI y validation result existentes.
* [x] leer `paw/tools/README.md`.

### Bloque B - Inspeccion de estado actual

* [x] confirmar que el dominio workflow no existe bajo `paw/tools/**`.

### Bloque C - Edicion por archivo

* [x] crear schemas JSON.
* [x] implementar helpers de diagnostico y validacion de contratos.
* [x] implementar fixture runner que devuelve conteo cero hasta Fase 3.
* [x] implementar CLI con `--help`, `--version`, `--json`, `--fixtures`.
* [x] actualizar `paw/tools/README.md`.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] confirmar que no se introducen dependencias externas.
* [x] registrar hallazgo si el validator necesita fixtures antes de Fase 3.

### Bloque E - Validacion

* [x] ejecutar `node paw/tools/validate-workflow.mjs --json`.
* [x] ejecutar `node paw/tools/validate-workflow.mjs --help`.
* [x] ejecutar `node paw/tools/validate-workflow.mjs --version`.
* [x] ejecutar `git diff --check`.

### Bloque F - Cierre

* [x] registrar resultados.
* [x] marcar fase como `done`.

---

## 9. Drift detectado

* Fecha: 2026-06-19
  * hallazgo: el validator puede validar contratos canonicos sin fixtures; el runner
    de fixtures queda preparado con conteo cero hasta Fase 3.
  * impacto: Fase 2 puede cerrar sin adelantar fixtures ni tests.
  * accion: Fase 3 agregara matriz de fixtures y tests contractuales.

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

* [x] verificar que tooling sigue siendo evidencia, no autoridad.

### Tecnicas

* [x] `node paw/tools/validate-workflow.mjs --json`
* [x] `node paw/tools/validate-workflow.mjs --help`
* [x] `node paw/tools/validate-workflow.mjs --version`
* [x] `git diff --check`

### Manuales

* [x] revision manual de no activacion de workflow v2.

### Resultados

* Validacion:
  * comando o revision: `node paw/tools/validate-workflow.mjs --json`
  * resultado esperado: `status` igual a `pass`
  * resultado obtenido: `status` igual a `pass`, 7 paths validados, 0 errors
  * estado: `pass`
  * notas: valida 3 contratos y 4 schemas.
* Validacion:
  * comando o revision: `node paw/tools/validate-workflow.mjs --help`
  * resultado esperado: usage impreso y exit 0
  * resultado obtenido: usage impreso y exit 0
  * estado: `pass`
  * notas: cubre opcion basica de CLI.
* Validacion:
  * comando o revision: `node paw/tools/validate-workflow.mjs --version`
  * resultado esperado: version impresa y exit 0
  * resultado obtenido: `paw-workflow-validator 0.1.0`
  * estado: `pass`
  * notas: cubre version basica de CLI.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: sin errores
  * resultado obtenido: sin errores
  * estado: `pass`
  * notas: solo warnings de line endings por configuracion local.
* Validacion:
  * comando o revision: revision manual de no activacion
  * resultado esperado: no writes a `paw/parches/**`, `.codex/**`, `sdd/tools/**`
  * resultado obtenido: cambios limitados a `paw/tools/**`, README y backlog SDD
  * estado: `pass`
  * notas: tooling no escribe runtime state.

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

* Riesgo de validar demasiado contenido textual; se mitiga con checks estructurales
  minimos y fixtures en Fase 3.

### Pendientes

* Fase 3 agregara fixtures y tests contractuales.

# Backlog Fase 2: Shared toolkit implementation

---

## Estado

* Change id: `paw-07-codex-runtime-tooling`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: `2 - Shared toolkit implementation`
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa
* Depende de: Fase 1
* Desbloquea: Fase 3

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `.codex/paw-toolkit/README.md`
* `.codex/paw-runtime-map.json`
* `sdd/parches/paw-07-codex-runtime-tooling/tasks.md`

---

## 2. Objetivo de la fase

* Resultado esperado: toolkit Node.js no interactivo con tests contractuales.
* Razon de la fase: dar soporte mecanico a las skills sin mover semantica a scripts.
* Cambio que queda habilitado al cerrar: Fase 3 puede referenciar el toolkit desde skills lifecycle.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `.codex/paw-toolkit/**`, `paw/tests/**`.
* reconciliacion esperada: tests validan contrato del toolkit y no cutover.

---

## 4. Assumptions

* Un CLI unico con subcomandos es suficiente para probar el contrato inicial.

---

## 5. Precondiciones

### Documentos

* [x] contrato de toolkit existe.

### Decisiones previas

* [x] Node.js elegido como runtime inicial.

### Estado tecnico

* [x] Fase 1 commiteada.

---

## 6. Alcance

### Si entra

* [x] implementar CLI del toolkit.
* [x] cubrir help, version, JSON, root discovery, patch inspection, mutation checks y dry-run.
* [x] agregar tests contractuales.

### No entra

* [x] no crear skills `paw-*`.
* [x] no escribir contenido semantico desde scripts.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `.codex/paw-toolkit/README.md`
* `paw/tests/contract/workflow-cli.test.mjs`

### Editar

* `.codex/paw-toolkit/bin/paw-codex-toolkit.mjs`
* `paw/tests/contract/codex-runtime-toolkit.test.mjs`
* `paw/tests/README.md`

### Validar

* `node --test paw/tests/contract/codex-runtime-toolkit.test.mjs`
* `node paw/tools/validate-workflow.mjs --json`
* `git diff --check`

### No tocar

* `.agents/**`
* `paw/parches/**`
* `.codex/skills/paw-*`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer contrato del toolkit.

### Bloque B - Inspeccion de estado actual

* [x] inspeccionar patron de tests CLI existentes.

### Bloque C - Edicion por archivo

* [x] agregar CLI del toolkit.
* [x] agregar tests contractuales.
* [x] actualizar inventario de tests.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] no se detectaron decisiones nuevas.

### Bloque E - Validacion

* [x] ejecutar validaciones de fase.

### Bloque F - Cierre

* [x] registrar resultados y cierre.

---

## 9. Drift detectado

* Fecha: 2026-06-20
  * fuente esperada: Fase 2.
  * diferencia encontrada: ninguna.
  * impacto: ninguno.
  * accion: no aplica.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-20
  * hallazgo: el toolkit puede cubrir el contrato inicial sin dependencias externas.
  * impacto: mantiene consistencia con `paw/tools/**`.
  * accion: implementado con Node.js stdlib.

---

## 11. Blockers

* [x] ninguno.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-20
  * decision: usar un CLI unico con subcomandos para el toolkit inicial.
  * razon: reduce superficie ejecutable y permite tests contractuales simples.
  * documentos o areas afectadas: `.codex/paw-toolkit/bin/paw-codex-toolkit.mjs`.

---

## 13. Validaciones

### Documentales

* [x] verificar que toolkit no se presenta como skill.

### Tecnicas

* [x] `node --test paw/tests/contract/codex-runtime-toolkit.test.mjs`
* [x] `node paw/tools/validate-workflow.mjs --json`
* [x] `git diff --check`

### Manuales

* [x] revision manual de que scripts no redactan contenido sustantivo.

### Resultados

* Validacion:
  * comando o revision: `node --test paw/tests/contract/codex-runtime-toolkit.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: 6 tests pasan.
* Validacion:
  * comando o revision: `node paw/tools/validate-workflow.mjs --json`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: contratos workflow siguen validos.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: sin errores de whitespace.

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

* Riesgo residual: el CLI es contrato inicial y podra requerir ampliacion en pilotos.

### Pendientes

* Fase 3 debe conectar skills lifecycle al toolkit.

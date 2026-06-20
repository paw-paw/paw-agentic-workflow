# Backlog Fase 2: Schema, validator y fixtures

---

## Estado

* Change id: `paw-08-vcs-pr-integration`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 2 - Schema, validator y fixtures
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa con aprobacion humana
* Depende de: Fase 1 cerrada
* Desbloquea: Fase 3

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `paw/integration/README.md`
* `paw/integration/integration-lifecycle.md`
* `sdd/parches/paw-08-vcs-pr-integration/patch.yaml`
* `sdd/parches/paw-08-vcs-pr-integration/tasks.md`

---

## 2. Objetivo de la fase

* Resultado esperado: schema, CLI, validator y fixtures de integracion.
* Razon de la fase: convertir el contrato portable en evidencia deterministicamente verificable.
* Cambio que queda habilitado al cerrar: runtime Codex candidate puede apoyarse en validacion local.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `paw/tools/**`, `paw/tests/**`, `AGENTS.md`, docs de inventario.
* reconciliacion esperada: validator documentado y no mutante.

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase: no aplica.
* criterio global de cierre que esta fase acerca: no aplica.
* criterio de cierre por item: no aplica.
* split check: no aplica.

---

## 4. Assumptions

* Los fixtures JSON son la matriz de evidencia inicial; el artifact de usuario sigue siendo `integration.yaml`.

---

## 5. Precondiciones

### Documentos

* [x] contrato de integracion materializado

### Decisiones previas

* [x] no hay decisiones bloqueantes

### Estado tecnico

* [x] Fase 1 commiteada

---

## 6. Alcance

### Si entra

* [x] schema JSON
* [x] validator y CLI
* [x] fixtures y tests contractuales
* [x] docs de inventario de herramientas/tests

### No entra

* [x] skill Codex
* [x] provider remoto real
* [x] merge o checks remotos

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/tools/validate-workflow.mjs`
* `paw/tools/workflow/validate-workflow-fixtures.mjs`
* `paw/tests/contract/workflow-*.test.mjs`

### Editar

* `paw/tools/schemas/integration/integration.schema.json`
* `paw/tools/integration/**`
* `paw/tools/validate-integration.mjs`
* `paw/tests/contract/integration-*.test.mjs`
* `paw/tests/fixtures/integration/**`
* `paw/tools/README.md`
* `paw/tests/README.md`
* `README.md`

### Validar

* `node paw/tools/validate-integration.mjs --json`
* `node paw/tools/validate-integration.mjs --fixtures --json`
* `node --test paw/tests/contract/integration-validation.test.mjs`
* `node --test paw/tests/contract/integration-cli.test.mjs`
* `node --test tests/schema-validator-conformance.test.mjs`

### No tocar

* `paw/parches/**`
* `.codex/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer patrones de validator existentes

### Bloque B - Inspeccion de estado actual

* [x] confirmar que no existe validator de integracion previo

### Bloque C - Edicion por archivo

* [x] crear schema, validator, CLI, fixtures y tests
* [x] actualizar docs de inventario

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] registrar findings si aparecen

### Bloque E - Validacion

* [x] ejecutar validaciones de fase

### Bloque F - Cierre

* [x] marcar fase cerrada con resultados

---

## 9. Drift detectado

* Ninguno.

---

## 10. Hallazgos durante ejecucion

* 2026-06-20:
  * hallazgo: el validator de contratos buscaba texto con sensibilidad a mayusculas.
  * impacto: fallo falso contra `integration-lifecycle.md`, que si contenia la regla.
  * accion: normalizar comparacion a lowercase en `validate-integration-contracts.mjs`.

---

## 11. Blockers

* [x] ninguno

---

## 12. Decisiones tomadas

* 2026-06-20:
  * decision: usar fixtures `case.json` para validar estructura anidada del snapshot inicial.
  * razon: los validators de dominio existentes usan matrices JSON y evitan dependencias externas.
  * documentos o areas afectadas: `paw/tests/fixtures/integration/**`.

---

## 13. Validaciones

### Documentales

* [x] verificar docs de inventario

### Tecnicas

* [x] `node paw/tools/validate-integration.mjs --json`
* [x] `node paw/tools/validate-integration.mjs --fixtures --json`
* [x] tests contractuales de integracion

### Manuales

* [x] revision de validator read-only

### Resultados

* Validacion:
  * comando o revision: `node paw/tools/validate-integration.mjs --json`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: contratos y schema de integracion validos.
* Validacion:
  * comando o revision: `node paw/tools/validate-integration.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: 8 fixtures, 5 validos y 3 invalidos.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/integration-validation.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: stale checks, member count y abandoned readiness cubiertos.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/integration-cli.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: help, version, JSON y usage errors cubiertos.
* Validacion:
  * comando o revision: `node --test tests/schema-validator-conformance.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: validator read-only y docs de estado coherentes.
* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: artifacts SDD validos.

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

* riesgo: el schema se interprete como autoridad superior al contrato.

### Pendientes

* Codex candidate queda para Fase 3.

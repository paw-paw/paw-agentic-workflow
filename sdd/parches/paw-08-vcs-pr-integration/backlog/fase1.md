# Backlog Fase 1: Contrato portable de integracion

---

## Estado

* Change id: `paw-08-vcs-pr-integration`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 1 - Contrato portable de integracion
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa con aprobacion humana
* Depende de: baseline SDD commiteado
* Desbloquea: Fase 2

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-08-vcs-pr-integration/patch.yaml`
* `sdd/parches/paw-08-vcs-pr-integration/definicion.md`
* `sdd/parches/paw-08-vcs-pr-integration/plan.md`
* `sdd/parches/paw-08-vcs-pr-integration/tasks.md`
* `sdd/parches/paw-08-vcs-pr-integration/decision.log`

---

## 2. Objetivo de la fase

* Resultado esperado: contrato portable de integracion registrado y docs vivos reconciliados.
* Razon de la fase: definir autoridad antes de implementar validators o adapters.
* Cambio que queda habilitado al cerrar: `integration.yaml` deja de ser solo reservado y puede validarse en Fase 2.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `docs/README.md`, `paw/core/**`, nuevo `paw/integration/**`, governance docs y docs operativos.
* reconciliacion esperada: autoridad registrada, sin proveedor concreto como autoridad y sin activacion v2.

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase: no aplica.
* criterio global de cierre que esta fase acerca: no aplica.
* criterio de cierre por item: no aplica.
* split check: no aplica.

---

## 4. Assumptions

* El contrato puede vivir bajo `paw/integration/**` como target surface materializada e inactiva.

---

## 5. Precondiciones

### Documentos

* [x] artifacts vigentes

### Decisiones previas

* [x] owner de `integration.yaml` registrado en `decision.log`

### Estado tecnico

* [x] branch `patch/paw-08-vcs-pr-integration` activa

---

## 6. Alcance

### Si entra

* [x] crear `paw/integration/README.md`
* [x] crear `paw/integration/integration-lifecycle.md`
* [x] actualizar docs vivos y `AGENTS.md`
* [x] agregar prompt operativo breve

### No entra

* [x] validator, schema y fixtures
* [x] skill Codex o provider adapter
* [x] cambios a `paw/parches/**`

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `docs/README.md`
* `paw/core/artifact-lifecycle.md`
* `paw/core/README.md`
* `paw/orchestration/README.md`

### Editar

* `paw/integration/**`
* `paw/core/artifact-lifecycle.md`
* `paw/core/README.md`
* `docs/README.md`
* `docs/governance/ARCHITECTURE.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `README.md`
* `AGENTS.md`

### Validar

* `node sdd/tools/validate-sdd.mjs`
* `node --test tests/core-contracts.test.mjs`
* `node --test tests/foundation-governance.test.mjs`

### No tocar

* `paw/parches/**`
* `.github/**`
* release, packaging, deployment or CI config

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer fuentes vivas aplicables

### Bloque B - Inspeccion de estado actual

* [x] confirmar `integration.yaml` reservado en core

### Bloque C - Edicion por archivo

* [x] crear contrato portable
* [x] actualizar registros y docs vivos
* [x] agregar prompt operativo

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] registrar hallazgos si aparecen

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
  * hallazgo: `tests/core-contracts.test.mjs` codificaba que `integration.yaml` seguia reservado.
  * impacto: el test era correcto antes de este patch, pero debia cambiar para verificar owner gobernado.
  * accion: actualizado para exigir ownership en `paw/integration/**` y provider evidence no-authority.

---

## 11. Blockers

* [x] ninguno

---

## 12. Decisiones tomadas

* 2026-06-20:
  * decision: ubicar el contrato portable en `paw/integration/**`.
  * razon: separa entrega/change-request de core, workflow, tools y runtime adapters.
  * documentos o areas afectadas: `docs/README.md`, `paw/core/README.md`, `paw/integration/**`.

---

## 13. Validaciones

### Documentales

* [x] verificar alineacion con contratos aplicables

### Tecnicas

* [x] `node sdd/tools/validate-sdd.mjs`
* [x] `node --test tests/core-contracts.test.mjs`
* [x] `node --test tests/foundation-governance.test.mjs`

### Manuales

* [x] revision manual de no activacion v2

### Resultados

* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: workspace SDD valido.
* Validacion:
  * comando o revision: `node --test tests/core-contracts.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: core mantiene neutralidad y registra owner de integracion.
* Validacion:
  * comando o revision: `node --test tests/foundation-governance.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: superficies gobernadas y transicion preservadas.
* Validacion:
  * comando o revision: `node --test tests/schema-validator-conformance.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: materializacion distinguida de activacion.

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

* riesgo: duplicar doctrina de integracion fuera de la nueva autoridad.

### Pendientes

* validator y Codex candidate quedan para fases posteriores.

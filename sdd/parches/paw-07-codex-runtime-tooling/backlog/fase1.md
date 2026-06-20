# Backlog Fase 1: Runtime map and toolkit contract

---

## Estado

* Change id: `paw-07-codex-runtime-tooling`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: `1 - Runtime map and toolkit contract`
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa
* Depende de: preparacion SDD commiteada
* Desbloquea: Fase 2

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-07-codex-runtime-tooling/patch.yaml`
* `sdd/parches/paw-07-codex-runtime-tooling/definicion.md`
* `sdd/parches/paw-07-codex-runtime-tooling/plan.md`
* `sdd/parches/paw-07-codex-runtime-tooling/tasks.md`
* `sdd/parches/paw-07-codex-runtime-tooling/decision.log`
* `paw/orchestration/workflow.md`
* `paw/orchestration/bootstrap.md`
* `paw/orchestration/conformance.md`
* `.codex/config.toml`

---

## 2. Objetivo de la fase

* Resultado esperado: mapa Codex runtime candidate y contrato versionado del toolkit compartido.
* Razon de la fase: fijar boundaries antes de implementar scripts o skills.
* Cambio que queda habilitado al cerrar: Fase 2 puede implementar el toolkit contra un contrato estable.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `.codex/**`, `docs/README.md`, `docs/governance/V1-TRANSITION.md`, `docs/governance/BOOTSTRAP-STATUS.md`.
* reconciliacion esperada: registrar candidate status sin activar v2 ni reemplazar `sdd-*`.

---

## 4. Assumptions

* El toolkit vive en `.codex/paw-toolkit/**` porque es runtime Codex, no contrato portable general.

---

## 5. Precondiciones

### Documentos

* [x] artifacts vigentes leidos.

### Decisiones previas

* [x] decision de Node.js registrada en `decision.log`.

### Estado tecnico

* [x] branch basada en `origin/main` con patch 06 mergeado.

---

## 6. Alcance

### Si entra

* [x] crear `.codex/README.md`.
* [x] crear `.codex/paw-toolkit/README.md`.
* [x] crear `.codex/paw-runtime-map.json`.
* [x] actualizar docs vivos minimos para candidate status.

### No entra

* [x] no crear scripts ejecutables.
* [x] no crear skills `paw-*`.
* [x] no crear agentes `paw-*`.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/orchestration/workflow.md`
* `paw/orchestration/bootstrap.md`
* `paw/orchestration/conformance.md`
* `.codex/config.toml`

### Editar

* `.codex/README.md`
* `.codex/paw-toolkit/README.md`
* `.codex/paw-runtime-map.json`
* `docs/README.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`

### Validar

* `node sdd/tools/validate-sdd.mjs`
* `node paw/tools/validate-workflow.mjs --json`
* `git diff --check`

### No tocar

* `.agents/**`
* `paw/parches/**`
* `.codex/skills/paw-*`
* `.codex/agents/paw-*`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer contratos workflow, bootstrap y conformance.

### Bloque B - Inspeccion de estado actual

* [x] confirmar que `.codex/skills/**` y `.codex/agents/**` solo contienen `sdd-*`.

### Bloque C - Edicion por archivo

* [x] agregar orientacion runtime Codex candidate.
* [x] agregar contrato del toolkit compartido.
* [x] agregar mapa JSON de operaciones portables a Codex.
* [x] actualizar docs vivos con estado candidate.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] no se detectaron decisiones nuevas.

### Bloque E - Validacion

* [x] ejecutar validaciones de fase.

### Bloque F - Cierre

* [x] marcar backlog como `done` con resultados.

---

## 9. Drift detectado

* Fecha: 2026-06-20
  * fuente esperada: plan de Fase 1.
  * diferencia encontrada: ninguna.
  * impacto: ninguno.
  * accion: no aplica.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-20
  * hallazgo: `.codex/**` no tenia orientacion PAW candidate previa.
  * impacto: se creo `.codex/README.md` para separar runtime binding de contrato portable.
  * accion: documentado en la fase.

---

## 11. Blockers

* [x] ninguno.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-20
  * decision: no se agregaron decisiones sustantivas nuevas.
  * razon: la ubicacion y runtime ya estaban registrados en `decision.log`.
  * documentos o areas afectadas: no aplica.

---

## 13. Validaciones

### Documentales

* [x] verificar no activacion de workflow v2.

### Tecnicas

* [x] `node sdd/tools/validate-sdd.mjs`
* [x] `node paw/tools/validate-workflow.mjs --json`
* [x] `git diff --check`

### Manuales

* [x] revision manual de no `.agents` y cobertura de operaciones.

### Resultados

* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: SDD repo validation passed.
* Validacion:
  * comando o revision: `node paw/tools/validate-workflow.mjs --json`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: workflow contracts validos.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: sin whitespace errors
  * resultado obtenido: pass
  * estado: `pass`
  * notas: sin salida.

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

* El mapa JSON todavia no esta validado por tests; se cubrira en Fase 2.

### Pendientes

* Implementar toolkit y tests en Fase 2.

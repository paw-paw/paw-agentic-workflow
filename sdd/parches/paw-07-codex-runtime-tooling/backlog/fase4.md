# Backlog Fase 4: Bootstrap, conformance and agents

---

## Estado

* Change id: `paw-07-codex-runtime-tooling`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: `4 - Bootstrap, conformance and agents`
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa
* Depende de: Fase 3
* Desbloquea: Fase 5

---

## 1. Fuente de verdad aplicable

* `paw/orchestration/bootstrap.md`
* `paw/orchestration/conformance.md`
* `.codex/README.md`
* `.codex/paw-runtime-map.json`
* `sdd/parches/paw-07-codex-runtime-tooling/tasks.md`

---

## 2. Objetivo de la fase

* Resultado esperado: skills bootstrap/conformance y agentes `paw-*` candidate creados y probados.
* Razon de la fase: completar la cobertura portable del handoff.
* Cambio que queda habilitado al cerrar: Fase 5 puede reconciliar docs y validar integralmente.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `.codex/skills/paw-*`, `.codex/agents/paw-*.toml`.
* reconciliacion esperada: todas las operaciones tienen implementacion o gap explicito.

---

## 4. Assumptions

* `paw-conformance` cubre la integracion equivalente de conformance pedida por el handoff.

---

## 5. Precondiciones

### Documentos

* [x] skills lifecycle existen.

### Decisiones previas

* [x] no hay decision abierta sobre perfiles de agentes.

### Estado tecnico

* [x] Fase 3 commiteada.

---

## 6. Alcance

### Si entra

* [x] crear tres skills bootstrap.
* [x] crear skill conformance.
* [x] crear agentes PAW acotados.
* [x] agregar tests contractuales de skills/agentes.

### No entra

* [x] no activar agentes como default.
* [x] no crear `.agents/**`.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/orchestration/bootstrap.md`
* `paw/orchestration/conformance.md`

### Editar

* `.codex/skills/paw-bootstrap-discover/SKILL.md`
* `.codex/skills/paw-bootstrap-define/SKILL.md`
* `.codex/skills/paw-bootstrap-write/SKILL.md`
* `.codex/skills/paw-conformance/SKILL.md`
* `.codex/agents/paw-contract-reader.toml`
* `.codex/agents/paw-artifact-writer.toml`
* `.codex/agents/paw-risk-reviewer.toml`
* `paw/tests/contract/codex-runtime-agents.test.mjs`

### Validar

* `node --test paw/tests/contract/codex-runtime-agents.test.mjs`
* `node paw/tools/validate-workflow.mjs --fixtures --json`
* `git diff --check`

### No tocar

* `.agents/**`
* `paw/parches/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer bootstrap y conformance.

### Bloque B - Inspeccion de estado actual

* [x] confirmar que no existen agentes `paw-*` previos.

### Bloque C - Edicion por archivo

* [x] crear bootstrap skills.
* [x] crear conformance skill.
* [x] crear perfiles de agentes.
* [x] crear tests contractuales.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] no se detectaron decisiones nuevas.

### Bloque E - Validacion

* [x] ejecutar validaciones de fase.

### Bloque F - Cierre

* [x] registrar resultados y cierre.

---

## 9. Drift detectado

* Fecha: 2026-06-20
  * fuente esperada: handoff exige conformance o integracion equivalente.
  * diferencia encontrada: se materializo skill `paw-conformance`.
  * impacto: cobertura explicita, sin gap.
  * accion: runtime map actualizado.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-20
  * hallazgo: perfiles read-only cubren revision de contratos y riesgos; writer queda separado.
  * impacto: minimiza permisos por defecto.
  * accion: creados tres perfiles acotados.

---

## 11. Blockers

* [x] ninguno.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-20
  * decision: crear `paw-conformance` como integracion equivalente explicita.
  * razon: evita dejar conformance como conducta implícita en tests.
  * documentos o areas afectadas: `.codex/skills/paw-conformance/SKILL.md`.

---

## 13. Validaciones

### Documentales

* [x] revision de approval gate y no autoridad contractual en agentes.

### Tecnicas

* [x] `node --test paw/tests/contract/codex-runtime-agents.test.mjs`
* [x] `node paw/tools/validate-workflow.mjs --fixtures --json`
* [x] `git diff --check`

### Manuales

* [x] revision manual de permisos y gates.

### Resultados

* Validacion:
  * comando o revision: `node --test paw/tests/contract/codex-runtime-agents.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: 3 tests pasan.
* Validacion:
  * comando o revision: `node paw/tools/validate-workflow.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: workflow fixtures siguen validos.
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

* Riesgo residual: agentes candidate requieren uso piloto antes de activacion.

### Pendientes

* Fase 5 debe reconciliar docs vivos y ejecutar validacion completa.

# Backlog Fase 3: Core lifecycle skills

---

## Estado

* Change id: `paw-07-codex-runtime-tooling`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: `3 - Core lifecycle skills`
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa
* Depende de: Fase 2
* Desbloquea: Fase 4

---

## 1. Fuente de verdad aplicable

* `paw/orchestration/workflow.md`
* `.codex/README.md`
* `.codex/paw-runtime-map.json`
* `.codex/paw-toolkit/README.md`
* `sdd/parches/paw-07-codex-runtime-tooling/tasks.md`

---

## 2. Objetivo de la fase

* Resultado esperado: skills lifecycle `paw-*` candidate creadas y probadas.
* Razon de la fase: cubrir operaciones principales antes de bootstrap/conformance y agentes.
* Cambio que queda habilitado al cerrar: Fase 4 puede completar bootstrap y perfiles.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `.codex/skills/paw-*`.
* reconciliacion esperada: skills son candidate, compactas y no reemplazan `sdd-*`.

---

## 4. Assumptions

* Las skills lifecycle no requieren scripts locales propios en esta fase; referencian el toolkit compartido.

---

## 5. Precondiciones

### Documentos

* [x] runtime map y toolkit existen.

### Decisiones previas

* [x] no hay decision abierta sobre nombres de skills.

### Estado tecnico

* [x] Fase 2 commiteada.

---

## 6. Alcance

### Si entra

* [x] crear nueve `SKILL.md` lifecycle.
* [x] agregar tests contractuales de metadata, boundary y secciones.

### No entra

* [x] no crear bootstrap/conformance skills.
* [x] no crear agentes.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/orchestration/workflow.md`

### Editar

* `.codex/skills/paw-triage/SKILL.md`
* `.codex/skills/paw-intake/SKILL.md`
* `.codex/skills/paw-router/SKILL.md`
* `.codex/skills/paw-plan/SKILL.md`
* `.codex/skills/paw-tasks/SKILL.md`
* `.codex/skills/paw-phase-backlog/SKILL.md`
* `.codex/skills/paw-execute-phase/SKILL.md`
* `.codex/skills/paw-sync-drift/SKILL.md`
* `.codex/skills/paw-close/SKILL.md`
* `paw/tests/contract/codex-runtime-skills.test.mjs`

### Validar

* `node --test paw/tests/contract/codex-runtime-skills.test.mjs`
* `node sdd/tools/validate-sdd.mjs`
* `git diff --check`

### No tocar

* `.agents/**`
* `paw/parches/**`
* `.codex/agents/paw-*`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer contrato workflow.

### Bloque B - Inspeccion de estado actual

* [x] confirmar nombres esperados en runtime map.

### Bloque C - Edicion por archivo

* [x] crear skills lifecycle candidate.
* [x] crear test contractual de skills.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] no se detectaron decisiones nuevas.

### Bloque E - Validacion

* [x] ejecutar validaciones de fase.

### Bloque F - Cierre

* [x] registrar resultados y cierre.

---

## 9. Drift detectado

* Fecha: 2026-06-20
  * fuente esperada: runtime map con operaciones lifecycle planificadas.
  * diferencia encontrada: ninguna.
  * impacto: ninguno.
  * accion: no aplica.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-20
  * hallazgo: las skills lifecycle pueden permanecer compactas si cargan solo su operacion inmediata.
  * impacto: se evita duplicar `paw/orchestration/workflow.md`.
  * accion: cada skill incluye seccion `Load`.

---

## 11. Blockers

* [x] ninguno.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-20
  * decision: no agregar scripts locales a las skills lifecycle en esta fase.
  * razon: el toolkit compartido cubre discovery y mutation checks iniciales.
  * documentos o areas afectadas: `.codex/skills/paw-*`.

---

## 13. Validaciones

### Documentales

* [x] revision de no reemplazo de `sdd-*`.

### Tecnicas

* [x] `node --test paw/tests/contract/codex-runtime-skills.test.mjs`
* [x] `node sdd/tools/validate-sdd.mjs`
* [x] `git diff --check`

### Manuales

* [x] revision manual de no duplicacion doctrinal.

### Resultados

* Validacion:
  * comando o revision: `node --test paw/tests/contract/codex-runtime-skills.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: 3 tests pasan.
* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: SDD repo validation passed.
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

* Riesgo residual: estas skills son candidate y requeriran pilotos antes de cutover.

### Pendientes

* Fase 4 debe agregar bootstrap/conformance y agentes.

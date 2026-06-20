# Backlog Fase 5: Governance reconciliation and full validation

---

## Estado

* Change id: `paw-07-codex-runtime-tooling`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: `5 - Governance reconciliation and full validation`
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa
* Depende de: Fases 1-4
* Desbloquea: Fase 6

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `docs/governance/ARCHITECTURE.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `paw/orchestration/README.md`
* `paw/tests/README.md`
* `sdd/parches/paw-07-codex-runtime-tooling/tasks.md`

---

## 2. Objetivo de la fase

* Resultado esperado: docs vivos y tests de gobernanza reconciliados con el runtime Codex candidate.
* Razon de la fase: evitar que reglas durables vivan solo en artifacts SDD o tests nuevos.
* Cambio que queda habilitado al cerrar: cierre formal SDD.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: docs vivos, `AGENTS.md`, tests de gobernanza.
* reconciliacion esperada: candidate status documentado sin activar workflow v2.

---

## 4. Assumptions

* No critical assumptions.

---

## 5. Precondiciones

### Documentos

* [x] fases 1-4 cerradas y commiteadas.

### Decisiones previas

* [x] no hay drift bloqueante pendiente.

### Estado tecnico

* [x] tests nuevos de toolkit, skills y agentes pasan individualmente.

---

## 6. Alcance

### Si entra

* [x] actualizar docs vivos de estado.
* [x] actualizar tests de gobernanza que esperaban ausencia de `paw-*`.
* [x] agregar tests Codex runtime a validaciones deterministicas.

### No entra

* [x] no publicar PR ni activar CI.
* [x] no modificar `paw/parches/**`.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `tests/foundation-governance.test.mjs`
* `tests/schema-validator-conformance.test.mjs`

### Editar

* `AGENTS.md`
* `README.md`
* `docs/governance/ARCHITECTURE.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `paw/orchestration/README.md`
* `tests/foundation-governance.test.mjs`
* `tests/schema-validator-conformance.test.mjs`

### Validar

* suite completa de `AGENTS.md`
* tests nuevos Codex runtime
* `git diff --check`

### No tocar

* `.agents/**`
* `paw/parches/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer tests de gobernanza y docs vivos.

### Bloque B - Inspeccion de estado actual

* [x] detectar tests que esperaban ausencia de `paw-*`.

### Bloque C - Edicion por archivo

* [x] actualizar docs y validaciones deterministicas.
* [x] actualizar tests de gobernanza para candidate bindings.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] no se detectaron decisiones nuevas.

### Bloque E - Validacion

* [x] ejecutar suite completa.

### Bloque F - Cierre

* [x] registrar resultados y cierre.

---

## 9. Drift detectado

* Fecha: 2026-06-20
  * fuente esperada: tests de gobernanza reflejan estado vivo.
  * diferencia encontrada: dos tests aun requerian ausencia de `paw-*`.
  * impacto: fallarian tras implementar el patch.
  * accion: actualizados para exigir candidate/inactive boundary.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-20
  * hallazgo: `README.md` no listaba workflow/Codex runtime en validaciones.
  * impacto: documentacion publica quedaba incompleta.
  * accion: comandos agregados.

---

## 11. Blockers

* [x] ninguno.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-20
  * decision: tratar `paw-*` Codex como candidate materializado, no default.
  * razon: coincide con handoff y `V1-TRANSITION.md`.
  * documentos o areas afectadas: docs vivos y tests de gobernanza.

---

## 13. Validaciones

### Documentales

* [x] revisar no activacion, no portability claim y no VCS integration.

### Tecnicas

* [x] suite completa de `AGENTS.md`.
* [x] `git diff --check`.

### Manuales

* [x] revision de que `.codex/**` queda como candidate runtime binding.

### Resultados

* Validacion:
  * comando o revision: suite completa listada en `AGENTS.md`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: todos los comandos pasaron.
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

* Riesgo residual: candidate runtime necesita pilotos antes de activacion.

### Pendientes

* Fase 6 debe cerrar formalmente el patch.

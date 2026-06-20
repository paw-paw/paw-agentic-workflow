# Backlog Fase 1: Workflow and bootstrap contracts

---

## Estado

* Change id: `paw-06-workflow-conformance`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 1 - Workflow and bootstrap contracts
* Estado: `done`
* Ultima actualizacion: 2026-06-19
* Owner: sesion Codex activa
* Depende de: preparacion SDD y `tasks.md`
* Desbloquea: Fase 2 - Workflow schemas and validator

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-06-workflow-conformance/patch.yaml`
* `sdd/parches/paw-06-workflow-conformance/definicion.md`
* `sdd/parches/paw-06-workflow-conformance/plan.md`
* `sdd/parches/paw-06-workflow-conformance/tasks.md`
* `sdd/parches/paw-06-workflow-conformance/decision.log`
* `_inbox/final/06-workflow-bootstrap-conformance-handoff.md`
* `_inbox/final/patch-execution-guide.md`

---

## 2. Objetivo de la fase

* Resultado esperado: contratos vivos para workflow, bootstrap y conformance bajo
  `paw/orchestration/**`, con registro de autoridad en `docs/README.md`.
* Razon de la fase: establecer autoridad documental antes de schemas, validators y
  fixtures.
* Cambio que queda habilitado al cerrar: Fase 2 puede implementar validacion contra
  contratos vivos, no contra decisiones escondidas en SDD.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `paw/orchestration/**`,
  `docs/README.md` y ajustes puntuales en `paw/core/**`.
* reconciliacion esperada: los contratos quedan registrados sin activar workflow v2,
  writers, `paw/parches/**` ni runtime adapters.

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase: no aplica.
* criterio global de cierre que esta fase acerca: no aplica.
* criterio de cierre por item: no aplica.
* split check: no aplica.

---

## 4. Assumptions

* La autoridad de routing portable pertenece a `paw/orchestration/**`.
* Los ajustes core son referencias semanticas, no duplicacion del workflow.
* No se requiere decision humana para crear documentos bajo la superficie prevista en
  `plan.md`.

---

## 5. Precondiciones

### Documentos

* [x] `definicion.md`, `plan.md` y `tasks.md` vigentes.
* [x] handoff 06 y guide operativo leidos.

### Decisiones previas

* [x] politica provisional de commits registrada en `decision.log`.
* [x] rama basada en `origin/main` tras merge de patch 05.

### Estado tecnico

* [x] working tree limpio al iniciar la fase.
* [x] `paw/orchestration/README.md` existe y esta inactivo.

---

## 6. Alcance

### Si entra

* [x] crear o actualizar documentos contractuales de workflow, bootstrap y
  conformance.
* [x] registrar autoridad en `docs/README.md`.
* [x] ajustar core solo para referencias de artifact lifecycle, authority, gates y
  drift.
* [x] validar SDD, manifest y whitespace.

### No entra

* [ ] schemas, validators, fixtures y tests de workflow.
* [ ] cambios en `paw/parches/**`.
* [ ] skills, agentes, prompts o integraciones Codex.
* [ ] instalacion, VCS/PR, CI, Pages, releases o deployment.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `docs/README.md`
* `paw/orchestration/README.md`
* `paw/core/artifact-lifecycle.md`
* `paw/core/authority-and-evidence.md`
* `paw/core/decision-gates.md`
* `paw/core/drift-policy.md`

### Editar

* `docs/README.md`
* `paw/orchestration/README.md`
* `paw/orchestration/workflow.md`
* `paw/orchestration/bootstrap.md`
* `paw/orchestration/conformance.md`
* `paw/core/artifact-lifecycle.md`
* `paw/core/authority-and-evidence.md`
* `paw/core/decision-gates.md`
* `paw/core/drift-policy.md`
* `sdd/parches/paw-06-workflow-conformance/backlog/fase1.md`

### Validar

* `node sdd/tools/validate-sdd.mjs`
* `node paw/tools/validate-patches.mjs --json`
* `git diff --check`

### No tocar

* `paw/parches/**`
* `.codex/**`
* `paw/tools/**`
* `paw/tests/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer `docs/README.md` con foco en registry y autoridad.
* [x] leer `paw/orchestration/README.md` con foco en boundaries.
* [x] leer core docs afectados con foco en lifecycle, authority, gates y drift.

### Bloque B - Inspeccion de estado actual

* [x] confirmar que no existen documentos `paw/orchestration/workflow.md`,
  `bootstrap.md` o `conformance.md`.
* [x] confirmar que `docs/README.md` registra `paw/orchestration/README.md` como
  supporting y no documentos contractuales.

### Bloque C - Edicion por archivo

* [x] editar `paw/orchestration/README.md` para listar contratos materializados y
  mantener estado inactivo.
* [x] crear `paw/orchestration/workflow.md` con operaciones, estados, readiness,
  transiciones invalidas, loops y artifacts faltantes.
* [x] crear `paw/orchestration/bootstrap.md` con discover, define, write,
  artifacts, `creates_docs`, approval gate y write report.
* [x] crear `paw/orchestration/conformance.md` con roles, reglas, checks,
  dispositions, enforcement y evidencia manual.
* [x] editar core docs solo para enlazar responsabilidades nuevas sin duplicar
  contratos.
* [x] registrar los nuevos documentos en `docs/README.md`.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] registrar hallazgo si alguna responsabilidad duplica core.
* [x] registrar blocker si write puede operar sin gate humano.
* [x] confirmar que no hay decision nueva para `decision.log`.

### Bloque E - Validacion

* [x] ejecutar `node sdd/tools/validate-sdd.mjs`.
* [x] ejecutar `node paw/tools/validate-patches.mjs --json`.
* [x] ejecutar `git diff --check`.
* [x] revisar manualmente que no hay dependencia de `.codex/**`.

### Bloque F - Cierre

* [x] marcar checklist completo.
* [x] registrar validaciones y resultados.
* [x] marcar fase como `done` si no hay blockers.

---

## 9. Drift detectado

* Fecha: 2026-06-19
  * hallazgo: las responsabilidades nuevas encajan en `paw/orchestration/**`; core
    solo requirio referencias semanticas puntuales.
  * impacto: no hizo falta registrar una decision nueva ni cambiar macro scope.
  * accion: mantener Fase 2 enfocada en schemas/validator del dominio workflow.

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

* [x] verificar alineacion con contratos aplicables.

### Tecnicas

* [x] `node sdd/tools/validate-sdd.mjs`
* [x] `node paw/tools/validate-patches.mjs --json`
* [x] `git diff --check`

### Manuales

* [x] revision manual de no activacion y no dependencia de `.codex/**`.

### Resultados

* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: SDD repo validation passed
  * resultado obtenido: SDD repo validation passed
  * estado: `pass`
  * notas: ejecutar antes de commit.
* Validacion:
  * comando o revision: `node paw/tools/validate-patches.mjs --json`
  * resultado esperado: `status` igual a `pass`
  * resultado obtenido: `status` igual a `pass`, sin errors
  * estado: `pass`
  * notas: warnings transicionales v1 esperados.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: sin errores
  * resultado obtenido: sin errores
  * estado: `pass`
  * notas: sin whitespace errors esperados.
* Validacion:
  * comando o revision: revision manual de no activacion
  * resultado esperado: no hay writes a `paw/parches/**`, `.codex/**`, skills,
    agents ni runtime adapters
  * resultado obtenido: solo docs contractuales y backlog SDD
  * estado: `pass`
  * notas: `paw/orchestration/README.md` mantiene la frontera de inactividad.

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

* Riesgo de sobredocumentar core dentro de orchestration; se mitiga con referencias.

### Pendientes

* Fase 2 implementara schemas y validator.

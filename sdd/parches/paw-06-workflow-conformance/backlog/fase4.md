# Backlog Fase 4: Governance reconciliation and full validation

---

## Estado

* Change id: `paw-06-workflow-conformance`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 4 - Governance reconciliation and full validation
* Estado: `done`
* Ultima actualizacion: 2026-06-19
* Owner: sesion Codex activa
* Depende de: Fases 1-3 cerradas
* Desbloquea: Fase 5 - Formal SDD closure

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `docs/governance/ARCHITECTURE.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `paw/README.md`
* `paw/orchestration/**`
* `paw/tools/README.md`
* `paw/tests/README.md`

---

## 2. Objetivo de la fase

* Resultado esperado: governance docs sincronizados y suite completa ejecutada.
* Razon de la fase: promover reglas durables a docs vivos y comprobar el repo tras
  materializar workflow/conformance.
* Cambio que queda habilitado al cerrar: cierre formal SDD.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: governance docs y estado de
  validacion global.
* reconciliacion esperada: docs vivos reflejan workflow/conformance sin activar v2.

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase: no aplica.
* criterio global de cierre que esta fase acerca: no aplica.
* criterio de cierre por item: no aplica.
* split check: no aplica.

---

## 4. Assumptions

* Los nuevos comandos de workflow en `AGENTS.md` forman parte de la suite completa
  desde Fase 3.

---

## 5. Precondiciones

### Documentos

* [x] Fases 1-3 cerradas y commiteadas.

### Decisiones previas

* [x] no hay drift bloqueante registrado.

### Estado tecnico

* [x] suite de Fase 3 pasa.

---

## 6. Alcance

### Si entra

* [x] actualizar architecture, transition, bootstrap status y PAW root README.
* [x] ejecutar todos los comandos vigentes en `AGENTS.md`.
* [x] registrar resultados en este backlog.

### No entra

* [ ] crear nuevos contratos, schemas o fixtures.
* [ ] cerrar formalmente el patch.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `docs/governance/ARCHITECTURE.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `paw/README.md`

### Editar

* `docs/governance/ARCHITECTURE.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `paw/README.md`
* `sdd/parches/paw-06-workflow-conformance/backlog/fase4.md`

### Validar

* todos los comandos listados en `AGENTS.md`
* `git diff --check`

### No tocar

* `paw/parches/**`
* `.codex/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer governance docs y PAW root README.

### Bloque B - Inspeccion de estado actual

* [x] identificar referencias obsoletas a orchestration como solo orientacion.

### Bloque C - Edicion por archivo

* [x] actualizar `ARCHITECTURE.md`.
* [x] actualizar `V1-TRANSITION.md`.
* [x] actualizar `BOOTSTRAP-STATUS.md`.
* [x] actualizar `paw/README.md`.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] registrar si alguna validacion global falla.

### Bloque E - Validacion

* [x] ejecutar suite completa de `AGENTS.md`.
* [x] ejecutar `git diff --check`.

### Bloque F - Cierre

* [x] registrar resultados.
* [x] marcar fase como `done`.

---

## 9. Drift detectado

* Fecha: 2026-06-19
  * fuente esperada: `validate-patches --fixtures` y
    `patch-validation.test.mjs` solo deben evaluar fixtures de patch.
  * diferencia encontrada: los nuevos fixtures bajo `paw/tests/fixtures/workflow/**`
    eran recogidos como fixtures de patch.
  * impacto: validacion global fallaba aunque el dominio workflow tenia su propio
    validator.
  * accion: excluir `/workflow/` del runner y test de fixtures de patch, igual que
    ya se excluyen `/catalogs/` y `/adoption/`.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-19
  * hallazgo: tests de governance preservan frases contractuales de frontera.
  * impacto: se mantuvieron esas frases exactas mientras se agrego el nuevo estado
    materializado de workflow.
  * accion: actualizar textos sin debilitar la regla de no activacion.

---

## 11. Blockers

* Ninguno.

---

## 12. Decisiones tomadas

* Ninguna decision nueva durante preparacion de backlog.

---

## 13. Validaciones

### Documentales

* [x] verificar no activacion, no portabilidad y no packaging.

### Tecnicas

* [x] suite completa de `AGENTS.md`
* [x] `git diff --check`

### Manuales

* [x] revision manual de docs vivos sincronizados.

### Resultados

* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: SDD repo validation passed.
* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs --fixtures`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: SDD fixture validation passed.
* Validacion:
  * comando o revision: `node paw/tools/validate-patches.mjs --json`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: warnings transicionales v1 esperados.
* Validacion:
  * comando o revision: `node paw/tools/validate-patches.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass, 20 fixtures de patch
  * estado: `pass`
  * notas: corregido para excluir fixtures de workflow.
* Validacion:
  * comando o revision: `node paw/tools/validate-catalogs.mjs --json`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: catalogos canonicos validos.
* Validacion:
  * comando o revision: `node paw/tools/validate-catalogs.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: fixtures de catalogos validos.
* Validacion:
  * comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: fixtures de adoption validos.
* Validacion:
  * comando o revision: `node paw/tools/validate-workflow.mjs --json`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: 3 contratos y 4 schemas validados.
* Validacion:
  * comando o revision: `node paw/tools/validate-workflow.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass, 8 fixtures
  * estado: `pass`
  * notas: 3 validos y 5 invalidos.
* Validacion:
  * comando o revision: tests contractuales listados en `AGENTS.md`
  * resultado esperado: pass
  * resultado obtenido: pass para patch, validator CLI, adoption, workflow, SDD,
    foundation governance, core contracts y schema validator conformance
  * estado: `pass`
  * notas: fallas iniciales por scope de fixtures y frases de frontera fueron
    corregidas y reejecutadas.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: sin errores
  * resultado obtenido: sin errores
  * estado: `pass`
  * notas: solo warnings de line endings por configuracion local.
* Validacion:
  * comando o revision: revision manual de docs vivos
  * resultado esperado: no claims de activacion, portabilidad, packaging, CI o
    runtime adapters
  * resultado obtenido: docs describen materializacion inactiva y mantienen cutover
    en patch 14
  * estado: `pass`
  * notas: `paw/parches/**` no fue modificado.

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

* Riesgo de declarar workflow activo; se mitiga manteniendo la frontera de cutover.

### Pendientes

* Fase 5 cerrara el patch.

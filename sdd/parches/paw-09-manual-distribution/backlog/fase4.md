# Backlog Fase 4: Codex candidate distribution binding

---

## Estado

* Change id: `paw-09-manual-distribution`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 4 - Codex candidate distribution binding
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa con aprobacion humana
* Depende de: Fase 3 cerrada en `d1b2a44`
* Desbloquea: Fase 5 - Reconciliacion integral y cierre

---

## 1. Fuente de verdad aplicable

* `paw/distribution/**`
* `.codex/README.md`
* `.codex/paw-runtime-map.json`
* `.codex/paw-toolkit/**`
* `sdd/parches/paw-09-manual-distribution/tasks.md`

---

## 2. Objetivo de la fase

* Resultado esperado: Codex expone una operacion candidate inactiva para
  inspeccionar distribucion manual sin activar v2 ni instalar automaticamente.
* Razon de la fase: el handoff exige que la instalacion Codex funcione sin rutas
  absolutas del repo origen y con carga progresiva.
* Cambio que queda habilitado al cerrar: cierre integral con runtime Codex
  candidate actualizado.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `.codex/**` como adapter
  evidence, autoridad en `paw/distribution/**`.
* reconciliacion esperada: runtime map y toolkit apuntan a contratos relativos,
  sin activar workflow v2.

### Si `patch_kind = batch`

* no aplica.

---

## 4. Assumptions

* No critical assumptions.

---

## 5. Precondiciones

### Documentos

* [x] Distribucion e instalacion documentadas.

### Decisiones previas

* [x] `paw-*` Codex bindings permanecen candidate-inactive.

### Estado tecnico

* [x] Validator y helpers de instalacion existen.

---

## 6. Alcance

### Si entra

* [x] Agregar skill candidate `paw-distribute`.
* [x] Registrar operacion en `.codex/paw-runtime-map.json`.
* [x] Agregar toolkit command read-only para inspeccionar manifest.
* [x] Actualizar `.codex/README.md`, tests runtime y manifest.

### No entra

* [ ] Instalar realmente en destino.
* [ ] Activar `paw-*` como default.
* [ ] Soporte Claude/Antigravity o multiruntime.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `.codex/paw-runtime-map.json`
* `.codex/paw-toolkit/bin/paw-codex-toolkit.mjs`
* `paw/tests/contract/codex-runtime-*.test.mjs`

### Editar

* `.codex/skills/paw-distribute/SKILL.md`
* `.codex/paw-runtime-map.json`
* `.codex/paw-toolkit/bin/paw-codex-toolkit.mjs`
* `.codex/README.md`
* `paw/tests/contract/codex-runtime-toolkit.test.mjs`
* `paw/tests/contract/codex-runtime-skills.test.mjs`
* `paw/distribution/distribution-manifest.json`
* `sdd/parches/paw-09-manual-distribution/backlog/fase4.md`

### Validar

* `node --test paw/tests/contract/codex-runtime-toolkit.test.mjs`
* `node --test paw/tests/contract/codex-runtime-skills.test.mjs`
* `node paw/tools/validate-distribution.mjs --json`
* `node sdd/tools/validate-sdd.mjs`
* `git diff --check`

### No tocar

* `_inbox/**`
* `paw/parches/**`
* package manager, release, Pages, Actions, deployment config

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] Leer runtime map/toolkit/tests.

### Bloque B - Inspeccion de estado actual

* [x] Confirmar que no existe `paw-distribute`.

### Bloque C - Edicion por archivo

* [x] Crear skill `paw-distribute`.
* [x] Registrar runtime map.
* [x] Agregar command toolkit read-only.
* [x] Actualizar tests runtime.
* [x] Regenerar manifest.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] Registrar drift si binding requiere activar v2.

### Bloque E - Validacion

* [x] Ejecutar tests runtime y distribution validator.
* [x] Ejecutar SDD y diff check.

### Bloque F - Cierre

* [x] Registrar resultados.
* [x] Marcar fase `done`.

---

## 9. Drift detectado

* Ninguno registrado.

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-20
  * hallazgo: el binding puede limitarse a inspeccion read-only del manifest.
  * impacto: cumple Codex candidate sin instalar ni activar workflow v2.
  * accion: agregar skill `paw-distribute`, runtime map y toolkit
    `inspect-distribution`.

---

## 11. Blockers

* Ninguno.

---

## 12. Decisiones tomadas

* Ninguna nueva.

---

## 13. Validaciones

### Documentales

* [x] Codex docs mantienen candidate boundary

### Tecnicas

* [x] `node --test paw/tests/contract/codex-runtime-toolkit.test.mjs`
* [x] `node --test paw/tests/contract/codex-runtime-skills.test.mjs`
* [x] `node paw/tools/validate-distribution.mjs --json`
* [x] `node sdd/tools/validate-sdd.mjs`
* [x] `git diff --check`

### Manuales

* [x] revision manual de no activacion v2 ni rutas absolutas

### Resultados

* Validacion:
  * comando o revision: `node --test paw/tests/contract/codex-runtime-toolkit.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 9 tests pass
  * estado: `pass`
  * notas: `inspect-distribution` cubierto sin instalacion.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/codex-runtime-skills.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 5 tests pass
  * estado: `pass`
  * notas: `paw-distribute` candidate boundary cubierto.
* Validacion:
  * comando o revision: `node paw/tools/validate-distribution.mjs --json`
  * resultado esperado: `status: pass`
  * resultado obtenido: `status: pass`, 336 manifest entries
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: repo SDD valido
  * resultado obtenido: `SDD repo validation passed`
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: sin whitespace errors
  * resultado obtenido: sin errores; Git aviso conversion LF/CRLF en working copy
  * estado: `pass`
  * notas: warnings de line endings locales, no errores de diff.

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

* riesgo: binding candidate puede parecer instalador automatico.
  * estado: mitigado por skill y toolkit read-only; no install command.

### Pendientes

* Fase 5.

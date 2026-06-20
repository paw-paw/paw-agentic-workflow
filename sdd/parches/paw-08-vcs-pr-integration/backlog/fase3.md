# Backlog Fase 3: Codex candidate y GitHub provider experimental

---

## Estado

* Change id: `paw-08-vcs-pr-integration`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 3 - Codex candidate y GitHub provider experimental
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa con aprobacion humana
* Depende de: Fase 2 cerrada
* Desbloquea: Fase 4

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `paw/integration/README.md`
* `paw/integration/integration-lifecycle.md`
* `.codex/README.md`
* `.codex/paw-runtime-map.json`
* `.codex/paw-toolkit/README.md`

---

## 2. Objetivo de la fase

* Resultado esperado: skill `paw-integrate`, runtime-map update y toolkit/provider experimental.
* Razon de la fase: exponer integracion a Codex como candidate inactivo.
* Cambio que queda habilitado al cerrar: futuros agentes pueden inspeccionar integracion local con permisos separados.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `.codex/**` candidate runtime.
* reconciliacion esperada: binding runtime no redefine contrato portable ni activa v2.

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase: no aplica.
* criterio global de cierre que esta fase acerca: no aplica.
* criterio de cierre por item: no aplica.
* split check: no aplica.

---

## 4. Assumptions

* El provider GitHub experimental no hace red; solo normaliza snapshots entregados.

---

## 5. Precondiciones

### Documentos

* [x] contrato y validator de integracion existentes

### Decisiones previas

* [x] provider adapter debe quedar detras del contrato neutral

### Estado tecnico

* [x] Fase 2 commiteada

---

## 6. Alcance

### Si entra

* [x] skill `paw-integrate`
* [x] runtime map y `.codex/README.md`
* [x] toolkit `inspect-integration`
* [x] provider GitHub snapshot experimental
* [x] tests Codex runtime

### No entra

* [x] crear o actualizar PR real
* [x] push, merge, checks remotos o review threads
* [x] activar `paw-*` como default

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `.codex/paw-toolkit/bin/paw-codex-toolkit.mjs`
* `paw/tests/contract/codex-runtime-*.test.mjs`

### Editar

* `.codex/skills/paw-integrate/SKILL.md`
* `.codex/paw-runtime-map.json`
* `.codex/paw-toolkit/bin/paw-codex-toolkit.mjs`
* `.codex/paw-toolkit/providers/github.mjs`
* `.codex/paw-toolkit/README.md`
* `.codex/README.md`
* `paw/tests/contract/codex-runtime-*.test.mjs`

### Validar

* `node --test paw/tests/contract/codex-runtime-toolkit.test.mjs`
* `node --test paw/tests/contract/codex-runtime-skills.test.mjs`
* `node --test paw/tests/contract/codex-runtime-agents.test.mjs`
* `node paw/tools/validate-integration.mjs --fixtures --json`

### No tocar

* `paw/parches/**`
* `.github/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] leer toolkit y tests Codex actuales

### Bloque B - Inspeccion de estado actual

* [x] confirmar que no existe `paw-integrate`

### Bloque C - Edicion por archivo

* [x] crear skill, toolkit y provider experimental
* [x] actualizar runtime map y docs
* [x] actualizar tests

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] registrar findings si aparecen

### Bloque E - Validacion

* [x] ejecutar validaciones de fase

### Bloque F - Cierre

* [x] marcar fase cerrada con resultados

---

## 9. Drift detectado

* Fecha: 2026-06-20
  * fuente esperada: `codex-runtime-toolkit.test.mjs` esperaba que `paw-07` siguiera `active`.
  * diferencia encontrada: `paw-07` esta `closed` e integrado en `origin/main`.
  * impacto: fallo de test no relacionado con el nuevo toolkit integration.
  * accion: actualizar expectativa y registrar decision en `decision.log`.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* 2026-06-20:
  * hallazgo: el test de toolkit usaba un patch cerrado como si siguiera activo.
  * impacto: drift operacional por avance serial del programa.
  * accion: expectativa actualizada a `closed`.

---

## 11. Blockers

* [x] ninguno

---

## 12. Decisiones tomadas

* 2026-06-20:
  * decision: `paw-integrate` es una operacion adapter de integracion, no lifecycle core.
  * razon: su contrato inmediato es `paw/integration/integration-lifecycle.md`.
  * documentos o areas afectadas: `.codex/paw-runtime-map.json`, `.codex/skills/paw-integrate/SKILL.md`.

---

## 13. Validaciones

### Documentales

* [x] verificar candidate/inactive boundary

### Tecnicas

* [x] tests Codex runtime
* [x] validator integracion fixtures

### Manuales

* [x] revision de permisos separados y no merge

### Resultados

* Validacion:
  * comando o revision: `node --test paw/tests/contract/codex-runtime-toolkit.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: `inspect-integration` y `github-snapshot` cubiertos.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/codex-runtime-skills.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: `paw-integrate` candidate validado.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/codex-runtime-agents.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: agentes candidate preservan limites.
* Validacion:
  * comando o revision: `node paw/tools/validate-integration.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: fixtures de integracion siguen validos.
* Validacion:
  * comando o revision: `node --test tests/foundation-governance.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: pass
  * estado: `pass`
  * notas: no activacion v2 preservada.
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

* riesgo: `paw-integrate` se confunda con permiso remoto.

### Pendientes

* push y PR real se manejan fuera del runtime candidate y requieren permiso humano.

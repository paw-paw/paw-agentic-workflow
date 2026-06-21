# Backlog Fase 2: Reconciliar evidencia

---

## Estado

* Change id: `paw-10c-antigravity-first-physical-adapter`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 2 - Reconciliar evidencia
* Estado: `done`
* Ultima actualizacion: 2026-06-21
* Owner: sesion Codex activa
* Depende de: Fase 1 commit `4014205`
* Desbloquea: Fase 3 - Validar y cerrar

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `.agents/**`
* `paw/adoption/adapters/runtime/antigravity.json`
* `paw/distribution/manifest.md`
* `paw/distribution/progressive-loading.md`
* `paw/distribution/distribution-manifest.json`

---

## 2. Objetivo de la fase

* Resultado esperado: live adapter and distribution evidence reflect `.agents/**`.
* Razon de la fase: physical files are now real repo assets.
* Cambio que queda habilitado al cerrar: closure can classify physical state.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: runtime adapter evidence.
* reconciliacion esperada: `physical-files-candidate`, no plugin/support claim.

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase: not applicable.
* criterio global de cierre que esta fase acerca: not applicable.
* criterio de cierre por item: not applicable.
* split check: not applicable.

---

## 4. Assumptions

* `.agents/**` should be included in candidate distribution with `required_for_codex: false`.

---

## 5. Precondiciones

### Documentos

* [x] Fase 1 done.

### Decisiones previas

* [x] `.agents/**` is candidate-only.

### Estado tecnico

* [x] `.agents/**` files exist.

---

## 6. Alcance

### Si entra

* [x] update adapter JSON.
* [x] update docs.
* [x] update distribution manifest.

### No entra

* [x] plugin/bundle.
* [x] schema changes.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/adoption/adapters/runtime/antigravity.json`
* distribution docs and validator.

### Editar

* `paw/adoption/adapters/runtime/antigravity.json`
* `paw/adoption/adapters/README.md`
* `paw/distribution/manifest.md`
* `paw/distribution/progressive-loading.md`
* `paw/distribution/distribution-manifest.json`

### Validar

* `node paw/tools/validate-adoption.mjs --fixtures --json`
* `node paw/tools/validate-distribution.mjs --json`
* `git diff --check`

### No tocar

* `.gemini/**`
* `.antigravity/**`
* `paw/parches/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] read current adapter JSON and distribution docs.

### Bloque B - Inspeccion de estado actual

* [x] confirm manifest uses file checksums.

### Bloque C - Edicion por archivo

* [x] update adapter JSON.
* [x] update docs.
* [x] update manifest and checksums.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] record no blockers.

### Bloque E - Validacion

* [x] run adoption validator.
* [x] run distribution validator.
* [x] run `git diff --check`.

### Bloque F - Cierre

* [x] mark done.

---

## 9. Drift detectado

* Fecha: 2026-06-21
  * fuente esperada: existing `antigravity.json` marked local skill path blocked.
  * diferencia encontrada: governed handoff materialized `.agents/**` as candidate physical files.
  * impacto: live adapter evidence needed reconciliation.
  * accion: set physical file evidence while keeping runtime discovery unvalidated.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-21
  * hallazgo: distribution checksums required refresh after manifest/docs changes.
  * impacto: validation would fail if stale.
  * accion: regenerated checksums for all manifest entries.

---

## 11. Blockers

* [x] no blockers for evidence reconciliation.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-21
  * decision: include `.agents/**` in candidate distribution with `required_for_codex: false`.
  * razon: files are versioned adapter evidence but not Codex requirements.
  * documentos o areas afectadas: distribution manifest/docs.

---

## 13. Validaciones

### Documentales

* [x] no plugin/stable-support wording review.

### Tecnicas

* [x] `node paw/tools/validate-adoption.mjs --fixtures --json`
* [x] `node paw/tools/validate-distribution.mjs --json`
* [x] `git diff --check`

### Manuales

* [x] Antigravity runtime validation remains skipped.

### Resultados

* Validacion:
  * comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  * resultado esperado: pass.
  * resultado obtenido: pass.
  * estado: `pass`
  * notas: adapter fixtures unchanged.
* Validacion:
  * comando o revision: `node paw/tools/validate-distribution.mjs --json`
  * resultado esperado: pass.
  * resultado obtenido: pass.
  * estado: `pass`
  * notas: manifest includes `.agents/**`.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: pass.
  * resultado obtenido: pass.
  * estado: `pass`
  * notas: whitespace clean.

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

* risk: `.agents/**` distribution could be mistaken for plugin packaging.
  * mitigacion: docs state it is not a plugin/bundle.

### Pendientes

* close as physical-files-candidate unless runtime validation is added.

# Backlog Fase 3: Instalacion manual, conflicto y rollback

---

## Estado

* Change id: `paw-09-manual-distribution`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 3 - Instalacion manual, conflicto y rollback
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa con aprobacion humana
* Depende de: Fase 2 cerrada en `b320a94`
* Desbloquea: Fase 4 - Codex candidate distribution binding

---

## 1. Fuente de verdad aplicable

* `paw/distribution/manual-installation.md`
* `paw/distribution/manifest.md`
* `sdd/parches/paw-09-manual-distribution/patch.yaml`
* `sdd/parches/paw-09-manual-distribution/definicion.md`
* `sdd/parches/paw-09-manual-distribution/plan.md`
* `sdd/parches/paw-09-manual-distribution/tasks.md`
* `sdd/parches/paw-09-manual-distribution/decision.log`

---

## 2. Objetivo de la fase

* Resultado esperado: existen helpers deterministas y tests para planificar
  instalacion, detectar conflictos, verificar post-install y planificar uninstall
  sin borrar archivos ajenos.
* Razon de la fase: el handoff exige proceso reversible y validable antes de
  conectar Codex runtime binding.
* Cambio que queda habilitado al cerrar: Fase 4 puede exponer binding Codex sobre
  operaciones locales ya modeladas.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `paw/tools/distribution/**`
  y tests contractuales, en alineacion con `paw/distribution/manual-installation.md`.
* reconciliacion esperada: no escribir fuera de manifest ni eliminar archivos
  ajenos; conflicts antes de writes.

### Si `patch_kind = batch`

* no aplica.

---

## 4. Assumptions

* No critical assumptions.

---

## 5. Precondiciones

### Documentos

* [x] Manifest canonical y validator existen.

### Decisiones previas

* [x] No package manager, marketplace, auto-update ni release automation.

### Estado tecnico

* [x] Tests pueden simular destino con snapshots en memoria.

---

## 6. Alcance

### Si entra

* [x] Plan de instalacion dry-run con creates, unchanged, overwrites y conflicts.
* [x] Verificacion post-install contra manifest.
* [x] Plan de uninstall limitado a archivos propios y checksums esperados.
* [x] Tests de clean install, conflict, verification failure y uninstall safe.

### No entra

* [ ] Copiar o borrar archivos reales en destinos externos.
* [ ] UI interactiva o aprobaciones remotas.
* [ ] Auto-update, package manager, marketplace o release automation.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/distribution/manual-installation.md`
* `paw/tools/distribution/**`
* `paw/tests/contract/distribution-*.test.mjs`

### Editar

* `paw/tools/distribution/install-plan.mjs`
* `paw/tests/contract/distribution-installation.test.mjs`
* `AGENTS.md`
* `README.md`
* `paw/tests/README.md`
* `paw/distribution/distribution-manifest.json`
* `sdd/parches/paw-09-manual-distribution/backlog/fase3.md`

### Validar

* `node --test paw/tests/contract/distribution-installation.test.mjs`
* `node paw/tools/validate-distribution.mjs --json`
* `node paw/tools/validate-distribution.mjs --fixtures --json`
* `node sdd/tools/validate-sdd.mjs`
* `git diff --check`

### No tocar

* `_inbox/**`
* `paw/parches/**`
* destinos externos
* package manager, release, Pages, Actions, deployment config

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] Leer contrato de instalacion manual.

### Bloque B - Inspeccion de estado actual

* [x] Confirmar que no existen helpers de install/uninstall.

### Bloque C - Edicion por archivo

* [x] Crear helpers de planificacion/verificacion/uninstall.
* [x] Crear tests contractuales de instalacion.
* [x] Actualizar inventarios/validaciones.
* [x] Regenerar manifest canonical.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] Registrar decision si un helper necesita escribir fuera de manifest.
* [x] Registrar drift si uninstall no puede distinguir ownership.

### Bloque E - Validacion

* [x] Ejecutar tests y validators de distribucion.
* [x] Ejecutar SDD y `git diff --check`.

### Bloque F - Cierre

* [x] Registrar resultados.
* [x] Marcar fase `done` si no hay blockers ni drift abierto.

---

## 9. Drift detectado

* Ninguno registrado.

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-20
  * hallazgo: la fase puede demostrar seguridad de install/uninstall con planes
    puros sin escribir destinos reales.
  * impacto: se evita riesgo de efectos externos durante pruebas.
  * accion: implementar helpers puros con snapshots/resolvers y tests
    contractuales.

---

## 11. Blockers

* Ninguno.

---

## 12. Decisiones tomadas

* Ninguna nueva.

---

## 13. Validaciones

### Documentales

* [x] inventarios actualizados

### Tecnicas

* [x] `node --test paw/tests/contract/distribution-installation.test.mjs`
* [x] `node paw/tools/validate-distribution.mjs --json`
* [x] `node paw/tools/validate-distribution.mjs --fixtures --json`
* [x] `node sdd/tools/validate-sdd.mjs`
* [x] `git diff --check`

### Manuales

* [x] revision manual de que no hay writes reales ni destinos externos

### Resultados

* Validacion:
  * comando o revision: `node --test paw/tests/contract/distribution-installation.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 6 tests pass
  * estado: `pass`
  * notas: cubre clean plan, conflict, approval, verify y uninstall safe.
* Validacion:
  * comando o revision: `node paw/tools/validate-distribution.mjs --json`
  * resultado esperado: `status: pass`
  * resultado obtenido: `status: pass`, 335 manifest entries
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node paw/tools/validate-distribution.mjs --fixtures --json`
  * resultado esperado: `status: pass`
  * resultado obtenido: `status: pass`, 4 fixtures
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

* riesgo: modelos de planificacion no equivalen a una instalacion real.
  * estado: aceptado; fase 3 no escribe destinos reales y fase 4 solo expone
    binding candidate local.

### Pendientes

* Fases 4-5.

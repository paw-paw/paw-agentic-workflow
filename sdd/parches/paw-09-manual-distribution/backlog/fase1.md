# Backlog Fase 1: Contrato de distribucion manual

---

## Estado

* Change id: `paw-09-manual-distribution`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 1 - Contrato de distribucion manual
* Estado: `done`
* Ultima actualizacion: 2026-06-20
* Owner: sesion Codex activa con aprobacion humana
* Depende de: baseline SDD commit `38d2003`
* Desbloquea: Fase 2 - Manifest, checksums y validator

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-09-manual-distribution/patch.yaml`
* `sdd/parches/paw-09-manual-distribution/definicion.md`
* `sdd/parches/paw-09-manual-distribution/plan.md`
* `sdd/parches/paw-09-manual-distribution/tasks.md`
* `sdd/parches/paw-09-manual-distribution/decision.log`

---

## 2. Objetivo de la fase

* Resultado esperado: `paw/distribution/**` existe como contrato vivo de
  distribucion manual candidate y los docs de inventario reconocen su alcance.
* Razon de la fase: las fases de tooling necesitan una fuente documental
  autorizada para manifest, checksums, instalacion, rollback y carga progresiva.
* Cambio que queda habilitado al cerrar: Fase 2 puede implementar validator y
  manifest contra una autoridad registrada.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: nuevo
  `paw/distribution/**`, `docs/README.md`, inventarios y estado bootstrap.
* reconciliacion esperada: mantener pre-alpha, no release estable, no packaging
  publicado, no marketplace, no multiruntime, no activacion v2.

### Si `patch_kind = batch`

* no aplica.

---

## 4. Assumptions

* No critical assumptions.

---

## 5. Precondiciones

### Documentos

* [x] `definicion.md`, `plan.md` y `tasks.md` vigentes.
* [x] `paw-08` cerrado e integrado en `main`.

### Decisiones previas

* [x] decision de trabajar en `main` registrada en `decision.log`.
* [x] decision de crear `paw/distribution/**` registrada en `decision.log`.

### Estado tecnico

* [x] baseline SDD commiteado en `38d2003`.

---

## 6. Alcance

### Si entra

* [x] Crear docs contractuales de distribucion manual candidate.
* [x] Registrar la nueva autoridad en `docs/README.md`.
* [x] Actualizar inventarios y limites vivos afectados.

### No entra

* [ ] Crear schema, validator, CLI, fixtures o installer.
* [ ] Modificar `.codex/paw-runtime-map.json`.
* [ ] Publicar release, tags, packages, Pages, Actions o marketplace.
* [ ] Activar `paw/parches/**` o workflow v2.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `docs/README.md`
* `README.md`
* `AGENTS.md`
* `docs/governance/ARCHITECTURE.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `docs/licensing/OUTPUT-POLICY.md`
* `paw/README.md`
* `paw/tools/README.md`
* `paw/tests/README.md`
* `.codex/README.md`

### Editar

* `paw/distribution/README.md`
* `paw/distribution/manifest.md`
* `paw/distribution/manual-installation.md`
* `paw/distribution/progressive-loading.md`
* `docs/README.md`
* `README.md`
* `AGENTS.md`
* `docs/governance/ARCHITECTURE.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `docs/licensing/OUTPUT-POLICY.md`
* `paw/README.md`
* `paw/tools/README.md`
* `paw/tests/README.md`
* `.codex/README.md`
* `sdd/parches/paw-09-manual-distribution/backlog/fase1.md`

### Validar

* `node sdd/tools/validate-sdd.mjs`
* `node paw/tools/validate-patches.mjs --json`
* `node --test tests/foundation-governance.test.mjs`
* `node --test tests/core-contracts.test.mjs`
* `git diff --check`

### No tocar

* `_inbox/**`
* `paw/tools/**` implementation files
* `paw/tests/contract/**`
* `paw/parches/**`
* release, packaging, Pages, Actions or deployment config

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [ ] Leer docs de trabajo y confirmar frases vigentes de pre-alpha/no release.
* [ ] Leer `OUTPUT-POLICY.md` y confirmar texto de outputs/MPL.

### Bloque B - Inspeccion de estado actual

* [ ] Confirmar que no existe `paw/distribution/**`.
* [ ] Confirmar que `docs/README.md` no registra distribucion manual.

### Bloque C - Edicion por archivo

* [x] Crear `paw/distribution/README.md` con estado, responsabilidad y limites.
* [x] Crear `paw/distribution/manifest.md` con layout, checksums, compatibilidad,
  requisitos, licencia/notices y exclusiones.
* [x] Crear `paw/distribution/manual-installation.md` con install, upgrade,
  rollback, uninstall y verificacion post-install.
* [x] Crear `paw/distribution/progressive-loading.md` con orden de carga.
* [x] Registrar `paw/distribution/**` en `docs/README.md`.
* [x] Actualizar docs de inventario y estado para describir distribucion
  candidate sin release estable.
* [x] Actualizar backlog con hallazgos y resultados.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] Registrar decision solo si aparece una nueva regla durable no cubierta por
  `decision.log`.
* [x] Registrar drift si una fuente viva contradice la definicion.

### Bloque E - Validacion

* [x] Ejecutar `node sdd/tools/validate-sdd.mjs`.
* [x] Ejecutar `node paw/tools/validate-patches.mjs --json`.
* [x] Ejecutar `node --test tests/foundation-governance.test.mjs`.
* [x] Ejecutar `node --test tests/core-contracts.test.mjs`.
* [x] Ejecutar `git diff --check`.

### Bloque F - Cierre

* [x] Marcar checklist completado.
* [x] Marcar fase `done` si no hay blockers ni drift abierto.

---

## 9. Drift detectado

* Ninguno registrado.

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-20
  * hallazgo: `paw/distribution/**` no existia y `docs/README.md` no tenia
    autoridad registrada para distribucion manual.
  * impacto: el validator/installer de fases posteriores necesitaba una fuente
    documental durable.
  * accion: crear `paw/distribution/**` y registrar la superficie en el indice
    canonico.

---

## 11. Blockers

* Ninguno.

---

## 12. Decisiones tomadas

* Ninguna nueva.

---

## 13. Validaciones

### Documentales

* [x] verificar alineacion con contratos aplicables

### Tecnicas

* [x] `node sdd/tools/validate-sdd.mjs`
* [x] `node paw/tools/validate-patches.mjs --json`
* [x] `node --test tests/foundation-governance.test.mjs`
* [x] `node --test tests/core-contracts.test.mjs`
* [x] `git diff --check`

### Manuales

* [x] revision manual de no release estable, no marketplace y no activacion v2

### Resultados

* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: repo SDD valido
  * resultado obtenido: `SDD repo validation passed`
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node paw/tools/validate-patches.mjs --json`
  * resultado esperado: `status: pass`
  * resultado obtenido: `status: pass`, sin errores, warnings transicionales v1
  * estado: `pass`
  * notas: `PATCH_SCHEMA_V1_TRANSITIONAL` esperado para patches v1.
* Validacion:
  * comando o revision: `node --test tests/foundation-governance.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 6 tests pass
  * estado: `pass`
  * notas: sin fallos.
* Validacion:
  * comando o revision: `node --test tests/core-contracts.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 8 tests pass
  * estado: `pass`
  * notas: sin fallos.
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

* riesgo: la documentacion puede sonar a release estable si no reitera candidate.
  * estado: mitigado por `paw/distribution/**`, README y bootstrap status.

### Pendientes

* Fases 2-5.

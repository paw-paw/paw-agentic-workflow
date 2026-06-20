# Tasks: paw-09-manual-distribution

---

## Estado

- Change id: `paw-09-manual-distribution`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-backlog`
- Ultima actualizacion: 2026-06-20
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `sdd/parches/paw-09-manual-distribution/patch.yaml`
- `sdd/parches/paw-09-manual-distribution/definicion.md`
- `sdd/parches/paw-09-manual-distribution/plan.md`
- `sdd/parches/paw-09-manual-distribution/decision.log`

---

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas antes de dividir fases
- [x] no hay decisiones abiertas bloqueantes

---

## 3. Resumen del plan

Crear una distribucion manual candidate de PAW para Codex con contrato vivo,
manifest/checksums, herramientas deterministicas, instalacion reversible,
verificacion post-install y docs de carga progresiva, sin activar packaging,
marketplaces, releases estables, multiruntime ni workflow v2.

---

## 4. Fases

### Fase 1 - Contrato de distribucion manual

- Objetivo: materializar y registrar la autoridad viva de distribucion manual.
- Origen en `plan.md`: Bloque 1.
- Precondiciones: baseline SDD commiteado.
- Tareas:
  - Crear `paw/distribution/README.md`, `manifest.md`,
    `manual-installation.md` y `progressive-loading.md`.
  - Registrar `paw/distribution/**` en `docs/README.md`.
  - Reconciliar `README.md`, `AGENTS.md`, governance docs, `paw/README.md`,
    `paw/tools/README.md`, `paw/tests/README.md` y `.codex/README.md`.
  - Preservar limites: candidate, no release, no marketplace, no multiruntime.
- Archivos o areas probables: `paw/distribution/**`, `docs/**`, `README.md`,
  `AGENTS.md`, `paw/**`, `.codex/README.md`.
- Validaciones: governance/core tests relevantes, `node sdd/tools/validate-sdd.mjs`.
- Criterio de cierre: contrato registrado, no activacion v2, no release estable.

### Fase 2 - Manifest, checksums y validator

- Objetivo: validar deterministicamente la unidad de distribucion candidate.
- Origen en `plan.md`: Bloque 2.
- Precondiciones: Fase 1 cerrada.
- Tareas:
  - Crear schema de manifest de distribucion.
  - Crear helpers Node stdlib para manifest, checksums y validacion.
  - Crear CLI `paw/tools/validate-distribution.mjs`.
  - Agregar manifest canonical y fixtures positivos/negativos.
  - Agregar tests contractuales y documentar el validator.
- Archivos o areas probables: `paw/tools/**`, `paw/tests/**`,
  `paw/distribution/**`.
- Validaciones: nuevo CLI, contract tests de distribucion, validators existentes.
- Criterio de cierre: manifest audita integridad, licencias, compatibilidad y
  contenido permitido.

### Fase 3 - Instalacion manual, conflicto y rollback

- Objetivo: cubrir instalacion limpia, conflicto, rollback y desinstalacion.
- Origen en `plan.md`: Bloque 3.
- Precondiciones: Fase 2 cerrada.
- Tareas:
  - Implementar plan/dry-run de instalacion contra un destino.
  - Bloquear conflictos antes de escribir.
  - Permitir overwrite solo con aprobacion explicita y backup.
  - Verificar post-install desde manifest.
  - Desinstalar solo archivos propios declarados.
  - Cubrir escenarios con fixtures y temp dirs.
- Archivos o areas probables: `paw/tools/distribution/**`,
  `paw/tests/contract/distribution-*.test.mjs`,
  `paw/tests/fixtures/distribution/**`.
- Validaciones: fixtures clean/conflict/altered/uninstall y CLI.
- Criterio de cierre: no se escriben ni eliminan archivos ajenos; conflictos se
  detectan antes de escribir.

### Fase 4 - Codex candidate distribution binding

- Objetivo: conectar la distribucion manual con el runtime Codex candidate.
- Origen en `plan.md`: Bloque 4.
- Precondiciones: Fase 3 cerrada.
- Tareas:
  - Actualizar `.codex/paw-runtime-map.json` con la operacion candidate
    correspondiente.
  - Actualizar `.codex/README.md` y toolkit docs/comandos si aplica.
  - Asegurar que la instalacion Codex no usa rutas absolutas del repo origen.
  - Registrar compatibilidad de schema, toolkit y runtime adapter.
  - Mantener `paw/parches/**` y writers v2 inactivos.
- Archivos o areas probables: `.codex/**`, `paw/distribution/**`,
  `paw/tests/contract/codex-runtime-*.test.mjs`.
- Validaciones: tests Codex runtime y distribution validator.
- Criterio de cierre: Codex candidate instalable/verificable sin activar v2 ni
  declarar multiruntime.

### Fase 5 - Reconciliacion integral y cierre

- Objetivo: cerrar el patch con evidencia completa.
- Origen en `plan.md`: Bloque 5.
- Precondiciones: Fases 1-4 cerradas.
- Tareas:
  - Ejecutar matriz completa de validaciones de `AGENTS.md`.
  - Actualizar backlogs, findings, drift y `decision.log`.
  - Crear `cierre.md` con `sdd-close`.
  - Actualizar `patch.yaml` a `closed`.
- Archivos o areas probables: `sdd/parches/paw-09-manual-distribution/**`.
- Validaciones: matriz completa de `AGENTS.md`, nuevo validator y
  `git diff --check`.
- Criterio de cierre: todas las fases cerradas, drift clasificado, riesgos y
  pendientes visibles.

---

## 5. Dependencias entre fases

- Fase 1 bloquea: Fase 2.
- Fase 2 bloquea: Fase 3.
- Fase 3 bloquea: Fase 4.
- Fase 4 bloquea: Fase 5.

---

## 6. Decisiones y bloqueos

- decisiones abiertas bloqueantes: ninguna.
- decisiones abiertas no bloqueantes: ninguna.

---

## 7. Validaciones globales

- [x] matriz vigente de `AGENTS.md`
- [x] nuevo validator de distribucion con fixtures
- [x] tests contractuales de distribucion
- [x] tests de runtime Codex actualizados si cambia el runtime map/toolkit
- [x] revision manual de no activacion, no release estable y no marketplace

---

## 8. Criterio de cierre

- [x] cada fase tiene objetivo, precondiciones, tareas, validaciones y criterio de cierre
- [x] cada tarea es trazable al `plan.md`
- [x] las validaciones son reales

---

## 9. Registro de cambios

- Fecha: 2026-06-20
  - cambio: fases macro iniciales.
  - razon: preparar ejecucion por backlog vivo.

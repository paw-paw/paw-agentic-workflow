# Tasks: paw-08-vcs-pr-integration

---

## Estado

- Change id: `paw-08-vcs-pr-integration`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-backlog`
- Ultima actualizacion: 2026-06-20
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `sdd/parches/paw-08-vcs-pr-integration/patch.yaml`
- `sdd/parches/paw-08-vcs-pr-integration/definicion.md`
- `sdd/parches/paw-08-vcs-pr-integration/plan.md`
- `sdd/parches/paw-08-vcs-pr-integration/decision.log`

---

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas antes de dividir fases
- [x] no hay decisiones abiertas bloqueantes

---

## 3. Resumen del plan

Crear un contrato portable de integracion VCS/change-request, validar
`integration.yaml`, exponer un binding Codex candidate inactivo y reconciliar la
documentacion viva sin activar el workflow v2 ni automatizar merge.

---

## 4. Fases

### Fase 1 - Contrato portable de integracion

- Objetivo: materializar y registrar la autoridad viva de integracion.
- Origen en `plan.md`: Bloque 1.
- Precondiciones: baseline SDD commiteado.
- Tareas:
  - Crear `paw/integration/README.md` y `integration-lifecycle.md`.
  - Actualizar `paw/core/artifact-lifecycle.md` y `paw/core/README.md`.
  - Registrar la nueva superficie en `docs/README.md`.
  - Reconciliar governance docs, `README.md` y `AGENTS.md`.
  - Agregar prompt operativo breve de politica VCS/PR.
- Archivos o areas probables: `paw/integration/**`, `paw/core/**`, `docs/**`,
  `README.md`, `AGENTS.md`.
- Validaciones: governance/core tests relevantes, `node sdd/tools/validate-sdd.mjs`.
- Criterio de cierre: contrato registrado, sin proveedor como autoridad, sin
  activacion v2.

### Fase 2 - Schema, validator y fixtures

- Objetivo: agregar validacion deterministica de `integration.yaml`.
- Origen en `plan.md`: Bloque 2.
- Precondiciones: Fase 1 cerrada.
- Tareas:
  - Crear schema JSON de integracion.
  - Crear validator Node stdlib y CLI `validate-integration.mjs`.
  - Agregar fixtures positivos y negativos.
  - Agregar tests contractuales y documentar el validator.
- Archivos o areas probables: `paw/tools/**`, `paw/tests/**`.
- Validaciones: nuevo CLI, nuevo contract test, patch/catalog/adoption/workflow
  validators existentes.
- Criterio de cierre: fixtures cubren standalone, member, draft, stale checks,
  closed/unmerged, abandoned y absent provider.

### Fase 3 - Codex candidate y GitHub provider experimental

- Objetivo: exponer integracion en Codex sin activar v2 ni hacer operaciones
  remotas por defecto.
- Origen en `plan.md`: Bloque 3.
- Precondiciones: Fase 2 cerrada.
- Tareas:
  - Crear `.codex/skills/paw-integrate/SKILL.md`.
  - Actualizar `.codex/paw-runtime-map.json` y `.codex/README.md`.
  - Agregar subcommands toolkit para inspeccion/snapshot local.
  - Agregar provider adapter GitHub experimental limitado a snapshot.
  - Actualizar tests de runtime Codex.
- Archivos o areas probables: `.codex/**`, `paw/tests/contract/codex-runtime-*.test.mjs`.
- Validaciones: tests Codex runtime y nuevo validator de integracion.
- Criterio de cierre: skill candidate inactiva, permisos separados, merge humano.

### Fase 4 - Reconciliacion integral y cierre

- Objetivo: cerrar el patch con evidencia, drift y validaciones completas.
- Origen en `plan.md`: Bloque 4.
- Precondiciones: Fases 1-3 cerradas.
- Tareas:
  - Ejecutar matriz completa de validaciones.
  - Actualizar backlogs, findings, drift y `decision.log`.
  - Crear `cierre.md` con `sdd-close`.
  - Actualizar `patch.yaml` a `closed`.
- Archivos o areas probables: `sdd/parches/paw-08-vcs-pr-integration/**`.
- Validaciones: matriz completa de `AGENTS.md`, nuevo validator y `git diff --check`.
- Criterio de cierre: todas las fases cerradas, drift clasificado, riesgos y
  pendientes visibles.

---

## 5. Dependencias entre fases

- Fase 1 bloquea: Fase 2.
- Fase 2 bloquea: Fase 3.
- Fase 3 bloquea: Fase 4.

---

## 6. Decisiones y bloqueos

- decisiones abiertas bloqueantes: ninguna.
- decisiones abiertas no bloqueantes: ninguna.

---

## 7. Validaciones globales

- [x] matriz vigente de `AGENTS.md`
- [x] nuevo validator de integracion con fixtures
- [x] tests contractuales de integracion
- [x] tests de runtime Codex actualizados
- [x] revision manual de no activacion y no merge automatico

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


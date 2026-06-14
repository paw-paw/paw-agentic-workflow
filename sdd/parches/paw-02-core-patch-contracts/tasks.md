# Tasks: paw-02-core-patch-contracts

## Estado

- Change id: `paw-02-core-patch-contracts`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-backlog`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa con aprobacion humana

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-02-core-patch-contracts/patch.yaml`
- `sdd/parches/paw-02-core-patch-contracts/definicion.md`
- `sdd/parches/paw-02-core-patch-contracts/plan.md`
- `sdd/parches/paw-02-core-patch-contracts/decision.log`

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas
- [x] no hay decisiones abiertas bloqueantes

## 3. Resumen del plan

Promover el micro-core PAW por capas: modelo y autoridad, lifecycle, gates/drift/compatibilidad y conformance final, manteniendo v1 como unico runtime activo.

## 4. Fases

### Fase 1 - Modelo de patch, autoridad y evidencia

- Objetivo: activar el indice del core y definir los contratos fundamentales de patch, autoridad, evidencia y promocion.
- Origen: Bloque 1.
- Precondiciones: preparacion SDD versionada.
- Tareas: crear contratos, registrar autoridad y ajustar claims generales afectados.
- Areas: `paw/core/**`, indice, arquitectura, README raiz y `paw/README.md`.
- Validaciones: validator v1, revision semantica y whitespace.
- Criterio: contratos legibles, registrados y sin activar workflow v2.

### Fase 2 - Lifecycle y ownership de artifacts

- Objetivo: definir responsabilidades exclusivas, secuencia y promocion de artifacts.
- Origen: Bloque 2.
- Precondiciones: Fase 1 cerrada.
- Tareas: crear `artifact-lifecycle.md`, reservar `integration.yaml` y documentar memoria post-cierre.
- Areas: `paw/core/artifact-lifecycle.md`.
- Validaciones: validator v1, inspeccion de coverage y whitespace.
- Criterio: todos los artifacts tienen ownership no solapado.

### Fase 3 - Gates, drift y compatibilidad

- Objetivo: definir gates humanos, categorias de drift y convivencia v1/v2.
- Origen: Bloque 3.
- Precondiciones: Fases 1 y 2 cerradas.
- Tareas: crear tres contratos y reconciliar transicion/bootstrap.
- Areas: `paw/core/**`, `V1-TRANSITION.md`, `BOOTSTRAP-STATUS.md`.
- Validaciones: validator v1, revision de no dual-write y whitespace.
- Criterio: reconciliacion y cutover quedan inequívocos sin activar v2.

### Fase 4 - Conformance y reconciliacion

- Objetivo: convertir criterios estables en tests y preparar cierre.
- Origen: Bloque 4.
- Precondiciones: Fases 1 a 3 cerradas.
- Tareas: crear test dedicado, adaptar foundation, ejecutar suite y sincronizar drift si aparece.
- Areas: `tests/**` y artifacts SDD.
- Validaciones: suite global y revision manual.
- Criterio: todos los checks pasan y no queda drift sin clasificar.

## 5. Dependencias entre fases

- Fase 1 bloquea Fase 2.
- Fase 2 bloquea Fase 3.
- Fase 3 bloquea Fase 4.
- Fase 4 bloquea `sdd-close`.

## 6. Decisiones y bloqueos

- Decisiones abiertas bloqueantes: ninguna.
- Decisiones abiertas no bloqueantes: ninguna.
- Protocolo: fuentes vivas, handoff, ledger, legacy directamente relacionado y humano.

## 7. Validaciones globales

- [ ] validator repo y fixtures
- [ ] tests SDD, foundation y core contracts
- [ ] `git diff --check`
- [ ] revision manual de neutralidad, no objetivos y compatibilidad

## 8. Trabajo diferido

- Schema y validator v2 al patch 03.
- Workflow, roles y conformance portable al patch 06.
- Integracion VCS y canonizacion de commits al patch 08.
- Cutover al patch 14.

## 9. Criterio de cierre

- [x] fases completas y trazables
- [x] dependencias claras
- [x] validaciones reales
- [x] Fase 1 seleccionada

## 10. Registro de cambios

- `2026-06-13`
  - Division inicial en cuatro fases.

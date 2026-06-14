# Tasks: paw-01-foundation

## Estado

- Change id: `paw-01-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-first`
- Estado: `ready-for-backlog`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-01-foundation/patch.yaml`
- `sdd/parches/paw-01-foundation/definicion.md`
- `sdd/parches/paw-01-foundation/plan.md`
- `sdd/parches/paw-01-foundation/decision.log`

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas antes de dividir fases
- [x] no hay decisiones abiertas bloqueantes

## 3. Resumen del plan

Establecer gobierno e identidad PAW, materializar un layout objetivo no operativo, neutralizar acoplamientos heredados del runtime v1 sin renombrarlo y crear conformance determinista antes del cierre formal.

## 4. Fases

### Fase 1 - Identidad, autoridad y gobierno

- Estado: `done`
- Objetivo: crear las fuentes vivas que definen identidad, mapa documental, autoridad, capas, naming, contribucion, transicion y licencia.
- Origen en `plan.md`: Bloque 1.
- Precondiciones: intake y plan aprobados; roles y niveles de autoridad resueltos.
- Tareas:
  - reescribir el README publico con la formulacion vinculante y estado pre-alpha;
  - convertir `docs/README.md` en indice canonico y politica unica de precedencia;
  - reducir `AGENTS.md` a puente operativo;
  - crear contributor guidance y documentos de arquitectura, naming y transicion v1;
  - alinear bootstrap status, output policy y license map.
- Archivos o areas probables: raiz, `docs/governance/**`, `docs/licensing/**`, `LICENSES/README.md`.
- Validaciones: links, naming, idioma, ausencia de claims de portabilidad y revision de autoridad duplicada.
- Criterio de cierre: las fuentes vivas existen, estan indexadas y no contienen decisiones de patches futuros.

### Fase 2 - Layout PAW inerte

- Estado: `done`
- Objetivo: crear `paw/**` con ownership y limites documentados sin activar v2.
- Origen en `plan.md`: Bloque 2.
- Precondiciones: arquitectura y transicion de Fase 1 vigentes.
- Tareas:
  - crear README raiz de `paw/`;
  - crear READMEs de `core`, `parches`, `orchestration`, `tools` y `tests`;
  - declarar explicitamente estado no operativo y owners;
  - verificar ausencia de schemas, tooling, workspaces, writers y symlinks.
- Archivos o areas probables: `paw/**`.
- Validaciones: inspeccion estructural y busqueda de claims de activacion.
- Criterio de cierre: layout completo, versionable e inerte.

### Fase 3 - Transicion y desacoplamiento v1

- Estado: `done`
- Objetivo: mantener el flujo Spec-Driven Development v1 operativo y neutral al repo actual.
- Origen en `plan.md`: Bloque 3.
- Precondiciones: transicion documentada y layout inerte.
- Tareas:
  - actualizar `sdd/README.md` y `sdd/core/README.md` para describir v1 transitorio;
  - retirar routing y verificacion Astro/Pages ausentes de orchestration;
  - neutralizar identidad portfolio/Astro en perfiles Codex;
  - retirar referencias Astro de skills sin cambiar sus nombres o interfaces;
  - mantener config, schema, validator, fixtures y nombres v1 compatibles.
- Archivos o areas probables: `sdd/**`, `.codex/**`.
- Validaciones: suite SDD existente y busqueda dirigida de acoplamientos activos.
- Criterio de cierre: v1 pasa sus checks, sigue siendo el unico writer y no depende de superficies excluidas.

### Fase 4 - Conformance y reconciliacion

- Estado: `done`
- Objetivo: automatizar criterios estables, ejecutar validaciones globales y preparar cierre.
- Origen en `plan.md`: Bloque 4.
- Precondiciones: fases 1 a 3 cerradas.
- Tareas:
  - crear `tests/foundation-governance.test.mjs`;
  - comprobar identidad, indice, layout, transicion, licencia, privacidad y ausencia de symlinks/dual-write;
  - ejecutar todas las validaciones;
  - resolver drift dentro de alcance o activar `sdd-sync-drift`;
  - dejar artifacts y fuentes vivas reconciliados para `sdd-close`.
- Archivos o areas probables: `tests/**`, artifacts SDD y ajustes puntuales descubiertos por checks.
- Validaciones: suite global indicada en el plan y revision manual estructurada.
- Criterio de cierre: todos los checks pasan y no quedan blockers ni drift sin clasificar.

## 5. Dependencias entre fases

- Fase 1 bloquea Fase 2.
- Fase 2 bloquea Fase 3.
- Fase 3 bloquea Fase 4.
- Fase 4 bloquea `sdd-close`.

## 6. Decisiones y bloqueos

- Decisiones abiertas bloqueantes: ninguna.
- Decisiones abiertas no bloqueantes: ninguna.
- Protocolo ante dudas: handoff y fuentes vivas, ledger, legacy relacionado, humano.

## 7. Validaciones globales

- [x] `node sdd/tools/validate-sdd.mjs`
- [x] `node sdd/tools/validate-sdd.mjs --fixtures`
- [x] `node --test tests/sdd-validation.test.mjs`
- [x] `node --test tests/foundation-governance.test.mjs`
- [x] `git diff --check`
- [x] revision manual de claims, historia/procedencia y no objetivos

## 8. Trabajo diferido

- Todo scope de los handoffs 02 a 14.
- CI, Pages, release, packaging y deployment.
- Metadata/frontmatter obligatorio, schemas de roles y conformance portable.

## 9. Criterio de cierre

- [x] cada fase tiene objetivo, precondiciones, tareas, validaciones y criterio de cierre
- [x] cada tarea es trazable al `plan.md`
- [x] las validaciones son reales
- [x] la Fase 1 queda seleccionada para `sdd-phase-backlog`

## 10. Registro de cambios

- `2026-06-13`
  - Division inicial en cuatro fases secuenciales.

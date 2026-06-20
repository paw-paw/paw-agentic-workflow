# Tasks: paw-07-codex-runtime-tooling

---

## Estado

- Change id: `paw-07-codex-runtime-tooling`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-backlog`
- Ultima actualizacion: 2026-06-20
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `sdd/parches/paw-07-codex-runtime-tooling/patch.yaml`
- `sdd/parches/paw-07-codex-runtime-tooling/definicion.md`
- `sdd/parches/paw-07-codex-runtime-tooling/plan.md`
- `sdd/parches/paw-07-codex-runtime-tooling/decision.log`
- `_inbox/final/07-codex-runtime-tooling-handoff.md`
- `_inbox/final/README.md`
- `_inbox/final/patch-execution-guide.md`

---

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas antes de dividir fases
- [x] no hay decisiones abiertas bloqueantes
- [x] `origin/main` contiene el cierre de `paw-06-workflow-conformance`

---

## 3. Resumen del plan

El patch implementa el adapter runtime Codex de PAW como candidate inactivo:
primero define el mapa runtime y el toolkit compartido, luego implementa el
toolkit, despues crea skills `paw-*` para lifecycle, bootstrap y conformance,
agrega perfiles Codex acotados, y finalmente reconcilia documentacion y validacion.
La ejecucion no reemplaza `sdd-*`, no activa `paw/parches/**`, no usa `.agents/` y
no canoniza politica VCS portable.

---

## 4. Fases

### Fase 1 - Runtime map and toolkit contract

- Objetivo: materializar el mapa operacion portable -> Codex y el contrato del
  toolkit compartido antes de implementar scripts o skills.
- Origen en `plan.md`: Bloque 1.
- Precondiciones:
  - preparacion SDD commiteada;
  - `paw/orchestration/**` del patch 06 disponible en `origin/main`;
  - no hay decision humana abierta sobre alcance runtime.
- Tareas:
  - definir ubicacion del toolkit compartido bajo `.codex/**` y documentar por que
    no es una skill de workflow;
  - crear mapa de operaciones: triage, intake, router, plan, tasks, phase backlog,
    execute phase, sync drift, close, bootstrap discover, bootstrap define,
    bootstrap write y conformance;
  - especificar contrato comun de entrypoints, version, exit codes, JSON, stdout,
    stderr, dry-run, root detection, idempotencia, freshness y fail-loud;
  - documentar mutation envelope Nivel 1, Nivel 2 y Nivel 3;
  - actualizar documentos vivos necesarios para registrar candidate status sin
    activar workflow v2.
- Archivos o areas probables:
  - `.codex/README.md`
  - `.codex/paw-toolkit/README.md` o ubicacion aprobada equivalente
  - `.codex/paw-runtime-map.json` o documento equivalente
  - `docs/README.md`
  - `docs/governance/V1-TRANSITION.md`
  - `docs/governance/BOOTSTRAP-STATUS.md`
- Validaciones:
  - `node sdd/tools/validate-sdd.mjs`
  - `node paw/tools/validate-workflow.mjs --json`
  - `git diff --check`
  - revision manual de no activacion, no `.agents` y cobertura de operaciones.
- Criterio de cierre:
  - mapa completo o gaps explicitos;
  - contrato de toolkit aprobado para implementacion;
  - backlog actualizado con validaciones, hallazgos y cierre.

### Fase 2 - Shared toolkit implementation

- Objetivo: implementar el toolkit compartido y sus tests contractuales.
- Origen en `plan.md`: Bloque 2.
- Precondiciones:
  - Fase 1 cerrada y commiteada;
  - contrato de toolkit y mutation envelope disponibles.
- Tareas:
  - crear scripts no interactivos del toolkit para root discovery, contract loading,
    patch-state discovery, JSON result formatting, diagnostics, dry-run y freshness;
  - implementar validacion de mutation levels y approval requirements sin decidir
    semantica;
  - agregar `--help`, `--json`, `--version`, `--root` y `--dry-run` cuando aplique;
  - crear fixtures y tests para salida compacta, errores, exit codes, idempotencia y
    no mutacion en dry-run;
  - documentar el contrato versionado del toolkit.
- Archivos o areas probables:
  - `.codex/paw-toolkit/**`
  - `paw/tests/fixtures/codex-runtime/toolkit/**`
  - `paw/tests/contract/codex-runtime-toolkit.test.mjs`
  - `paw/tests/README.md`
  - `paw/tools/README.md` si se agrega runner o validator.
- Validaciones:
  - tests contractuales nuevos del toolkit;
  - `node paw/tools/validate-workflow.mjs --json`
  - `git diff --check`
- Criterio de cierre:
  - toolkit versionado, no interactivo y probado;
  - scripts no redactan decisiones ni contenido sustantivo;
  - fase commiteada tras validaciones.

### Fase 3 - Core lifecycle skills

- Objetivo: crear skills `paw-*` para el ciclo principal usando progressive
  disclosure y el toolkit compartido.
- Origen en `plan.md`: Bloque 3.
- Precondiciones:
  - Fase 2 cerrada y commiteada;
  - toolkit disponible para discovery y validacion mecanica.
- Tareas:
  - crear `paw-triage`, `paw-intake`, `paw-router`, `paw-plan`, `paw-tasks`,
    `paw-phase-backlog`, `paw-execute-phase`, `paw-sync-drift` y `paw-close`;
  - mantener cada `SKILL.md` compacto y referenciado a su contrato inmediato;
  - agregar scripts/assets locales solo cuando reduzcan trabajo mecanico;
  - incluir guardrails de no cutover, no `paw/parches/**` activo y no reemplazo de
    `sdd-*` durante `paw-foundation`;
  - probar metadata, references, progressive disclosure y mapping.
- Archivos o areas probables:
  - `.codex/skills/paw-triage/**`
  - `.codex/skills/paw-intake/**`
  - `.codex/skills/paw-router/**`
  - `.codex/skills/paw-plan/**`
  - `.codex/skills/paw-tasks/**`
  - `.codex/skills/paw-phase-backlog/**`
  - `.codex/skills/paw-execute-phase/**`
  - `.codex/skills/paw-sync-drift/**`
  - `.codex/skills/paw-close/**`
  - `paw/tests/fixtures/codex-runtime/skills/**`
  - `paw/tests/contract/codex-runtime-skills.test.mjs`
- Validaciones:
  - tests contractuales de skills;
  - `node sdd/tools/validate-sdd.mjs`
  - `git diff --check`
  - revision manual de no duplicacion doctrinal.
- Criterio de cierre:
  - operaciones lifecycle cubiertas por skills candidate;
  - no hay reemplazo de `sdd-*`;
  - fase commiteada tras validaciones.

### Fase 4 - Bootstrap, conformance and agents

- Objetivo: completar bootstrap/conformance Codex y perfiles de agentes acotados.
- Origen en `plan.md`: Bloques 3 y 4.
- Precondiciones:
  - Fase 3 cerrada y commiteada;
  - skills lifecycle y toolkit disponibles.
- Tareas:
  - crear `paw-bootstrap-discover`, `paw-bootstrap-define` y
    `paw-bootstrap-write`;
  - crear `paw-conformance` o documentar integracion equivalente claramente
    cubierta;
  - crear perfiles `.codex/agents/paw-*.toml` con read-only/advisory por defecto y
    writers solo bajo autorizacion explicita;
  - probar approval gate, `creates_docs`, writer ownership unico, no autoridad
    contractual y no delegacion recursiva innecesaria;
  - actualizar mapa runtime con cobertura final.
- Archivos o areas probables:
  - `.codex/skills/paw-bootstrap-discover/**`
  - `.codex/skills/paw-bootstrap-define/**`
  - `.codex/skills/paw-bootstrap-write/**`
  - `.codex/skills/paw-conformance/**` o docs de integracion equivalente
  - `.codex/agents/paw-*.toml`
  - `paw/tests/fixtures/codex-runtime/agents/**`
  - `paw/tests/contract/codex-runtime-agents.test.mjs`
- Validaciones:
  - tests contractuales de bootstrap/conformance y agents;
  - `node paw/tools/validate-workflow.mjs --fixtures --json`
  - `git diff --check`
  - revision manual de permisos y approval gates.
- Criterio de cierre:
  - todas las operaciones portables del handoff tienen implementacion Codex o gap
    explicito;
  - agentes no tienen autoridad contractual;
  - fase commiteada tras validaciones.

### Fase 5 - Governance reconciliation and full validation

- Objetivo: reconciliar docs vivos, estado bootstrap y validaciones globales antes
  del cierre.
- Origen en `plan.md`: Bloque 5.
- Precondiciones:
  - Fases 1 a 4 cerradas y commiteadas;
  - no hay drift bloqueante pendiente.
- Tareas:
  - actualizar `docs/governance/ARCHITECTURE.md`,
    `docs/governance/V1-TRANSITION.md`, `docs/governance/BOOTSTRAP-STATUS.md`,
    `docs/README.md`, `paw/orchestration/README.md`, `paw/tools/README.md` y
    `paw/tests/README.md` segun corresponda;
  - confirmar que `.codex/**` queda como candidate runtime binding, no cutover;
  - ejecutar la suite deterministica completa de `AGENTS.md` y checks nuevos;
  - registrar resultados, drift, gaps, pendientes y riesgos en el backlog.
- Archivos o areas probables:
  - `docs/README.md`
  - `docs/governance/ARCHITECTURE.md`
  - `docs/governance/V1-TRANSITION.md`
  - `docs/governance/BOOTSTRAP-STATUS.md`
  - `paw/orchestration/README.md`
  - `paw/tools/README.md`
  - `paw/tests/README.md`
  - `AGENTS.md`
- Validaciones:
  - todos los comandos vigentes listados en `AGENTS.md`;
  - tests nuevos del runtime Codex;
  - `git diff --check`.
- Criterio de cierre:
  - docs vivos reflejan runtime Codex candidate sin claims de activacion,
    portabilidad, packaging, CI o integracion VCS;
  - validacion integral registrada;
  - fase commiteada tras validaciones.

### Fase 6 - Formal SDD closure

- Objetivo: cerrar formalmente el patch con `sdd-close` y un commit independiente
  sin cambios sustantivos de implementacion.
- Origen en `plan.md`: Bloque 5 y politica provisional de commits.
- Precondiciones:
  - Fases 1 a 5 cerradas, validadas y commiteadas;
  - todas las reglas durables promovidas a fuentes vivas;
  - no hay blockers ni drift sin clasificar.
- Tareas:
  - crear `cierre.md` desde los artefactos vivos;
  - actualizar `patch.yaml` a `closed` con `closed_at`;
  - clasificar validaciones como automated, manual, not applicable o deferred;
  - registrar gaps aceptados, pendientes fuera de alcance y riesgos residuales;
  - ejecutar validaciones finales relevantes.
- Archivos o areas probables:
  - `sdd/parches/paw-07-codex-runtime-tooling/cierre.md`
  - `sdd/parches/paw-07-codex-runtime-tooling/patch.yaml`
- Validaciones:
  - `node sdd/tools/validate-sdd.mjs`
  - checks nuevos del runtime Codex;
  - `node paw/tools/validate-patches.mjs --json`
  - `git diff --check`
- Criterio de cierre:
  - patch cerrado en `patch.yaml`;
  - `cierre.md` no introduce autoridad nueva ni oculta drift;
  - commit de cierre independiente creado.

---

## 5. Dependencias entre fases

- Fase 1 bloquea: Fase 2, Fase 3, Fase 4, Fase 5, Fase 6.
- Fase 2 bloquea: Fase 3, Fase 4, Fase 5, Fase 6.
- Fase 3 bloquea: Fase 4, Fase 5, Fase 6.
- Fase 4 bloquea: Fase 5, Fase 6.
- Fase 5 bloquea: Fase 6.

---

## 6. Decisiones y bloqueos

- decisiones abiertas bloqueantes: ninguna.
- decisiones abiertas no bloqueantes: ninguna.

---

## 7. Validaciones globales

- [ ] `node sdd/tools/validate-sdd.mjs`
- [ ] `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] `node paw/tools/validate-patches.mjs --json`
- [ ] `node paw/tools/validate-patches.mjs --fixtures --json`
- [ ] `node paw/tools/validate-catalogs.mjs --json`
- [ ] `node paw/tools/validate-catalogs.mjs --fixtures --json`
- [ ] `node paw/tools/validate-adoption.mjs --fixtures --json`
- [ ] `node paw/tools/validate-workflow.mjs --json`
- [ ] `node paw/tools/validate-workflow.mjs --fixtures --json`
- [ ] tests contractuales nuevos del runtime Codex, si se introducen
- [ ] `node --test paw/tests/contract/patch-parsing.test.mjs`
- [ ] `node --test paw/tests/contract/patch-validation.test.mjs`
- [ ] `node --test paw/tests/contract/validator-cli.test.mjs`
- [ ] `node --test paw/tests/contract/adoption-adapters.test.mjs`
- [ ] `node --test paw/tests/contract/adoption-records.test.mjs`
- [ ] `node --test paw/tests/contract/adoption-assessments.test.mjs`
- [ ] `node --test paw/tests/contract/workflow-validation.test.mjs`
- [ ] `node --test paw/tests/contract/workflow-cli.test.mjs`
- [ ] `node --test tests/sdd-validation.test.mjs`
- [ ] `node --test tests/foundation-governance.test.mjs`
- [ ] `node --test tests/core-contracts.test.mjs`
- [ ] `node --test tests/schema-validator-conformance.test.mjs`
- [ ] `git diff --check`

---

## 8. Criterio de cierre

- [x] cada fase tiene objetivo, precondiciones, tareas, validaciones y criterio de cierre
- [x] cada tarea es trazable al `plan.md`
- [x] las validaciones son reales
- [x] la politica provisional de commits queda registrada en `decision.log`

---

## 9. Registro de cambios

- Fecha: 2026-06-20
  - cambio: desglose inicial de fases macro para `paw-07-codex-runtime-tooling`.
  - razon: preparar backlogs de fase conforme a `sdd-tasks`.

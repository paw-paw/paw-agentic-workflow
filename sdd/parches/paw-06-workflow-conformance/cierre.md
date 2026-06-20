# Cierre: paw-06-workflow-conformance

---

## Estado

- Change id: `paw-06-workflow-conformance`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Status final: `closed`
- Fecha de cierre: 2026-06-19
- Owner: sesion Codex activa con aprobacion humana
- Nivel de cierre: `anchored`

---

## 1. Resumen

- Objetivo original: definir contratos portables de workflow PAW, bootstrap
  documental y conformance sin empaquetarlos para un runtime agentic concreto.
- Resultado ejecutado: se materializaron contratos vivos bajo `paw/orchestration/**`,
  schemas y validator bajo `paw/tools/**`, fixtures y tests bajo `paw/tests/**`, y
  reconciliacion de governance docs.
- Alcance cerrado:
  - operaciones `paw-*`, estados, readiness, transiciones invalidas, loops y
    artifacts faltantes;
  - bootstrap discover, define y write con gates, `creates_docs` y write report;
  - roles documentales, conformance chain, dispositions, enforcement y evidencia
    manual;
  - validator deterministico, CLI, fixtures y tests contractuales;
  - estado vivo sincronizado sin activar workflow v2.
- Alcance diferido:
  - skills, agentes y runtime bindings `paw-*`: `paw-07-codex-runtime-tooling`;
  - integracion VCS/PR: `paw-08-vcs-pr-integration`;
  - instalacion, packaging, CI, releases y cutover: patches posteriores.

---

## 2. Rama obligatoria por tipo

### Si `patch_kind = spec`

- fuente viva reconciliada:
  - `docs/README.md`
  - `docs/governance/ARCHITECTURE.md`
  - `docs/governance/V1-TRANSITION.md`
  - `docs/governance/BOOTSTRAP-STATUS.md`
  - `paw/README.md`
  - `paw/core/**`
  - `paw/orchestration/**`
  - `paw/tools/README.md`
  - `paw/tests/README.md`
  - `AGENTS.md`
- cambio promovido: workflow, bootstrap y conformance quedan como contratos
  documentales portables e inactivos hasta cutover; validators y tests quedan como
  evidencia deterministica.

### Si `patch_kind = batch`

- estado por item: no aplica.
- criterio global de cierre: no aplica.
- item diferido, si existe: no aplica.

---

## 3. Artifacts revisados

- `patch.yaml`
- `definicion.md`
- `plan.md`
- `tasks.md`
- `backlog/fase1.md`
- `backlog/fase2.md`
- `backlog/fase3.md`
- `backlog/fase4.md`
- `backlog/fase5.md`
- `decision.log`

---

## 4. Decisiones relevantes

- decision: crear `codex/paw-06-workflow-conformance` desde `origin/main`.
  - fuente: `decision.log`
  - impacto: el patch se baso en `origin/main` con `paw-05` mergeado.
- decision: aplicar politica provisional de commits de `paw-foundation`.
  - fuente: `decision.log`
  - impacto: hubo commit de preparacion SDD, commit por fase cerrada y commit de
    cierre independiente; no se hizo squash, rebase, force-push ni WIP remoto.

---

## 5. Assumptions, blockers y findings

### Assumptions

- El contrato portable de workflow pertenece a `paw/orchestration/**`.
- Schemas y validators bajo `paw/tools/**` no activan writers ni workspaces v2.
- Roles documentales usan identificadores vivos en ingles.
- Evidencia manual es estructurada y validable en forma, no reemplazada por tests
  artificiales.

### Blockers

- Ninguno.

### Findings

- finding: los fixtures de workflow debian quedar fuera del validator de patch
  fixtures.
  - evidencia: Fase 4 registro fallo inicial de `validate-patches --fixtures` y
    `patch-validation.test.mjs`.
  - impacto: se acoto el runner/test de patch fixtures para excluir `/workflow/`,
    igual que `/catalogs/` y `/adoption/`.
- finding: tests de governance preservan frases de frontera.
  - evidencia: Fase 4 reejecuto `foundation-governance` y
    `schema-validator-conformance`.
  - impacto: docs vivos mantienen frases contractuales de no activacion.

---

## 6. Drift

- drift: fixture runner de patches recogia fixtures de workflow.
  - categoria: `operational`
  - fuente esperada: cada dominio de fixtures se valida por su validator propio.
  - diferencia encontrada: workflow fixtures eran tratados como patch fixtures.
  - accion: excluir `/workflow/` en `paw/tools/validation/validate-fixtures.mjs` y
    `paw/tests/contract/patch-validation.test.mjs`.
  - estado: resuelto y validado.

---

## 7. Reconciliacion de fuente viva

- fuente viva afectada: `docs/README.md`
  - cambio requerido: registrar `paw/orchestration/workflow.md`,
    `bootstrap.md` y `conformance.md` como autoridad.
  - estado: `aplicado`
  - evidencia: Fase 1.
- fuente viva afectada: governance docs y PAW root README
  - cambio requerido: reflejar workflow, bootstrap, conformance, validator y tests
    como materializados pero inactivos.
  - estado: `aplicado`
  - evidencia: Fase 4.
- fuente viva afectada: `AGENTS.md`
  - cambio requerido: agregar checks determinísticos de workflow.
  - estado: `aplicado`
  - evidencia: Fase 3 y Fase 4.

---

## 8. Validaciones

- validacion:
  - tipo: `automated`
  - comando o revision: `node sdd/tools/validate-sdd.mjs`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: Fase 4 y validacion final de cierre.
- validacion:
  - tipo: `automated`
  - comando o revision: `node sdd/tools/validate-sdd.mjs --fixtures`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: Fase 4.
- validacion:
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-patches.mjs --json`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: Fase 4 y validacion final de cierre.
- validacion:
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-patches.mjs --fixtures --json`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: Fase 4.
- validacion:
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-catalogs.mjs --json`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: Fase 4.
- validacion:
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-catalogs.mjs --fixtures --json`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: Fase 4.
- validacion:
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: Fase 4.
- validacion:
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-workflow.mjs --json`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: Fase 4.
- validacion:
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-workflow.mjs --fixtures --json`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: Fase 4.
- validacion:
  - tipo: `automated`
  - comando o revision: tests contractuales listados en `AGENTS.md`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: Fase 4.
- validacion:
  - tipo: `manual`
  - comando o revision: revision de no activacion
  - resultado esperado: no writes a `paw/parches/**`, no `paw-*` skills, no runtime
    adapters, no packaging, no CI, no releases.
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: backlogs de Fases 1-4.
- validacion:
  - tipo: `automated`
  - comando o revision: `git diff --check`
  - resultado esperado: sin errores
  - resultado obtenido: sin errores
  - estado: `pass`
  - evidencia: Fase 4 y validacion final de cierre.

---

## 9. Riesgos residuales

- riesgo: los contratos de workflow existen antes de runtime bindings.
  - impacto: usuarios podrian confundir contratos con workflow activo.
  - mitigacion: `V1-TRANSITION.md`, `BOOTSTRAP-STATUS.md`, `paw/README.md` y
    `paw/orchestration/README.md` declaran no activacion hasta cutover.
- riesgo: evidencia manual requiere disciplina humana.
  - impacto: reglas manuales pueden ser incompletas si no se registran campos.
  - mitigacion: contrato y fixtures exigen reviewer, fecha, objeto, criterio,
    resultado y referencias.

---

## 10. Pendientes

- pendiente: runtime bindings `paw-*`.
  - owner: `paw-07-codex-runtime-tooling`
  - razon: fuera de alcance de este patch.
- pendiente: integracion VCS/PR y canonizacion de politica de commits.
  - owner: `paw-08-vcs-pr-integration`
  - razon: la politica aplicada aqui es provisional.
- pendiente: activacion del workflow v2 y `paw/parches/**`.
  - owner: `paw-14-stabilization-cutover`
  - razon: requiere pilotos, freeze y gates de portabilidad.

---

## 11. Criterio de cierre

- [x] fases seleccionadas cerradas o diferidas con razon
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] decisiones relevantes registradas
- [x] drift clasificado y resuelto o diferido
- [x] validaciones registradas
- [x] fuente viva reconciliada o marcada no aplicable
- [x] riesgos residuales visibles

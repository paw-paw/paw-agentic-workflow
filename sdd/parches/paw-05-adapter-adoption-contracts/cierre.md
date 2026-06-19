# Cierre: paw-05-adapter-adoption-contracts

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

- Change id: `paw-05-adapter-adoption-contracts`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Status final: `closed`
- Fecha de cierre: `2026-06-19`
- Owner: sesion Codex activa con aprobacion humana
- Nivel de cierre: `anchored`

---

## 1. Resumen

- Objetivo original: definir como un repo adopta PAW y separar preset definitions,
  adoption records, stack realization, assessments, repo/stack/runtime adapters y
  overrides locales.
- Resultado ejecutado: materializados contratos portables bajo `paw/adoption/**`,
  schemas bajo `paw/tools/schemas/adoption/**`, validators bajo `paw/tools/adoption/**`,
  CLI `paw/tools/validate-adoption.mjs`, fixtures/tests de adoption y conformance.
- Alcance cerrado:
  - repo, stack y runtime adapter contracts;
  - adoption record schema y validator;
  - assessment schema y validator;
  - exact adoption, supported variant, local exception, rejection, greenfield,
    brownfield y errores accionables en fixtures;
  - validacion de referencias a catalogos del patch 04;
  - reconciliacion de docs vivos y comandos deterministas.
- Alcance diferido:
  - adapters concretos de Codex, Claude Code y Antigravity;
  - integracion GitHub/VCS portable;
  - instalacion, distribucion, packaging y release automation;
  - pilotos greenfield/brownfield reales;
  - activacion de workflow v2 o `paw/parches/**`.

---

## 2. Rama obligatoria por tipo

### Si `patch_kind = spec`

- fuente viva reconciliada:
  - `README.md`
  - `AGENTS.md`
  - `docs/README.md`
  - `docs/governance/ARCHITECTURE.md`
  - `docs/governance/V1-TRANSITION.md`
  - `docs/governance/BOOTSTRAP-STATUS.md`
  - `paw/README.md`
  - `paw/adoption/**`
  - `paw/tools/README.md`
  - `paw/tests/README.md`
- cambio promovido:
  - `paw/adoption/**` owns portable adoption contracts.
  - `paw/tools/adoption/**` and `paw/tools/schemas/adoption/**` own adoption
    validation implementation and schemas.
  - `paw/tests/fixtures/adoption/**`, `paw/tests/contract/adoption-*.test.mjs`, and
    `tests/adoption-conformance.test.mjs` own adoption evidence and conformance.

### Si `patch_kind = batch`

- No aplica.

---

## 3. Artifacts revisados

- `patch.yaml`
- `handover.md`
- `definicion.md`
- `plan.md`
- `tasks.md`
- `backlog/fase1.md`
- `backlog/fase2.md`
- `backlog/fase3.md`
- `backlog/fase4.md`
- `backlog/fase5.md`
- `decision.log`

Todos los backlogs estan `done`.

---

## 4. Decisiones relevantes

- decision: basar patch 05 en la branch cerrada de patch 04.
  - fuente: `decision.log`
  - impacto: adoption validation pudo referenciar catalogos vivos de `paw/catalogs/**`.
- decision: aplicar la politica provisional de commits de `paw-foundation`.
  - fuente: instruccion humana y `decision.log`
  - impacto: preparacion SDD, fases cerradas y cierre se versionaron por intencion.
    La doctrina portable queda diferida a `paw-08-vcs-pr-integration`.
- decision: usar `paw/adoption/**` como superficie dedicada.
  - fuente: `decision.log`
  - impacto: adoption contracts no se mezclan con micro-core, catalogos, tests,
    tooling, runtime integrations o governance local.

---

## 5. Assumptions, blockers y findings

### Assumptions

- `paw/adoption/**` puede existir como contrato portable sin activar adoption
  automation ni workflow v2: confirmado por docs vivos y conformance.
- Node.js standard library es suficiente para validation: confirmado; no se agregaron
  dependencias.
- References a catalogos del patch 04 son suficientes para validar presets y
  variants: confirmado por adoption fixture matrix.

### Blockers

- Ninguno al cierre.

### Findings

- Finding: adoption fixtures son un nuevo dominio y no deben ser leidos por el patch
  fixture runner.
  - evidencia: fallo inicial de `node paw/tools/validate-patches.mjs --fixtures --json`.
  - impacto: `validate-fixtures.mjs` ahora excluye `/adoption/`, preservando 20
    patch fixtures.
- Finding: `tests/core-contracts.test.mjs` era sensible a LF exacto en fenced YAML.
  - evidencia: fallo previo de suite global en checkout Windows.
  - impacto: el test acepta CRLF sin cambiar `paw/core/**`.
- Finding: docs vivos no registraban adoption contracts ni validator antes de Fase 5.
  - evidencia: Fase 5 backlog.
  - impacto: README, AGENTS, transition, bootstrap, tools/tests docs y conformance
    fueron reconciliados.

---

## 6. Drift

- drift:
  - categoria: `operational`
  - fuente esperada: patch fixture runner valida solo fixtures de patch.
  - diferencia encontrada: adoption fixtures fueron descubiertos por el runner de
    patch fixtures.
  - accion: exclusion de `/adoption/` en runner y test contractual.
  - estado: `resolved`
- drift:
  - categoria: `validation`
  - fuente esperada: conformance estable en checkout Windows.
  - diferencia encontrada: regex LF-only para fenced YAML.
  - accion: regex CRLF-safe en `tests/core-contracts.test.mjs`.
  - estado: `resolved`
- drift:
  - categoria: `contractual`
  - fuente esperada: docs vivos reflejan superficies materializadas.
  - diferencia encontrada: adoption contracts, schemas, validator y tests no estaban
    registrados antes de Fase 5.
  - accion: reconciliacion de docs vivos y conformance.
  - estado: `resolved`

---

## 7. Reconciliacion de fuente viva

- fuente viva afectada: `docs/README.md`
  - cambio requerido: registrar `paw/adoption/**` como superficie contractual.
  - estado: `aplicado`
  - evidencia: canonical registry row para adoption contracts.
- fuente viva afectada: `docs/governance/ARCHITECTURE.md`
  - cambio requerido: agregar Adoption contracts como capa separada.
  - estado: `aplicado`
  - evidencia: layer table.
- fuente viva afectada: `README.md`, `AGENTS.md`, `V1-TRANSITION.md`,
  `BOOTSTRAP-STATUS.md`, `paw/README.md`, `paw/tools/README.md`, `paw/tests/README.md`
  - cambio requerido: registrar adoption materialization, validation commands y
    limites de no activacion.
  - estado: `aplicado`
  - evidencia: Fase 5 commit y `tests/adoption-conformance.test.mjs`.

---

## 8. Validaciones

- validacion: SDD repo validation
  - tipo: `automated`
  - comando o revision: `node sdd/tools/validate-sdd.mjs`
  - resultado esperado: pass
  - resultado obtenido: `SDD repo validation passed`
  - estado: `pass`
  - evidencia: Fase 5 validation run.
- validacion: SDD fixtures
  - tipo: `automated`
  - comando o revision: `node sdd/tools/validate-sdd.mjs --fixtures`
  - resultado esperado: pass
  - resultado obtenido: `SDD fixture validation passed`
  - estado: `pass`
  - evidencia: Fase 5 validation run.
- validacion: patch repository validation
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-patches.mjs --json`
  - resultado esperado: pass
  - resultado obtenido: pass; 5 patches; schema v1 transitional warnings.
  - estado: `pass`
  - evidencia: Fase 5 validation run.
- validacion: patch fixture validation
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-patches.mjs --fixtures --json`
  - resultado esperado: pass
  - resultado obtenido: pass; 20 patch fixtures.
  - estado: `pass`
  - evidencia: Fase 5 validation run.
- validacion: catalog validation
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-catalogs.mjs --json`
  - resultado esperado: pass
  - resultado obtenido: pass.
  - estado: `pass`
  - evidencia: Fase 5 validation run.
- validacion: catalog fixture validation
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-catalogs.mjs --fixtures --json`
  - resultado esperado: pass
  - resultado obtenido: pass; 15 catalog fixtures.
  - estado: `pass`
  - evidencia: Fase 5 validation run.
- validacion: adoption fixture validation
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  - resultado esperado: pass
  - resultado obtenido: pass; 6 adapter, 6 record y 5 assessment fixtures.
  - estado: `pass`
  - evidencia: Fase 5 validation run.
- validacion: complete contract and conformance suite
  - tipo: `automated`
  - comando o revision: `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
  - resultado esperado: pass
  - resultado obtenido: 82 tests, 82 pass.
  - estado: `pass`
  - evidencia: Fase 5 validation run.
- validacion: whitespace
  - tipo: `automated`
  - comando o revision: `git diff --check`
  - resultado esperado: pass
  - resultado obtenido: pass; LF/CRLF notices only.
  - estado: `pass`
  - evidencia: Fase 5 validation run.
- validacion: no activation review
  - tipo: `manual`
  - comando o revision: review of docs, `paw/parches/**`, runtime adapter surfaces,
    packaging/release claims, and workflow boundaries.
  - resultado esperado: no v2 workflow, runtime adapter, packaging or portability
    activation.
  - resultado obtenido: conforme.
  - estado: `pass`
  - evidencia: `tests/adoption-conformance.test.mjs` and live docs.

---

## 9. Riesgos residuales

- riesgo: adoption contracts may be mistaken for ready adoption automation.
  - impacto: premature consumer repo adoption before pilots and cutover.
  - mitigacion: docs and conformance state materialization without activation.
- riesgo: JSON schemas are descriptive while detailed enforcement lives in Node.js.
  - impacto: consumers reading only schemas may miss cross-responsibility rules.
  - mitigacion: README files point to deterministic validator; fixtures cover guards.
- riesgo: concrete runtime adapters remain absent.
  - impacto: multi-runtime portability is still unproven.
  - mitigacion: deferred to patches 07 and 10 plus pilots 11-13.

---

## 10. Pendientes

- pendiente: workflow, bootstrap roles and conformance integration.
  - owner: `paw-06-workflow-conformance`
  - razon: siguiente patch in sequence.
- pendiente: concrete Codex runtime adapter and tooling integration.
  - owner: `paw-07-codex-runtime-tooling`
  - razon: explicitly out of scope for patch 05.
- pendiente: portable VCS/PR integration.
  - owner: `paw-08-vcs-pr-integration`
  - razon: provisional commit policy is not portable doctrine.
- pendiente: Claude Code and Antigravity adapters and portability gates.
  - owner: `paw-10-claude-antigravity-adapters` and pilots 11-13
  - razon: patch 05 only defines portable contracts.

---

## 11. Criterio de cierre

- [x] fases seleccionadas cerradas o diferidas con razon
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] decisiones relevantes registradas
- [x] drift clasificado y resuelto o diferido
- [x] validaciones registradas
- [x] fuente viva reconciliada o marcada no aplicable
- [x] riesgos residuales visibles

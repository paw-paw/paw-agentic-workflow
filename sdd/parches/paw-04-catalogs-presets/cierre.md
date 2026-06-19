# Cierre: paw-04-catalogs-presets

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

- Change id: `paw-04-catalogs-presets`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Status final: `closed`
- Fecha de cierre: `2026-06-15`
- Owner: sesion Codex activa con aprobacion humana
- Nivel de cierre: `anchored`

---

## 1. Resumen

- Objetivo original: crear catalogos portables para clasificar software, componer
  necesidades documentales y seleccionar golden paths sin convertir PAW en una matriz
  libre de tecnologias.
- Resultado ejecutado: materializados `paw/catalogs/**`, schemas, validators,
  fixtures, conformance, guides y docs vivos para familias, capabilities,
  documentation presets, modifiers e implementation presets.
- Alcance cerrado:
  - 8 software families;
  - 22 documentation capabilities;
  - 8 documentation presets;
  - 11 component profiles and 10 concerns;
  - 11 implementation presets, 17 variants and 31 official source records;
  - catalog validator and fixture runner;
  - live docs reconciled without activation claims.
- Alcance diferido: adoption records, assessments, role/workflow semantics, execution
  skills, portable VCS policy, packaging, runtime adapters, pilots and cutover.

---

## 2. Rama obligatoria por tipo

### `patch_kind = spec`

- Fuente viva reconciliada:
  - `docs/README.md`
  - `README.md`
  - `docs/governance/ARCHITECTURE.md`
  - `docs/governance/V1-TRANSITION.md`
  - `docs/governance/BOOTSTRAP-STATUS.md`
  - `paw/README.md`
  - `paw/catalogs/README.md`
  - `paw/tools/README.md`
  - `paw/tests/README.md`
- Cambio promovido: `paw/catalogs/**` now owns portable catalog contracts, while
  `paw/tools/**` and `paw/tests/**` own deterministic validation and evidence.
  Materialization does not activate adoption, v2 workspaces, v2 writers, runtime
  adapters, packaging, releases or portability claims.

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

- Materialize portable catalogs under `paw/catalogs/**`.
  - fuente: `decision.log`
  - impacto: new authoritative catalog surface, with schemas/tools/tests kept separate.
- Use semantic canonical identifiers.
  - fuente: `decision.log`
  - impacto: research IDs remain provenance aliases, not normative IDs.
- Approve software family, capability, documentation preset, modifier and
  implementation preset identifiers.
  - fuente: `decision.log` and phase backlogs
  - impacto: validators reject unknown canonical IDs.
- Share universal requirements across documentation presets.
  - fuente: `decision.log`
  - impacto: avoids duplicated doctrine across family presets.
- Keep applied modifier instances outside canonical definitions.
  - fuente: `decision.log`
  - impacto: modifier catalog remains portable and adoption-neutral.
- Approve implementation support policy with 180-day maximum review age.
  - fuente: `decision.log`
  - impacto: presets reject floating references and stale evidence.
- Interpret heterogeneous upstream lifecycle evidence conservatively.
  - fuente: `decision.log`
  - impacto: release-only dependencies use locked stable release requirements rather
    than fabricated support windows.

---

## 5. Assumptions, blockers y findings

### Assumptions

- No critical assumptions remain open.

### Blockers

- Gate de IDs y support policies.
  - estado: resuelto.
  - resolucion o razon de diferimiento: approved by human patch owner and recorded in
    `decision.log`.
- Temporary environment usage limit during Phase 4 commit.
  - estado: resuelto.
  - resolucion o razon de diferimiento: work resumed after limit reset; no workaround
    or history rewrite was used.

### Findings

- Upstream lifecycle models differ across technology ecosystems.
  - evidencia: 31 source records in
    `paw/catalogs/implementation-presets/catalog.json`.
  - impacto: implementation presets record explicit stable lines where possible and
    locked stable release requirements otherwise.
- Live docs lagged behind materialized catalog reality before Phase 5.
  - evidencia: `backlog/fase5.md` drift record.
  - impacto: README, transition, bootstrap, tools/tests docs and conformance were
    reconciled before closure.

---

## 6. Drift

- drift:
  - categoria: `contractual`
  - fuente esperada: live docs should reflect the new catalog surface and validator.
  - diferencia encontrada: status docs and validation lists still reflected the
    patch 03-only state.
  - accion: reconciled `README.md`, `V1-TRANSITION.md`, `BOOTSTRAP-STATUS.md`,
    `paw/tools/README.md`, `paw/tests/README.md`, and conformance tests.
  - estado: resolved.

---

## 7. Reconciliacion de fuente viva

- fuente viva afectada: `docs/README.md`
  - cambio requerido: register `paw/catalogs/**` authority.
  - estado: `aplicado`
  - evidencia: canonical registry row for `paw/catalogs/**`.
- fuente viva afectada: `README.md`
  - cambio requerido: reflect catalog materialization and catalog validation commands.
  - estado: `aplicado`
  - evidencia: Current Status and Validation sections.
- fuente viva afectada: governance and PAW orientation docs.
  - cambio requerido: distinguish materialized catalogs/tools/tests from activation.
  - estado: `aplicado`
  - evidencia: architecture, transition, bootstrap, tools and tests docs.
- fuente viva afectada: `paw/core/**`
  - cambio requerido: none.
  - estado: `no aplica`
  - evidencia: catalogs remain outside the micro-core by design.

---

## 8. Validaciones

- validacion: SDD repo validation
  - tipo: `automated`
  - comando o revision: `node sdd/tools/validate-sdd.mjs`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: final Phase 5 validation run.
- validacion: SDD fixtures
  - tipo: `automated`
  - comando o revision: `node sdd/tools/validate-sdd.mjs --fixtures`
  - resultado esperado: pass
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: final Phase 5 validation run.
- validacion: patch repository validation
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-patches.mjs --json`
  - resultado esperado: pass
  - resultado obtenido: pass; 4 patches
  - estado: `pass`
  - evidencia: final Phase 5 validation run.
- validacion: patch fixture validation
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-patches.mjs --fixtures --json`
  - resultado esperado: pass
  - resultado obtenido: pass; 20 fixtures
  - estado: `pass`
  - evidencia: final Phase 5 validation run.
- validacion: canonical catalog validation
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-catalogs.mjs --json`
  - resultado esperado: pass
  - resultado obtenido: pass; 8 families, 22 capabilities, 8 documentation presets,
    11 components, 10 concerns, 11 implementation presets, 17 variants and 31 source
    records.
  - estado: `pass`
  - evidencia: final Phase 5 validation run.
- validacion: catalog fixture validation
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-catalogs.mjs --fixtures --json`
  - resultado esperado: pass
  - resultado obtenido: pass; 33 catalog fixtures.
  - estado: `pass`
  - evidencia: final Phase 5 validation run.
- validacion: complete contract and conformance suite
  - tipo: `automated`
  - comando o revision: `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
  - resultado esperado: pass
  - resultado obtenido: 67 tests, 67 pass
  - estado: `pass`
  - evidencia: final Phase 5 validation run.
- validacion: whitespace
  - tipo: `automated`
  - comando o revision: `git diff --check`
  - resultado esperado: pass
  - resultado obtenido: pass; LF/CRLF notices only
  - estado: `pass`
  - evidencia: final Phase 5 validation run.
- validacion: source and activation review
  - tipo: `manual`
  - comando o revision: manager review of source records, guides and live status docs
  - resultado esperado: no floating versions, no activation, no portability/release claim
  - resultado obtenido: pass
  - estado: `pass`
  - evidencia: implementation preset validator, conformance tests and live docs.

---

## 9. Riesgos residuales

- riesgo: source freshness for implementation presets can become stale.
  - impacto: presets may need review before future adoption decisions.
  - mitigacion: `review_by`, source records, 180-day maximum review age and reopen
    triggers.
- riesgo: future adoption work may mistake catalogs for repository assessment output.
  - impacto: premature recommendation or stack selection.
  - mitigacion: adoption records and assessments deferred to `paw-05`; docs state
    catalogs are reusable contracts, not adoption automation.
- riesgo: role semantics and workflow conformance remain incomplete.
  - impacto: documentation roles referenced by catalogs are not fully portable yet.
  - mitigacion: deferred to `paw-06-workflow-conformance`.

---

## 10. Pendientes

- pendiente: adoption records and assessments.
  - owner: `paw-05-adapter-adoption-contracts`
  - razon: explicitly outside patch 04 scope.
- pendiente: role semantics and general workflow conformance.
  - owner: `paw-06-workflow-conformance`
  - razon: referenced but not implemented by this patch.
- pendiente: execution skills, shared toolkit, portable VCS policy, packaging,
  runtime adapters, pilots and cutover.
  - owner: patches 07-14
  - razon: deferred by foundation sequence.

---

## 11. Criterio de cierre

- [x] fases seleccionadas cerradas o diferidas con razon
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] decisiones relevantes registradas
- [x] drift clasificado y resuelto o diferido
- [x] validaciones registradas
- [x] fuente viva reconciliada o marcada no aplicable
- [x] riesgos residuales visibles

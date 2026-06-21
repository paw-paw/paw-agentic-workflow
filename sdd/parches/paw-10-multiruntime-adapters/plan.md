# Plan: paw-10-multiruntime-adapters

---

## Estado

- Change id: `paw-10-multiruntime-adapters`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-tasks`
- Ultima actualizacion: 2026-06-21
- Owner: sesion Codex activa
- Depende de: `paw-09-manual-distribution` closed on `main`
- Desbloquea: `paw-11-pilot-portfolio-codex`

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-10-multiruntime-adapters/patch.yaml`
- `sdd/parches/paw-10-multiruntime-adapters/definicion.md`
- `sdd/parches/paw-10-multiruntime-adapters/decision.log`
- `paw/adoption/**`
- `paw/orchestration/**`
- `paw/distribution/**`
- `.codex/**`
- Official Claude Code docs checked on 2026-06-21.
- Official Antigravity public site checked on 2026-06-21.

---

## 2. Lectura brownfield

- estructura existente: `paw/adoption/adapters/README.md` defines repo, stack,
  and runtime adapter responsibilities; `runtime-adapter.schema.json` and
  `validate-adapters.mjs` validate the current minimal runtime adapter shape.
- patrones existentes: adapter fixtures live under
  `paw/tests/fixtures/adoption/adapters/**`; contract tests use `node:test`;
  validators return structured diagnostics through shared helpers.
- deuda o drift relevante: no concrete Codex/Claude/Antigravity runtime adapter
  fixtures exist yet; `.codex/paw-runtime-map.json` is Codex-only candidate
  evidence.
- restricciones tecnicas: do not create `.agents/**`; do not activate
  `paw/parches/**`; do not make Antigravity physical path claims without
  official evidence.

---

## 3. Assumptions

- No critical assumptions beyond those recorded in `definicion.md`.

---

## 4. Zonas afectadas

### Docs

- `paw/adoption/README.md`
- `paw/adoption/adapters/README.md`
- `paw/distribution/manifest.md`
- `paw/distribution/progressive-loading.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/tools/README.md`
- `paw/tests/README.md`

### Codigo

- `paw/tools/adoption/validate-adapters.mjs`
- optional helper data under `paw/adoption/adapters/runtime/*.json`

### Configuracion, tests o build

- `paw/tools/schemas/adoption/runtime-adapter.schema.json`
- `paw/tests/fixtures/adoption/adapters/**`
- `paw/tests/contract/adoption-adapters.test.mjs`
- `paw/distribution/distribution-manifest.json`

---

## 5. Bloques de implementacion

### Bloque 1 - Runtime adapter evidence model

- Objetivo: extend the runtime adapter contract enough to represent operation
  mappings, capability support, source freshness, and blocked gaps.
- Superficies afectadas: `paw/adoption/adapters/README.md`,
  `runtime-adapter.schema.json`, `validate-adapters.mjs`,
  adapter fixtures and tests.
- Cambios esperados: required or validated fields for `operation_mappings`,
  `capability_matrix`, `source_freshness`, `gap_disposition`, and
  `activation`.
- Dependencias: official source evidence from intake.
- Riesgos: overfitting schema to one runtime.
- Validaciones asociadas: `node --test paw/tests/contract/adoption-adapters.test.mjs`,
  `node paw/tools/validate-adoption.mjs --fixtures --json`.

### Bloque 2 - Concrete runtime adapter fixtures

- Objetivo: add structurally valid runtime mappings for Codex, Claude Code, and
  Antigravity, plus invalid cases for forbidden semantic drift and hidden gaps.
- Superficies afectadas: `paw/tests/fixtures/adoption/adapters/**`,
  optional `paw/adoption/adapters/runtime/*.json`.
- Cambios esperados: fixture count updated; Antigravity blocked paths explicit;
  Claude Code paths and capabilities sourced to official docs.
- Dependencias: Bloque 1.
- Riesgos: confusing fixtures with authority.
- Validaciones asociadas: adoption adapter contract tests.

### Bloque 3 - Documentation and opt-in boundary

- Objetivo: document runtime adapter responsibilities, source freshness, v2
  candidate opt-in, and no-default-activation.
- Superficies afectadas: adoption docs, transition/status docs, distribution
  progressive loading, tools/tests READMEs.
- Cambios esperados: readers can distinguish runtime adapters from workflow,
  stack, packaging, and release claims.
- Dependencias: Bloque 2 evidence.
- Riesgos: duplicating core/orchestration doctrine in adapter docs.
- Validaciones asociadas: governance tests, manual doc review.

### Bloque 4 - Distribution manifest reconciliation

- Objetivo: keep the candidate distribution manifest and checksums aligned if
  new adapter files are distributed.
- Superficies afectadas: `paw/distribution/distribution-manifest.json`,
  `paw/distribution/manifest.md`.
- Cambios esperados: manifest includes new adapter docs/data/tests/tools where
  appropriate and remains candidate.
- Dependencias: finalized file list.
- Riesgos: manifest checksum drift.
- Validaciones asociadas: distribution validators and tests.

### Bloque 5 - Integral validation and closure

- Objetivo: execute relevant and repository-mandated checks, record closure, and
  classify residual gaps.
- Superficies afectadas: SDD backlogs and `cierre.md`.
- Cambios esperados: patch closed with validation evidence and explicit risks.
- Dependencias: Bloques 1-4 complete.
- Riesgos: slow full validation.
- Validaciones asociadas: full `AGENTS.md` matrix plus `git diff --check`.

---

## 6. Datos, schemas y contratos

- Contratos documentales afectados: adoption runtime adapters, transition
  status, distribution progressive loading.
- Datos o contenido afectados: runtime adapter fixture JSON and optional
  canonical adapter JSON.
- Schemas o modelos afectados: runtime adapter schema and validator semantics.
- Compatibilidad esperada: existing generic runtime adapter fixtures remain valid
  after adding stricter checks with backward-compatible defaults only where safe.

---

## 7. Validaciones previstas

### Documentales

- [x] verificar alineacion con `docs/README.md`
- [ ] verify no activation of `paw/parches/**`, `.agents/**`, packaging,
  releases, Pages, Actions, or deployment.

### Tecnicas

- [ ] `node paw/tools/validate-adoption.mjs --fixtures --json`
- [ ] `node paw/tools/validate-distribution.mjs --json`
- [ ] `node paw/tools/validate-distribution.mjs --fixtures --json`
- [ ] `node --test paw/tests/contract/adoption-adapters.test.mjs`
- [ ] full `AGENTS.md` validation matrix

### Manuales

- [ ] official Claude Code source freshness review.
- [ ] official Antigravity public-source gap review.

---

## 8. Riesgos y mitigaciones

- riesgo: schema changes break existing adoption fixtures.
  - impacto: adoption validation fails.
  - mitigacion: add explicit fields to all valid runtime fixtures and test invalid
    behavior.
- riesgo: Antigravity adapter cannot be physically installable.
  - impacto: partial adapter only.
  - mitigacion: mark technical path mapping blocked and carry residual risk.
- riesgo: adapter docs imply default v2 activation.
  - impacto: transition boundary breach.
  - mitigacion: require `candidate-opt-in` activation state in adapters and docs.

---

## 9. Decisiones humanas abiertas

- Estado: `none`

---

## 10. Criterio de cierre tecnico

- [x] el alcance respeta `definicion.md`
- [x] las zonas afectadas estan identificadas
- [x] los bloques de implementacion son secuenciables
- [x] las validaciones son reales y proporcionales
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] no hay decisiones abiertas que bloqueen la division en fases

---

## 11. Registro de cambios

- Fecha: 2026-06-21
  - cambio: plan tecnico brownfield creado.
  - razon: habilitar `sdd-tasks`.

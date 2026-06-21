# Tasks: paw-10-multiruntime-adapters

---

## Estado

- Change id: `paw-10-multiruntime-adapters`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-backlog`
- Ultima actualizacion: 2026-06-21
- Owner: sesion Codex activa

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `sdd/parches/paw-10-multiruntime-adapters/patch.yaml`
- `sdd/parches/paw-10-multiruntime-adapters/definicion.md`
- `sdd/parches/paw-10-multiruntime-adapters/plan.md`
- `sdd/parches/paw-10-multiruntime-adapters/decision.log`

---

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas antes de dividir fases
- [x] no hay decisiones abiertas bloqueantes

---

## 3. Resumen del plan

- resumen: extend adoption runtime adapter evidence, add concrete Codex,
  Claude Code, and Antigravity mappings, document opt-in boundaries, reconcile
  distribution manifest, then validate and close.

---

## 4. Fases

### Fase 1 - Runtime adapter model and fixtures

- Objetivo: make runtime adapter evidence explicit and verifiable for Codex,
  Claude Code, and Antigravity.
- Origen en `plan.md`: Bloques 1 and 2.
- Precondiciones: official source review recorded in definition; no blocking
  source conflict.
- Tareas:
  - extend runtime adapter schema and validator for operation mappings,
    capability matrix, source freshness, gap disposition, and activation state;
  - add or update valid runtime fixtures for Codex, Claude Code, and
    Antigravity;
  - add invalid fixture coverage for hidden blocked gaps or default activation;
  - update adoption adapter contract tests and fixture counts.
- Archivos o areas probables:
  - `paw/tools/schemas/adoption/runtime-adapter.schema.json`
  - `paw/tools/adoption/validate-adapters.mjs`
  - `paw/tests/fixtures/adoption/adapters/**`
  - `paw/tests/contract/adoption-adapters.test.mjs`
- Validaciones:
  - `node --test paw/tests/contract/adoption-adapters.test.mjs`
  - `node paw/tools/validate-adoption.mjs --fixtures --json`
- Criterio de cierre: all three runtime mappings are valid and invalid drift
  cases fail deterministically.

### Fase 2 - Adapter documentation and opt-in boundary

- Objetivo: promote the runtime adapter semantics and boundaries into live docs.
- Origen en `plan.md`: Bloque 3.
- Precondiciones: Fase 1 evidence exists.
- Tareas:
  - document source freshness and gap disposition in adoption adapter docs;
  - update status/transition docs to show concrete runtime adapters as candidate
    evidence, not default activation;
  - update tools/tests READMEs with new validation scope;
  - keep orchestration and core untouched unless drift is found.
- Archivos o areas probables:
  - `paw/adoption/README.md`
  - `paw/adoption/adapters/README.md`
  - `docs/governance/V1-TRANSITION.md`
  - `docs/governance/BOOTSTRAP-STATUS.md`
  - `paw/tools/README.md`
  - `paw/tests/README.md`
- Validaciones:
  - `node --test tests/foundation-governance.test.mjs`
  - manual no-activation review.
- Criterio de cierre: docs state candidate opt-in without claiming full
  portability or changing default workflow.

### Fase 3 - Distribution and progressive loading reconciliation

- Objetivo: keep manual distribution and progressive loading aligned with new
  adapter artifacts.
- Origen en `plan.md`: Bloque 4.
- Precondiciones: final adapter file list known.
- Tareas:
  - update distribution docs if new adapter artifacts are included;
  - update distribution manifest/checksums;
  - document runtime-specific progressive loading boundaries;
  - validate manifest and fixtures.
- Archivos o areas probables:
  - `paw/distribution/manifest.md`
  - `paw/distribution/progressive-loading.md`
  - `paw/distribution/distribution-manifest.json`
- Validaciones:
  - `node paw/tools/validate-distribution.mjs --json`
  - `node paw/tools/validate-distribution.mjs --fixtures --json`
- Criterio de cierre: distribution validation passes and no stable release or
  packaging claim appears.

### Fase 4 - Integral validation and closure

- Objetivo: verify the whole patch, record residual gaps, and close.
- Origen en `plan.md`: Bloque 5.
- Precondiciones: Fases 1-3 done.
- Tareas:
  - run full `AGENTS.md` validation matrix and `git diff --check`;
  - classify source freshness and residual Antigravity gaps;
  - create `cierre.md`;
  - set `patch.yaml` status to `closed`.
- Archivos o areas probables:
  - `sdd/parches/paw-10-multiruntime-adapters/**`
- Validaciones:
  - full repository deterministic validation matrix.
- Criterio de cierre: patch has no unresolved blockers, all validation results
  are classified, and residual risks are explicit.

---

## 5. Dependencias entre fases

- Fase 1 bloquea: Fase 2 and Fase 3.
- Fase 2 bloquea: Fase 4.
- Fase 3 bloquea: Fase 4.

---

## 6. Decisiones y bloqueos

- decisiones abiertas bloqueantes: none.
- decisiones abiertas no bloqueantes: none.

---

## 7. Validaciones globales

- [ ] full `AGENTS.md` deterministic matrix
- [ ] `git diff --check`
- [ ] manual official-source freshness review
- [ ] manual no-default-activation review

---

## 8. Criterio de cierre

- [x] cada fase tiene objetivo, precondiciones, tareas, validaciones y criterio de cierre
- [x] cada tarea es trazable al `plan.md`
- [x] las validaciones son reales

---

## 9. Registro de cambios

- Fecha: 2026-06-21
  - cambio: tareas macro creadas.
  - razon: habilitar backlogs de fase.

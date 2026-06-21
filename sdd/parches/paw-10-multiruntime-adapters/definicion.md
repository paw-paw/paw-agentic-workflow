# Definicion: paw-10-multiruntime-adapters

---

## Estado

- Change id: `paw-10-multiruntime-adapters`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `active`
- Fuente: `_inbox/final/10-claude-antigravity-adapters-handoff.md`
- Ultima actualizacion: 2026-06-21
- Owner: sesion Codex activa con subagentes SDD read-only

---

## 1. Objetivo

Materializar adapters runtime para Claude Code y Antigravity contra el modelo
portable PAW ya representado por Codex candidate. El patch debe separar
capacidad semantica de identidad fisica de archivos, registrar fuentes oficiales
vigentes, validar fixtures equivalentes y mantener el default SDD v1 activo hasta
cutover. Al cerrar, PAW v2 puede quedar disponible solo como opt-in candidate
para pilotos, sin dual-write ni activacion general.

---

## 2. No objetivos

- Activar `paw/parches/**` como workspace default.
- Declarar portabilidad completa o release estable.
- Migrar patches historicos.
- Cambiar familias, documentation presets, implementation presets, arquitectura
  o stack por diferencias de runtime.
- Crear packaging, marketplace, auto-update, Pages, Actions o deployment.
- Inventar rutas Antigravity no documentadas oficialmente.

---

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/adoption/README.md`
- `paw/adoption/adapters/README.md`
- `paw/orchestration/workflow.md`
- `paw/orchestration/bootstrap.md`
- `paw/orchestration/conformance.md`
- `paw/distribution/README.md`
- `paw/distribution/manifest.md`
- `paw/distribution/progressive-loading.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `.codex/README.md`
- `.codex/paw-runtime-map.json`
- `_inbox/final/README.md`
- `_inbox/final/patch-execution-guide.md`
- `_inbox/final/10-claude-antigravity-adapters-handoff.md`
- Official Claude Code documentation checked on 2026-06-21:
  `https://code.claude.com/docs/en/skills`,
  `https://code.claude.com/docs/en/sub-agents`,
  `https://code.claude.com/docs/en/hooks`.
- Official Antigravity public site checked on 2026-06-21:
  `https://antigravity.google/`.

---

## 4. Alcance

### Si entra

- [x] Runtime adapter contract clarification for concrete runtime capability
  mappings.
- [x] Claude Code adapter evidence based on current official docs.
- [x] Antigravity adapter evidence with explicit blocked or fallback fields where
  official technical paths are unavailable.
- [x] Capability matrix covering Codex, Claude Code, and Antigravity.
- [x] Fixtures and deterministic validation for runtime adapter equivalence.
- [x] Documentation of source freshness and no-default-activation boundary.
- [x] Distribution manifest update if new adapter artifacts become distributed
  candidate files.

### Fuera de alcance

- [x] Physical installation into Claude Code or Antigravity.
- [x] Claiming byte-for-byte equivalence across runtimes.
- [x] New portable workflow operations.
- [x] Changing active SDD v1 skills, writers, or workspace root.

---

## 5. Superficies afectadas

### Docs

- `paw/adoption/README.md`
- `paw/adoption/adapters/README.md`
- `paw/distribution/manifest.md`
- `paw/distribution/progressive-loading.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `docs/governance/V1-TRANSITION.md`
- `paw/tools/README.md`
- `paw/tests/README.md`

### Codigo o contenido

- `paw/adoption/adapters/runtime/*.json`
- optional runtime adapter README or matrix under `paw/adoption/adapters/`
- `paw/distribution/distribution-manifest.json`

### Configuracion o validacion

- `paw/tools/adoption/validate-adapters.mjs`
- `paw/tools/schemas/adoption/runtime-adapter.schema.json`
- `paw/tests/fixtures/adoption/adapters/**`
- `paw/tests/contract/adoption-adapters.test.mjs`

---

## 6. Decisiones conocidas

- decision: execute this patch on `main` without creating a branch.
  - razon: explicit human instruction.
  - documentos o areas afectadas: `decision.log`, SDD artifacts, final report.
- decision: represent Antigravity unsupported technical paths as blocked, not
  invented.
  - razon: handoff requires official capability investigation and gap reporting.
  - documentos o areas afectadas: runtime adapter fixtures, capability matrix,
    closure risk.

---

## 7. Assumptions

- Current Claude Code docs are stable enough to model project skills under
  `.claude/skills/<name>/SKILL.md`, custom subagents, hooks, progressive
  disclosure, and skill-scoped tool controls.
- The Antigravity public site is enough to record high-level agent/artifact
  capability evidence, but not enough to define installable local PAW paths.
- Existing adoption runtime adapter schemas may be extended without changing
  higher-layer methodology.

---

## 8. Decisiones abiertas

- None blocking.

---

## 9. Riesgos

- riesgo: overclaiming multi-runtime portability before pilots.
  - impacto: contradiction with pre-alpha status and patch 14 cutover gate.
  - mitigacion: use `candidate-opt-in` and keep explicit no-default-activation
    text in docs and closure.
- riesgo: Antigravity documentation remains too thin for a physical adapter.
  - impacto: only a blocked adapter mapping can be delivered.
  - mitigacion: document official source, freshness date, fallback, and blockers.
- riesgo: new adapter artifacts make the distribution manifest stale.
  - impacto: distribution validation fails.
  - mitigacion: update manifest and rerun distribution validators.

---

## 10. Criterio de cierre

La definicion queda lista para `sdd-plan` solo si:

- [x] objetivo y no objetivos estan claros
- [x] las fuentes de verdad aplicables estan listadas
- [x] el alcance y fuera de alcance no se contradicen
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] las decisiones abiertas estan visibles
- [x] los riesgos principales estan identificados

---

## 11. Registro de cambios

- Fecha: 2026-06-21
  - cambio: intake inicial creado.
  - razon: inicio formal de `paw-10-multiruntime-adapters`.

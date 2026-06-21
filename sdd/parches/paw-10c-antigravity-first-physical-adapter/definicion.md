# Definicion: paw-10c-antigravity-first-physical-adapter

---

## Estado

- Change id: `paw-10c-antigravity-first-physical-adapter`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `active`
- Fuente: `_inbox/final/10-handoff-expansion/03_antigravity.md`
- Ultima actualizacion: 2026-06-21
- Owner: sesion Codex activa

---

## 1. Objetivo

Materializar un adapter fisico Antigravity-first bajo `.agents/**` como archivos
candidate versionables. El patch debe crear workspace skills, rules y workflows
acotados, actualizar la evidencia declarativa de Antigravity, y cerrar sin
declarar soporte estable ni activar PAW v2.

---

## 2. No objetivos

- [x] Crear `.gemini/**` o depender de Gemini CLI.
- [x] Crear `.antigravity/**`.
- [x] Crear plugin o distribution adapter Antigravity.
- [x] Reemplazar `.codex/**`.
- [x] Declarar `supported` o portabilidad completa.

---

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `docs/governance/NAMING.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/adoption/adapters/README.md`
- `paw/adoption/adapters/runtime/antigravity.json`
- `paw/orchestration/workflow.md`
- `paw/orchestration/conformance.md`
- `paw/distribution/manifest.md`
- `paw/distribution/progressive-loading.md`
- `_inbox/final/10-handoff-expansion/03_antigravity.md`

---

## 4. Alcance

### Si entra

- [x] `.agents/skills/paw-*` candidate skills.
- [x] `.agents/rules/paw-*.md` runtime boundary rules.
- [x] `.agents/workflows/paw-*.md` only as thin workflow hints.
- [x] Update `paw/adoption/adapters/runtime/antigravity.json`.
- [x] Distribution manifest/docs reconciliation if `.agents/**` becomes part of
  the candidate distribution inventory.

### Fuera de alcance

- [x] Runtime validation in Antigravity UI.
- [x] Hooks, plugin, MCP, marketplace, release, deployment.

---

## 5. Superficies afectadas

### Docs

- `paw/adoption/adapters/README.md`
- `paw/distribution/manifest.md`
- `paw/distribution/progressive-loading.md`

### Codigo o contenido

- `.agents/skills/paw-*/SKILL.md`
- `.agents/rules/paw-*.md`
- `.agents/workflows/paw-*.md`
- `paw/adoption/adapters/runtime/antigravity.json`

### Configuracion o validacion

- `paw/distribution/distribution-manifest.json`
- adoption and distribution validators.

---

## 6. Decisiones conocidas

- decision: use `.agents/**` only as Antigravity candidate physical surface.
  - razon: private handoff selects `.agents/**`; live docs still keep `.codex/**`
    as Codex runtime surface.
  - documentos o areas afectadas: `.agents/**`, `docs/governance/NAMING.md`.
- decision: close as `physical-files-candidate` unless runtime validation is
  executed.
  - razon: Antigravity local discovery cannot be proven by static files.
  - documentos o areas afectadas: closure and downstream `paw-10d` gate.
- decision: use `paw-conformance` instead of `paw-verify`.
  - razon: avoid introducing an ungovened portable operation.
  - documentos o areas afectadas: `.agents/skills/**`.

---

## 7. Assumptions

- The corrected handoff is accepted as current input for `.agents/**` materialization.
- Public official Antigravity material is insufficient to validate runtime
  discovery in this session.

---

## 8. Decisiones abiertas

- None blocking for creating candidate files.

---

## 9. Riesgos

- riesgo: `.agents/**` could be mistaken as a replacement for `.codex/**`.
  - impacto: local runtime boundary confusion.
  - mitigacion: rules and docs state Antigravity candidate-only.
- riesgo: Antigravity runtime discovery is not validated.
  - impacto: downstream distribution remains blocked.
  - mitigacion: close as `physical-files-candidate`.

---

## 10. Criterio de cierre

- [x] objetivo y no objetivos estan claros
- [x] fuentes aplicables listadas
- [x] alcance y fuera de alcance no se contradicen
- [x] assumptions criticas clasificadas
- [x] riesgos principales identificados

---

## 11. Registro de cambios

- Fecha: 2026-06-21
  - cambio: intake inicial creado.
  - razon: inicio formal de `paw-10c`.

# Plan: paw-10c-antigravity-first-physical-adapter

---

## Estado

- Change id: `paw-10c-antigravity-first-physical-adapter`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-tasks`
- Ultima actualizacion: 2026-06-21
- Owner: sesion Codex activa
- Depende de: `paw-10-multiruntime-adapters`
- Desbloquea: `paw-10d-antigravity-distribution-adapter` only if closed as
  `physical-adapter-candidate`

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- patch artifacts
- `_inbox/final/10-handoff-expansion/03_antigravity.md`
- `paw/adoption/adapters/runtime/antigravity.json`
- `paw/orchestration/workflow.md`
- `paw/orchestration/conformance.md`

---

## 2. Lectura brownfield

- estructura existente: Antigravity currently has only declarative evidence with
  blocked local path gaps.
- patrones existentes: `.claude/**` physical adapter and `.codex/skills/paw-*`
  candidate skills provide compact skill structure.
- deuda o drift relevante: live adapter must be updated from blocked gap to
  physical-files-candidate evidence after `.agents/**` exists.
- restricciones tecnicas: no Gemini CLI, no `.antigravity/**`, no plugin.

---

## 3. Assumptions

- No critical assumptions beyond `definicion.md`.

---

## 4. Zonas afectadas

### Docs

- `paw/adoption/adapters/README.md`
- `paw/distribution/manifest.md`
- `paw/distribution/progressive-loading.md`

### Codigo

- `.agents/**`
- `paw/adoption/adapters/runtime/antigravity.json`

### Configuracion, tests o build

- `paw/distribution/distribution-manifest.json`

---

## 5. Bloques de implementacion

### Bloque 1 - Physical `.agents/**` files

- Objetivo: create skills, rules, and thin workflows.
- Superficies afectadas: `.agents/**`.
- Cambios esperados: candidate-only files with no default activation.
- Dependencias: handoff and live workflow docs.
- Riesgos: overclaiming runtime support.
- Validaciones asociadas: structural inspection and `git diff --check`.

### Bloque 2 - Evidence and distribution reconciliation

- Objetivo: update declarative adapter and manifest/docs.
- Superficies afectadas: adoption and distribution files.
- Cambios esperados: state becomes `physical-files-candidate`; runtime discovery
  remains manual.
- Dependencias: finalized `.agents/**` file list.
- Riesgos: implying plugin distribution.
- Validaciones asociadas: adoption/distribution validators.

### Bloque 3 - Closure

- Objetivo: close with truthful state and downstream gate.
- Superficies afectadas: SDD backlogs, `cierre.md`, `patch.yaml`.
- Cambios esperados: closed as `physical-files-candidate`.
- Dependencias: Bloques 1-2 complete.
- Riesgos: blocking `paw-10d`.
- Validaciones asociadas: relevant validators and patch validation.

---

## 6. Datos, schemas y contratos

- Contratos documentales afectados: runtime adapter evidence and distribution
  inventory only.
- Datos o contenido afectados: `.agents/**` candidate files.
- Schemas o modelos afectados: none expected.
- Compatibilidad esperada: validators remain backward-compatible.

---

## 7. Validaciones previstas

### Documentales

- [x] verify no default activation.

### Tecnicas

- [ ] `node paw/tools/validate-adoption.mjs --fixtures --json`
- [ ] `node paw/tools/validate-distribution.mjs --json`
- [ ] `node paw/tools/validate-patches.mjs --json`
- [ ] `git diff --check`

### Manuales

- [ ] Antigravity runtime discovery, if available.

---

## 8. Riesgos y mitigaciones

- riesgo: `.agents/**` overclaims official runtime behavior.
  - impacto: false adapter support claim.
  - mitigacion: close as `physical-files-candidate`.

---

## 9. Decisiones humanas abiertas

- Estado: `none`

---

## 10. Criterio de cierre tecnico

- [x] alcance respeta `definicion.md`
- [x] zonas afectadas identificadas
- [x] bloques secuenciables
- [x] validaciones reales
- [x] no hay decisiones abiertas bloqueantes

---

## 11. Registro de cambios

- Fecha: 2026-06-21
  - cambio: plan tecnico creado.
  - razon: habilitar tasks.

# Definicion: paw-10e-claude-code-distribution-adapter

---

## Estado

- Change id: `paw-10e-claude-code-distribution-adapter`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `blocked`
- Fuente: `_inbox/final/10-handoff-expansion/02_claude_2.md`
- Ultima actualizacion: 2026-06-21
- Owner: sesion Codex activa

---

## 1. Objetivo

Preparar el registro SDD del distribution adapter Claude Code y detenerlo antes
de implementacion porque el gate del physical adapter no se cumplio.

---

## 2. No objetivos

- [x] Crear `paw/distribution/claude-code-plugin/**`.
- [x] Crear `.claude-plugin/**` o manifest plugin.
- [x] Declarar `distribution-adapter-candidate`.
- [x] Cambiar el gate definido por el handoff.

---

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `paw/adoption/adapters/runtime/claude-code.json`
- `paw/distribution/README.md`
- `paw/distribution/manifest.md`
- `paw/distribution/manual-installation.md`
- `paw/distribution/progressive-loading.md`
- `sdd/parches/paw-10b-claude-code-physical-adapter/patch.yaml`
- `sdd/parches/paw-10b-claude-code-physical-adapter/cierre.md`
- `_inbox/final/10-handoff-expansion/02_claude_2.md`

---

## 4. Alcance

### Si entra

- [x] Registrar el bloqueo del gate.
- [x] Preservar el handoff como input privado referenciado.
- [x] Dejar criterios de desbloqueo claros.

### Fuera de alcance

- [x] Implementar distribution adapter sin physical runtime validation.
- [x] Inventar plugin format o install path.

---

## 5. Superficies afectadas

### Docs

- `sdd/parches/paw-10e-claude-code-distribution-adapter/**`

### Codigo o contenido

- None.

### Configuracion o validacion

- `node paw/tools/validate-patches.mjs --json`

---

## 6. Decisiones conocidas

- decision: block `paw-10e` before implementation.
  - razon: `paw-10b` closed as `physical-files-candidate`, not
    `physical-adapter-candidate`.
  - documentos o areas afectadas: this workspace, downstream status report.

---

## 7. Assumptions

- The gate can be revisited only after real Claude Code runtime discovery and
  invocation evidence is added through a governed change.

---

## 8. Decisiones abiertas

- [ ] decision pendiente: whether to later run Claude Code validation and reopen
  this distribution work.
  - por que bloquea: plugin/package work depends on validated physical adapter.
  - quien debe decidir: human owner.

---

## 9. Riesgos

- riesgo: implementing distribution from unvalidated physical files.
  - impacto: false portability/support claim.
  - mitigacion: keep patch blocked.

---

## 10. Criterio de cierre

La definicion queda bloqueada hasta que:

- [x] predecessor state is checked
- [x] blocker is recorded
- [x] implementation surfaces remain untouched

---

## 11. Registro de cambios

- Fecha: 2026-06-21
  - cambio: blocked SDD workspace created.
  - razon: predecessor gate failed.

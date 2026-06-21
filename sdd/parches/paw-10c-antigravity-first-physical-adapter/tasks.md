# Tasks: paw-10c-antigravity-first-physical-adapter

---

## Estado

- Change id: `paw-10c-antigravity-first-physical-adapter`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-backlog`
- Ultima actualizacion: 2026-06-21
- Owner: sesion Codex activa

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `patch.yaml`
- `definicion.md`
- `plan.md`
- `decision.log`

---

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas
- [x] no hay decisiones abiertas bloqueantes

---

## 3. Resumen del plan

- resumen: create `.agents/**` physical files, reconcile evidence, and close as
  physical-files-candidate unless Antigravity runtime validation is executed.

---

## 4. Fases

### Fase 1 - Materializar `.agents/**`

- Objetivo: create Antigravity candidate skills, rules, and workflows.
- Origen en `plan.md`: Bloque 1.
- Precondiciones: baseline SDD committed.
- Tareas: create files under `.agents/**`; use `paw-conformance`, not
  `paw-verify`; avoid hooks and plugins.
- Archivos o areas probables: `.agents/**`.
- Validaciones: structural inspection and `git diff --check`.
- Criterio de cierre: files exist and state candidate-only boundaries.

### Fase 2 - Reconciliar evidencia

- Objetivo: update adapter JSON, distribution docs, and manifest.
- Origen en `plan.md`: Bloque 2.
- Precondiciones: Fase 1 done.
- Tareas: update `antigravity.json`; include `.agents/**` in manifest if
  distributed; document no plugin/stable support.
- Archivos o areas probables: `paw/adoption/**`, `paw/distribution/**`.
- Validaciones: adoption and distribution validators.
- Criterio de cierre: docs and manifest represent physical-files-candidate.

### Fase 3 - Validar y cerrar

- Objetivo: close the patch with truthful state.
- Origen en `plan.md`: Bloque 3.
- Precondiciones: Fases 1-2 done.
- Tareas: run validators, create `cierre.md`, close `patch.yaml`.
- Archivos o areas probables: SDD artifacts.
- Validaciones: patch validator and relevant checks.
- Criterio de cierre: closed as `physical-files-candidate` unless runtime
  validation exists.

---

## 5. Dependencias entre fases

- Fase 1 bloquea: Fase 2.
- Fase 2 bloquea: Fase 3.
- Fase 3 bloquea: `paw-10d` unless result is `physical-adapter-candidate`.

---

## 6. Decisiones y bloqueos

- decisiones abiertas bloqueantes: none.
- decisiones abiertas no bloqueantes: none.

---

## 7. Validaciones globales

- [ ] `node paw/tools/validate-adoption.mjs --fixtures --json`
- [ ] `node paw/tools/validate-distribution.mjs --json`
- [ ] `node paw/tools/validate-patches.mjs --json`
- [ ] `git diff --check`

---

## 8. Criterio de cierre

- [x] cada fase tiene objetivo, precondiciones, tareas, validaciones y criterio
  de cierre
- [x] cada tarea es trazable al `plan.md`
- [x] las validaciones son reales

---

## 9. Registro de cambios

- Fecha: 2026-06-21
  - cambio: tasks inicial creado.
  - razon: habilitar backlogs de fase.

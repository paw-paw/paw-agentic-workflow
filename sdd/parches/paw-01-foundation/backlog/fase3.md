# Backlog Fase 3: transicion y desacoplamiento v1

## Estado

- Change id: `paw-01-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-first`
- Fase: `3 - Transicion y desacoplamiento v1`
- Estado: `done`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa
- Depende de: Fase 2 cerrada
- Desbloquea: Fase 4

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/NAMING.md`
- `docs/governance/V1-TRANSITION.md`
- artifacts principales del patch

## 2. Objetivo de la fase

- Resultado esperado: runtime v1 operativo, descrito como Spec-Driven Development transitorio y sin routing a superficies del portfolio excluidas.
- Razon: v1 debe poder ejecutar los patches restantes desde este repo independiente.
- Cambio habilitado al cerrar: conformance global del foundation.

## 3. Rama spec

- Fuente viva o alcance modificado: soporte operativo v1.
- Reconciliacion esperada: nombres e interfaces v1 se preservan; solo se corrige identidad y routing no disponible.

## 4. Assumptions

- Referencias historicas al portfolio en documentos de procedencia quedan fuera de este backlog.
- `.astro/` en `.gitignore` es una exclusion defensiva, no acoplamiento operativo.
- Documentos v1 no editados conservan idioma y contenido por compatibilidad.

## 5. Precondiciones

- [x] Fase 2 `done`
- [x] inventario v1 autoritativo disponible
- [x] target `paw/**` inerte

## 6. Alcance

### Si entra

- [x] `sdd/README.md` y `sdd/core/README.md`
- [x] documentos de orchestration con Astro/Pages/portfolio activo
- [x] skills con handoff a verificacion Astro ausente
- [x] perfiles Codex con identidad Astro/portfolio
- [x] comentario de identidad en `.codex/config.toml`

### No entra

- [x] nombres `sdd-*`
- [x] schema, validator, fixtures y manifests v1
- [x] semantica de lifecycle o patch kind
- [x] procedencia historica
- [x] skills `paw-*`

## 7. Archivos y superficies

### Leer antes de editar

- matches dirigidos de `portfolio`, `Astro`, `GitHub Pages`, `astro-pages-verify` y `astro-verifier`
- `sdd/orchestration/*.md`
- `.codex/skills/sdd-*/SKILL.md`
- `.codex/agents/*.toml`

### Editar

- `sdd/README.md`
- `sdd/core/README.md`
- `sdd/orchestration/artifact-state-machine.md`
- `sdd/orchestration/decision-gates.md`
- `sdd/orchestration/model-policy.md`
- `sdd/orchestration/orchestration-rules.md`
- `sdd/orchestration/skill-routing.md`
- `sdd/orchestration/subagent-policy.md`
- `.codex/config.toml`
- `.codex/skills/sdd-plan/SKILL.md`
- `.codex/skills/sdd-router/SKILL.md`
- `.codex/skills/sdd-sync-drift/SKILL.md`
- `.codex/skills/sdd-phase-backlog/SKILL.md`
- `.codex/skills/sdd-execute-phase/SKILL.md`
- `.codex/agents/sdd-artifact-writer.toml`
- `.codex/agents/sdd-phase-worker.toml`
- `.codex/agents/sdd-repo-mapper.toml`
- `.codex/agents/sdd-risk-reviewer.toml`
- `.codex/agents/sdd-test-reviewer.toml`

### Validar

- suite v1 completa
- busqueda dirigida en superficies activas
- `git diff --check`

### No tocar

- `sdd/tools/**`
- `sdd/tests/**`
- `tests/**`
- skill assets y fixtures
- `docs/governance/PROVENANCE.md`
- `docs/provenance/**`

## 8. Checklist de ejecucion

### Bloque A - Relectura

- [x] confirmar inventario y cutover
- [x] confirmar interpretacion de idioma desde ledger/legacy relacionado

### Bloque B - Inspeccion

- [x] obtener lista exacta de acoplamientos activos
- [x] separar procedencia legitima y `.gitignore`

### Bloque C - Edicion

- [x] reescribir READMEs v1 editados en ingles y con estado transitorio
- [x] retirar etapa obligatoria de verificacion Astro
- [x] reemplazar decision gates especificos del portfolio por gates genericos
- [x] retirar perfiles/subagentes inexistentes de matrices y model policy
- [x] neutralizar perfiles Codex sin cambiar permisos o output contracts esenciales
- [x] neutralizar descripciones de skills sin cambiar su secuencia o interfaces

### Bloque D - Registro

- [x] registrar cualquier cambio de alcance o finding
- [x] verificar que solo se consulto el legacy relacionado requerido por la ambiguedad de idioma

### Bloque E - Validacion

- [x] ejecutar validator repo y fixtures
- [x] ejecutar test SDD
- [x] ejecutar busqueda de acoplamientos activos
- [x] ejecutar `git diff --check`

### Bloque F - Cierre

- [x] registrar resultados y cambiar estado a `done`

## 9. Drift detectado

- `2026-06-13`
  - Fuente esperada: `docs/governance/V1-TRANSITION.md`
  - Diferencia encontrada: `sdd/parches/README.md` describia el workspace activo como futuro y portable.
  - Impacto: contradiccion operacional sobre el unico namespace writable.
  - Accion: actualizar el README dentro del alcance original de Fase 3 y repetir validaciones.
  - Categoria: `operational`
  - Requiere decision: `no`

## 10. Hallazgos

- Varios archivos importados de orchestration y agents conservaban permisos locales de solo lectura. Se habilito escritura solo para los archivos aprobados; Git no registra cambios de modo.
- Los acoplamientos Astro/portfolio restantes fuera de artifacts del patch aparecen solo en documentos de procedencia o exclusiones, no en el runtime activo.
- `.astro/` permanece en `.gitignore` como exclusion defensiva de output, no como dependencia.
- La auditoria de cierre encontro y corrigio `sdd/parches/README.md`, que aun describia el workspace como futuro.

## 11. Blockers

- Ninguno.

## 12. Decisiones

- Interpretacion de idioma registrada en `decision.log`.

## 13. Validaciones

- [x] `node sdd/tools/validate-sdd.mjs`: `pass`
- [x] `node sdd/tools/validate-sdd.mjs --fixtures`: `pass`
- [x] `node --test tests/sdd-validation.test.mjs`: `pass`
- [x] busqueda sin acoplamientos activos: `pass`
- [x] `git diff --check`: `pass`

## 14. Cierre

- [x] checklist completo
- [x] assumptions resueltas
- [x] decisions registradas
- [x] blockers resueltos
- [x] drift documentado
- [x] validaciones ejecutadas

## 15. Riesgos y pendientes

- Riesgo: alterar accidentalmente contratos v1.
- Pendiente: Fase 4 y cierre.

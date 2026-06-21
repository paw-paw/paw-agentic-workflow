# Definicion: paw-10b-claude-code-physical-adapter

---

## Estado

- Change id: `paw-10b-claude-code-physical-adapter`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `active`
- Fuente: `_inbox/final/10-handoff-expansion/01_claude.md`
- Ultima actualizacion: 2026-06-21
- Owner: sesion Codex activa con subagentes SDD read-only

---

## 1. Objetivo

Materializar un adapter fisico candidate para Claude Code bajo `.claude/**`.
El patch debe mapear operaciones PAW a project skills versionables, agregar
supporting files minimos, y opcionalmente project subagents advisory. El cierre
no activa PAW v2 por defecto ni declara soporte estable.

---

## 2. No objetivos

- [x] Crear plugin o distribution adapter Claude Code.
- [x] Usar `.agents/**`, `.gemini/**` o `.antigravity/**`.
- [x] Activar `paw/parches/**` o writers v2.
- [x] Cambiar contratos core, familias, presets, arquitectura o stack.
- [x] Declarar `supported`, release estable o portabilidad completa.
- [x] Commitear settings locales, secretos o rutas absolutas.

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
- `paw/adoption/adapters/runtime/claude-code.json`
- `paw/orchestration/workflow.md`
- `paw/orchestration/bootstrap.md`
- `paw/orchestration/conformance.md`
- `paw/distribution/README.md`
- `paw/distribution/manifest.md`
- `paw/distribution/progressive-loading.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `_inbox/final/10-handoff-expansion/00_general.md`
- `_inbox/final/10-handoff-expansion/01_claude.md`

---

## 4. Alcance

### Si entra

- [x] Workspace SDD completo para `paw-10b`.
- [x] `.claude/skills/paw-*` para operaciones PAW candidatas.
- [x] Supporting files minimos bajo las skills.
- [x] Project subagents advisory si se pueden restringir de forma clara.
- [x] Evidencia estructural y manual de validacion Claude Code.
- [x] Actualizacion del adapter declarativo Claude si debe reflejar archivos
  fisicos materializados.
- [x] Docs de adoption/distribution solo si hay drift por nuevos archivos.

### Fuera de alcance

- [x] Plugin/distribution Claude Code.
- [x] Hooks destructivos o enforcement automatico amplio.
- [x] Runtime Antigravity.
- [x] Gemini CLI.
- [x] Publicacion, marketplace, releases, Pages o Actions.

---

## 5. Superficies afectadas

### Docs

- `paw/adoption/adapters/README.md`
- `paw/distribution/manifest.md`
- `paw/distribution/progressive-loading.md`
- `docs/governance/BOOTSTRAP-STATUS.md`

### Codigo o contenido

- `.claude/skills/paw-*/SKILL.md`
- `.claude/skills/paw-*/references/*.md`
- `.claude/agents/*.md`
- `paw/adoption/adapters/runtime/claude-code.json`

### Configuracion o validacion

- `paw/tests/fixtures/adoption/adapters/**`, si se requiere evidencia nueva.
- `paw/tests/contract/adoption-adapters.test.mjs`, solo si cambia fixture count
  o semantica de validacion.
- `paw/distribution/distribution-manifest.json`, solo si los nuevos archivos se
  agregan a la distribucion candidata vigente.

---

## 6. Decisiones conocidas

- decision: ejecutar en `main` sin branch.
  - razon: instruccion humana explicita.
  - documentos o areas afectadas: commits, `decision.log`, reporte final.
- decision: omitir hooks ejecutables en el physical adapter inicial.
  - razon: no hay hook minimo necesario para probar discovery de skills y se
    evita enforcement prematuro.
  - documentos o areas afectadas: `.claude/**`, cierre.
- decision: crear subagents solo como reviewers read-only/advisory.
  - razon: el handoff permite subagents candidate pero prohibe decisiones
    humanas delegadas o writers no gobernados.
  - documentos o areas afectadas: `.claude/agents/*.md`.

---

## 7. Assumptions

- Las rutas Claude Code documentadas en el handoff son suficientes para crear
  project skills bajo `.claude/skills/<skill-name>/SKILL.md`.
- No hay una configuracion project-level segura minima que requiera
  `.claude/settings.json`; si se omite, se registrara como deferred.
- Sin ejecucion local de Claude Code, el estado maximo sera
  `physical-files-candidate`.

---

## 8. Decisiones abiertas

- None blocking.

---

## 9. Riesgos

- riesgo: las skills fisicas aparentan activar PAW v2.
  - impacto: contradiccion con patch 14 cutover.
  - mitigacion: frontmatter y referencias deben decir candidate only y remitir
    al flujo activo `sdd-*`.
- riesgo: settings o hooks amplian permisos demasiado.
  - impacto: adapter inseguro o no portable.
  - mitigacion: omitir settings/hooks salvo configuracion minima segura.
- riesgo: no hay validacion runtime Claude Code en esta sesion.
  - impacto: no se puede cerrar como `physical-adapter-candidate`.
  - mitigacion: cerrar como `physical-files-candidate` con validacion
    estructural automatizada.

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
  - razon: inicio formal de `paw-10b`.

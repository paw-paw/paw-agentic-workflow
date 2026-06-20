# Definicion: paw-07-codex-runtime-tooling

---

## Estado

- Change id: `paw-07-codex-runtime-tooling`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `active`
- Fuente: `_inbox/final/07-codex-runtime-tooling-handoff.md`
- Ultima actualizacion: 2026-06-20
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Objetivo

Implementar el primer adapter runtime de PAW para Codex sin activar el workflow v2
como default. El patch debe materializar skills `paw-*`, perfiles Codex acotados,
tooling ejecutable compartido, scripts locales utiles, contratos de I/O y permisos,
fixtures, tests y documentacion que traduzcan las operaciones portables del patch 06
a la superficie real `.codex/**`. Al cerrar, las skills deben poder probarse como
candidate sin reemplazar las skills `sdd-*` ni escribir en `paw/parches/**`.

---

## 2. No objetivos

- No reemplazar ni renombrar las skills `sdd-*` existentes.
- No activar `paw/parches/**`, writers v2 ni el workflow v2 como default.
- No implementar adapters Claude Code, Antigravity u otros runtimes.
- No implementar integracion Git/GitHub, PRs, branch policy durable o releases.
- No publicar PAW como portable, estable, instalable o empaquetado.
- No usar `.agents/` ni presentarlo como alternativa a `.codex/agents/**`.
- No permitir que scripts generen decisiones, doctrina o copy sustantivo.

---

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/NAMING.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/core/artifact-lifecycle.md`
- `paw/core/authority-and-evidence.md`
- `paw/core/decision-gates.md`
- `paw/core/drift-policy.md`
- `paw/core/compatibility-policy.md`
- `paw/orchestration/README.md`
- `paw/orchestration/workflow.md`
- `paw/orchestration/bootstrap.md`
- `paw/orchestration/conformance.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `.codex/config.toml`
- `sdd/parches/paw-06-workflow-conformance/cierre.md`
- `_inbox/final/07-codex-runtime-tooling-handoff.md`
- `_inbox/final/README.md`
- `_inbox/final/patch-execution-guide.md`

---

## 4. Alcance

### Si entra

- Crear skills `.codex/skills/paw-*` para cubrir las operaciones portables del
  workflow materializado en `paw/orchestration/**`.
- Crear perfiles `.codex/agents/paw-*.toml` necesarios, read-only/advisory por
  defecto y writer solo bajo autorizacion explicita de una skill.
- Crear un toolkit compartido, versionado y descubrible por contrato para
  descubrimiento, validacion, normalizacion, freshness y mutaciones mecanicas.
- Crear scripts locales de skills cuando reduzcan duplicacion mecanica sin asumir
  decisiones semanticas.
- Definir y probar contrato comun de ejecutables: `--help`, `--json`, `--dry-run`
  cuando aplique, `--root` o root detection, stdout/stderr, exit codes estables,
  no interactividad, fail-loud, idempotencia o repeticion explicita y version del
  contrato.
- Implementar mutation envelope Nivel 1, Nivel 2 y Nivel 3 para scripts y skills.
- Implementar progressive disclosure en las skills: contrato inmediato, estado
  necesario, referencias especificas y diagnostico extendido solo bajo solicitud o
  error.
- Agregar fixtures, tests y documentacion para probar las skills `paw-*` sin
  cutover.
- Crear un mapa explicito operacion portable -> implementacion Codex o gap
  aceptado.

### Fuera de alcance

- Integracion VCS/PR y canonizacion de la politica de commits, reservada para
  `paw-08-vcs-pr-integration`.
- Multi-runtime adapters, reservados para patches posteriores.
- Pilotos consumidores y activacion candidate posterior al patch 10.
- Distribucion, instalacion, packaging, CI, Pages, Actions, releases o deployment.
- Duplicar implementaciones activas entre `sdd/**` y `paw/**`.

---

## 5. Superficies afectadas

### Docs

- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/orchestration/README.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- posibles documentos Codex runtime bajo `.codex/**`

### Codigo o contenido

- `.codex/skills/paw-*/SKILL.md`
- `.codex/skills/paw-*/scripts/**`
- `.codex/skills/paw-*/assets/**`
- `.codex/agents/paw-*.toml`
- toolkit compartido bajo una superficie aprobada por el plan
- posibles contratos o manifests de runtime bajo `.codex/**`

### Configuracion o validacion

- `.codex/config.toml`
- tests de contrato para scripts y skill fixtures
- fixtures de artifacts y escenarios Codex
- validadores o CLIs existentes bajo `paw/tools/**` solo si hace falta registrar o
  validar la superficie runtime sin activar workflow v2

---

## 6. Decisiones conocidas

- Decision: ejecutar este patch como `spec` + `spec-anchored` bajo SDD v1.
  - razon: el handoff 07 lo declara y `AGENTS.md` mantiene `sdd/parches/**` como
    workspace activo hasta el cutover.
  - documentos o areas afectadas: `sdd/parches/paw-07-codex-runtime-tooling/**`.
- Decision: basar la rama en `origin/main`, no en la rama local del patch 06.
  - razon: `origin/main` contiene el merge de `paw-06-workflow-conformance` y la
    rama remota previa fue eliminada tras el merge.
  - documentos o areas afectadas: branch `codex/paw-07-codex-runtime-tooling`.
- Decision: aplicar la politica provisional de commits de `paw-foundation` solo a
  este patch.
  - razon: instruccion humana explicita; la doctrina portable queda diferida a
    `paw-08-vcs-pr-integration`.
  - documentos o areas afectadas: `decision.log`, estrategia de commits y cierre.
- Decision: usar Node.js como runtime inicial de scripts para este patch.
  - razon: el stack real de PAW ya usa Node.js sin dependencias externas para
    validadores, CLIs JSON y tests contractuales.
  - documentos o areas afectadas: plan, toolkit compartido y scripts locales.

---

## 7. Assumptions

- Las skills `paw-*` pueden vivir junto a `sdd-*` bajo `.codex/skills/**` siempre
  que no sean activadas como default ni reemplacen el flujo vigente.
- El toolkit compartido puede vivir bajo `.codex/skills/paw-toolkit/` o una
  superficie `.codex/paw-toolkit/**` si el plan justifica mejor descubrimiento y
  evita tratarlo como skill ejecutable.
- Los tests pueden validar scripts, fixtures y contratos de archivos sin ejecutar
  Codex como runtime interactivo.
- El mapa portable -> Codex puede documentar gaps explicitos cuando una operacion
  requiera juicio humano o runtime behavior no determinista.

---

## 8. Decisiones abiertas

- Ninguna decision humana bloqueante identificada durante intake.

---

## 9. Riesgos

- riesgo: las skills `paw-*` duplican doctrina completa en cada `SKILL.md`.
  - impacto: contexto inflado, drift y violacion de progressive disclosure.
  - mitigacion: cada skill debe cargar solo contrato inmediato, estado necesario y
    referencias especificas; ayuda extendida debe ser opt-in o error-driven.
- riesgo: el toolkit empieza a decidir semantica.
  - impacto: se oculta autoridad en scripts y se desplaza el juicio de la skill.
  - mitigacion: scripts limitados a descubrimiento, validacion, normalizacion y
    mutaciones mecanicas con payload ya validado por la skill.
- riesgo: un script requiere prompts interactivos.
  - impacto: pierde reproducibilidad y bloquea ejecucion agentica.
  - mitigacion: entrypoints no interactivos, fail-loud y salida JSON compacta.
- riesgo: las skills `paw-*` se interpretan como cutover.
  - impacto: activacion prematura de v2.
  - mitigacion: docs vivos y fixtures deben declarar candidate/inactivo y mantener
    `sdd-*` como flujo activo.
- riesgo: `.agents/` aparece como superficie alternativa.
  - impacto: se rompe el contrato Codex del handoff.
  - mitigacion: limitar todo perfil nuevo a `.codex/agents/paw-*.toml` y validar
    ausencia de `.agents` en docs/runtime mappings.

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

- Fecha: 2026-06-20
  - cambio: intake inicial de `paw-07-codex-runtime-tooling`.
  - razon: preparar plan tecnico brownfield mediante SDD v1.

# Fase 1 - Familias y foundation de catalogos

## Estado

- Change id: `paw-04-catalogs-presets`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `1`
- Estado: `done`
- Ultima actualizacion: `2026-06-15`
- Owner: sesion Codex activa con aprobacion humana
- Depende de: preparacion SDD committed; `paw-03` cerrado e integrado
- Desbloquea: Fase 2 - Capabilities y documentation presets

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/README.md`
- `paw/core/authority-and-evidence.md`
- `paw/core/decision-gates.md`
- `sdd/parches/paw-04-catalogs-presets/patch.yaml`
- `sdd/parches/paw-04-catalogs-presets/definicion.md`
- `sdd/parches/paw-04-catalogs-presets/plan.md`
- `sdd/parches/paw-04-catalogs-presets/tasks.md`
- `sdd/parches/paw-04-catalogs-presets/decision.log`
- final handoff 04 preserved in `handover.md`

## 2. Objetivo de la fase

- Resultado esperado: una superficie contractual `paw/catalogs/**` y una taxonomia
  canonica de ocho familias, representada por manifest JSON, guia Markdown, schema,
  validator y fixtures.
- Razon de la fase: todos los catalogos posteriores referencian una familia primaria
  estable y necesitan fronteras verificables antes de definir requirements o stacks.
- Cambio que queda habilitado al cerrar: Fase 2 puede crear capabilities y
  documentation presets con referencias de familia estables.

## 3. Rama obligatoria por tipo

### `patch_kind = spec`

- Fuente viva o alcance de spec que esta fase modifica:
  - `docs/README.md` para registrar `paw/catalogs/**`;
  - `docs/governance/ARCHITECTURE.md` para agregar la capa de catalogs;
  - `paw/README.md` para agregar la superficie al target map;
  - `paw/catalogs/**` como nueva fuente contractual portable.
- Reconciliacion esperada:
  - distinguir materializacion de catalogos de activacion de workflow/adoption;
  - mantener core, tooling, tests y adapters con ownership separado;
  - conservar `sdd/**` como workflow activo y `_inbox/**` fuera de Git.

## 4. Assumptions

- JSON es el formato canonico inicial y Markdown la guia explicativa.
- La taxonomia usa slugs semanticos estables con aliases de procedencia `SF-*`.
- El validator reutiliza patrones de diagnostics de patch 03, pero se mantiene en
  modulos y CLI de catalogs separados.
- El registro completo de bootstrap status puede terminar en Fase 5; esta fase solo
  hace el cambio minimo de ownership necesario para no crear autoridad oculta.

## 5. Precondiciones

### Documentos

- [x] `patch.yaml`, `definicion.md`, `plan.md`, `tasks.md` y `decision.log` vigentes
- [x] handoff final preservado sin incluir `_inbox/**` en Git
- [x] preparacion SDD committed como `809685c`

### Decisiones previas

- [x] gate humano: aprobar o corregir los IDs canonicos propuestos:
  - `content-knowledge`
  - `transactional-application`
  - `service-api`
  - `library-package-sdk`
  - `cli-developer-tool`
  - `client-application`
  - `data-machine-learning`
  - `agentic-system`
- [x] registrar el resultado del gate en `decision.log`

### Estado tecnico

- [x] `origin/main` contiene el cierre de patch 03
- [x] validator PAW y fixtures existentes pasan antes de esta fase
- [x] no existe otra superficie `paw/catalogs/**`

## 6. Alcance

### Si entra

- [x] crear root, README, manifest y guide de families
- [x] crear schema de family catalog
- [x] crear loader/validator read-only de catalogs
- [x] validar exactly-one-primary-family en fixtures de producto
- [x] cubrir fronteras docs-only, transactional, service, client y agentic
- [x] registrar ownership minimo en docs vivas

### No entra

- [x] capabilities o documentation presets
- [x] profiles, concerns, scopes o merge de slots
- [x] implementation presets o evidence de tecnologias
- [x] adoption records, adapters, workflow o writers
- [x] cambios al patch schema v1/v2
- [x] publicacion, packaging, Actions o deployment

## 7. Archivos y superficies de trabajo

### Leer antes de editar

- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/README.md`
- `paw/core/README.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `paw/tools/validation/diagnostics.mjs`
- `paw/tools/validation/format-validation-result.mjs`
- `paw/tools/validate-patches.mjs`
- `paw/tests/contract/patch-validation.test.mjs`
- `tests/schema-validator-conformance.test.mjs`

### Editar

- `paw/catalogs/README.md`
- `paw/catalogs/families/catalog.json`
- `paw/catalogs/families/README.md`
- `paw/tools/schemas/catalogs/families.schema.json`
- new catalog loader/validator modules under `paw/tools/**`
- new catalog CLI entrypoint under `paw/tools/**`
- family contract tests under `paw/tests/contract/**`
- family fixtures under `paw/tests/fixtures/catalogs/families/**`
- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `paw/README.md`
- this backlog and `decision.log`

### Validar

- `paw/catalogs/**`
- `paw/tools/schemas/catalogs/**`
- catalog-specific tests introduced in this phase
- existing PAW/SDD validation commands

### No tocar

- `paw/core/**`
- `paw/parches/**`
- `.codex/skills/**`
- `.codex/agents/**`
- `sdd/tools/schemas/patch.schema.json`
- `paw/tools/schemas/patch-v2.schema.json`
- closed patch workspaces
- `_inbox/**`

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

- [x] leer el gate aprobado de IDs en `decision.log` antes de crear manifests
- [x] releer `handover.md` con foco en eight-family boundaries y stop conditions
- [x] releer architecture/index/target map para registrar una unica nueva superficie
- [x] releer patch 03 diagnostics, CLI y tests para reutilizar patrones sin mezclar
  contratos

### Bloque B - Inspeccion de estado actual

- [x] ejecutar `rg --files paw docs tests` y confirmar que `paw/catalogs/**` no existe
- [x] ejecutar `rg -n "catalog|preset|family" paw docs tests` y registrar cualquier
  claim que deba reconciliarse
- [x] inspeccionar exports/imports del validator PAW y decidir el minimo comun reusable
  sin cambiar su contrato publico
- [x] confirmar que el nuevo validator puede ser read-only y usar solo imports locales
  o `node:`

### Bloque C - Edicion por archivo

- [x] crear `paw/catalogs/README.md` con status, ownership, canonical representation,
  activation boundaries y catalog map
- [x] crear `paw/catalogs/families/catalog.json` con schema version, catalog version,
  canonical IDs, provenance aliases, names, primary intents, includes, excludes,
  boundary questions y examples
- [x] crear `paw/catalogs/families/README.md` que explique la decision de familia
  primaria, productos compuestos y casos frontera sin duplicar arrays normativos
- [x] crear `paw/tools/schemas/catalogs/families.schema.json` con required fields,
  enums/shape and `additionalProperties: false`
- [x] crear loader de JSON que reporte path y parse errors sin mutar archivos
- [x] crear family validator que compruebe schema version, catalog version, unique IDs,
  unique aliases, eight required meanings and complete boundaries
- [x] crear product classification fixture contract con exactly one `family_id`
- [x] crear fixtures validos para las ocho familias y al menos un producto compuesto
  que conserve una unica familia
- [x] crear fixtures invalidos para unknown family, duplicate IDs, duplicate aliases,
  missing boundary fields, zero primary families and multiple primary families
- [x] crear contract tests que ejecuten canonical catalog y fixture matrix
- [x] agregar `paw/catalogs/**` al canonical registry con role, authority, owner and
  verification default
- [x] agregar catalogs a architecture and `paw/README.md` sin cambiar activation state

### Bloque D - Registro de decisiones, hallazgos o blockers

- [x] registrar IDs aprobados, aliases y rationale en `decision.log`
- [x] registrar cualquier reutilizacion o extraccion de helpers del validator de patch
  que cambie ownership interno
- [x] registrar drift si live docs exigen una reconciliacion mayor que la prevista
- [x] detener la fase si una family solo puede explicarse mediante tecnologia o si
  dos primary intents no pueden separarse

### Bloque E - Validacion

- [x] ejecutar el nuevo catalog validator sobre canonical families
- [x] ejecutar el nuevo fixture mode y verificar valid/invalid expectations
- [x] ejecutar los contract tests de family catalog
- [x] ejecutar `node sdd/tools/validate-sdd.mjs`
- [x] ejecutar `node sdd/tools/validate-sdd.mjs --fixtures`
- [x] ejecutar `node paw/tools/validate-patches.mjs --json`
- [x] ejecutar `node paw/tools/validate-patches.mjs --fixtures --json`
- [x] ejecutar `node --test tests/foundation-governance.test.mjs`
- [x] ejecutar `node --test tests/core-contracts.test.mjs`
- [x] ejecutar `node --test tests/schema-validator-conformance.test.mjs`
- [x] ejecutar `git diff --check`
- [x] verificar manualmente que no existen writes, external runtime imports, v2
  writers o workspaces nuevos

### Bloque F - Cierre

- [x] registrar comandos, resultados y counts en la seccion 13
- [x] actualizar hallazgos, drift, decisiones, risks and pending work
- [x] marcar Fase 1 `done` en `tasks.md` solo despues de validaciones verdes
- [x] confirmar que Fase 2 puede referenciar todos los family IDs sin aliases
  temporales
- [x] crear uno o mas Conventional Commits de fase segun intenciones/superficies

## 9. Drift detectado

- `2026-06-15`
  - fuente esperada: cada fixture domain conserva su runner.
  - diferencia encontrada: el runner de patch 03 recogia todo `expected.json` bajo
    `paw/tests/fixtures/**`.
  - impacto: los fixtures de catalogs eran interpretados como patch workspaces.
  - accion: excluir `fixtures/catalogs/**` del runner y contract test de patches.
  - requiere decision: `no`

## 10. Hallazgos durante ejecucion

- `paw/catalogs/**` no existe; la fase debe crear y registrar ownership antes de
  promover reglas durables.
- El parser YAML de patch 03 no es apropiado para catalogs anidados; JSON evita
  ampliar su scope.
- El fixture runner de patch 03 recorria cualquier `expected.json` bajo
  `paw/tests/fixtures/**` y trataba fixtures de otros dominios como patches.
  Se acoto a excluir `fixtures/catalogs/**`; cada dominio conserva su propio runner.
- Los ocho primary intents pudieron expresarse sin tecnologias y los casos docs-only,
  mobile/desktop y agentic conservaron las fronteras del handoff.

## 11. Blockers

- Ninguno.

## 12. Decisiones tomadas

- `2026-06-15`
  - Decision: el backlog propone slugs semanticos y conserva `SF-*` como aliases.
  - Razon: cumplir el handoff sin canonizar IDs ordinales por inercia.
  - Areas afectadas: family manifest, schema, fixtures, guides and downstream refs.
- `2026-06-15`
  - Decision: el owner humano aprobo los ocho IDs propuestos sin cambios.
  - Razon: expresan intencion primaria y no seleccion tecnologica.
  - Areas afectadas: family manifest, schema, fixtures and all downstream refs.

## 13. Validaciones

### Documentales

- [x] `paw/catalogs/**` registrado sin competir con precedence global
- [x] family guide consistente con canonical manifest
- [x] no claims de portability, release, adoption o workflow activation

### Tecnicas

- [x] canonical family catalog valid
- [x] valid/invalid family fixtures match expectations
- [x] existing deterministic suites pass
- [x] `git diff --check`

### Manuales

- [x] IDs canonicos aprobados
- [x] eight primary intents disjoint enough for classification
- [x] docs-only, mobile/desktop and agentic boundaries preserve handoff meaning
- [x] validator remains read-only and runtime-neutral

### Resultados

- Validacion: canonical family catalog
  - comando o revision: `node paw/tools/validate-catalogs.mjs --json`
  - resultado esperado: 8 families, zero errors
  - resultado obtenido: pass, `family_count: 8`
  - estado: `pass`
- Validacion: family fixture matrix
  - comando o revision: `node paw/tools/validate-catalogs.mjs --fixtures --json`
  - resultado esperado: all fixture expectations match
  - resultado obtenido: pass, 15 fixtures
  - estado: `pass`
- Validacion: complete automated suite
  - comando o revision: `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
  - resultado esperado: pass
  - resultado obtenido: 49 tests, 49 pass
  - estado: `pass`
- Validacion: SDD and patch validators
  - comando o revision: four commands declared in Block E
  - resultado esperado: pass
  - resultado obtenido: pass; 4 patches and 20 patch fixtures
  - estado: `pass`
- Validacion: whitespace and manual boundaries
  - comando o revision: `git diff --check` plus source inspection
  - resultado esperado: no errors, writes, external runtime coupling or activation
  - resultado obtenido: no errors; LF/CRLF notices only
  - estado: `pass`

## 14. Cierre

La fase solo se considera cerrada si:

- [x] checklist completo o pendientes explicitamente diferidos
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] gate de IDs resuelto y registrado
- [x] decisiones relevantes registradas
- [x] blockers resueltos o diferidos con razon
- [x] drift documentado o resuelto
- [x] validaciones requeridas ejecutadas
- [x] resultados de validacion registrados
- [x] backlog y `tasks.md` sincronizados

## 15. Riesgos y pendientes

### Riesgos

- IDs demasiado genericos pueden colisionar con future domain packs.
- Aliases de research pueden confundirse con IDs canonicos si guides no los
  etiquetan como provenance.
- Un validator monolitico puede acoplar catalogs y patch manifests.

### Pendientes

- Fases 2-5 permanecen sin backlog hasta que la fase anterior se cierre.

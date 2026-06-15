# Definicion: paw-04-catalogs-presets

## Estado

- Change id: `paw-04-catalogs-presets`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `active`
- Fuente: final handoff 04
- Ultima actualizacion: `2026-06-15`
- Owner: sesion Codex activa con aprobacion humana

## 1. Objetivo

Materializar catalogos portables, legibles y validables para familias de software,
presets documentales, component profiles, concerns e implementation presets. El
cambio debe permitir clasificar un producto por una unica familia, derivar
obligaciones documentales mediante modifiers y ofrecer pocos golden paths completos,
sin activar adopcion automatica, adapters ni el workflow v2.

## 2. No objetivos

- No crear adoption records, assessments, repo adapters, stack adapters o runtime
  adapters.
- No seleccionar automaticamente un stack para un proyecto concreto.
- No implementar scaffolding, installers, packaging o skills de ejecucion.
- No activar `paw/parches/**`, writers v2 ni el workflow PAW por default.
- No convertir profiles o concerns en una matriz libre de tecnologias.
- No implementar la semantica completa de roles documentales o conformance del
  patch 06.
- No fijar versiones flotantes, proveedores cloud o runtimes agentic.

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/core/authority-and-evidence.md`
- `paw/core/decision-gates.md`
- `paw/core/compatibility-policy.md`
- `paw/tools/**` y `paw/tests/**` como superficies materializadas por patch 03
- final handoff 04 como input vinculante del patch
- `_inbox/decision_ledger.md` como aclaracion excepcional
- consolidaciones legacy 2A, 2B, 3A y 3B solo como evidencia directamente
  relacionada consultada bajo el protocolo de incertidumbre

## 4. Alcance

### Si entra

- Superficie contractual portable `paw/catalogs/**`.
- Taxonomia de ocho familias con IDs canonicos, intencion primaria, fronteras,
  inclusion, exclusion y ejemplos.
- Catalogo normalizado de capabilities y documentation presets por familia.
- Estados de aplicabilidad, triggers, merge strategies y restricciones de
  excepciones.
- Once component profiles y diez concerns con definiciones reusables.
- Scopes tipados, identidad de slots y reglas de composicion/conflicto.
- Implementation presets completos por familia y envelope, con variantes acotadas.
- Politica verificable de versiones soportadas, evidencia, freshness y reopen.
- Schemas, validadores, fixtures validos/invalidos y validaciones cruzadas.
- Guias Markdown complementarias sin duplicar ni contradecir manifests.
- Reconciliacion de arquitectura, indice, transicion y bootstrap status.

### Fuera de alcance

- Instancias aplicadas a productos reales y bindings a repos concretos.
- Materializacion de adoption record, stack realization o assessment.
- Recomendacion automatica sin gate humano.
- Packs de dominio como pagos, salud o regulacion sectorial.
- Variantes diferidas de SF-04 fuera de TypeScript, Python y Go.
- Integraciones CI, Pages, Actions, releases o deployment.

## 5. Superficies afectadas

### Docs

- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `README.md`
- `paw/README.md`
- new human-readable catalog guides under `paw/catalogs/**`

### Codigo o contenido

- new canonical manifests under `paw/catalogs/**`
- catalog schemas and validation modules under `paw/tools/**`
- catalog validation entrypoint or subcommand under `paw/tools/**`

### Configuracion o validacion

- catalog fixtures and contract tests under `paw/tests/**`
- top-level conformance tests under `tests/**`
- active patch artifacts under
  `sdd/parches/paw-04-catalogs-presets/**`

## 6. Decisiones conocidas

- Los catalogos portables tendran una superficie propia `paw/catalogs/**`; no
  pertenecen al micro-core, tooling, tests ni adapters.
- Los manifests estructurados son la representacion canonica; las guias Markdown
  explican semantica y trade-offs sin redefinirlos.
- Los IDs canonicos usaran slugs semanticos estables. Los IDs ordinales `SF-*` e
  `IP-*` del research se preservan solo como aliases de procedencia cuando resulte
  util, no como identidad normativa por inercia.
- Los schemas y validadores pertenecen a `paw/tools/**`; fixtures y conformance a
  `paw/tests/**`.
- Los cuatro entregables del handoff se convierten en fases revisables, seguidos por
  una fase final de validacion cruzada y promocion documental.
- La politica provisional de commits de `paw-foundation` se aplica y se registra en
  `decision.log`; no se presenta como doctrina portable.

## 7. Assumptions

- JSON puede servir como formato canonico machine-readable porque el repositorio ya
  usa JSON Schema y Node.js standard library; las guias humanas permanecen Markdown.
- El validator de catalogos puede reutilizar patrones de diagnostico y CLI de patch
  03 sin acoplarse al validator de manifests de patch.
- Las fuentes primarias de cada tecnologia se verificaran durante la fase de
  implementation presets antes de fijar lineas soportadas o freshness.
- Los nombres exactos de archivos dentro de `paw/catalogs/**` pueden ajustarse en el
  plan sin alterar el ownership de la superficie.

## 8. Decisiones abiertas

- Los slugs definitivos de familias, capabilities y presets requieren gate humano al
  cerrar la fase que introduce cada catalogo.
- La linea soportada concreta de cada tecnologia requiere evidencia primaria vigente
  y puede quedar expresada como policy cuando una version fija no sea sostenible.

Estas decisiones no bloquean `sdd-plan` ni la division en fases; bloquean el cierre de
sus respectivas fases si no quedan registradas.

## 9. Riesgos

- Riesgo: duplicar doctrina entre manifests y guias.
  - Impacto: dos fuentes divergentes.
  - Mitigacion: manifests canonicos, guias referenciales y tests cruzados.
- Riesgo: IDs legibles pero inestables o demasiado ligados al research.
  - Impacto: compatibilidad futura costosa.
  - Mitigacion: slugs semanticos, aliases de procedencia y gate por catalogo.
- Riesgo: schemas sobredimensionados antes de pilotos.
  - Impacto: rigidez y complejidad innecesaria.
  - Mitigacion: modelar solo acceptance criteria y casos aprobados.
- Riesgo: golden paths se degraden a listas de tecnologias.
  - Impacto: presets incompletos y no operables.
  - Mitigacion: exigir envelope, invariantes, operacion, quality gates y verification.
- Riesgo: versiones o recomendaciones queden obsoletas.
  - Impacto: defaults inseguros o sin soporte.
  - Mitigacion: fuentes primarias, reviewed_at/review_by y reopen triggers.
- Riesgo: readers interpreten catalogos como workflow o adopcion activos.
  - Impacto: uso prematuro.
  - Mitigacion: docs de transicion y conformance de no activacion.

## 10. Criterio de cierre

- [x] objetivo y no objetivos estan claros
- [x] fuentes de verdad aplicables estan listadas
- [x] alcance y fuera de alcance no se contradicen
- [x] assumptions criticas estan clasificadas
- [x] decisiones abiertas tienen gate y owner
- [x] riesgos principales estan identificados

## 11. Registro de cambios

- `2026-06-15`
  - Intake inicial basado en handoff 04, cierre de patch 03 y contratos vivos.
  - Superficie `paw/catalogs/**` propuesta como owner contractual de catalogos.
  - IDs ordinales del research clasificados como aliases, no identidad normativa.

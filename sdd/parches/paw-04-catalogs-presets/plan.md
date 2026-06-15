# Plan: paw-04-catalogs-presets

## Estado

- Change id: `paw-04-catalogs-presets`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-tasks`
- Ultima actualizacion: `2026-06-15`
- Owner: sesion Codex activa con aprobacion humana
- Depende de: `paw-03-schema-validator-compatibility` cerrado e integrado
- Desbloquea: `paw-05-adapter-adoption-contracts`

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-04-catalogs-presets/patch.yaml`
- `sdd/parches/paw-04-catalogs-presets/definicion.md`
- `sdd/parches/paw-04-catalogs-presets/decision.log`
- related docs declarados en el manifest
- `paw/core/authority-and-evidence.md`
- `paw/core/decision-gates.md`
- `paw/core/compatibility-policy.md`
- `paw/tools/**` y `paw/tests/**` como patrones brownfield de schema, validator,
  fixtures, CLI y conformance

## 2. Lectura brownfield

- `paw/core/**` excluye explicitamente catalogs, presets e implementation profiles;
  por tanto la nueva doctrina no puede incorporarse al micro-core.
- `paw/**` no tiene hoy una superficie de catalogs. `paw/README.md`,
  `ARCHITECTURE.md` y `docs/README.md` deben registrar el nuevo owner.
- Patch 03 establecio JSON Schema 2020-12, modulos Node.js sin dependencias, CLI
  determinista, diagnosticos estructurados y fixtures con expectativas JSON.
- El parser YAML de patch 03 es deliberadamente acotado a manifests de patch. No debe
  extenderse para catalogos anidados; JSON evita inventar un parser general.
- `paw/tools/validate-patches.mjs` tiene un contrato especifico de patch manifests.
  Catalog validation necesita entrypoint separado o dispatch claramente aislado.
- `paw/tests/**` ya distingue contract tests, fixtures y top-level conformance. El
  nuevo trabajo debe seguir esa separacion.
- Las fuentes vivas aun afirman que catalogs y presets no estan implementados.
- No existen adoption records, adapters o workflow v2; los catalogos deben permanecer
  definiciones reusables inactivas hasta sus patches propietarios.

## 3. Assumptions

- JSON sera el formato canonico inicial para manifests anidados y JSON Schema para
  shape; invariantes cruzadas se implementaran en JavaScript.
- Node.js standard library sigue siendo suficiente para cargar, validar relaciones y
  emitir diagnosticos de catalogo.
- `paw/catalogs/**` puede registrarse como superficie contractual autoritativa sin
  afirmar portabilidad validada o activacion de adopcion.
- Los IDs canonicos pueden cerrarse incrementalmente por fase, siempre que aliases y
  referencias cruzadas se actualicen en el mismo commit de fase.
- Las lineas soportadas de tecnologias se expresaran mediante policy y evidencia
  primaria revisada, evitando `latest` y pinning perpetuo.

## 4. Zonas afectadas

### Docs

- `README.md`
- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/README.md`
- `paw/catalogs/README.md`
- human guides under `paw/catalogs/**`

### Codigo

- canonical JSON manifests under `paw/catalogs/**`
- JSON Schemas under `paw/tools/schemas/catalogs/**`
- validation modules under `paw/tools/catalogs/**` or
  `paw/tools/validation/catalogs/**`
- catalog validation CLI under `paw/tools/**`

### Configuracion, tests o build

- contract tests under `paw/tests/contract/**`
- valid and invalid fixtures under `paw/tests/fixtures/catalogs/**`
- conformance tests under `tests/**`
- active patch artifacts

## 5. Bloques de implementacion

### Bloque 1 - Taxonomia de familias y foundation de catalogos

- Objetivo: crear la superficie `paw/catalogs/**`, su contrato base y la taxonomia
  canonica de ocho familias.
- Superficies afectadas: catalog root, family manifest/guide, family schema,
  validator base, fixtures simples y docs de ownership.
- Cambios esperados: IDs semanticos; aliases de procedencia; primary intent;
  includes/excludes; boundary criteria; exactly-one-primary-family; simple/composite
  product examples; unknown/duplicate family rejection.
- Dependencias: decision gate de IDs de familia y registro de la nueva superficie.
- Riesgos: familias definidas por tecnologia o fronteras solapadas.
- Validaciones asociadas: shape, unique IDs/slugs, aliases, boundary completeness,
  exactly-one family, docs-only/mobile/desktop/agentic classification cases.

### Bloque 2 - Capabilities y documentation presets

- Objetivo: normalizar capabilities y definir un documentation preset por familia
  sin duplicar authority o roles.
- Superficies afectadas: capability and documentation preset manifests/guides,
  schemas, composition validator and fixtures.
- Cambios esperados: ocho capabilities universales y transversales normalizadas;
  applicability states; triggers; effective-state constraints; merge strategy per
  capability; expected evidence; security/accessibility baselines; temporary
  exception rules.
- Dependencias: Bloque 1 and capability ID gate.
- Riesgos: requirements duplicados, roles tratados como authority o
  `not_applicable` debilitando obligaciones.
- Validaciones asociadas: known refs, base matrices, required monotonicity,
  conditional activation, exception completeness and no authority mutation.

### Bloque 3 - Component profiles, concerns y composicion

- Objetivo: materializar once profiles y diez concerns como modifier definitions
  reusables y validar su aplicacion por scope.
- Superficies afectadas: modifier manifests/guides, modifier schemas, composition
  engine rules and composite fixtures.
- Cambios esperados: two modifier kinds; selection and non-activation signals;
  compatible families; typed scopes; `capability_id + scope_ref`; dependencies and
  conflicts; five merge strategies; `regulated-data.regulatory_basis`; ownership and
  authority protections.
- Dependencias: Bloque 2 and modifier ID gate.
- Riesgos: profile duplicando family, concern seleccionando stack o dedupe ocultando
  conflicto.
- Validaciones asociadas: 11/10 inventory, scope refs, duplicate slots, merge results,
  unresolved manual conflicts, incompatible family/modifier, regulated basis and
  authority/accountability guards.

### Bloque 4 - Implementation presets y variantes

- Objetivo: materializar golden paths completos por familia/envelope con lifecycle,
  evidence, freshness y variantes acotadas.
- Superficies afectadas: implementation preset manifests/guides, schemas, validator,
  evidence metadata and fixtures.
- Cambios esperados: presets Astro, Rails, Go API, TypeScript/Python/Go package, Go
  CLI, Flutter mobile, Tauri desktop, Python/Dagster and Python/LangGraph; complete
  dimensions; supported profiles/concerns; contraindications; variants; version
  policy; reviewed/review-by; sources; operation and verification.
- Dependencias: Bloques 1-3, primary-source verification and preset ID gate.
- Riesgos: listados tecnologicos incompletos, referencias `latest`, variantes sin
  envelope material, runtime agentic acoplado o fuentes obsoletas.
- Validaciones asociadas: complete-envelope matrix, canonical family refs, bounded
  variants, no free composition, no runtime adapter fields, source/freshness checks,
  lifecycle and reopen triggers.

### Bloque 5 - Cross-catalog conformance y promocion

- Objetivo: cerrar relaciones entre catalogos, consolidar CLI/diagnosticos, promover
  ownership y estado real a fuentes vivas y demostrar no activacion.
- Superficies afectadas: catalog CLI, cross-catalog tests, top-level conformance,
  README/index/architecture/transition/bootstrap docs and patch artifacts.
- Cambios esperados: one command validates all catalogs and fixtures; diagnostics
  identify catalog/path/id/cause; guide coverage checked; simple and composite product
  fixtures traverse family + documentation + modifiers + implementation references;
  live docs register catalogs without claiming adoption, release or portability.
- Dependencias: Bloques 1-4.
- Riesgos: validation duplicated across schemas and code, docs drift, or catalogs
  interpreted as active automation.
- Validaciones asociadas: full catalog suite, global repository suite, no writes,
  no external runtime dependency, no v2 writer/workspace activation, `git diff
  --check`, manual source/freshness review.

## 6. Datos, schemas y contratos

- Contratos documentales afectados: architecture layer map, canonical registry,
  target layout, transition inventory and bootstrap capability claims.
- Datos o contenido afectados: family, capability, documentation preset, modifier and
  implementation preset definitions; guide metadata; source/evidence refs.
- Schemas o modelos afectados: new catalog schemas only. Patch manifest schemas v1/v2
  remain unchanged.
- Compatibilidad esperada: new canonical IDs reject unknown references; research IDs
  may survive as aliases; no historical patch or validator fixture is rewritten;
  catalog definitions remain reusable and adoption-neutral.

## 7. Validaciones previstas

### Documentales

- Registry assigns role, authority, owner and verification default to
  `paw/catalogs/**`.
- Architecture distinguishes catalogs from core, tooling, tests and adapters.
- Guides do not contradict canonical manifests.
- Status docs avoid claims of portability, release, automatic adoption or workflow
  activation.

### Tecnicas

- Existing deterministic commands from `AGENTS.md`.
- New catalog validator against canonical manifests.
- New valid/invalid catalog fixture suite.
- Contract tests for each catalog class and cross-reference rules.
- Top-level conformance for ownership, guide coverage, runtime neutrality, read-only
  behavior and no activation.
- `git diff --check`.

### Manuales

- Human gate for definitive family, capability, modifier and preset IDs.
- Primary-source review for technology support and lifecycle evidence.
- Review that every golden path closes all applicable completeness dimensions.
- Review that profiles and concerns do not select technology or alter authority.
- Review that variants have material envelopes and remain subordinate.

## 8. Riesgos y mitigaciones

- New contract surface: register ownership before closure and keep adapters/workflow
  inactive.
- Cross-reference complexity: validate in ordered layers and emit stable IDs.
- Catalog over-modeling: implement only approved semantics and required fixtures.
- Evidence freshness: require review dates, policies and reopen triggers.
- Research leakage: preserve aliases/provenance but write distributed docs in English
  and validate from live manifests.
- Hidden free matrix: model variants as named subordinate contracts, not combinable
  technology options.

## 9. Decisiones humanas abiertas

- Estado: `non-blocking-for-task-breakdown`
- Gates:
  - definitive family IDs before closing Block 1;
  - definitive capability/documentation preset IDs before closing Block 2;
  - definitive modifier IDs before closing Block 3;
  - definitive implementation preset IDs and support policies before closing Block 4.

## 10. Criterio de cierre tecnico

- [x] alcance respeta `definicion.md`
- [x] zonas afectadas identificadas
- [x] bloques secuenciables
- [x] validaciones reales y proporcionales
- [x] assumptions criticas clasificadas
- [x] gates humanos ubicados antes del cierre de cada contrato
- [x] no hay decisiones abiertas que bloqueen la division en fases

## 11. Registro de cambios

- `2026-06-15`
  - Plan brownfield inicial sobre la implementacion integrada de patch 03.
  - `paw/catalogs/**` definido como superficie contractual propuesta.
  - Cinco bloques separan los cuatro entregables vinculantes y reconciliacion final.

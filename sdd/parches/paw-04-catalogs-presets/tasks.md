# Tasks: paw-04-catalogs-presets

## Estado

- Change id: `paw-04-catalogs-presets`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-backlog`
- Ultima actualizacion: `2026-06-15`
- Owner: sesion Codex activa con aprobacion humana

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-04-catalogs-presets/patch.yaml`
- `sdd/parches/paw-04-catalogs-presets/definicion.md`
- `sdd/parches/paw-04-catalogs-presets/plan.md`
- `sdd/parches/paw-04-catalogs-presets/decision.log`
- related docs declarados en el manifest

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas antes de dividir fases
- [x] no hay decisiones abiertas que bloqueen el task breakdown
- [x] `paw-03-schema-validator-compatibility` cerrado e integrado
- [x] politica provisional de commits registrada

## 3. Resumen del plan

- Materializar `paw/catalogs/**` como owner contractual de catalogs y presets.
- Construir primero familias, luego documentation presets, modifiers e
  implementation presets.
- Mantener schemas/validation en `paw/tools/**` y evidence en `paw/tests/**`.
- Cerrar IDs mediante gates por fase y terminar con conformance cruzada y promocion.

## 4. Fases

### Fase 1 - Familias y foundation de catalogos

- Objetivo: crear la superficie de catalogos y canonizar la taxonomia de ocho
  familias con fronteras verificables.
- Origen en `plan.md`: Bloque 1.
- Precondiciones: preparacion SDD committed; patch 03 integrado; gate de IDs listo
  para resolverse.
- Tareas:
  - crear `paw/catalogs/**` y registrar ownership provisional;
  - definir schema base, manifest y guide de familias;
  - canonizar IDs, aliases, intencion, inclusiones, exclusiones y fronteras;
  - implementar validacion de shape, unicidad, referencias y familia primaria unica;
  - agregar fixtures de productos simples y casos frontera;
  - cerrar el gate humano de IDs de familia.
- Archivos o areas probables:
  - `paw/catalogs/**`
  - `paw/tools/schemas/catalogs/**`
  - `paw/tools/**`
  - `paw/tests/contract/**`
  - `paw/tests/fixtures/catalogs/**`
  - `docs/**` solo para ownership minimo necesario
- Validaciones:
  - ocho familias exactas y IDs unicos;
  - docs-only, mobile, desktop y agentic boundary cases;
  - unknown/duplicate/multiple-primary rejection;
  - validaciones globales proporcionales.
- Criterio de cierre: taxonomia canonical machine/human-readable, gate de IDs
  registrado, fixtures verdes y backlog actualizado.

### Fase 2 - Capabilities y documentation presets

- Objetivo: definir requirements documentales efectivos por familia y reglas de
  aplicabilidad, evidencia, excepciones y merge.
- Origen en `plan.md`: Bloque 2.
- Precondiciones: Fase 1 cerrada; family refs estables.
- Tareas:
  - normalizar capabilities universales y transversales;
  - definir documentation preset por familia;
  - modelar applicability, triggers, merge strategy y expected evidence;
  - codificar baselines de seguridad y accesibilidad;
  - proteger required/conditional activos frente a `not_applicable`;
  - modelar excepciones temporales y auditables;
  - cerrar gate de IDs de capabilities y documentation presets.
- Archivos o areas probables:
  - `paw/catalogs/capabilities/**`
  - `paw/catalogs/documentation-presets/**`
  - `paw/tools/schemas/catalogs/**`
  - `paw/tools/**`
  - `paw/tests/**`
- Validaciones:
  - referencias conocidas y merge strategy declarada;
  - matriz de security/accessibility;
  - applicability efectiva y monotonicidad;
  - excepciones completas y no authority mutation;
  - validaciones globales proporcionales.
- Criterio de cierre: presets derivables sin doctrina duplicada, gate de IDs
  registrado y todos los casos validan.

### Fase 3 - Component profiles, concerns y composicion

- Objetivo: materializar los 21 modifiers y validar scopes, slots, merge y conflictos.
- Origen en `plan.md`: Bloque 3.
- Precondiciones: Fase 2 cerrada; capabilities estables.
- Tareas:
  - definir contrato comun y kinds `component`/`concern`;
  - materializar 11 profiles y 10 concerns;
  - modelar selection, non-activation, compatibility, dependencies and conflicts;
  - validar scopes y slot key `capability_id + scope_ref`;
  - implementar merge strategies y manual conflicts;
  - exigir `regulatory_basis` para regulated data;
  - proteger authority y accountable owner;
  - cerrar gate de IDs de modifiers.
- Archivos o areas probables:
  - `paw/catalogs/modifiers/**`
  - `paw/tools/schemas/catalogs/**`
  - `paw/tools/**`
  - `paw/tests/**`
- Validaciones:
  - inventario 11/10;
  - simple and composite modifier fixtures;
  - dedupe, merge and unresolved conflict cases;
  - incompatible family, missing scope and missing regulatory basis;
  - authority/accountability guards;
  - validaciones globales proporcionales.
- Criterio de cierre: modifiers completos y componibles sin seleccionar stack ni
  ocultar conflictos, con gate de IDs registrado.

### Fase 4 - Implementation presets y evidencia

- Objetivo: materializar golden paths completos, versionados y revisables por
  familia/envelope.
- Origen en `plan.md`: Bloque 4.
- Precondiciones: Fases 1-3 cerradas; referencias de familia/profile/concern estables.
- Tareas:
  - verificar fuentes primarias y lifecycle de tecnologias;
  - materializar presets y guias por familia/envelope;
  - declarar complete envelope, invariants, applicability and contraindications;
  - modelar fixed decisions, bounded choices, parameters and named variants;
  - declarar quality, security, supply chain, testing, operation and verification;
  - registrar reviewed_at, review_by, evidence refs and reopen triggers;
  - rechazar `latest`, matrices libres y runtime agentic acoplado;
  - cerrar gate de IDs y support policies de presets.
- Archivos o areas probables:
  - `paw/catalogs/implementation-presets/**`
  - `paw/tools/schemas/catalogs/**`
  - `paw/tools/**`
  - `paw/tests/**`
- Validaciones:
  - inventory and family coverage;
  - completeness dimensions;
  - bounded variants and invalid free combinations;
  - sources/freshness/version policies;
  - runtime independence;
  - validaciones globales proporcionales.
- Criterio de cierre: cada envelope tiene un golden path coherente, evidence-backed,
  human-readable y machine-validable, con gate registrado.

### Fase 5 - Cross-catalog conformance y reconciliacion final

- Objetivo: consolidar validation, fixtures y fuentes vivas y dejar el patch listo
  para `sdd-close`.
- Origen en `plan.md`: Bloque 5.
- Precondiciones: Fases 1-4 cerradas y todos los IDs canonicos.
- Tareas:
  - exponer catalog validation determinista y documentada;
  - completar fixtures end-to-end simples y compuestos;
  - agregar conformance de ownership, guides, read-only y runtime neutrality;
  - registrar `paw/catalogs/**` en docs y target layout;
  - actualizar estado publico y transicion sin claims de activacion/portabilidad;
  - revisar drift, decisions, assumptions, risks and deferred work;
  - preparar artifacts para `sdd-close`.
- Archivos o areas probables:
  - `paw/tools/**`
  - `paw/tests/**`
  - `tests/**`
  - `README.md`
  - `docs/**`
  - `paw/README.md`
  - `paw/catalogs/README.md`
  - artifacts SDD del patch
- Validaciones:
  - catalog validator and fixtures;
  - complete PAW/SDD test suite;
  - guide/manifest cross-checks;
  - no writes, no external runtime coupling and no workflow activation;
  - `git diff --check`;
  - manual primary-source and completeness review.
- Criterio de cierre: catalogs, schemas, validators, fixtures, guides, live docs and
  SDD artifacts aligned with no unclassified drift.

## 5. Dependencias entre fases

- Fase 1 bloquea: Fase 2.
- Fase 2 bloquea: Fase 3.
- Fase 3 bloquea: Fase 4.
- Fase 4 bloquea: Fase 5.
- Fase 5 bloquea: `sdd-close`.

La secuencia es deliberada: cada catalogo consume IDs y semantica estabilizados por
la fase anterior.

## 6. Decisiones y bloqueos

- Decisiones abiertas bloqueantes para task breakdown: ninguna.
- Gates de ejecucion:
  - IDs de familia en Fase 1;
  - IDs de capabilities/documentation presets en Fase 2;
  - IDs de modifiers en Fase 3;
  - IDs y support policies de implementation presets en Fase 4.
- Stop conditions:
  - una family queda definida por technology;
  - profile duplica family;
  - concern cambia authority/accountability;
  - parameters permiten composicion ilimitada;
  - preset carece de evidence o freshness sustentable.

## 7. Validaciones globales

- [ ] `node sdd/tools/validate-sdd.mjs`
- [ ] `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] `node paw/tools/validate-patches.mjs --json`
- [ ] `node paw/tools/validate-patches.mjs --fixtures --json`
- [ ] `node --test paw/tests/contract/patch-parsing.test.mjs`
- [ ] `node --test paw/tests/contract/patch-validation.test.mjs`
- [ ] `node --test paw/tests/contract/validator-cli.test.mjs`
- [ ] `node --test tests/sdd-validation.test.mjs`
- [ ] `node --test tests/foundation-governance.test.mjs`
- [ ] `node --test tests/core-contracts.test.mjs`
- [ ] `node --test tests/schema-validator-conformance.test.mjs`
- [ ] catalog-specific contract and conformance tests introduced by this patch
- [ ] `git diff --check`
- [ ] manual review of primary sources, IDs, completeness and no activation

## 8. Trabajo diferido

- Adoption records and assessments: `paw-05-adapter-adoption-contracts`.
- Role semantics and general workflow conformance: `paw-06-workflow-conformance`.
- Execution skills and shared toolkit: `paw-07`.
- Portable VCS policy: `paw-08-vcs-pr-integration`.
- Packaging and installation: `paw-09`.
- Runtime adapters and candidate activation: `paw-10`.
- Pilots and cutover: patches 11-14.

## 9. Politica de commits por fase

- Crear el commit de preparacion SDD antes de implementation.
- Cerrar backlog y ejecutar validations antes de cada phase commit.
- Crear al menos un Conventional Commit por fase.
- Dividir schema/runtime, catalogs/guides o tests/docs cuando expresen intenciones
  distintas.
- No publicar WIP ni reescribir historia sin autorizacion humana.
- Crear un commit independiente y no sustantivo despues de `sdd-close`.

## 10. Criterio de cierre

- [x] cada fase tiene objetivo, precondiciones, tareas, validaciones y criterio de cierre
- [x] cada tarea es trazable al `plan.md`
- [x] las validaciones son reales
- [x] gates, stop conditions y trabajo diferido estan visibles
- [x] politica provisional de commits reflejada operativamente

## 11. Registro de cambios

- `2026-06-15`
  - Division inicial en cinco fases trazables a los bloques del plan.
  - Cuatro entregables vinculantes preservados y reconciliacion final separada.

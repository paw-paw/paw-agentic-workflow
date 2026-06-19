# Definicion: paw-05-adapter-adoption-contracts

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no
introduce nuevas decisiones de producto por si solo.

---

## Estado

- Change id: `paw-05-adapter-adoption-contracts`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `active`
- Fuente: `_inbox/final/05-adapter-adoption-contracts-handoff.md`
- Ultima actualizacion: 2026-06-19
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Objetivo

Definir y materializar los contratos que explican como un repositorio adopta PAW
sin confundir presets reutilizables con decisiones locales ni realidad observada.
El patch debe separar repo adapter, stack adapter, runtime adapter, adoption record,
assessment y overrides controlados. Tambien debe agregar schemas, fixtures,
validadores y ejemplos que demuestren adopcion exacta, variante soportada,
excepcion local y rechazo, usando los catalogos de `paw-04` como referencia.

Al cierre, PAW debe poder describir una adopcion greenfield o brownfield de forma
trazable, validable y sin activar workflow v2, adapters concretos, instaladores,
seleccion automatica de stacks ni claims de portabilidad.

---

## 2. No objetivos

- Implementar un adapter Codex concreto.
- Implementar integracion concreta con GitHub o politica VCS portable.
- Automatizar la seleccion de stacks o recomendar tecnologias sin evidencia del repo.
- Cambiar un repositorio consumidor o ejecutar adopcion real fuera de fixtures.
- Activar `paw/parches/**`, writers v2, `paw-*` skills, packaging, releases o Pages.
- Convertir overrides locales en doctrina global por repeticion.
- Reabrir los catalogos de familias, modifiers o presets salvo para detectar drift.

---

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/NAMING.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/core/README.md`
- `paw/core/authority-and-evidence.md`
- `paw/core/artifact-lifecycle.md`
- `paw/core/decision-gates.md`
- `paw/core/compatibility-policy.md`
- `paw/catalogs/README.md`
- `paw/catalogs/**`
- `sdd/parches/paw-04-catalogs-presets/cierre.md`
- `_inbox/final/05-adapter-adoption-contracts-handoff.md`
- `_inbox/decision_ledger.md`, solo como clarificacion excepcional

---

## 4. Alcance

### Si entra

- Crear contratos legibles para adoption records, assessments, overrides,
  resolucion de capas y los tres adapter types.
- Materializar schemas para repo adapter, stack adapter, runtime adapter, adoption
  record y assessment.
- Validar referencias contra catalogos existentes de familias, documentation
  presets, modifiers e implementation presets.
- Crear fixtures greenfield y brownfield con casos validos e invalidos.
- Crear ejemplos para adopcion exacta, variante soportada, excepcion local y
  rechazo.
- Documentar diferencias obligatorias entre preset definition, adoption record,
  stack realization y assessment.
- Reconciliar fuentes vivas para registrar la nueva superficie de adopcion sin
  activar workflow v2 ni runtime adapters concretos.

### Fuera de alcance

- Cambios sustantivos en los catalogos del patch 04.
- Skills, scripts o agentes `paw-*`.
- Runtime adapter Codex, Claude Code o Antigravity concretos.
- Instalacion, distribucion, packaging, release automation o CI.
- Politica VCS portable, branch automation o PR integration.
- Pilotos greenfield o brownfield reales.

---

## 5. Superficies afectadas

### Docs

- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/README.md`
- nuevo `paw/adoption/**`
- `paw/tools/README.md`
- `paw/tests/README.md`

### Codigo o contenido

- `paw/tools/schemas/adoption/**`
- `paw/tools/adoption/**`
- `paw/tools/validate-adoption.mjs`
- `paw/tests/fixtures/adoption/**`
- `paw/tests/contract/**`
- `tests/*conformance*.test.mjs`

### Configuracion o validacion

- `sdd/tools/validate-sdd.mjs`, solo si debe excluir o reconocer nuevos fixtures.
- Validaciones existentes listadas en `AGENTS.md`.
- Nuevas validaciones deterministas de adopcion si el patch las introduce.

---

## 6. Decisiones conocidas

- decision: basar patch 05 sobre el cierre de `paw-04-catalogs-presets`.
  - razon: los schemas y validadores de adopcion deben referenciar catalogos vivos.
  - documentos o areas afectadas: branch base, `decision.log`, plan y tasks.
- decision: aplicar la politica provisional de commits de `paw-foundation`.
  - razon: instruccion humana explicita para este patch.
  - documentos o areas afectadas: `decision.log`, secuencia de commits y cierre.
- decision: planificar una superficie `paw/adoption/**`.
  - razon: adoption contracts y adapter contracts no pertenecen al micro-core ni a
    catalogos, herramientas, tests, runtime o governance local.
  - documentos o areas afectadas: docs vivos, schemas, validadores y fixtures.

---

## 7. Assumptions

- Patch 04 esta cerrado en la branch `patch/paw-04-catalogs-presets` y sus catalogos
  son la base tecnica de este patch.
- Los schemas pueden implementarse con Node.js standard library, siguiendo los
  patrones de `paw/tools/**`, sin agregar dependencias.
- `paw/adoption/**` puede registrarse como nueva superficie portable sin activar
  adopcion automatica ni el workflow v2.
- La diferencia entre variante y excepcion se puede validar mediante referencias a
  variants declaradas en implementation presets y mediante override metadata
  obligatoria.

---

## 8. Decisiones abiertas

- Ninguna decision humana bloqueante para pasar a `sdd-plan`.

---

## 9. Riesgos

- riesgo: el repo adapter empieza a contener reglas universales.
  - impacto: se rompe la separacion entre adoption local y doctrina portable.
  - mitigacion: schema y guias deben limitarlo a autoridad, rutas, comandos,
    superficies y reglas locales.
- riesgo: el stack adapter se convierte en un implementation preset implicito.
  - impacto: se evita el catalogo y se habilita una matriz libre no aprobada.
  - mitigacion: stack adapter debe registrar realidad y diferencias, no prescribir
    golden paths reutilizables.
- riesgo: el runtime adapter altera outputs metodologicos.
  - impacto: un runtime podria cambiar workflow, arquitectura o stack aprobado.
  - mitigacion: runtime adapter solo traduce capacidades, paths, triggers, assets,
    permisos y opciones del runtime.
- riesgo: variantes y excepciones quedan indistinguibles.
  - impacto: no hay conformance accionable.
  - mitigacion: validators deben exigir que variants referencien opciones declaradas
    y que exceptions tengan owner, scope, approval, evidence y review.
- riesgo: overrides persisten sin owner o revision.
  - impacto: excepciones locales se vuelven doctrina accidental.
  - mitigacion: override schema debe requerir approval authority, expiration o review
    condition e impacto de conformance.

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

- Fecha: 2026-06-19
  - cambio: intake inicial del handoff 05.
  - razon: iniciar workspace SDD formal para planificar la implementacion.


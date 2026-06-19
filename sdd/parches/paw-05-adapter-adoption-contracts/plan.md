# Plan: paw-05-adapter-adoption-contracts

---

## Estado

- Change id: `paw-05-adapter-adoption-contracts`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-tasks`
- Ultima actualizacion: 2026-06-19
- Owner: sesion Codex activa con aprobacion humana
- Depende de: `paw-04-catalogs-presets`
- Desbloquea: `paw-06-workflow-conformance`, `paw-07-codex-runtime-tooling`,
  `paw-10-claude-antigravity-adapters`, pilots 11-13

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-05-adapter-adoption-contracts/patch.yaml`
- `sdd/parches/paw-05-adapter-adoption-contracts/definicion.md`
- `sdd/parches/paw-05-adapter-adoption-contracts/decision.log`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/NAMING.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/core/**`
- `paw/catalogs/**`
- `sdd/parches/paw-04-catalogs-presets/cierre.md`

---

## 2. Lectura brownfield

- estructura existente:
  - `paw/core/**` contiene contratos portables del modelo de patch y limites de
    autoridad, evidencia, drift y compatibilidad.
  - `paw/catalogs/**` contiene definiciones portables de familias, capabilities,
    documentation presets, modifiers e implementation presets.
  - `paw/tools/**` ya tiene validators por dominio y schemas bajo subcarpetas.
  - `paw/tests/**` ya separa fixtures de patch y fixtures de catalogos.
  - `sdd/parches/**` sigue siendo el unico workspace activo antes del cutover.
- patrones existentes:
  - Manifiestos canonicos en JSON con guias Markdown explicativas.
  - Validadores Node.js sin dependencias externas.
  - Fixtures validos e invalidos con `case.json` y `expected.json` por dominio.
  - Tests contractuales bajo `paw/tests/contract/**` y conformance top-level.
  - Reconciliacion de `docs/README.md`, arquitectura, transicion y bootstrap status
    antes del cierre.
- deuda o drift relevante:
  - `BOOTSTRAP-STATUS.md` dice que adapters, adoption records y assessments aun no
    estan implementados; el patch debe reconciliar ese estado al cierre.
  - `paw/catalogs/README.md` declara que catalogs no activan adoption automation; el
    patch debe mantener esa frontera.
  - No existe todavia superficie `paw/adoption/**`, por lo que debe registrarse en
    docs vivos si se materializa.
- restricciones tecnicas:
  - No agregar dependencias salvo decision explicita.
  - No escribir `paw/parches/**` ni activar writers v2.
  - No implementar adapters concretos de runtime.
  - No duplicar doctrina de catalogos dentro de adoption records; usar referencias
    validadas.

---

## 3. Assumptions

- Los contratos de adopcion pueden vivir bajo `paw/adoption/**` con schemas y tooling
  separados bajo `paw/tools/**`.
- La validacion de referencias a catalogos puede reutilizar loaders/patrones de
  `paw/tools/catalogs/**`.
- Los ejemplos de adopcion exacta, variante, excepcion y rechazo pueden ser fixtures
  contractuales sin implicar adopcion real de este repositorio.

---

## 4. Zonas afectadas

### Docs

- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/README.md`
- `paw/adoption/README.md`
- `paw/adoption/adapters/README.md`
- `paw/adoption/records/README.md`
- `paw/adoption/assessments/README.md`
- `paw/adoption/examples/README.md`
- `paw/tools/README.md`
- `paw/tests/README.md`

### Codigo

- `paw/tools/schemas/adoption/*.schema.json`
- `paw/tools/adoption/*.mjs`
- `paw/tools/validate-adoption.mjs`

### Configuracion, tests o build

- `paw/tests/contract/*adoption*.test.mjs`
- `paw/tests/fixtures/adoption/**`
- `tests/*adoption*conformance.test.mjs`
- Posible ajuste menor de runners existentes si los nuevos fixtures requieren
  aislamiento por dominio.

---

## 5. Bloques de implementacion

### Bloque 1 - Superficie y modelo contractual

- Objetivo: crear `paw/adoption/**` con la separacion conceptual entre preset
  definition, adoption record, stack realization, assessment, adapter y override.
- Superficies afectadas: `paw/adoption/**`, `docs/README.md`, architecture docs.
- Cambios esperados:
  - README raiz de adoption.
  - Contrato de capas y resolucion.
  - Responsabilidades disjuntas de repo, stack y runtime adapters.
  - Reglas de no activacion y no portabilidad.
- Dependencias: cierre de patch 04 y definition aprobada.
- Riesgos: duplicar catalogos o micro-core.
- Validaciones asociadas: revision documental, conformance de autoridad y no
  activacion.

### Bloque 2 - Schemas base y adapter contracts

- Objetivo: materializar schemas y validator inicial para repo adapter, stack adapter
  y runtime adapter.
- Superficies afectadas: `paw/tools/schemas/adoption/**`,
  `paw/tools/adoption/**`, `paw/tests/fixtures/adoption/adapters/**`.
- Cambios esperados:
  - Repo adapter schema con autoridad, rutas, comandos, mapa documental, superficies,
    politica VCS local, reglas locales y root detection.
  - Stack adapter schema con stack real, versiones, comandos, checks, deploy,
    divergencias y restricciones brownfield.
  - Runtime adapter schema con paths, packaging, triggers, assets, references,
    scripts, permisos, approvals y capacidades opcionales.
  - Reglas que impidan que runtime adapter elija stack o que stack adapter cree un
    preset implicito.
- Dependencias: Bloque 1.
- Riesgos: sobregeneralizacion de repo adapter o runtime adapter doctrinal.
- Validaciones asociadas: fixtures validos e invalidos de adapter responsibilities.

### Bloque 3 - Adoption records, overrides y resolution semantics

- Objetivo: materializar schema para adoption record y reglas de binding, variantes,
  excepciones y overrides.
- Superficies afectadas: `paw/adoption/records/**`, schemas, validator y fixtures.
- Cambios esperados:
  - Campos obligatorios: aplicabilidad, `binding_mode`, `approval_policy`,
    `resolution_status`, responsable, evidencia y fecha de revision.
  - Distincion validable entre parametro dentro del envelope, variante soportada,
    excepcion local y necesidad de nuevo preset.
  - Override metadata obligatoria: valor sustituido, razon, alcance, aprobador,
    expiracion o condicion de revision e impacto en conformance.
- Dependencias: Bloques 1 y 2; catalogos de implementation presets.
- Riesgos: overrides sin owner/review o variants no declaradas.
- Validaciones asociadas: fixtures de exact adoption, supported variant, local
  exception, rejected preset y invalid override.

### Bloque 4 - Assessment contracts y catalog reference validation

- Objetivo: materializar assessment schema y validacion cruzada entre adoption
  record, adapters, stack realization y catalogos.
- Superficies afectadas: `paw/adoption/assessments/**`,
  `paw/tools/adoption/**`, fixtures greenfield/brownfield.
- Cambios esperados:
  - Assessment compara preset, adoption decision y realidad observada.
  - Greenfield exige decision antes de scaffolding o codigo.
  - Brownfield empieza por observar repo y stack, adopta lo compatible y registra
    deuda o excepciones.
  - Validator rechaza IDs desconocidos de familia, documentation preset, modifiers,
    implementation presets y variants.
- Dependencias: Bloques 1-3 y catalog loader.
- Riesgos: assessment decide automaticamente stack o familia sin evidencia.
- Validaciones asociadas: fixture runner de adoption, referencia a catalogos y
  mensajes accionables.

### Bloque 5 - Reconciliacion, conformance y cierre

- Objetivo: integrar la nueva superficie en docs vivos, tests globales y cierre SDD.
- Superficies afectadas: docs vivos, `paw/tools/README.md`, `paw/tests/README.md`,
  tests top-level, `sdd/parches/.../backlog`, `cierre.md`.
- Cambios esperados:
  - Registrar `paw/adoption/**` en `docs/README.md`.
  - Actualizar arquitectura, transicion y bootstrap status sin claims de activacion.
  - Agregar comandos de validacion si quedan como deterministic checks.
  - Ejecutar validaciones completas y clasificar drift, riesgos y pendientes.
- Dependencias: Bloques 1-4 cerrados.
- Riesgos: cierre con reglas durables no promovidas.
- Validaciones asociadas: suite de AGENTS, validators de patch/catalog/adoption,
  tests contractuales y `git diff --check`.

---

## 6. Datos, schemas y contratos

- Contratos documentales afectados:
  - Nuevo contrato portable `paw/adoption/**`.
  - Registro y estado en docs vivos.
- Datos o contenido afectados:
  - Ejemplos y fixtures de adoption greenfield y brownfield.
- Schemas o modelos afectados:
  - `repo-adapter.schema.json`
  - `stack-adapter.schema.json`
  - `runtime-adapter.schema.json`
  - `adoption-record.schema.json`
  - `assessment.schema.json`
  - posibles schemas compartidos para evidence, overrides y resolution.
- Compatibilidad esperada:
  - No cambiar schema de patch v1/v2.
  - No cambiar catalogos salvo drift imprescindible.
  - No activar workflows ni adapters concretos.

---

## 7. Validaciones previstas

### Documentales

- [ ] verificar alineacion con `docs/README.md`
- [ ] verificar que `paw/adoption/**` no duplica `paw/core/**` ni `paw/catalogs/**`
- [ ] verificar que docs vivos no declaran portabilidad, packaging o activation

### Tecnicas

- [ ] `node sdd/tools/validate-sdd.mjs`
- [ ] `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] `node paw/tools/validate-patches.mjs --json`
- [ ] `node paw/tools/validate-patches.mjs --fixtures --json`
- [ ] `node paw/tools/validate-catalogs.mjs --json`
- [ ] `node paw/tools/validate-catalogs.mjs --fixtures --json`
- [ ] nuevo validator de adoption, si se introduce
- [ ] `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
- [ ] `git diff --check`

### Manuales

- [ ] revision de separacion repo adapter / stack adapter / runtime adapter
- [ ] revision de no activacion de workflow v2, writers o runtime adapters concretos
- [ ] revision de fixtures para exact, variant, exception y rejection

---

## 8. Riesgos y mitigaciones

- riesgo: `paw/adoption/**` se percibe como automation lista para uso.
  - impacto: adopcion prematura antes de pilots y cutover.
  - mitigacion: docs vivos y README deben decir que son contratos materializados,
    no workflow activo ni instalador.
- riesgo: validator de adoption replica validacion de catalogos.
  - impacto: drift entre dominios de validacion.
  - mitigacion: reutilizar referencias a catalogos canonicos y mantener errores de
    adoption enfocados en binding/resolution.
- riesgo: stack realization se usa como doctrina.
  - impacto: se pierde distincion entre realidad observada y preset reusable.
  - mitigacion: assessment debe clasificar diferencias, no promoverlas.

---

## 9. Decisiones humanas abiertas

- Estado: `none`

---

## 10. Criterio de cierre tecnico

- [x] el alcance respeta `definicion.md`
- [x] las zonas afectadas estan identificadas
- [x] los bloques de implementacion son secuenciables
- [x] las validaciones son reales y proporcionales
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] no hay decisiones abiertas que bloqueen la division en fases

---

## 11. Registro de cambios

- Fecha: 2026-06-19
  - cambio: plan tecnico brownfield inicial.
  - razon: preparar fases ejecutables para `sdd-tasks`.


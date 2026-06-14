# Plan: paw-03-schema-validator-compatibility

## Estado

- Change id: `paw-03-schema-validator-compatibility`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-tasks`
- Ultima actualizacion: `2026-06-14`
- Owner: sesion Codex activa con aprobacion humana
- Depende de: `paw-02-core-patch-contracts` cerrado
- Desbloquea: `paw-04-catalogs-presets`

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-03-schema-validator-compatibility/patch.yaml`
- `sdd/parches/paw-03-schema-validator-compatibility/definicion.md`
- `sdd/parches/paw-03-schema-validator-compatibility/decision.log`
- related docs declarados en el manifest
- `paw/core/artifact-lifecycle.md`
- `sdd/tools/**`, `sdd/tests/**` y `tests/**` como implementacion brownfield

## 2. Lectura brownfield

- `sdd/tools/validate-sdd.mjs` concentra parsing YAML, validacion de manifest,
  contrato batch, recorrido del repo, links, fixtures y CLI en un solo modulo.
- El parser soporta solo scalars, arrays simples, comentarios y claves top-level; no
  reporta linea estructurada ni rechaza todas las formas ambiguas de YAML.
- La validacion aplica directamente reglas v1 y asume `schema_version: 1`; no existe
  una etapa separada de deteccion, dispatch o reporte tipado.
- `sdd/tools/schemas/patch.schema.json` documenta v1, pero el runtime no consume JSON
  Schema. La implementacion debe evitar fingir enforcement declarativo inexistente.
- `sdd/tests/fixtures/**` usa un `expected.json` booleano y cubre pocos casos v1.
- `tests/sdd-validation.test.mjs` solo comprueba arrays vacios; no prueba CLI, JSON,
  severidades, version, roots ni exit codes.
- `tests/foundation-governance.test.mjs` exige que `paw/tools/**` y `paw/tests/**`
  permanezcan como orientacion inactiva y controla el inventario exacto de `paw/**`.
- No hay dependencias npm ni package runtime; los checks actuales usan Node.js
  standard library y deben conservar esa propiedad.

## 3. Assumptions

- El schema v1 existente conserva path y significado para no romper referencias.
- El schema v2 puede agregarse como archivo versionado separado, con nombres que hagan
  observable la version sin renombrar el artifact v1 heredado.
- Las invariantes entre campos se implementaran en codigo aunque parte de la forma
  tambien quede expresada en JSON Schema.
- El CLI puede evolucionar sin romper los comandos actuales: ejecucion sin flags
  valida el repo y `--fixtures` conserva su comportamiento exitoso/fallido.

## 4. Zonas afectadas

### Docs

- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `README.md`
- `AGENTS.md`
- `paw/tools/README.md`
- `paw/tests/README.md`

### Codigo

- `sdd/tools/validate-sdd.mjs`
- posibles modulos enfocados bajo `sdd/tools/validation/**`
- `sdd/tools/schemas/patch.schema.json`
- nuevo schema v2 bajo `sdd/tools/schemas/**`

### Configuracion, tests o build

- `sdd/tests/fixtures/**`
- `tests/sdd-validation.test.mjs`
- nuevos tests de contrato bajo `tests/**`
- `tests/foundation-governance.test.mjs`
- artifacts SDD del patch

## 5. Bloques de implementacion

### Bloque 1 - Contratos fisicos y parsing versionado

- Objetivo: fijar la forma v2 y crear una entrada de parsing que produzca datos o
  diagnosticos estructurados antes de aplicar reglas de version.
- Superficies afectadas: schemas bajo `sdd/tools/schemas/**`, parser y modulos de
  diagnostico bajo `sdd/tools/**`, fixtures unitarios de sintaxis.
- Cambios esperados: schema v2 separado; preservacion explicita del schema v1;
  parser fail-loud con path y causa; detector de version que rechace ausencia,
  versiones desconocidas y ejes hibridos.
- Dependencias: contratos `paw/core/patch-model.md` y compatibility policy.
- Riesgos: sobreextender el subset YAML o duplicar reglas entre schema y codigo.
- Validaciones asociadas: tests de scalars, arrays, null, comentarios, YAML invalido,
  version desconocida e hibridos.

### Bloque 2 - Validadores v1/v2 y compatibilidad historica

- Objetivo: separar dispatch y reglas por version manteniendo intactos los resultados
  validos del runtime v1.
- Superficies afectadas: validator modules, recorrido de `sdd/parches/**`, contrato
  batch v1 y tratamiento legacy.
- Cambios esperados: validator v1 equivalente al comportamiento actual; validator v2
  con invariantes por `patch_mode`, status y fechas; diagnosticos con severidad y
  evidencia; exencion legacy; lectura read-only de historia cerrada.
- Dependencias: Bloque 1.
- Riesgos: regresion en patches activos/cerrados o excepciones historicas demasiado
  amplias.
- Validaciones asociadas: matriz v1/v2 completa, validacion del repo real y prueba de
  no mutacion mediante snapshots/hashes o comparacion de contenido.

### Bloque 3 - CLI y output contractual

- Objetivo: exponer una interfaz automatizable que preserve invocaciones existentes.
- Superficies afectadas: entrypoint `validate-sdd.mjs`, serializacion humana/JSON y
  tests de proceso.
- Cambios esperados: `--help`, `--json`, `--root`, `--version`, `--fixtures`;
  resultado minimo con `status`, `schema_version`, `validated_paths`, `warnings`,
  `errors` y `evidence`; stdout para resultado, stderr para diagnostico y exit codes
  documentados.
- Dependencias: Bloques 1 y 2.
- Riesgos: mezclar errores de uso con errores de validacion o romper scripts actuales.
- Validaciones asociadas: contract tests con `spawnSync`, stdout/stderr, JSON parseable,
  roots permitidos, flags invalidos y exit codes.

### Bloque 4 - Fixtures, conformance y reconciliacion de estado

- Objetivo: completar evidencia de compatibilidad y promover el nuevo estado real a
  las fuentes vivas sin activar v2 como default.
- Superficies afectadas: `sdd/tests/fixtures/**`, tests top-level, docs related y
  orientaciones `paw/tools`/`paw/tests`.
- Cambios esperados: fixtures obligatorios del handoff con expectativas estructuradas;
  checks de independencia de npm/Astro/Codex; docs que distingan validator dual
  transicional de target layout inactivo; listas de comandos actualizadas.
- Dependencias: Bloques 1 a 3.
- Riesgos: inventario foundation fragil o claims de portabilidad/activacion excesivos.
- Validaciones asociadas: suite completa del repo, `git diff --check`, inventario
  manual de namespaces y confirmacion de que skills/writers siguen en v1.

## 6. Datos, schemas y contratos

- Contratos documentales afectados: estado de transicion, ownership de tooling/tests y
  bootstrap capability claims; el core conceptual solo se modifica si aparece drift
  real, no para documentar detalles de implementacion.
- Datos o contenido afectados: manifests de fixtures v1/v2, expectativas JSON y
  diagnosticos de validator.
- Schemas o modelos afectados: schema v1 preservado; nuevo schema v2 con
  `patch_mode`, `creates_docs`, `bootstrap_context` y `program_id` nullable.
- Compatibilidad esperada: v1 activo y validable; v2 validable pero no writable por
  default; legacy exento; historia cerrada no migrada; manifests hibridos rechazados.

## 7. Validaciones previstas

### Documentales

- Alineacion con indice, arquitectura, transition, bootstrap status y core.
- Ningun claim de workflow v2 activo, portabilidad o segundo namespace.
- Reglas durables promovidas a fuente viva; detalles operativos permanecen en tooling.

### Tecnicas

- `node sdd/tools/validate-sdd.mjs`
- `node sdd/tools/validate-sdd.mjs --fixtures`
- `node sdd/tools/validate-sdd.mjs --help`
- `node sdd/tools/validate-sdd.mjs --version`
- `node sdd/tools/validate-sdd.mjs --json`
- `node --test tests/sdd-validation.test.mjs`
- `node --test tests/foundation-governance.test.mjs`
- `node --test tests/core-contracts.test.mjs`
- nuevos tests de parser/validator/CLI definidos por tasks
- `git diff --check`

### Manuales

- Comparar patches v1 antes/despues para confirmar ausencia de mutaciones.
- Confirmar que no existen workspaces, schemas o runtime activo bajo `paw/**`.
- Confirmar que `.codex/skills/sdd-*` sigue escribiendo schema v1.
- Revisar mensajes de error por path, causa y accionabilidad en Windows y POSIX paths.

## 8. Riesgos y mitigaciones

- Parser insuficiente: documentar el subset soportado, rechazar lo ambiguo y cubrirlo
  con fixtures negativos en vez de aceptar parcialmente YAML general.
- Monolito creciente: extraer modulos solo por responsabilidades reales de parsing,
  version dispatch, validacion y reporting; mantener el entrypoint pequeno.
- Divergencia schema/runtime: compartir constantes o tests de conformance que comparen
  campos/enums, sin introducir generacion compleja.
- Compatibilidad permisiva: toda excepcion historica requiere evidencia concreta,
  warning observable y alcance read-only.
- Ruptura de consumers: conservar exports actuales o migrarlos en el mismo patch con
  tests; preservar comandos sin flags y `--fixtures`.

## 9. Decisiones humanas abiertas

- Estado: `none`

## 10. Criterio de cierre tecnico

- [x] alcance respeta `definicion.md`
- [x] zonas afectadas identificadas
- [x] bloques secuenciables
- [x] validaciones reales y proporcionales
- [x] assumptions criticas clasificadas
- [x] sin decisiones abiertas bloqueantes

## 11. Registro de cambios

- `2026-06-14`
  - Plan brownfield inicial.
  - Layout transicional fijado en la superficie activa v1.

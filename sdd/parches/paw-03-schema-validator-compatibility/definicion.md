# Definicion: paw-03-schema-validator-compatibility

## Estado

- Change id: `paw-03-schema-validator-compatibility`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `active`
- Fuente: approved final handoff 03
- Ultima actualizacion: `2026-06-14`
- Owner: sesion Codex activa con aprobacion humana

## 1. Objetivo

Implementar un contrato fisico de manifest v2 y extender el validator activo para
leer y validar manifests v1 y v2 de forma explicita, determinista y sin mutaciones.
El cambio debe convertir los contratos conceptuales de `paw/core/**` en evidencia
ejecutable, preservar la historia v1 y mantener v1 como unico default de escritura y
workflow hasta el cutover aprobado.

## 2. No objetivos

- No activar `paw/parches/**`, writers v2 ni el workflow v2 por default.
- No migrar o reescribir workspaces v1 abiertos, cerrados o legacy.
- No modificar skills, templates o writers para producir v2 por default.
- No implementar catalogs, presets, workflow, adapters o mutation envelopes.
- No declarar portabilidad multiruntime, packaging, release o CI remoto.
- No redefinir el modelo conceptual aprobado por patch 02.

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/core/patch-model.md`
- `paw/core/compatibility-policy.md`
- `paw/core/artifact-lifecycle.md`
- `sdd/tools/validate-sdd.mjs` y `sdd/tools/schemas/patch.schema.json` como baseline
  operativo v1
- approved final handoff 03 and decision ledger as binding private input

## 4. Alcance

### Si entra

- Schema fisico v2 alineado con los campos e invariantes del core.
- Implementacion canonica del schema y validator PAW bajo `paw/tools/**`.
- Lectura YAML acotada y deteccion explicita de schema antes de validar.
- Validacion dual v1/v2 y rechazo de manifests hibridos o desconocidos.
- Diagnosticos clasificados como error, warning o compatibilidad historica.
- CLI determinista con ayuda, version, root seleccionable, JSON y exit codes estables.
- Fixtures positivos y negativos de v1, v2, legacy, sintaxis y paths.
- Tests de parsing, invariantes, CLI, output estructurado y validacion del repo.
- Reconciliacion de docs de estado y comandos operativos afectados.

### Fuera de alcance

- Escritura, conversion o migracion automatica de manifests.
- Activacion global del target workflow o dos copias activas del validator.
- Routing de skills segun schema version.
- Validacion de artifacts futuros no definidos por este patch.
- Semantica VCS portable o automatizacion de commits.

## 5. Superficies afectadas

### Docs

- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `README.md`
- `AGENTS.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `sdd/tools/` documentation as needed for the v1 compatibility bridge

### Codigo o contenido

- new schemas and validation modules under `paw/tools/**`
- `sdd/tools/validate-sdd.mjs` only as the active v1 entrypoint or compatibility bridge
- `sdd/tools/schemas/patch.schema.json` preserved as the identifiable v1 schema

### Configuracion o validacion

- `paw/tests/fixtures/**`
- `paw/tests/contract/**`
- `sdd/tests/fixtures/**` preserved for v1 compatibility
- `tests/sdd-validation.test.mjs`
- new focused validator contract tests under `tests/**`
- `tests/foundation-governance.test.mjs`
- patch artifacts under `sdd/parches/paw-03-schema-validator-compatibility/**`

## 6. Decisiones conocidas

- El schema v2 y validator PAW se implementan canonicamente bajo `paw/tools/**`.
- Los fixtures v1/v2 y contract tests portables se implementan bajo `paw/tests/**`;
  `sdd/tests/**` preserva evidencia v1.
- `sdd/tools/validate-sdd.mjs` puede mantenerse como entrypoint v1 compatible o
  delegar en tooling PAW sin duplicar la implementacion canonica.
- La deteccion de version precede a toda validacion especifica y los manifests
  hibridos fallan de forma explicita.
- El soporte v2 es read/validate only para este patch y no cambia writers ni defaults.
- La politica provisional de commits de `paw-foundation` se aplica a este patch y se
  registra en `decision.log`, sin elevarla a doctrina portable.

## 7. Assumptions

- Node.js standard library sigue siendo suficiente para el validator y sus tests.
- El subset YAML requerido puede mantenerse pequeno y fail-loud sin introducir una
  dependencia npm.
- La separacion entre schema declarativo e invariantes semanticos puede probarse sin
  convertir el JSON Schema en autoridad independiente.
- La compatibilidad historica no necesita permitir `closed_at` inconsistente salvo
  que la inspeccion de historia encuentre un caso real documentable.

## 8. Decisiones abiertas

- Ninguna bloqueante para `sdd-plan`.

La forma interna exacta del reporte estructurado y la division de modulos se decidiran
durante tasks/backlog dentro del contrato minimo heredado.

## 9. Riesgos

- Riesgo: el parser YAML artesanal acepte silenciosamente sintaxis no soportada.
  - Impacto: manifests interpretados de forma incorrecta.
  - Mitigacion: grammar acotada, errores con path/linea y fixtures de sintaxis.
- Riesgo: extender el validator v1 mezcle reglas de ambas versiones.
  - Impacto: regresiones historicas o manifests hibridos aceptados.
  - Mitigacion: deteccion previa, validadores separados y matriz de compatibilidad.
- Riesgo: la presencia del schema v2 parezca activar el workflow v2.
  - Impacto: writers o usuarios adopten v2 antes del gate.
  - Mitigacion: docs de estado, tests de default v1 y ausencia de cambios en skills.
- Riesgo: los tests dependan de mensajes literales fragiles.
  - Impacto: mantenimiento costoso sin mejorar el contrato.
  - Mitigacion: aserciones sobre codigos, severidad, path y causa estable.

## 10. Criterio de cierre

- [x] objetivo y no objetivos estan claros
- [x] fuentes aplicables listadas
- [x] alcance y fuera de alcance no se contradicen
- [x] assumptions criticas clasificadas
- [x] no hay decisiones abiertas bloqueantes
- [x] riesgos principales identificados

## 11. Registro de cambios

- `2026-06-14`
  - Intake inicial basado en handoff 03, contratos de patch 02 y repo reality.
  - Layout inicial asumido sobre `sdd/**`.
  - Drift sincronizado tras auditoria humana: `sdd/**` preserva v1 y la
    implementacion nueva se materializa en las superficies `paw/**` propietarias.

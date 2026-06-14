# Definicion: paw-02-core-patch-contracts

## Estado

- Change id: `paw-02-core-patch-contracts`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `done`
- Fuente: approved final handoff 02
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa con aprobacion humana

## 1. Objetivo

Crear bajo `paw/core/` los contratos documentales minimos y neutrales de PAW para identidad y lifecycle de patches, autoridad y evidencia, ownership de artifacts, decision gates, drift y compatibilidad v1/v2. El patch debe promover esta doctrina a fuentes vivas sin activar el workflow v2 ni cambiar el runtime SDD v1.

## 2. No objetivos

- No crear schema JSON ni validator v2.
- No crear catalogs, presets, adoption records o assessments.
- No implementar workflows, skills, agents, adapters o tooling PAW.
- No definir semantica GitHub, branches, pull requests o deployment.
- No crear workspaces bajo `paw/parches/**`.
- No migrar patches v1 cerrados ni introducir dual-write.

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `sdd/core/**` como baseline operativo v1
- approved final handoff 02 and decision ledger as binding private input

## 4. Alcance

### Si entra

- Contratos distribuidos en ingles bajo `paw/core/**`.
- Registro autoritativo de esos contratos en `docs/README.md`.
- Actualizacion de arquitectura, transicion, estado bootstrap y claims generales afectados.
- Conformance automatizado y revision manual de neutralidad.
- Artifacts SDD v1 completos y cierre anclado.

### Fuera de alcance

- Formato fisico o validacion ejecutable del manifest v2.
- Semantica concreta de `integration.yaml`.
- Activacion candidate, cutover o cambios al default de workflow.
- Doctrina VCS portable; la politica de commits de este programa es provisional.

## 5. Superficies afectadas

### Docs

- `paw/core/**`
- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `README.md`
- `AGENTS.md`
- `paw/README.md`

### Codigo o contenido

- Ningun runtime de producto.

### Configuracion o validacion

- `tests/foundation-governance.test.mjs`
- `tests/core-contracts.test.mjs`
- artifacts bajo `sdd/parches/paw-02-core-patch-contracts/**`

## 6. Decisiones conocidas

- `paw/core/**` pasa de orientacion inerte a doctrina portable viva; el resto del namespace objetivo conserva su estado previo.
- El modelo futuro usa `patch_mode`; el manifest v1 que gobierna este programa conserva `patch_kind` y `lifecycle`.
- La politica provisional de commits se aplica a `paw-foundation` y no se presenta como doctrina portable.
- La documentacion distribuible se escribe en ingles; artifacts internos SDD pueden permanecer en espanol.

## 7. Assumptions

- El conjunto de siete archivos solicitado tiene ownership suficientemente claro y no necesita renombrarse.
- Los tests existentes pueden evolucionar de "todo paw inerte" a "core contractual, resto inerte" sin debilitar el gate de transicion.

## 8. Decisiones abiertas

- Ninguna.

## 9. Riesgos

- Riesgo: confundir contratos conceptuales con schema ejecutable.
  - Impacto: activacion prematura o implementaciones incompatibles.
  - Mitigacion: declarar explicitamente que wire format y validator pertenecen al patch 03.
- Riesgo: duplicar doctrina entre `paw/core/**` y gobierno repo-local.
  - Impacto: precedencia ambigua.
  - Mitigacion: core neutral; `docs/README.md` registra autoridad local y enlaza los contratos.
- Riesgo: romper validaciones foundation al activar solo `paw/core/**`.
  - Impacto: falsos fallos o relajacion excesiva.
  - Mitigacion: adaptar aserciones por subdirectorio y añadir tests dedicados.

## 10. Criterio de cierre

- [x] objetivo y no objetivos estan claros
- [x] fuentes aplicables listadas
- [x] alcance y fuera de alcance no se contradicen
- [x] assumptions criticas clasificadas
- [x] no hay decisiones abiertas
- [x] riesgos principales identificados

## 11. Registro de cambios

- `2026-06-13`
  - Intake inicial basado en el handoff aprobado y repo reality.

# SDD

Esta carpeta es la raiz operativa del sistema SDD portable del repo.

## Proposito

`sdd/` separa el sistema operativo de cambios spec-driven de los contratos vivos del portfolio en `docs/`.

- `docs/` gobierna producto, contenido, arquitectura del sitio, visual, deployment e i18n.
- `sdd/` organiza metodologia SDD, workspaces de cambio, orquestacion transicional y tooling.
- `.codex/` contiene el runtime Codex que ejecuta skills y agentes.

Si hay conflicto entre producto/portfolio y SDD, manda la precedencia definida en `docs/README.md` y `AGENTS.md`.

## Estructura

- `core/`: micro-core metodologico portable para reglas SDD compartidas.
- `parches/`: workspaces SDD activos futuros.
- `parches/legacy/`: memoria historica migrada desde el layout anterior.
- `orchestration/`: soporte operativo para coordinar skills y fases.
- `tools/`: validacion local y checks del sistema SDD portable.

## Entrada al flujo

- `sdd-triage` clasifica una entrada nueva antes de que exista un patch formal.
- `sdd-intake` formaliza el patch ya clasificado.
- `sdd-router` diagnostica workspaces existentes y decide el siguiente paso correcto.

## Core portable

`sdd/core/` contiene la autoridad metodologica auxiliar del sistema SDD portable.

Su alcance inicial es deliberadamente pequeno:

- `sdd/core/README.md`
- `sdd/core/patch-model.md`
- `sdd/core/artifact-lifecycle.md`
- `sdd/core/decision-drift-policy.md`

El core no reemplaza `docs/`, `AGENTS.md`, skills, agents ni artifacts vivos. Solo debe contener reglas compartidas por multiples skills o artifacts.

## Trabajo diferido

Quedan para fases posteriores del programa `sdd-portable-core`:

- CI y evals formales.

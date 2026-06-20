# Handoff: paw-07-codex-runtime-tooling

Este documento preserva el input privado usado para iniciar el patch. Es memoria
auxiliar del workspace SDD; no sustituye contratos vivos ni autoriza cambios fuera
de `definicion.md`, `plan.md`, `tasks.md` y los backlogs aprobados.

---

## Fuente

- Archivo origen: `_inbox/final/07-codex-runtime-tooling-handoff.md`
- Fecha de intake: 2026-06-20
- Programa: `paw-foundation`
- Dependencia: cierre y merge de `paw-06-workflow-conformance`

---

## Resumen operativo

El handoff pide implementar el primer adapter runtime de PAW para Codex y un
toolkit ejecutable que reduzca carga mental mediante progressive disclosure.

La implementacion debe cubrir las operaciones portables definidas por el patch 06
mediante nuevas skills Codex `paw-*`, perfiles Codex acotados y tooling compartido
versionado. Las skills `sdd-*` existentes continuan gobernando esta transformacion
hasta el cutover.

---

## Entregables pedidos por el handoff

- Skills `.codex/skills/paw-*` para las operaciones portables.
- Perfiles `.codex/agents/paw-*.toml` necesarios y acotados.
- Toolkit comun versionado y descubrible por contrato.
- Scripts locales de skills cuando aporten valor mecanico.
- Contratos de I/O, permisos, exit codes y mutation envelope.
- Fixtures, tests y documentacion Codex.
- Mapa explicito operacion portable -> implementacion Codex.

---

## Operaciones portables que deben cubrirse

- `paw-triage`
- `paw-intake`
- `paw-router`
- `paw-plan`
- `paw-tasks`
- `paw-phase-backlog`
- `paw-execute-phase`
- `paw-sync-drift`
- `paw-close`
- `paw-bootstrap-discover`
- `paw-bootstrap-define`
- `paw-bootstrap-write`
- conformance o integracion equivalente claramente documentada

---

## Fuera de alcance segun el handoff

- Claude Code y Antigravity.
- Publicar PAW como portable.
- Reemplazar todavia las skills `sdd-*`.
- Integracion con PRs.
- Scripts que generen decisiones o copy sustantivo.
- Usar `.agents/` o presentarlo como alternativa.

---

## Condiciones de parada heredadas

Detener y registrar decision si:

- una skill necesita duplicar todo el core en su `SKILL.md`;
- el toolkit empieza a decidir semantica;
- un script requiere prompts interactivos;
- Codex obliga a cambiar el workflow portable;
- el runtime de scripts crea una dependencia desproporcionada.

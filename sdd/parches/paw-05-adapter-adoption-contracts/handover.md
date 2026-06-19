# Handoff: paw-05-adapter-adoption-contracts

Este documento preserva el input privado usado para iniciar el patch. Es memoria
auxiliar del workspace SDD; no sustituye contratos vivos ni autoriza cambios fuera
de `definicion.md`, `plan.md`, `tasks.md` y los backlogs aprobados.

---

## Fuente

- Archivo origen: `_inbox/final/05-adapter-adoption-contracts-handoff.md`
- Fecha de intake: 2026-06-19
- Programa: `paw-foundation`
- Dependencia: cierre de `paw-04-catalogs-presets`

---

## Resumen operativo

El handoff pide definir como un repositorio adopta PAW y como se separan:

- preset definitions reutilizables;
- adoption records locales;
- stack realization observada o materializada;
- assessments trazables;
- repo, stack y runtime adapters;
- overrides locales controlados.

La resolucion conceptual debe respetar esta capa:

1. Core portable.
2. Familia y documentation preset.
3. Component profiles y concerns.
4. Implementation preset.
5. Repo adapter.
6. Stack adapter.
7. Runtime adapter.
8. Overrides controlados.

Ninguna capa inferior puede reescribir silenciosamente doctrina de una capa superior.

---

## Entregables pedidos por el handoff

- Contratos y schemas para repo adapter, stack adapter y runtime adapter.
- Schema de adoption record.
- Schema de assessment.
- Reglas de precedencia y resolucion.
- Fixtures greenfield y brownfield.
- Ejemplos con adopcion exacta, variante, excepcion y rechazo.
- Validador de referencias a catalogos del patch 04.

---

## Fuera de alcance segun el handoff

- Implementacion concreta del adapter Codex.
- Integracion concreta con GitHub.
- Instalacion o distribucion.
- Automatizar seleccion de stacks.
- Cambiar un repo consumidor.

---

## Condiciones de parada heredadas

Detener y registrar decision si:

- el repo adapter empieza a contener reglas universales;
- el stack adapter se convierte en un preset nuevo implicito;
- el runtime adapter altera outputs metodologicos;
- no es posible distinguir una variante soportada de una excepcion;
- un override puede persistir sin owner ni revision.


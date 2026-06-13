# SDD Core

Este directorio contiene el micro-core metodologico del sistema SDD portable.

Es auxiliar. No sustituye `docs/README.md`, documentos contractuales del portfolio, `AGENTS.md`, skills locales ni artifacts vivos bajo `sdd/parches/`.

---

## Proposito

`sdd/core/` define reglas estables compartidas por multiples skills y artifacts SDD.

Debe responder:

- que es un patch SDD;
- como nace un patch formal;
- que autoridad tiene cada capa del sistema;
- que responsabilidades tienen artifacts, decisions, assumptions, blockers, findings y tasks;
- como se detecta y clasifica drift;
- que significa cerrar un patch sin convertir el cierre en fuente viva escondida.

---

## Autoridad por tipo de conflicto

Para producto, contenido, arquitectura, visual, i18n, SEO, deployment o estrategia del portfolio, manda la precedencia definida en `docs/README.md` y `AGENTS.md`.

Para metodologia SDD general, `sdd/core/**` es la referencia auxiliar portable despues de `docs/README.md`, documentos contractuales aplicables y `AGENTS.md`.

Para un cambio concreto, los artifacts bajo `sdd/parches/<change-id>/` gobiernan el alcance aprobado de ese cambio siempre que no contradigan documentos superiores ni el core metodologico vigente.

Notas:

- `sdd/core/**` gobierna metodologia SDD, no producto del portfolio.
- Los artifacts SDD preservan memoria de un cambio, pero no reemplazan contratos vivos.
- El codigo no se convierte en verdad nueva si contradice documentos superiores.

---

## Capas

| Capa | Responsabilidad | No debe hacer |
| --- | --- | --- |
| `docs/` | verdad contractual del portfolio | describir procedimiento runtime de Codex |
| `AGENTS.md` | reglas operativas permanentes del repo | esconder doctrina SDD extensa |
| `sdd/core/` | reglas SDD portables y compartidas | contener prompts, output contracts o routing detallado |
| `sdd/orchestration/` | coordinacion runtime transicional | reemplazar el core o contratos superiores |
| `.codex/skills/` | procedimiento de una transicion SDD concreta | redefinir contratos globales por si solas |
| `.codex/agents/` | perfiles advisory o writers controlados | tomar ownership final del cambio |
| `sdd/parches/<change-id>/` | memoria viva de un cambio | ser fuente viva permanente sin cierre y reconciliacion |

---

## Criterio para agregar reglas al core

Una regla pertenece a `sdd/core/` solo si cumple todas estas condiciones:

- aplica a 3+ skills o artifacts SDD;
- es estable mas alla de un patch concreto;
- no depende de un modelo, comando, prompt o subagente especifico;
- ayuda a resolver conflictos entre definicion, plan, tasks, backlog, decision log, drift o cierre;
- puede portarse a otro repo sin arrastrar decisiones de producto del portfolio.

Si una regla aplica solo a una skill, vive en esa skill. Si aplica a la coordinacion de una sesion Codex, vive en `sdd/orchestration/`. Si define producto, contenido, arquitectura, visual, i18n, SEO o deployment, vive en `docs/`.

---

## Documentos

- `patch-model.md`: modelo conceptual de patch y manifest liviano.
- `artifact-lifecycle.md`: secuencia, responsabilidades y cierre de artifacts SDD.
- `decision-drift-policy.md`: decisions, assumptions, blockers, findings, tasks y drift.

---

## Limites

Este micro-core define doctrina compartida, pero no implementa por si solo:

- skills ejecutables;
- assets de skill;
- schema o validadores locales;
- perfiles de agentes;
- cambios de runtime Astro, routing, i18n, SEO, deployment o dependencias.

Esas superficies deben permanecer alineadas con el core sin esconder reglas nuevas fuera de sus fuentes vivas.

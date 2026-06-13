# Artifact Lifecycle

Este documento define la secuencia y responsabilidades de artifacts SDD.

Es auxiliar. No reemplaza templates, skills ni artifacts vivos.

---

## Secuencia normal

La secuencia completa para un cambio sustancial es:

```text
triage report
  -> patch.yaml + handover.md + definicion.md
  -> plan.md
  -> tasks.md
  -> backlog/faseN.md
  -> ejecucion de fase
  -> sync de drift si aplica
  -> cierre formal si aplica
```

No todos los cambios requieren todas las piezas. Pero un cambio sustancial no debe saltar definicion, plan, tasks y backlog de fase salvo decision explicita y riesgo bajo.

---

## Responsabilidades por artifact

| Artifact | Responsabilidad | No debe hacer |
| --- | --- | --- |
| `patch.yaml` | identidad, tipo, lifecycle, timestamps y fuentes vivas ancladas | reemplazar artifacts narrativos o checklists |
| `handover.md` | preservar input, brief o fuente filtrada | planificar implementacion |
| `definicion.md` | objetivo, alcance, no objetivos, fuentes, decisiones, riesgos y cierre esperado | bajar a tasks tecnicas |
| `plan.md` | lectura brownfield, superficies afectadas, bloques, dependencias y validacion | crear checklist operativo |
| `tasks.md` | fases macro, precondiciones, tareas, validaciones y dependencias | ejecutar cambios |
| `backlog/faseN.md` | runbook vivo de una fase con checklist, blockers, findings, validaciones y cierre | redisenar el plan completo |
| `decision.log` | decisiones significativas con contexto, razon e impacto | servir como resumen final del patch |
| `cierre.md` | sintesis final de intencion, ejecucion, decisions, drift, validaciones y fuente viva post-cierre | reemplazar decisiones registradas durante ejecucion |

`cierre.md` se define aqui de forma conceptual. Su skill, template y obligatoriedad operacional pertenecen a fases posteriores.

---

## Estados

Estados comunes:

- `draft`: artifact creado pero no listo para desbloquear la siguiente transicion.
- `ready`: artifact listo para la siguiente transicion SDD.
- `active`: artifact o fase en uso.
- `blocked`: existe decision, drift o validacion que impide avanzar.
- `done`: fase o artifact cerrado segun sus checks.

Los estados deben reflejar realidad. No se marca `done` si quedan validaciones requeridas sin ejecutar, blockers sin resolver o drift sin clasificar.

---

## Reglas de transicion

- `triage report` desbloquea `sdd-intake` cuando clasifica si aplica SDD y propone la identidad inicial.
- `sdd-intake` crea `patch.yaml` al nacer el patch formal.
- `definicion.md` desbloquea `plan.md` cuando no quedan decisiones abiertas bloqueantes ni assumptions criticas sin clasificar.
- `plan.md` desbloquea `tasks.md` cuando identifica superficies, riesgos, dependencias y validaciones.
- `tasks.md` desbloquea un solo `backlog/faseN.md` seleccionado.
- `backlog/faseN.md` desbloquea ejecucion de esa fase, no de todo el patch.
- una fase cerrada puede desbloquear la siguiente solo si sus criterios de cierre se cumplen o sus pendientes quedan diferidos explicitamente.
- drift operacional o mayor puede requerir `sdd-sync-drift` antes de seguir.

---

## Stop conditions

Detener y pedir decision humana cuando aparezca cualquiera de estos casos:

- cambio de scope aprobado;
- cambio de fuente de verdad;
- contradiccion con contratos superiores;
- cambio de routing, i18n, SEO estructural, deployment, dominio o runtime publico;
- dependencia nueva;
- convencion nueva no documentada;
- ampliacion de permisos o autonomia de writers;
- validacion fallida cuya correccion cambia el enfoque;
- plan, tasks o backlog ya no describen fielmente el trabajo.

---

## Cierre formal

### Niveles de cierre

| Nivel | Uso | Requisito adicional |
| --- | --- | --- |
| `minimal` | cierre estrecho de docs o artifacts sin reconciliacion viva | explicar por que no aplica reconciliacion |
| `standard` | cierre normal de un patch con fases completas | incluir validaciones y riesgos residuales |
| `batch` | cierre de agrupacion controlada | reportar estado por item agrupado |
| `anchored` | cierre de patch con `lifecycle = spec-anchored` | reconciliar contra `related_docs` |
| `drift-heavy` | cierre despues de drift operacional o contractual significativo | documentar fuente esperada, diferencia y resolucion |

Usar el nivel mas pequeno que cubra fielmente el patch.

Un cierre formal debe responder:

- que se intento hacer;
- que se hizo realmente;
- que decisiones fueron relevantes;
- que assumptions quedaron validadas o pendientes;
- que blockers aparecieron y como se resolvieron o diferieron;
- que findings afectan trabajo futuro;
- que drift se detecto y como se clasifico;
- que validaciones fueron `automated`, `manual`, `not applicable` o `deferred`;
- que fuente viva debe conservar la verdad despues del cierre.

Si un artifact no tiene assumptions criticas, debe decir explicitamente `No critical assumptions.` en vez de omitir la seccion.

Un patch cerrado es memoria historica por defecto. Si introduce reglas vivas, esas reglas deben reconciliarse hacia `docs/`, `AGENTS.md`, `sdd/core/` u otra fuente viva declarada antes o durante el cierre.

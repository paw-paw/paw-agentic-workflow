# Decision and Drift Policy

Este documento define responsabilidades compartidas para decisions, assumptions, blockers, findings, tasks y drift.

Es auxiliar. No sustituye `decision.log`, backlogs vivos, skills ni decision humana cuando aplique.

---

## Categorias de ejecucion

| Categoria | Definicion | Donde vive durante ejecucion |
| --- | --- | --- |
| `decision` | eleccion significativa que afecta scope, secuencia, responsabilidad, validacion o interpretacion futura | `decision.log` y, si es local de fase, `backlog/faseN.md` |
| `assumption` | supuesto usado para avanzar sin convertirlo en verdad contractual | `definicion.md`, `plan.md`, backlog o cierre segun alcance |
| `blocker` | condicion que impide avanzar fielmente | backlog activo y reporte al usuario |
| `finding` | observacion comprobada que afecta riesgo, trabajo futuro o interpretacion | backlog activo, drift sync o cierre |
| `task` | unidad de trabajo trazable | `tasks.md` para macro, `backlog/faseN.md` para operacional |
| `drift` | divergencia entre artifacts, contratos, codigo, validaciones o comportamiento visible | backlog activo o `sdd-sync-drift` si es operacional o mayor |

---

## Decisions

Registrar en `decision.log` cuando una decision:

- cambia scope;
- cambia secuencia de fases;
- cambia validacion esperada;
- afecta fuente viva;
- crea o modifica convencion duradera;
- resuelve una contradiccion entre artifacts;
- autoriza writer, dependencia, routing, i18n, SEO, deployment o runtime publico.

No registrar microdecisiones obvias de redaccion o ejecucion local si no cambian interpretacion futura.

Una decision humana no debe resolverse usando implementacion como nueva verdad. Si hay trade-off relevante, se detiene el trabajo y se presentan opciones.

`cierre.md` puede resumir decisiones relevantes, pero no reemplaza `decision.log`. Si durante cierre aparece una decision significativa que no fue registrada, primero se registra o se escala segun el gate aplicable.

---

## Assumptions

Un assumption permite avanzar cuando:

- el riesgo es bajo;
- el supuesto esta dentro del alcance aprobado;
- se puede validar o corregir sin cambiar contratos;
- queda visible donde afecte ejecucion.

Un assumption debe convertirse en decision o blocker si afecta scope, fuente viva, arquitectura, validacion estructural, public behavior o convencion duradera.

Las assumptions son first-class en:

- `definicion.md`
- `plan.md`
- `backlog/faseN.md`
- `cierre.md`

Si no hay assumptions criticas, el artifact debe declarar `No critical assumptions.`. Antes de readiness o cierre, cada assumption relevante debe quedar resuelta, aceptada explicitamente o escalada como decision/blocker.

---

## Blockers

Un blocker debe registrar:

- situacion;
- evidencia;
- impacto;
- decision requerida;
- si hay trabajo independiente que pueda continuar.

No marcar una fase como `done` con blockers abiertos salvo que queden diferidos explicitamente con razon y no bloqueen la siguiente fase.

---

## Findings

Un finding util debe incluir evidencia:

- path;
- artifact;
- seccion;
- comando;
- resultado;
- incertidumbre explicita.

Un finding sin evidencia puede orientar revision, pero no debe usarse como base unica para cambiar plan, tasks, contratos o validacion.

---

## Drift

Drift es cualquier divergencia entre:

- `definicion.md`;
- `plan.md`;
- `tasks.md`;
- `backlog/faseN.md`;
- `decision.log`;
- documentos contractuales;
- codigo o configuracion;
- resultados de validacion;
- comportamiento visible.

Categorias:

| Categoria | Significado | Respuesta |
| --- | --- | --- |
| `minor` | wording, status, checklist o nota que no cambia scope ni secuencia | actualizar backlog o artifact local |
| `operational` | cambia checklist, validacion, secuencia local o affected files sin cambiar scope aprobado | actualizar artifact relevante; registrar decision si cambia interpretacion |
| `contractual` | afecta fuente viva, definicion, plan, public claim o estrategia de validacion | detener o sincronizar artifacts antes de seguir |
| `blocking` | impide continuar sin decision humana | marcar blocker y preguntar |

El codigo no se vuelve canon por existir. Si contradice documentos superiores, se reporta y se sincroniza la fuente correcta.

---

## Frontera entre routing, drift sync y cierre

- Routing decide el proximo paso SDD a partir del estado de artifacts y user intent.
- Drift sync reconcilia divergencias cuando el artifact vivo ya no describe la realidad o falta registrar una decision.
- Cierre sintetiza el patch terminado y declara donde vive la verdad despues del cierre.

Routing no corrige drift por si solo. Drift sync no redisenia scope por defecto. Cierre no sustituye decision.log ni convierte un patch en fuente viva permanente.

---

## Evidencia minima

Todo hallazgo no trivial debe traer al menos una de estas evidencias:

- path y seccion;
- comando y resultado;
- diff o artifact afectado;
- validacion ejecutada;
- incertidumbre explicitada.

Si la evidencia no alcanza para decidir, el resultado correcto es una pregunta o un blocker, no una reinterpretacion silenciosa.

# Patch Model

Este documento define el modelo conceptual de patch SDD.

Es auxiliar y metodologico. No sustituye `definicion.md`, `plan.md`, `tasks.md`, backlogs, `decision.log`, contratos vivos ni el futuro `cierre.md`.

---

## Patch

Un patch SDD es un workspace trazable bajo:

```text
sdd/parches/<change-id>/
```

Su funcion es contener la intencion, planificacion, ejecucion, decisiones, drift, validaciones y cierre de un cambio spec-driven.

Un patch no es:

- un sprint generico;
- una bolsa abierta de tareas;
- una fuente de verdad permanente por defecto;
- un sustituto de `docs/` o `AGENTS.md`.

---

## Identidad

Todo patch formal debe tener un `change-id` estable.

`program_id` puede agrupar patches relacionados sin crear obligatoriamente un workspace formal de programa. Si `program_id` deja de ser suficiente, esa decision debe registrarse y pasar por un gate humano.

`sdd/parches/legacy/**` es memoria historica y no usa el modelo formal como requisito retroactivo.

---

## Manifest liviano

El manifest previsto es:

```text
sdd/parches/<change-id>/patch.yaml
```

Campos conceptuales esperados:

- `schema_version`
- `change_id`
- `program_id`
- `patch_kind`
- `lifecycle`
- `status`
- `created_at`
- `closed_at`
- `related_docs`

Reglas:

- `patch.yaml` identifica y clasifica el patch.
- `patch.yaml` nace al inicio de `sdd-intake` para todo patch formal no legacy.
- `patch.yaml` no contiene checklist de ejecucion.
- `patch.yaml` no contiene `current_phase`.
- `patch.yaml` no reemplaza `handover.md`, `definicion.md`, `plan.md`, `tasks.md`, `backlog/`, `decision.log` ni `cierre.md`.
- `created_at` registra la fecha en que empieza `sdd-intake` y nace el patch formal.
- `closed_at` registra la fecha en que `sdd-close` marca `status: closed`; mientras el patch siga abierto, su valor es `null`.
- `schema_version` identifica el contrato del manifest; su valor vigente es `1`.

---

## `patch_kind`

`patch_kind` define la forma de agrupacion del cambio.

Valores previstos:

| Valor | Significado | Regla |
| --- | --- | --- |
| `spec` | un cambio gobernado por una especificacion o definicion propia | puede ser `spec-first` o `spec-anchored` |
| `batch` | agrupacion controlada de cambios menores o relacionados | solo puede ser `spec-first` |

Un `batch` debe mantener:

- lista cerrada de items;
- criterio global de cierre;
- criterio de cierre por item;
- ausencia de dependencias internas complejas.

Un `batch` no debe convertirse en bolsa abierta de scope. Si pierde legibilidad, mezcla lifecycles incompatibles, presenta dependencias internas complejas o aparecen decisiones de producto, arquitectura, source of truth o validacion estructural, `sdd-triage` debe recomendar split o escalado a `spec`.

---

## `lifecycle`

`lifecycle` define la relacion entre el patch y su fuente viva.

Valores previstos:

| Valor | Significado |
| --- | --- |
| `spec-first` | el patch crea o prepara una decision antes de promoverla a fuente viva |
| `spec-anchored` | el patch modifica una fuente viva ya existente y debe reconciliar contra ella |

`related_docs` es obligatorio cuando `lifecycle = spec-anchored`, porque debe quedar claro que fuente viva se afecta.

---

## Matriz permitida

| `patch_kind` | `lifecycle` | Estado |
| --- | --- | --- |
| `spec` | `spec-first` | permitido |
| `spec` | `spec-anchored` | permitido |
| `batch` | `spec-first` | permitido |
| `batch` | `spec-anchored` | no permitido |

Razon:

- un batch anclado a spec mezcla multiples cambios con una fuente viva especifica y vuelve difusa la reconciliacion;
- si el trabajo esta anclado a una fuente viva, debe poder auditarse como `spec`.

---

## `status`

Valores previstos:

- `active`
- `blocked`
- `closed`
- `abandoned`

`status` describe el estado del patch completo, no el estado de una fase. Las fases viven en `tasks.md` y `backlog/faseN.md`.

Un patch `closed` requiere cierre formal cuando el flujo de cierre exista. Un patch `blocked` debe nombrar el blocker y la decision requerida.

---

## Limites de interpretacion

Cambiar `patch_kind` o `lifecycle` es decision estructural. Debe registrarse en `decision.log` y puede requerir decision humana si afecta scope, validacion, fuente viva o secuencia de fases.

La ausencia de `patch.yaml` en un workspace formal nuevo es drift operacional. `sdd/parches/legacy/**` conserva su exencion historica.

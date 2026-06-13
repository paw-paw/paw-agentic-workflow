# Cierre: <change-id>

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

- Change id:
- Program id:
- Patch kind:
- Lifecycle:
- Status final:
- Fecha de cierre:
- Owner:
- Nivel de cierre: `minimal` | `standard` | `batch` | `anchored` | `drift-heavy`

---

## 1. Resumen

- Objetivo original:
- Resultado ejecutado:
- Alcance cerrado:
- Alcance diferido:

---

## 2. Rama obligatoria por tipo

### Si `patch_kind = spec`

- fuente viva reconciliada:
- cambio promovido:

### Si `patch_kind = batch`

- estado por item:
- criterio global de cierre:
- item diferido, si existe:

---

## 3. Artifacts revisados

- `patch.yaml`
- `definicion.md`
- `plan.md`
- `tasks.md`
- `backlog/faseN.md`
- `decision.log`

---

## 4. Decisiones relevantes

- decision:
  - fuente:
  - impacto:

---

## 5. Assumptions, blockers y findings

### Assumptions

- No critical assumptions.

### Blockers

- blocker:
  - estado:
  - resolucion o razon de diferimiento:

### Findings

- finding:
  - evidencia:
  - impacto:

---

## 6. Drift

- drift:
  - categoria: `minor` | `operational` | `contractual` | `blocking`
  - fuente esperada:
  - diferencia encontrada:
  - accion:
  - estado:

---

## 7. Reconciliacion de fuente viva

- fuente viva afectada:
- cambio requerido:
- estado: `aplicado` | `no aplica` | `diferido`
- evidencia:

---

## 8. Validaciones

- validacion:
  - tipo: `automated` | `manual` | `not applicable` | `deferred`
  - comando o revision:
  - resultado esperado:
  - resultado obtenido:
  - estado: `pass` | `fail` | `skipped`
  - evidencia:

---

## 9. Riesgos residuales

- riesgo:
  - impacto:
  - mitigacion:

---

## 10. Pendientes

- pendiente:
  - owner:
  - razon:

---

## 11. Criterio de cierre

- [ ] fases seleccionadas cerradas o diferidas con razon
- [ ] assumptions criticas resueltas, aceptadas o escaladas
- [ ] decisiones relevantes registradas
- [ ] drift clasificado y resuelto o diferido
- [ ] validaciones registradas
- [ ] fuente viva reconciliada o marcada no aplicable
- [ ] riesgos residuales visibles

# Tasks Template: batch

Usa este template para convertir un plan `batch` aprobado en ejecucion trazable por item.

---

## Estado

- Change id:
- Patch kind: `batch`
- Lifecycle: `spec-first`
- Estado: `draft` | `ready-for-backlog` | `blocked` | `superseded`
- Ultima actualizacion:
- Owner:

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `sdd/parches/<change-id>/patch.yaml`
- `sdd/parches/<change-id>/definicion.md`
- `sdd/parches/<change-id>/plan.md`

---

## 2. Preflight

- [ ] lista cerrada de items vigente
- [ ] criterio global de cierre vigente
- [ ] cada item conserva criterio de cierre
- [ ] no hay dependencias internas complejas sin resolver

---

## 3. Mapa de ejecucion por item

### Item N - <nombre>

- Objetivo:
- Tareas:
- Dependencias:
- Validaciones:
- Criterio de cierre:

---

## 4. Fases

### Fase N - <nombre>

- Objetivo:
- Items cubiertos:
- Tareas:
- Validaciones:
- Criterio de cierre:

---

## 5. Split check

- [ ] el batch sigue legible
- [ ] no mezcla lifecycles incompatibles
- [ ] no aparecen dependencias internas complejas

---

## 6. Validaciones globales

- [ ] validacion documental global
- [ ] validacion tecnica global

---

## 7. Criterio de cierre

- [ ] todos los items mantienen trazabilidad al plan
- [ ] las validaciones son reales
- [ ] el batch sigue sin requerir split

---

## 8. Registro de cambios

- Fecha:
  - cambio:
  - razon:

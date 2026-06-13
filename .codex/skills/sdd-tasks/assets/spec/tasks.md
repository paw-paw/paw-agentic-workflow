# Tasks Template: spec

Usa este template para convertir un plan `spec` aprobado en fases macro y tareas ejecutables.

---

## Estado

- Change id:
- Patch kind: `spec`
- Lifecycle:
- Estado: `draft` | `ready-for-backlog` | `blocked` | `superseded`
- Ultima actualizacion:
- Owner:

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `sdd/parches/<change-id>/patch.yaml`
- `sdd/parches/<change-id>/definicion.md`
- `sdd/parches/<change-id>/plan.md`
- `sdd/parches/<change-id>/decision.log`, si existe

---

## 2. Preflight

- [ ] `definicion.md` vigente
- [ ] `plan.md` vigente
- [ ] assumptions criticas clasificadas antes de dividir fases
- [ ] no hay decisiones abiertas bloqueantes

---

## 3. Resumen del plan

- resumen:

---

## 4. Fases

### Fase N - <nombre>

- Objetivo:
- Origen en `plan.md`:
- Precondiciones:
- Tareas:
- Archivos o areas probables:
- Validaciones:
- Criterio de cierre:

---

## 5. Dependencias entre fases

- Fase 1 bloquea:

---

## 6. Decisiones y bloqueos

- decisiones abiertas bloqueantes:
- decisiones abiertas no bloqueantes:

---

## 7. Validaciones globales

- [ ] validacion documental
- [ ] validacion tecnica

---

## 8. Criterio de cierre

- [ ] cada fase tiene objetivo, precondiciones, tareas, validaciones y criterio de cierre
- [ ] cada tarea es trazable al `plan.md`
- [ ] las validaciones son reales

---

## 9. Registro de cambios

- Fecha:
  - cambio:
  - razon:

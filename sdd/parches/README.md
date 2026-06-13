# Parches SDD

Esta carpeta sera el workspace activo para cambios SDD posteriores al bootstrap portable.

## Reglas

- Cada subcarpeta representa un cambio SDD o memoria historica agrupada.
- Los workspaces SDD no sustituyen `docs/README.md` ni los contratos vivos en `docs/`.
- Todo patch formal no legacy nace con `patch.yaml` desde `sdd-intake`.
- Un patch cerrado es memoria historica por defecto, no fuente viva escondida.
- Si un patch introduce reglas vivas, el cierre debe reconciliarlas hacia la fuente viva correspondiente.

## Legacy

`legacy/` contiene artifacts migrados desde layouts SDD anteriores.

El legacy queda visible para trazabilidad, pero no debe usarse como patron vigente para nuevos cambios.

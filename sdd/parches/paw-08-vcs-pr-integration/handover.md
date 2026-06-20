# Handover: paw-08-vcs-pr-integration

---

## Fuente

- Programa: `paw-foundation`
- Handoff final: `08-vcs-pr-integration-handoff.md`
- Orden: 08 de 14
- Dependencia: `paw-07-codex-runtime-tooling`
- Gobierno de ejecucion: SDD v1 bajo `sdd/parches/`
- Clasificacion esperada: `spec` + `spec-anchored`

---

## Intencion recibida

Integrar ramas, commits y pull requests al ciclo de vida PAW sin convertir al
proveedor Git o GitHub en fuente de verdad y sin automatizar el merge.

El modelo operativo esperado es:

- `1 patch = 1 working branch = 1 primary pull request`.
- `program_id` agrupa patches relacionados, pero no crea una rama compartida ni
  un workspace de programa.
- El PR puede existir como evidencia e integracion, pero no reemplaza
  `definicion.md`, `plan.md`, evidencias, decisiones ni cierre.
- El estado remoto del proveedor, la readiness PAW y la disposicion de entrega
  son estados separados.
- Los checks remotos deben vincularse al `head` SHA exacto.
- El merge permanece humano.

---

## Entregables solicitados

- Contrato portable VCS/PR.
- Schema y lifecycle de `integration.yaml`.
- Skill Codex `paw-integrate` o equivalente.
- Scripts de inspeccion y sincronizacion mecanica.
- Provider adapter GitHub experimental.
- Fixtures de standalone, programa, draft, checks stale, cierre y abandono.
- Documentacion de permisos y limites.
- Prompt operativo breve para comunicar la politica de commits a agentes.

---

## Limites recibidos

- No resolver review comments automaticamente.
- No automatizar merge.
- No dar soporte completo a proveedores no GitHub.
- No alterar retrospectivamente la politica vigente de patches anteriores.
- No forzar rama de integracion por `program_id`.
- No activar `paw/parches/**`, writers v2, defaults futuros, Pages, Actions,
  releases, packaging ni deployment.

---

## Criterios de aceptacion recibidos

- El estado remoto y el estado PAW no se confunden.
- `program_id` no implica una rama monolitica.
- La readiness se calcula sobre evidencia vigente.
- El PR no se vuelve autoridad.
- Las operaciones remotas tienen permisos separados.
- El flujo puede operar localmente con proveedor `absent`.
- El primer commit preserva el baseline SDD anterior a fases.
- Los commits de fase preservan intencion, superficies y estado SDD veraz.
- El commit de cierre es independiente y no mezcla implementacion sustantiva.
- La politica queda disponible mediante una fuente viva y un prompt operativo.

---

## Preflight confirmado

- `origin/main` contiene el cierre de `paw-07-codex-runtime-tooling` mediante
  `fd51a23` (`Merge pull request #8 from paw-paw/codex/paw-07-codex-runtime-tooling`).
- No existia branch ni workspace `paw-08-vcs-pr-integration` antes del intake.
- Branch de ejecucion creada desde `origin/main`: `patch/paw-08-vcs-pr-integration`.


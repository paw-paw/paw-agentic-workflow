---
name: paw-router
description: Route PAW work in Antigravity while preserving active SDD v1 boundaries.
---

# paw-router

Status: Antigravity candidate physical file.

Load `docs/README.md`, `AGENTS.md`, `paw/orchestration/workflow.md`, then the
current `sdd/parches/<change-id>/` artifacts when present.

Do:

- route to active `sdd-*` workflow during `paw-foundation`;
- identify blockers, drift, and human decision gates;
- keep `.agents/**` as Antigravity candidate evidence only.

Do not:

- activate `paw/parches/**`;
- use Gemini CLI or `.gemini/**`;
- claim stable Antigravity support.

Output: next operation, required inputs, blockers, and validation expectations.

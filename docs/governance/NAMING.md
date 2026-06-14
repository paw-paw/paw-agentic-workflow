# Naming and Historical Compatibility

## Canonical Identity

- Brand in prose: `PAW`
- First expanded mention: `PAW (Paw's Agentic Workflow)`
- Repository: `paw-agentic-workflow`
- New technical identifiers, paths, scopes, and commands: `paw`
- Future skill and agent prefix: `paw-*`
- License identifier: `MPL-2.0`

PAW implements a custom software development methodology. It does not name or claim to have invented a new formal methodology.

`SDD` means only `Spec-Driven Development`.

## Prohibited Active Names

Do not use the following as names for PAW, its methodology, or new technical surfaces:

- `PAW's Agentic Workflow`
- `PAW Workbench`
- `Governed Agentic Development`
- `SDD`
- `docs/sdd`
- `.agents` as a replacement for `.codex`

The fixed future workspace path is:

```text
paw/parches/<change-id>/
```

It is a convention, not a configurable setting.

## Historical Compatibility

Preserve original names when they identify v1 history or the currently active transition runtime:

- `sdd/**`
- `sdd-*` skills and agents
- schema v1 identifiers
- old patch IDs, commits, snapshots, fixtures, and historical documents

Do not cosmetically rewrite history. A historical name is not approval for new PAW surfaces to reuse it.

## Runtime Naming

`.codex/` remains the real Codex integration surface. Future PAW integrations may use `.codex/skills/paw-*` and `.codex/agents/paw-*.toml` only when their owning patch activates them.

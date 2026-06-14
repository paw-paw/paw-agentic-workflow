# PAW Patch Workspaces

## Status

Inactive. Do not create patch workspaces in this directory before the patch 14 cutover.

The fixed future path is:

```text
paw/parches/<change-id>/
```

This path is not configurable.

## Current Writer

The only active workspace root is:

```text
sdd/parches/<change-id>/
```

The current v1 skills remain responsible for that surface.

## Ownership

The future patch-contract and cutover owners will govern this directory. Until cutover, repository maintainers must keep it free of manifests, patch artifacts, writers, symlinks, and duplicated state.

## Boundaries

- no dual-write;
- no migration of historical patches;
- no symlink to `sdd/parches/`;
- no opt-in writer unless a later governed patch explicitly defines and gates it;
- no claim that the target workflow is active.

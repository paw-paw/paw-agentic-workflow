# Manual Distribution

## Status

This surface defines the candidate manual distribution contract for PAW.

It does not publish `0.1.0`, create package-manager support, enable marketplace
installation, activate release automation, or claim multi-runtime portability.
PAW remains a `pre-alpha` bootstrap until the governed stabilization and cutover
gates pass.

## Responsibility

Manual distribution covers the reproducible, auditable, and reversible transfer
of declared PAW source files into a target Codex-oriented installation.

The distribution contract owns:

- release-layout expectations for the candidate manual unit;
- manifest and checksum semantics;
- version, compatibility, and requirement declarations;
- license and notice requirements;
- install, upgrade, verification, rollback, and uninstall behavior;
- progressive context-loading guidance for installed use.

Tools, schemas, fixtures, and tests may provide enforcement evidence, but this
directory owns the distribution policy introduced by patch
`paw-09-manual-distribution`.

## Boundaries

The manual distribution must not:

- include `_inbox/**`, private research, portfolio artifacts, or source-repo
  deployment/editorial tooling;
- write files that are not declared in the manifest;
- silently overwrite an existing installation or local customization;
- remove files it does not own during uninstall;
- depend on absolute paths from the source repository;
- activate `paw/parches/**`, v2 writers, or candidate `paw-*` skills as the
  default workflow;
- claim stable release, packaging, marketplace, auto-update, or multi-runtime
  portability.

## Documents

- `manifest.md`: distribution layout, manifest fields, checksums,
  compatibility, requirements, licenses, notices, and exclusions.
- `manual-installation.md`: install, upgrade, verification, rollback, and
  uninstall contract.
- `progressive-loading.md`: required context-loading order for installed use.

## Evidence

The owning patch adds deterministic tooling and tests under `paw/tools/**` and
`paw/tests/**`. Those checks are implementation evidence and must stay aligned
with this contract.

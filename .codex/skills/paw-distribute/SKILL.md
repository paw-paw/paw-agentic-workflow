---
name: paw-distribute
runtime: codex
contract: paw/distribution/README.md
toolkit: .codex/paw-toolkit
status: candidate-inactive
---

# paw-distribute

Candidate Codex binding for manual distribution inspection.

This skill is inactive until the governed activation or cutover gate. It does
not replace `sdd-*`, does not write `paw/parches/**`, and does not make PAW
portable or stable.

## Load

1. `paw/distribution/README.md`
2. `paw/distribution/manifest.md`
3. `paw/distribution/manual-installation.md`
4. `paw/distribution/progressive-loading.md`
5. `paw/distribution/distribution-manifest.json`
6. `.codex/README.md` only when Codex runtime boundaries are relevant.

## Do

- Inspect the candidate manual distribution manifest.
- Verify manifest checksums through `node paw/tools/validate-distribution.mjs`.
- Use `.codex/paw-toolkit/bin/paw-codex-toolkit.mjs inspect-distribution` for
  compact local evidence.
- Report candidate status, file count, compatibility, requirements, and errors.
- Preserve progressive loading and avoid broad context loading by default.

## Do Not

- Do not install, overwrite, uninstall, publish, package, tag, release, or
  auto-update.
- Do not use `_inbox/**` or private research as runtime authority.
- Do not activate `paw/parches/**`, v2 writers, or `paw-*` as the default
  workflow.
- Do not claim stable `0.1.0` or multi-runtime portability.
- Do not rely on absolute paths from the source repository in installed use.

## Output

Return:

- manifest path;
- status;
- file count;
- compatibility summary;
- validation errors, if any;
- explicit note that the binding is candidate-inactive.

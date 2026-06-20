# Manual Installation

## Purpose

Manual installation copies the candidate PAW distribution into a target Codex
installation location in a way that is inspectable, reversible, and verifiable.

The process is manual and local. It is not a package manager, marketplace,
auto-update mechanism, or release automation.

## Install Phases

An implementation must perform these phases in order:

1. Inspect the destination root and existing files.
2. Load the distribution manifest.
3. Verify manifest integrity and source checksums.
4. Build an install plan before writing.
5. Report creates, overwrites, unchanged files, conflicts, and excluded files.
6. Stop before writes when conflicts exist.
7. Require explicit approval before overwriting any existing file.
8. Create backup or rollback evidence before approved overwrites.
9. Copy only files declared in the manifest.
10. Run post-install verification against the destination.

The install plan is the safety boundary. Writing before the plan is accepted is
invalid behavior.

## Conflict Rules

A conflict exists when a destination file:

- exists and differs from the manifest checksum;
- exists but is not known as an owned file from a previous manifest;
- would be overwritten without an approved backup;
- is outside the destination root;
- is not declared in the manifest.

Conflicts must be reported before any write. Silent overwrite is prohibited.

## Upgrade Rules

Upgrade is installation over a previously manifest-owned surface.

An upgrade may replace an owned file when:

- the previous installation record proves ownership;
- the current destination file is unchanged from the previous manifest, or the
  user explicitly approves overwrite after seeing the conflict;
- rollback evidence is created before writing;
- post-upgrade verification passes.

Local customizations must be treated as conflicts, not as files to normalize.

## Rollback Rules

Rollback restores the previous state recorded before an approved write.

Rollback must not invent missing state. It may restore backed-up owned files and
remove newly-created files only when the install record proves they were created
by the attempted install.

## Uninstall Rules

Uninstall may remove only files that:

- are declared as owned by the installation record;
- match the installed manifest checksum or are explicitly approved for removal
  after conflict review;
- are inside the destination root.

Uninstall must not remove unrelated files, local customizations, parent
directories containing unrelated content, or files outside the manifest.

## Verification Rules

Post-install verification must check:

- every required destination file exists;
- destination checksums match the manifest;
- compatibility metadata is present;
- no undeclared file was installed by the process;
- required license and notice files are present;
- the Codex runtime binding can be resolved without absolute source-repo paths.

Verification failure blocks successful install or upgrade status.

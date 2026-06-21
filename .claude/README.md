# Claude Code PAW Adapter Candidate

This directory contains repo-local Claude Code adapter files for PAW.

Status: candidate physical adapter only. These files do not activate PAW v2,
do not replace the active `sdd-*` workflow, and do not declare stable Claude
Code support.

Use the project skills under `.claude/skills/paw-*` as Claude Code entrypoints
for PAW candidate operations. Until the patch 14 cutover, live workspaces remain
under `sdd/parches/<change-id>/`.

`settings.json` and executable hooks are intentionally omitted in this initial
physical adapter because no safe shared project-level configuration is required
to expose the skills.

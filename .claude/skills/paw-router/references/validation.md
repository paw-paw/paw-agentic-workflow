# Validation Notes

For repository work, run only commands that exist in the repo.

Minimum structural checks for this Claude physical adapter:

- every `.claude/skills/*/SKILL.md` has YAML frontmatter and `description`;
- every skill states status, load order, allowed work, forbidden work, and output;
- every `.claude/agents/*.md` is advisory and read-only by default;
- no `.claude/settings.local.json`, secrets, absolute paths, or broad approvals;
- no `.agents/**`, `.gemini/**`, or `.antigravity/**` are created by this patch.

Runtime discovery in Claude Code is manual evidence. If it is not executed, close
as `physical-files-candidate`, not `physical-adapter-candidate`.

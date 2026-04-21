#!/usr/bin/env node
/**
 * sync-claude-md.js
 *
 * Reads every skills/<name>/SKILL.md, extracts the `name` frontmatter field,
 * and rewrites the <!-- skills:start/end --> block in CLAUDE.md.
 *
 * Usage:
 *   node scripts/sync-claude-md.js        # run manually
 *
 * Automatic:
 *   Runs on every `git commit` via .git/hooks/pre-commit.
 *   To install the hook on a fresh clone:
 *     cp .git/hooks/pre-commit .git/hooks/pre-commit  # already there if cloned
 *   Or re-link manually:
 *     ln -s ../../scripts/sync-claude-md.js .git/hooks/pre-commit  # not a symlink — see hook file
 *     cat .git/hooks/pre-commit   # shows the one-liner that calls this script
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CLAUDE_MD = path.join(ROOT, "CLAUDE.md");
const SKILLS_DIR = path.join(ROOT, "skills");

function parseSkillName(skillDir) {
  const skillFile = path.join(SKILLS_DIR, skillDir, "SKILL.md");
  if (!fs.existsSync(skillFile)) return null;
  const content = fs.readFileSync(skillFile, "utf8");
  const match = content.match(/^name:\s*(.+)$/m);
  return match ? match[1].trim() : skillDir;
}

const skills = fs
  .readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()
  .map((dir) => ({ dir, name: parseSkillName(dir) }))
  .filter((s) => s.name);

const skillsList = skills
  .map((s) => `- \`${s.name}\``)
  .join("\n");

const SKILLS_SECTION = `## Skills\n\n${skillsList}`;

const MARKER_START = "<!-- skills:start -->";
const MARKER_END = "<!-- skills:end -->";

let content = fs.readFileSync(CLAUDE_MD, "utf8");

if (content.includes(MARKER_START)) {
  content = content.replace(
    new RegExp(`${MARKER_START}[\\s\\S]*?${MARKER_END}`),
    `${MARKER_START}\n${SKILLS_SECTION}\n${MARKER_END}`
  );
} else {
  content = content.trimEnd() + `\n\n${MARKER_START}\n${SKILLS_SECTION}\n${MARKER_END}\n`;
}

fs.writeFileSync(CLAUDE_MD, content);
console.log(`CLAUDE.md synced — ${skills.length} skills`);

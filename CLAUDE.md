# Claude kit

Claude Code plugin — personal skill library.

## Structure

```
.claude-plugin/plugin.json   ← plugin manifest
skills/                      ← all skills (each dir has SKILL.md)
hooks/hooks.json             ← event hooks
commands/                    ← flat .md command files
agents/                      ← custom subagent definitions
```

## Conventions

- Each skill dir has `README.md` linking to original upstream source

<!-- skills:start -->
## Skills

- `caveman`
- `caveman-commit`
- `caveman-help`
- `caveman-review`
- `compress`
- `grill-me`
- `karpathy-guidelines`
- `the-fool`
<!-- skills:end -->

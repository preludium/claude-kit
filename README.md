# claude-kit

Personal Claude Code plugin — curated skills for compressed communication, code review, and structured reasoning.

## Install

Add to `~/.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "claude-kit": {
      "source": {
        "source": "github",
        "repo": "preludium/claude-kit"
      }
    }
  },
  "enabledPlugins": {
    "preludium-skills@claude-kit": true
  }
}
```

Then run `/reload-plugins` in Claude Code.

---

## Skills

### Caveman suite

Token-efficient communication. Cuts filler, keeps technical accuracy.

| Skill | Trigger | What it does |
|-------|---------|--------------|
| `caveman` | `/caveman`, "less tokens", "be brief" | Ultra-compressed responses. ~75% token reduction. Levels: `lite` / `full` (default) / `ultra` / `wenyan-*` |
| `caveman-commit` | `/caveman-commit`, "write a commit" | Terse Conventional Commits. Subject ≤50 chars. Body only when why isn't obvious |
| `caveman-review` | `/caveman-review`, "code review" | One-line PR comments: `L42: 🔴 bug: problem. fix.` |
| `caveman-help` | `/caveman-help`, "caveman help" | Quick reference card for all caveman commands |
| `compress` | `/caveman:compress <file>` | Compress CLAUDE.md / memory files into caveman format. Backs up original as `FILE.original.md` |

**Caveman levels:**

| Level | Style |
|-------|-------|
| `lite` | No filler. Keep articles + full sentences |
| `full` | Drop articles, fragments OK, short synonyms |
| `ultra` | Abbreviations, arrows for causality (X → Y), one word when enough |
| `wenyan-lite` | Semi-classical Chinese register |
| `wenyan-full` | 文言文 — 80-90% character reduction |
| `wenyan-ultra` | Maximum classical compression |

Switch levels: `/caveman lite` · `/caveman ultra` · etc.  
Deactivate: say `stop caveman` or `normal mode`.

---

### Reasoning suite

| Skill | Trigger | What it does |
|-------|---------|--------------|
| `grill-me` | "grill me" | Relentless interviewer. Walks every branch of a design decision tree, one question at a time, exploring the codebase when answers can be found there |
| `the-fool` | "challenge this", "devil's advocate", "red team" | Structured critical reasoning across 5 modes: Socratic questioning, Dialectic synthesis, Pre-mortem, Red team, Evidence audit. Steelmans first, then challenges |

**The Fool modes:**

| Mode | What it does |
|------|--------------|
| Expose my assumptions | Socratic probing — surfaces what's being taken for granted |
| Argue the other side | Hegelian dialectic — steelmans the opposing position |
| Find failure modes | Pre-mortem — ranks how this fails, with mitigations |
| Attack this | Red team — adversary profiles, attack vectors, defenses |
| Test the evidence | Falsificationism — audits whether evidence supports the claim |

---

### Coding suite

| Skill | Trigger | What it does |
|-------|---------|--------------|
| `karpathy-guidelines` | Auto-triggers when writing/reviewing/refactoring code | Guardrails against common LLM coding mistakes: think before coding, simplicity first, surgical changes, goal-driven execution with verifiable success criteria |

---

## Hooks

Two hooks run automatically:

| Event | Hook | Effect |
|-------|------|--------|
| `SessionStart` | `caveman-activate.js` | Injects caveman rules as session context so every session starts in caveman mode |
| `UserPromptSubmit` | `caveman-mode-tracker.js` | Tracks active mode to `~/.claude/.caveman-active` — used by statusline scripts to show the current caveman level |

---

## Structure

```
.claude-plugin/plugin.json   ← plugin manifest
skills/                      ← one dir per skill, each with SKILL.md
hooks/hooks.json             ← event hooks
hooks/caveman-activate.js    ← SessionStart hook script
hooks/caveman-mode-tracker.js← UserPromptSubmit hook script
commands/                    ← flat .md slash commands
agents/                      ← custom subagent definitions
```

Each skill dir has a `README.md` linking to the upstream source if the skill was forked from an external plugin.

---

## License

MIT

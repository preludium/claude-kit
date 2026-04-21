#!/usr/bin/env node
// caveman — SessionStart activation hook
// Writes flag file + emits caveman ruleset as session context

const fs = require('fs');
const path = require('path');
const os = require('os');

const flagPath = path.join(os.homedir(), '.claude', '.caveman-active');

try {
  fs.mkdirSync(path.dirname(flagPath), { recursive: true });
  fs.writeFileSync(flagPath, 'full');
} catch (e) {
  // Silent fail -- flag is best-effort
}

process.stdout.write(
  "CAVEMAN MODE ACTIVE. Rules: Drop articles/filler/pleasantries/hedging. " +
  "Fragments OK. Short synonyms. Pattern: [thing] [action] [reason]. [next step]. " +
  "Not: 'Sure! I'd be happy to help you with that.' " +
  "Yes: 'Bug in auth middleware. Fix:' " +
  "Code/commits/security: write normal. " +
  "User says 'normal' or 'stop caveman' to deactivate."
);

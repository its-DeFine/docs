/**
 * @script mdx-render-gate
 * @type dispatch
 * @concern governance
 * @niche pipelines
 * @purpose Blocks Edit/Write when the last MDX edit introduced console errors
 * @description PreToolUse hook for Write/Edit. Reads the verification state written by
 *   mdx-render-verify.js (PostToolUse). If the last MDX edit FAILED verification (new
 *   console errors detected), this hook BLOCKS all subsequent Edit/Write calls unless
 *   the agent is editing the same file that failed (allowing it to fix the problem).
 *   Exempt paths (workspace/, .claude/, session files) are always allowed.
 * @mode read-only
 * @pipeline PreToolUse hook → read state → allow or block
 * @scope .claude/settings.json PreToolUse hook (Write|Edit matcher)
 * @usage Called automatically by Claude Code PreToolUse hook. Not invoked directly.
 * @policy Governance enforcement — do not bypass
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { stdin } = process;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STALE_THRESHOLD_MS = 60 * 60 * 1000; // 1 hour — stale state doesn't block forever

// Paths that are always writable regardless of verification state
const EXEMPT_PATTERNS = [
  /\/workspace\//,
  /\/_workspace\//,
  /\/\.claude\//,
  /session-log\.txt/,
  /phase-gate\.jsonl/,
  /flags\.jsonl/,
  /message-backup\.jsonl/,
  /\/tmp\//
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSessionId() {
  return process.env.CLAUDE_SESSION_ID || 'default';
}

function getStatePath() {
  return path.join('/tmp', `claude-mdx-verification-${getSessionId()}.json`);
}

function isExempt(filePath) {
  return EXEMPT_PATTERNS.some((pattern) => pattern.test(filePath));
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync(getStatePath(), 'utf8'));
  } catch (_) {
    return null;
  }
}

const VALID_TABS = ['home', 'about', 'gateways', 'orchestrators', 'developers', 'delegators', 'solutions', 'resources'];

function extractTab(filePath) {
  const match = filePath.match(/\/?v2\/([^/]+)/);
  const tab = match ? match[1] : '';
  return VALID_TABS.includes(tab) ? `v2/${tab}` : null;
}

// ---------------------------------------------------------------------------
// Remediation lookup — scan repo for scripts that can fix the error class
// ---------------------------------------------------------------------------

const REMEDIATOR_DIR = path.join(
  __dirname, '..', '..', '..', '..',
  'operations', 'scripts', 'remediators'
);

const ERROR_TO_REMEDIATOR = [
  {
    pattern: /frontmatter|duplicate.*key|yaml.*syntax/i,
    script: 'operations/scripts/dispatch/governance/mdx-frontmatter-sanitise.js',
    label: 'Frontmatter auto-fix (duplicate keys)',
    usage: 'Runs automatically as PostToolUse hook on next edit'
  },
  {
    pattern: /import|unused.*import|cannot.*find.*module/i,
    script: 'operations/scripts/remediators/content/repair/repair-page-imports.js',
    label: 'Unused import remediator',
    usage: 'node operations/scripts/remediators/content/repair/repair-page-imports.js --dry-run --files <file>'
  },
  {
    pattern: /markdown|html.*comment|br.*tag|angle.*bracket/i,
    script: 'operations/scripts/remediators/content/repair/repair-mdx-safe-markdown.js',
    label: 'MDX-safe markdown repair',
    usage: 'node operations/scripts/remediators/content/repair/repair-mdx-safe-markdown.js --dry-run --files <file>'
  },
  {
    pattern: /href|link|relative.*path|page.*not.*found/i,
    script: 'operations/scripts/remediators/content/repair/repair-page-links.js',
    label: 'Page link repair',
    usage: 'node operations/scripts/remediators/content/repair/repair-page-links.js --dry-run --files <file>'
  },
  {
    pattern: /spell|typo/i,
    script: 'operations/scripts/remediators/content/repair/repair-spelling.js',
    label: 'Spelling repair',
    usage: 'node operations/scripts/remediators/content/repair/repair-spelling.js --dry-run --files <file>'
  },
  {
    pattern: /governance|GOVERNANCE\.md|lastVerified/i,
    script: 'operations/scripts/remediators/governance/compliance/repair-governance-artifacts.js',
    label: 'Governance artifact repair',
    usage: 'node operations/scripts/remediators/governance/compliance/repair-governance-artifacts.js --dry-run'
  }
];

function findRemediation(failedFile, errors) {
  const errorText = errors.join(' ');
  const matches = [];

  for (const entry of ERROR_TO_REMEDIATOR) {
    if (entry.pattern.test(errorText) || entry.pattern.test(failedFile)) {
      try {
        const absPath = path.resolve(__dirname, '..', '..', '..', '..', entry.script);
        if (fs.existsSync(absPath)) {
          matches.push(entry);
        }
      } catch (_) {
        // Script missing — skip
      }
    }
  }

  // Always check if any remediator exists for the file extension
  if (matches.length === 0 && failedFile.endsWith('.mdx')) {
    try {
      if (fs.existsSync(REMEDIATOR_DIR)) {
        matches.push({
          label: 'Manual inspection',
          usage: `ls operations/scripts/remediators/ — check for applicable fix scripts`
        });
      }
    } catch (_) {
      // No remediator dir
    }
  }

  if (matches.length === 0) return '';

  const lines = matches.map((m) => `  → ${m.label}: ${m.usage}`);
  return `\n\nAvailable remediators:\n${lines.join('\n')}`;
}

// ---------------------------------------------------------------------------
// Main hook logic
// ---------------------------------------------------------------------------

let input = '';
stdin.setEncoding('utf8');
stdin.on('data', (chunk) => { input += chunk; });
stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const toolName = data.tool_name || '';
    const toolInput = data.tool_input || {};
    const filePath = toolInput.file_path || '';

    // Only gate Write and Edit
    if (toolName !== 'Write' && toolName !== 'Edit') {
      process.exit(0);
    }

    // Exempt paths — always allow
    if (isExempt(filePath)) {
      process.exit(0);
    }

    // Read verification state
    const state = readState();

    // No state file — nothing to enforce
    if (!state) {
      process.exit(0);
    }

    // Check staleness — don't block forever on old state
    if (state.timestamp) {
      const age = Date.now() - new Date(state.timestamp).getTime();
      if (age > STALE_THRESHOLD_MS) {
        console.log(JSON.stringify({
          systemMessage: 'RENDER GATE: Stale verification state (>1 hour old). Allowing edit. Run verification manually to confirm page health.'
        }));
        process.exit(0);
      }
    }

    // Passed or server-failed — allow through
    if (state.status === 'passed') {
      process.exit(0);
    }

    if (state.status === 'server-failed') {
      // Derive scope from the file that triggered the failure — must be a real tab
      const VALID_TABS = ['home', 'about', 'gateways', 'orchestrators', 'developers', 'delegators', 'solutions', 'resources'];
      const failedRoute = state.route || state.file || '';
      const scopeMatch = failedRoute.match(/\/?v2\/([^/]+)/);
      const tab = scopeMatch ? scopeMatch[1] : '';
      const scope = VALID_TABS.includes(tab) ? `v2/${tab}` : 'v2/home';

      // Try scoped auto-restart before allowing unverified edits
      try {
        execSync(`node operations/scripts/dispatch/governance/server-lifecycle.js restart ${scope}`, {
          timeout: 120000,
          stdio: 'pipe',
          cwd: process.cwd()
        });
        console.log(JSON.stringify({
          systemMessage: `RENDER GATE: Server was down. Scoped restart (${scope}) succeeded. Allowing edit — verification will run after.`
        }));
        process.exit(0);
      } catch (_) {
        console.log(JSON.stringify({
          decision: 'block',
          reason: `BLOCKED: Mintlify dev server is down and scoped restart (${scope}) failed. Check build errors: tail -50 /tmp/mint-dev-test-*.log. Fix the build error, then run: node operations/scripts/dispatch/governance/server-lifecycle.js restart ${scope}`
        }));
        process.exit(2);
      }
    }

    if (state.status === 'pending') {
      console.log(JSON.stringify({
        systemMessage: 'RENDER GATE: Verification still in progress from previous edit. Allowing edit — results will be checked on the next tool call.'
      }));
      process.exit(0);
    }

    // FAILED — this is where we enforce
    if (state.status === 'failed') {
      const failedFile = state.file || '';
      const failedRoute = state.route || '';
      const newErrors = state.newErrors || [];

      // Allow editing the same file that failed (agent is fixing it)
      if (filePath === failedFile) {
        console.log(JSON.stringify({
          systemMessage: `RENDER GATE: Editing the file that failed verification (${path.basename(failedFile)}). Will re-verify after this edit.`
        }));
        process.exit(0);
      }

      // Scope check — only block edits within the same v2/{tab} as the failure.
      // Files outside v2/ (docs-guide/, snippets/, operations/) are never blocked
      // by a v2/ render failure. Files in a different v2/ tab are also allowed.
      const failedTab = extractTab(failedFile);
      const editTab = extractTab(filePath);

      if (!editTab || editTab !== failedTab) {
        console.log(JSON.stringify({
          systemMessage: `RENDER GATE: ${path.basename(failedFile)} has render errors on ${failedRoute}, but ${path.basename(filePath)} is in a different scope (${editTab || 'non-v2'}). Allowing edit. Fix ${path.basename(failedFile)} when you return to ${failedTab || 'that tab'}.`
        }));
        process.exit(0);
      }

      // BLOCK — agent is editing within the same tab as the failure
      const errorList = newErrors.slice(0, 5).map((e) => `  - ${e}`).join('\n');
      const truncated = newErrors.length > 5 ? `\n  ... and ${newErrors.length - 5} more` : '';

      // Look for applicable remediation scripts
      const remediation = findRemediation(failedFile, newErrors);

      console.log(JSON.stringify({
        decision: 'block',
        reason: `BLOCKED: Your last edit to ${path.basename(failedFile)} introduced console errors on ${failedRoute}:\n${errorList}${truncated}\n\nFix ${path.basename(failedFile)} before editing other files in ${failedTab}. The render gate will clear when ${failedRoute} renders clean.${remediation}`
      }));
      process.exit(2);
    }

    // Unknown status — allow through, don't block on unexpected state
    process.exit(0);
  } catch (_) {
    // Parse failure or other error — allow through, don't block work
    process.exit(0);
  }
});

/**
 * @script pre-tool-guard
 * @type dispatch
 * @concern governance
 * @niche pipelines
 * @purpose Pre-tool enforcement for Claude Code sessions
 * @description Mechanically enforces co-work rules before tool execution. Blocks destructive git, public posts, and unconfirmed writes.
 * @mode read-only
 * @pipeline PreToolUse hook → reads stdin tool input → decision (allow/block/warn)
 * @scope .claude/settings.json PreToolUse hook
 * @usage Called automatically by Claude Code PreToolUse hook. Not invoked directly.
 * @policy Governance enforcement — do not bypass
 */

const { stdin } = process;

let input = '';
stdin.setEncoding('utf8');
stdin.on('data', (chunk) => { input += chunk; });
stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const toolName = data.tool_name || '';
    const toolInput = data.tool_input || {};

    // --- BASH COMMANDS ---
    if (toolName === 'Bash') {
      const cmd = toolInput.command || '';

      // Allow branch creation
      if (/git\s+checkout\s+-b/.test(cmd)) {
        process.exit(0);
      }

      // Block destructive git
      if (/git\s+(checkout|clean|reset\s+--hard|push\s+--force|push\s+-f|branch\s+-D)/.test(cmd)) {
        console.log(JSON.stringify({
          decision: 'block',
          reason: 'BLOCKED: Destructive git command. Run manually if needed.'
        }));
        process.exit(2);
      }

      // Block public service posts
      if (/gh\s+(issue|pr)\s+(create|comment|edit)/i.test(cmd) ||
          /curl.*(api\.github|hooks\.slack)/i.test(cmd)) {
        console.log(JSON.stringify({
          decision: 'block',
          reason: 'BLOCKED: This command posts to a public service. Review content for sensitive data before running manually.'
        }));
        process.exit(2);
      }
    }

    // --- WRITE/EDIT TO MDX/JSX: remind to verify ---
    if ((toolName === 'Write' || toolName === 'Edit') && toolInput.file_path) {
      const fp = toolInput.file_path;
      if (/\.(mdx|jsx)$/.test(fp)) {
        console.log(JSON.stringify({
          systemMessage: 'MDX/JSX file modified. After completing edits, verify rendering with: node operations/tests/integration/mdx-component-runtime-smoke.js --routes /v2/relevant-path'
        }));
      }
    }

    process.exit(0);
  } catch (e) {
    // Parse failure — allow through, don't block work
    process.exit(0);
  }
});

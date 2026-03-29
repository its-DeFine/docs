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

const fs = require('fs');
const path = require('path');
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

    // --- WRITE/EDIT: context gate (read-before-write + broader context) ---
    if ((toolName === 'Write' || toolName === 'Edit') && toolInput.file_path) {
      const fp = toolInput.file_path;
      const sessionId = process.env.CLAUDE_SESSION_ID || 'default';
      const readLogPath = path.join('/tmp', `claude-reads-${sessionId}`);

      let readFiles = [];
      try {
        readFiles = fs.readFileSync(readLogPath, 'utf8').trim().split('\n').filter(Boolean);
      } catch (_) { /* no reads logged yet */ }

      const targetRead = readFiles.some(f => f === fp);
      const targetDir = path.dirname(fp);
      const siblingReads = readFiles.filter(f => f !== fp && path.dirname(f) === targetDir);
      const totalDistinctReads = new Set(readFiles).size;

      // Cross-session collision check
      const registryPath = '/tmp/claude-session-registry';
      try {
        const reg = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
        const otherSessions = Object.entries(reg)
          .filter(([sid]) => sid !== sessionId)
          .filter(([, entry]) => Date.now() - entry.lastSeen < 4 * 60 * 60 * 1000);
        for (const [sid, entry] of otherSessions) {
          if (entry.files && entry.files.includes(fp)) {
            const ago = Math.round((Date.now() - entry.lastSeen) / 60000);
            console.log(JSON.stringify({
              systemMessage: `COLLISION WARNING: Another session (${sid.slice(0, 8)}..., active ${ago}m ago) has edited this same file. Check with the user before overwriting — your changes may conflict.`
            }));
            break;
          }
        }
      } catch (_) { /* no registry yet */ }

      // Hard warning: editing a file you haven't read
      if (!targetRead && !/session-log\.txt/.test(fp) && !/\.json$/.test(fp)) {
        console.log(JSON.stringify({
          systemMessage: 'CONTEXT GATE: You are editing a file you have not Read in this session. Read the file first, understand its current state and purpose, then edit. Do not edit blind.'
        }));
      }

      // Soft warning: only read the target file, nothing around it
      if (targetRead && siblingReads.length === 0 && totalDistinctReads <= 2 &&
          !/session-log\.txt/.test(fp) && !/settings\.json/.test(fp)) {
        console.log(JSON.stringify({
          systemMessage: 'CONTEXT WARNING: You have only read the target file and nothing else. Before editing, consider: who calls this? Who consumes it? Are there related files, tests, or templates that this change affects? Check broader context before proceeding.'
        }));
      }

      // MDX/JSX: verify rendering
      if (/\.(mdx|jsx)$/.test(fp)) {
        console.log(JSON.stringify({
          systemMessage: 'MDX/JSX file modified. Verify rendering before declaring done: node operations/tests/integration/mdx-component-runtime-smoke.js --routes /v2/relevant-path'
        }));
      }

      // Scripts: run the script
      if (/operations\/scripts\/.*\.js$/.test(fp)) {
        console.log(JSON.stringify({
          systemMessage: 'Script modified. Run this script and confirm it executes without errors before declaring done.'
        }));
      }

      // Template vs page check
      if (/snippets\/templates\//.test(fp)) {
        console.log(JSON.stringify({
          systemMessage: 'This is a TEMPLATE file. Confirm you intend to edit the template, not an individual page.'
        }));
      }
      if (/v2\/.*\.(mdx|md)$/.test(fp) && !/templates\//.test(fp)) {
        console.log(JSON.stringify({
          systemMessage: 'This is a PAGE file in v2/. Confirm you intend to edit this page directly, not a template in snippets/templates/. If unsure, check snippets/templates/ for a matching template before proceeding.'
        }));
      }
    }

    // --- BASH: file move/rename stale reference reminder ---
    if (toolName === 'Bash') {
      const cmd = toolInput.command || '';
      if (/git\s+mv|mv\s+/.test(cmd) || /rename/i.test(cmd)) {
        console.log(JSON.stringify({
          systemMessage: 'File move detected. After completing moves, scan ALL file types for stale references: .mdx, .jsx, .json, .txt, sitemap, llms.txt, docs.json. Do not declare done until residual scan is clean.'
        }));
      }
    }

    process.exit(0);
  } catch (e) {
    // Parse failure — allow through, don't block work
    process.exit(0);
  }
});

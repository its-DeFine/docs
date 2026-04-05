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

    // --- AGENT: block execution agents, allow research/audit/read-only ---
    if (toolName === 'Agent') {
      const prompt = (toolInput.prompt || '').toLowerCase();
      const subtype = (toolInput.subagent_type || '').toLowerCase();
      const isReadOnly = subtype === 'explore' ||
        /\b(research|audit|investigate|analyse|analyze|scan|find|search|check|review|read|plan)\b/.test(prompt) &&
        !/\b(edit|write|create|build|fix|implement|refactor|move|rename|delete)\b/.test(prompt);

      if (!isReadOnly) {
        console.log(JSON.stringify({
          decision: 'block',
          reason: 'BLOCKED: Execution agent requires explicit approval. Research/audit/read-only agents are pre-approved.'
        }));
        process.exit(2);
      }
    }

    // --- BASH COMMANDS ---
    if (toolName === 'Bash') {
      const cmd = toolInput.command || '';

      // Block ad-hoc mintlify dev — use server-manager instead
      if (/mintlify\s+dev|npx\s+mintlify|mint\s+dev/i.test(cmd) && !/server-manager/i.test(cmd)) {
        console.log(JSON.stringify({
          decision: 'block',
          reason: 'BLOCKED: Do not run mintlify dev directly. Use the server-manager (.githooks/server-manager.js) which runs on port 3145 and handles lifecycle. Ad-hoc mintlify dev leaves zombie processes on port 3333+.'
        }));
        process.exit(2);
      }

      // Browser test commands: warn about cleanup
      if (/puppeteer|playwright|headless|smoke.*test|verify.*page/i.test(cmd)) {
        console.log(JSON.stringify({
          systemMessage: 'BROWSER TEST: If this test times out or you interrupt it, run: pkill -f "chrome.*--headless" to clean up zombie processes. Do not leave headless browsers running.'
        }));
      }

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

      // Auto-generated file block — check first 512 bytes for markers
      try {
        const fd = fs.openSync(fp, 'r');
        const buf = Buffer.alloc(512);
        const bytesRead = fs.readSync(fd, buf, 0, 512, 0);
        fs.closeSync(fd);
        const header = buf.toString('utf8', 0, bytesRead);
        if (/DO\s*NOT\s*EDIT|(?:^|\/\/|\/\*|<!--)\s*AUTO[- ]GENERATED/im.test(header)) {
          console.log(JSON.stringify({
            decision: 'block',
            reason: 'BLOCKED: Auto-generated file (header marker detected in first 512 bytes). Edit the generator script or put derived logic in a separate file.'
          }));
          process.exit(2);
        }
      } catch (_) { /* new file or unreadable — allow through */ }

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

      // Em-dash check — block on .mdx content files, skip props/code
      if (/\.mdx$/.test(fp)) {
        const content = toolInput.new_string || toolInput.content || '';
        // Strip JSX props (key="value" or key={value}) and code blocks before checking
        const stripped = content
          .replace(/\w+=["'{][^"'}]*["'}]/g, '')  // props
          .replace(/`[^`]*`/g, '')                 // inline code
          .replace(/```[\s\S]*?```/g, '');         // code blocks
        if (stripped.includes('\u2014')) {
          console.log(JSON.stringify({
            decision: 'block',
            reason: 'BLOCKED: Em-dash (\u2014) detected in MDX content. Use a comma, semicolon, colon, or rewrite the sentence. No em-dashes.'
          }));
          process.exit(2);
        }
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

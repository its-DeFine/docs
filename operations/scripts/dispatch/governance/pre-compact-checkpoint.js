/**
 * @script pre-compact-checkpoint
 * @type dispatch
 * @concern governance
 * @niche pipelines
 * @purpose Writes a session checkpoint before context compaction
 * @description Fires before Claude Code compacts context in long sessions. Appends a
 *   timestamped checkpoint to the session log so mid-session state is preserved without
 *   needing a parallel observer agent. Outputs a systemMessage to re-anchor the session
 *   after compaction.
 * @mode write (session-log.txt only)
 * @pipeline PreCompact hook → reads stdin → writes checkpoint to session-log.txt → outputs systemMessage
 * @scope .claude/settings.json PreCompact hook
 * @usage Called automatically by Claude Code PreCompact hook. Not invoked directly.
 * @policy Governance enforcement — do not bypass
 */

const fs = require('fs');
const path = require('path');
const { stdin } = process;

const LOG_PATH = path.join(
  process.cwd(),
  'workspace/thread-outputs/sessions/session-log.txt'
);

let input = '';
stdin.setEncoding('utf8');
stdin.on('data', (chunk) => { input += chunk; });
stdin.on('end', () => {
  try {
    const data = input.trim() ? JSON.parse(input) : {};
    const sessionId = process.env.CLAUDE_SESSION_ID || 'unknown';
    const timestamp = new Date().toISOString();
    const summary = data.transcript_summary || data.summary || '';

    // Build checkpoint entry
    const lines = [
      `--- CHECKPOINT ${timestamp} [${sessionId}] ---`,
    ];
    if (summary) {
      lines.push(summary);
    } else {
      lines.push('(Context compaction occurred — no summary available from hook input)');
    }
    lines.push('---');
    lines.push('');

    // Ensure directory exists
    const dir = path.dirname(LOG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Append to session log
    fs.appendFileSync(LOG_PATH, lines.join('\n'));

    // Output systemMessage to re-anchor after compaction
    console.log(JSON.stringify({
      systemMessage: [
        'CONTEXT COMPACTION OCCURRED — a checkpoint was written to workspace/thread-outputs/sessions/session-log.txt.',
        'Re-read the session thread outcome and current task list (TodoWrite) before continuing.',
        'If you are unsure what was being worked on, read the checkpoint in session-log.txt.',
        'Do not start new work without confirming continuity with the user.'
      ].join(' ')
    }));

    process.exit(0);
  } catch (e) {
    // Failure must not block compaction — exit cleanly
    process.exit(0);
  }
});

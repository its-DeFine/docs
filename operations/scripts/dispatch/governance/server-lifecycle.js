/**
 * @script server-lifecycle
 * @type dispatch
 * @concern governance
 * @niche pipelines
 * @purpose Ensures Mintlify dev server is running at session start for render verification
 * @description SessionStart hook. Auto-starts the Mintlify dev server via server-manager
 *   so that all subsequent render verification hooks have a live server to check against.
 *   One-time cost per session (~2-5 min cold start). If the server is already running,
 *   completes in <1 second. Writes server state to /tmp for downstream hooks.
 * @mode execute
 * @pipeline SessionStart hook → ensure server → write state
 * @scope .claude/settings.json SessionStart hook
 * @usage Called automatically by Claude Code SessionStart hook. Not invoked directly.
 * @policy Governance enforcement — do not bypass
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getRepoRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', {
      encoding: 'utf8',
      cwd: process.cwd()
    }).trim();
  } catch (_) {
    return process.cwd();
  }
}

const REPO_ROOT = getRepoRoot();
const SERVER_MANAGER_PATH = path.join(REPO_ROOT, '.githooks', 'server-manager.js');
const PROBE_PATH = '/v2/home/mission-control';

function getSessionId() {
  return process.env.CLAUDE_SESSION_ID || 'default';
}

function writeServerState(state) {
  const statePath = path.join('/tmp', `claude-mdx-server-${getSessionId()}.json`);
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n');
}

async function main() {
  let serverManager;
  try {
    // Clear require cache to get fresh state
    const resolved = require.resolve(SERVER_MANAGER_PATH);
    if (require.cache[resolved]) {
      delete require.cache[resolved];
    }
    serverManager = require(SERVER_MANAGER_PATH);
  } catch (err) {
    console.error(`Server-manager not found at ${SERVER_MANAGER_PATH}: ${err.message}`);
    writeServerState({ running: false, error: 'server-manager not found', timestamp: new Date().toISOString() });
    return;
  }

  try {
    const alreadyRunning = await serverManager.isServerRunning({ probePath: PROBE_PATH });

    if (alreadyRunning) {
      const url = serverManager.getServerUrl();
      writeServerState({
        running: true,
        url,
        startedByUs: false,
        timestamp: new Date().toISOString()
      });
      console.log(`Render verification server already running at ${url}`);
      return;
    }

    // Server not running — start it
    console.log('Starting Mintlify dev server for render verification...');
    await serverManager.ensureServerRunning({ probePath: PROBE_PATH });
    const url = serverManager.getServerUrl();

    writeServerState({
      running: true,
      url,
      startedByUs: true,
      timestamp: new Date().toISOString()
    });

    console.log(`Render verification server started at ${url}`);
  } catch (err) {
    console.error(`Failed to start render verification server: ${err.message}`);
    writeServerState({
      running: false,
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
}

main();

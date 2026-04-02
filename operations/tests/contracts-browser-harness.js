#!/usr/bin/env node
/**
 * @script contracts-browser-harness
 * @type automation
 * @concern testing
 * @niche render/page
 * @description Unified fresh-bundle harness for the contracts recovery browser gates.
 *              Starts one recovery-owned Mint bundle, exports one shared base URL,
 *              then runs smoke plus both contracts route browser validators against
 *              that exact served bundle.
 * @usage node operations/tests/contracts-browser-harness.js
 */

const path = require('path');
const { spawnSync } = require('child_process');

const CONTRACTS_ROUTE = '/v2/about/resources/livepeer-contract-addresses';
const BLOCKCHAIN_ROUTE = '/v2/about/livepeer-protocol/blockchain-contracts';
const CONTRACTS_SCOPE_PREFIXES = [
  'v2/about/resources/livepeer-contract-addresses',
  'v2/about/livepeer-protocol/blockchain-contracts',
  'snippets/composables/pages/canonical/data',
  'snippets/data/contract-addresses',
  'v2/about/livepeer-protocol/data',
].join(',');
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const serverManager = require(path.join(REPO_ROOT, '.githooks', 'server-manager.js'));

function runNodeScript(relativeScriptPath, args = [], env = {}) {
  const scriptPath = path.join(REPO_ROOT, relativeScriptPath);
  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    cwd: REPO_ROOT,
    env: {
      ...process.env,
      ...env,
    },
    stdio: 'inherit',
  });

  return {
    script: relativeScriptPath,
    status: result.status == null ? 1 : result.status,
    error: result.error ? String(result.error.message || result.error) : '',
  };
}

async function main() {
  process.env.MINT_SCOPE_PREFIXES = process.env.MINT_SCOPE_PREFIXES || CONTRACTS_SCOPE_PREFIXES;
  serverManager.stopServer();
  await serverManager.ensureServerRunning({
    probePath: CONTRACTS_ROUTE,
    allowCommonPorts: false,
  });

  const baseUrl = serverManager.getServerUrl();
  const sharedEnv = {
    CONTRACTS_TEST_BASE_URL: baseUrl,
    MINT_BASE_URL: baseUrl,
  };

  console.log('\n── Contracts Browser Harness ─────────────────────');
  console.log(`Base URL: ${baseUrl}`);
  console.log('Validators: smoke -> contracts page -> blockchain page');
  console.log('──────────────────────────────────────────────────');

  const runs = [
    runNodeScript(
      'operations/tests/integration/mdx-component-runtime-smoke.js',
      ['--routes', `${CONTRACTS_ROUTE},${BLOCKCHAIN_ROUTE}`, '--base-url', baseUrl],
      sharedEnv
    ),
    runNodeScript('operations/tests/playwright-contract-addresses.js', [], sharedEnv),
    runNodeScript('operations/tests/playwright-blockchain-contracts.js', [], sharedEnv),
  ];

  const failed = runs.find((run) => run.status !== 0);
  if (failed) {
    if (failed.error) {
      console.error(`Harness error in ${failed.script}: ${failed.error}`);
    }
    process.exit(failed.status || 1);
  }

  console.log('\nContracts browser harness PASS.');
}

main().catch((error) => {
  console.error(`Contracts browser harness failed: ${error.message}`);
  process.exit(1);
});

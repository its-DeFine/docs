#!/usr/bin/env node
/**
 * @script v2-link-audit.selftest
 * @summary Script-level self-tests for v2 link audit external validation using a local HTTP fixture and temporary MDX file.
 * @owner docs
 * @scope tests/integration
 *
 * @usage
 *   node tests/integration/v2-link-audit.selftest.js
 *
 * @inputs
 *   No required CLI flags.
 *
 * @outputs
 *   - /tmp/v2-link-audit-selftest.md
 *   - /tmp/v2-link-audit-selftest.json
 *   - Console summary
 *
 * @exit-codes
 *   0 = self-tests passed
 *   1 = one or more self-tests failed
 *
 * @examples
 *   node tests/integration/v2-link-audit.selftest.js
 *
 * @notes
 *   Creates and removes a temporary fixture file under v2/internal/reports/navigation-links.
 */

const assert = require('assert');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { execSync } = require('child_process');
const audit = require('./v2-link-audit');

function getRepoRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (_error) {
    return process.cwd();
  }
}

async function startServer() {
  const server = http.createServer((req, res) => {
    const url = req.url || '/';

    if (url.startsWith('/ok')) {
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.end('ok');
      return;
    }

    if (url.startsWith('/head-fallback')) {
      if (req.method === 'HEAD') {
        res.writeHead(405, { 'content-type': 'text/plain' });
        res.end();
        return;
      }
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.end('fallback-ok');
      return;
    }

    if (url.startsWith('/soft')) {
      res.writeHead(503, { 'content-type': 'text/plain' });
      res.end('soft-fail');
      return;
    }

    if (url.startsWith('/hard')) {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('hard-fail');
      return;
    }

    if (url.startsWith('/media.png')) {
      res.writeHead(200, { 'content-type': 'image/png' });
      res.end('PNG');
      return;
    }

    res.writeHead(500, { 'content-type': 'text/plain' });
    res.end('unexpected route');
  });

  await new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', (error) => {
      if (error) reject(error);
      else resolve();
    });
  });

  const addr = server.address();
  const base = `http://127.0.0.1:${addr.port}`;
  return { server, base };
}

async function closeServer(server) {
  if (!server) return;
  await new Promise((resolve) => server.close(() => resolve()));
}

async function run() {
  let server = null;
  let fixtureFile = '';
  const reportMd = '/tmp/v2-link-audit-selftest.md';
  const reportJson = '/tmp/v2-link-audit-selftest.json';

  try {
    const started = await startServer();
    server = started.server;
    const base = started.base;

    const root = getRepoRoot();
    const fixtureDir = path.join(root, 'v2', 'internal', 'reports', 'navigation-links');
    fixtureFile = path.join(fixtureDir, `v2-link-audit-selftest-${Date.now()}.mdx`);
    const relFixture = path.relative(root, fixtureFile).split(path.sep).join('/');

    const content = [
      '# V2 Link Audit Selftest Fixture',
      '',
      `[ok](${base}/ok)`,
      `[head fallback](${base}/head-fallback#anchor)`,
      `[soft](${base}/soft)`,
      `[hard](${base}/hard)`,
      '<a href="https://bad^url">invalid</a>',
      `![media](${base}/media.png)`
    ].join('\n');

    fs.writeFileSync(fixtureFile, `${content}\n`, 'utf8');

    const out = await audit.runAudit({
      argv: [
        '--files', relFixture,
        '--external-policy', 'validate',
        '--external-link-types', 'navigational',
        '--external-timeout-ms', '3000',
        '--external-concurrency', '4',
        '--external-per-host-concurrency', '2',
        '--external-retries', '0',
        '--no-write-links',
        '--report', reportMd,
        '--report-json', reportJson
      ]
    });

    assert.strictEqual(out.exitCode, 0);
    assert.strictEqual(out.externalValidation.eligibleRefCount, 5);
    assert.strictEqual(out.externalValidation.urlClassCounts[audit.EXTERNAL_OK], 2);
    assert.strictEqual(out.externalValidation.urlClassCounts[audit.EXTERNAL_SOFT_FAIL], 1);
    assert.strictEqual(out.externalValidation.urlClassCounts[audit.EXTERNAL_HARD_FAIL], 2);

    const json = JSON.parse(fs.readFileSync(reportJson, 'utf8'));
    const classes = json.external.urlResults.reduce((acc, row) => {
      acc[row.class] = (acc[row.class] || 0) + 1;
      return acc;
    }, {});

    assert.strictEqual(classes[audit.EXTERNAL_OK], 2);
    assert.strictEqual(classes[audit.EXTERNAL_SOFT_FAIL], 1);
    assert.strictEqual(classes[audit.EXTERNAL_HARD_FAIL], 2);

    const fileEntry = json.files.find((item) => item.file === relFixture);
    assert.ok(fileEntry, 'Expected fixture file in JSON report');

    const mediaRef = fileEntry.refs.find((ref) => String(ref.rawPath).includes('/media.png'));
    assert.ok(mediaRef, 'Expected media ref in fixture file refs');
    assert.strictEqual(mediaRef.status, audit.EXTERNAL_UNTESTED);

    console.log('✅ v2-link-audit selftest passed');
    return 0;
  } catch (error) {
    console.error(`❌ v2-link-audit selftest failed: ${error.message}`);
    return 1;
  } finally {
    if (fixtureFile && fs.existsSync(fixtureFile)) {
      fs.unlinkSync(fixtureFile);
    }
    await closeServer(server);
  }
}

if (require.main === module) {
  run().then((code) => process.exit(code));
}

module.exports = { run };

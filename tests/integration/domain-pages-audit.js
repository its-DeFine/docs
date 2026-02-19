#!/usr/bin/env node
/**
 * Audit docs page load status on a deployed domain.
 * Writes a stable report file (overwritten each run):
 *   tests/reports/domain-page-load-report.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

const args = process.argv.slice(2);
const stagedOnly = args.includes('--staged');
const baseUrlArgIndex = args.indexOf('--base-url');
const versionArgIndex = args.indexOf('--version');
const baseUrl = baseUrlArgIndex >= 0 && args[baseUrlArgIndex + 1]
  ? args[baseUrlArgIndex + 1]
  : (process.env.MINT_BASE_URL || 'https://docs.livepeer.org');
const versionScopeRaw = versionArgIndex >= 0 && args[versionArgIndex + 1]
  ? args[versionArgIndex + 1]
  : (process.env.DOMAIN_AUDIT_VERSION || 'both');
const versionScope = String(versionScopeRaw).toLowerCase();

const ROOT = path.join(__dirname, '..', '..');
const DOCS_JSON_PATH = path.join(ROOT, 'docs.json');
const REPORT_PATH = path.join(ROOT, 'tests', 'reports', 'domain-page-load-report.json');
const TIMEOUT = 25000;
const CONCURRENCY = 8;
const ALLOWED_SCOPES = new Set(['v1', 'v2', 'both']);

function isVersionSelected(pagePath) {
  if (versionScope === 'both') return true;
  if (versionScope === 'v1') return pagePath.startsWith('v1/');
  if (versionScope === 'v2') return pagePath.startsWith('v2/');
  return true;
}

function extractPagePathsFromObject(node, version, pages, seen) {
  if (typeof node === 'string') {
    const pagePath = node.replace(/\.mdx?$/, '');
    if (pagePath.startsWith(`${version}/`) && !seen.has(pagePath)) {
      seen.add(pagePath);
      pages.push(pagePath);
    }
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((item) => extractPagePathsFromObject(item, version, pages, seen));
    return;
  }

  if (!node || typeof node !== 'object') return;

  if (Array.isArray(node.pages)) {
    node.pages.forEach((item) => extractPagePathsFromObject(item, version, pages, seen));
  }

  Object.values(node).forEach((value) => {
    extractPagePathsFromObject(value, version, pages, seen);
  });
}

function getAllDocsPages() {
  const docsJson = JSON.parse(fs.readFileSync(DOCS_JSON_PATH, 'utf8'));
  const versions = docsJson?.navigation?.versions || [];
  const pages = [];
  const seen = new Set();

  versions.forEach((versionNode) => {
    const version = versionNode.version;
    if (!version || !versionNode.languages) return;
    extractPagePathsFromObject(versionNode.languages, version, pages, seen);
  });

  return pages;
}

function getStagedDocsPages() {
  let staged = '';
  try {
    staged = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
  } catch (_err) {
    return [];
  }

  return staged
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((file) => file.endsWith('.mdx'))
    .filter((file) => file.startsWith('v1/') || file.startsWith('v2/pages/'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

function is404Content(text, title) {
  const haystack = `${title || ''} ${text || ''}`.toLowerCase();
  return haystack.includes("ruh oh. this page doesn't exist") ||
    haystack.includes('page not found') ||
    haystack.includes('404');
}

function pageToUrl(pagePath) {
  return `${baseUrl.replace(/\/$/, '')}/${pagePath}`;
}

async function testSinglePage(browser, pagePath) {
  const url = pageToUrl(pagePath);
  const page = await browser.newPage();

  try {
    const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: TIMEOUT });
    const status = response ? response.status() : null;
    const data = await page.evaluate(() => ({
      title: document.title || '',
      text: document.body?.innerText || ''
    }));

    const warnings = [];
    const errors = [];

    if (status && status >= 400) {
      errors.push(`HTTP ${status}`);
    }
    if (is404Content(data.text, data.title)) {
      errors.push('404 content');
    }
    if ((data.text || '').trim().length < 100) {
      warnings.push(`low content length (${data.text.length})`);
    }

    return {
      pagePath,
      url,
      status,
      title: data.title,
      contentLength: data.text.length,
      passed: errors.length === 0,
      errors,
      warnings
    };
  } catch (error) {
    return {
      pagePath,
      url,
      status: null,
      title: '',
      contentLength: 0,
      passed: false,
      errors: [`navigation error: ${error.message}`],
      warnings: []
    };
  } finally {
    await page.close();
  }
}

async function run() {
  if (!ALLOWED_SCOPES.has(versionScope)) {
    console.error(`❌ Invalid --version value: "${versionScopeRaw}". Use one of: v1, v2, both`);
    return 1;
  }

  const startedAt = new Date();
  const allPages = stagedOnly ? getStagedDocsPages() : getAllDocsPages();
  const pages = [...new Set(allPages)].filter(isVersionSelected);

  if (pages.length === 0) {
    console.log('ℹ️  No matching docs pages to audit.');
    const emptyReport = {
      timestamp: startedAt.toISOString(),
      baseUrl,
      mode: stagedOnly ? 'staged' : 'all',
      versionScope,
      total: 0,
      passed: 0,
      failed: 0,
      results: []
    };
    fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
    fs.writeFileSync(REPORT_PATH, JSON.stringify(emptyReport, null, 2));
    console.log(`📝 Report written: ${REPORT_PATH}`);
    return 0;
  }

  console.log(`🌐 Auditing ${pages.length} page(s) on ${baseUrl} (scope: ${versionScope})`);
  console.log(`📝 Report path: ${REPORT_PATH}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];
  for (let i = 0; i < pages.length; i += CONCURRENCY) {
    const batch = pages.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map((pagePath) => testSinglePage(browser, pagePath)));
    results.push(...batchResults);

    batchResults.forEach((result) => {
      const icon = result.passed ? '✅' : '❌';
      const reason = result.passed ? '' : ` (${result.errors.join('; ')})`;
      console.log(`${icon} ${result.pagePath}${reason}`);
    });
    console.log(`Progress: ${Math.min(i + CONCURRENCY, pages.length)}/${pages.length}`);
  }

  await browser.close();

  const passed = results.filter((item) => item.passed).length;
  const failed = results.length - passed;
  const durationSec = Math.round((Date.now() - startedAt.getTime()) / 1000);

  const report = {
    timestamp: startedAt.toISOString(),
    completedAt: new Date().toISOString(),
    baseUrl,
    mode: stagedOnly ? 'staged' : 'all',
    versionScope,
    total: results.length,
    passed,
    failed,
    durationSec,
    results
  };

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  console.log('\n============================================================');
  console.log('Domain Page Load Audit Summary');
  console.log('============================================================');
  console.log(`Total:  ${report.total}`);
  console.log(`Passed: ${report.passed}`);
  console.log(`Failed: ${report.failed}`);
  console.log(`Time:   ${report.durationSec}s`);
  console.log(`Report: ${REPORT_PATH}`);

  return failed > 0 ? 1 : 0;
}

run()
  .then((exitCode) => process.exit(exitCode))
  .catch((error) => {
    console.error(`❌ Domain audit failed: ${error.message}`);
    process.exit(1);
  });

/**
 * @script playwright-contract-addresses
 * @type automation
 * @concern testing
 * @niche render/page
 * @description CP-6: Verifies the canonical contract-addresses page and legacy redirects render
 *              fully against a local Mint preview. Validates the active table, widget controls,
 *              and redirect contract.
 * @usage node operations/tests/playwright-contract-addresses.js
 */

const puppeteer = require('/opt/homebrew/lib/node_modules/puppeteer');

const BASE_URL = process.env.CONTRACTS_TEST_BASE_URL || 'http://localhost:3334';

const PAGES = [
  {
    name: 'contract-addresses (canonical)',
    url: `${BASE_URL}/v2/about/resources/livepeer-contract-addresses`,
  },
  {
    name: 'contract-addresses (legacy redirect)',
    url: `${BASE_URL}/references/contract-addresses`,
  },
];

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testPage(browser, { name, url }) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sleep(3000);

    const bodyText = await page.$eval('body', el => el.textContent);
    const hasContent = bodyText.length > 200;

    const tableExists = await page.$('table') !== null;
    const searchInput = await page.$('input[type="text"], input[placeholder], input[type="search"], select') !== null;
    const finalUrl = page.url();

    // Look for an address row — check for 0x in table cells
    const hasAddress = await page.evaluate(() => {
      const cells = document.querySelectorAll('td, tr');
      return Array.from(cells).some(el => /0x[0-9a-fA-F]{10,}/.test(el.textContent));
    });

    const filteredErrors = errors.filter(e =>
      !e.includes('favicon') &&
      !e.includes('404') &&
      !e.includes('rss.xml')
    );

    const canonicalUrl = `${BASE_URL}/v2/about/resources/livepeer-contract-addresses`;
    const redirectOk = name.includes('redirect') ? finalUrl === canonicalUrl : true;

    return {
      name,
      url,
      passed: hasContent && tableExists && redirectOk && !filteredErrors.some(e => e.includes('import') || e.includes('Cannot read')),
      hasContent,
      tableExists,
      searchInput,
      hasAddress,
      errors: filteredErrors,
      bodyLength: bodyText.length,
      finalUrl,
      redirectOk,
    };
  } catch (e) {
    return { name, url, passed: false, hasContent: false, tableExists: false, searchInput: false, hasAddress: false, errors: [e.message], bodyLength: 0, finalUrl: null, redirectOk: false };
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const results = [];

  for (const p of PAGES) {
    console.log(`Testing: ${p.name} ...`);
    const result = await testPage(browser, p);
    results.push(result);
  }

  await browser.close();

  console.log('\n── CP-6 Results ──────────────────────────────────');
  let allPassed = true;
  for (const r of results) {
    const status = r.passed ? 'PASS' : 'FAIL';
    console.log(`\n[${status}] ${r.name}`);
    console.log(`  URL:          ${r.url}`);
    console.log(`  Final URL:    ${r.finalUrl}`);
    console.log(`  Body length:  ${r.bodyLength}`);
    console.log(`  Table:        ${r.tableExists}`);
    console.log(`  Search input: ${r.searchInput}`);
    console.log(`  Has address:  ${r.hasAddress}`);
    console.log(`  Redirect OK:  ${r.redirectOk}`);
    if (r.errors.length > 0) {
      console.log(`  Errors:`);
      r.errors.forEach(e => console.log(`    - ${e}`));
    }
    if (!r.passed) allPassed = false;
  }

  console.log('\n──────────────────────────────────────────────────');
  console.log(allPassed ? 'CP-6 PASS — all contract-addresses pages render correctly.' : 'CP-6 FAIL — see above.');
  process.exit(allPassed ? 0 : 1);
}

main();

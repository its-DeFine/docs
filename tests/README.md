# Testing Suite

## Installation

Testing dependencies are scoped to `tests/` (or `tools/` in some workflows) so root docs setup is not changed.

### Option 1: Install in `tests/` (Recommended)

```bash
cd tests
npm install
```

### Option 2: Install globally

```bash
npm install -g puppeteer @cspell/dict-en-gb cspell js-yaml
```

## Test Scripts

### Main Runner
- `node tests/run-all.js`
Runs unit + integration suite.

### Unit Suites
- `node tests/unit/style-guide.test.js`
- `node tests/unit/mdx.test.js`
- `node tests/unit/spelling.test.js`
- `node tests/unit/quality.test.js`
- `node tests/unit/links-imports.test.js`

### Integration Suites
- `node tests/integration/browser.test.js`
Browser rendering checks (local server flow).

- `node tests/integration/domain-pages-audit.js`
Domain load audit against deployed docs URLs.

Flags:
- `--staged` only checks staged docs pages
- `--base-url <url>` sets target domain (default: `https://docs.livepeer.org`)
- `--version v1|v2|both` filters scope (default: `both`)

Report output (same file each run, overwritten):
- `tests/reports/domain-page-load-report.json`

## Running Tests

### All Tests
```bash
node tests/run-all.js
```

### Domain Audit Examples
```bash
node tests/integration/domain-pages-audit.js --version both
node tests/integration/domain-pages-audit.js --version v1
node tests/integration/domain-pages-audit.js --version v2
node tests/integration/domain-pages-audit.js --staged --version both
node tests/integration/domain-pages-audit.js --base-url https://docs.livepeer.org --version both
```

### npm Scripts (`tests/package.json`)
```bash
npm --prefix tests run test
npm --prefix tests run test:style
npm --prefix tests run test:mdx
npm --prefix tests run test:spell
npm --prefix tests run test:quality
npm --prefix tests run test:links
npm --prefix tests run test:browser
npm --prefix tests run test:domain
npm --prefix tests run test:domain:v1
npm --prefix tests run test:domain:v2
npm --prefix tests run test:domain:both
```

## Pre-commit Interaction
- Pre-commit runs `tests/run-all.js --staged --skip-browser` in fast mode.
- Pre-commit also runs domain audit on staged docs pages:
  `node tests/integration/domain-pages-audit.js --staged --base-url https://docs.livepeer.org --version "$DOMAIN_AUDIT_VERSION"`
- Set `DOMAIN_AUDIT_VERSION=v1|v2|both` to control scope in pre-commit.

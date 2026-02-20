# When and Where Tests Run

## 1. Pre-Commit Hooks (Local - Automatic)

**When:** Every time you run `git commit`

**Location:** `.githooks/pre-commit`

**What Runs:**
- Style guide checks (ThemeData, hardcoded colors, imports)
- Broken links and imports validation
- MDX syntax validation
- JSON/JS/Shell syntax checks
- **Test suite (fast mode)** - Only on staged files, browser tests skipped
  - Style guide tests
  - MDX validation
  - Spelling checks
  - Quality checks
  - Broken links & imports validation

**Speed:** Fast (~10-30 seconds) - only tests staged files

**Blocks Commit:** YES - if violations found

**Installation Required:**
```bash
./.githooks/install.sh
```

---

## 2. CI/CD Workflows (GitHub Actions - Automatic)

**When:** 
- On push to `main`
- On pull requests to `main` or `docs-v2`

**Locations:**
- `.github/workflows/test-suite.yml` (Docs CI - Content Quality Suite)
- `.github/workflows/test-v2-pages.yml` (Docs CI - V2 Browser Sweep)

**What Runs:**
- **Content Quality Suite**
  - Style guide tests (all files)
  - MDX validation (all files)
  - Spelling tests (all files)
  - Quality checks (all files)
  - Broken links & imports validation (all files)
  - Browser tests (all pages)
- **V2 Browser Sweep**
  - V2 route/browser console sweep from `docs.json`
  - PR comment summary and test artifact

**Speed:** Slower (~5-10 minutes) - tests entire codebase

**Blocks PR:** YES - if any required check fails

**Requirements:**
- Starts Mintlify dev server automatically
- Tests pages in headless browser
- Generates test summaries in CI output/PR comments

---

## 3. Manual Execution (On-Demand)

**When:** You run them manually

**Commands:**

```bash
# From root directory
node tests/run-all.js                    # All tests
node tests/unit/style-guide.test.js     # Style guide only
node tests/unit/mdx.test.js             # MDX validation only
node tests/unit/spelling.test.js        # Spelling only
node tests/unit/quality.test.js         # Quality checks only
node tests/unit/links-imports.test.js   # Broken links & imports only
node tests/integration/browser.test.js  # Browser tests only

# Or from v2/ directory (if dependencies installed there)
cd v2
npm test                                # All tests
npm run test:style                      # Style guide
npm run test:mdx                        # MDX
npm run test:spell                      # Spelling
npm run test:browser                    # Browser
npm run test:quality                    # Quality
npm run test:links                      # Broken links & imports
npm run test:all-pages                  # All pages browser test
```

**Browser Tests (All Pages):**
```bash
# Make sure Mintlify dev is running on port 3333
MINT_BASE_URL=http://localhost:3333 node scripts/test-all-pages-browser.js
```

---

## Test Execution Flow

### Pre-Commit Flow
```
git commit
  ↓
Pre-commit hook runs
  ↓
Style guide checks (grep-based, fast)
  ↓
Verification scripts (syntax checks)
  ↓
Test suite (staged files only, --skip-browser)
  ↓
✅ Commit allowed OR ❌ Commit blocked
```

### CI/CD Flow
```
Push/PR created
  ↓
GitHub Actions triggered
  ↓
Install dependencies
  ↓
Run all test suites (all files)
  ↓
Start Mintlify dev server
  ↓
Run browser tests (all 264 pages)
  ↓
Generate summary
  ↓
✅ PR approved OR ❌ PR blocked
```

---

## Current Status

- CI workflow names are intentionally split by purpose:
  - `Docs CI - Content Quality Suite`
  - `Docs CI - V2 Browser Sweep`
- Push-triggered checks run on `main` only to avoid duplicate `push` + `pull_request` checks on feature branches.

# When and Where Tests Run

## 1. Pre-Commit Hooks (Local - Automatic)

**When:** Every time you run `git commit`

**Location:** `.githooks/pre-commit`

**What Runs:**
- Style guide checks (ThemeData, hardcoded colors, imports)
- Broken links and imports validation
- MDX syntax validation
- JSON/JS/Shell syntax checks
- **Test suite (fast mode)** on staged docs pages
  - Style guide tests
  - MDX validation
  - Spelling checks
  - Quality checks
  - Broken links & imports validation
- Script docs enforcement (`tests/unit/script-docs.test.js --staged --write --stage --autofill`)
- Pages index sync (`tools/scripts/generate-pages-index.js --staged --write --stage`)
- Staged strict V2 link audit (`tests/integration/v2-link-audit.js --staged --strict ...`)
- Staged domain audit (`tests/integration/domain-pages-audit.js --staged ...`)

**Speed:** Fast (~10-30 seconds) for most commits, depends on staged scope

**Blocks Commit:** YES (except checks explicitly marked optional in hook output)

**Installation Required:**
```bash
./.githooks/install.sh
```

---

## 2. CI/CD Workflows (GitHub Actions - Automatic)

### A) Content Quality Suite

**Location:** `.github/workflows/test-suite.yml`

**When:**
- On push to `main`
- On pull requests to `main` or `docs-v2`

**What Runs:**
- **On pull requests:** changed-file blocking checks
  - Style guide (`tests/unit/style-guide.test.js`)
  - MDX validation (`tests/unit/mdx.test.js`)
  - Spelling (`tests/unit/spelling.test.js`)
  - Quality (`tests/unit/quality.test.js`)
  - Links/imports (`tests/unit/links-imports.test.js`)
  - Script docs enforcement for changed scripts (`tests/unit/script-docs.test.js --files ...`)
  - Strict link audit for changed docs pages (`tests/integration/v2-link-audit.js --files ... --strict`)
- Browser tests (all pages from `docs.json`) via `tests/integration/browser.test.js`

**Output:**
- GitHub Step Summary tables
- No PR comment from this workflow

**Blocks PR:** YES for changed-file checks and browser failures, except integration PR `docs-v2 -> main` where changed-file static failures are advisory

### B) V2 Browser Sweep

**Location:** `.github/workflows/test-v2-pages.yml`

**When:**
- On push to `main` or `docs-v2`
- On pull requests to `main` or `docs-v2`

**What Runs:**
- Full V2 browser sweep from `docs.json` (`tools/scripts/test-v2-pages.js`)

**Output:**
- PR comment summary
- Artifact: `v2-page-test-report.json`

**Blocks PR:** YES when the sweep fails

### C) Broken Links Check (Advisory)

**Location:** `.github/workflows/broken-links.yml`

**When:**
- On pull requests to `main`

**What Runs:**
- `npx mintlify broken-links`

**Policy:** Advisory only while legacy cleanup is in progress (non-blocking)

---

## 3. Manual Execution (On-Demand)

**When:** You run them manually

```bash
# Full local suite
node tests/run-all.js

# Single suites
node tests/unit/style-guide.test.js
node tests/unit/mdx.test.js
node tests/unit/spelling.test.js
node tests/unit/quality.test.js
node tests/unit/links-imports.test.js
node tests/integration/browser.test.js

# Changed-file PR simulation (local)
node tests/run-pr-checks.js --base-ref main

# Strict link audit on explicit files
node tests/integration/v2-link-audit.js --files v2/community/livepeer-community/trending-topics.mdx --strict
```

---

## Execution Flow (PR)

```
Pull request opened/updated
  ↓
Content Quality Suite starts
  ↓
Compute changed files from merge-base (origin/<base_ref>..HEAD)
  ↓
Run changed-file blocking checks
  ↓
Start Mintlify dev server
  ↓
Run browser tests
  ↓
Step summary updated
  ↓
✅ PR can merge OR ❌ PR blocked
```

---

## Future Graduation to Full-Repo Blocking

Changed-file blocking is intentional while legacy violations are being cleaned up.

Graduate to full-repo blocking only after agreed criteria are met, for example:
- Baseline static violations reduced to near-zero for style/MDX/quality/links checks
- The team agrees the remaining debt is not expected to cause widespread PR failures
- CI timing and developer experience remain acceptable after widening scope

---

## Detailed Matrix

For the full PR CI test breakdown and full script run-context inventory, see:
`tests/PR-CI-TESTS-AND-SCRIPT-RUN-MATRIX.md`

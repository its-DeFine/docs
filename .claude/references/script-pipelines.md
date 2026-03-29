# Exemplary Script Pipelines

> Pointer + analysis. Do not copy files — emulate the patterns.
> A pipeline is: config → script → data → display. Adding a new entry should require config + page only, never script changes.

---

### Contract Addresses Pipeline (Gold Standard)

**Files:**
- **Workflow:** `.github/workflows/update-contract-addresses.yml`
- **Script:** `.github/scripts/fetch-contract-addresses-v2.js`
- **Config:** `operations/scripts/config/contract-addresses-supplement.json`
- **Data output:** `snippets/data/contract-addresses/contractAddressesData.jsx`
- **Display pages:** `v2/about/resources/contract-addresses-canonical.mdx`, `v2/about/livepeer-protocol/blockchain-contracts.mdx`
- **Interactive widget:** `snippets/components/integrators/feeds/ContractVerifier.jsx`

**Why it's good:** Full four-layer pipeline: Config → Pipeline → Data → Display. The workflow runs on cron (weekly Monday 02:00 UTC), repository_dispatch (governor-scripts-update event), and manual workflow_dispatch with input controls (dry_run, skip_verify, scan_fix, use_test_branch). The script fetches from governor-scripts, merges with supplement config, verifies on-chain via Arbiscan/Etherscan, and writes structured JSX. The data file feeds multiple display surfaces and an interactive verification widget. Adding a new network requires only config changes.

**Key patterns:**
- Three trigger types: cron schedule + repository_dispatch + manual workflow_dispatch
- Workflow inputs with descriptive labels and defaults
- Branch selection via repository variable (`vars.TEST_BRANCH`, `vars.DEPLOY_BRANCH`)
- Script CLI flags (--dry-run, --skip-verify, --scan-fix) passed from workflow inputs
- Script produces structured JSX with full typedef — consumers get typed data
- Multiple display surfaces from one data file
- Auto-commit with meaningful message including source commit SHA
- --scan-fix mode: script also scans MDX pages for stale hardcoded addresses and auto-corrects

**Watch out:** The v2 script exists alongside the v1 script. When building new pipelines, follow the v2 pattern. The workflow uses `${{ inputs.use_test_branch == 'true' && vars.TEST_BRANCH || vars.DEPLOY_BRANCH }}` for branch selection — good pattern for test/deploy flexibility.

---

### Changelog Pipeline (Gold Standard — Composable Pattern)

**Files:**
- **Workflow:** `.github/workflows/update-changelogs.yml`
- **Script:** `.github/scripts/generate-changelog.js`
- **Config:** `operations/scripts/config/product-social-config.json` (changelogs{} section)
- **Display pages:** `v2/solutions/daydream/changelog.mdx`, `v2/solutions/frameworks/changelog.mdx`, `v2/solutions/livepeer-studio/changelog.mdx`, `v2/solutions/streamplace/changelog.mdx`, `v2/solutions/embody/changelog.mdx`

**Why it's good:** One script, config-driven, produces 5 identical changelog pages. The `generate-changelog.js` script supports two modes: releases (GitHub/GitLab release tags) and commits (governor-scripts commit history). Adding a new product changelog = one config entry in `product-social-config.json` + one page file. The script never changes. Optional LLM enhancement (--enhance flag) for AI-summarised release notes with raw fallback on LLM failure.

**Key patterns:**
- Config-driven: `product-social-config.json` changelogs{} section defines all targets
- Two modes in one script: releases (products) and commits (contracts) — determined by config
- Dual-source support: GitHub + GitLab with deduplication by tag_name
- Backwards-compatible: falls back to legacy products{} scanning if changelogs{} section is absent
- --enhance flag: optional LLM summarisation with raw fallback
- --contract flag: governor-scripts commit mode with on-chain verification
- --dry-run and --regenerate for operational flexibility
- CHANGELOG_KEY / PRODUCT_KEY / CHANGELOG_CATEGORY env vars for targeted runs
- LazyLoad wrapping in page template for performance with many entries
- AUTOMATION ZONE comment in MDX page marks the boundary between human-authored header and auto-generated entries
- RSS feed metadata in Update component rss prop

**Watch out:** The page template is not yet formalised as a composable — each page is a copy with minor differences. The aspiration is a single template consumed by all products. The data flow is solid; the display layer needs composable treatment.

---

## Anatomy of a Good Pipeline

When designing a new pipeline, follow this structure:

```
1. CONFIG LAYER (what to fetch, where to write)
   └── operations/scripts/config/<pipeline-config>.json
       or env vars + CLI flags

2. PIPELINE LAYER (how to fetch, transform, validate)
   └── .github/scripts/<fetch-or-generate-script>.js
       - 11-tag JSDoc with @pipeline tag
       - CLI flags: --dry-run, --skip-verify, etc.
       - Config-driven: reads from config, not hardcoded

3. DATA LAYER (structured output, never hand-edited)
   └── snippets/data/<domain>/<dataFile>.jsx
       - Auto-generated header with provenance
       - Full JSDoc @typedef
       - "DO NOT EDIT MANUALLY"

4. DISPLAY LAYER (pages + components that consume data)
   └── v2/<tab>/<section>/<page>.mdx
       - Imports data from data layer
       - Components render data — no hardcoded values
       - Adding a new page = config entry + page file only

5. TRIGGER LAYER (when to run)
   └── .github/workflows/<workflow>.yml
       - Cron + dispatch + manual triggers
       - Workflow inputs map to script CLI flags
       - Auto-commit on change
```

**Composability test:** Can you add a new entry by creating only a config entry and a page file? If yes, the pipeline is composable. If you need to modify the script, it's not.
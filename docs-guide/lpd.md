# LPD CLI Guide (Internal)

`lpd` is the repository CLI for setup, local development, test orchestration, hook management, and script execution.

## Command Model

Primary command groups:

- `lpd setup` - bootstrap dependencies/hooks/CLI wiring
- `lpd doctor` - environment readiness checks
- `lpd dev` - launch local docs development flow
- `lpd test` - run test suites by scope
- `lpd ci` - local CI-like checks
- `lpd hooks` - install/status/verify hooks and hook script execution
- `lpd scripts` - discover and run managed scripts by group
- shorthand groups: `lpd tools ...`, `lpd tasks ...`, `lpd tests ...`, `lpd v2 ...`

## Core Runbooks

### 1) First-time setup

```bash
bash lpd setup --yes
```

Expected outcomes:

- installs dependencies (based on flags)
- installs/updates hooks
- optionally wires `lpd` on PATH for current user

### 2) Local docs development

```bash
lpd dev
# fallback if PATH not yet refreshed
bash lpd dev
```

Useful variants:

```bash
lpd dev --test --test-mode staged
lpd dev -- --port 3333
```

### 3) Test entrypoints

```bash
lpd test --staged
lpd test --full
lpd test --browser
lpd ci --skip-browser
```

### 4) Hook management

```bash
lpd hooks install
lpd hooks status
lpd hooks verify
lpd hooks info
```

### 5) Script discovery and execution

```bash
lpd scripts list --group tools
lpd scripts run tools generate-docs-guide-indexes -- --check
lpd tools dev test-add-callouts -- --help
```

### 6) I18n translation pipeline (OpenRouter free-only default)

The translation tooling is available through the same managed script interface:

```bash
./lpd tools i18n translate-docs -- --help
./lpd tools i18n generate-localized-docs-json -- --help
./lpd tools i18n validate-generated -- --help
```

Notes:

- `v2` localized pages are generated under `v2/<lang>/...` (for example `v2/es/...`, `v2/fr/...`, `v2/cn/...`)
- Chinese Simplified uses Mintlify code `cn`; the CLI accepts `zh-CN` and normalizes it to `cn`
- `v1` is intentionally left English-only in the current rollout

Typical local smoke run (real OpenRouter translation, single page):

```bash
./lpd tools i18n translate-docs -- \
  --provider openrouter \
  --languages es \
  --scope-mode prefixes \
  --prefixes v2/about/livepeer-network \
  --max-pages 1 \
  --route-map /tmp/i18n-route-map.json \
  --report-json /tmp/i18n-translate-report.json
```

## Script Discovery Constraints

- script discovery supports root `.lpdignore` patterns
- ignored scripts are excluded from list/run commands

Reference file:

- `tools/cli/lpdignore.example`

## Ownership + Truth

- CLI behavior truth: `lpd` script implementation
- Operational navigation truth: this document + `docs-guide/README.md`

For deep hook/test behavior, use:

- [`quality-gates.md`](./quality-gates.md)
- `contribute/CONTRIBUTING/GIT-HOOKS.md`

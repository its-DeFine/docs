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

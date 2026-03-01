---

title: 'LPD CLI API Reference'
sidebarTitle: 'LPD CLI API'
description: 'Internal API-style reference for the repository CLI: command contract, flags, response model, and examples'
keywords:
[
'livepeer',
'lpd cli guide',
'internal',
'repository',
'cli',
'setup',
'local development',
'test orchestration',
'hook management',
'script execution',
]
---

# LPD CLI API Reference

`lpd` is the repository CLI for setup, local development, test orchestration, hook management, and script execution.

This page documents the current implementation in `./lpd` (CLI version `0.2.0`).

<Info>
  Source of truth for runtime behavior is the repository-root [`lpd`](../lpd) script.
</Info>

## Interface Contract

### Request Shape

```bash
lpd [--json] <command> [subcommand] [flags] [-- passthrough-args]
```

### Execution Contract

| Contract | Value |
| --- | --- |
| Repo root resolution | Auto-detects repo root from subdirectories/worktrees when `docs.json` and `tools/` exist |
| Hard precondition | Fails when repository layout is not recognized |
| Global JSON mode | Prefix form only: `lpd --json <command> ...` |
| Script discovery | Uses root `.lpdignore` (gitignore-style) when present |
| Exit model | `0` success, non-zero failure |

### JSON Response Envelope

When JSON mode is active and the command uses `finish()`, output is a status envelope.

<ResponseField name="ok" type="boolean">
  `true` on success, `false` on failure.
</ResponseField>

<ResponseField name="command" type="string">
  Normalized command label (for example: `test`, `scripts list`, `hooks status`).
</ResponseField>

<ResponseField name="message" type="string">
  Human-readable summary message.
</ResponseField>

<ResponseField name="exit_code" type="number">
  Process exit code emitted by the command.
</ResponseField>

<ResponseField name="repo_root" type="string">
  Absolute path to the detected repo root.
</ResponseField>

JSON mode is status-oriented; it does not return structured payloads for list/detail output.

## Command Index

| Command | Purpose | JSON-capable |
| --- | --- | --- |
| `lpd help` | Root help and examples | No structured JSON payload |
| `lpd info` | Command map and workflows | No (`lpd info --json` is invalid) |
| `lpd version` | CLI version | Yes (via global `--json`) |
| `lpd setup` | Bootstrap dependencies/hooks/CLI wiring | Yes |
| `lpd doctor` | Environment and repo-readiness checks | Yes |
| `lpd dev` | Local docs dev launcher | Yes |
| `lpd mint dev` | Alias to `lpd dev` | Yes |
| `lpd test` | Test orchestration by scope and audits | Yes |
| `lpd ci` | Local CI-like validation flow | Yes |
| `lpd ai-sitemap` | Generate/validate `sitemap-ai.xml` | Yes |
| `lpd hooks` | Hook install/status/verify/info and hook scripts | Yes (for finish-based subcommands) |
| `lpd scripts` | Discover/run managed scripts | Yes (status envelope only) |
| `lpd <tools\|tasks\|tests\|v2> ...` | Shorthand for `lpd scripts run` | Yes |

## Root Commands

### `lpd help`

```bash
lpd help
```

Returns root command summary and examples.

### `lpd info`

```bash
lpd info
```

Accepted option:

| Option | Description |
| --- | --- |
| `--help` / `-h` | Print command-specific help for `info` |

### `lpd version`

```bash
lpd version
```

Prints the CLI version string.

## Core Command Reference

### `lpd setup`

```bash
lpd setup [--yes] [--no-tools] [--no-tests] [--no-hooks] [--with-mintlify] [--no-cli] [--json]
```

Flags:

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--yes` | boolean | `false` | Non-interactive mode; accepts defaults |
| `--no-tools` | boolean | `false` | Skip `cd tools && npm install` |
| `--no-tests` | boolean | `false` | Skip `cd tests && npm install` |
| `--no-hooks` | boolean | `false` | Skip `.githooks/install.sh` |
| `--with-mintlify` | boolean | `false` | Run `npm i -g mintlify` |
| `--no-cli` | boolean | `false` | Skip symlink/PATH install for `lpd` |
| `--json` | boolean | `false` | Enable JSON status envelope |

Examples:

```bash
bash lpd setup --yes
lpd setup --no-tests --no-cli
```

### `lpd doctor`

```bash
lpd doctor [--strict] [--json]
```

Flags:

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--strict` | boolean | `false` | Fail if any warning/check issue is found |
| `--json` | boolean | `false` | Enable JSON status envelope |

Checks:

- git repository context
- Node availability
- Mintlify CLI availability
- `tools/node_modules`
- `tests/node_modules`
- hook installation/sync state

### `lpd dev`

```bash
lpd dev [--test] [--test-mode fast|staged|full] [--script <path>] [--dry-run] [-- ...mint args]
```

Flags:

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--test` | boolean | `false` | Run advisory tests before starting dev launcher |
| `--test-mode` | enum | `fast` | Advisory mode: `fast`, `staged`, or `full` |
| `--script <path>` | string | `tools/scripts/mint-dev.sh` | Override launcher script path |
| `--script=<path>` | string | same | Inline assignment form |
| `--dry-run` | boolean | `false` | Print resolved launcher command and exit |
| `--json` | boolean | `false` | Enable JSON status envelope |
| `--` | separator | - | Pass remaining args to launcher script |

Examples:

```bash
lpd dev
lpd dev --test --test-mode staged
lpd dev --dry-run -- --port 3333
lpd dev --script tools/scripts/mint-dev.sh -- --port 3001
```

Behavior notes:

- Relative `--script` paths are resolved from repo root.
- Advisory test failures warn and continue to dev launcher.

### `lpd mint dev` (alias)

```bash
lpd mint dev [-- ...mint args]
```

Compatibility alias that forwards to `lpd dev`.

### `lpd test`

```bash
lpd test [--staged|--full] [--browser] [--domain v1|v2|both] [--wcag] [--wcag-no-fix] [--link-audit-external] [--base-url URL] [--json]
```

Flags:

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--staged` | boolean | `false` | Set mode to `staged` |
| `--full` | boolean | `false` | Set mode to `full` |
| mode (implicit) | enum | `fast` | Default when neither `--staged` nor `--full` is set |
| `--browser` | boolean | `false` | Run `tests/integration/browser.test.js` |
| `--domain <v1\|v2\|both>` | enum | none | Run domain pages audit with selected scope |
| `--wcag` | boolean | `false` | Run v2 WCAG audit after base test flow |
| `--wcag-no-fix` | boolean | `false` | WCAG suggestion-only mode (`--no-fix`) |
| `--link-audit-external` | boolean | `false` | Run external-link audit |
| `--base-url <url>` | string | none | Forward custom base URL to supported audits |
| `--json` | boolean | `false` | Enable JSON status envelope |

Examples:

```bash
lpd test --staged
lpd test --staged --wcag
lpd test --full --wcag --wcag-no-fix
lpd test --domain both --base-url http://localhost:3000
lpd test --full --link-audit-external
```

Audit behavior:

- WCAG:
  - `full` mode => `node tests/integration/v2-wcag-audit.js --full`
  - `fast`/`staged` => `--staged --max-pages 10`
- External link audit:
  - `full` mode failure is blocking (non-zero)
  - `fast`/`staged` failure is advisory (warning only)

### `lpd ci`

```bash
lpd ci [--skip-browser] [--base-url URL] [--json]
```

Flags:

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--skip-browser` | boolean | `false` | Skip browser integration test step |
| `--base-url <url>` | string | none | Forward URL to domain pages audit |
| `--json` | boolean | `false` | Enable JSON status envelope |

Execution flow:

1. `node tests/run-all.js --skip-browser`
2. `node tests/integration/domain-pages-audit.js --version both [--base-url ...]`
3. `node tests/integration/browser.test.js` (unless skipped)

### `lpd ai-sitemap`

```bash
lpd ai-sitemap [--write|--check] [--json]
```

Flags:

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--check` | boolean | `true` | Verify sitemap output/state |
| `--write` | boolean | `false` | Write `sitemap-ai.xml` |
| `--json` | boolean | `false` | Enable JSON status envelope |

Implementation command:

```bash
node tools/scripts/generate-ai-sitemap.js --check|--write
```

## Hooks API

### `lpd hooks`

```bash
lpd hooks <install|status|verify|info|<hook-script tokens...>>
```

Subcommands:

| Subcommand | Description |
| --- | --- |
| `install` | Install/update `.git/hooks/pre-commit` from `.githooks/pre-commit` |
| `status` | Validate installed hook exists, is executable, and matches source |
| `verify` | Run `.githooks/verify.sh` |
| `info` | Print hook scripts, bypass flags, and override policy |
| `<hook-script tokens...>` | Fallback to managed script runner under `.githooks/` |

Examples:

```bash
lpd hooks install
lpd hooks status
lpd hooks verify
lpd hooks info
lpd hooks verify-browser --dry-run
```

Human-only override trailers:

- `git commit -m "msg" --trailer "allowlist-edit=true"`
- `git commit -m "msg" --trailer "allow-deletions=true"`

## Scripts API

### `lpd scripts list`

```bash
lpd scripts list [--group tools|tasks|tests|v2|hooks] [--show-ignored] [--json]
```

Flags:

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--group <name>` | enum | all groups | Restrict output to one group |
| `--show-ignored` | boolean | `false` | Include `.lpdignore`-blocked commands |
| `--json` | boolean | `false` | JSON status envelope (not structured list payload) |

### `lpd scripts run`

```bash
lpd scripts run <group> <script-path tokens...> [--dry-run] [--yes] [-- script args]
```

Flags:

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--dry-run` | boolean | `false` | Print resolved executable command only |
| `--yes` | boolean | `false` | Auto-confirm high-risk groups |
| `--json` | boolean | `false` | JSON status envelope |
| `--` | separator | - | Forward args to target script |

Examples:

```bash
lpd scripts run tools generate-docs-guide-indexes -- --check
lpd scripts run tasks run-audit --dry-run
lpd scripts run tasks run-audit --yes
```

### Shorthand Group Commands

```bash
lpd tools <script-path tokens...> [-- script args]
lpd tasks <script-path tokens...> [-- script args]
lpd tests <script-path tokens...> [-- script args]
lpd v2 <script-path tokens...> [-- script args]
```

Equivalent to `lpd scripts run <group> ...`.

### Script Group Map and Risk Levels

| Group | Root path | Risk |
| --- | --- | --- |
| `tools` | `tools/scripts` | medium |
| `tasks` | `tasks/scripts` | high |
| `tests` | `tests` | low |
| `v2` | `tools/scripts/dev` | high |
| `hooks` | `.githooks` | medium |

<Warning>
  High-risk script groups (`tasks`, `v2`) require confirmation unless `--yes` is passed.
</Warning>

Discovery/execution filters:

- Built-in exclusions include `node_modules`, temp/log files, `tests/reports/*`, and README variants.
- Runnable resolution supports executable bit, shebang, or extension fallback (`.sh`, `.bash`, `.py`, `.js`, `.mjs`, `.cjs`).
- `.lpdignore` is enforced for both listing and execution.

## Common Request Examples

```bash
bash lpd setup --yes
lpd dev
lpd dev --test --test-mode staged
lpd dev --dry-run -- --port 3333
lpd test --staged
lpd test --staged --wcag
lpd test --domain both
lpd test --full
lpd test --full --link-audit-external
lpd test --browser
lpd ci --skip-browser
lpd ci --base-url http://localhost:3000
lpd ai-sitemap --check
lpd ai-sitemap --write
lpd hooks install
lpd hooks status
lpd hooks verify
lpd scripts list --group tools
lpd scripts run tools generate-docs-guide-indexes -- --check
lpd tools dev test-add-callouts -- --help
lpd tools wcag-repair-common -- --staged --stage
```

## Ownership + Truth

- CLI behavior truth: `lpd` script implementation
- Operational navigation truth: this document + `docs-guide/README.md`

For deep hook/test behavior, use:

- [`quality-gates.md`](./quality-gates.md)
- `contribute/CONTRIBUTING/GIT-HOOKS.md`

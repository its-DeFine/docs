# Git Hooks - Quick Reference

This directory contains git hooks for enforcing repository standards.

**📖 Full Documentation:** See [docs/CONTRIBUTING/GIT-HOOKS.md](../../docs/CONTRIBUTING/GIT-HOOKS.md)

## Quick Start

```bash
# Install hooks
./.githooks/install.sh
```

Or start local docs dev (auto-installs/updates hooks first):

```bash
lpd dev
# or without PATH setup
bash lpd dev
```

## Pre-commit Hook

The pre-commit hook is staged-scoped and enforces style guide compliance plus fast checks:

### Style Guide Checks

- ❌ **ThemeData usage** - Blocks deprecated ThemeData imports
- ❌ **Hardcoded colors** - Warns about hardcoded hex colors that should use CSS variables
- ❌ **`docs.json` `/redirect` diffs** - Blocks staged `docs.json` line changes that include `/redirect`
- ⚠️ **Relative imports** - Warns about relative imports (should use absolute paths)
- ⚠️ **@mintlify/components imports** - Warns about unnecessary imports (components are global)
- ⚠️ **React hook imports** - Warns about unnecessary React imports (hooks are global)

### Verification Scripts

- Legacy `.githooks/verify.sh` is not run in pre-commit fast mode.
- Core staged validation is handled by `node tests/run-all.js --staged --skip-browser`.

### Test Suite (Staged)

The pre-commit hook also runs:

- `node tests/unit/script-docs.test.js --staged --write --stage --autofill`
- `node tools/scripts/generate-pages-index.js --staged --write --stage`
- `node tests/integration/v2-wcag-audit.js --staged --fix --stage --max-pages 10 --fail-impact serious --report /tmp/livepeer-wcag-audit-precommit.md --report-json /tmp/livepeer-wcag-audit-precommit.json`
- `node tests/run-all.js --staged --skip-browser`
- `node tests/integration/v2-link-audit.js --staged --strict --report /tmp/livepeer-link-audit-precommit.md` (only when staged docs pages exist)

WCAG audit report paths (hook run, overwritten each run):
- `/tmp/livepeer-wcag-audit-precommit.md`
- `/tmp/livepeer-wcag-audit-precommit.json`

WCAG audit behavior:
- Conservative autofix is enabled by default for common raw-tag issues (`<iframe title>`, `<img alt>`, icon-only/empty `<a aria-label>`).
- Commits are blocked on remaining `serious`/`critical` findings and runtime failures.
- Automated WCAG checks are partial coverage and do not replace manual accessibility review.

Script documentation enforcement:
- Newly added scripts must include required header tags.
- Missing headers are auto-inserted on pre-commit.
- If valid, group `script-index.md` files and aggregate index are auto-updated and staged.
- If invalid, commit is blocked.

Pages index generation:
- Keeps `v2/pages/<top-level>/index.mdx` synchronized with the full folder + subfolder markdown structure.
- Uses section-style rendering with root-level files listed first, then folder headings.
- Adds `⚠️` to links for files that are not present in `docs.json` navigation.
- Rebuilds root aggregate at `v2/pages/index.mdx` from top-level section index files.
- Migrates/removes legacy `index.md` files and removes nested index files under top-level sections.

Current script index targets:
- `.githooks/*` -> `.githooks/script-index.md`
- `.github/scripts/*` -> `.github/script-index.md`
- `tests/*` -> `tests/script-index.md`
- `tools/scripts/*` -> `tools/script-index.md`
- `tasks/scripts/*` -> `tasks/scripts/script-index.md`
- Aggregate -> `docs-guide/scripts-index.md`

## Pre-push Hook (`codex/*` branches only)

The pre-push hook enforces Codex branch safety on `codex/*`:

- requires `.codex/task-contract.yaml`
- validates branch/issue binding and changed-file scope
- validates local codex lock ownership and overlap
- enforces AI stash policy
- blocks non-fast-forward pushes by default

Human override for explicit exception:

```bash
ALLOW_CODEX_FORCE_PUSH=1 git push --force-with-lease origin codex/<issue-id>-<slug>
```

## Installation

To install hooks manually:

```bash
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
cp .githooks/pre-push .git/hooks/pre-push
chmod +x .git/hooks/pre-push
```

Or use the install script:

```bash
./.githooks/install.sh
```

## Manual Installation

If the install script doesn't work:

```bash
# Copy the hook
cp .githooks/pre-commit .git/hooks/pre-commit

# Make it executable
chmod +x .git/hooks/pre-commit

# Verify it's installed
ls -la .git/hooks/pre-commit
```

## Testing

Test the hook by staging a file with a violation:

```bash
# Create a test file with ThemeData (should fail)
echo 'import { ThemeData } from "/snippets/styles/themeStyles.jsx";' > test-violation.jsx
git add test-violation.jsx
git commit -m "test"  # Should be blocked

# Clean up
rm test-violation.jsx
git reset HEAD test-violation.jsx
```

## Bypassing (Human Override Only)

`--no-verify` is not a default path. If a human explicitly authorizes bypass in chat, follow:

- `ai-tools/ai-rules/HUMAN-OVERRIDE-POLICY.md`
- `node tools/scripts/codex-commit.js --message \"...\" --no-verify --human-override true --override-note \"...\"`

### Human-Only `.allowlist` Override

The `.allowlist` file is protected by the pre-commit hook.

If a human needs to intentionally edit `.allowlist`, use:

```bash
git commit -m "Update .allowlist" --trailer "allowlist-edit=true"
```

This allows `.allowlist` edits while still running all other checks.

### Human-Only Deletions Override

File deletions are blocked by default outside `tasks/`.

If a human intentionally needs to delete files, use:

```bash
git commit -m "Remove obsolete files" --trailer "allow-deletions=true"
```

This allows deletions while still running all other checks.

## Style Guide Reference

See: `v2/pages/07_resources/documentation-guide/style-guide.mdx`

{/* SCRIPT-INDEX:START */}
## Script Index

_No documented scripts found in this scope yet._
{/* SCRIPT-INDEX:END */}

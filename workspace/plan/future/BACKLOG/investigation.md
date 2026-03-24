# Backlog Investigation Log

Agent review of registry items — feasibility, implementation notes, blockers, dependencies.

---

## BL-001

**Title:** VSCode linter warning on `vars.SHOWCASE_DISCORD_REVIEWER_USER_ID` in `project-showcase-sync.yml`

**File:** `.github/workflows/project-showcase-sync.yml`, line 57

**Warning text:** "Context access might be invalid: SHOWCASE_DISCORD_REVIEWER_USER_ID"

### Cause

False positive. The GitHub Actions linter extension for VSCode (typically
`mhutchie.github-actions` or the official `github.vscode-github-actions`)
validates `vars.*` references against a known schema of built-in context
properties. Repository-level and organization-level variables (configured in
GitHub Settings > Secrets and variables > Actions > Variables) are not available
to the local linter because they exist only on the remote GitHub environment.
The linter has no way to verify whether `SHOWCASE_DISCORD_REVIEWER_USER_ID`
exists as a configured variable, so it flags every `vars.*` reference it cannot
resolve.

The warning is not unique to this one variable. All 16 `vars.SHOWCASE_*`
references in the same env block (lines 41-60) are subject to the same
limitation. Whether the linter flags one or all depends on the extension version
and its heuristics. There is no typo and no syntactical difference between this
reference and the others in the same block.

Other workflow files in the repo use `vars.*` in the same way (e.g.,
`vars.TEST_BRANCH`, `vars.DEPLOY_BRANCH` in 15+ workflow files,
`vars.CODEX_COPILOT_REVIEWER_LOGINS` in `auto-assign-docs-reviewers.yml`).
The pattern is consistent and correct.

### Severity

**Cosmetic / Noise.** No runtime impact. The workflow functions correctly as
long as the variable is configured in the GitHub repository settings.

### Recommended action

**No code change required.** Options to suppress the noise:

1. **Ignore it.** The warning is informational and does not block CI or local
   development. This is the lowest-effort option and appropriate given that
   the pattern is used consistently across 20+ workflow files.

2. **Add a VSCode workspace setting** to suppress the specific diagnostic if
   the linter extension supports it. The `github.vscode-github-actions`
   extension does not currently offer per-variable suppression, so this may
   not be available.

3. **Add a comment annotation** above line 57 if the linter supports inline
   suppression (currently it does not for most GitHub Actions linter extensions).

Recommended: option 1 (ignore). The warning is a known limitation of local
GitHub Actions linting and affects any repo that uses repository-level variables.


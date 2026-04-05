# Mintlify Source Inventory

Scope:

- Included if the file materially documents, configures, runs, enforces, tests, or records Mintlify or docs-platform behavior in this repo.
- Core signals used for inclusion: `Mintlify`, `docs.json`, `.mintignore`, `style.css`, `lpd dev`, scoped navigation, MDX constraints, local preview, render/runtime validation, translation/localisation of routed docs, and docs-platform research.
- Excluded from this first-pass inventory: ordinary product docs that only mention these systems incidentally, plus pure component/reference catalogs that do not add platform-behavior guidance.
- Cleanup enforcement explicitly ignores `v2/_workspace/archive/language-pages/**`; that tree is deprecated and already on a separate removal path.

## Active Canonical / Runtime

- `README.md` — `README.md`
- `docs.json` — `docs.json`
- `style.css` — `style.css`
- `.mintignore` — `.mintignore`
- `.mintlify/Assistant.md` — `.mintlify/Assistant.md`
- `AGENTS.md` — `AGENTS.md`
- `.github/AGENTS.md` — `.github/AGENTS.md`
- `.githooks/pre-commit` — `.githooks/pre-commit`
- `.githooks/README.md` — `.githooks/README.md`
- `.githooks/server-manager.js` — `.githooks/server-manager.js`
- `.githooks/verify.sh` — `.githooks/verify.sh`
- `.githooks/verify-browser.js` — `.githooks/verify-browser.js`
- `.githooks/verify-browser-README.md` — `.githooks/verify-browser-README.md`
- `.github/workflows/README-test-v2-pages.md` — `.github/workflows/README-test-v2-pages.md`
- `.github/workflows/README-translate-docs.md` — `.github/workflows/README-translate-docs.md`
- `.github/workflows/test-suite.yml` — `.github/workflows/test-suite.yml`
- `.github/workflows/test-v2-pages.yml` — `.github/workflows/test-v2-pages.yml`
- `.github/workflows/broken-links.yml` — `.github/workflows/broken-links.yml`
- `.github/workflows/translate-docs.yml` — `.github/workflows/translate-docs.yml`

## Active Internal Docs

- `mintlify-repo-best-practices.md` — `docs-guide/canonical/collation-data/Mintlify/mintlify-repo-best-practices.md`
- `source-of-truth-guide.mdx` — `docs-guide/source-of-truth-guide.mdx`
- `contributing.mdx` — `docs-guide/contributing/contributing.mdx`
- `local-preview.mdx` — `docs-guide/contributing/local-preview.mdx`
- `mintlify.mdx` — `docs-guide/contributing/mintlify.mdx`
- `lpd-cli.mdx` — `docs-guide/tooling/lpd-cli.mdx`
- `lpd-mdx-preview.mdx` — `docs-guide/tooling/lpd-mdx-preview.mdx`
- `dev-tools.mdx` — `docs-guide/tooling/dev-tools.mdx`
- `content-system.mdx` — `docs-guide/frameworks/content-system.mdx`
- `component-governance.mdx` — `docs-guide/frameworks/component-governance.mdx`
- `feature-map.mdx` — `docs-guide/features/feature-map.mdx`
- `architecture-map.mdx` — `docs-guide/features/architecture-map.mdx`
- `repo-config-map.mdx` — `docs-guide/repo-ops/config/repo-config-map.mdx`
- `enforcement-map.mdx` — `docs-guide/repo-ops/maps/enforcement-map.mdx`
- `governance-index.mdx` — `docs-guide/policies/governance-index.mdx`
- `quality-gates.mdx` — `docs-guide/policies/quality-gates.mdx`
- `source-of-truth-policy.mdx` — `docs-guide/policies/source-of-truth-policy.mdx`
- `v2-folder-governance.mdx` — `docs-guide/policies/v2-folder-governance.mdx`
- `snippets-assets-policy.mdx` — `docs-guide/policies/snippets-assets-policy.mdx`
- `root-allowlist-governance.mdx` — `docs-guide/policies/root-allowlist-governance.mdx`
- `agent-governance-framework.mdx` — `docs-guide/policies/agent-governance-framework.mdx`
- `generated-artifact-and-hook-governance.mdx` — `docs-guide/policies/generated-artifact-and-hook-governance.mdx`
- `docs-guide-structure-policy.mdx` — `docs-guide/policies/docs-guide-structure-policy.mdx`
- `workspace-lifecycle-policy.mdx` — `docs-guide/policies/workspace-lifecycle-policy.mdx`
- `script-governance.mdx` — `docs-guide/policies/script-governance.mdx`

## Active Tooling / Scripts / Config

- `lpd` — `tools/lpd`
- `mint-dev.sh` — `tools/dev/mint-dev.sh`
- `generate-mint-dev-scope.js` — `tools/dev/generate-mint-dev-scope.js`
- `debug-mint-dev.js` — `tools/dev/debug-mint-dev.js`
- `mint-custom-loader.sh` — `tools/dev/mint-custom-loader.sh`
- `ensure-mint-watcher-patch.sh` — `tools/dev/ensure-mint-watcher-patch.sh`
- `resolve-scoped-docs-config.js` — `tools/dev/lib/resolve-scoped-docs-config.js`
- `navigation-exclusions.json` — `tools/config/runtime/navigation-exclusions.json`
- `docs-solutions.json` — `tools/config/scoped-navigation/docs-solutions.json`
- `docs.json.jsx` — `tools/config/scoped-navigation/docs.json.jsx`
- `docs-orch-work.json` — `tools/config/scoped-navigation/docs-orch-work.json`
- `docs-gate-orch.json` — `tools/config/scoped-navigation/docs-gate-orch.json`
- `docs-gate-work.json` — `tools/config/scoped-navigation/docs-gate-work.json`
- `config.json` — `operations/scripts/automations/content/language-translation/config.json`
- `README.md` — `tools/editor-extensions/README.md`
- `recommended_extensions.md` — `tools/editor-extensions/recommended_extensions.md`
- `README.md` — `tools/editor-extensions/authoring-tools/README.md`
- `README.md` — `tools/editor-extensions/lpd-mdx-preview/README.md`
- `package.json` — `tools/editor-extensions/lpd-mdx-preview/package.json`
- `extension.js` — `tools/editor-extensions/lpd-mdx-preview/extension.js`
- `mdx-parser.js` — `tools/editor-extensions/lpd-mdx-preview/lib/mdx-parser.js`
- `mintlify-components.js` — `tools/editor-extensions/lpd-mdx-preview/lib/mintlify-components.js`
- `component-map.js` — `tools/editor-extensions/lpd-mdx-preview/lib/component-map.js`
- `webview-template.js` — `tools/editor-extensions/lpd-mdx-preview/lib/webview-template.js`
- `mintlify.code-snippets` — `.vscode/mintlify.code-snippets`
- `templates.code-snippets` — `.vscode/templates.code-snippets`

## Active Tests / Validators / Repair Flows

- `README.md` — `operations/tests/README.md`
- `mintignore.js` — `operations/tests/utils/mintignore.js`
- `lpd-scoped-mint-dev.test.js` — `operations/tests/unit/lpd-scoped-mint-dev.test.js`
- `mint-dev-locks.test.js` — `operations/tests/unit/mint-dev-locks.test.js`
- `docs-navigation.test.js` — `operations/tests/unit/docs-navigation.test.js`
- `mdx.test.js` — `operations/tests/unit/mdx.test.js`
- `mdx-component-scope.test.js` — `operations/tests/unit/mdx-component-scope.test.js`
- `mdx-guards.test.js` — `operations/tests/unit/mdx-guards.test.js`
- `mdx-safe-markdown.test.js` — `operations/tests/unit/mdx-safe-markdown.test.js`
- `style-guide.test.js` — `operations/tests/unit/style-guide.test.js`
- `docs-path-sync.test.js` — `operations/tests/unit/docs-path-sync.test.js`
- `cleanup-local-dev-sessions.test.js` — `operations/tests/unit/cleanup-local-dev-sessions.test.js`
- `mdx-component-runtime-smoke.js` — `operations/tests/integration/mdx-component-runtime-smoke.js`
- `README.md` — `operations/scripts/README.md`
- `README-test-v2-pages.md` — `operations/scripts/README-test-v2-pages.md`
- `docs-path-sync.js` — `operations/scripts/config/docs-path-sync.js`
- `mdx-constraints-injector.js` — `operations/scripts/dispatch/governance/mdx-constraints-injector.js`
- `mdx-validate-hook.js` — `operations/scripts/dispatch/governance/mdx-validate-hook.js`
- `test-v2-pages.js` — `operations/scripts/validators/content/structure/test-v2-pages.js`
- `check-docs-path-sync.js` — `operations/scripts/validators/content/structure/check-docs-path-sync.js`
- `test-mintlify-version-language-toggle.js` — `operations/scripts/validators/content/language-translation/test-mintlify-version-language-toggle.js`
- `validate-lpd-paths.js` — `operations/scripts/validators/governance/repo/validate-lpd-paths.js`
- `generate-docs-index.js` — `operations/scripts/generators/content/catalogs/generate-docs-index.js`
- `generate-pages-index.js` — `operations/scripts/generators/content/catalogs/generate-pages-index.js`
- `cleanup-local-dev-sessions.js` — `operations/scripts/automations/governance/cleanup-local-dev-sessions.js`
- `generate-localized-docs-json.js` — `operations/scripts/automations/content/language-translation/generate-localized-docs-json.js`
- `docs-json-localizer.js` — `operations/scripts/automations/content/language-translation/lib/docs-json-localizer.js`
- `sync-docs-paths.js` — `operations/scripts/remediators/content/repair/sync-docs-paths.js`
- `mintlify-canonical-consumers.json` — `docs-guide/canonical/collation-data/Mintlify/mintlify-canonical-consumers.json`
- `mintlify-canonical-sync.js` — `operations/scripts/config/mintlify-canonical-sync.js`
- `check-mintlify-canonical-sync.js` — `operations/scripts/validators/governance/compliance/check-mintlify-canonical-sync.js`
- `sync-mintlify-canonical-consumers.js` — `operations/scripts/remediators/content/repair/sync-mintlify-canonical-consumers.js`
- `check-mintlify-canonical-sync.test.js` — `operations/tests/unit/check-mintlify-canonical-sync.test.js`
- `run-all.js` — `operations/tests/run-all.js`

## Active Public Docs-Guide Surfaces

- `documentation-guide.mdx` — `v2/resources/documentation-guide/documentation-guide.mdx`
- `documentation-overview.mdx` — `v2/resources/documentation-guide/documentation-overview.mdx`
- `contribute-to-the-docs.mdx` — `v2/resources/documentation-guide/contributing/contribute-to-the-docs.mdx`
- `docs-features-and-ai-integrations.mdx` — `v2/resources/documentation-guide/features/docs-features-and-ai-integrations.mdx`
- `automations-workflows.mdx` — `v2/resources/documentation-guide/ai-automations/automations-workflows.mdx`
- `authoring-guide.mdx` — `v2/resources/documentation-guide/copy-style/authoring-guide.mdx`
- `authoring-standard.mdx` — `v2/resources/documentation-guide/copy-style/authoring-standard.mdx`
- `style-guide.mdx` — `v2/resources/documentation-guide/copy-style/style-guide.mdx`
- `snippets-inventory.mdx` — `v2/resources/documentation-guide/tooling/snippets-inventory.mdx`

## Snippets / Authoring Behavior Docs

- `README.md` — `snippets/components/README.md`
- `README.md` — `snippets/snippetsWiki/README.md`
- `index.mdx` — `snippets/snippetsWiki/index.mdx`
- `mintlify-behaviour.mdx` — `docs-guide/canonical/collation-data/Mintlify/dep-files/snippets/snippetsWiki/mintlify-behaviour.mdx`
- `theme-colors.mdx` — `snippets/snippetsWiki/theme-colors.mdx`

## AI Skills / Prompted Constraints

- `SKILL.md` — `ai-tools/ai-skills/build/SKILL.md`
- `SKILL.md` — `ai-tools/ai-skills/page-authoring/SKILL.md`
- `02-mint-dev-and-hook-install.template.md` — `ai-tools/ai-skills/templates/02-mint-dev-and-hook-install.template.md`
- `03-mintlify-authoring-style-compliance.template.md` — `ai-tools/ai-skills/templates/03-mintlify-authoring-style-compliance.template.md`
- `05-mdx-parent-child-scope-patterns.template.md` — `ai-tools/ai-skills/templates/05-mdx-parent-child-scope-patterns.template.md`
- `07-docs-json-navigation-maintenance.template.md` — `ai-tools/ai-skills/templates/07-docs-json-navigation-maintenance.template.md`
- `SKILL.md` — `ai-tools/agent-packs/skills/mint-dev-and-hook-install/SKILL.md`
- `SKILL.md` — `ai-tools/agent-packs/skills/mintlify-authoring-style-compliance/SKILL.md`
- `SKILL.md` — `ai-tools/agent-packs/skills/mdx-parent-child-scope-patterns/SKILL.md`

## Research / Audit / Planning Artifacts

- `mintlify-constraints-reference.md` — `docs-guide/canonical/collation-data/Mintlify/dep-files/workspace/thread-outputs/research/mintlify-constraints-reference.md`
- `styles-gap-analysis.md` — `docs-guide/canonical/collation-data/Mintlify/dep-files/workspace/thread-outputs/research/styles-gap-analysis.md`
- `component-infrastructure-state.md` — `docs-guide/canonical/collation-data/Mintlify/dep-files/workspace/reports/component-infrastructure-state.md`
- `css-audit-report.md` — `docs-guide/canonical/collation-data/Mintlify/dep-files/workspace/reports/performance/css-audit-report.md`
- `style-css-token-audit.md` — `docs-guide/canonical/collation-data/Mintlify/dep-files/workspace/reports/style-css-token-audit.md`
- `lpd-command-reference.md` — `workspace/plan/active/TOOLING/lpd-command-reference.md`
- `lpd-audit.md` — `workspace/plan/active/TOOLING/lpd-audit.md`
- `design-canonical.mdx` — `workspace/plan/active/DOCUMENTATION/design-canonical.mdx`
- `pages.mdx` — `workspace/plan/active/DOCUMENTATION/system-canonical-design/pages.mdx`
- `repo-structure.mdx` — `workspace/plan/active/DOCUMENTATION/system-canonical-design/repo-structure.mdx`
- `tooling.mdx` — `workspace/plan/active/DOCUMENTATION/system-canonical-design/tooling.mdx`
- `workflows.mdx` — `workspace/plan/active/DOCUMENTATION/system-canonical-design/workflows.mdx`

## Legacy / Archived / Drift Surfaces

- `dev-README.mdx` — `docs-guide/canonical/collation-data/Mintlify/dep-files/operations/scripts/x-archive/dev-README.mdx`
- `i18n-README.mdx` — `docs-guide/canonical/collation-data/Mintlify/dep-files/operations/scripts/x-archive/i18n-README.mdx`
- `snippets-README.mdx` — `docs-guide/canonical/collation-data/Mintlify/dep-files/operations/scripts/x-archive/snippets-README.mdx`
- `style.css` — `docs-guide/canonical/collation-data/Mintlify/dep-files/v2/_workspace/archive/style.css`
- `style.css` — `docs-guide/canonical/collation-data/Mintlify/dep-files/v2/_workspace/archive/p1-cleanup/style.css`
- `README.md` — `v2/_workspace/archive/language-pages/fr/contribute/CONTRIBUTING/README.md`
- `GIT-HOOKS.md` — `v2/_workspace/archive/language-pages/fr/contribute/CONTRIBUTING/GIT-HOOKS.md`
- `lpd-cli.mdx` — `v2/_workspace/archive/language-pages/fr/docs-guide/tooling/lpd-cli.mdx`
- `architecture-map.mdx` — `v2/_workspace/archive/language-pages/fr/docs-guide/features/architecture-map.mdx`
- `feature-map.mdx` — `v2/_workspace/archive/language-pages/fr/docs-guide/features/feature-map.mdx`
- `source-of-truth-policy.mdx` — `v2/_workspace/archive/language-pages/fr/docs-guide/policies/source-of-truth-policy.mdx`
- `README.mdx` — `v2/_workspace/archive/language-pages/fr/docs-guide/x-deprecated/README.mdx`
- `README.md` — `v2/_workspace/archive/language-pages/fr/docs-guide/x-deprecated/README.md`
- `architecture-map.mdx` — `v2/_workspace/archive/language-pages/fr/docs-guide/x-deprecated/architecture-map.mdx`
- `feature-map.mdx` — `v2/_workspace/archive/language-pages/fr/docs-guide/x-deprecated/feature-map.mdx`
- `lpd.md` — `v2/_workspace/archive/language-pages/fr/docs-guide/x-deprecated/lpd.md`
- `source-of-truth-policy.md` — `v2/_workspace/archive/language-pages/fr/docs-guide/x-deprecated/source-of-truth-policy.md`
- `documentation-guide.mdx` — `v2/_workspace/archive/language-pages/fr/resources/documentation-guide/documentation-guide.mdx`
- `documentation-overview.mdx` — `v2/_workspace/archive/language-pages/fr/resources/documentation-guide/documentation-overview.mdx`
- `contribute-to-the-docs.mdx` — `v2/_workspace/archive/language-pages/fr/resources/documentation-guide/contribute-to-the-docs.mdx`
- `docs-features-and-ai-integrations.mdx` — `v2/_workspace/archive/language-pages/fr/resources/documentation-guide/docs-features-and-ai-integrations.mdx`
- `style-guide.mdx` — `v2/_workspace/archive/language-pages/fr/resources/documentation-guide/style-guide.mdx`
- `snippets-inventory.mdx` — `v2/_workspace/archive/language-pages/fr/resources/documentation-guide/snippets-inventory.mdx`
- `automations-workflows.mdx` — `v2/_workspace/archive/language-pages/fr/resources/documentation-guide/automations-workflows.mdx`
- `README.md` — `v2/_workspace/archive/language-pages/es/contribute/CONTRIBUTING/README.md`
- `GIT-HOOKS.md` — `v2/_workspace/archive/language-pages/es/contribute/CONTRIBUTING/GIT-HOOKS.md`
- `lpd-cli.mdx` — `v2/_workspace/archive/language-pages/es/docs-guide/tooling/lpd-cli.mdx`
- `feature-map.mdx` — `v2/_workspace/archive/language-pages/es/docs-guide/features/feature-map.mdx`
- `source-of-truth-policy.mdx` — `v2/_workspace/archive/language-pages/es/docs-guide/policies/source-of-truth-policy.mdx`
- `README.mdx` — `v2/_workspace/archive/language-pages/es/group/x-orphaned/docs-guide/x-deprecated/README.mdx`
- `architecture-map.mdx` — `v2/_workspace/archive/language-pages/es/docs-guide/x-deprecated/architecture-map.mdx`
- `feature-map.mdx` — `v2/_workspace/archive/language-pages/es/docs-guide/x-deprecated/feature-map.mdx`
- `documentation-guide.mdx` — `v2/_workspace/archive/language-pages/es/resources/documentation-guide/documentation-guide.mdx`
- `documentation-overview.mdx` — `v2/_workspace/archive/language-pages/es/resources/documentation-guide/documentation-overview.mdx`
- `contribute-to-the-docs.mdx` — `v2/_workspace/archive/language-pages/es/resources/documentation-guide/contribute-to-the-docs.mdx`
- `docs-features-and-ai-integrations.mdx` — `v2/_workspace/archive/language-pages/es/resources/documentation-guide/docs-features-and-ai-integrations.mdx`
- `style-guide.mdx` — `v2/_workspace/archive/language-pages/es/resources/documentation-guide/style-guide.mdx`
- `snippets-inventory.mdx` — `v2/_workspace/archive/language-pages/es/resources/documentation-guide/snippets-inventory.mdx`
- `automations-workflows.mdx` — `v2/_workspace/archive/language-pages/es/resources/documentation-guide/automations-workflows.mdx`
- `README.md` — `v2/_workspace/archive/language-pages/es/cn/contribute/CONTRIBUTING/README.md`
- `GIT-HOOKS.md` — `v2/_workspace/archive/language-pages/es/cn/contribute/CONTRIBUTING/GIT-HOOKS.md`
- `lpd-cli.mdx` — `v2/_workspace/archive/language-pages/es/cn/docs-guide/tooling/lpd-cli.mdx`
- `architecture-map.mdx` — `v2/_workspace/archive/language-pages/es/cn/docs-guide/features/architecture-map.mdx`
- `feature-map.mdx` — `v2/_workspace/archive/language-pages/es/cn/docs-guide/features/feature-map.mdx`
- `source-of-truth-policy.mdx` — `v2/_workspace/archive/language-pages/es/cn/docs-guide/policies/source-of-truth-policy.mdx`
- `README.mdx` — `v2/_workspace/archive/language-pages/es/cn/docs-guide/x-deprecated/README.mdx`
- `README.md` — `v2/_workspace/archive/language-pages/es/cn/docs-guide/x-deprecated/README.md`
- `feature-map.mdx` — `v2/_workspace/archive/language-pages/es/cn/docs-guide/x-deprecated/feature-map.mdx`
- `lpd.md` — `v2/_workspace/archive/language-pages/es/cn/docs-guide/x-deprecated/lpd.md`
- `source-of-truth-policy.md` — `v2/_workspace/archive/language-pages/es/cn/docs-guide/x-deprecated/source-of-truth-policy.md`
- `documentation-guide.mdx` — `v2/_workspace/archive/language-pages/es/cn/resources/documentation-guide/documentation-guide.mdx`
- `documentation-overview.mdx` — `v2/_workspace/archive/language-pages/es/cn/resources/documentation-guide/documentation-overview.mdx`
- `contribute-to-the-docs.mdx` — `v2/_workspace/archive/language-pages/es/cn/resources/documentation-guide/contribute-to-the-docs.mdx`
- `docs-features-and-ai-integrations.mdx` — `v2/_workspace/archive/language-pages/es/cn/resources/documentation-guide/docs-features-and-ai-integrations.mdx`
- `style-guide.mdx` — `v2/_workspace/archive/language-pages/es/cn/resources/documentation-guide/style-guide.mdx`
- `snippets-inventory.mdx` — `v2/_workspace/archive/language-pages/es/cn/resources/documentation-guide/snippets-inventory.mdx`
- `automations-workflows.mdx` — `v2/_workspace/archive/language-pages/es/cn/resources/documentation-guide/automations-workflows.mdx`

## Remaining SOURCES after Clean

These remain live after cleanup because they are still authoritative Mintlify guidance surfaces or broader docs-platform references that cannot be collapsed without losing needed scope. `v2/_workspace/archive/language-pages/**` is intentionally excluded from this retained-source set because that tree is already deprecated and on a separate removal path.

- `docs-guide/canonical/collation-data/Mintlify/mintlify-repo-best-practices.md` — Internal canonical Mintlify authority.
- `docs-guide/canonical/collation-data/Mintlify/index.md` — Inventory and cleanup log.
- `docs-guide/contributing/mintlify.mdx` — Routed public Mintlify companion page.
- `docs-guide/contributing/local-preview.mdx` — Active preview workflow guidance with broader scope than Mintlify-only behavior.
- `docs-guide/tooling/lpd-cli.mdx` — Active LPD command reference and broader local workflow surface.
- `snippets/snippetsWiki/README.md` — Broader snippets wiki documentation, not Mintlify-only guidance.
- `snippets/snippetsWiki/index.mdx` — Broader snippets wiki overview.
- `snippets/snippetsWiki/theme-colors.mdx` — Theme token reference rather than Mintlify behavioral guidance.
- `snippets/components/README.md` — Active component authoring README.
- `workspace/plan/active/TOOLING/lpd-command-reference.md` — Active tooling reference with broader CLI scope.
- `workspace/plan/active/TOOLING/lpd-audit.md` — Active tooling audit with broader CLI scope.
- `workspace/plan/active/DOCUMENTATION/design-canonical.mdx` — Broader docs-governance design source.
- `workspace/plan/active/DOCUMENTATION/system-canonical-design/pages.mdx` — Broader docs-governance system design source.
- `workspace/plan/active/DOCUMENTATION/system-canonical-design/repo-structure.mdx` — Broader docs-governance system design source.
- `workspace/plan/active/DOCUMENTATION/system-canonical-design/tooling.mdx` — Broader docs-governance system design source.
- `workspace/plan/active/DOCUMENTATION/system-canonical-design/workflows.mdx` — Broader docs-governance system design source.

## Sync Gate Implementation

- `docs-guide/canonical/collation-data/Mintlify/mintlify-canonical-consumers.json`
- `operations/scripts/config/mintlify-canonical-sync.js`
- `operations/scripts/validators/governance/compliance/check-mintlify-canonical-sync.js`
- `operations/scripts/remediators/content/repair/sync-mintlify-canonical-consumers.js`
- `operations/tests/unit/check-mintlify-canonical-sync.test.js`

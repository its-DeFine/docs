# tools Script Index

{/* SCRIPT-INDEX:START */}
## Script Index

| Script | Summary | Usage | Owner |
|---|---|---|---|
| `tools/scripts/add-framework-headers.js` | Insert or verify governance framework metadata headers from classification JSON. | `node tools/scripts/add-framework-headers.js --data script-classifications.json --dry-run` | docs |
| `tools/scripts/assign-purpose-metadata.js` | Assign purpose and audience frontmatter metadata for docs.json EN-routable v2 pages using deterministic rules with optional LLM classification for unclassified pages. | `node tools/scripts/assign-purpose-metadata.js --scope pilot --dry-run` | docs |
| `tools/scripts/codex/lock-release.js` | Release active local codex lock entries for a branch/task. | `node tools/scripts/codex/lock-release.js --branch codex/123-task` | docs |
| `tools/scripts/codex/task-finalize.js` | Run finalize gates for a codex task: contract scope, lock ownership, and optional finalize profile checks. | `node tools/scripts/codex/task-finalize.js --branch codex/123-task` | docs |
| `tools/scripts/codex/task-preflight.js` | Create a codex task branch/worktree scaffold, task contract, and local lock for isolated agent execution. | `node tools/scripts/codex/task-preflight.js --task 1234 --slug hook-hardening --scope "tests/,.githooks/"` | docs |
| `tools/scripts/codex/validate-locks.js` | Validate codex local lock ownership and fail on overlapping active lock scopes. | `node tools/scripts/codex/validate-locks.js --branch codex/123-task --staged` | docs |
| `tools/scripts/component-layout-governance.js` | Validate v2 English docs against component-layout contracts by page type. | `node tools/scripts/component-layout-governance.js --scope full` | docs |
| `tools/scripts/dev/add-callouts.js` | Utility script for tools/scripts/dev/add-callouts.js. | `node tools/scripts/dev/add-callouts.js` | docs |
| `tools/scripts/dev/batch-update-og-image.sh` | Utility script for tools/scripts/dev/batch-update-og-image.sh. | `bash tools/scripts/dev/batch-update-og-image.sh` | docs |
| `tools/scripts/dev/ensure-mint-watcher-patch.sh` | Ensure Mint local-preview watcher disables glob expansion in repo paths. | `bash tools/scripts/dev/ensure-mint-watcher-patch.sh --check` | docs |
| `tools/scripts/dev/generate-mint-dev-scope.js` | Build deterministic Mint dev scoped profiles (docs.json + .mintignore) for large navigation trees. | `node tools/scripts/dev/generate-mint-dev-scope.js --versions v2 --languages en --tabs Developers` | docs |
| `tools/scripts/dev/replace-og-image.py` | Utility script for tools/scripts/dev/replace-og-image.py. | `python3 tools/scripts/dev/replace-og-image.py` | docs |
| `tools/scripts/dev/seo-generator-safe.js` | Utility script for tools/scripts/dev/seo-generator-safe.js. | `node tools/scripts/dev/seo-generator-safe.js` | docs |
| `tools/scripts/dev/test-add-callouts.js` | Utility script for tools/scripts/dev/test-add-callouts.js. | `node tools/scripts/dev/test-add-callouts.js` | docs |
| `tools/scripts/dev/test-seo-generator.js` | Utility script for tools/scripts/dev/test-seo-generator.js. | `node tools/scripts/dev/test-seo-generator.js` | docs |
| `tools/scripts/dev/update-all-og-images.js` | Utility script for tools/scripts/dev/update-all-og-images.js. | `node tools/scripts/dev/update-all-og-images.js` | docs |
| `tools/scripts/dev/update-og-image.js` | Utility script for tools/scripts/dev/update-og-image.js. | `node tools/scripts/dev/update-og-image.js` | docs |
| `tools/scripts/generate-content-gap-reconciliation.js` | Generate IA reconciliation CSV and summary from blueprint and v2 MDX coverage. | `node tools/scripts/generate-content-gap-reconciliation.js` | docs |
| `tools/scripts/i18n/generate-localized-docs-json.js` | Add/update v2 language nodes in docs.json using English v2 as template plus route-map-driven route rewrites. | `node tools/scripts/i18n/generate-localized-docs-json.js --write --languages es,fr,zh-CN --route-map /tmp/route-map.json --report-json /tmp/docsjson-report.json` | docs |
| `tools/scripts/i18n/lib/common.js` | Utility script for tools/scripts/i18n/lib/common.js. | `node tools/scripts/i18n/lib/common.js` | docs |
| `tools/scripts/i18n/lib/config.js` | Utility script for tools/scripts/i18n/lib/config.js. | `node tools/scripts/i18n/lib/config.js` | docs |
| `tools/scripts/i18n/lib/docs-json-localizer.js` | Utility script for tools/scripts/i18n/lib/docs-json-localizer.js. | `node tools/scripts/i18n/lib/docs-json-localizer.js` | docs |
| `tools/scripts/i18n/lib/docs-routes.js` | Utility script for tools/scripts/i18n/lib/docs-routes.js. | `node tools/scripts/i18n/lib/docs-routes.js` | docs |
| `tools/scripts/i18n/lib/frontmatter.js` | Utility script for tools/scripts/i18n/lib/frontmatter.js. | `node tools/scripts/i18n/lib/frontmatter.js` | docs |
| `tools/scripts/i18n/lib/mdx-parser.js` | Utility script for tools/scripts/i18n/lib/mdx-parser.js. | `node tools/scripts/i18n/lib/mdx-parser.js` | docs |
| `tools/scripts/i18n/lib/mdx-translate.js` | Utility script for tools/scripts/i18n/lib/mdx-translate.js. | `node tools/scripts/i18n/lib/mdx-translate.js` | docs |
| `tools/scripts/i18n/lib/path-utils.js` | Utility script for tools/scripts/i18n/lib/path-utils.js. | `node tools/scripts/i18n/lib/path-utils.js` | docs |
| `tools/scripts/i18n/lib/provenance.js` | Utility script for tools/scripts/i18n/lib/provenance.js. | `node tools/scripts/i18n/lib/provenance.js` | docs |
| `tools/scripts/i18n/lib/provider-mock.js` | Utility script for tools/scripts/i18n/lib/provider-mock.js. | `node tools/scripts/i18n/lib/provider-mock.js` | docs |
| `tools/scripts/i18n/lib/provider-openrouter.js` | Utility script for tools/scripts/i18n/lib/provider-openrouter.js. | `node tools/scripts/i18n/lib/provider-openrouter.js` | docs |
| `tools/scripts/i18n/lib/providers.js` | Utility script for tools/scripts/i18n/lib/providers.js. | `node tools/scripts/i18n/lib/providers.js` | docs |
| `tools/scripts/i18n/test-mintlify-version-language-toggle.js` | Validate Mintlify version/language toggle behavior on localized v2 routes. | `node tools/scripts/i18n/test-mintlify-version-language-toggle.js --base-url http://localhost:3012` | docs |
| `tools/scripts/i18n/test/cli-guardrails.test.js` | Utility script for tools/scripts/i18n/test/cli-guardrails.test.js. | `node tools/scripts/i18n/test/cli-guardrails.test.js` | docs |
| `tools/scripts/i18n/test/docs-json-localizer.test.js` | Utility script for tools/scripts/i18n/test/docs-json-localizer.test.js. | `node tools/scripts/i18n/test/docs-json-localizer.test.js` | docs |
| `tools/scripts/i18n/test/frontmatter.test.js` | Utility script for tools/scripts/i18n/test/frontmatter.test.js. | `node tools/scripts/i18n/test/frontmatter.test.js` | docs |
| `tools/scripts/i18n/test/mdx-translate.test.js` | Utility script for tools/scripts/i18n/test/mdx-translate.test.js. | `node tools/scripts/i18n/test/mdx-translate.test.js` | docs |
| `tools/scripts/i18n/test/provenance.test.js` | Utility script for tools/scripts/i18n/test/provenance.test.js. | `node tools/scripts/i18n/test/provenance.test.js` | docs |
| `tools/scripts/i18n/test/provider-openrouter.test.js` | Utility script for tools/scripts/i18n/test/provider-openrouter.test.js. | `node tools/scripts/i18n/test/provider-openrouter.test.js` | docs |
| `tools/scripts/i18n/translate-docs.js` | Translate selected v2 docs pages into configured languages and emit localized MDX files plus route-map/report artifacts. | `node tools/scripts/i18n/translate-docs.js --languages es,fr,de --scope-mode prefixes --prefixes v2/about/livepeer-network --max-pages 10 --max-concurrency 5` | docs |
| `tools/scripts/i18n/validate-generated.js` | Validate generated localized MDX files parse cleanly and exist for successful route-map entries. | `node tools/scripts/i18n/validate-generated.js --languages es,fr,zh-CN --route-map /tmp/route-map.json --report-json /tmp/validate-report.json` | docs |
| `tools/scripts/new-script.js` | ' + params.summary, | `/` | docs |
| `tools/scripts/snippets/fetch-external-docs.sh` | Utility script for tools/scripts/snippets/fetch-external-docs.sh. | `bash tools/scripts/snippets/fetch-external-docs.sh` | docs |
| `tools/scripts/snippets/fetch-lpt-exchanges.sh` | Utility script for tools/scripts/snippets/fetch-lpt-exchanges.sh. | `bash tools/scripts/snippets/fetch-lpt-exchanges.sh` | docs |
| `tools/scripts/snippets/fetch-openapi-specs.sh` | Utility script for tools/scripts/snippets/fetch-openapi-specs.sh. | `bash tools/scripts/snippets/fetch-openapi-specs.sh` | docs |
| `tools/scripts/snippets/generate-api-docs.sh` | Utility script for tools/scripts/snippets/generate-api-docs.sh. | `bash tools/scripts/snippets/generate-api-docs.sh` | docs |
| `tools/scripts/snippets/generate-data/scripts/generate-glossary.js` | Utility script for tools/scripts/snippets/generate-data/scripts/generate-glossary.js. | `node tools/scripts/snippets/generate-data/scripts/generate-glossary.js` | docs |
| `tools/scripts/snippets/generate-data/scripts/terminology-search.js` | Utility script for tools/scripts/snippets/generate-data/scripts/terminology-search.js. | `node tools/scripts/snippets/generate-data/scripts/terminology-search.js` | docs |
| `tools/scripts/snippets/generate-seo.js` | Utility script for tools/scripts/snippets/generate-seo.js. | `node tools/scripts/snippets/generate-seo.js` | docs |
| `tools/scripts/snippets/test-scripts.sh` | Utility script for tools/scripts/snippets/test-scripts.sh. | `bash tools/scripts/snippets/test-scripts.sh` | docs |
| `tools/scripts/snippets/update-component-library.sh` | Utility script for tools/scripts/snippets/update-component-library.sh. | `bash tools/scripts/snippets/update-component-library.sh` | docs |
| `tools/scripts/verify/.verify-large-change.sh` | Reserved verifier hook placeholder for large-change checks. | `bash tools/scripts/verify/.verify-large-change.sh` | docs |
{/* SCRIPT-INDEX:END */}

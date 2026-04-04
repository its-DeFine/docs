# Project State — Content Writing Pipeline
> Last updated: 2026-04-03
> This file must be read at the start of every AI session and updated after every agent batch.

---

## Running Agents (currently in flight)

| Agent | Purpose | Output path |
|---|---|---|
| — | About v1 full content read | context-packs/about-v1-content.md |

---

## Completed — Outputs Available

| Output file | Notes | Unblocks |
|---|---|---|
| Contracts docs-v2 migration PR | Isolated `docs-v2` branch `codex/20260403-contracts-docs-v2-migration` pushed and opened as PR #857 with contracts pipeline, generated data, composables, and importer routes migrated from the working source surface | Unblocks review and merge of the contracts surface onto `docs-v2` without touching `Docs-v2-dev` |
| VS Code Claude extension fix toolkit | Canonical diagnostic, 7 scripts, extension patched, cron backup, community research. `workspace/plan/active/FUCK_CLAUDE/` | Unblocks stable VS Code workflow — re-run `patch-extension.sh` after updates |
| Contracts canonical documentation cleanup | Contracts planning root normalized into `Canonical/`, `CURRENT-STATE/`, and `DEPRECATED/`; canonical workflow references synced to current script behavior | Unblocks contracts planning/navigation by keeping only current framework docs at root and preserving live script references |
| Contracts surface redesign merge | Canonical contracts reference and verifier split is merged into local `docs-v2-dev`; shared contracts view-model and catalog-config derivation now back the About contracts surfaces | Unblocks local review of the contracts redesign and future pipeline consolidation work |
| Mint parse hygiene remediation | Canonical templates are MDX-safe, routed/composable MDX contract enforced, globals.jsx is the single source of truth for gateway release data, and Mint boots cleanly without parse warnings | Unblocks reliable `mint dev` / `lpd dev` and prevents routed-page import regressions |
| resources-restructure (Gateways + Orchestrators) | reference/ and knowledge-hub/ sub-sections created. All files moved. docs.json updated. 15 redirects added. No content changed. | Unblocks IA audit accuracy (folder tree now matches pipeline spec) |
| context-packs/orchestrators-ia-prereq.md | Folder tree + nav tree + discrepancies | Human IA review (Orchestrators) |
| context-packs/gateways-ia-prereq.md | Folder tree + nav tree + discrepancies | Human IA review (Gateways) |
| context-packs/developers-ia-prereq.md | Folder tree + nav tree + discrepancies | Human IA review (Developers) |
| context-packs/about-ia-prereq.md | Folder tree + nav tree + discrepancies | Human IA review (About) |
| context-packs/delegators-ia-prereq.md | Folder tree + nav tree + discrepancies | Human IA review (Delegators) |
| context-packs/orchestrators-ia-mapping.md | IA section decisions mapped | Human review + lock (Orchestrators) |
| context-packs/gateways-full-content.md | 536 files, 3.67MB | Phase 1b persona emergence (Gateways) |
| context-packs/gateways-content-scan.md | Phase 2 — Gateways complete | Phase 3 (Gateways) |
| context-packs/orchestrators-full-content.md | 4636 lines, full v2/orchestrators/ tree incl. _workspace/x-archived/ | Phase 1b persona iteration check (Orchestrators) — all v1+v2 content now available |
| context-packs/orchestrators-content-scan.md | Phase 2 — Orchestrators complete | Phase 3 IA Audit (Orchestrators) — after human content scan review |
| context-packs/orchestrators-v1-content.md | | Phase 1b (Orchestrators) |
| context-packs/gateways-v1-content.md | | Phase 1b (Gateways) |
| context-packs/developers-full-content.md | 112 files, 534KB | Phase 1b (Developers) |
| context-packs/about-full-content.md | v2 full content read complete | Phase 1b (About) |
| context-packs/delegators-full-content.md | v2/delegators/ path | Phase 1b (Delegators) |
| Staged test harness repair | `bash tools/lpd test --staged` now bootstraps split repo dependency roots and reaches real validator failures instead of module crashes | Unblocks isolated remediation of staged repo debt |
| context-packs/developers-v1-content.md | | Phase 1b (Developers) |
| context-packs/delegators-v1-content.md | 6 files — 3 misrouted Studio docs flagged | Phase 1b (Delegators) |
| context-packs/developers-content-scan.md | Phase 2 — Developers complete | Phase 3 (Developers) after Phase 0 decisions |
| context-packs/about-content-scan.md | Phase 2 — About complete | Phase 3 (About) after Phase 0 decisions |
| context-packs/delegators-content-scan.md | Phase 2 — Delegators complete | Phase 3 (Delegators) after Phase 0 decisions |
| READ-EVERY-TIME/PROJECT-MANAGEMENT-CANONICAL.md | Rule 2.13 added | — |
| READ-EVERY-TIME/DEPENDENCY-TREE.md | | — |
| READ-EVERY-TIME/ai-rules-guides.md | Rule 2.13 added | — |
| decisions/decision-registry.md | D-NAV-01 logged | — |
| decisions/blocking-items.md | | — |
| decisions/tab-status.md | Updated | — |
| decisions/feedback-routing-map.md | | — |
| decisions/cross-tab-journeys.md | | — |
| decisions/terminology-tracking.md | | — |
| prompt-testing-protocol.md | | — |
| plan-canonical.md | Progress tracker updated | — |
| Frameworks/veracity.md | LOCKED 2026-03-23 | Veracity pass |
| Frameworks/veracity-library.md | 45 sources | Veracity pass |
| Prompts/Prompts-By-Phase/7-veracity-pass/veracity-pass.md | DRAFT — awaiting test runs | — |
| Prompts/Prompts-By-Phase/7-veracity-pass/pack-guide.md | | — |
| Prompts/Prompts-By-Phase/2-content-scan/content-scan.md | | — |
| Prompts/Prompts-By-Phase/3-content-pass/content-pass.md | AUDIT mode built | — |
| Prompts/Prompts-By-Phase/2-structure-audit/structure-audit.md | Position violation check added | — |

---

## Stopped / Failed (previous session — files do NOT exist on disk)

| Output file | Failure reason |
|---|---|
| — | — |

> All previously stopped agents have either completed or been relaunched (see Running above).

---

## Queued (waiting on dependencies)

| Task | Waiting on | Tab |
|---|---|---|
| Phase 1b persona iteration check | Human IA review + lock remaining (full content ✅) | Orchestrators |
| Phase 1b persona iteration check | Human IA review + full content both complete | Gateways |
| Phase 1b persona iteration check | Human IA review complete (full content ✅) | Developers |
| Phase 1b persona iteration check | Human IA review complete (full content ✅) | About |
| Phase 1b persona iteration check | Human IA review complete (full content ✅) | Delegators |
| Phase 2.5 IA-mapped research packs | IA locked per tab | All tabs |
| Phase 3 IA Audit | Content scan approved + Phase 0 decisions | Developers, About, Delegators |
| Phase 3 IA Audit | Human content scan review + Phase 0 decisions | Orchestrators |
| About v1 full content read | Agent in flight | About |

---

## Blocked (human decision needed)

| Decision | Tab | Blocks |
|---|---|---|
| Rewards placement (before or after operator selection?) | Delegators | Phase 3 |
| S6 split (real-time/custom compute) | Developers | Phase 3 |
| About multi-audience token | About | Phase 6+ |
| NaaP terminology lock | Gateways | Phase 3.5 |
| Human review + lock IA — PRIORITY 1 | Orchestrators | All downstream Orchestrators phases |
| Human review + lock IA — PRIORITY 2 | Gateways | All downstream Gateways phases |
| structure-audit.md fix (linear/on-demand/supporting/orphan categorisation) | All tabs | Phase 2 structure audit |
| File corruption in `operator-rationale.mdx` — garbage chars before frontmatter | Orchestrators | Phase 3 parsing |

---

## Watcher Flags

| Flag | Thread | Issue | Date |
|---|---|---|---|
| LIMBO | Contracts & Changelogs | Changelog migration half-done — old files deleted but unstaged, architecture.md references paths that may not exist on disk | 2026-03-29 |
| REAL-DEBT | Staged Test Harness Repair | Harness bootstrap is fixed; remaining staged-suite failures are real repo debt across navigation, governance, usefulness, and authoring checks | 2026-04-01 |
| REAL-DEBT | Contracts Surface Redesign | CP-6 contracts browser validation can hang on the newest `docs-v2-dev` base even when the scoped preview serves the canonical and verifier routes | 2026-04-03 |
| REAL-DEBT | Contracts Surface Migration to docs-v2 | New contracts pipeline helper modules lack canonical script-governance headers, and the regenerated component registry still does not surface all migrated contracts UI components | 2026-04-03 |
| REVIEW | Contracts Local Render Recovery | The contracts routes were render-verified locally on port `3350`, but `snippets/composables/pages/canonical/livepeer-contract-addresses.mdx` now contains an uncommitted workflow-verification accordion rewrite and `.github/workspace/phase2/pipeline-review-process.md` remains unrelated untracked work | 2026-04-03 |

---

## Tab Priority Order

1. Orchestrators
2. Gateways
3. Developers
4. About
5. Delegators

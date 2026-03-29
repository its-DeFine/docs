# Project State — Content Writing Pipeline
> Last updated: 2026-03-28
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
| VS Code Claude extension fix toolkit | Canonical diagnostic, 7 scripts, extension patched, cron backup, community research. `workspace/plan/active/FUCK_CLAUDE/` | Unblocks stable VS Code workflow — re-run `patch-extension.sh` after updates |
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
| context-packs/delegators-full-content.md | v2/lpt/ path | Phase 1b (Delegators) |
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

## Tab Priority Order

1. Orchestrators
2. Gateways
3. Developers
4. About
5. Delegators

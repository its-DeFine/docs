# CLAUDE.md — Livepeer Docs v2

> This is the project coordinator. Every Claude Code session reads this first. No prior context needed.

---

Always keep these best practices in mind https://code.claude.com/docs/en/best-practices

**This file is long for a CLAUDE.md.** The project complexity justifies it, but if Claude starts ignoring rules or asking questions answered here, the file is too noisy. Prune ruthlessly. Every line must earn its place.

## Project identity

Alison Haire (Wonderland). Documentation lead. Decision authority. Not a babysitter.

**Repo:** `livepeer/docs` . Branch: `docs-v2` . Platform: Mintlify (MDX)
**Working branch:** `docs-v2-dev`

**The finish line:** Every page across all 5 tabs passes the content-pass reviewer. Unverifiable numbers replaced with live links. No TODO flags in decision-critical positions. No undefined jargon. `veracityStatus` set in frontmatter with source citations. Every page traces back to a sub-question of its tab's canonical arriving question and fits its position in the tab map.

---

## How we work together

**Think freely. Gate on execution.** Recommend, challenge, propose with reasoning. The approval gate is on doing things, not on having opinions. Bring your expertise — best practices, first principles, critical thinking. Do not wait to be asked for your opinion.

**Approval:** "Go" / "ok" / "proceed" = approval. Silence = not approval. Describing the next task is not approval.

**Alison approves:** gate openings, blocking decisions, agent spawns, batch operations, merging pages, content-pass mode selection.

**Claude does without asking:** reading files, presenting findings, flagging out-of-scope content, updating completion reports, running tests.

---

## Co-work skills (`ai-tools/ai-skills/`)

These skills encode HOW we work. Use them.

| Skill | When | What it does |
| --- | --- | --- |
| `/thread` | Every session | Anchors the session outcome, prevents drift, produces finalisation report |
| `/research` | Before deciding or building | Agent-delegated investigation; synthesise + recommend, not just list |
| `/design` | Before building anything non-trivial | First-principles co-creation; architecture doc with test criteria |
| `/build` | After approved design exists | Agent-delegated execution; validates against design criteria |
| `/iterate` | After build completes | Review against criteria + best practice; routes to correct phase |
| `/pm` | Session start, planning, coordination | Proactive project management; priorities, bottlenecks, risks, repo hygiene |
| `/dispatch` | Parallel batch work | Parallel agent coordinator; batch audits, multi-directory scans |
| `/agent-brief` | Every agent spawn | Standard instruction template; quality contract, return format, failure protocol |
| `/diagnose` | Something is broken or a fix has failed twice | Systematic debugging: reproduce, gather facts, hypothesise from evidence, test one at a time, fix root cause |

**The workflow:** `/thread` → `/pm` → `/research` → `/design` → `/build` → `/iterate` → loop as needed.

**Agent spawns:** Use `/agent-brief` template for every agent. No ad-hoc prompts. Quality contract is non-negotiable.

**File outputs:** Write to `workspace/thread-outputs/{skill}/{topic}-{type}.md`. Never dump files in repo root.

---

## Co-creation principles

- Recommend and suggest. Do not ask questions you can answer yourself.
- When intent is vague, propose what you think the user means — do not ask open-ended questions.
- Findings before fixes. Gather all, present structured report, get approval, then execute.
- Never work from memory. If a document is referenced, read it.
- Decisions made in chat that are not written to the decision registry do not exist.
- After 2 failed attempts at the same approach: STOP. Root-cause analyse. Propose a different approach. Do not retry.

---

## Session start — before anything else

1. Read `workspace/plan/active/_Project-Management_/project-state.md`
2. Read `workspace/plan/active/CONTENT-WRITING/decisions/decision-registry.md`
3. Read `workspace/plan/active/CONTENT-WRITING/decisions/tab-status.md`
4. For content-writing pipeline sessions, also read: `workspace/plan/active/CONTENT-WRITING/READ-EVERY-TIME/PROJECT-MANAGEMENT-CANONICAL.md`
5. State in one sentence: what the task is, which gates are open, and what done looks like.

---

## Current project state

> **Active priority:** Orchestrators veracity pass on S01–S12. Phases 1–6 complete (12 MDX section pages written). Phase 7 is the current work. This runs independently of the main pipeline gate sequence below.

**Gate source of truth:** `workspace/plan/active/CONTENT-WRITING/decisions/tab-status.md`

| Tab           | Path                | IA Approved | Terminology | Content Scan | Content Pass Open | Priority |
| ------------- | ------------------- | ----------- | ----------- | ------------ | ----------------- | -------- |
| Orchestrators | `v2/orchestrators/` | Draft only  | No          | In progress  | No                | 1        |
| Gateways      | `v2/gateways/`      | Draft only  | No          | Done         | No                | 2        |
| Developers    | `v2/developers/`    | Draft only  | No          | In progress  | No                | 3        |
| About         | `v2/about/`         | Draft only  | No          | Done         | No                | 4        |
| Delegators    | `v2/lpt/`           | Draft only  | No          | Done         | No                | 5        |

No tab has reached IA approval. All tabs are blocked on human IA review + lock before downstream phases run.

**Blocked decisions — human only:**

| Decision                                                | Tab           | Blocks                | Owner  |
| ------------------------------------------------------- | ------------- | --------------------- | ------ |
| IA review + lock                                        | Orchestrators | All downstream phases | Alison |
| IA review + lock                                        | Gateways      | All downstream phases | Alison |
| S6 split: real-time/custom compute                      | Developers    | Phase 3               | Alison |
| Rewards placement (before or after operator selection?) | Delegators    | Phase 3               | Alison |
| About multi-audience token                              | About         | Phase 6+              | Alison |
| NaaP terminology lock                                   | Gateways      | Phase 3.5             | Alison |

---

## Tab scope — what each tab owns

| Tab           | Owns                                                                                    | Does NOT own                                            |
| ------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Orchestrators | GPU node setup, activation, earning, pricing, AI pipelines, monitoring, troubleshooting | Gateway setup, delegation mechanics, SDK usage          |
| Gateways      | Gateway infrastructure, routing, configuration, orchestrator selection, payments        | Orchestrator node setup, app development, delegation    |
| Developers    | APIs, SDKs, BYOC, building apps on Livepeer, contributor guides                         | Running infrastructure, delegation, protocol governance |
| About         | Protocol mechanics, network architecture, actors, economics, governance model           | Setup procedures, operational guides, API references    |
| Delegators    | LPT, staking, delegation, governance participation, treasury                            | Running nodes, building apps, gateway operation         |

Out-of-scope content found during a session: log it with the correct tab owner. Do not absorb it into current work.

---

## Content pipeline — the actual workflow

Each gate requires a specific artefact AND explicit human sign-off. Artefact existence alone does not open a gate.

### Phases

| #   | Phase                     | What it does                                              |
| --- | ------------------------- | --------------------------------------------------------- |
| 1   | Audience design           | Define personas, JTBDs, arriving questions per tab        |
| 1b  | Persona iteration check   | Verify no new personas needed                             |
| 2   | Content scan              | Read-only inventory of all existing pages per tab         |
| 2.5 | IA-mapped research pack   | Map research to approved IA structure                     |
| 3   | Structure audit / tab map | Categorise pages (KEEP/MOVE/MERGE/SPLIT/REWRITE/DROP)     |
| 3.5 | Terminology lock          | Lock all domain terms for the tab                         |
| 4   | Content audit             | Per-page disposition decisions                            |
| 4.5 | Reconsolidation plan      | File-level merge/drop/move plan                           |
| 6   | Content writing           | Write/rewrite pages using content-pass prompt             |
| 7   | Veracity pass             | Resolve all factual claims against source library         |
| 10+ | Layout pass               | MDX components, frontmatter completion, render validation |

### Prompts

All in `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/`:

**Before running any prompt: read its `pack-guide.md` first.** The pack-guide defines pre-flight steps, running order, failure modes, and what good output looks like. Skipping it produces output that looks correct but is built on bad foundations.

### Content-pass modes

| Mode    | Use                                                            |
| ------- | -------------------------------------------------------------- |
| REVIEW  | Existing page — outputs fixed MDX, not a to-do list            |
| WRITE   | Blank page — requires completed page brief first               |
| REWRITE | Full rewrite from scratch                                      |
| AUDIT   | Phase 4 — produces KEEP/MOVE/MERGE/SPLIT/REWRITE/DROP per page |

### Definition of done — a finished page

- Passes content-pass.md REVIEW with no flags
- All `REVIEW:` markers resolved
- `veracityStatus` set in frontmatter with source citations
- No TODO/TBD flags in decision-critical positions
- Unverifiable numbers replaced with live links (Explorer, Arbiscan)
- No undefined jargon — every domain term defined at first use
- Traces back to a sub-question of the tab's canonical arriving question
- Fits its position in the tab map (correct handoff from previous page, sets up next)

---

## AI tools ecosystem

### Co-work process skills (active)

`/thread` . `/research` . `/design` . `/build` . `/iterate` . `/pm` . `/dispatch` . `/agent-brief`

These govern HOW Claude works with Alison. See the Co-work skills table above.

### Pipeline skills (`ai-tools/ai-skills/`)

Content-specific skills. **Validate before use at scale** — run on a known-good page, check output against review standards, confirm.

`page-authoring` . `docs-copy` . `style-and-language-homogenizer-en-gb` . `rubric-static-review` . `docs-quality-and-freshness-audit` . `product-thinking` . `content-pipeline-pass-a` . `content-pipeline-tab-map`

### Audit pipeline

6-step static-first pipeline defined in `ai-tools/agent-packs/claude/CLAUDE.md` (auto-generated by `cross-agent-packager.js` — do not edit manually).

### Operations scripts (`operations/scripts/`)

98 scripts across: audits . validators . generators . remediators . automations . dispatch. Check `operations/scripts/` before writing a new script — it probably already exists.

### Running tests

```bash
node operations/tests/run-all.js
lpd dev --scoped --scope-prefix v2/orchestrators   # scoped dev server (fast, subset of docs.json)
node operations/tests/integration/mdx-component-runtime-smoke.js --routes /v2/path  # smoke test
```

**After any MDX/JSX change:** verify it renders before declaring done. Use the smoke test or scoped dev.

---

## Review standards

### Headings

- Name the thing. No questions. 3-6 words (8 max).
- BAD: "Three Viability Questions" -> GOOD: "Viability Check"
- BAD: "Is reward calling profitable?" -> GOOD: "Reward Call Threshold"
- BAD: "What Orchestrators Earn" -> GOOD: "Revenue Streams"
- BAD: "Video vs AI: Starting Workload" -> GOOD: "Video vs AI"

### Delete these sentences

- Opens with "This page", "Use this page", "This section"
- Describes what the following content does
- Restates the table or diagram above it
- Bridges sections with commentary
- Announces a concept instead of stating it

### Banned words

`effectively, essentially, basically, meaningful, significant, real` (intensifier), `various, several, simply, obviously, clearly, just` (minimiser)

### Banned constructions

| Construction                     | Fix                             |
| -------------------------------- | ------------------------------- |
| `not [X]` as primary statement   | State positively                |
| `rather than`                    | Delete contrast, state positive |
| `if [condition]` in body prose   | State threshold directly        |
| `can/may [verb]` in value claims | Assert directly                 |
| `depends on` without ranked list | Add weighting and thresholds    |
| `That means` / `This shows`      | Delete — trust the reader       |
| `This page [verb]`               | Delete — open with content      |

### Prose restating a table — delete it.

### Undefined jargon — define at first use on every page

`pool worker` . `active set` . `probabilistic micropayment tickets` . `reward cut / fee cut` . `NVENC/NVDEC` . `Cascade` . `BYOC` . `Arbitrum One`

---

## Voice

Peer-technical. Experienced operator to capable peer new to this system.

- UK English: -ise, -our, -re endings
- No em dashes — rewrite or use hyphens
- No questions in headings or body
- No conditional gatekeeping
- No hand-holding connectors
- No meta-document description
- Lead with the fact. End with fact, number, or next step. Never a hedge.

Full per-audience voice rules: `workspace/plan/active/CONTENT-WRITING/Prompts/voice-rules.md`

---

## Canonical taxonomy (locked)

**Source:** `v2/orchestrators/_workspace/canonical/Frameworks.mdx`

**pageTypes (7):** `navigation` . `concept` . `tutorial` . `guide` . `instruction` . `reference` . `resource`

**pagePurposes (15):** `orient` . `explain` . `learn` . `choose` . `evaluate` . `start` . `build` . `configure` . `operate` . `troubleshoot` . `verify` . `integrate` . `optimise` . `reference` . `update`

**Audience tokens (7):** `founder` . `builder` . `developer` . `gateway` . `orchestrator` . `delegator` . `community`

---

## Locked decisions — cannot be re-opened

**Full registry:** `workspace/plan/active/CONTENT-WRITING/decisions/decision-registry.md`

| ID       | Decision                                                                                                                      | Date       |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------- |
| D-NAV-01 | `pageType: navigation` disambiguation page is a locked cross-tab pattern — one file per tab, shared entry point for all paths | 2026-03-23 |

Do not re-decide anything in this table. If a locked decision looks wrong, flag it — do not override it.

---

## Domain terms

| Use                         | Never                                      |
| --------------------------- | ------------------------------------------ |
| LPT                         | "tokens", "crypto"                         |
| orchestrator                | "miner", "node" generically                |
| gateway                     | "API gateway"                              |
| active set                  | "top orchestrators"                        |
| reward cut / fee cut        | "commission"                               |
| probabilistic micropayments | "payments" generically                     |
| on-chain / off-chain        | payment MODE — never workload type         |
| dual                        | WORKLOAD config — not a payment type       |
| pool worker                 | Must be defined at first use on every page |

---

## Session end — mandatory before closing

Follow `/thread` Step 5: produce a finalisation report (template in `workspace/plan/active/_Project-Management_/completion-reports.md`).

1. Write finalisation report to completion-reports.md
2. Append summary entry to session log below
3. Update tab status board if any gate changed
4. A gate never moves to Done without evidence
5. A decision never moves to resolved without being written to the decision registry
6. Document branch status if a branch was used

---

## Session log

{/* Append-only. Most recent at top. */}

---

### 2026-03-24 — Orchestrators full quality check sweep: guides + resources (66 pages)

**Done:**
- Ran per-page quality checks (9 categories, ~40 check IDs) across all 10 guides subfolders (50 pages) + all 3 resources subsections (16 pages) = 66 pages total
- Pipeline: Check → Critical Review → Subfolder/Subsection Summary → Section Rollup → Full Orchestrators Rollup
- Output: 10 subfolder check reports + 10 critical reviews + 10 subfolder summaries + guides section rollup + 3 resource subsection check reports + 3 critical reviews + 3 subsection summaries + resources section rollup + ORCHESTRATORS-ROLLUP.md
- learnings.md grew from P89 → P110 (21 new systematic checker error patterns)
- Final output: `v2/orchestrators/_workspace/canonical/check/ORCHESTRATORS-ROLLUP.md`

**Findings:**
- 0/66 pages publishable; median ~21-22 fails per page
- Universal patterns: taxonomy gap (all pages), `## See Also` Banned-tier (most pages), `{/* FACT CHECK: */}` non-canonical format (~50+ instances across 8 subfolders), P39 atomic split-fix violation (template-level defect in tutorial stubs)
- CRITICAL: `x-contract-addresses.mdx` is empty stub in active docs.json nav — dead end immediately after cli-flags
- CRITICAL: broken cross-tab link to `/v2/gateways/resources/technical/orchestrator-offerings` in 2 pages (ai-inference-operations, diffusion-pipeline-setup)
- `byoc-cpu-tutorial.mdx` confirmed navigation orphan — in gateways tab nav only, not orchestrators

**Decisions needed (8 tab-level BDs blocking remediation):**
1. VRAM values — SME resolution required (SAM2, audio-to-text, RTX 2060 inconsistencies across 5 pages)
2. Livepeer Forum URL — canonical URL needed for 6+ pages linking to placeholder
3. Status batch demotion — approve `status: current → draft` for all pages with `veracityStatus: unverified`
4. byoc-cpu-tutorial tab assignment — stays in gateways only, or added to orchestrators nav?
5. Tutorial stubs disposition — 3 gateway-equivalent stubs (byoc-cpu-pipeline, offchain-transcoding-test, go-production) — keep, drop, or redirect?
6. join-a-pool deprecation — add formal registry entry for old `join-a-pool.mdx` (2/10)
7. x-contract-addresses.mdx — remove from docs.json nav or fill content
8. Two-glossary scope gap — `resources/glossary.mdx` vs `resources/compendium/glossary.mdx` — define scope boundary

**Blocked on:** All 8 BDs above require Alison decision before remediation packages can run

**Next session picks up:** Alison directs — either (A) begin veracity pass on S01-S12 per CLAUDE.md active priority, or (B) begin remediation Package 0 (taxonomy gap batch + See Also batch) which can run immediately without BD resolution

---

### 2026-03-24 — Orchestrators content pass: 70-page assessment + fixes

**Done:**
- Built REVIEW-REGISTRY.md with complete 88-page inventory (70 IA-mapped + 16 orphans + 2 duplicates)
- Assessed all 70 IA-mapped pages against 10-point scorecard (Frameworks.mdx 4.4 + voice-rules.md)
- Applied fixes: 15 pageType migrations, ~30 deprecated term replacements (pool worker, broadcaster, hybrid), 7 banned word removals (significantly, meaningfully), 15 self-reference removals, content corrections (logic error on r-monitor, corrupt bytes on operator-rationale, round duration consistency)
- Added 6 taxonomy frontmatter fields to all 70 pages (complexity, lifecycleStage, industry, niche, informationType, veracityStatus) — Alison overrode many values with her own choices
- Tab-level quality check: 4/5 criteria pass, 1 fail (2 dead-end draft stubs)
- Logged all decisions in REVIEW-REGISTRY.md

**Decisions made:**
- new-join-a-pool.mdx is canonical; old join-a-pool.mdx (2/10) should be deprecated
- Alison overrode pageType: quickstart stays as quickstart, overview stays as overview (not migrated to instruction)
- pool worker is a valid term per new CLAUDE.md (define at first use, do not replace)
- 16 orphan files: no action needed (all x- or dep- prefixed, excluded from nav)

**Blocked on:**
- 5 tab-level gaps: no cross-tab links to /v2/about/ or /v2/delegators/; Concepts + Resources sections have no routing card from portal/navigator; 2 draft stubs are dead ends
- VRAM inconsistencies across pages (SAM2, audio-to-text, RTX 2060) need SME resolution
- payments.mdx / payment-receipts.mdx content overlap needs merge-or-split decision
- All FACT CHECK comments across ~20 pages need human verification

**Next session picks up:** Resolve the 5 tab-level gaps (add cross-tab links, add Concepts/Resources routing cards, fix dead-end stubs). Then begin veracity pass on pages marked `veracityStatus: unverified` starting with `v2/orchestrators/guides/operator-considerations/operator-rationale.mdx`

---

### 2026-03-24 — CLAUDE.md rewrite from repo audit

**Done:** Full repo audit, gap analysis across 3 input versions, merged draft reviewed, applied to `.claude/CLAUDE.md`
**Decisions made:** None
**Blocked on:** Nothing — file is live
**Next session picks up:** Begin Phase 7 veracity pass on Orchestrators S01-S12 in `workspace/plan/active/CONTENTI-PIPLEINE/content/`

---

## Hard boundaries

- Do not commit, push, or modify the repo directly without explicit approval
- Do not write to Notion unless explicitly asked
- Do not post to public services (GitHub issues/PRs, Slack) without human review of content — hook enforced
- Do not retry a failing approach more than twice — root-cause analyse instead — hook enforced
- Output fixed work, not to-do lists. If asked for a fixed page, output the fixed page.

---

## Key files

| File                                                                                              | What                                                      |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `workspace/plan/active/_Project-Management_/project-state.md`                                     | Current agent state — read every session                  |
| `workspace/plan/active/_Project-Management_/ai-rules-guides.md`                                   | Full operational rules                                    |
| `workspace/plan/active/CONTENT-WRITING/READ-EVERY-TIME/PROJECT-MANAGEMENT-CANONICAL.md`           | Session protocol, agent rules, gate definitions           |
| `workspace/plan/active/CONTENT-WRITING/decisions/decision-registry.md`                            | Locked structural decisions                               |
| `workspace/plan/active/CONTENT-WRITING/decisions/tab-status.md`                                   | Per-tab gate status                                       |
| `workspace/plan/active/CONTENT-WRITING/decisions/blocking-items.md`                               | Items blocking phases                                     |
| `workspace/plan/active/CONTENT-WRITING/plan-canonical.md`                                         | Full execution plan, phase definitions, dependency graph  |
| `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/3-content-pass/content-pass.md`   | Content pass prompt                                       |
| `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/7-veracity-pass/veracity-pass.md` | Veracity pass prompt (DRAFT — validate before use)        |
| `workspace/plan/active/CONTENT-WRITING/Prompts/voice-rules.md`                                    | Voice rules for all 7 audiences                           |
| `workspace/plan/active/CONTENTI-PIPLEINE/00-TRACKER.md`                                           | Orchestrators pipeline tracker                            |
| `workspace/plan/active/ORCHS/01-CORE-NEEDS-AND-STANDARDS.md`                                      | Orchestrators copywriting standards                       |
| `v2/orchestrators/_workspace/canonical/Frameworks.mdx`                                            | Full taxonomy/voice/content frameworks                    |
| `ai-tools/agent-packs/claude/CLAUDE.md`                                                           | Claude Code audit pipeline (auto-generated — do not edit) |
| `docs.json`                                                                                       | Mintlify navigation and routing config                    |
| `operations/tests/run-all.js`                                                                     | Test runner                                               |
| `workspace/thread-outputs/research/component-script-placement-reference.md`                       | Component/script folder placement rules — read before writing any component or script |
| `workspace/thread-outputs/research/mintlify-constraints-reference.md`                             | Mintlify platform constraints — read before writing any MDX or JSX |

---

_Owner: Alison Haire (Wonderland) . Updated: 2026-03-25_

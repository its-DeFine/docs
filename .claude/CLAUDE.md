# CLAUDE.md — Livepeer Docs v2

> Project coordinator. Read this every session. No prior context needed.

---

## Project identity

Alison Haire (Wonderland). Documentation lead. Decision authority. Not a babysitter.

**Repo:** `livepeer/docs` . Branch: `docs-v2` . Platform: Mintlify (MDX)
**Working branch:** `docs-v2-dev`

---

## Engineering standards

**This is production infrastructure for a multi-million dollar protocol.** Every change is seen by hundreds of engineers and affects millions of dollars of downstream product pipeline. Every change must meet the highest engineering standards for the full context of the change.

- **No bandaids.** Do not patch symptoms. Understand the root cause, design the correct fix, and implement it properly.
- **Composable and scalable.** Every change must work as part of the larger system. Ask: does this compose with existing patterns? Will it scale when applied to 50 more pages/components/scripts?
- **Full repo integration.** Every change must follow repo standards: JSDoc tags, governance frameworks, naming conventions, Mintlify constraints, folder placement rules. Read the relevant governance docs before writing.
- **Think before writing.** Read the surrounding code. Understand the design intent. Check how similar problems are solved elsewhere in the repo. Only then propose a change.
- **No isolated fixes.** A change to a template must account for all instances. A change to a component must account for all consumers. A change to a script must account for all callers and the pipeline it feeds.

---

## How we work together

**Think freely. Gate on execution.** Recommend, challenge, propose with reasoning. The approval gate is on doing things, not on having opinions.

**Approval:** "Go" / "ok" / "proceed" = approval. Silence = not approval. Describing the next task is not approval.

**Alison approves:** gate openings, blocking decisions, agent spawns, batch operations, merging pages, content-pass mode selection.

**Claude does without asking:** reading files, presenting findings, flagging out-of-scope content, updating completion reports, running tests.

---

## Co-work skills (`ai-tools/ai-skills/`)

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
| `/close` | End of any session | Verify tasks against repo, write completion report, update session log and work streams table |

**The workflow:** `/thread` → `/pm` → `/research` → `/design` → `/build` → `/iterate` → loop as needed.

**Agent spawns:** Use `/agent-brief` template for every agent. No ad-hoc prompts.

**File outputs:** Write to `workspace/thread-outputs/{skill}/{topic}-{type}.md`. Never dump files in repo root.

---

## Co-creation principles

- Recommend and suggest. Do not ask questions you can answer yourself.
- When intent is vague, propose what you think the user means — do not ask open-ended questions.
- Findings before fixes. Gather all, present structured report, get approval, then execute.
- Never work from memory. If a document is referenced, read it.
- Decisions made in chat that are not written to the decision registry do not exist.
- After 2 failed attempts at the same approach: STOP. Root-cause analyse. Propose a different approach. Do not retry.
- Ignore IDE-opened file context (messages like "The user opened the file X in the IDE") unless the file is explicitly referenced in the message.
- Use TodoWrite to track session tasks. Create the task list immediately after defining the session outcome in `/thread`. Update status in real time. At `/close`, the task list is the source of truth for what was attempted.

---

## Session start — before anything else

1. Read `workspace/plan/active/_Project-Management_/project-state.md`
2. Read `workspace/plan/active/CONTENT-WRITING/decisions/decision-registry.md`
3. Read `workspace/plan/active/CONTENT-WRITING/decisions/blocking-items.md`
4. Read `workspace/plan/active/CONTENT-WRITING/decisions/tab-status.md`
5. For content-writing pipeline sessions, also read: `workspace/plan/active/CONTENT-WRITING/READ-EVERY-TIME/PROJECT-MANAGEMENT-CANONICAL.md`
6. **Context-match this session.** Multiple work streams run in parallel. Match to the right stream based on user intent or chat history. Use `/thread` to anchor — it handles registering in the work streams table automatically.

---

## Current project state

> **Multiple work streams run in parallel.** Do not assume every session is about the default priority.

**Active work streams:**

| Stream | Status | Key files |
| --- | --- | --- |
| Documentation system execution (Phases 0-8) | Phase 0-2 complete, Phase 3 next | `ethereal-giggling-bear.md` (plan), `workspace/plan/active/DOCUMENTATION/` |
| Workflow branch standardisation (Phase 3.5) | Audit complete, remediation pending | `workspace/thread-outputs/research/workflow-branch-audit.md` |
| Orchestrators veracity pass (S01-S12) | Phase 7 active | `workspace/plan/active/CONTENTI-PIPLEINE/00-TRACKER.md` |
| Co-work skills and governance | 9 skills built, draft, testing pending | `ai-tools/ai-skills/*/SKILL.md`, `docs-guide/policies/governance-index.mdx` |
| Solutions tab content | In progress | `v2/solutions/` |
| Governance framework staleness fixes | Complete | `workspace/thread-outputs/build/staleness-remediation-report.md` |
| Content pipeline (5-tab gate sequence) | Blocked on human IA review | `workspace/plan/active/CONTENT-WRITING/decisions/tab-status.md` |

**Blocked decisions:** See `workspace/plan/active/CONTENT-WRITING/decisions/blocking-items.md`

---

## Hard boundaries

- Do not commit, push, or modify the repo directly without explicit approval
- Do not write to Notion unless explicitly asked
- Do not post to public services (GitHub issues/PRs, Slack) without human review — hook enforced
- Do not retry a failing approach more than twice — root-cause analyse instead — hook enforced
- Output fixed work, not to-do lists. If asked for a fixed page, output the fixed page
- New scripts must follow 11-tag JSDoc standard and type/concern/niche taxonomy (`workspace/plan/active/SCRIPT-GOVERNANCE/script-framework.md`)
- New components must follow 7-tag JSDoc standard and category/sub-niche taxonomy (`workspace/plan/active/COMPONENT-GOVERNANCE/component-framework-canonical.md`)
- No destructive file operations without creating a backup or checkpoint commit first
- Never claim something works without verifying it renders or runs — hook enforced
- When editing docs files, confirm whether the target is a TEMPLATE or a PAGE before writing
- After any file move or rename, scan ALL file types for stale references — including .txt, .json, sitemap, llms.txt

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

## Voice and review standards

UK English (-ise, -our, -re). No em dashes. No questions in headings. Lead with fact, end with fact.

**Full standards:** `workspace/plan/active/CONTENT-WRITING/Prompts/voice-rules.md` and `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/3-content-pass/content-pass.md`

---

## Session end — mandatory before closing

1. Write session summary to `workspace/thread-outputs/sessions/session-log.txt` (outcome, what was done, what's next)
2. Update work streams table above if status changed
3. A gate never moves to Done without evidence
4. A decision never moves to resolved without being written to the decision registry

---

## Session log

Full session history: `workspace/thread-outputs/sessions/session-log.txt`

Recent entries in CLAUDE.md for quick context:

---

### 2026-03-27 — Changelog pipeline: GitLab support, LLM enhancement, component fixes

**Done:**
- Built dual-source (GitHub + GitLab) changelog pipeline for Streamplace (10 entries from 131 GitLab releases)
- Redesigned enhanced entry format: AI Summary (icon + italic label + divider) + Release Notes (icon + label + ScrollBox) + LazyLoad wrapper
- Switched to `openrouter/free` (auto-routes to best free model, no stale IDs) + 3-retry with backoff
- Added `--regenerate` flag, angle-bracket URL fix, UK English + no em dashes in prompt, h4 headings
- Regenerated Daydream changelog (37 entries, all enhanced)
- Fixed StyledSteps/LazyLoad/YouTubeVideoData across 5 solution overview + 5 community pages
- Moved Try sections above Get Started on all overview pages
- Process log: `workspace/thread-outputs/build/changelog-process-log.md` (12 patterns, 5 runs)

**Next:** Regenerate Embody, Studio, Frameworks changelogs with `--regenerate --enhance`. Convert process log to skill after 2-3 more runs.

---

### 2026-03-26 — Solutions migration to docs-v2 (PR #845, merged)

**Done:** Migrated full v2/solutions section (217 files) via PR #845. 19 targeted components, 12 redirects, Puppeteer tested 23/23 pages pass.
**Next:** Part B planning (full component library migration) — DO NOT start without checking in

---

### 2026-03-26 — Solutions pages: component fixes, StyledSteps, LazyLoad

**Done:** Fixed 4 broken component issues, built LazyLoad component, deployed across 5 community pages. 11 files modified.
**Next:** Verify LazyLoad rendering on dev server

---

### 2026-03-26 — Full-site style diagnostic and fix (3 issues)

**Done:** Fixed body padding, heading underlines (.mintignore), content width (72rem cap). Playwright tested.
**Next:** Visual QA after merge to docs-v2

---

## Key files

| File | What |
| --- | --- |
| `workspace/plan/active/_Project-Management_/project-state.md` | Current agent state — read every session |
| `workspace/plan/active/CONTENT-WRITING/decisions/decision-registry.md` | Locked structural decisions |
| `workspace/plan/active/CONTENT-WRITING/decisions/tab-status.md` | Per-tab gate status |
| `workspace/plan/active/CONTENT-WRITING/decisions/blocking-items.md` | Items blocking phases |
| `workspace/plan/active/CONTENT-WRITING/plan-canonical.md` | Full execution plan, phases, dependency graph |
| `workspace/plan/active/CONTENT-WRITING/Prompts/voice-rules.md` | Voice rules for all 7 audiences |
| `workspace/plan/active/CONTENTI-PIPLEINE/00-TRACKER.md` | Orchestrators pipeline tracker |
| `v2/orchestrators/_workspace/canonical/Frameworks.mdx` | Full taxonomy/voice/content frameworks |
| `docs.json` | Mintlify navigation and routing config |
| `docs-guide/policies/governance-index.mdx` | Canonical governance index — all governed surfaces, what to read before writing |
| `workspace/thread-outputs/research/component-script-placement-reference.md` | Component/script folder placement rules |
| `workspace/thread-outputs/research/mintlify-constraints-reference.md` | Mintlify platform constraints |

---

_Owner: Alison Haire (Wonderland) . Updated: 2026-03-26_

---

### 2026-03-27 — CLAUDE.md verification against repo state

**Done:** Verified CLAUDE.md claims against live repo. Found 8 discrepancies: stale file counts, 16 untracked plan directories, wrong lpd status, stale content scan statuses. Session-state hook confirmed working and reading live files.
**Decisions made:** None
**Blocked on:** Nothing closed out
**Next session picks up:** No action taken — all proposed fixes rejected. Root issue: CLAUDE.md mixed state into rules. State now served by session-state hook. Rules remain in CLAUDE.md.

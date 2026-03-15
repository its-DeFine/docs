# Product Thinking Review: Orchestrator Guides Section

_Applied using ai-tools/ai-skills/product-thinking/SKILL.md_

---

## 1. Job Stories

**J1**: "When I have a GPU sitting idle, I want to start earning crypto from Livepeer, so I can offset my hardware costs."
- Acceptance: Can estimate earnings before committing. Can reach first earning within 24 hours. Understands which path (pool/solo/AI-only) fits my hardware.
- Pages serving: operator-rationale (evaluation), setup-options (path selection), join-a-pool (fastest path)
- Gap: No unified "start here" page within guides. operator-rationale is evaluation, not action.

**J2**: "When I already run video transcoding and see AI demand growing, I want to add AI to my existing node, so I can earn from both workloads without a second machine."
- Acceptance: Can add AI flags to existing config in under 1 hour. Understands VRAM impact on video sessions. Knows which AI models are in demand.
- Pages serving: ai-workloads-guide (conceptual), batch-ai-setup (step-by-step)
- **Gap: No "add AI to existing video node" bridge content. Both AI pages assume fresh setup. No VRAM coexistence guidance.**

**J3**: "When I have significant LPT and want to maximise yield, I want to operate a reliable, well-staked orchestrator, so I can compound rewards and delegation."
- Acceptance: Understands reward calling gas economics. Can set competitive cuts. Can monitor delegation trends.
- Pages serving: earnings, rewards-and-fees, attracting-delegates
- Gap: No "LPT yield optimisation" framing. Content is mechanistic (how rewards work) not strategic (how to maximise).

**J4**: "When my company needs to provide GPU compute under SLAs, I want to operate commercial orchestrator infrastructure, so I can earn service fees from products like Livepeer Studio."
- Acceptance: Can set per-gateway pricing. Understands O-T split for reliability. Has SLA monitoring.
- Pages serving: business-case (evaluation), gateways-orchestrators (relationship), large-scale-operations (fleet)
- Gap: No end-to-end commercial operator journey. Pages exist but aren't connected into a path.

**J5**: "When I want to influence the direction of open compute infrastructure, I want to operate a node with governance weight, so I can vote on protocol decisions."
- Acceptance: Understands vote weight mechanics. Knows where proposals are discussed. Can vote via Explorer.
- Pages serving: protocol-influence (comprehensive), governance (mechanics)
- Gap: None significant. This is well covered between the two pages.

**J6**: "When I have a high-VRAM GPU (24GB+) but limited LPT, I want to earn from AI inference without active set membership, so I can start immediately."
- Acceptance: AI routing works without high stake. Can check pipeline demand. Sees first AI job within hours.
- Pages serving: ai-workloads-guide, batch-ai-setup, model-vram-reference
- Gap: The AI setup pages don't explicitly say "you don't need LPT for this." The low-barrier AI path isn't prominently surfaced.

**J7**: "When something breaks on my running node, I want to diagnose and fix it quickly, so I can minimise missed rewards and lost jobs."
- Acceptance: Can find my error symptom. Gets actionable fix steps. Knows when to escalate.
- Pages serving: troubleshooting (comprehensive)
- Gap: No quick-reference error lookup. Must scroll a long page.

---

## 2. Opportunity Solution Tree

**Desired Outcome**: An operator with a GPU can go from "I've heard of Livepeer" to "I'm earning revenue" in under 24 hours, and know where to go for every question that arises during ongoing operation.

| # | Opportunity | Imp | Sat | Score | Evidence |
|---|-----------|-----|-----|-------|----------|
| O1 | "I run video but can't figure out how to add AI" | 9 | 1 | **72** | No hybrid bridge content exists anywhere |
| O2 | "I can't tell which path earns more for my situation" | 9 | 4 | **54** | operator-rationale has decision matrix but no earnings modelling |
| O3 | "I don't know which AI models are worth running" | 8 | 5 | **40** | model-vram-reference has hardware data but not demand/earnings data |
| O4 | "Pricing is confusing - I don't know how to be competitive" | 8 | 1 | **72** | pricing-strategy.mdx is a STUB |
| O5 | "I set up my node but I'm not getting any jobs" | 8 | 6 | **32** | troubleshooting covers this but gateway selection criteria aren't clear |
| O6 | "I want to scale but don't know the right architecture" | 6 | 6 | **24** | O-T setup + large-scale both exist and are complete |
| O7 | "I want to earn from Livepeer but the setup looks complex" | 9 | 5 | **45** | setup-options exists but quickstart → guides handoff is unclear |

### Top Priorities
1. **O1 + O4 tied at 72** - Hybrid bridge gap AND pricing stub are equally critical
2. **O2 at 54** - Earnings modelling / path comparison
3. **O7 at 45** - Complexity barrier perception

### Solutions for O1 (Hybrid bridge)
- **S1a**: Add "Already Running Video?" accordion to ai-workloads-guide with the delta flags
- **S1b**: Create deployment-details/hybrid-setup.mdx with unified docker-compose
- **S1c**: Add VRAM coexistence table to session-limits (if it returns from deprecated)

### Solutions for O4 (Pricing stub)
- **S4a**: Write pricing-strategy.mdx with sell-side pricing guide (mirror gateway version)
- **S4b**: Add pricing quick-reference to operator-rationale (inline, not separate page)
- **S4c**: Cross-ref to gateway pricing-strategy with "orchestrator perspective" callout

### Solutions for O2 (Path earnings comparison)
- **S2a**: Add interactive earnings estimator to operator-rationale (calculator)
- **S2b**: Add "expected earnings by path" table to operator-rationale
- **S2c**: Cross-ref to Explorer data with "how to read orchestrator earnings"

---

## 3. Assumption Map

| # | Assumption | Dim | Conf | Risk | Test |
|---|-----------|-----|------|------|------|
| 1 | Separating "Operator Considerations" from "Deployment Details" helps users | Value | M | M | Check if users go Considerations → Deployment or skip Considerations entirely |
| 2 | batch-ai-setup and realtime-ai-setup need separate pages | Value | L | M | Content overlap analysis - if >60% shared, merge with tabs |
| 3 | Staking & Rewards and Payments & Pricing should be separate sections | Value | L | H | Operators think about earning holistically. Four separate sections for money-related content may fragment the journey. |
| 4 | benchmarking and session-limits deserve their own pages | Value | L | M | User deprecated these. May be better as sections within requirements or monitoring. |
| 5 | The tutorials (imported gateway content) add value for orchestrator operators | Value | L | H | Gateway BYOC CPU tutorial is not an orchestrator job. Low curation signal. |
| 6 | operator-rationale is the right entry point for "should I?" | Usability | M | M | It's 439 lines. May be too long for an evaluation page. |
| 7 | gateways-orchestrators is understood as "how gateways interact with me" | Usability | L | M | Title could read as "gateways vs orchestrators comparison" not "working with gateways" |
| 8 | pricing-strategy can be written without SME input on current market rates | Viability | L | H | May need operator interviews or Explorer data mining |
| 9 | Commercial orchestrator content (business-case) has enough public info | Viability | M | M | Some info exists (Livepeer Studio, Daydream) but details may be confidential |
| 10 | The Dep/New subgroup pattern in nav helps users | Usability | M | L | Migration pattern - temporary. Users seeing "Dep" groups may be confused. |
| 11 | **BLIND SPOT**: Operators revisiting docs for a specific task can find it | Usability | L | H | No task-based index or "I want to..." quick-ref |
| 12 | **BLIND SPOT**: The section order implies reading order | Usability | M | M | Returning operators skip to section 5+ but nav weight is on sections 1-3 |

---

## 4. Customer Journey Map (J1: GPU owner wanting earnings)

| Stage | Touchpoint | Thinking | Feeling | Friction | Opportunity |
|-------|-----------|---------|---------|----------|-------------|
| **Evaluation** | operator-rationale | "Is this worth my 4090's time?" | Calculating | Page is 439 lines, dense | Scannable decision matrix at top, detail below |
| **Path Selection** | setup-options | "Pool or solo? Video or AI or both?" | Uncertain | Binary framing (video OR AI) | Hybrid-first framing per L0 exercise |
| **Hardware Check** | requirements | "Does my hardware qualify?" | Anxious | Page exists but isn't linked from rationale naturally | Direct "check your hardware" CTA from rationale |
| **Setup** | Quickstart + Setup section | "Walk me through it" | Focused | Setup is in a different nav section (Setup, not Guides) | Guides should cross-ref setup steps, not repeat them |
| **First Workload** | job-types → video or AI setup | "What do I run first?" | Engaged | 6 pages in Workloads, unclear sequencing | Clear "start with X, then add Y" guidance |
| **Staking** | earnings, rewards-and-fees | "How do I actually get paid?" | Motivated | Must read 2 pages + payments in different section | Consider "Earning" umbrella section |
| **First Earning** | Explorer, CLI | "Is it working?" | Excited/anxious | No "verify you're earning" checkpoint page | Monitoring section should include earning verification |
| **Ongoing Ops** | monitoring, troubleshooting | "Something broke" | Frustrated | Troubleshooting is comprehensive but long | Symptom-based quick-nav |

### Critical Moments

- **Aha moment**: Seeing first reward call succeed on Explorer + understanding the compounding math
- **Churn trigger**: "No jobs" after setup. Operator doesn't know if the problem is pricing, capability, or connectivity. troubleshooting helps but the gap is "why am I not being selected?"
- **Advocacy trigger**: Sharing first month's earnings report showing both video + AI revenue

---

## 5. Value Propositions (by job story)

**J1 (idle GPU)**: "Livepeer's orchestrator guides take you from idle GPU to earning revenue, with a clear decision matrix so you pick the right path for your hardware and stake."

**J2 (add AI to video)**: "Already transcoding? Add AI inference to your existing node and earn from both workloads on the same hardware."
- **This value prop has no page to deliver it.**

**J3 (LPT yield)**: "Maximise your LPT position with reward calling optimisation, competitive pricing, and delegation growth strategies."

**J4 (commercial)**: "Run production GPU infrastructure for Livepeer-powered products with per-gateway pricing and fleet operations."

**J6 (AI-first, low LPT)**: "Start earning from AI inference immediately - no active set membership required. Your GPU capability is your entry ticket."
- **This value prop is buried. batch-ai-setup doesn't lead with it.**

---

## 6. Section-by-Section Review

### Operator Considerations (3 pages - all COMPLETE)

**Job stories served**: J1, J4, J5
**Opportunities addressed**: O2 (partially)

| Page | Job stories | Status | Issue |
|------|-----------|--------|-------|
| operator-rationale | J1, J3 | OK but long | 439 lines. Decision matrix is good but buried in dense prose. Needs scannable top section. |
| business-case | J4 | OK | Well-scoped commercial framing. Good complement to rationale. |
| protocol-influence | J5 | OK | Strong standalone page. Correctly positioned. |

**Recommendations**:
1. Add scannable summary (table or bordered box) to top of operator-rationale - the decision matrix and viability questions should be visible without scrolling
2. Consider renaming section: "Is It Worth It?" or "Why Operate?" - more outcome-focused than "Operator Considerations"

---

### Deployment Details (3-6 pages depending on Dep resolution)

**Job stories served**: J1, J2, J6, J7
**Opportunities addressed**: O1 (missing), O7

| Page | Job stories | Status | Issue |
|------|-----------|--------|-------|
| setup-options | J1 | OK | Covers solo/pool/O-T/siphon paths |
| requirements | J1 | OK | 480 lines, comprehensive |
| orchestrator-transcoder-setup | J4 | OK | Moved here from Advanced Ops - good fit |
| siphon-setup | J1 | OK | Niche but valid |
| join-a-pool | J1 | OK | Solid pool worker guide |
| benchmarking | - | DEPRECATED | User moved to x-deprecated. Content may fold into requirements or monitoring. |
| session-limits | - | DEPRECATED | User moved to x-deprecated. Content may fold into requirements or monitoring. |

**Recommendations**:
1. **Add hybrid-setup.mdx** - unified video+AI setup from scratch (O1, highest priority gap)
2. Decide on benchmarking/session-limits: if the content is valuable, fold key sections into requirements (hardware capacity) and monitoring (runtime capacity). If not, leave deprecated.
3. The "new-join-a-pool" in nav suggests a rewrite is in progress. Ensure the Dep/New pattern resolves cleanly.

---

### Workloads & AI (6 pages - all COMPLETE)

**Job stories served**: J1, J2, J6
**Opportunities addressed**: O1 (partially), O3

| Page | Job stories | Status | Issue |
|------|-----------|--------|-------|
| job-types | J1 | OK | Good overview. Correctly first in section. |
| video-transcoding | J1 | OK | 513 lines, comprehensive |
| ai-workloads-guide | J2, J6 | OK but missing bridge | No "already running video?" entry point |
| batch-ai-setup | J6 | OK | 915 lines - may be too long. Could the docker-compose and aiModels.json sections be shared with realtime? |
| realtime-ai-setup | J2 | OK | 590 lines |
| model-vram-reference | J6 | OK | Pure reference, well-scoped |

**Recommendations**:
1. **Add "Already Running Video?" bridge** to ai-workloads-guide (accordion or callout at top) showing the delta flags to add AI to an existing video config
2. Evaluate merging batch-ai-setup + realtime-ai-setup into single page with tabs - they share docker-compose patterns, aiModels.json format, model downloads. Difference is pipeline type and latency config. Combined = ~1000 lines but with tabs the user only reads their path.
3. Add demand/earnings context to model-vram-reference - "which models are actually being requested?" alongside "which models fit my GPU?" Cross-ref to tools.livepeer.cloud/ai/network-capabilities.

---

### Staking & Rewards (4 pages - all COMPLETE)

**Job stories served**: J3, J5
**Opportunities addressed**: O2 (partially)

| Page | Job stories | Status | Issue |
|------|-----------|--------|-------|
| earnings | J3 | OK | Good mechanics explanation |
| rewards-and-fees | J3 | OK | Reward calling detail |
| attracting-delegates | J3 | OK | Delegation growth strategies |
| governance | J5 | OK | Voting mechanics. Some overlap with protocol-influence. |

**Recommendations**:
1. **Consider merging governance into protocol-influence** or clearly differentiating: protocol-influence = "why governance matters" (motivation), governance = "how to vote" (mechanics). If both stay, cross-ref clearly.
2. Add "optimising for yield" framing to earnings - currently mechanistic ("how rewards work") not strategic ("how to earn more"). J3 operators want strategy.
3. **Evaluate merging this section with Payments & Pricing** into a single "Earning & Pricing" section. From the operator's perspective, staking, rewards, fees, pricing, and payment flow are all "how do I earn money?" Four money-related pages spread across two sections fragments the journey.

---

### Payments & Pricing (3 pages - 2 STUBS, 1 COMPLETE)

**Job stories served**: J3, J4
**Opportunities addressed**: O4

| Page | Job stories | Status | Issue |
|------|-----------|--------|-------|
| payment-flow | J3 | **STUB (63 lines)** | Critical gap. Orchestrators need to understand ticket receipt and redemption. |
| pricing-strategy | J3, J4 | **STUB (63 lines)** | Critical gap. Operators cannot compete without pricing guidance. Tied for highest O-score. |
| payments | J3 | COMPLETE | 404 lines, good operational content |

**Recommendations**:
1. **P0: Write pricing-strategy.mdx** - This is the #1 content gap by opportunity score (tied with hybrid). Source from v1 set-pricing.mdx + gateway pricing-strategy.mdx (sell-side mirror).
2. **P1: Write payment-flow.mdx** - Ticket receipt, winning ticket detection, redemption, gas economics.
3. Consider whether payments.mdx content overlaps with payment-flow once written. May need deduplication.

---

### Monitoring & Tools (4 pages - all COMPLETE)

**Job stories served**: J7
**Opportunities addressed**: O5

| Page | Job stories | Status | Issue |
|------|-----------|--------|-------|
| tools | J7 | OK | Overview of available tools |
| explorer-guide | J3, J7 | OK | Explorer as management dashboard |
| metrics-monitoring | J7 | OK | Prometheus setup, 462 lines |
| troubleshooting | J7 | OK | Symptom-based, 500 lines |

**Recommendations**:
1. Add "earning verification" section to tools or explorer-guide - "how to confirm your node is earning" covers J1's aha moment
2. Add quick-nav symptom index to top of troubleshooting (accordion with jump links by symptom category)
3. Consider absorbing benchmarking content (from deprecated) into metrics-monitoring as "capacity planning" section

---

### Advanced Operations (3 pages - all COMPLETE)

**Job stories served**: J4
**Opportunities addressed**: O6

| Page | Job stories | Status | Issue |
|------|-----------|--------|-------|
| run-a-pool | J4 | OK | Pool operator guide |
| gateways-orchestrators | J4 | OK | Gateway relationship management |
| large-scale-operations | J4 | OK | Fleet/enterprise operations |

**Recommendations**:
1. orchestrator-transcoder-setup moved to Deployment Details - correct. Remove from this section's nav if still referenced.
2. Rename gateways-orchestrators to "working-with-gateways" for clarity
3. Add "when to split from hybrid to dedicated nodes" criteria - this bridges O1 (hybrid) with O6 (scaling)

---

### Roadmap & Funding (2 pages - both STUBS)

**Job stories served**: None directly (aspirational/community content)

| Page | Job stories | Status | Issue |
|------|-----------|--------|-------|
| operator-support | - | **STUB (57 lines)** | SPE grants, programmes |
| orchestrator-showcase | - | **STUB (48 lines)** | Community showcase |

**Recommendations**:
1. Low priority for content development. These pages support retention/advocacy but don't serve any core job story.
2. operator-support should cross-ref the gateway equivalent when both are built.
3. orchestrator-showcase needs real operator data to be useful. Don't write until there are concrete examples.

---

### Tutorials (3 pages - all MINIMAL imports)

**Job stories served**: None well

| Page | Job stories | Status | Issue |
|------|-----------|--------|-------|
| imported-tutorial-1-byoc-cpu-pipeline | - | MINIMAL (51 lines) | **Gateway-focused. Not an orchestrator job.** |
| imported-tutorial-2-offchain-transcoding-test | J1 | MINIMAL (47 lines) | Potentially useful but minimal content |
| imported-tutorial-3-go-production | J1 | MINIMAL (47 lines) | Potentially useful but minimal content |

**Recommendations**:
1. **Remove tutorial-1 (BYOC CPU)** - irrelevant to orchestrator operators. Keeping it signals poor curation.
2. Evaluate tutorials 2+3 - are these substantial enough to justify a section? If they're just imports with 47 lines, consider removing the section until orchestrator-specific tutorials exist.
3. If tutorials stay, they need orchestrator framing: "Set up a video orchestrator from zero to first reward call" not "off-chain transcoding test."

---

## 7. Priority Actions

### P0 (Structural - before content work)

| # | Action | Rationale | Effort |
|---|--------|-----------|--------|
| 1 | **Write pricing-strategy.mdx** | Tied highest opportunity score (72). Operators can't compete without pricing guidance. | Medium |
| 2 | **Add hybrid bridge to ai-workloads-guide** | Highest opportunity score (72). Most operators run both; no content serves the transition. | Small |
| 3 | **Write payment-flow.mdx** | Completes the earning story. Without it, operators understand rewards but not fee receipt. | Medium |

### P1 (Journey improvements)

| # | Action | Rationale | Effort |
|---|--------|-----------|--------|
| 4 | Add scannable decision summary to top of operator-rationale | 439 lines is too dense for an evaluation page. Key info should be above the fold. | Small |
| 5 | Add "low LPT? Start with AI" callout to batch-ai-setup and ai-workloads-guide | J6 value prop ("no active set needed") is buried. | Small |
| 6 | Evaluate merging Staking + Payments into "Earning & Pricing" | Four money-related pages across two sections fragments the earning journey. | Medium (IA change) |
| 7 | Add earning verification to explorer-guide or tools | The "aha moment" (first earning) has no designed touchpoint. | Small |

### P2 (Content quality)

| # | Action | Rationale | Effort |
|---|--------|-----------|--------|
| 8 | Evaluate merging batch-ai-setup + realtime-ai-setup | 915+590 = 1505 lines with significant overlap. Tabs would reduce to ~800. | Medium |
| 9 | Resolve Dep/New nav pattern | Temporary migration pattern. Users shouldn't see "Dep" groups. | Small |
| 10 | Differentiate governance from protocol-influence | Both cover governance. One = why, one = how. Make the boundary explicit. | Small |

### P3 (Cleanup)

| # | Action | Rationale | Effort |
|---|--------|-----------|--------|
| 11 | Remove or replace tutorial-1 (BYOC CPU) | Gateway content, not orchestrator. Poor curation signal. | Trivial |
| 12 | Write operator-support.mdx when SPE details available | Stub. Low priority. | Medium |
| 13 | Rename gateways-orchestrators to working-with-gateways | Clearer intent. | Trivial |

---

## Content Status Summary

| Category | Complete | Stub | Deprecated/Missing | Total |
|----------|----------|------|-------------------|-------|
| Operator Considerations | 3 | 0 | 0 | 3 |
| Deployment Details | 4 | 0 | 2 deprecated | 6 |
| Workloads & AI | 6 | 0 | 0 | 6 |
| Staking & Rewards | 4 | 0 | 0 | 4 |
| Payments & Pricing | 1 | **2** | 0 | 3 |
| Monitoring & Tools | 4 | 0 | 0 | 4 |
| Advanced Operations | 3 | 0 | 0 | 3 |
| Roadmap & Funding | 0 | **2** | 0 | 2 |
| Tutorials | 0 | 0 | 3 minimal | 3 |
| **Total** | **25** | **4** | **5** | **34** |

**73% of guide pages are complete.** The critical gaps are pricing-strategy and payment-flow (both P0), plus the hybrid bridge content (P0, no dedicated page needed - accordion/section on existing pages).

---

## 8. Structural Proposal: "Configuration & Optimisation" Section + "Staking & Earning" Merge

### The Problem

"How do I earn?" and "How do I tune my running node?" are different jobs that the current IA conflates. Earning-related content is split across Staking & Rewards (4 pages) and Payments & Pricing (3 pages). Tuning-related content is scattered across Deployment Details (dual-workload-setup), Payments & Pricing (pricing-strategy), and deprecated files (session-limits, benchmarking).

### Job Story Analysis

**J-earn**: "When I want to understand and maximise my earnings, I want to see the complete earning picture in one place, so I can make informed decisions about staking, pricing, and delegation."
- Currently fragmented across 2 sections, 7 pages

**J-tune**: "When I have a running node and want to improve performance or add capabilities, I want a guide to tuning options, so I can optimise without re-reading the setup guide."
- Currently homeless: pricing-strategy is in Payments, dual-workload-setup is in Deployment Details, session-limits is deprecated, benchmarking is deprecated, reward calling config is in Staking

### Proposed Structure

```
Staking & Earning (merge - the "money" section)
├── earnings              ← how orchestrators earn (video fees + AI fees + inflation)
├── rewards-and-fees      ← reward calling mechanics, fee distribution
├── payment-flow          ← ticket receipt, redemption, settlement (currently stub)
├── payments              ← operational payment management
├── attracting-delegates  ← growing stake to earn more
└── governance            ← protocol influence on earning rules

Configuration & Optimisation (new - the "tuning" section)
├── pricing-strategy      ← pricePerUnit, pricePerGateway, autoAdjustPrice, competitive positioning
├── dual-workload-setup   ← adding AI to video or video to AI, VRAM coexistence
├── session-tuning        ← maxSessions, capacity planning, benchmarking results
└── reward-calling-config ← gas optimisation, manual vs auto, threshold analysis
```

### Why This Works (OST)

| Opportunity | Current section | Proposed section | Improvement |
|------------|----------------|-----------------|-------------|
| "How do I earn?" | Split across 2 sections | Staking & Earning (one place) | No section-hopping for the core question |
| "How do I set competitive prices?" | Payments & Pricing (stub) | Configuration & Optimisation | Pricing is a tuning action, not a payment concept |
| "How do I add AI to my video node?" | Deployment Details | Configuration & Optimisation | Post-setup tuning, not initial deployment |
| "How many sessions can I handle?" | Deprecated (nowhere) | Configuration & Optimisation | Has a home again |
| "How do I optimise reward calling?" | Buried in rewards-and-fees | Config & Optimisation (or cross-ref) | Findable as a tuning task |

### Assumption Check

| # | Assumption | Risk | Note |
|---|-----------|------|------|
| 1 | "Pricing is config, not payments" | Low | Operators think "I need to set my price" (config action), not "pricing is part of payments" (conceptual grouping) |
| 2 | "Dual-workload-setup is post-setup tuning, not deployment" | Medium | Could go either way. If the operator is adding AI to an existing node, it's tuning. If setting up dual from scratch, it's deployment. |
| 3 | "Merging 7 money pages into one section won't be too long" | Low | 6 pages is manageable. Gateway Payments & Pricing has 5. |
| 4 | "reward-calling-config deserves its own page" | Medium | Could be a section within rewards-and-fees instead of a standalone page. Depends on content volume. |

### Gateway Parallel

Gateways would benefit from the same pattern but the split is less clear:

```
Gateway equivalent:
  Payments & Pricing (keep as-is - gateway earning isn't staking-based)

  Configuration & Optimisation (new, if needed)
  ├── pipeline-configuration  ← already exists, already does this job
  ├── pricing-strategy        ← keep in Payments? Gateway pricing IS the payment decision
  └── scaling                 ← already in Advanced Ops, could cross-ref
```

For gateways, pricing IS the payment decision (how much to pay orchestrators). For orchestrators, pricing is a competitive positioning decision (how much to charge) - genuinely a tuning/config action. This asymmetry means the same section name works for both tabs but the content scope differs.

### Recommendation

**Do it for orchestrators. Evaluate for gateways later.**

1. Merge Staking & Rewards + Payments & Pricing → **"Staking & Earning"** (6 pages)
2. Create **"Configuration & Optimisation"** (3-4 pages: pricing-strategy, dual-workload-setup, session-tuning, optionally reward-calling-config)
3. Move pricing-strategy from Payments to Config
4. Move dual-workload-setup from Deployment Details to Config
5. Resurrect session-limits content (from deprecated) as session-tuning in Config
6. Keep benchmarking deprecated OR fold into session-tuning as a subsection

### Updated Section Order

```
1. Operator Considerations → "Should I operate?"
2. Deployment Details      → "What do I need and which path?"
3. Workloads & AI          → "What jobs do I run?"
4. Staking & Earning       → "How do I earn?" (MERGED)
5. Config & Optimisation   → "How do I tune my node?" (NEW)
6. Monitoring & Tools      → "How do I keep it running?"
7. Advanced Operations     → "How do I scale?"
8. Roadmap & Funding       → "What support exists?"
9. Tutorials               → "Show me"
```

This places Config & Optimisation after earning (you need to understand what you're optimising FOR) and before monitoring (tuning should precede ongoing observation). The operator journey becomes: understand earnings → tune for better earnings → monitor the results.

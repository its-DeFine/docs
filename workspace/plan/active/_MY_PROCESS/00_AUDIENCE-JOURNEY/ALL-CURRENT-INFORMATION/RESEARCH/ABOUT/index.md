AIM: consolidate all audience, personas, journeys for each tab & determine a final mapping.

# ALL FILES

Category = Persona, Audience, Journey, IA, Content, Prompt/Skill, Plan

| Name | Location | Category |
|------|----------|----------|
| canonical-about-audience-design.md | `CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/about/collated/` | Persona, Audience, Journey, IA |
| chatgpt-v4-about-audience-design.md | `CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/about/zero-context-ai-results/v4/` | Persona, Audience, Journey, IA |
| claude-web-v4-about-audience-design.md | `CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/about/zero-context-ai-results/v4/` | Persona, Audience, Journey, IA |
| agent-v5-about-audience-design.md | `CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/about/zero-context-ai-results/v5/` | Persona, Audience, Journey, IA |
| deprecated-terms.md | `CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/about/input-pack/` | Content |
| glossary-about.md | `CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/about/input-pack/` | Content |
| veracity-sources.md | `CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/about/input-pack/` | Prompt/Skill |
| v4.md (learnings) | `CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/about/learnings/` | Prompt/Skill |
| about-content-scan.md | `CONTENT-WRITING/context-packs/` | Content, IA |
| about-research-pack.md | `CONTENT-WRITING/context-packs/` | Content |
| about-v1-content.md | `CONTENT-WRITING/context-packs/` | Content |
| about-full-content.md | `CONTENT-WRITING/context-packs/` | Content |
| about-ia-prereq.md | `CONTENT-WRITING/context-packs/` | IA |
| README.md | `CONTENT-WRITING/collated/about/` | Plan |
| audience-design.md | `CONTENT-WRITING/collated/about/` | Persona, Audience, Journey, IA |
| content-scan.md | `CONTENT-WRITING/collated/about/` | Content, IA |
| ia-prereq.md | `CONTENT-WRITING/collated/about/` | IA |
| v1-content.md | `CONTENT-WRITING/collated/about/` | Content |
| v2-content.md | `CONTENT-WRITING/collated/about/` | Content |
| portal.mdx | `v2/about/` | Content |
| 01-tab-about.md | `_MY_PROCESS/00_AUDIENCE-JOURNEY/ALL-CURRENT-INFORMATION/FULL-FILES/TABS/` | Persona, Journey, Plan |

---

# ALL PERSONAS FOUND

## Source: canonical-about-audience-design.md (3-run synthesis)

| Rank | Persona | Entry vector | Arriving with | Wants to leave with | Vol | Depth | Impact | Total | Consensus |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Product evaluator** — founder, product manager, or platform engineer evaluating Livepeer as infrastructure for their application or platform | External article, search result, Solutions tab, referral; may come from Home CTA | General awareness that Livepeer is video/AI compute; no knowledge of protocol mechanics, roles, or costs | A clear answer to "is this the right infrastructure for my use case?" — enough to decide whether to proceed to the Developers or Solutions tab | 3 | 3 | 3 | **9** | 3/3 unanimous |
| 2 | **Token and network researcher** — evaluating LPT as a staking/investment opportunity or researching the protocol for a report or analysis | Search result on "LPT staking," "Livepeer tokenomics," or "Livepeer protocol"; Messari/Dune/CoinGecko referral | Awareness that LPT exists; no knowledge of delegation mechanics, inflation model, or governance | A reliable outline of the economic model — inflation, rewards, governance weight — sufficient to decide whether to read the Delegators tab or run deeper research | 3 | 3 | 3 | **9** | 3/3 unanimous |
| 3 | **GPU operator** — evaluating whether to connect hardware to the network for earnings | Discord, community forum, or search result on "Livepeer orchestrator" or "GPU compute earnings" | Hardware provisioned or under consideration; no knowledge of Livepeer's protocol roles, stake requirements, or job types | Clarity on what operating a node requires — stake, hardware, job types, economics — sufficient to decide whether to continue to the Orchestrators tab | 2 | 3 | 3 | **8** | 3/3 unanimous |
| 4 | **Developer** — evaluating the Livepeer API and SDK as a technical foundation | Search result on "Livepeer API" or "AI video pipeline"; developer community referral; may arrive via Home or Solutions | Technical context on AI/video APIs; no knowledge of Livepeer's protocol layer or token economics | Sufficient architectural understanding to evaluate whether the API surface meets their needs before going to the Developers tab | 2 | 2 | 3 | **7** | 3/3 unanimous |
| 5 | **Ecosystem newcomer / community member** — learning what Livepeer is for non-technical or non-investment reasons | Discord, Twitter/X, blog post, podcast, or referral from existing community member | Minimal — may have heard the name; interested in the mission and community | A legible account of what Livepeer does, who runs it, what the governance model is, and how to participate — sufficient to decide whether to go to the Community tab | 3 | 2 | 2 | **7** | 3/3 unanimous |

Co-primary: Product evaluator and Token/network researcher tied at 9.

## Source: chatgpt-v4-about-audience-design.md (single run)

| Rank | Persona | Score | Notes |
|---|---|---|---|
| 1 | Fit-check evaluator | 9 | Primary. Evaluating whether Livepeer fits their use case |
| 2 | System-model seeker | 8 | Wants mental model of how the network works |
| 3 | Token/governance checker | 8 | Evaluating tokenomics and governance structure |
| 4 | Protocol/history researcher | 5 | Deep-dive protocol architecture and history |

## Source: claude-web-v4-about-audience-design.md (single run)

| Rank | Persona | Score | Notes |
|---|---|---|---|
| 1 | Role Seeker | 9 | Primary. Disambiguating which role they fit |
| 2 | Economics Researcher | 9 | Co-primary. Evaluating economic model |
| 3 | Protocol Architect | 8 | Technical architecture evaluation |
| 4 | Governance Participant | 6 | Governance model assessment |
| 5 | Curious Observer | 5 | Non-technical, mission-curious |

## Source: agent-v5-about-audience-design.md (single run)

5 personas identical to canonical (Product Evaluator, Token Researcher, GPU Operator, Developer, Ecosystem Newcomer). All unanimous 3/3.

## Source: 01-tab-about.md (process notes)

| Persona | Description |
|---|---|
| Protocol Understander (primary) | Technically curious evaluator, arrives from Home/search/research articles, wants mental model and credibility signals |
| Diligence analyst (secondary) | Investor/researcher doing structured due diligence on protocol/token/governance/roadmap |
| Pre-build developer (secondary) | Evaluating Livepeer AI, reads enough to move to Developers tab |
| DePIN-curious LPT holder (secondary) | Owns LPT, wants to understand it, routes to Delegator tab |
| Orchestrator candidate (secondary) | Has GPU, evaluating node operation |

---

# ALL AUDIENCE DEFINITIONS FOUND

## Source: canonical-about-audience-design.md

- **Audience token**: Multi-audience — serves `founder`, `builder`, `developer`, `gateway`, `orchestrator`, `delegator`, `community` simultaneously
- **Lifecycle stage**: `discover` for all
- **The About tab does not have a single canonical audience token**
- v5 Agent run produced `discover-substrate` — **NOT adopted as canonical**
- Current v2 frontmatter uses non-canonical `general`
- **OPEN ITEM 1 (BLOCKING)**: What should `audience` frontmatter field contain?
  - Option A: `audience: all`
  - Option B: `audience: [gateway, orchestrator, delegator, developer, builder, community, founder]` (array)
  - Option C: Omit the audience field
  - Option D: New canonical token `substrate`

## Source: chatgpt-v4 run

- Assigned single token: `community`
- Recognised multi-audience reality but collapsed to single token

## Source: claude-web-v4 run

- Derived multi-audience model from Audience Definitions table
- Used `discover` as audience per table note

## Source: 01-tab-about.md

- Five arriving audience paths listed (product evaluator, token researcher, GPU operator, developer, ecosystem newcomer)
- All converge on same linear journey, diverge at role-router section

---

# ALL JOURNEYS FOUND

## Source: canonical-about-audience-design.md — Ideal Linear Journey

| Position | Stage name | lifecycleStage | What they're doing |
|---|---|---|---|
| 1 | Orienting: which role is mine? | `discover` | Reading the role routing section; identifying which participation path (if any) fits their situation |
| 2 | Understanding what Livepeer is | `discover` | Forming a working mental model of the network — what it does, who the actors are, the two compute types |
| 3 | Understanding how the network works | `discover` | Tracing how a job flows through the network from request to result; mapping actor relationships |
| 4 | Understanding the economics | `discover` | How value is created and distributed — ETH fees, LPT inflation, stake-weighted rewards |
| 5 | Understanding governance and the organisation | `discover` | How protocol decisions get made; who funds development; how the Foundation, Treasury, and SPEs relate |
| 6 | Routing to depth | `discover` → `evaluate` | Confirming their role path and navigating to the correct role tab with sufficient context |

## Source: canonical — On-demand content (return visits)

- Current active set size and whether it is governance-controlled
- Governance-controlled parameter values — unbonding period, target bonding rate, inflation adjustment step, treasury reward cut rate
- Definitions of specific protocol terms (Active Set, Round, Slashing, Probabilistic Micropayments, SPE)
- Relationship between video transcoding and AI inference as compute types
- How the Treasury is funded and what SPEs are

## Source: canonical — Cross-tab routing

| Direction | From / To | Why |
|---|---|---|
| Inbound | Home → About | Home routes discovery-stage readers who want protocol depth beyond the platform narrative |
| Inbound | Any role tab → About | Role tabs link to About for conceptual definitions rather than duplicating architecture content |
| Outbound | About → Solutions | Product evaluators and builders route to Solutions for product-specific application |
| Outbound | About → Orchestrators | GPU operators who have confirmed the role fits route to Orchestrators for setup and operations |
| Outbound | About → Delegators | Token holders and staking researchers route to Delegators for mechanics and yield detail |
| Outbound | About → Developers | Technical builders evaluating the API/SDK surface route to Developers |
| Outbound | About → Gateways | Gateway operators routing jobs proceed to Gateways for setup and operational content |
| Outbound | About → Community | Ecosystem newcomers and contributors route to Community for participation paths |

## Source: canonical — Jobs to be Done

| # | When... | I want to... | So I can... |
|---|---|---|---|
| J1 | I first encounter Livepeer and have no context | understand in plain terms what the network does, who built it, and what problem it solves | decide in under five minutes whether this is worth investigating for my specific situation |
| J2 | I am evaluating whether to use Livepeer for my product | understand the two compute types and how gateways access them | assess whether the compute supply meets my product's latency, quality, and cost requirements before reading integration docs |
| J3 | I hold LPT or am considering buying it | understand how staking, inflation, and fee distribution work conceptually | evaluate whether delegating is worth it and which dimensions of the economics to investigate further in the Delegators tab |
| J4 | I run GPU hardware and want to earn from it | understand what running an orchestrator requires — stake, hardware, job types, and economics | avoid wasting time on setup docs for a path that does not fit my situation |
| J5 | I need to understand how protocol decisions get made | understand the governance model — who votes, on what, with what weight | evaluate whether the protocol's direction is aligned with my interests before committing capital or engineering time |
| J6 | I want to understand the organisation behind Livepeer | understand the relationship between the Foundation, the Treasury, and the open-source protocol | assess governance and longevity risk before building on or staking in the network |
| J7 | I am mid-journey and need to confirm I am on the right conceptual path | look up a specific term or mechanism | continue reading a role-specific tab without returning to first principles |

## Source: canonical — Arriving Question

> "What is Livepeer, who is it for, and is any of this relevant to what I'm trying to do?"

Per-audience variants:
- Founder: "Can Livepeer provide the compute infrastructure my product needs?"
- GPU operator: "Can I earn money running my hardware on this network?"
- Token holder: "Is this a credible protocol to stake my tokens with?"
- Developer: "Is the API/SDK mature enough to build on?"
- Community member: "What is this ecosystem and how do I participate?"

## Source: canonical — Persona Path Validation

| Persona | Enters at | Exits at | Structural block | Knowledge gap |
|---|---|---|---|---|
| Product evaluator | S1 → S3 → S4 → Solutions/Developers | S4 then outbound | None | S3 and S4 must name Gateway/Developer paths and link to role tabs |
| Token/network researcher | S1 → S5 → S6 → S8 → Delegators | S8 then outbound | None | S5 and S6 must cover complete economic model (ETH fees AND LPT inflation) before S8 |
| GPU operator | S1 → S3 → S5 → Orchestrators | S5 then outbound | None | S3 must state orchestrators need significant LPT stake for video transcoding jobs independently |
| Developer | S1 → S2 → S3 → Developers | S3 then outbound | None | S3 must state developers access compute via gateway APIs/SDKs, no infrastructure needed |
| Ecosystem newcomer | S1 → S2 → S9 → S10 → Community | S10 then outbound | None | S9 must be accessible to non-technical readers |

**All personas unblocked. No missing sections.**

---

# ALL IA / SECTION STRUCTURES FOUND

## Source: canonical-about-audience-design.md — 10-section structure

| Section | Reader question | Job | purpose | pageType | Entry state | Exit state | lifecycleStage |
|---|---|---|---|---|---|---|---|
| S1 — Role router: which path is mine? | "I've heard of Livepeer — which role (if any) applies to me, and where should I go next?" | J1 | `orient` | `navigation` | Arriving with no knowledge of Livepeer's role structure | Has identified their participation path and has a named next tab to visit | `discover` |
| S2 — What Livepeer is: the network in plain terms | "What does this network actually do — video, AI, or both — and is it live?" | J1 | `explain` | `concept` | Has been routed but has no mental model | Can describe in one sentence what Livepeer does; confirmed active/deployed | `discover` |
| S3 — How the network works: jobs, actors, and flow | "How does a piece of work move through this network — from request to result?" | J2, J4 | `explain` | `concept` | Knows what Livepeer does but no picture of job flow | Can trace a job end-to-end; can explain each actor's role in one sentence | `discover` |
| S4 — The two compute types | "What is the difference between the video and AI workloads?" | J2, J4 | `explain` | `concept` | Understands flow but hasn't distinguished workload types | Has decided which compute type(s) relevant to their use case | `discover` |
| S5 — The economic model: how value flows | "How does money actually move through this network?" | J3, J4 | `explain` | `concept` | Understands roles and flow, not fees/rewards | Can describe ETH fees + LPT inflation streams; which actors receive each | `discover` |
| S6 — LPT: the protocol token | "What is LPT for — speculative or functional?" | J3, J7 | `learn` | `concept` | Has seen LPT mentioned, unclear purpose | Can state 3 functions (staking, delegation, governance); what drives issuance | `discover` |
| S7 — Staking and delegation: how stake works | "What does bonding LPT involve?" | J3, J7 | `explain` | `concept` | Knows LPT functions, not mechanics | Can explain bonding requirements, unbonding period, slashing exposure **[design flag: may split]** | `discover` |
| S8 — Governance: how decisions are made | "Who controls this protocol — can I have a say?" | J5 | `explain` | `concept` | Understands economics, not governance | Can describe stake-weighted voting, LIP lifecycle, delegator vote-override | `discover` |
| S9 — The organisation: Foundation, Treasury, SPEs | "Is there a company behind this?" | J6 | `explain` | `concept` | Seen governance, not entities | Can characterise org model (protocol, Treasury, Foundation, SPEs); assess longevity risk | `discover` |
| S10 — Ecosystem and current state | "What's been built? Is it actively developed?" | J1, J6 | `evaluate` | `concept` | Has conceptual model, no real-world evidence | Reviewed current products + upgrade history; formed preliminary credibility judgment | `discover` |

## Source: chatgpt-v4 run — 10-section structure

| # | Section | pageType | purpose |
|---|---|---|---|
| S1 | Find Your Place | navigation | orient |
| S2 | What Livepeer Actually Is For | concept | explain |
| S3 | Who Does What | concept | explain |
| S4 | Job Flow | concept | explain |
| S5 | Token Purpose | concept | learn |
| S6 | Incentives/Payouts | concept | explain |
| S7 | Governance | concept | explain |
| S8 | What Changed Over Time | concept | explain |
| S9 | What Must Be Verified Live | concept | evaluate |
| S10 | Where To Go Next | navigation | orient |

## Source: claude-web-v4 run — 8-section structure

| # | Section | pageType | purpose |
|---|---|---|---|
| S1 | What is Livepeer | concept | explain |
| S2 | Which Role Is Mine | navigation | orient |
| S3 | How Network Works | concept | explain |
| S4 | Payment Model | concept | explain |
| S5 | LPT/Token Economy | concept | learn |
| S6 | Rewards/Earnings | concept | explain |
| S7 | Governance | concept | explain |
| S8 | Network Upgrades & History | concept | explain |

## Source: agent-v5 run — 11-section structure

Same as canonical 10 sections + S11 Glossary (reference page). Produced non-canonical `discover-substrate` token.

## Source: about-content-scan.md — Current live v2/about/ structure

22 production pages in 4 nav groups:
- **About Livepeer (root)**: portal.mdx, livepeer-overview.mdx, core-concepts.mdx, mental-model.mdx, faq-about.mdx
- **Livepeer Protocol**: overview.mdx, core-mechanisms.mdx, livepeer-token.mdx, governance-model.mdx, treasury.mdx, economics.mdx, technical-architecture.mdx
- **Livepeer Network**: overview.mdx, actors.mdx, job-lifecycle.mdx, marketplace.mdx, technical-architecture.mdx, interfaces.mdx
- **Resources**: livepeer-whitepaper.mdx, livepeer-glossary.mdx, blockchain-contracts.mdx, technical-roadmap.mdx, compendium/glossary.mdx

39 files on disk total (includes unlisted workspace artefacts).

## Source: about-ia-prereq.md — Current folder tree

```
v2/about/
├── portal.mdx
├── core-concepts.mdx
├── livepeer-overview.mdx
├── mental-model.mdx
├── faq-about.mdx
├── livepeer-protocol/
│   ├── overview.mdx
│   ├── core-mechanisms.mdx
│   ├── livepeer-token.mdx
│   ├── governance-model.mdx
│   ├── treasury.mdx
│   ├── economics.mdx
│   └── technical-architecture.mdx
├── livepeer-network/
│   ├── overview.mdx
│   ├── actors.mdx
│   ├── job-lifecycle.mdx
│   ├── marketplace.mdx
│   ├── technical-architecture.mdx
│   └── interfaces.mdx
├── resources/
│   ├── livepeer-whitepaper.mdx
│   ├── livepeer-glossary.mdx
│   ├── blockchain-contracts.mdx
│   ├── technical-roadmap.mdx
│   └── compendium/glossary.mdx
└── _workspace/ (working files)
```

---

# OPEN ITEMS & BLOCKING DECISIONS

1. **BLOCKING — Audience token in frontmatter**: Options A (`all`), B (array), C (omit), D (new `substrate` token). Human decision required.
2. **NON-BLOCKING — Run count**: 3 runs (2 v4 + 1 v5). Meets minimum but v5 used different prompt.
3. **NON-BLOCKING — Broadcaster Status conflict**: glossary-about.md says `current`, deprecated-terms.md says deprecated. Glossary correction needed.
4. **NON-BLOCKING — Developer/Builder token split**: Both tokens serve About; depends on OPEN ITEM 1 resolution.
5. **DESIGN FLAG — S7 may split**: Bonding mechanics + slashing exposure may warrant separate pages if content volume warrants.

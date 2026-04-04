AIM: consolidate all audience, personas, journeys for each tab & determine a final mapping.

# ALL FILES

Category = Persona, Audience, Journey, IA, Content, Prompt/Skill, Plan

| Name | Location | Category | Summary of File Contents |
|------|----------|----------|--------------------------|
| canonical-gateways-audience-design.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/gateways/collated/` | Audience, Persona, Journey, IA | **CANONICAL.** Synthesised from 3 AI runs. 45-term terminology lock. 4 personas: Self-Hosted Gateway Launcher (primary), Platform Reseller/NaaP Builder, Existing Operator Tuning, Builder Graduating from API. 7 JTBDs. 13-section structure (S1 disambiguation through S13 NaaP). Arriving question: "I want to route AI or video jobs through Livepeer — which gateway type do I need?" 2 flagged conflicts: NaaP acronym, BYOC expansion. All personas unblocked. |
| collation-notes-gateways.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/gateways/collated/` | Prompt/Skill | 5 excluded personas with reasoning. 4 excluded sections. 6 structural decisions with rationale (13-section count, payment before quickstarts, two parallel quickstarts, standalone troubleshooting, dual mode section). 6 open items for Phase 2: NaaP expansion, BYOC expansion, S13 split, dual mode merge candidate, remote signer endpoint, weight factor flag names. |
| validation-check.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/gateways/` | Plan | Phase 1 validation. 6 checks all PASS. APPROVED FOR PHASE 2 subject to resolving NaaP and BYOC conflicts. |
| agent-v5-gateways-audience-design.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/gateways/zero-context-ai-results/v5/` | Audience, Persona, Journey, IA | v5 Agent run. 27-term terminology lock. 5 personas (net-new infrastructure operator primary). 8-stage ideal journey. Entry blockers: path ambiguity, ETH prerequisite, remote signer prerequisite, NaaP ambiguity. |
| glossary-gateways.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/gateways/input-pack/` | Content | 75 terms classified by domain (livepeer:protocol, livepeer:deployment, economic:payment, ai:concept, video:encoding, etc.). Two inconsistencies: NaaP ("Network as a Platform" vs "Network-as-a-Product"), BYOC ("Bring-Your-Own-Container" vs "Bring Your Own Compute"). |
| v4.md (learnings) | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/gateways/learnings/` | Prompt/Skill | 3 v4 fixes held: pageType:navigation on S1 (3/3), section load flag (1/3), source verification (2/3). On-chain/off-chain parallel quickstarts unanimous (3/3). Claude Web placed payment after quickstarts (overridden by 2/3 consensus). |
| collation-v2.md (learnings) | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/gateways/learnings/` | Prompt/Skill | Collation v2 applied. 3 input runs produced clean consensus (parallel quickstarts 3/3, disambiguation 3/3, payment 2/3, troubleshooting 2/3, dual mode 2/3). 6 open items with blocking status — "most complete of any tab." |
| gateways-content-scan.md | `workspace/plan/active/CONTENT-WRITING/context-packs/` | Content, IA | 98 pages scanned. 22 stubs, 76 current, 10 deprecated pageType, 20 unknown pageType, 98 missing lifecycleStage. Grouped by section. Per-page frontmatter completeness assessed. Duplicates identified. |
| gateways-research-pack.md | `workspace/plan/active/CONTENT-WRITING/context-packs/` | Content, Research | v1 + v2 consolidation. V1: 3 misfiled pages, 9 genuine guides, 3 AI gateway pages. V2: 98 pages mapped to research purposes. Key facts: production ETH minimum 0.36 ETH (GitHub #3744), community remote signer (unverified), on-chain/off-chain distinct, dual mode Linux-required. |
| gateways-v1-content.md | `workspace/plan/active/CONTENT-WRITING/context-packs/` | Content | Verbatim v1 pages. Docker/Linux/Windows install procedures, funding flows, transcoding profile templates, RTMP/HLS, off-chain AI setup, on-chain AI with Arbitrum RPC. Source of truth for legacy patterns. |
| gateways-full-content.md | `workspace/plan/active/CONTENT-WRITING/context-packs/` | Content | Consolidated v2 gateways content mapped to audience design sections. Phase 2.5 research input. |
| gateways-ia-prereq.md | `workspace/plan/active/CONTENT-WRITING/context-packs/` | IA | IA prerequisite analysis for Phase 2 structure design. |
| audience-design.md | `workspace/plan/active/CONTENT-WRITING/collated/gateways/` | Audience, Persona, Journey | Collated audience design. 27-term lock, 5 personas, 7 JTBDs, 8-stage journey, on-demand categories. |
| collation-notes.md | `workspace/plan/active/CONTENT-WRITING/collated/gateways/references/` | Prompt/Skill | Terminology conflicts, excluded personas/sections, structural disagreements, 6 open items. |
| validation-check.md | `workspace/plan/active/CONTENT-WRITING/collated/gateways/references/` | Plan | Check B APPROVED FOR PHASE 2. |
| gateways-IA.md | `workspace/plan/active/ORCHESTRATOR-CONTENT-WRITING/` | IA, Plan | **PHASE 2 IA LOCKED.** 13-section structure mapped to v2 source pages with CONSOLIDATE/REWRITE decisions. NaaP = "Network-as-a-Product" (LOCKED), BYOC = "Bring Your Own Container" (LOCKED). |
| gateways-COMPLETION-STATUS.md | `workspace/plan/active/ORCHESTRATOR-CONTENT-WRITING/` | Plan | **ALL 13 PAGES WRITTEN** (9,482 words). ~48 veracity REVIEW markers placed. Pending: naming audit, veracity pass, layout pass, universal pages, human review. |
| S01-gateway-path-finder.md | `workspace/plan/active/ORCHESTRATOR-CONTENT-WRITING/gateways/` | Content, Journey | S1 WRITTEN. 4 deployment paths: on-chain self-hosted, off-chain self-hosted, gateway-as-a-service, NaaP. Each with audience, requirements, routing. ETH minimum 0.36 production (flagged REVIEW). |
| S02-what-a-gateway-does.md | `workspace/plan/active/ORCHESTRATOR-CONTENT-WRITING/gateways/` | Content | S2 WRITTEN. Gateway = demand-side router, no GPU required. Video (RTMP to HLS/DASH) and AI (HTTP to capability-matched). 5 core functions. What it does NOT do. |
| S03-payments-and-funding.md | `workspace/plan/active/ORCHESTRATOR-CONTENT-WRITING/gateways/` | Content | S3 WRITTEN. Probabilistic micropayments. On-chain: deposit + reserve via TicketBroker. Off-chain: remote signer. 0.1 ETH testing / 0.36 ETH production (flagged REVIEW). |
| personas.md | `v2/gateways/_workspace/notes/` | Persona | Gateway operator persona definitions from workspace. |
| portal.mdx | `v2/gateways/` | Content | Landing/navigation frame. Hero: "Build – Create – Innovate". Deprecated frontmatter (pageType:landing, audience:gateway-operator). |
| navigator.mdx | `v2/gateways/` | Content, Journey | Decision guide routing by goal (Build AI product, Transcode video, Build platform, Evaluate) and mode (on-chain, off-chain). 4 goal tabs with path sequences. Deprecated pageType:overview. |
| 05b-tab-gateways.md | `workspace/plan/active/_MY_PROCESS/00_AUDIENCE-JOURNEY/ALL-CURRENT-INFORMATION/FULL-FILES/TABS/` | Journey, Persona, Plan | Tab audience analysis and gap report. |
| personas.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Previous Prompts Used/personas-and-journeys/` | Persona | 5 gateway operator personas sourced from Discord/GitHub/Messari: Graduate, Provider, Builder, Enterprise, Broadcaster. |
| gateways.json | `workspace/research/claims/` | Content | JSON mapping content claims to gateway audiences. |

# Summary All Files Per Category

## Persona
4 canonical personas: (1) Self-Hosted Gateway Launcher (primary), (2) Platform Reseller/NaaP Builder, (3) Existing Operator Tuning, (4) Builder Graduating from API. Earlier sourced personas (5 from Discord/GitHub/Messari): Graduate, Provider, Builder, Enterprise, Broadcaster. No GPU background required; general web3/infrastructure knowledge assumed.

## Audience
Token: `gateway`. Self-identifies as "infrastructure operator", "platform engineer", "API gateway operator" — NOT "gateway operator". Requires explicit path disambiguation as first section. Entry blockers: path ambiguity, ETH prerequisite (0.36 ETH production on Arbitrum), remote signer prerequisite (off-chain).

## Journey
8-stage linear: (1) Orient to gateway role (discover), (2) Choose operational model (evaluate), (3) Understand payment layer (evaluate), (4a) On-chain setup / (4b) Off-chain setup (setup), (5) Configure routing/pricing (build), (6) Configure production ops (build), (7) Run in production (operate), (8) Improve efficiency (optimise). Cross-tab: inbound from Developers/Solutions; outbound to Orchestrators/Developers/About.

## IA
13-section canonical structure (S1 Path Finder through S13 NaaP Platform). **PHASE 2 IA LOCKED.** Design flags: S11 may split (monitoring + operations checklist), S13 likely splits (evaluate + build). Parallel quickstarts (S4 on-chain / S5 off-chain) unanimous consensus. Current live: 98 pages, 98 missing lifecycleStage.

## Content
**ALL 13 PAGES WRITTEN** (9,482 words). ~48 veracity REVIEW markers. 98 existing v2 pages scanned. Pending: naming audit, full veracity pass, layout pass (MDX), universal pages, human review. Critical blockers: verify NaaP acronym, community remote signer endpoint, 0.36 ETH minimum.

## Prompt/Skill
3 AI runs + collation v2 applied. 45-term terminology lock. NaaP = "Network-as-a-Product" LOCKED. BYOC = "Bring Your Own Container" LOCKED. Check B APPROVED. "Most complete of any tab" per collation learnings.

## Plan
Phase 1 COMPLETE. Phase 2 IA LOCKED. Phase 3-10 content WRITTEN. Remaining: naming audit, veracity pass, layout pass, universal pages, human review sign-off. Most advanced tab in the pipeline.

AIM: consolidate all audience, personas, journeys for each tab & determine a final mapping.

# ALL FILES

Category = Persona, Audience, Journey, IA, Content, Prompt/Skill, Plan

| Name | Location | Category | Summary of File Contents |
|------|----------|----------|--------------------------|
| agent-v5-solutions-audience-design.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/solutions/zero-context-ai-results/v5/` | Audience, Persona, Journey, IA | v5 Agent run. 18-term TERMINOLOGY_LOCK for dual audiences (`founder` + `builder`). 5 personas: Video Product Builder (primary rank 9), AI Media Builder (rank 7), Integration Evaluator (rank 7), Active Builder (rank 8), Ecosystem Explorer (rank 3). 7 JTBDs covering evaluation, activation, feature building. 12-section structure (S1-S12): platform paths, capabilities, quickstart, livestream, VOD, access control, webhooks, AI pipelines start/build, use cases. S3 flagged for potential split. |
| glossary-solutions.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/solutions/input-pack/` | Content | 76 terms by tag (video:encoding, video:studio, technical:security, ai:concept, etc.). Livepeer roles, video concepts (Transcoding, HLS, Multistream), Studio objects (Stream, Asset, Playback ID), security (JWT, Signing Key), AI (Avatar, World Model, StreamDiffusion). Products: Daydream, Embody, Frameworks, Streamplace. VOD appears twice (duplicate, not conflict). |
| veracity-sources.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/solutions/input-pack/` | Prompt/Skill | Authority registry. Primary: Explorer, Arbiscan, source code (go-livepeer, livepeer-js, livepeer-ai-js). NaaP and governance-controlled values flagged for live verification. Staleness threshold ~18 months. |
| deprecated-terms.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/solutions/input-pack/` | Content | 5 role-term changes. 6 conflicting definitions. 7 high-staleness terms. 5 draft terms with thin definitions. |
| IA.mdx | `v2/solutions/_workspace/canonical/` | IA | Minimal canonical IA sketch (5 lines). Root to Portal + Navigation. Per-Solution template (Product Overview + Getting Started). Community Updates (automation broken). Resources (refine needed). Marked for refinement. |
| portal.mdx | `v2/solutions/` | Content, IA | Landing/frame-mode portal. `audience: platform-builder`. Hero: "Integrate Livepeer AI & Video", "Discover – Create – Run". Products: Daydream, Studio, Frameworks, Streamplace, Embody. YouTube demo embed (Daydream). Data imports from badges, infra, socials files. |
| master-status.mdx | `workspace/plan/active/SOLUTIONS-SOCIAL-DATA/` | Plan | Audit report. All 4 phases complete: Research & Config, Pipeline Extensions (5 fetch scripts, 3 GH Actions), Template & Pages (5 community pages live), Validation (frontmatter fixed, 31/38 URLs verified). `.env` credentials risk flagged. ~35 link conversion cleanup deferred. |
| plan.md | `workspace/plan/active/SOLUTIONS-SOCIAL-DATA/` | Plan | Master plan. 4 phases to build social/data-feed community pages for 5 products using reusable pipelines (YouTube, Discord, GitHub, RSS, Forum). 5 fetch scripts, 3 GH Actions, 1 config, 1 template, 5 community pages. Dependencies and risks documented. |
| (collated/ directory) | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/solutions/collated/` | — | **EMPTY.** No collated canonical document exists. |
| (learnings/ directory) | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/solutions/learnings/` | — | **EMPTY.** No learnings document exists. |

# Summary All Files Per Category

## Persona
5 personas from v5 run only: (1) Video Product Builder (primary rank 9), (2) Active Builder (rank 8, return-visit), (3) AI Media Builder (rank 7), (4) Integration Evaluator (rank 7, evaluation without building), (5) Ecosystem Explorer (rank 3). All self-identify as "developers" or "product builders" but cannot resolve to single path without S1 disambiguation.

## Audience
Dual tokens: `founder` (evaluating for product/business) and `builder` (active development using APIs/SDKs). Founders earlier in journey (evaluation); builders later (active use). Both share Solutions as primary tab.

## Journey
10-stage linear: (1) Orienting to platform, (2) Understanding how Livepeer works, (3) Evaluating fit, (4) First thing working, (5) Implementing livestream, (6) Implementing VOD, (7) Securing with access control, (8) Connecting to system (webhooks), (9) Using AI pipelines, (10) Validating before launch. On-demand: Playback ID format, encoding presets, webhook events, JWT signing, etc. Cross-tab: Home/About to Solutions (evaluation), Solutions to Developers (graduation), Solutions to Gateways (advanced).

## IA
v5 proposes 12-section structure (S1-S12). Canonical IA.mdx is minimal sketch (5 lines, marked for refinement). portal.mdx: data-driven product showcase with 5 products. Social data architecture: automated pipeline feeding community pages per product (YouTube, Discord, GitHub, RSS, Forum). Section count 12 justified by dual compute types and dual audience states.

## Content
portal.mdx live with hero + product cards. 5 community pages live via automated social data pipeline. 76-term glossary. Products documented: Daydream, Studio, Frameworks, Streamplace, Embody. ~35 external links need path conversion. `.env` credentials risk flagged. VOD duplicate glossary entries (cosmetic, not conflict).

## Prompt/Skill
1 v5 Agent run only. 18-term terminology lock. No collation, no learnings, no Check B. NaaP conflict flagged. AI pipeline and CLI flag staleness noted. Verify-against sources for AI-specific terms (livepeer-ai-js, go-livepeer, pytrickle, comfystream).

## Plan
**LEAST ADVANCED TAB.** Only 1 AI run completed. No collation exists. No Check B. IA.mdx is minimal sketch. Social data pipeline complete (4 phases done). Needs: 2nd+ model runs, collation, Check B, IA refinement, content authoring. `.env` security check required.

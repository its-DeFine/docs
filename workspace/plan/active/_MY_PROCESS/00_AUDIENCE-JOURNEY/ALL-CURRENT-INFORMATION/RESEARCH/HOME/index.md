AIM: consolidate all audience, personas, journeys for each tab & determine a final mapping.

# ALL FILES

Category = Persona, Audience, Journey, IA, Content, Prompt/Skill, Plan

| Name | Location | Category | Summary of File Contents |
|------|----------|----------|--------------------------|
| agent-v5-home-audience-design.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/home/zero-context-ai-results/v5/` | Persona, Audience, Journey | v5 Agent run. Home as multi-audience routing tab. 6 personas: Complete Newcomer, Evaluating Builder, Curious GPU Operator, Token Investor, Protocol Researcher, Community Contributor. Primary function: "What is this, and where do I go?" No single persona. TERMINOLOGY_LOCK, anchoring questions, persona path validation. |
| glossary-home.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/home/input-pack/` | Content | 63 terms classified by tag (ai:concept, ai:pipeline, web3:concept, livepeer:role, livepeer:product, economic:payment, video:encoding, etc.). Covers agents, AI pipelines, blockchain terms, roles, products (Daydream, ComfyStream), upgrades (Cascade, Confluent, Delta). |
| veracity-sources.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/home/input-pack/` | Prompt/Skill | Four-tier source authority (primary/acceptable/lead/not-permitted). Maps claim types to sources. High-staleness terms flagged. |
| deprecated-terms.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/home/input-pack/` | Content | 5 deprecated role terms. 6 conflicting definitions (pageType, purpose, audience tokens, etc.). 7 high-staleness terms. 5 draft terms not use-ready (AI Video, Ephemeral Compute, veLPT). |
| index.mdx | `v2/home/` | IA | Auto-generated TOC. Structure: Get Started, Mission Control, Primer, Trending Topics. Subdirectories: about-livepeer/ (5 pages), get-started/ (4 pages), resources/compendium/, solutions/ (4 pages). |
| get-started.mdx | `v2/home/` | Journey, Content | Primary entry point with audience segmentation. 6 persona routing groups: Newcomer, Developer, GPU Provider, User/Creator, LPT Holder, Company, Researcher. Each mapped to 2-3 discovery cards with icons and links. Includes mermaid journey map diagram. Purpose: guide unoriented newcomers to correct role path within two clicks. |
| ai-pipelines.mdx | `v2/home/get-started/` | Content | **STUB** — "Coming Soon". No content. Placeholder for AI quickstart pathway. |
| build-on-livepeer.mdx | `v2/home/get-started/` | Content | **STUB** — "Coming Soon". Placeholder for developer build pathway. |
| stream-video.mdx | `v2/home/get-started/` | Content | **STUB** — "Coming Soon". Placeholder for video streaming pathway. |
| use-livepeer.mdx | `v2/home/get-started/` | Content | **STUB** — "Coming Soon". Placeholder for general usage pathway. |
| mission-control.mdx | `v2/home/` | IA, Journey | Landing page with Starfield hero and Daydream GIF. 9-card navigation routing: Learn About Livepeer, Stream Video, Run AI Pipelines, Earn From GPU, Connect With Community, Explore Projects, Run Gateway, Learn About Delegators, Explore Opportunities. |
| primer.mdx | `v2/home/` | Content, Persona | 10-minute primer. Covers: What is Livepeer (open video compute layer for AI), Why Livepeer (80% internet traffic, AI+video convergence), What you can build (remix live video, stream, real-time inference, ComfyUI, earn by nodes/staking), Who uses Livepeer (developers, creators, orchestrators, enterprises). Current use cases: Daydream, MetaDJ, TouchDesigner, Farcaster apps. |
| 04-tab-home.md | `workspace/plan/active/_MY_PROCESS/00_AUDIENCE-JOURNEY/ALL-CURRENT-INFORMATION/FULL-FILES/TABS/` | Audience, Journey, Plan | Primary persona: "The Unoriented Newcomer" (no role assumption). All other personas pass through or return. Current inventory: root level (6 files), about-livepeer/ (5 files). Gap analysis: roadmap.mdx is stub (1.8KB), AI pivot needs front-centre framing (AI inference >70% of protocol fees), trending has stale risk, get-started/ has 4 stubs. |

# Summary All Files Per Category

## Persona
Primary: **The Unoriented Newcomer** — arrived via DePIN articles, social media, friend recommendation, CoinGecko. No role assumption yet. Drives design: "What is this, and where do I go?" 6 secondary personas pass through: Evaluating Builder, Curious GPU Operator, Token Investor, Protocol Researcher, Community Contributor, Complete Newcomer. Home is intentionally multi-audience. Vocabulary is the primary blocker for newcomers.

## Audience
Multi-audience at `discover` stage (matching About tab). All 7 persona types present. Explicitly NOT assuming technical background. Content must work for crypto-curious non-developers AND sophisticated technical readers.

## Journey
6 user journeys by persona: (1) Newcomer: Showcase to projects to ecosystem understanding, (2) Developer: AI integration OR custom pipelines OR build business, (3) GPU Provider: Orchestrators OR Data Centre, (4) User/Creator: Stream/broadcast via Daydream/Studio, (5) LPT Holder: Delegate OR governance, (6) Company: Ecosystem partnerships OR contact, (7) Researcher: Whitepaper OR blog. Each surfaces in discovery cards. Goal: correct role path within two clicks.

## IA
Current structure: index.mdx (auto TOC), mission-control.mdx (9-card routing hub), primer.mdx (10-min overview), get-started.mdx (6-persona routing), trending.mdx (stale risk), about-livepeer/ (vision, evolution, ecosystem 25.7KB, benefits, roadmap 1.8KB STUB), get-started/ (4 STUBS), solutions/ (4 pages), resources/compendium/ (glossary). Section count ~8, appropriate for routing/landing tab.

## Content
Strongest: primer.mdx (comprehensive platform explanation), mission-control.mdx (9-card routing). Weakest: roadmap.mdx (1.8KB stub), 4 get-started/ stubs ("Coming Soon"). AI pivot story needs elevation in evolution narrative (AI inference >70% of protocol fees). Trending has stale risk.

## Prompt/Skill
1 v5 Agent run only. TERMINOLOGY_LOCK, anchoring questions established. Persona path validation complete. Source authority registry with four-tier system and governance-controlled value verification rules.

## Plan
Only 1 AI run completed (v5). No collation or Check B yet. Critical gaps: roadmap stub, 4 get-started stubs, trending stale risk. Need 2nd model run before collation. AI pivot narrative needs front-centre framing.

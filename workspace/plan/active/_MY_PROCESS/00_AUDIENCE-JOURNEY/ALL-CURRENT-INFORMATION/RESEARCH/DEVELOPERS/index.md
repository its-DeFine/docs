AIM: consolidate all audience, personas, journeys for each tab & determine a final mapping.

# ALL FILES

Category = Persona, Audience, Journey, IA, Content, Prompt/Skill, Plan

| Name | Location | Category | Summary of File Contents |
|------|----------|----------|--------------------------|
| canonical-developers-audience-design.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/developers/collated/` | Audience, Persona, Journey, IA | **CANONICAL.** Synthesised from 2 runs (Claude Web v4, ChatGPT v4). 4 personas: API integrator (primary, rank 9), Interactive Media Builder (rank 8), Custom Model Porter (rank 8), Protocol integrator (rank 5-6). 7 JTBDs. 9-section structure with design flags for S6 (real-time/custom split) and S7 (verify/troubleshoot/optimize split). 16-term TERMINOLOGY_LOCK with verify-against flags. Entry blocker: path ambiguity resolved by S1 disambiguation. |
| collation-notes-developers.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/developers/collated/` | Prompt/Skill | 2-run collation. No major terminology conflicts. 5 structural disagreements: S6 split (1 vs 2 sections), video/AI separation, protocol section framing, surface mapping, real-time/custom. Claude strength: terminology precision. ChatGPT strength: section exit-state specificity. NaaP conflict caught by Claude only. |
| agent-v5-developers-audience-design.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/developers/zero-context-ai-results/v5/` | Audience, Persona, Journey, IA | v5 Agent run. Phase 0 anchors, arriving question, personas, jobs, journey, section structure. Follows canonical v5 pattern. |
| chatgpt-v4-developers-audience-design.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/developers/zero-context-ai-results/v4/` | Audience, Persona, Journey, IA | ChatGPT v4. 12-section structure (vs Claude's 9). Primary persona "Fast Feature Shipper" (rank 9). Splits real-time/custom into two sections (S6 + S7). Splits post-build into verify/diagnose/tune (S10-S12). Adds auth/events section (S9). Strong exit-state specificity but misses NaaP conflict. |
| claude-webv4-developers-audience-design.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/developers/zero-context-ai-results/v4/` | Audience, Persona, Journey, IA | Claude Web v4. 9-section structure. Primary "API integrator" (rank 9). Single S6 with design flag for split. Strongest on terminology precision and false-familiarity disambiguation (Pipeline = named workload type, not chained operations). Flags NaaP conflict. |
| glossary-developers.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/developers/input-pack/` | Content | 83 terms. AI pipeline types (text-to-image, live-video-to-video, image-to-video), tools (ComfyStream, PyTrickle, BYOC), SDKs (Livepeer.js, livepeer-python-gateway). NaaP defined as "Network as a Platform" (status current). |
| v4.md (learnings) | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/developers/learnings/` | Prompt/Skill | Section count gap widest: 9 vs 12. S6 split correctly predicted by design flag. Post-build 1 vs 3 sections. NaaP conflict caught by Claude only. ChatGPT persona splits more precise (Interactive Media Builder + Custom Model Porter). |
| developers-content-scan.md | `workspace/plan/active/CONTENT-WRITING/context-packs/` | Content, IA | 28 pages in nav. 12 draft, 6 current, 11 deprecated pageType, 24 incomplete frontmatter. Portal (landing, deprecated pageType), developer-journey (primary router), 5 concept pages (mostly draft), 6 quickstart/tutorial, 5 build guides, 4 guide pages. |
| developers-research-pack.md | `workspace/plan/active/CONTENT-WRITING/context-packs/` | Content, Research | v1 (Studio-focused, 26 pages) + v2 (full platform, 28+ pages). SDKs: TypeScript/JS, Go, Python. Blocked content: AI model_id default, ComfyStream framing, go-livepeer BYOC flags. |
| developers-v1-content.md | `workspace/plan/active/CONTENT-WRITING/context-packs/` | Content | 45 v1 MDX files. All v1 is Studio API specific. 26 guides, core concepts, 5 integration tutorials. |
| developers-full-content.md | `workspace/plan/active/CONTENT-WRITING/context-packs/` | Content | 112 v2/developers files. Portal, journey (5 tabs), concepts (AI, dev stack, OSS, gateway, video), quickstarts, build guides, tools, guides, opportunities, resources. Archive included. |
| developers-ia-prereq.md | `workspace/plan/active/CONTENT-WRITING/context-packs/` | IA | 28 active files. 6 nav groups. 13 orphan files not in docs.json. 4 pages missing pageType. |
| audience-design.md | `workspace/plan/active/CONTENT-WRITING/collated/developers/` | Audience, Persona, Journey | Canonical audience design. 4 personas, 7 jobs, 8-stage journey, 9-section structure. Primary: API integrator / Fast Feature Shipper. |
| ia-prereq.md | `workspace/plan/active/CONTENT-WRITING/collated/developers/` | IA | Pre-IA reference with folder tree, nav structure, discrepancy audit. |
| collation-notes.md | `workspace/plan/active/CONTENT-WRITING/collated/developers/references/` | Prompt/Skill | Collation details. Terminology, personas, sections, structural disagreements. |
| developer-journey.mdx | `v2/developers/` | Journey, Content | Live page: "Find your path on Livepeer." 5 tabs: video, AI on video, gateway, GPU, protocol extension. Three deeper paths: Workload Provider, Consumer, Core Contributor. Mermaid diagram. Status: current. |
| portal.mdx | `v2/developers/` | Content | Landing: "Build on Livepeer." Hero with Starfield. Promises "custom AI pipelines, agents, AI video, live-stream." Deprecated pageType. |
| journey-mapping.mdx | `v2/developers/_workspace/archive/` | Journey | Archived journey mapping. Developer type categorisation: Service integrator, Application developer, OSS builder. |
| developer-journey-3path.mdx | `v2/developers/_workspace/archive/` | Journey | Archived 3-path variant (Workload Provider, Consumer, Core Contributor). |
| journey-mapping.mdx | `v2/developers/_workspace/context-data/new/developers-new/` | Journey | Candidate/new journey mapping. Phase 2 draft or improvement on live version. |
| personas.mdx | `v2/internal/overview/` | Persona | Developer persona definition. 5-stage journey: Awareness to Orientation to Activation to Progression to Hero. Maps developer modes to concrete roles (hosted gateways to App Developer, self-hosted to Gateway Operator, protocol to Protocol Developer). |
| 03-tab-developers.md | `workspace/plan/active/_MY_PROCESS/00_AUDIENCE-JOURNEY/ALL-CURRENT-INFORMATION/FULL-FILES/TABS/` | Journey, Persona, Plan | Tab summary. Developer personas and journey analysis. |

# Summary All Files Per Category

## Persona
4 canonical personas: (1) API integrator / Fast Feature Shipper (primary, rank 9), (2) Interactive Media Builder (rank 8, real-time latency-sensitive), (3) Custom Model Porter (rank 8, has model/container, needs packaging), (4) Protocol integrator / toolmaker (rank 5-6). Critical: "developer" does NOT route to one path — requires S1 disambiguation. 4 materially different arriving states with different SDKs and success criteria.

## Audience
Token: `developer`. Self-identifies as "software engineer", "backend developer", "ML engineer", "AI developer" — NOT Livepeer labels. Critical terminology divergences from industry defaults: Gateway = demand-side actor (not proxy), Orchestrator = GPU node (not scheduler), Pipeline = named workload type (not chained operations), BYOC = custom AI workload (not generic containers).

## Journey
8-stage linear: (1) Discover — find build track, (2) Evaluate — map surface, (3) Setup — first working request, (4) Build video — live/VOD pipeline, (5) Build AI — AI pipeline, (6) Build advanced — real-time/custom (PyTrickle/BYOC), (7) Operate — verify/troubleshoot/optimize, (8) Optimize — understand protocol. On-demand: SDK methods, model IDs, error codes, rate limits, webhook schemas, auth patterns. Cross-tab: inbound from Solutions/Home/About; outbound to Gateways/Orchestrators/About.

## IA
9-section canonical structure (S1 Choose build track through S9 Reference). **BLOCKING OPEN ITEM**: S6 real-time vs custom — split into 1 or 2 sections? ChatGPT confirmed split. Also pending: S7 split (verify/diagnose/tune), auth/events placement, Studio vs self-hosted disambiguation in S1. Current live: 28 pages in 6 nav groups with 13 orphans.

## Content
V1: 45 files, all Studio API specific. V2: 112 files across portal, journey, concepts, quickstarts, build guides, tools, opportunities, resources. 12 draft, 6 current, 10+ stubs, 24 incomplete frontmatter, 11 deprecated pageType. Key blockers: video-quickstart empty, sdk-gateway empty, setup-paths empty, model_id defaults unspecified, ComfyStream framing unresolved.

## Prompt/Skill
2 v4 runs + v5 agent. 16-term terminology lock. Claude: strongest on terminology precision, NaaP conflict detection. ChatGPT: strongest on granularity and exit-state specificity. Recommended pairing: Claude first for terminology, ChatGPT second for granularity. Widest section count variance: 9 vs 12.

## Plan
Phase 1 output complete. Phase 2 gated on 5 open items: S6 split decision (BLOCKING), S7 split, auth/events placement, Studio vs self-hosted disambiguation, reference section placement. Empty pages to fill: video-quickstart, setup-paths, sdk-gateway, video-on-livepeer.

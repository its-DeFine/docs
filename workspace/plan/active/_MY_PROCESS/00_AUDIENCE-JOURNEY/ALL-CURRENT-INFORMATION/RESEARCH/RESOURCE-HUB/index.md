AIM: consolidate all audience, personas, journeys for each tab & determine a final mapping.

# ALL FILES

Category = Persona, Audience, Journey, IA, Content, Prompt/Skill, Plan

| Name | Location | Category | Summary of File Contents |
|------|----------|----------|--------------------------|
| agent-v5-resource-hub-audience-design.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/resource-hub/zero-context-ai-results/v5/` | Audience, Journey, IA | v5 Agent run. Primary audience `community` (cross-audience qualification). 4 personas: Cross-Tab Reference Seeker (primary), Protocol Researcher, Governance Participant, New Arrival. 7 JTBDs: term lookup, claim verification, source discovery, governance tracking, ecosystem discovery, citation support, deep mechanism study. 10-section structure. 20-term TERMINOLOGY_LOCK with verify flags. All personas unblocked. |
| glossary-resources.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/resource-hub/input-pack/` | Content | 103 terms by domain (livepeer:protocol, livepeer:contract, ai:concept, video:encoding, web3:chain, etc.). Covers roles, protocol mechanics, smart contracts (BondingManager, BondingVotes, Governor, Controller), AI/video concepts, governance (LIP, SPE, Treasury). Deprecated: Broadcaster with modern equivalent. Each entry tagged and mapped to resource pages. |
| veracity-sources.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/resource-hub/input-pack/` | Prompt/Skill | Source Authority Registry. 4 tiers (primary/acceptable/lead/not-permitted). Maps claim types to minimum veracity level. Critical: no governance-controlled values hard-coded. High-staleness values: Active Set size, unbonding period, target bonding rate, inflation rate, treasury reward cut, AI pipeline types, CLI flags. |
| deprecated-terms.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/resource-hub/input-pack/` | Content | 18 term issues across 3 categories: role renames (5), conflicting definitions (6), high-staleness terms (7). Draft terms: AI Video, Ephemeral Compute, veLPT. Usage directive: deprecated prohibited in new content. |
| resources-portal.mdx | `v2/resources/` | IA, Content | Resource Portal landing page. `audience: everyone`, `pageType: landing`. Minimal body: "Resources Portal / All resources and references in one place!" Hub landing directing to glossary, primary sources, governance, curated external resources. |
| (collated/ directory) | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/resource-hub/collated/` | — | **EMPTY.** No collated canonical document exists. |
| (learnings/ directory) | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/resource-hub/learnings/` | — | **EMPTY.** No learnings document exists. |

# Summary All Files Per Category

## Persona
4 personas from v5 only: (1) Cross-Tab Reference Seeker (primary, highest volume — arrives from role tabs seeking definition/concept clarity), (2) Protocol Researcher (external entry via web search/whitepapers), (3) Governance & Ecosystem Participant (forum/community arrival, seeks LIPs and treasury data), (4) New Arrival Doing Orientation (lowest depth — Resource Hub is poor first stop, routes away quickly).

## Audience
Token: `community` (with cross-audience qualification — serves all audience tokens at reference + evaluate lifecycle stages). Not single-role; serves Orchestrator, Gateway, Delegator, Developer, Founder readers arriving from role tabs. Self-identification: "someone with a question" — disambiguates by question type, not persona.

## Journey
Arriving question: "I've seen a term / claim / resource pointer — where do I find the authoritative source?" Entry blocker: navigational only (no wallet/stake required). Linear: (1) Arriving with question, (2) Identifying resource type, (3) Locating specific entry/document, (4) Verifying claim against authoritative source. On-demand return use: glossary, changelog, LIP index, contract address lookups, AI framework links, video standards references. 7 JTBDs.

## IA
10-section structure (S1 routing through S10). S1 disambiguates by question type (glossary vs primary source vs governance vs curated links). S2 Glossary (103 current terms). S3 Protocol Primary Sources. S4 How to Read Livepeer Sources (authority framework). S5-S8 detailed design phase. S9-S10 universal constants (glossary, FAQ, changelog, guide). Current live: resources-portal.mdx as minimal hub landing.

## Content
103-term glossary ready for template population. Veracity-sources provides content review checklist. Deprecated-terms provides terminology validation list. Portal is minimal ("All resources in one place!"). Strongest asset: comprehensive glossary with domain tagging.

## Prompt/Skill
1 v5 Agent run only. 20-term TERMINOLOGY_LOCK. 7 terms with industry-default meanings diverging from Livepeer (Gateway, Orchestrator, Round, Delegation, Pipeline, Inflation). No collation, no learnings, no Check B.

## Plan
**EARLY STAGE.** Only 1 AI run. No collation, no learnings, no Check B. IA is draft from v5 only. 103-term glossary is strong asset ready for population. Portal needs expansion. Needs: 2nd+ model runs, collation, Check B, section content authoring.

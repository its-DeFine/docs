AIM: consolidate all audience, personas, journeys for each tab & determine a final mapping.

# ALL FILES

Category = Persona, Audience, Journey, IA, Content, Prompt/Skill, Plan

| Name | Location | Category | Summary of File Contents |
|------|----------|----------|--------------------------|
| agent-v5-community-audience-design.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/community/zero-context-ai-results/v5/` | Audience, Persona, Journey, IA | v5 Agent run. 5 personas: Engaged Holder, Contribution Seeker, Ecosystem Newcomer, Protocol Researcher, Active Contributor. 21-term TERMINOLOGY_LOCK. 11-section structure (S1-S11): Participation paths, governance concepts, voting, proposal writing, treasury, funded work, SPEs/workstreams, community calls, forums/channels, ecosystem projects, technical contribution. GWID and LISAR glossary conflicts flagged. |
| chatgpt-v4-community-audience-design.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/community/zero-context-ai-results/v4/` | Audience, Persona, Journey, IA | ChatGPT v4 run. 5 personas: First-time ecosystem participant (primary rank 9), Active contributor, Governance participant, Funded-work seeker, Ecosystem mapper. 18-term TERMINOLOGY_LOCK with forum-verification markers on Grant, Bounty, RFP, Treasury Talk, Dev Call. 9-section structure. **Strongest arriving question in test suite**: "What is the right participation path for me right now, and what exact first step should I take?" |
| glossary-community.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/community/input-pack/` | Content | Dense glossary (10,436 tokens). Governance, LPT, Treasury, SPE, LIP, Delegation, Bonding, Orchestrator, Gateway, and ecosystem-specific vocabulary. Used as lead source per verification rules. |
| veracity-sources.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/community/input-pack/` | Prompt/Skill | Three-tier source authority. Forum acceptable as primary for proposals not yet formalised. Explorer primary for live governance state. Prohibits social media, undated wikis, anonymous posts. |
| deprecated-terms.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/community/input-pack/` | Content | Deprecated role terms. veLPT explicitly excluded (proposal not implemented). High-staleness terms flagged. Draft terms not to use without verification. |
| v4.md (learnings) | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/community/learnings/` | Prompt/Skill | Single ChatGPT run analysis. S1 `pageType: navigation` triggered correctly. Source verification on 5 forum-dependent terms. Arriving question strongest in suite. veLPT correctly excluded. MEDIUM: persona path validation shallow on late-entry governance participants. Recommended: second model run before collation. |
| community-tab-02-audience-and-purpose.md | `v2/community/_workspace/research/` | Audience, Persona, Journey | **FOUNDATIONAL.** First-principles audience analysis (Questions 1-10). Community tab = **participation infrastructure** converting interest into active ecosystem role. 7 personas ranked by likelihood: Curious Newcomer, Active Delegator, Governance Participant, Potential Contributor, Existing Orchestrator, Ecosystem Observer, AI/GPU Builder. Voice register: "invitational and directional" — outcome-forward, no hype. Delivery: scannable cards for newcomers, structured explainers for governance, categorised pathways for contributors. |
| community-tab-05-final-ia-and-pages.md | `v2/community/_workspace/research/` | IA, Content, Plan | **FINAL IA.** 14-page structure across 5 sections + portal/FAQ. Hub: Portal, FAQ. This Community: Who's Here, Guidelines. Shape the Network: Governance Participation, Workstreams. Get Involved: Ways to Contribute, Opportunities. Connect: Channels, Events, News. Ecosystem: Tools, Guides. **Handoff map**: governance mechanics to LP Token tab, protocol governance to About, code contribution to Developers. Staleness risk register with mitigation rules. |
| 06-tab-community.md | `workspace/plan/active/_MY_PROCESS/00_AUDIENCE-JOURNEY/ALL-CURRENT-INFORMATION/FULL-FILES/TABS/` | Audience, Journey, IA, Plan | Current inventory audit. Root: index, community-portal (6.9KB), faq (7.7KB). livepeer-community/: guidelines (19.7KB), governance-and-foundation (14KB), latest-topics (3.9KB stale risk), trending (6.8KB stale risk), roadmap (2KB stub — duplicate risk with Home). Gap: livepeer-connect critical for finding community. Duplication risks: roadmap with Home, FAQ with other tabs, governance with About. |
| community-tab-04-context-and-recalibration.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Previous Prompts Used/derive-ia/` | IA | Cross-tab ownership analysis. Community recalibrated from 20 to 14 pages after removing content that belongs in other tabs. |
| community-tab-05-final-ia-and-pages.md | `workspace/plan/active/CONTENT-WRITING/Prompts/Previous Prompts Used/derive-ia/` | IA | Final Community structure with 14 pages. May be superseded by v2/community/_workspace version. |
| (collated/ directory) | `workspace/plan/active/CONTENT-WRITING/Prompts/Prompts-By-Phase/1-audience-design/testing/Tabs/community/collated/` | — | **EMPTY.** No collated canonical document exists yet for Community tab. |

# Summary All Files Per Category

## Persona
Both v5 and v4 identify 5 personas. v5: Engaged Holder (governance voting, time-sensitive), Contribution Seeker, Ecosystem Newcomer, Protocol Researcher, Active Contributor. v4: First-time Ecosystem Participant (primary rank 9), Active Contributor, Governance Participant, Funded-work Seeker, Ecosystem Mapper. Primary persona decision unresolved: Engaged Holder (v5, governance distinctive) vs First-time Participant (v4, strongest arriving question). Self-identification: "community member" does NOT route to single path — dedicated S1 disambiguation required.

## Audience
Token: `community`. Tab = **participation infrastructure** converting visitor interest into active ecosystem role. Structurally multi-persona — only tab legitimately serving 5+ distinct personas simultaneously without collapsing them. Arriving question: "I want to get involved — how do I actually participate, and where do I start?"

## Journey
Linear (7-8 stages): Orienting to paths → Understanding governance model → Participating in governance → Understanding treasury → Finding funded opportunities → Joining community spaces → Contributing to initiatives. On-demand: live proposals, voting deadlines, active SPEs, open grants/bounties, community calls (Dev Call, Treasury Talk), LIPs repo. Cross-tab: inbound from Home/About/Delegators/Orchestrators; outbound to Delegators/About/Resource Hub/Developers.

## IA
v5: 11 sections (S1-S11). v4: 9 sections. Published IA (workspace research): 14 pages in 5 sections (Hub, This Community, Shape the Network, Get Involved, Connect, Ecosystem). **Handoff map**: governance mechanics to LP Token, protocol governance to About, code contribution to Developers. Staleness mitigation: info changing faster than quarterly routes to live source. Current live: portal, FAQ, guidelines (19.7KB), governance-and-foundation (14KB), plus stale-risk pages.

## Content
Voice register: invitational and directional — outcome-forward, concise, factual, no hype. No "thriving community" language. Active CTAs, progressive disclosure. Current: guidelines (19.7KB, comprehensive), governance-and-foundation (14KB, good), FAQ (7.7KB). Stale-risk: latest-topics, trending. Stub: roadmap (2KB, duplicate risk with Home). livepeer-connect/ critical for finding Discord/Forum/X/GitHub.

## Prompt/Skill
2 runs (v5 Agent, v4 ChatGPT). No collation yet — collated/ directory is EMPTY. 18-21 term terminology lock. Forum-verification markers on funding-route terms. Both runs pass quality gates. GWID and LISAR glossary conflicts flagged.

## Plan
**NO CANONICAL COLLATION EXISTS.** Needs: 2nd model run to bring to 3+ before collation; collation synthesis; Check B validation. Primary persona decision pending. Published IA (14-page structure) exists from earlier research but not yet validated against Phase 1 audience design outputs.

# Per-Page Quality Check Report

**Page:** `v2/orchestrators/concepts/role.mdx`
**Date:** 2026-03-24
**Reviewer:** Claude Code (automated check)
**Checks framework:** `v2/orchestrators/_workspace/canonical/checks.mdx`
**Generated-file-banner:** NOT PRESENT — page is hand-authored. No generation script to read.

---

## Pre-flight Summary

- Page read: complete (319 lines)
- Checks framework read: complete
- Generated-file-banner: absent — no script to inspect
- Internal links spot-checked: all 6 unique link targets verified (see Section 8)
- Output directory created: `v2/orchestrators/_workspace/canonical/check/concepts/`

---

## 1. Frontmatter Table

| Field | Present? | Value | Pass/Fail | Notes |
|---|---|---|---|---|
| `title` | Yes | `The Orchestrator Role in the Livepeer Network` | PASS | Subject-first, descriptive |
| `sidebarTitle` | Yes | `Role` | PASS | Short, nav-appropriate |
| `description` | Yes | `What orchestrators are, how they fit into the Livepeer compute network, and how the role has evolved from video transcoding to AI inference.` | PASS | Subject-first, 148 chars, UK English, no self-reference |
| `pageType` | Yes | `overview` | **FAIL** | `overview` is a deprecated 12-type value. Check 1.2: must be one of the 7 canonical types: `concept`, `tutorial`, `guide`, `instruction`, `navigation`, `reference`, `resource`. Correct value: `pageType: concept` with `pageVariant: overview` |
| `audience` | Yes | `orchestrator` | PASS | Valid 7-token value |
| `purpose` | Yes | `overview` | **FAIL** | `overview` is not in the 15-value canonical set. Check 1.4: valid values are `orient`, `explain`, `learn`, `choose`, `evaluate`, `start`, `build`, `configure`, `operate`, `troubleshoot`, `verify`, `integrate`, `optimise`, `reference`, `update`. Correct value: `purpose: orient` or `purpose: explain` |
| `complexity` | **MISSING** | — | **FAIL** | Check 1.6 requires one of: `beginner`, `intermediate`, `advanced`. Not present. Add: `complexity: beginner` |
| `lifecycleStage` | **MISSING** | — | **FAIL** | Check 1.7 requires one of: `discover`, `evaluate`, `setup`, `build`, `operate`, `troubleshoot`, `optimise`. Not present. Add: `lifecycleStage: discover` |
| `keywords` | Yes | 9-item array (livepeer, orchestrator, orchestrator role, GPU node, video transcoding, AI inference, LPT staking, active set, pool operator, node operator) | PASS | Relevant, well-chosen |
| OG image block | Yes | All 5 fields: `og:image`, `og:image:alt`, `og:image:type`, `og:image:width`, `og:image:height` | PASS | Fallback image verified to exist on disk |
| `industry` | **MISSING** | — | **FAIL** | Required field per checks.mdx 1.9. Add: `industry: [technical, AI]` |
| `niche` | **MISSING** | — | **FAIL** | Required field per checks.mdx 1.10. Add: `niche: [web3, infrastructure]` |
| `veracityStatus` | **MISSING** | — | **FAIL** | Check 1.8 requires one of: `verified`, `unverified`, `stale`. Page has a TODO comment block and unverified factual claims. Add: `veracityStatus: unverified` |
| `status` | Yes | `current` | **CONDITIONAL FAIL** | Check 1.8: `status: current` requires `veracityStatus: verified` AND zero `{/* REVIEW: */}` flags. `veracityStatus` is missing and page contains a TODO block. `status: current` cannot stand as-is |
| `lastVerified` | Yes | `2026-03-15` | INFO | Not a canonical required field but not harmful |
| `pageVariant` | **MISSING** | — | INFO | If pageType is corrected to `concept`, add `pageVariant: overview` per check 1.3 |

**Frontmatter verdict: FAIL — 6 required fields missing or wrong (pageType, purpose, complexity, lifecycleStage, industry, niche, veracityStatus). status: current conflicts with missing veracityStatus.**

---

## 2. Categories 1–9

### Category 1 — Frontmatter & Taxonomy

| # | Check | Result | Notes |
|---|---|---|---|
| 1.1 | All 10 required fields present | **FAIL** | `complexity` and `lifecycleStage` missing. `pageType` and `purpose` are present but wrong values |
| 1.2 | `pageType` uses 7-type canonical schema | **FAIL** | Value `overview` is a deprecated 12-type value. Fix: change to `pageType: concept` and add `pageVariant: overview` |
| 1.3 | `pageVariant` valid if present | N/A — not present | If pageType corrected to `concept`, add `pageVariant: overview` |
| 1.4 | `purpose` uses 15-value canonical set | **FAIL** | Value `overview` is not in canonical set. Fix: `purpose: orient` (this page orients a new orchestrator reader to the role) |
| 1.5 | `audience` uses 7-token set | PASS | `orchestrator` is valid |
| 1.6 | `complexity` single canonical value | **FAIL** | Field is missing. Fix: add `complexity: beginner` |
| 1.7 | `lifecycleStage` single canonical value | **FAIL** | Field is missing. Fix: add `lifecycleStage: discover` |
| 1.8 | `veracityStatus` present and honest | **FAIL** | Field is missing. Page has TODO block and factual claims that are NOT-TESTED. Fix: add `veracityStatus: unverified` |
| 1.9 | `industry` array valid if present | **FAIL** | Field is missing. Fix: add `industry: [technical, AI]` |
| 1.10 | `niche` array valid if present | **FAIL** | Field is missing. Fix: add `niche: [web3, infrastructure]` |
| 1.11 | `description` well-formed | PASS | Subject-first, 148 chars, no self-reference, UK English |
| 1.12 | OG image block complete | PASS | All 5 OG fields present; fallback.png verified on disk |

**Category 1 verdict: FAIL — 7 issues**

---

### Category 2 — Voice & Copy

| # | Check | Result | Notes |
|---|---|---|---|
| 2.1 | UK English throughout | PASS | No US spellings found: "organised", no -ize endings, no "color/behavior/center" |
| 2.2 | Zero banned words | **FAIL** | Line 294: "differ significantly" — `significantly` is on the banned word list. Fix: replace with a concrete quantifier or remove |
| 2.3 | Zero banned phrases | PASS | No "This section covers", no "rather than", no "can generate"/"may produce" in value claims. No "etc." or "and so on" found |
| 2.4 | Zero banned constructions | **FAIL** | See Banned Construction Scan (Section 3) for full table. Line 291 ("Commercial Orchestrators serving application workloads…operate differently from solo GPU miners") — no banned construction here. Line 225 "Choose the setup that matches" — imperative, not banned. One value-claim "can" flagged at line 58 and 287 |
| 2.5 | Opening order correct | PASS | Page opens with AccordionGroup as a concept orientation device before prose — this is structurally sound for `concept` / `overview` pageType. Prose sections open with subject ("An Orchestrator is…", "Orchestrators are…") |
| 2.6 | Paragraph discipline | PASS | Paragraphs are single-job. Lead sentences state facts. Sections end on concrete statements, not hedges |
| 2.7 | Audience register correct | PASS | Peer-technical tone consistent throughout. Correct for `orchestrator` audience |
| 2.8 | Per-audience prohibited phrases absent | PASS | No "easy to set up", no "the network rewards you for" found |
| 2.9 | No passive value statements | PASS | Claims are concrete: "earn ETH for every job you process", "LPT inflation rewards for calling rewards each round", "top 100 Orchestrators by total bonded stake" |
| 2.10 | No hedging openers | PASS | AccordionGroup entry points and prose sections open with direct assertions |
| 2.11 | Terminology locked and consistent | **CONDITIONAL PASS** | Key terms used correctly: `active set`, `probabilistic micropayment tickets`, `LPT`, `pool worker`, `BYOC`. One note: "node operator" appears in keywords but the body uses "orchestrator" consistently — acceptable. `Cascade` appears in the timeline diagram (line 163) without definition — see check 4.5 |

**Category 2 verdict: FAIL — 2 issues: banned word `significantly` (line 294), one potential value-claim `can` (see Section 3). Cascade undefined at first use.**

---

### Category 3 — Section Naming & Headings

*(Full scoring table in Section 4 below)*

| # | Check | Result | Notes |
|---|---|---|---|
| 3.1 | Every heading scores ≥20/25 | **FAIL** | "Who Should Operate One" scores 15/25. "Related Pages" is a generic descriptor. See Section 4 for full breakdown |
| 3.2 | No generic descriptors as headings | **FAIL** | "Related Pages" (line 303) is a generic section label. Fix: change to `Next Steps` or `Concepts in This Section` |
| 3.3 | No literal contrast labels | PASS | No `X vs Y` headings. Accordion titles use "From a Cloud Background?" and "From an Ethereum Background?" — these are accordion *titles*, not headings. They contain question marks which violate heading rules; however, they are inside Accordion components, not H2/H3 headings, so the formal heading rule does not apply. Flagged as INFO |
| 3.4 | Domain-anchor rule applied | PASS | Headings include domain nouns: "Technical Role", "Network Role", "Deployment Types" |
| 3.5 | Heading names the concept, not examples | **FAIL** | "Who Should Operate One" describes the content by examples (miner, easy earner, pro operator, business). Fix: rename to `Operator Profiles` or `Target Operators` |
| 3.6 | Title well-formed | **FAIL** | `The Orchestrator Role in the Livepeer Network` is 7 words. Check 3.6 specifies 1–3 words, concept-derived. It is not a "safe generic label" but it is too long. Fix: `Orchestrator Role` (2 words, concept-derived, precise) |
| 3.7 | Sounds like an expert editorial choice | PASS for most | "Technical Role", "Network Role", "Deployment Types" are expert choices. "Related Pages" and "Who Should Operate One" are not |

**Category 3 verdict: FAIL — 4 issues**

---

### Category 4 — Page Structure & Content Architecture

| # | Check | Result | Notes |
|---|---|---|---|
| 4.1 | One purpose, one audience, one job | PASS | Page orients an `orchestrator` reader to the role definition, network position, and deployment options. Single coherent job |
| 4.2 | Purpose statement test | PASS | "This page lets the orchestrator reader understand what the orchestrator role is, where it sits in the network, and which deployment type matches their situation." — passes |
| 4.3 | PREV_PAGE / NEXT_PAGE adjacency correct | N/A — checked against docs.json position | Page is first in the Concepts section after the portal/navigator. Reader arrives from navigator. Next pages are capabilities, architecture, incentive-model — all consistent |
| 4.4 | No dead ends | PASS | Every major section links forward: capabilities, incentive-model, navigator, join-a-pool. CardGroup at bottom provides exit routes |
| 4.5 | Prerequisites stated or linked | **FAIL** | `Cascade` (line 163 in timeline diagram) is used without definition or link. `BYOC` (line 176) is used without definition at first use — it appears in the core responsibilities prose with no link or inline definition. Fix: add inline definition or link for both at first use: `BYOC (Bring Your Own Container)` and `Cascade (Livepeer's distributed CDN layer)` |
| 4.6 | Out-of-scope is clear | PASS | Page does not attempt to cover gateway operation, delegation, or SDK usage. Scope is contained |
| 4.7 | Information type per section correct | PASS | Section types: `conceptual` (Technical Role, Network Role), `evaluative` (Who Should Operate One), `reference-style` (Deployment Types table). All appropriate for `orient`/`explain` purpose |
| 4.8 | No content duplication from adjacent sections | PASS | No duplication found against adjacent concepts pages (capabilities, architecture) |
| 4.9 | Section orientation page present | N/A — this is a per-section check; the concepts section orientation is handled by the concepts entry point | |
| 4.10 | Cross-tab links at journey intersections | **FAIL** | No cross-tab links present. The page references Delegators (LPT staking, reward cut/fee cut shared with delegators) and Gateways (orchestrator selection, ServiceRegistry) but no links to `v2/gateways/` or `v2/lpt/` exist. At minimum, one cross-tab link to the Delegators tab where delegator staking to orchestrators is mentioned, and one to Gateways tab where Gateway selection is discussed |

**Category 4 verdict: FAIL — 2 issues: BYOC/Cascade undefined at first use; no cross-tab links**

---

### Category 5 — Layout, Components & Template

| # | Check | Result | Notes |
|---|---|---|---|
| 5.1 | Correct template for pageType + pageVariant | **FAIL** | Page uses `pageType: overview` (deprecated). If corrected to `pageType: concept`, the page structure is appropriate: AccordionGroup for entry orientation, prose H2 sections, Mermaid diagrams, StyledTable, CardGroup — all match the `concept` preferred template |
| 5.2 | Required sections present | PASS | `concept` pageType requires Overview. The AccordionGroup at top functions as orientation/overview. H2 prose sections provide depth. CardGroup provides exit routing |
| 5.3 | Only approved components used | **FAIL** | See Component Matrix (Section 6). `CenteredContainer` is not in the Preferred column for `concept` pageType. `ScrollableDiagram` is not listed in the canonical component matrix — flag for verification |
| 5.4 | Avoided components absent | **FAIL** | TODO block present in a JSX comment at lines 30–44. Check 8.6 / 5.4 prohibit TODO/TBD placeholders in publishable pages. The TODO block contains human action items (media, fact-check). Fix: move to `_workspace/` or resolve before shipping |
| 5.5 | Information type → component mapping correct | PASS | Conceptual content in prose/Note. Reference-style Deployment Types in StyledTable. Multi-path orientation in AccordionGroup. All correct |
| 5.6 | MDX renders clean | NOT-TESTED — no local render run. Structurally the JSX appears well-formed: AccordionGroup/Accordion are used correctly (no ScrollableDiagram import missing — it is imported at line 49). All tags appear closed | |
| 5.7 | No old-schema frontmatter | **FAIL** | `pageType: overview` is a deprecated 12-type value. `purpose: overview` is a deprecated alias. (See Category 1) |
| 5.8 | CSS uses custom properties only | PASS | All Mermaid colour values are hardcoded hex per the TODO comment at line 33 which acknowledges this is expected ("must be hardcoded — see snippets/components/config/MermaidColours.jsx"). No other inline styling found |
| 5.9 | Generated file banners intact | N/A — page is hand-authored, no banner expected | |
| 5.10 | Component naming/import conventions | PASS | PascalCase imports, semantic directories, correct paths verified |

**Category 5 verdict: FAIL — 4 issues: deprecated pageType/purpose, CenteredContainer/ScrollableDiagram not in canonical preferred list, TODO block in publishable page**

---

### Category 6 — Veracity & Factual Accuracy

Claims inventory and test status:

| Claim | Line(s) | Type | Status | Notes |
|---|---|---|---|---|
| "top 100 Orchestrators by total bonded stake are eligible to receive work in any given round" | 195–196 | factual | NOT-TESTED | Active set size is a protocol parameter. Source needed: BondingManager contract or official Livepeer docs. Likely correct but must be cited |
| "AIServiceRegistry contract" | 160 | technical | NOT-TESTED | Contract name should be verified against Arbitrum deployment. go-livepeer repo or Livepeer contract addresses page needed |
| "ServiceRegistry contract on Arbitrum" | 201 | technical | NOT-TESTED | Same contract as above — name inconsistency between lines 160 ("AIServiceRegistry") and 201 ("ServiceRegistry"). One is wrong. CRITICAL to resolve before shipping |
| "BondingManager, RoundsManager, TicketBroker, and ServiceRegistry contracts on Arbitrum" | 215–216 | technical | NOT-TESTED | All four contract names need verification against live Arbitrum deployment |
| "Gateways interact only with TicketBroker and ServiceRegistry" | 216–217 | factual | NOT-TESTED | This is a strong scoping claim. Needs verification against Gateway implementation |
| Timeline dates: "2017–2020 Transcoder era", "2021–2023 Orchestrator model", "Q3 2024 AI subnet launches" | 150–165 | factual | NOT-TESTED | Historical dates need verification against official Livepeer blog/announcements |
| Mermaid diagrams (all 4) | 62–82, 95–107, 120–137, 204–211 | conceptual | NOT-TESTED | Diagrams represent conceptual relationships not specific protocol facts. Medium standard required. Appears accurate based on known Livepeer architecture |
| "Slash risk comes from performance failures and protocol behaviour" | 91 | factual | NOT-TESTED | LIP or protocol docs needed to confirm slash conditions |

**Critical veracity issue:** Line 160 names `AIServiceRegistry` contract. Line 201 names `ServiceRegistry` contract. These appear on the same page in adjacent sections and cannot both be correct. This is the most severe veracity finding.

| # | Check | Result | Notes |
|---|---|---|---|
| 6.1 | Every factual claim citable | **FAIL** | 8 factual/technical claims are NOT-TESTED. Contract name conflict at lines 160 vs 201 is critical |
| 6.2 | Code/commands tested | N/A — no code blocks or CLI commands on this page | |
| 6.3 | No deprecated API usage | N/A — no API endpoints referenced | |
| 6.4 | Numbers are real | **FAIL** | "top 100" at line 195 is a specific number requiring citation. NOT-TESTED |
| 6.5 | REVIEW flags for unverified claims | **FAIL** | No `{/* REVIEW: */}` flags despite multiple unverified factual claims. The TODO block (lines 30–44) says "Review fact-check items" as a human task but does not use the canonical `{/* REVIEW: [claim] — [what needs checking] */}` format |
| 6.6 | `veracityStatus` honest | **FAIL** | Field is missing. If added, must be `unverified` |
| 6.7 | Authoritative vs AI-generated glossary | N/A — no glossary references in this page | |
| 6.8 | Source staleness check | **FAIL** | Timeline dates and contract names are from fast-changing sources. No staleness flag present |
| 6.9 | No open-ended research tasks | **FAIL** | The TODO block contains "Review fact-check items" as an open-ended human task with no named source or concrete next step |

**Category 6 verdict: FAIL — 5 issues. CRITICAL: contract name conflict (AIServiceRegistry vs ServiceRegistry) at lines 160 and 201.**

---

### Category 7 — Navigation & Information Architecture

| # | Check | Result | Notes |
|---|---|---|---|
| 7.1 | Page exists in docs.json | PASS | `v2/orchestrators/concepts/role` confirmed in docs.json line 2841 |
| 7.2 | Navigation matches file system | PASS | File exists at correct path, docs.json entry matches |
| 7.3 | Tab entry portal routes to all sections | N/A — section-level check, not per-page | |
| 7.4 | No structural orphans | PASS | Page is reachable from the Concepts section navigation |
| 7.5 | Audience journey complete | PASS | Page flows from navigator → role → capabilities → architecture → incentive-model — complete concept sequence |
| 7.6 | Cross-tab graduation paths exist | **FAIL** | No cross-tab links. Delegator staking connection (LPT bonding, reward cut) and Gateway selection connection are natural cross-tab intersections. Neither is linked |
| 7.7 | File in correct lane | PASS | `v2/orchestrators/concepts/role.mdx` — publishable content in correct lane |
| 7.8 | File naming conventions | PASS | No prefix required for concept pages; no `-index.mdx` suffix |
| 7.9 | `_workspace/` TTL compliance | N/A — publishable file, not workspace | |

**Category 7 verdict: FAIL — 1 issue: no cross-tab links (same root cause as 4.10)**

---

### Category 8 — Links & Rendering

Link verification (20% minimum — verified all 6 unique internal targets):

| Link target | Verified on disk? | In docs.json? | Status |
|---|---|---|---|
| `/v2/orchestrators/concepts/capabilities` | Yes | Yes (line 2842) | PASS |
| `/v2/orchestrators/concepts/incentive-model` | Yes | Yes (line 2844) | PASS |
| `/v2/orchestrators/navigator` | Yes | Yes (line 2834) | PASS |
| `/v2/orchestrators/guides/deployment-details/join-a-pool` | Yes | Yes (line 2890) | PASS |
| `/v2/orchestrators/concepts/architecture` | Yes | Yes (line 2843) | PASS |
| OG image `/snippets/assets/site/og-image/fallback.png` | Yes | N/A | PASS |

All snippet imports verified:
| Import | File exists? | Status |
|---|---|---|
| `/snippets/components/elements/links/Links.jsx` | Yes | PASS |
| `/snippets/components/wrappers/tables/Tables.jsx` | Yes | PASS |
| `/snippets/components/elements/spacing/Divider.jsx` | Yes | PASS |
| `/snippets/components/displays/diagrams/ZoomableDiagram.jsx` | Yes | PASS |
| `/snippets/components/wrappers/containers/Containers.jsx` | Yes | PASS |

| # | Check | Result | Notes |
|---|---|---|---|
| 8.1 | All internal links resolve | PASS | All 5 internal link targets verified on disk and in docs.json |
| 8.2 | All external links live | N/A — no external links on this page | |
| 8.3 | All snippet imports resolve | PASS | All 5 imports verified to exist |
| 8.4 | All images load | PASS | OG image path verified |
| 8.5 | Page renders without error | NOT-TESTED — no local render run. JSX appears structurally sound | |
| 8.6 | No TODO/TBD/Coming Soon in published content | **FAIL** | TODO block at lines 30–44 is in a JSX comment but still present in a publishable file. Fix: resolve or move to `_workspace/` notes |

**Category 8 verdict: FAIL — 1 issue: TODO block in publishable page**

---

### Category 9 — Process & Governance

| # | Check | Result | Notes |
|---|---|---|---|
| 9.1 | Human sign-off recorded | **FAIL** | No sign-off evidence in frontmatter or comments. `lastVerified: 2026-03-15` suggests a date but this is not a formal approval record |
| 9.2 | All consuming decisions in registry | NOT-TESTED — would require reading decision-registry.md to verify | |
| 9.3 | Gate prerequisites met | **FAIL** | Per CLAUDE.md and tab-status.md: Orchestrators tab has no IA Approved, no Terminology Lock, no Content Pass Open. This page has not passed required gates before being designated `status: current` |
| 9.4 | Phase ordering respected | NOT-TESTED | |
| 9.5 | Findings gathered before fixes | N/A — this is the first formal review | |
| 9.6 | Feedback routed | N/A — this is the first formal review | |

**Category 9 verdict: FAIL — gate prerequisites not met for `status: current` designation**

---

## 3. Banned Construction Scan

Every sentence containing "can", "may", "could", "might", "should":

| Line | Sentence | Word | Classification | Flag? |
|---|---|---|---|---|
| 58 | "Livepeer Gateways select your node based on price, capability, and stake weight. You advertise what you **can** run and at what price; the network sends you jobs." | can | procedural / capability descriptor (what the operator is able to advertise) | No — not a value claim about earnings/outcomes |
| 90 | "Slash risk comes from performance failures and protocol behaviour." | n/a | No modal verbs in this sentence | — |
| 115 | "You earn ETH for each completed job and LPT rewards for participating in the protocol each round." | n/a | No modal verbs | — |
| 225 | "Choose the setup that matches your hardware scale, workload mix, and operating model." | n/a | No modal verbs | — |
| 275–276 | "Existing GPU operators **can** direct spare capacity at video transcoding or AI inference and earn ETH for the work." | can | value-claim — asserting earnings from spare GPU capacity | **FLAG** — rewrite: "Existing GPU operators direct spare capacity at video transcoding or AI inference and earn ETH for each completed job." |
| 287–288 | "New capabilities are advertised automatically once configured." | n/a | No modal verbs | — |
| 291–294 | "Commercial Orchestrators serving application workloads (Daydream, Livepeer Studio, other products) operate differently from solo GPU miners. The incentives, pricing strategy, and operational requirements differ significantly." | n/a | No modal verbs here — `significantly` is the issue (see 2.2) | — |

**Summary:** 1 flagged value-claim use of "can" at line 275. No "may", "could", "might", or "should" found.

---

## 4. Heading Score Table

Rubric: Precision (5), Depth (5), Stability (5), Clarity (5), Conciseness (5). Pass threshold: 20/25.

| Heading | Level | Precision | Depth | Stability | Clarity | Conciseness | Total | Pass? |
|---|---|---|---|---|---|---|---|---|
| Technical Role | H2 | 4 — names the domain slice but "technical" is somewhat generic | 4 — signals implementation-level content | 5 — stable regardless of content changes | 5 — immediately understood | 5 — 2 words, zero padding | **23/25** | PASS |
| Network Role | H2 | 4 — correct domain slice, "network" disambiguates from technical | 4 — signals protocol-level content | 5 — stable | 5 — instantly understood | 5 — 2 words | **23/25** | PASS |
| Deployment Types | H2 | 5 — names the exact concept covered | 4 — signals categorisation-level content | 5 — stable even if new types are added | 5 — clear to target audience | 5 — 2 words | **24/25** | PASS |
| Who Should Operate One | H2 | 2 — does not name the concept, names the reader question | 2 — surface-level, FAQ-adjacent | 3 — "one" is a pronoun referencing context; unstable out of page | 3 — requires context to decode "One" | 3 — 4 words but uses indirect pronoun | **13/25** | **FAIL** — Fix: `Operator Profiles` (Precision 5, Depth 4, Stability 5, Clarity 5, Conciseness 5 = 24/25) |
| Related Pages | H2 | 1 — generic descriptor, could apply to any page on any site | 1 — no intellectual signal | 5 — stable but meaninglessly so | 3 — clear but empty | 4 — 2 words, but padding | **14/25** | **FAIL** — Fix: `Concepts in This Section` or `Further Reading` or simply remove H2 and leave CardGroup with its title |

**2 headings below threshold: "Who Should Operate One" (13/25) and "Related Pages" (14/25).**

Note: Accordion component titles ("From a Cloud Background?", "From an Ethereum Background?", "Neither? Here's the clearest mental model.", "The Miner — Can I earn from my GPU?", "The Easy Earner — Simplest path?", "The Pro Operator — Adding AI to an existing setup?", "The Business — Building at scale?") are not formal H2/H3 headings and are not scored under check 3.1. However, they contain question marks and em-dash-equivalent hyphens. The voice rules prohibit questions in headings; accordion titles are a grey area. Flag as INFO for human decision.

---

## 5. Spelling/Typo Check

Full visible text scanned including: frontmatter, accordion titles, Mermaid labels, prose sections, table cells, card descriptions, Note block, link labels.

**Findings:**
- Line 87: "closer to being a validator on a proof-of-stake chain than to running a simple Ethereum node - but the work is compute instead of consensus." — the hyphen in "node - but" should be connected as a sentence joiner. This is stylistic; not a typo. CLAUDE.md says no em dashes; a spaced hyphen here is borderline. Flag as INFO.
- Line 163: "Cascade" — capitalised as a proper noun in the diagram. Acceptable as a product name.
- Line 296: `{/* TODO: Link to the commercial orchestrator page once it exists. */}` — TODO comment without a named page target or timeline. See check 8.6.
- No spelling errors or typos found in prose text.

**Verdict: No typos found. One style note (spaced hyphen at line 87). One process note (TODO without target at line 296).**

---

## 6. Component Matrix

| Component | Used? | Appropriate for `concept` pageType? | Notes |
|---|---|---|---|
| `AccordionGroup` | Yes | Yes — listed in Preferred for `concept` | Correct use |
| `Accordion` | Yes | Yes — listed in Preferred for `concept` | Correct use |
| `ScrollableDiagram` | Yes | **FLAG** — not listed in Preferred column for any pageType in the canonical matrix | Not in the Preferred column. This is a custom wrapper around Mermaid. Verify against `docs-guide/policies/component-layout-decisions.mdx`. If approved, document. If not approved, use bare Mermaid block |
| `CenteredContainer` | Yes | **FLAG** — not listed in Preferred column for `concept` | Not in the canonical component matrix. Wraps the AccordionGroup and a Mermaid diagram. If this is an approved layout wrapper, it needs to appear in the approved component list |
| `StyledTable` / `TableRow` / `TableCell` | Yes | Yes — `Table` is listed in Preferred for `resource`; `StyledTable` is the canonical v2 table component. PASS | Correct use |
| `CustomDivider` | Yes | Not listed in Preferred for `concept`, but not in Avoid list | Used 4 times as section separator. Acceptable structural component. Flag as INFO |
| `LinkArrow` | Yes | Not in canonical matrix but is an inline link component, not a structural component | Acceptable — inline link components are not restricted by the pageType matrix |
| `Note` | Yes | Yes — listed in Preferred for `concept` | Correct use at line 214 |
| `Card` / `CardGroup` | Yes | Yes — `Card`, `CardGroup` listed in Preferred for `navigation` and `guide` | For `concept`, these are used as a Related Pages exit. Acceptable |

**Flagged components: `ScrollableDiagram` and `CenteredContainer` — not in Preferred column for `concept`. Verify approval status.**

---

## 7. Cross-Category Connections

```
Root Cause A: pageType and purpose use deprecated 12-type values
Affects: Cat 1.2 (pageType: overview invalid) + Cat 1.4 (purpose: overview invalid) + Cat 5.1 (wrong template evaluated) + Cat 5.7 (old-schema frontmatter)
Fix: Change pageType to `concept`, add `pageVariant: overview`, change purpose to `orient`
```

```
Root Cause B: Missing required frontmatter fields (complexity, lifecycleStage, industry, niche, veracityStatus)
Affects: Cat 1.1 (10 required fields) + Cat 1.6 + Cat 1.7 + Cat 1.8 + Cat 1.9 + Cat 1.10
Fix: Add 5 fields — see exact values in Section 1 Frontmatter Table
```

```
Root Cause C: Contract name conflict — AIServiceRegistry (line 160) vs ServiceRegistry (line 201)
Affects: Cat 6.1 (factual claim uncitable) + Cat 6.4 (specific number/name unverified)
Fix: Verify the correct contract name against Livepeer's Arbitrum deployment (go-livepeer repo or contract-addresses reference page). Use the single correct name on both lines. This is CRITICAL — one name is wrong.
```

```
Root Cause D: TODO block in publishable content (lines 30–44 and line 296)
Affects: Cat 5.4 (avoided components / TODO in published content) + Cat 6.9 (open-ended research task) + Cat 8.6 (no TODO in published pages)
Fix: Resolve action items and remove the TODO block, or move it to _workspace/ notes. Do not ship the page with open TODO items.
```

```
Root Cause E: No cross-tab links
Affects: Cat 4.10 (cross-tab links at journey intersections) + Cat 7.6 (cross-tab graduation paths)
Fix: Add at minimum 2 cross-tab links: (1) at the "Staking and security" bullet (line 197–198), link to the Delegators tab entry for LPT staking; (2) in the Note block or Network Role section, link to the Gateways tab for Gateway selection context
```

```
Root Cause F: Undefined terms at first use (BYOC, Cascade)
Affects: Cat 2.11 (terminology consistent) + Cat 4.5 (prerequisites stated or linked)
Fix: Line 176: change "BYOC containers" to "BYOC (Bring Your Own Container) containers"; Line 163: add inline note or footnote defining Cascade, e.g. "Cascade (Livepeer's routing layer)"
```

---

## 8. Blocking Decision

**None.** Page purpose, scope, and audience are clear and unambiguous. The page is a `concept` / orientation page for the `orchestrator` audience. No scope conflict. All findings are executable without a blocking decision.

---

## 9. Verdict Rationale

**Verdict: NEEDS WORK**

The page is structurally sound and conceptually well-written. Voice is correct for the audience. Prose is peer-technical. Navigation is complete and all links resolve. The content architecture is coherent. This is a strong draft.

It does not PASS due to the following issues that must be fixed before shipping:

**CRITICAL (fix before any further work):**
1. Contract name conflict: `AIServiceRegistry` (line 160) vs `ServiceRegistry` (line 201) — one is wrong. Must be resolved against the authoritative source.

**HIGH (fix before shipping):**
2. Deprecated `pageType: overview` — must be `pageType: concept` with `pageVariant: overview`
3. Deprecated `purpose: overview` — must be `purpose: orient`
4. Missing fields: `complexity`, `lifecycleStage`, `industry`, `niche`, `veracityStatus` — all required
5. `status: current` conflicts with missing `veracityStatus` — must set `veracityStatus: unverified`
6. TODO block (lines 30–44) in publishable content — must be resolved or relocated
7. "differ **significantly**" (line 294) — banned word. Fix: "differ in incentives, pricing strategy, and operational requirements" (restate the claim without the intensifier — the table cell content already does this implicitly)
8. Banned construction: line 275 "Existing GPU operators can direct spare capacity…" — rewrite to assert directly
9. Heading "Who Should Operate One" scores 13/25 — rename to `Operator Profiles`
10. Heading "Related Pages" scores 14/25 — rename to `Further Reading` or remove the H2 entirely
11. No cross-tab links — add 2 minimum (Delegators tab for LPT staking, Gateways tab for selection context)
12. `BYOC` and `Cascade` undefined at first use — add inline definitions

**MEDIUM (fix before final veracity pass):**
13. 8 factual/technical claims are NOT-TESTED — add `{/* REVIEW: */}` flags with named sources for: active set size (top 100), AIServiceRegistry/ServiceRegistry contract names, BondingManager / RoundsManager / TicketBroker contract names, Gateway/Orchestrator contract scope claim, timeline dates
14. `ScrollableDiagram` and `CenteredContainer` not in canonical Preferred list — verify approval status

**REWRITE REQUIRED:** No. Page structure, content, and voice are good. Point fixes are sufficient.

---

*Report generated 2026-03-24 by Claude Code automated check. All link verifications performed by filesystem glob/ls. Veracity claims labelled NOT-TESTED where no live system or authoritative source was consulted in this session.*

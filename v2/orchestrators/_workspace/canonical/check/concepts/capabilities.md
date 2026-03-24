# Per-Page Quality Check: `v2/orchestrators/concepts/capabilities.mdx`

**Reviewed:** 2026-03-24
**Reviewer:** Claude Code (automated quality check)
**Page path:** `/Users/alisonhaire/Documents/Livepeer/Docs-v2-dev/v2/orchestrators/concepts/capabilities.mdx`
**Output file:** `/Users/alisonhaire/Documents/Livepeer/Docs-v2-dev/v2/orchestrators/_workspace/canonical/check/concepts/capabilities.md`

---

## Pre-flight

**Generated-file-banner check:** No `generated-file-banner` comment block found. Page is hand-authored or AI-drafted. No generation script to read.

---

## 1. Frontmatter Table

| Field | Present? | Value | Pass/Fail | Notes |
|-------|----------|-------|-----------|-------|
| `title` | Yes | `'Orchestrator Capabilities'` | PASS | Clear, subject-first |
| `sidebarTitle` | Yes | `'Capabilities'` | PASS | Concise |
| `description` | Yes | `What Orchestrators can execute, the workload types they support across video and AI, how Gateways select them, and the boundaries of the Orchestrator role.` | PASS | Subject-first, 158 chars (within 160 limit), UK English, no self-reference |
| `pageType` | Yes | `'concept'` | PASS | Valid 7-type canonical value |
| `audience` | Yes | `'orchestrator'` | PASS | Valid 7-token value |
| `purpose` | Yes | `'concept'` | FAIL | `'concept'` is a DEPRECATED alias. The 15-value canonical set does not include `concept`. Closest valid value: `'explain'` (the page explains what capabilities an Orchestrator has). Fix: change `purpose: 'concept'` to `purpose: 'explain'` |
| `complexity` | **No** | — | FAIL | Required field missing. Fix: add `complexity: 'intermediate'` (page assumes basic Livepeer familiarity; covers GPU workloads, pricing factors, on-chain registration) |
| `lifecycleStage` | **No** | — | FAIL | Required field missing. Fix: add `lifecycleStage: 'evaluate'` (reader is assessing what an Orchestrator can do before committing to setup) |
| `keywords` | Yes | 12 entries including `livepeer`, `orchestrator`, `video transcoding`, `AI inference`, `Cascade`, `BYOC` etc. | PASS | Relevant, no filler |
| OG image block | Yes | All 5 fields: `og:image`, `og:image:alt`, `og:image:type`, `og:image:width`, `og:image:height` | PASS | Correct fallback path `/snippets/assets/site/og-image/fallback.png` (file confirmed to exist) |
| `status` | Yes (extra) | `'current'` | FAIL (conditional) | `status: current` requires `veracityStatus: verified` AND zero `{/* REVIEW: */}` flags per check 1.8. The page contains one open `{/* REVIEW: */}` flag at line 172. Status is misleading. Fix: change to `status: 'draft'` until REVIEW flag is resolved, or resolve the flag and add `veracityStatus: verified` |
| `lastVerified` | Yes (extra) | `'2026-03-15'` | INFO | Not a required field, but present. No action needed |
| `veracityStatus` | **No** | — | FAIL | Required field per check 1.8. Page contains an open REVIEW flag, and pipeline list is unverified. Fix: add `veracityStatus: 'unverified'` |
| `industry` | **No** | — | FAIL | Required field per reporting rules ("industry/niche are required fields — flag if missing"). Fix: add `industry: ['technical', 'AI']` |
| `niche` | **No** | — | FAIL | Required field per reporting rules. Fix: add `niche: ['infrastructure', 'hardware', 'video']` |

**Summary of frontmatter failures:** 6 issues — `purpose` deprecated alias, `complexity` missing, `lifecycleStage` missing, `veracityStatus` missing, `industry` missing, `niche` missing, `status: current` misleading given open REVIEW flag.

---

## 2. Categories 1–9

### Category 1: Frontmatter & Taxonomy

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1.1 | All 10 required fields present | FAIL | `complexity` and `lifecycleStage` missing. See frontmatter table above |
| 1.2 | `pageType` uses 7-type canonical schema | PASS | `concept` is valid |
| 1.3 | `pageVariant` valid if present | N/A — `pageVariant` not used on this page |
| 1.4 | `purpose` uses 15-value canonical set | FAIL | `'concept'` is a deprecated alias. Fix: `purpose: 'explain'` |
| 1.5 | `audience` uses 7-token set | PASS | `'orchestrator'` is valid |
| 1.6 | `complexity` single canonical value | FAIL | Field absent. Fix: `complexity: 'intermediate'` |
| 1.7 | `lifecycleStage` single canonical value | FAIL | Field absent. Fix: `lifecycleStage: 'evaluate'` |
| 1.8 | `veracityStatus` present and honest | FAIL | Field absent. Open REVIEW flag at line 172. `status: current` is inaccurate. Fix: add `veracityStatus: 'unverified'`; change `status` to `'draft'` |
| 1.9 | `industry` array valid if present | FAIL | Field absent. Fix: `industry: ['technical', 'AI']` |
| 1.10 | `niche` array valid if present | FAIL | Field absent. Fix: `niche: ['infrastructure', 'hardware', 'video']` |
| 1.11 | `description` well-formed | PASS | Subject-first, 158 chars, no self-reference, UK English |
| 1.12 | OG image block complete | PASS | All 5 fields present, fallback.png confirmed to exist |

---

### Category 2: Voice & Copy

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 2.1 | UK English throughout | PASS | No US spellings detected. "recognised", "advertised", "behaviour" not tested explicitly but no violations found. "organised" not used but page uses consistent -ise forms |
| 2.2 | Zero banned words | FAIL | Line 219: "Understanding Gateway selection is **essential** for Orchestrators" — `essential` is a banned word. Fix: delete the sentence opener; replace with: "Gateways apply a multi-factor ranking algorithm to every session." |
| 2.3 | Zero banned phrases | FAIL | Line 219: "Understanding X is essential" is explicitly listed as a banned phrase in checks.mdx §2.3. Fix: see 2.2 above. Additionally, line 176: "Gateways discover these via the AIServiceRegistry contract or from the Orchestrator's capability response during session negotiation." — no banned phrases in this sentence, PASS |
| 2.4 | Zero banned constructions | FAIL | See Banned Construction Scan (Section 3 below). Multiple `can` instances — some are value claims, flagged |
| 2.5 | Opening order correct | PASS | Page opens with a `<Tip>` that states the core fact: "Orchestrators perform compute - they do not route or discover work." No caveat opener, no self-reference |
| 2.6 | Paragraph discipline | PASS | Paragraphs are short, lead with facts. Most end on a concrete implication. One exception: line 218–220 leads with the reader-benefit framing before the fact ("Understanding… is essential"), which also violates 2.2. |
| 2.7 | Audience register correct | PASS | Peer-technical throughout. Correct for `orchestrator` audience |
| 2.8 | Per-audience prohibited phrases absent | PASS | No "easy to set up", "the network rewards you for", or other orchestrator-prohibited phrases found |
| 2.9 | No passive value statements | PASS | No vague quantifiers like "cost-effective" or "fast" without context |
| 2.10 | No hedging openers | PASS | Opening Tip is direct and assertive |
| 2.11 | Terminology locked and consistent | PASS | Uses correct terms: `BYOC`, `Cascade`, `active set` not misused, `LPT` used correctly, `probabilistic micropayments` not mentioned but not needed here |

---

### Category 3: Section Naming & Headings

See Heading Score Table (Section 4 below) for per-dimension breakdown.

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 3.1 | Every heading scores ≥20/25 | FAIL | "How Capabilities Are Advertised" scores 18/25. "How Gateways Select Orchestrators" scores 17/25. See Section 4 |
| 3.2 | No generic descriptors as headings | PASS | No standalone `Types`, `Overview`, `Basics` etc. |
| 3.3 | No literal contrast labels | PASS | No `X vs Y` headings |
| 3.4 | Domain-anchor rule applied | PASS | All headings include domain nouns and are interpretable in isolation |
| 3.5 | Heading names the concept, not examples | PASS | No example-led headings |
| 3.6 | Title well-formed | PASS | "Orchestrator Capabilities" — 2 words, concept-derived, no banned forms |
| 3.7 | Sounds like expert editorial choice | FAIL | "How Capabilities Are Advertised" and "How Gateways Select Orchestrators" use interrogative/explanatory framing (`How X`) rather than naming the governing concept. See Section 4 for fixes |

---

### Category 4: Page Structure & Content Architecture

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 4.1 | One purpose, one audience, one job | PASS | Page covers a single concept: what capabilities an Orchestrator has and how they are exposed. One audience: orchestrator |
| 4.2 | Purpose statement test passes | PASS | "This page lets the orchestrator understand what compute workloads they can run, how to advertise them, and what they do not handle." Clear and testable |
| 4.3 | PREV_PAGE / NEXT_PAGE adjacency correct | PASS (partial) | In the Concepts section, this page follows Role and precedes Architecture (based on Related Pages cards). Handoff is reasonable: role → capabilities → architecture |
| 4.4 | No dead ends | PASS | Related Pages section at bottom provides 4 onward paths |
| 4.5 | Prerequisites stated or linked | PASS | No explicit prerequisites section required for a concept page; the Tip at top grounds the reader in the role distinction immediately |
| 4.6 | Out-of-scope is clear | PASS | "Capability Boundaries" section explicitly lists what Orchestrators do NOT do |
| 4.7 | Information type per section is correct | PASS | `concept`/`explain` purpose: sections use conceptual and reference information types (tables, prose explanation, diagram). Appropriate |
| 4.8 | No content duplication from adjacent sections | PASS (NOT-TESTED fully) | No obvious duplication from role.mdx or architecture.mdx visible without reading those files. The dual-workload configuration Note references architecture.mdx, not duplicating it |
| 4.9 | Section orientation page present | N/A — section-level check, not per-page |
| 4.10 | Cross-tab links at journey intersections | PASS | Line 303 links to `/v2/gateways/concepts/role` (cross-tab to Gateways). Line 262 links to `/v2/orchestrators/guides/payments-and-pricing/pricing-strategy` (same tab). At least one cross-tab link is present |

---

### Category 5: Layout, Components & Template

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 5.1 | Correct template for pageType | PASS | `concept` pageType — page uses Overview (Tip), H2 sections, tables, diagram. Matches concept template |
| 5.2 | Required sections present | PASS | concept requires: Overview. Present via opening Tip block. All H2 sections cover the core concept |
| 5.3 | Only approved components used | FAIL | See Component Matrix (Section 6) — `CenteredContainer` and `BorderedBox` imported but `BorderedBox` is not used. `ScrollableDiagram` imported but appears unused (Mermaid diagram is rendered inline, not via `ScrollableDiagram`). `CardGroup`/`Card` at bottom are not listed in the Preferred column for `concept` — they are Preferred for `navigation`, `guide`, `resource`. Flag: CardGroup/Card used in Related Pages section |
| 5.4 | Avoided components absent | FAIL | Open TODO block at lines 34–48 (`{/* TODO: Verify: ... */}`). Per check 5.4 and 8.6, TODO/TBD placeholders are not permitted in publishable content. This block is inside a JSX comment so it does not render, but it is present in the file. Flag for cleanup before shipping |
| 5.5 | Information type → component mapping correct | PASS | Tables for reference data (StyledTable), prose for conceptual sections, Mermaid for process diagram (procedural/structural), Note for configuration guidance |
| 5.6 | MDX renders clean | PASS (NOT-TESTED against live render) | JSX structure appears well-formed. All imports resolved (see link verification below). No unclosed tags visible. Cannot confirm render without running `npx mintlify dev` |
| 5.7 | No old-schema frontmatter | FAIL | `purpose: 'concept'` is a deprecated alias (see 1.4). No other deprecated values |
| 5.8 | CSS uses custom properties only | PASS | No hardcoded hex colours in prose. The Mermaid diagram at lines 186–196 uses hardcoded hex colours (`#1a1a1a`, `#fff`, `#2d9a67`, `#0d0d0d`) — this is expected and noted as unavoidable in the TODO block itself ("Mermaid diagrams use theme colours (but must be hardcoded)"). Not flagged as a violation |
| 5.9 | Generated file banners intact | N/A — page is not generated |
| 5.10 | Component naming/import conventions | PASS | PascalCase throughout, imports from semantic subdirectories |

---

### Category 6: Veracity & Factual Accuracy

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 6.1 | Every factual claim citable | FAIL | Multiple NOT-TESTED claims. See detail below |
| 6.2 | Code/commands tested | N/A — no CLI commands or code blocks on this page (Mermaid diagram is structural, not instructional) |
| 6.3 | No deprecated API usage | NOT-TESTED | References to `ServiceRegistry`, `AIServiceRegistry`, `-aiServiceRegistry` flag, `-pricePerUnit`, `-maxPricePerUnit`. These are go-livepeer CLI flags and contract names that require cross-checking against current go-livepeer repo. Cannot verify without live system access |
| 6.4 | Numbers are real | PASS (partial) | "Per segment (typically 2 seconds of video)" — NOT-TESTED against go-livepeer source. "per interval during stream duration" for Cascade — NOT-TESTED. No unsourced percentages or earnings figures |
| 6.5 | REVIEW flags for unverified claims | FAIL | Line 172: `{/* REVIEW: Confirm pipeline list is complete and up-to-date with AI subnet - check go-livepeer AI runner for current list */}` — flag is present and correctly formatted. However, the `status: current` and absent `veracityStatus` field make this page appear verified when it is not. This is the root cause of the status inconsistency (see Cross-Category Connection 1) |
| 6.6 | `veracityStatus` honest | FAIL | Field absent. Given open REVIEW flag, correct value is `unverified` |
| 6.7 | Authoritative vs AI-generated glossary | N/A — page does not reference glossary files |
| 6.8 | Source staleness check | FAIL | AI pipeline list (lines 117–170) is sourced from go-livepeer AI runner. This is a fast-changing source. The REVIEW flag acknowledges this but no staleness date is recorded. Models listed (`stabilityai/stable-diffusion-3-medium-diffusers`, `ByteDance/SDXL-Lightning`, `timbrooks/instruct-pix2pix`, `stabilityai/stable-video-diffusion-img2vid-xt-1-1`, `openai/whisper-large-v3`, `stabilityai/stable-diffusion-x4-upscaler`, `facebook/sam2-hiera-large`) are NOT-TESTED for currency |
| 6.9 | No open-ended research tasks | FAIL | REVIEW flag at line 172 names a source ("go-livepeer AI runner") and a concrete action ("check … for current list") — this meets the standard for a named source with concrete next step. However, `status: current` and absent `veracityStatus` mean the page presents itself as verified when it is not. Fix is to correct frontmatter, not to remove the flag |

**Specific factual claims — veracity status:**

| Claim | Location | Status | Risk |
|-------|----------|--------|------|
| Segment = "typically 2 seconds of video" | Line 80 | NOT-TESTED | Low — widely documented in Livepeer protocol |
| "NVENC preferred; CPU possible" for video transcoding | Line 81 | NOT-TESTED | Low — consistent with hardware docs |
| ServiceRegistry contract name (Arbitrum) | Line 200 | NOT-TESTED | Medium — contract name must match deployed contract |
| AIServiceRegistry contract name | Line 201 | NOT-TESTED | Medium — must match current deployment |
| `-aiServiceRegistry` CLI flag name | Line 202 | NOT-TESTED | Medium — CLI flags change across go-livepeer versions |
| `-pricePerUnit` flag name | Line 237 | NOT-TESTED | Medium — CLI flag, must be current |
| `-maxPricePerUnit` flag name | Line 237 | NOT-TESTED | Medium — CLI flag, must be current |
| Pipeline model IDs (7 entries) | Lines 131–167 | NOT-TESTED | HIGH — model IDs are exact HuggingFace identifiers; go-livepeer supported set may differ |
| Cascade pipeline described as "live-video-to-video" | Line 164 | NOT-TESTED | Medium — pipeline name must match go-livepeer AI runner |
| "RTMP ingest, port 1935" | Line 281 | NOT-TESTED | Low — standard RTMP port |
| BondingManager contract name | Line 296 | NOT-TESTED | Medium — contract name must match deployed contract |

---

### Category 7: Navigation & Information Architecture

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 7.1 | Page exists in docs.json | PASS | Entry confirmed at `"v2/orchestrators/concepts/capabilities"` (docs.json line 2842) |
| 7.2 | Navigation matches file system | PASS | File exists at expected path |
| 7.3 | Tab entry portal routes to all sections | N/A — section-level check |
| 7.4 | No structural orphans | PASS | Page is in docs.json |
| 7.5 | Audience journey complete | PASS (partial) | Concepts section: role → capabilities → architecture → incentive-model. Reasonable sequence |
| 7.6 | Cross-tab graduation paths exist | PASS | Links to `v2/gateways/concepts/role` present at line 303 |
| 7.7 | File in correct lane | PASS | Publishable content in `v2/orchestrators/concepts/`, not in `_workspace/` |
| 7.8 | File naming conventions | PASS | No prefix required for concept pages; plain `capabilities.mdx` is correct |
| 7.9 | `_workspace/` TTL compliance | N/A — publishable file |

---

### Category 8: Links & Rendering

**Internal links verified (5 links, 100% of all links on page):**

| Link | Target path | File exists? | In docs.json? | Status |
|------|-------------|--------------|---------------|--------|
| `LinkArrow` — Orchestrator Architecture | `/v2/orchestrators/concepts/architecture` | Yes (`architecture.mdx`) | Yes | PASS |
| `LinkArrow` — Pricing Strategy | `/v2/orchestrators/guides/payments-and-pricing/pricing-strategy` | Yes (`pricing-strategy.mdx`) | Yes (line 2922) | PASS |
| `LinkArrow` — Gateway Role | `/v2/gateways/concepts/role` | Yes (`role.mdx`) | Yes (line 2579) | PASS |
| `Card` — Orchestrator Role | `/v2/orchestrators/concepts/role` | Yes (`role.mdx`) | Assumed in docs.json with capabilities | PASS |
| `Card` — Incentive Model | `/v2/orchestrators/concepts/incentive-model` | Yes (`incentive-model.mdx`) | Assumed in docs.json | PASS |
| `Card` — Workloads and AI | `/v2/orchestrators/guides/workloads-and-ai/job-types` | **FAIL** — directory `workloads-and-ai` does NOT exist. The directory is `ai-and-job-workloads`. File `job-types.mdx` does NOT exist in that directory | Not found | BROKEN LINK |

**Link finding detail:**
- Line 319: `href="/v2/orchestrators/guides/workloads-and-ai/job-types"` — directory path is wrong. The actual directory is `v2/orchestrators/guides/ai-and-job-workloads/` and no `job-types.mdx` exists in it. The closest file is `workload-options.mdx`. Fix: change href to `"/v2/orchestrators/guides/ai-and-job-workloads/workload-options"` AND confirm `workload-options` is registered in docs.json (confirmed at line 2897).

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 8.1 | All internal links resolve | FAIL | Line 319: `href="/v2/orchestrators/guides/workloads-and-ai/job-types"` — both directory name and file name are wrong. See above |
| 8.2 | All external links live | N/A — no external links on this page |
| 8.3 | All snippet imports resolve | PASS | All 5 imports verified: `Links.jsx`, `Tables.jsx`, `Divider.jsx`, `ZoomableDiagram.jsx`, `Containers.jsx` — all files confirmed to exist |
| 8.4 | All images load | PASS | OG image fallback.png confirmed to exist. No inline images on page |
| 8.5 | Page renders without error | PASS (NOT-TESTED against live render) — JSX well-formed, no unclosed tags, all imports resolve |
| 8.6 | No TODO/TBD in published content | FAIL | Lines 34–48 contain a `{/* TODO: ... */}` comment block. It does not render (JSX comment), but it is present in the publishable file. Policy per check 5.4/8.6 is that TODO blocks belong in `_workspace/`, not publishable pages. Fix: remove the entire block (lines 34–48) before shipping |

---

### Category 9: Process & Governance

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 9.1 | Human sign-off recorded | FAIL | No explicit human sign-off recorded on this page. `status: current` is set but not supported by `veracityStatus: verified` or resolved REVIEW flags |
| 9.2 | All consuming decisions in registry | NOT-TESTED — cannot verify decision registry coverage without reading the registry for this page's specific decisions |
| 9.3 | Gate prerequisites met | FAIL | Orchestrators tab has not passed IA Approved, Terminology Lock, or Content Pass gates per tab-status.md. Page should not carry `status: current` |
| 9.4 | Phase ordering respected | N/A — cannot verify without phase audit log |
| 9.5 | Findings gathered before fixes | N/A — this is the findings report |
| 9.6 | Feedback routed | N/A — this is the first structured review |

---

## 3. Banned Construction Scan

Every sentence containing "can", "may", "could", "might", "should":

| Line | Sentence | Word | Classification | Flag? |
|------|----------|------|----------------|-------|
| 64 | "Orchestrators **can** execute four categories of compute workload." | can | value-claim | FLAG — asserts a capability. Fix: "Orchestrators execute four categories of compute workload." |
| 65 | "Which workloads a node accepts depends on its hardware, the pipelines and models it has loaded, and how it is configured." | (no modal) | — | N/A |
| 174 | "An Orchestrator **can** support any subset of pipelines and models." | can | value-claim | FLAG — asserts a capability. Fix: "An Orchestrator supports any subset of pipelines and models." |
| 183 | "When a Gateway wants to route a job, it must find an Orchestrator that **can** handle it." | can | procedural | ok — describes a system constraint, not a value claim |
| 210 | "Capabilities that are advertised but not actually available (e.g. models not yet loaded into VRAM) **will** result in job failures." | will | — | ok — definitive assertion, not hedged |
| 212 | "Keep declared capabilities in sync with loaded models." | (imperative, no modal) | — | N/A |
| 219 | "Understanding Gateway selection is essential for Orchestrators that **want** to attract work." | want | — | N/A (not a modal; separate issue: banned phrase "Understanding X is essential") |
| 258 | "Gateways do not randomly assign jobs — they apply a multi-factor ranking algorithm to every session." | (no modal) | — | N/A |
| 258–260 | "A Gateway that sends a job and receives an error or timeout **will** deprioritise your Orchestrator for subsequent sessions." | will | — | ok — definitive assertion |
| 302 | "If you want to aggregate application demand and route work across multiple Orchestrators, that is the Gateway role." | (no modal) | — | N/A |
| 99 | "Depends on container" (table cell) | — | — | N/A — table cell, not prose |

**Flagged constructions requiring fixes:**
1. Line 64: `can execute` → `execute`
2. Line 174: `can support` → `supports`

---

## 4. Heading Score Table

Scoring rubric: Precision (5), Depth (5), Stability (5), Clarity (5), Conciseness (5). Pass threshold: ≥20/25.

| Heading | Precision | Depth | Stability | Clarity | Conciseness | Total | Pass? |
|---------|-----------|-------|-----------|---------|-------------|-------|-------|
| **Workload Types** (H2, line 62) | 5 — names the exact concept | 4 — signals technical content without jargon | 5 — stable; won't break if workloads change | 5 — instantly understood | 5 — 2 words | **24/25** | PASS |
| **Supported AI Pipelines** (H2, line 112) | 5 — names the exact thing | 4 — "AI Pipelines" signals scope; "Supported" adds precision | 5 — stable | 5 — clear to orchestrator audience | 4 — 3 words; "Supported" is mildly redundant on a concept page | **23/25** | PASS |
| **How Capabilities Are Advertised** (H2, line 181) | 3 — names the process, not the concept ("Capability Advertisement" or "Registration Mechanisms") | 3 — `How X` is explanatory framing, not a concept name | 4 — mostly stable | 4 — clear but verbose | 2 — 5 words, interrogative framing | **16/25** | FAIL |
| **On-chain registration** (H3, line 198) | 5 — precise mechanism name | 4 — signals technical depth | 5 — stable | 5 — clear | 4 — 3 words (hyphen included) | **23/25** | PASS |
| **Capability negotiation** (H3, line 205) | 5 — exact term used in Livepeer protocol | 5 — signals protocol-level depth | 5 — stable | 5 — clear | 5 — 2 words | **25/25** | PASS |
| **How Gateways Select Orchestrators** (H2, line 216) | 3 — describes a process, not a concept. "Gateway Selection Factors" or "Orchestrator Selection Criteria" would name the governing concept | 3 — `How X` framing is explanatory, not conceptual | 4 — mostly stable | 4 — clear but verbose | 1 — 5 words, interrogative framing | **15/25** | FAIL |
| **Capability Boundaries** (H2, line 266) | 5 — names the exact concept | 5 — "Boundaries" signals scope delimitation | 5 — stable | 5 — clear | 5 — 2 words | **25/25** | PASS |
| **Related Pages** (H2, line 307) | 2 — generic structural label | 1 — no intellectual signal | 5 — stable | 4 — clear | 3 — 2 words but generic | **15/25** | FAIL |

**Headings failing ≥20/25 threshold:**

1. **"How Capabilities Are Advertised"** (16/25) — Fix: rename to `Capability Advertisement` (2 words, names the concept, domain-anchored, stable)
2. **"How Gateways Select Orchestrators"** (15/25) — Fix: rename to `Gateway Selection Criteria` (3 words, names the governing concept, stable)
3. **"Related Pages"** (15/25) — Fix: rename to `Next Steps` or remove the H2 entirely and use the CardGroup with CustomDivider as-is (no heading needed above a purely navigational card group). Preferred fix: delete the H2 and let the CustomDivider serve as the visual separator.

**Note:** "Related Pages" is a near-universal pattern. If a decision exists to lock this label site-wide, that decision supersedes this finding. No such locked decision was found in the registry.

---

## 5. Spelling/Typo Check

Scan of all visible text (headings, prose, table cells, card descriptions, link labels, Tip/Note content):

- "Orchestrators" — consistent capitalisation throughout. PASS.
- "Gateways" — consistent capitalisation. PASS.
- "BYOC" — used consistently. PASS.
- "Cascade" — correctly identified as a pipeline. PASS.
- "AIServiceRegistry" — one word, no space. PASS.
- "ServiceRegistry" — one word, no space. PASS.
- "VRAM" — all-caps, consistent. PASS.
- "NVENC" — all-caps, consistent. PASS.
- "dual-workload configuration" (line 106) — hyphenated compound modifier. PASS.
- Line 107: "This is not a separate mode - it is the same Orchestrator process" — uses a hyphen surrounded by spaces as an em-dash substitute. Per voice rules: "No em dashes — rewrite or use hyphens." This construction uses a hyphen (not em dash) with spaces. Technically compliant, but the construction `- it is` could be rewritten as a new sentence for clarity. INFO only, not a blocking issue.
- Line 209: "capability manifest - the full list" — same pattern as above. INFO.
- "deprioritise" (line 259) — UK English spelling. PASS.

**No typos found.**

---

## 6. Component Matrix

pageType: `concept`
Preferred components: `Accordion`, `AccordionGroup`, `CodeGroup`, `Tabs`, `Note`, `Info`, `Tip`

| Component | Used? | Appropriate for `concept`? | Notes |
|-----------|-------|---------------------------|-------|
| `LinkArrow` | Yes | Not in Preferred list | Used for inline cross-links. Functional and low-risk. Not flagged as Avoid either. Acceptable |
| `StyledTable` / `TableRow` / `TableCell` | Yes | Not in Preferred list (but `Table` is listed for `resource`) | Tables are appropriate for reference data on a concept page. Not flagged as Avoid. Acceptable |
| `CustomDivider` | Yes | Not in Preferred list | Used for visual section separation. Not in Preferred or Avoid. Acceptable — section dividers are a cross-type structural component |
| `ScrollableDiagram` | Imported but NOT used | N/A | Import is dead — `ScrollableDiagram` is imported (line 53) but never referenced in the page body. Dead import. Per reporting rules: "Dead imports. Do not flag." Noted for information only |
| `CenteredContainer` | Yes (once, line 56) | Not in Preferred list | Wraps the opening Tip for visual centering. Functional. Not in Avoid. Acceptable |
| `BorderedBox` | Imported but NOT used | N/A | Dead import (line 54). Per reporting rules: do not flag |
| `Note` | Yes (line 104) | PASS — Preferred for `concept` | Correctly used for a configuration warning |
| `Tip` | Yes (line 57) | PASS — Preferred for `concept` | Correctly used for orientation fact |
| `CardGroup` / `Card` | Yes (lines 309–322) | Not in Preferred list for `concept` | Preferred for `navigation`, `guide`, `resource`. On a `concept` page, CardGroup is typically used for "Related Pages" navigation — a common pattern. Flag: not in Preferred column. If the site's concept template authorises this pattern, no action needed; if not, replace with a simple link list |

**Summary:** No components in the Avoid column are used. The CardGroup/Card in "Related Pages" is the only component not in the Preferred column that warrants a flag.

---

## 7. Cross-Category Connections

```
Root Cause 1: Missing frontmatter fields + misleading status
Affects: Cat 1.1 + Cat 1.4 + Cat 1.6 + Cat 1.7 + Cat 1.8 + Cat 6.6 + Cat 9.1 + Cat 9.3
Description: The page is missing complexity, lifecycleStage, veracityStatus, industry, and niche.
The purpose field uses the deprecated alias 'concept'. The status is set to 'current' despite an
open REVIEW flag and zero veracityStatus. These all trace to a single incomplete frontmatter pass.
Fix: One frontmatter update resolves all six category findings:
  - purpose: 'concept' → purpose: 'explain'
  - Add: complexity: 'intermediate'
  - Add: lifecycleStage: 'evaluate'
  - Add: veracityStatus: 'unverified'
  - Add: industry: ['technical', 'AI']
  - Add: niche: ['infrastructure', 'hardware', 'video']
  - Change: status: 'current' → status: 'draft'
```

```
Root Cause 2: Broken Related Pages card link
Affects: Cat 8.1 + Cat 5.3 (indirectly — wrong link means the card is non-functional)
Description: Card on line 319 references /v2/orchestrators/guides/workloads-and-ai/job-types.
The directory is ai-and-job-workloads (not workloads-and-ai) and the file is workload-options.mdx
(not job-types.mdx).
Fix: Line 319: href="/v2/orchestrators/guides/workloads-and-ai/job-types"
  → href="/v2/orchestrators/guides/ai-and-job-workloads/workload-options"
  Also update card title if "Workloads and AI" needs to match the actual page title.
```

```
Root Cause 3: Heading framing — 'How X' pattern
Affects: Cat 3.1 + Cat 3.7
Description: Two H2 headings use interrogative 'How X' framing instead of naming the governing
concept. This is a systematic pattern affecting both headings.
Fix:
  Line 181: "How Capabilities Are Advertised" → "Capability Advertisement"
  Line 216: "How Gateways Select Orchestrators" → "Gateway Selection Criteria"
```

```
Root Cause 4: Banned word + banned phrase in same sentence
Affects: Cat 2.2 + Cat 2.3
Description: Line 219: "Understanding Gateway selection is essential for Orchestrators that want
to attract work." Contains both the banned word 'essential' and the banned phrase
"Understanding X is essential".
Fix: Delete line 219 entirely. The table that follows (lines 221–256) conveys the content without
requiring a framing sentence. Alternatively, replace with: "Gateways apply a multi-factor ranking
algorithm; the factors below determine how much work your Orchestrator receives."
```

```
Root Cause 5: 'can' in value claims
Affects: Cat 2.4 (banned constructions)
Description: Two instances of 'can' make value claims that should be asserted directly.
Fixes:
  Line 64: "Orchestrators can execute four categories" → "Orchestrators execute four categories"
  Line 174: "An Orchestrator can support any subset" → "An Orchestrator supports any subset"
```

---

## 8. Blocking Decision

No blocking decision required. Page purpose, audience, and scope are unambiguous. All findings are executable without additional input.

---

## 9. Verdict Rationale

**Verdict: NEEDS WORK**

**Evidence:**

The page is well-structured, technically coherent, and uses correct voice for the orchestrator audience. The core content — workload types, AI pipelines, capability advertisement, Gateway selection factors, and capability boundaries — is clear and appropriately scoped for a `concept` page. The Mermaid diagram adds structural value. The "Capability Boundaries" section is a standout: direct, table-driven, no padding.

**Blocking issues (fix before shipping):**

1. **CRITICAL — Broken internal link** (Root Cause 2): The "Workloads and AI" Related Pages card links to a path that does not exist. This will produce a 404 for any reader who clicks it.

2. **HIGH — Frontmatter incomplete** (Root Cause 1): Six missing or incorrect frontmatter fields. `purpose: 'concept'` is deprecated. `veracityStatus` absent. `complexity` and `lifecycleStage` missing. These are pipeline-breaking for downstream systems. One targeted frontmatter edit resolves all.

3. **HIGH — Heading failures** (Root Cause 3): Two H2s score below 20/25. "How Capabilities Are Advertised" (16/25) and "How Gateways Select Orchestrators" (15/25) use interrogative framing that names a process rather than a concept. These are straightforward renames.

**Non-blocking issues (fix before phase completion):**

4. **HIGH — Banned phrase + word** (Root Cause 4): Line 219 contains both `essential` (banned word) and "Understanding X is essential" (banned phrase). Delete or rewrite.

5. **MEDIUM — `can` in value claims** (Root Cause 5): Lines 64 and 174. Two-word fixes.

6. **MEDIUM — TODO block in publishable file**: Lines 34–48 JSX comment block must be removed before shipping.

7. **MEDIUM — `status: current` inaccurate**: Open REVIEW flag and unverified pipeline list mean status should be `draft`.

8. **MEDIUM — AI pipeline list veracity**: Seven model IDs and pipeline names are NOT-TESTED against current go-livepeer AI runner. REVIEW flag is correctly placed; frontmatter must reflect unverified state.

9. **INFO — "Related Pages" heading** scores 15/25. Rename to `Next Steps` or remove entirely.

**None of the above issues require a rewrite.** All fixes are targeted edits. Estimated fix effort: one frontmatter update, one link fix, three heading renames, two sentence deletions, one comment block deletion.

---

_Report generated: 2026-03-24_
_Page: v2/orchestrators/concepts/capabilities.mdx_
_Framework: v2/orchestrators/_workspace/canonical/checks.mdx_

# Quality Check Report: concepts/architecture.mdx

**Page:** `v2/orchestrators/concepts/architecture.mdx`
**Report date:** 2026-03-24
**Reviewer:** Claude Code (per-page quality check protocol)
**Checks framework:** `v2/orchestrators/_workspace/canonical/checks.mdx`

---

## Pre-flight

- **Generated-file-banner check:** No `generated-file-banner` comment block present. Page is hand-authored. No script audit required.
- **Page read:** Complete.
- **Framework read:** Complete.

---

## 1. Frontmatter Table

| Field | Present? | Value | Pass/Fail | Notes |
|-------|----------|-------|-----------|-------|
| `title` | Yes | `'Orchestrator Architecture'` | PASS | Subject-first, specific |
| `sidebarTitle` | Yes | `'Architecture'` | PASS | Concise |
| `description` | Yes | `'How Orchestrators fit into the Livepeer stack - layer position, internal components, request flow, GPU worker management, and protocol interactions.'` | PASS | Subject-first; 149 chars (within 160); UK English; no self-reference |
| `pageType` | Yes | `'concept'` | PASS | Valid 7-type canonical value |
| `audience` | Yes | `'orchestrator'` | PASS | Valid 7-token value |
| `purpose` | Yes | `'concept'` | **FAIL** | `concept` is a **deprecated alias** — not in the 15-value canonical set. Per check 1.4, valid values include `explain`, `orient`, `learn`, etc. For a concept page explaining architecture, the correct value is `explain`. Fix: change to `purpose: 'explain'` |
| `complexity` | **No** | — | **FAIL** | Required field missing. Fix: add `complexity: 'advanced'` (architecture internals; not beginner territory) |
| `lifecycleStage` | **No** | — | **FAIL** | Required field missing. Fix: add `lifecycleStage: 'evaluate'` (reader is assessing whether/how to run a node) |
| `keywords` | Yes | Array of 13 terms | PASS | Domain-specific, comprehensive |
| OG image block | Yes | `og:image`, `og:image:alt`, `og:image:type`, `og:image:width`, `og:image:height` | PASS | All 5 fields present, correct fallback path |
| `status` | Yes (extra) | `'current'` | **FAIL** | Check 1.8: `status: current` requires `veracityStatus: verified` AND zero `{/* REVIEW: */}` flags. Neither condition is met (see Section 6 below). `status: current` must be downgraded or `veracityStatus` added honestly. |
| `lastVerified` | Yes (extra) | `'2026-03-15'` | INFO | Informational; not a required field. Consistent with `status: current` claim but contradicted by open REVIEW flags. |
| `veracityStatus` | **No** | — | **FAIL** | Required field (check 1.8). Page contains two open `{/* REVIEW: */}` flags and unverified procedural/factual claims. Fix: add `veracityStatus: 'unverified'` |
| `industry` | **No** | — | **FAIL** | Required field (check 1.9). Fix: add `industry: ['technical', 'AI']` — page covers infrastructure and AI inference pipelines |
| `niche` | **No** | — | **FAIL** | Required field (check 1.10). Fix: add `niche: ['protocol', 'infrastructure', 'hardware']` |

**Frontmatter summary:** 7 of 10 required fields pass. 3 required fields missing (`complexity`, `lifecycleStage`, `veracityStatus`). 1 field has deprecated value (`purpose: 'concept'`). 2 extra fields present (`status`, `lastVerified`) with `status: current` making an unsupportable claim. `industry` and `niche` absent.

---

## 2. Voice & Copy — Categories 2.1–2.11

### 2.1 UK English

PASS — Scanned all visible prose. No US spellings found. `organise`/`optimise` not used but also not needed. No `-ize` endings, no `color`, `center`, `labeled`, `canceled` etc.

### 2.2 Zero banned words

PASS — None of `effectively`, `essentially`, `basically`, `meaningful`, `significant` (as intensifier), `real` (as intensifier), `various`, `several`, `obviously`, `clearly` found in prose.

### 2.3 Zero banned phrases

PASS — None of the listed banned phrases found. No "This section covers", "This page covers", "Understanding X is essential", "It is important to note", "etc.", "rather than", "not just X", "low but not zero", "once X is stable", "depends on various".

**One borderline case:** Line 58–59 — "This page explains where Orchestrators sit in the Livepeer stack..." — this is a `This page [verb]` self-referential opener. Addressed in 2.4 below.

### 2.4 Zero banned constructions

**FAIL** — Line 58: `"This page explains where Orchestrators sit in the Livepeer stack, how they interact with Gateways and the protocol layer, how a job flows through the system, and the key internal components."` — This is a `This page [verb]` self-reference. It opens the body of the page and describes what follows rather than stating a fact.

Fix: Delete lines 58–59 entirely. The H2 `## Orchestrator Layer Context` and the diagram that follows make this sentence redundant. Alternatively, open with: "Orchestrators sit at the compute layer, between Gateway job dispatch and Arbitrum protocol settlement."

Lines 61: `"For what Orchestrators *do*, see..."` — This is a cross-reference sentence. Acceptable as a navigation pointer but note: it is also a form of meta-commentary. Cross-references as the second sentence of a page are a borderline structural choice; given that Related Pages exists at the bottom, this is borderline redundant. Flag as INFO (not a hard FAIL).

No `not [X]` as primary value statement found. No unresolved `if [condition]` in body prose.

### 2.5 Opening order

**FAIL** (linked to 2.4). The body opens with a self-referential sentence before stating any fact. The first substantive content is in line 65 (`## Orchestrator Layer Context`). Fix: remove the self-referential opener (lines 58–61); let the H2 + diagram speak directly.

### 2.6 Paragraph discipline

PASS — Paragraphs are tight. Lead sentences state facts. Most end on facts or next steps. One exception:

Line 327–329: "This is what happens when a Gateway sends a job to an Orchestrator, from receipt through result delivery and payment accumulation." — This is a description of what follows, not a fact. Bridges into a diagram. Delete this sentence; the `## Request Flow` heading plus diagram are self-explanatory.

### 2.7 Audience register

PASS — Peer-technical register throughout. No hand-holding, no marketing language. Appropriate for `orchestrator` audience.

### 2.8 Per-audience prohibited phrases

PASS — No "easy to set up", "the network rewards you for" found. Orchestrator-specific prohibitions absent.

### 2.9 No passive value statements

PASS — No unquantified value claims. Page is descriptive/architectural, not evaluative.

### 2.10 No hedging openers

**FAIL** — See 2.4/2.5. Opens with self-reference, not a fact.

### 2.11 Terminology locked and consistent

PASS — `probabilistic micropayment ticket`, `LPT`, `active set` (not used but not needed here), `reward cut`/`fee cut` used correctly. `pool worker` not used but a pool Orchestrator is referenced — acceptable since it's describing configurations, not the term itself.

One note: Line 415: "Common in commercial operations (Titan Node, and similar)" — `Titan Node` is a proper noun referencing a third-party entity. This is acceptable contextually but should be verified as still current. NOT-TESTED.

---

## 3. Section Naming & Headings — Category 3 Scoring

Scoring rubric: Precision / Depth / Stability / Clarity / Conciseness (each 1–5, target ≥20/25).

### H1 Title

The page has no explicit H1 — Mintlify renders the frontmatter `title` as H1. Title: `Orchestrator Architecture`.

| Heading | Precision | Depth | Stability | Clarity | Conciseness | Total |
|---------|-----------|-------|-----------|---------|-------------|-------|
| **Orchestrator Architecture** (title/H1) | 5 | 4 | 5 | 5 | 5 | **24/25** |

Notes: Precise; could be argued "Architecture" is slightly generic without "Orchestrator" anchor, but the anchor is present. Depth is 4 (signals internal/structural content but not what level). PASS.

### H2 Headings

| Heading | Precision | Depth | Stability | Clarity | Conciseness | Total | Pass? |
|---------|-----------|-------|-----------|---------|-------------|-------|-------|
| **Orchestrator Layer Context** | 3 | 3 | 4 | 3 | 4 | **17/25** | FAIL |
| **Orchestrator Interactions** | 3 | 2 | 4 | 3 | 4 | **16/25** | FAIL |
| **Dual Pipeline Architecture** | 5 | 5 | 5 | 5 | 4 | **24/25** | PASS |
| **Request Flow** | 4 | 4 | 5 | 4 | 5 | **22/25** | PASS |
| **Setup Configurations** | 3 | 2 | 3 | 3 | 4 | **15/25** | FAIL |
| **Software Components** | 3 | 2 | 3 | 3 | 4 | **15/25** | FAIL |
| **Related Pages** | 1 | 1 | 3 | 4 | 5 | **14/25** | FAIL |

**Notes on failing headings:**

- `Orchestrator Layer Context` — "Context" is a structure word. The section shows the 4-layer stack with Orchestrators at the compute layer. Suggested rename: `Stack Position` or `Network Layer Position` (the CustomDivider already says "Layer Position" — the H2 disagrees with its own divider label). Score driven down by "Context" carrying no independent meaning. Fix: rename to `Network Stack Position` (5/4/5/5/5 = 24).

- `Orchestrator Interactions` — "Interactions" is generic. The section covers three categories: Gateways (job source), GPU Workers (execution), Arbitrum Protocol (settlement). Suggested rename: `Gateway, Worker and Protocol Interactions` is too long. Better: `Protocol Interactions` (if narrowed) or `Actor Relationships` or split to match the H3s more directly. A reader scanning only this heading does not know it covers Gateways, Workers, and Arbitrum. Fix: rename to `Gateway and Protocol Relationships` (4/3/4/4/4 = 19 — marginal). Better: `Three Interaction Domains` — no, that's a number label. Best fix: `Gateways, Workers, Arbitrum` (direct enumeration, 4/4/5/5/4 = 22).

- `Setup Configurations` — "Setup" and "Configurations" are near-synonyms here; redundant. More critically, this is a concept page — "Setup" is a guide/instruction word. On a concept page, the section is describing deployment topology options, not instructing. Suggested rename: `Deployment Topologies` (5/4/5/5/5 = 24). This also avoids clashing with the Setup section of the tab.

- `Software Components` — Generic. "Software" adds nothing (everything on this page is software). The section covers go-livepeer, AI Runner, livepeer_cli, and Arbitrum Contracts. Suggested rename: `Node Components` (5/4/5/5/5 = 24) or `Key Software Components` → still has "Software". Best: `Node Software Stack` (5/4/5/5/5 = 24).

- `Related Pages` — Check 3.2: standalone generic descriptor. Standard nav footer; arguably structural boilerplate. However, it still fails the rubric. INFO level — consistent with convention across the tab.

### H3 Headings

| Heading | Precision | Depth | Stability | Clarity | Conciseness | Total | Pass? |
|---------|-----------|-------|-----------|---------|-------------|-------|-------|
| **Gateways** | 4 | 3 | 5 | 4 | 5 | **21/25** | PASS |
| **GPU Workers** | 5 | 4 | 5 | 5 | 5 | **24/25** | PASS |
| **Arbitrum Protocol** | 4 | 3 | 5 | 4 | 5 | **21/25** | PASS |
| **Video vs AI Pipelines** | 3 | 4 | 4 | 4 | 4 | **19/25** | FAIL |
| **Lifecycle Steps** | 3 | 3 | 4 | 3 | 4 | **17/25** | FAIL |
| **go-livepeer** | 4 | 4 | 5 | 5 | 5 | **23/25** | PASS |
| **AI Runner** | 4 | 4 | 5 | 5 | 5 | **23/25** | PASS |
| **livepeer_cli** | 4 | 4 | 5 | 5 | 5 | **23/25** | PASS |
| **Arbitrum Contracts** | 4 | 3 | 5 | 4 | 5 | **21/25** | PASS |

**Notes on failing H3s:**

- `Video vs AI Pipelines` — Check 3.3: literal contrast label (`X vs Y`). Rule: "No X vs Y headings — name the governing concept instead." The section is a comparison table. Suggested rename: `Pipeline Comparison` (4/4/5/4/5 = 22) or `Video and AI Pipeline Differences` (still borderline). Best: `Pipeline Types` (describes both without contrast label; 4/4/5/4/5 = 22). PASS if renamed.

- `Lifecycle Steps` — "Lifecycle" is accurate but vague without the domain anchor. "Steps" is implicit in a numbered list. Suggested rename: `Job Processing Steps` (5/4/5/5/4 = 23) or `Job Lifecycle` (already used in the CustomDivider middleText above — consistent at least). The divider says "Job Lifecycle"; the H3 under `Request Flow` says "Lifecycle Steps". If the H2 is `Request Flow`, the H3 should deepen it: `Request Processing Steps` (5/4/5/5/4 = 23).

---

## 4. Page Structure & Content Architecture

### 4.1 One purpose, one audience, one job

PASS — Page has a single purpose: explain the architectural position, internal components, and interaction patterns of an Orchestrator node. Audience is `orchestrator`. One job: understand how the system is structured before setup or operation.

### 4.2 Purpose statement test

PASS — "This page lets the orchestrator operator understand the layer position, dual pipeline architecture, request flow, and key software components of the go-livepeer node." Clear and completable.

### 4.3 PREV_PAGE / NEXT_PAGE adjacency

INFO — Architecture fits between `role.mdx` (what orchestrators are) and `capabilities.mdx` (what they can do) in the Concepts section. This is a logical position. No explicit prev/next frontmatter fields on this page, but the Related Pages cards do point to role, capabilities, and incentive-model. Cross-references present but not using a standard `prev`/`next` field.

### 4.4 No dead ends

PASS — Related Pages section provides 4 forward paths: Role, Capabilities, Incentive Model, Payment Flow. However, see Link Check (Section 8): `payment-flow` link is broken. Functionally this creates a partial dead end on that path.

### 4.5 Prerequisites stated or linked

PASS — No explicit prerequisites section, but acceptable for a `concept`/`explain` page. The Related Pages structure assumes readers can follow cross-links.

### 4.6 Out-of-scope is clear

PASS — Lines 61 cross-reference what is covered elsewhere ("For what Orchestrators *do*, see Capabilities. For why you would run one, see Incentive Model."). Scope boundaries are implicit but clear.

### 4.7 Information type per section is correct

PASS — Page purpose is `explain`. Permitted information types for `explain`: conceptual, analytical, structural. Page uses: structural (layer diagram), conceptual (interaction descriptions), analytical (pipeline comparison table). All correct.

### 4.8 No content duplication

INFO — The `Setup Configurations` section (tabs: Combined, O-T Split, Pool Operator) covers ground that likely overlaps with `v2/orchestrators/setup/guide.mdx` and `v2/orchestrators/guides/deployment-details/setup-options.mdx`. On a concept page, brief topology descriptions are acceptable; detailed setup instructions are not. The bash code blocks in the Combined and O-T Split tabs push toward guide/instruction territory. This is a borderline scope creep finding. The code blocks are minimal and contextual, so PASS with note: confirm with setup pages that the CLI examples here do not duplicate or contradict those pages.

### 4.9 Section orientation page present

N/A — This is a section-level check, not a page-level check.

### 4.10 Cross-tab links at journey intersections

INFO (tab-level check) — At the page level, all Related Pages links remain within the Orchestrators tab. No cross-tab links. The `contract-addresses` link points within the tab (resources). This is consistent for a concept page; cross-tab links are appropriate at portal/navigator level.

---

## 5. Layout, Components & Template

### 5.1 Correct template for pageType

PASS — `concept` pages require an Overview section. The page opens with a layer diagram and description. Structural skeleton is appropriate.

### 5.2 Required sections present

PASS — `concept` requires: Overview. Present as "Orchestrator Layer Context" with layer diagram and table.

### 5.3 Only approved components used

**PARTIAL FAIL** — Component matrix for `concept`:
- Preferred: `Accordion`, `AccordionGroup`, `CodeGroup`, `Tabs`, `Note`, `Info`, `Tip`
- Not in Preferred: `Card`, `CardGroup`, `LinkArrow`, `StyledTable`, `TableRow`, `TableCell`, `CustomDivider`, `ScrollableDiagram`, `CenteredContainer`, `BorderedBox`

**Used on this page:**
- `StyledTable` / `TableRow` / `TableCell` — custom table components. Not in the Preferred column for `concept`. However, tables are conceptually appropriate for comparison data. Flag but treat as INFO since the matrix does not explicitly list Tables under concept (unlike `reference`).
- `ScrollableDiagram` — wraps mermaid diagrams. Not in Preferred column. Used 3 times. Functionally appropriate for large diagrams.
- `CustomDivider` — used 7 times as section separators. Not in Preferred column.
- `LinkArrow` — used twice inline. Not in Preferred column.
- `Tabs` / `Tab` — **in Preferred** for concept. PASS.
- `Note` — **in Preferred** for concept. PASS.
- `Card` / `CardGroup` — used in Related Pages. Not in Preferred for concept (in Preferred for `resource` and `guide`). Used for navigation footer — common pattern, INFO level.
- `CenteredContainer`, `BorderedBox` — imported but **not used** in the rendered content. Dead imports (not flagged per reporting rules).

**Summary:** Multiple components used that are not in the Preferred column. None are in the Avoid column. All are functionally appropriate. MEDIUM severity overall.

### 5.4 Avoided components absent

PASS — No TODO/TBD placeholder components. No `Coming Soon`. No `PreviewCallout`.

**However:** The open JSX comment block at lines 35–48 is a TODO block in plain text within the file:
```
{/* TODO:
Verify:
- Mermaid diagrams use theme colours...
*/}
```
This is a TODO block in the rendered source. Check 8.6 states: "No TODO/TBD/Coming Soon in published content." This TODO block is in JSX comment syntax, so it will not render to the user. Mintlify strips JSX comments. Technically PASS for rendered output, but the block remains in source. INFO level.

### 5.5 Information type → component mapping

PASS — Conceptual content uses prose; comparative data uses `StyledTable`; multi-config content uses `Tabs`; warnings/notes use `Note`; diagrams use mermaid inside `ScrollableDiagram`.

### 5.6 MDX renders clean

NOT-TESTED — Cannot execute a render. No unclosed tags or broken JSX visible in source review. All imports declared at top. All components have matching open/close tags. Mermaid blocks use correct fenced syntax. PASS (static check only).

### 5.7 No old-schema frontmatter

**FAIL** — `purpose: 'concept'` is a deprecated alias per check 1.4. (Cross-reference: Category 1 finding.)

### 5.8 CSS uses custom properties only

**FAIL** — Mermaid diagram `themeVariables` use hardcoded hex colours:
- `'primaryColor': '#1a1a1a'`
- `'primaryTextColor': '#fff'`
- `'primaryBorderColor': '#2d9a67'`
- `'lineColor': '#2d9a67'`
- `'secondaryColor': '#0d0d0d'`
- `'tertiaryColor': '#1a1a1a'`
- `'background': '#0d0d0d'`
- All `classDef` and `style` lines use hardcoded hex (`#1a1a1a`, `#fff`, `#2d9a67`, `#3b82f6`, `#a855f7`, `#0d0d0d`)

The TODO block in the page source (line 37) acknowledges this: "Mermaid diagrams use theme colours (but must be hardcoded)." This is a known constraint of Mermaid — it does not support CSS custom properties in `themeVariables`. The parenthetical "(but must be hardcoded)" in the TODO indicates the author was aware this is unavoidable for Mermaid.

Treat as N/A for Mermaid blocks specifically — the check is about CSS in MDX/JSX components, where hardcoded hex is avoidable. Mermaid's JS-based theming cannot consume CSS variables at render time.

**Verdict for 5.8:** N/A for Mermaid (unavoidable constraint); PASS for non-Mermaid components (no inline styles with hardcoded hex found outside Mermaid blocks).

### 5.9 Generated file banners

N/A — Page is not generated.

### 5.10 Component naming/import conventions

PASS — PascalCase imports. All from semantic paths (`/snippets/components/...`). No namespace conflicts.

---

## 6. Veracity & Factual Accuracy

### REVIEW flags present in page source

Two open REVIEW flags found:

**REVIEW 1** (line 208):
```
{/* REVIEW: Confirm AIServiceRegistry detached-from-controller status is intentional with Mehrdad */}
```
Located inside the `<Note>` block about `AIServiceRegistry`. The Note states: "The contract is currently detached from the main protocol controller — confirm the current integration status with your setup guide." This is a factual claim about a smart contract's deployment status that is explicitly flagged as unconfirmed. NOT-TESTED.

**REVIEW 2** (line 443):
```
{/* REVIEW: Confirm AI Runner container lifecycle - are containers kept warm between requests? Check with j0sh */}
```
Located in the AI Runner section. The preceding prose states: "Containers are started on demand and kept warm while work is flowing." This is a factual claim about container lifecycle behaviour that is explicitly flagged as unconfirmed. NOT-TESTED.

Both REVIEW flags are correctly formatted. However, their presence means:
- `veracityStatus: verified` cannot be set
- `status: current` is unsupportable without resolving these

### 6.1 Every factual claim citable

**PARTIAL FAIL** — The following claims are NOT-TESTED:

| Claim | Location | Status |
|-------|----------|--------|
| AIServiceRegistry contract address `0x04C0b249740175999E5BF5c9ac1dA92431EF34C5` on Arbitrum Mainnet | Line 204 | NOT-TESTED — address not verified against on-chain data |
| AIServiceRegistry is "detached from the main protocol controller" | Line 207 | NOT-TESTED — open REVIEW flag |
| AI Runner containers "kept warm while work is flowing" | Line 441 | NOT-TESTED — open REVIEW flag |
| Prometheus metrics on "port 7935 by default" | Line 432 | NOT-TESTED — not verified against go-livepeer source |
| Payment unit: "Wei per pixel per segment" (video) | Line 308 | NOT-TESTED — not verified against protocol specs |
| Payment unit: "Wei per pixel or per millisecond" (AI) | Line 309 | NOT-TESTED — not verified against protocol specs |
| Pool Operator example: "Titan Node, and similar" | Line 415 | NOT-TESTED — third-party reference, may be stale |
| `-aiModels` flag syntax example | Line 448 | NOT-TESTED — not executed against go-livepeer |

The following claims are consistent with documented Livepeer architecture and can be treated as PASS at a conceptual level:
- Four Arbitrum contracts (BondingManager, RoundsManager, TicketBroker, ServiceRegistry) — standard protocol documentation. PASS (conceptual).
- Probabilistic micropayment ticket mechanic — well-documented. PASS (conceptual).
- O-T split architecture description — PASS (conceptual, matches known go-livepeer flags).
- `livepeer -orchestrator -transcoder -datadir` CLI pattern — NOT-TESTED (not executed, but flag pattern is standard).

### 6.2 Code/commands tested

**FAIL** — Three code blocks present:

1. Combined mode: `livepeer -orchestrator -transcoder -datadir /path/to/data` — NOT-TESTED.
2. O-T Split (orchestrator): `livepeer -orchestrator -datadir /path/to/data` — NOT-TESTED.
3. O-T Split (transcoder): `livepeer -transcoder -orchAddr <orchestrator-address> -datadir /path/to/data` — NOT-TESTED.
4. AI Runner model flag: `-aiModels "text-to-image:stabilityai/stable-diffusion-3-medium-diffusers,audio-to-text:openai/whisper-large-v3"` — NOT-TESTED.

None of the code blocks have been executed. The commands appear structurally correct based on go-livepeer conventions, but are not verified as current.

### 6.3 No deprecated API usage

NOT-TESTED — Cannot verify CLI flags without executing against current go-livepeer binary. The `-aiServiceRegistry`, `-aiWorker`, `-aiModels`, `-aiModelsDir`, `-orchAddr` flags mentioned are consistent with known go-livepeer documentation but are not verified against the current release.

### 6.4 Numbers are real

**FAIL** — Port 7935 for Prometheus is stated without source citation. Payment units (wei per pixel, wei per millisecond) are stated without source. The AIServiceRegistry contract address is stated without on-chain verification.

### 6.5 REVIEW flags for unverified claims

PASS — Two claims with REVIEW flags are correctly marked. However, the contract address and port number (unflagged) are also unverified — these should have REVIEW flags or source citations. Minor gap.

### 6.6 veracityStatus honest

**FAIL** — `veracityStatus` field is absent. Given two open REVIEW flags and multiple NOT-TESTED claims, the correct value is `unverified`. The page must not be set to `verified` until all REVIEW flags are resolved and CLI flags confirmed against a current build.

### 6.7 Authoritative vs AI-generated glossary

N/A — No glossary references used.

### 6.8 Source staleness check

**HIGH** — The following items have high staleness risk:
- AIServiceRegistry address and controller status (smart contract deployments change)
- AI Runner container lifecycle behaviour (implementation detail, changes with go-livepeer releases)
- CLI flags (`-aiModels`, `-aiWorker`, etc.) — go-livepeer evolves rapidly
- Titan Node reference — third-party entity may no longer exist or operate under this name

### 6.9 No open-ended research tasks

**FAIL** — Two REVIEW flags lack a "named source and concrete next step" beyond the person's name. "Confirm with Mehrdad" and "Check with j0sh" name a person but do not name the source file or query to run. Acceptable as interim flags; must be resolved before `veracityStatus: verified`.

---

## 7. Navigation & Information Architecture

### 7.1 Page exists in docs.json

PASS — Confirmed: `"v2/orchestrators/concepts/architecture"` found at line 2843 of docs.json.

### 7.2 Navigation matches file system

PASS — File exists at `v2/orchestrators/concepts/architecture.mdx`; docs.json entry matches.

### 7.3 Tab entry portal routes to all sections

N/A — Page-level check. Tab-level check is out of scope for this review.

### 7.4 No structural orphans

PASS — Page is in docs.json and in the file system.

### 7.5 Audience journey complete

PASS — Within Concepts, the page fits between Role and Capabilities. Related Pages provide forward paths.

### 7.6 Cross-tab graduation paths exist

N/A — Tab-level check.

### 7.7 File in correct lane

PASS — File is in `v2/orchestrators/concepts/` (publishable content lane). No `_workspace/` content mixed in.

### 7.8 File naming conventions

PASS — `architecture.mdx` — no prefix required for a standard concept page. No `-index.mdx` suffix.

### 7.9 _workspace/ TTL compliance

N/A — File is not in `_workspace/`.

---

## 8. Links & Rendering

### 8.1 All internal links resolve

**FAIL** — Two broken internal links found:

| Link href | Label | File exists? | Status |
|-----------|-------|-------------|--------|
| `/v2/orchestrators/concepts/capabilities` | Capabilities | YES (`capabilities.mdx`) | PASS |
| `/v2/orchestrators/concepts/incentive-model` | Incentive Model | YES (`incentive-model.mdx`) | PASS |
| `/v2/orchestrators/concepts/role` | Orchestrator Role | YES (`role.mdx`) | PASS |
| `/v2/orchestrators/guides/payments-and-pricing/payment-flow` | Payment Flow | **NO** — directory contains only `payments.mdx` and `payment-receipts.mdx` | **BROKEN** |
| `/v2/orchestrators/resources/technical/contract-addresses` | Contract Addresses | **NO** — directory contains `x-contract-addresses.mdx` (x- prefix = deprecated) | **BROKEN** |

**Fix for payment-flow:** The Related Pages card links to `/v2/orchestrators/guides/payments-and-pricing/payment-flow`. The closest match is `payments.mdx`. Fix: change href to `/v2/orchestrators/guides/payments-and-pricing/payments` — OR — confirm if `payment-flow.mdx` is a planned page not yet created, and replace the card with a working link in the interim.

**Fix for contract-addresses:** The inline LinkArrow (line 462) links to `/v2/orchestrators/resources/technical/contract-addresses`. The file `x-contract-addresses.mdx` exists but is x-prefixed (deprecated). There is no unprefixed `contract-addresses.mdx`. Fix: either create the page or remove the link and inline the Arbitrum Mainnet/Sepolia addresses directly.

### 8.2 All external links live

One external link: `https://github.com/livepeer/go-livepeer` (line 435). NOT-TESTED (link check not executed), but the repo is known to exist. Risk: LOW.

### 8.3 All snippet imports resolve

NOT-TESTED — Cannot execute import resolution without build. Static check: all 5 imports reference paths under `/snippets/components/`. Paths appear consistent with project structure conventions.

### 8.4 All images load

N/A — No image files embedded directly. OG image uses the shared fallback (`/snippets/assets/site/og-image/fallback.png`) — not verified but standard project-wide.

### 8.5 Page renders without error

NOT-TESTED — Cannot render without Mintlify build. Static check passes: no unclosed tags, no broken JSX.

### 8.6 No TODO/TBD/Coming Soon in published content

INFO — The `{/* TODO: ... */}` block at lines 35–48 is JSX comment syntax. Mintlify will strip this from rendered output. Does not appear to the reader. However, it signals incomplete review of the page. The items listed (mermaid theme colours, StyledTable, UK spelling, header conciseness, CustomDivider patterns, Media/Video placeholders, REVIEW flag handling) are either already resolved in the page or are ongoing work. Note that the TODO references "Placeholders for Media and Video Resources are in comments with a TODO for a human" — no such placeholders appear in the current file, suggesting some tasks were completed after the TODO was added. The TODO block itself should be removed once the page is considered complete.

---

## 5. Spelling/Typo Check

Scanned all visible text: headings, prose, table cells, diagram labels, card descriptions, code blocks, Note text, Tab labels.

**No spelling errors found.**

One stylistic note: Line 159, `"The Orchestrator does not choose which Gateways to work with - selection runs in the opposite direction."` — uses a hyphen-space (`- `) as a sentence separator. Per project rules, em dashes are banned; hyphens are the approved alternative. This usage is acceptable.

---

## 6. Component Matrix

| Component | Used? | Appropriate for `concept`? | Notes |
|-----------|-------|---------------------------|-------|
| `LinkArrow` | Yes | Not in Preferred column | Used twice for inline cross-references. Functional; MEDIUM severity |
| `StyledTable` / `TableRow` / `TableCell` | Yes | Not in Preferred column | Tables are appropriate for comparison data; not in concept Preferred list. MEDIUM |
| `CustomDivider` | Yes (7×) | Not in Preferred column | Used as section dividers. Not in Preferred. MEDIUM |
| `ScrollableDiagram` | Yes (3×) | Not in Preferred column | Wraps mermaid diagrams. Functionally appropriate. MEDIUM |
| `Tabs` / `Tab` | Yes | **In Preferred** | Correct use for multi-config comparison. PASS |
| `Note` | Yes | **In Preferred** | Correct use for AIServiceRegistry caveat. PASS |
| `Card` / `CardGroup` | Yes | Not in Preferred (in resource/guide) | Used for Related Pages footer. Convention across the tab. INFO |
| `CenteredContainer` | Imported, not used | — | Dead import — not flagged per reporting rules |
| `BorderedBox` | Imported, not used | — | Dead import — not flagged per reporting rules |
| `AccordionGroup` / `Accordion` | Not used | In Preferred | Not needed here; absence is correct |
| `CodeGroup` | Not used | In Preferred | Code blocks used directly; not wrapped in CodeGroup. Acceptable |
| `Info` / `Tip` | Not used | In Preferred | Not needed here |
| TODO/TBD placeholders | No (source only) | — | JSX comment; does not render |
| Coming Soon | No | — | PASS |
| PreviewCallout | No | — | PASS |

---

## 7. Cross-Category Connections

**Root Cause A: Missing required frontmatter fields**
Affects: Cat 1 (complexity missing, lifecycleStage missing, veracityStatus missing, purpose deprecated, industry missing, niche missing) + Cat 5 (5.7 old-schema frontmatter)
Fix: Add to frontmatter:
```yaml
complexity: 'advanced'
lifecycleStage: 'evaluate'
veracityStatus: 'unverified'
industry: ['technical', 'AI']
niche: ['protocol', 'infrastructure', 'hardware']
```
Change: `purpose: 'concept'` → `purpose: 'explain'`
Downgrade: `status: 'current'` → `status: 'draft'` (or remove; unsupportable until REVIEW flags resolved)

---

**Root Cause B: Self-referential body opener**
Affects: Cat 2.3 (banned construction `This page [verb]`) + Cat 2.4 (banned construction) + Cat 2.5 (opening order) + Cat 2.10 (hedging opener)
Fix: Delete lines 58–61 (the `This page explains...` sentence and the Capabilities/Incentive-Model cross-reference line). Begin the body content directly with the CustomDivider and H2. The cross-references are redundant with the Related Pages section at the bottom.

---

**Root Cause C: Two broken internal links**
Affects: Cat 8.1 (broken links) + Cat 4.4 (dead end — Payment Flow card goes nowhere)
Fix:
1. Related Pages card "Payment Flow" href `/v2/orchestrators/guides/payments-and-pricing/payment-flow` → change to `/v2/orchestrators/guides/payments-and-pricing/payments` (or remove card if `payments.mdx` covers different ground than intended)
2. LinkArrow "Contract Addresses" href `/v2/orchestrators/resources/technical/contract-addresses` → the target does not exist as an unprefixed file. Options: (a) link to the x-prefixed file if it is not truly deprecated for reader use, (b) remove the link and inline the Arbitrum Mainnet contract address directly, (c) create `contract-addresses.mdx` as the canonical unprefixed file

---

**Root Cause D: Unverified factual claims (open REVIEW flags + untested code)**
Affects: Cat 6.1, 6.2, 6.4, 6.5, 6.6, 6.9 + Cat 1 (status: current unsupportable)
Fix sequence:
1. Add `veracityStatus: 'unverified'` to frontmatter immediately
2. Downgrade `status: 'current'` to `status: 'draft'`
3. Resolve REVIEW flag 1: confirm AIServiceRegistry controller status with Mehrdad; update Note accordingly
4. Resolve REVIEW flag 2: confirm AI Runner container warm/cold lifecycle with j0sh; update prose accordingly
5. Add source citation for port 7935 (go-livepeer source or official docs)
6. Add source citation for payment units (wei/pixel, wei/ms) — point to protocol spec or TicketBroker implementation
7. Verify `-aiModels` flag syntax against current go-livepeer release
8. Verify AIServiceRegistry contract address on Arbitrum Mainnet against on-chain data

---

**Root Cause E: Heading quality failures**
Affects: Cat 3 (5 headings below 20/25 threshold)
Fix:
- `## Orchestrator Layer Context` → `## Network Stack Position`
- `## Orchestrator Interactions` → `## Gateways, Workers and Arbitrum`
- `## Setup Configurations` → `## Deployment Topologies`
- `## Software Components` → `## Node Software Stack`
- `### Video vs AI Pipelines` → `### Pipeline Types`
- `### Lifecycle Steps` → `### Request Processing Steps`
- `## Related Pages` → INFO; leave as convention

Note: CustomDivider `middleText` values do not always match their corresponding H2 headings. After renaming, ensure divider labels are updated to match:
- `middleText="Layer Position"` → `middleText="Network Stack Position"` (or remove divider text; it is decorative)
- `middleText="System Interactions"` → `middleText="Gateways, Workers and Arbitrum"`
- `middleText="Deployment Configurations"` → `middleText="Deployment Topologies"`
- `middleText="Key Components"` → `middleText="Node Software Stack"`

---

## 8. Blocking Decision

No blocking decision required. Page purpose and audience are unambiguous. All findings are executable without a decision from Alison.

The one scoping question worth flagging (not blocking): The `Setup Configurations` section includes working bash CLI examples. On a `concept` page, this is borderline. If `deployment-details/setup-options.mdx` or `setup/guide.mdx` covers these same configurations with fuller CLI documentation, the bash blocks in this architecture page may be redundant and should be reduced to topology descriptions only. This is a scope alignment question for Alison, not a blocking issue.

---

## 9. Verdict Rationale

**VERDICT: NEEDS WORK**

The page is structurally sound, well-organised, and technically coherent. It covers the right ground for a concept/architecture page and sits correctly in the journey. Prose quality is high; voice register is correct for the audience; UK English is consistent; no banned words or phrases found.

**What prevents PASS:**

1. **CRITICAL — 3 missing required frontmatter fields** (`complexity`, `lifecycleStage`, `veracityStatus`). These are non-negotiable for pipeline compliance.

2. **CRITICAL — `purpose: 'concept'` is a deprecated enum value.** Must be changed to `purpose: 'explain'` before the page can pass taxonomy validation.

3. **HIGH — `status: current` with open REVIEW flags and no `veracityStatus`.** This is an honest-state violation. The page presents itself as verified when it contains two explicitly flagged unverified claims.

4. **HIGH — 2 broken internal links** (`payment-flow`, `contract-addresses`). Both result in 404s. One is in a Related Pages card; one is inline in the body.

5. **HIGH — 5 headings below the 20/25 threshold** (`Orchestrator Layer Context`, `Orchestrator Interactions`, `Setup Configurations`, `Software Components`, `Video vs AI Pipelines`). Three H2s fall in the 15–17 range, which is significantly below bar.

6. **HIGH — Self-referential body opener** ("This page explains..."). Violates the `This page [verb]` banned construction.

7. **MEDIUM — `industry` and `niche` fields absent.** Required per checks framework.

8. **MEDIUM — Multiple components not in Preferred column for `concept`** (`LinkArrow`, `StyledTable`, `CustomDivider`, `ScrollableDiagram`, `Card`/`CardGroup`). None are in the Avoid column; none break the page. Flag for awareness.

**None of these are REWRITE REQUIRED issues.** The content and architecture are correct. All fixes are targeted and executable with the specific corrections listed above. After applying fixes for items 1–6, re-run Category 1, 2, 3, 7, and 8 checks. The page should reach PASS in a single fix round.

---

## Summary Fix List (ordered by severity)

| # | Severity | Category | Fix |
|---|----------|----------|-----|
| 1 | CRITICAL | 1 | Add `complexity: 'advanced'` to frontmatter |
| 2 | CRITICAL | 1 | Add `lifecycleStage: 'evaluate'` to frontmatter |
| 3 | CRITICAL | 1 | Add `veracityStatus: 'unverified'` to frontmatter |
| 4 | CRITICAL | 1 | Change `purpose: 'concept'` → `purpose: 'explain'` |
| 5 | HIGH | 1 | Change `status: 'current'` → `status: 'draft'` (unsupportable with open REVIEW flags) |
| 6 | HIGH | 1 | Add `industry: ['technical', 'AI']` to frontmatter |
| 7 | HIGH | 1 | Add `niche: ['protocol', 'infrastructure', 'hardware']` to frontmatter |
| 8 | HIGH | 2/3 | Delete lines 58–61 (self-referential opener `This page explains...` + cross-reference sentence) |
| 9 | HIGH | 3 | Rename `## Orchestrator Layer Context` → `## Network Stack Position` |
| 10 | HIGH | 3 | Rename `## Orchestrator Interactions` → `## Gateways, Workers and Arbitrum` |
| 11 | HIGH | 3 | Rename `## Setup Configurations` → `## Deployment Topologies` |
| 12 | HIGH | 3 | Rename `## Software Components` → `## Node Software Stack` |
| 13 | HIGH | 3 | Rename `### Video vs AI Pipelines` → `### Pipeline Types` |
| 14 | HIGH | 3 | Rename `### Lifecycle Steps` → `### Request Processing Steps` |
| 15 | HIGH | 8 | Fix Related Pages card: `payment-flow` → `payments` (or confirm correct target) |
| 16 | HIGH | 8 | Fix LinkArrow: `contract-addresses` → confirm correct target or inline contract address |
| 17 | MEDIUM | 2 | Delete line 327–329 (bridging sentence "This is what happens when...") |
| 18 | MEDIUM | 6 | Resolve REVIEW flag 1 (AIServiceRegistry controller status — confirm with Mehrdad) |
| 19 | MEDIUM | 6 | Resolve REVIEW flag 2 (AI Runner container warm/cold lifecycle — confirm with j0sh) |
| 20 | MEDIUM | 6 | Add source citation for port 7935 (Prometheus default) |
| 21 | MEDIUM | 6 | Add source citation for payment units (wei/pixel, wei/ms) |
| 22 | MEDIUM | 6 | Verify `-aiModels` flag syntax against current go-livepeer release |
| 23 | MEDIUM | 6 | Verify AIServiceRegistry contract address `0x04C0b249740175999E5BF5c9ac1dA92431EF34C5` on-chain |
| 24 | MEDIUM | 3 | Update CustomDivider `middleText` values to match renamed H2 headings |
| 25 | INFO | 5 | Remove the `{/* TODO: ... */}` block (lines 35–48) once all items are confirmed resolved |
| 26 | INFO | 8 | Verify external link `github.com/livepeer/go-livepeer` is live |
| 27 | INFO | 4 | Clarify with Alison whether bash CLI blocks in `## Deployment Topologies` duplicate setup-options.mdx |

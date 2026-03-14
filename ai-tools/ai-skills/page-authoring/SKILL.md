---
name: page-authoring
description: >-
  Comprehensive skill for writing new v2 documentation pages. Covers content standards,
  UX patterns, component usage, journey mapping, frontmatter, Mermaid theming,
  page type templates, repo-enforced rules, and reviewer conventions.
---

# SKILL: Page Authoring for Livepeer v2 Docs

This skill contains everything needed to write a new MDX page in the Livepeer v2 documentation. It covers content strategy, UX patterns, component library usage, frontmatter standards, journey mapping, hard repo rules, and reviewer expectations. Repo-enforced rules are backed by hooks and tests; reviewer conventions in this skill are not yet fully scripted.

<CustomDivider />

## 1. HARD RULES (Will Break Build or Fail Review)

### Language
- **UK English spelling** throughout. Use "colour" not "color", "behaviour" not "behavior", "organise" not "organize", "licence" (noun) not "license", "optimise" not "optimize", "catalogue" not "catalog", "centre" not "center", "programme" not "program" (except in computing context where "program" is correct), "analyse" not "analyze", "defence" not "defense", "travelled" not "traveled", "modelling" not "modeling", "labelled" not "labeled".
- Validated by `npm run test:spell` (UK English dictionary).
- Exception: code identifiers, CLI flags, and proper nouns retain their original spelling (e.g. `CenteredContainer`, `--color` flag).

### Typography
- **NO em dashes** ( --- ) anywhere in English docs. Use hyphens (-) or rewrite the sentence. This is a repo violation.
- **NO en dashes** with spaces. Use hyphens.
- **NO curly/smart quotes**. Use straight quotes only.

### Styling
- **NO ad hoc inline styles in MDX files**. Approved exceptions: Mermaid code blocks may hardcode colours from `/snippets/components/page-structure/mermaid-colours.jsx`, and `CustomDivider` may use the approved margin patterns documented below.
- **NO hardcoded hex colours** in page JSX. Use `var(--lp-*)` CSS Custom Properties in JSX components. Mermaid is the approved exception because it requires literal values.
- **NO ThemeData imports**. This pattern is deprecated.
- **NO Tailwind classes in MDX**. Only within JSX components.
- **NO external CSS files**. Styles live inside `.jsx` component files.

### Imports
- **Absolute paths only**. All imports from `/snippets/components/...`.
- **File extensions required**. Always include `.jsx` or `.js`.
- **Do NOT import Mintlify globals**. `Card`, `Tabs`, `Tab`, `AccordionGroup`, `Accordion`, `Note`, `Warning`, `Tip`, `Info`, `Danger`, `Steps`, `Step`, `Columns` are all globally available. Never import them.
- **Do NOT import React hooks**. `useState`, `useEffect`, etc. are globally available.
- **JSX files cannot import other JSX files**. Data must flow through MDX.

### Content Accuracy
- **On-chain vs off-chain = PAYMENT MODE**. This describes how the gateway handles payments, NOT the workload type. Never write "off-chain AI gateway" or tie on-chain/off-chain to video vs AI. All compute is off-chain on GPU hardware.
- **"Dual" = workload configuration**. Running both video and AI from one node. NOT a third payment mode. Never present it as a third column alongside on-chain and off-chain.
- **No speculative language** unless explicitly labelled as speculative.
- **No fabricated metrics**. Examples must be labelled "illustrative".
- **All claims traceable** to primary sources (GitHub, contracts, explorers, governance proposals, official announcements).

### Comments and Review Flags
- **REVIEW flags** for human verification must use JSX comments: `{/* REVIEW: [question for SME] */}`
- **Media and video placeholders** must use JSX comments with TODO: `{/* TODO: Add screenshot/video of [feature] */}`
- **SME notes** for unverified claims or community estimates: `{/* SME: [source note] */}`
- Never use HTML comments (`[//]: # ()`) in MDX files - always use JSX comments (`{/* */}`)
- These comments are stripped at build time and not visible to readers
- Guide root pages should include the standard review block directly below frontmatter and before imports. Keep the shared block intact and add page-specific review notes separately.

### Frontmatter (Required Fields)
Every page MUST have these fields:

```yaml
---
title: 'Full page title'
sidebarTitle: 'Short nav label'
description: >-
  One-sentence description for SEO and social preview (max ~160 chars).
keywords:
  - livepeer
  - [topic-specific keywords]
'og:image': /snippets/assets/site/og-image/en/[section].png  # or fallback.png
'og:image:alt': Livepeer Docs social preview image for [Section]
'og:image:type': image/png
'og:image:width': 1200
'og:image:height': 630
pageType: [overview|concept|tutorial|how_to|reference|faq|troubleshooting|changelog|glossary|landing]
audience: [gateway-operator|orchestrator|developer|delegator|general]
status: current
lastVerified: YYYY-MM-DD
---
```

Optional but recommended: `purpose`, `tag` (for "Start Here" badges).

<CustomDivider />

## 2. PAGE TYPES AND THEIR PURPOSE

### Lightweight Document Brief (Recommended)

For new pages or major rewrites, start with a short planning brief before drafting. This is a guide aid, not a hard repo requirement, and it can live in task notes rather than the page itself.

Recommended fields:
- `pageType`
- `reader persona`
- `reader question`
- `what the page should help the reader do or understand`
- `what the page explicitly excludes`
- `primary sources to verify`
- `the next action after reading`

Each page type answers a specific question. Never mix concerns.

| Type | Question it answers | Stage | Must include | Must exclude |
|------|-------------------|-------|--------------|--------------|
| **Landing** | Where do I go? | Entry | Value prop, visual navigation cards, entry path choosers | Deep technical explanation, setup steps |
| **Overview/Role** | What IS this? | Orienting | Identity, evolution, sub-roles, mental model analogies, network diagrams | Installation steps, pricing depth |
| **Concept** | How does it WORK? | Evaluating | Internals, layer position, request flow, components, system interactions | Installation commands, operational playbooks |
| **Tutorial** | How do I start? | Activating | Prerequisite checklist, minimum setup, first-job objective, verification | Every edge case, deep background |
| **How-to** | How do I do X? | Operating | Step-by-step workflows, expected outcomes, config examples | Conceptual marketing copy |
| **Reference** | What are the exact details? | Any | Flags, commands, parameters, examples, contract addresses, schemas | Setup walkthroughs, conceptual framing |
| **FAQ** | Quick answers | Any | Concise Q&A, links to canonical pages | Long explanations |
| **Troubleshooting** | Why is this broken? | Operating | Common issue, check, fix format | Broad conceptual explanation |

### The 4-Page Concepts Pattern

Every tab (Gateways, Orchestrators) has 4 concepts pages:

| Page | Question | What belongs here |
|------|----------|------------------|
| **Role** | What IS it? | Identity, evolution, sub-roles (technical/business/network/governance), mental model analogies, "who should care" |
| **Capabilities** | What can it DO? | Workload types, supported features, orchestrator/gateway selection mechanics, "what it does NOT do" boundary |
| **Architecture** | How does it WORK? | Layer position, system interactions, request flow lifecycle, internal components, software references |
| **Economics** | Should I CARE? | Revenue streams, cost structure, payment flow, pricing configuration, case studies, "why operate" motivation |

<CustomDivider />

## 3. UX PATTERNS (Gold Standard)

The approved page structure follows this pattern, derived from the gateway role.mdx which was explicitly approved as "excellent UX".

### Page Skeleton

```mdx
---
[frontmatter]
---

{/* TODO:
Terminology Validation:
- Ensure the terminology and definitions used in this page is consistent with the resources/glossary terminology

Verify:
- Mermaid diagrams use theme colours (but must be hardcoded - see /snippets/components/page-structure/mermaid-colours.jsx)
- Fontawesome icons are used on accordions and tabs (see https://fontawesome.com/search)
- Tables use StyledTable component
- No em-dashes are used (instead use standard -)
- UK spelling is used
- Headers are concise and technical (guide target: 3 words or less)
- CustomDivider uses the approved context-sensitive margin patterns from this skill
- Placeholders for Media & Video Resources are in comments with a TODO for a human.
- REVIEW flags are in JSX flags for a human.
*/}

import { LinkArrow } from '/snippets/components/primitives/links.jsx'
import { StyledTable, TableRow, TableCell } from '/snippets/components/layout/tables.jsx'
import { CustomDivider } from '/snippets/components/primitives/divider.jsx'
import { ScrollableDiagram } from '/snippets/components/content/zoomableDiagram.jsx'
import { CenteredContainer, BorderedBox } from '/snippets/components/layout/containers.jsx'

<CustomDivider style={{margin: "-1rem 0 -1rem 0"}} />

[Optional: CenteredContainer + Tip]

[2-3 sentence narrative intro establishing context and scope]

[Mermaid diagram if the page needs an evolution timeline or overview visual]

<CustomDivider style={{margin: "0 0 -2rem 0"}} middleText="[Section Label]" />

## [First Major Section]

[Prose explanation - ALWAYS prose before any visual]

[Visual: StyledTable, Mermaid diagram, or code block]

[Prose after visual explaining implications]

<CustomDivider style={{margin: "-1rem 0 -2rem 0"}} middleText="[Section Label]" />

## [Second Major Section]

[Continue pattern: prose -> visual -> prose]

<CustomDivider style={{margin: "-1rem 0 -2rem 0"}} />

## Related Pages

<CardGroup cols={2}>
  <Card title="[Title]" icon="[icon]" href="[path]" arrow horizontal>
    [1-2 sentence description]
  </Card>
  [3 more cards]
</CardGroup>
```

### Section Break Pattern
- Use `CustomDivider` between every major section - NEVER use `---` horizontal rules
- Add `middleText="Label"` to label the upcoming section. On guide pages, aim for 1-3 words when clarity allows.
- Use `marginTop: 0` after tables, card groups, tabs, accordions, diagrams, or other block components
- Use `marginTop: -1rem` after prose paragraphs or callouts
- Use `marginBottom: -2rem` when the divider sits directly above a `##` heading
- Use `marginBottom: -1rem` when the divider separates prose from non-heading content
- Common patterns:
  - After component, before `##`: `<CustomDivider style={{margin: "0 0 -2rem 0"}} />`
  - After prose/callout, before `##`: `<CustomDivider style={{margin: "-1rem 0 -2rem 0"}} />`
  - After prose, before non-heading content: `<CustomDivider style={{margin: "-1rem 0 -1rem 0"}} />`

### Opening Hook Pattern
- Do not repeat the frontmatter page title as a visible top-of-page H1 or H2. Frontmatter metadata already becomes the page header.
- After frontmatter and page TODO/review comments, make the first rendered body element `<CustomDivider style={{margin: "-1rem 0 -1rem 0"}} />`
- Then start the page body with 2-3 sentences of narrative prose, or an optional `<CenteredContainer>` + `<Tip>` followed by narrative prose
- Open like a human explaining the system, not like a template announcing itself
- Avoid boilerplate self-description such as "This page covers...", "In this guide...", or "This section explains..." unless a procedural page genuinely needs that framing
- Optionally follow with a Mermaid timeline or overview diagram
- Then cross-reference links: "For X, see [Page]. For Y, see [Page]."

### Closing Pattern
- Always end with `## Related Pages` inside a `<CardGroup>`
- Use `cols={2}` for concept pages (4 cards)
- Use `cols={3}` for reference/navigator pages (6 cards)
- Every card needs `arrow` and `horizontal` props plus a 1-2 sentence description

### Prose-First Rule
- NEVER place a diagram, table, or code block without preceding prose
- Every visual must be introduced by at least one sentence explaining what it shows
- After complex visuals, add a sentence or two explaining the implications
- Pattern: **Explain -> Show -> Interpret**

<CustomDivider />

## 4. COMPONENT USAGE GUIDE

### When to Use Each Component

| Need | Component | Import path |
|------|-----------|-------------|
| Section dividers | `CustomDivider` | `/snippets/components/primitives/divider.jsx` |
| Data tables | `StyledTable`, `TableRow`, `TableCell` | `/snippets/components/layout/tables.jsx` |
| Cross-references | `LinkArrow` | `/snippets/components/primitives/links.jsx` |
| Zoomable diagrams | `ScrollableDiagram` | `/snippets/components/content/zoomableDiagram.jsx` |
| Centred content | `CenteredContainer` | `/snippets/components/layout/containers.jsx` |
| Bordered callout boxes | `BorderedBox` | `/snippets/components/layout/containers.jsx` |
| Sequential steps | `StyledSteps`, `StyledStep` | `/snippets/components/layout/steps.jsx` |
| Images | `Image` | `/snippets/components/primitives/image.jsx` |
| Videos | `YouTubeVideo` | `/snippets/components/content/video.jsx` |

### Mintlify Globals (Do NOT Import)
These are available without imports:
- `<Card>`, `<CardGroup>`
- `<Tabs>`, `<Tab>`
- `<AccordionGroup>`, `<Accordion>`
- `<Note>`, `<Warning>`, `<Tip>`, `<Info>`, `<Danger>`
- `<Steps>`, `<Step>`
- `<Columns>`

### Component Patterns by Use Case

**Binary comparison (on-chain vs off-chain, two options):**
```mdx
<Tabs>
  <Tab title="Option A">
    [Bullet list with feature specs]
  </Tab>
  <Tab title="Option B">
    [Bullet list with feature specs]
  </Tab>
</Tabs>
```

**Detailed spec comparison:**
```mdx
<StyledTable variant="bordered">
  <thead>
    <TableRow header>
      <TableCell header>Factor</TableCell>
      <TableCell header>Option A</TableCell>
      <TableCell header>Option B</TableCell>
    </TableRow>
  </thead>
  <tbody>
    <TableRow>
      <TableCell>**Row label**</TableCell>
      <TableCell>Value</TableCell>
      <TableCell>Value</TableCell>
    </TableRow>
  </tbody>
</StyledTable>
```

### Icons on Interactive Components
- **Accordions** and **Tabs** should use FontAwesome icons via the `icon` prop
- Use `https://fontawesome.com/search` as the source of truth for icon names
- Choose icons that reinforce the content: `"cloud"` for cloud analogies, `"server"` for infrastructure, `"coin"` for economics, `"bolt"` for quickstarts, `"docker"` for Docker, `"linux"` for Linux

**Mental model analogies (persona routing):**
```mdx
<AccordionGroup>
  <Accordion title="From a Cloud Background?" icon="cloud">
    [Prose analogy]
    <ScrollableDiagram title="[Analogy Name]" maxHeight="400px">
      [Mermaid diagram]
    </ScrollableDiagram>
  </Accordion>
  <Accordion title="From an Ethereum Background?" icon="coin">
    [Prose analogy + diagram]
  </Accordion>
  <Accordion title="Neither?" icon="wrench">
    [Prose analogy + diagram]
  </Accordion>
</AccordionGroup>
```

**Multiple operator/business models:**
```mdx
<AccordionGroup>
  <Accordion title="Model name (benefit)" icon="server">
    [Description]
    **Who:** [Target persona]
    **Revenue model:** [How they earn]
  </Accordion>
</AccordionGroup>
```

**Sequential journey/process:**
```mdx
<StyledSteps iconColor="#2d9a67" titleColor="var(--accent)">
  <StyledStep title="Step Name" icon="icon-name">
    [Description with LinkArrow cross-references]
  </StyledStep>
</StyledSteps>
```

**Cross-references (inline):**
```mdx
See <LinkArrow href="/v2/path/to/page" label="Page Name" newline={false} /> for details.
```

**Clarification callouts:**
```mdx
<Note>
[Clarifying information that prevents common misunderstanding]
</Note>

<Warning>
[Constraint or limitation the reader must know]
</Warning>
```

<CustomDivider />

## 5. MERMAID DIAGRAM STANDARDS

### Required Theme Block
Every Mermaid diagram MUST use the canonical hardcoded palette from `/snippets/components/page-structure/mermaid-colours.jsx`. Mermaid is the approved exception to the no-hardcoded-colours rule because Mermaid does not support CSS custom properties. Use this base configuration:

```
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2b9a66', 'primaryTextColor': '#E0E4E0', 'primaryBorderColor': '#18794E', 'lineColor': '#2b9a66', 'secondaryColor': '#1a1a1a', 'tertiaryColor': '#3CB540', 'background': '#0d0d0d', 'fontFamily': "Inter, 'Inter Fallback', -apple-system, system-ui" }}}%%
```

### Colour Classes for Dual Pipelines
When showing video vs AI distinction:

```
classDef default fill:#1a1a1a,color:#fff,stroke:#2d9a67,stroke-width:2px
classDef video fill:#1a1a1a,color:#fff,stroke:#3b82f6,stroke-width:2px
classDef ai fill:#1a1a1a,color:#fff,stroke:#a855f7,stroke-width:2px
```

### Subgraph Styling
```
style SubgraphName fill:#0d0d0d,stroke:#2d9a67,stroke-width:1px
```

### Diagram Types by Content

| Content need | Diagram type | When to use |
|-------------|-------------|-------------|
| Evolution/history | `timeline` | Role pages, showing how a concept evolved |
| System layers | `flowchart TB` | Architecture pages, showing layer position |
| Request lifecycle | `sequenceDiagram` | Architecture pages, showing message flow |
| Decision tree | `flowchart TD` | Navigator pages, helping reader choose a path |
| Payment/revenue flow | `flowchart LR` | Economics pages, showing money movement |
| Comparison | `flowchart LR` with subgraphs | Analogies, showing parallel structures |

### ScrollableDiagram Wrapper
Use for any Mermaid that might exceed viewport height:

````mdx
<ScrollableDiagram title="Descriptive Title" maxHeight="600px">

```mermaid
[diagram]
```

</ScrollableDiagram>
````

<CustomDivider />

## 6. JOURNEY MAPPING AND PERSONAS

### Discovery Stages

Content maps to reader stages:

| Stage | Reader state | Content type | Example page types |
|-------|-------------|-------------|-------------------|
| **Orienting** | "What is this?" | Role, Overview | concepts/role, navigator |
| **Evaluating** | "How does it work? Should I care?" | Capabilities, Architecture, Economics | concepts/capabilities, concepts/architecture, concepts/business-model |
| **Activating** | "How do I start?" | Quickstart, Tutorial | quickstart, get-started |
| **Operating** | "How do I do X?" | How-to guides | guides/*, setup/* |
| **Deepening** | "How do I optimise?" | Advanced guides | guides/advanced-operations/* |
| **Reference** | "What are the exact details?" | Reference | resources/technical/* |

### Gateway Personas (5)

| Persona | Name | Core question | Start page | Payment mode |
|---------|------|--------------|------------|-------------|
| A | The Graduate | "How do I self-host?" | Role -> Navigator | Either |
| B | The Provider | "How do I run gateway-as-a-service?" | Business Model -> Opportunities | On-chain |
| C | The Builder | "How do I build a non-Go gateway?" | Architecture -> Remote Signers | Off-chain |
| D | The Broadcaster | "How do I replace cloud transcoding?" | Role -> Quickstart (video) | On-chain |
| E | The Platform Builder | "How do I build a platform on this?" | Business Model -> NaaP guide | Either |

### Orchestrator Personas (5)

| Persona | Name | Core question | Start page |
|---------|------|--------------|------------|
| A | The Miner | "Can I earn from my GPU?" | Role -> Join a Pool |
| B | The Easy Earner | "Simplest path to earnings?" | Join a Pool |
| C | The Pro Operator | "How do I add AI to my setup?" | Capabilities -> AI Config |
| D | The Business | "What's the business case at scale?" | Incentives -> Setup Guide |
| E | The AI Native | "How does Livepeer AI work?" | Capabilities -> Job Types |

### Navigator Page Pattern (7 Sections)

1. **Goal-based Tabs** - 4 tabs by reader goal (AI / Video / Platform / Evaluate), each with numbered LinkArrow path
2. **Gateway/Setup Types** - Payment mode comparison table + Mermaid decision flowchart
3. **Journey (StyledSteps)** - 6 sequential steps through the docs structure
4. **Guides Deep-Dive (AccordionGroup)** - 7-8 topic accordions with bulleted LinkArrow lists
5. **Path Matrix** - Markdown table: persona x (start / continue / reference)
6. **Quick Links (CardGroup)** - 6 cards in cols={3}

<CustomDivider />

## 7. CROSS-REFERENCING RULES

### Internal Links
- Use `<LinkArrow>` for inline cross-references within prose
- Use `<Card>` in `<CardGroup>` for navigational cross-references at section ends
- Use standard markdown links `[text](path)` in tables and lists only
- All paths are relative to site root: `/v2/gateways/concepts/role`

### Link Text Patterns
- "See [Page Name] for [what they'll find there]"
- "For X, see [Page Name]"
- Never "click here" or bare URLs

### Cross-Tab References
When referencing the other tab (gateways mentioning orchestrators or vice versa):
- Always include context: "Orchestrators, by contrast, earn at the protocol level"
- Use LinkArrow with full label: `<LinkArrow href="/v2/orchestrators/concepts/role" label="Orchestrator Role" />`

<CustomDivider />

## 8. WRITING STYLE

### Language Standard
- **UK English** for all prose, headings, descriptions, and frontmatter
- Common spelling differences to watch:
  - -ise/-isation (not -ize/-ization): organise, optimise, monetise, synchronisation
  - -our (not -or): colour, behaviour, favour, honour, neighbour
  - -re (not -er): centre, metre (but "parameter" is correct in both)
  - -lled/-lling (not -led/-ling): modelling, labelled, travelled, cancelled
  - -ence (not -ense): licence (noun), defence
  - -yse (not -yze): analyse
  - -ogue (not -og): catalogue, dialogue
- Exception: code identifiers retain their original spelling (`CenteredContainer`, `backgroundColor`, `--color`)
- Exception: proper nouns and brand names retain original spelling (GitHub, Ethereum, ComfyStream)

### Voice
- Direct, technical, actionable
- Entity-led prose: prefer "the gateway", "a gateway", "gateways", "the orchestrator", "applications"
- Avoid first-person editorial voice: "we", "our", "us"
- Avoid reader-owned second-person framing in explanatory prose: "your gateway", "your node", "your application"
- Capitalise actor/persona labels when the term is functioning like a named role or title: `Gateway`, `Orchestrator`, `Delegator`
- Keep generic system-role prose lowercase: `a gateway routes requests`, `orchestrators set prices`, `delegators bond LPT`
- Apply the same title-style capitalisation in diagrams, tabs, comparison columns, persona matrices, and other actor labels
- Use imperative instructions for procedures: "Configure the gateway", "Set `-orchAddr`", "Run the node"
- Present tense for current behaviour, past tense for history
- Active voice preferred

### Tone
- Human, technical, and calm
- Prefer concrete nouns and verbs over promotional adjectives
- Prefer readability over artificial sentence-shortening. Shorten sentences when it improves clarity, not to satisfy a mechanical rule.
- Avoid meta-prose that talks about the document more than the system
- If a sentence sounds like product copy rather than technical explanation, rewrite it

### Structure
- Short paragraphs (2-4 sentences max)
- Bullet lists for 3+ parallel items
- Numbered lists only for sequential steps
- Bold for key terms on first use: **probabilistic micropayment tickets**
- Code formatting for CLI flags, file names, and config values: `-maxPricePerUnit`, `aiModels.json`

### Review Warnings: Filler And Marketing Language
- Treat filler and marketing language as a review warning, not a hard blocker by default
- Trim words like `simply`, `just`, `seamless`, `robust`, `powerful`, `leverage`, `unlock`, `easy`, `intuitive`, `best-in-class`, and `in this guide we will` when they do not add precise meaning
- Replace generic praise with concrete behaviour, constraints, or evidence
- If an adjective cannot be tied to a measurable or observable claim, remove it

### Definitions
- Define positively first
- Avoid definition by negation as the primary explanation
- Use negation only as a secondary boundary sentence when it prevents a common misreading
- Preferred pattern:
  - `X is [broader class] that [distinguishing function].`
  - optional boundary: `It does not [common misreading].`
- Avoid: `BYOC is a routing and policy concern, not a model hosting concern.`
- Prefer: `BYOC handles workload routing and policy across external compute.`
- If contrast is still needed: `BYOC defines routing and policy for external compute. It does not define model hosting.`

### Punctuation
- Hyphens (-) for all dashes. NEVER em dashes.
- Oxford comma: "video, AI, and BYOC"
- No trailing punctuation in bullet list items that are fragments
- Full stops in bullet list items that are complete sentences

### Headings
- **Title Case** for H1 (`#`) and H2 (`##`) headings - capitalise the first letter of each major word: "Payment Flow", "Gateway Costs", "Related Pages"
- **Sentence case** for H3 (`###`) and below: "What gateways pay", "Protocol-level costs"
- Do not restate the frontmatter title as the first visible heading in the page body. Start with the opening divider instead of a duplicate page-title header.
- Keep headings concise and technical. On guide pages, aim for 3 words or less when clarity allows. Use the `middleText` on `CustomDivider` to preview the label. Avoid questions and marketing-style phrasing.
- H3 (`###`) for subsections within a major section
- H4 (`####`) rarely, only for sub-subsections in reference pages
- Never skip levels (no H2 then H4)

### Terminology
- "gateway" not "broadcaster" (legacy term, note once if relevant)
- "orchestrator" not "transcoder" (unless specifically referring to the transcoder worker process)
- "on-chain gateway" / "off-chain gateway" (payment modes)
- "dual-workload configuration" (NOT "dual mode" or "dual gateway type")
- "payment ticket" or "probabilistic micropayment ticket" (not just "ticket")
- "active set" (the pool of eligible orchestrators)
- "reward cut" / "fee cut" (orchestrator config parameters)
- Livepeer (capital L, no hyphen)
- go-livepeer (lowercase g, hyphenated)
- LPT (the token), ETH (the currency)
- Arbitrum One (the L2 chain)
- When these terms appear as actor/persona labels rather than generic nouns, capitalise them: `Gateway`, `Orchestrator`, `Delegator`

<CustomDivider />

## 9. CONTENT BOUNDARIES

### What Belongs in Docs vs Not

| Content | In docs? | Where instead |
|---------|----------|--------------|
| How to use a feature | Yes | How-to guide |
| Why a feature exists | Yes | Concept page |
| Roadmap items / future features | No | Blog, governance proposals |
| Exact contract ABIs | Reference page | Or link to verified Etherscan |
| Community project tutorials | Yes (with attribution) | Community guides section |
| Price recommendations | No (market-dependent) | Note that prices are illustrative |
| Governance proposal outcomes | Yes (after ratification) | Reference or changelog |

### Per-Page Boundaries (Concepts)

**Role page contains:** Identity, evolution, sub-roles, mental models, "who should care"
**Role page does NOT contain:** Workload lists, architecture internals, pricing details, setup steps

**Capabilities page contains:** What it does, workload types, selection mechanics, boundaries
**Capabilities page does NOT contain:** Internal component details, payment flow, setup configuration

**Architecture page contains:** Layer position, system interactions, request flow, internal components
**Architecture page does NOT contain:** Business models, pricing, persona routing, "why" motivation

**Economics page contains:** Revenue, costs, payment flow, pricing config, case studies, "why operate"
**Economics page does NOT contain:** Architecture internals, setup steps, workload details

<CustomDivider />

## 10. USEFULNESS CHECK

- Aim for pages that help a reader act, decide, or route to the next correct page
- A good page should feel useful enough to bookmark, share with a teammate, or use during a real task
- Use the current usefulness tooling as a quality reference:
  - `tools/lib/docs-usefulness/`
  - `tests/unit/usefulness-rubric.test.js`
  - `tests/unit/usefulness-journey.test.js`
- Phase 1 guidance: treat usefulness as a review signal, not as a full tone-enforcement system. Script upgrades can follow in a later phase.

<CustomDivider />

## 11. PRE-COMMIT CHECKS

The following are validated by git hooks on every commit:

1. **Deprecated ThemeData imports** - blocked
2. **Hardcoded hex theme colours outside allowed contexts** - warned
3. **Inline styles in MDX JSX** - blocked
4. **Tailwind classes in MDX** - warned
5. **Relative snippets imports** - flagged
6. **Unnecessary global imports** (Card, Tabs, React hooks) - warned
7. **MDX syntax validation** - must parse
8. **JSON syntax validation** - must parse
9. **Component governance** - registry updated automatically

### Test Commands
```bash
npm test              # All tests
npm run test:style    # Style guide validation
npm run test:mdx      # MDX syntax
npm run test:spell    # UK English spelling
npm run test:quality  # Alt text, links, frontmatter
npm run test:browser  # Page rendering
```

<CustomDivider />

## 12. CHECKLIST: Before Submitting a New Page

- [ ] For new pages or major rewrites, a lightweight Document Brief exists in task notes or planning context
- [ ] Frontmatter has all required fields (title, sidebarTitle, description, keywords, og:image set, pageType, audience, status, lastVerified)
- [ ] Guide root pages include the standard review block directly below frontmatter and before imports
- [ ] UK English spelling throughout (colour, behaviour, organise, optimise, etc.)
- [ ] No em dashes anywhere in the file
- [ ] No ad hoc inline styles in MDX files. Approved exceptions: Mermaid hardcoded colour blocks and the documented `CustomDivider` margin patterns
- [ ] All imports use absolute paths with file extensions
- [ ] No imports of Mintlify globals (Card, Tabs, Note, etc.)
- [ ] The first rendered body element after frontmatter/comments is `<CustomDivider style={{margin: "-1rem 0 -1rem 0"}} />`
- [ ] The frontmatter page title is not repeated as a visible top-of-page H1/H2 in the page body
- [ ] Opening prose reads naturally and avoids boilerplate self-description such as "This page covers..." unless the page genuinely needs it
- [ ] Headings are concise and technical. On guide pages, aim for 3 words or less when clarity allows
- [ ] CustomDividers between all major sections
- [ ] Prose before every diagram, table, and code block
- [ ] Related Pages CardGroup at the bottom
- [ ] All cross-references use LinkArrow (inline) or Card (navigational)
- [ ] Mermaid diagrams use the canonical hardcoded palette from `/snippets/components/page-structure/mermaid-colours.jsx`
- [ ] FontAwesome icons used on Accordions and Tabs, sourced from `https://fontawesome.com/search`
- [ ] Unverified claims flagged with `{/* REVIEW: */}` or `{/* SME: */}` JSX comments
- [ ] Media/video placeholders use `{/* TODO: */}` JSX comments
- [ ] Narrative voice is entity-led. Avoid first-person editorial voice and reader-owned second-person explanatory prose
- [ ] Actor/persona labels capitalise `Gateway`, `Orchestrator`, and `Delegator` when they function as named roles, tabs, diagram nodes, or comparison labels
- [ ] Filler and marketing language has been reviewed and reduced where it weakens clarity
- [ ] Definitions are positive-first; negation is used only as a secondary boundary sentence when needed
- [ ] On-chain/off-chain described as payment modes, not workload types
- [ ] No speculative claims without explicit labels
- [ ] Page answers ONE question (matches its page type)
- [ ] Content does not duplicate another page's scope
- [ ] All personas considered: does this page serve at least one defined persona?
- [ ] The page feels useful enough to bookmark, share, or act on; use the current usefulness rubric/journey tooling as a reference when relevant
- [ ] Page routes correctly in docs.json (or will be added)

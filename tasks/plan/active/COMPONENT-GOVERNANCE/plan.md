# Component Governance Restructuring Plan

> **Status**: Active
> **Branch**: `docs-v2-dev-components` (branched from `docs-v2-dev`)
> **Base worktree**: `/Users/alisonhaire/Documents/Livepeer/Docs-v2-dev` (branch: `docs-v2-dev`)
> **Working worktree**: `/Users/alisonhaire/Documents/Livepeer/Docs-v2-dev-components` (branch: `docs-v2-dev-components`)
> **Last updated**: 2026-03-19

---

## Workflow Protocol

### Branch & Worktree Strategy
- Create branch `docs-v2-dev-components` from `docs-v2-dev`.
- Create worktree at `/Users/alisonhaire/Documents/Livepeer/Docs-v2-dev-components` on that branch.
- Attach worktree to VSCode workspace for live editing.
- **All work happens in the worktree**. No direct edits to the `docs-v2-dev` base.
- Before starting each task: sync latest `docs-v2-dev` changes into the working branch.
- **Nothing is deleted.** Superseded files are `git mv`'d to `components/x-archive/` only after all consumers (pages, imports, other components) are updated and verified.
- Final merge back to `docs-v2-dev` only after full verification of the working branch.

### Import Tracking Protocol
Every file move follows this sequence:
1. Run `scan-component-imports.js` to produce current `component-usage-map.json`.
2. For the file being moved, identify every MDX/JSX page that imports from the old path.
3. Update all import paths to the new location.
4. Grep the entire repo for the old path to confirm zero remaining references.
5. Only then `git mv` the old file to `components/x-archive/` (not deleted — preserved for rollback).

### Human Verification Gates
Every task below requires **explicit human approval** before proceeding to the next:
- Task output is presented for review.
- Human confirms with "proceed" / "approved" / equivalent.
- No task auto-advances without sign-off.
- Completed tasks are marked with ~~strikethrough~~ in this file.

---

## Current State Summary

### Existing Folder Structure
```
snippets/components/
├── primitives/       # 12 JSX files + 8 examples
├── layout/           # 19 JSX files + 8 examples (includes 5 duplicate pairs)
├── content/          # 10 JSX files + 7 examples
├── data/             # 6 JSX files + 2 examples
├── display/          # 1 JSX + 1 MDX (all duplicated elsewhere)
├── page-structure/   # 5 JSX files + 2 examples
├── domain/           # EMPTY
├── integrations/     # EMPTY
└── _archive/         # Legacy sources
```

### Critical Issues
1. **6 duplicate file pairs** (kebab-case + camelCase versions of the same component)
2. **7+ cross-category duplicates** (same component exported from multiple folders)
3. **`display/` folder is redundant** (all contents duplicated in other folders)
4. **`domain/` and `integrations/` are empty placeholders**
5. **No enforced `@label` JSDoc field** tying components to their category
6. **Naming convention inconsistency** (mixed kebab-case and camelCase filenames)
7. **MDX-defined components** (`ApiBaseUrlsTable`) mixed with JSX — belongs in a future `snippets/composables/` directory

---

## Finalised Taxonomy (approved)

### Target Structure
```
snippets/
├── components/
│   ├── elements/        # Smallest visual atoms — no children, no fetching, no arrangement
│   ├── wrappers/        # Holds, groups, or spatially arranges other components
│   ├── displays/        # Renders authored content into a specific visual format
│   ├── scaffolding/     # One-per-page structural skeleton — heroes, portals, frame-mode
│   ├── integrators/     # Fetches, embeds, or binds to external/third-party data
│   ├── config/          # Non-component config objects (e.g. MermaidColours)
│   └── _archive/        # Retired/superseded components
└── composables/         # Future home for MDX-defined composable snippets (TBD)
```

**Removed**: `display/`, `domain/`, `integrations/`, `content/`, `data/`, `primitives/`, `layout/`, `page-structure/`

### Decision Rules

| # | Folder | Decision Rule |
|---|---|---|
| 1 | `elements/` | "Is it a single visual piece that doesn't wrap, arrange, or fetch anything?" |
| 2 | `wrappers/` | "Does it exist to hold, group, or arrange other things?" |
| 3 | `displays/` | "Does it take content and present it in a formatted way?" |
| 4 | `scaffolding/` | "Is it part of the page's outer structure, typically used once?" |
| 5 | `integrators/` | "Does the content come from outside the repo?" |
| 6 | `config/` | "Is it a non-component config/theme object?" |

### Sub-niche Mapping

#### `elements/` — 30 components, 10 sub-niches

| Sub-niche | Component | Current location | Notes |
|---|---|---|---|
| **buttons** | `DownloadButton` | primitives/buttons.jsx | |
| **buttons** | `BasicBtn` | primitives/buttons.jsx | |
| **icons** | `LivepeerSVG` | primitives/icons.jsx | |
| **icons** | `LivepeerIcon` | primitives/icons.jsx | |
| **icons** | `LivepeerIconOld` | primitives/icons.jsx | |
| **icons** | `LivepeerIconFlipped` | primitives/icons.jsx | |
| **images** | `Image` | primitives/image.jsx | |
| **images** | `LinkImage` | primitives/image.jsx | |
| **links** | `CustomCallout` | primitives/links.jsx | |
| **links** | `BlinkingIcon` | primitives/links.jsx | |
| **links** | `BlinkingTerminal` | primitives/links.jsx | |
| **links** | `DoubleIconLink` | primitives/links.jsx | |
| **links** | `GotoLink` | primitives/links.jsx | |
| **links** | `GotoCard` | primitives/links.jsx | |
| **links** | `TipWithArrow` | primitives/links.jsx | |
| **links** | `LinkArrow` | primitives/links.jsx | |
| **text** | `Subtitle` | primitives/text.jsx | |
| **text** | `CopyText` | primitives/text.jsx | |
| **text** | `CardTitleTextWithArrow` | primitives/text.jsx | |
| **text** | `AccordionTitleWithArrow` | primitives/text.jsx | |
| **text** | `CustomCardTitle` | primitives/customCardTitle.jsx | DUPE in page-structure/ — canonical here |
| **math** | `MathBlock` | primitives/math.jsx | |
| **math** | `MathInline` | primitives/math.jsx | |
| **callouts** | `ComingSoonCallout` | primitives/previewCallouts.jsx | |
| **callouts** | `PreviewCallout` | primitives/previewCallouts.jsx | |
| **callouts** | `ReviewCallout` | primitives/previewCallouts.jsx | |
| **spacing** | `Spacer` | primitives/spacer.jsx | DUPE in layout/ — canonical here |
| **spacing** | `CustomDivider` | primitives/divider.jsx | |
| **social** | `SocialLinks` | primitives/socialLinks.jsx | |
| **a11y** | `FocusableScrollRegions` | primitives/a11y.jsx | |

#### `wrappers/` — 30 components, 8 sub-niches

| Sub-niche | Component | Current location | Notes |
|---|---|---|---|
| **containers** | `BorderedBox` | layout/containers.jsx | |
| **containers** | `CenteredContainer` | layout/containers.jsx | |
| **containers** | `FullWidthContainer` | layout/containers.jsx | |
| **containers** | `FlexContainer` | layout/containers.jsx | |
| **containers** | `GridContainer` | layout/containers.jsx | |
| **containers** | `ScrollBox` | layout/cards.jsx | |
| **cards** | `DisplayCard` | layout/customCards.jsx | DUPE in page-structure/ — canonical here |
| **cards** | `WidthCard` | layout/customCards.jsx | DUPE in page-structure/ — canonical here |
| **cards** | `InlineImageCard` | layout/customCards.jsx | DUPE in page-structure/ — canonical here |
| **cards** | `InteractiveCard` | layout/showcase-cards.jsx | DUPE in data/ — canonical here |
| **cards** | `InteractiveCards` | layout/showcase-cards.jsx | DUPE in data/ — canonical here |
| **cards** | `ShowcaseCards` | layout/showcase-cards.jsx | DUPE in data/ — canonical here |
| **lists** | `BasicList` | layout/lists.jsx | |
| **lists** | `IconList` | layout/lists.jsx | |
| **lists** | `StepList` | layout/lists.jsx | |
| **lists** | `StepLinkList` | layout/lists.jsx | |
| **lists** | `UpdateList` | layout/lists.jsx | |
| **lists** | `UpdateLinkList` | layout/lists.jsx | |
| **lists** | `ListSteps` | layout/listSteps.jsx | DUPE: layout/list-steps.jsx |
| **steps** | `StyledSteps` | layout/steps.jsx | |
| **steps** | `StyledStep` | layout/steps.jsx | |
| **accordions** | `AccordionGroupList` | layout/accordionGroupList.jsx | |
| **accordions** | `AccordionLayout` | layout/layout.jsx | DUPE in layout/text.jsx — consolidate |
| **tables** | `DynamicTable` | layout/table.jsx | |
| **tables** | `SearchTable` | layout/searchTable.jsx | DUPE: layout/search-table.jsx |
| **tables** | `StyledTable` | layout/tables.jsx | |
| **tables** | `TableCell` | layout/tables.jsx | |
| **tables** | `TableRow` | layout/tables.jsx | |
| **grids** | `QuadGrid` | layout/quadGrid.jsx | DUPE: layout/quad-grid.jsx |
| **grids** | `CardCarousel` | layout/cardCarousel.jsx | DUPE: layout/card-carousel.jsx |

#### `displays/` — 17 components, 5 sub-niches

| Sub-niche | Component | Current location | Notes |
|---|---|---|---|
| **code** | `CustomCodeBlock` | content/code.jsx | |
| **code** | `CodeComponent` | content/code.jsx | |
| **code** | `ComplexCodeBlock` | content/code.jsx | |
| **code** | `CodeSection` | content/code.jsx | |
| **video** | `Video` | content/video.jsx | |
| **video** | `TitledVideo` | content/video.jsx | |
| **video** | `ShowcaseVideo` | content/video.jsx | |
| **video** | `CardVideo` | content/video.jsx | |
| **video** | `YouTubeVideo` | content/video.jsx | Takes URL prop, no API call |
| **video** | `YouTubeVideoDownload` | content/video.jsx | |
| **quotes** | `Quote` | content/quote.jsx | |
| **quotes** | `FrameQuote` | content/quote.jsx | |
| **diagrams** | `ScrollableDiagram` | content/zoomableDiagram.jsx | |
| **response-fields** | `ValueResponseField` | content/responseField.jsx | |
| **response-fields** | `CustomResponseField` | content/responseField.jsx | |
| **response-fields** | `ResponseFieldExpandable` | content/responseField.jsx | |
| **response-fields** | `ResponseFieldAccordion` | content/responseField.jsx | |
| **response-fields** | `ResponseFieldGroup` | content/responseField.jsx | |

#### `scaffolding/` — 20 components, 4 sub-niches

| Sub-niche | Component | Current location | Notes |
|---|---|---|---|
| **frame-mode** | `PageHeader` | page-structure/frameMode.jsx | DUPE: display/frame-mode.jsx — canonical here |
| **frame-mode** | `H1` | page-structure/frameMode.jsx | DUPE: display/frame-mode.jsx |
| **frame-mode** | `H2` | page-structure/frameMode.jsx | DUPE: display/frame-mode.jsx |
| **frame-mode** | `H3` | page-structure/frameMode.jsx | DUPE: display/frame-mode.jsx |
| **frame-mode** | `H4` | page-structure/frameMode.jsx | DUPE: display/frame-mode.jsx |
| **frame-mode** | `H5` | page-structure/frameMode.jsx | DUPE: display/frame-mode.jsx |
| **frame-mode** | `H6` | page-structure/frameMode.jsx | DUPE: display/frame-mode.jsx |
| **frame-mode** | `P` | page-structure/frameMode.jsx | DUPE: display/frame-mode.jsx |
| **frame-mode** | `Divider` | page-structure/frameMode.jsx | DUPE: display/frame-mode.jsx |
| **heroes** | `HeroImageBackgroundComponent` | page-structure/portals.jsx | |
| **heroes** | `HeroContentContainer` | page-structure/portals.jsx | |
| **heroes** | `HeroSectionContainer` | page-structure/portals.jsx | |
| **heroes** | `HeroOverviewContent` | page-structure/portals.jsx | |
| **heroes** | `Starfield` | page-structure/heroGif.jsx | |
| **portals** | `PortalContentContainer` | page-structure/portals.jsx | |
| **portals** | `PortalHeroContent` | page-structure/portals.jsx | |
| **portals** | `PortalCardsHeader` | page-structure/portals.jsx | |
| **portals** | `PortalSectionHeader` | page-structure/portals.jsx | |
| **portals** | `LogoHeroContainer` | page-structure/portals.jsx | |
| **page-containers** | `RefCardContainer` | page-structure/portals.jsx | |

#### `integrators/` — 20 components, 4 sub-niches

| Sub-niche | Component | Current location | Notes |
|---|---|---|---|
| **feeds** | `CoinGeckoExchanges` | data/coingecko.jsx | |
| **feeds** | `DiscordAnnouncements` | data/data.jsx | |
| **feeds** | `ForumLatestLayout` | data/data.jsx | |
| **feeds** | `LumaEvents` | data/data.jsx | |
| **feeds** | `LatestVersion` | data/release.jsx | |
| **blog** | `PostCard` | data/data.jsx | |
| **blog** | `CardColumnsPostLayout` | data/data.jsx | |
| **blog** | `BlogCard` | data/data.jsx | |
| **blog** | `CardBlogDataLayout` | data/data.jsx | |
| **blog** | `ColumnsBlogCardLayout` | data/data.jsx | |
| **blog** | `BlogDataLayout` | data/data.jsx | |
| **blog** | `CardInCardLayout` | data/data.jsx | |
| **embeds** | `MarkdownEmbed` | data/embed.jsx | DUPE in content/ — canonical here |
| **embeds** | `EmbedMarkdown` | content/embed.jsx | DUPE of MarkdownEmbed — keep both for now, consolidate later |
| **embeds** | `PdfEmbed` | data/embed.jsx | DUPE in display/embed.mdx — canonical here |
| **embeds** | `TwitterTimeline` | data/embed.jsx | |
| **embeds** | `LinkedInEmbed` | content/video.jsx | Misplaced — move here |
| **embeds** | `ExternalContent` | content/externalContent.jsx | Misplaced — move here |
| **video-data** | `YouTubeVideoData` | data/videoData.jsx | |

#### `config/` — 1 entry (top-level, not a component)

| Entry | Current location | Notes |
|---|---|---|
| `MermaidColours` | page-structure/mermaidColours.jsx | Config object, not a component |

#### Future: `snippets/composables/` (TBD)

| Entry | Current location | Notes |
|---|---|---|
| `ApiBaseUrlsTable` | layout/api-base-urls-table.mdx | MDX-defined — does not belong in components/ |

---

## Duplicate Resolution Summary

| Component(s) | Canonical location | Archive from |
|---|---|---|
| `CustomCardTitle` | `elements/` | page-structure/customCards.jsx |
| `DisplayCard`, `WidthCard`, `InlineImageCard` | `wrappers/` | page-structure/customCards.jsx |
| `Spacer` | `elements/` | layout/layout.jsx |
| `ShowcaseCards`, `InteractiveCard(s)` | `wrappers/` | data/showcaseCards.jsx |
| `ListSteps` | `wrappers/` | layout/list-steps.jsx |
| `CardCarousel` | `wrappers/` | layout/card-carousel.jsx |
| `QuadGrid` | `wrappers/` | layout/quad-grid.jsx |
| `SearchTable` | `wrappers/` | layout/search-table.jsx |
| `AccordionLayout` | `wrappers/` | layout/text.jsx |
| `ExternalContent` | `integrators/` | content/external-content.jsx |
| `PageHeader`, `H1-H6`, `P`, `Divider` | `scaffolding/` | display/frame-mode.jsx |
| `MarkdownEmbed` / `EmbedMarkdown` | `integrators/` | content/embed.jsx (keep both names for now) |
| `PdfEmbed` | `integrators/` | display/embed.mdx |

---

## Tasks

### ~~Task 1: Finalise Category Taxonomy (Interactive)~~
- [x] **Human checkpoint: COMPLETED**
- Presented 4 alternative taxonomy models for review
- Walked through all ~117 components and confirmed target categories
- Resolved ambiguous cases (ShowcaseCards → wrappers, LinkedInEmbed → integrators, etc.)
- Agreed on folder names: `elements/`, `wrappers/`, `displays/`, `scaffolding/`, `integrators/`, `config/`
- Agreed on future `snippets/composables/` for MDX-defined components
- Agreed to keep existing multi-component files for now (one-file-per-component deferred to later)
- Agreed to keep both `MarkdownEmbed` and `EmbedMarkdown` names for now
- **Deliverable**: Signed-off taxonomy and full component mapping (this document)

### Task 2: Create Branch, Worktree & Folder Skeleton
- [ ] **Human checkpoint: review setup before proceeding**
- Create branch `docs-v2-dev-components` from `docs-v2-dev`
- Create worktree at `/Users/alisonhaire/Documents/Livepeer/Docs-v2-dev-components`
- User attaches worktree to VSCode workspace
- Create new folder skeleton inside `snippets/components/`:
  - `elements/` (sub-niches: `buttons/`, `icons/`, `images/`, `links/`, `text/`, `math/`, `callouts/`, `spacing/`, `social/`, `a11y/`)
  - `wrappers/` (sub-niches: `containers/`, `cards/`, `lists/`, `steps/`, `accordions/`, `tables/`, `grids/`)
  - `displays/` (sub-niches: `code/`, `video/`, `quotes/`, `diagrams/`, `response-fields/`)
  - `scaffolding/` (sub-niches: `frame-mode/`, `heroes/`, `portals/`, `page-containers/`)
  - `integrators/` (sub-niches: `feeds/`, `blog/`, `embeds/`, `video-data/`)
  - `config/`
  - `x-archive/` (staging area for superseded files — nothing deleted)
- Old folders (`primitives/`, `layout/`, `content/`, `data/`, `display/`, `page-structure/`, `domain/`, `integrations/`) left untouched until files are moved
- **Deliverable**: Empty folder skeleton ready for file moves; worktree attached to VSCode
- **Gate**: Human confirms skeleton is correct before Task 3

### Task 3: Move Files & Update All Imports (per-file, incremental)
- [ ] **Human checkpoint: review move plan before applying**
- For EACH file being moved, follow this exact sequence:
  1. Run `scan-component-imports.js` to get current `component-usage-map.json`
  2. Copy the file to its new location in the target category/sub-niche folder
  3. Find every MDX/JSX page that imports from the old path (from the usage map)
  4. Update all import paths in those consuming pages to point to the new location
  5. Grep entire repo for the old import path — confirm zero remaining references
  6. `git mv` the old file to `components/x-archive/` (preserved, not deleted)
  7. Commit the move + import updates as a single atomic commit
- Process files one category at a time: elements → wrappers → displays → scaffolding → integrators → config
- Present a summary after each category for human review
- **Deliverable**: All files in new locations; all imports updated; old files in `x-archive/`
- **Gate**: Human confirms each category's moves before proceeding to the next

### Task 4: Deduplicate Files
- [ ] **Human checkpoint: review dedup report before applying**
- Run `scan-component-imports.js` to get ground truth on which duplicate is actually imported
- For each duplicate pair (see Duplicate Resolution Summary), identify which file has real imports vs zero imports
- Generate a dedup report: canonical file (kept), duplicate file (to archive), import count for each
- With approval: update any imports pointing to the duplicate → point to canonical, then `git mv` duplicate to `x-archive/`
- **Deliverable**: Dedup report + no duplicate pairs; all imports point to canonical locations
- **Gate**: Human confirms dedup results before Task 5

### Task 5: Resolve Cross-Category Duplicates
- [ ] **Human checkpoint: review consolidation plan before applying**
- For each cross-category duplicate (see Duplicate Resolution Summary above):
  1. Confirm canonical location from the approved mapping
  2. Find all pages importing from the non-canonical location
  3. Update those import paths to the canonical location
  4. Grep to confirm zero references to the non-canonical path
  5. `git mv` the non-canonical file to `x-archive/`
- **Deliverable**: Each component exists in exactly one location; all imports updated
- **Gate**: Human confirms all import rewrites are correct before Task 6

### Task 6: Enforce Naming Convention
- [ ] **Human checkpoint: review rename list before applying**
- Standardise all JSX filenames to agreed convention
- For each rename: update all import paths in consuming pages, grep to verify, then rename
- Add a lint rule to `lint-structure.js` that flags non-conforming filenames
- **Deliverable**: Consistent filenames + lint guard
- **Gate**: Human confirms renames before Task 7

### Task 7: Add JSDoc `@label` Enforcement
- [ ] **Human checkpoint: review JSDoc requirements before applying**
- Define the required `@label` field (must match one of the 5 categories)
- Add `@label` to all existing component exports
- Extend `generate-component-registry.js` with `--strict` mode (exits non-zero on missing `@label`)
- Update `VALID_CATEGORIES` in `component-governance-utils.js` to new category names
- **Deliverable**: Every exported component has a `@label`; CI-ready validation
- **Gate**: Human confirms JSDoc additions before Task 8

### Task 8: Script Consolidation & Performance
- [ ] **Human checkpoint: review script changes before applying**
- Add `--since <commit>` incremental mode to `scan-component-imports.js`
- Add `--since <commit>` incremental mode to `audit-component-usage.js`
- Extract shared file-list caching into `component-governance-utils.js`
- Fold `generate-component-governance-remediation-reports.js` into registry script's `--validate-only`
- Add filename-convention fast-path to `lint-structure.js` (glob only, no file reads)
- `git mv` superseded scripts to appropriate archive location
- **Deliverable**: Faster scripts, fewer redundant tools
- **Gate**: Human confirms script changes before Task 9

### Task 9: Update Documentation & README
- [ ] **Human checkpoint: review docs before merging**
- Update `snippets/components/README.md` with final structure and component reference tables
- Update `component-registry.json` to reflect all changes
- Verify all example MDX files still render (spot-check via `mintlify dev`)
- `git mv` `catalog.md` scratchpad to `x-archive/`
- **Deliverable**: Accurate documentation matching actual state
- **Gate**: Human confirms documentation accuracy

### Task 10: Trim Governance Overhead
- [ ] **Human checkpoint: review governance simplification proposal**
- Identify which governance scripts/checks are actively used in CI vs unused
- Propose removal or simplification of unused governance tooling
- Present "keep / simplify / archive" recommendation for each governance artifact
- **Deliverable**: Leaner governance that doesn't slow down workflows
- **Gate**: Human confirms governance changes

### Task 11: Final Verification & Merge
- [ ] **Human checkpoint: full review before merge to docs-v2-dev**
- Run full `scan-component-imports.js` — verify zero broken imports
- Run `generate-component-registry.js --strict` — verify all labels present
- Grep for any remaining references to old folder paths (`primitives/`, `layout/`, `content/`, `data/`, `display/`, `page-structure/`)
- Spot-check `mintlify dev` on a non-3000 port to confirm pages render
- With approval: merge `docs-v2-dev-components` back into `docs-v2-dev`
- **Deliverable**: Clean, verified merge; component restructuring complete

---

## Reference

- **Old governance doc**: https://docs.google.com/document/d/1t3eR8Ehm8H6HaUOZFMO7c5Vgka9VechosCgS06FNZ2A/edit?usp=sharing
- **Component registry script**: `tools/scripts/generate-component-registry.js`
- **Import scanner**: `tools/scripts/scan-component-imports.js`
- **Usage auditor**: `tools/scripts/audit-component-usage.js`
- **Governance utils**: `tools/lib/component-governance-utils.js`
- **Current README**: `snippets/components/README.md`

# Review: v2/about/protocol/core-mechanisms.mdx

## Summary

| Category | Score | Notes |
|---|---|---|
| 1. Frontmatter | 6/10 | Has title, sidebarTitle, description, pageType, keywords, OG image, audience, purpose. `Keywords` capitalised. Missing: complexity, lifecycleStage |
| 2. Voice | 6/10 | Very long page (25KB). Mix of polished explanation and raw research notes. Some wall-of-text sections. Uses "we" self-reference. Code-level detail (function signatures, Solidity snippets) mixed with conceptual explanations |
| 3. Headings | 7/10 | Good H2/H3 hierarchy overall. Strong section organisation for a long page |
| 4. Structure | 6/10 | Ambitious scope covering staking, delegation, rewards, inflation, slashing, rounds. 25KB is very long. Could benefit from splitting. Some sections are research-quality rather than docs-quality |
| 5. Layout | 7/10 | Uses DynamicTable, mermaid diagrams, Note/Tip/Warning. Good component variety |
| 6. Veracity | 7/10 | Deep technical accuracy. Solidity code references. Claims match protocol implementation |
| 7. Nav | 8/10 | Registered in docs.json |
| 8. Links | 6/10 | Some internal links. Could use more cross-references given the page length |
| 9. Process | 5/10 | lastVerified: 2026-03-17. `Keywords` capitalised |
| 10. Completeness | 8/10 | Comprehensive coverage of all core mechanisms. May be too comprehensive for a single page |

## Frontmatter Table

| Field | Present | Value | Valid |
|---|---|---|---|
| title | Yes | Core Mechanisms and Functions | OK |
| sidebarTitle | Yes | Core Mechanisms | OK |
| description | Yes | Core mechanisms of the Livepeer protocol... | OK |
| pageType | Yes | concept | OK |
| audience | Yes | general | OK |
| purpose | Yes | concept | OK |
| complexity | No | — | MISSING |
| lifecycleStage | No | — | MISSING |
| keywords | Yes (as `Keywords`) | Array | CASING |
| og:image | Yes | fallback.png | WARN |

## Heading Score Table

| Criterion | Pass |
|---|---|
| First heading is H2 | PASS |
| No skipped levels | PASS |
| No banned heading phrases | PASS |
| Descriptive headings | PASS |

**Heading score: 21/25**

## Verdict

**PASS (needs editing)** — Comprehensive but very long (25KB). Needs voice consistency pass, tighten research-note sections, consider splitting. Fix: `Keywords` casing, add missing frontmatter.

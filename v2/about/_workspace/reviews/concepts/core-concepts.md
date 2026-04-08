# Review: v2/about/concepts/core-concepts.mdx

## Summary

| Category | Score | Notes |
|---|---|---|
| 1. Frontmatter | 6/10 | Has title, sidebarTitle, description, pageType, keywords, OG image, audience, purpose. Missing: complexity, lifecycleStage, sidebarTitle duplicates title exactly |
| 2. Voice | 6/10 | Uses en-dash (U+2011) in "on-chain" — acceptable. Wall of text in overview section with no paragraph breaks. Passive voice in places. Some sentences read as research notes rather than polished documentation |
| 3. Headings | 6/10 | H3 "Overview and separation" as first heading — should be H2. Uses H3 throughout when H2 is appropriate for top-level sections. "What Livepeer Is Not" is a good heading |
| 4. Structure | 5/10 | Page tries to do too many things: overview, protocol vs network split, actors, capabilities, economics hints. Imports composable snippets but the assembly feels disjointed. No clear reading path |
| 5. Layout | 6/10 | Uses snippet imports (Protocol, Network, Actors composables). No Related Pages section. No CTA |
| 6. Veracity | 7/10 | Claims are generally accurate but some are unsourced ("dozens of GPU operators", "ETH fees flow") |
| 7. Nav | 8/10 | Registered in docs.json as `v2/about/concepts/core-concepts` |
| 8. Links | 5/10 | No internal links visible in the main page body. Composable snippets may contain links but the parent page provides no navigation |
| 9. Process | 5/10 | lastVerified: 2026-03-17. No human sign-off |
| 10. Completeness | 5/10 | Covers basics but feels like a research dump rather than a polished concept page. Missing: clear conclusion, next steps, related pages |

## Frontmatter Table

| Field | Present | Value | Valid |
|---|---|---|---|
| title | Yes | Livepeer Core Concepts | OK |
| sidebarTitle | Yes | Livepeer Core Concepts | WARN: same as title |
| description | Yes | A high-level introduction... | OK |
| pageType | Yes | concept | OK |
| audience | Yes | general | OK |
| purpose | Yes | concept | OK |
| complexity | No | — | MISSING |
| lifecycleStage | No | — | MISSING |
| keywords | Yes | Array | OK |
| og:image | Yes | fallback.png | WARN: uses fallback |

## Heading Score Table

| Criterion | Pass |
|---|---|
| First heading is H2 | FAIL — uses H3 |
| No skipped levels | FAIL — jumps to H3 |
| No banned heading phrases | PASS |
| Descriptive headings | PASS |

**Heading score: 16/25**

## Verdict

**NEEDS WORK** — Page reads as a research compilation rather than a polished concept page. Heading hierarchy is broken (H3 used where H2 should be). No Related Pages. Content imported from composable snippets makes the assembly disjointed. Recommend: restructure with proper H2 headings, add Related Pages, tighten prose.

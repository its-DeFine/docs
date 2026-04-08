# Review: v2/about/network/interfaces.mdx

## Summary

| Category | Score | Notes |
|---|---|---|
| 1. Frontmatter | 7/10 | Has title, sidebarTitle, description, pageType, audience, purpose, keywords, OG image. `Purpose` capitalised in frontmatter. Missing: complexity, lifecycleStage |
| 2. Voice | 7/10 | Clean, technical, entity-led. Good use of tables for structured data. Minor: "devs" abbreviation in table |
| 3. Headings | 8/10 | Strong H2 hierarchy covering each interface type. "See also" and "References" at end |
| 4. Structure | 8/10 | Clear single job (interfaces reference). Well-organised by interface type. Code examples included. 5.8KB |
| 5. Layout | 8/10 | Uses DynamicTable, GotoLink components. Code blocks with language tags. Has See Also section |
| 6. Veracity | 6/10 | Some links may be stale (gateway.proto path, JS SDK repo). Livepeer Studio API endpoint should be verified |
| 7. Nav | 8/10 | Registered in docs.json |
| 8. Links | 7/10 | Mix of internal relative (../protocol/blockchain-contracts) and external. External links need freshness check |
| 9. Process | 5/10 | lastVerified: 2026-03-17. `Purpose` field capitalised |
| 10. Completeness | 8/10 | Comprehensive interface coverage. Good code examples |

## Frontmatter Table

| Field | Present | Value | Valid |
|---|---|---|---|
| title | Yes | Network Interfaces | OK |
| sidebarTitle | Yes | Interfaces | OK |
| description | Yes | How to interact with... | OK |
| pageType | Yes | concept | OK |
| audience | Yes | general | OK |
| purpose | Yes (as `Purpose`) | concept | CASING |
| complexity | No | — | MISSING |
| lifecycleStage | No | — | MISSING |
| keywords | Yes | Array | OK |
| og:image | Yes | fallback.png | WARN |

## Heading Score Table

| Criterion | Pass |
|---|---|
| First heading is H2 | PASS |
| No skipped levels | PASS |
| No banned heading phrases | PASS |
| Descriptive headings | PASS |

**Heading score: 22/25**

## Verdict

**PASS (minor fixes)** — Well-structured reference page. Fix: lowercase `Purpose`, add complexity/lifecycleStage, verify external links, use tab-specific OG image.

# Review: v2/about/resources/faq.mdx

## Summary

| Category | Score | Notes |
|---|---|---|
| 1. Frontmatter | 8/10 | Has title, sidebarTitle, description, pageType, pageVariant, audience, purpose, status, lastVerified, keywords, OG image (tab-specific). `Keywords` capitalised. Missing: complexity, lifecycleStage |
| 2. Voice | 9/10 | Clean, direct answers. Entity-led. No hedging. Answers point to deeper pages. UK English |
| 3. Headings | N/A | FAQ page — uses AccordionGroup. No traditional headings beyond title |
| 4. Structure | 8/10 | 2.8KB. Clear single job. Each FAQ links to deeper page. Good coverage of common questions |
| 5. Layout | 8/10 | Uses AccordionGroup, CustomDivider. Correct FAQ template |
| 6. Veracity | 8/10 | Answers are accurate. Links point to correct pages |
| 7. Nav | 8/10 | Registered in docs.json |
| 8. Links | 9/10 | All absolute internal links. All resolve to existing pages |
| 9. Process | 8/10 | status: current. lastVerified: 2026-04-05. Good metadata |
| 10. Completeness | 7/10 | Good FAQ coverage. Could add more questions about AI, delegation, economics |

## Frontmatter Table

| Field | Present | Value | Valid |
|---|---|---|---|
| title | Yes | FAQ | OK |
| sidebarTitle | Yes | FAQ | OK |
| description | Yes | Common questions about... | OK |
| pageType | Yes | reference | OK |
| audience | Yes | community | OK |
| purpose | Yes | reference | OK |
| complexity | No | — | MISSING |
| lifecycleStage | No | — | MISSING |
| keywords | Yes (as `Keywords`) | Array | CASING |
| og:image | Yes | about.png | OK |

## Verdict

**PASS** — Clean FAQ page. Minor: fix `Keywords` casing, add complexity/lifecycleStage.

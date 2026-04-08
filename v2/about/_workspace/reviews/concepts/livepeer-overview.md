# Review: v2/about/concepts/livepeer-overview.mdx

## Summary

| Category | Score | Notes |
|---|---|---|
| 1. Frontmatter | 6/10 | Has title, sidebarTitle, description, pageType, keywords, OG image, audience, purpose. Missing: complexity, lifecycleStage. `Keywords` capitalised |
| 2. Voice | 7/10 | Generally clean. Some hedging ("you can think of"). Occasional passive voice. Uses "What is" heading pattern appropriately. Entity-led in most sections |
| 3. Headings | 7/10 | Proper H2 hierarchy. "What is Livepeer?" heading uses question — allowed for overview. "Why does Livepeer exist?" also question heading. Good descriptive headings otherwise |
| 4. Structure | 7/10 | Clear single job (what Livepeer is). Flows from definition to purpose to architecture. Large page (~10KB) but justified for overview. Has Related Pages |
| 5. Layout | 7/10 | Uses DynamicTable, CustomDivider, Tip, Note components. Has Related Pages section. Missing CTA |
| 6. Veracity | 7/10 | Claims generally accurate. References to whitepaper and protocol repo |
| 7. Nav | 8/10 | Registered in docs.json |
| 8. Links | 7/10 | Mix of relative and absolute links. Some links use `../` relative paths |
| 9. Process | 5/10 | lastVerified: 2026-03-17. `Keywords` capitalised (non-standard) |
| 10. Completeness | 7/10 | Comprehensive overview. Covers what, why, how, who, where next |

## Frontmatter Table

| Field | Present | Value | Valid |
|---|---|---|---|
| title | Yes | Livepeer Overview | OK |
| sidebarTitle | Yes | Livepeer Overview | WARN: same as title |
| description | Yes | What is Livepeer... | OK |
| pageType | Yes | concept | OK |
| audience | Yes | general | OK |
| purpose | Yes | concept | OK |
| complexity | No | — | MISSING |
| lifecycleStage | No | — | MISSING |
| keywords | Yes (as `Keywords`) | Array | CASING |
| og:image | Yes | fallback.png | WARN: uses fallback |

## Heading Score Table

| Criterion | Pass |
|---|---|
| First heading is H2 | PASS |
| No skipped levels | PASS |
| No banned heading phrases | PASS |
| Descriptive headings | PASS |
| Question headings | WARN — 2 question headings, acceptable for overview |

**Heading score: 21/25**

## Verdict

**PASS (minor fixes)** — Solid overview page. Fix: lowercase `Keywords`, add complexity/lifecycleStage, use tab-specific OG image. Tighten hedging language.

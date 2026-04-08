# Review: v2/about/concepts/mental-model.mdx

## Summary

| Category | Score | Notes |
|---|---|---|
| 1. Frontmatter | 6/10 | Has title, sidebarTitle, description, pageType, keywords, OG image, audience, purpose. Missing: complexity, lifecycleStage. `Keywords` capitalised |
| 2. Voice | 7/10 | Clean, structured prose. Some long paragraphs. Uses "you" addressing style which is appropriate for conceptual content. Entity-led in most sections |
| 3. Headings | 8/10 | Strong H2 hierarchy. Descriptive headings. "The Livepeer Stack" as mental model framing works well |
| 4. Structure | 8/10 | Clear single job (mental model). Layered architecture explained well. Large page (~21KB) but justified. Has mermaid diagrams |
| 5. Layout | 7/10 | Uses DynamicTable, mermaid diagrams, Tip/Note. Has Related Pages. Approved components |
| 6. Veracity | 7/10 | Architecture descriptions match known Livepeer structure |
| 7. Nav | 8/10 | Registered in docs.json |
| 8. Links | 7/10 | Has internal links. Mix of relative and absolute |
| 9. Process | 5/10 | lastVerified: 2026-03-17. `Keywords` capitalised |
| 10. Completeness | 8/10 | Comprehensive mental model covering protocol, network, product layers |

## Frontmatter Table

| Field | Present | Value | Valid |
|---|---|---|---|
| title | Yes | The Livepeer Stack and Mental Model | OK |
| sidebarTitle | Yes | Mental Model | OK — shorter, good |
| description | Yes | A layered mental model... | OK |
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

**Heading score: 22/25**

## Verdict

**PASS (minor fixes)** — Strong conceptual page. Fix: lowercase `Keywords`, add complexity/lifecycleStage, use tab-specific OG image.

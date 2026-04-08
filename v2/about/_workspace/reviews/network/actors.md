# Review: v2/about/network/actors.mdx

## Summary

| Category | Score | Notes |
|---|---|---|
| 1. Frontmatter | 7/10 | Has title, sidebarTitle, description, pageType, audience, purpose, keywords, OG image (tab-specific). Missing: complexity, lifecycleStage |
| 2. Voice | 4/10 | Opens with fragment: "and performs actions defined by the system" — orphaned sentence start. Wall of text in Core Actors section. Uses emoji (prohibited). Period-terminated sentences that read like research notes. Inconsistent formatting (some items have periods, trailing whitespace) |
| 3. Headings | 7/10 | H2/H3 hierarchy correct. "Developers And Applications" uses title case inconsistently. "Why Role Separation Matters" is good |
| 4. Structure | 5/10 | Tries to cover too much in Core Actors wall of text, then switches to clean bullet format in Role Summary. Has Related Pages. Contains `--` horizontal rule that should be `---` |
| 5. Layout | 6/10 | Has Related Pages. Actor Pages section with links. No approved components used beyond basic markdown |
| 6. Veracity | 7/10 | Accurate descriptions of actor roles |
| 7. Nav | 8/10 | Registered in docs.json |
| 8. Links | 7/10 | Mix of relative (./livepeer-actors/gateways) and absolute (/v2/orchestrators/portal). All appear to resolve |
| 9. Process | 5/10 | lastVerified: 2026-03-17. Content quality issues suggest incomplete editing pass |
| 10. Completeness | 6/10 | Covers all actor types. Missing: clean separation between overview and detail |

## Frontmatter Table

| Field | Present | Value | Valid |
|---|---|---|---|
| title | Yes | Actors Overview | OK |
| sidebarTitle | Yes | Actors Overview | OK |
| description | Yes | Who participates in Livepeer... | OK |
| pageType | Yes | concept | OK |
| audience | Yes | general | OK |
| purpose | Yes | concept | OK |
| complexity | No | — | MISSING |
| lifecycleStage | No | — | MISSING |
| keywords | Yes | Array | OK |
| og:image | Yes | /snippets/assets/media/og-images/en/about.png | OK |

## Heading Score Table

| Criterion | Pass |
|---|---|
| First heading is H2 | PASS |
| No skipped levels | PASS |
| No banned heading phrases | PASS |
| Descriptive headings | PASS |
| Consistent casing | FAIL — "Developers And Applications" vs "Gateway Operators" |

**Heading score: 18/25**

## Verdict

**NEEDS WORK** — Orphaned opening fragment, wall-of-text Core Actors section, emoji usage, inconsistent formatting. Needs editing pass to clean prose, fix opening, remove emoji, standardise heading casing.

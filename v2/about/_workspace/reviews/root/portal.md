# Review: v2/about/portal.mdx

## Summary

| Category | Score | Notes |
|---|---|---|
| 1. Frontmatter | 7/10 | Has title, sidebarTitle, description, keywords, OG image, pageType, audience, purpose. Missing: complexity, lifecycleStage. Has `mode: frame` (portal-specific). Duplicate keywords in array |
| 2. Voice | 8/10 | Clean, entity-led. Description uses title case "Welcome To The About Portal" — should be sentence case. Subtitle "Discover. Understand. Navigate." is marketing-adjacent but acceptable for portal |
| 3. Headings | N/A | Portal page — no traditional headings. Uses component-based layout |
| 4. Structure | 8/10 | Single job (portal landing). Cards route to key sections. No dead ends. Comments left in JSX (`{/* **Definition** ... */}`) should be cleaned |
| 5. Layout | 8/10 | Correct portal template with HeroSection, PortalContent, Columns. Uses approved components. No Related Pages (acceptable for portal) |
| 6. Veracity | 9/10 | All card links point to existing pages |
| 7. Nav | 8/10 | Registered in docs.json as `v2/about/portal` |
| 8. Links | 9/10 | All absolute paths. All resolve |
| 9. Process | 6/10 | lastVerified: 2026-03-17. OG image uses fallback.png not tab-specific |
| 10. Completeness | 8/10 | Routes to concepts, mental model, protocol, network, glossary, whitepaper. Missing: FAQ, resources/reference section |

## Frontmatter Table

| Field | Present | Value | Valid |
|---|---|---|---|
| title | Yes | About Livepeer: Protocol & Network | OK |
| sidebarTitle | Yes | About Portal | OK |
| description | Yes | Welcome To The About Portal... | CASING: title case in description |
| pageType | Yes | navigation | OK |
| audience | Yes | community | OK |
| purpose | Yes | orient | OK |
| complexity | No | — | MISSING |
| lifecycleStage | No | — | MISSING |
| keywords | Yes | Array (has duplicates) | DUPLICATES: "about livepeer network" x2, "about livepeer protocol" x2 |
| og:image | Yes | /snippets/assets/media/og-images/fallback.png | WARN: uses fallback, not tab-specific |

## Heading Score Table

| Check | Pass |
|---|---|
| Portal page | Exempt — component-driven layout |

## Verdict

**PASS** — Functional portal page. Fixes needed: remove duplicate keywords, use tab-specific OG image, add complexity/lifecycleStage, clean JSX comments, fix description casing.

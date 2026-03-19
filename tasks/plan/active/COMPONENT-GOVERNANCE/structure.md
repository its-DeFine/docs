# Component Folder Structure (Finalised)

> Canonical reference for the target component directory layout.
> Referenced by [plan.md](./plan.md).

```
snippets/
├── components/
│   ├── elements/                        # Smallest visual atoms — no children, no fetching, no arrangement
│   │   ├── a11y/                        # Accessibility helpers
│   │   │   └── FocusableScrollRegions.jsx
│   │   ├── buttons/                     # Button components
│   │   │   ├── DownloadButton.jsx
│   │   │   └── BasicBtn.jsx
│   │   ├── callouts/                    # Status/preview callout banners
│   │   │   ├── ComingSoonCallout.jsx
│   │   │   ├── PreviewCallout.jsx
│   │   │   └── ReviewCallout.jsx
│   │   ├── icons/                       # Brand and UI icons
│   │   │   ├── LivepeerSVG.jsx
│   │   │   ├── LivepeerIcon.jsx
│   │   │   ├── LivepeerIconOld.jsx
│   │   │   └── LivepeerIconFlipped.jsx
│   │   ├── images/                      # Static image display
│   │   │   ├── Image.jsx
│   │   │   └── LinkImage.jsx
│   │   ├── links/                       # Navigation and link elements
│   │   │   ├── CustomCallout.jsx
│   │   │   ├── BlinkingIcon.jsx
│   │   │   ├── BlinkingTerminal.jsx
│   │   │   ├── DoubleIconLink.jsx
│   │   │   ├── GotoLink.jsx
│   │   │   ├── GotoCard.jsx
│   │   │   ├── TipWithArrow.jsx
│   │   │   └── LinkArrow.jsx
│   │   ├── math/                        # Mathematical notation
│   │   │   ├── MathBlock.jsx
│   │   │   └── MathInline.jsx
│   │   ├── social/                      # Social media links
│   │   │   └── SocialLinks.jsx
│   │   ├── spacing/                     # Spacers and dividers
│   │   │   ├── Spacer.jsx
│   │   │   └── CustomDivider.jsx
│   │   └── text/                        # Text display primitives
│   │       ├── Subtitle.jsx
│   │       ├── CopyText.jsx
│   │       ├── CardTitleTextWithArrow.jsx
│   │       ├── AccordionTitleWithArrow.jsx
│   │       └── CustomCardTitle.jsx
│   │
│   ├── wrappers/                        # Holds, groups, or spatially arranges other components
│   │   ├── accordions/                  # Collapsible content groups
│   │   │   ├── AccordionGroupList.jsx
│   │   │   └── AccordionLayout.jsx
│   │   ├── cards/                       # Card-based layouts
│   │   │   ├── DisplayCard.jsx
│   │   │   ├── WidthCard.jsx
│   │   │   ├── InlineImageCard.jsx
│   │   │   ├── InteractiveCard.jsx
│   │   │   ├── InteractiveCards.jsx
│   │   │   └── ShowcaseCards.jsx
│   │   ├── containers/                  # Generic spatial containers
│   │   │   ├── BorderedBox.jsx
│   │   │   ├── CenteredContainer.jsx
│   │   │   ├── FullWidthContainer.jsx
│   │   │   ├── FlexContainer.jsx
│   │   │   ├── GridContainer.jsx
│   │   │   └── ScrollBox.jsx
│   │   ├── grids/                       # Grid and carousel layouts
│   │   │   ├── QuadGrid.jsx
│   │   │   └── CardCarousel.jsx
│   │   ├── lists/                       # List layouts
│   │   │   ├── BasicList.jsx
│   │   │   ├── IconList.jsx
│   │   │   ├── StepList.jsx
│   │   │   ├── StepLinkList.jsx
│   │   │   ├── UpdateList.jsx
│   │   │   ├── UpdateLinkList.jsx
│   │   │   └── ListSteps.jsx
│   │   ├── steps/                       # Step-flow layouts
│   │   │   ├── StyledSteps.jsx
│   │   │   └── StyledStep.jsx
│   │   └── tables/                      # Table layouts
│   │       ├── DynamicTable.jsx
│   │       ├── SearchTable.jsx
│   │       ├── StyledTable.jsx
│   │       ├── TableCell.jsx
│   │       └── TableRow.jsx
│   │
│   ├── displays/                        # Renders authored content into a specific visual format
│   │   ├── code/                        # Code block renderers
│   │   │   ├── CustomCodeBlock.jsx
│   │   │   ├── CodeComponent.jsx
│   │   │   ├── ComplexCodeBlock.jsx
│   │   │   └── CodeSection.jsx
│   │   ├── diagrams/                    # Diagram renderers
│   │   │   └── ScrollableDiagram.jsx
│   │   ├── quotes/                      # Quote renderers
│   │   │   ├── Quote.jsx
│   │   │   └── FrameQuote.jsx
│   │   ├── response-fields/             # API response field renderers
│   │   │   ├── ValueResponseField.jsx
│   │   │   ├── CustomResponseField.jsx
│   │   │   ├── ResponseFieldExpandable.jsx
│   │   │   ├── ResponseFieldAccordion.jsx
│   │   │   └── ResponseFieldGroup.jsx
│   │   └── video/                       # Video and media renderers
│   │       ├── Video.jsx
│   │       ├── TitledVideo.jsx
│   │       ├── ShowcaseVideo.jsx
│   │       ├── CardVideo.jsx
│   │       ├── YouTubeVideo.jsx
│   │       └── YouTubeVideoDownload.jsx
│   │
│   ├── scaffolding/                     # One-per-page structural skeleton
│   │   ├── frame-mode/                  # Frame-mode heading overrides
│   │   │   ├── PageHeader.jsx
│   │   │   ├── H1.jsx
│   │   │   ├── H2.jsx
│   │   │   ├── H3.jsx
│   │   │   ├── H4.jsx
│   │   │   ├── H5.jsx
│   │   │   ├── H6.jsx
│   │   │   ├── P.jsx
│   │   │   └── Divider.jsx
│   │   ├── heroes/                      # Hero section components
│   │   │   ├── HeroImageBackgroundComponent.jsx
│   │   │   ├── HeroContentContainer.jsx
│   │   │   ├── HeroSectionContainer.jsx
│   │   │   ├── HeroOverviewContent.jsx
│   │   │   └── Starfield.jsx
│   │   ├── page-containers/             # Page-level containers
│   │   │   └── RefCardContainer.jsx
│   │   └── portals/                     # Portal page layouts
│   │       ├── PortalContentContainer.jsx
│   │       ├── PortalHeroContent.jsx
│   │       ├── PortalCardsHeader.jsx
│   │       ├── PortalSectionHeader.jsx
│   │       └── LogoHeroContainer.jsx
│   │
│   ├── integrators/                     # Fetches, embeds, or binds to external/third-party data
│   │   ├── blog/                        # Blog feed renderers
│   │   │   ├── PostCard.jsx
│   │   │   ├── CardColumnsPostLayout.jsx
│   │   │   ├── BlogCard.jsx
│   │   │   ├── CardBlogDataLayout.jsx
│   │   │   ├── ColumnsBlogCardLayout.jsx
│   │   │   ├── BlogDataLayout.jsx
│   │   │   └── CardInCardLayout.jsx
│   │   ├── embeds/                      # Third-party embed components
│   │   │   ├── MarkdownEmbed.jsx
│   │   │   ├── EmbedMarkdown.jsx
│   │   │   ├── PdfEmbed.jsx
│   │   │   ├── TwitterTimeline.jsx
│   │   │   ├── LinkedInEmbed.jsx
│   │   │   └── ExternalContent.jsx
│   │   ├── feeds/                       # API-driven data feeds
│   │   │   ├── CoinGeckoExchanges.jsx
│   │   │   ├── DiscordAnnouncements.jsx
│   │   │   ├── ForumLatestLayout.jsx
│   │   │   ├── LumaEvents.jsx
│   │   │   └── LatestVersion.jsx
│   │   └── video-data/                  # Video data from APIs
│   │       └── YouTubeVideoData.jsx
│   │
│   ├── config/                          # Non-component config objects
│   │   └── MermaidColours.jsx
│   │
│   ├── x-archive/                       # Staging area for superseded files (cleared in Task 13)
│   │
│   └── _archive/                        # Existing legacy archive (untouched until cleanup)
│
└── composables/                         # Future: MDX-defined composable snippets (TBD)
    └── (ApiBaseUrlsTable.mdx — to be moved here from layout/)
```

## Decision Rules

| # | Folder | Rule |
|---|---|---|
| 1 | `elements/` | "Is it a single visual piece that doesn't wrap, arrange, or fetch anything?" |
| 2 | `wrappers/` | "Does it exist to hold, group, or arrange other things?" |
| 3 | `displays/` | "Does it take content and present it in a formatted way?" |
| 4 | `scaffolding/` | "Is it part of the page's outer structure, typically used once?" |
| 5 | `integrators/` | "Does the content come from outside the repo?" |
| 6 | `config/` | "Is it a non-component config/theme object?" |

## Component Counts

| Category | Components | Sub-niches |
|---|---|---|
| elements | 30 | 10 |
| wrappers | 30 | 7 |
| displays | 17 | 5 |
| scaffolding | 20 | 4 |
| integrators | 20 | 4 |
| config | 1 | — |
| **Total** | **118** | **30** |

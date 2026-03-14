---
name: mintlify-authoring-style-compliance
description: Author and edit MDX content in compliance with repository style and Mintlify constraints.
tier: 1
triggers:
  - "fix style-guide violations in docs"
  - "author mdx page for livepeer docs"
  - "replace ThemeData usage"
primary_paths:
  - "v2/resources/documentation-guide/style-guide.mdx"
  - "style.css"
  - "tests/unit/style-guide.test.js"
  - "tests/unit/mdx.test.js"
  - "tests/unit/usefulness-rubric.test.js"
  - "tests/unit/usefulness-journey.test.js"
  - ".github/future-recommendations.md"
primary_commands:
  - "node tests/unit/style-guide.test.js --staged"
  - "node tests/unit/mdx.test.js --staged"
---

SKILL: Mintlify Authoring Style Compliance

Goal
Produce docs edits that satisfy style-guide rules and Mintlify behavior without introducing anti-patterns.

Constraints
- Do not bypass hooks (`--no-verify` or `-n`).
- Do not modify `v1/` content; it is frozen/immutable.
- Keep edits within requested scope and avoid protected root changes like `.allowlist` unless explicitly requested.
- Use only repository-backed commands and paths listed in this template.

Workflow
1. Start with validator-backed rules from the style guide and current tests: `ThemeData`, absolute snippet imports, MDX parseability, and the existing staged style checks.
2. Treat Mermaid as the approved hardcoded-colour exception in authored MDX. Source Mermaid colours from `/snippets/components/page-structure/mermaid-colours.jsx`.
3. Do not broaden a scoped content edit into repo-wide cleanup by default. If legacy inline-style or Tailwind cleanup is out of scope, log the follow-up in `.github/future-recommendations.md`.
4. For guide pages, apply authoring guidance where the current task touches the content:
   - For new pages or major rewrites, a lightweight Document Brief in task notes or author planning is recommended, not required.
   - Do not duplicate the frontmatter page title as a top-of-page H1 or H2. Frontmatter metadata already becomes the visible page header.
   - Start the page body with `<CustomDivider style={{margin: "-1rem 0 -1rem 0"}} />` immediately after frontmatter and page TODO/review comments.
   - Open with human explanatory prose, not boilerplate self-description like `This page covers...` or `In this guide...`, unless the page genuinely needs it.
   - Use FontAwesome icons on Tabs and Accordions. Source icon names from `https://fontawesome.com/search`.
   - Keep headings concise and technical. On guide pages, aim for 3 words or less when clarity allows.
   - Review filler and marketing language as a warning-level issue. Trim words like `simply`, `just`, `seamless`, `robust`, and `powerful` when they weaken clarity.
   - Prefer positive definitions. Use negation only as a secondary boundary sentence when it prevents a common misreading.
   - Use `CustomDivider` margin patterns based on context:
     - `marginTop: 0` after tables, card groups, tabs, accordions, diagrams, or other block components
     - `marginTop: -1rem` after prose paragraphs or callouts
     - `marginBottom: -2rem` when directly above a `##` heading
5. Use the current usefulness tooling as a review reference for page quality and reader value:
   - `tools/lib/docs-usefulness/`
   - `tests/unit/usefulness-rubric.test.js`
   - `tests/unit/usefulness-journey.test.js`
   - Treat this as a reviewer signal in phase 1, not as a hard blocker for tone-specific issues.
6. Run staged style + MDX tests to verify compliance, then document any deferred recommendations that are not yet script-enforced.

Command examples
```bash
node tests/unit/style-guide.test.js --staged
node tests/unit/mdx.test.js --staged
```

Deliverable Format
- List of corrected style/MDX issues by file.
- Post-fix staged test results.
- Deferred repo-wide cleanup recommendations recorded in `.github/future-recommendations.md` when needed.

Failure Modes / Fallback
- If style errors are unclear, isolate failing file and rerun unit tests on narrowed scope.
- If MDX parsing fails, inspect frontmatter and JSX blocks first.
- If the requested edit touches a legacy page with broad inline-style or Tailwind debt, keep the requested change scoped and log the wider cleanup item for later instead of rewriting the page opportunistically.
- If the task requires new `CustomDivider` margin styles, note that the current style validator still treats MDX inline styles generically. Follow the authoring skill, then record the validator-alignment follow-up in `.github/future-recommendations.md` if needed.

Validation Checklist
- [ ] No ThemeData patterns introduced.
- [ ] All imports to snippets use absolute paths.
- [ ] Mermaid diagrams that hardcode colours use `/snippets/components/page-structure/mermaid-colours.jsx` as the source of truth.
- [ ] Inline-style or Tailwind cleanup outside the requested scope is either fixed or recorded in `.github/future-recommendations.md`.
- [ ] For new pages or major rewrites, a lightweight Document Brief exists in task notes or planning context when helpful.
- [ ] Guide pages do not repeat the frontmatter title as a visible top-of-page H1/H2.
- [ ] Guide pages start the rendered body with `<CustomDivider style={{margin: "-1rem 0 -1rem 0"}} />` after frontmatter/comments.
- [ ] Guide-page openings read naturally and avoid boilerplate self-description unless the page genuinely needs it.
- [ ] Guide-page icons use FontAwesome names sourced from `https://fontawesome.com/search`.
- [ ] Guide-page headings stay concise and technical. Aim for 3 words or less when clarity allows.
- [ ] Filler or marketing language has been reviewed and reduced where it weakens clarity.
- [ ] Definitions are positive-first; negation is secondary and only used to prevent misreadings.
- [ ] Guide-page `CustomDivider` spacing follows the documented context rules.
- [ ] Page usefulness has been checked against the current rubric/journey expectations where relevant, with gaps documented rather than blocked.
- [ ] Staged style/MDX checks pass or failures are explicitly documented.

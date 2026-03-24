# Check Run Learnings

What works, what doesn't, and how to adjust prompting across batches.

## Batch 1 — Findings from Critical Review

### What worked
- Reports correctly identified missing frontmatter fields, TODO blocks, deprecated values
- Link verification was mostly accurate (portal: 6/6, navigator: 20/20)
- UK English and banned word scans were clean
- Report structure was readable and verdict rationale made sense

### What broke (systematic problems across all 3 reports)

1. **~~`industry`/`niche` flagged as required — they're optional.~~** CORRECTION: User confirmed these ARE required. The critical reviews were wrong. The original check reports were correct to flag them. "Valid if present" means validate the value when present — it does NOT mean optional.

2. **Heading scores invented without rubric breakdown.** Scores like "21/25" given with no per-dimension (Precision/Depth/Stability/Clarity/Conciseness) evidence. Not reproducible.

3. **Fixes say "add appropriate X" — not actionable.** A different agent can't execute "add appropriate industry." Must specify concrete values.

4. **Related findings not connected across categories.** `status: current` + missing `veracityStatus` + TODO block = one problem logged as 3 separate findings in 3 categories.

5. **Checks silently skipped.** Navigator report skipped checks 4.7, 4.9, 4.10, 5.2, 5.5, 7.3-7.9, 9.1, 9.3-9.6 without marking them N/A. Can't tell "checked and passed" from "forgot to check."

6. **Banned construction scan missed `can [verb]` in value claims.** Navigator line 72: "can register" missed while checker declared PASS.

7. **No link verification on index.** 80+ links, zero verified. Checker logged "not verified" as a MEDIUM finding instead of doing the work.

8. **No component-vs-matrix cross-reference.** Navigator uses Accordion, Note, StyledTable — none in the "Preferred" column for `navigation` pageType. Not flagged.

9. **No dead import detection.** Portal has 5 unused imports (H1, H2, H5, P, CustomDivider). Not caught.

10. **No spelling/typo pass.** Index has "Adresses" and "Feasibilits" typos. Not caught.

11. **Duplicate entries not flagged.** Index has two "Join a Pool" entries. Not caught.

12. **Generated pages: script not read.** Index report references the generation script 5+ times but never reads it to find root causes.

### Prompting Changes for Batch 2

| # | Change | Rationale |
|---|--------|-----------|
| P1 | Require 10-field table: field / present? / value / pass-fail | Prevents required/optional conflation |
| P2 | Require per-dimension heading score breakdown (5×5 grid) | Prevents invented scores |
| P3 | Fixes must specify concrete values — no "or as appropriate" | Makes fixes executable by another agent |
| P4 | Add "Cross-Category Connections" section to report | Forces linking related findings |
| P5 | ALL numbered checks must appear — mark N/A with reason if skipped | Prevents silent omission |
| P6 | Banned construction scan protocol: list every can/may/could/might sentence, classify as value-claim or not | Prevents missed violations |
| P7 | Require mechanical link verification (ls/glob at least 20% sample) | Prevents "not verified" findings |
| P8 | Require component-vs-matrix cross-reference table | Prevents vibes-based layout checks |
| P9 | Add dead import check | Missed in all 3 reports |
| P10 | Add spelling/typo pass on all visible text | Missed typos in index |
| P11 | For generated pages: read the generation script first | Root cause > symptom |
| P12 | Add TESTED/NOT-TESTED label on every veracity finding | Prevents hedged "REVIEW" findings |
| P13 | Deduplicate cross-category findings — log once, cross-ref | Prevents inflated finding counts |
| P14 | Add "blocking decision" section when page purpose is ambiguous | Structures conditional fixes |

## Batch 3 — Findings from Critical Review (Batch 3: role.mdx, capabilities.mdx, architecture.mdx)

### What worked
- Frontmatter field presence checks were accurate
- Link verification was executed (some broken links correctly identified)
- UK English and banned word scans partially caught violations
- Veracity claims inventory was structured and mostly complete
- Blocking decisions were correctly escalated (BD-1 through BD-5 across pages)

### What broke (systematic problems across all 3 reports)

1. **Purpose field inferred from pageType instead of read directly.** Both capabilities and architecture reviews fabricated a CRITICAL false positive: checker saw `pageType: concept` and reported `purpose: 'concept'` (deprecated alias) when the page had `purpose: 'explain'`. The purpose field was not read. This cascaded into: false FAIL in Frontmatter Table, false HIGH in summary, phantom top-priority fix that — if executed — could regress a correctly-set field.

2. **"Related Pages" heading scored and flagged despite explicit exemption.** All 3 reports violated this. Role: partially corrected (removed from score table but left in check table cell, Category 3 verdict count, and check 3.7 rationale). Capabilities: fully scored at 15/25, included in fail count, flagged as 3.2 failure. Architecture: fully scored at 13/25 FAIL, recommended renamed to "Next Steps." The instruction "exempt from check 3.1 scoring and check 3.2" is not being applied.

3. **Self-consistency correction only patched one location.** When role.md's self-consistency review corrected the "Related Pages" 3.2 finding, it removed it from the score table but left the FAIL entry in the check table, the count in the Category 3 verdict, and the reference in check 3.7. A remediation executor following the check table would act on a retracted finding.

4. **Heading rename suggestions contained terms from the 3.2 prohibited list.** Role.md recommended `Operator Profiles` as a fix for a heading — when `Profiles` is explicitly in check 3.2's prohibited terms list. Checker proposed a fix that reintroduces the violation it was trying to resolve.

5. **Unverified definition strings proposed as executable fixes.** Role.md proposed a specific definition for "Cascade" as an inline Note, ready to execute, when the definition is AI-generated and not verified against any authoritative source. Unverified content proposed as a fix creates a silent veracity regression.

6. **CustomDivider props not scanned for banned constructions.** Capabilities.mdx `CustomDivider middleText="What Orchestrators Don't Do"` not caught. Banned construction scan scope listed headings, Tip, Note, body prose, table cells, card descriptions — but not CustomDivider props.

7. **Schema rule asserted without source citation.** Capabilities review asserted "status: current requires veracityStatus: verified AND zero REVIEW flags" as a schema constraint and used it to recommend changing `status` to `draft`. No checks.mdx section cited. When a schema constraint cannot be cited, it must be downgraded to INFO and flagged as "inferred policy."

8. **Component not in approved list → FAIL without reading the approval file.** ScrollableDiagram and CenteredContainer marked FAIL without reading `docs-guide/policies/component-layout-decisions.mdx`. An unverified component check result is NOT-TESTED, not FAIL.

9. **Exemptions invented for banned constructions.** Capabilities review classified a banned `if [condition]` construction as a "boundary-setter at page edge" and excused it. This exemption category does not exist in checks.mdx or CLAUDE.md. No exemptions can be applied that are not in the framework.

10. **Banned word "several" declared PASS after checker listed it in criteria.** Architecture.mdx line 374 has "several" (banned minimiser). Checker listed "several" in its criteria scan, returned PASS. The word was present but not caught. Declaring a result without showing the work allows misses.

11. **Navigation sequence stated from memory, not from docs.json.** Architecture review stated the sequence as `role → architecture → capabilities` when docs.json shows `role → capabilities → architecture`. Check 4.3 (adjacency) must read docs.json, never infer from memory.

12. **Verdict summary counts contradicted the check table.** Architecture review verdict paragraph stated different CRITICAL/HIGH counts from the Summary table. The two sections of the same report disagreed.

13. **First occurrence of jargon in Mermaid/diagram labels not treated as first use.** BYOC first appears in a Mermaid timeline label at line 164 before the prose occurrence at line 176. Checker identified line 176 as first use. When a term appears in a diagram label, the fix requires a Note after the diagram block, not just an inline definition at the prose occurrence.

### Prompting Changes for Batch 4

| # | Change | Rationale |
|---|--------|-----------|
| P15 | Read `purpose` field from frontmatter directly. State the exact value in Frontmatter Table. Never infer from pageType | Prevents fabricated CRITICAL false positives on concepts pages |
| P16 | "Related Pages" heading is excluded from the Heading Score Table entirely — no row, no N/A, no score. Check 3.2 must not mention it. Check 3.7 must not reference it. The exemption is total | Incomplete exemption instruction let all 3 checkers partially violate it |
| P17 | Self-consistency corrections must enumerate every location where the corrected finding appears (score table, check table, verdict, cross-category connections, fix list) and update ALL of them before closing the report | Partial corrections leave contradictions that corrupt remediation |
| P18 | Every heading rename suggestion must be validated against the check 3.2 prohibited list: `Types`, `Profiles`, `Modes`, `Overview`, `Basics`, `Details`, `Information`, `Getting Started`. Do not propose a rename that uses these terms | Prevents circular violations |
| P19 | Any definition or explanatory text proposed as a fix must use REVIEW placeholder format: `{/* REVIEW: [term] — verify definition against [source] before inserting */}`. Never write a definition string as if it is verified content | Prevents silent veracity regression via unverified inline definitions |
| P20 | Banned construction scan scope explicitly includes: CustomDivider `middleText` props, AccordionGroup `title` props, Tabs `title` props, any other visible component prop | CustomDivider label missed in capabilities.mdx |
| P21 | Any finding that asserts a schema rule (field X requires field Y) must cite the specific checks.mdx section number. If no citation possible, downgrade to INFO: "inferred policy — source required before actioning" | Prevents invented schema constraints with HIGH severity |
| P22 | If the component approval file (`docs-guide/policies/component-layout-decisions.mdx`) was not actually read, the component result is NOT-TESTED. Do not mark FAIL without reading the file | Unverified component checks inflate FAIL counts |
| P23 | No exemptions to banned constructions beyond those in checks.mdx/CLAUDE.md. When a construction matches the pattern but intent is unclear, flag as BORDERLINE and request human review — do not invent an exemption category | "Boundary-setter at page edge" invented exemption |
| P24 | Banned word/construction scan must show the work: list every candidate match considered, even when the result is PASS. A PASS with no matching candidates listed is not verifiable | "Several" declared clean after being listed in criteria |
| P25 | Check 4.3 (PREV_PAGE/NEXT_PAGE adjacency) requires reading docs.json to confirm sequence. State the specific docs.json lines that were read. Never state a navigation order from memory | Architecture review got sequence wrong |
| P26 | Before closing the report, verify verdict summary counts match the check table FAIL entries. If they disagree, the report is not complete | Verdict/summary contradictions in all 3 reports |
| P27 | When scanning for undefined-at-first-use jargon, check diagram labels and code blocks as first-use candidates. For terms appearing first in Mermaid blocks: propose (1) a Note after the diagram block, and (2) an inline definition at the first prose occurrence | BYOC first-use line incorrectly identified |

## Batch 4 — Findings from Critical Review (Batch 4: operator-impact.mdx, delegate-operations.mdx, realtime-ai-setup.mdx)

### What worked
- P15 held across all 3: purpose field read directly from frontmatter, not inferred from pageType. Caught `evaluation`, `guide` as non-canonical values correctly.
- P21 held: no invented schema rules without citation.
- P22 held on realtime-ai-setup: custom components marked NOT-TESTED rather than FAIL.
- P25 held: operator-impact confirmed nav sequence from docs.json with line references.
- Veracity findings were specific: named numbers, named sources, no "verify this" loose ends.
- Broken link correctly identified with specific path (delegate-operations).

### What broke (systematic problems across Batch 4 reports)

1. **Result column contradicts the checker's own detail.** Checks 2.1, 2.2, 3.6 had FAIL in the result column when the checker's detail text concluded PASS. This inflates apparent failure counts and causes executing agents to act on phantom failures. Appeared in 2/3 reports.

2. **Verdict/count mismatches still occurring.** Operator-impact: "6 failures" stated, 7 IDs listed. Delegate-operations: "FAIL count: 14" stated, actual count is 24. Realtime-ai-setup: heading scores in narrative (16, 14, 17) contradicted the score table (13, 12, 16). P26 from Batch 3 was not fully effective.

3. **Em-dash prohibition not applied to headings or frontmatter description.** CLAUDE.md prohibits em dashes. Checkers applied this only to body prose. Em dashes in H2/H3 headings and in the frontmatter `description` field went unflagged on 2/3 pages.

4. **Unverified occurrences reported as facts.** Operator-impact: second `meaningfully` reported at "line 192 in body prose" — line 192 is blank, the word appears once only. Realtime-ai-setup: BYOC reported as undefined at first use in body prose — the term only appears in the `keywords` frontmatter field. Wrong line numbers throughout (258 vs 256, 214 vs 213). Checkers are not verifying cited content against the actual file.

5. **Orphaned findings.** `can be done` finding in operator-impact check 2.4 never appeared in the Banned Construction Scan table or the fix list. Finding raised in one section, abandoned in others.

6. **Self-contradictory veracityStatus fix.** Operator-impact correctly identified that `status: current` + `veracityStatus: unverified` is incoherent per checks.mdx §1.8, then recommended exactly that combination as the fix.

7. **Link false positive without verification.** Realtime-ai-setup: `/v2/gateways/setup/configure/pricing-configuration` flagged as unverified/broken — it exists in docs.json at line 2628. The link was not checked before flagging.

8. **Invalid severity level.** Delegate-operations used "LOW" severity. Valid levels are CRITICAL / HIGH / MEDIUM / INFO only.

9. **Error type mischaracterised.** Delegate-operations check 5.7 described `purpose: guide` as a "12-type deprecated value." `guide` is a valid 7-type canonical pageType. The error is using a pageType value in a purpose field — a different failure mode from deprecated alias.

10. **Finding evaluated against proposed future state.** Delegate-operations check 4.7 evaluated information type mapping against the proposed `purpose: operate` rather than the actual `purpose: guide`. All findings must evaluate the current state of the page.

11. **Rename suggestions not checked for semantic overlap.** Delegate-operations: renaming "Why delegators matter" to "Delegation Mechanics" was proposed without noting near-identical overlap with the existing "The delegation mechanics…" H2 on the same page.

### Prompting Changes for Batch 5

| # | Change | Rationale |
|---|--------|-----------|
| P28 | Result column must match the detail text conclusion. If detail concludes PASS, write PASS. If FAIL, write FAIL. Before finalising the report, scan every check row: if Result says FAIL but detail says PASS (or vice versa), fix the entry | Inflated failure counts in 2/3 reports |
| P29 | Every cited occurrence of a banned word/term must be verified against the actual file before reporting. Scan the file, count instances, quote the content at the cited line. Do not cite a line number without quoting the content there. | Fabricated second `meaningfully`; wrong line numbers throughout |
| P30 | Em-dash prohibition applies to ALL visible text: H2/H3 headings, frontmatter `description` field, body prose, component props. Not restricted to body prose. | Missed in headings and description on 2/3 pages |
| P31 | Heading scores cited in narrative or verdict text must match the score table exactly. Copy from the table; do not restate from memory. | Narrative vs table contradiction on realtime-ai-setup |
| P32 | When proposing replacement text with a stated character count, count the actual characters in the proposed text before stating the count. | Proposed description fix stated as 163 chars but was 169 |
| P33 | Broken link findings must verify the target against docs.json before flagging. State the docs.json line where you confirmed presence or absence. If the link is in docs.json, it is not broken. | False positive on valid link |
| P34 | A finding raised in the check category section must appear in all applicable report sections (scan table if it's a banned construction, fix list if it has a fix), or be explicitly closed: "Not in fix list — [reason]." No orphaned findings. | `can be done` abandoned mid-report |
| P35 | All findings evaluate the current state of the page as it exists, not a proposed post-fix state. If a check depends on a field value that you are also recommending be changed, note the dependency and evaluate the current value. | Check 4.7 evaluated against proposed purpose |
| P36 | Use only four severity levels: CRITICAL / HIGH / MEDIUM / INFO. "LOW" is not a valid level. Closest equivalent is INFO. | Invalid severity in delegate-operations |
| P37 | When describing why a frontmatter value fails, characterise the error correctly: (a) deprecated alias: value was valid in old schema, no longer valid; (b) wrong field: value is valid but placed in the wrong field (e.g. pageType value in purpose field); (c) invalid value: not in either schema. Checker must state which type of failure applies. | `purpose: guide` mischaracterised as deprecated alias |
| P38 | Heading rename suggestions must be checked against other existing headings on the same page before proposing. If a rename would create a near-identical heading to an existing one, note the conflict and propose a disambiguated version. | Delegation Mechanics / The delegation mechanics conflict |
| P39 | veracityStatus fix must be internally consistent with checks.mdx §1.8: `status: current` requires `veracityStatus: verified`. The valid fixes are: change `status` to `draft`, OR add `veracityStatus: verified` only when the content is actually verified. Never recommend `status: current` + `veracityStatus: unverified`. | Self-contradictory fix in operator-impact |
| P40 | Terms that appear only in the frontmatter `keywords` field are not undefined at first use in body prose. Only scan body prose and visible component props for first-use violations. | BYOC false positive on realtime-ai-setup |

## Prompting Notes

- Batch 1 prompt: full checks.mdx categories 1-9, review execution guide, severity definitions
- Report format: per-page markdown with findings using severity format from checks.mdx
- Batch 2 prompt: incorporates P1-P14 changes above
- Batch 3 prompt: incorporates P1-P27 changes above
- Batch 4 prompt: incorporates P1-P40 changes above

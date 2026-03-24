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

## Prompting Notes

- Batch 1 prompt: full checks.mdx categories 1-9, review execution guide, severity definitions
- Report format: per-page markdown with findings using severity format from checks.mdx
- Batch 2 prompt: incorporates P1-P14 changes above

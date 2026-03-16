---
name: review-gate
version: 1.0
description: >
  L5 publish gate. Load before any pre-merge review.
  Apply every item as a binary pass/fail.
  A page with any failing item does not merge.
invoke_when:
  - "pre-merge check"
  - "publish gate"
  - "ready to merge"
  - "review before PR"
---

# Publish Gate - L5

Apply every item below. Mark pass or fail.
A single fail blocks merge.

<CustomDivider />

## Auto-checked by CI scripts

These are caught by `lint-copy.js`, `lint-structure.js`, or `lint-patterns.js`.
Confirm CI passes before starting the human checklist.

- [ ] No Tier 1 banned words (`lint-copy.js`)
- [ ] No Tier 1 banned phrases (`lint-copy.js`)
- [ ] No unresolved `{/* REVIEW: */}` flags in rendered content (`lint-structure.js`)
- [ ] No non-USD currency outside declared regional scope (`lint-copy.js`)
- [ ] No empty cells in decision tables (`lint-structure.js`)
- [ ] `pageType`, `audience`, `lastVerified` present in frontmatter (`lint-structure.js`)

<CustomDivider />

## Human review required

### Sequence (L2)
- [ ] Page opens with operator outcome - kept value, one sentence, no conditionals
- [ ] Majority operator path is fully described before variants appear
- [ ] Every introduced path is developed on-page or linked

### Completeness (L3)
- [ ] Every decision aid is complete - no placeholders, no REVIEW flags
- [ ] Every warning or consequence is followed by a prevention action and link
- [ ] Primary actions and URLs appear in body copy, not only inside accordions or Notes

### Tone (L4)
- [ ] No sentence ends on a hedge, disclaimer, or restatement
- [ ] No section ends with a Note that apologises rather than forward-points
- [ ] No diagram and table carry identical information

### Brief compliance
- [ ] L0 Q1-Q4 was completed before drafting (check brief)
- [ ] L1 persona mapping table was completed before drafting (check brief)

<CustomDivider />

## Fail escalation

If the same section fails this gate twice:
Do not attempt a third fix at sentence level.
Load `iteration-diagnostic.md` and run the L6 diagnostic.

If a pattern appears across 3+ pages or fails 2+ fix cycles:
Load `pattern-observer.md` and run the L7 analysis.

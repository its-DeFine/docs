---
name: copy-rules
version: 1.0
description: >
  Sentence-level copy rules for Livepeer documentation.
  Load this skill before any content drafting, editing, or review task.
  Apply every rule to every sentence before it is written or submitted.
---

# Copy Rules - L4 Enforcement

## The master test

Before any sentence ships, ask:
Does this sentence give the operator something they can act on, believe,
or use to make a decision, stated directly, with no qualifications, no contrasts,
and no conditions?
If no: rewrite or delete.

<CustomDivider />

## Banned words

Do not use these words in body prose under any circumstance.
If you find yourself reaching for one, restate the sentence without it.

effectively, essentially, basically, meaningful, significant, real (as intensifier),
various, several, obviously, clearly

<CustomDivider />

## Banned phrases

Do not use any of the following in any form:

- "This section covers"
- "The reason is straightforward"
- "Understanding X is essential"
- "It is important to note"
- "As mentioned above"
- "among other factors"
- "and so on" / "etc."
- "low but not zero"
- "not just [X]"
- "rather than"
- "what it takes"
- "once [X] is stable"
- "it should be noted"
- "not preference"
- "depends on various factors"
- "can generate" / "may produce" in value claims

<CustomDivider />

## Banned constructions

**`not [X]` in value statements**
Defines value by what it is not. Forces the reader to hold two things to understand one.
Rewrite as a positive assertion. Delete the contrast.

**`if [condition]` in body prose**
Conditional gatekeeping. Makes the reader responsible for a knowledge gap the docs should close.
State the condition as a fact, or remove it. Exception: code blocks and prerequisite lists.

**`[value statement] - if [condition]`**
Undercuts the value statement in the same breath.
Split into two sentences. Value first. Requirements second. No dash.

**`rather than`**
Contrast-by-diminishment. Same failure as `not [X]`.
Delete the contrast clause. State the positive directly.

**`This page [verb]`**
Announces content instead of delivering it.
Delete. The page is already open. Start with the content.

**`what it takes`**
Hurdle framing. Implies the reader may not qualify.
State the requirements directly.

**`consistently` without a number**
Vague operational standard.
Add the number or rewrite.

**`can/may [verb]` in value claims**
Weakened assertion.
Assert directly or delete the claim.

<CustomDivider />

## Currency rule

All monetary examples use USD by default.
If content is explicitly region-scoped, declare the region once at section opening
and use local currency consistently within that scope only.
Mixed currencies within one example are banned.

<CustomDivider />

## REVIEW flags

`{/* REVIEW: */}` flags are internal signals only.
They must never appear in rendered content.
Any page with an unresolved REVIEW flag in a decision-critical position
(table cell, numbered step, decision matrix) is blocked from merge.

<CustomDivider />

## Structural rules (summary)

Full rules live in `structure-rules.md`. Apply these minimally here:

- One paragraph, one job
- Lead sentence states the fact; remaining sentences extend or evidence it
- Final sentence: fact, number, or next step; never a hedge or restatement
- Tables and diagrams stand alone; prose restating either is deleted
- High-value URLs and commands appear in body copy, not only inside accordions

<CustomDivider />

## What this skill does not govern

- Content accuracy (SME review, separate gate)
- Page structure and sequence (load `structure-rules.md`)
- Value proposition definition (load `value-prop-check.md`)
- Persona routing (load `persona-routing.md`)

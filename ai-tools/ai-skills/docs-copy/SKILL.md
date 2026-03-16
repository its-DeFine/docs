---
name: docs-copy
version: "1.0"
description: >-
  Route documentation copy planning, rewriting, review, and claim-sensitive updates through the correct Livepeer Docs skills so wording changes stay accurate, scoped, and ready for handoff.
invoke_when:
  - "apply docs-copy framework to this task"
  - "rewrite this docs content for clarity and accuracy"
  - "plan a docs copy pass for this page"
  - "review and tighten this docs copy"
  - "update docs copy after facts changed"
---

# SKILL: Docs Copy

Use this skill as the entry point for documentation copy work when the task is about
improving wording, tightening scope, planning a rewrite, or reviewing changed copy.

## Do Use It For

- planning an edit pass on an existing docs page
- rewriting unclear or overlong docs copy without changing the page's purpose
- reviewing changed wording before handoff
- coordinating fact-sensitive wording changes across related pages
- deciding whether a copy task is really a writing, review, verification, or IA task

## Do Not Use It For

- pure page scaffolding or full new-page authoring without copy review needs
- pure section IA or journey strategy with no copy task attached
- repo-wide UK English normalization work
- isolated factual verification with no rewrite or copy decision needed

## Routing Rules

Classify the request first, then load the next skill explicitly:

- New page or substantial MDX draft:
  load `ai-tools/ai-skills/page-authoring/SKILL.md`
- Section structure, navigation, or journey framing:
  load `ai-tools/ai-skills/product-thinking/SKILL.md`
- Material factual or time-sensitive claims:
  load `ai-tools/ai-skills/templates/33-docs-source-verification.template.md`
- Claim family changes that affect other pages:
  load `ai-tools/ai-skills/templates/35-docs-impact-propagation.template.md`
- Final review verdict on changed copy:
  load `ai-tools/ai-skills/templates/34-docs-change-review.template.md`
- Repo-wide UK English cleanup:
  load `ai-tools/ai-skills/style-and-language-homogenizer-en-gb/SKILL.md`

## Task Modes

Every docs-copy task should end in one of these modes:

- `copy-plan`: edit plan, claim-risk notes, and follow-up files
- `copy-rewrite`: revised copy plus changed-claim summary
- `copy-review`: severity-ranked findings and verdict
- `claim-update`: propagation queue and canonical owner note
- `section-strategy`: writing order and entry-point recommendations

## Workflow

1. Classify the request into one task mode.
2. Load only the adjacent skill or skills needed for that mode.
3. Keep page-type fit, factual accuracy, and canonical ownership ahead of style polish.
4. If wording changes alter factual meaning, verify first and rewrite second.
5. End with the mode-specific output plus the next checks or follow-up paths.

## Handoff Standard

- State the task mode used.
- Name the files reviewed or changed.
- Note whether factual verification was required.
- Name any dependent pages that still need follow-up.
- Report the checks run or not run.

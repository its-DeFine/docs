---
name: product-thinking
description: >-
  Product thinking framework for docs IA and content strategy. Applies JTBD job stories,
  Opportunity Solution Trees, assumption mapping, customer journey mapping, and value
  proposition design to evaluate and improve documentation sections. Adapted from
  github.com/phuryn/pm-skills for documentation contexts.
---

# SKILL: Product Thinking for Documentation

Apply product management frameworks to documentation information architecture, content
strategy, and user journey design. This skill treats documentation as a product where
the user's job is to accomplish a goal, not to "read docs."

---

## When to Use

- Reviewing a full tab or section IA for the first time
- Evaluating whether pages serve real user needs vs organisational convenience
- Identifying content gaps, redundancies, and journey friction
- Prioritising what to write, rewrite, or remove
- Designing navigation and entry points

## When NOT to Use

- Page-level style/copy review (use page-authoring skill)
- Component or code review (use rubric-static-review skill)
- Individual page accuracy checks (use source-content skill)

---

## Step 1: Job Stories (Replace Personas)

Do NOT start with personas ("Solo Miner", "Enterprise Operator"). Start with **situations
that trigger action**. Use the JTBD format:

```
When [situation], I want to [motivation], so I can [outcome].
```

### Rules
- Each job story must describe a **situation**, not a person
- Include 3-6 **acceptance criteria** per story (observable, measurable)
- The same person can appear in multiple job stories (different situations)
- Job stories that share >50% of acceptance criteria should be merged

### Template

```markdown
**J[n]**: "When [situation], I want to [motivation], so I can [outcome]."
- Acceptance: [criterion 1]. [criterion 2]. [criterion 3].
- Pages that serve this job: [list or "none"]
- Gap: [what's missing]
```

### Anti-patterns
- "As a [role], I want to..." - this is a user story, not a job story. Roles are irrelevant.
- Job stories with no acceptance criteria - untestable
- Job stories that map 1:1 to existing pages - you're describing the solution, not the problem

---

## Step 2: Opportunity Solution Tree

Connect a single measurable outcome to customer opportunities, then to solutions.

### Structure

```
Desired Outcome (one measurable goal)
├── Opportunity 1 (customer pain point)
│   ├── Solution A
│   ├── Solution B
│   └── Solution C
├── Opportunity 2
│   ├── Solution D
│   └── Solution E
└── Opportunity 3
    └── Solution F
```

### Scoring Opportunities

Score = Importance (1-10) x (10 - Satisfaction) where Satisfaction = how well current
content addresses the opportunity (1-10).

Prioritise opportunities with the highest score. A high-importance, low-satisfaction
opportunity is more valuable than a low-importance, high-satisfaction one.

### Rules
- Start with ONE desired outcome, not multiple
- Opportunities must come from user research or observable evidence (Discord threads,
  support tickets, analytics, operator interviews), not assumptions
- Generate 3+ solutions per opportunity before committing to one
- Solutions can be: new page, restructured section, merged content, removed content,
  cross-reference, interactive element, or "do nothing"

---

## Step 3: Assumption Mapping

Surface and categorise the beliefs embedded in the current IA.

### Four Dimensions

| Dimension | Question | Example |
|-----------|---------|---------|
| **Value** | Will users find this content valuable? | "Operators want a separate benchmarking page" |
| **Usability** | Can users find and use this content? | "The 7-page setup sequence is navigable" |
| **Viability** | Can we create and maintain this content? | "We have SME access for commercial orchestrator content" |
| **Feasibility** | Does the technical platform support this? | "Mintlify View components work for this use case" |

### Mapping Template

```markdown
| # | Assumption | Dimension | Confidence | Risk | Test |
|---|-----------|-----------|-----------|------|------|
| 1 | [statement] | Value/Usability/Viability/Feasibility | H/M/L | H/M/L | [how to validate] |
```

### Rules
- Include at least 5 assumptions per review
- Flag any assumption with Confidence=Low AND Risk=High as a **blocker**
- Identify **blind spot assumptions** - beliefs so embedded they aren't even stated

---

## Step 4: Customer Journey Map

Map the end-to-end experience for the primary job story.

### Stages

| Stage | Question |
|-------|---------|
| **Awareness** | "How did the user discover this exists?" |
| **Evaluation** | "Is this worth my time/money/effort?" |
| **Decision** | "Which path do I take?" |
| **Setup** | "How do I get it running?" |
| **First Value** | "Did it work? Am I getting what I expected?" |
| **Optimisation** | "How do I get more from this?" |
| **Scaling/Exit** | "What's next - grow, change, or leave?" |

### For Each Stage Document

- **Touchpoint**: Which page/section/tool does the user interact with?
- **Doing**: What action are they taking?
- **Thinking**: What question is in their head?
- **Feeling**: Confident, confused, anxious, frustrated, excited?
- **Friction**: What slows them down or blocks them?
- **Opportunity**: How could the docs serve them better here?

### Critical Moments to Design For

- **Aha moment**: When does the user first understand the value?
- **Churn trigger**: What causes the user to give up?
- **Advocacy trigger**: What makes the user tell others?

---

## Step 5: Value Proposition

Articulate what the documentation section promises to each job story.

### Template

```
For [job story situation],
[section/tab name] shows you [primary benefit],
so you can [desired outcome].
Unlike [current alternative], it [key differentiator].
```

### Rules
- Write one value prop per primary job story (not per page)
- The value prop should be visible on the section's entry page (portal/landing)
- If you can't write a clear value prop, the section has a purpose problem

---

## Step 6: Section Review (Apply to IA)

With Steps 1-5 complete, evaluate the existing IA:

### Checklist

- [ ] Every page serves at least one job story
- [ ] Every job story has at least one page
- [ ] No two pages serve the exact same job story with the same content
- [ ] Section order matches the primary journey (not alphabetical or organisational)
- [ ] Navigator/entry page routes by situation, not by section
- [ ] Skip-ahead paths exist for users who already completed earlier stages
- [ ] Cross-references connect related content across sections/tabs
- [ ] The glossary defines every term used before its first explanation
- [ ] Critical moments (aha, churn, advocacy) have designed touchpoints

### Output Format

For each section, produce:

```markdown
## [Section Name]

**Job stories served**: J1, J3, J5
**Opportunities addressed**: O1, O3
**Assumptions**: #2, #5, #8

### Pages
| Page | Job stories | Status | Issue |
|------|-----------|--------|-------|
| page-name | J1, J3 | OK / Gap / Redundant / Wrong section | [detail] |

### Recommendations
1. [action] - [rationale]
```

---

## Deliverable Format

A markdown report with:

1. **Job Stories** (6-10 stories with acceptance criteria)
2. **Opportunity Solution Tree** (1 outcome, 5-8 opportunities scored, 2-3 solutions each)
3. **Assumption Map** (10+ assumptions across 4 dimensions)
4. **Journey Map** (primary job story through 7 stages)
5. **Value Propositions** (one per primary job story)
6. **Section-by-Section Review** (per the checklist above)
7. **Priority Actions** (P0/P1/P2/P3 with rationale)

---

## Reference

Frameworks adapted from [github.com/phuryn/pm-skills](https://github.com/phuryn/pm-skills):
- Job Stories: `pm-execution/skills/job-stories`
- OST: `pm-product-discovery/skills/opportunity-solution-tree`
- Assumptions: `pm-product-discovery/skills/identify-assumptions-existing`
- Journey Map: `pm-market-research/skills/customer-journey-map`
- Value Props: `pm-marketing-growth/skills/value-prop-statements`

You are naming a documentation section.

Your job is to find the **best final section title**, not the most obvious or first plausible one.

## Goal

Choose the title that most accurately names the **underlying content** of the section at the **right conceptual level**, in a way that is:

- preciseas a
- stable
- documentation-friendly
- more useful than a literal or surface-level label

The goal is **not** to mirror the examples in the section.
The goal is to name the **governing concept** those examples express.

---

## Step 1: Diagnose the section

State briefly:

- Reader question:
- Primary distinction:
- Secondary distinction:
- Best conceptual/content layer:
- Surface labels to avoid:

Possible conceptual/content layers include:

- concept
- explanation
- comparison
- decision
- process
- workflow
- pipeline
- architecture
- runtime
- operations
- deployment
- modality
- economics
- audience
- use case
- policy
- guidance

Important:
Choose the layer that best describes what the section is **really about**, not just the words used in the section.

---

## Step 2: Generate candidates

Generate **12 candidate titles**.

Requirements:

- 1–4 words only
- concise
- natural in docs navigation
- not verbose
- not marketing language
- not overly literal unless literal is truly best
- avoid awkward compounds
- avoid vague filler words unless unavoidable

---

## Step 3: Score each candidate

For each candidate, score from **1–5** on:

- **Precision** — does it match the real distinction?
- **Depth** — does it name the underlying concept, not just the visible examples?
- **Stability** — would it still work if the section expands later?
- **Clarity** — would a reader correctly predict the section from the title?
- **Brevity** — is it compact without becoming vague?

Then give a **total score /25**.

---

## Step 4: Apply ranking rules

Ranking rules:

- Strongly penalize literal contrast labels such as "X vs Y" or "A and B" unless the section is explicitly a comparison page.
- Penalize comparator labels that describe difference/distinction rather than the content itself.
- Penalize generic umbrella labels that are technically valid but do not capture the section’s governing concept.
- Penalize titles that use the wrong conceptual layer.
- Prefer titles that function as content descriptors: they should tell the reader what the section is about, not just what examples appear in it.
- Prefer governing-concept labels over example-level labels.
- Prefer titles that capture the underlying mechanism, process, flow, or runtime behavior when that is what the section is actually describing.

Additional penalties:

- Penalize titles that merely restate the visible examples.
- Penalize titles that mirror the input wording too closely without improving it.
- Penalize stitched-together or awkward hybrid phrases that do not sound like a real section title.
- Penalize titles that describe the act of comparison rather than the subject matter.
- Penalize brittle numbering such as "Two X" or "Three Y" unless the number itself is essential.

Additional semantic rules:

- Do not use "modality/modalities" unless the section is actually classifying text, image, audio, video, or other media types.
- Do not use "inference" if any part of the section describes broader real-time processing, transformation, or continuous media handling rather than request-response model inference.
- Do not use "architecture" unless the section is primarily about system structure or component topology rather than operational behavior.
- Penalize "workload" when it is only a vague umbrella and does not describe the mechanism or execution pattern clearly enough.
- Prefer terms that describe operational pattern, execution pattern, or runtime behavior when the distinction is about how jobs run.

---

## Step 5: Winner filter

Before choosing the winner, explicitly test the top candidates against these questions:

1. Does this title name the **real governing concept**, not just the examples?
2. Is this title a **content descriptor**, not just a literal label?
3. Is this title at the **right conceptual layer**?
4. Would this title still work if more examples were added later?
5. Does this sound like the title an expert editor would choose, rather than the first acceptable answer?

If the answer is **no** to any of the above, do not rank it first.

Semantic validation:

- Is this term being used at its correct meaning?
- Would a technical reader think this term is misapplied?
- Is the title naming media class, system structure, or execution behavior?
- Which of those is the section actually about?

---

## Step 6: Output

Use exactly this structure:

Reader question:
Primary distinction:
Secondary distinction:
Best conceptual/content layer:
Surface labels to avoid:

12 candidate titles:
1.
2.
3.
4.
5.
6.
7.
8.
9.
10.
11.
12.

Scoring:
- [Title] — Precision: X/5, Depth: X/5, Stability: X/5, Clarity: X/5, Brevity: X/5, Total: X/25 — [1 sentence explanation]

Ranked list:
1.
2.
3.
4.
5.
6.
7.
8.
9.
10.
11.
12.

Best title:
Why it wins:
Why the obvious literal title is weaker:

---

## Important framing rules

- Do **not** stop at the first acceptable title.
- Do **not** prefer a title just because it is explicit.
- A literal label may be accurate, but still weaker than a title that names the deeper concept.
- Prefer a **governing-concept content descriptor** over a literal contrast label.

Prefer:
- governing concept
- correct content layer
- durable docs title

Over:
- literal contrast
- visible examples
- generic categories
- comparison wording

---

## Section description

[PASTE SECTION DESCRIPTION HERE]

-----

## What you do like

You prefer titles that are:

* **content-descriptive**, not just contrast-descriptive
* **concept-level**, not example-level
* **section-native**, meaning they tell you what the section is *about*
* **mechanism-oriented**, not just classification-oriented
* **dynamic/process-aware**, not static bucket labels
* **technically adjacent but still readable**

## What you do not like

You reject titles that are:

* **literal contrast labels**
  Example: `Batch vs Live Video`, `Batch and Live AI`
  These name the examples, not the section’s content.

* **comparative framings**
  Example: `Operational Workload Differences`, `Operator Workload Distinction`
  These describe the act of comparison, not the thing being described.

* **generic category labels**
  Example: `AI Workload Modes`
  Better than literal, but too broad and not core-descriptive.

* **taxonomy-misaligned**
  Example: `AI Job Architectures`, `Workload Architecture Split`
  Uses a real technical word, but at the wrong conceptual layer.

* **hybrid / awkward compounds**
  Example: `Batch-Live Workloads`
  Feels stitched together rather than naming a real concept.

---

## The language terms for this

These are the most useful labels for your rules:

### 1. **Literal label**

Names the visible examples directly.
Example: `Batch vs Live Video`

### 2. **Comparator label**

Names the relationship or comparison, not the content.
Example: `Operational Workload Differences`

### 3. **Generic descriptor**

A valid umbrella, but too weak or broad.
Example: `AI Workload Modes`

### 4. **Taxonomy mismatch**

Uses the wrong conceptual category for the content.
Example: calling something an architecture when it is really runtime behavior.

### 5. **Content descriptor**

Names what the section is actually about.
Example: `AI Runtime Profiles`

### 6. **Governing-concept label**

Names the underlying concept behind the examples.
This is your ideal class.

---

## Rules you can define

Use these:

### Hard rejects

Reject titles that:

* merely restate the contrasted examples
* use `X vs Y` framing
* describe comparison rather than content
* use the wrong conceptual layer
* sound like a stitched-together phrase rather than a real concept

### Prefer

Prefer titles that:

* name the **governing concept**
* act as a **content descriptor**
* reflect the **correct conceptual layer**
* are broad enough to survive section expansion
* imply the internal mechanics/process, not just the categories

---

## The core distinction you care about

This is the most important rule:

> Prefer a **governing-concept content descriptor** over a **literal contrast label**.

That is exactly why `AI Runtime Profiles` beats `Batch vs Live Video`.

---

## Add this to your prompt

```md
Ranking rules:
- Strongly penalize literal contrast labels such as "X vs Y" or "A and B" unless the section is explicitly a comparison page.
- Penalize comparator labels that describe difference/distinction rather than the content itself.
- Penalize generic umbrella labels that are technically valid but do not capture the section’s governing concept.
- Penalize titles that use the wrong conceptual layer (taxonomy mismatch).
- Prefer titles that function as content descriptors: they should tell the reader what the section is about, not just what examples appear in it.
- Prefer governing-concept labels over example-level labels.
- Prefer titles that capture the underlying mechanism, process, or runtime behavior when that is what the section is actually describing.
```

## Short version

What you like:

* **governing-concept content descriptors**

What you dislike:

* **literal labels**
* **comparator labels**
* **generic descriptors**
* **taxonomy mismatches**

Best meta-rule:

* **Do not name the examples; name the concept those examples instantiate.**

If you want, I can now turn this into a tighter reusable **section naming rubric** in 10 lines.


This is for the TITLE (1-2 words only) of a documentation page - from a product perspective - for a GPU operator audience (hobbyist -> data center -> enterprise). It wants a user reading it to have the solid facts & information they will want/need to be able to weigh the cost-benefit BUT, it absolutely does not want to frame this title term negatively (ie risk analysis, - instead it wants to frame as a governing concept term accurate to the terminology of the field it is used in (ie business)

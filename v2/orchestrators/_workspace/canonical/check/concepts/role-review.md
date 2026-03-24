# Meta-Review: Quality Check Report
**Subject report:** `v2/orchestrators/_workspace/canonical/check/concepts/role.md`
**Original page:** `v2/orchestrators/concepts/role.mdx`
**Framework:** `v2/orchestrators/_workspace/canonical/checks.mdx`
**Meta-reviewer:** Claude Code
**Date:** 2026-03-24

---

## False Positives

**FP-1 — Check 3.6: Title length rule misapplied**

The checker flags the title `The Orchestrator Role in the Livepeer Network` as failing check 3.6 ("1–3 words, concept-derived") and proposes shortening it to `Orchestrator Role`.

This is a false positive. Check 3.6 in the framework specifies the rule for **H2/H3 section headings**, not for the `title` frontmatter field. The title field is the page title displayed in the browser tab and social previews; it is governed by check 1.11 (description well-formed) and the OG block, not by the section naming rubric. There is no canonical rule in checks.mdx limiting frontmatter `title` to 1–3 words. The `sidebarTitle: 'Role'` (2 words) is the navigation-facing label and is correctly assessed as PASS. Failing the page's frontmatter `title` under a section heading rubric is a category error.

**FP-2 — Check 5.8: CSS hardcoded hex rule**

The checker scores Check 5.8 as PASS, noting that Mermaid colours "must be hardcoded" per the TODO comment. However, the checker then uses the page's own TODO comment as the evidentiary basis for the pass. That is circular: the page's TODO block is itself flagged as a governance problem (checks 5.4, 8.6), so using it as an authoritative policy citation is not valid.

That said, Mermaid's `%%{init}%%` directive does technically require hardcoded hex values because Mermaid does not resolve CSS custom properties. The PASS result is likely correct for practical reasons, but the checker's reasoning is flawed — it should cite the `snippets/components/config/MermaidColours.jsx` convention independently, not the TODO block. This is a process issue more than a false positive; the finding is logged here because the checker's stated evidence is wrong.

**FP-3 — Check 3.2: "Related Pages" flagged under a rule that forbids different terms**

The checker flags `Related Pages` as a generic descriptor (check 3.2). Check 3.2's prohibited list is: `Types`, `Profiles`, `Modes`, `Overview`, `Basics`, `Details`, `Information`, `Getting Started`. The exact string `Related Pages` does not appear in the prohibited list.

The underlying problem (low heading rubric score — 14/25) is real and correctly identified under check 3.1. But citing check 3.2 as a separate failure is incorrect: the check does not prohibit `Related Pages` by name. The checker should have logged only a 3.1 fail and not a 3.2 fail. Logging this as two separate failures overstates the issue count.

**FP-4 — Check 1.9 and 1.10 framing: "Required field" vs "valid if present"**

The checker characterises `industry` (check 1.9) and `niche` (check 1.10) as FAILs with the note "Required field per checks.mdx 1.9." Read the framework text: both checks are titled "valid if present" — not "required." Check 1.1 lists only 10 required fields; `industry` and `niche` are not among them. Flagging their absence as FAIL is technically incorrect per the framework's own language. The correct result is INFO (not present, which is acceptable) or at most a recommendation.

This matters because the checker's verdict count ("6 required fields missing or wrong") includes these two, inflating the failure count.

---

## Missed Findings

**MF-1 — Line 89: Active set definition inconsistency within the page**

Line 89 (Ethereum Background accordion): "earn the right to enter the **active set** (the top 100 eligible Orchestrators by total stake)"

Line 195–196 (Network Role section): "only the top 100 Orchestrators by total bonded stake are eligible"

These two phrasings define the active set differently: "total stake" vs "total bonded stake." These are not synonymous in the Livepeer protocol — bonded stake is LPT that has been delegated/bonded to the orchestrator, while "total stake" could imply self-stake only. The checker caught the broader veracity issue (active set size NOT-TESTED) but did not flag the internal inconsistency between these two phrasings on the same page. This should have been a separate veracity finding, independent of whether the claim is eventually verified.

**MF-2 — Line 91: "Slash risk" claim is unlinked and unqualified**

Line 91: "Slash risk comes from performance failures and protocol behaviour."

The checker logs this as NOT-TESTED under the veracity table. What it misses is that this sentence uses a banned construction per check 2.4: it is an `if [condition]` result stated without the threshold. The reader cannot act on "slash risk comes from performance failures" without knowing what counts as a performance failure and what the slash penalty is. This is a content architecture problem (check 4.5 — prerequisites stated or linked), not just a veracity problem. It should have been flagged under Category 2 or Category 4, not only in the veracity table.

**MF-3 — Line 113: Second use of "can" in accordion — not caught**

The banned construction scan (Section 3 of the report) scans for "can" and identifies line 58 and line 275. It misses line 113: "tell it what jobs you **can** run and at what price." This is the same construction as line 58 (procedural capability descriptor), so it would likely be classified the same way and not flagged. But the checker should have listed it in the scan table for completeness — the framework requires listing every sentence containing "can", "may", "could", "might", "should."

**MF-4 — Accordion titles with question marks and em-dash equivalents: soft finding needs harder call**

The checker notes in Section 4 (Heading Score Table note): accordion titles contain question marks and "em-dash-equivalent hyphens," then labels this "a grey area" and "Flag as INFO for human decision."

The CLAUDE.md voice rules state explicitly: "No questions in headings or body." The checks framework (Category 3) covers headings. Whether accordion `title` attributes count as headings is the only ambiguity. But instead of resolving this — which the checker could do by reading `component-layout-decisions.mdx` or `Frameworks.mdx §4` to check how accordion titles are classified — the checker defers to the human. This is a missed analytical step: the checker should have checked the framework and given a definitive classification, not punted.

**MF-5 — Line 296 TODO lacks a named target and timeline, but check 6.9 wasn't applied specifically**

Check 6.9 requires: "Every residual veracity item has a named source and a concrete next step. No 'needs more research'."

Line 296: `{/* TODO: Link to the commercial orchestrator page once it exists. */}` — this is flagged in Section 5 (Spelling/Typo Check) as an INFO note, but it is not a spelling issue. It should have been elevated to check 5.4 (TODO in published content) and check 6.9 (no open-ended research tasks). The checker does connect it to Root Cause D in the cross-category section, but the per-category tables only catch the line 30–44 TODO block and not this specific inline TODO at line 296 under check 5.4. The two TODOs are distinct in nature: the block is a process artefact; the inline one is a content gap. They should have been logged separately.

---

## Severity Miscalibration

**SM-1 — `significantly` (line 294) rated HIGH, should be MEDIUM**

The checker rates the banned word `significantly` (line 294) as HIGH severity alongside structural failures like missing frontmatter fields and the contract name conflict.

The CLAUDE.md banned word list and the framework both flag this as a voice/copy issue. It is a single word in a single accordion body, in a section (`The Business`) that already links away for detail. The fix is one word. Rating it the same severity as a contract name conflict that could actively mislead readers about protocol architecture is miscalibrated. Correct severity: MEDIUM.

**SM-2 — `BYOC` undefined at first use: line assignment is wrong**

The checker identifies `BYOC` as undefined at first use and cites line 176. Reading the page, BYOC first appears at line 164 ("BYOC container support") in the timeline diagram, before line 176. The checker found the second occurrence and called it first. This does not change the finding's validity, but the line reference is wrong, which would cause a fixer to look at the wrong location.

**SM-3 — "Who Should Operate One" heading score of 13/25 rated HIGH, should be MEDIUM**

A heading scoring 13/25 in a section that already has descriptive accordion titles immediately below it is a quality issue but not a shipping blocker. The checker rates this HIGH (fix before shipping) in the verdict section. The heading is imprecise but not misleading. MEDIUM is more appropriate — the accordion titles under it do the actual orienting work. Rename in the next pass, not as a pre-ship blocker.

---

## Vague or Non-executable Fixes

**VF-1 — Check 4.10 fix: "at least 2 cross-tab links" with no target pages**

Finding: "No cross-tab links present... add at minimum 2 cross-tab links: (1) at the 'Staking and security' bullet (line 197–198), link to the Delegators tab entry for LPT staking; (2) in the Note block or Network Role section, link to the Gateways tab for Gateway selection context."

"Link to the Delegators tab entry for LPT staking" is not executable. The checker does not provide a target path. The Delegators tab has not been audited; its IA is draft only. A fixer executing this instruction does not know which path to use. The fix must specify the exact path (e.g., `/v2/lpt/concepts/staking` if it exists) or explicitly state that the path is unknown and the fix is blocked until the Delegators IA is locked.

**VF-2 — Check 4.5 fix for Cascade: definition not researched**

Fix: "Line 163: add inline note or footnote defining Cascade, e.g. 'Cascade (Livepeer's routing layer)'"

The checker's proposed definition ("Livepeer's routing layer") is generated without verification. In the page timeline, Cascade is listed alongside "Video + AI + Cascade" as a current capability. Whether Cascade is a CDN layer, routing layer, or distribution layer is a factual claim that the checker is proposing to insert into the page without checking. The fix instruction should read: "Add inline definition at line 163 first use — exact definition requires verification against authoritative source before insertion" rather than proposing an unverified definition.

**VF-3 — Check 2.4 fix for line 275**

Fix: "Existing GPU operators direct spare capacity at video transcoding or AI inference and earn ETH for each completed job."

This fix is executable and specific. This is good practice — flagged here as a positive contrast to VF-1 and VF-2.

**VF-4 — Cross-category Root Cause E fix: "at minimum 2 cross-tab links"**

Same problem as VF-1. "At minimum 2" without specifying confirmed target paths is not executable. If the target paths do not yet exist in the live nav (which the tab-status confirms — Delegators and Gateways tabs have not passed IA), this fix cannot be executed now. The checker should have flagged this as blocked rather than providing a half-specified fix.

---

## Process Issues

**PI-1 — Veracity claims not actually tested; reporting "NOT-TESTED" without risk assessment**

The framework (checks.mdx, Section 6) states that veracity findings must be labelled `TESTED` or `NOT-TESTED` with a stated risk. The checker labels 8 claims NOT-TESTED and generally notes they "need verification." However, the framework requires: "State why and the risk." The checker does not consistently state the risk level for each claim. For example:

- "top 100 Orchestrators by total bonded stake" — if wrong, this is user-facing protocol misinformation. Risk: HIGH.
- Timeline dates "2017–2020 Transcoder era" — if slightly wrong, the narrative still holds. Risk: LOW.

Treating all NOT-TESTED claims with the same urgency loses signal. The framework's "Veracity standards by information type" table distinguishes `factual` (very high standard) from `narrative` (lower standard). The checker did not apply these tiers to its NOT-TESTED list.

**PI-2 — Contract name conflict (line 160 vs 201) called CRITICAL but evidence is incomplete**

The checker flags the `AIServiceRegistry` (line 160) vs `ServiceRegistry` (line 201) conflict as CRITICAL. This is the right call. However, the checker then states "one is wrong" without attempting to determine which. The checks framework cites `resources/technical/x-contract-addresses.mdx` and the go-livepeer repo as authoritative sources. The checker did not read either file, even to note whether the page exists and is accessible. A more rigorous process would have been: (1) note the conflict, (2) attempt to read the contract addresses reference page, (3) report whether a resolution is available or blocked.

**PI-3 — check 9.2 NOT-TESTED: the decision registry was not read**

Check 9.2: "All consuming decisions in registry — NOT-TESTED — would require reading decision-registry.md to verify."

The decision registry is listed in CLAUDE.md as a mandatory session-start read (`workspace/plan/active/CONTENT-WRITING/decisions/decision-registry.md`). The checker should have read it as part of pre-flight. Marking 9.2 as NOT-TESTED when the file is accessible and short is a process gap.

**PI-4 — Accordion title question marks: deferred without checking the framework**

As noted in MF-4, the checker identified a potential rule violation (question marks in accordion titles) and deferred to the human rather than consulting `Frameworks.mdx §4` or `component-layout-decisions.mdx` to determine whether accordion titles are classified as headings. The checks framework is explicit that the checker should load the relevant framework sections for the page's pageType (see Review Execution Guide: "Load the relevant voice rules for that audience. Load the component matrix for that pageType"). Deferring a question the checker had the information to resolve is a process shortcut.

---

## Internal Contradictions

**IC-1 — Check 3.2 prohibits "Profiles" as a standalone heading; checker recommends "Operator Profiles" as the fix for "Who Should Operate One"**

Check 3.2 in the framework lists `Profiles` as a prohibited generic descriptor heading.

In Category 3 and the Heading Score Table, the checker recommends the fix: `Operator Profiles`. The word "Profiles" appears verbatim in check 3.2's prohibited list.

The checker fails `Related Pages` under check 3.2 for being a generic descriptor, then recommends a fix for a different heading that itself contains one of check 3.2's prohibited terms. This is a direct internal contradiction.

The correct fix for "Who Should Operate One" is not `Operator Profiles` — it should be something like `Operator Types` or `Who Operates`, which avoids both the pronoun ambiguity and the prohibited term. (Note: `Types` is also on the prohibited list per check 3.2. `Operator Categories` or domain-specific naming like `Operator Configurations` would be cleaner.)

**IC-2 — CSS check 5.8: PASS rationale contradicts its own critique**

The checker awards PASS on check 5.8 (CSS uses custom properties only), citing that Mermaid hex values are "expected" per the page's own TODO comment. Separately, under checks 5.4 and 8.6, the checker treats the same TODO block as a governance violation that must be removed before shipping.

If the TODO block is invalid content that cannot ship, it cannot simultaneously be a valid policy citation. The checker cannot use evidence it is recommending be deleted as the basis for a PASS verdict.

---

## Prompting Improvements

**PI-1 — Require framework consultation before deferring to human**

Current behaviour: when the checker encounters ambiguity (e.g., accordion title question marks), it flags INFO and defers. Add an explicit rule:

> Before marking any finding INFO or deferring to the human, the checker must confirm it has read the relevant framework section that would resolve the ambiguity. If the framework is silent, state this explicitly.

**PI-2 — Require risk level on every NOT-TESTED claim**

Current behaviour: claims are labelled NOT-TESTED without a risk rating. The framework's veracity standards table (information type → standard) is not applied to individual claims. Add a requirement:

> Every NOT-TESTED claim must include (a) the information type (`factual`, `technical`, `procedural`, etc.) per the framework's veracity type table, and (b) the consequence if wrong (user impact). Format: `NOT-TESTED [type: factual | risk: HIGH — user-facing protocol claim]`.

**PI-3 — Prohibit using the page's own content as policy evidence**

The CSS check PASS relies on a TODO comment in the page being reviewed. Add a rule:

> The checker must not cite content from the page under review as evidence that the page passes a check. Policy evidence must come from framework files, not the page itself.

**PI-4 — Require a minimum fix attempt on CRITICAL veracity conflicts**

The contract name conflict is flagged as CRITICAL but left unresolved. Add a requirement:

> For CRITICAL veracity findings, the checker must attempt resolution by reading the canonical source if it is accessible (e.g., `v2/orchestrators/resources/technical/x-contract-addresses.mdx`). If the source is inaccessible or absent, state this explicitly. Do not leave a CRITICAL finding without a resolution attempt.

**PI-5 — Disambiguate frontmatter `title` from section heading rules**

Check 3.6 ("title well-formed: 1–3 words") is currently applied by the checker to both the frontmatter `title` field and to section headings. The framework's check 3.6 uses the word "title" but its context in Category 3 (Section Naming & Headings) makes clear it applies to headings. Add a clarification:

> Check 3.6 applies to H2/H3 section headings, not to the frontmatter `title` field. The frontmatter `title` is governed by check 1.11 (description-adjacent) and the OG image block. Do not score frontmatter `title` under the section naming rubric.

**PI-6 — Require mandatory reads before marking 9.2 NOT-TESTED**

The decision registry is a mandatory session-start read per CLAUDE.md. Checking it as part of a quality review is low cost. Add a requirement:

> Check 9.2 must be attempted in every review. If the decision registry is accessible, read it and confirm whether the page's consuming decisions are registered. NOT-TESTED is only valid if the file is inaccessible or absent.

**PI-7 — Require the checker to flag when proposed fixes are blocked by upstream gates**

The cross-tab link finding (Category 4.10, Root Cause E) produces a half-specified fix because the target tab has not completed IA. The checker should be required to note when a fix cannot be executed yet:

> When a fix depends on content that does not yet exist (e.g., a target page in an unlocked tab), state: "Fix blocked — [reason]. Do not add a placeholder link. Log in blocking-items.md."

---

*Meta-review written 2026-03-24. All findings reference specific lines in the original page and specific check numbers in checks.mdx.*

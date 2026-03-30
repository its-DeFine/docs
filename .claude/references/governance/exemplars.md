# Exemplary Governance Frameworks

> Pointer + analysis. Do not copy files — emulate the patterns.
> These frameworks define the standards everything is measured against. Read them before writing any component or script.

---

### Script Framework Specification

**File:** `workspace/plan/active/SCRIPT-GOVERNANCE/script-framework.md`

**Why it's good:** Canonical reference for the entire script library. Each section is marked ENFORCED or GUIDE — no ambiguity about what's mandatory. The three-tier taxonomy (type/concern/niche) has classification tests that prevent mis-filing: "If a script does not spawn other scripts, it is NOT a dispatch." The enforcement tiers table (hard gate, soft gate, self-heal) clarifies where each rule is checked.

**Key patterns:**
- ENFORCED vs GUIDE markers on every section
- Classification test for each type: positive definition + negative exclusion
- Three-tier taxonomy with full niche enumeration per type x concern matrix
- 11-tag JSDoc standard with tag order, allowed values, and examples
- Enforcement tiers: hard gate (blocks commit), soft gate (warns in PR), self-heal (cron auto-fix)
- File layout specification: shebang → JSDoc → requires → config → functions → main → exports
- Non-type folders documented (config/, archive/)

**Watch out:** This is a specification, not a plan. It defines what scripts must look like — it does not describe how to write them or what to build next. Pair with `scripts.md` for examples.

---

### Component Framework Canonical

**File:** `workspace/plan/active/COMPONENT-GOVERNANCE/component-framework-canonical.md`

**Why it's good:** Full folder tree with all sub-niches and component assignments. The decision tree (6 questions, first match wins) is the classification standard — no guessing by name similarity. Status accuracy note at top: "Updated 2026-03-26 to reflect actual repo contents." The JSDoc tag reference documents each tag with allowed values, descriptions, and decision rules.

**Key patterns:**
- Decision tree for category placement: 6 ordered questions
- Full folder tree with comments explaining each level
- Component count table verified against live repo
- JSDoc tag reference: @component, @category, @subcategory, @status, @description, @dataSource, @aiDiscoverability
- @status values: stable, experimental, deprecated
- @subcategory must match folder name exactly (enforced by pre-commit)
- Forbidden tags list: 12 removed tags with reasons why each was dropped
- Published location noted: `docs-guide/frameworks/component-governance.mdx`

**Watch out:** The component entries within each sub-niche are noted as "aspirational and may not match current file names." The category-level structure and decision rules are verified accurate. Always check actual file existence before referencing specific components.
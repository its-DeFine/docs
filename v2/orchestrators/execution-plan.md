# Orchestrator Tab Execution Plan

Priority: Finalise orchestrator tab - locked IA and content.

---

## Task Allocation

### Handoff Tasks (delegated to agents/worktrees)
- a) Restructuring folders, file names, and docs-gate-work.json nav
- b) Writing new pages (from templates/briefs)
- c) Anything not high-level finalising

### This Thread - Phase 1 (IA Finalisation)
1. Review and finalise Orchestrators Guides IA
2. Write full plan (planning mode)
3. Write prompt handoff for task (a) - restructuring
4. Identify gap pages needing writing, associate content knowledge for handoff
5. Write prompt for task (b) - new page writing with content links and skill references

### This Thread - Phase 2 (Content Integration)
7. Review merge/restructure page decisions and finalise
8. Execute on 7 - section by section, page by page
   - Human review of layout/style per page, assisted by AI for changes
9. Integrate new content pages and review

### Phase 3 (Later - saved for future execution)
10. Test pages for standards
    - Apply verification framework (coming soon) to check information accuracy
    - Apply copywriting framework to identify prose updates
11. Re-review Gateways tab with same process

---

## Phase 1 Detail

### Step 1: Finalise Guides IA

**Source of truth**: `v2/orchestrators/plan.md` Part 2

**Locked section order**:
```
1. Operator Considerations (3 pages)
2. Deployment Details (5 pages)
3. Workloads & AI (8 pages)
4. Staking & Earning (5 pages) - merged
5. Config & Optimisation (5 pages) - new
6. Monitoring & Tools (4 pages)
7. Advanced Operations (4 pages)
8. Roadmap & Funding (2 pages)
9. Tutorials (6 pages)
```

**Decisions to lock**:
- Final file names per page
- Which pages are keep/rename/split/merge/move/new
- Final section assignments (especially pages that move between sections)
- Quickstart page names and structure
- Setup page names (if any change)

### Step 2: Write Plan

Full planning mode output with:
- Exact file paths (current → target)
- Nav JSON structure (exact)
- Dependencies between steps

### Step 3: Restructuring Handoff Prompt

Must include:
- Branch name and worktree context
- plan.md location for reference
- Complete current→target file mapping
- Exact nav JSON to write
- Validation steps (JSON valid, all paths resolve, no broken refs)
- What NOT to change (content, metadata beyond what's specified)

### Step 4: Gap Page Identification

For each page that needs writing:
- Page name and target path
- Content knowledge sources (existing pages to draw from, v1 docs, context data)
- Job stories it serves
- Acceptance criteria (what makes the page "done")

### Step 5: Writing Handoff Prompt

Template per page:
- Target file path
- PURPOSE comment (already written)
- Content knowledge links (source files)
- Authoring skill reference: `ai-tools/ai-skills/page-authoring/SKILL.md`
- Style guide reference: `v2/resources/documentation-guide/style-guide.mdx`
- Glossary reference: `v2/orchestrators/resources/glossary.mdx`
- Component reference: `docs-guide/tooling/reference-maps/icon-map.mdx`
- Frontmatter schema requirements
- Specific content instructions per page

---

## Phase 2 Detail

### Step 7: Merge/Restructure Decisions

Section-by-section review of pages flagged for merge/split/restructure in plan.md Part 3:

| Page | Decision | Detail |
|------|----------|--------|
| batch-ai-setup | SPLIT | Extract LLM → llm-pipeline-setup. Extract audio/vision → audio-and-vision-pipelines. Rename remainder → diffusion-pipeline-setup. |
| new-join-a-pool vs join-a-pool | RESOLVE | Pick active version, deprecate other |
| payments vs payment-receipt | EVALUATE | Scope overlap once payment-receipt written |
| governance vs protocol-influence | DIFFERENTIATE | Mechanics vs motivation - cross-ref clearly |

### Step 8: Execute Section by Section

For each section:
1. Review current page content against PURPOSE comment
2. Human reviews layout and style
3. Make approved changes
4. Verify cross-references
5. Move to next section

Order: Operator Considerations → Deployment → Workloads → Staking & Earning → Config → Monitoring → Advanced → Roadmap → Tutorials

### Step 9: Integrate New Pages

As handoff agents complete new pages:
1. Review content against PURPOSE and acceptance criteria
2. Human reviews for accuracy and style
3. Add to nav
4. Verify cross-references bidirectional

---

## Phase 3 Detail (Saved for Later)

### Step 10: Standards Testing
- Run page-authoring skill compliance check on all pages
- Verify frontmatter schema compliance (all required fields)
- Check UK spelling, no em dashes, entity-led voice
- Verify all REVIEW flags are addressed or explicitly deferred
- Apply information verification framework when available
- Apply copywriting framework for prose quality

### Step 11: Gateway Re-review
- Apply same product-thinking skill to Gateway tab
- Use orchestrator process as template
- Focus on: quickstart/setup separation, section coherence, cross-role bridges
- Document in gateway equivalent of plan.md

---

## Key Files

| File | Role |
|------|------|
| `v2/orchestrators/plan.md` | Consolidated plan (Parts 1-5) |
| `v2/orchestrators/execution-plan.md` | This file - execution tracking |
| `tools/config/scoped-navigation/docs-gate-work.json` | Nav config |
| `ai-tools/ai-skills/product-thinking/SKILL.md` | Product thinking framework |
| `ai-tools/ai-skills/page-authoring/SKILL.md` | Page authoring standards |
| `v2/orchestrators/resources/glossary.mdx` | Terminology reference |
| `v2/orchestrators/_plans-and-research/` | Archived planning docs |
| `v2/orchestrators/_contextData/` | Source material and research |

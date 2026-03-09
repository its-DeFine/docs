'use strict';
/**
 * @script            overview
 * @category          utility
 * @purpose           qa:content-quality
 * @scope             tools/lib/docs-usefulness/prompts
 * @owner             docs
 * @needs             E-R1, R-R11
 * @purpose-statement Overview usefulness prompts — define LLM prompt templates for overview page scoring
 * @pipeline          indirect — library module imported by other scripts, not invoked directly
 * @usage             node tools/lib/docs-usefulness/prompts/overview.js [flags]
 */

const SYSTEM_BASE = 'You are a documentation quality evaluator for Livepeer docs. Return ONLY JSON: {"score":0-100,"pass":true/false,"reasoning":"one sentence"}.';

module.exports = {
  overview_benefit: {
    system: `${SYSTEM_BASE} Evaluate whether overview pages explain reader benefit.`,
    user: `Evaluate this overview page.

Criteria:
- Why this topic matters is clear early.
- Reader benefit is concrete.

PAGE CONTENT:
{content}`
  },
  overview_next_context: {
    system: `${SYSTEM_BASE} Evaluate whether overview pages provide context for next steps.`,
    user: `Evaluate this overview page.

Criteria:
- Mentions what to read/do next.
- Links to next resources are contextualized.

PAGE CONTENT:
{content}`
  },
  overview_no_detail: {
    system: `${SYSTEM_BASE} Evaluate that overview pages avoid exhaustive implementation detail.`,
    user: `Evaluate this overview page.

Criteria:
- Stays high-level.
- Avoids deep exhaustive procedures/reference dumps.

PAGE CONTENT:
{content}`
  }
};

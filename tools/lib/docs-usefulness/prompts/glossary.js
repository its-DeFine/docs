'use strict';
/**
 * @script            glossary
 * @category          utility
 * @purpose           qa:content-quality
 * @scope             tools/lib/docs-usefulness/prompts
 * @owner             docs
 * @needs             E-R1, R-R11
 * @purpose-statement Glossary usefulness prompts — define LLM prompt templates for glossary page scoring
 * @pipeline          indirect — library module imported by other scripts, not invoked directly
 * @usage             node tools/lib/docs-usefulness/prompts/glossary.js [flags]
 */

const SYSTEM_BASE = 'You are a documentation quality evaluator for Livepeer docs. Return ONLY JSON: {"score":0-100,"pass":true/false,"reasoning":"one sentence"}.';

module.exports = {
  glossary_no_marketing: {
    system: `${SYSTEM_BASE} Evaluate glossary neutrality.`,
    user: `Evaluate this glossary page.

Criteria:
- Definitions are neutral and non-marketing.
- Terms are concise and factual.

PAGE CONTENT:
{content}`
  },
  glossary_newcomer: {
    system: `${SYSTEM_BASE} Evaluate glossary coverage for newcomers.`,
    user: `Evaluate whether this glossary helps newcomers understand essential terms.

PAGE CONTENT:
{content}`
  }
};

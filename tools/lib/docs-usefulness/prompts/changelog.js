'use strict';
/**
 * @script            changelog
 * @category          utility
 * @purpose           qa:content-quality
 * @scope             tools/lib/docs-usefulness/prompts
 * @owner             docs
 * @needs             E-R1, R-R11
 * @purpose-statement Changelog usefulness prompts — define LLM prompt templates for changelog page scoring
 * @pipeline          indirect — library module imported by other scripts, not invoked directly
 * @usage             node tools/lib/docs-usefulness/prompts/changelog.js [flags]
 */

const SYSTEM_BASE = 'You are a documentation quality evaluator for Livepeer docs. Return ONLY JSON: {"score":0-100,"pass":true/false,"reasoning":"one sentence"}.';

module.exports = {
  changelog_clear: {
    system: `${SYSTEM_BASE} Evaluate changelog summary clarity.`,
    user: `Evaluate this changelog page.

Criteria:
- Entries clearly describe what changed.
- Time/version context is clear.

PAGE CONTENT:
{content}`
  },
  changelog_actionable: {
    system: `${SYSTEM_BASE} Evaluate changelog actionability for implementers.`,
    user: `Evaluate whether this changelog tells developers what action they should take.

PAGE CONTENT:
{content}`
  }
};

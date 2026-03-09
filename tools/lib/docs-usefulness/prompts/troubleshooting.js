'use strict';
/**
 * @script            troubleshooting
 * @category          utility
 * @purpose           qa:content-quality
 * @scope             tools/lib/docs-usefulness/prompts
 * @owner             docs
 * @needs             E-R1, R-R11
 * @purpose-statement Troubleshooting usefulness prompts — define LLM prompt templates for troubleshooting page scoring
 * @pipeline          indirect — library module imported by other scripts, not invoked directly
 * @usage             node tools/lib/docs-usefulness/prompts/troubleshooting.js [flags]
 */

const SYSTEM_BASE = 'You are a documentation quality evaluator for Livepeer docs. Return ONLY JSON: {"score":0-100,"pass":true/false,"reasoning":"one sentence"}.';

module.exports = {
  troubleshooting_symptom_first: {
    system: `${SYSTEM_BASE} Evaluate symptom-first troubleshooting structure.`,
    user: `Evaluate this troubleshooting page.

Criteria:
- Entries are structured by symptom/error users observe.
- Cause-only structure without symptom entrypoints scores low.

PAGE CONTENT:
{content}`
  },
  troubleshooting_actionable: {
    system: `${SYSTEM_BASE} Evaluate actionability of troubleshooting fixes.`,
    user: `Evaluate this troubleshooting page.

Criteria:
- Fixes are explicit and executable.
- Steps are concrete enough to attempt immediately.

PAGE CONTENT:
{content}`
  },
  troubleshooting_searchable: {
    system: `${SYSTEM_BASE} Evaluate searchability of errors and symptoms.`,
    user: `Evaluate if errors/symptoms are represented in searchable phrasing.

PAGE CONTENT:
{content}`
  }
};

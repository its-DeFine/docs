'use strict';
/**
 * @script            concept
 * @category          utility
 * @purpose           qa:content-quality
 * @scope             tools/lib/docs-usefulness/prompts
 * @owner             docs
 * @needs             E-R1, R-R11
 * @purpose-statement Concept usefulness prompts — define LLM prompt templates for concept page scoring
 * @pipeline          indirect — library module imported by other scripts, not invoked directly
 * @usage             node tools/lib/docs-usefulness/prompts/concept.js [flags]
 */

const SYSTEM_BASE = 'You are a documentation quality evaluator for Livepeer docs. Return ONLY JSON: {"score":0-100,"pass":true/false,"reasoning":"one sentence"}.';

module.exports = {
  concept_focus: {
    system: `${SYSTEM_BASE} Evaluate concept-page focus.`,
    user: `Evaluate if this page stays focused on one primary concept.

PAGE CONTENT:
{content}`
  },
  concept_jargon: {
    system: `${SYSTEM_BASE} Evaluate jargon definition quality.`,
    user: `Evaluate if jargon is defined on first use or clearly linked.

Declared audience: {audience}

PAGE CONTENT:
{content}`
  },
  concept_practical: {
    system: `${SYSTEM_BASE} Evaluate practical relevance of conceptual explanation.`,
    user: `Evaluate if this concept page connects ideas to practical usage.

PAGE CONTENT:
{content}`
  },
  concept_clarity: {
    system: `${SYSTEM_BASE} Evaluate conceptual clarity.`,
    user: `Evaluate explanation quality, coherence, and readability.

PAGE CONTENT:
{content}`
  }
};

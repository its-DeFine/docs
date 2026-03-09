'use strict';
/**
 * @script            index
 * @category          utility
 * @purpose           qa:content-quality
 * @scope             tools/lib/docs-usefulness/prompts
 * @owner             docs
 * @needs             E-R1, R-R11
 * @purpose-statement Usefulness prompt registry — aggregates purpose-specific LLM prompt modules
 * @pipeline          indirect — library module imported by other scripts, not invoked directly
 * @usage             node tools/lib/docs-usefulness/prompts/index.js [flags]
 */

const landing = require('./landing');
const overview = require('./overview');
const concept = require('./concept');
const howTo = require('./how_to');
const tutorial = require('./tutorial');
const reference = require('./reference');
const faq = require('./faq');
const troubleshooting = require('./troubleshooting');
const glossary = require('./glossary');
const changelog = require('./changelog');

module.exports = {
  ...landing,
  ...overview,
  ...concept,
  ...howTo,
  ...tutorial,
  ...reference,
  ...faq,
  ...troubleshooting,
  ...glossary,
  ...changelog
};

'use strict';
/**
 * @script            frontmatter-taxonomy
 * @category          utility
 * @purpose           qa:content-quality
 * @scope             tools/lib, tests
 * @owner             docs
 * @needs             E-R1, R-R11
 * @purpose-statement Shared frontmatter taxonomy utilities for routable docs pages.
 * @pipeline          indirect -- library module
 * @usage             const taxonomy = require('../lib/frontmatter-taxonomy');
 */
/**
 * @script            frontmatter-taxonomy
 * @category          utility
 * @purpose           qa:content-quality
 * @scope             tools/lib, tests
 * @owner             docs
 * @needs             E-R1, R-R11
 * @purpose-statement Shared frontmatter taxonomy utilities for routable docs pages.
 * @pipeline          indirect -- library module
 * @usage             const taxonomy = require('../lib/frontmatter-taxonomy');
 */
/**
 * @script            frontmatter-taxonomy
 * @category          utility
 * @purpose           qa:content-quality
 * @scope             tools/lib, tests
 * @owner             docs
 * @needs             E-R1, R-R11
 * @purpose-statement Shared frontmatter taxonomy utilities for routable docs pages.
 * @pipeline          indirect -- library module
 * @usage             const taxonomy = require('../lib/frontmatter-taxonomy');
 */

const CANONICAL_PAGE_TYPES = [
  'landing',
  'overview',
  'tutorial',
  'quickstart',
  'how_to',
  'concept',
  'reference',
  'faq',
  'troubleshooting',
  'changelog',
  'glossary',
  'guide'
];

const CANONICAL_PAGE_STATUSES = [
  'draft',
  'review',
  'current',
  'published',
  'deprecated',
  'coming-soon',
  'production',
  'provisional',
  'verified_2026'
];

const DEPRECATED_PAGE_TYPE_ALIASES = Object.freeze({
  portal: 'landing',
  api: 'reference',
  index: 'overview',
  conceptual: 'concept'
});

const PAGE_TYPE_TO_PURPOSE = Object.freeze({
  landing: 'landing',
  overview: 'overview',
  tutorial: 'tutorial',
  quickstart: 'tutorial',
  how_to: 'how_to',
  concept: 'concept',
  reference: 'reference',
  faq: 'faq',
  troubleshooting: 'troubleshooting',
  changelog: 'changelog',
  glossary: 'glossary',
  guide: 'how_to'
});

function normalizeToken(value) {
  return String(value || '').trim();
}

function normalizePageType(value) {
  const raw = normalizeToken(value);
  if (!raw) {
    return {
      raw,
      canonical: '',
      valid: false,
      deprecatedAlias: false
    };
  }

  if (CANONICAL_PAGE_TYPES.includes(raw)) {
    return {
      raw,
      canonical: raw,
      valid: true,
      deprecatedAlias: false
    };
  }

  const canonical = DEPRECATED_PAGE_TYPE_ALIASES[raw] || '';
  if (canonical) {
    return {
      raw,
      canonical,
      valid: true,
      deprecatedAlias: true
    };
  }

  return {
    raw,
    canonical: '',
    valid: false,
    deprecatedAlias: false
  };
}

function normalizeStatus(value) {
  const raw = normalizeToken(value);
  return {
    raw,
    canonical: raw,
    valid: CANONICAL_PAGE_STATUSES.includes(raw)
  };
}

function isValidPageType(value, options = {}) {
  const { allowDeprecatedAliases = true } = options;
  const result = normalizePageType(value);
  if (!result.valid) return false;
  return allowDeprecatedAliases || !result.deprecatedAlias;
}

function isValidStatus(value) {
  return normalizeStatus(value).valid;
}

function getPageTypeAdvisory(value) {
  const result = normalizePageType(value);
  if (!result.valid || !result.deprecatedAlias) return '';
  return `Deprecated pageType alias "${result.raw}". Use "${result.canonical}".`;
}

function pageTypeToPurpose(value) {
  const result = normalizePageType(value);
  if (!result.valid) return '';
  return PAGE_TYPE_TO_PURPOSE[result.canonical] || '';
}

function describeCanonicalPageTypes() {
  return CANONICAL_PAGE_TYPES.join(', ');
}

function describeCanonicalPageStatuses() {
  return CANONICAL_PAGE_STATUSES.join(', ');
}

module.exports = {
  CANONICAL_PAGE_TYPES,
  CANONICAL_PAGE_STATUSES,
  DEPRECATED_PAGE_TYPE_ALIASES,
  PAGE_TYPE_TO_PURPOSE,
  normalizePageType,
  normalizeStatus,
  isValidPageType,
  isValidStatus,
  getPageTypeAdvisory,
  pageTypeToPurpose,
  describeCanonicalPageTypes,
  describeCanonicalPageStatuses
};

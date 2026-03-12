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

const CANONICAL_PAGE_TYPES = Object.freeze([
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
]);

const CANONICAL_PAGE_STATUSES = Object.freeze([
  'draft',
  'review',
  'current',
  'published',
  'deprecated',
  'coming-soon',
  'production',
  'provisional',
  'verified_2026'
]);

const LAST_VERIFIED_REQUIRED_STATUSES = Object.freeze([
  'current',
  'published',
  'production',
  'verified_2026'
]);

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

function normalizeRawToken(value) {
  return String(value == null ? '' : value).trim();
}

function normalizeLookupToken(value) {
  return normalizeRawToken(value).toLowerCase();
}

function normalizePageType(value) {
  const raw = normalizeRawToken(value);
  const lookup = normalizeLookupToken(value);
  if (!raw) {
    return {
      raw,
      lookup,
      canonical: '',
      valid: false,
      deprecatedAlias: false
    };
  }

  if (CANONICAL_PAGE_TYPES.includes(lookup)) {
    return {
      raw,
      lookup,
      canonical: lookup,
      valid: true,
      deprecatedAlias: false
    };
  }

  const canonical = DEPRECATED_PAGE_TYPE_ALIASES[lookup] || '';
  if (canonical) {
    return {
      raw,
      lookup,
      canonical,
      valid: true,
      deprecatedAlias: true
    };
  }

  return {
    raw,
    lookup,
    canonical: '',
    valid: false,
    deprecatedAlias: false
  };
}

function normalizeStatus(value) {
  const raw = normalizeRawToken(value);
  const lookup = normalizeLookupToken(value);

  return {
    raw,
    lookup,
    canonical: CANONICAL_PAGE_STATUSES.includes(lookup) ? lookup : '',
    valid: CANONICAL_PAGE_STATUSES.includes(lookup)
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

function statusRequiresLastVerified(value) {
  const result = normalizeStatus(value);
  if (!result.valid) return false;
  return LAST_VERIFIED_REQUIRED_STATUSES.includes(result.canonical);
}

function describeCanonicalPageTypes() {
  return CANONICAL_PAGE_TYPES.join(', ');
}

function describeCanonicalPageStatuses() {
  return CANONICAL_PAGE_STATUSES.join(', ');
}

function describeLastVerifiedRequiredStatuses() {
  return LAST_VERIFIED_REQUIRED_STATUSES.join(', ');
}

module.exports = {
  CANONICAL_PAGE_TYPES,
  CANONICAL_PAGE_STATUSES,
  LAST_VERIFIED_REQUIRED_STATUSES,
  DEPRECATED_PAGE_TYPE_ALIASES,
  PAGE_TYPE_TO_PURPOSE,
  normalizePageType,
  normalizeStatus,
  isValidPageType,
  isValidStatus,
  getPageTypeAdvisory,
  pageTypeToPurpose,
  statusRequiresLastVerified,
  describeCanonicalPageTypes,
  describeCanonicalPageStatuses,
  describeLastVerifiedRequiredStatuses
};

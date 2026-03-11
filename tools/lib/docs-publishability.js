/**
 * @script            docs-publishability
 * @category          utility
 * @purpose           governance:repo-health
 * @scope             tools/lib, tests, tools/scripts
 * @owner             docs
 * @needs             E-C6, F-C1
 * @purpose-statement Shared path publishability rules for v2 docs content and tooling.
 * @pipeline          indirect
 * @usage             const { isExcludedV2ExperimentalPath } = require('../lib/docs-publishability');
 */

const path = require('path');

const NON_PUBLISHED_V2_SEGMENTS = new Set([
  'x-archived',
  'x-deprecated',
  'x-experimental',
  'x-notes',
  'x-pages',
  'x-unstaged'
]);

function toPosix(value) {
  return String(value || '').split(path.sep).join('/');
}

function getPathSegments(filePath) {
  return toPosix(filePath)
    .replace(/^\/+/, '')
    .split('/')
    .map((segment) => segment.trim().toLowerCase())
    .filter(Boolean);
}

function hasNonPublishedV2Segment(filePath) {
  return getPathSegments(filePath).some((segment) => NON_PUBLISHED_V2_SEGMENTS.has(segment));
}

function isExcludedV2ExperimentalPath(filePath) {
  const normalized = toPosix(filePath).replace(/^\/+/, '');
  if (!normalized.startsWith('v2/')) return false;
  return hasNonPublishedV2Segment(normalized);
}

function isPublishedDocsPath(filePath) {
  return !hasNonPublishedV2Segment(filePath);
}

module.exports = {
  NON_PUBLISHED_V2_SEGMENTS,
  getPathSegments,
  hasNonPublishedV2Segment,
  isExcludedV2ExperimentalPath,
  isPublishedDocsPath
};

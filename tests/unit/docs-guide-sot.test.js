#!/usr/bin/env node
/**
 * @script docs-guide-sot.test
 * @summary Validate docs-guide source-of-truth coverage, README pointers, and generated index freshness.
 * @owner docs
 * @scope tests, docs-guide, README.md, tools/scripts/generate-docs-guide-indexes.js
 *
 * @usage
 *   node tests/unit/docs-guide-sot.test.js
 *
 * @inputs
 *   --strict Fail when warnings are present (default: warnings are advisory).
 *
 * @outputs
 *   - Console summary
 *
 * @exit-codes
 *   0 = checks passed
 *   1 = required source-of-truth docs missing, stale generated indexes, or strict warning failure
 *
 * @examples
 *   node tests/unit/docs-guide-sot.test.js
 *   node tests/unit/docs-guide-sot.test.js --strict
 *
 * @notes
 *   Designed as an advisory guardrail until docs governance stabilizes.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO_ROOT = process.cwd();

const REQUIRED_MANUAL_FILES = [
  'docs-guide/README.md',
  'docs-guide/source-of-truth-policy.md',
  'docs-guide/feature-map.md',
  'docs-guide/architecture-map.md',
  'docs-guide/lpd.md',
  'docs-guide/quality-gates.md',
  'docs-guide/automation-pipelines.md',
  'docs-guide/content-system.md',
  'docs-guide/data-integrations.md'
];

const REQUIRED_GENERATED_FILES = [
  'docs-guide/scripts-index.md',
  'docs-guide/workflows-index.md',
  'docs-guide/templates-index.md'
];

const REQUIRED_README_REFERENCES = [
  'docs-guide/README.md',
  'docs-guide/feature-map.md',
  'docs-guide/source-of-truth-policy.md',
  'docs-guide/lpd.md',
  'docs-guide/quality-gates.md',
  'docs-guide/automation-pipelines.md',
  'docs-guide/scripts-index.md',
  'docs-guide/workflows-index.md',
  'docs-guide/templates-index.md'
];

function readFileSafe(repoPath) {
  try {
    return fs.readFileSync(path.join(REPO_ROOT, repoPath), 'utf8');
  } catch (_err) {
    return '';
  }
}

function isNonEmptyDoc(repoPath) {
  const content = readFileSafe(repoPath);
  return content.trim().length > 0;
}

function checkRequiredFiles(errors) {
  REQUIRED_MANUAL_FILES.forEach((repoPath) => {
    if (!isNonEmptyDoc(repoPath)) {
      errors.push({
        file: repoPath,
        rule: 'Required docs-guide manual file',
        message: 'Missing or empty canonical docs-guide file.',
        line: 1
      });
    }
  });

  REQUIRED_GENERATED_FILES.forEach((repoPath) => {
    if (!isNonEmptyDoc(repoPath)) {
      errors.push({
        file: repoPath,
        rule: 'Required docs-guide generated file',
        message: 'Missing or empty generated docs-guide index file.',
        line: 1
      });
    }
  });
}

function checkReadmeReferences(errors, warnings) {
  const readmePath = 'README.md';
  const content = readFileSafe(readmePath);
  if (!content.trim()) {
    errors.push({
      file: readmePath,
      rule: 'README required',
      message: 'README.md is missing or empty.',
      line: 1
    });
    return;
  }

  REQUIRED_README_REFERENCES.forEach((ref) => {
    if (!content.includes(ref)) {
      warnings.push({
        file: readmePath,
        rule: 'README docs-guide pointers',
        message: `README.md should reference ${ref}.`,
        line: 1
      });
    }
  });
}

function checkGeneratedIndexFreshness(errors) {
  const cmd = spawnSync(
    'node',
    ['tools/scripts/generate-docs-guide-indexes.js', '--check'],
    { cwd: REPO_ROOT, encoding: 'utf8' }
  );

  if (cmd.stdout) process.stdout.write(cmd.stdout);
  if (cmd.stderr) process.stderr.write(cmd.stderr);

  if (cmd.status !== 0) {
    errors.push({
      file: 'docs-guide/workflows-index.md',
      rule: 'Generated index freshness',
      message: 'Generated docs-guide indexes are out of date. Run generator script.',
      line: 1
    });
  }
}

function runTests(options = {}) {
  const errors = [];
  const warnings = [];

  checkRequiredFiles(errors);
  checkReadmeReferences(errors, warnings);
  checkGeneratedIndexFreshness(errors);

  const strict = Boolean(options.strict);
  const passed = strict ? errors.length === 0 && warnings.length === 0 : errors.length === 0;

  return {
    passed,
    errors,
    warnings,
    total: REQUIRED_MANUAL_FILES.length + REQUIRED_GENERATED_FILES.length
  };
}

function printResults(result, strict) {
  if (result.passed) {
    console.log(strict ? '✅ Docs-guide SoT checks passed in strict mode' : '✅ Docs-guide SoT checks passed');
    return;
  }

  if (result.errors.length > 0) {
    console.error(`❌ Docs-guide SoT errors: ${result.errors.length}`);
    result.errors.forEach((issue) => {
      console.error(`  - [${issue.rule}] ${issue.file}: ${issue.message}`);
    });
  }

  if (result.warnings.length > 0) {
    const prefix = strict ? '❌' : '⚠️';
    const label = strict ? 'strict warnings' : 'advisory warnings';
    console.error(`${prefix} Docs-guide SoT ${label}: ${result.warnings.length}`);
    result.warnings.forEach((issue) => {
      console.error(`  - [${issue.rule}] ${issue.file}: ${issue.message}`);
    });
  }
}

if (require.main === module) {
  const strict = process.argv.includes('--strict');
  const result = runTests({ strict });
  printResults(result, strict);
  process.exit(result.passed ? 0 : 1);
}

module.exports = {
  runTests
};

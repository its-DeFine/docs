#!/usr/bin/env node
/**
 * @script            docs-route-scope.test
 * @category          validator
 * @purpose           qa:repo-health
 * @scope             tests, docs.json
 * @owner             docs
 * @needs             E-C1, R-R14
 * @purpose-statement Verifies docs.json-derived tab and group route scopes resolve to live files.
 * @pipeline          P1 (commit, via run-all)
 * @usage             node tests/unit/docs-route-scope.test.js
 */

const assert = require('assert');
const path = require('path');
const {
  getDocsJsonGroupFiles,
  getDocsJsonGroupRouteKeys,
  getDocsJsonTabFiles,
  getDocsJsonTabRouteKeys
} = require('../utils/file-walker');

function toRepoPath(absPath) {
  return path.relative(process.cwd(), absPath).split(path.sep).join('/');
}

function runTests() {
  const errors = [];
  const warnings = [];

  try {
    const routes = getDocsJsonTabRouteKeys('GPU Nodes');
    assert(routes.includes('v2/orchestrators/tools-and-guides/guides'));
    assert(routes.includes('v2/orchestrators/tools-and-guides/tooling'));
    assert(!routes.includes('v2/orchestrators/guides/guides'));
    assert(!routes.includes('v2/orchestrators/guides/tooling'));
  } catch (error) {
    errors.push(`GPU Nodes tab route derivation failed: ${error.message}`);
  }

  try {
    const toolsAndGuides = getDocsJsonGroupRouteKeys({
      tab: 'GPU Nodes',
      anchor: 'GPU Nodes',
      group: 'Tools and Guides'
    });
    assert.deepStrictEqual(toolsAndGuides, [
      'v2/orchestrators/tools-and-guides/guides',
      'v2/orchestrators/tools-and-guides/tooling'
    ]);
  } catch (error) {
    errors.push(`Tools and Guides group derivation failed: ${error.message}`);
  }

  try {
    const setupRoutes = getDocsJsonGroupRouteKeys({
      tab: 'GPU Nodes',
      anchor: 'GPU Nodes',
      group: 'Setup'
    });
    const relevant = setupRoutes.filter((route) =>
      [
        'v2/orchestrators/setup/install-go-livepeer',
        'v2/orchestrators/setup/orch-config',
        'v2/orchestrators/setup/connect-to-arbitrum',
        'v2/orchestrators/setup/publish-offerings'
      ].includes(route)
    );
    assert.deepStrictEqual(relevant, [
      'v2/orchestrators/setup/install-go-livepeer',
      'v2/orchestrators/setup/orch-config',
      'v2/orchestrators/setup/connect-to-arbitrum',
      'v2/orchestrators/setup/publish-offerings'
    ]);
  } catch (error) {
    errors.push(`Setup order derivation failed: ${error.message}`);
  }

  try {
    const groupFiles = getDocsJsonGroupFiles({
      tab: 'GPU Nodes',
      anchor: 'GPU Nodes',
      group: 'Tools and Guides'
    }).map(toRepoPath);
    assert.deepStrictEqual(groupFiles, [
      'v2/orchestrators/tools-and-guides/guides.mdx',
      'v2/orchestrators/tools-and-guides/tooling.mdx'
    ]);

    const tabFiles = getDocsJsonTabFiles('GPU Nodes').map(toRepoPath);
    assert(tabFiles.includes('v2/orchestrators/tools-and-guides/guides.mdx'));
    assert(tabFiles.includes('v2/orchestrators/tools-and-guides/tooling.mdx'));
    assert(!tabFiles.includes('v2/orchestrators/guides/guides.mdx'));
  } catch (error) {
    errors.push(`docs.json scope file resolution failed: ${error.message}`);
  }

  return { errors, warnings };
}

if (require.main === module) {
  const result = runTests();
  result.errors.forEach((error) => console.error(error));
  result.warnings.forEach((warning) => console.warn(warning));
  process.exit(result.errors.length > 0 ? 1 : 0);
}

module.exports = { runTests };

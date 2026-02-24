#!/usr/bin/env node
/**
 * @script file-walker
 * @summary Utility script for tests/utils/file-walker.js.
 * @owner docs
 * @scope tests
 *
 * @usage
 *   node tests/utils/file-walker.js
 *
 * @inputs
 *   No required CLI flags; optional flags are documented inline.
 *
 * @outputs
 *   - Console output and/or file updates based on script purpose.
 *
 * @exit-codes
 *   0 = success
 *   1 = runtime or validation failure
 *
 * @examples
 *   node tests/utils/file-walker.js
 *
 * @notes
 *   Keep script behavior deterministic and update script indexes after changes.
 */
/**
 * File traversal utilities for testing
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function toPosix(filePath) {
  return String(filePath || '').split(path.sep).join('/');
}

function getRepoRoot(rootDir = process.cwd()) {
  try {
    return execSync('git rev-parse --show-toplevel', {
      encoding: 'utf8',
      cwd: rootDir
    }).trim();
  } catch (_error) {
    return rootDir;
  }
}

function resolveRepoRoot(rootDir = null) {
  return getRepoRoot(rootDir || process.cwd());
}

function normalizeDocsRouteKey(routePath) {
  let normalized = toPosix(routePath).trim();
  normalized = normalized.replace(/^\/+/, '');
  normalized = normalized.replace(/\.(md|mdx)$/i, '');
  normalized = normalized.replace(/\/index$/i, '');
  normalized = normalized.replace(/\/+$/, '');
  return normalized;
}

function collectDocsPageEntries(node, out = []) {
  if (typeof node === 'string') {
    const value = node.trim();
    if (value.startsWith('v1/') || value.startsWith('v2/')) {
      out.push(value);
    }
    return out;
  }

  if (Array.isArray(node)) {
    node.forEach((item) => collectDocsPageEntries(item, out));
    return out;
  }

  if (!node || typeof node !== 'object') {
    return out;
  }

  if (Array.isArray(node.pages)) {
    node.pages.forEach((item) => collectDocsPageEntries(item, out));
  }

  Object.values(node).forEach((value) => collectDocsPageEntries(value, out));
  return out;
}

function getDocsJsonRouteKeys(rootDir = null) {
  const repoRoot = resolveRepoRoot(rootDir);
  const docsJsonPath = path.join(repoRoot, 'docs.json');
  if (!fs.existsSync(docsJsonPath)) {
    return new Set();
  }

  const docsJson = JSON.parse(fs.readFileSync(docsJsonPath, 'utf8'));
  const versions = docsJson?.navigation?.versions || [];
  const entries = [];

  versions.forEach((versionNode) => {
    if (versionNode?.languages) {
      collectDocsPageEntries(versionNode.languages, entries);
    }
  });

  const keys = new Set();
  entries.forEach((entry) => {
    const key = normalizeDocsRouteKey(entry);
    if (key) {
      keys.add(key);
    }
  });
  return keys;
}

function toDocsRouteKeyFromFile(filePath, rootDir = null) {
  const repoRoot = resolveRepoRoot(rootDir);
  const absPath = path.isAbsolute(filePath) ? filePath : path.resolve(repoRoot, filePath);
  const relPath = toPosix(path.relative(repoRoot, absPath));
  if (!(relPath.startsWith('v1/') || relPath.startsWith('v2/'))) {
    return '';
  }
  return normalizeDocsRouteKey(relPath);
}

/**
 * Recursively get all files matching a pattern
 */
function getFiles(dir, pattern, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .git
      if (!file.startsWith('.') && file !== 'node_modules') {
        getFiles(filePath, pattern, fileList);
      }
    } else if (pattern.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Get all MDX files in v2/pages
 */
function getMdxFiles(rootDir = null) {
  const repoRoot = resolveRepoRoot(rootDir);
  const pagesDir = path.join(repoRoot, 'v2', 'pages');
  if (!fs.existsSync(pagesDir)) {
    return [];
  }
  return getFiles(pagesDir, /\.mdx$/);
}

/**
 * Get all JSX files in snippets/components
 */
function getJsxFiles(rootDir = null) {
  const repoRoot = resolveRepoRoot(rootDir);
  const componentsDir = path.join(repoRoot, 'snippets', 'components');
  if (!fs.existsSync(componentsDir)) {
    return [];
  }
  return getFiles(componentsDir, /\.jsx$/);
}

/**
 * Get staged files from git
 * Returns absolute paths relative to repo root (not cwd)
 */
function getStagedFiles(rootDir = null) {
  try {
    // Get repo root directory (where .git is)
    const repoRoot = resolveRepoRoot(rootDir);
    
    const output = execSync('git diff --cached --name-only --diff-filter=ACMR', {
      encoding: 'utf8',
      cwd: repoRoot
    });
    return output
      .split('\n')
      .filter(line => line.trim())
      .map(line => path.resolve(repoRoot, line));
  } catch (error) {
    return [];
  }
}

function getStagedDocsPageFiles(rootDir = null) {
  const repoRoot = resolveRepoRoot(rootDir);
  const docsRouteKeys = getDocsJsonRouteKeys(repoRoot);
  if (docsRouteKeys.size === 0) {
    return [];
  }

  const stagedFiles = getStagedFiles(repoRoot);
  return stagedFiles.filter((filePath) => {
    const key = toDocsRouteKeyFromFile(filePath, repoRoot);
    return key && docsRouteKeys.has(key);
  });
}

/**
 * Read file content
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

module.exports = {
  getFiles,
  getMdxFiles,
  getJsxFiles,
  getStagedFiles,
  getStagedDocsPageFiles,
  getDocsJsonRouteKeys,
  toDocsRouteKeyFromFile,
  readFile
};

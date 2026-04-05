/**
 * @script            agent-write-governance
 * @category          utility
 * @purpose           governance:agent-governance
 * @scope             operations/governance/config, tools/lib/governance, operations/scripts, operations/tests
 * @domain            docs
 * @needs             R-R14, R-R16, R-R17, R-R29
 * @purpose-statement Agent write-governance helpers — load and validate the canonical manifest for admitted agent output classes and destinations.
 * @pipeline          indirect — library module
 * @usage             const { readManifest } = require('../../tools/lib/governance/agent-write-governance');
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const MANIFEST_PATH = 'operations/governance/config/agent-write-governance.json';
const VALID_COMMIT_POLICIES = new Set(['tracked', 'task_dependent', 'forbidden']);

function getRepoRoot() {
  const result = spawnSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' });
  if (result.status === 0 && String(result.stdout || '').trim()) {
    return String(result.stdout || '').trim();
  }
  return process.cwd();
}

function ensureArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must be a non-empty array.`);
  }
}

function validatePathClass(entry, index) {
  const label = `path_classes[${index}]`;
  ['id', 'commit_policy', 'notes'].forEach((field) => {
    if (!String(entry[field] || '').trim()) {
      throw new Error(`${label}.${field} is required.`);
    }
  });
  ensureArray(entry.allowed_paths, `${label}.allowed_paths`);
  if (!VALID_COMMIT_POLICIES.has(entry.commit_policy)) {
    throw new Error(`${label}.commit_policy has invalid value "${entry.commit_policy}".`);
  }
}

function validateOutputClass(entry, index) {
  const label = `output_classes[${index}]`;
  ['id', 'default_destination', 'path_class', 'commit_policy', 'notes'].forEach((field) => {
    if (!String(entry[field] || '').trim()) {
      throw new Error(`${label}.${field} is required.`);
    }
  });
  if (!VALID_COMMIT_POLICIES.has(entry.commit_policy)) {
    throw new Error(`${label}.commit_policy has invalid value "${entry.commit_policy}".`);
  }
}

function validateManifest(manifest) {
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    throw new Error('Agent write-governance manifest must be an object.');
  }
  ['version', 'canonical_home', 'bridge_mode', 'default_policy'].forEach((field) => {
    if (!String(manifest[field] || '').trim()) {
      throw new Error(`Agent write-governance manifest must define ${field}.`);
    }
  });
  if (!manifest.root_policy || typeof manifest.root_policy !== 'object') {
    throw new Error('Agent write-governance manifest must define root_policy.');
  }
  ['undeclared_root_writes', 'notes'].forEach((field) => {
    if (!String(manifest.root_policy[field] || '').trim()) {
      throw new Error(`root_policy.${field} is required.`);
    }
  });
  ensureArray(manifest.root_policy.admitted_root_surfaces, 'root_policy.admitted_root_surfaces');
  ensureArray(manifest.path_classes, 'path_classes');
  ensureArray(manifest.output_classes, 'output_classes');

  const pathClassIds = new Set();
  manifest.path_classes.forEach((entry, index) => {
    validatePathClass(entry, index);
    if (pathClassIds.has(entry.id)) {
      throw new Error(`Duplicate path_classes id "${entry.id}".`);
    }
    pathClassIds.add(entry.id);
  });

  const outputIds = new Set();
  manifest.output_classes.forEach((entry, index) => {
    validateOutputClass(entry, index);
    if (outputIds.has(entry.id)) {
      throw new Error(`Duplicate output_classes id "${entry.id}".`);
    }
    outputIds.add(entry.id);
    if (entry.path_class !== 'none' && !pathClassIds.has(entry.path_class)) {
      throw new Error(`${`output_classes[${index}]`}.path_class references unknown path class "${entry.path_class}".`);
    }
  });
}

function readManifest(repoRoot = getRepoRoot()) {
  const absPath = path.join(repoRoot, MANIFEST_PATH);
  const manifest = JSON.parse(fs.readFileSync(absPath, 'utf8'));
  validateManifest(manifest);
  return manifest;
}

module.exports = {
  MANIFEST_PATH,
  VALID_COMMIT_POLICIES,
  getRepoRoot,
  validateManifest,
  readManifest
};

#!/usr/bin/env node
/**
 * @script            check-repo-governance-sync
 * @category          validator
 * @type              validator
 * @concern           governance
 * @niche             compliance
 * @purpose           governance:ownerless-governance
 * @description       Validates that the top-level repo-governance registry, generated outputs, and referenced bridge-mode paths stay aligned.
 * @mode              read-only
 * @domain            docs
 * @needs             R-R14, R-R16, R-R17, R-R29
 * @purpose-statement Validates the canonical repo-governance registry, generated outputs, and referenced staged-bridge paths.
 * @pipeline          manual, pr-changed -> repo-governance registry -> exit-code, stdout:violations
 * @scope             operations/governance/config, operations/scripts/generators/governance/reports, operations/scripts/validators/governance/compliance, tools/lib/governance, docs-guide/repo-ops/config, workspace/reports/repo-ops
 * @usage             node operations/scripts/validators/governance/compliance/check-repo-governance-sync.js [--json]
 * @policy            R-R14, R-R16, R-R17, R-R29
 */

const fs = require('fs');
const path = require('path');
const { getRepoRoot, readManifest } = require('../../../../../tools/lib/governance/repo-governance');
const { readManifest: readAgentWriteManifest } = require('../../../../../tools/lib/governance/agent-write-governance');
const {
  buildExpectedOutputs
} = require('../../../generators/governance/reports/generate-repo-governance-status');

const REPO_ROOT = getRepoRoot();
const BRIDGE_METADATA_KEY = 'bridge_metadata';

function parseArgs(argv) {
  const args = { json: false, help: false };
  argv.forEach((token) => {
    if (token === '--json') {
      args.json = true;
      return;
    }
    if (token === '--help' || token === '-h') {
      args.help = true;
      return;
    }
    throw new Error(`Unknown argument: ${token}`);
  });
  return args;
}

function usage() {
  console.log('Usage: node operations/scripts/validators/governance/compliance/check-repo-governance-sync.js [--json]');
}

function normalizeContent(content) {
  return `${String(content || '').trim()}\n`;
}

function addIssue(issues, type, repoPath, message) {
  issues.push({ type, path: repoPath, message });
}

function stripBridgeMetadata(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => stripBridgeMetadata(entry));
  }
  if (!value || typeof value !== 'object') {
    return value;
  }
  const next = {};
  Object.keys(value)
    .filter((key) => key !== BRIDGE_METADATA_KEY)
    .sort((left, right) => left.localeCompare(right))
    .forEach((key) => {
      next[key] = stripBridgeMetadata(value[key]);
    });
  return next;
}

function checkReferencedPaths(manifest, issues) {
  manifest.canonical_manifests.forEach((repoPath) => {
    if (!fs.existsSync(path.join(REPO_ROOT, repoPath))) {
      addIssue(issues, 'missing_canonical_manifest', repoPath, `${repoPath} is missing.`);
    }
  });

  manifest.surfaces.forEach((surface) => {
    ['paths', 'canonical_sources', 'derived_outputs', 'validators', 'doc_refs'].forEach((field) => {
      (surface[field] || []).forEach((repoPath) => {
        if (!repoPath) return;
        if ((field === 'derived_outputs' || field === 'paths') && repoPath.includes('*')) return;
        const absPath = path.join(REPO_ROOT, repoPath);
        if (!fs.existsSync(absPath)) {
          addIssue(
            issues,
            'missing_reference',
            repoPath,
            `${repoPath} referenced by surface ${surface.id} (${field}) is missing.`
          );
        }
      });
    });
  });
}

function checkBridgeManifestEquality(issues, canonicalPath, legacyPath) {
  const canonicalAbs = path.join(REPO_ROOT, canonicalPath);
  const legacyAbs = path.join(REPO_ROOT, legacyPath);
  if (!fs.existsSync(canonicalAbs) || !fs.existsSync(legacyAbs)) return;

  const canonical = stripBridgeMetadata(JSON.parse(fs.readFileSync(canonicalAbs, 'utf8')));
  const legacy = stripBridgeMetadata(JSON.parse(fs.readFileSync(legacyAbs, 'utf8')));
  if (JSON.stringify(canonical) !== JSON.stringify(legacy)) {
    addIssue(
      issues,
      'bridge_manifest_drift',
      canonicalPath,
      `${canonicalPath} has drifted from legacy bridge source ${legacyPath}.`
    );
  }
}

function run() {
  const manifest = readManifest(REPO_ROOT);
  const issues = [];
  const outputs = buildExpectedOutputs(manifest);

  Object.entries(outputs).forEach(([repoPath, expectedContent]) => {
    const absPath = path.join(REPO_ROOT, repoPath);
    if (!fs.existsSync(absPath)) {
      addIssue(issues, 'missing_output', repoPath, `${repoPath} is missing.`);
      return;
    }
    const currentContent = normalizeContent(fs.readFileSync(absPath, 'utf8'));
    if (currentContent !== expectedContent) {
      addIssue(issues, 'stale_output', repoPath, `${repoPath} is stale relative to operations/governance/config/repo-governance-surfaces.json.`);
    }
  });

  checkReferencedPaths(manifest, issues);
  checkBridgeManifestEquality(
    issues,
    'operations/governance/config/root-governance.json',
    'tools/config/runtime/root-governance.json'
  );
  checkBridgeManifestEquality(
    issues,
    'operations/governance/config/generated-artifacts.json',
    'tools/config/runtime/generated-artifacts.json'
  );
  try {
    readAgentWriteManifest(REPO_ROOT);
  } catch (error) {
    addIssue(
      issues,
      'invalid_agent_write_manifest',
      'operations/governance/config/agent-write-governance.json',
      `operations/governance/config/agent-write-governance.json is invalid: ${error.message}`
    );
  }

  return {
    passed: issues.length === 0,
    issues
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    process.exit(0);
  }
  const result = run();
  if (args.json) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else if (result.issues.length > 0) {
    result.issues.forEach((issue) => console.error(issue.message));
  } else {
    console.log('Repo governance sync passed.');
  }
  process.exit(result.passed ? 0 : 1);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`check-repo-governance-sync failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  run
};

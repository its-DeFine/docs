#!/usr/bin/env node
/**
 * @script            generate-repo-governance-status
 * @category          generator
 * @type              generator
 * @concern           governance
 * @niche             reports
 * @purpose           governance:ownerless-governance
 * @description       Generates the repo-governance map and deterministic status reports from the canonical top-level governance registry.
 * @mode              generate
 * @domain            docs
 * @needs             R-R14, R-R16, R-R17, R-R29
 * @purpose-statement Generates the top-level repo-governance map and status reports from the canonical staged-bridge registry.
 * @pipeline          manual, pr-changed -> repo-governance registry -> governance map and status reports
 * @scope             operations/governance/config, operations/scripts/generators/governance/reports, tools/lib/governance, docs-guide/repo-ops/config, workspace/reports/repo-ops
 * @usage             node operations/scripts/generators/governance/reports/generate-repo-governance-status.js [--write|--check]
 * @policy            R-R14, R-R16, R-R17, R-R29
 */

const fs = require('fs');
const path = require('path');
const {
  buildGeneratedFrontmatterLines,
  buildGeneratedHiddenBannerLines,
  buildGeneratedNoteLines
} = require('../../../../../tools/lib/governance/generated-file-banners');
const {
  getRepoRoot,
  readManifest,
  getApprovalCheckpointIds,
  getGithubWorkspaceClassificationCounts,
  getLegacyBridgeIds,
  getSurfaceIds,
  getOwnerlessReadyCount,
  getRolloutStateCounts,
  getTransitionalSources
} = require('../../../../../tools/lib/governance/repo-governance');

const REPO_ROOT = getRepoRoot();
const SCRIPT_PATH = 'operations/scripts/generators/governance/reports/generate-repo-governance-status.js';

function parseArgs(argv) {
  const args = { mode: 'write', help: false };
  let explicitModes = 0;

  argv.forEach((token) => {
    if (token === '--write') {
      args.mode = 'write';
      explicitModes += 1;
      return;
    }
    if (token === '--check') {
      args.mode = 'check';
      explicitModes += 1;
      return;
    }
    if (token === '--help' || token === '-h') {
      args.help = true;
      return;
    }
    throw new Error(`Unknown argument: ${token}`);
  });

  if (explicitModes > 1) {
    throw new Error('Choose only one mode: --write or --check');
  }

  return args;
}

function printHelp() {
  console.log(
    [
      'Usage:',
      `  node ${SCRIPT_PATH} [--write|--check]`,
      '',
      'Modes:',
      '  --write    Generate the repo-governance map and status reports.',
      '  --check    Fail when any generated repo-governance output is stale.'
    ].join('\n')
  );
}

function normalizeContent(content) {
  return `${String(content || '').trim()}\n`;
}

function toCodeList(values) {
  return (values || []).map((value) => `\`${value}\``).join('<br/>');
}

function escapeCell(value) {
  return String(value || '').replace(/\|/g, '\\|');
}

function toTable(headers, rows) {
  const lines = [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`];
  rows.forEach((row) => {
    lines.push(`| ${row.join(' | ')} |`);
  });
  return lines.join('\n');
}

function buildSurfaceRows(manifest) {
  return manifest.surfaces.map((surface) => [
    `\`${surface.id}\``,
    escapeCell(surface.name),
    `\`${surface.surface_type}\``,
    `\`${surface.gate_layer}\``,
    `\`${surface.rollout_state}\``,
    surface.ownerless_ready ? 'yes' : 'no',
    toCodeList(surface.canonical_sources),
    toCodeList(surface.derived_outputs),
    `\`${surface.escalation_mode}\``,
    escapeCell(surface.notes)
  ]);
}

function buildPathClassRows(manifest) {
  return manifest.path_classes.map((entry) => [
    `\`${entry.id}\``,
    toCodeList(entry.allowed_paths),
    escapeCell(entry.notes)
  ]);
}

function buildAgentOutputRows(manifest) {
  return manifest.agent_output_classes.map((entry) => [
    `\`${entry.id}\``,
    `\`${entry.default_destination}\``,
    `\`${entry.commit_policy}\``,
    escapeCell(entry.notes)
  ]);
}

function buildApprovalRows(manifest) {
  return manifest.approval_checkpoints.map((entry) => [
    `\`${entry.id}\``,
    escapeCell(entry.label),
    `\`${entry.phase}\``,
    entry.requires_human_approval ? 'yes' : 'no',
    escapeCell(entry.trigger),
    toCodeList(entry.required_evidence)
  ]);
}

function buildGithubWorkspaceRows(manifest) {
  return manifest.github_workspace_surfaces.map((entry) => [
    `\`${entry.id}\``,
    `\`${entry.path}\``,
    `\`${entry.classification}\``,
    `\`${entry.runtime_role}\``,
    `\`${entry.future_state}\``,
    escapeCell(entry.notes)
  ]);
}

function buildLegacyBridgeRows(manifest) {
  return manifest.legacy_bridge_inventory.map((entry) => [
    `\`${entry.id}\``,
    `\`${entry.legacy_path}\``,
    `\`${entry.canonical_path}\``,
    toCodeList(entry.consumer_paths),
    toCodeList(entry.retirement_requirements)
  ]);
}

function buildRolloutRows(manifest) {
  const counts = getRolloutStateCounts(manifest);
  return Object.entries(counts)
    .sort((left, right) => left[0].localeCompare(right[0]))
    .map(([state, count]) => [`\`${state}\``, String(count)]);
}

function buildRepoGovernanceMapContent(manifest = readManifest()) {
  const frontmatter = buildGeneratedFrontmatterLines({
    title: 'Repo Governance Map',
    sidebarTitle: 'Repo Governance Map',
    description: 'Generated control-plane map for governed repo surfaces, path classes, and agent output defaults.',
    consumer: ['human', 'agent'],
    maintenance: 'generated',
    status: 'active',
    generator: SCRIPT_PATH,
    keywords: ['livepeer', 'repo governance', 'ownerless governance', 'operations governance', 'agent write policy'],
    keywordsStyle: 'multiline'
  });
  const banner = buildGeneratedHiddenBannerLines({
    script: SCRIPT_PATH,
    purpose: 'Generate the top-level repo-governance control-plane map from the canonical registry.',
    runWhen: 'Repo-governance registry, validator, helper, or bridge-mode governance paths change.',
    runCommand: `node ${SCRIPT_PATH} --write`
  });
  const note = buildGeneratedNoteLines({
    script: SCRIPT_PATH,
    purpose: 'Keep the top-level governance map aligned with the canonical registry and staged bridge model.',
    runWhen: 'Repo-governance registry, validator, helper, or bridge-mode governance paths change.',
    runCommand: `node ${SCRIPT_PATH} --write`
  });
  const transitionalSources = getTransitionalSources(manifest);

  return normalizeContent(
    [
      ...frontmatter,
      '',
      ...banner,
      '',
      ...note,
      '',
      '# Repo Governance Map',
      '',
      'This page is generated from `operations/governance/config/repo-governance-surfaces.json` and is the live top-level reference for the repo governance control plane.',
      '',
      `Bridge mode: \`${manifest.bridge_mode}\`. Canonical governance home: \`${manifest.canonical_home}\`.`,
      '',
      '## Governed Governance Surfaces',
      '',
      `Registered surfaces: ${manifest.surfaces.length}. Ownerless-ready now: ${getOwnerlessReadyCount(manifest)}.`,
      '',
      toTable(
        ['Surface', 'Name', 'Type', 'Gate', 'Rollout', 'Ready', 'Canonical sources', 'Derived outputs', 'Escalation', 'Notes'],
        buildSurfaceRows(manifest)
      ),
      '',
      '## Path Classes',
      '',
      toTable(['Class', 'Allowed paths', 'Notes'], buildPathClassRows(manifest)),
      '',
      '## Agent Output Classes',
      '',
      toTable(['Class', 'Default destination', 'Commit policy', 'Notes'], buildAgentOutputRows(manifest)),
      '',
      '## Human Approval Checkpoints',
      '',
      toTable(['Checkpoint', 'Label', 'Phase', 'Human approval', 'Trigger', 'Required evidence'], buildApprovalRows(manifest)),
      '',
      '## GitHub Workspace Classification',
      '',
      'Only the classified transitional runtime items in `.github/workspace` should be treated as live governance inputs during bridge mode. Design and audit trees are reference-only unless later promoted.',
      '',
      toTable(
        ['Entry', 'Path', 'Classification', 'Runtime role', 'Future state', 'Notes'],
        buildGithubWorkspaceRows(manifest)
      ),
      '',
      '## Legacy Bridge Inventory',
      '',
      'These entries are the remaining live bridge dependencies that must be cleared before legacy manifest retirement can be approved.',
      '',
      toTable(
        ['Bridge', 'Legacy path', 'Canonical path', 'Live consumers', 'Retirement requirements'],
        buildLegacyBridgeRows(manifest)
      ),
      '',
      '## Canonical Manifests',
      '',
      manifest.canonical_manifests.map((entry) => `- \`${entry}\``).join('\n'),
      '',
      '## Transitional Live Sources',
      '',
      transitionalSources.length === 0
        ? 'No transitional sources are currently registered.'
        : transitionalSources.map((entry) => `- \`${entry}\``).join('\n'),
      '',
      '## Rollout State Summary',
      '',
      toTable(['State', 'Surface count'], buildRolloutRows(manifest))
    ].join('\n')
  );
}

function buildStatusPayload(manifest = readManifest()) {
  return {
    version: manifest.version,
    canonical_home: manifest.canonical_home,
    bridge_mode: manifest.bridge_mode,
    canonical_manifests: manifest.canonical_manifests,
    generated_outputs: manifest.generated_outputs,
    total_surfaces: manifest.surfaces.length,
    ownerless_ready_count: getOwnerlessReadyCount(manifest),
    rollout_state_counts: getRolloutStateCounts(manifest),
    approval_checkpoint_ids: getApprovalCheckpointIds(manifest),
    github_workspace_classification_counts: getGithubWorkspaceClassificationCounts(manifest),
    legacy_bridge_ids: getLegacyBridgeIds(manifest),
    surface_ids: getSurfaceIds(manifest),
    transitional_sources: getTransitionalSources(manifest),
    path_classes: manifest.path_classes.map((entry) => entry.id),
    agent_output_classes: manifest.agent_output_classes.map((entry) => entry.id)
  };
}

function buildStatusJsonContent(manifest = readManifest()) {
  return `${JSON.stringify(buildStatusPayload(manifest), null, 2)}\n`;
}

function buildStatusMarkdownContent(manifest = readManifest()) {
  const payload = buildStatusPayload(manifest);
  return normalizeContent(
    [
      '# Repo Governance Status',
      '',
      `- Version: \`${payload.version}\``,
      `- Canonical home: \`${payload.canonical_home}\``,
      `- Bridge mode: \`${payload.bridge_mode}\``,
      `- Total surfaces: ${payload.total_surfaces}`,
      `- Ownerless-ready surfaces: ${payload.ownerless_ready_count}`,
      `- Human approval checkpoints: ${payload.approval_checkpoint_ids.length}`,
      `- GitHub workspace classified entries: ${manifest.github_workspace_surfaces.length}`,
      `- Legacy bridge entries: ${payload.legacy_bridge_ids.length}`,
      '',
      '## Rollout States',
      '',
      toTable(
        ['State', 'Surface count'],
        Object.entries(payload.rollout_state_counts)
          .sort((left, right) => left[0].localeCompare(right[0]))
          .map(([state, count]) => [`\`${state}\``, String(count)])
      ),
      '',
      '## Transitional Sources',
      '',
      payload.transitional_sources.length === 0
        ? 'No transitional sources are currently registered.'
        : payload.transitional_sources.map((entry) => `- \`${entry}\``).join('\n'),
      '',
      '## Human Approval Checkpoints',
      '',
      payload.approval_checkpoint_ids.map((entry) => `- \`${entry}\``).join('\n'),
      '',
      '## GitHub Workspace Classification',
      '',
      toTable(
        ['Classification', 'Entry count'],
        Object.entries(payload.github_workspace_classification_counts)
          .sort((left, right) => left[0].localeCompare(right[0]))
          .map(([classification, count]) => [`\`${classification}\``, String(count)])
      ),
      '',
      '## Legacy Bridge Inventory',
      '',
      payload.legacy_bridge_ids.map((entry) => `- \`${entry}\``).join('\n'),
      '',
      '## Registered Surface IDs',
      '',
      payload.surface_ids.map((entry) => `- \`${entry}\``).join('\n')
    ].join('\n')
  );
}

function buildExpectedOutputs(manifest = readManifest()) {
  return {
    [manifest.generated_outputs.map_doc]: buildRepoGovernanceMapContent(manifest),
    [manifest.generated_outputs.status_report_json]: buildStatusJsonContent(manifest),
    [manifest.generated_outputs.status_report_md]: buildStatusMarkdownContent(manifest)
  };
}

function writeOutputs(outputs) {
  Object.entries(outputs).forEach(([repoPath, content]) => {
    const absPath = path.join(REPO_ROOT, repoPath);
    fs.mkdirSync(path.dirname(absPath), { recursive: true });
    fs.writeFileSync(absPath, content, 'utf8');
  });
}

function checkOutputs(outputs) {
  const stale = [];
  Object.entries(outputs).forEach(([repoPath, expectedContent]) => {
    const absPath = path.join(REPO_ROOT, repoPath);
    if (!fs.existsSync(absPath)) {
      stale.push(`${repoPath} is missing.`);
      return;
    }
    const currentContent = normalizeContent(fs.readFileSync(absPath, 'utf8'));
    if (currentContent !== expectedContent) {
      stale.push(`${repoPath} is stale.`);
    }
  });
  return stale;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const manifest = readManifest(REPO_ROOT);
  const outputs = buildExpectedOutputs(manifest);

  if (args.mode === 'check') {
    const stale = checkOutputs(outputs);
    if (stale.length > 0) {
      stale.forEach((entry) => console.error(entry));
      process.exit(1);
    }
    console.log('Repo governance outputs are current.');
    process.exit(0);
  }

  writeOutputs(outputs);
  console.log('Generated repo-governance map and status reports.');
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`generate-repo-governance-status failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  SCRIPT_PATH,
  buildRepoGovernanceMapContent,
  buildStatusPayload,
  buildStatusJsonContent,
  buildStatusMarkdownContent,
  buildExpectedOutputs
};

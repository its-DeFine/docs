#!/usr/bin/env node
/**
 * @script audit-tasks-folders
 * @summary Audit tasks folder structure, write per-folder root audit reports, and optionally normalize report file locations.
 * @owner docs
 * @scope tools/scripts, tasks
 *
 * @usage
 *   node tools/scripts/audit-tasks-folders.js
 *   node tools/scripts/audit-tasks-folders.js --dry-run
 *   node tools/scripts/audit-tasks-folders.js --apply
 *   node tools/scripts/audit-tasks-folders.js --folders plan,reports,report
 *
 * @inputs
 *   --apply Perform report/report(s) normalization moves in addition to writing audits.
 *   --dry-run Write audits and planned move actions without mutating files.
 *   --folders Comma-separated folder subset (for example: plan,reports,report,plan/reports).
 *
 * @outputs
 *   - tasks/*_audit.md (one report per audited folder, plus tasks_root_audit.md)
 *   - File moves/deletes in tasks/reports + tasks/report when --apply is set
 *
 * @exit-codes
 *   0 = audit/report generation succeeded
 *   1 = invalid arguments or runtime failure
 *
 * @examples
 *   node tools/scripts/audit-tasks-folders.js --dry-run
 *   node tools/scripts/audit-tasks-folders.js --apply
 *   node tools/scripts/audit-tasks-folders.js --folders tasks/plan/reports,tasks/report
 *
 * @notes
 *   Reports are overwritten on each run and include timestamped headers. Excludes tasks/context_data and any _contextData_ subtree.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO_ROOT = process.cwd();
const TASKS_ROOT = path.join(REPO_ROOT, 'tasks');
const TOOL_SCRIPTS_ROOT = path.join(REPO_ROOT, 'tools', 'scripts');
const AUDIT_FILE_SUFFIX = '_audit.md';

const PATH_EXCLUSIONS = ['/tasks/context_data/', '/_contextData_/'];
const BINARY_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.svg',
  '.pdf',
  '.zip',
  '.gz',
  '.mp4',
  '.mov',
  '.avi',
  '.ico'
]);

const AUTOGEN_FORCE_TRUE = new Set([
  'tasks/reports/SCRIPT_AUDIT.json',
  'tasks/reports/browser-test-report.json',
  'tasks/reports/component-usage-audit.json',
  'tasks/reports/comprehensive-v2-pages-browser-audit.json',
  'tasks/reports/page-audit-1771297377437.json'
]);

const AUTOGEN_FORCE_FALSE = new Set([
  'tasks/reports/readme-refactor-plan.md',
  'tasks/reports/non-technical-contribution-proposal.md',
  'tasks/reports/livepeer-docs-v2-retrospective-submission-draft.md',
  'tasks/reports/pr-754-summary.md',
  'tasks/reports/upstream-merge-plan.md',
  'tasks/reports/repository-ruleset.md',
  'tasks/reports/repository-structure-audit.md',
  'tasks/reports/repository-audit-summary.md',
  'tasks/reports/retrospective-claims-verification-2026-02-18.md'
]);

const USEFUL_FORCE_FALSE = new Set([
  'tasks/test-delete-me.md',
  'tasks/plan/NEW-LIST.md',
  'tasks/plan/create-github-issue-templates.md',
  'tasks/reports/COMPONENT_USAGE_AUDIT_REPORT'
]);

const USEFUL_FORCE_TRUE = new Set([
  'tasks/errors/component-bugs.md',
  'tasks/errors/component-verification-report.md',
  'tasks/errors/component-recommendations.md',
  'tasks/errors/testing-methodology.md'
]);

const ROOT_DESTINATION_OVERRIDES = new Map([
  ['tasks/DRY-and-cleaner-recommendations.md', 'tasks/plan/rfp/DRY-and-cleaner-recommendations.md'],
  ['tasks/DRY-tasks-feasibility-report.md', 'tasks/plan/rfp/DRY-tasks-feasibility-report.md'],
  ['tasks/LIVEPEER-STUDIO-GAPS-AND-VERACITY.md', 'tasks/plan/rfp/LIVEPEER-STUDIO-GAPS-AND-VERACITY.md'],
  ['tasks/LIVEPEER-STUDIO-V1-INVENTORY-AND-IA.md', 'tasks/plan/rfp/LIVEPEER-STUDIO-V1-INVENTORY-AND-IA.md'],
  ['tasks/docs-v2-rfp-task-list-and-plan.md', 'tasks/plan/rfp/docs-v2-rfp-task-list-and-plan.md'],
  ['tasks/non-essential-tasks-audit-for-ai-and-community.md', 'tasks/plan/rfp/non-essential-tasks-audit-for-ai-and-community.md'],
  ['tasks/MDX-ERRORS-AND-FIXES-REPORT.md', 'tasks/errors/MDX-ERRORS-AND-FIXES-REPORT.md'],
  ['tasks/script-index.md', 'tasks/scripts/script-index.md'],
  ['tasks/test-delete-me.md', 'tasks/plan/archived/test-delete-me.md']
]);

function usage() {
  console.log(
    [
      'Usage:',
      '  node tools/scripts/audit-tasks-folders.js [--dry-run] [--apply] [--folders <comma-separated>]',
      '',
      'Examples:',
      '  node tools/scripts/audit-tasks-folders.js',
      '  node tools/scripts/audit-tasks-folders.js --dry-run',
      '  node tools/scripts/audit-tasks-folders.js --apply',
      '  node tools/scripts/audit-tasks-folders.js --folders plan,reports,report'
    ].join('\n')
  );
}

function parseArgs(argv) {
  const options = {
    apply: false,
    dryRun: false,
    foldersArg: ''
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--apply') {
      options.apply = true;
      continue;
    }
    if (token === '--dry-run') {
      options.dryRun = true;
      continue;
    }
    if (token === '--folders') {
      options.foldersArg = String(argv[i + 1] || '').trim();
      i += 1;
      continue;
    }
    if (token.startsWith('--folders=')) {
      options.foldersArg = token.slice('--folders='.length).trim();
      continue;
    }

    console.error(`Unknown argument: ${token}`);
    usage();
    process.exit(1);
  }

  if (options.apply && options.dryRun) {
    console.error('Use either --apply or --dry-run, not both.');
    process.exit(1);
  }

  return options;
}

function normalizeRepoPath(value) {
  return String(value || '').split(path.sep).join('/');
}

function repoPathFromAbs(absPath) {
  return normalizeRepoPath(path.relative(REPO_ROOT, absPath));
}

function absPathFromRepo(repoPath) {
  return path.join(REPO_ROOT, repoPath);
}

function isExcludedPath(repoPath) {
  const normalized = `/${normalizeRepoPath(repoPath)}/`;
  return PATH_EXCLUSIONS.some((needle) => normalized.includes(needle));
}

function isGeneratedAuditFile(repoPath) {
  const normalized = normalizeRepoPath(repoPath);
  return normalized.startsWith('tasks/') && path.basename(normalized).endsWith(AUDIT_FILE_SUFFIX);
}

function safeReadFileBuffer(absPath) {
  try {
    return fs.readFileSync(absPath);
  } catch (_err) {
    return Buffer.from('');
  }
}

function safeReadText(absPath) {
  try {
    return fs.readFileSync(absPath, 'utf8');
  } catch (_err) {
    return '';
  }
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function lineCount(text) {
  if (!text) return 0;
  return text.split('\n').length;
}

function getFileMetadata(absPath) {
  const repoPath = repoPathFromAbs(absPath);
  const ext = path.extname(repoPath).toLowerCase();
  const stat = fs.statSync(absPath);
  const buffer = safeReadFileBuffer(absPath);
  const isBinaryByExt = BINARY_EXTENSIONS.has(ext);
  const hasNullBytes = buffer.includes(0);
  const text = !isBinaryByExt && !hasNullBytes ? safeReadText(absPath) : '';

  return {
    absPath,
    repoPath,
    dirRepoPath: normalizeRepoPath(path.dirname(repoPath)),
    basename: path.basename(repoPath),
    ext,
    sizeBytes: stat.size,
    mtime: stat.mtime.toISOString(),
    sha256: sha256(buffer),
    text,
    textLower: text.toLowerCase(),
    lineCount: lineCount(text),
    sample: text.slice(0, 60000),
    sampleLower: text.slice(0, 60000).toLowerCase(),
    isBinary: isBinaryByExt || hasNullBytes
  };
}

function walkDirectory(rootAbsPath, onDir, onFile) {
  const entries = fs.readdirSync(rootAbsPath, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(rootAbsPath, entry.name);
    const repo = repoPathFromAbs(abs);

    if (isExcludedPath(repo)) {
      continue;
    }

    if (entry.isDirectory()) {
      onDir(abs, repo);
      walkDirectory(abs, onDir, onFile);
    } else if (entry.isFile()) {
      if (isGeneratedAuditFile(repo)) continue;
      onFile(abs, repo);
    }
  }
}

function scanTasksTree() {
  if (!fs.existsSync(TASKS_ROOT) || !fs.statSync(TASKS_ROOT).isDirectory()) {
    throw new Error('tasks directory not found in current workspace');
  }

  const folders = new Set();
  const files = [];

  walkDirectory(
    TASKS_ROOT,
    (_abs, repo) => {
      if (normalizeRepoPath(repo) !== 'tasks') {
        folders.add(normalizeRepoPath(repo));
      }
    },
    (abs, _repo) => {
      files.push(getFileMetadata(abs));
    }
  );

  return {
    folders: [...folders].sort(),
    files: files.sort((a, b) => a.repoPath.localeCompare(b.repoPath))
  };
}

function scanToolsScripts() {
  if (!fs.existsSync(TOOL_SCRIPTS_ROOT)) return [];

  const files = [];
  function walk(absDir) {
    const entries = fs.readdirSync(absDir, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(absDir, entry.name);
      const repo = repoPathFromAbs(abs);
      if (entry.isDirectory()) {
        if (repo.includes('/node_modules/') || repo.includes('/.git/')) continue;
        walk(abs);
        continue;
      }
      if (!entry.isFile()) continue;
      files.push(getFileMetadata(abs));
    }
  }

  walk(TOOL_SCRIPTS_ROOT);
  return files.sort((a, b) => a.repoPath.localeCompare(b.repoPath));
}

function buildDuplicateIndexes(files) {
  const byHash = new Map();
  for (const file of files) {
    if (!byHash.has(file.sha256)) byHash.set(file.sha256, []);
    byHash.get(file.sha256).push(file.repoPath);
  }
  for (const [hash, paths] of byHash.entries()) {
    byHash.set(hash, paths.sort());
  }
  return byHash;
}

function canonicalPathScore(repoPath) {
  const p = normalizeRepoPath(repoPath);
  if (p.startsWith('tasks/reports/')) return 10;
  if (p.startsWith('tasks/errors/')) return 20;
  if (p.startsWith('tasks/plan/complete/')) return 30;
  if (p.startsWith('tasks/plan/')) return 40;
  if (p.startsWith('tasks/report/')) return 50;
  return 60;
}

function buildCanonicalByHash(duplicateByHash) {
  const canonicalByHash = new Map();
  for (const [hash, paths] of duplicateByHash.entries()) {
    const canonical = [...paths].sort((a, b) => {
      const scoreA = canonicalPathScore(a);
      const scoreB = canonicalPathScore(b);
      if (scoreA !== scoreB) return scoreA - scoreB;
      if (a.length !== b.length) return a.length - b.length;
      return a.localeCompare(b);
    })[0];
    canonicalByHash.set(hash, canonical);
  }
  return canonicalByHash;
}

function buildContext() {
  const tree = scanTasksTree();
  const toolsScripts = scanToolsScripts();
  const duplicateByHash = buildDuplicateIndexes(tree.files);
  const canonicalByHash = buildCanonicalByHash(duplicateByHash);
  const fileByRepoPath = new Map(tree.files.map((file) => [file.repoPath, file]));
  const toolsByRepoPath = new Map(toolsScripts.map((file) => [file.repoPath, file]));

  const planCompleteBasenames = new Set(
    tree.files
      .filter((file) => file.dirRepoPath === 'tasks/plan/complete')
      .map((file) => file.basename)
  );

  return {
    generatedAt: new Date().toISOString(),
    folders: tree.folders,
    files: tree.files,
    fileByRepoPath,
    toolsScripts,
    toolsByRepoPath,
    duplicateByHash,
    canonicalByHash,
    planCompleteBasenames
  };
}

function shouldClassifyAsAutogenerated(file) {
  if (AUTOGEN_FORCE_TRUE.has(file.repoPath)) {
    return { value: true, reasons: ['forced true override'] };
  }
  if (AUTOGEN_FORCE_FALSE.has(file.repoPath)) {
    return { value: false, reasons: ['forced false override'] };
  }

  let score = 0;
  const reasons = [];
  const name = file.basename.toLowerCase();
  const ext = file.ext;

  if (ext === '.json' || ext === '.log') {
    score += 3;
    reasons.push(`extension ${ext}`);
  }

  if (
    /(audit|report|status|summary|queue|timeline|navigation-report|pages-to-test|browser-test|page-audit|diff-report|script_audit)/i.test(
      name
    )
  ) {
    score += 1;
    reasons.push('report-like filename');
  }

  if (/(\d{13}|20\d{2}-\d{2}-\d{2}t\d{2}[-:]\d{2}[-:]\d{2}|20\d{2}-\d{2}-\d{2})/i.test(name)) {
    score += 1;
    reasons.push('timestamp-like filename');
  }

  if (
    /(^|\n)\s*(generated|generated:|generated at|timestamp|run metadata|audit started at|audit completed at)\b/i.test(
      file.sample
    )
  ) {
    score += 1;
    reasons.push('generation marker in content');
  }

  if (file.lineCount > 3000) {
    score += 1;
    reasons.push('very high line count');
  }

  if (file.repoPath.startsWith('tasks/reports/') && file.ext === '.json') {
    score += 2;
    reasons.push('json report in tasks/reports');
  }

  if (name.includes('plan') && !name.includes('audit')) {
    score -= 2;
    reasons.push('plan-like filename');
  }

  return { value: score >= 3, reasons };
}

function shouldClassifyAsUseful(file, context, autogenerated) {
  if (USEFUL_FORCE_TRUE.has(file.repoPath)) {
    return { value: true, stalePathRef: false, reasons: ['forced true override'] };
  }
  if (USEFUL_FORCE_FALSE.has(file.repoPath)) {
    return { value: false, stalePathRef: false, reasons: ['forced false override'] };
  }

  const reasons = [];
  let useful = true;
  const stalePathRef = /tasks\/plan|tasks\/PLAN|docs\/PLAN/i.test(file.sample);

  if (file.sizeBytes === 0) {
    useful = false;
    reasons.push('empty file');
  }

  if (/fatal:\s+path .* does not exist/i.test(file.sample)) {
    useful = false;
    reasons.push('captured git fatal output');
  }

  if (/^\s*Files deleted from LOCAL branch root:/i.test(file.sample)) {
    useful = false;
    reasons.push('partial ad-hoc deletion output');
  }

  const duplicatePaths = context.duplicateByHash.get(file.sha256) || [];
  const canonical = context.canonicalByHash.get(file.sha256);
  if (duplicatePaths.length > 1 && canonical && canonical !== file.repoPath) {
    useful = false;
    reasons.push(`duplicate of ${canonical}`);
  }

  if (file.repoPath.startsWith('tasks/scripts/') && stalePathRef) {
    useful = false;
    reasons.push('stale tasks/PLAN path in script');
  }

  if (autogenerated.value && file.sizeBytes > 12 * 1024 * 1024) {
    useful = false;
    reasons.push('large generated artifact');
  }

  if (stalePathRef) reasons.push('stale tasks/PLAN or docs/PLAN reference');

  if (reasons.length === 0) reasons.push('no high-risk signals detected');
  return { value: useful, stalePathRef, reasons };
}

function shouldLiveInErrors(file) {
  if (file.repoPath.startsWith('tasks/errors/')) {
    return { value: true, reasons: ['already in tasks/errors'] };
  }

  const scoreSignals = [
    /\b(error|errors|bug|bugs|failure|failed|stack|trace|exception)\b/g,
    /\bfix(es)?\b/g,
    /\btriage|root cause|repro|verification\b/g
  ];

  let score = 0;
  const reasons = [];
  for (const signal of scoreSignals) {
    const hits = file.sampleLower.match(signal);
    if (hits && hits.length) {
      score += Math.min(2, hits.length);
      reasons.push(`${hits.length}x ${String(signal)}`);
    }
  }

  const isLikelyPlanningDoc = /\b(plan|proposal|rfp|retrospective|summary)\b/.test(file.basename.toLowerCase());
  if (isLikelyPlanningDoc) {
    score -= 1;
    reasons.push('planning/summary title signal');
  }

  return { value: score >= 3, reasons };
}

function classifyPlanBucket(file, context, usefulness) {
  if (!file.repoPath.startsWith('tasks/plan/')) {
    return {
      bucket: 'archive',
      destination: 'tasks/plan/archived',
      reason: 'non-plan file fallback'
    };
  }

  if (file.repoPath.startsWith('tasks/plan/archived/')) {
    return { bucket: 'archive', destination: 'tasks/plan/archived', reason: 'already archived' };
  }
  if (file.repoPath.startsWith('tasks/plan/complete/')) {
    return { bucket: 'complete', destination: 'tasks/plan/complete', reason: 'already complete' };
  }
  if (file.repoPath.startsWith('tasks/plan/migration/')) {
    return { bucket: 'migration', destination: 'tasks/plan/migration', reason: 'already migration' };
  }
  if (file.repoPath.startsWith('tasks/plan/rfp/')) {
    return { bucket: 'rfp', destination: 'tasks/plan/rfp', reason: 'already rfp' };
  }

  const basename = file.basename;

  if (file.repoPath.startsWith('tasks/plan/errors/')) {
    const canonicalTarget = `tasks/errors/${basename}`;
    const canonicalFile = context.fileByRepoPath.get(canonicalTarget);
    if (usefulness.value && canonicalFile && canonicalFile.sha256 !== file.sha256) {
      return {
        bucket: 'archive',
        destination: canonicalTarget,
        reason: 'useful but conflicts with existing tasks/errors file (manual review)'
      };
    }
    if (usefulness.value && !canonicalFile) {
      return {
        bucket: 'archive',
        destination: canonicalTarget,
        reason: 'plan/errors folder invalid; move useful file to tasks/errors'
      };
    }
    return {
      bucket: 'archive',
      destination: `tasks/plan/archived/${basename}`,
      reason: 'not useful or duplicate canonical errors file'
    };
  }

  if (file.repoPath.startsWith('tasks/plan/reports/')) {
    const canonicalTarget = `tasks/reports/${basename}`;
    const canonicalFile = context.fileByRepoPath.get(canonicalTarget);
    if (usefulness.value && canonicalFile && canonicalFile.sha256 !== file.sha256) {
      return {
        bucket: 'archive',
        destination: canonicalTarget,
        reason: 'useful but conflicts with existing tasks/reports file (manual review)'
      };
    }
    if (usefulness.value && !canonicalFile) {
      return {
        bucket: 'archive',
        destination: canonicalTarget,
        reason: 'plan/reports folder invalid; move useful file to tasks/reports'
      };
    }
    return {
      bucket: 'archive',
      destination: `tasks/plan/archived/${basename}`,
      reason: 'not useful or duplicate canonical report file'
    };
  }

  if (context.planCompleteBasenames.has(basename)) {
    return {
      bucket: 'complete',
      destination: `tasks/plan/complete/${basename}`,
      reason: 'duplicate task already present in complete'
    };
  }

  if (!usefulness.value) {
    return {
      bucket: 'archive',
      destination: `tasks/plan/archived/${basename}`,
      reason: 'empty/corrupt/obsolete signal'
    };
  }

  if (/(migration|reorg|structure|cleanup|validation|phase)/i.test(basename) || /migration/i.test(file.sample)) {
    return {
      bucket: 'migration',
      destination: `tasks/plan/migration/${basename}`,
      reason: 'migration/structure signal'
    };
  }

  if (/(rfp|stakeholder|forum|ownership|goals|contribution|task-\d+|README|TEMPLATE)/i.test(basename)) {
    return {
      bucket: 'rfp',
      destination: `tasks/plan/rfp/${basename}`,
      reason: 'rfp/strategy signal'
    };
  }

  return {
    bucket: 'rfp',
    destination: `tasks/plan/rfp/${basename}`,
    reason: 'default planning bucket'
  };
}

function getHeaderTag(text, tagName) {
  const re = new RegExp(`\\${tagName}\\s+(.+)`);
  const match = text.match(re);
  return match ? String(match[1] || '').trim() : '';
}

function normalizeNameTokens(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function inferScriptFamily(file) {
  const name = file.basename.toLowerCase();
  const text = file.sampleLower;
  if (/component.*usage/.test(name) || /component usage/.test(text)) return 'component-usage-audit';
  if (/(audit|test|verify).*all.*pages|audit-all-v2-pages|test-all-pages|verify-all-pages/.test(name)) return 'all-pages-audit';
  if (/run-audit|audit-python|audit-minimal|test-audit/.test(name)) return 'audit-runner';
  if (/readme/.test(name)) return 'readme';
  return 'other';
}

function inferScriptPurpose(file) {
  const specificPurposeByName = new Map([
    ['audit-all-pages.js', 'Comprehensive v2 pages audit with file checks, link checks, and browser validation.'],
    ['audit-all-pages-simple.js', 'Fast v2 pages audit with file/link checks and report generation (no full browser pass).'],
    ['audit-minimal.js', 'Minimal smoke audit that validates docs.json access and checks a subset of pages.'],
    ['audit-python.py', 'Python implementation of v2 pages audit with JSON/Markdown report output.'],
    ['audit-component-usage.js', 'Component usage inventory across snippets/components, v2 pages, and component docs.'],
    ['run-audit.sh', 'Shell wrapper to launch legacy simple audit commands and list resulting outputs.'],
    ['run-audit-direct.sh', 'Shell wrapper for legacy Python audit and log capture.'],
    ['run-audit-now.js', 'Node wrapper to execute comprehensive audit script immediately and mark run status.'],
    ['test-audit.js', 'Sanity check for docs.json parsing and basic audit preconditions.'],
    ['README.md', 'Tasks/scripts local README and script index anchor.']
  ]);

  if (specificPurposeByName.has(file.basename)) {
    return specificPurposeByName.get(file.basename);
  }

  const summary = getHeaderTag(file.sample, '@summary');
  if (summary && !/Utility script for/i.test(summary)) {
    return summary;
  }

  if (/puppeteer/.test(file.sampleLower)) return 'Browser-based validation script.';
  if (/docs\.json/.test(file.sampleLower)) return 'docs.json-driven audit script.';
  return 'General task script.';
}

function buildToolScriptDescriptors(context) {
  return context.toolsScripts.map((toolFile) => {
    const nameTokens = normalizeNameTokens(toolFile.basename);
    const family = inferScriptFamily(toolFile);
    return {
      repoPath: toolFile.repoPath,
      sha256: toolFile.sha256,
      basename: toolFile.basename,
      tokens: new Set(nameTokens),
      family
    };
  });
}

function analyzeTaskScript(file, context, toolDescriptors) {
  const nameTokens = normalizeNameTokens(file.basename);
  const family = inferScriptFamily(file);
  const stalePlanPaths = /tasks\/plan|tasks\/PLAN|docs\/PLAN/.test(file.sample);

  const exactDuplicates = [];
  const purposeOverlap = [];

  for (const tool of toolDescriptors) {
    if (tool.sha256 === file.sha256 || tool.basename === file.basename) {
      exactDuplicates.push(tool.repoPath);
      continue;
    }

    if (tool.family === family && family !== 'other') {
      purposeOverlap.push(tool.repoPath);
      continue;
    }

    const overlap = [...tool.tokens].filter((token) => nameTokens.includes(token));
    const overlapRatio = overlap.length / Math.max(1, new Set([...tool.tokens, ...nameTokens]).size);
    if (overlapRatio >= 0.45 && overlap.length >= 2) {
      purposeOverlap.push(tool.repoPath);
    }
  }

  const dedupedExact = [...new Set(exactDuplicates)].sort();
  const dedupedOverlap = [...new Set(purposeOverlap)].sort();

  let recommendation = 'keep in tasks/scripts';
  const reasons = [];

  if (file.basename.toLowerCase() === 'readme.md') {
    recommendation = 'keep in tasks/scripts';
    reasons.push('folder-level README');
  } else if (dedupedExact.length > 0) {
    recommendation = 'archive';
    reasons.push('exact duplicate by hash/basename in tools/scripts');
  } else if (stalePlanPaths && dedupedOverlap.length > 0) {
    recommendation = 'archive';
    reasons.push('stale tasks/PLAN reference and overlapping tools/scripts purpose');
  } else if (dedupedOverlap.length > 0) {
    recommendation = 'move to tools/scripts';
    reasons.push('purpose overlap with tools/scripts family');
  } else if (stalePlanPaths) {
    recommendation = 'archive';
    reasons.push('stale tasks/PLAN reference');
  } else {
    recommendation = 'keep in tasks/scripts';
    reasons.push('no overlap or deprecation signal');
  }

  return {
    usedFor: inferScriptPurpose(file),
    stalePlanPaths,
    exactDuplicates: dedupedExact,
    purposeOverlap: dedupedOverlap,
    recommendation,
    reasons
  };
}

function determineRootDestination(file, shouldErrors, usefulness) {
  if (ROOT_DESTINATION_OVERRIDES.has(file.repoPath)) {
    return ROOT_DESTINATION_OVERRIDES.get(file.repoPath);
  }
  if (!usefulness.value) return `tasks/plan/archived/${file.basename}`;
  if (shouldErrors.value) return `tasks/errors/${file.basename}`;

  const lower = file.basename.toLowerCase();
  if (/(rfp|plan|inventory|feasibility|recommendations|gaps|studio|non-essential|dry)/.test(lower)) {
    return `tasks/plan/rfp/${file.basename}`;
  }
  if (/(report|audit|summary|verification|analysis)/.test(lower)) {
    return `tasks/reports/ungenerated/${file.basename}`;
  }
  if (lower.includes('error')) {
    return `tasks/errors/${file.basename}`;
  }
  if (lower.includes('script')) {
    return `tasks/scripts/${file.basename}`;
  }
  return `tasks/plan/archived/${file.basename}`;
}

function toMarkdownBool(value) {
  return value ? 'yes' : 'no';
}

function compactText(value, max = 180) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3)}...`;
}

function escapeMarkdownCell(value) {
  return String(value == null ? '' : value)
    .replace(/\|/g, '\\|')
    .replace(/\n/g, '<br>');
}

function renderMarkdownTable(headers, rows) {
  if (!rows.length) {
    return '_No files in scope._';
  }
  const headerRow = `| ${headers.map(escapeMarkdownCell).join(' | ')} |`;
  const divider = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${row.map(escapeMarkdownCell).join(' | ')} |`).join('\n');
  return [headerRow, divider, body].join('\n');
}

function folderAuditFilePath(folderRepoPath) {
  const relative = normalizeRepoPath(folderRepoPath).replace(/^tasks\//, '');
  const filename = `${relative.replace(/\//g, '_')}${AUDIT_FILE_SUFFIX}`;
  return path.join(TASKS_ROOT, filename);
}

function ensureDirectory(absDirPath, applyChanges, actions) {
  if (fs.existsSync(absDirPath)) return;
  const repoPath = repoPathFromAbs(absDirPath);
  actions.push({
    kind: 'mkdir',
    source: '',
    target: repoPath,
    note: 'ensure reports/ungenerated exists'
  });
  if (applyChanges) {
    fs.mkdirSync(absDirPath, { recursive: true });
  }
}

function splitNameAndExt(repoPath) {
  const ext = path.extname(repoPath);
  const base = repoPath.slice(0, repoPath.length - ext.length);
  return { base, ext };
}

function makeUniquePath(targetRepoPath, suffix, existingMap) {
  const { base, ext } = splitNameAndExt(targetRepoPath);
  let candidate = `${base}${suffix}${ext}`;
  let index = 2;
  while (existingMap.has(candidate)) {
    candidate = `${base}${suffix}-${index}${ext}`;
    index += 1;
  }
  return candidate;
}

function planReportsNormalizationActions(context) {
  const actions = [];
  const virtual = new Map();

  for (const file of context.files) {
    if (file.repoPath.startsWith('tasks/reports/') || file.repoPath.startsWith('tasks/report/')) {
      virtual.set(file.repoPath, file.sha256);
    }
  }

  const reportsRootFiles = context.files
    .filter((file) => file.dirRepoPath === 'tasks/reports')
    .sort((a, b) => a.repoPath.localeCompare(b.repoPath));
  const reportLegacyFiles = context.files
    .filter((file) => file.dirRepoPath === 'tasks/report')
    .sort((a, b) => a.repoPath.localeCompare(b.repoPath));

  for (const file of reportsRootFiles) {
    const autogenerated = shouldClassifyAsAutogenerated(file);
    if (autogenerated.value) continue;

    const targetBase = `tasks/reports/ungenerated/${file.basename}`;
    const sourceHash = virtual.get(file.repoPath);
    const targetHash = virtual.get(targetBase);

    if (!targetHash) {
      actions.push({
        kind: 'move',
        source: file.repoPath,
        target: targetBase,
        note: 'reports root non-autogenerated -> reports/ungenerated'
      });
      virtual.delete(file.repoPath);
      virtual.set(targetBase, sourceHash);
      continue;
    }

    if (targetHash === sourceHash) {
      actions.push({
        kind: 'delete',
        source: file.repoPath,
        target: targetBase,
        note: 'duplicate non-autogenerated report file (same hash)'
      });
      virtual.delete(file.repoPath);
      continue;
    }

    const altTarget = makeUniquePath(targetBase, '-from-reports', virtual);
    actions.push({
      kind: 'move',
      source: file.repoPath,
      target: altTarget,
      note: 'conflicting non-autogenerated report file from reports root'
    });
    virtual.delete(file.repoPath);
    virtual.set(altTarget, sourceHash);
  }

  for (const file of reportLegacyFiles) {
    const autogenerated = shouldClassifyAsAutogenerated(file);
    const targetDir = autogenerated.value ? 'tasks/reports' : 'tasks/reports/ungenerated';
    const targetBase = `${targetDir}/${file.basename}`;
    const sourceHash = virtual.get(file.repoPath);
    const targetHash = virtual.get(targetBase);

    if (!targetHash) {
      actions.push({
        kind: 'move',
        source: file.repoPath,
        target: targetBase,
        note: 'legacy tasks/report normalization'
      });
      virtual.delete(file.repoPath);
      virtual.set(targetBase, sourceHash);
      continue;
    }

    if (targetHash === sourceHash) {
      actions.push({
        kind: 'delete',
        source: file.repoPath,
        target: targetBase,
        note: 'legacy report duplicate (same hash)'
      });
      virtual.delete(file.repoPath);
      continue;
    }

    const altTarget = makeUniquePath(targetBase, '-from-report', virtual);
    actions.push({
      kind: 'move',
      source: file.repoPath,
      target: altTarget,
      note: 'legacy report conflict, suffixed destination'
    });
    virtual.delete(file.repoPath);
    virtual.set(altTarget, sourceHash);
  }

  return actions;
}

function applyReportsNormalization(actions, applyChanges) {
  const results = [];
  const ungeneratedAbs = absPathFromRepo('tasks/reports/ungenerated');

  ensureDirectory(ungeneratedAbs, applyChanges, results);

  for (const action of actions) {
    if (!['move', 'delete'].includes(action.kind)) continue;

    const sourceAbs = absPathFromRepo(action.source);
    const targetAbs = action.target ? absPathFromRepo(action.target) : '';
    const sourceExists = fs.existsSync(sourceAbs);

    if (!sourceExists) {
      results.push({
        ...action,
        status: 'skipped',
        outcome: 'source missing'
      });
      continue;
    }

    if (!applyChanges) {
      results.push({
        ...action,
        status: 'planned',
        outcome: 'dry-run'
      });
      continue;
    }

    if (action.kind === 'move') {
      fs.mkdirSync(path.dirname(targetAbs), { recursive: true });
      fs.renameSync(sourceAbs, targetAbs);
      results.push({
        ...action,
        status: 'applied',
        outcome: 'moved'
      });
      continue;
    }

    fs.unlinkSync(sourceAbs);
    results.push({
      ...action,
      status: 'applied',
      outcome: 'deleted duplicate'
    });
  }

  return results;
}

function buildFolderRows(folderRepoPath, context, toolDescriptors) {
  const filesInScope = context.files
    .filter((file) => file.repoPath.startsWith(`${folderRepoPath}/`) || file.repoPath === folderRepoPath)
    .sort((a, b) => a.repoPath.localeCompare(b.repoPath));

  const headers = [];
  const rows = [];

  const isPlanFolder = folderRepoPath.startsWith('tasks/plan');
  const isErrorsFolder = folderRepoPath === 'tasks/errors';
  const isReportsFolder = folderRepoPath === 'tasks/reports' || folderRepoPath === 'tasks/report' || folderRepoPath === 'tasks/reports/ungenerated';
  const isScriptsFolder = folderRepoPath === 'tasks/scripts';

  if (isScriptsFolder) {
    headers.push('File', 'Used For', 'Stale PLAN Paths', 'Exact Duplicates in tools/scripts', 'Purpose Overlap in tools/scripts', 'Recommendation', 'Notes');
    for (const file of filesInScope) {
      const script = analyzeTaskScript(file, context, toolDescriptors);
      rows.push([
        file.repoPath,
        script.usedFor,
        toMarkdownBool(script.stalePlanPaths),
        script.exactDuplicates.join('<br>'),
        script.purposeOverlap.join('<br>'),
        script.recommendation,
        script.reasons.join('; ')
      ]);
    }
    return { headers, rows, fileCount: filesInScope.length };
  }

  if (isErrorsFolder) {
    headers.push('File', 'AutoGenerated', 'Still Useful', 'Recommended Destination', 'Notes');
    for (const file of filesInScope) {
      const autogenerated = shouldClassifyAsAutogenerated(file);
      const useful = shouldClassifyAsUseful(file, context, autogenerated);
      const destination = useful.value ? `tasks/errors/${file.basename}` : `tasks/plan/archived/${file.basename}`;
      rows.push([
        file.repoPath,
        toMarkdownBool(autogenerated.value),
        toMarkdownBool(useful.value),
        destination,
        compactText([...autogenerated.reasons, ...useful.reasons].join('; '))
      ]);
    }
    return { headers, rows, fileCount: filesInScope.length };
  }

  if (isReportsFolder) {
    headers.push('File', 'AutoGenerated', 'Still Useful', 'Should Live in errors', 'Normalized Destination', 'Notes');
    for (const file of filesInScope) {
      const autogenerated = shouldClassifyAsAutogenerated(file);
      const useful = shouldClassifyAsUseful(file, context, autogenerated);
      const errorsFit = shouldLiveInErrors(file);
      const normalizedDestination = autogenerated.value
        ? `tasks/reports/${file.basename}`
        : `tasks/reports/ungenerated/${file.basename}`;
      rows.push([
        file.repoPath,
        toMarkdownBool(autogenerated.value),
        toMarkdownBool(useful.value),
        toMarkdownBool(errorsFit.value),
        normalizedDestination,
        compactText([...autogenerated.reasons, ...useful.reasons, ...errorsFit.reasons].join('; '))
      ]);
    }
    return { headers, rows, fileCount: filesInScope.length };
  }

  if (isPlanFolder) {
    headers.push('File', 'Bucket', 'Recommended Destination', 'AutoGenerated', 'Still Useful', 'Notes');
    for (const file of filesInScope) {
      const autogenerated = shouldClassifyAsAutogenerated(file);
      const useful = shouldClassifyAsUseful(file, context, autogenerated);
      const plan = classifyPlanBucket(file, context, useful);
      rows.push([
        file.repoPath,
        plan.bucket,
        plan.destination,
        toMarkdownBool(autogenerated.value),
        toMarkdownBool(useful.value),
        compactText(`${plan.reason}; ${[...autogenerated.reasons, ...useful.reasons].join('; ')}`)
      ]);
    }
    return { headers, rows, fileCount: filesInScope.length };
  }

  headers.push('File', 'AutoGenerated', 'Still Useful', 'Should Live in errors', 'Notes');
  for (const file of filesInScope) {
    const autogenerated = shouldClassifyAsAutogenerated(file);
    const useful = shouldClassifyAsUseful(file, context, autogenerated);
    const errorsFit = shouldLiveInErrors(file);
    rows.push([
      file.repoPath,
      toMarkdownBool(autogenerated.value),
      toMarkdownBool(useful.value),
      toMarkdownBool(errorsFit.value),
      compactText([...autogenerated.reasons, ...useful.reasons, ...errorsFit.reasons].join('; '))
    ]);
  }
  return { headers, rows, fileCount: filesInScope.length };
}

function buildRootAuditRows(context) {
  const rootFiles = context.files
    .filter((file) => file.dirRepoPath === 'tasks')
    .filter((file) => !isGeneratedAuditFile(file.repoPath))
    .sort((a, b) => a.repoPath.localeCompare(b.repoPath));

  const headers = ['File', 'Relevant', 'AutoGenerated', 'Still Useful', 'Recommended Destination', 'Notes'];
  const rows = [];

  for (const file of rootFiles) {
    const autogenerated = shouldClassifyAsAutogenerated(file);
    const useful = shouldClassifyAsUseful(file, context, autogenerated);
    const errorsFit = shouldLiveInErrors(file);
    const destination = determineRootDestination(file, errorsFit, useful);
    rows.push([
      file.repoPath,
      toMarkdownBool(useful.value),
      toMarkdownBool(autogenerated.value),
      toMarkdownBool(useful.value),
      destination,
      compactText([...autogenerated.reasons, ...useful.reasons, ...errorsFit.reasons].join('; '))
    ]);
  }

  return { headers, rows, fileCount: rootFiles.length };
}

function formatNormalizationSection(normalizationResults) {
  if (!normalizationResults.length) return '_No normalization actions planned._';

  const headers = ['Action', 'Source', 'Target', 'Status', 'Notes'];
  const rows = normalizationResults.map((item) => [
    item.kind,
    item.source || '-',
    item.target || '-',
    item.status || 'planned',
    item.note || item.outcome || ''
  ]);
  return renderMarkdownTable(headers, rows);
}

function writeAuditReport(reportAbsPath, title, scopeRepoPath, context, tableHeaders, tableRows, extraSections = []) {
  const report = [];
  report.push(`# ${title}`);
  report.push('');
  report.push(`Generated: ${context.generatedAt}`);
  report.push(`Scope: \`${scopeRepoPath}\``);
  report.push(`Total files in scope: ${tableRows.length}`);
  report.push('');
  report.push('## File Recommendations');
  report.push('');
  report.push(renderMarkdownTable(tableHeaders, tableRows));

  for (const section of extraSections) {
    report.push('');
    report.push(`## ${section.title}`);
    report.push('');
    report.push(section.body);
  }

  fs.writeFileSync(reportAbsPath, `${report.join('\n')}\n`);
}

function normalizeFolderToken(token) {
  const trimmed = String(token || '').trim();
  if (!trimmed) return '';
  if (trimmed === 'root') return 'root';
  if (trimmed.startsWith('tasks/')) return normalizeRepoPath(trimmed);
  return normalizeRepoPath(`tasks/${trimmed}`);
}

function selectFolders(allFolders, foldersArg) {
  if (!foldersArg) return { selected: [...allFolders], includeRootAudit: true };

  const requested = [...new Set(foldersArg.split(',').map(normalizeFolderToken).filter(Boolean))];
  const includeRootAudit = requested.includes('root');
  const selected = [];

  for (const folder of requested) {
    if (folder === 'root') continue;
    if (!allFolders.includes(folder)) {
      throw new Error(`Unknown or excluded folder in --folders: ${folder}`);
    }
    selected.push(folder);
  }

  return { selected: selected.sort(), includeRootAudit };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const applyChanges = options.apply;

  const initialContext = buildContext();
  const { selected, includeRootAudit } = selectFolders(initialContext.folders, options.foldersArg);
  const plannedNormalizationActions = planReportsNormalizationActions(initialContext);
  const normalizationResults = applyReportsNormalization(plannedNormalizationActions, applyChanges);

  const finalContext = applyChanges ? buildContext() : initialContext;
  const toolDescriptors = buildToolScriptDescriptors(finalContext);

  let reportsWritten = 0;

  for (const folderRepoPath of selected) {
    const reportAbsPath = folderAuditFilePath(folderRepoPath);
    const { headers, rows } = buildFolderRows(folderRepoPath, finalContext, toolDescriptors);
    const title = `${folderRepoPath.replace(/^tasks\//, 'tasks/')} Audit`;

    const extraSections = [];
    if (folderRepoPath === 'tasks/reports' || folderRepoPath === 'tasks/report' || folderRepoPath === 'tasks/reports/ungenerated') {
      extraSections.push({
        title: 'Normalization Actions',
        body: formatNormalizationSection(normalizationResults)
      });
    }

    writeAuditReport(reportAbsPath, title, folderRepoPath, finalContext, headers, rows, extraSections);
    reportsWritten += 1;
  }

  if (!options.foldersArg || includeRootAudit) {
    const rootAuditAbsPath = path.join(TASKS_ROOT, 'tasks_root_audit.md');
    const rootRows = buildRootAuditRows(finalContext);
    writeAuditReport(
      rootAuditAbsPath,
      'tasks Root Files Audit',
      'tasks (root files only)',
      finalContext,
      rootRows.headers,
      rootRows.rows
    );
    reportsWritten += 1;
  }

  const appliedCount = normalizationResults.filter((item) => item.status === 'applied').length;
  const plannedCount = normalizationResults.filter((item) => item.status === 'planned').length;
  const skippedCount = normalizationResults.filter((item) => item.status === 'skipped').length;

  console.log(`Audit reports written: ${reportsWritten}`);
  console.log(`Normalization mode: ${applyChanges ? 'apply' : 'dry-run/default'}`);
  console.log(`Normalization actions planned: ${plannedNormalizationActions.length}`);
  console.log(`Normalization actions ${applyChanges ? 'applied' : 'simulated'}: ${applyChanges ? appliedCount : plannedCount}`);
  console.log(`Normalization actions skipped: ${skippedCount}`);
}

try {
  main();
} catch (error) {
  console.error(`audit-tasks-folders failed: ${error.message}`);
  process.exit(1);
}

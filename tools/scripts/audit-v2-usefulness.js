#!/usr/bin/env node
/**
 * @script audit-v2-usefulness
 * @summary Audit v2 MDX pages (excluding x-* directories) and emit page-level usefulness matrix rows with source-weighted 2026 accuracy verification fields.
 * @owner docs
 * @scope tools/scripts, v2, tasks/reports, tools/config
 *
 * @usage
 *   node tools/scripts/audit-v2-usefulness.js --mode full --accuracy-mode tiered
 *   node tools/scripts/audit-v2-usefulness.js --files v2/about/livepeer-network/actors.mdx --verification-fixture tasks/reports/docs-usefulness/fixtures.json
 *
 * @inputs
 *   --mode <full|changed|files> (default: full)
 *   --files <path[,path...]> Explicit MDX file list (repeatable; forces files mode)
 *   --as-of <YYYY-MM-DD> Accuracy verification date (default: 2026-02-23)
 *   --accuracy-mode <tiered|local-only|live> (default: tiered)
 *   --verify-sources <csv> Source families to use (default: github,deepwiki,official)
 *   --github-repos <csv> GitHub repos considered canonical for claim verification context
 *   --deepwiki-enabled <true|false> Enable DeepWiki corroboration (default: true in tiered/live)
 *   --deepwiki-base-url <url> DeepWiki base URL for fetch/query strategy (default: https://deepwiki.com)
 *   --official-docs-base-url <url> Official docs base URL for verification fetches (default: https://docs.livepeer.org)
 *   --github-results-per-repo <n> Max GitHub code search hits per repo/claim (default: 2)
 *   --verification-cache-dir <path> Cache directory for Tier 2 verification results
 *   --verification-max-requests <n> Max Tier 2 source queries per run (default: 200)
 *   --verification-timeout-ms <n> Source query timeout hint (default: 10000)
 *   --scoring-engine <rules-only|hybrid|llm-only> (default: rules-only)
 *   --out-dir <path> Output directory (default: tasks/reports/docs-usefulness/<run-id>)
 *   --format <jsonl,csv,json> Output formats (default: jsonl,csv,json)
 *   --max-pages <n> Limit processed pages (debug)
 *   --verification-fixture <path> Optional fixture JSON for deterministic Tier 2 evidence in offline runs
 *
 * @outputs
 *   - page-matrix.jsonl (canonical rows with accuracy verification fields)
 *   - page-matrix.csv (flattened matrix with human/agent usefulness scores and flags)
 *   - run-metadata.json (run config, counts, and source policy)
 *
 * @exit-codes
 *   0 = audit completed
 *   1 = invalid args, read/write failure, or unexpected runtime error
 *
 * @examples
 *   node tools/scripts/audit-v2-usefulness.js --mode full --accuracy-mode tiered
 *   node tools/scripts/audit-v2-usefulness.js --files v2/about/livepeer-network/actors.mdx --verify-sources github,deepwiki,official
 *
 * @notes
 *   Emits a deterministic usefulness matrix now (rules-only scoring) and supports live Tier 2 verification via GitHub + DeepWiki/official fetch strategies.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const {
  DEFAULT_AS_OF_DATE,
  createLiveTier2Provider,
  createTier2Provider,
  createVerificationCache,
  extractTier1Claims,
  loadAccuracySourceRegistry,
  loadAccuracySourceWeights,
  parseBoolean,
  parseCsvList,
  parseVerifySourcesOption,
  toPosix,
  verifyPageAccuracy
} = require('../lib/docs-usefulness/accuracy-verifier');
const {
  analyzeMdxPage,
  buildUsefulnessMatrixFields
} = require('../lib/docs-usefulness/scoring');

const DEFAULT_VERIFY_TIMEOUT_MS = 10000;
const DEFAULT_VERIFY_MAX_REQUESTS = 200;

function getRepoRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (_error) {
    return process.cwd();
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function parseArgs(argv) {
  const registry = loadAccuracySourceRegistry();
  const args = {
    mode: 'full',
    files: [],
    asOf: DEFAULT_AS_OF_DATE,
    accuracyMode: 'tiered',
    verifySources: registry.default_verify_sources || ['github', 'deepwiki', 'official'],
    githubRepos: [
      'livepeer/go-livepeer',
      'livepeer/livepeerjs',
      'livepeer/docs',
      'livepeer/livepeer-protocol'
    ],
    deepwikiEnabled: true,
    deepwikiBaseUrl: 'https://deepwiki.com',
    officialDocsBaseUrl: 'https://docs.livepeer.org',
    githubResultsPerRepo: 2,
    verificationCacheDir: null,
    verificationMaxRequests: DEFAULT_VERIFY_MAX_REQUESTS,
    verificationTimeoutMs: DEFAULT_VERIFY_TIMEOUT_MS,
    scoringEngine: 'rules-only',
    outDir: null,
    format: ['jsonl', 'csv', 'json'],
    maxPages: null,
    verificationFixture: null
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--mode') {
      args.mode = String(argv[i + 1] || args.mode);
      i += 1;
      continue;
    }
    if (token === '--files' || token === '--file') {
      const parts = parseCsvList(argv[i + 1], []);
      args.files.push(...parts);
      i += 1;
      continue;
    }
    if (token === '--as-of') {
      args.asOf = String(argv[i + 1] || args.asOf);
      i += 1;
      continue;
    }
    if (token === '--accuracy-mode') {
      args.accuracyMode = String(argv[i + 1] || args.accuracyMode);
      i += 1;
      continue;
    }
    if (token === '--verify-sources') {
      args.verifySources = parseVerifySourcesOption(argv[i + 1], registry);
      i += 1;
      continue;
    }
    if (token === '--github-repos') {
      args.githubRepos = parseCsvList(argv[i + 1], args.githubRepos);
      i += 1;
      continue;
    }
    if (token === '--deepwiki-enabled') {
      args.deepwikiEnabled = parseBoolean(argv[i + 1], args.deepwikiEnabled);
      i += 1;
      continue;
    }
    if (token === '--deepwiki-base-url') {
      args.deepwikiBaseUrl = String(argv[i + 1] || args.deepwikiBaseUrl).trim() || args.deepwikiBaseUrl;
      i += 1;
      continue;
    }
    if (token === '--official-docs-base-url') {
      args.officialDocsBaseUrl = String(argv[i + 1] || args.officialDocsBaseUrl).trim() || args.officialDocsBaseUrl;
      i += 1;
      continue;
    }
    if (token === '--github-results-per-repo') {
      const parsed = Number(argv[i + 1]);
      if (Number.isFinite(parsed) && parsed > 0) args.githubResultsPerRepo = parsed;
      i += 1;
      continue;
    }
    if (token === '--verification-cache-dir') {
      args.verificationCacheDir = String(argv[i + 1] || '').trim() || null;
      i += 1;
      continue;
    }
    if (token === '--verification-max-requests') {
      const parsed = Number(argv[i + 1]);
      if (Number.isFinite(parsed) && parsed > 0) args.verificationMaxRequests = parsed;
      i += 1;
      continue;
    }
    if (token === '--verification-timeout-ms') {
      const parsed = Number(argv[i + 1]);
      if (Number.isFinite(parsed) && parsed > 0) args.verificationTimeoutMs = parsed;
      i += 1;
      continue;
    }
    if (token === '--scoring-engine') {
      args.scoringEngine = String(argv[i + 1] || args.scoringEngine).trim() || args.scoringEngine;
      i += 1;
      continue;
    }
    if (token === '--out-dir') {
      args.outDir = String(argv[i + 1] || '').trim() || null;
      i += 1;
      continue;
    }
    if (token === '--format') {
      args.format = parseCsvList(argv[i + 1], args.format);
      i += 1;
      continue;
    }
    if (token === '--max-pages') {
      const parsed = Number(argv[i + 1]);
      if (Number.isFinite(parsed) && parsed > 0) args.maxPages = parsed;
      i += 1;
      continue;
    }
    if (token === '--verification-fixture') {
      args.verificationFixture = String(argv[i + 1] || '').trim() || null;
      i += 1;
      continue;
    }
  }

  args.files = [...new Set(args.files.map((file) => String(file).trim()).filter(Boolean))];
  if (args.files.length > 0) args.mode = 'files';
  if (args.accuracyMode === 'local-only') {
    args.deepwikiEnabled = false;
  }
  if (args.outDir === null) {
    const runId = `run-${new Date().toISOString().replace(/[:.]/g, '-')}`;
    args.outDir = path.join(getRepoRoot(), 'tasks', 'reports', 'docs-usefulness', runId);
  } else {
    args.outDir = path.resolve(getRepoRoot(), args.outDir);
  }
  if (!args.verificationCacheDir) {
    args.verificationCacheDir = path.join(args.outDir, 'verification-cache');
  } else {
    args.verificationCacheDir = path.resolve(getRepoRoot(), args.verificationCacheDir);
  }

  return args;
}

function walkMdxFiles(dirPath, out = []) {
  if (!fs.existsSync(dirPath)) return out;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('x-') && entry.isDirectory()) continue;
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkMdxFiles(fullPath, out);
      continue;
    }
    if (entry.name.endsWith('.mdx')) {
      out.push(fullPath);
    }
  }
  return out;
}

function collectChangedV2MdxFiles(repoRoot) {
  try {
    const output = execSync('git diff --name-only --diff-filter=ACMR HEAD', {
      cwd: repoRoot,
      encoding: 'utf8'
    });
    return output
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((rel) => rel.startsWith('v2/') && rel.endsWith('.mdx'))
      .filter((rel) => !rel.split('/').some((segment) => segment.startsWith('x-')))
      .map((rel) => path.join(repoRoot, rel));
  } catch (_error) {
    return [];
  }
}

function discoverTargetFiles(repoRoot, args) {
  if (args.mode === 'files') {
    return args.files
      .map((file) => path.resolve(repoRoot, file))
      .filter((file) => fs.existsSync(file))
      .filter((file) => file.endsWith('.mdx'))
      .filter((file) => {
        const rel = toPosix(path.relative(repoRoot, file));
        return rel.startsWith('v2/') && !rel.split('/').some((segment) => segment.startsWith('x-'));
      })
      .sort();
  }

  if (args.mode === 'changed') {
    const changed = collectChangedV2MdxFiles(repoRoot).sort();
    if (changed.length > 0) return changed;
  }

  return walkMdxFiles(path.join(repoRoot, 'v2')).sort();
}

function fileToRoutePath(repoRoot, absPath) {
  const rel = toPosix(path.relative(repoRoot, absPath));
  let route = rel.replace(/^v2\//, '/v2/').replace(/\.mdx$/i, '');
  route = route.replace(/\/index$/i, '');
  return route;
}

function loadFixtureMap(fixturePath, repoRoot) {
  if (!fixturePath) return {};
  const abs = path.resolve(repoRoot, fixturePath);
  if (!fs.existsSync(abs)) return {};
  try {
    const data = JSON.parse(fs.readFileSync(abs, 'utf8'));
    return data.claims || data.fixturesByClaimId || {};
  } catch (_error) {
    return {};
  }
}

function escapeCsv(value) {
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  if (text === undefined) return '';
  if (/[",\n]/.test(text)) {
    return `"${String(text).replace(/"/g, '""')}"`;
  }
  return String(text);
}

function writeJsonl(filePath, rows) {
  const content = rows.map((row) => JSON.stringify(row)).join('\n') + (rows.length ? '\n' : '');
  fs.writeFileSync(filePath, content);
}

function writeCsv(filePath, rows) {
  if (!rows.length) {
    fs.writeFileSync(filePath, '');
    return;
  }
  const columns = [
    'as_of_date',
    'file_path',
    'route_path',
    'cohort',
    'page_kind',
    'doc_type_primary',
    'accuracy_2026_status',
    'accuracy_2026_confidence',
    'accuracy_2026_score',
    'clarity_score',
    'verifiability_score',
    'docs_framework_fit_score',
    'rfp_page_compliance_score',
    'completeness_score',
    'actionability_score',
    'audience_fit_score',
    'machine_readability_score',
    'maintenance_quality_score',
    'human_usefulness_score',
    'agent_usefulness_score',
    'human_band',
    'agent_band',
    'claims_extracted_count',
    'verification_sources_count',
    'source_types_used',
    'source_freshness_oldest_date',
    'source_freshness_latest_date',
    'flags_human',
    'verification_notes'
  ];
  const lines = [columns.join(',')];
  for (const row of rows) {
    const flat = {
      ...row,
      source_types_used: (row.source_types_used || []).join('|'),
      flags_human: (row.flags_human || []).join('; '),
      verification_sources_count: Array.isArray(row.verification_sources) ? row.verification_sources.length : 0
    };
    lines.push(columns.map((column) => escapeCsv(flat[column] ?? '')).join(','));
  }
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`);
}

function buildFlagsHuman(flags) {
  return [...new Set((flags || []).map((flag) => String(flag).replace(/_/g, ' ')))];
}

function maybeAddEmptyFlag(content, flags) {
  if (String(content || '').trim().length === 0) flags.push('empty');
}

async function main() {
  const repoRoot = getRepoRoot();
  const args = parseArgs(process.argv.slice(2));
  const registry = loadAccuracySourceRegistry();
  const weights = loadAccuracySourceWeights();

  ensureDir(args.outDir);
  ensureDir(args.verificationCacheDir);

  const fixtureMap = loadFixtureMap(args.verificationFixture, repoRoot);
  const cache = createVerificationCache(args.verificationCacheDir);
  const useLiveTier2 = !args.verificationFixture && (args.accuracyMode === 'tiered' || args.accuracyMode === 'live');
  const tier2Provider = useLiveTier2
    ? createLiveTier2Provider({
        cache,
        maxRequests: args.verificationMaxRequests,
        githubResultsPerRepo: args.githubResultsPerRepo,
        deepwikiBaseUrl: args.deepwikiBaseUrl,
        officialDocsBaseUrl: args.officialDocsBaseUrl
      })
    : createTier2Provider({
        cache,
        fixturesByClaimId: fixtureMap,
        maxRequests: args.verificationMaxRequests
      });

  let files = discoverTargetFiles(repoRoot, args);
  if (Number.isFinite(args.maxPages)) {
    files = files.slice(0, args.maxPages);
  }

  const rows = [];
  for (const absPath of files) {
    const content = fs.readFileSync(absPath, 'utf8');
    const relPath = toPosix(path.relative(repoRoot, absPath));
    const routePath = fileToRoutePath(repoRoot, absPath);
    const claims = extractTier1Claims({ content, pagePath: relPath });

    const accuracy = await verifyPageAccuracy({
      content,
      claims,
      pagePath: relPath,
      routePath,
      asOfDate: args.asOf,
      accuracyMode: args.accuracyMode,
      verifySources: args.verifySources,
      githubRepos: args.githubRepos,
      deepwikiEnabled: args.deepwikiEnabled,
      verificationMaxRequests: args.verificationMaxRequests,
      verificationTimeoutMs: args.verificationTimeoutMs,
      tier2Provider,
      cache,
      registry,
      weights
    });

    const analysis = analyzeMdxPage({
      content,
      filePath: relPath,
      routePath,
      accuracy
    });
    const matrix = buildUsefulnessMatrixFields({ analysis, accuracy });

    const flags = [...new Set([...(accuracy.flags || []), ...(analysis.flags || [])])];
    maybeAddEmptyFlag(content, flags);
    if (matrix.manual_review_required) flags.push('manual_review_required');
    if (matrix.verification_required) flags.push('verification_required');
    if ((args.scoringEngine === 'hybrid' || args.scoringEngine === 'llm-only')) flags.push('llm_unavailable');
    const row = {
      schema_version: 'docs-usefulness-matrix.v1',
      as_of_date: args.asOf,
      file_path: relPath,
      route_path: routePath,
      accuracy_2026_status: accuracy.accuracy_2026_status,
      accuracy_2026_confidence: accuracy.accuracy_2026_confidence,
      verification_sources: accuracy.verification_sources,
      source_conflicts: accuracy.source_conflicts,
      source_types_used: accuracy.source_types_used,
      source_freshness_latest_date: accuracy.source_freshness_latest_date,
      source_freshness_oldest_date: accuracy.source_freshness_oldest_date,
      verification_notes: accuracy.verification_notes,
      claims_extracted_count: Array.isArray(accuracy.claims) ? accuracy.claims.length : claims.length,
      claims: accuracy.claims || claims,
      claim_results: accuracy.claim_results || [],
      provider_errors: accuracy.provider_errors || [],
      ...matrix,
      flags: [...new Set(flags)],
      flags_human: buildFlagsHuman(flags)
    };
    rows.push(row);
  }

  const formats = new Set(args.format);
  if (formats.has('jsonl')) {
    writeJsonl(path.join(args.outDir, 'page-matrix.jsonl'), rows);
  }
  if (formats.has('csv')) {
    writeCsv(path.join(args.outDir, 'page-matrix.csv'), rows);
  }
  if (formats.has('json')) {
    const metadata = {
      run_started_at: new Date().toISOString(),
      as_of_date: args.asOf,
      repo_root: repoRoot,
      files_processed: rows.length,
      mode: args.mode,
      accuracy_mode: args.accuracyMode,
      scoring_engine: args.scoringEngine,
      verify_sources: args.verifySources,
      github_repos: args.githubRepos,
      deepwiki_enabled: args.deepwikiEnabled,
      deepwiki_base_url: args.deepwikiBaseUrl,
      official_docs_base_url: args.officialDocsBaseUrl,
      github_results_per_repo: args.githubResultsPerRepo,
      verification_cache_dir: toPosix(path.relative(repoRoot, args.verificationCacheDir)),
      verification_max_requests: args.verificationMaxRequests,
      verification_timeout_ms: args.verificationTimeoutMs,
      source_policy: {
        registry_schema_version: registry.schema_version,
        weights_schema_version: weights.schema_version,
        decision_defaults: registry.decision_defaults
      }
    };
    fs.writeFileSync(path.join(args.outDir, 'run-metadata.json'), JSON.stringify(metadata, null, 2));
  }

  const summary = {
    total: rows.length,
    status_counts: rows.reduce((acc, row) => {
      acc[row.accuracy_2026_status] = (acc[row.accuracy_2026_status] || 0) + 1;
      return acc;
    }, {}),
    avg_human_usefulness: rows.length ? Number((rows.reduce((sum, row) => sum + (row.human_usefulness_score || 0), 0) / rows.length).toFixed(1)) : 0,
    avg_agent_usefulness: rows.length ? Number((rows.reduce((sum, row) => sum + (row.agent_usefulness_score || 0), 0) / rows.length).toFixed(1)) : 0,
    flagged_source_conflict: rows.filter((row) => row.flags.includes('source_conflict')).length,
    flagged_accuracy_needs_review: rows.filter((row) => row.flags.includes('accuracy_needs_review')).length
  };

  console.log(`Audited ${summary.total} page(s) into ${args.outDir}`);
  console.log(`Status counts: ${JSON.stringify(summary.status_counts)}`);
  console.log(`avg_human=${summary.avg_human_usefulness} avg_agent=${summary.avg_agent_usefulness}`);
  console.log(`source_conflict=${summary.flagged_source_conflict} accuracy_needs_review=${summary.flagged_accuracy_needs_review}`);
}

main().catch((error) => {
  console.error('audit-v2-usefulness error:', error);
  process.exit(1);
});

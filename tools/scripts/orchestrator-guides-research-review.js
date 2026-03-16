#!/usr/bin/env node
/**
 * @script            orchestrator-guides-research-review
 * @category          generator
 * @purpose           tooling:dev-tools
 * @scope             tools/scripts, tasks/reports/orchestrator-guides-review, tools/config/scoped-navigation/docs-gate-work.json, tasks/research, tests/unit/orchestrator-guides-research-review.test.js
 * @domain            docs
 * @needs             R-R27, R-R30
 * @purpose-statement Orchestrator guides research review packet generator — reads the live Orchestrators Guides navigation, runs the research skill tranche-by-tranche, and writes reproducible review packets and a master rollup.
 * @pipeline          manual — packet generator for guided docs review tranches
 * @usage             node tools/scripts/orchestrator-guides-research-review.js [flags]
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const DEFAULT_NAV = 'tools/config/scoped-navigation/docs-gate-work.json';
const DEFAULT_OUTPUT_ROOT = 'tasks/reports/orchestrator-guides-review/research-guides-review';
const DEFAULT_REGISTRY = 'tasks/research/claims';
const DEFAULT_LEDGER = 'tasks/research/adjudication/page-content-research-outcomes.json';

const REPO_ROOT = repoRoot();

function repoRoot() {
  const result = spawnSync('git', ['rev-parse', '--show-toplevel'], {
    cwd: process.cwd(),
    encoding: 'utf8'
  });
  if (result.status === 0 && String(result.stdout || '').trim()) {
    return String(result.stdout || '').trim();
  }
  return process.cwd();
}

function toPosix(value) {
  return String(value || '').split(path.sep).join('/');
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

function usage() {
  console.log(
    [
      'Usage: node tools/scripts/orchestrator-guides-research-review.js [options]',
      '',
      'Options:',
      `  --nav <path>            Navigation JSON path (default: ${DEFAULT_NAV})`,
      `  --out <path>            Output report root (default: ${DEFAULT_OUTPUT_ROOT})`,
      `  --registry <path>       Fact registry path (default: ${DEFAULT_REGISTRY})`,
      `  --ledger <path>         Adjudication ledger path (default: ${DEFAULT_LEDGER})`,
      '  --tranche <a,b,c>       Optional tranche slug or title filter',
      '  --quiet                 Suppress success logs',
      '  --help                  Show help'
    ].join('\n')
  );
}

function parseArgs(argv) {
  const args = {
    nav: DEFAULT_NAV,
    out: DEFAULT_OUTPUT_ROOT,
    registry: DEFAULT_REGISTRY,
    ledger: DEFAULT_LEDGER,
    tranche: [],
    quiet: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--help' || token === '-h') {
      args.help = true;
      continue;
    }
    if (token === '--nav') {
      args.nav = String(argv[i + 1] || '').trim() || args.nav;
      i += 1;
      continue;
    }
    if (token.startsWith('--nav=')) {
      args.nav = token.slice('--nav='.length).trim() || args.nav;
      continue;
    }
    if (token === '--out') {
      args.out = String(argv[i + 1] || '').trim() || args.out;
      i += 1;
      continue;
    }
    if (token.startsWith('--out=')) {
      args.out = token.slice('--out='.length).trim() || args.out;
      continue;
    }
    if (token === '--registry') {
      args.registry = String(argv[i + 1] || '').trim() || args.registry;
      i += 1;
      continue;
    }
    if (token.startsWith('--registry=')) {
      args.registry = token.slice('--registry='.length).trim() || args.registry;
      continue;
    }
    if (token === '--ledger') {
      args.ledger = String(argv[i + 1] || '').trim() || args.ledger;
      i += 1;
      continue;
    }
    if (token.startsWith('--ledger=')) {
      args.ledger = token.slice('--ledger='.length).trim() || args.ledger;
      continue;
    }
    if (token === '--tranche') {
      args.tranche = String(argv[i + 1] || '')
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean);
      i += 1;
      continue;
    }
    if (token.startsWith('--tranche=')) {
      args.tranche = token
        .slice('--tranche='.length)
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean);
      continue;
    }
    if (token === '--quiet') {
      args.quiet = true;
      continue;
    }
    throw new Error(`Unknown argument: ${token}`);
  }

  return args;
}

function readJsonFile(repoPath) {
  return JSON.parse(fs.readFileSync(path.resolve(REPO_ROOT, repoPath), 'utf8'));
}

function writeJsonFile(repoPath, value) {
  ensureDir(path.dirname(path.resolve(REPO_ROOT, repoPath)));
  fs.writeFileSync(path.resolve(REPO_ROOT, repoPath), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function writeTextFile(repoPath, value) {
  ensureDir(path.dirname(path.resolve(REPO_ROOT, repoPath)));
  fs.writeFileSync(path.resolve(REPO_ROOT, repoPath), value, 'utf8');
}

function ensureDir(absDir) {
  fs.mkdirSync(absDir, { recursive: true });
}

function fileExists(repoPath) {
  return fs.existsSync(path.resolve(REPO_ROOT, repoPath));
}

function findOrchestratorGuidesGroups(nav) {
  const versions = Array.isArray(nav?.navigation?.versions) ? nav.navigation.versions : [];
  const version = versions.find((entry) => String(entry?.version) === 'v2');
  const language = Array.isArray(version?.languages) ? version.languages.find((entry) => String(entry?.language) === 'en') : null;
  const tab = Array.isArray(language?.tabs) ? language.tabs.find((entry) => String(entry?.tab) === 'Orchestrators') : null;
  const topGroups = Array.isArray(tab?.groups)
    ? tab.groups
    : Array.isArray(tab?.anchors)
      ? tab.anchors.flatMap((anchor) => (Array.isArray(anchor?.groups) ? anchor.groups : []))
      : [];
  const guides = topGroups.find((group) => String(group?.group) === 'Guides');

  if (!guides || !Array.isArray(guides.pages)) {
    throw new Error('Unable to resolve live Orchestrators Guides group from the navigation source.');
  }

  return guides.pages.map((entry, index) => {
    if (!entry || typeof entry !== 'object' || !Array.isArray(entry.pages)) {
      throw new Error(`Guides entry at index ${index} must be a grouped page set.`);
    }
    const title = String(entry.group || '').trim();
    if (!title) {
      throw new Error(`Guides entry at index ${index} is missing a group title.`);
    }
    const slug = `${String(index + 1).padStart(2, '0')}-${slugify(title)}`;
    const pages = entry.pages.map((page, pageIndex) => {
      if (typeof page !== 'string' || !page.trim()) {
        throw new Error(`Guides page ${title}#${pageIndex} must be a non-empty string route.`);
      }
      const route = toPosix(page.trim());
      return route.endsWith('.mdx') ? route : `${route}.mdx`;
    });
    return {
      index: index + 1,
      title,
      slug,
      pages
    };
  });
}

function filterTranches(tranches, filters) {
  if (!Array.isArray(filters) || filters.length === 0) return tranches;
  const filterSet = new Set(filters.map((entry) => slugify(entry)));
  return tranches.filter((tranche) => filterSet.has(slugify(tranche.slug)) || filterSet.has(slugify(tranche.title)));
}

function validateLiveFiles(tranches) {
  const missing = [];
  tranches.forEach((tranche) => {
    tranche.pages.forEach((page) => {
      if (!fileExists(page)) {
        missing.push({ tranche: tranche.title, file: page });
      }
    });
  });
  return missing;
}

function runNodeScript(scriptPath, scriptArgs) {
  const result = spawnSync(process.execPath, [path.resolve(REPO_ROOT, scriptPath), ...scriptArgs], {
    cwd: REPO_ROOT,
    encoding: 'utf8'
  });

  return {
    status: typeof result.status === 'number' ? result.status : 1,
    stdout: String(result.stdout || ''),
    stderr: String(result.stderr || '')
  };
}

function collectAllClaims(pageReport) {
  return [
    ...(Array.isArray(pageReport?.verified_claims) ? pageReport.verified_claims : []),
    ...(Array.isArray(pageReport?.conflicted_claims) ? pageReport.conflicted_claims : []),
    ...(Array.isArray(pageReport?.time_sensitive_claims) ? pageReport.time_sensitive_claims : []),
    ...(Array.isArray(pageReport?.unverified_or_historical_claims) ? pageReport.unverified_or_historical_claims : [])
  ];
}

function isRepoPath(ref) {
  return /^(?:v2|docs-guide|tasks|tools|tests|snippets)\//.test(String(ref || ''));
}

function collectRegistryDrift(pageReport) {
  const drift = [];
  const seen = new Set();
  const claims = collectAllClaims(pageReport);
  const claimById = new Map(claims.map((claim) => [claim.claim_id, claim]));

  function addEntry(entry) {
    const key = `${entry.kind}|${entry.ref}|${entry.claim_id}|${entry.reason}`;
    if (seen.has(key)) return;
    seen.add(key);
    drift.push(entry);
  }

  claims.forEach((claim) => {
    if (isRepoPath(claim.canonical_owner) && !fileExists(claim.canonical_owner)) {
      addEntry({
        kind: 'canonical-owner',
        ref: claim.canonical_owner,
        claim_id: claim.claim_id,
        claim_family: claim.claim_family,
        reason: 'canonical owner path does not resolve'
      });
    }

    (Array.isArray(claim.evidence) ? claim.evidence : []).forEach((evidence) => {
      if (evidence?.type === 'repo-file' && isRepoPath(evidence.ref) && !fileExists(evidence.ref)) {
        addEntry({
          kind: 'evidence-ref',
          ref: evidence.ref,
          claim_id: claim.claim_id,
          claim_family: claim.claim_family,
          reason: 'repo evidence path does not resolve'
        });
      }
    });
  });

  (Array.isArray(pageReport?.propagation_queue) ? pageReport.propagation_queue : []).forEach((entry) => {
    if (!isRepoPath(entry.file) || fileExists(entry.file)) return;
    const claim = claimById.get(entry.claim_id);
    addEntry({
      kind: 'dependent-page',
      ref: entry.file,
      claim_id: entry.claim_id,
      claim_family: claim?.claim_family || '',
      reason: 'propagation target path does not resolve'
    });
  });

  return drift.sort((a, b) => `${a.ref}|${a.claim_id}`.localeCompare(`${b.ref}|${b.claim_id}`));
}

function collectCoverageGaps(pageReport) {
  return (Array.isArray(pageReport?.claims_reviewed) ? pageReport.claims_reviewed : [])
    .filter((entry) => Array.isArray(entry?.matched_claim_families) && entry.matched_claim_families.length === 0)
    .map((entry) => String(entry.file || '').trim())
    .filter(Boolean)
    .sort();
}

function summarizeCounts(pageReport) {
  const trust = pageReport?.trust_summary || {};
  return {
    verified: Array.isArray(pageReport?.verified_claims) ? pageReport.verified_claims.length : 0,
    conflicted: Array.isArray(pageReport?.conflicted_claims) ? pageReport.conflicted_claims.length : 0,
    timeSensitive: Array.isArray(pageReport?.time_sensitive_claims) ? pageReport.time_sensitive_claims.length : 0,
    unverifiedHistorical: Array.isArray(pageReport?.unverified_or_historical_claims)
      ? pageReport.unverified_or_historical_claims.length
      : 0,
    contradictionGroups: Array.isArray(pageReport?.cross_page_contradictions) ? pageReport.cross_page_contradictions.length : 0,
    propagationQueue: Array.isArray(pageReport?.propagation_queue) ? pageReport.propagation_queue.length : 0,
    evidenceSources: Array.isArray(pageReport?.evidence_sources) ? pageReport.evidence_sources.length : 0,
    explicitTargets: Number.isFinite(trust.explicit_page_targets) ? trust.explicit_page_targets : 0,
    inferredTargets: Number.isFinite(trust.inferred_page_targets) ? trust.inferred_page_targets : 0
  };
}

function comparePageAndPr(pageReport, prReport) {
  const page = summarizeCounts(pageReport);
  const prSummary = prReport?.summary || {};
  const deltas = [];

  const comparisons = [
    ['conflicted claims', page.conflicted, Number(prSummary.conflicted_claims || 0)],
    ['time-sensitive claims', page.timeSensitive, Number(prSummary.time_sensitive_claims || 0)],
    ['contradiction groups', page.contradictionGroups, Number(prSummary.contradiction_groups || 0)],
    ['propagation queue items', page.propagationQueue, Number(prSummary.propagation_queue_items || 0)],
    ['evidence sources', page.evidenceSources, Number(prSummary.evidence_sources || 0)]
  ];

  comparisons.forEach(([label, pageValue, prValue]) => {
    if (pageValue !== prValue) {
      deltas.push(`${label}: page run ${pageValue}, PR run ${prValue}`);
    }
  });

  return deltas;
}

function formatClaimEntries(entries) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return ['- none'];
  }
  return entries.map((entry) => `- \`${entry.claim_id}\` (${entry.claim_family}) — ${entry.summary}`);
}

function groupPropagationEntries(entries) {
  const groups = new Map();
  entries.forEach((entry) => {
    const key = `${entry.file}|${entry.action}`;
    if (!groups.has(key)) {
      groups.set(key, { file: entry.file, action: entry.action, claimIds: [] });
    }
    groups.get(key).claimIds.push(entry.claim_id);
  });
  return [...groups.values()].sort((a, b) => `${a.file}|${a.action}`.localeCompare(`${b.file}|${b.action}`));
}

function buildRecommendedChanges(pageReport, driftEntries, gapPages) {
  const lines = [];
  const updateNow = groupPropagationEntries(
    (Array.isArray(pageReport?.propagation_queue) ? pageReport.propagation_queue : []).filter((entry) => entry.action === 'update-now')
  );

  if ((pageReport?.conflicted_claims || []).length > 0) {
    lines.push('- Downgrade or rewrite conflicted claims before this tranche is treated as copy-stable.');
  }
  if ((pageReport?.time_sensitive_claims || []).length > 0) {
    lines.push('- Rewrite current-truth language conservatively and attach explicit review cadence or source boundaries to volatile claims.');
  }
  if ((pageReport?.unverified_or_historical_claims || []).length > 0) {
    lines.push('- Verify unresolved or historical-only claims against stronger primary sources before they are repeated across dependent pages.');
  }
  if (updateNow.length > 0) {
    lines.push(
      `- Prioritise update-now propagation targets on ${updateNow
        .slice(0, 3)
        .map((entry) => `\`${entry.file}\``)
        .join(', ')} before tranche-wide wording cleanup.`
    );
  }
  if (driftEntries.length > 0) {
    lines.push('- Fix registry/path drift before the next research rerun so missing canonical or dependent references stop obscuring the findings.');
  }
  if (gapPages.length > 0) {
    lines.push(
      `- Expand claim-family coverage only where pages still fall through without matched families: ${gapPages
        .slice(0, 4)
        .map((file) => `\`${file}\``)
        .join(', ')}.`
    );
  }

  return lines.length > 0 ? lines : ['- none'];
}

function buildPropagationLines(pageReport) {
  const entries = Array.isArray(pageReport?.propagation_queue) ? pageReport.propagation_queue : [];
  if (entries.length === 0) {
    return ['- none'];
  }
  return entries.map((entry) => `- \`${entry.claim_id}\` -> \`${entry.file}\` [${entry.action}]`);
}

function buildDriftLines(driftEntries) {
  if (driftEntries.length === 0) {
    return ['- none'];
  }
  return driftEntries.map(
    (entry) => `- \`${entry.claim_id}\` (${entry.claim_family || 'unknown-family'}) -> \`${entry.ref}\` [${entry.kind}] — ${entry.reason}`
  );
}

function buildGapLines(gapPages) {
  if (gapPages.length === 0) {
    return ['- none'];
  }
  return gapPages.map((file) => `- \`${file}\``);
}

function buildTrancheResearchMarkdown(summary, tranche) {
  const counts = summarizeCounts(summary.pageReport);
  const driftEntries = collectRegistryDrift(summary.pageReport);
  const gapPages = collectCoverageGaps(summary.pageReport);
  const deltas = comparePageAndPr(summary.pageReport, summary.prReport);
  const lines = [];

  lines.push(`# ${tranche.title} — Research Report`);
  lines.push('');
  lines.push(`- Registry validate: ${summary.registryValidate.status === 0 ? 'pass' : 'fail'}`);
  lines.push(`- Adjudication ledger validate: ${summary.adjudicationValidate.status === 0 ? 'pass' : 'fail'}`);
  lines.push(`- docs-page-research run: ${summary.pageRun.status === 0 ? 'pass' : 'fail'}`);
  lines.push(`- docs-page-research-pr-report run: ${summary.prRun.status === 0 ? 'pass' : 'fail'}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Verified claims: ${counts.verified}`);
  lines.push(`- Conflicted claims: ${counts.conflicted}`);
  lines.push(`- Time-sensitive claims: ${counts.timeSensitive}`);
  lines.push(`- Unverified / historical claims: ${counts.unverifiedHistorical}`);
  lines.push(`- Contradiction groups: ${counts.contradictionGroups}`);
  lines.push(`- Propagation queue items: ${counts.propagationQueue}`);
  lines.push(`- Evidence sources checked: ${counts.evidenceSources}`);
  lines.push(`- Explicit page targets: ${counts.explicitTargets}`);
  lines.push(`- Inferred page targets: ${counts.inferredTargets}`);
  lines.push('');
  lines.push('## Conflicted Claims');
  lines.push('');
  lines.push(...formatClaimEntries(summary.pageReport.conflicted_claims));
  lines.push('');
  lines.push('## Time-Sensitive Claims');
  lines.push('');
  lines.push(...formatClaimEntries(summary.pageReport.time_sensitive_claims));
  lines.push('');
  lines.push('## Unverified / Historical Claims');
  lines.push('');
  lines.push(...formatClaimEntries(summary.pageReport.unverified_or_historical_claims));
  lines.push('');
  lines.push('## Recommended Research-Driven Changes');
  lines.push('');
  lines.push(...buildRecommendedChanges(summary.pageReport, driftEntries, gapPages));
  lines.push('');
  lines.push('## Propagation / Adjudication Follow-up');
  lines.push('');
  lines.push(...buildPropagationLines(summary.pageReport));
  lines.push('');
  lines.push('## Registry/path Drift');
  lines.push('');
  lines.push(...buildDriftLines(driftEntries));
  lines.push('');
  lines.push('## Registry Coverage Gaps');
  lines.push('');
  lines.push(...buildGapLines(gapPages));

  if (deltas.length > 0) {
    lines.push('');
    lines.push('## Page vs PR Delta');
    lines.push('');
    deltas.forEach((entry) => lines.push(`- ${entry}`));
    lines.push('');
    lines.push('## Future Split Recommendation');
    lines.push('');
    lines.push('- Keep the live-nav tranche intact for this pass, but review whether this section should be split in a future packet because the page-run and PR-run signals are diverging.');
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

function aggregateCounts(trancheResults) {
  return trancheResults.reduce(
    (acc, result) => {
      const counts = summarizeCounts(result.pageReport);
      acc.verified += counts.verified;
      acc.conflicted += counts.conflicted;
      acc.timeSensitive += counts.timeSensitive;
      acc.unverifiedHistorical += counts.unverifiedHistorical;
      acc.contradictionGroups += counts.contradictionGroups;
      acc.propagationQueue += counts.propagationQueue;
      acc.evidenceSources += counts.evidenceSources;
      return acc;
    },
    {
      verified: 0,
      conflicted: 0,
      timeSensitive: 0,
      unverifiedHistorical: 0,
      contradictionGroups: 0,
      propagationQueue: 0,
      evidenceSources: 0
    }
  );
}

function countByLabel(entries, selector) {
  const counts = new Map();
  entries.forEach((entry) => {
    const label = selector(entry);
    if (!label) return;
    counts.set(label, (counts.get(label) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function collectMasterInsights(trancheResults) {
  const conflicted = [];
  const timeSensitive = [];
  const propagationFiles = [];
  const driftEntries = [];
  const gapPages = [];
  const rewriteNow = [];
  const sourceVerification = [];
  const wordingDowngrade = [];

  trancheResults.forEach((result) => {
    (result.pageReport.conflicted_claims || []).forEach((entry) => {
      conflicted.push({ label: `${entry.claim_family} :: ${entry.claim_id}`, tranche: result.tranche.title });
      rewriteNow.push({ claim: entry.claim_id, tranche: result.tranche.title });
    });
    (result.pageReport.time_sensitive_claims || []).forEach((entry) => {
      timeSensitive.push({ label: `${entry.claim_family} :: ${entry.claim_id}`, tranche: result.tranche.title });
      wordingDowngrade.push({ claim: entry.claim_id, tranche: result.tranche.title });
    });
    (result.pageReport.unverified_or_historical_claims || []).forEach((entry) => {
      sourceVerification.push({ claim: entry.claim_id, tranche: result.tranche.title });
    });
    (result.pageReport.propagation_queue || []).forEach((entry) => {
      propagationFiles.push({ file: entry.file, tranche: result.tranche.title });
      if (entry.action === 'verify-only') {
        sourceVerification.push({ claim: entry.claim_id, tranche: result.tranche.title });
      }
      if (entry.action === 'update-now') {
        rewriteNow.push({ claim: `${entry.claim_id} -> ${entry.file}`, tranche: result.tranche.title });
      }
    });
    collectRegistryDrift(result.pageReport).forEach((entry) => {
      driftEntries.push({ label: `${entry.claim_family || 'unknown-family'} :: ${entry.ref}`, tranche: result.tranche.title });
    });
    collectCoverageGaps(result.pageReport).forEach((file) => {
      gapPages.push({ file, tranche: result.tranche.title });
    });
  });

  return {
    repeatedConflicted: countByLabel(conflicted, (entry) => entry.label),
    repeatedTimeSensitive: countByLabel(timeSensitive, (entry) => entry.label),
    propagationBurden: countByLabel(propagationFiles, (entry) => entry.file),
    repeatedDrift: countByLabel(driftEntries, (entry) => entry.label),
    rewriteNow,
    sourceVerification,
    wordingDowngrade,
    gapPages
  };
}

function buildBucketLines(entries, selector) {
  if (!entries.length) return ['- none'];
  const counts = countByLabel(entries, selector);
  return counts.slice(0, 10).map(([label, count]) => `- ${label} (${count})`);
}

function formatCountLines(counts, formatter = (label, count) => `- ${label} (${count})`) {
  if (!counts.length) return ['- none'];
  return counts.slice(0, 15).map(([label, count]) => formatter(label, count));
}

function filterRepeatedCounts(counts) {
  return counts.filter((entry) => entry[1] > 1);
}

function buildMasterPacket(trancheResults, args) {
  const totals = aggregateCounts(trancheResults);
  const insights = collectMasterInsights(trancheResults);
  const lines = [];

  lines.push('# Orchestrators Guides Research Master Packet');
  lines.push('');
  lines.push('- Worktree: `Docs-v2-dev`');
  lines.push('- Branch: `docs-v2-dev`');
  lines.push(`- Source nav file: \`${toPosix(args.nav)}\``);
  lines.push('- Scope: live `Orchestrators -> Guides` pages only from `docs-gate-work.json`; deprecated and non-live pages are excluded.');
  lines.push(`- Output root: \`${toPosix(args.out)}\``);
  lines.push('');
  lines.push('## Tranche Execution Order');
  lines.push('');
  trancheResults.forEach((result) => {
    lines.push(`${result.tranche.index}. ${result.tranche.title} (${result.tranche.pages.length} page(s)) -> \`${result.tranche.slug}\``);
  });
  lines.push('');
  lines.push('## Aggregate Totals');
  lines.push('');
  lines.push(`- Verified claims: ${totals.verified}`);
  lines.push(`- Conflicted claims: ${totals.conflicted}`);
  lines.push(`- Time-sensitive claims: ${totals.timeSensitive}`);
  lines.push(`- Unverified / historical claims: ${totals.unverifiedHistorical}`);
  lines.push(`- Contradiction groups: ${totals.contradictionGroups}`);
  lines.push(`- Propagation queue items: ${totals.propagationQueue}`);
  lines.push(`- Evidence sources checked: ${totals.evidenceSources}`);
  lines.push('');
  lines.push('## Per-Tranche Scoreboard');
  lines.push('');
  trancheResults.forEach((result) => {
    const counts = summarizeCounts(result.pageReport);
    const runStatus =
      result.registryValidate.status === 0 &&
      result.adjudicationValidate.status === 0 &&
      result.pageRun.status === 0 &&
      result.prRun.status === 0
        ? 'pass'
        : 'fail';
    lines.push(`### ${result.tranche.index}. ${result.tranche.title}`);
    lines.push('');
    lines.push(`- Folder: \`${result.tranche.slug}\``);
    lines.push(`- Pages: ${result.tranche.pages.length}`);
    lines.push(`- Run status: ${runStatus}`);
    lines.push(`- Verified claims: ${counts.verified}`);
    lines.push(`- Conflicted claims: ${counts.conflicted}`);
    lines.push(`- Time-sensitive claims: ${counts.timeSensitive}`);
    lines.push(`- Contradiction groups: ${counts.contradictionGroups}`);
    lines.push(`- Propagation queue items: ${counts.propagationQueue}`);
    lines.push(`- Evidence sources checked: ${counts.evidenceSources}`);
    lines.push('');
  });
  lines.push('## Cross-Tranche Findings Rollup');
  lines.push('');
  lines.push('### Repeated Conflicted Claim Families');
  lines.push('');
  lines.push(...formatCountLines(filterRepeatedCounts(insights.repeatedConflicted)));
  lines.push('');
  lines.push('### Repeated Time-Sensitive Claim Families');
  lines.push('');
  lines.push(...formatCountLines(filterRepeatedCounts(insights.repeatedTimeSensitive)));
  lines.push('');
  lines.push('### Pages With Highest Propagation Burden');
  lines.push('');
  lines.push(...formatCountLines(insights.propagationBurden, (file, count) => `- \`${file}\` (${count})`));
  lines.push('');
  lines.push('### Repeated Registry/path Drift');
  lines.push('');
  lines.push(...formatCountLines(filterRepeatedCounts(insights.repeatedDrift)));
  lines.push('');
  lines.push('### Follow-up Buckets');
  lines.push('');
  lines.push('#### Content rewrite now');
  lines.push('');
  lines.push(...buildBucketLines(insights.rewriteNow, (entry) => `${entry.claim} :: ${entry.tranche}`));
  lines.push('');
  lines.push('#### Wording needs downgrading');
  lines.push('');
  lines.push(...buildBucketLines(insights.wordingDowngrade, (entry) => `${entry.claim} :: ${entry.tranche}`));
  lines.push('');
  lines.push('#### Source verification needed');
  lines.push('');
  lines.push(...buildBucketLines(insights.sourceVerification, (entry) => `${entry.claim} :: ${entry.tranche}`));
  lines.push('');
  lines.push('#### Registry coverage gap');
  lines.push('');
  lines.push(...formatCountLines(countByLabel(insights.gapPages, (entry) => `${entry.file} :: ${entry.tranche}`)));
  lines.push('');
  lines.push('#### Path/IA mismatch in the research registry');
  lines.push('');
  lines.push(...formatCountLines(filterRepeatedCounts(insights.repeatedDrift)));

  return `${lines.join('\n').trimEnd()}\n`;
}

function runTranche(tranche, args, validation) {
  const trancheRoot = toPosix(path.join(args.out, tranche.slug));
  const pageMd = toPosix(path.join(trancheRoot, 'research-pages.md'));
  const pageJson = toPosix(path.join(trancheRoot, 'research-pages.json'));
  const prMd = toPosix(path.join(trancheRoot, 'research-pr.md'));
  const prJson = toPosix(path.join(trancheRoot, 'research-pr.json'));
  const summaryJson = toPosix(path.join(trancheRoot, 'research-summary.json'));
  const summaryMd = toPosix(path.join(trancheRoot, '03-research.md'));
  const filesArg = tranche.pages.join(',');

  const pageRun = runNodeScript('tools/scripts/docs-page-research.js', [
    '--registry',
    args.registry,
    '--files',
    filesArg,
    '--report-md',
    pageMd,
    '--report-json',
    pageJson,
    '--quiet'
  ]);
  if (pageRun.status !== 0) {
    throw new Error(`docs-page-research failed for ${tranche.title}: ${pageRun.stderr || pageRun.stdout}`);
  }

  const prRun = runNodeScript('tools/scripts/docs-page-research-pr-report.js', [
    '--registry',
    args.registry,
    '--files',
    filesArg,
    '--report-md',
    prMd,
    '--report-json',
    prJson,
    '--quiet'
  ]);
  if (prRun.status !== 0) {
    throw new Error(`docs-page-research-pr-report failed for ${tranche.title}: ${prRun.stderr || prRun.stdout}`);
  }

  const summary = {
    registryValidate: validation.registryValidate,
    adjudicationValidate: validation.adjudicationValidate,
    pageRun,
    prRun,
    pageReport: readJsonFile(pageJson),
    prReport: readJsonFile(prJson)
  };

  writeJsonFile(summaryJson, summary);
  writeTextFile(summaryMd, buildTrancheResearchMarkdown(summary, tranche));

  return {
    tranche,
    ...summary
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    process.exit(0);
  }

  const nav = readJsonFile(args.nav);
  const allTranches = findOrchestratorGuidesGroups(nav);
  const tranches = filterTranches(allTranches, args.tranche);
  if (tranches.length === 0) {
    throw new Error('No Orchestrators Guides tranches matched the requested filter.');
  }

  const missingFiles = validateLiveFiles(tranches);
  if (missingFiles.length > 0) {
    throw new Error(
      `Missing live guide file(s): ${missingFiles.map((entry) => `${entry.file} [${entry.tranche}]`).join(', ')}`
    );
  }

  const validation = {
    registryValidate: runNodeScript('tools/scripts/docs-fact-registry.js', ['--validate', '--registry', args.registry]),
    adjudicationValidate: runNodeScript('tools/scripts/docs-research-adjudication.js', ['--validate', '--ledger', args.ledger])
  };

  if (validation.registryValidate.status !== 0) {
    throw new Error(validation.registryValidate.stderr || validation.registryValidate.stdout || 'Registry validation failed');
  }
  if (validation.adjudicationValidate.status !== 0) {
    throw new Error(
      validation.adjudicationValidate.stderr || validation.adjudicationValidate.stdout || 'Adjudication validation failed'
    );
  }

  const results = tranches.map((tranche) => runTranche(tranche, args, validation));
  writeTextFile(toPosix(path.join(args.out, '00-master-packet.md')), buildMasterPacket(results, args));

  if (!args.quiet) {
    const totalPages = results.reduce((count, result) => count + result.tranche.pages.length, 0);
    console.log(
      `✅ orchestrator-guides-research-review: ${results.length} tranche(s), ${totalPages} live guide page(s), output at ${toPosix(args.out)}`
    );
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  buildMasterPacket,
  buildTrancheResearchMarkdown,
  collectCoverageGaps,
  collectRegistryDrift,
  comparePageAndPr,
  formatCountLines,
  filterRepeatedCounts,
  findOrchestratorGuidesGroups,
  summarizeCounts
};

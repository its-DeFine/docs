#!/usr/bin/env node
/**
 * @script docs-usefulness-accuracy-verifier.test
 * @summary Validate source-weighted 2026 accuracy verification rules (GitHub vs DeepWiki precedence, freshness, fallback, and cache reuse).
 * @owner docs
 * @scope tests, tools/lib/docs-usefulness, tools/config
 *
 * @usage
 *   node tests/unit/docs-usefulness-accuracy-verifier.test.js
 *
 * @inputs
 *   No required CLI flags.
 *
 * @outputs
 *   - Console pass/fail output for targeted source-weighting accuracy verifier scenarios.
 *
 * @exit-codes
 *   0 = all assertions passed
 *   1 = one or more assertions failed
 *
 * @examples
 *   node tests/unit/docs-usefulness-accuracy-verifier.test.js
 *
 * @notes
 *   Uses synthetic evidence records and a temp cache directory so no network access is required.
 */

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  aggregatePageAccuracy,
  createTier2Provider,
  createVerificationCache,
  evaluateClaimAccuracy,
  verifyPageAccuracy
} = require('../../tools/lib/docs-usefulness/accuracy-verifier');

async function runCase(name, fn) {
  try {
    await fn();
    console.log(`✓ ${name}`);
    return true;
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  ${error.stack || error.message || error}`);
    return false;
  }
}

function claim(id, text, timeSensitive = false) {
  return {
    id,
    text,
    time_sensitive: timeSensitive,
    preferred_source_types: ['github', 'official', 'deepwiki']
  };
}

function evidence(sourceType, supportsClaim, sourceDate) {
  return {
    source_type: sourceType,
    source_url: `https://example.test/${sourceType}/${String(supportsClaim)}`,
    source_title: `${sourceType} sample`,
    source_date: sourceDate,
    supports_claim: supportsClaim,
    evidence_excerpt: 'Synthetic evidence for unit test.'
  };
}

async function main() {
  const results = [];

  results.push(await runCase('GitHub-only support verifies claim for 2026', async () => {
    const result = evaluateClaimAccuracy({
      claim: claim('c1', 'Livepeer supports orchestrators.'),
      asOfDate: '2026-02-23',
      evidence: [evidence('github_code', true, '2026-02-01')]
    });
    assert.strictEqual(result.accuracy_2026_status, 'verified_2026');
    assert.ok(result.accuracy_2026_confidence >= 0.9);
  }));

  results.push(await runCase('DeepWiki-only support remains provisional', async () => {
    const result = evaluateClaimAccuracy({
      claim: claim('c2', 'A docs feature currently exists.', true),
      asOfDate: '2026-02-23',
      evidence: [evidence('deepwiki', true, '2026-02-10')]
    });
    assert.strictEqual(result.accuracy_2026_status, 'provisional');
    assert.ok(result.accuracy_2026_confidence <= 0.65);
  }));

  results.push(await runCase('DeepWiki conflict loses to GitHub and sets review flags at page level', async () => {
    const claimResult = evaluateClaimAccuracy({
      claim: claim('c3', 'The API supports endpoint X.'),
      asOfDate: '2026-02-23',
      evidence: [
        evidence('github_docs', true, '2026-02-15'),
        evidence('deepwiki', false, '2026-02-16')
      ]
    });
    assert.strictEqual(claimResult.accuracy_2026_status, 'verified_2026');
    assert.ok(claimResult.source_conflicts.length >= 1);

    const page = aggregatePageAccuracy([claimResult], { asOfDate: '2026-02-23' });
    assert.strictEqual(page.accuracy_2026_status, 'verified_2026');
    assert.ok(page.flags.includes('source_conflict'));
    assert.ok(page.flags.includes('accuracy_needs_review'));
  }));

  results.push(await runCase('Old GitHub evidence marks time-sensitive claim as stale_risk', async () => {
    const result = evaluateClaimAccuracy({
      claim: claim('c4', 'The latest release is available now.', true),
      asOfDate: '2026-02-23',
      evidence: [evidence('github_readme', true, '2024-01-01')]
    });
    assert.strictEqual(result.accuracy_2026_status, 'stale_risk');
    assert.ok(result.source_freshness_latest_date, 'missing freshness date');
  }));

  results.push(await runCase('Provider failure degrades to provisional and sets accuracy_needs_review', async () => {
    const failingProvider = {
      async fetchEvidenceForClaim() {
        throw new Error('network unavailable');
      }
    };
    const page = await verifyPageAccuracy({
      claims: [claim('c5', 'Livepeer currently supports feature Y.', true)],
      asOfDate: '2026-02-23',
      accuracyMode: 'tiered',
      tier2Provider: failingProvider
    });
    assert.strictEqual(page.accuracy_2026_status, 'provisional');
    assert.ok(page.flags.includes('accuracy_needs_review'));
    assert.ok(page.provider_errors.some((msg) => /network unavailable/i.test(msg)));
  }));

  results.push(await runCase('Cached source artifact is reused on repeat claim verification', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-usefulness-cache-'));
    let callCount = 0;
    try {
      const cache = createVerificationCache(tmpDir);
      const provider = createTier2Provider({
        cache,
        queryClaimEvidence: async () => {
          callCount += 1;
          return {
            evidence: [evidence('github_code', true, '2026-02-20')],
            errors: []
          };
        }
      });
      const sampleClaim = claim('c6', 'Protocol behavior is defined in the codebase.');
      const context = {
        asOfDate: '2026-02-23',
        verifySources: ['github', 'deepwiki', 'official'],
        githubRepos: ['livepeer/go-livepeer'],
        deepwikiEnabled: true
      };

      const first = await provider.fetchEvidenceForClaim(sampleClaim, context);
      const second = await provider.fetchEvidenceForClaim(sampleClaim, context);

      assert.strictEqual(callCount, 1);
      assert.strictEqual(Boolean(first.from_cache), false);
      assert.strictEqual(Boolean(second.from_cache), true);
      assert.strictEqual(second.evidence[0].source_type, 'github_code');
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  }));

  const passed = results.filter(Boolean).length;
  if (passed !== results.length) {
    process.exit(1);
  }
  console.log(`\n${passed} test case(s) passed`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

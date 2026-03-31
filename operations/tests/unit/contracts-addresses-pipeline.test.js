#!/usr/bin/env node
/**
 * @script            contracts-addresses-pipeline.test
 * @category          validator
 * @purpose           qa:contracts-registry
 * @scope             tests/unit, .github/scripts/fetch-contract-addresses.js, operations/scripts/config/contract-addresses-authority.json, snippets/components/integrators/feeds/ContractVerifier.jsx, snippets/data/contract-addresses/contractAddressesData.json
 * @owner             docs
 * @needs             E-R12, E-R14
 * @purpose-statement Regression tests for the contracts authority catalog, lifecycle grouping, generated registry output, and widget data-consumption contract.
 * @pipeline          P1 (commit, via run-all)
 * @usage             node operations/tests/unit/contracts-addresses-pipeline.test.js
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const {
  loadAuthorityCatalog,
  resolveAuthority,
  buildChainPayload,
} = require('../../../.github/scripts/fetch-contract-addresses.js');
const {
  buildContractVerifierChainData,
  isContractVerifierControllerLookupEligible,
} = require('../../../snippets/components/integrators/feeds/contractVerifierData.js');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const GENERATED_JSON_PATH = path.join(
  REPO_ROOT,
  'snippets',
  'data',
  'contract-addresses',
  'contractAddressesData.json'
);
const CANONICAL_PAGE_PATH = path.join(
  REPO_ROOT,
  'snippets',
  'composables',
  'pages',
  'canonical',
  'livepeer-contract-addresses.mdx'
);
const BLOCKCHAIN_PAGE_PATH = path.join(
  REPO_ROOT,
  'v2',
  'about',
  'livepeer-protocol',
  'blockchain-contracts.mdx'
);

const STALE_ARBITRUM_MINTER_V1 = '0x4969dcCF5186e1c49411638fc8A2a020Fdab752E'.toLowerCase();
const STALE_BONDING_VOTES_TARGET = '0x1561fC5F7Efc049476224005DFf38256dccfc509'.toLowerCase();

let errors = [];

function runCase(name, fn) {
  try {
    fn();
    console.log(`   ✓ ${name}`);
  } catch (error) {
    errors.push({
      file: 'operations/tests/unit/contracts-addresses-pipeline.test.js',
      line: 1,
      rule: 'contracts-addresses-pipeline',
      message: `${name}: ${error.message}`,
    });
  }
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function loadGeneratedJson() {
  assert.ok(fs.existsSync(GENERATED_JSON_PATH), 'generated contractAddressesData.json is missing');
  return JSON.parse(readText(GENERATED_JSON_PATH));
}

function runTests() {
  errors = [];

  console.log('🧪 Contracts Addresses Pipeline Unit Tests');

  runCase('authority catalog loads and includes deterministic latest-resolution policy', () => {
    const catalog = loadAuthorityCatalog();
    assert.ok(Array.isArray(catalog.deployments) && catalog.deployments.length > 0, 'catalog should contain deployments');
    assert.ok(
      Array.isArray(catalog._meta?.latestResolutionPolicy) && catalog._meta.latestResolutionPolicy.length > 0,
      'catalog should publish latest-resolution policy',
    );
  });

  runCase('resolveAuthority selects the latest governor version instead of the base key', () => {
    const governorChain = {
      minter: '0x1111111111111111111111111111111111111111',
      minterV2: '0x2222222222222222222222222222222222222222',
      minterV10: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    };

    const resolved = resolveAuthority(
      {
        kind: 'governor-versioned-latest',
        baseKey: 'minter',
        baseVersion: 'V1',
        prefix: 'minterV',
      },
      governorChain,
    );

    assert.strictEqual(resolved.address, governorChain.minterV10);
    assert.strictEqual(resolved.version, 'V10');
    assert.strictEqual(resolved.authorityKind, 'governor-scripts');
    assert.strictEqual(resolved.sourceKey, 'minterV10');
  });

  runCase('buildChainPayload keeps current implementations out of the active table', () => {
    const payload = buildChainPayload(
      [
        {
          name: 'BondingManager',
          address: '0x1000000000000000000000000000000000000001',
          category: 'core',
          lifecycle: 'active',
          type: 'proxy',
        },
        {
          name: 'L2Migrator',
          address: '0x2000000000000000000000000000000000000002',
          category: 'migration',
          lifecycle: 'migration_residual',
          type: 'proxy',
        },
        {
          name: 'Controller',
          address: '0x3000000000000000000000000000000000000003',
          category: 'core',
          lifecycle: 'paused',
          type: 'standalone',
        },
      ],
      [
        {
          name: 'BondingManager',
          address: '0x4000000000000000000000000000000000000004',
          category: 'core',
          lifecycle: 'historical',
          type: 'target',
        },
      ],
      {},
    );

    assert.strictEqual(payload.current, payload.active, 'current should remain an alias of active');
    assert.strictEqual(payload.active.some((entry) => (entry.type || entry.deploymentKind) === 'target'), false);
    assert.strictEqual(payload.currentImplementations.length, 1);
    assert.strictEqual(payload.currentImplementations[0].address, '0x4000000000000000000000000000000000000004');
    assert.strictEqual(payload.migration_residual[0].name, 'L2Migrator');
    assert.strictEqual(payload.paused[0].name, 'Controller');
  });

  runCase('generated registry excludes stale active rows and target rows from arbitrumOne.active', () => {
    const data = loadGeneratedJson();
    const active = data.arbitrumOne?.active || [];
    const implementations = data.arbitrumOne?.currentImplementations || [];

    assert.ok(active.length > 0, 'arbitrumOne.active should not be empty');
    assert.strictEqual(
      active.some((entry) => String(entry.address || '').toLowerCase() === STALE_ARBITRUM_MINTER_V1),
      false,
      'stale Arbitrum Minter V1 must not appear in active',
    );
    assert.strictEqual(
      active.some((entry) => String(entry.address || '').toLowerCase() === STALE_BONDING_VOTES_TARGET),
      false,
      'stale BondingVotes target must not appear in active',
    );
    assert.strictEqual(
      active.some((entry) => (entry.type || entry.deploymentKind) === 'target'),
      false,
      'active table must not contain target rows',
    );
    assert.strictEqual(
      active.some((entry) => entry.name === 'L2Migrator'),
      false,
      'migration-residual contracts must not appear in active',
    );
    assert.ok(
      implementations.some((entry) => entry.name === 'BondingVotes' && (entry.type || entry.deploymentKind) === 'target'),
      'currentImplementations should retain BondingVotes target entry',
    );
  });

  runCase('ContractVerifier helper consumes lifecycle-safe groups and explicit controller registration', () => {
    const data = loadGeneratedJson();
    const { activeEntries, inventoryEntries, canonical } = buildContractVerifierChainData(data, 'arbitrumOne');

    assert.ok(activeEntries.length > 0, 'widget should receive active entries');
    assert.ok(inventoryEntries.length >= activeEntries.length, 'widget inventory should include at least the active entries');
    assert.strictEqual(
      activeEntries.some((entry) => (entry.type || entry.deploymentKind) === 'target'),
      false,
      'widget active set must not contain target rows',
    );
    assert.strictEqual(canonical.BondingManager?.type || canonical.BondingManager?.deploymentKind, 'proxy');
    assert.strictEqual(
      isContractVerifierControllerLookupEligible(canonical.BondingManager, true),
      true,
      'controller-managed active contracts should stay RPC-eligible',
    );
    assert.strictEqual(
      isContractVerifierControllerLookupEligible(canonical.AIServiceRegistry, true),
      false,
      'non-controller contracts must not be treated as controller lookups',
    );
  });

  runCase('contracts pages are rewired away from raw current lookups and legacy routes', () => {
    const canonicalPage = readText(CANONICAL_PAGE_PATH);
    const blockchainPage = readText(BLOCKCHAIN_PAGE_PATH);

    assert.ok(!canonicalPage.includes('scan_fix'), 'canonical page should not mention removed scan_fix workflow input');
    assert.ok(
      canonicalPage.includes('contractAddresses.arbitrumOne?.active') || canonicalPage.includes("contractAddresses.arbitrumOne?.active || contractAddresses.arbitrumOne?.current"),
      'canonical page should consume active lifecycle data',
    );
    assert.ok(!blockchainPage.includes('.current.find('), 'blockchain page should not use raw current.find lookups');
    assert.ok(!blockchainPage.includes('/v2/about/resources/contract-addresses'), 'blockchain page should link to the canonical route');
  });

  return {
    errors,
    passed: errors.length === 0,
    total: 6,
  };
}

if (require.main === module) {
  const result = runTests();

  if (result.errors.length > 0) {
    console.error('\n❌ Contracts addresses pipeline unit test failures:\n');
    result.errors.forEach((error) => {
      console.error(`  ${error.file}:${error.line} - ${error.rule}: ${error.message}`);
    });
  } else {
    console.log(`\n✅ Contracts addresses pipeline unit tests passed (${result.total} checks)`);
  }

  process.exit(result.passed ? 0 : 1);
}

module.exports = { runTests };

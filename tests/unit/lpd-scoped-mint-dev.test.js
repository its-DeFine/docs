#!/usr/bin/env node
/**
 * @script            lpd-scoped-mint-dev.test
 * @category          utility
 * @purpose           tooling:dev-tools
 * @scope             tests/unit, lpd, tools/scripts/mint-dev.sh, tools/scripts/dev/generate-mint-dev-scope.js
 * @owner             docs
 * @needs             E-C6, F-C1
 * @purpose-statement Tests lpd scoped mint-dev functionality — validates dev server scope filtering
 * @pipeline          manual — developer tool
 * @dualmode          dual-mode (document flags)
 * @usage             node tests/unit/lpd-scoped-mint-dev.test.js [flags]
 */

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { EventEmitter } = require('events');
const { spawnSync } = require('child_process');
const {
  collectRoutesFromNavigation,
  collectOptionsFromNavigation,
  buildScopedNavigation,
  buildScopedMetadata,
  buildScopedMintignore,
  ScopedMintSessionSupervisor,
  createScopedProfile
} = require('../../tools/scripts/dev/generate-mint-dev-scope');

const REPO_ROOT = process.cwd();
const LPD_PATH = path.join(REPO_ROOT, 'lpd');
const SCOPE_SCRIPT_PATH = path.join(REPO_ROOT, 'tools/scripts/dev/generate-mint-dev-scope.js');

const SAMPLE_NAVIGATION = {
  versions: [
    {
      version: 'v2',
      languages: [
        {
          language: 'en',
          tabs: [
            {
              tab: 'Developers',
              anchors: [
                {
                  anchor: 'Build',
                  groups: [
                    {
                      group: 'Dev',
                      pages: ['v2/dev/get-started', 'v2/dev/api-reference/auth']
                    }
                  ]
                }
              ]
            },
            {
              tab: 'Gateways',
              anchors: [
                {
                  anchor: 'Run',
                  groups: [
                    {
                      group: 'Gateway',
                      pages: ['v2/gateways/overview']
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          language: 'es',
          tabs: [
            {
              tab: 'Developers',
              anchors: [
                {
                  anchor: 'Construir',
                  groups: [
                    {
                      group: 'Dev',
                      pages: ['v2/es/dev/get-started']
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      version: 'v1',
      languages: [
        {
          language: 'en',
          tabs: [
            {
              tab: 'Legacy',
              anchors: [
                {
                  anchor: 'Legacy',
                  groups: [
                    {
                      group: 'Legacy',
                      pages: ['v1/legacy/overview']
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

function runLpd(args) {
  return spawnSync('bash', [LPD_PATH, ...args], {
    cwd: REPO_ROOT,
    encoding: 'utf8'
  });
}

function runScopeScript(args, cwd) {
  return spawnSync('node', [SCOPE_SCRIPT_PATH, ...args], {
    cwd,
    encoding: 'utf8'
  });
}

function mkTmpDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function writeFile(absPath, content) {
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, content, 'utf8');
}

function waitFor(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createSupervisorProfile(overrides = {}) {
  return {
    workspaceDir: overrides.workspaceDir || '/tmp/lpd-scoped-workspace',
    scopeHash: overrides.scopeHash || 'scoped-session',
    selection: {
      versions: ['v2'],
      languages: ['en'],
      tabs: ['Developers'],
      prefixes: ['v2/dev'],
      disableOpenapi: false,
      ...(overrides.selection || {})
    },
    sourceDocsConfig: overrides.sourceDocsConfig || '/tmp/repo/docs.json',
    routeCounts: overrides.routeCounts || { original: 4, scoped: 2 },
    disabledOpenapi: Boolean(overrides.disabledOpenapi)
  };
}

function createFakeMintChild() {
  const child = new EventEmitter();
  child.exitCode = null;
  child.signalCode = null;
  child.kills = [];
  child.kill = (signal = 'SIGTERM') => {
    child.kills.push(signal);
    child.signalCode = signal;
    setImmediate(() => child.emit('exit', 0, signal));
    return true;
  };
  return child;
}

async function runTests() {
  const failures = [];
  const cases = [];
  const createSupervisorHarness = (profiles, promptResponses = []) => {
    const logMessages = [];
    const errorMessages = [];
    const watchPaths = [];
    const watchListeners = [];
    const children = [];
    const profileCalls = [];
    const promptCalls = [];

    const createScopedProfileStub = async (args) => {
      profileCalls.push({
        docsConfig: args.docsConfig,
        workspaceId: args.workspaceId || '',
        versions: [...(args.versions || [])],
        languages: [...(args.languages || [])],
        tabs: [...(args.tabs || [])],
        prefixes: [...(args.prefixes || [])]
      });
      const next = profiles.shift();
      if (next instanceof Error) {
        throw next;
      }
      return next;
    };

    const spawnProcess = (_command, args, options) => {
      const child = createFakeMintChild();
      child.spawnArgs = args;
      child.spawnOptions = options;
      children.push(child);
      return child;
    };

    const watchFactory = (watchPath, handler) => {
      watchPaths.push(watchPath);
      watchListeners.push(handler);
      return {
        close() {}
      };
    };

    const promptForReload = async (message) => {
      promptCalls.push(message);
      return promptResponses.length > 0 ? promptResponses.shift() : false;
    };

    const supervisor = new ScopedMintSessionSupervisor(
      {
        repoRoot: '/tmp/repo',
        workspaceBase: '/tmp/lpd-workspaces',
        docsConfig: '',
        scopeFile: '',
        versions: [],
        languages: [],
        tabs: [],
        prefixes: [],
        interactive: false,
        disableOpenapi: false,
        debounceMs: 5
      },
      {
        createScopedProfile: createScopedProfileStub,
        spawnProcess,
        watchFactory,
        promptForReload,
        log: (message) => logMessages.push(message),
        logError: (message) => errorMessages.push(message)
      }
    );

    return {
      supervisor,
      logMessages,
      errorMessages,
      watchPaths,
      children,
      profileCalls,
      promptCalls,
      emit(eventType, filename) {
        watchListeners.forEach((handler) => handler(eventType, filename));
      }
    };
  };

  cases.push(async () => {
    const selection = {
      versions: ['v2'],
      languages: ['en'],
      tabs: ['Developers'],
      prefixes: ['v2/dev'],
      disableOpenapi: true
    };
    const scoped = buildScopedNavigation(SAMPLE_NAVIGATION, selection);
    const routes = collectRoutesFromNavigation(scoped);
    assert.deepStrictEqual(routes, ['v2/dev/get-started']);
  });

  cases.push(async () => {
    const selection = {
      versions: ['v2'],
      languages: ['en'],
      tabs: ['Developers'],
      prefixes: ['v2/dev'],
      disableOpenapi: true
    };
    const optionData = collectOptionsFromNavigation(SAMPLE_NAVIGATION);
    const allRoutes = collectRoutesFromNavigation(SAMPLE_NAVIGATION);
    const scopedRoutes = ['v2/dev/get-started'];
    const metadata = buildScopedMetadata(selection, optionData, allRoutes, scopedRoutes);
    const scopedMintignore = buildScopedMintignore('# base ignore\n', metadata);
    assert.match(scopedMintignore, /\/v1\/\*\*/, 'should exclude unselected version');
    assert.match(scopedMintignore, /\/v2\/es\/\*\*/, 'should exclude unselected language directory');
    assert.match(scopedMintignore, /api-reference/, 'should include openapi exclusion patterns');
  });

  cases.push(async () => {
    const run = runLpd([
      'dev',
      '--dry-run',
      '--scoped',
      '--scope-version',
      'v2',
      '--scope-language',
      'en',
      '--scope-tab',
      'Developers',
      '--scope-prefix',
      'v2/dev',
      '--disable-openapi'
    ]);
    assert.strictEqual(run.status, 0, `lpd dry-run failed: ${run.stderr || run.stdout}`);
    assert.match(run.stdout, /Scoped mint profile: enabled/);
    assert.match(run.stdout, /scope_versions:\s*v2/);
    assert.match(run.stdout, /scope_languages:\s*en/);
    assert.match(run.stdout, /scope_tabs:\s*Developers/);
    assert.match(run.stdout, /OpenAPI docs scope: disabled/);
    assert.match(run.stdout, /tools\/scripts\/mint-dev\.sh/);
  });

  cases.push(async () => {
    const tmp = mkTmpDir('lpd-alt-docs-config-');
    const altDocs = {
      $schema: 'https://mintlify.com/docs.json',
      theme: 'palm',
      name: 'Alt Fixture Docs',
      navigation: {
        versions: [
          {
            version: 'v2',
            languages: [
              {
                language: 'en',
                tabs: [
                  {
                    tab: 'Orchestrators',
                    groups: [
                      {
                        group: 'Operations',
                        pages: ['v2/orchestrators/operations/x-running-workloads']
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };
    writeFile(path.join(tmp, 'docs-orch-work.json'), `${JSON.stringify(altDocs, null, 2)}\n`);

    const run = runLpd(['dev', '--dry-run', '--scoped', '--docs-config', path.join(tmp, 'docs-orch-work.json')]);
    assert.strictEqual(run.status, 0, `lpd dry-run with docs config failed: ${run.stderr || run.stdout}`);
    assert.match(run.stdout, /Scoped mint profile: enabled/);
    assert.match(run.stdout, /docs_config:/);
    assert.match(run.stdout, /docs-orch-work\.json/);
  });

  cases.push(async () => {
    const run = runLpd(['dev', '--dry-run', '--', '--port', '3333']);
    assert.strictEqual(run.status, 0, `lpd pass-through dry-run failed: ${run.stderr || run.stdout}`);
    assert.doesNotMatch(run.stdout, /Scoped mint profile: enabled/);
    assert.match(run.stdout, /--port/);
    assert.match(run.stdout, /3333/);
  });

  cases.push(async () => {
    const tmp = mkTmpDir('lpd-scope-test-');
    const docs = {
      $schema: 'https://mintlify.com/docs.json',
      theme: 'palm',
      name: 'Fixture Docs',
      navigation: SAMPLE_NAVIGATION
    };
    writeFile(path.join(tmp, 'docs.json'), `${JSON.stringify(docs, null, 2)}\n`);
    writeFile(path.join(tmp, '.mintignore'), '# fixture\n');
    writeFile(path.join(tmp, 'v2/dev/get-started.mdx'), '# Get started\n');
    writeFile(path.join(tmp, 'v2/dev/api-reference/auth.mdx'), '# Auth\n');
    writeFile(path.join(tmp, 'v2/gateways/overview.mdx'), '# Gateway overview\n');
    writeFile(path.join(tmp, 'v2/es/dev/get-started.mdx'), '# Empezar\n');
    writeFile(path.join(tmp, 'v1/legacy/overview.mdx'), '# Legacy\n');

    const run = runScopeScript(
      ['--repo-root', tmp, '--versions', 'v2', '--languages', 'en', '--tabs', 'Developers', '--disable-openapi', '--print-only'],
      REPO_ROOT
    );
    assert.strictEqual(run.status, 0, `scope generator failed: ${run.stderr || run.stdout}`);
    const payload = JSON.parse(String(run.stdout || '{}').trim());
    assert.ok(payload.routeCounts.original > payload.routeCounts.scoped, 'scoped profile should reduce route count');
    assert.strictEqual(payload.routeCounts.scoped, 1, 'expected Developers tab route count after OpenAPI filter');
  });

  cases.push(async () => {
    const tmp = mkTmpDir('lpd-alt-scope-source-');
    const rootDocs = {
      $schema: 'https://mintlify.com/docs.json',
      theme: 'palm',
      name: 'Root Docs',
      navigation: SAMPLE_NAVIGATION
    };
    const altDocs = {
      $schema: 'https://mintlify.com/docs.json',
      theme: 'palm',
      name: 'Alt Docs',
      navigation: {
        versions: [
          {
            version: 'v2',
            languages: [
              {
                language: 'en',
                tabs: [
                  {
                    tab: 'Orchestrators',
                    groups: [
                      {
                        group: 'Operations',
                        pages: ['v2/orchestrators/operations/x-running-workloads']
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };
    writeFile(path.join(tmp, 'docs.json'), `${JSON.stringify(rootDocs, null, 2)}\n`);
    writeFile(path.join(tmp, 'docs-orch-work.json'), `${JSON.stringify(altDocs, null, 2)}\n`);
    writeFile(path.join(tmp, '.mintignore'), '# fixture\n');
    writeFile(path.join(tmp, 'v2/orchestrators/operations/x-running-workloads.mdx'), '# Workloads\n');

    const run = runScopeScript(['--repo-root', tmp, '--docs-config', path.join(tmp, 'docs-orch-work.json'), '--print-only'], REPO_ROOT);
    assert.strictEqual(run.status, 0, `scope generator with docs config failed: ${run.stderr || run.stdout}`);
    const payload = JSON.parse(String(run.stdout || '{}').trim());
    assert.strictEqual(payload.routeCounts.original, 1, 'alternate docs config should replace root docs.json as route source');
    assert.strictEqual(payload.routeCounts.scoped, 1, 'alternate docs config should remain active without extra filters');
    assert.match(payload.sourceDocsConfig, /docs-orch-work\.json$/);
  });

  cases.push(async () => {
    const repoRoot = mkTmpDir('lpd-scope-workspace-');
    const workspaceBase = mkTmpDir('lpd-scope-workspace-out-');
    const docs = {
      $schema: 'https://mintlify.com/docs.json',
      theme: 'palm',
      name: 'Workspace Fixture',
      favicon: '/snippets/assets/favicon.png',
      navigation: {
        tabs: [
          {
            tab: 'Developers',
            groups: [
              {
                group: 'Dev',
                pages: ['v2/dev/get-started']
              }
            ]
          }
        ]
      }
    };

    writeFile(path.join(repoRoot, 'docs.json'), `${JSON.stringify(docs, null, 2)}\n`);
    writeFile(path.join(repoRoot, '.mintignore'), '# fixture\n');
    writeFile(path.join(repoRoot, 'style.css'), ':root { --border: #e5e7eb; }\n');
    writeFile(
      path.join(repoRoot, 'v2/dev/get-started.mdx'),
      ['import Demo from "/snippets/components/demo.jsx";', '', '![Diagram](./diagram.png)', '', '<Demo />', ''].join('\n')
    );
    writeFile(
      path.join(repoRoot, 'snippets/components/demo.jsx'),
      ['import logo from "../assets/logo.svg";', 'import { getLabel } from "../shared/util.js";', '', 'export default function Demo() {', '  return <img src={logo} alt={getLabel()} />;', '}', ''].join('\n')
    );
    writeFile(path.join(repoRoot, 'snippets/shared/util.js'), 'export function getLabel() { return "demo"; }\n');
    writeFile(path.join(repoRoot, 'snippets/assets/logo.svg'), '<svg />\n');
    writeFile(path.join(repoRoot, 'snippets/assets/favicon.png'), 'PNG\n');
    writeFile(path.join(repoRoot, 'v2/dev/diagram.png'), 'PNG\n');
    writeFile(path.join(repoRoot, 'snippets/components/unused.jsx'), 'export default function Unused() { return null; }\n');
    writeFile(
      path.join(repoRoot, 'snippets/components/primitives/deep/nested-divider.jsx'),
      'export default function NestedDivider() { return null; }\n'
    );
    writeFile(path.join(repoRoot, 'v2/index.mdx'), '- [Broken](gateways/guides/advanced-operations/sources.md)\n');

    const result = await createScopedProfile({
      repoRoot,
      workspaceBase,
      scopeFile: '',
      versions: [],
      languages: [],
      tabs: [],
      prefixes: ['v2/dev'],
      interactive: false,
      disableOpenApi: false,
      printOnly: false,
      help: false
    });

    const v2Dir = path.join(result.workspaceDir, 'v2');
    const snippetsDir = path.join(result.workspaceDir, 'snippets');
    const rootStyleFile = path.join(result.workspaceDir, 'style.css');
    const pageFile = path.join(result.workspaceDir, 'v2/dev/get-started.mdx');
    const snippetFile = path.join(result.workspaceDir, 'snippets/components/demo.jsx');
    const helperFile = path.join(result.workspaceDir, 'snippets/shared/util.js');
    const logoFile = path.join(result.workspaceDir, 'snippets/assets/logo.svg');
    const faviconFile = path.join(result.workspaceDir, 'snippets/assets/favicon.png');
    const imageFile = path.join(result.workspaceDir, 'v2/dev/diagram.png');
    const unusedFile = path.join(result.workspaceDir, 'snippets/components/unused.jsx');
    const deeplyNestedSnippetFile = path.join(result.workspaceDir, 'snippets/components/primitives/deep/nested-divider.jsx');
    const rootIndexFile = path.join(result.workspaceDir, 'v2/index.mdx');

    assert.ok(fs.lstatSync(v2Dir).isDirectory(), 'workspace v2 should be a real directory');
    assert.ok(!fs.lstatSync(v2Dir).isSymbolicLink(), 'workspace v2 should not be a symlink');
    assert.ok(fs.lstatSync(snippetsDir).isDirectory(), 'workspace snippets should be a real directory');
    assert.ok(!fs.lstatSync(snippetsDir).isSymbolicLink(), 'workspace snippets should not be a symlink');
    assert.ok(fs.lstatSync(rootStyleFile).isSymbolicLink(), 'root style.css should be included in the scoped workspace');
    assert.ok(fs.lstatSync(pageFile).isSymbolicLink(), 'workspace page file should remain a symlink');
    assert.ok(fs.lstatSync(snippetFile).isSymbolicLink(), 'workspace snippet file should remain a symlink');
    assert.ok(fs.lstatSync(helperFile).isSymbolicLink(), 'transitive helper import should remain a symlink');
    assert.ok(fs.lstatSync(logoFile).isSymbolicLink(), 'transitive asset import should remain a symlink');
    assert.ok(fs.lstatSync(faviconFile).isSymbolicLink(), 'docs config asset should remain a symlink');
    assert.ok(fs.lstatSync(imageFile).isSymbolicLink(), 'page asset should remain a symlink');
    assert.ok(fs.lstatSync(unusedFile).isSymbolicLink(), 'unused snippet files should be included in the scoped workspace');
    assert.ok(
      fs.lstatSync(deeplyNestedSnippetFile).isSymbolicLink(),
      'deeply nested snippet files should be included in the scoped workspace'
    );
    assert.ok(!fs.existsSync(rootIndexFile), 'out-of-scope generated indexes should be excluded from scoped workspace');
  });

  cases.push(async () => {
    const repoRoot = mkTmpDir('lpd-scope-generated-index-');
    const workspaceBase = mkTmpDir('lpd-scope-generated-index-out-');
    const docs = {
      $schema: 'https://mintlify.com/docs.json',
      theme: 'palm',
      name: 'Generated Index Fixture',
      navigation: {
        tabs: [
          {
            tab: 'Gateways',
            groups: [
              {
                group: 'Gateway',
                pages: ['v2/gateways', 'v2/gateways/overview']
              }
            ]
          }
        ]
      }
    };

    writeFile(path.join(repoRoot, 'docs.json'), `${JSON.stringify(docs, null, 2)}\n`);
    writeFile(path.join(repoRoot, '.mintignore'), '# fixture\n');
    writeFile(
      path.join(repoRoot, 'v2/gateways/index.mdx'),
      [
        '---',
        'title: Gateways Index',
        '---',
        '',
        '{/*',
        'generated-file-banner: generated-file-banner:v1',
        'Generation Script: tools/scripts/generate-pages-index.js',
        '*/}',
        '',
        '- [Overview](overview.mdx)',
        '- [Sources](guides/advanced-operations/sources.md)',
        ''
      ].join('\n')
    );
    writeFile(path.join(repoRoot, 'v2/gateways/overview.mdx'), '# Overview\n');

    const result = await createScopedProfile({
      repoRoot,
      workspaceBase,
      scopeFile: '',
      versions: [],
      languages: [],
      tabs: [],
      prefixes: ['v2/gateways'],
      interactive: false,
      disableOpenApi: false,
      printOnly: false,
      help: false
    });

    const generatedIndexFile = path.join(result.workspaceDir, 'v2/gateways/index.mdx');
    const generatedIndexContent = fs.readFileSync(generatedIndexFile, 'utf8');

    assert.ok(!fs.lstatSync(generatedIndexFile).isSymbolicLink(), 'selected generated index should be rewritten in scoped workspace');
    assert.match(generatedIndexContent, /\[Overview]\(overview\.mdx\)/, 'in-scope generated index links should be preserved');
    assert.doesNotMatch(
      generatedIndexContent,
      /\[Sources]\(guides\/advanced-operations\/sources\.md\)/,
      'missing or out-of-scope generated index links should be removed'
    );
  });

  cases.push(async () => {
    const repoRoot = mkTmpDir('lpd-scope-refresh-root-');
    const workspaceBase = mkTmpDir('lpd-scope-refresh-out-');
    const docsPath = path.join(repoRoot, 'docs.json');
    const initialDocs = {
      $schema: 'https://mintlify.com/docs.json',
      theme: 'palm',
      name: 'Initial Docs',
      navigation: {
        tabs: [
          {
            tab: 'Developers',
            groups: [
              {
                group: 'Dev',
                pages: ['v2/dev/get-started']
              }
            ]
          }
        ]
      }
    };

    writeFile(docsPath, `${JSON.stringify(initialDocs, null, 2)}\n`);
    writeFile(path.join(repoRoot, '.mintignore'), '# fixture\n');
    writeFile(path.join(repoRoot, 'v2/dev/get-started.mdx'), '# Get started\n');

    const args = {
      repoRoot,
      workspaceBase,
      scopeFile: '',
      versions: [],
      languages: [],
      tabs: [],
      prefixes: ['v2/dev'],
      interactive: false,
      disableOpenapi: false,
      printOnly: false,
      help: false
    };

    const firstResult = await createScopedProfile(args);
    const firstScopedDocs = JSON.parse(fs.readFileSync(path.join(firstResult.workspaceDir, 'docs.json'), 'utf8'));
    assert.strictEqual(firstScopedDocs.name, 'Initial Docs');

    const refreshedDocs = { ...initialDocs, name: 'Updated Docs' };
    writeFile(docsPath, `${JSON.stringify(refreshedDocs, null, 2)}\n`);

    const secondResult = await createScopedProfile(args);
    const secondScopedDocs = JSON.parse(fs.readFileSync(path.join(secondResult.workspaceDir, 'docs.json'), 'utf8'));

    assert.strictEqual(secondResult.workspaceDir, firstResult.workspaceDir, 'workspace should remain stable across docs config refresh');
    assert.strictEqual(secondScopedDocs.name, 'Updated Docs', 'scoped workspace should be rewritten in place');
  });

  cases.push(async () => {
    const harness = createSupervisorHarness(
      [
        createSupervisorProfile({ sourceDocsConfig: '/tmp/repo/docs.json', scopeHash: 'root-session' }),
        createSupervisorProfile({ sourceDocsConfig: '/tmp/repo/docs.json', scopeHash: 'root-session', routeCounts: { original: 5, scoped: 3 } })
      ],
      [false]
    );

    const sessionPromise = harness.supervisor.start();
    await waitFor(20);
    assert.deepStrictEqual(harness.watchPaths, ['/tmp/repo']);

    harness.emit('change', 'not-the-config.json');
    await waitFor(20);
    assert.strictEqual(harness.profileCalls.length, 1, 'unrelated filenames should not trigger scoped refresh');

    harness.emit('change', 'docs.json');
    await waitFor(40);
    assert.strictEqual(harness.profileCalls.length, 2, 'active root docs.json should trigger refresh');
    assert.strictEqual(harness.promptCalls.length, 1, 'config refresh should prompt for reload');
    assert.strictEqual(harness.children.length, 1, 'declining reload should keep the existing mint child running');

    await harness.supervisor.shutdown();
    await sessionPromise;
  });

  cases.push(async () => {
    const harness = createSupervisorHarness(
      [
        createSupervisorProfile({ sourceDocsConfig: '/tmp/repo/docs-gate-work.json', scopeHash: 'alt-session' }),
        createSupervisorProfile({ sourceDocsConfig: '/tmp/repo/docs-gate-work.json', scopeHash: 'alt-session', routeCounts: { original: 7, scoped: 4 } })
      ],
      [false]
    );

    const sessionPromise = harness.supervisor.start();
    await waitFor(20);

    harness.emit('change', 'docs.json');
    await waitFor(20);
    assert.strictEqual(harness.profileCalls.length, 1, 'non-active configs should be ignored');

    harness.emit('change', 'docs-gate-work.json');
    await waitFor(40);
    assert.strictEqual(harness.profileCalls.length, 2, 'active alternate docs config should trigger refresh');

    await harness.supervisor.shutdown();
    await sessionPromise;
  });

  cases.push(async () => {
    const harness = createSupervisorHarness(
      [
        createSupervisorProfile({ sourceDocsConfig: '/tmp/repo/docs.json', scopeHash: 'debounce-session' }),
        createSupervisorProfile({ sourceDocsConfig: '/tmp/repo/docs.json', scopeHash: 'debounce-session', routeCounts: { original: 6, scoped: 4 } })
      ],
      [false]
    );

    const sessionPromise = harness.supervisor.start();
    await waitFor(20);

    harness.emit('change', 'docs.json');
    harness.emit('rename', 'docs.json');
    await waitFor(40);

    assert.strictEqual(harness.profileCalls.length, 2, 'debounced config events should collapse into a single refresh');
    assert.strictEqual(harness.promptCalls.length, 1, 'debounced refresh should show one reload prompt');

    await harness.supervisor.shutdown();
    await sessionPromise;
  });

  cases.push(async () => {
    const harness = createSupervisorHarness(
      [
        createSupervisorProfile({ sourceDocsConfig: '/tmp/repo/docs.json', scopeHash: 'restart-session' }),
        createSupervisorProfile({ sourceDocsConfig: '/tmp/repo/docs.json', scopeHash: 'restart-session', routeCounts: { original: 8, scoped: 5 } })
      ],
      [true]
    );

    const sessionPromise = harness.supervisor.start();
    await waitFor(20);

    harness.emit('change', 'docs.json');
    await waitFor(60);

    assert.strictEqual(harness.children.length, 2, 'approving reload should restart mint dev');
    assert.deepStrictEqual(harness.children[0].kills, ['SIGINT'], 'mint child should be stopped gracefully before restart');

    await harness.supervisor.shutdown();
    await sessionPromise;
  });

  cases.push(async () => {
    const harness = createSupervisorHarness(
      [
        createSupervisorProfile({ sourceDocsConfig: '/tmp/repo/docs.json', scopeHash: 'invalid-session' }),
        new Error('Unexpected token } in JSON at position 10')
      ],
      [true]
    );

    const sessionPromise = harness.supervisor.start();
    await waitFor(20);

    harness.emit('change', 'docs.json');
    await waitFor(40);

    assert.strictEqual(harness.children.length, 1, 'refresh failure should keep the existing mint child alive');
    assert.strictEqual(harness.promptCalls.length, 0, 'refresh failure should not prompt for restart');
    assert.ok(
      harness.errorMessages.some((message) => message.includes('Scoped docs config refresh failed')),
      'refresh failure should be reported clearly'
    );

    await harness.supervisor.shutdown();
    await sessionPromise;
  });

  for (let index = 0; index < cases.length; index += 1) {
    const label = `case-${index + 1}`;
    try {
      // eslint-disable-next-line no-await-in-loop
      await cases[index]();
      console.log(`   ✓ ${label}`);
    } catch (error) {
      failures.push(`${label}: ${error.message}`);
    }
  }

  return {
    passed: failures.length === 0,
    total: cases.length,
    errors: failures
  };
}

if (require.main === module) {
  runTests()
    .then((result) => {
      if (result.passed) {
        console.log(`\n✅ lpd scoped mint-dev tests passed (${result.total} cases)`);
        process.exit(0);
      }
      console.error(`\n❌ ${result.errors.length} lpd scoped mint-dev test failure(s)`);
      result.errors.forEach((entry) => console.error(`  - ${entry}`));
      process.exit(1);
    })
    .catch((error) => {
      console.error(`\n❌ lpd scoped mint-dev tests crashed: ${error.message}`);
      process.exit(1);
    });
}

module.exports = { runTests };

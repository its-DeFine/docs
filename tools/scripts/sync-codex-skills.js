#!/usr/bin/env node
/**
 * @script            sync-codex-skills
 * @category          automation
 * @purpose           governance:agent-governance
 * @scope             tools/scripts, ai-tools/ai-skills/templates, tests/unit/codex-skill-sync.test.js
 * @owner             docs
 * @needs             R-R27, R-R30
 * @purpose-statement Codex skills sync — synchronises skill definition files between local and remote sources. Supports --check mode.
 * @pipeline          manual — not yet in pipeline
 * @usage             node tools/scripts/sync-codex-skills.js [flags]
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  discoverTemplates,
  parseSkillsList,
  selectTemplates,
  toPosix
} = require('../lib/codex-skill-templates');

const REPO_ROOT = process.cwd();
const DEFAULT_SOURCE_DIR = 'ai-tools/ai-skills/templates';

const ACRONYMS = new Set(['GH', 'MCP', 'API', 'CI', 'CLI', 'LLM', 'PDF', 'PR', 'UI', 'URL', 'SQL', 'SEO', 'MDX', 'WCAG', 'LPD', 'N8N']);
const BRANDS = new Map([
  ['openai', 'OpenAI'],
  ['openapi', 'OpenAPI'],
  ['github', 'GitHub'],
  ['mintlify', 'Mintlify'],
  ['codex', 'Codex'],
  ['cspell', 'cspell']
]);
const SMALL_WORDS = new Set(['and', 'or', 'to', 'up', 'with', 'of', 'for']);

function usage() {
  const msg = [
    'Usage: node tools/scripts/sync-codex-skills.js [options]',
    '',
    'Options:',
    '  --source-dir <path>     Canonical template directory',
    '  --dest <path>           Destination Codex skills directory',
    '  --check                 Validation-only mode (no writes; fails on drift)',
    '  --dry-run               Print planned changes without writing',
    '  --skills <a,b,c>        Optional subset by template frontmatter name',
    '  --openai-yaml           Generate/open update agents/openai.yaml (default)',
    '  --no-openai-yaml        Skip agents/openai.yaml generation',
    '  --help                  Show this message'
  ];
  console.log(msg.join('\n'));
}

function resolveDefaultDest() {
  const codexHome = String(process.env.CODEX_HOME || '').trim();
  if (codexHome) return path.join(codexHome, 'skills');
  return path.join(os.homedir(), '.codex', 'skills');
}

function parseArgs(argv) {
  const out = {
    sourceDir: path.resolve(REPO_ROOT, DEFAULT_SOURCE_DIR),
    dest: path.resolve(resolveDefaultDest()),
    check: false,
    dryRun: false,
    skills: null,
    openaiYaml: true
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--help' || token === '-h') {
      out.help = true;
      continue;
    }

    if (token === '--source-dir') {
      out.sourceDir = path.resolve(REPO_ROOT, String(argv[i + 1] || '').trim());
      i += 1;
      continue;
    }
    if (token.startsWith('--source-dir=')) {
      out.sourceDir = path.resolve(REPO_ROOT, token.slice('--source-dir='.length).trim());
      continue;
    }

    if (token === '--dest') {
      out.dest = path.resolve(REPO_ROOT, String(argv[i + 1] || '').trim());
      i += 1;
      continue;
    }
    if (token.startsWith('--dest=')) {
      out.dest = path.resolve(REPO_ROOT, token.slice('--dest='.length).trim());
      continue;
    }

    if (token === '--skills') {
      out.skills = parseSkillsList(argv[i + 1] || '');
      i += 1;
      continue;
    }
    if (token.startsWith('--skills=')) {
      out.skills = parseSkillsList(token.slice('--skills='.length));
      continue;
    }

    if (token === '--check') {
      out.check = true;
      continue;
    }
    if (token === '--dry-run') {
      out.dryRun = true;
      continue;
    }
    if (token === '--openai-yaml') {
      out.openaiYaml = true;
      continue;
    }
    if (token === '--no-openai-yaml') {
      out.openaiYaml = false;
      continue;
    }

    throw new Error(`Unknown argument: ${token}`);
  }

  return out;
}

function toDisplayName(skillName) {
  const words = skillName.split('-').filter(Boolean);
  return words
    .map((word, idx) => {
      const lower = word.toLowerCase();
      const upper = word.toUpperCase();
      if (ACRONYMS.has(upper)) return upper;
      if (BRANDS.has(lower)) return BRANDS.get(lower);
      if (idx > 0 && SMALL_WORDS.has(lower)) return lower;
      return lower.slice(0, 1).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

function toShortDescription(displayName) {
  let description = `Help with ${displayName} tasks`;

  if (description.length < 25) description = `Help with ${displayName} tasks and workflows`;
  if (description.length < 25) description = `Help with ${displayName} tasks with guidance`;

  if (description.length > 64) description = `Help with ${displayName}`;
  if (description.length > 64) description = `${displayName} helper`;
  if (description.length > 64) description = `${displayName} tools`;
  if (description.length > 64) {
    const suffix = ' helper';
    const maxNameLength = 64 - suffix.length;
    description = `${displayName.slice(0, maxNameLength).trimEnd()}${suffix}`;
  }
  if (description.length > 64) description = description.slice(0, 64).trimEnd();

  if (description.length < 25) {
    description = `${description} workflows`;
    if (description.length > 64) {
      description = description.slice(0, 64).trimEnd();
    }
  }

  return description;
}

function yamlQuote(value) {
  return JSON.stringify(String(value));
}

function buildOpenAiYaml(skillName) {
  const displayName = toDisplayName(skillName);
  const shortDescription = toShortDescription(displayName);
  const defaultPrompt = `Use $${skillName} to run this workflow with the repository guardrails.`;

  return [
    'interface:',
    `  display_name: ${yamlQuote(displayName)}`,
    `  short_description: ${yamlQuote(shortDescription)}`,
    `  default_prompt: ${yamlQuote(defaultPrompt)}`,
    ''
  ].join('\n');
}

function readExisting(filePathAbs) {
  if (!fs.existsSync(filePathAbs)) return null;
  return fs.readFileSync(filePathAbs, 'utf8');
}

function computeFileOp(expected, existing) {
  if (existing === null) return 'create';
  if (existing !== expected) return 'update';
  return 'unchanged';
}

function formatPlannedFile(relPath, op) {
  if (op === 'create') return `create ${relPath}`;
  if (op === 'update') return `update ${relPath}`;
  return `keep   ${relPath}`;
}

function syncTemplate(template, options) {
  const skillDir = path.join(options.dest, template.name);
  const skillPath = path.join(skillDir, 'SKILL.md');
  const skillRel = toPosix(path.relative(REPO_ROOT, skillPath));
  const skillExisting = readExisting(skillPath);
  const skillOp = computeFileOp(template.content, skillExisting);

  let openaiPath = '';
  let openaiRel = '';
  let openaiOp = 'skipped';
  let openaiExpected = '';

  if (options.openaiYaml) {
    openaiPath = path.join(skillDir, 'agents', 'openai.yaml');
    openaiRel = toPosix(path.relative(REPO_ROOT, openaiPath));
    openaiExpected = buildOpenAiYaml(template.name);
    const openaiExisting = readExisting(openaiPath);
    openaiOp = computeFileOp(openaiExpected, openaiExisting);
  }

  const drift = skillOp !== 'unchanged' || (options.openaiYaml && openaiOp !== 'unchanged');
  const status = skillOp === 'create' ? 'created' : drift ? 'updated' : 'unchanged';

  if (options.check) {
    return {
      name: template.name,
      status,
      drift,
      skillOp,
      skillRel,
      openaiOp,
      openaiRel
    };
  }

  if (!options.dryRun) {
    fs.mkdirSync(skillDir, { recursive: true });
    if (skillOp === 'create' || skillOp === 'update') {
      fs.writeFileSync(skillPath, template.content, 'utf8');
    }
    if (options.openaiYaml && (openaiOp === 'create' || openaiOp === 'update')) {
      fs.mkdirSync(path.dirname(openaiPath), { recursive: true });
      fs.writeFileSync(openaiPath, openaiExpected, 'utf8');
    }
  }

  return {
    name: template.name,
    status,
    drift,
    skillOp,
    skillRel,
    openaiOp,
    openaiRel
  };
}

function printConfig(options, templates, selected) {
  console.log(`source_dir=${toPosix(options.sourceDir)}`);
  console.log(`dest=${toPosix(options.dest)}`);
  console.log(`templates_discovered=${templates.length}`);
  console.log(`templates_selected=${selected.length}`);
  console.log(`mode=${options.check ? 'check' : options.dryRun ? 'dry-run' : 'sync'}`);
  console.log(`openai_yaml=${options.openaiYaml ? 'enabled' : 'disabled'}`);
}

function summarize(results, options) {
  const summary = {
    created: 0,
    updated: 0,
    unchanged: 0,
    failed: 0,
    drift: 0
  };

  for (const result of results) {
    if (!result || result.failed) {
      summary.failed += 1;
      continue;
    }
    summary[result.status] += 1;
    if (result.drift) summary.drift += 1;
  }

  console.log('---');
  console.log(`created=${summary.created}`);
  console.log(`updated=${summary.updated}`);
  console.log(`unchanged=${summary.unchanged}`);
  console.log(`failed=${summary.failed}`);
  if (options.check) {
    console.log(`drift=${summary.drift}`);
  }
  return summary;
}

function printResultLines(results, options) {
  for (const result of results) {
    if (!result) continue;
    const label = options.check
      ? result.drift
        ? 'drift'
        : 'ok'
      : options.dryRun
      ? 'plan'
      : 'sync';
    console.log(`${label}: ${result.name}`);
    console.log(`  ${formatPlannedFile(result.skillRel, result.skillOp)}`);
    if (options.openaiYaml) {
      console.log(`  ${formatPlannedFile(result.openaiRel, result.openaiOp)}`);
    }
  }
}

function run(options) {
  const templates = discoverTemplates(options.sourceDir, { repoRoot: REPO_ROOT });
  const selected = selectTemplates(templates, options.skills);

  printConfig(options, templates, selected);

  const results = selected.map((template) => syncTemplate(template, options));
  printResultLines(results, options);
  const summary = summarize(results, options);

  if (summary.failed > 0) {
    return 1;
  }
  if (options.check && summary.drift > 0) {
    return 1;
  }
  return 0;
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`❌ ${error.message}`);
    usage();
    process.exit(1);
  }

  if (options.help) {
    usage();
    process.exit(0);
  }

  try {
    process.exit(run(options));
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  buildOpenAiYaml,
  discoverTemplates,
  parseArgs,
  run,
  toDisplayName,
  toShortDescription
};

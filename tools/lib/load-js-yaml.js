/**
 * @script            load-js-yaml
 * @category          utility
 * @purpose           tooling:dev-tools
 * @scope             tools/lib, tests, tools/scripts
 * @owner             docs
 * @needs             E-C6, F-C1
 * @purpose-statement YAML loader utility — resolves js-yaml from repo-local installs and falls back to a minimal parser for task-contract style files in bare worktrees
 * @pipeline          indirect — library module
 * @usage             node -e "require('./tools/lib/load-js-yaml')"
 */

const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

function tryRequire(candidate) {
  try {
    return require(candidate);
  } catch (_error) {
    return null;
  }
}

const yaml = tryRequire('js-yaml')
  || tryRequire(path.join(REPO_ROOT, 'tests', 'node_modules', 'js-yaml'))
  || tryRequire(path.join(REPO_ROOT, 'tools', 'node_modules', 'js-yaml'))
  || tryRequire(path.join(REPO_ROOT, 'node_modules', 'js-yaml'));

function parseScalar(raw) {
  const value = String(raw || '').trim();
  if (value === '[]') return [];
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+$/.test(value)) return Number(value);
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\'') && value.endsWith('\''))) {
    return value.slice(1, -1);
  }
  return value;
}

function loadSimpleYaml(source) {
  const result = {};
  let currentArrayKey = '';

  String(source || '')
    .split(/\r?\n/)
    .forEach((line) => {
      if (!line.trim() || line.trim().startsWith('#')) return;

      const arrayMatch = line.match(/^\s*-\s+(.*)$/);
      if (arrayMatch) {
        if (!currentArrayKey || !Array.isArray(result[currentArrayKey])) {
          throw new Error(`Unsupported YAML list item without parent key: ${line}`);
        }
        result[currentArrayKey].push(parseScalar(arrayMatch[1]));
        return;
      }

      const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (!keyMatch) {
        throw new Error(`Unsupported YAML syntax without js-yaml installed: ${line}`);
      }

      const [, key, rawValue] = keyMatch;
      if (!rawValue) {
        result[key] = [];
        currentArrayKey = key;
        return;
      }

      result[key] = parseScalar(rawValue);
      currentArrayKey = Array.isArray(result[key]) ? key : '';
    });

  return result;
}

module.exports = yaml || {
  load: loadSimpleYaml
};

#!/usr/bin/env node
/**
 * @script v2-link-audit
 * @summary Comprehensive V2 MDX link audit with report and domain link map outputs.
 * @owner docs
 * @scope tests
 *
 * @usage
 *   node tests/integration/v2-link-audit.js --full --write-links --strict
 *
 * @inputs
 *   --full (default)
 *   --staged
 *   --files <path[,path...]> (repeatable; explicit files mode)
 *   --report <path> (default: tasks/reports/LINK_TEST_REPORT.md)
 *   --write-links (default true for --full, false for --staged/--files)
 *   --strict (exit 1 if missing internal/import targets are found)
 *   --external-policy classify (only supported mode)
 *
 * @outputs
 *   - Markdown report at tasks/reports/LINK_TEST_REPORT.md (or custom path)
 *   - snippets/data/<domain>/hrefs.jsx files when write-links enabled
 *
 * @exit-codes
 *   0 = success
 *   1 = validation failure in strict mode or runtime error
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { extractImports } = require('../utils/mdx-parser');
const { getStagedFiles } = require('../utils/file-walker');

const REPO_ROOT = getRepoRoot();
const V2_PAGES_DIR = path.join(REPO_ROOT, 'v2', 'pages');
const INDEX_PATH = path.join(V2_PAGES_DIR, 'index.mdx');
const DOCS_CONFIG_PATH = path.join(REPO_ROOT, 'docs.json');
const DEFAULT_REPORT = path.join(REPO_ROOT, 'tasks', 'reports', 'LINK_TEST_REPORT.md');
const LINKABLE_ATTRS = ['href', 'src', 'srcset', 'poster', 'action', 'data', 'to', 'image', 'url'];
const EXCLUDED_ATTRS = new Set(['icon']);
const FILE_EXT_CANDIDATES = ['.mdx', '.md', '.jsx', '.js', '.tsx', '.ts', '.json'];
const INDEX_CANDIDATES = ['index.mdx', 'index.md', 'README.mdx', 'README.md'];
const EXTERNAL_UNTESTED = '🟡 untested-external';

function getRepoRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (_error) {
    return process.cwd();
  }
}

function toPosix(p) {
  return String(p || '').split(path.sep).join('/');
}

function relFromRoot(absPath) {
  return toPosix(path.relative(REPO_ROOT, absPath));
}

function relNoExt(absPath) {
  const rel = relFromRoot(absPath);
  return toPosix(rel.replace(/\.(mdx|md)$/i, ''));
}

function parseArgs(argv) {
  const args = {
    mode: 'full',
    report: DEFAULT_REPORT,
    strict: false,
    writeLinks: undefined,
    externalPolicy: 'classify',
    files: []
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--full') args.mode = 'full';
    else if (token === '--staged') args.mode = 'staged';
    else if (token === '--files' || token === '--file') {
      const raw = String(argv[i + 1] || '').trim();
      if (raw) {
        raw
          .split(',')
          .map((part) => part.trim())
          .filter(Boolean)
          .forEach((part) => args.files.push(part));
      }
      i += 1;
    }
    else if (token === '--strict') args.strict = true;
    else if (token === '--write-links') args.writeLinks = true;
    else if (token === '--report') {
      args.report = path.resolve(REPO_ROOT, argv[i + 1] || '');
      i += 1;
    } else if (token === '--external-policy') {
      args.externalPolicy = argv[i + 1] || '';
      i += 1;
    }
  }

  if (args.externalPolicy !== 'classify') {
    throw new Error('Only --external-policy classify is supported in this phase.');
  }

  args.files = [...new Set(args.files)];
  if (args.files.length > 0) {
    args.mode = 'files';
  }

  if (typeof args.writeLinks === 'undefined') {
    args.writeLinks = args.mode === 'full';
  }

  return args;
}

function walkFiles(dir, matcher, out = []) {
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      walkFiles(abs, matcher, out);
    } else if (matcher(abs)) {
      out.push(abs);
    }
  }
  return out;
}

function loadFile(absPath) {
  try {
    return fs.readFileSync(absPath, 'utf8');
  } catch (_error) {
    return '';
  }
}

function parseIndexStructure(indexContent) {
  const lines = indexContent.split('\n');
  const topLevels = [];
  const byPath = new Map();
  let currentTop = null;
  const stack = [];

  for (const lineRaw of lines) {
    const line = lineRaw.trimEnd();
    const heading = line.match(/^(#{2,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const title = heading[2].trim();
      while (stack.length && stack[stack.length - 1].level >= level) stack.pop();

      if (level === 2) {
        currentTop = {
          type: 'top',
          level,
          title,
          slug: slugify(title),
          groups: [],
          pages: [],
          pathSet: new Set()
        };
        topLevels.push(currentTop);
        stack.length = 0;
        stack.push({ level, node: currentTop });
      } else if (currentTop) {
        const parent = stack.length ? stack[stack.length - 1].node : currentTop;
        const node = {
          type: 'group',
          level,
          title,
          groups: [],
          pages: []
        };
        parent.groups.push(node);
        stack.push({ level, node });
      }
      continue;
    }

    const link = line.match(/^\s*-\s*\[([^\]]+)\]\(([^)]+)\)\s*$/);
    if (link && currentTop) {
      const title = link[1].trim();
      const href = decodeURI(link[2].trim());
      const warning = title.includes('⚠️');
      const pageNode = { type: 'page', title, href, warning, imported: [] };

      const parent = stack.length ? stack[stack.length - 1].node : currentTop;
      parent.pages.push(pageNode);

      const abs = path.join(V2_PAGES_DIR, href);
      const key = relFromRoot(abs);
      currentTop.pathSet.add(key);
      byPath.set(key, { top: currentTop, pageNode });
    }
  }

  return { topLevels, byPath };
}

function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readableFromFolder(folder) {
  return String(folder || '')
    .toLowerCase()
    .replace(/^\d+_?/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildDomainMaps(structure) {
  const folderToDomain = new Map();
  const domainToTopTitle = new Map();

  for (const top of structure.topLevels) {
    const domain = top.slug || 'unknown';
    domainToTopTitle.set(domain, top.title);
    for (const p of top.pathSet) {
      const rel = p.replace(/^v2\/pages\//, '');
      const seg = rel.split('/')[0];
      if (seg) folderToDomain.set(seg, domain);
    }
  }

  return { folderToDomain, domainToTopTitle };
}

function normalizeInputFilePath(filePath) {
  const normalized = toPosix(String(filePath || '').trim());
  if (!normalized) return '';
  return normalized.replace(/^\.\//, '');
}

function getExplicitTargets(files) {
  const isIndexMdx = (abs) => path.basename(abs).toLowerCase() === 'index.mdx';
  const out = [];
  const seen = new Set();

  for (const file of files) {
    const normalized = normalizeInputFilePath(file);
    if (!normalized) continue;

    const candidate = path.isAbsolute(normalized)
      ? normalized
      : path.join(REPO_ROOT, normalized);

    if (!fs.existsSync(candidate)) continue;
    if (!candidate.endsWith('.mdx')) continue;
    if (!candidate.startsWith(V2_PAGES_DIR)) continue;
    if (isIndexMdx(candidate)) continue;

    const rel = relFromRoot(candidate);
    if (seen.has(rel)) continue;
    seen.add(rel);
    out.push(candidate);
  }

  return out;
}

function getInitialTargets(mode, explicitFiles = []) {
  const isIndexMdx = (abs) => path.basename(abs).toLowerCase() === 'index.mdx';
  if (mode === 'files') {
    return getExplicitTargets(explicitFiles);
  }

  if (mode === 'staged') {
    return getStagedFiles()
      .filter((abs) => abs.startsWith(V2_PAGES_DIR) && abs.endsWith('.mdx') && fs.existsSync(abs) && !isIndexMdx(abs));
  }

  return walkFiles(V2_PAGES_DIR, (abs) => abs.endsWith('.mdx') && !isIndexMdx(abs));
}

function stripQueryHash(p) {
  const q = p.indexOf('?');
  const h = p.indexOf('#');
  const cut = [q, h].filter((n) => n >= 0).sort((a, b) => a - b)[0];
  return cut >= 0 ? p.slice(0, cut) : p;
}

function normalizeRawPath(raw) {
  let value = String(raw || '').trim();
  value = value.replace(/\s+"[^"]*"$/, '').replace(/\s+'[^']*'$/, '').trim();
  if (value.startsWith('(') && value.endsWith(')')) {
    value = value.slice(1, -1).trim();
  }
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1).trim();
  }
  return decodeURI(stripQueryHash(value));
}

function classifyPath(raw) {
  const p = String(raw || '').trim();
  const lower = p.toLowerCase();
  if (!p) return 'empty';
  if (lower.startsWith('http://')) return 'external-http';
  if (lower.startsWith('https://')) return 'external-https';
  if (lower.startsWith('mailto:')) return 'mailto';
  if (lower.startsWith('tel:')) return 'tel';
  if (lower.startsWith('javascript:')) return 'javascript';
  if (lower.startsWith('data:')) return 'data';
  if (p.startsWith('#')) return 'anchor';
  if (p.startsWith('/')) return 'internal-rooted';
  return 'internal-relative';
}

function resolveInternalPath(raw, currentFileAbs) {
  const normalized = normalizeRawPath(raw);
  if (!normalized) return null;

  if (normalized.startsWith('/')) {
    const rooted = normalized.replace(/^\/+/, '');
    if (rooted.startsWith('v2/') || rooted.startsWith('v1/') || rooted.startsWith('snippets/') || rooted.startsWith('tests/') || rooted.startsWith('tasks/')) {
      return path.join(REPO_ROOT, rooted);
    }
    const asV2Page = path.join(REPO_ROOT, 'v2', 'pages', rooted);
    const asRoot = path.join(REPO_ROOT, rooted);
    if (fs.existsSync(asRoot) || fs.existsSync(`${asRoot}.mdx`) || fs.existsSync(`${asRoot}.md`)) return asRoot;
    return asV2Page;
  }

  return path.resolve(path.dirname(currentFileAbs), normalized);
}

function resolveExistingPath(baseAbsPath) {
  const seen = new Set();
  const candidates = [];

  function add(p) {
    const norm = path.normalize(p);
    if (!seen.has(norm)) {
      seen.add(norm);
      candidates.push(norm);
    }
  }

  add(baseAbsPath);
  for (const ext of FILE_EXT_CANDIDATES) {
    if (!baseAbsPath.endsWith(ext)) add(`${baseAbsPath}${ext}`);
  }

  for (const idx of INDEX_CANDIDATES) {
    add(path.join(baseAbsPath, idx));
  }

  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue;
    try {
      if (fs.statSync(candidate).isFile()) return candidate;
    } catch (_error) {
      // Ignore and continue checking candidates.
    }
  }

  return null;
}

function normalizeRoute(routePath) {
  const raw = String(routePath || '').trim();
  if (!raw || raw === '/') return raw || '';
  return `/${raw.replace(/^\/+/, '').replace(/\/+$/, '')}`;
}

function collectPagesRoutes(node, out) {
  if (!node) return;
  if (Array.isArray(node)) {
    for (const item of node) collectPagesRoutes(item, out);
    return;
  }
  if (typeof node === 'string') {
    const normalized = normalizeRoute(node);
    if (normalized && normalized !== '/ ') out.add(normalized);
    return;
  }
  if (typeof node !== 'object') return;
  if (Array.isArray(node.pages)) collectPagesRoutes(node.pages, out);
  for (const value of Object.values(node)) {
    if (value && typeof value === 'object') collectPagesRoutes(value, out);
  }
}

function loadRouteSet() {
  const routes = new Set();
  if (!fs.existsSync(DOCS_CONFIG_PATH)) return routes;

  let parsed = null;
  try {
    parsed = JSON.parse(fs.readFileSync(DOCS_CONFIG_PATH, 'utf8'));
  } catch (_error) {
    return routes;
  }

  collectPagesRoutes(parsed.navigation || parsed, routes);

  if (Array.isArray(parsed.redirects)) {
    for (const redirect of parsed.redirects) {
      const source = normalizeRoute(redirect && redirect.source);
      const destination = normalizeRoute(redirect && redirect.destination);
      if (source) routes.add(source);
      if (destination) routes.add(destination);
    }
  }

  return routes;
}

function isRoutableLinkRef(ref) {
  if (ref.sourceType === 'markdown-link') return true;
  if (ref.sourceType === 'jsx-attr') {
    const attr = String(ref.attr || '').toLowerCase();
    return attr === 'href' || attr === 'to';
  }
  return false;
}

function asPageRouteForBrowser(rawPath, currentFileAbs) {
  const normalizedRaw = normalizeRawPath(rawPath);
  if (!normalizedRaw || normalizedRaw.startsWith('#')) return null;

  const currentRelNoExt = relNoExt(currentFileAbs);
  if (!currentRelNoExt.startsWith('v2/pages/')) return null;

  if (normalizedRaw.startsWith('/')) {
    return normalizeRoute(normalizedRaw);
  }

  const currentRoute = `/${currentRelNoExt}`;
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(currentRoute), normalizedRaw));
  return normalizeRoute(resolved);
}

function hasDocFileExtension(routePath) {
  return /\.(mdx|md)$/i.test(String(routePath || ''));
}

function isKnownDocsFolderRoute(routePath, routeSet) {
  const route = normalizeRoute(routePath);
  if (!route || hasDocFileExtension(route)) return false;
  const prefix = `${route}/`;
  for (const known of routeSet) {
    const normalizedKnown = normalizeRoute(known);
    if (!normalizedKnown) continue;
    if (normalizedKnown.startsWith(prefix)) return true;
  }
  return false;
}

function listRepoFilesForMoveHints() {
  return walkFiles(REPO_ROOT, (abs) => {
    const rel = relFromRoot(abs);
    if (rel.startsWith('.git/')) return false;
    if (rel.includes('/node_modules/')) return false;
    return true;
  });
}

function suffixScore(fromAbs, toAbs) {
  const a = relFromRoot(fromAbs).split('/');
  const b = relFromRoot(toAbs).split('/');
  let i = 1;
  while (i <= a.length && i <= b.length && a[a.length - i] === b[b.length - i]) i += 1;
  return i - 1;
}

function findMovedCandidates(missingAbs, repoFiles) {
  const base = path.basename(missingAbs);
  if (!base) return [];
  const baseNoExt = base.replace(/\.[^.]+$/, '');
  const ext = path.extname(missingAbs).toLowerCase();

  const direct = repoFiles.filter((f) => {
    const name = path.basename(f);
    const nameNoExt = name.replace(/\.[^.]+$/, '');
    if (name === base) return true;
    if (!ext && nameNoExt === baseNoExt) return true;
    return false;
  });

  const ranked = direct
    .map((f) => ({
      file: f,
      score: suffixScore(missingAbs, f)
        + (path.extname(f).toLowerCase() === ext ? 1 : 0)
        + (relFromRoot(f).startsWith('v2/pages/') ? 1 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => relFromRoot(x.file));

  if (ranked.length >= 3) return ranked.slice(0, 3);

  // Fallback: if basename changed, suggest close path-suffix matches.
  const fallback = repoFiles
    .filter((f) => {
      const rel = relFromRoot(f);
      const nameNoExt = path.basename(f).replace(/\.[^.]+$/, '');
      return nameNoExt.includes(baseNoExt) || rel.includes(baseNoExt);
    })
    .map((f) => ({
      file: f,
      score: suffixScore(missingAbs, f)
        + (path.extname(f).toLowerCase() === ext ? 1 : 0)
        + (relFromRoot(f).startsWith('v2/pages/') ? 1 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => relFromRoot(x.file));

  return Array.from(new Set([...ranked, ...fallback])).slice(0, 3);
}

function findDirectoryCandidates(missingAbs) {
  if (!fs.existsSync(missingAbs)) return [];
  let st = null;
  try {
    st = fs.statSync(missingAbs);
  } catch (_error) {
    return [];
  }
  if (!st.isDirectory()) return [];

  const preferredNames = new Set(['index.mdx', 'index.md', 'README.mdx', 'README.md', 'page-1.mdx', 'overview.mdx']);
  const candidates = [];

  const files = walkFiles(missingAbs, (abs) => {
    const rel = relFromRoot(abs);
    if (rel.includes('/node_modules/')) return false;
    const lower = abs.toLowerCase();
    return lower.endsWith('.mdx') || lower.endsWith('.md');
  });

  files.sort((a, b) => {
    const aName = path.basename(a);
    const bName = path.basename(b);
    const aPref = preferredNames.has(aName) ? 1 : 0;
    const bPref = preferredNames.has(bName) ? 1 : 0;
    if (aPref !== bPref) return bPref - aPref;
    return suffixScore(missingAbs, b) - suffixScore(missingAbs, a);
  });

  for (const f of files) {
    candidates.push(relFromRoot(f));
    if (candidates.length >= 3) break;
  }

  return candidates;
}

function findMissingPathCandidates(missingAbs, repoFiles) {
  const dirCandidates = findDirectoryCandidates(missingAbs);
  const moved = findMovedCandidates(missingAbs, repoFiles);
  return Array.from(new Set([...dirCandidates, ...moved])).slice(0, 3);
}

function extractRefs(content) {
  const refs = [];
  const contentForExtraction = String(content || '').replace(/```[\s\S]*?```/g, '');

  const markdownRegex = /!?\[([^\]]*)\]\(([^)]+)\)/g;
  let m;
  while ((m = markdownRegex.exec(contentForExtraction)) !== null) {
    const bang = m[0].startsWith('!');
    refs.push({
      sourceType: bang ? 'markdown-image' : 'markdown-link',
      rawPath: m[2].trim()
    });
  }

  const attrRegex = new RegExp(`\\b(${LINKABLE_ATTRS.join('|')})\\s*=\\s*(?:"([^"]+)"|'([^']+)'|\\{\\s*"([^"]+)"\\s*\\}|\\{\\s*'([^']+)'\\s*\\})`, 'gi');
  while ((m = attrRegex.exec(contentForExtraction)) !== null) {
    const attrName = (m[1] || '').toLowerCase();
    if (EXCLUDED_ATTRS.has(attrName)) continue;
    const rawPath = m[2] || m[3] || m[4] || m[5] || '';
    refs.push({
      sourceType: 'jsx-attr',
      attr: attrName,
      rawPath: rawPath.trim()
    });
  }

  const imports = extractImports(contentForExtraction);
  for (const imp of imports) {
    refs.push({
      sourceType: 'import-path',
      rawPath: String(imp.path || '').trim(),
      line: imp.line
    });
  }

  return refs;
}

function analyzeRef(ref, currentFileAbs, repoFiles, routeSet) {
  if (ref.sourceType === 'import-path') {
    const importPath = String(ref.rawPath || '').trim();
    const isPackageImport = importPath && !importPath.startsWith('/') && !importPath.startsWith('./') && !importPath.startsWith('../');
    if (isPackageImport) {
      return {
        ...ref,
        linkType: 'import-path',
        resolvedPath: null,
        exists: null,
        status: 'skipped-package-import',
        movedCandidates: []
      };
    }

    // style-guide documents intentionally broken sample imports; do not treat as runtime failures
    if (toPosix(currentFileAbs).endsWith('/style-guide.mdx')) {
      return {
        ...ref,
        linkType: 'import-path',
        resolvedPath: null,
        exists: null,
        status: 'skipped-style-guide-example',
        movedCandidates: []
      };
    }
  }

  const normalizedRaw = normalizeRawPath(ref.rawPath);
  const linkType = ref.sourceType === 'import-path' ? 'import-path' : classifyPath(normalizedRaw);

  if (linkType === 'external-http' || linkType === 'external-https') {
    return {
      ...ref,
      linkType,
      resolvedPath: null,
      exists: null,
      status: EXTERNAL_UNTESTED,
      movedCandidates: []
    };
  }

  if (['mailto', 'tel', 'javascript', 'data', 'anchor', 'empty'].includes(linkType)) {
    return {
      ...ref,
      linkType,
      resolvedPath: null,
      exists: null,
      status: 'skipped',
      movedCandidates: []
    };
  }

  const targetAbs = resolveInternalPath(normalizedRaw, currentFileAbs);

  if (!targetAbs) {
    return {
      ...ref,
      linkType,
      resolvedPath: null,
      exists: null,
      status: 'skipped',
      movedCandidates: []
    };
  }

  const existing = resolveExistingPath(targetAbs);
  if (existing) {
    if (isRoutableLinkRef(ref)) {
      const existingRelNoExt = relNoExt(existing);
      const isV2DocTarget = existingRelNoExt.startsWith('v2/pages/');
      if (isV2DocTarget) {
        const browserRoute = asPageRouteForBrowser(normalizedRaw, currentFileAbs);
        if (hasDocFileExtension(browserRoute)) {
          return {
            ...ref,
            linkType,
            resolvedPath: relFromRoot(existing),
            exists: true,
            status: 'route-missing',
            movedCandidates: []
          };
        }
      }
    }

    return {
      ...ref,
      linkType,
      resolvedPath: relFromRoot(existing),
      exists: true,
      status: 'ok',
      movedCandidates: []
    };
  }

  if (isRoutableLinkRef(ref)) {
    const browserRoute = asPageRouteForBrowser(normalizedRaw, currentFileAbs);
    if (isKnownDocsFolderRoute(browserRoute, routeSet)) {
      return {
        ...ref,
        linkType,
        resolvedPath: browserRoute,
        exists: true,
        status: 'ok-folder-route',
        movedCandidates: []
      };
    }
  }

  return {
    ...ref,
    linkType,
    resolvedPath: relFromRoot(targetAbs),
    exists: false,
    status: 'missing',
    movedCandidates: findMissingPathCandidates(targetAbs, repoFiles)
  };
}

function discoverMdxImports(startTargets) {
  const visited = new Set();
  const queue = [...startTargets];
  const importGraph = new Map();
  const importedByRoot = new Map();
  const rootFor = new Map();

  for (const root of startTargets) rootFor.set(root, new Set([root]));

  while (queue.length) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    const roots = rootFor.get(current) || new Set([current]);
    const content = loadFile(current);
    const imports = extractImports(content);
    const mdxImports = [];

    for (const imp of imports) {
      const pth = String(imp.path || '').trim();
      if (!pth) continue;
      if (!pth.startsWith('/') && !pth.startsWith('./') && !pth.startsWith('../')) continue;

      const base = resolveInternalPath(pth, current);
      if (!base) continue;

      const resolved = resolveExistingPath(base);
      if (!resolved || !resolved.endsWith('.mdx')) continue;

      mdxImports.push(resolved);
      if (!rootFor.has(resolved)) rootFor.set(resolved, new Set());
      const childRoots = rootFor.get(resolved);
      for (const r of roots) childRoots.add(r);

      if (!visited.has(resolved)) queue.push(resolved);
    }

    importGraph.set(current, mdxImports);
  }

  for (const [file, roots] of rootFor.entries()) {
    for (const root of roots) {
      if (file === root) continue;
      if (!importedByRoot.has(root)) importedByRoot.set(root, new Set());
      importedByRoot.get(root).add(file);
    }
  }

  return { allMdxFiles: Array.from(visited), importGraph, importedByRoot };
}

function domainFromPath(relPath, folderToDomain) {
  if (!relPath.startsWith('v2/pages/')) return null;
  const rest = relPath.replace(/^v2\/pages\//, '');
  const folder = rest.split('/')[0];
  return folderToDomain.get(folder) || readableFromFolder(folder) || 'unknown';
}

function analyzeFiles({ allFiles, rootTargets, importGraph, importedByRoot, structure, folderToDomain, repoFiles, routeSet }) {
  const fileResults = new Map();
  const domainLinks = new Map();
  const pageToDomain = new Map();

  for (const f of allFiles) {
    if (path.basename(f).toLowerCase() === 'index.mdx') continue;
    const rel = relFromRoot(f);
    const isRootPage = rel.startsWith('v2/pages/');

    let domains = new Set();
    if (isRootPage) {
      const d = domainFromPath(rel, folderToDomain);
      if (d) domains.add(d);
      pageToDomain.set(rel, d || 'unknown');
    } else {
      for (const root of rootTargets) {
        const imported = importedByRoot.get(root);
        if (imported && imported.has(f)) {
          const d = pageToDomain.get(relFromRoot(root)) || domainFromPath(relFromRoot(root), folderToDomain) || 'unknown';
          domains.add(d);
        }
      }
      if (domains.size === 0) domains.add('unknown');
    }

    const content = loadFile(f);
    const refs = extractRefs(content);
    const analyzed = refs.map((r) => analyzeRef(r, f, repoFiles, routeSet));

    const result = {
      file: rel,
      isRootPage,
      domains: Array.from(domains),
      refs: analyzed,
      importedMdx: (importGraph.get(f) || []).map((x) => relFromRoot(x))
    };

    fileResults.set(rel, result);

    for (const d of domains) {
      if (!domainLinks.has(d)) domainLinks.set(d, {});
      domainLinks.get(d)[rel] = analyzed.map((ref) => ({
        sourceType: ref.sourceType,
        linkType: ref.linkType,
        rawPath: ref.rawPath,
        resolvedPath: ref.resolvedPath,
        exists: ref.exists,
        status: ref.status,
        movedCandidates: ref.movedCandidates
      }));
    }
  }

  const topPathSet = new Set();
  for (const top of structure.topLevels) {
    for (const p of top.pathSet) topPathSet.add(p);
  }

  const unindexedByDomain = new Map();
  for (const rel of fileResults.keys()) {
    if (!rel.startsWith('v2/pages/')) continue;
    if (topPathSet.has(rel)) continue;
    const domain = domainFromPath(rel, folderToDomain) || 'unknown';
    if (!unindexedByDomain.has(domain)) unindexedByDomain.set(domain, []);
    unindexedByDomain.get(domain).push(rel);
  }

  return { fileResults, domainLinks, unindexedByDomain };
}

function countSummary(fileResults) {
  const linkTypeCounts = {};
  const statusCounts = {};
  let totalRefs = 0;
  let missingCount = 0;

  for (const result of fileResults.values()) {
    for (const ref of result.refs) {
      totalRefs += 1;
      linkTypeCounts[ref.linkType] = (linkTypeCounts[ref.linkType] || 0) + 1;
      statusCounts[ref.status] = (statusCounts[ref.status] || 0) + 1;
      if (ref.status === 'missing' || ref.status === 'route-missing') missingCount += 1;
    }
  }

  return { totalRefs, linkTypeCounts, statusCounts, missingCount };
}

function mdEscape(s) {
  return String(s || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function renderGroup(group, lines, indent = '') {
  for (const page of group.pages || []) {
    lines.push(`${indent}- ${page.title} (${page.href})`);
    if (Array.isArray(page.imported) && page.imported.length) {
      for (const imp of page.imported) {
        lines.push(`${indent}  - Imported MDX: ${imp}`);
      }
    }
  }
  for (const sub of group.groups || []) {
    lines.push(`${indent}- ${'#'.repeat(Math.max(2, sub.level))} ${sub.title}`);
    renderGroup(sub, lines, `${indent}  `);
  }
}

function attachImportedToStructure(structure, fileResults) {
  for (const [relPath, meta] of structure.byPath.entries()) {
    const result = fileResults.get(relPath);
    if (!result) continue;
    const imported = result.importedMdx || [];
    meta.pageNode.imported = imported;
  }
}

function renderReport({ args, structure, fileResults, unindexedByDomain, summary }) {
  const lines = [];
  lines.push('# LINK_TEST_REPORT');
  lines.push('');
  lines.push('Operator note: external HTTP/HTTPS links are classified only and marked as `🟡 untested-external` in this phase.');
  lines.push('');
  lines.push('## Run Metadata');
  lines.push(`- Timestamp: ${new Date().toISOString()}`);
  lines.push(`- Mode: ${args.mode}`);
  lines.push(`- Strict: ${args.strict ? 'true' : 'false'}`);
  lines.push(`- Files analyzed: ${fileResults.size}`);
  lines.push(`- Total extracted references: ${summary.totalRefs}`);
  lines.push('');

  lines.push('## Summary Counts');
  lines.push('');
  lines.push('### By Link Type');
  lines.push('| linkType | count |');
  lines.push('|---|---:|');
  for (const [k, v] of Object.entries(summary.linkTypeCounts).sort((a, b) => a[0].localeCompare(b[0]))) {
    lines.push(`| ${mdEscape(k)} | ${v} |`);
  }
  lines.push('');

  lines.push('### By Status');
  lines.push('| status | count |');
  lines.push('|---|---:|');
  for (const [k, v] of Object.entries(summary.statusCounts).sort((a, b) => a[0].localeCompare(b[0]))) {
    lines.push(`| ${mdEscape(k)} | ${v} |`);
  }
  lines.push('');

  lines.push('## Hierarchical Inventory');
  for (const top of structure.topLevels) {
    lines.push('');
    lines.push(`### ${top.title}`);

    for (const page of top.pages || []) {
      lines.push(`- ${page.title} (${page.href})`);
      if (Array.isArray(page.imported) && page.imported.length) {
        for (const imp of page.imported) {
          lines.push(`  - Imported MDX: ${imp}`);
        }
      }
    }

    for (const g of top.groups || []) {
      lines.push(`- ${'#'.repeat(Math.max(2, g.level))} ${g.title}`);
      renderGroup(g, lines, '  ');
    }

    const unindexed = unindexedByDomain.get(top.slug) || [];
    lines.push('- Unindexed Pages');
    if (!unindexed.length) {
      lines.push('  - (none)');
    } else {
      for (const p of unindexed.sort()) lines.push(`  - ${p}`);
    }
  }
  lines.push('');

  lines.push('## Per-Page Full Link Lists');
  const sortedFiles = Array.from(fileResults.keys()).sort();
  for (const file of sortedFiles) {
    const result = fileResults.get(file);
    lines.push('');
    lines.push(`### ${file}`);
    lines.push('| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |');
    lines.push('|---|---|---|---|---|---|---|---|');
    for (const ref of result.refs) {
      const c = ref.movedCandidates || [];
      lines.push(`| ${mdEscape(ref.linkType)} | ${mdEscape(ref.rawPath)} | ${mdEscape(ref.resolvedPath || '')} | ${String(ref.exists)} | ${mdEscape(ref.status)} | ${mdEscape(c[0] || '')} | ${mdEscape(c[1] || '')} | ${mdEscape(c[2] || '')} |`);
    }
    if (!result.refs.length) {
      lines.push('| (none) |  |  |  |  |  |  |  |');
    }
  }

  return `${lines.join('\n')}\n`;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeDomainLinks(domainLinks) {
  const outPaths = [];
  for (const [domain, map] of domainLinks.entries()) {
    const dir = path.join(REPO_ROOT, 'snippets', 'data', domain);
    ensureDir(dir);
    const out = path.join(dir, 'hrefs.jsx');
    const body = `export const LINK_MAP = ${JSON.stringify(map, null, 2)};\n\nexport default LINK_MAP;\n`;
    fs.writeFileSync(out, body, 'utf8');
    outPaths.push(out);
  }
  return outPaths;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(INDEX_PATH)) {
    throw new Error(`Missing required index file: ${relFromRoot(INDEX_PATH)}`);
  }

  const indexContent = loadFile(INDEX_PATH);
  const structure = parseIndexStructure(indexContent);
  const { folderToDomain } = buildDomainMaps(structure);

  const rootTargets = getInitialTargets(args.mode, args.files);
  if (!rootTargets.length) {
    console.log('No target MDX files found for selected mode.');
    return;
  }

  const { allMdxFiles, importGraph, importedByRoot } = discoverMdxImports(rootTargets);
  const repoFiles = listRepoFilesForMoveHints();
  const routeSet = loadRouteSet();

  const { fileResults, domainLinks, unindexedByDomain } = analyzeFiles({
    allFiles: allMdxFiles,
    rootTargets,
    importGraph,
    importedByRoot,
    structure,
    folderToDomain,
    repoFiles,
    routeSet
  });

  attachImportedToStructure(structure, fileResults);

  const summary = countSummary(fileResults);
  const report = renderReport({ args, structure, fileResults, unindexedByDomain, summary });

  ensureDir(path.dirname(args.report));
  fs.writeFileSync(args.report, report, 'utf8');

  let writtenLinks = [];
  if (args.writeLinks) {
    writtenLinks = writeDomainLinks(domainLinks);
  }

  console.log(`📝 Report written: ${relFromRoot(args.report)}`);
  if (writtenLinks.length) {
    console.log(`🔗 Domain link maps written: ${writtenLinks.length}`);
  } else {
    console.log('🔗 Domain link maps not written in this mode.');
  }
  console.log(`📄 Files analyzed: ${fileResults.size}`);
  console.log(`🔍 Total refs: ${summary.totalRefs}`);
  console.log(`❌ Missing refs: ${summary.missingCount}`);

  if (args.strict && summary.missingCount > 0) {
    process.exit(1);
  }
}

try {
  main();
} catch (error) {
  console.error(`v2-link-audit failed: ${error.message}`);
  process.exit(1);
}

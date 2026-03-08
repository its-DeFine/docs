#!/usr/bin/env node
/**
 * @script            generate-docs-guide-components-index
 * @category          generator
 * @purpose           governance:index-management
 * @scope             tools/scripts, docs-guide/indexes/components-index.mdx, v2/resources/documentation-guide/component-library/overview.mdx, snippets/components
 * @owner             docs
 * @needs             R-R16, R-R17
 * @purpose-statement Generates the docs-guide component library index page
 * @pipeline          manual — interactive developer tool, not suited for automated pipelines
 * @dualmode          dual-mode (document flags)
 * @usage             node tools/scripts/generate-docs-guide-components-index.js [flags]
 */

const fs = require('fs');
const path = require('path');
const {
  buildGeneratedFrontmatterLines,
  buildGeneratedHiddenBannerLines,
  buildGeneratedNoteLines
} = require('../lib/generated-file-banners');

const REPO_ROOT = process.cwd();
const SOURCE_ROOT = 'snippets/components';
const OUTPUT_TARGETS = [
  { repoPath: 'docs-guide/indexes/components-index.mdx', locale: 'en' },
  { repoPath: 'v2/resources/documentation-guide/component-library/overview.mdx', locale: 'en' },
  { repoPath: 'v2/cn/docs-guide/components-index.mdx', locale: 'cn' },
  { repoPath: 'v2/cn/docs-guide/indexes/components-index.mdx', locale: 'cn' },
  { repoPath: 'v2/cn/resources/documentation-guide/component-library/overview.mdx', locale: 'cn' },
  { repoPath: 'v2/es/docs-guide/components-index.mdx', locale: 'es' },
  { repoPath: 'v2/es/docs-guide/indexes/components-index.mdx', locale: 'es' },
  { repoPath: 'v2/es/resources/documentation-guide/component-library/overview.mdx', locale: 'es' },
  { repoPath: 'v2/fr/docs-guide/components-index.mdx', locale: 'fr' },
  { repoPath: 'v2/fr/docs-guide/indexes/components-index.mdx', locale: 'fr' },
  { repoPath: 'v2/fr/resources/documentation-guide/component-library/overview.mdx', locale: 'fr' }
];

const EN_CATEGORY_METADATA = {
  content: {
    title: 'Content',
    description: 'Content components provide code, data, and response-format helpers for documentation pages.'
  },
  display: {
    title: 'Display',
    description: 'Display components handle media, embeds, quotes, and visual presentation patterns.'
  },
  domain: {
    title: 'Domain',
    description: 'Domain components package feature-specific UI blocks used by dedicated documentation domains.'
  },
  integrations: {
    title: 'Integrations',
    description: 'Integration components connect docs pages to external APIs and third-party datasets.'
  },
  layout: {
    title: 'Layout',
    description: 'Layout components provide reusable structure primitives for organizing page content.'
  },
  primitives: {
    title: 'Primitives',
    description: 'Primitive components are foundational UI building blocks reused across the docs system.'
  },
  data: {
    title: 'Data',
    description: 'Data components render structured datasets, fetched content, and API-driven documentation surfaces.'
  },
  'page-structure': {
    title: 'Page Structure',
    description: 'Page structure components orchestrate full-page sections, hero treatments, and route-level composition.'
  },
  groupedItems: {
    title: 'Grouped Items',
    description: 'Grouped item components package related component sets that are maintained as a shared collection.'
  },
  gateways: {
    title: 'Gateways',
    description: 'Gateway components support legacy routing and migration-specific infrastructure in the docs system.'
  }
};
const CATEGORY_ORDER = [
  'primitives',
  'layout',
  'content',
  'data',
  'page-structure',
  'display',
  'integrations',
  'domain',
  'groupedItems',
  'gateways'
];

const LOCALE_CONFIG = {
  en: {
    frontmatter: {
      title: 'Components Index',
      sidebarTitle: 'Components Index',
      description: 'Aggregate inventory of repository components from snippets/components, generated for docs-guide maintenance.'
    },
    categoryMetadata: EN_CATEGORY_METADATA,
    lookupHeading: 'Lookup Table',
    lookupDescription: 'Search by category, page path, or component name.'
  },
  cn: {
    frontmatter: {
      title: '组件索引',
      sidebarTitle: '组件索引',
      description: '从 snippets/components 聚合仓库组件库存，用于 docs-guide 维护。'
    },
    categoryMetadata: {
      content: { title: '内容', description: '内容组件为文档页面提供代码、数据和响应格式帮助。' },
      display: { title: '显示', description: '显示组件处理媒体、嵌入、引用和视觉呈现模式。' },
      domain: { title: '领域', description: '领域组件封装专用文档领域中使用的特定功能 UI 模块。' },
      integrations: { title: '集成', description: '集成组件将文档页面连接到外部 API 和第三方数据集。' },
      layout: { title: '布局', description: '布局组件提供可重用的结构原语，用于组织页面内容。' },
      primitives: { title: '原始组件', description: '原始组件是整个文档系统中复用的基础 UI 构建块。' },
      data: { title: '数据', description: '数据组件渲染结构化数据集、获取的内容和 API 驱动的文档界面。' },
      'page-structure': { title: '页面结构', description: '页面结构组件编排整页区块、hero 处理和路由级组合。' },
      groupedItems: { title: '分组项目', description: '分组项目组件打包相关组件集合，并作为共享集合维护。' },
      gateways: { title: '网关', description: '网关组件支持文档系统中的遗留路由和迁移相关基础设施。' }
    },
    lookupHeading: '查找表',
    lookupDescription: '按类别、页面路径或组件名称搜索。'
  },
  es: {
    frontmatter: {
      title: 'Índice de componentes',
      sidebarTitle: 'Índice de componentes',
      description: 'Inventario agregado de componentes del repositorio desde snippets/components, generado para el mantenimiento de docs-guide.'
    },
    categoryMetadata: {
      content: { title: 'Contenido', description: 'Los componentes de contenido proporcionan código, datos y ayudantes de formato de respuesta para las páginas de documentación.' },
      display: { title: 'Visualización', description: 'Los componentes de visualización gestionan medios, incrustaciones, citas y patrones de presentación visual.' },
      domain: { title: 'Dominio', description: 'Los componentes de dominio agrupan bloques de interfaz específicos de funciones usados por dominios de documentación dedicados.' },
      integrations: { title: 'Integraciones', description: 'Los componentes de integración conectan las páginas de documentación con API externas y conjuntos de datos de terceros.' },
      layout: { title: 'Diseño', description: 'Los componentes de diseño proporcionan primitivas estructurales reutilizables para organizar el contenido de la página.' },
      primitives: { title: 'Primitivas', description: 'Los componentes primitivos son bloques básicos de interfaz reutilizados en todo el sistema de documentación.' },
      data: { title: 'Datos', description: 'Los componentes de datos renderizan conjuntos de datos estructurados, contenido obtenido y superficies de documentación impulsadas por API.' },
      'page-structure': { title: 'Estructura de página', description: 'Los componentes de estructura de página orquestan secciones de página completas, tratamientos hero y composición a nivel de ruta.' },
      groupedItems: { title: 'Elementos agrupados', description: 'Los componentes de elementos agrupados empaquetan conjuntos relacionados de componentes que se mantienen como una colección compartida.' },
      gateways: { title: 'Puertas de enlace', description: 'Los componentes de gateways respaldan el enrutamiento heredado y la infraestructura específica de migración en el sistema de documentación.' }
    },
    lookupHeading: 'Tabla de búsqueda',
    lookupDescription: 'Busca por categoría, ruta de página o nombre de componente.'
  },
  fr: {
    frontmatter: {
      title: 'Index des composants',
      sidebarTitle: 'Index des composants',
      description: 'Inventaire agrégé des composants du dépôt à partir de snippets/components, généré pour la maintenance du guide de documentation.'
    },
    categoryMetadata: {
      content: { title: 'Contenu', description: 'Les composants de contenu fournissent du code, des données et des aides pour le format de réponse des pages de documentation.' },
      display: { title: 'Affichage', description: 'Les composants d’affichage gèrent les médias, les intégrations, les citations et les motifs de présentation visuelle.' },
      domain: { title: 'Domaine', description: 'Les composants de domaine regroupent des blocs d’interface spécifiques à une fonctionnalité utilisés par des domaines documentaires dédiés.' },
      integrations: { title: 'Intégrations', description: 'Les composants d’intégration relient les pages de documentation à des API externes et à des jeux de données tiers.' },
      layout: { title: 'Disposition', description: 'Les composants de disposition fournissent des primitives structurelles réutilisables pour organiser le contenu des pages.' },
      primitives: { title: 'Primitives', description: 'Les composants primitifs sont des briques UI fondamentales réutilisées dans tout le système documentaire.' },
      data: { title: 'Données', description: 'Les composants de données affichent des jeux de données structurés, du contenu récupéré et des surfaces documentaires pilotées par API.' },
      'page-structure': { title: 'Structure de page', description: 'Les composants de structure de page orchestrent des sections complètes, des traitements hero et la composition au niveau des routes.' },
      groupedItems: { title: 'Éléments groupés', description: 'Les composants d’éléments groupés empaquettent des ensembles liés de composants maintenus comme une collection partagée.' },
      gateways: { title: 'Passerelles', description: 'Les composants de passerelles prennent en charge le routage historique et l’infrastructure spécifique aux migrations du système documentaire.' }
    },
    lookupHeading: 'Tableau de recherche',
    lookupDescription: 'Recherchez par catégorie, chemin de page ou nom de composant.'
  }
};

const GENERATED_DETAILS = {
  script: 'tools/scripts/generate-docs-guide-components-index.js',
  purpose: 'Aggregate inventory of repository components from snippets/components for docs-guide maintenance.',
  runWhen: 'Components are added, removed, renamed, or their exported signatures change under `snippets/components`.',
  runCommand: 'node tools/scripts/generate-docs-guide-components-index.js --write'
};

function normalizeRepoPath(value) {
  return String(value || '').split(path.sep).join('/').replace(/^\.?\//, '');
}

function readFileSafe(repoPath) {
  try {
    return fs.readFileSync(path.join(REPO_ROOT, repoPath), 'utf8');
  } catch (_err) {
    return '';
  }
}

function extractCodexI18nComment(repoPath) {
  const content = readFileSafe(repoPath);
  const match = content.match(/\{\/\*\s*codex-i18n:[\s\S]*?\*\/\}/);
  return match ? match[0] : '';
}

function sortAlpha(values) {
  return [...values].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
}

function escapeRegExp(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeJsxAttribute(value) {
  return String(value || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function escapeJsString(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, ' ');
}

function escapeMdInline(value) {
  return String(value || '').replace(/`/g, '\\`');
}

function splitTopLevel(input, separator = ',') {
  const parts = [];
  let current = '';
  let depthParen = 0;
  let depthBrace = 0;
  let depthBracket = 0;
  let quote = null;
  let escaped = false;

  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];

    if (quote) {
      current += ch;
      if (!escaped && ch === '\\') {
        escaped = true;
      } else if (!escaped && ch === quote) {
        quote = null;
      } else {
        escaped = false;
      }
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      current += ch;
      continue;
    }

    if (ch === '(') depthParen += 1;
    else if (ch === ')') depthParen = Math.max(0, depthParen - 1);
    else if (ch === '{') depthBrace += 1;
    else if (ch === '}') depthBrace = Math.max(0, depthBrace - 1);
    else if (ch === '[') depthBracket += 1;
    else if (ch === ']') depthBracket = Math.max(0, depthBracket - 1);

    if (ch === separator && depthParen === 0 && depthBrace === 0 && depthBracket === 0) {
      parts.push(current.trim());
      current = '';
      continue;
    }

    current += ch;
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  return parts;
}

function splitTopLevelOnce(input, separator) {
  let depthParen = 0;
  let depthBrace = 0;
  let depthBracket = 0;
  let quote = null;
  let escaped = false;

  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];

    if (quote) {
      if (!escaped && ch === '\\') {
        escaped = true;
      } else if (!escaped && ch === quote) {
        quote = null;
      } else {
        escaped = false;
      }
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }

    if (ch === '(') depthParen += 1;
    else if (ch === ')') depthParen = Math.max(0, depthParen - 1);
    else if (ch === '{') depthBrace += 1;
    else if (ch === '}') depthBrace = Math.max(0, depthBrace - 1);
    else if (ch === '[') depthBracket += 1;
    else if (ch === ']') depthBracket = Math.max(0, depthBracket - 1);

    if (ch === separator && depthParen === 0 && depthBrace === 0 && depthBracket === 0) {
      return [input.slice(0, i), input.slice(i + 1)];
    }
  }

  return [input, ''];
}

function stripComments(value) {
  return String(value || '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .trim();
}

function stripCodeComments(value) {
  return String(value || '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
}

function compactWhitespace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function truncateText(value, limit = 90) {
  const text = compactWhitespace(value);
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 3)}...`;
}

function toTitleCase(value) {
  return String(value || '')
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getCategoryOrder(key) {
  const order = CATEGORY_ORDER.indexOf(key);
  return order === -1 ? Number.MAX_SAFE_INTEGER : order;
}

function discoverCategories(categoryMetadata = EN_CATEGORY_METADATA) {
  const sourceRoot = path.join(REPO_ROOT, SOURCE_ROOT);
  if (!fs.existsSync(sourceRoot)) {
    return [];
  }

  return fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => name !== '_archive' && name !== 'examples' && !name.startsWith('.'))
    .sort((left, right) => {
      const leftOrder = getCategoryOrder(left);
      const rightOrder = getCategoryOrder(right);
      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }
      return left.localeCompare(right, 'en', { sensitivity: 'base' });
    })
    .map((key) => ({
      key,
      title: categoryMetadata[key]?.title || toTitleCase(key),
      description:
        categoryMetadata[key]?.description ||
        `Components organized under the \`${key}\` category.`
    }));
}

function resolveExistingRepoPath(candidates, fallback) {
  const candidateList = Array.isArray(candidates) ? candidates : [candidates];

  for (const candidate of candidateList) {
    const repoPath = normalizeRepoPath(candidate);
    if (fs.existsSync(path.join(REPO_ROOT, repoPath))) {
      return repoPath;
    }
  }

  return normalizeRepoPath(fallback || candidateList[0]);
}

function walkCategoryFiles(categoryKey) {
  const categoryRoot = path.join(REPO_ROOT, SOURCE_ROOT, categoryKey);
  if (!fs.existsSync(categoryRoot) || !fs.statSync(categoryRoot).isDirectory()) {
    return [];
  }

  const files = [];

  function walk(absDir) {
    const entries = fs.readdirSync(absDir, { withFileTypes: true });
    entries.forEach((entry) => {
      const absPath = path.join(absDir, entry.name);
      const relPath = normalizeRepoPath(path.relative(path.join(REPO_ROOT, SOURCE_ROOT), absPath));
      const lowerName = entry.name.toLowerCase();

      if (entry.isDirectory()) {
        if (lowerName === 'examples') return;
        walk(absPath);
        return;
      }

      if (!entry.isFile()) return;
      if (lowerName === 'readme.md') return;
      if (!/\.(jsx|mdx)$/i.test(lowerName)) return;
      if (relPath.includes('/examples/')) return;

      files.push(relPath);
    });
  }

  walk(categoryRoot);
  return sortAlpha(files);
}

function getDeclarationParams(content, localName) {
  const escapedName = escapeRegExp(localName);
  const patterns = [
    new RegExp(`(?:^|\\n)\\s*(?:export\\s+)?(?:default\\s+)?function\\s+${escapedName}\\s*\\(([\\s\\S]*?)\\)\\s*\\{`, 'm'),
    new RegExp(
      `(?:^|\\n)\\s*(?:export\\s+)?(?:const|let|var)\\s+${escapedName}\\s*=\\s*(?:async\\s*)?\\(([\\s\\S]*?)\\)\\s*=>`,
      'm'
    ),
    new RegExp(
      `(?:^|\\n)\\s*(?:export\\s+)?(?:const|let|var)\\s+${escapedName}\\s*=\\s*(?:async\\s*)?([A-Za-z_$][\\w$]*)\\s*=>`,
      'm'
    ),
    new RegExp(
      `(?:^|\\n)\\s*(?:export\\s+)?(?:const|let|var)\\s+${escapedName}\\s*=\\s*(?:async\\s*)?function(?:\\s+[A-Za-z_$][\\w$]*)?\\s*\\(([\\s\\S]*?)\\)`,
      'm'
    )
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return compactWhitespace(match[1] || '');
    }
  }

  return '';
}

function extractPropsFromParams(paramsText) {
  const raw = compactWhitespace(paramsText);
  if (!raw) return [];

  if (raw.startsWith('{')) {
    const braceCloseIdx = raw.lastIndexOf('}');
    if (braceCloseIdx > 0) {
      const body = raw.slice(1, braceCloseIdx).trim();
      if (!body) return [];

      return splitTopLevel(body, ',')
        .map((entry) => {
          const cleaned = stripComments(entry).trim();
          if (!cleaned || cleaned.startsWith('...')) return null;

          const [leftRaw, rightRaw] = splitTopLevelOnce(cleaned, '=');
          const left = leftRaw.trim();
          const defaultValue = rightRaw.trim() || null;

          const [propToken] = splitTopLevelOnce(left, ':');
          const propName = propToken.trim().replace(/^['"]|['"]$/g, '');
          if (!propName) return null;
          if (propName.startsWith('{') || propName.startsWith('[')) return null;
          return { name: propName, defaultValue };
        })
        .filter(Boolean);
    }
  }

  return splitTopLevel(raw, ',')
    .map((entry) => {
      const cleaned = stripComments(entry).trim();
      if (!cleaned || cleaned.startsWith('...')) return null;

      const [leftRaw, rightRaw] = splitTopLevelOnce(cleaned, '=');
      const name = leftRaw.trim();
      if (!name || !/^[A-Za-z_$][\w$]*$/.test(name)) return null;
      return { name, defaultValue: rightRaw.trim() || null };
    })
    .filter(Boolean);
}

function parseExportMap(content) {
  const scanContent = stripCodeComments(content);
  const exportMap = new Map();

  const inlineExportRegex = /^\s*export\s+(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)\b/gm;
  let match = inlineExportRegex.exec(scanContent);
  while (match) {
    exportMap.set(match[1], { localName: match[1] });
    match = inlineExportRegex.exec(scanContent);
  }

  const namedDefaultRegex = /^\s*export\s+default\s+function\s+([A-Za-z_$][\w$]*)\b/gm;
  match = namedDefaultRegex.exec(scanContent);
  while (match) {
    exportMap.set(match[1], { localName: match[1] });
    match = namedDefaultRegex.exec(scanContent);
  }

  const exportListRegex = /export\s*{\s*([\s\S]*?)\s*}\s*;?/gm;
  match = exportListRegex.exec(scanContent);
  while (match) {
    const body = stripComments(match[1]);
    splitTopLevel(body, ',').forEach((item) => {
      const cleaned = stripComments(item);
      if (!cleaned) return;

      const aliasMatch = cleaned.match(/^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/);
      if (aliasMatch) {
        exportMap.set(aliasMatch[2], { localName: aliasMatch[1] });
      } else if (/^[A-Za-z_$][\w$]*$/.test(cleaned)) {
        exportMap.set(cleaned, { localName: cleaned });
      }
    });

    match = exportListRegex.exec(scanContent);
  }

  return exportMap;
}

function buildComponentEntries(repoPath) {
  const content = readFileSafe(repoPath);
  const exportMap = parseExportMap(content);

  const components = sortAlpha([...exportMap.keys()])
    .filter((name) => /^[A-Z][A-Za-z0-9_]*$/.test(name))
    .map((name) => {
      const localName = exportMap.get(name).localName;
      const params = getDeclarationParams(content, localName);
      const props = extractPropsFromParams(params);
      return {
        name,
        localName,
        params,
        props
      };
    });

  return components;
}

function formatPropsSummary(props) {
  if (!props.length) {
    return {
      propsLine: 'No explicit props detected from signature.',
      defaultsLine: 'No explicit defaults detected.'
    };
  }

  const names = props.map((prop) => `\`${escapeMdInline(prop.name)}\``).join(', ');
  const defaults = props
    .filter((prop) => prop.defaultValue != null)
    .map((prop) => `\`${escapeMdInline(prop.name)}=${escapeMdInline(truncateText(prop.defaultValue))}\``)
    .join(', ');

  return {
    propsLine: names,
    defaultsLine: defaults || 'None'
  };
}

function normalizeDefaultForLookup(defaultValue) {
  const value = compactWhitespace(String(defaultValue || ''));
  if (!value) return '""';

  const quotedMatch = value.match(/^(['"`])([\s\S]*)\1$/);
  if (quotedMatch) {
    return `"${quotedMatch[2].replace(/"/g, '\\"')}"`;
  }

  return truncateText(value, 36);
}

function buildLookupPropsList(props) {
  const usageProps = props.filter((prop) => /^[A-Za-z_$][\w$]*$/.test(prop.name));
  if (!usageProps.length) return 'none';

  return usageProps
    .map((prop) => {
      if (prop.defaultValue != null) {
        return `${prop.name}=${normalizeDefaultForLookup(prop.defaultValue)}`;
      }
      return prop.name;
    })
    .join(', ');
}

function buildUsageSnippet(componentName, props) {
  const lines = [];
  const usageProps = props.filter((prop) => /^[A-Za-z_$][\w$]*$/.test(prop.name) && prop.name !== 'children');

  if (!usageProps.length) {
    lines.push(`<${componentName} />`);
    return lines;
  }

  function inferPlaceholderValue(name) {
    const key = String(name || '').toLowerCase();
    if (/^(is|has|can)[a-z]/.test(name) || /(enabled|disabled|loading|visible|open|required|active)/.test(key)) {
      return 'false';
    }
    if (/(count|size|limit|width|height|duration|index|page|offset|amount|num)/.test(key)) {
      return '0';
    }
    if (/(items|list|array|rows|columns|tabs)/.test(key)) {
      return '[]';
    }
    if (/(style|config|options|map|fields|props|data|meta)/.test(key)) {
      return '{}';
    }
    return '"<value>"';
  }

  lines.push(`<${componentName}`);
  usageProps.forEach((prop) => {
    const value = prop.defaultValue != null ? truncateText(prop.defaultValue, 120) : inferPlaceholderValue(prop.name);
    lines.push(`  ${prop.name}={${value}}`);
  });
  lines.push('/>');
  return lines;
}

function indentLines(lines, spaces) {
  const pad = ' '.repeat(spaces);
  return lines.map((line) => `${pad}${line}`);
}

function serializeLookupRows(rows) {
  if (!rows.length) return '[]';
  const lines = ['['];
  rows.forEach((row) => {
    lines.push(
      `    { Category: "${escapeJsString(row.Category)}", Page: "${escapeJsString(row.Page)}", Component: "${escapeJsString(row.Component)}", Props: "${escapeJsString(row.Props)}" },`
    );
  });
  lines.push('  ]');
  return lines.join('\n');
}

function buildInventory(categoryMetadata) {
  const inventory = [];
  const categories = discoverCategories(categoryMetadata);

  categories.forEach((category) => {
    const files = walkCategoryFiles(category.key).map((repoPath) => {
      const components = buildComponentEntries(path.posix.join(SOURCE_ROOT, repoPath));
      return {
        repoPath,
        title: repoPath.slice(`${category.key}/`.length),
        components
      };
    });

    inventory.push({ ...category, files });
  });

  return inventory;
}

function buildFrontmatterLines(localeConfig) {
  return buildGeneratedFrontmatterLines({
    title: localeConfig.frontmatter.title,
    sidebarTitle: localeConfig.frontmatter.sidebarTitle,
    description: localeConfig.frontmatter.description,
    keywords: ['livepeer', 'components index', 'aggregate inventory', 'repository', 'snippets']
  });
}

function buildContent({ locale = 'en', repoPath }) {
  const localeConfig = LOCALE_CONFIG[locale] || LOCALE_CONFIG.en;
  const inventory = buildInventory(localeConfig.categoryMetadata);
  const lookupRows = [];
  const searchTableImportPath = resolveExistingRepoPath(
    [
      path.posix.join(SOURCE_ROOT, 'layout/searchTable.jsx'),
      path.posix.join(SOURCE_ROOT, 'layout/SearchTable.jsx'),
      path.posix.join(SOURCE_ROOT, 'layout/search-table.jsx')
    ],
    path.posix.join(SOURCE_ROOT, 'layout/SearchTable.jsx')
  );

  const lines = [...buildFrontmatterLines(localeConfig), ''];
  const codexI18nComment = locale === 'en' ? '' : extractCodexI18nComment(repoPath);
  if (codexI18nComment) {
    lines.push(codexI18nComment);
  }
  lines.push(`import { SearchTable } from "/${searchTableImportPath}";`);
  lines.push('import { DynamicTable } from "/snippets/components/layout/table.jsx";');
  lines.push('');
  buildGeneratedHiddenBannerLines(GENERATED_DETAILS).forEach((line) => lines.push(line));
  lines.push('');
  buildGeneratedNoteLines(GENERATED_DETAILS).forEach((line) => lines.push(line));
  lines.push('');

  inventory.forEach((category) => {
    lines.push(`## ${category.title}`);
    lines.push(category.description);
    lines.push('');
    lines.push('<AccordionGroup>');

    category.files.forEach((file) => {
      lines.push(`  <Accordion title="${escapeJsxAttribute(file.title)}" icon="file-code">`);

      if (!file.components.length) {
        lines.push('    <ResponseField name="No exported components found" type="info">');
        lines.push('      No exported components were detected in this file.');
        lines.push('    </ResponseField>');
      } else {
        file.components.forEach((component) => {
          const summary = formatPropsSummary(component.props);
          const importLine = `import { ${component.name} } from "/${path.posix.join(SOURCE_ROOT, file.repoPath)}";`;
          const usageLines = buildUsageSnippet(component.name, component.props);
          const exampleLines = [importLine, '', ...usageLines];
          const lookupProps = buildLookupPropsList(component.props);

          lookupRows.push({ Category: category.title, Page: file.repoPath, Component: component.name, Props: lookupProps });

          lines.push(`    <ResponseField name="${escapeJsxAttribute(component.name)}" type="component">`);
          lines.push(`      **Props**: ${summary.propsLine} <br/>`);
          lines.push(`      **Defaults**: ${summary.defaultsLine}`);
          lines.push('');
          lines.push('      <CodeGroup>');
          lines.push('```jsx lines Example');
          indentLines(exampleLines, 0).forEach((line) => lines.push(line));
          lines.push('```');
          lines.push('      </CodeGroup>');
          lines.push('    </ResponseField>');
        });
      }

      lines.push('  </Accordion>');
    });

    lines.push('</AccordionGroup>');
    lines.push('');
  });

  const sortedLookupRows = [...lookupRows].sort((a, b) => {
    if (a.Category !== b.Category) return a.Category.localeCompare(b.Category, 'en', { sensitivity: 'base' });
    if (a.Page !== b.Page) return a.Page.localeCompare(b.Page, 'en', { sensitivity: 'base' });
    return a.Component.localeCompare(b.Component, 'en', { sensitivity: 'base' });
  });

  lines.push(`## ${localeConfig.lookupHeading}`);
  lines.push(localeConfig.lookupDescription);
  lines.push('');
  lines.push('<SearchTable');
  lines.push('  TableComponent={DynamicTable}');
  lines.push('  tableTitle="Component Lookup"');
  lines.push('  headerList={["Category", "Page", "Component", "Props"]}');
  lines.push(`  itemsList={${serializeLookupRows(sortedLookupRows)}}`);
  lines.push('  searchPlaceholder="Search category, page, component, or props..."');
  lines.push('  monospaceColumns={[1, 2, 3]}');
  lines.push('/>');
  lines.push('');

  return `${lines.join('\n').trimEnd()}\n`;
}

function writeIfChanged(repoPath, nextContent, shouldWrite) {
  const current = readFileSafe(repoPath);
  const changed = current !== nextContent;

  if (changed && shouldWrite) {
    fs.mkdirSync(path.dirname(path.join(REPO_ROOT, repoPath)), { recursive: true });
    fs.writeFileSync(path.join(REPO_ROOT, repoPath), nextContent, 'utf8');
  }

  return { changed, path: repoPath };
}

function parseArgs(argv) {
  const check = argv.includes('--check');
  const write = argv.includes('--write') || !check;
  return { check, write };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const results = [];

  try {
    OUTPUT_TARGETS.forEach((target) => {
      const content = buildContent(target);
      results.push(writeIfChanged(target.repoPath, content, args.write));
    });
  } catch (error) {
    console.error(`Failed to generate components indexes: ${error.message}`);
    process.exit(1);
  }

  if (args.check) {
    const outdated = results.filter((result) => result.changed);
    if (outdated.length > 0) {
      outdated.forEach((result) => {
        console.error(`Components index is out of date: ${result.path}`);
      });
      console.error('Run: node tools/scripts/generate-docs-guide-components-index.js --write');
      process.exit(1);
    }
    console.log('Components indexes are up to date.');
    return;
  }

  const updated = results.filter((result) => result.changed);
  if (updated.length > 0) {
    updated.forEach((result) => {
      console.log(`Updated ${result.path}`);
    });
  } else {
    console.log('No changes. Components indexes already current.');
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  buildContent
};

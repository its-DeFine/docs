let parserPromise = null;

async function createParser() {
  const [{ unified }, { default: remarkParse }, { default: remarkMdx }, { default: remarkGfm }] =
    await Promise.all([import('unified'), import('remark-parse'), import('remark-mdx'), import('remark-gfm')]);
  return unified().use(remarkParse).use(remarkGfm).use(remarkMdx);
}

async function getParser() {
  if (!parserPromise) {
    parserPromise = createParser();
  }
  return parserPromise;
}

async function parseMdx(content) {
  const parser = await getParser();
  return parser.parse(String(content || ''));
}

module.exports = { parseMdx };

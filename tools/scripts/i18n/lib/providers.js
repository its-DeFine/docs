const { createOpenRouterTranslator } = require('./provider-openrouter');
const { createMockTranslator } = require('./provider-mock');

function createTranslator({ config, providerNameOverride = '' }) {
  const providerConfig = { ...(config.provider || {}) };
  const name = String(providerNameOverride || providerConfig.name || '').trim().toLowerCase();

  if (name === 'mock') {
    return createMockTranslator();
  }
  if (name === 'openrouter' || !name) {
    return createOpenRouterTranslator(providerConfig, config.translationRules || {});
  }

  throw new Error(`Unsupported i18n provider: ${name}`);
}

module.exports = { createTranslator };

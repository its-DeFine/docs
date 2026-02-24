function createMockTranslator() {
  return {
    name: 'mock',
    async translateStrings({ language, strings }) {
      return {
        strings: (strings || []).map((value) => `[${language}] ${String(value ?? '')}`),
        modelUsed: 'mock',
        attempts: 0
      };
    }
  };
}

module.exports = { createMockTranslator };

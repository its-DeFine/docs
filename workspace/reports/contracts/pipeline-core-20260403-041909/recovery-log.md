## 2026-04-03T04:19:09+11:00
- batch: pipeline-core-20260403-041909
- purpose: pipeline-core backup before schema/historical/output changes
- files:
  - .github/scripts/fetch-contract-addresses.js
  - operations/scripts/automations/content/data/contracts/constants.js
  - operations/scripts/automations/content/data/contracts/pipeline.js
  - operations/tests/unit/contracts-addresses-pipeline.test.js
  - snippets/data/contract-addresses/contractAddressesData.jsx
  - snippets/data/contract-addresses/contractAddressesData.json
  - snippets/data/contract-addresses/blockchainContractsPageData.jsx
  - snippets/data/contract-addresses/blockchainContractsPageData.json
  - snippets/composables/pages/canonical/livepeer-contract-addresses-data.json
- next: patch pipeline-core files


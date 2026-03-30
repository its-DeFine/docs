# Workflow Audit Draft: Update Contract Addresses

- Source path: `.github/workflows/update-contract-addresses.yml`
- Concern: `authoring`
- Risk level: `high`
- Dispatcher candidate: `page-ship`

## Summary

Update Contract Addresses runs on repository_dispatch, schedule, workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- .github/scripts/fetch-contract-addresses.js
- action:actions/checkout@v4
- action:actions/setup-node@v4
- secret:ARBISCAN_API_KEY
- secret:ETHERSCAN_API_KEY
- secret:GITHUB_TOKEN
- snippets/data/contract-addresses/_health-checks.json
- snippets/data/contract-addresses/contractAddressesData.jsx

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Mutates repository state from CI, which raises coordination and safety risk.
- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
- Scheduled execution can hide drift until the next cron window.

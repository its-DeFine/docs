# Contracts Explorer Link Audit

Date: 2026-03-31

Page audited: `http://localhost:3333/v2/about/resources/livepeer-contract-addresses`

Source page: `snippets/composables/pages/canonical/livepeer-contract-addresses.mdx`

## Audit Criterion

Pass condition used for this audit:

| Check | Rule |
|---|---|
| Link opens | The rendered Arbiscan or Etherscan address link resolves to the explorer address page |
| Livepeer tag check | `Livepeer` appears in the contract header area before the explorer `Overview` section |
| Fail condition | The address page opens, but `Livepeer` only appears later in the page, such as `Livepeer: Deployer`, or does not appear at all in the contract header |

Notes:

| Item | Result |
|---|---|
| Browser method | Playwright, headed browser |
| Explorer anti-bot handling | Cloudflare challenge cleared after a short wait |
| Dead links found | 0 |

## Summary

| Scope | Links checked | Passed | Failed |
|---|---:|---:|---:|
| Full rendered page | 90 | 52 | 38 |
| Active table only | 18 | 16 | 2 |

## Active Table Failures

| Chain | Contract | Address | Explorer | Header has `Livepeer` tag |
|---|---|---|---|---|
| arbitrumOne | AIServiceRegistry | [0x04C0b249740175999E5BF5c9ac1dA92431EF34C5](https://arbiscan.io/address/0x04C0b249740175999E5BF5c9ac1dA92431EF34C5) | Arbiscan | No |
| ethereumMainnet | L1LPTGateway | [0x6142f1C8bBF02E6A6bd074E8d564c9A5420a0676](https://etherscan.io/address/0x6142f1C8bBF02E6A6bd074E8d564c9A5420a0676) | Etherscan | No |

## Full Failure Matrix

| Scope | Chain | Contract or section | Data group | Address | Explorer | Header has `Livepeer` tag |
|---|---|---|---|---|---|---|
| Active table | arbitrumOne | AIServiceRegistry | inventory | [0x04C0b249740175999E5BF5c9ac1dA92431EF34C5](https://arbiscan.io/address/0x04C0b249740175999E5BF5c9ac1dA92431EF34C5) | Arbiscan | No |
| Active table | ethereumMainnet | L1LPTGateway | inventory | [0x6142f1C8bBF02E6A6bd074E8d564c9A5420a0676](https://etherscan.io/address/0x6142f1C8bBF02E6A6bd074E8d564c9A5420a0676) | Etherscan | No |
| Non-active section | arbitrumOne | BondingManager | inventory | [0xdA6fe3f332Ae11539b3cF777284Ae70fd3bF2D74](https://arbiscan.io/address/0xdA6fe3f332Ae11539b3cF777284Ae70fd3bF2D74) | Arbiscan | No |
| Non-active section | arbitrumOne | BondingManager (Target) | historical | [0x3757DB506ECd9CBE643660C0F5b70db5b321202C](https://arbiscan.io/address/0x3757DB506ECd9CBE643660C0F5b70db5b321202C) | Arbiscan | No |
| Non-active section | arbitrumOne | BondingManager (Target) | historical | [0x3a941e1094B9E33efABB26a9047a8ABb4b257907](https://arbiscan.io/address/0x3a941e1094B9E33efABB26a9047a8ABb4b257907) | Arbiscan | No |
| Non-active section | arbitrumOne | BondingManager (Target) | historical | [0x4bA7E7531Ab56bC8d78dB4FDc88D21F621f34BB4](https://arbiscan.io/address/0x4bA7E7531Ab56bC8d78dB4FDc88D21F621f34BB4) | Arbiscan | No |
| Non-active section | arbitrumOne | BondingManager (Target) | historical | [0x557093B1Ab53412166beAd939f34244170b6525B](https://arbiscan.io/address/0x557093B1Ab53412166beAd939f34244170b6525B) | Arbiscan | No |
| Non-active section | arbitrumOne | BondingManager (Target) | historical | [0x9c9209c9ff6996513b3673d69ee7b36a6c58a8cf](https://arbiscan.io/address/0x9c9209c9ff6996513b3673d69ee7b36a6c58a8cf) | Arbiscan | No |
| Non-active section | arbitrumOne | BondingManager (Target) | historical | [0xC40df4db2f99e7e235780A93B192F1a934f0c45b](https://arbiscan.io/address/0xC40df4db2f99e7e235780A93B192F1a934f0c45b) | Arbiscan | No |
| Non-active section | arbitrumOne | BondingManager (Target) | historical | [0xe479B9fbA2Cd65f822f451fC8C145c663B995CE6](https://arbiscan.io/address/0xe479B9fbA2Cd65f822f451fC8C145c663B995CE6) | Arbiscan | No |
| Non-active section | arbitrumOne | BondingManager (Target) | historical | [0xF62C30242fccd3a46721f155d4d367De3fD5B3b3](https://arbiscan.io/address/0xF62C30242fccd3a46721f155d4d367De3fD5B3b3) | Arbiscan | No |
| Non-active section | arbitrumOne | L2Migrator (Target) | historical | [0x4F59b39e2ea628fe8371BDfd51B063319339c7EE](https://arbiscan.io/address/0x4F59b39e2ea628fe8371BDfd51B063319339c7EE) | Arbiscan | No |
| Non-active section | arbitrumOne | Minter | historical | [0x4969dcCF5186e1c49411638fc8A2a020Fdab752E](https://arbiscan.io/address/0x4969dcCF5186e1c49411638fc8A2a020Fdab752E) | Arbiscan | No |
| Non-active section | arbitrumOne | TicketBroker (Target) | historical | [0x7Beb84c52ce96DFd90431FAA97378994a8baa6df](https://arbiscan.io/address/0x7Beb84c52ce96DFd90431FAA97378994a8baa6df) | Arbiscan | No |
| Non-active section | arbitrumOne | TicketBroker (Target) | historical | [0xea1b0F6c8D158328a6e3D3F924B86A759F41465c](https://arbiscan.io/address/0xea1b0F6c8D158328a6e3D3F924B86A759F41465c) | Arbiscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0x05C03EA0039f2e828A725A82939fc1e90de38B44](https://etherscan.io/address/0x05C03EA0039f2e828A725A82939fc1e90de38B44) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0x0da7c263eCF5cD3ddba275b9A2D63320E28fD287](https://etherscan.io/address/0x0da7c263eCF5cD3ddba275b9A2D63320E28fD287) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0x1a6007d1D0583452Bd6f45a4e1a9190B15Fbd7E3](https://etherscan.io/address/0x1a6007d1D0583452Bd6f45a4e1a9190B15Fbd7E3) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0x223398d0BF9cc24960b3886CC481dBf5276EdeD2](https://etherscan.io/address/0x223398d0BF9cc24960b3886CC481dBf5276EdeD2) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0x246edEBae14b186a67e3d466A485321169a8bcD5](https://etherscan.io/address/0x246edEBae14b186a67e3d466A485321169a8bcD5) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0x35F99F326681FE4F38719491be48Ab4950795013](https://etherscan.io/address/0x35F99F326681FE4F38719491be48Ab4950795013) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0x5A9512826EAAF1FE4190f89443314E95A515fE24](https://etherscan.io/address/0x5A9512826EAAF1FE4190f89443314E95A515fE24) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0x633101b3f15f93c5f415830d48e56b9b1f7ba584](https://etherscan.io/address/0x633101b3f15f93c5f415830d48e56b9b1f7ba584) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0x81eb0b10ff8703905904e4d91cf6aa575d59736f](https://etherscan.io/address/0x81eb0b10ff8703905904e4d91cf6aa575d59736f) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0xAC0153a8C5227e43506901a4f3f83FD000c8178f](https://etherscan.io/address/0xAC0153a8C5227e43506901a4f3f83FD000c8178f) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0xc8a695155648F18B0cfd6989498B6f8b2c4cc56A](https://etherscan.io/address/0xc8a695155648F18B0cfd6989498B6f8b2c4cc56A) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0xCBAa6eA4886b535FC7ABACe3F3985Ed03b3b80a0](https://etherscan.io/address/0xCBAa6eA4886b535FC7ABACe3F3985Ed03b3b80a0) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0xDC6eE74A18994caD3876a078B6fa4920FD9C507d](https://etherscan.io/address/0xDC6eE74A18994caD3876a078B6fa4920FD9C507d) | Etherscan | No |
| Non-active section | ethereumMainnet | BondingManager (Target) | historical | [0xef5E170b679ddaF5e22ADC10fD23DDdB79E3C0c5](https://etherscan.io/address/0xef5E170b679ddaF5e22ADC10fD23DDdB79E3C0c5) | Etherscan | No |
| Non-active section | ethereumMainnet | JobsManager (Proxy) | historical | [0xbf07ff45f14c9ff0571b9fbdc7e2b62d29931224](https://etherscan.io/address/0xbf07ff45f14c9ff0571b9fbdc7e2b62d29931224) | Etherscan | No |
| Non-active section | ethereumMainnet | JobsManager (Target) | historical | [0x68b463bca7d561118636e9f028ff0f2e8398dd6a](https://etherscan.io/address/0x68b463bca7d561118636e9f028ff0f2e8398dd6a) | Etherscan | No |
| Non-active section | ethereumMainnet | JobsManager (Target) | historical | [0x8eade5eec609572bf53deadb88d36f862ddec517](https://etherscan.io/address/0x8eade5eec609572bf53deadb88d36f862ddec517) | Etherscan | No |
| Non-active section | ethereumMainnet | JobsManager (Target) | historical | [0xB620c762dd4bC350602936d7401BB8393Ee6687c](https://etherscan.io/address/0xB620c762dd4bC350602936d7401BB8393Ee6687c) | Etherscan | No |
| Non-active section | ethereumMainnet | LivepeerVerifier | historical | [0xe4be2a35dec0063f9dfccb9b740b1acb7eefefec](https://etherscan.io/address/0xe4be2a35dec0063f9dfccb9b740b1acb7eefefec) | Etherscan | No |
| Non-active section | ethereumMainnet | LivepeerVerifier | historical | [0xf623811b08b45792d0223d77d9c922dae29712ec](https://etherscan.io/address/0xf623811b08b45792d0223d77d9c922dae29712ec) | Etherscan | No |
| Non-active section | ethereumMainnet | Minter | historical | [0x8573f2f5a3bd960eee3d998473e50c75cdbe6828](https://etherscan.io/address/0x8573f2f5a3bd960eee3d998473e50c75cdbe6828) | Etherscan | No |
| Non-active section | ethereumMainnet | RoundsManager (Target) | historical | [0x857d4bf18a80f03d3d11f438825cd3d0aa0d9d68](https://etherscan.io/address/0x857d4bf18a80f03d3d11f438825cd3d0aa0d9d68) | Etherscan | No |
| Non-active section | ethereumMainnet | RoundsManager (Target) | historical | [0xa3aa52ce79e85a21d9ccda705c57e426b160112c](https://etherscan.io/address/0xa3aa52ce79e85a21d9ccda705c57e426b160112c) | Etherscan | No |

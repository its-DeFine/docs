---
title: 'V2 Link Audit Report'
sidebarTitle: 'Link Audit'
description: 'Generated V2 MDX link audit report from tests/integration/v2-link-audit.js.'
keywords: ["livepeer","internal","reports","navigation-links","v2-link-audit"]
og:image: "/snippets/assets/domain/SHARED/LivepeerDocsLogo.svg"
---
Last Generated (UTC ISO): `2026-03-01T04:39:53.754Z`
Last Generated (UTC Human): `March 01, 2026 04:39 UTC`
Generator Script: `tests/integration/v2-link-audit.js`
What It Does: Comprehensive V2 MDX link audit with internal strict checks and optional external URL validation.
Audited Scope: `tests`
Outputs:
- Markdown report at tasks/reports/navigation-links/LINK_TEST_REPORT.md (or custom path)
- JSON report at tasks/reports/navigation-links/LINK_TEST_REPORT.json (or custom path)
- snippets/data/<domain>/hrefs.jsx files when write-links enabled
# LINK_TEST_REPORT

Operator note: external HTTP/HTTPS links are classified only and marked as `🟡 untested-external` in this phase.

## Run Metadata
- Timestamp: 2026-02-26T05:07:27.528Z
- Mode: full
- Strict: false
- Files analyzed: 451
- Total extracted references: 2421

## Summary Counts

### By Link Type
| linkType | count |
|---|---:|
| empty | 177 |
| external-http | 8 |
| external-https | 1104 |
| import-path | 376 |
| internal-relative | 482 |
| internal-rooted | 272 |
| mailto | 2 |

### By Status
| status | count |
|---|---:|
| 🟡 untested-external | 1112 |
| missing | 8 |
| ok | 1116 |
| ok-folder-route | 2 |
| skipped | 179 |
| skipped-allowlisted | 3 |
| skipped-style-guide-example | 1 |

## Hierarchical Inventory

### Orchestrators
- Orchestrator Home Portal (../orchestrators/orchestrators-portal.mdx)
- ### About Orchestrators
  - Orchestrator Architecture (../orchestrators/about-orchestrators/architecture.mdx)
  - Orchestrator Economics (../orchestrators/about-orchestrators/economics.mdx)
  - Orchestrator Functions (../orchestrators/about-orchestrators/orchestrator-functions.mdx)
    - Imported MDX: snippets/pages/05_GPUS/Diagrams/orchestratorRole.mdx
  - Orchestrator Explainer (../orchestrators/about-orchestrators/overview.mdx)
  - ⚠️ Random (../orchestrators/about-orchestrators/random.mdx)
- ### Advanced Setup
  - AI Pipelines (../orchestrators/advanced-setup/ai-pipelines.mdx)
  - Delegation (../orchestrators/advanced-setup/delegation.mdx)
  - Rewards and Fees (../orchestrators/advanced-setup/rewards-and-fees.mdx)
  - Run a Pool (../orchestrators/advanced-setup/run-a-pool.mdx)
  - Staking LPT (../orchestrators/advanced-setup/staking-LPT.mdx)
- ### Orchestrator Tools And Resources
  - Community Orchestrator Pools (../orchestrators/orchestrator-tools-and-resources/community-pools.mdx)
  - Orchestrator Community And Help (../orchestrators/orchestrator-tools-and-resources/orchestrator-community-and-help.mdx)
  - Orchestrator Guides (../orchestrators/orchestrator-tools-and-resources/orchestrator-guides.mdx)
  - Orchestrator Resources (../orchestrators/orchestrator-tools-and-resources/orchestrator-resources.mdx)
  - Orchestrator Tools (../orchestrators/orchestrator-tools-and-resources/orchestrator-tools.mdx)
- ### Quickstart
  - Join a Pool (../orchestrators/quickstart/join-a-pool.mdx)
  - Add your GPU to Livepeer (../orchestrators/quickstart/orchestrator-setup.mdx)
  - Orchestrator Quickstart (../orchestrators/quickstart/overview.mdx)
- ### References
  - cli-flags reference (../orchestrators/references/cli-flags.mdx)
  - Orchestrator FAQ (../orchestrators/references/faq.mdx)
- ### Setting Up An Orchestrator
  - ⚠️ Connect to Arbitrum (../orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx)
  - ⚠️ Data Centre Setup (../orchestrators/setting-up-an-orchestrator/data-centre-setup.mdx)
  - Data Centres And Large Scale Hardware Providers (../orchestrators/setting-up-an-orchestrator/data-centres-and-large-scale-hardware-providers.mdx)
  - ⚠️ Enterprise And Data Centres (../orchestrators/setting-up-an-orchestrator/enterprise-and-data-centres.mdx)
  - Hardware Requirements (../orchestrators/setting-up-an-orchestrator/hardware-requirements.mdx)
  - ⚠️ Install go-livepeer (../orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx)
  - ⚠️ Example Orchestrator Config (../orchestrators/setting-up-an-orchestrator/orch-config.mdx)
  - Orchestrator Stats and Monitoring (../orchestrators/setting-up-an-orchestrator/orchestrator-stats.mdx)
  - Setting up an Orchestrator (../orchestrators/setting-up-an-orchestrator/overview.mdx)
  - ⚠️ Publish Offerings (../orchestrators/setting-up-an-orchestrator/publish-offerings.mdx)
  - #### Setting Up An Orchestrator
    - Configure your Orchestrator (../orchestrators/setting-up-an-orchestrator/setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer.mdx)
- Unindexed Pages
  - (none)

## Per-Page Full Link Lists

### snippets/automations/globals/globals.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### snippets/components/layout/api-base-urls-table.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### snippets/external/awesome-livepeer-readme.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/rickstaa/awesome-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://awesome.re/badge.svg |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.org |  | null | 🟡 untested-external |  |  |  |
| internal-relative | assets/images/livepeer_dark_bg.svg | snippets/external/assets/images/livepeer_dark_bg.svg | false | missing |  |  |  |
| empty | #apps-built-with-livepeer |  | null | skipped |  |  |  |
| empty | #video-streaming-and-social-apps |  | null | skipped |  |  |  |
| empty | #ai-powered-apps |  | null | skipped |  |  |  |
| empty | #developer-tools |  | null | skipped |  |  |  |
| empty | #livepeer-tools-and-libraries |  | null | skipped |  |  |  |
| empty | #tutorials |  | null | skipped |  |  |  |
| empty | #demo-apps |  | null | skipped |  |  |  |
| empty | #network-tools |  | null | skipped |  |  |  |
| empty | #delegator-tools |  | null | skipped |  |  |  |
| empty | #orchestrator-pools |  | null | skipped |  |  |  |
| empty | #rpc-providers |  | null | skipped |  |  |  |
| empty | #staking-tools |  | null | skipped |  |  |  |
| empty | #node-operator-tools |  | null | skipped |  |  |  |
| empty | #analytics--stats--monitoring |  | null | skipped |  |  |  |
| empty | #general |  | null | skipped |  |  |  |
| empty | #ai-specific |  | null | skipped |  |  |  |
| empty | #general-livepeer-education |  | null | skipped |  |  |  |
| external-https | https://www.beem.xyz/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.beyondclub.xyz/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://buttrfly.app/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://ethglobal.tv/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://glass.xyz |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.gummys.io/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://huddle01.com |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.hypeshot.io/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://kavarii.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.lens.xyz/docs/media-snapshots |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.lensplay.xyz/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://lensport.io/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://lenster.xyz/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://lenstube.xyz/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://video-nft-sdk.vercel.app/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://minds.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://monaverse.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://orb.ac/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://picarto.tv/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://pinsta.xyz/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.soclly.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://streameth.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://switchboard.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.thelotradio.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://tribesocial.io/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://wav3s.app/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://xeenon.xyz/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://retake.tv/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://stream.place/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.tsunameme.ai/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://dream.livepeer.cloud/generate |  | null | 🟡 untested-external |  |  |  |
| external-https | https://ai-generator.livepeer.cloud/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://letsgenerate.ai/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://inference.stronk.rocks/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio |  | null | 🟡 untested-external |  |  |  |
| external-https | https://thegraph.com/hosted-service/subgraph/0xcadams/livepeer-arbitrum-one |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/guides/developing |  | null | 🟡 untested-external |  |  |  |
| external-http | http://livepeerjs.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://mistserver.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://bubble.io/plugin/livepeer-1677840415216x421611770103726100 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/developers/livepeer-studio-cli |  | null | 🟡 untested-external |  |  |  |
| external-https | https://suhailkakar.com/building-a-full-stack-web3-tiktok-clone-with-react-native-livepeer-and-lens-protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://suhailkakar.com/building-a-full-stack-web3-youtube-clone-with-next-ipfs-the-graph-solidity-and-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/tutorials/developing/upload-playback-videos-on-arweave |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/tutorials/developing/upload-playback-videos-on-ipfs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/tutorials/developing/upload-playback-videos-on-ipfs-4everland |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.youtube.com/watch?v=pFKJG64yhIk |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/videodac/livepeer-broadcaster |  | null | 🟡 untested-external |  |  |  |
| external-https | https://cyberconnect.hashnode.dev/cybertube-a-decentralized-video-sharing-platform-built-on-cyberconnect-using-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/tutorials/developing/token-gate-videos-using-lit |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/tutorials/developing/token-gate-videos-using-guildxyz |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/decentraland-scenes/video-streaming/blob/main/README.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/livepeer-lens-shortvideos |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/victorges/justcast.it |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/suhailkakar/Decentralized-YouTube |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/suhailkakar/livepeer-dStorage-playback |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/suhailkakar/FVM-x-Livepeer-Example-App |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/suhailkakar/livepeer-solana-nft |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/suhailkakar/Livepeer-EVM-Tokengating |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/suhailkakar/Livepeer-Aptos |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.turboeth.xyz/integration/livepeer/livestream/new/browser |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/alextitonis/Unity-Livepeer-Client |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/suhailkakar/livepeer-guild-token-gated-vod |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/webrtmp-sdk |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/rickstaa/livepeer-income-reports |  | null | 🟡 untested-external |  |  |  |
| external-https | https://titan-node.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://video-miner.com/ |  | null | 🟡 untested-external |  |  |  |
| external-http | http://livepool.io |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.grant-node.xyz/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.open-pool.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://liveinfraspe.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.alchemy.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://infura.io/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.stakingrewards.com/earn/livepeer/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.tenderize.me/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/telegram-bot-orchestrator-watcher/1077 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/rickstaa/livepeer-reward-watcher |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/AuthorityNull/Livepeer-Docker-Portainer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/transcodeninja/livepeer-exporter |  | null | 🟡 untested-external |  |  |  |
| external-https | https://stronk.rocks/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/guide-production-log-monitoring-and-alerting/2004 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://grafana.stronk.tech/d/g423g24y/orchestrator-ppp?orgId=1&refresh=5s&var-regions=Leiden |  | null | 🟡 untested-external |  |  |  |
| external-https | https://dune.com/stronk/livepeer-arbitrum |  | null | 🟡 untested-external |  |  |  |
| external-https | https://dune.com/messari/Messari:-Livepeer-Macro-Financial-Statements |  | null | 🟡 untested-external |  |  |  |
| external-https | https://messari.io/asset/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.livepeer.tools/payout/report |  | null | 🟡 untested-external |  |  |  |
| external-http | http://web3index.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer-test-broadcaster.ad-astra.video/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://interptr-latest-test-streams.vercel.app/?address=0x5bdeedca9c6346b0ce6b17ffa8227a4dace37039 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer-test-broadcaster.ad-astra.video/inference |  | null | 🟡 untested-external |  |  |  |
| external-https | https://dune.com/rickstaa/livepeer-ai |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/reference/api |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.org/primer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.youtube.com/watch?v=6nZrZHz12-g |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.youtube.com/watch?v=-gfSkX5xL-U |  | null | 🟡 untested-external |  |  |  |
| external-https | https://hedgedoc.ddvtech.com/wpwHEXMFTueUM7jqhikTvw?view |  | null | 🟡 untested-external |  |  |  |

### snippets/external/box-additional-config.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://ffmpeg.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/bluenviron/mediamtx |  | null | 🟡 untested-external |  |  |  |

### snippets/external/gwid-readme.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.org/primer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/user-attachments/assets/86f03ea8-2f3c-49c7-bc99-32bd01f4159f |  | null | 🟡 untested-external |  |  |  |
| external-https | https://obsproject.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://manycam.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.ffmpeg.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.videolan.org/vlc/index.html |  | null | 🟡 untested-external |  |  |  |
| external-https | https://exoplayer.dev/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/releases |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/user-attachments/assets/f7871bd8-d8d8-42b1-bf62-8047c7c15554 |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./publish-and-consume-content.md | snippets/external/publish-and-consume-content.md | false | missing |  |  |  |
| internal-relative | ./transcoding.md | snippets/external/transcoding.md | false | missing | v2/developers/quickstart/video/transcoding-jobs.mdx | v2/gateways/run-a-gateway/v1/transcoding-options.mdx | v1/gateways/guides/transcoding-options.mdx |
| internal-relative | ./hosted-setup.md | snippets/external/hosted-setup.md | false | missing |  |  |  |
| internal-relative | ./start-on-system-boot.md | snippets/external/start-on-system-boot.md | false | missing |  |  |  |
| internal-relative | ./architecture-summary.md | snippets/external/architecture-summary.md | false | missing |  |  |  |
| external-https | https://docs.livepeer.org/orchestrators/guides/install-go-livepeer#build-from-source |  | null | 🟡 untested-external |  |  |  |

### snippets/external/whitepaper.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #introduction-and-background |  | null | skipped |  |  |  |
| empty | #the-live-video-stack |  | null | skipped |  |  |  |
| empty | #livepeer-protocol |  | null | skipped |  |  |  |
| empty | #video-segments |  | null | skipped |  |  |  |
| empty | #livepeer-token |  | null | skipped |  |  |  |
| empty | #protocol-roles |  | null | skipped |  |  |  |
| empty | #consensus |  | null | skipped |  |  |  |
| empty | #bonding--delegation |  | null | skipped |  |  |  |
| empty | #transcoder-transaction |  | null | skipped |  |  |  |
| empty | #broadcast--transcoding-job |  | null | skipped |  |  |  |
| empty | #preprocessing |  | null | skipped |  |  |  |
| empty | #the-job |  | null | skipped |  |  |  |
| empty | #end-job |  | null | skipped |  |  |  |
| empty | #verification-of-work |  | null | skipped |  |  |  |
| empty | #a-note-on-truebit |  | null | skipped |  |  |  |
| empty | #token-generation |  | null | skipped |  |  |  |
| empty | #slashing |  | null | skipped |  |  |  |
| empty | #token-distribution |  | null | skipped |  |  |  |
| empty | #governance |  | null | skipped |  |  |  |
| empty | #attacks |  | null | skipped |  |  |  |
| empty | #consensus-attacks |  | null | skipped |  |  |  |
| empty | #ddos |  | null | skipped |  |  |  |
| empty | #useless-or-self-dealing-transcoder |  | null | skipped |  |  |  |
| empty | #transcoder-griefing |  | null | skipped |  |  |  |
| empty | #chain-reorg |  | null | skipped |  |  |  |
| empty | #live-video-distribution |  | null | skipped |  |  |  |
| empty | #use-cases |  | null | skipped |  |  |  |
| empty | #pay-as-you-go-content-consumption |  | null | skipped |  |  |  |
| empty | #auto-scaling-social-video-services |  | null | skipped |  |  |  |
| empty | #uncensorable-live-journalism |  | null | skipped |  |  |  |
| empty | #video-enabled-dapps |  | null | skipped |  |  |  |
| empty | #summary |  | null | skipped |  |  |  |
| empty | #appendix |  | null | skipped |  |  |  |
| empty | #livepeer-protocol-parameter-reference |  | null | skipped |  |  |  |
| empty | #livepeer-protocol-transaction-types |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/wiki/blob/master/STREAMFLOW.md |  | null | 🟡 untested-external |  |  |  |
| external-http | http://ethereum.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.ethswarm.org/ |  | null | 🟡 untested-external |  |  |  |
| external-http | http://ipfs.io |  | null | 🟡 untested-external |  |  |  |
| external-http | http://blockstack.org |  | null | 🟡 untested-external |  |  |  |
| external-http | http://ens.readthedocs.io/en/latest/introduction.html |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/wiki/Project-Overview |  | null | 🟡 untested-external |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| external-https | https://s3.amazonaws.com/livepeerorg/LPExample.png |  | null | 🟡 untested-external |  |  |  |
| external-https | https://developer.apple.com/library/content/documentation/General/Reference/HLSAuthoringSpec/Requirements.html#//apple_ref/doc/uid/TP40016596-CH2-SW1 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/wiki/Livepeer-Media-Server |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/wiki/Livepeer-Media-Server |  | null | 🟡 untested-external |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #token-distribution |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| external-https | https://livepeer-dev.s3.amazonaws.com/docs/lpprotocol.png |  | null | 🟡 untested-external |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #video-segments |  | null | skipped |  |  |  |
| external-http | http://truebit.io |  | null | 🟡 untested-external |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #token-distribution |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/wiki/wiki/Governance |  | null | 🟡 untested-external |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| empty | #references |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |

### snippets/external/wiki-readme.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/awesome-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/blob/master/WHITEPAPER.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/blob/master/STREAMFLOW.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/blob/master/STREAMFLOW.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/master/LIPs/LIP-73.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/arbitrum-lpt-bridge |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/tree/master |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/blob/master/spec/streamflow/spec.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/blob/master/spec/streamflow/pm.md |  | null | 🟡 untested-external |  |  |  |

### snippets/pages/01_ABOUT/concepts/actors.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### snippets/pages/01_ABOUT/concepts/network.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### snippets/pages/01_ABOUT/concepts/protocol.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### snippets/pages/04_GATEWAYS/run/quickstart/groups/docker/dockerSupport.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/blob/master/box/box.md |  | null | 🟡 untested-external |  |  |  |

### snippets/pages/04_GATEWAYS/run/quickstart/groups/linux/linuxSupport.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### snippets/pages/04_GATEWAYS/run/quickstart/views/docker/dockerOffChainTab.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | "https://hub.docker.com/r/livepeer/go-livepeer" |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/references/cli-commands | v2/gateways/references/cli-commands.mdx | true | ok |  |  |  |
| internal-rooted | /v2/gateways/references/api-reference/AI-API/ai | v2/gateways/references/api-reference/AI-API/ai.mdx | true | ok |  |  |  |

### snippets/pages/04_GATEWAYS/run/quickstart/views/docker/dockerOnChainTab.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://arbitrum.io/ |  | null | 🟡 untested-external |  |  |  |
| empty | #arbitrum-testnet |  | null | skipped |  |  |  |
| external-https | https://discord.gg/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| external-https | "https://hub.docker.com/r/livepeer/go-livepeer" |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/leaderboard |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/master/test_args.sh |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/leaderboard |  | null | 🟡 untested-external |  |  |  |

### snippets/pages/04_GATEWAYS/run/quickstart/views/linux/linuxOffChainTab.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/automations/globals/globals.mdx | snippets/automations/globals/globals.mdx | true | ok |  |  |  |
| import-path | /snippets/data/gateways/linux/code.jsx | snippets/data/gateways/linux/code.jsx | true | ok |  |  |  |

### snippets/pages/04_GATEWAYS/run/quickstart/views/linux/linuxOnChainTab.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### snippets/pages/04_GATEWAYS/run/quickstart/views/windows/windowsOffChainTab.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### snippets/pages/04_GATEWAYS/run/quickstart/views/windows/windowsOnChainTab.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### snippets/pages/05_GPUS/Diagrams/orchestratorRole.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/shtukaresearch/livepeer-data-geography/tree/main/roles |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/shtukaresearch/livepeer-data-geography/tree/main/roles |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/about/core-concepts.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/pages/01_ABOUT/concepts/protocol.mdx | snippets/pages/01_ABOUT/concepts/protocol.mdx | true | ok |  |  |  |
| import-path | /snippets/pages/01_ABOUT/concepts/network.mdx | snippets/pages/01_ABOUT/concepts/network.mdx | true | ok |  |  |  |
| import-path | /snippets/pages/01_ABOUT/concepts/actors.mdx | snippets/pages/01_ABOUT/concepts/actors.mdx | true | ok |  |  |  |

### v2/about/core-concepts/concepts/actors.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/about/faq-about.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | # |  | null | skipped |  |  |  |
| internal-relative | livepeer-protocol/technical-architecture | v2/about/livepeer-protocol/technical-architecture.mdx | true | ok |  |  |  |
| internal-relative | livepeer-protocol/core-mechanisms | v2/about/livepeer-protocol/core-mechanisms.mdx | true | ok |  |  |  |
| internal-relative | resources/blockchain-contracts | v2/about/resources/blockchain-contracts.mdx | true | ok |  |  |  |
| internal-relative | livepeer-protocol/protocol-economics | v2/about/livepeer-protocol/protocol-economics | false | missing | v2/x-pages/01_about/livepeer-protocol/protocol-economics.mdx |  |  |
| internal-relative | livepeer-network/overview | v2/about/livepeer-network/overview.mdx | true | ok |  |  |  |
| internal-relative | livepeer-network/technical-architecture | v2/about/livepeer-network/technical-architecture.mdx | true | ok |  |  |  |

### v2/about/livepeer-network/actors.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./livepeer-actors/gateways | v2/about/livepeer-network/livepeer-actors/gateways.mdx | true | ok |  |  |  |
| internal-rooted | /v2/pages/05_orchestrators/orchestrators-portal | v2/x-pages/05_orchestrators/orchestrators-portal.mdx | true | ok |  |  |  |
| internal-relative | ./livepeer-actors/delegators | v2/about/livepeer-network/livepeer-actors/delegators.mdx | true | ok |  |  |  |
| internal-relative | ./livepeer-actors/end-users | v2/about/livepeer-network/livepeer-actors/end-users.mdx | true | ok |  |  |  |
| internal-relative | ./demand-side | v2/about/livepeer-network/demand-side.mdx | true | ok |  |  |  |
| internal-relative | ./supply-side | v2/about/livepeer-network/supply-side.mdx | true | ok |  |  |  |
| internal-relative | ./job-lifecycle | v2/about/livepeer-network/job-lifecycle.mdx | true | ok |  |  |  |

### v2/about/livepeer-network/demand-side.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/about/livepeer-network/fee-flow.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/about/livepeer-network/interfaces.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/master/proto/gateway.proto |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/js-sdk |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../resources/blockchain-contracts | v2/about/resources/blockchain-contracts.mdx | true | ok |  |  |  |
| internal-relative | ./technical-architecture | v2/about/livepeer-network/technical-architecture.mdx | true | ok |  |  |  |
| internal-relative | ./marketplace | v2/about/livepeer-network/marketplace.mdx | true | ok |  |  |  |
| internal-relative | ./job-lifecycle | v2/about/livepeer-network/job-lifecycle.mdx | true | ok |  |  |  |
| internal-relative | ../resources/blockchain-contracts | v2/about/resources/blockchain-contracts.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/graphql |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/js-sdk |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/tree/master/abi |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/about/livepeer-network/job-lifecycle.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |

### v2/about/livepeer-network/livepeer-actors/delegators.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../../livepeer-protocol/livepeer-token | v2/about/livepeer-protocol/livepeer-token.mdx | true | ok |  |  |  |
| internal-relative | ../../livepeer-protocol/protocol-economics | v2/about/livepeer-protocol/protocol-economics | false | missing | v2/x-pages/01_about/livepeer-protocol/protocol-economics.mdx |  |  |
| internal-rooted | /v2/pages/05_orchestrators/orchestrators-portal | v2/x-pages/05_orchestrators/orchestrators-portal.mdx | true | ok |  |  |  |

### v2/about/livepeer-network/livepeer-actors/end-users.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../demand-side | v2/about/livepeer-network/demand-side.mdx | true | ok |  |  |  |
| internal-relative | ./gateways | v2/about/livepeer-network/livepeer-actors/gateways.mdx | true | ok |  |  |  |
| internal-relative | ../overview | v2/about/livepeer-network/overview.mdx | true | ok |  |  |  |

### v2/about/livepeer-network/livepeer-actors/gateways.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /v2/pages/05_orchestrators/orchestrators-portal | v2/x-pages/05_orchestrators/orchestrators-portal.mdx | true | ok |  |  |  |
| internal-relative | ../job-lifecycle | v2/about/livepeer-network/job-lifecycle.mdx | true | ok |  |  |  |
| internal-relative | ../demand-side | v2/about/livepeer-network/demand-side.mdx | true | ok |  |  |  |

### v2/about/livepeer-network/livepeer-actors/orchestrators.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./gateways | v2/about/livepeer-network/livepeer-actors/gateways.mdx | true | ok |  |  |  |
| internal-relative | ../supply-side | v2/about/livepeer-network/supply-side.mdx | true | ok |  |  |  |
| internal-relative | ../fee-flow | v2/about/livepeer-network/fee-flow.mdx | true | ok |  |  |  |

### v2/about/livepeer-network/marketplace.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://forum.livepeer.org/c/lips/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/c/lips/ |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../resources/technical-roadmap | v2/about/resources/technical-roadmap.mdx | true | ok |  |  |  |
| internal-relative | ./job-lifecycle | v2/about/livepeer-network/job-lifecycle.mdx | true | ok |  |  |  |
| internal-relative | ./actors | v2/about/livepeer-network/actors.mdx | true | ok |  |  |  |
| internal-relative | ../livepeer-protocol/overview | v2/about/livepeer-protocol/overview.mdx | true | ok |  |  |  |
| internal-relative | ../resources/blockchain-contracts | v2/about/resources/blockchain-contracts.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/tree/master/contracts/job |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/pages/05_orchestrators/orchestrators-portal | v2/x-pages/05_orchestrators/orchestrators-portal.mdx | true | ok |  |  |  |
| external-https | https://forum.livepeer.org/c/lips/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/real-time-ai-comfyui |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/about/livepeer-network/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/about/livepeer-network/scaling.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/about/livepeer-network/supply-side.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/about/livepeer-network/technical-architecture.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/studio-gateway |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/daydream |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/cascade |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/js-sdk |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./job-lifecycle | v2/about/livepeer-network/job-lifecycle.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/orchestrator-on-aws |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/studio-gateway-deploy |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/daydream |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./interfaces | v2/about/livepeer-network/interfaces.mdx | true | ok |  |  |  |
| internal-relative | ./marketplace | v2/about/livepeer-network/marketplace.mdx | true | ok |  |  |  |
| internal-relative | ./job-lifecycle | v2/about/livepeer-network/job-lifecycle.mdx | true | ok |  |  |  |
| internal-relative | ../livepeer-protocol/technical-architecture | v2/about/livepeer-protocol/technical-architecture.mdx | true | ok |  |  |  |
| internal-relative | ../resources/blockchain-contracts | v2/about/resources/blockchain-contracts.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/pages/05_orchestrators/orchestrators-portal | v2/x-pages/05_orchestrators/orchestrators-portal.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/daydream |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/about/livepeer-overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /about/mental-model | v2/about/mental-model.mdx | true | ok |  |  |  |
| internal-rooted | /v2/pages/05_orchestrators/orchestrators-portal | v2/x-pages/05_orchestrators/orchestrators-portal.mdx | true | ok |  |  |  |
| internal-rooted | /gateways/gateways-portal | v2/gateways/gateways-portal.mdx | true | ok |  |  |  |
| internal-rooted | /lpt/token-portal | v2/lpt/token-portal.mdx | true | ok |  |  |  |
| internal-rooted | /developers/portal | v2/developers/portal.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/assets/media/images/Livepeer%20Stats.png | snippets/assets/media/images/Livepeer Stats.png | true | ok |  |  |  |
| import-path | /snippets/components/layout/quadGrid.jsx | snippets/components/layout/quadGrid.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/about/livepeer-protocol/core-mechanisms.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://forum.livepeer.org/t/transcoding-verification-improvements-fast-full-verification/1499 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/deploy/deploy_contracts.ts |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/bonding/BondingManager.sol#L23-L449 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/responseField.jsx | snippets/components/content/responseField.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |

### v2/about/livepeer-protocol/economics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #0-13 |  | null | skipped |  |  |  |
| empty | #0-14 |  | null | skipped |  |  |  |
| empty | #0-15 |  | null | skipped |  |  |  |
| empty | #0-16 |  | null | skipped |  |  |  |
| empty | #0-17 |  | null | skipped |  |  |  |

### v2/about/livepeer-protocol/governance-model.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/governance/Governor.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://eips.ethereum.org/EIPS/eip-1 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0089.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0092.md |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./treasury | v2/about/livepeer-protocol/treasury.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0073.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0034.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0035.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0040.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0083.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0100.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0015.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0016.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0019.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0025.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0019.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0025.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0001.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0015.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0069.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0019.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0025.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0073.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0074.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0089.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0090.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0091.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0092.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0034.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0035.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0040.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0083.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0100.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0003.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0008.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0009.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0011.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0036.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0052.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.openzeppelin.com/contracts/4.x/api/governance#governor |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.openzeppelin.com/contracts/4.x/api/governance#governorsettings |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./treasury | v2/about/livepeer-protocol/treasury.mdx | true | ok |  |  |  |
| internal-rooted | /v2/home/about-livepeer/ecosystem#livepeer-foundation | v2/home/about-livepeer/ecosystem.mdx | true | ok |  |  |  |
| internal-rooted | /v2/home/about-livepeer/ecosystem#special-purpose-entities | v2/home/about-livepeer/ecosystem.mdx | true | ok |  |  |  |
| external-https | https://discord.com/channels/423160867534929930/686685097935503397 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/lips |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/voting |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/c/lips/18 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/c/lips/18 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/voting |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/about/livepeer-protocol/governance-model | v2/about/livepeer-protocol/governance-model.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/about/livepeer-protocol/livepeer-token.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://messari.io/report/merkle-mine |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/merkle-mine |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.livepeer.org/lpt |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/merkle-mine |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.livepeer.org/explorer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.livepeer.org/lpt |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/token/0x58b6a8a3302369daec31a0680985978a9d54189c |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/livepeer-token-design-3000/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |

### v2/about/livepeer-protocol/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://tokenflows.xyz/tutorials/introduction-tutorials/module3/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://oyc.yale.edu/economics/econ-159 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/blob/master/WHITEPAPER.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://eips.ethereum.org/EIPS/eip-1967 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.openzeppelin.com/contracts/4.x/upgradeable#how_proxy_works |  | null | 🟡 untested-external |  |  |  |
| external-https | https://wikipedia.com/wiki/Protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbitrum.io/ |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/resources/references/contract-addresses | v2/resources/references/contract-addresses.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./core-mechanisms | v2/about/livepeer-protocol/core-mechanisms.mdx | true | ok |  |  |  |
| internal-relative | ./livepeer-token | v2/about/livepeer-protocol/livepeer-token.mdx | true | ok |  |  |  |
| internal-relative | ./governance-model | v2/about/livepeer-protocol/governance-model.mdx | true | ok |  |  |  |
| internal-relative | ./treasury | v2/about/livepeer-protocol/treasury.mdx | true | ok |  |  |  |
| internal-relative | ./protocol-economics | v2/about/livepeer-protocol/protocol-economics | false | skipped-allowlisted |  |  |  |
| internal-relative | ./technical-architecture | v2/about/livepeer-protocol/technical-architecture.mdx | true | ok |  |  |  |
| internal-relative | ../resources/livepeer-whitepaper | v2/about/resources/livepeer-whitepaper.mdx | true | ok |  |  |  |
| internal-relative | ../resources/blockchain-contracts | v2/about/resources/blockchain-contracts.mdx | true | ok |  |  |  |
| internal-rooted | /v2/resources/references/contract-addresses | v2/resources/references/contract-addresses.mdx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |

### v2/about/livepeer-protocol/technical-architecture.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.notion.so/livepeer/Livepeer-Protocol-Reward-Calculation-2320a34856878026adb0e7bcb7521661 |  | null | 🟡 untested-external |  |  |  |
| external-https | "https://www.notion.so/livepeer/Livepeer-Rewards-Accumulation-Mechanism-23e0a348568780199f26f8cbc3c2d231" |  | null | 🟡 untested-external |  |  |  |
| external-https | "https://www.notion.so/livepeer/Livepeer-L1-L2-Migration-Report-Complete-Technical-Overview-2b10a348568780a28b59df9d8710bff9" |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /snippets/assets/domain/01_ABOUT/ProtocolNodeDiagram.png | snippets/assets/domain/01_ABOUT/ProtocolNodeDiagram.png | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/image.jsx | snippets/components/display/image.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |

### v2/about/livepeer-protocol/treasury.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0089.md |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./treasury | v2/about/livepeer-protocol/treasury.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0089.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0092.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0092.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0090.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0073.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0077.md |  | null | 🟡 untested-external |  |  |  |
| internal-relative | governance-model | v2/about/livepeer-protocol/governance-model.mdx | true | ok |  |  |  |
| external-https | https://explorer.livepeer.org/treasury |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x363cdB9BaE210Ef182c60b5a496139E980330127#code |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x363cdB9BaE210Ef182c60b5a496139E980330127#code |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/c/treasury/20 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/c/treasury/20 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/treasury-grant-process/3250 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/quadratic-funding/3251 |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/lpt/treasury/overview | v2/lpt/treasury/overview.mdx | true | ok |  |  |  |
| external-https | https://explorer.livepeer.org/treasury |  | null | 🟡 untested-external |  |  |  |
| external-https | https://dune.com/dob/livepeer-treasury |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/treasury |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x363cdB9BaE210Ef182c60b5a496139E980330127#code |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/lpt/treasury/overview | v2/lpt/treasury/overview.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/master/LIPs/LIP-89.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/lip-92-livepeer-treasury-contribution-percentage/3249 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/treasury |  | null | 🟡 untested-external |  |  |  |
| external-https | https://messari.io/asset/livepeer/reports |  | null | 🟡 untested-external |  |  |  |
| external-https | https://dune.com/dob/livepeer-treasury |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.karmahq.xyz/community/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x363cdB9BaE210Ef182c60b5a496139E980330127#code |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/governance/Treasury.sol |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |

### v2/about/mental-model.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://en.wikipedia.org/wiki/OSI_model |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../platforms/portal | v2/platforms/portal.mdx | true | ok |  |  |  |
| internal-rooted | /v2/home/solutions/showcase | v2/home/solutions/showcase.mdx | true | ok |  |  |  |
| internal-rooted | /v2/home/solutions/showcase | v2/home/solutions/showcase.mdx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/text.jsx | snippets/components/layout/text.jsx | true | ok |  |  |  |

### v2/about/portal.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://en.wikipedia.org/wiki/OSI_model |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./livepeer-network/overview | v2/about/livepeer-network/overview.mdx | true | ok |  |  |  |
| internal-relative | ./livepeer-network/overview | v2/about/livepeer-network/overview.mdx | true | ok |  |  |  |
| internal-relative | ./livepeer-network/overview | v2/about/livepeer-network/overview.mdx | true | ok |  |  |  |
| internal-relative | ./livepeer-network/overview | v2/about/livepeer-network/overview.mdx | true | ok |  |  |  |
| internal-relative | ./livepeer-network/overview | v2/about/livepeer-network/overview.mdx | true | ok |  |  |  |
| internal-relative | ./livepeer-network/overview | v2/about/livepeer-network/overview.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/Portals.jsx | snippets/components/domain/SHARED/Portals.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/frameMode.jsx | snippets/components/display/frameMode.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/HeroGif.jsx | snippets/components/domain/SHARED/HeroGif.jsx | true | ok |  |  |  |

### v2/about/resources/blockchain-contracts.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/deploy/deploy_contracts.ts |  | null | 🟡 untested-external |  |  |  |
| external-https | https://en.wikipedia.org/wiki/Keccak#Keccak-256 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/bonding/BondingManager.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/ticket/TicketBroker.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/RoundsManager.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/Minter.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/service/ServiceRegistry.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/MerkleSnapshot.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/token/LivepeerToken.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://eips.ethereum.org/EIPS/eip-20 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/token/BridgeMinter.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/token/LivepeerTokenFaucet.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/governance/Governor.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/governance/LivepeerGovernor.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol/blob/e8b6243c/contracts/governance/Treasury.sol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xD8E8328501E9645d16Cf49539efC04f734606ee4 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://media1.tenor.com/m/_vT9Qzw03N4AAAAd/sir-topham-hatt-topham.gif |  | null | 🟡 untested-external |  |  |  |
| external-https | https://tenor.com/view/sir-topham-hatt-the-fat-controller-sir-toping-hat-happy-bald-gif-6999538172963206619 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x0000000000000000000000000000000000000000 |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/image.jsx | snippets/components/display/image.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |

### v2/about/resources/gateways-vs-orchestrators.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/about/resources/livepeer-glossary.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol |  | null | 🟡 untested-external |  |  |  |

### v2/about/resources/livepeer-whitepaper.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://messari.io/report/merkle-mine |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/merkle-mine |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/merkle-mine |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/blob/master/WHITEPAPER.md |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/external/whitepaper.mdx | snippets/external/whitepaper.mdx | true | ok |  |  |  |
| import-path | /snippets/components/content/external-content.jsx | snippets/components/content/external-content.jsx | true | ok |  |  |  |

### v2/about/resources/technical-roadmap.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/_move_me/livepeer-hubs/livepeer-builder-hub.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/_move_me/livepeer-hubs/livepeer-partner-hub.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/_move_me/livepeer-partners/livepeer-builder-hub.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/_move_me/livepeer-partners/livepeer-partner-hub.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/community-portal.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://discord.gg/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.com/events/423160867534929930/1394387788568203274 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://x.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.youtube.com/@livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://luma.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.com/events/423160867534929930/1394387788568203274 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://t.me/livepeerorg |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.reddit.com/r/livepeer/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.youtube.com/@livepeer |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/domain/SHARED/Portals.jsx | snippets/components/domain/SHARED/Portals.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/frameMode.jsx | snippets/components/display/frameMode.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/HeroGif.jsx | snippets/components/domain/SHARED/HeroGif.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |

### v2/community/faq.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/livepeer-community/community-guidelines.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/livepeer-community/livepeer-latest-topics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.youtube.com/@livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://x.com/Livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/data.jsx | snippets/components/content/data.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/embed.jsx | snippets/components/display/embed.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/forum/forumData.jsx | snippets/automations/forum/forumData.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/blog/ghostBlogData.jsx | snippets/automations/blog/ghostBlogData.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/youtube/youtubeData.jsx | snippets/automations/youtube/youtubeData.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/discord/discordAnnouncementsData.jsx | snippets/automations/discord/discordAnnouncementsData.jsx | true | ok |  |  |  |

### v2/community/livepeer-community/roadmap.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.nvidia.com/en-us/glossary/world-models/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://roadmap.livepeer.org/roadmap |  | null | 🟡 untested-external |  |  |  |
| external-https | https://roadmap.livepeer.org/roadmap |  | null | 🟡 untested-external |  |  |  |
| external-https | https://roadmap.livepeer.org/roadmap |  | null | 🟡 untested-external |  |  |  |

### v2/community/livepeer-community/trending-topics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://download.com |  | null | 🟡 untested-external |  |  |  |
| external-https | https://download.com |  | null | 🟡 untested-external |  |  |  |
| external-https | https://download.com |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.youtube.com/@livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://x.com/Livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.youtube.com/watch?v=-iO7HsR3KE4&#x26;list=PLkw6hm1fcjtF1OYFCF20AwBUtGygQxTQV&#x26;index=3 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.google.com/presentation/d/1Qg6u1Ns1RU2Gw4m-dzGu_WeKx9z0v5HcbHTpWwA91Yw/embed |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/data.jsx | snippets/components/content/data.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/embed.jsx | snippets/components/display/embed.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/forum/forumData.jsx | snippets/automations/forum/forumData.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/blog/ghostBlogData.jsx | snippets/automations/blog/ghostBlogData.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/youtube/youtubeData.jsx | snippets/automations/youtube/youtubeData.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/discord/discordAnnouncementsData.jsx | snippets/automations/discord/discordAnnouncementsData.jsx | true | ok |  |  |  |

### v2/community/livepeer-connect/events-and-community-streams.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://luma.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://lu.ma/embed/calendar/cal-giBner4VGLXeKjy/events?period=all |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/automations/luma/lumaEventsData.jsx | snippets/automations/luma/lumaEventsData.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/data.jsx | snippets/components/content/data.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/community/livepeer-connect/forums-and-discussions.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/livepeer-connect/news-and-socials.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/livepeer-contribute/build-livepeer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/livepeer-contribute/contribute.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/livepeer-contribute/opportunities.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/resources/awesome-livepeer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/resources/dashboards.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/community/resources/guides.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/ai-inference-on-livepeer/byoc.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #0-0 |  | null | skipped |  |  |  |
| empty | #0-1 |  | null | skipped |  |  |  |
| empty | #0-2 |  | null | skipped |  |  |  |
| empty | #0-3 |  | null | skipped |  |  |  |
| empty | #0-4 |  | null | skipped |  |  |  |
| empty | #0-5 |  | null | skipped |  |  |  |
| empty | #0-6 |  | null | skipped |  |  |  |
| empty | #0-7 |  | null | skipped |  |  |  |
| empty | #0-8 |  | null | skipped |  |  |  |
| empty | #0-9 |  | null | skipped |  |  |  |
| empty | #0-10 |  | null | skipped |  |  |  |
| empty | #0-11 |  | null | skipped |  |  |  |
| empty | #0-12 |  | null | skipped |  |  |  |
| empty | #0-13 |  | null | skipped |  |  |  |
| empty | #0-14 |  | null | skipped |  |  |  |
| empty | #0-15 |  | null | skipped |  |  |  |
| empty | #0-16 |  | null | skipped |  |  |  |
| internal-rooted | /v2/gateways/references/go-livepeer/cli-reference | v2/gateways/references/go-livepeer/cli-reference.mdx | true | ok |  |  |  |
| internal-rooted | /v2/gateways/references/go-livepeer/cli-reference | v2/gateways/references/go-livepeer/cli-reference.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/ai-runner |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/Roaring30s/livepeer-byoc |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/ai-runner |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/pytrickle |  | null | 🟡 untested-external |  |  |  |

### v2/developers/ai-inference-on-livepeer/comfystream.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://deepwiki.com/livepeer/comfystream |  | null | 🟡 untested-external |  |  |  |
| external-https | https://deepwiki.com/livepeer/comfystream |  | null | 🟡 untested-external |  |  |  |

### v2/developers/ai-inference-on-livepeer/comfyui.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/ai-inference-on-livepeer/livepeer-ai/README.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/ai-inference-on-livepeer/livepeer-ai/ai-101.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/ai-inference-on-livepeer/livepeer-ai/ai-apis-move-to-tech-section/README.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/ai-inference-on-livepeer/livepeer-ai/ai-apis-move-to-tech-section/api-reference.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/ai-inference-on-livepeer/livepeer-ai/custom-ai-pipelines.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/ai-inference-on-livepeer/livepeer-ai/daydream-generative-ai-video-platform.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/ai-inference-on-livepeer/livepeer-ai/livepeer-ai-content-directory.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://mirror.xyz/livepeer.eth/7G0T99UIVXbFffvGoDqDnsMq4vJTpDSPtrBZj5xFKwo |  | null | 🟡 untested-external |  |  |  |
| external-https | https://mirror.xyz/livepeer.eth/7G0T99UIVXbFffvGoDqDnsMq4vJTpDSPtrBZj5xFKwo |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/Building the Decentralized Generative AI Tech Stack.png | snippets/assets/domain/00_HOME/Building the Decentralized Generative AI Tech Stack.png | true | ok |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/Building the Decentralized Generative AI Tech Stack.png | snippets/assets/domain/00_HOME/Building the Decentralized Generative AI Tech Stack.png | true | ok |  |  |  |
| external-https | https://mirror.xyz/livepeer.eth/bCruUtv0PJWWlFxfbCMATGM_h15hUncwvyFW1A3z7Ag |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/Introducing Livepeer Cascade - A Vision For Livepeer’s Future in the Age of Real-Time AI Video.png | snippets/assets/domain/00_HOME/Introducing Livepeer Cascade - A Vision For Livepeer’s Future in the Age of Real-Time AI Video.png | true | ok |  |  |  |

### v2/developers/ai-inference-on-livepeer/livepeer-ai/overview-ai-on-livepeer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://mirror.xyz/livepeer.eth/bCruUtv0PJWWlFxfbCMATGM_h15hUncwvyFW1A3z7Ag |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/Eric Shreck Gif.gif | snippets/assets/domain/00_HOME/Eric Shreck Gif.gif | true | ok |  |  |  |

### v2/developers/ai-inference-on-livepeer/livepeer-ai/realtime-ai.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/ai-inference-on-livepeer/livepeer-ai/using-ai-on-livepeer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/ai-pipelines/byoc.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../ai-inference-on-livepeer/byoc | v2/developers/ai-inference-on-livepeer/byoc.mdx | true | ok |  |  |  |
| internal-relative | ./overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-relative | ./comfystream | v2/developers/ai-pipelines/comfystream.mdx | true | ok |  |  |  |
| internal-relative | ../ai-inference-on-livepeer/byoc | v2/developers/ai-inference-on-livepeer/byoc.mdx | true | ok |  |  |  |
| internal-rooted | /v2/about/livepeer-network/interfaces | v2/about/livepeer-network/interfaces.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/comfystream |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/model-registry |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/ai |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |

### v2/developers/ai-pipelines/comfystream.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/comfyanonymous/ComfyUI |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../ai-inference-on-livepeer/comfystream | v2/developers/ai-inference-on-livepeer/comfystream.mdx | true | ok |  |  |  |
| internal-relative | ./overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-relative | ./byoc | v2/developers/ai-pipelines/byoc.mdx | true | ok |  |  |  |
| internal-relative | ../ai-inference-on-livepeer/comfystream | v2/developers/ai-inference-on-livepeer/comfystream.mdx | true | ok |  |  |  |
| internal-rooted | /v2/about/livepeer-network/technical-architecture | v2/about/livepeer-network/technical-architecture.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/comfystream |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./byoc | v2/developers/ai-pipelines/byoc.mdx | true | ok |  |  |  |
| external-https | https://forum.livepeer.org/t/comfystream-nodes |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/ai |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |

### v2/developers/ai-pipelines/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/comfystream |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./byoc | v2/developers/ai-pipelines/byoc.mdx | true | ok |  |  |  |
| internal-relative | ./byoc | v2/developers/ai-pipelines/byoc.mdx | true | ok |  |  |  |
| internal-relative | ./comfystream | v2/developers/ai-pipelines/comfystream.mdx | true | ok |  |  |  |
| internal-relative | ../ai-inference-on-livepeer/livepeer-ai/overview-ai-on-livepeer | v2/developers/ai-inference-on-livepeer/livepeer-ai/overview-ai-on-livepeer.mdx | true | ok |  |  |  |
| internal-rooted | /v2/about/livepeer-network/technical-architecture | v2/about/livepeer-network/technical-architecture.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/comfystream |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/ai |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/example-pipelines |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |

### v2/developers/builder-opportunities/dev-programs.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.livepeer.org/dev-hub |  | null | 🟡 untested-external |  |  |  |

### v2/developers/builder-opportunities/livepeer-rfps.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/builder-opportunities/oss-contributions.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/building-on-livepeer/quick-starts/README.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/developer-guide.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.livepeer.org/dev-hub |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./developer-journey | v2/developers/developer-journey.mdx | true | ok |  |  |  |
| internal-rooted | /v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/README | v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/README.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |

### v2/developers/developer-journey.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/developer-platforms/all-ecosystem/ecosystem-products.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/developer-platforms/builder-hub.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./daydream/daydream | v2/developers/developer-platforms/daydream/daydream.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/assets/logos/products/daydream-logo-dark.svg | snippets/assets/logos/products/daydream-logo-dark.svg | true | ok |  |  |  |
| internal-relative | ./livepeer-studio/livepeer-studio | v2/developers/developer-platforms/livepeer-studio/livepeer-studio.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/assets/logos/products/livepeer-studio-logo.svg | snippets/assets/logos/products/livepeer-studio-logo.svg | true | ok |  |  |  |
| internal-relative | ./frameworks/frameworks | v2/developers/developer-platforms/frameworks/frameworks.mdx | true | ok |  |  |  |
| external-https | https://frameworks.network/frameworks-dark-horizontal-lockup-transparent.svg |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./streamplace/streamplace | v2/developers/developer-platforms/streamplace/streamplace.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/assets/logos/products/streamplace-logo.svg | snippets/assets/logos/products/streamplace-logo.svg | true | ok |  |  |  |
| internal-relative | ./all-ecosystem/ecosystem-products | v2/developers/developer-platforms/all-ecosystem/ecosystem-products.mdx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/developers/developer-platforms/daydream/daydream.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/developer-platforms/frameworks/frameworks.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/developer-platforms/livepeer-studio/livepeer-studio.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/developer-platforms/streamplace/streamplace-architecture.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-guide | v2/platforms/streamplace/introduction/streamplace-guide.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-provenance | v2/platforms/streamplace/introduction/streamplace-provenance.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-funding-model | v2/platforms/streamplace/introduction/streamplace-funding-model.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-integration | v2/platforms/streamplace/introduction/streamplace-integration.mdx | true | ok |  |  |  |

### v2/developers/developer-platforms/streamplace/streamplace-funding-model.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-architecture | v2/platforms/streamplace/introduction/streamplace-architecture.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-provenance | v2/platforms/streamplace/introduction/streamplace-provenance.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-integration | v2/platforms/streamplace/introduction/streamplace-integration.mdx | true | ok |  |  |  |

### v2/developers/developer-platforms/streamplace/streamplace-guide.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-architecture | v2/platforms/streamplace/introduction/streamplace-architecture.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-provenance | v2/platforms/streamplace/introduction/streamplace-provenance.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-integration | v2/platforms/streamplace/introduction/streamplace-integration.mdx | true | ok |  |  |  |

### v2/developers/developer-platforms/streamplace/streamplace-integration.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-guide | v2/platforms/streamplace/introduction/streamplace-guide.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-architecture | v2/platforms/streamplace/introduction/streamplace-architecture.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-provenance | v2/platforms/streamplace/introduction/streamplace-provenance.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-funding-model | v2/platforms/streamplace/introduction/streamplace-funding-model.mdx | true | ok |  |  |  |

### v2/developers/developer-platforms/streamplace/streamplace-provenance.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://spec.c2pa.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://stream.place/docs/video-metadata/metadata-record/ |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-guide | v2/platforms/streamplace/introduction/streamplace-guide.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-architecture | v2/platforms/streamplace/introduction/streamplace-architecture.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-funding-model | v2/platforms/streamplace/introduction/streamplace-funding-model.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-integration | v2/platforms/streamplace/introduction/streamplace-integration.mdx | true | ok |  |  |  |

### v2/developers/developer-platforms/streamplace/streamplace.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/streamplace/introduction/streamplace-guide | v2/platforms/streamplace/introduction/streamplace-guide.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-architecture | v2/platforms/streamplace/introduction/streamplace-architecture.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-provenance | v2/platforms/streamplace/introduction/streamplace-provenance.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-funding-model | v2/platforms/streamplace/introduction/streamplace-funding-model.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-integration | v2/platforms/streamplace/introduction/streamplace-integration.mdx | true | ok |  |  |  |

### v2/developers/developer-tools/dashboards.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/developer-tools/external-tooling.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/developer-tools/gateways.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/developer-tools/livepeer-cloud.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.cloud |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.livepeer.tools |  | null | 🟡 untested-external |  |  |  |

### v2/developers/developer-tools/livepeer-explorer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://explorer.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |

### v2/developers/developer-tools/tooling-hub.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./livepeer-explorer | v2/developers/developer-tools/livepeer-explorer.mdx | true | ok |  |  |  |

### v2/developers/guides-and-resources/contribution-guide.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://contributors-spotlight.rickstaa.dev/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://contributors-spotlight.rickstaa.dev/ |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/developers/guides-and-resources/developer-guides.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/guides-and-resources/developer-help.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/guides-and-resources/resources.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/guides/partner-integrations.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /v2/home/solutions/showcase | v2/home/solutions/showcase.mdx | true | ok |  |  |  |
| internal-relative | ../../platforms/portal | v2/platforms/portal.mdx | true | ok |  |  |  |
| empty | #livepeer-network |  | null | skipped |  |  |  |
| empty | #livepeer-partners |  | null | skipped |  |  |  |
| empty | #livepeer-ecosystem-projects |  | null | skipped |  |  |  |
| empty | #livepeer-community |  | null | skipped |  |  |  |

### v2/developers/livepeer-real-time-video/page-1.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/README.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/frameworks-spe.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/streamdiffusion.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/video-streaming-101.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/moved-to-about-livepeer-protocol/livepeer-actors/README.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/moved-to-about-livepeer-protocol/livepeer-actors/delegators.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/moved-to-about-livepeer-protocol/livepeer-actors/end-users.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/moved-to-about-livepeer-protocol/livepeer-actors/gateways.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/moved-to-about-livepeer-protocol/livepeer-actors/orchestrators.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/moved-to-about-livepeer-protocol/livepeer-governance.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://discord.com/channels/423160867534929930/686685097935503397 |  | null | 🟡 untested-external |  |  |  |

### v2/developers/moved-to-about-livepeer-protocol/livepeer-protocol/README.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/moved-to-about-livepeer-protocol/livepeer-protocol/livepeer-whitepaper.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/moved-to-about-livepeer-protocol/livepeer-protocol/technical-overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/moved-to-about-livepeer-protocol/livepeer-token-economics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.livepeer.org/lpt |  | null | 🟡 untested-external |  |  |  |

### v2/developers/moved-to-about-livepeer-protocol/technical-roadmap.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/developers/portal.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #whats-a-gateway |  | null | skipped |  |  |  |
| empty | #gateway-services--providers |  | null | skipped |  |  |  |
| empty | #run-a-gateway |  | null | skipped |  |  |  |
| empty | #gateway-tools--dashboards |  | null | skipped |  |  |  |
| empty | #gateway-guides--resources |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/awesome-livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./livepeer-real-time-video/video-streaming-on-livepeer | v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/README.mdx | true | ok |  |  |  |
| internal-relative | ./ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-relative | ./developer-platforms/builder-hub | v2/developers/developer-platforms/builder-hub.mdx | true | ok |  |  |  |
| internal-relative | ./developer-journey | v2/developers/developer-journey.mdx | true | ok |  |  |  |
| internal-rooted | /community/livepeer-contribute/contribute | v2/community/livepeer-contribute/contribute.mdx | true | ok |  |  |  |
| internal-relative | ./builder-opportunities/livepeer-rfps | v2/developers/builder-opportunities/livepeer-rfps.mdx | true | ok |  |  |  |
| internal-relative | ./developer-tools/tooling-hub | v2/developers/developer-tools/tooling-hub.mdx | true | ok |  |  |  |
| internal-relative | ./guides-and-resources/developer-guides | v2/developers/guides-and-resources/developer-guides.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/Portals.jsx | snippets/components/domain/SHARED/Portals.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/frameMode.jsx | snippets/components/display/frameMode.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/HeroGif.jsx | snippets/components/domain/SHARED/HeroGif.jsx | true | ok |  |  |  |

### v2/developers/quickstart/ai/ai-jobs.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /gateways/references/api-reference/AI-API/ai | v2/gateways/references/api-reference/AI-API/ai.mdx | true | ok |  |  |  |
| internal-rooted | /gateways/references/api-reference/AI-API/text-to-image | v2/gateways/references/api-reference/AI-API/text-to-image.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/byoc | v2/developers/ai-pipelines/byoc.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/docs/blob/main/api/gateway.openapi.yaml |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/ai-runner/blob/main/gateway.openapi.yaml |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/ai-runner/blob/main/README.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://deepwiki.com/livepeer/ai-runner |  | null | 🟡 untested-external |  |  |  |

### v2/developers/quickstart/ai/ai-pipelines.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./ai-jobs | v2/developers/quickstart/ai/ai-jobs.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-pipelines/byoc | v2/developers/ai-pipelines/byoc.mdx | true | ok |  |  |  |
| internal-rooted | /gateways/references/api-reference/AI-API/ai | v2/gateways/references/api-reference/AI-API/ai.mdx | true | ok |  |  |  |
| internal-rooted | /gateways/references/api-reference/AI-API/text-to-image | v2/gateways/references/api-reference/AI-API/text-to-image.mdx | true | ok |  |  |  |
| internal-rooted | /gateways/references/api-reference/AI-API/health | v2/gateways/references/api-reference/AI-API/health.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/ai-runner |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./ai-jobs | v2/developers/quickstart/ai/ai-jobs.mdx | true | ok |  |  |  |

### v2/developers/quickstart/video/transcoding-jobs.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/livepeer-studio/api-reference/transcode/create | v2/platforms/livepeer-studio/api-reference/transcode/create.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/api-reference/transcode/overview | v2/platforms/livepeer-studio/api-reference/transcode/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/api-reference/tasks/overview | v2/platforms/livepeer-studio/api-reference/tasks/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/api-reference/tasks/get | v2/platforms/livepeer-studio/api-reference/tasks/get.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/reference/api | v2/platforms/livepeer-studio/reference/api.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/reference/sdks | v2/platforms/livepeer-studio/reference/sdks.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/docs/blob/main/api/studio.yaml |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/docs/blob/main/api/gateway.openapi.yaml |  | null | 🟡 untested-external |  |  |  |
| external-https | https://deepwiki.com/livepeer/docs |  | null | 🟡 untested-external |  |  |  |

### v2/developers/quickstart/video/video-streaming.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /developers/livepeer-real-time-video/video-streaming-on-livepeer/README | v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/README.mdx | true | ok |  |  |  |
| internal-relative | ./transcoding-jobs | v2/developers/quickstart/video/transcoding-jobs.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/quickstart | v2/platforms/livepeer-studio/quickstart.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/reference/api | v2/platforms/livepeer-studio/reference/api.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/api-reference/transcode/overview | v2/platforms/livepeer-studio/api-reference/transcode/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/api-reference/transcode/create | v2/platforms/livepeer-studio/api-reference/transcode/create.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/api-reference/tasks/overview | v2/platforms/livepeer-studio/api-reference/tasks/overview.mdx | true | ok |  |  |  |
| internal-relative | ./transcoding-jobs | v2/developers/quickstart/video/transcoding-jobs.mdx | true | ok |  |  |  |

### v2/developers/technical-references/apis.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/livepeer-studio/reference/api | v2/platforms/livepeer-studio/reference/api.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/reference/overview | v2/platforms/livepeer-studio/reference/overview.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/developers/technical-references/apis | v2/developers/technical-references/apis.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/reference/api | v2/platforms/livepeer-studio/reference/api.mdx | true | ok |  |  |  |
| internal-rooted | /v2/developers/technical-references/apis | v2/developers/technical-references/apis.mdx | true | ok |  |  |  |

### v2/developers/technical-references/awesome-livepeer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/awesome-livepeer |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/external/awesome-livepeer-readme.mdx | snippets/external/awesome-livepeer-readme.mdx | true | ok |  |  |  |
| import-path | /snippets/components/content/external-content.jsx | snippets/components/content/external-content.jsx | true | ok |  |  |  |

### v2/developers/technical-references/deepwiki.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://deepwiki.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://deepwiki.com/livepeer |  | null | 🟡 untested-external |  |  |  |

### v2/developers/technical-references/sdks.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/livepeer-studio/reference/sdks | v2/platforms/livepeer-studio/reference/sdks.mdx | true | ok |  |  |  |
| internal-rooted | /v2/developers/technical-references/sdks | v2/developers/technical-references/sdks.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/reference/sdks | v2/platforms/livepeer-studio/reference/sdks.mdx | true | ok |  |  |  |
| internal-rooted | /v2/developers/technical-references/sdks | v2/developers/technical-references/sdks.mdx | true | ok |  |  |  |

### v2/developers/technical-references/wiki.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://deepwiki.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/external/wiki-readme.mdx | snippets/external/wiki-readme.mdx | true | ok |  |  |  |

### v2/gateways/about-gateways/gateway-architecture.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/livepeernode.go |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/gateways/about-gateways/gateway-economics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #10-0 |  | null | skipped |  |  |  |
| external-https | https://stream.place |  | null | 🟡 untested-external |  |  |  |
| external-https | https://daydream.live |  | null | 🟡 untested-external |  |  |  |

### v2/gateways/about-gateways/gateway-explainer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://cdn.jsdelivr.net/gh/videoDAC/livepeer-gateway@master/README.md |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/gateways/about-gateways/gateway-functions.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/about-gateways/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../run-a-gateway/run-a-gateway | v2/gateways/run-a-gateway/run-a-gateway.mdx | true | ok |  |  |  |
| internal-relative | ../using-gateways/choosing-a-gateway | v2/gateways/using-gateways/choosing-a-gateway.mdx | true | ok |  |  |  |

### v2/gateways/about-gateways/quickstart-home.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/gateways/gateway-tools/explorer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://explorer-arbitrum-one-git-feat-add-g-10dba1-livepeer-foundation.vercel.app/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer-arbitrum-one-git-feat-add-g-10dba1-livepeer-foundation.vercel.app/ |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/gateways/gateway-tools/gateway-middleware.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/gateway-tools/livepeer-tools.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.livepeer.tools/gateways |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.livepeer.tools/gateways |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/gateways/gateways-portal.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./about-gateways/gateway-explainer | v2/gateways/about-gateways/gateway-explainer.mdx | true | ok |  |  |  |
| internal-relative | ./using-gateways/choosing-a-gateway | v2/gateways/using-gateways/choosing-a-gateway.mdx | true | ok |  |  |  |
| internal-relative | ./run-a-gateway/run-a-gateway | v2/gateways/run-a-gateway/run-a-gateway.mdx | true | ok |  |  |  |
| internal-relative | ./gateway-tools/explorer | v2/gateways/gateway-tools/explorer.mdx | true | ok |  |  |  |
| internal-relative | ./guides-and-resources/community-guides | v2/gateways/guides-and-resources/community-guides.mdx | true | ok |  |  |  |
| internal-relative | ./references/technical-architecture | v2/gateways/references/technical-architecture.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/Portals.jsx | snippets/components/domain/SHARED/Portals.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/frameMode.jsx | snippets/components/display/frameMode.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/HeroGif.jsx | snippets/components/domain/SHARED/HeroGif.jsx | true | ok |  |  |  |

### v2/gateways/guides-and-resources/community-guides.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/guides-and-resources/community-projects.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/guides-and-resources/faq.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.livepeer.org/orchestrators/orchestrators-portal/guides/set-pricing |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/gateways/guides/gateway-overview |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/pricing |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/agent-spe-inference-credits-pre-proposal/2747 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/videodac/livepeer-broadcaster |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/ai/builders/gateways |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.livepeer.cloud/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://na-36.mintlify.app/ai/orchestrators/orchestrators-portal/onchain |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/buidl-labs/livepeer-pricing-tool |  | null | 🟡 untested-external |  |  |  |
| external-https | https://tokenterminal.com/explorer/projects/livepeer/metrics/fees |  | null | 🟡 untested-external |  |  |  |
| external-https | https://messari.io/report/livepeer-q3-2024-brief |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/blob/master/WHITEPAPER.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.gate.com/learn/articles/introducing-the-livepeer-ai-subnet/3044 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://medium.com/figment/primer-on-livepeer-transcoding-fees-3658057f98c2 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/ai/introduction |  | null | 🟡 untested-external |  |  |  |

### v2/gateways/guides-and-resources/gateway-job-pipelines/byoc.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/guides-and-resources/page-2.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/ai.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/ai-worker |  | null | 🟡 untested-external |  |  |  |
| internal-relative | text-to-image | v2/gateways/references/api-reference/AI-API/text-to-image.mdx | true | ok |  |  |  |
| internal-relative | image-to-image | v2/gateways/references/api-reference/AI-API/image-to-image.mdx | true | ok |  |  |  |
| internal-relative | image-to-video | v2/gateways/references/api-reference/AI-API/image-to-video.mdx | true | ok |  |  |  |
| internal-relative | upscale | v2/gateways/references/api-reference/AI-API/upscale.mdx | true | ok |  |  |  |
| internal-relative | audio-to-text | v2/gateways/references/api-reference/AI-API/audio-to-text.mdx | true | ok |  |  |  |
| internal-relative | segment-anything-2 | v2/gateways/references/api-reference/AI-API/segment-anything-2.mdx | true | ok |  |  |  |
| internal-relative | llm | v2/gateways/references/api-reference/AI-API/llm.mdx | true | ok |  |  |  |
| internal-relative | image-to-text | v2/gateways/references/api-reference/AI-API/image-to-text.mdx | true | ok |  |  |  |
| internal-relative | live-video-to-video | v2/gateways/references/api-reference/AI-API/live-video-to-video.mdx | true | ok |  |  |  |
| internal-relative | text-to-speech | v2/gateways/references/api-reference/AI-API/text-to-speech.mdx | true | ok |  |  |  |
| internal-relative | health | v2/gateways/references/api-reference/AI-API/health.mdx | true | ok |  |  |  |
| internal-relative | hardware-info | v2/gateways/references/api-reference/AI-API/hardware-info.mdx | true | ok |  |  |  |
| internal-relative | hardware-stats | v2/gateways/references/api-reference/AI-API/hardware-stats.mdx | true | ok |  |  |  |

### v2/gateways/references/api-reference/AI-API/audio-to-text.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/hardware-info.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/hardware-stats.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/health.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/image-to-image.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/image-to-text.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/image-to-video.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/live-video-to-video.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/llm.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/segment-anything-2.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/text-to-image.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/text-to-speech.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-API/upscale.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/AI-Worker/ai-worker-api.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/activateorchestrator.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/bond.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/cli-http-api.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/webserver.go |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/references/cli-commands | v2/gateways/references/cli-commands.mdx | true | ok |  |  |  |
| internal-relative | status | v2/gateways/references/api-reference/CLI-HTTP/status.mdx | true | ok |  |  |  |
| internal-relative | protocolparameters | v2/gateways/references/api-reference/CLI-HTTP/protocolparameters.mdx | true | ok |  |  |  |
| internal-relative | registeredorchestrators | v2/gateways/references/api-reference/CLI-HTTP/registeredorchestrators.mdx | true | ok |  |  |  |
| internal-relative | bond | v2/gateways/references/api-reference/CLI-HTTP/bond.mdx | true | ok |  |  |  |
| internal-relative | unbond | v2/gateways/references/api-reference/CLI-HTTP/unbond.mdx | true | ok |  |  |  |
| internal-relative | rebond | v2/gateways/references/api-reference/CLI-HTTP/rebond.mdx | true | ok |  |  |  |
| internal-relative | activateorchestrator | v2/gateways/references/api-reference/CLI-HTTP/activateorchestrator.mdx | true | ok |  |  |  |
| internal-relative | reward | v2/gateways/references/api-reference/CLI-HTTP/reward.mdx | true | ok |  |  |  |
| internal-relative | setbroadcastconfig | v2/gateways/references/api-reference/CLI-HTTP/setbroadcastconfig.mdx | true | ok |  |  |  |
| internal-relative | setmaxpriceforcapability | v2/gateways/references/api-reference/CLI-HTTP/setmaxpriceforcapability.mdx | true | ok |  |  |  |
| internal-relative | transfertokens | v2/gateways/references/api-reference/CLI-HTTP/transfertokens.mdx | true | ok |  |  |  |
| internal-relative | signmessage | v2/gateways/references/api-reference/CLI-HTTP/signmessage.mdx | true | ok |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/protocolparameters.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/rebond.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/registeredorchestrators.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/reward.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/setbroadcastconfig.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/setmaxpriceforcapability.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/signmessage.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/status.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/transfertokens.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/CLI-HTTP/unbond.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/_delete-all-api.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #text-to-image |  | null | skipped |  |  |  |
| empty | #image-to-image |  | null | skipped |  |  |  |
| empty | #image-to-video |  | null | skipped |  |  |  |
| empty | #upscale |  | null | skipped |  |  |  |
| empty | #audio-to-text |  | null | skipped |  |  |  |
| empty | #segment-anything-2 |  | null | skipped |  |  |  |
| empty | #llm |  | null | skipped |  |  |  |
| empty | #image-to-text |  | null | skipped |  |  |  |
| empty | #live-video-to-video |  | null | skipped |  |  |  |
| empty | #text-to-speech |  | null | skipped |  |  |  |
| empty | #health |  | null | skipped |  |  |  |
| empty | #hardware-info |  | null | skipped |  |  |  |
| empty | #hardware-stats |  | null | skipped |  |  |  |

### v2/gateways/references/api-reference/ai-worker-api.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/hardware-info.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/hardware-stats.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/api-reference/health.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/arbitrum-rpc.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://chainlist.org/chain/42161 |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/data/references/chainlist.jsx | snippets/data/references/chainlist.jsx | true | ok |  |  |  |

### v2/gateways/references/artibtrum-exchanges.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.coingecko.com/en/coins/arbitrum |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coingecko.com/en/api/documentation |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/integrations/coingecko.jsx | snippets/components/integrations/coingecko.jsx | true | ok |  |  |  |

### v2/gateways/references/cli-commands.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/wiki |  | null | 🟡 untested-external |  |  |  |

### v2/gateways/references/configuration-flags-old.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/wiki/AI-Processing |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/wiki/Video-Pipeline |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/gateways/references/configuration-flags.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/wiki/AI-Processing |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/wiki/Video-Pipeline |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/gateways/references/contract-addresses.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/go-livepeer/cli-reference.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/blob/master/cmd/livepeer/livepeer.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/tree/master/doc |  | null | 🟡 untested-external |  |  |  |

### v2/gateways/references/go-livepeer/gpu-support.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/master/doc/gpu.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/gtx-950-quadro-p400-benchmarks/1497 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/dual-ethash-mining-transcoding-w-rtx-3080-10g-cuda-mps/1161 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/gtx-950-quadro-p400-benchmarks/1497 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/nvidia-quadro-t600-benchmark/1650 |  | null | 🟡 untested-external |  |  |  |

### v2/gateways/references/go-livepeer/hardware-requirements.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./gpu-support | v2/gateways/references/go-livepeer/gpu-support.mdx | true | ok |  |  |  |

### v2/gateways/references/go-livepeer/prometheus-metrics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /v2/gateways/run-a-gateway/monitor/monitor-and-optimise | v2/gateways/run-a-gateway/monitor/monitor-and-optimise.mdx | true | ok |  |  |  |

### v2/gateways/references/livepeer-exchanges.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.coingecko.com/en/coins/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coingecko.com/en/api/documentation |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/integrations/coingecko.jsx | snippets/components/integrations/coingecko.jsx | true | ok |  |  |  |

### v2/gateways/references/orchestrator-offerings.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/references/technical-architecture.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/build-options.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #63-0 |  | null | skipped |  |  |  |
| empty | #63-1 |  | null | skipped |  |  |  |
| empty | #63-2 |  | null | skipped |  |  |  |
| empty | #63-3 |  | null | skipped |  |  |  |
| empty | #63-4 |  | null | skipped |  |  |  |
| empty | #63-5 |  | null | skipped |  |  |  |
| empty | #63-6 |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/wiki |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki |  | null | 🟡 untested-external |  |  |  |

### v2/gateways/run-a-gateway/configure/ai-configuration.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://discord.gg/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /gateways/references/go-livepeer/cli-reference | v2/gateways/references/go-livepeer/cli-reference.mdx | true | ok |  |  |  |
| internal-rooted | /orchestrators/setting-up-an-orchestrator/install-go-livepeer#install-using-a-binary-release | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-rooted | /gateways/references/go-livepeer/cli-reference | v2/gateways/references/go-livepeer/cli-reference.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/tree/master |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /orchestrators/setting-up-an-orchestrator/install-go-livepeer#install-using-a-binary-release | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| external-https | https://discord.gg/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://hub.docker.com/r/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /gateways/run-a-gateway/test/test-gateway | v2/gateways/run-a-gateway/test/test-gateway | false | skipped-allowlisted |  |  |  |
| internal-rooted | /gateways/run-a-gateway/test/test-gateway | v2/gateways/run-a-gateway/test/test-gateway | false | skipped-allowlisted |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/server/ai_mediaserver.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/server/ai_http.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/server/ai_process.go |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/configure/configuration-overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /v2/gateways/references/configuration-flags | v2/gateways/references/configuration-flags.mdx | true | ok |  |  |  |
| internal-relative | ./video-configuration | v2/gateways/run-a-gateway/configure/video-configuration.mdx | true | ok |  |  |  |
| internal-relative | ./ai-configuration | v2/gateways/run-a-gateway/configure/ai-configuration.mdx | true | ok |  |  |  |
| internal-relative | ./dual-configuration | v2/gateways/run-a-gateway/configure/dual-configuration.mdx | true | ok |  |  |  |
| internal-relative | ./pricing-configuration | v2/gateways/run-a-gateway/configure/pricing-configuration.mdx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/configure/configuration-reference.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/run-a-gateway/configure/dual-configuration.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/livepeernode.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/server/ai_auth.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/cmd/livepeer/livepeer.go |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/external-content.jsx | snippets/components/content/external-content.jsx | true | ok |  |  |  |
| import-path | /snippets/external/box-additional-config.mdx | snippets/external/box-additional-config.mdx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/configure/dual-docker.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #54-0 |  | null | skipped |  |  |  |
| empty | #54-1 |  | null | skipped |  |  |  |
| empty | #54-2 |  | null | skipped |  |  |  |
| empty | #54-3 |  | null | skipped |  |  |  |
| empty | #54-4 |  | null | skipped |  |  |  |
| empty | #54-5 |  | null | skipped |  |  |  |
| empty | #54-6 |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/wiki |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki |  | null | 🟡 untested-external |  |  |  |

### v2/gateways/run-a-gateway/configure/pricing-configuration.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/segment_rpc.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/segment_rpc.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/live_payment.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/server/ai_http.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/live_payment.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/segment_rpc.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/server/ai_http.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/cmd/livepeer/starter.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/orchestrator.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/orchestrator.go |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../../about-gateways/gateway-economics | v2/gateways/about-gateways/gateway-economics.mdx | true | ok |  |  |  |
| internal-relative | ../requirements/on-chain%20setup/fund-gateway | v2/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/configure/video-configuration-view.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/broadcast.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/live_payment.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/livepeernode.go |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/configure/video-configuration.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/broadcast.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/live_payment.go |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/connect/connect-with-offerings | v2/gateways/run-a-gateway/connect/connect-with-offerings.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/core/livepeernode.go |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/requirements/on-chain%20setup/on-chain | v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx | true | ok |  |  |  |
| internal-relative | ./pricing-configuration | v2/gateways/run-a-gateway/configure/pricing-configuration.mdx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/responseField.jsx | snippets/components/content/responseField.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/connect/connect-with-offerings.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/discovery/discovery.go#L64-L111 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/server/handlers.go#L275-L295 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/common/types.go#L166-L176 |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/connect/discover-offerings.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/discovery/discovery.go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/server/handlers.go#L275-L295 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/common/types.go#L166-L176 |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/connect/lp-marketplace.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://gifsec.com/wp-content/uploads/2023/01/the-office-gif-3.gif |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/gateway-operator-opportunities.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/run-a-gateway/install/community-projects.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://forum.livepeer.org/t/gwid-spe-pre-proposal-gateway-wizard-phase-1/2868 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/get-to-know-gwid-and-the-team-a-fully-managed-devop-platform-for-livepeer/2851 |  | null | 🟡 untested-external |  |  |  |
| empty | #gwid-gateway-wizard |  | null | skipped |  |  |  |
| empty | #coming-soon |  | null | skipped |  |  |  |
| empty | #contribute |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/docs/issues/new?assignees=&labels=type%3A+documentation&template=documentation.yml&title= |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/videoDAC/livepeer-gateway/blob/master/README.md |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/external-content.jsx | snippets/components/content/external-content.jsx | true | ok |  |  |  |
| import-path | /snippets/external/gwid-readme.mdx | snippets/external/gwid-readme.mdx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/install/docker-install.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.docker.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.docker.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.docker.com/desktop/install/mac-install/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.docker.com/desktop/install/windows-install/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://hub.docker.com/r/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/requirements/on-chain%20setup/fund-gateway | v2/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx | true | ok |  |  |  |
| external-https | https://hub.docker.com/r/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://hub.docker.com/r/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/configure/configuration-overview | v2/gateways/run-a-gateway/configure/configuration-overview.mdx | true | ok |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/install/install-overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /v2/gateways/run-a-gateway/requirements/setup | v2/gateways/run-a-gateway/requirements/setup.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/requirements/on-chain%20setup/on-chain | v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx | true | ok |  |  |  |
| internal-relative | ./docker-install | v2/gateways/run-a-gateway/install/docker-install.mdx | true | ok |  |  |  |
| internal-relative | ./linux-install | v2/gateways/run-a-gateway/install/linux-install.mdx | true | ok |  |  |  |
| internal-relative | ./windows-install | v2/gateways/run-a-gateway/install/windows-install.mdx | true | ok |  |  |  |
| internal-relative | ./community-projects | v2/gateways/run-a-gateway/install/community-projects.mdx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/install/linux-install.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://brew.sh/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://brew.sh/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://curl.haxx.se/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/releases |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/releases |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/configure/configuration-overview | v2/gateways/run-a-gateway/configure/configuration-overview.mdx | true | ok |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/buttons.jsx | snippets/components/primitives/buttons.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/globals/globals.jsx | snippets/automations/globals/globals.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/install/windows-install.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.livepeer.org/gateways/guides/windows-install |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/releases |  | null | 🟡 untested-external |  |  |  |
| external-https | https://nssm.cc/ |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/configure/configuration-overview | v2/gateways/run-a-gateway/configure/configuration-overview.mdx | true | ok |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/configure/configuration-overview | v2/gateways/run-a-gateway/configure/configuration-overview.mdx | true | ok |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/globals/globals.jsx | snippets/automations/globals/globals.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/monitor/monitor-and-optimise.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/server/ai_mediaserver.go |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/publish/connect-with-offerings.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/discovery/discovery.go#L64-L111 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/server/handlers.go#L275-L295 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://gifsec.com/wp-content/uploads/2023/01/the-office-gif-3.gif |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/quickstart/get-AI-to-setup-the-gateway.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://imgflip.com/i/aeyoct |  | null | 🟡 untested-external |  |  |  |

### v2/gateways/run-a-gateway/quickstart/quickstart-a-gateway.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.docker.com/get-docker/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://linux.org |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/run-a-gateway | v2/gateways/run-a-gateway/run-a-gateway.mdx | true | ok |  |  |  |
| empty | #off-chain-gateway |  | null | skipped |  |  |  |
| empty | #on-chain-gateway |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../install/docker-install | v2/gateways/run-a-gateway/install/docker-install.mdx | true | ok |  |  |  |
| internal-relative | ../../references/configuration-flags | v2/gateways/references/configuration-flags.mdx | true | ok |  |  |  |
| internal-relative | ../install/windows-install | v2/gateways/run-a-gateway/install/windows-install.mdx | true | ok |  |  |  |
| internal-relative | ../../references/configuration-flags | v2/gateways/references/configuration-flags.mdx | true | ok |  |  |  |
| internal-relative | ../install/windows-install | v2/gateways/run-a-gateway/install/windows-install.mdx | true | ok |  |  |  |
| internal-relative | ../../references/configuration-flags | v2/gateways/references/configuration-flags.mdx | true | ok |  |  |  |
| internal-relative | ../requirements/setup | v2/gateways/run-a-gateway/requirements/setup.mdx | true | ok |  |  |  |
| internal-relative | ../requirements/on-chain%20setup/on-chain | v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx | true | ok |  |  |  |
| internal-relative | ../run-a-gateway | v2/gateways/run-a-gateway/run-a-gateway.mdx | true | ok |  |  |  |
| internal-rooted | /v2/pages/05_orchestrators/orchestrators-portal | v2/x-pages/05_orchestrators/orchestrators-portal.mdx | true | ok |  |  |  |
| import-path | /snippets/data/gateways/code.jsx | snippets/data/gateways/code.jsx | true | ok |  |  |  |
| import-path | /snippets/data/gateways/flags.jsx | snippets/data/gateways/flags.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/globals/globals.jsx | snippets/automations/globals/globals.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/04_GATEWAYS/callouts.jsx | snippets/components/domain/04_GATEWAYS/callouts.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/responseField.jsx | snippets/components/content/responseField.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/buttons.jsx | snippets/components/primitives/buttons.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/layout.jsx | snippets/components/primitives/layout.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/release.jsx | snippets/components/content/release.jsx | true | ok |  |  |  |
| import-path | /snippets/pages/04_GATEWAYS/run/quickstart/views/docker/dockerOffChainTab.mdx | snippets/pages/04_GATEWAYS/run/quickstart/views/docker/dockerOffChainTab.mdx | true | ok |  |  |  |
| import-path | /snippets/pages/04_GATEWAYS/run/quickstart/views/docker/dockerOnChainTab.mdx | snippets/pages/04_GATEWAYS/run/quickstart/views/docker/dockerOnChainTab.mdx | true | ok |  |  |  |
| import-path | /snippets/pages/04_GATEWAYS/run/quickstart/views/linux/linuxOffChainTab.mdx | snippets/pages/04_GATEWAYS/run/quickstart/views/linux/linuxOffChainTab.mdx | true | ok |  |  |  |
| import-path | /snippets/pages/04_GATEWAYS/run/quickstart/views/linux/linuxOnChainTab.mdx | snippets/pages/04_GATEWAYS/run/quickstart/views/linux/linuxOnChainTab.mdx | true | ok |  |  |  |
| import-path | /snippets/pages/04_GATEWAYS/run/quickstart/views/windows/windowsOffChainTab.mdx | snippets/pages/04_GATEWAYS/run/quickstart/views/windows/windowsOffChainTab.mdx | true | ok |  |  |  |
| import-path | /snippets/pages/04_GATEWAYS/run/quickstart/views/windows/windowsOnChainTab.mdx | snippets/pages/04_GATEWAYS/run/quickstart/views/windows/windowsOnChainTab.mdx | true | ok |  |  |  |
| import-path | /snippets/pages/04_GATEWAYS/run/quickstart/groups/docker/dockerSupport.mdx | snippets/pages/04_GATEWAYS/run/quickstart/groups/docker/dockerSupport.mdx | true | ok |  |  |  |
| import-path | /snippets/pages/04_GATEWAYS/run/quickstart/groups/linux/linuxSupport.mdx | snippets/pages/04_GATEWAYS/run/quickstart/groups/linux/linuxSupport.mdx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/requirements/on-chain setup/bridge-lpt-to-arbitrum.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://bridge.arbitrum.io/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://user-images.githubusercontent.com/89408276/155851894-eb959beb-3269-40b1-8d50-8768bf15f9f2.jpg |  | null | 🟡 untested-external |  |  |  |
| external-https | https://user-images.githubusercontent.com/89408276/155851630-8e60a17a-b6bd-4a65-972c-53d34c600026.jpg |  | null | 🟡 untested-external |  |  |  |
| external-https | https://user-images.githubusercontent.com/89408276/155850572-2337514c-f6ad-419a-a9bf-94e7d3e1d891.jpg |  | null | 🟡 untested-external |  |  |  |
| external-https | https://user-images.githubusercontent.com/89408276/155375033-6fd66e8a-53ab-43e9-9fe6-3a0cec847a55.jpg |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x289ba1701C2F088cf0faf8B3705246331cB8A839#writeContract |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x6D2457a4ad276000A615295f7A80F79E48CcD318 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/unitconverter |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.uniswap.org/#/swap?chain=arbitrum |  | null | 🟡 untested-external |  |  |  |
| external-https | https://retryable-tx-panel.arbitrum.io/ |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v1/images/delegating-guides/arbitrum-retry-ui.png | v1/images/delegating-guides/arbitrum-retry-ui.png | true | ok |  |  |  |
| external-https | https://user-images.githubusercontent.com/23727056/176745651-98ff56d0-9c0a-4c2d-b9fe-bf3ba1d537a7.png |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.arbitrum.io/arbos/l1-to-l2-messaging |  | null | 🟡 untested-external |  |  |  |

### v2/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://arbitrum.io/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coinbase.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.binance.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coingecko.com/en/coins/arbitrum |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.binance.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.binance.com/en/support/faq/360033617792 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coinbase.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coinbase.com/how-to-buy/ethereum |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.kraken.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://support.kraken.com/hc/en-us/articles/360000920066-How-to-buy-Ethereum |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.arbitrum.io/arbitrum-bridge/quickstart |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/issues/3744 |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/references/artibtrum-exchanges | v2/gateways/references/artibtrum-exchanges.mdx | true | ok |  |  |  |
| external-https | https://docs.arbitrum.io/arbitrum-bridge/quickstart |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #on-chain-requirements |  | null | skipped |  |  |  |
| empty | #security-notes |  | null | skipped |  |  |  |
| empty | #required-on-chain-flags |  | null | skipped |  |  |  |
| empty | #where-your-account-data-is-stored |  | null | skipped |  |  |  |
| empty | #rpc-url |  | null | skipped |  |  |  |
| empty | #eth-account |  | null | skipped |  |  |  |
| empty | #eth-password |  | null | skipped |  |  |  |
| empty | #eth-keystore |  | null | skipped |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/quickstart/quickstart-a-gateway | v2/gateways/run-a-gateway/quickstart/quickstart-a-gateway.mdx | true | ok |  |  |  |
| internal-relative | ./fund-gateway | v2/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx | true | ok |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/install/install-overview | v2/gateways/run-a-gateway/install/install-overview.mdx | true | ok |  |  |  |
| internal-rooted | /v2/gateways/references/arbitrum-rpc | v2/gateways/references/arbitrum-rpc.mdx | true | ok |  |  |  |
| external-https | https://docs.arbitrum.io/build-decentralized-apps/public-chains#arbitrum-one |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../../../../resources/references/contract-addresses | v2/resources/references/contract-addresses.mdx | true | ok |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/install/install-overview | v2/gateways/run-a-gateway/install/install-overview.mdx | true | ok |  |  |  |
| empty | #rpc-url |  | null | skipped |  |  |  |
| external-https | https://en.wikipedia.org/wiki/Remote_procedure_call |  | null | 🟡 untested-external |  |  |  |
| external-https | https://chainlist.org/chain/42161 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.alchemy.com/docs/reference/arbitrum-api-quickstart |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.ankr.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://chainstack.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.infura.io/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://moralis.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.quicknode.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/accountmanager.go#L50-L69 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.arbitrum.io/get-started/arbitrum-introduction |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/install/install-overview | v2/gateways/run-a-gateway/install/install-overview.mdx | true | ok |  |  |  |
| external-https | https://geth.ethereum.org/docs/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/ethereum/go-ethereum/tree/master/cmd/ethkey |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.myetherwallet.com/ |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/install/install-overview | v2/gateways/run-a-gateway/install/install-overview.mdx | true | ok |  |  |  |
| internal-relative | ./fund-gateway | v2/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx | true | ok |  |  |  |
| external-https | https://chainlist.org/chain/42161 |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/references/arbitrum-rpc | v2/gateways/references/arbitrum-rpc.mdx | true | ok |  |  |  |
| external-https | https://docs.arbitrum.io/build-decentralized-apps/reference/node-providers#third-party-rpc-providers |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.arbitrum.io/build-decentralized-apps/reference/node-providers#third-party-rpc-providers |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.arbitrum.io/node-running/how-tos/running-a-full-node |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.arbitrum.io/node-running/how-tos/running-a-full-node |  | null | 🟡 untested-external |  |  |  |
| external-https | https://support.metamask.io/configure/accounts/how-to-view-your-account-details-and-public-address |  | null | 🟡 untested-external |  |  |  |
| external-https | https://support.ledger.com/article/8978919811485-zd |  | null | 🟡 untested-external |  |  |  |
| external-https | https://support.trezor.io/en/articles/360018565096-trezor-faq |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./fund-gateway | v2/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx | true | ok |  |  |  |
| internal-relative | ./fund-gateway | v2/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx | true | ok |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/data/references/chainlist.jsx | snippets/data/references/chainlist.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/containers.jsx | snippets/components/primitives/containers.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/requirements/setup.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | # |  | null | skipped |  |  |  |
| empty | # |  | null | skipped |  |  |  |
| empty | '' |  | null | skipped |  |  |  |
| external-https | https://arbitrum.io/ |  | null | 🟡 untested-external |  |  |  |
| empty | '' |  | null | skipped |  |  |  |
| external-https | https://en.wikipedia.org/wiki/Remote_procedure_call |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/install/install-overview | v2/gateways/run-a-gateway/install/install-overview.mdx | true | ok |  |  |  |
| external-https | https://docs.livepeer.org/v2/pages/05_orchestrators/setting-up-an-orchestrator |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/run-a-gateway/requirements/on-chain%20setup/on-chain | v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/tables.jsx | snippets/components/primitives/tables.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/containers.jsx | snippets/components/primitives/containers.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/run-a-gateway.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../about-gateways/gateway-economics | v2/gateways/about-gateways/gateway-economics.mdx | true | ok |  |  |  |
| internal-relative | ../run-a-gateway/install | /v2/gateways/run-a-gateway/install | true | ok-folder-route |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/layout.jsx | snippets/components/primitives/layout.jsx | true | ok |  |  |  |

### v2/gateways/run-a-gateway/v1/transcoding-options.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/run-a-gateway/why-run-a-gateway.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../about-gateways/gateway-economics | v2/gateways/about-gateways/gateway-economics.mdx | true | ok |  |  |  |

### v2/gateways/using-gateways/choosing-a-gateway.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/using-gateways/gateway-providers.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./gateway-providers/daydream-gateway | v2/gateways/using-gateways/gateway-providers/daydream-gateway.mdx | true | ok |  |  |  |
| internal-relative | ./gateway-providers/livepeer-studio-gateway | v2/gateways/using-gateways/gateway-providers/livepeer-studio-gateway.mdx | true | ok |  |  |  |
| internal-relative | ./gateway-providers/cloud-spe-gateway | v2/gateways/using-gateways/gateway-providers/cloud-spe-gateway.mdx | true | ok |  |  |  |
| internal-relative | ../guides-and-resources/community-projects | v2/gateways/guides-and-resources/community-projects.mdx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/gateways/using-gateways/gateway-providers/cloud-spe-gateway.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/using-gateways/gateway-providers/daydream-gateway.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/gateways/using-gateways/gateway-providers/livepeer-studio-gateway.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/home/about-livepeer/benefits.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | "https://www.linkedin.com/in/shannon-wells/" |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/livepeer-inc-in-the-age-of-the-livepeer-foundation/2850 |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/home/solutions/showcase | v2/home/solutions/showcase.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/LivepeerStats.png | snippets/assets/domain/00_HOME/LivepeerStats.png | true | ok |  |  |  |
| external-https | https://explorer.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/image.jsx | snippets/components/display/image.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/customCards.jsx | snippets/components/display/customCards.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/customCards.jsx | snippets/components/display/customCards.jsx | true | ok |  |  |  |

### v2/home/about-livepeer/ecosystem.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://en.wikipedia.org/wiki/Decentralized_autonomous_organization |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio |  | null | 🟡 untested-external |  |  |  |
| external-https | https://daydream.live |  | null | 🟡 untested-external |  |  |  |
| external-https | https://twitter.com/richogrady |  | null | 🟡 untested-external |  |  |  |
| external-https | https://linkedin.com/in/rich-ogrady-3400042/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://roadmap.livepeer.org/roadmap |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/c/foundation/14 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.com/events/423160867534929930/1394387788568203274 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/growth-advisory-board-candidacy/2877/14 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/treasury |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/introducing-workstreams-a-new-era-of-execution-for-the-livepeer-project/3030 |  | null | 🟡 untested-external |  |  |  |
| empty | #livepeer-dao |  | null | skipped |  |  |  |
| empty | #special-purpose-entities |  | null | skipped |  |  |  |
| external-https | https://explorer.livepeer.org/voting |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/treasury |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/about-the-governance-category/1059 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://en.wikipedia.org/wiki/Request_for_proposal |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/lpt/treasury/overview | v2/lpt/treasury/overview.mdx | true | ok |  |  |  |
| external-https | https://forum.livepeer.org/t/livepeer-governance-workstreams-govworks-whitepaper/3720 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/voting |  | null | 🟡 untested-external |  |  |  |
| external-https | https://medium.com/livepeer-blog/the-confluence-upgrade-is-live-3b6b342ea71e |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0073.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/ai-video-spe-stage-3-pre-proposal/2693 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://lenstube.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://dlive.tv/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://en.wikipedia.org/wiki/Request_for_proposal |  | null | 🟡 untested-external |  |  |  |
| empty | #livepeer-dao |  | null | skipped |  |  |  |
| external-https | https://forum.livepeer.org/c/special-purpose-entities/15 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://productlane.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer-ai.productlane.com/changelog |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer-cloud.productlane.com/changelog |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.com/gateway |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer-streamplace.productlane.com/changelog |  | null | 🟡 untested-external |  |  |  |
| external-https | https://en.wikipedia.org/wiki/Decentralized_autonomous_organization |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/launching-the-livepeer-foundation/2849 |  | null | 🟡 untested-external |  |  |  |
| empty | #livepeer-inc |  | null | skipped |  |  |  |
| empty | #livepeer-foundation |  | null | skipped |  |  |  |
| empty | #livepeer-dao |  | null | skipped |  |  |  |
| empty | #special-purpose-entities-spes |  | null | skipped |  |  |  |
| external-https | https://blog.livepeer.org/introducing-the-livepeer-foundation/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/launching-the-livepeer-foundation/2849 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/shtukaresearch/livepeer-data-geography/blob/651a56e8/roles/foundation.md#L1-L14 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/launching-the-livepeer-foundation/2849 |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/lpt/delegation/overview | v2/lpt/delegation/overview.mdx | true | ok |  |  |  |
| external-https | https://forum.livepeer.org/t/launching-the-livepeer-foundation/2849 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/special-purpose-entities-a-new-model-for-livepeer-ecosystem-growth/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://imgflip.com/embed/aidjmm |  | null | 🟡 untested-external |  |  |  |
| external-https | https://imgflip.com/embed/aidl1c |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/treasury |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/quadGrid.jsx | snippets/components/layout/quadGrid.jsx | true | ok |  |  |  |

### v2/home/about-livepeer/evolution.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0001.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0010.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0030.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0080.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0091.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs/blob/main/LIPs/LIP-0100.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/livepeer-inc-in-the-age-of-the-livepeer-foundation/2850 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/wiki/blob/master/WHITEPAPER.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/livepeer-is-live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/how-livepeer-works/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/category/use-cases/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.youtube.com/watch?v=8mJZ2c9wq9A |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/introducing-ai-inference-on-livepeer/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/introducing-livepeer-cascade-a-vision-for-livepeers-future-in-the-age-of-real-time-ai-video/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/livepeer-foundation-is-live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://roadmap.livepeer.org/roadmap |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/evolution.png | snippets/assets/domain/00_HOME/evolution.png | true | ok |  |  |  |
| internal-rooted | /v2/home/about-livepeer/roadmap | v2/home/about-livepeer/roadmap.mdx | true | ok |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/image.jsx | snippets/components/display/image.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/home/about-livepeer/roadmap.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.nvidia.com/en-us/glossary/world-models/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://roadmap.livepeer.org/roadmap |  | null | 🟡 untested-external |  |  |  |
| external-https | https://roadmap.livepeer.org/roadmap |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/customCards.jsx | snippets/components/display/customCards.jsx | true | ok |  |  |  |

### v2/home/about-livepeer/vision.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://medium.com/livepeer-blog/the-livepeer-development-stack-technology-behind-live-streaming-built-on-ethereum-d6a06158d5e2 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.linkedin.com/in/doug-petkanics/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.linkedin.com/in/erictang/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://medium.com/livepeer-blog/livepeer-for-beginners-3b49945c24a7?source=collection_home---------163---------------------------- |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.org/primer |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /snippets/assets/media/videos/livepeer-founders-post.mp4 | snippets/assets/media/videos/livepeer-founders-post.mp4 | true | ok |  |  |  |
| internal-rooted | /v2/home/about-livepeer/roadmap | v2/home/about-livepeer/roadmap.mdx | true | ok |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/image.jsx | snippets/components/display/image.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/quadGrid.jsx | snippets/components/layout/quadGrid.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/customCards.jsx | snippets/components/display/customCards.jsx | true | ok |  |  |  |

### v2/home/get-started.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /v2/home/solutions/showcase | v2/home/solutions/showcase.mdx | true | ok |  |  |  |
| internal-relative | ../about/portal | v2/about/portal.mdx | true | ok |  |  |  |
| internal-rooted | /v2/developers/quickstart/ai/ai-pipelines | v2/developers/quickstart/ai/ai-pipelines.mdx | true | ok |  |  |  |
| internal-rooted | /v2/platforms/daydream/overview | v2/platforms/daydream/overview.mdx | true | ok |  |  |  |
| internal-relative | ../platforms/portal | v2/platforms/portal.mdx | true | ok |  |  |  |
| internal-rooted | /v2/developers/quickstart/video/video-streaming | v2/developers/quickstart/video/video-streaming.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/resources/documentation-guide/style-guide | v2/resources/documentation-guide/style-guide.mdx | true | ok |  |  |  |
| internal-rooted | /v2/resources/documentation-guide/contribute-to-the-docs | v2/resources/documentation-guide/contribute-to-the-docs.mdx | true | ok |  |  |  |
| internal-rooted | /v2/home/solutions/showcase | v2/home/solutions/showcase.mdx | true | ok |  |  |  |
| internal-rooted | /v2/home/about-livepeer/ | /v2/home/about-livepeer | true | ok-folder-route |  |  |  |
| internal-rooted | /v2/community/livepeer-community/trending-topics | v2/community/livepeer-community/trending-topics.mdx | true | ok |  |  |  |
| internal-relative | ./get-started/stream-video | v2/home/get-started/stream-video.mdx | true | ok |  |  |  |
| internal-rooted | /v2/platforms/daydream/overview | v2/platforms/daydream/overview.mdx | true | ok |  |  |  |
| internal-rooted | /v2/platforms/livepeer-studio/overview | v2/platforms/livepeer-studio/overview.mdx | true | ok |  |  |  |
| internal-rooted | /v2/developers/quickstart/ai/ai-pipelines | v2/developers/quickstart/ai/ai-pipelines.mdx | true | ok |  |  |  |
| internal-relative | ../platforms/daydream/overview | v2/platforms/daydream/overview.mdx | true | ok |  |  |  |
| internal-relative | ../developers/ai-pipelines/comfystream | v2/developers/ai-pipelines/comfystream.mdx | true | ok |  |  |  |
| internal-relative | ../developers/ai-pipelines/byoc | v2/developers/ai-pipelines/byoc.mdx | true | ok |  |  |  |
| internal-relative | ../developers/portal | v2/developers/portal.mdx | true | ok |  |  |  |
| internal-relative | ../gateways/gateways-portal | v2/gateways/gateways-portal.mdx | true | ok |  |  |  |
| internal-relative | ../developers/builder-opportunities/dev-programs | v2/developers/builder-opportunities/dev-programs.mdx | true | ok |  |  |  |
| internal-rooted | /v2/orchestrators/quickstart/overview | v2/orchestrators/quickstart/overview.mdx | true | ok |  |  |  |
| mailto | mailto:hello@livepeer.org |  | null | skipped |  |  |  |
| internal-relative | ../platforms/daydream/overview | v2/platforms/daydream/overview.mdx | true | ok |  |  |  |
| internal-rooted | /v2/developers/quickstart/video/video-streaming | v2/developers/quickstart/video/video-streaming.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../lpt/delegation/overview | v2/lpt/delegation/overview.mdx | true | ok |  |  |  |
| internal-relative | ../lpt/governance/overview | v2/lpt/governance/overview.mdx | true | ok |  |  |  |
| internal-relative | ../developers/guides/partner-integrations | v2/developers/guides/partner-integrations.mdx | true | ok |  |  |  |
| mailto | mailto:hello@livepeer.org |  | null | skipped |  |  |  |
| external-https | https://livepeer.org/whitepaper |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/customCards.jsx | snippets/components/display/customCards.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/home/get-started/ai-pipelines.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/home/get-started/build-on-livepeer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/home/get-started/stream-video.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/home/get-started/use-livepeer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/home/mission-control.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://raw.githubusercontent.com/livepeer/docs/docs-v2/snippets/assets/domain/00_HOME/Eric%20Shreck%20Gif.gif |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../about/portal | v2/about/portal.mdx | true | ok |  |  |  |
| internal-relative | ../developers/livepeer-real-time-video/video-streaming-on-livepeer/README | v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/README.mdx | true | ok |  |  |  |
| internal-relative | ../developers/ai-pipelines/overview | v2/developers/ai-pipelines/overview.mdx | true | ok |  |  |  |
| internal-rooted | /v2/pages/05_orchestrators/orchestrators-portal | v2/x-pages/05_orchestrators/orchestrators-portal.mdx | true | ok |  |  |  |
| internal-relative | ../community/community-portal | v2/community/community-portal.mdx | true | ok |  |  |  |
| internal-rooted | /v2/home/solutions/showcase | v2/home/solutions/showcase.mdx | true | ok |  |  |  |
| internal-relative | ../gateways/gateways-portal | v2/gateways/gateways-portal.mdx | true | ok |  |  |  |
| internal-relative | ../lpt/token-portal | v2/lpt/token-portal.mdx | true | ok |  |  |  |
| internal-relative | ../developers/builder-opportunities/dev-programs | v2/developers/builder-opportunities/dev-programs.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/Portals.jsx | snippets/components/domain/SHARED/Portals.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/HeroGif.jsx | snippets/components/domain/SHARED/HeroGif.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/frameMode.jsx | snippets/components/display/frameMode.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/icons.jsx | snippets/components/primitives/icons.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |

### v2/home/primer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /developers/portal | v2/developers/portal.mdx | true | ok |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.com/invite/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/ |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/orchestrators/orchestrators-portal | v2/orchestrators/orchestrators-portal.mdx | true | ok |  |  |  |
| internal-rooted | /developers/portal | v2/developers/portal.mdx | true | ok |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.com/invite/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjgxanlyczB0NW05M2xlYWEwdDg1N20zanowNGxmdzNnbWZ2bHQwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ae7SI3LoPYj8Q/giphy.gif |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../community/community-portal | v2/community/community-portal.mdx | true | ok |  |  |  |
| internal-rooted | /v2/home/solutions/showcase | v2/home/solutions/showcase.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/portal | v2/platforms/portal.mdx | true | ok |  |  |  |
| internal-relative | ../developers/portal | v2/developers/portal.mdx | true | ok |  |  |  |
| internal-relative | ../gateways/gateways-portal | v2/gateways/gateways-portal.mdx | true | ok |  |  |  |
| internal-rooted | /v2/orchestrators/orchestrators-portal | v2/orchestrators/orchestrators-portal.mdx | true | ok |  |  |  |
| internal-relative | ../community/community-portal | v2/community/community-portal.mdx | true | ok |  |  |  |
| external-https | https://discord.com/invite/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://twitter.com/livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../community/community-portal | v2/community/community-portal.mdx | true | ok |  |  |  |
| import-path | /snippets/components/display/socialLinks.jsx | snippets/components/display/socialLinks.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/image.jsx | snippets/components/display/image.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/customCards.jsx | snippets/components/display/customCards.jsx | true | ok |  |  |  |

### v2/home/solutions/applications.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/display/customCards.jsx | snippets/components/display/customCards.jsx | true | ok |  |  |  |

### v2/home/solutions/landscape.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://forum.livepeer.org/t/livepeer-inc-in-the-age-of-the-livepeer-foundation/2850 |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/home/solutions/showcase.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.instagram.com/reel/DPd6RUsErGF/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.google.com/forms/d/e/1FAIpQLSeJ4uoxQ9LUSg89RDWcGiTsbePXsSkRXzGzrdyJ8RVrM1171Q/viewform?usp=sharing&ouid=103197690869380433914 |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/cards.jsx | snippets/components/layout/cards.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/showcaseCards.jsx | snippets/components/display/showcaseCards.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/showcase/showcaseData.jsx | snippets/automations/showcase/showcaseData.jsx | true | ok |  |  |  |

### v2/home/solutions/verticals.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/layout/cards.jsx | snippets/components/layout/cards.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |

### v2/home/trending.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://download.com |  | null | 🟡 untested-external |  |  |  |
| external-https | https://download.com |  | null | 🟡 untested-external |  |  |  |
| external-https | https://download.com |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.youtube.com/@livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://x.com/Livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.youtube.com/watch?v=-iO7HsR3KE4&#x26;list=PLkw6hm1fcjtF1OYFCF20AwBUtGygQxTQV&#x26;index=3 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.google.com/presentation/d/1Qg6u1Ns1RU2Gw4m-dzGu_WeKx9z0v5HcbHTpWwA91Yw/embed |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/data.jsx | snippets/components/content/data.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/embed.jsx | snippets/components/display/embed.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/forum/forumData.jsx | snippets/automations/forum/forumData.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/blog/ghostBlogData.jsx | snippets/automations/blog/ghostBlogData.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/youtube/youtubeData.jsx | snippets/automations/youtube/youtubeData.jsx | true | ok |  |  |  |
| import-path | /snippets/automations/discord/discordAnnouncementsData.jsx | snippets/automations/discord/discordAnnouncementsData.jsx | true | ok |  |  |  |

### v2/internal/ally-notes.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | "https://github.com/livepeer/wiki/blob/master/WHITEPAPER.md" |  | null | 🟡 untested-external |  |  |  |
| external-https | https://cdn.jsdelivr.net/gh/livepeer/wiki@master/WHITEPAPER.md |  | null | 🟡 untested-external |  |  |  |

### v2/internal/definitions.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/internal/docs-philosophy.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/internal/ecosystem.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/internal/governance.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/docs/blob/main/.github/CODEOWNERS |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/docs/issues/new?template=bug_report.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/docs/issues/new?template=feature_request.md |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/docs/issues/new?template=question.md |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../resources/changelog/changelog | v2/resources/changelog/changelog.mdx | true | ok |  |  |  |
| empty | #quarterly-review-checklist |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/docs/issues |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.org/discord |  | null | 🟡 untested-external |  |  |  |

### v2/internal/internal-overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.notion.so/livepeer/Documentation-Reviews-2c50a3485687800e98e8f3e1f1a802a9 |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../resources/documentation-guide/documentation-overview | v2/resources/documentation-guide/documentation-overview.mdx | true | ok |  |  |  |
| internal-relative | ./strategic-alignment | v2/internal/strategic-alignment.mdx | true | ok |  |  |  |
| internal-relative | ./definitions | v2/internal/definitions.mdx | true | ok |  |  |  |
| internal-relative | ./personas | v2/internal/personas.mdx | true | ok |  |  |  |
| internal-relative | ./docs-philosophy | v2/internal/docs-philosophy.mdx | true | ok |  |  |  |
| internal-relative | ./ecosystem | v2/internal/ecosystem.mdx | true | ok |  |  |  |
| internal-relative | ./references | v2/internal/references.mdx | true | ok |  |  |  |
| external-https | https://www.notion.so/livepeer/Documentation-Reviews-2c50a3485687800e98e8f3e1f1a802a9 |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../resources/documentation-guide/documentation-overview | v2/resources/documentation-guide/documentation-overview.mdx | true | ok |  |  |  |

### v2/internal/layout-components-scripts-styling/components.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../../resources/documentation-guide/component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| external-https | https://www.mintlify.com/docs/components/tiles |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/Hero_Images/hero_community.png | snippets/assets/domain/00_HOME/Hero_Images/hero_community.png | true | ok |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/Hero_Images/hero_about.png | snippets/assets/domain/00_HOME/Hero_Images/hero_about.png | true | ok |  |  |  |
| external-https | https://www.mintlify.com/docs/components/tiles |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/Hero_Images/hero_gateways.png | snippets/assets/domain/00_HOME/Hero_Images/hero_gateways.png | true | ok |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/Hero_Images/hero_gpu.png | snippets/assets/domain/00_HOME/Hero_Images/hero_gpu.png | true | ok |  |  |  |
| external-https | https://www.mintlify.com/docs/components/tiles |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/Hero_Images/hero_about.png | snippets/assets/domain/00_HOME/Hero_Images/hero_about.png | true | ok |  |  |  |
| internal-rooted | /snippets/assets/domain/00_HOME/Hero_Images/hero_community.png | snippets/assets/domain/00_HOME/Hero_Images/hero_community.png | true | ok |  |  |  |

### v2/internal/layout-components-scripts-styling/pages.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/internal/personas.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | "https://github.com/shtukaresearch/livepeer-data-geography/tree/main/roles" |  | null | 🟡 untested-external |  |  |  |

### v2/internal/references.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/internal/strategic-alignment.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/lpt/about/mechanics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/lpt/about/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./tokenomics | v2/lpt/about/tokenomics.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/lpt/about/purpose.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/lpt/about/tokenomics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/lpt/delegation/about-delegators.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/lpt/delegation/delegation-economics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/lpt/delegation/delegation-guide.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/lpt/delegation/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/lpt/governance/model.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/lpt/governance/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/lpt/governance/processes.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/lpt/resources/delegator-videos-and-blogs.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.youtube.com/watch?v=6nZrZHz12-g |  | null | 🟡 untested-external |  |  |  |
| external-https | https://medium.com/coinmonks/how-to-stake-your-lpt-tokens-with-livepeer-the-complete-guide-to-become-a-delegator-d8f5477d287d |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://medium.com/stakecapital/livepeer-delegation-tutorial-f7673cc888db |  | null | 🟡 untested-external |  |  |  |
| external-https | https://medium.com/figment/livepeer-delegation-guide-517e2d64792e |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.figment.io/insights/livepeer-staking-delegation-guide-2/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.staked.us/blog/livepeer-lpt-staking-guide |  | null | 🟡 untested-external |  |  |  |
| external-https | https://deficrypto.dev/how-to-delegate-lpt-livepeer-arbitrum/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://medium.com/livepeer-blog/an-overview-of-the-livepeer-network-and-lpt-44985f9321ff |  | null | 🟡 untested-external |  |  |  |
| external-https | https://medium.com/livepeer-blog/an-updated-livepeer-explorer-is-now-live-1c10c599cf28 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.koinx.com/staking-guides/how-to-stake-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.livepeer.org/delegate |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.org/delegators |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/migrate |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.org/resources |  | null | 🟡 untested-external |  |  |  |

### v2/lpt/resources/exchanges.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.coingecko.com/en/coins/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.huobi.com/en-us/exchange/lpt_usdt |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.binance.com/en/trade/LPT_USDC?ref=37754157 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.hotcoin.com/en_US/trade/exchange/?tradeCode=lpt_usdt |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.pionex.com/en/trade/LPT_USDT/Bot |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.btse.com/en/trading/LPT-USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://whitebit.com/trade/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.websea.com/en/trade/LPT-USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coinw.com/spot/lptusdt |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.cointr.com/en/spot/LPTTRY?type=spot |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.okx.com/trade-spot/lpt-usdt |  | null | 🟡 untested-external |  |  |  |
| external-https | https://bitdelta.com/en/trade/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.btcc.com/en-US/spot/LPTUSDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.toobit.com/en-US/spot/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.biconomy.com/exchange/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://account.bitvavo.com/markets/LPT-EUR |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coinstore.com/#/spot/LPTUSDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.tapbit.com/spot/exchange/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.lbank.com/trade/lpt_usdt |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.orangex.com/spot/LPT-USDT-SPOT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.gate.com/trade/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blofin.com/spot/LPT-USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://upbit.com/exchange?code=CRIX.UPBIT.KRW-LPT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.mexc.com/exchange/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.kcex.com/exchange/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.grovex.io/en_US/trade/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://azbit.com/exchange/LPT_USDT?referralCode=OH5QDS1 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.bithumb.com/trade/order/LPT_KRW |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coinbase.com/advanced-trade/spot/LPT-USD |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coinup.io/en_US/trade/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.bydfi.com/en/spot/lpt_usdt |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.bitvenus.me/exchange/LPT/USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://bingx.com/en/spot/LPTUSDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.bitget.com/spot/LPTUSDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.bitunix.com/spot-trade/LPTUSDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.bitmart.com/trade/en?symbol=LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.xt.com/en/trade/lpt_usdt |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.paribu.com/markets/lpt_tl?view=classic |  | null | 🟡 untested-external |  |  |  |
| external-https | https://pro.btcturk.com/pro/al-sat/LPT_TRY |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.ourbit.com/exchange/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coincatch.com/en/spot/LPTUSDT_SPBL |  | null | 🟡 untested-external |  |  |  |
| external-https | https://niza.io/en/trade/lpt-usdt |  | null | 🟡 untested-external |  |  |  |
| external-https | https://pro.kraken.com/app/trade/LPT-USD |  | null | 🟡 untested-external |  |  |  |
| external-https | https://tothemoon.com/trading/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.uniswap.org/explore/tokens/arbitrum/0x289ba1701c2f088cf0faf8b3705246331cb8a839 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.kucoin.com/trade/LPT-USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.bitbank.cc/trade/lpt_jpy |  | null | 🟡 untested-external |  |  |  |
| external-https | https://exchange.pointpay.io/trade-classic/LPT_USDC |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.coinex.com/en/exchange/lpt-usdt? |  | null | 🟡 untested-external |  |  |  |
| external-https | https://latoken.com/exchange/USDT-LPT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.digifinex.com/en-ww/trade/USDT/LPT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://bitkan.com/trade/LPT-USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://pro.bit2me.com/exchange/LPT-EUR |  | null | 🟡 untested-external |  |  |  |
| external-https | https://crypto.com/exchange/trade/spot/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.icrypex.com/en/trade/spot/LPTUSDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.uniswap.org/explore/tokens/ethereum/0x58b6a8a3302369daec383334672404ee733ab239 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.weex.com/spot/LPT-USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.xbo.com/platform/spot/LPT-USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.uniswap.org/explore/tokens/ethereum/0x58b6a8a3302369daec383334672404ee733ab239 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://hibt.com/trade/LPT-USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.bitrue.com/trade/lpt_usdt |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.bitlo.com/kolay-alis-satis/LPT-TRY |  | null | 🟡 untested-external |  |  |  |
| external-https | https://trade.kanga.exchange/market/LPT-USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.binance.us/trade/pro/LPT_USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://coindcx.com/trade/LPTINR |  | null | 🟡 untested-external |  |  |  |
| external-https | https://exchange.gemini.com/trade/LPTUSD |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.tokocrypto.com/trade/LPTUSDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.uniswap.org/#/swap?inputCurrency=0x58b6a8a3302369daec383334672404ee733ab239&outputCurrency=0x0000000000000000000000000000000000000000 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://nami.exchange/trade/LPT-USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://indodax.com/market/LPTIDR |  | null | 🟡 untested-external |  |  |  |
| external-https | https://trade.zondacrypto.exchange/market/lpt/pln |  | null | 🟡 untested-external |  |  |  |
| empty | # |  | null | skipped |  |  |  |
| external-https | https://trade.cex.io/spot/LPT-USDT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.mercadobitcoin.com.br/criptomoedas/LPT-BRL |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.bitkub.com/market/LPT |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.uniswap.org/explore/tokens/ethereum/0x58b6a8a3302369daec383334672404ee733ab239 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.uniswap.org/explore/tokens/ethereum/0x58b6a8a3302369daec383334672404ee733ab239 |  | null | 🟡 untested-external |  |  |  |

### v2/lpt/resources/lpt-eth-usage.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer/blob/5691cb48/cmd/livepeer/starter.go#L891-L908 |  | null | 🟡 untested-external |  |  |  |

### v2/lpt/token-portal.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #whats-a-gateway |  | null | skipped |  |  |  |
| empty | #gateway-services--providers |  | null | skipped |  |  |  |
| empty | #run-a-gateway |  | null | skipped |  |  |  |
| empty | #gateway-tools--dashboards |  | null | skipped |  |  |  |
| empty | #gateway-guides--resources |  | null | skipped |  |  |  |
| external-https | https://explorer.livepeer.org/voting |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./about/overview | v2/lpt/about/overview.mdx | true | ok |  |  |  |
| internal-relative | ./delegation/overview | v2/lpt/delegation/overview.mdx | true | ok |  |  |  |
| internal-relative | ./governance/overview | v2/lpt/governance/overview.mdx | true | ok |  |  |  |
| internal-relative | ./treasury/overview | v2/lpt/treasury/overview.mdx | true | ok |  |  |  |
| internal-relative | ./governance/overview | v2/lpt/governance/overview.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/Portals.jsx | snippets/components/domain/SHARED/Portals.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/frameMode.jsx | snippets/components/display/frameMode.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/HeroGif.jsx | snippets/components/domain/SHARED/HeroGif.jsx | true | ok |  |  |  |

### v2/lpt/treasury/allocations.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/lpt/treasury/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/lpt/treasury/proposals.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/protocol |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.livepeer.org/references/contract-addresses |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/content/math.jsx | snippets/components/content/math.jsx | true | ok |  |  |  |

### v2/orchestrators/about-orchestrators/architecture.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/orchestrators/about-orchestrators/economics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://messari.io/report/how-are-web3-infrastructure-protocols-trying-to-capture-value |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.org/depin |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/orchestrators/about-orchestrators/orchestrator-functions.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |
| import-path | /snippets/pages/05_GPUS/Diagrams/orchestratorRole.mdx | snippets/pages/05_GPUS/Diagrams/orchestratorRole.mdx | true | ok |  |  |  |

### v2/orchestrators/about-orchestrators/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /developers/ai-inference-on-livepeer/byoc | v2/developers/ai-inference-on-livepeer/byoc.mdx | true | ok |  |  |  |
| external-https | https://github.com/shtukaresearch/livepeer-data-geography/blob/651a56e8c8290b30855f1393543ee9e0961c071c/roles/orchestrator-delegate.md |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../quickstart/join-a-pool | v2/orchestrators/quickstart/join-a-pool.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/data-centre-setup | v2/orchestrators/setting-up-an-orchestrator/data-centre-setup.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/orchestrators/about-orchestrators/random.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/orchestrators/advanced-setup/ai-pipelines.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../setting-up-an-orchestrator/setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer | v2/orchestrators/setting-up-an-orchestrator/setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer | v2/orchestrators/setting-up-an-orchestrator/setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ./rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |
| internal-relative | ../orchestrator-tools-and-resources/orchestrator-guides | v2/orchestrators/orchestrator-tools-and-resources/orchestrator-guides.mdx | true | ok |  |  |  |

### v2/orchestrators/advanced-setup/delegation.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://explorer.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./staking-LPT | v2/orchestrators/advanced-setup/staking-LPT.mdx | true | ok |  |  |  |
| internal-relative | ./rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |
| external-https | https://explorer.livepeer.org |  | null | 🟡 untested-external |  |  |  |

### v2/orchestrators/advanced-setup/rewards-and-fees.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./staking-LPT | v2/orchestrators/advanced-setup/staking-LPT.mdx | true | ok |  |  |  |
| internal-relative | ./delegation | v2/orchestrators/advanced-setup/delegation.mdx | true | ok |  |  |  |
| internal-relative | ../about-orchestrators/economics | v2/orchestrators/about-orchestrators/economics.mdx | true | ok |  |  |  |
| internal-relative | ../references/cli-flags | v2/orchestrators/references/cli-flags.mdx | true | ok |  |  |  |

### v2/orchestrators/advanced-setup/run-a-pool.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../orchestrator-tools-and-resources/community-pools | v2/orchestrators/orchestrator-tools-and-resources/community-pools.mdx | true | ok |  |  |  |
| external-https | https://forum.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.gg/livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../quickstart/join-a-pool | v2/orchestrators/quickstart/join-a-pool.mdx | true | ok |  |  |  |
| internal-relative | ../orchestrator-tools-and-resources/community-pools | v2/orchestrators/orchestrator-tools-and-resources/community-pools.mdx | true | ok |  |  |  |
| internal-relative | ./staking-LPT | v2/orchestrators/advanced-setup/staking-LPT.mdx | true | ok |  |  |  |
| internal-relative | ./rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |

### v2/orchestrators/advanced-setup/staking-LPT.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |
| internal-relative | ./delegation | v2/orchestrators/advanced-setup/delegation.mdx | true | ok |  |  |  |
| internal-relative | ./rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |
| internal-relative | ./delegation | v2/orchestrators/advanced-setup/delegation.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| external-https | https://explorer.livepeer.org |  | null | 🟡 untested-external |  |  |  |

### v2/orchestrators/orchestrator-tools-and-resources/community-pools.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../quickstart/join-a-pool | v2/orchestrators/quickstart/join-a-pool.mdx | true | ok |  |  |  |
| empty | # |  | null | skipped |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/orchestrators/orchestrator-tools-and-resources/orchestrator-community-and-help.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/orchestrators/orchestrator-tools-and-resources/orchestrator-guides.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/orchestrators/orchestrator-tools-and-resources/orchestrator-resources.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/orchestrators/orchestrator-tools-and-resources/orchestrator-tools.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/orchestrators/orchestrators-portal.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #whats-a-gateway |  | null | skipped |  |  |  |
| empty | #gateway-services--providers |  | null | skipped |  |  |  |
| empty | #run-a-gateway |  | null | skipped |  |  |  |
| empty | #gateway-tools--dashboards |  | null | skipped |  |  |  |
| empty | #gateway-guides--resources |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./about-orchestrators/overview | v2/orchestrators/about-orchestrators/overview.mdx | true | ok |  |  |  |
| internal-relative | ./setting-up-an-orchestrator/hardware-requirements | v2/orchestrators/setting-up-an-orchestrator/hardware-requirements.mdx | true | ok |  |  |  |
| internal-relative | ./advanced-setup/ai-pipelines | v2/orchestrators/advanced-setup/ai-pipelines.mdx | true | ok |  |  |  |
| internal-relative | ./advanced-setup/ai-pipelines | v2/orchestrators/advanced-setup/ai-pipelines.mdx | true | ok |  |  |  |
| internal-relative | ./orchestrator-tools-and-resources/orchestrator-guides | v2/orchestrators/orchestrator-tools-and-resources/orchestrator-guides.mdx | true | ok |  |  |  |
| internal-relative | ./references/faq | v2/orchestrators/references/faq.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/Portals.jsx | snippets/components/domain/SHARED/Portals.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/frameMode.jsx | snippets/components/display/frameMode.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/HeroGif.jsx | snippets/components/domain/SHARED/HeroGif.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |

### v2/orchestrators/quickstart/join-a-pool.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://titan-node.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.gg/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |

### v2/orchestrators/quickstart/orchestrator-setup.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../setting-up-an-orchestrator/install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/connect-to-arbitrum | v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx | true | ok |  |  |  |
| external-https | https://github.com/fullstorydev/grpcurl |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.nvidia.com/Download/index.aspx |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/connect-to-arbitrum | v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/connect-to-arbitrum | v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx | true | ok |  |  |  |
| external-https | https://explorer.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://explorer.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../advanced-setup/staking-LPT | v2/orchestrators/advanced-setup/staking-LPT.mdx | true | ok |  |  |  |
| internal-relative | ../advanced-setup/rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/install-go-livepeer#activate | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/connect-to-arbitrum | v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx | true | ok |  |  |  |
| internal-relative | ../references/cli-flags | v2/orchestrators/references/cli-flags.mdx | true | ok |  |  |  |
| internal-relative | ../references/faq | v2/orchestrators/references/faq.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |

### v2/orchestrators/quickstart/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./join-a-pool | v2/orchestrators/quickstart/join-a-pool.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/data-centre-setup | v2/orchestrators/setting-up-an-orchestrator/data-centre-setup.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/orchestrators/references/cli-flags.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/orchestrators/references/faq.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../setting-up-an-orchestrator/install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../quickstart/orchestrator-setup | v2/orchestrators/quickstart/orchestrator-setup.mdx | true | ok |  |  |  |
| internal-relative | ../advanced-setup/rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |
| internal-relative | ../quickstart/join-a-pool | v2/orchestrators/quickstart/join-a-pool.mdx | true | ok |  |  |  |
| internal-relative | ../advanced-setup/run-a-pool | v2/orchestrators/advanced-setup/run-a-pool.mdx | true | ok |  |  |  |
| external-https | https://explorer.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/orchestrator-stats | v2/orchestrators/setting-up-an-orchestrator/orchestrator-stats.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/connect-to-arbitrum | v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx | true | ok |  |  |  |
| internal-relative | ./cli-flags | v2/orchestrators/references/cli-flags.mdx | true | ok |  |  |  |
| internal-relative | ./cli-flags | v2/orchestrators/references/cli-flags.mdx | true | ok |  |  |  |
| internal-relative | ../advanced-setup/rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |
| internal-relative | ../advanced-setup/staking-LPT | v2/orchestrators/advanced-setup/staking-LPT.mdx | true | ok |  |  |  |
| internal-relative | ../setting-up-an-orchestrator/orchestrator-stats | v2/orchestrators/setting-up-an-orchestrator/orchestrator-stats.mdx | true | ok |  |  |  |

### v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://arbitrum.io/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://infura.io/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.alchemy.com/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://developer.offchainlabs.com/docs/running_node |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../references/cli-flags | v2/orchestrators/references/cli-flags.mdx | true | ok |  |  |  |
| internal-relative | ./install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../quickstart/orchestrator-setup | v2/orchestrators/quickstart/orchestrator-setup.mdx | true | ok |  |  |  |
| internal-relative | ../references/cli-flags | v2/orchestrators/references/cli-flags.mdx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |

### v2/orchestrators/setting-up-an-orchestrator/data-centre-setup.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/orchestrators/setting-up-an-orchestrator/data-centres-and-large-scale-hardware-providers.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/orchestrators/setting-up-an-orchestrator/enterprise-and-data-centres.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/orchestrators/setting-up-an-orchestrator/hardware-requirements.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ./orchestrator-stats | v2/orchestrators/setting-up-an-orchestrator/orchestrator-stats.mdx | true | ok |  |  |  |
| internal-relative | ./data-centre-setup | v2/orchestrators/setting-up-an-orchestrator/data-centre-setup.mdx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |

### v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.docker.com/get-docker/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html |  | null | 🟡 untested-external |  |  |  |
| external-https | https://developer.nvidia.com/cuda-downloads |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/bash-script-to-update-livepeer/1513 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://hub.docker.com/r/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://go.dev/doc/install |  | null | 🟡 untested-external |  |  |  |
| external-https | https://developer.nvidia.com/cuda-toolkit |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../quickstart/orchestrator-setup | v2/orchestrators/quickstart/orchestrator-setup.mdx | true | ok |  |  |  |
| internal-relative | ../advanced-setup/staking-LPT | v2/orchestrators/advanced-setup/staking-LPT.mdx | true | ok |  |  |  |
| internal-relative | ../advanced-setup/rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |
| external-https | https://explorer.livepeer.org/leaderboard |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../quickstart/orchestrator-setup | v2/orchestrators/quickstart/orchestrator-setup.mdx | true | ok |  |  |  |
| internal-relative | ./connect-to-arbitrum | v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx | true | ok |  |  |  |
| internal-relative | ../references/cli-flags | v2/orchestrators/references/cli-flags.mdx | true | ok |  |  |  |
| internal-relative | ../references/faq | v2/orchestrators/references/faq.mdx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |

### v2/orchestrators/setting-up-an-orchestrator/orch-config.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer | v2/orchestrators/setting-up-an-orchestrator/setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer.mdx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |

### v2/orchestrators/setting-up-an-orchestrator/orchestrator-stats.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://explorer.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../advanced-setup/rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |
| internal-relative | ../references/faq | v2/orchestrators/references/faq.mdx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |

### v2/orchestrators/setting-up-an-orchestrator/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./hardware-requirements | v2/orchestrators/setting-up-an-orchestrator/hardware-requirements.mdx | true | ok |  |  |  |
| internal-relative | ./install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ./connect-to-arbitrum | v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx | true | ok |  |  |  |
| internal-relative | ./setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer | v2/orchestrators/setting-up-an-orchestrator/setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../quickstart/orchestrator-setup | v2/orchestrators/quickstart/orchestrator-setup.mdx | true | ok |  |  |  |
| internal-relative | ./orchestrator-stats | v2/orchestrators/setting-up-an-orchestrator/orchestrator-stats.mdx | true | ok |  |  |  |
| internal-relative | ../about-orchestrators/overview | v2/orchestrators/about-orchestrators/overview.mdx | true | ok |  |  |  |
| internal-relative | ../quickstart/join-a-pool | v2/orchestrators/quickstart/join-a-pool.mdx | true | ok |  |  |  |
| internal-relative | ../advanced-setup/staking-LPT | v2/orchestrators/advanced-setup/staking-LPT.mdx | true | ok |  |  |  |
| internal-relative | ../advanced-setup/rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |
| internal-relative | ./hardware-requirements | v2/orchestrators/setting-up-an-orchestrator/hardware-requirements.mdx | true | ok |  |  |  |
| internal-relative | ./install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ./connect-to-arbitrum | v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx | true | ok |  |  |  |
| internal-relative | ./setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer | v2/orchestrators/setting-up-an-orchestrator/setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ./orchestrator-stats | v2/orchestrators/setting-up-an-orchestrator/orchestrator-stats.mdx | true | ok |  |  |  |
| internal-relative | ../quickstart/orchestrator-setup | v2/orchestrators/quickstart/orchestrator-setup.mdx | true | ok |  |  |  |

### v2/orchestrators/setting-up-an-orchestrator/publish-offerings.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/orchestrators/setting-up-an-orchestrator/setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../connect-to-arbitrum | v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx | true | ok |  |  |  |
| internal-relative | ../../advanced-setup/ai-pipelines | v2/orchestrators/advanced-setup/ai-pipelines.mdx | true | ok |  |  |  |
| internal-rooted | /developers/ai-inference-on-livepeer/byoc | v2/developers/ai-inference-on-livepeer/byoc.mdx | true | ok |  |  |  |
| external-https | https://explorer.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../install-go-livepeer | v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx | true | ok |  |  |  |
| internal-relative | ../connect-to-arbitrum | v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx | true | ok |  |  |  |
| internal-relative | ../../references/cli-flags | v2/orchestrators/references/cli-flags.mdx | true | ok |  |  |  |
| internal-relative | ../../advanced-setup/rewards-and-fees | v2/orchestrators/advanced-setup/rewards-and-fees.mdx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |

### v2/platforms/daydream/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://discord.com/invite/mnfGR4Fjhp |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/daydreamlive/scope |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/daydream/overview/overview | v2/platforms/daydream/overview/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/daydream/overview/quickstart | v2/platforms/daydream/overview/quickstart.mdx | true | ok |  |  |  |
| external-https | https://docs.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/introducing-daydream/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/daydream-live-a-glimpse-into-the-future-of-realtime-ai-video-on-livepeer/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/getting-started-with-daydream-transform-your-videos-with-ai-magic/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |

### v2/platforms/daydream/overview/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://daydream.live |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/gateways-portal | v2/gateways/gateways-portal.mdx | true | ok |  |  |  |
| external-https | https://www.youtube.com/watch?v=uLXtpFVrtP4 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.youtube.com/watch?v=yeoGzSWdNGM |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/introducing-daydream/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/daydream-live-a-glimpse-into-the-future-of-realtime-ai-video-on-livepeer/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/getting-started-with-daydream-transform-your-videos-with-ai-magic/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.com/invite/mnfGR4Fjhp |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/daydreamlive/scope |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/daydream/overview/quickstart | v2/platforms/daydream/overview/quickstart.mdx | true | ok |  |  |  |
| external-https | https://docs.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |

### v2/platforms/daydream/overview/quickstart.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://daydream.live |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/gateways/gateways-portal | v2/gateways/gateways-portal.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/daydream/overview/overview | v2/platforms/daydream/overview/overview.mdx | true | ok |  |  |  |
| external-https | https://docs.daydream.live/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://discord.com/invite/mnfGR4Fjhp |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.daydream.live/ |  | null | 🟡 untested-external |  |  |  |

### v2/platforms/ecosystem-products.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/embody/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /snippets/assets/domain/10_PRODUCTS/Embody/Videos/arealiensreal.mp4 | snippets/assets/domain/10_PRODUCTS/Embody/Videos/arealiensreal.mp4 | true | ok |  |  |  |
| external-https | https://embody.zone/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://embody.zone/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/embody-unreal-engine-updates/3186 |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |

### v2/platforms/frameworks/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer-frameworks/monorepo |  | null | 🟡 untested-external |  |  |  |
| external-https | https://frameworks.network/contact |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/frameworks/overview/overview | v2/platforms/frameworks/overview/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/frameworks/overview/quickstart | v2/platforms/frameworks/overview/quickstart.mdx | true | ok |  |  |  |
| external-https | https://docs.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/pre-proposal-livepeer-frameworks-spe-pilot-phase/2773 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |

### v2/platforms/frameworks/overview/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.youtube.com/watch?v=DKBRp0U-RKw |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org/t/pre-proposal-livepeer-frameworks-spe-pilot-phase/2773 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer-frameworks/monorepo |  | null | 🟡 untested-external |  |  |  |
| external-https | https://frameworks.network/contact |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/frameworks/overview/quickstart | v2/platforms/frameworks/overview/quickstart.mdx | true | ok |  |  |  |
| external-https | https://docs.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |

### v2/platforms/frameworks/overview/quickstart.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://docs.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://docs.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://frameworks.network/SKILL.md |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/frameworks/overview/overview | v2/platforms/frameworks/overview/overview.mdx | true | ok |  |  |  |
| external-https | https://docs.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://app.frameworks.network/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer-frameworks/monorepo |  | null | 🟡 untested-external |  |  |  |

### v2/platforms/livepeer-studio/access-control/jwt.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/docs/api-reference/signing-key/create |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |

### v2/platforms/livepeer-studio/access-control/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | webhooks | v2/platforms/livepeer-studio/access-control/webhooks.mdx | true | ok |  |  |  |
| internal-relative | jwt | v2/platforms/livepeer-studio/access-control/jwt.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/access-control/webhooks.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/dashboard/developers/webhooks |  | null | 🟡 untested-external |  |  |  |

### v2/platforms/livepeer-studio/analytics/listen-to-events.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/dashboard/developers/webhooks |  | null | 🟡 untested-external |  |  |  |
| internal-relative | webhooks | v2/platforms/livepeer-studio/analytics/webhooks.mdx | true | ok |  |  |  |
| internal-relative | webhooks | v2/platforms/livepeer-studio/analytics/webhooks.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |

### v2/platforms/livepeer-studio/analytics/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/docs/api-reference/viewership/get-viewership-metrics |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../player | v2/platforms/livepeer-studio/player.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/viewership/get-viewership-metrics |  | null | 🟡 untested-external |  |  |  |

### v2/platforms/livepeer-studio/analytics/webhooks.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/dashboard/developers/webhooks |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://ngrok.com |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../analytics/listen-to-events | v2/platforms/livepeer-studio/analytics/listen-to-events.mdx | true | ok |  |  |  |
| internal-relative | ../access-control/webhooks | v2/platforms/livepeer-studio/access-control/webhooks.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/api-reference/assets/delete.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/assets/get-all.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/assets/get.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/assets/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./upload | v2/platforms/livepeer-studio/api-reference/assets/upload.mdx | true | ok |  |  |  |
| internal-relative | ./upload-via-url | v2/platforms/livepeer-studio/api-reference/assets/upload-via-url.mdx | true | ok |  |  |  |
| internal-relative | ./get | v2/platforms/livepeer-studio/api-reference/assets/get.mdx | true | ok |  |  |  |
| internal-relative | ./get-all | v2/platforms/livepeer-studio/api-reference/assets/get-all.mdx | true | ok |  |  |  |
| internal-relative | ./update | v2/platforms/livepeer-studio/api-reference/assets/update.mdx | true | ok |  |  |  |
| internal-relative | ./delete | v2/platforms/livepeer-studio/api-reference/assets/delete.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/api-reference/assets/update.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/assets/upload-via-url.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/assets/upload.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/multistream/create.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/multistream/delete.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/multistream/get-all.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/multistream/get.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/multistream/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/multistream/update.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/playback/get.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/playback/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./get | v2/platforms/livepeer-studio/api-reference/playback/get.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/api-reference/rooms/create-user.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/rooms/create.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/rooms/delete.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/rooms/get-user.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/rooms/get.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/rooms/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/rooms/remove-user.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/rooms/start-egress.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/rooms/stop-egress.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/rooms/update-user.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/rooms/update.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/sessions/get-all.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/sessions/get-clip.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/sessions/get-recording.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/sessions/get.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/sessions/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/signing-keys/create.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/signing-keys/delete.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/signing-keys/get-all.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/signing-keys/get.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/signing-keys/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/signing-keys/update.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/streams/add-multistream-target.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/streams/create-clip.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/streams/create.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/streams/delete-multistream-target.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/streams/delete.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/streams/get-all.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/streams/get-clip.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/streams/get.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/streams/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./create | v2/platforms/livepeer-studio/api-reference/streams/create.mdx | true | ok |  |  |  |
| internal-relative | ./get | v2/platforms/livepeer-studio/api-reference/streams/get.mdx | true | ok |  |  |  |
| internal-relative | ./get-all | v2/platforms/livepeer-studio/api-reference/streams/get-all.mdx | true | ok |  |  |  |
| internal-relative | ./update | v2/platforms/livepeer-studio/api-reference/streams/update.mdx | true | ok |  |  |  |
| internal-relative | ./delete | v2/platforms/livepeer-studio/api-reference/streams/delete.mdx | true | ok |  |  |  |
| internal-relative | ./terminate | v2/platforms/livepeer-studio/api-reference/streams/terminate.mdx | true | ok |  |  |  |
| internal-relative | ./create-clip | v2/platforms/livepeer-studio/api-reference/streams/create-clip.mdx | true | ok |  |  |  |
| internal-relative | ./get-clip | v2/platforms/livepeer-studio/api-reference/streams/get-clip.mdx | true | ok |  |  |  |
| internal-relative | ./add-multistream-target | v2/platforms/livepeer-studio/api-reference/streams/add-multistream-target.mdx | true | ok |  |  |  |
| internal-relative | ./delete-multistream-target | v2/platforms/livepeer-studio/api-reference/streams/delete-multistream-target.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/api-reference/streams/terminate.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/streams/update.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/tasks/get-all.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/tasks/get.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/tasks/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/transcode/create.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/transcode/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/viewership/get-creators-metrics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/viewership/get-public-total-views.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/viewership/get-realtime-viewership.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/viewership/get-usage-metrics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/viewership/get-viewership-metrics.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/viewership/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/webhooks/create.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/webhooks/delete.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/webhooks/get-all.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/webhooks/get.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/webhooks/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/api-reference/webhooks/update.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/client-use-cases.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/get-started/authentication.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/get-started/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../quickstart | v2/platforms/livepeer-studio/quickstart.mdx | true | ok |  |  |  |
| internal-relative | ../reference/overview | v2/platforms/livepeer-studio/reference/overview.mdx | true | ok |  |  |  |
| internal-relative | ../overview | v2/platforms/livepeer-studio/overview.mdx | true | ok |  |  |  |
| internal-relative | ../quickstart | v2/platforms/livepeer-studio/quickstart.mdx | true | ok |  |  |  |
| internal-relative | ./authentication | v2/platforms/livepeer-studio/get-started/authentication.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/get-started/studio-cli.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/dashboard/developers/api-keys |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/dashboard |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/livepeer-studio/livestream/overview | v2/platforms/livepeer-studio/livestream/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/video-on-demand/overview | v2/platforms/livepeer-studio/video-on-demand/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/reference/sdks | v2/platforms/livepeer-studio/reference/sdks.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/livepeer-studio.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | overview | v2/platforms/livepeer-studio/overview.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/livestream/clip-livestream.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/docs/api-reference/stream/create-clip |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.npmjs.com/package/@livepeer/react#player |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/playback/get |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../player | v2/platforms/livepeer-studio/player.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/stream/get-clip |  | null | 🟡 untested-external |  |  |  |

### v2/platforms/livepeer-studio/livestream/create-livestream.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/docs/api-reference/stream/create |  | null | 🟡 untested-external |  |  |  |
| internal-relative | livestream-from-browser | v2/platforms/livepeer-studio/livestream/livestream-from-browser.mdx | true | ok |  |  |  |
| internal-relative | ../player | v2/platforms/livepeer-studio/player.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/playback/get |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./playback-livestream | v2/platforms/livepeer-studio/livestream/playback-livestream.mdx | true | ok |  |  |  |
| internal-relative | stream-via-obs | v2/platforms/livepeer-studio/livestream/stream-via-obs.mdx | true | ok |  |  |  |
| internal-relative | livestream-from-browser | v2/platforms/livepeer-studio/livestream/livestream-from-browser.mdx | true | ok |  |  |  |
| internal-relative | multistream | v2/platforms/livepeer-studio/livestream/multistream.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/livestream/livestream-from-browser.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../player | v2/platforms/livepeer-studio/player.mdx | true | ok |  |  |  |
| internal-relative | playback-livestream | v2/platforms/livepeer-studio/livestream/playback-livestream.mdx | true | ok |  |  |  |
| internal-relative | optimize-latency | v2/platforms/livepeer-studio/livestream/optimize-latency.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/livestream/multistream.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/docs/api-reference/multistream/create |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/stream/create |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/stream/update |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/dashboard/streams |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/stream/add-multistream-target |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/stream/delete-multistream-target |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../analytics/listen-to-events | v2/platforms/livepeer-studio/analytics/listen-to-events.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/livestream/optimize-latency.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../player | v2/platforms/livepeer-studio/player.mdx | true | ok |  |  |  |
| internal-relative | stream-via-obs | v2/platforms/livepeer-studio/livestream/stream-via-obs.mdx | true | ok |  |  |  |
| internal-relative | stream-via-obs | v2/platforms/livepeer-studio/livestream/stream-via-obs.mdx | true | ok |  |  |  |
| internal-relative | livestream-from-browser | v2/platforms/livepeer-studio/livestream/livestream-from-browser.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio |  | null | 🟡 untested-external |  |  |  |

### v2/platforms/livepeer-studio/livestream/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/docs/api-reference/session/get-all |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./stream-via-obs | v2/platforms/livepeer-studio/livestream/stream-via-obs.mdx | true | ok |  |  |  |
| internal-relative | ./livestream-from-browser | v2/platforms/livepeer-studio/livestream/livestream-from-browser.mdx | true | ok |  |  |  |
| internal-relative | ./stream-health | v2/platforms/livepeer-studio/livestream/stream-health.mdx | true | ok |  |  |  |
| internal-relative | ./multistream | v2/platforms/livepeer-studio/livestream/multistream.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/player | v2/platforms/livepeer-studio/player.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/playback/get |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./stream-via-obs | v2/platforms/livepeer-studio/livestream/stream-via-obs.mdx | true | ok |  |  |  |
| internal-relative | ../analytics/webhooks | v2/platforms/livepeer-studio/analytics/webhooks.mdx | true | ok |  |  |  |
| internal-relative | ../analytics/listen-to-events | v2/platforms/livepeer-studio/analytics/listen-to-events.mdx | true | ok |  |  |  |
| internal-relative | ./create-livestream | v2/platforms/livepeer-studio/livestream/create-livestream.mdx | true | ok |  |  |  |
| internal-relative | ./playback-livestream | v2/platforms/livepeer-studio/livestream/playback-livestream.mdx | true | ok |  |  |  |
| internal-relative | ./stream-via-obs | v2/platforms/livepeer-studio/livestream/stream-via-obs.mdx | true | ok |  |  |  |
| internal-relative | ./livestream-from-browser | v2/platforms/livepeer-studio/livestream/livestream-from-browser.mdx | true | ok |  |  |  |
| internal-relative | ./multistream | v2/platforms/livepeer-studio/livestream/multistream.mdx | true | ok |  |  |  |
| internal-relative | ./clip-livestream | v2/platforms/livepeer-studio/livestream/clip-livestream.mdx | true | ok |  |  |  |
| internal-relative | ./stream-health | v2/platforms/livepeer-studio/livestream/stream-health.mdx | true | ok |  |  |  |
| internal-relative | ./optimize-latency | v2/platforms/livepeer-studio/livestream/optimize-latency.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/livestream/playback-livestream.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/docs/api-reference/playback/get |  | null | 🟡 untested-external |  |  |  |
| internal-relative | stream-via-obs | v2/platforms/livepeer-studio/livestream/stream-via-obs.mdx | true | ok |  |  |  |
| internal-relative | ../player | v2/platforms/livepeer-studio/player.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/livestream/stream-health.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/dashboard/streams |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/stream/get |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/session/get |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| internal-relative | stream-via-obs | v2/platforms/livepeer-studio/livestream/stream-via-obs.mdx | true | ok |  |  |  |
| internal-relative | optimize-latency | v2/platforms/livepeer-studio/livestream/optimize-latency.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/livestream/stream-via-obs.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://obsproject.com/ |  | null | 🟡 untested-external |  |  |  |
| internal-relative | create-livestream | v2/platforms/livepeer-studio/livestream/create-livestream.mdx | true | ok |  |  |  |
| internal-relative | create-livestream | v2/platforms/livepeer-studio/livestream/create-livestream.mdx | true | ok |  |  |  |
| internal-relative | optimize-latency | v2/platforms/livepeer-studio/livestream/optimize-latency.mdx | true | ok |  |  |  |
| internal-relative | ./playback-livestream | v2/platforms/livepeer-studio/livestream/playback-livestream.mdx | true | ok |  |  |  |
| internal-relative | optimize-latency | v2/platforms/livepeer-studio/livestream/optimize-latency.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://pipelines.livepeer.org/docs |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/daydream/overview | v2/platforms/daydream/overview.mdx | true | ok |  |  |  |
| external-https | https://www.npmjs.com/package/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://pkg.go.dev/github.com/livepeer/livepeer-go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://pypi.org/project/livepeer/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.npmjs.com/package/@livepeer/react |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/livepeer-studio/reference/api | v2/platforms/livepeer-studio/reference/api.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /gateways/using-gateways/gateway-providers/livepeer-studio-gateway | v2/gateways/using-gateways/gateway-providers/livepeer-studio-gateway.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/livepeer-studio/client-use-cases | v2/platforms/livepeer-studio/client-use-cases.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/quickstart | v2/platforms/livepeer-studio/quickstart.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/get-started/studio-cli | v2/platforms/livepeer-studio/get-started/studio-cli.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/livestream/overview | v2/platforms/livepeer-studio/livestream/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/video-on-demand/overview | v2/platforms/livepeer-studio/video-on-demand/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/access-control/overview | v2/platforms/livepeer-studio/access-control/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/analytics/webhooks | v2/platforms/livepeer-studio/analytics/webhooks.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/player.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/docs/api-reference/playback/get |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./livestream/playback-livestream | v2/platforms/livepeer-studio/livestream/playback-livestream.mdx | true | ok |  |  |  |
| internal-relative | ./video-on-demand/playback-asset | v2/platforms/livepeer-studio/video-on-demand/playback-asset.mdx | true | ok |  |  |  |
| internal-relative | access-control/overview | v2/platforms/livepeer-studio/access-control/overview.mdx | true | ok |  |  |  |
| internal-relative | ./video-on-demand/thumbnails-vod | v2/platforms/livepeer-studio/video-on-demand/thumbnails-vod.mdx | true | ok |  |  |  |
| internal-relative | ./analytics/overview | v2/platforms/livepeer-studio/analytics/overview.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/quickstart.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/livepeer-studio/reference/managing-projects | v2/platforms/livepeer-studio/reference/managing-projects.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/livestream/create-livestream | v2/platforms/livepeer-studio/livestream/create-livestream.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/video-on-demand/upload-asset | v2/platforms/livepeer-studio/video-on-demand/upload-asset.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/analytics/listen-to-events | v2/platforms/livepeer-studio/analytics/listen-to-events.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/reference/sdks | v2/platforms/livepeer-studio/reference/sdks.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/livepeer-studio/reference/api | v2/platforms/livepeer-studio/reference/api.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/reference/api.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/dashboard/developers/api-keys |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./sdks | v2/platforms/livepeer-studio/reference/sdks.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../access-control/overview | v2/platforms/livepeer-studio/access-control/overview.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/reference/managing-projects.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/platforms/livepeer-studio/reference/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../get-started/authentication | v2/platforms/livepeer-studio/get-started/authentication.mdx | true | ok |  |  |  |
| internal-relative | ../get-started/authentication | v2/platforms/livepeer-studio/get-started/authentication.mdx | true | ok |  |  |  |
| internal-relative | ../quickstart | v2/platforms/livepeer-studio/quickstart.mdx | true | ok |  |  |  |
| internal-relative | ./sdks | v2/platforms/livepeer-studio/reference/sdks.mdx | true | ok |  |  |  |
| internal-relative | ./api | v2/platforms/livepeer-studio/reference/api.mdx | true | ok |  |  |  |
| internal-relative | ../api-reference/streams/overview | v2/platforms/livepeer-studio/api-reference/streams/overview.mdx | true | ok |  |  |  |
| internal-relative | ../api-reference/assets/overview | v2/platforms/livepeer-studio/api-reference/assets/overview.mdx | true | ok |  |  |  |
| internal-relative | ../api-reference/playback/overview | v2/platforms/livepeer-studio/api-reference/playback/overview.mdx | true | ok |  |  |  |
| internal-relative | ../api-reference/sessions/overview | v2/platforms/livepeer-studio/api-reference/sessions/overview.mdx | true | ok |  |  |  |
| internal-relative | ../api-reference/multistream/overview | v2/platforms/livepeer-studio/api-reference/multistream/overview.mdx | true | ok |  |  |  |
| internal-relative | ../api-reference/transcode/overview | v2/platforms/livepeer-studio/api-reference/transcode/overview.mdx | true | ok |  |  |  |
| internal-relative | ../api-reference/webhooks/overview | v2/platforms/livepeer-studio/api-reference/webhooks/overview.mdx | true | ok |  |  |  |
| internal-relative | ../api-reference/signing-keys/overview | v2/platforms/livepeer-studio/api-reference/signing-keys/overview.mdx | true | ok |  |  |  |
| internal-relative | ../api-reference/rooms/overview | v2/platforms/livepeer-studio/api-reference/rooms/overview.mdx | true | ok |  |  |  |
| internal-relative | ../api-reference/tasks/overview | v2/platforms/livepeer-studio/api-reference/tasks/overview.mdx | true | ok |  |  |  |
| internal-relative | ../api-reference/viewership/overview | v2/platforms/livepeer-studio/api-reference/viewership/overview.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/reference/sdks.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.npmjs.com/package/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://pkg.go.dev/github.com/livepeer/livepeer-go |  | null | 🟡 untested-external |  |  |  |
| external-https | https://pypi.org/project/livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://www.npmjs.com/package/@livepeer/react |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../player | v2/platforms/livepeer-studio/player.mdx | true | ok |  |  |  |
| internal-relative | ../livestream/livestream-from-browser | v2/platforms/livepeer-studio/livestream/livestream-from-browser.mdx | true | ok |  |  |  |
| internal-relative | ../quickstart | v2/platforms/livepeer-studio/quickstart.mdx | true | ok |  |  |  |
| internal-relative | ./api | v2/platforms/livepeer-studio/reference/api.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |

### v2/platforms/livepeer-studio/video-on-demand/encrypted-assets.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../access-control/overview | v2/platforms/livepeer-studio/access-control/overview.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |

### v2/platforms/livepeer-studio/video-on-demand/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio/docs/api-reference/asset/upload |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/asset/upload-via-url |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./upload-asset | v2/platforms/livepeer-studio/video-on-demand/upload-asset.mdx | true | ok |  |  |  |
| internal-relative | ../livestream/clip-livestream | v2/platforms/livepeer-studio/livestream/clip-livestream.mdx | true | ok |  |  |  |
| internal-relative | ../player | v2/platforms/livepeer-studio/player.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/playback/get |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/viewership/get-viewership-metrics |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../access-control/overview | v2/platforms/livepeer-studio/access-control/overview.mdx | true | ok |  |  |  |
| internal-relative | ./encrypted-assets | v2/platforms/livepeer-studio/video-on-demand/encrypted-assets.mdx | true | ok |  |  |  |
| internal-relative | ./upload-asset | v2/platforms/livepeer-studio/video-on-demand/upload-asset.mdx | true | ok |  |  |  |
| internal-relative | ./playback-asset | v2/platforms/livepeer-studio/video-on-demand/playback-asset.mdx | true | ok |  |  |  |
| internal-relative | ./encrypted-assets | v2/platforms/livepeer-studio/video-on-demand/encrypted-assets.mdx | true | ok |  |  |  |
| internal-relative | ./thumbnails-vod | v2/platforms/livepeer-studio/video-on-demand/thumbnails-vod.mdx | true | ok |  |  |  |
| internal-relative | ./transcode-video | v2/platforms/livepeer-studio/video-on-demand/transcode-video.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/video-on-demand/playback-asset.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../player | v2/platforms/livepeer-studio/player.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/playback/get |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../livestream/playback-livestream | v2/platforms/livepeer-studio/livestream/playback-livestream.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/video-on-demand/thumbnails-vod.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | upload-asset | v2/platforms/livepeer-studio/video-on-demand/upload-asset.mdx | true | ok |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/playback/get |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../player | v2/platforms/livepeer-studio/player.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/video-on-demand/transcode-video.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://livepeer.studio |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../reference/api | v2/platforms/livepeer-studio/reference/api.mdx | true | ok |  |  |  |
| external-https | https://docs.storj.io/dcs/api-reference/s3-compatible-gateway |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs/api-reference/transcode/create |  | null | 🟡 untested-external |  |  |  |
| external-https | https://livepeer.studio/docs |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./upload-asset | v2/platforms/livepeer-studio/video-on-demand/upload-asset.mdx | true | ok |  |  |  |
| internal-relative | ./overview | v2/platforms/livepeer-studio/video-on-demand/overview.mdx | true | ok |  |  |  |

### v2/platforms/livepeer-studio/video-on-demand/upload-asset.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/TUS/TUS-js-client |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./playback-asset | v2/platforms/livepeer-studio/video-on-demand/playback-asset.mdx | true | ok |  |  |  |
| internal-relative | ../analytics/listen-to-events | v2/platforms/livepeer-studio/analytics/listen-to-events.mdx | true | ok |  |  |  |
| internal-relative | ./playback-asset | v2/platforms/livepeer-studio/video-on-demand/playback-asset.mdx | true | ok |  |  |  |
| internal-relative | encrypted-assets | v2/platforms/livepeer-studio/video-on-demand/encrypted-assets.mdx | true | ok |  |  |  |
| internal-relative | ./thumbnails-vod | v2/platforms/livepeer-studio/video-on-demand/thumbnails-vod.mdx | true | ok |  |  |  |

### v2/platforms/portal.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/ |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./daydream/overview | v2/platforms/daydream/overview.mdx | true | ok |  |  |  |
| internal-relative | ./livepeer-studio/overview | v2/platforms/livepeer-studio/overview.mdx | true | ok |  |  |  |
| internal-relative | ./frameworks/overview | v2/platforms/frameworks/overview.mdx | true | ok |  |  |  |
| internal-relative | ./streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-relative | ./embody/overview | v2/platforms/embody/overview.mdx | true | ok |  |  |  |
| internal-relative | ./product-hub | v2/platforms/product-hub.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/Portals.jsx | snippets/components/domain/SHARED/Portals.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/frameMode.jsx | snippets/components/display/frameMode.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/HeroGif.jsx | snippets/components/domain/SHARED/HeroGif.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |

### v2/platforms/product-hub.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/docs |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./daydream/overview | v2/platforms/daydream/overview.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/assets/logos/products/daydream-logo-dark.svg | snippets/assets/logos/products/daydream-logo-dark.svg | true | ok |  |  |  |
| internal-relative | ./livepeer-studio/overview | v2/platforms/livepeer-studio/overview.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/assets/logos/products/livepeer-studio-logo.svg | snippets/assets/logos/products/livepeer-studio-logo.svg | true | ok |  |  |  |
| internal-relative | ./frameworks/overview | v2/platforms/frameworks/overview.mdx | true | ok |  |  |  |
| external-https | https://frameworks.network/frameworks-dark-horizontal-lockup-transparent.svg |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/assets/logos/products/streamplace-logo.svg | snippets/assets/logos/products/streamplace-logo.svg | true | ok |  |  |  |
| internal-relative | ./ecosystem-products | v2/platforms/ecosystem-products.mdx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |

### v2/platforms/streamplace/introduction/streamplace-architecture.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-guide | v2/platforms/streamplace/introduction/streamplace-guide.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-provenance | v2/platforms/streamplace/introduction/streamplace-provenance.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-funding-model | v2/platforms/streamplace/introduction/streamplace-funding-model.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-integration | v2/platforms/streamplace/introduction/streamplace-integration.mdx | true | ok |  |  |  |

### v2/platforms/streamplace/introduction/streamplace-funding-model.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-architecture | v2/platforms/streamplace/introduction/streamplace-architecture.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-provenance | v2/platforms/streamplace/introduction/streamplace-provenance.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-integration | v2/platforms/streamplace/introduction/streamplace-integration.mdx | true | ok |  |  |  |

### v2/platforms/streamplace/introduction/streamplace-guide.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-architecture | v2/platforms/streamplace/introduction/streamplace-architecture.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-provenance | v2/platforms/streamplace/introduction/streamplace-provenance.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-integration | v2/platforms/streamplace/introduction/streamplace-integration.mdx | true | ok |  |  |  |

### v2/platforms/streamplace/introduction/streamplace-integration.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /platforms/streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-guide | v2/platforms/streamplace/introduction/streamplace-guide.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-architecture | v2/platforms/streamplace/introduction/streamplace-architecture.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-provenance | v2/platforms/streamplace/introduction/streamplace-provenance.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-funding-model | v2/platforms/streamplace/introduction/streamplace-funding-model.mdx | true | ok |  |  |  |

### v2/platforms/streamplace/introduction/streamplace-provenance.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://spec.c2pa.org/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://stream.place/docs/video-metadata/metadata-record/ |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/streamplace/overview | v2/platforms/streamplace/overview.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-guide | v2/platforms/streamplace/introduction/streamplace-guide.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-architecture | v2/platforms/streamplace/introduction/streamplace-architecture.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-funding-model | v2/platforms/streamplace/introduction/streamplace-funding-model.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-integration | v2/platforms/streamplace/introduction/streamplace-integration.mdx | true | ok |  |  |  |

### v2/platforms/streamplace/overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://www.youtube.com/@livepeer |  | null | 🟡 untested-external |  |  |  |
| external-https | https://stream.place/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://stream.place/about |  | null | 🟡 untested-external |  |  |  |
| external-https | https://stream.place/docs/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://stream.place/download |  | null | 🟡 untested-external |  |  |  |
| external-https | https://stream.place/live |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/streamplace/overview |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-guide | v2/platforms/streamplace/introduction/streamplace-guide.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-architecture | v2/platforms/streamplace/introduction/streamplace-architecture.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-provenance | v2/platforms/streamplace/introduction/streamplace-provenance.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-funding-model | v2/platforms/streamplace/introduction/streamplace-funding-model.mdx | true | ok |  |  |  |
| internal-rooted | /platforms/streamplace/introduction/streamplace-integration | v2/platforms/streamplace/introduction/streamplace-integration.mdx | true | ok |  |  |  |
| external-https | https://blog.livepeer.org/livepeer-onchain-builders-streamplace-building-the-video-backbone-of-decentralized-social/ |  | null | 🟡 untested-external |  |  |  |
| external-https | https://blog.livepeer.org/ |  | null | 🟡 untested-external |  |  |  |

### v2/resources/changelog/changelog.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../documentation-guide/contribute-to-the-docs | v2/resources/documentation-guide/contribute-to-the-docs.mdx | true | ok |  |  |  |
| internal-relative | ../../internal/governance | v2/internal/governance.mdx | true | ok |  |  |  |
| external-https | https://roadmap.livepeer.org/roadmap |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer/releases |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ../documentation-guide/contribute-to-the-docs | v2/resources/documentation-guide/contribute-to-the-docs.mdx | true | ok |  |  |  |
| internal-relative | ../../internal/governance | v2/internal/governance.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/LIPs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://forum.livepeer.org |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/changelog/migration-guide.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/concepts/brief-history-of-video.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/concepts/livepeer-101.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/resources/documentation-guide/authoring-standard.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/resources/documentation-guide/automations-workflows.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /tasks/reports/_legacy-unmanaged/ungenerated/20-automations-workflows-audit-report.md | tasks/reports/_legacy-unmanaged/ungenerated/20-automations-workflows-audit-report.md | true | ok |  |  |  |
| internal-rooted | /contribute/CONTRIBUTING/GIT-HOOKS.md | contribute/CONTRIBUTING/GIT-HOOKS.md | true | ok |  |  |  |
| internal-relative | ./style-guide | v2/resources/documentation-guide/style-guide.mdx | true | ok |  |  |  |
| internal-relative | ./component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| internal-rooted | /contribute/CONTRIBUTING/GIT-HOOKS.md | contribute/CONTRIBUTING/GIT-HOOKS.md | true | ok |  |  |  |
| internal-rooted | /tools/scripts/snippets/README.mdx | tools/scripts/snippets/README.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/automations/README.mdx | snippets/automations/README.mdx | true | ok |  |  |  |
| internal-rooted | /tasks/reports/_legacy-unmanaged/ungenerated/20-automations-workflows-audit-report.md | tasks/reports/_legacy-unmanaged/ungenerated/20-automations-workflows-audit-report.md | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/component-library.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| empty | #mintlify-built-ins-cheat-sheet |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/go-livepeer |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /snippets/assets/domain/SHARED/LivepeerDocsLogo.svg | snippets/assets/domain/SHARED/LivepeerDocsLogo.svg | true | ok |  |  |  |
| external-https | https://livepeer.org/blog |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v1/gateways/guides/publish-content | v1/gateways/guides/publish-content.mdx | true | ok |  |  |  |
| empty | # |  | null | skipped |  |  |  |
| empty | # |  | null | skipped |  |  |  |
| empty | # |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/docs/tree/main/snippets/components |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/icons.jsx | snippets/components/primitives/icons.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/buttons.jsx | snippets/components/primitives/buttons.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/image.jsx | snippets/components/display/image.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/embed.jsx | snippets/components/display/embed.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/frameMode.jsx | snippets/components/display/frameMode.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/socialLinks.jsx | snippets/components/display/socialLinks.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/CardCarousel.jsx | snippets/components/display/CardCarousel.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/showcaseCards.jsx | snippets/components/display/showcaseCards.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/external-content.jsx | snippets/components/content/external-content.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/release.jsx | snippets/components/content/release.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/responseField.jsx | snippets/components/content/responseField.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/data.jsx | snippets/components/content/data.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/cards.jsx | snippets/components/layout/cards.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/lists.jsx | snippets/components/layout/lists.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/ListSteps.jsx | snippets/components/layout/ListSteps.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/quadGrid.jsx | snippets/components/layout/quadGrid.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/text.jsx | snippets/components/layout/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/integrations/coingecko.jsx | snippets/components/integrations/coingecko.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/04_GATEWAYS/callouts.jsx | snippets/components/domain/04_GATEWAYS/callouts.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/04_GATEWAYS/quickstartTabs.jsx | snippets/components/domain/04_GATEWAYS/quickstartTabs.jsx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/HeroGif.jsx | snippets/components/domain/SHARED/HeroGif.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/component-library/content.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| internal-relative | ../component-library/layout | v2/resources/documentation-guide/component-library/layout.mdx | true | ok |  |  |  |
| import-path | /snippets/components/content/code.jsx | snippets/components/content/code.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/external-content.jsx | snippets/components/content/external-content.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/responseField.jsx | snippets/components/content/responseField.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/release.jsx | snippets/components/content/release.jsx | true | ok |  |  |  |
| import-path | /snippets/components/content/data.jsx | snippets/components/content/data.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/component-library/display.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/assets/media/videos/HeroBackground.mp4 | snippets/assets/media/videos/HeroBackground.mp4 | true | ok |  |  |  |
| internal-rooted | /snippets/assets/media/videos/HeroBackground.mp4 | snippets/assets/media/videos/HeroBackground.mp4 | true | ok |  |  |  |
| internal-rooted | /snippets/assets/media/videos/livepeer-founders-post.mp4 | snippets/assets/media/videos/livepeer-founders-post.mp4 | true | ok |  |  |  |
| internal-rooted | /snippets/assets/media/videos/daydream.mp4 | snippets/assets/media/videos/daydream.mp4 | true | ok |  |  |  |
| internal-rooted | /snippets/assets/domain/SHARED/LivepeerDocsLogo.svg | snippets/assets/domain/SHARED/LivepeerDocsLogo.svg | true | ok |  |  |  |
| internal-rooted | /snippets/assets/domain/SHARED/LivepeerDocsLogo.svg | snippets/assets/domain/SHARED/LivepeerDocsLogo.svg | true | ok |  |  |  |
| internal-rooted | /snippets/assets/domain/SHARED/LivepeerDocsLogo.svg | snippets/assets/domain/SHARED/LivepeerDocsLogo.svg | true | ok |  |  |  |
| internal-rooted | /snippets/assets/media/images/nytv-logo.png | snippets/assets/media/images/nytv-logo.png | true | ok |  |  |  |
| internal-relative | ../component-library/content | v2/resources/documentation-guide/component-library/content.mdx | true | ok |  |  |  |
| import-path | /snippets/components/display/video.jsx | snippets/components/display/video.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/image.jsx | snippets/components/display/image.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/zoomable-diagram.jsx | snippets/components/display/zoomable-diagram.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/embed.jsx | snippets/components/display/embed.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/quote.jsx | snippets/components/display/quote.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/CardCarousel.jsx | snippets/components/display/CardCarousel.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/showcaseCards.jsx | snippets/components/display/showcaseCards.jsx | true | ok |  |  |  |
| import-path | /snippets/components/display/socialLinks.jsx | snippets/components/display/socialLinks.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/component-library/domain.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| internal-relative | ../component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/04_GATEWAYS/callouts.jsx | snippets/components/domain/04_GATEWAYS/callouts.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/component-library/integrations.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| internal-relative | ../component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| import-path | /snippets/components/integrations/coingecko.jsx | snippets/components/integrations/coingecko.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/component-library/layout.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| internal-relative | ../component-library/integrations | v2/resources/documentation-guide/component-library/integrations.mdx | true | ok |  |  |  |
| import-path | /snippets/components/layout/cards.jsx | snippets/components/layout/cards.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/lists.jsx | snippets/components/layout/lists.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/steps.jsx | snippets/components/layout/steps.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/table.jsx | snippets/components/layout/table.jsx | true | ok |  |  |  |
| import-path | /snippets/components/layout/quadGrid.jsx | snippets/components/layout/quadGrid.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/component-library/primitives.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ../component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| external-https | https://livepeer.org |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /v2/home/mission-control | v2/home/mission-control.mdx | true | ok |  |  |  |
| internal-relative | ../component-library/display | v2/resources/documentation-guide/component-library/display.mdx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/divider.jsx | snippets/components/primitives/divider.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/icons.jsx | snippets/components/primitives/icons.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/links.jsx | snippets/components/primitives/links.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/buttons.jsx | snippets/components/primitives/buttons.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/text.jsx | snippets/components/primitives/text.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/layout.jsx | snippets/components/primitives/layout.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/tables.jsx | snippets/components/primitives/tables.jsx | true | ok |  |  |  |
| import-path | /snippets/components/primitives/containers.jsx | snippets/components/primitives/containers.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/contribute-to-the-docs.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://github.com/livepeer/docs |  | null | 🟡 untested-external |  |  |  |
| empty | #non-technical-contribution-proposal |  | null | skipped |  |  |  |
| external-https | https://github.com/livepeer/docs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/docs |  | null | 🟡 untested-external |  |  |  |
| empty | #review-process |  | null | skipped |  |  |  |
| internal-relative | ./style-guide | v2/resources/documentation-guide/style-guide.mdx | true | ok |  |  |  |
| internal-relative | ./component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/docs/blob/docs-v2-preview/.github/CODEOWNERS |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./documentation-guide | v2/resources/documentation-guide/documentation-guide.mdx | true | ok |  |  |  |
| internal-relative | ./style-guide | v2/resources/documentation-guide/style-guide.mdx | true | ok |  |  |  |
| internal-relative | ./component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/docs/blob/docs-v2-preview/.github/CODEOWNERS |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./style-guide | v2/resources/documentation-guide/style-guide.mdx | true | ok |  |  |  |
| internal-relative | ./component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| external-https | https://mintlify.com/docs |  | null | 🟡 untested-external |  |  |  |
| external-https | https://github.com/livepeer/docs |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./documentation-guide | v2/resources/documentation-guide/documentation-guide.mdx | true | ok |  |  |  |
| external-https | https://github.com/livepeer/docs/blob/docs-v2-preview/.github/CODEOWNERS |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/docs-features-and-ai-integrations.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-rooted | /v2/home/mission-control | v2/home/mission-control.mdx | true | ok |  |  |  |
| internal-rooted | /v2/home/mission-control | v2/home/mission-control.mdx | true | ok |  |  |  |
| internal-relative | ./documentation-guide | v2/resources/documentation-guide/documentation-guide.mdx | true | ok |  |  |  |
| internal-relative | ./contribute-to-the-docs | v2/resources/documentation-guide/contribute-to-the-docs.mdx | true | ok |  |  |  |
| internal-relative | ./component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/documentation-guide.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./contribute-to-the-docs | v2/resources/documentation-guide/contribute-to-the-docs.mdx | true | ok |  |  |  |
| internal-relative | ./docs-features-and-ai-integrations | v2/resources/documentation-guide/docs-features-and-ai-integrations.mdx | true | ok |  |  |  |
| internal-relative | ./style-guide | v2/resources/documentation-guide/style-guide.mdx | true | ok |  |  |  |
| internal-relative | ./snippets-inventory | v2/resources/documentation-guide/snippets-inventory.mdx | true | ok |  |  |  |
| internal-relative | ./docs-features-and-ai-integrations#automatic-page-index-generation | v2/resources/documentation-guide/docs-features-and-ai-integrations.mdx | true | ok |  |  |  |
| internal-relative | ./contribute-to-the-docs | v2/resources/documentation-guide/contribute-to-the-docs.mdx | true | ok |  |  |  |
| internal-relative | ./component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| internal-relative | ./automations-workflows | v2/resources/documentation-guide/automations-workflows.mdx | true | ok |  |  |  |
| internal-relative | ./component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| internal-relative | ./style-guide | v2/resources/documentation-guide/style-guide.mdx | true | ok |  |  |  |
| internal-relative | ./snippets-inventory | v2/resources/documentation-guide/snippets-inventory.mdx | true | ok |  |  |  |
| internal-relative | ./docs-features-and-ai-integrations#automatic-page-index-generation | v2/resources/documentation-guide/docs-features-and-ai-integrations.mdx | true | ok |  |  |  |
| internal-relative | ./automations-workflows | v2/resources/documentation-guide/automations-workflows.mdx | true | ok |  |  |  |
| external-https | https://mintlify.com/docs |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/documentation-overview.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./contribute-to-the-docs | v2/resources/documentation-guide/contribute-to-the-docs.mdx | true | ok |  |  |  |
| internal-rooted | /about/portal | v2/about/portal.mdx | true | ok |  |  |  |
| internal-rooted | /about/core-concepts | v2/about/core-concepts.mdx | true | ok |  |  |  |
| internal-rooted | /developers/developer-guide | v2/developers/developer-guide.mdx | true | ok |  |  |  |
| internal-rooted | /developers/developer-guide | v2/developers/developer-guide.mdx | true | ok |  |  |  |
| internal-rooted | /developers/portal | v2/developers/portal.mdx | true | ok |  |  |  |
| internal-rooted | /developers/developer-guide | v2/developers/developer-guide.mdx | true | ok |  |  |  |
| internal-rooted | /v2/orchestrators/orchestrators-portal | v2/orchestrators/orchestrators-portal.mdx | true | ok |  |  |  |
| internal-rooted | /orchestrators/setting-up-an-orchestrator/overview | v2/orchestrators/setting-up-an-orchestrator/overview.mdx | true | ok |  |  |  |
| internal-rooted | /lpt/token-portal | v2/lpt/token-portal.mdx | true | ok |  |  |  |
| internal-rooted | /lpt/delegation/overview | v2/lpt/delegation/overview.mdx | true | ok |  |  |  |
| internal-rooted | /gateways/gateways-portal | v2/gateways/gateways-portal.mdx | true | ok |  |  |  |
| internal-rooted | /gateways/run-a-gateway/run-a-gateway | v2/gateways/run-a-gateway/run-a-gateway.mdx | true | ok |  |  |  |
| internal-relative | ./documentation-guide | v2/resources/documentation-guide/documentation-guide.mdx | true | ok |  |  |  |
| internal-relative | ./docs-features-and-ai-integrations | v2/resources/documentation-guide/docs-features-and-ai-integrations.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/snippets-inventory.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| internal-relative | ./style-guide | v2/resources/documentation-guide/style-guide.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/snippetsWiki/index | snippets/snippetsWiki/index.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/snippetsWiki/mintlify-behaviour | snippets/snippetsWiki/mintlify-behaviour.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/documentation-guide/style-guide.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| internal-relative | ./component-library/primitives | v2/resources/documentation-guide/component-library/primitives.mdx | true | ok |  |  |  |
| external-https | https://mintlify.com/docs/text |  | null | 🟡 untested-external |  |  |  |
| internal-relative | ./component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| internal-rooted | /contribute/CONTRIBUTING/GIT-HOOKS.md | contribute/CONTRIBUTING/GIT-HOOKS.md | true | ok |  |  |  |
| internal-relative | ./component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| external-https | https://mintlify.com/docs |  | null | 🟡 untested-external |  |  |  |
| internal-rooted | /snippets/snippetsWiki/mintlify-behaviour | snippets/snippetsWiki/mintlify-behaviour.mdx | true | ok |  |  |  |
| internal-rooted | /contribute/CONTRIBUTING/GIT-HOOKS.md | contribute/CONTRIBUTING/GIT-HOOKS.md | true | ok |  |  |  |
| internal-relative | ./component-library | v2/resources/documentation-guide/component-library.mdx | true | ok |  |  |  |
| internal-relative | ./snippets-inventory | v2/resources/documentation-guide/snippets-inventory.mdx | true | ok |  |  |  |
| internal-rooted | /snippets/snippetsWiki/mintlify-behaviour | snippets/snippetsWiki/mintlify-behaviour.mdx | true | ok |  |  |  |
| internal-relative | ./contribute-to-the-docs | v2/resources/documentation-guide/contribute-to-the-docs.mdx | true | ok |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx |  | null | skipped-style-guide-example |  |  |  |

### v2/resources/livepeer-glossary.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://en.wikipedia.org/wiki/Decentralized_autonomous_organization |  | null | 🟡 untested-external |  |  |  |
| external-https | https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/media-kit.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

### v2/resources/references/contract-addresses.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| external-https | https://arbiscan.io/address/0xD9dEd6f9959176F0A04dcf88a0d2306178A736a6 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xD8E8328501E9645d16Cf49539efC04f734606ee4 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x289ba1701C2F088cf0faf8B3705246331cB8A839 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xc20DE37170B45774e6CD3d2304017fc962f27252 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x35Bcf3c30594191d53231E4FF333E8A770453e40 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xF62C30242fccd3a46721f155d4d367De3fD5B3b3 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xa8bB618B1520E284046F3dFc448851A1Ff26e41B |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xea1b0F6c8D158328a6e3D3F924B86A759F41465c |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xdd6f56DcC28D3F5f27084381fE8Df634985cc39f |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x92d804Ed49D92438aEA6fe552BD9163aacb7E841 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x0B9C254837E72Ebe9Fe04960C43B69782E68169A |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x68AF80376Bc1CA0C25a83b28e5570E8c7bdD3119 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xf82C1FF415F1fCf582554fDba790E27019c8E8C4 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xcFE4E2879B786C3aa075813F0E364bb5acCb6aa0 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xd2Ce37BCB287CaDc40647f567C2D3C4220901634 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xC92d3A360b8f9e083bA64DE15d95Cf8180897431 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x38093CDca43aeCd7bb474983519A246e93A3b0a7 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x04C0b249740175999E5BF5c9ac1dA92431EF34C5 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xC45f6918F7Bcac7aBc8fe05302b3cDF39776cdeb |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x8bb50806D60c492c0004DAD5D9627DAA2d9732E6 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x10736ffaCe687658F88a46D042631d182C7757f7 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xfdb06109032AD3671a8f14f5f2E78f4B9E81b567 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xd78b6bD09cd28A83cFb21aFa0DA95c685A6bb0B1 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x6D2457a4ad276000A615295f7A80F79E48CcD318 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x148D5b6B4df9530c7C76A810bd1Cdf69EC4c2085 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x93BB030735747708b4D33093A98d4c804Cd6B58C |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xFC3CBed6A3476F7616CC70f078397700136eEBFd |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xf96d54e490317c557a967abfa5d6e33006be69b3 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x58b6a8a3302369daec383334672404ee733ab239 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x505F8c2ee81f1C6fa0D88e918eF0491222E05818 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x511bc4556d823ae99630ae8de28b9b80df90ea2e |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x5FE3565dB7F1Dd8d6A9E968D45BD2Aee3836a1D4 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x5b1ce829384eebfa30286f12d1e7a695ca45f5d2 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x6F582E2bB19ac31D4B1e6eDD0c2eFEabD700f808 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x3984fc4ceeef1739135476f625d36d6c35c40dc3 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xC89fE48382F8fda6992dC590786A84275bCD1C57 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x406a112f3218b988c66778fd72fc8467f2601366 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x72d9dfa25f75a5f2c27b7336e643a559ae6aeb8e |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x3a9543d4767b2c914ea22fd0b07e17b0901aaebf |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x8e306b005773bee6ba6a6e8972bc79d766cc15c8 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x182ebf4c80b28efc45ad992ecbb9f730e31e8c7f |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x1a0b2ca69ca2c7f96e2529faa6d63f881655d81a |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x780c98cbb0cc21d6617c05332bd5cf6f847c71c2 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xBf824EDb6b94D9B52d972d5B25bCc19b4e6E3F3C |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x24ebEd82c681f435E944BEEbFAEEAaE443D08438 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x6A23F4940BD5BA117Da261f98aae51A8BFfa210A |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x1d24838b35A9c138Ac157A852e19e948aD6323D7 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x6142f1C8bBF02E6A6bd074E8d564c9A5420a0676 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x21146B872D3A95d2cF9afeD03eE5a783DaE9A89A |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x8dDDB96CF36AC8860f1DE5C7c4698fd499FAB405 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xe479B9fbA2Cd65f822f451fC8C145c663B995CE6 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xC40df4db2f99e7e235780A93B192F1a934f0c45b |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x3757DB506ECd9CBE643660C0F5b70db5b321202C |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x0f9C425E7374602C20370d3fd263155B4c3bDc91 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x3a941e1094B9E33efABB26a9047a8ABb4b257907 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x9c9209c9ff6996513b3673d69ee7b36a6c58a8cf |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x363cdB9BaE210Ef182c60b5a496139E980330127 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x557093B1Ab53412166beAd939f34244170b6525B |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x6b397f20DC227B4E23fEc20BBDBe166d0DFFC452 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xd1C1F5d44D8F83ca2A05Baf40461e550cFDDecA2 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x1561fC5F7Efc049476224005DFf38256dccfc509 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x7Beb84c52ce96DFd90431FAA97378994a8baa6df |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0xD906D192e2503Aafd1BC5F5fc4163E842D5B1d6e |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x4969dcCF5186e1c49411638fc8A2a020Fdab752E |  | null | 🟡 untested-external |  |  |  |
| external-https | https://arbiscan.io/address/0x4F59b39e2ea628fe8371BDfd51B063319339c7EE |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xf623811b08b45792d0223d77d9c922dae29712ec |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xe4be2a35dec0063f9dfccb9b740b1acb7eefefec |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x8573f2f5a3bd960eee3d998473e50c75cdbe6828 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x81eb0b10ff8703905904e4d91cf6aa575d59736f |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x5A9512826EAAF1FE4190f89443314E95A515fE24 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x633101b3f15f93c5f415830d48e56b9b1f7ba584 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x05C03EA0039f2e828A725A82939fc1e90de38B44 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xCBAa6eA4886b535FC7ABACe3F3985Ed03b3b80a0 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xDC6eE74A18994caD3876a078B6fa4920FD9C507d |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x1a6007d1D0583452Bd6f45a4e1a9190B15Fbd7E3 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xef5E170b679ddaF5e22ADC10fD23DDdB79E3C0c5 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xc8a695155648F18B0cfd6989498B6f8b2c4cc56A |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x35F99F326681FE4F38719491be48Ab4950795013 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xAC0153a8C5227e43506901a4f3f83FD000c8178f |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x246edEBae14b186a67e3d466A485321169a8bcD5 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x223398d0BF9cc24960b3886CC481dBf5276EdeD2 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x0da7c263eCF5cD3ddba275b9A2D63320E28fD287 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xbf07ff45f14c9ff0571b9fbdc7e2b62d29931224 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x68b463bca7d561118636e9f028ff0f2e8398dd6a |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xB620c762dd4bC350602936d7401BB8393Ee6687c |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x8eade5eec609572bf53deadb88d36f862ddec517 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xa3aa52ce79e85a21d9ccda705c57e426b160112c |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x857d4bf18a80f03d3d11f438825cd3d0aa0d9d68 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x289ba1701c2f088cf0faf8b3705246331cb8a839 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0xd8e8328501e9645d16cf49539efc04f734606ee4 |  | null | 🟡 untested-external |  |  |  |
| external-https | https://etherscan.io/address/0x4969dccf5186e1c49411638fc8a2a020fdab752e |  | null | 🟡 untested-external |  |  |  |
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/resources-portal.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| import-path | /snippets/components/domain/SHARED/previewCallouts.jsx | snippets/components/domain/SHARED/previewCallouts.jsx | true | ok |  |  |  |

### v2/resources/resources/videos.mdx
| linkType | rawPath | resolvedPath | exists | status | movedCandidate1 | movedCandidate2 | movedCandidate3 |
|---|---|---|---|---|---|---|---|
| (none) |  |  |  |  |  |  |  |

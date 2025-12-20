V2 Docs are being ported in to this repo.

I will work on a branch called docs-v2 and then merge into main when fully ready
and deprecate the old docs into a v1 on the new docs.

Add to all pages: [SEO](https://www.mintlify.com/docs/optimize/seo) eg

---

## "twitter:image": "/images/social-preview.jpg"

## Search Keywords eg:

## keywords: ['configuration', 'setup', 'getting started']

TODO:

- Remove/Change Navbar in V2 (Global Setting)
- Add redirects (Global Setting)
- Add Analytics (Global Setting)
- Add Footer (Global Setting)
- Add SEO (Global Setting)
- Add Custom Domain (Global Setting)
- Add Custom 404 (Global Setting)?
- "description":
  "![Rick Roll](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2FteDJ4bno5MHU5Y3QxdGx3eWR2emdhejRhc2c1Y2d3ejY5ajlxMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ju7l5y9osyymQ/giphy.gif)
  \n Sorry About That."
- "description":
  "![404 Robot](https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/9b86454e-e7d0-46f5-8f77-fcfd2309c760/original=true,quality=90/F0DB1F6D051016659028C1570BD9F3F89FF00EC59E1A35319969E6DF05EEB4CF.jpeg)"

Notes from stakeholders/feedback

- “The gateways section should definitely include… technical documentation on
  how to run and operate a gateway node because that’s missing.”
-

Notes on layout

- Consider moving resource and help anchors to right tabs on menu (styling).
  Would prefer navbar buttons - but external links only there :/

- Consider having an Index & FAQ/Glossary page in each tab - Possibly use AI to
  make it per page (llm intiially then n8n integration keeps it updated)

About:

- Protocol: Called Protocol Actors or Network Participants? Both?
- I am not convinced about the side bar sections.

Removing: "v2/pages/01_about/livepeer-protocol/livepeer-actors/gateways",
"v2/pages/01_about/livepeer-protocol/livepeer-actors/orchestrators",
"v2/pages/01_about/livepeer-protocol/livepeer-actors/delegators",
"v2/pages/01_about/livepeer-protocol/livepeer-actors/end-users"

Community

- move HUBS to appropriate tabs
- Hate the naming of all connect items.

Developer

Gateways

#### Direct Usage & Platform Integration

| Category           | Reason                 | Business Explanation                                                                                                                      |
| ------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Direct Usage / Ops | Run your own workloads | Content providers run gateways to process their own video/AI workloads end-to-end, controlling ingestion, routing, retries, and delivery. |

#### Reliability, Performance & QoS

| Category    | Reason                             | Business Explanation                                                                                  |
| ----------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Reliability | Enforce SLAs on orchestrators      | Gateways select orchestrators, apply retries/failover, and enforce latency and uptime guarantees.     |
| Reliability | QoS enforcement & workload shaping | Gateways control routing, retries, failover, and latency-vs-cost trade-offs beyond protocol defaults. |

#### Platform

| Category | Reason                    | Business Explanation                                                            |
| -------- | ------------------------- | ------------------------------------------------------------------------------- |
| Platform | Embed in a larger product | Gateways act as internal infrastructure powering broader media or AI platforms. |

#### Economics

| Category  | Reason                         | Business Explanation                                                                                    |
| --------- | ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Economics | Service-layer monetization     | Service providers charge end users above orchestrator cost for reliability, compliance, or convenience. |
| Economics | Avoid third-party gateway fees | Running your own gateway avoids routing fees, pricing risk, and policy constraints imposed by others.   |

#### Demand Control & Traffic Ownership

| Category       | Reason                                 | Business Explanation                                                                                           |
| -------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Demand Control | Demand aggregation & traffic ownership | Gateways own ingress, customer relationships, usage data, and traffic predictability across apps or customers. |
| Demand Control | Workload normalization                 | Gateways smooth bursty demand into predictable, orchestrator-friendly workloads.                               |

#### Performance

| Category    | Reason                      | Business Explanation                                                                                |
| ----------- | --------------------------- | --------------------------------------------------------------------------------------------------- |
| Performance | Geographic request steering | Gateways route users to regionally optimal orchestrators to reduce latency and improve reliability. |

#### Security & Compliance

| Category | Reason                            | Business Explanation                                                                       |
| -------- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| Security | Enterprise policy enforcement     | Gateways enforce IP allowlists, auth, rate limits, audit logs, and deterministic behavior. |
| Security | Cost-explosion & abuse protection | Gateways block buggy or malicious clients before they generate runaway compute costs.      |

#### Product Differentiation & UX

| Category | Reason                                 | Business Explanation                                                                                    |
| -------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Product  | Product differentiation above protocol | Custom APIs, SDKs, dashboards, billing abstractions, and AI workflow presets live at the gateway layer. |
| Product  | Stable API surface                     | Gateways shield customers from protocol or orchestrator churn via versioning and controlled change.     |

#### Observability & Feedback Loops

| Category      | Reason                     | Business Explanation                                                                                   |
| ------------- | -------------------------- | ------------------------------------------------------------------------------------------------------ |
| Observability | Analytics & feedback loops | Gateways see end-to-end request patterns, failures, latency, model performance, and customer behavior. |

#### Strategy, Optionality & Ecosystem Power

| Category | Reason                 | Business Explanation                                                                                     |
| -------- | ---------------------- | -------------------------------------------------------------------------------------------------------- |
| Strategy | Strategic independence | Running your own gateway avoids pricing, roadmap, availability, and censorship risk from other gateways. |
| Strategy | Future optionality     | Early gateway operators gain leverage if incentives or network economics evolve.                         |

#### Ecosystem Influence

| Category  | Reason              | Business Explanation                                                                                                 |
| --------- | ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Ecosystem | Ecosystem influence | Gateways sit at a coordination choke-point that shapes standards, surfaces protocol gaps, and influences real usage. |

## NOTES ON SOME FETCHED DATA

Since useState, useEffect, and fetch work in Mintlify JSX components, you can
pull:

Release info - versions, release notes, assets, dates Repo stats - stars, forks,
open issues count File contents - README, config files, code examples (via
raw.githubusercontent.com) Contributors - list of contributors, avatars Commit
history - recent commits, changelog-style updates Issues/PRs - open issues
count, specific issue details

**EXAMPLE**

I'm fetching the latest release of livepeer dynamically in some places eg.
gateways/linux-install. with the `LatestRelease` component.

### !!! Caveats:

- Rate limits - GitHub API is 60 requests/hour for unauthenticated requests. If
  many users load the page, could hit limits
- Client-side loading - Shows"loading..." briefly before content appears
- No SSR - Content won't be in the initial HTML (affects SEO if that matters)

### Future Recommendation:

For high-traffic pages, we might want a build-time approach instead (fetch once
during deploy, not on every page load).

Then we can use a n8n hook or github action to redeploy the docs when a new
release is published.

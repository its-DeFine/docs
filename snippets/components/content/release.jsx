/**
 * @component LatestVersion
 * @category content
 * @tier composite
 * @status stable
 * @description LatestVersion - Wrapper for github action which fetches most recent release version
 *   of go-livepeer
 * @contentAffinity how_to
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/gateways/quickstart/gateway-setup.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/content.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-03
 *
 * @param {string} version - Version used by the component.
 *
 * @example
 * <LatestVersion version="value" />
 */
export const LatestVersion = ({ version }) => {
  return <>{version}</>;
};

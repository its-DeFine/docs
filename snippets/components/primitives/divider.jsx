/**
 * CustomDivider - Decorative divider with Livepeer branding
 *
 * @description
 * Displays a horizontal divider line with theme-aware Livepeer logo icons on both ends.
 * Optionally includes centered text between the divider lines.
 *
 * Icons automatically adapt to light/dark theme using theme-aware SVG.
 *
 * @param {string} [color] - Color for the middle text
 * @param {string} [middleText] - Optional text to display in the center of the divider;
 *
 * @example
 * <CustomDivider />
 * <CustomDivider middleText="OR" />
 * <CustomDivider middleText="Section Break" color="#2d9a67" />
 *
 * @author Livepeer Documentation Team
 */

// FIX THIS - IT SHOULD DYNAMICALLY TAKE UP THE HEIGHT IT HAS
/**
 * @component CustomDivider
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Custom Divider primitive used in authored documentation and component-library examples.
 * @contentAffinity universal
 * @owner docs
 * @dependencies none
 * @usedIn v2/about/livepeer-protocol/core-mechanisms.mdx, v2/about/livepeer-protocol/governance-model.mdx, v2/about/livepeer-protocol/livepeer-token.mdx, v2/about/livepeer-protocol/overview.mdx, v2/about/livepeer-protocol/technical-architecture.mdx, v2/about/livepeer-protocol/treasury.mdx, v2/about/portal.mdx, v2/about/resources/blockchain-contracts.mdx, v2/community/community-portal.mdx, v2/community/livepeer-community/community-guidelines.mdx, v2/developers-new/portal.mdx, v2/developers/opportunities/bug-bounties.mdx, v2/developers/opportunities/grants-and-programmes.mdx, v2/developers/opportunities/oss-contributions.mdx, v2/developers/opportunities/overview.mdx, v2/developers/opportunities/rfps-and-proposals.mdx, v2/developers/portal.mdx, v2/gateways-new/get-started/gateway-setup.mdx, v2/gateways-new/portal.mdx, v2/gateways-new/setup/configure/video-configuration.mdx, v2/gateways-new/setup/requirements/on-chain setup/on-chain.mdx, v2/gateways/gateways-portal.mdx, v2/gateways/quickstart/gateway-setup.mdx, v2/gateways/run-a-gateway/configure/video-configuration.mdx, v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx, v2/home/about-livepeer/benefits.mdx, v2/home/about-livepeer/ecosystem.mdx, v2/home/about-livepeer/vision.mdx, v2/home/mission-control.mdx, v2/home/solutions/showcase.mdx, v2/orchestrators-new/portal.mdx, v2/orchestrators/orchestrators-portal.mdx, v2/resources/documentation-guide/snippets-inventory.mdx, v2/solutions/portal.mdx
 * @breakingChangeRisk high
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-10
 * @param {string} [color="var(--border)"] - color prop.
 * @param {string} [middleText=""] - middle Text prop.
 * @param {object} [style={}] - style prop.
 * @example
 * <CustomDivider />
 */
export const CustomDivider = ({
  color = "var(--border)",
  middleText = "",
  style = {},
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: style?.margin || "24px 0",
        fontSize: style?.fontSize || "16px",
        height: "fit-content",
        ...style,
      }}
    >
      <span
        style={{
          marginRight: "8px",
          opacity: 0.2,
        }}
      >
        <Icon icon="/snippets/assets/logos/Livepeer-Logo-Symbol-Theme.svg" />
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "var(--border)",
          opacity: 0.4,
        }}
      ></div>
      {middleText && (
        <>
          <Icon icon="circle" size={2} />
          <span
            style={{
              margin: "0 8px",
              fontWeight: "bold",
              color: color,
              opacity: 0.7,
            }}
          >
            {middleText}
          </span>
          <Icon icon="circle" size={2} />
        </>
      )}
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "var(--border)",
          opacity: 0.4,
        }}
      ></div>
      <span style={{ marginLeft: "8px", opacity: 0.2 }}>
        <span style={{ display: "inline-block", transform: "scaleX(-1)" }}>
          <Icon icon="/snippets/assets/logos/Livepeer-Logo-Symbol-Theme.svg" />
        </span>
      </span>
    </div>
  );
};

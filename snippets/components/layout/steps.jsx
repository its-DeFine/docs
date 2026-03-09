/**
 * @component StyledSteps
 * @category layout
 * @tier composite
 * @status stable
 * @description Wrapper for custom-styled step sequences with configurable colours.
 * @contentAffinity tutorial, how_to
 * @owner @livepeer/docs-team
 * @dependencies StyledStep
 * @usedIn v2/cn/docs-guide/components-index.mdx, v2/cn/docs-guide/indexes/components-index.mdx,
 *   v2/cn/gateways/run-a-gateway/configure/ai-configuration.mdx,
 *   v2/cn/gateways/run-a-gateway/connect/discover-offerings.mdx,
 *   v2/cn/gateways/run-a-gateway/install/docker-install.mdx,
 *   v2/cn/gateways/run-a-gateway/install/linux-install.mdx,
 *   v2/cn/gateways/run-a-gateway/install/windows-install.mdx,
 *   v2/cn/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx,
 *   v2/cn/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx,
 *   v2/cn/gateways/run-a-gateway/requirements/setup.mdx
 * @breakingChangeRisk high
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-10
 *
 * @param {React.ReactNode} children - Step components rendered inside the sequence.
 * @param {string} [iconColor] - Background colour applied to step icons.
 * @param {string} [titleColor] - Colour applied to step titles.
 * @param {string} [lineColor] - Colour applied to connector lines between steps.
 * @param {string} [iconSize="24px"] - Icon size value accepted by the component.
 *
 * @example
 * <StyledSteps><StyledStep>Step 1</StyledStep></StyledSteps>
 */
export const StyledSteps = ({
  children,
  iconColor,
  titleColor,
  lineColor,
  iconSize = "24px",
}) => {
  const resolvedIconColor = iconColor || "var(--accent-dark, #18794E)";
  const resolvedTitleColor = titleColor || "var(--accent)";
  const resolvedLineColor = lineColor || "var(--accent)";
  const wrapperStyle = {
    "--lp-styled-steps-icon-color": resolvedIconColor,
    "--lp-styled-steps-title-color": resolvedTitleColor,
    "--lp-styled-steps-line-color": resolvedLineColor,
  };

  return (
    <div data-lp-styled-steps style={wrapperStyle}>
      <Steps>{children}</Steps>
    </div>
  );
};

/**
 * @component StyledStep
 * @category layout
 * @tier primitive
 * @status stable
 * @description Individual step item within a StyledSteps sequence.
 * @contentAffinity tutorial, how_to
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/cn/docs-guide/components-index.mdx, v2/cn/docs-guide/indexes/components-index.mdx,
 *   v2/cn/gateways/run-a-gateway/configure/ai-configuration.mdx,
 *   v2/cn/gateways/run-a-gateway/connect/discover-offerings.mdx,
 *   v2/cn/gateways/run-a-gateway/install/docker-install.mdx,
 *   v2/cn/gateways/run-a-gateway/install/linux-install.mdx,
 *   v2/cn/gateways/run-a-gateway/install/windows-install.mdx,
 *   v2/cn/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx,
 *   v2/cn/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx,
 *   v2/cn/gateways/run-a-gateway/requirements/setup.mdx
 * @breakingChangeRisk high
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-10
 *
 * @param {string} title - Step title text.
 * @param {string} icon - Icon name passed to the step item.
 * @param {string} [titleSize="h3"] - Heading size used for the step title.
 * @param {React.ReactNode} children - Step body content.
 *
 * @example
 * <StyledStep title="Step 1">Content</StyledStep>
 */
export const StyledStep = ({ title, icon, titleSize = "h3", children }) => {
  return (
    <Step title={title} icon={icon} titleSize={titleSize}>
      {children}
    </Step>
  );
};

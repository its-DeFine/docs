/**
 * @component StyledSteps
 * @category layout
 * @tier pattern
 * @status stable
 * @description Wraps the standard Steps component with custom CSS styling for icons, titles, and
 *   connecting lines. Uses scoped styles with a unique ID to avoid conflicts
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies StyledStep
 * @usedIn v2/developers/ai-pipelines/byoc.mdx
 *   v2/gateways/_contextData_/docker-install-implementation.mdx
 *   v2/gateways/run-a-gateway/configure/ai-configuration.mdx
 *   v2/gateways/run-a-gateway/connect/discover-offerings.mdx
 *   v2/gateways/run-a-gateway/install/docker-install.mdx
 *   v2/gateways/run-a-gateway/install/linux-install.mdx
 *   v2/gateways/run-a-gateway/install/windows-install.mdx
 *   v2/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx
 *   v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx
 *   v2/gateways/run-a-gateway/requirements/setup.mdx, v2/gateways/run-a-gateway/run-a-gateway.mdx
 *   v2/lpt/delegation/getting-started.mdx, v2/orchestrators/advanced-setup/hosting-models.mdx
 *   v2/orchestrators/quickstart/join-a-pool.mdx, v2/orchestrators/quickstart/orchestrator-setup.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/layout.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} iconColor - Icon configuration used by the component.
 * @param {string} titleColor - Title color used by the component.
 * @param {string} lineColor - Line color used by the component.
 * @param {string} [iconSize="24px"] - Icon configuration used by the component.
 *
 * @example
 * <StyledSteps iconColor="value" titleColor="value" lineColor="value" />
 */
export const StyledSteps = ({
  children,
  iconColor,
  titleColor,
  lineColor,
  iconSize = "24px",
}) => {
  if (children == null) {
    console.warn("[StyledSteps] Missing children");
    return null;
  }

  const stepsId = `styled-steps-${Math.random().toString(36).substr(2, 9)}`;
  const resolvedIconColor = iconColor || "var(--accent-dark)";
  const resolvedTitleColor = titleColor || "var(--accent)";
  const resolvedLineColor = lineColor || "var(--accent)";

  return (
    <>
      {/* TODO: remove !important - specificity investigation needed. */}
      <style>{`
        #${stepsId} .steps > div > div.absolute > div {
          background-color: ${resolvedIconColor} !important;
        }
        #${stepsId} .steps > div > div.w-full > p {
          color: ${resolvedTitleColor} !important;
        }
        #${stepsId} > div > div > div.absolute.w-px {
          background-color: ${resolvedLineColor} !important;
        }
      `}</style>
      <div id={stepsId}>
        <Steps>{children}</Steps>
      </div>
    </>
  );
};

/**
 * StyledStep - A wrapper for the Step component with customizable title size
 *
 * @description
 * Wraps the standard Step component to provide consistent styling and title size control.
 * Designed to be used within StyledSteps.
 *
 * @param {string} title - The title of the step
 * @param {string} icon - Icon name to display
 * @param {string} [titleSize="h3"] - HTML heading size for the title (e.g., "h1", "h2", "h3")
 * @param {React.ReactNode} children - Content to display in the step
 *
 * @example
 * <StyledStep title="Installation" icon="download" titleSize="h2">
 *   Run npm install to get started
 * </StyledStep>
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component StyledStep
 * @category layout
 * @tier composite
 * @status stable
 * @description Wraps the standard Step component to provide consistent styling and title size
 *   control. Designed to be used within StyledSteps
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/developers/ai-pipelines/byoc.mdx
 *   v2/gateways/_contextData_/docker-install-implementation.mdx
 *   v2/gateways/run-a-gateway/configure/ai-configuration.mdx
 *   v2/gateways/run-a-gateway/connect/discover-offerings.mdx
 *   v2/gateways/run-a-gateway/install/docker-install.mdx
 *   v2/gateways/run-a-gateway/install/linux-install.mdx
 *   v2/gateways/run-a-gateway/install/windows-install.mdx
 *   v2/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx
 *   v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx
 *   v2/gateways/run-a-gateway/requirements/setup.mdx, v2/gateways/run-a-gateway/run-a-gateway.mdx
 *   v2/lpt/delegation/getting-started.mdx, v2/orchestrators/advanced-setup/hosting-models.mdx
 *   v2/orchestrators/quickstart/join-a-pool.mdx, v2/orchestrators/quickstart/orchestrator-setup.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/layout.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} title - Title text rendered by the component.
 * @param {string} icon - Icon configuration used by the component.
 * @param {string} [titleSize="h3"] - Title size used by the component.
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <StyledStep title="Example" icon="sparkles" />
 */
export const StyledStep = ({ title, icon, titleSize = "h3", children }) => {
  return (
    <Step title={title} icon={icon} titleSize={titleSize}>
      {children}
    </Step>
  );
};

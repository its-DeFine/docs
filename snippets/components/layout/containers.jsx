/**
 * @component BorderedBox
 * @category layout
 * @tier composite
 * @status stable
 * @description Provides a bordered box container without requiring inline styles in MDX files. All
 *   styling uses CSS Custom Properties for theme awareness
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies CenteredContainer, FullWidthContainer
 * @usedIn v2/community/livepeer-community/community-guidelines.mdx
 *   v2/developers/ai-inference-on-livepeer/overview.mdx
 *   v2/developers/ai-inference-on-livepeer/workload-fit.mdx, v2/developers/ai-pipelines/byoc.mdx
 *   v2/developers/ai-pipelines/overview.mdx, v2/developers/ai-pipelines/workload-fit.mdx
 *   v2/developers/builder-opportunities/bug-bounties.mdx
 *   v2/developers/builder-opportunities/grants-and-programmes.mdx
 *   v2/developers/builder-opportunities/oss-contributions.mdx
 *   v2/developers/builder-opportunities/overview.mdx
 *   v2/developers/builder-opportunities/rfps-and-proposals.mdx, v2/developers/developer-path.mdx
 *   v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/video-streaming-101.mdx
 *   v2/developers/quickstart/video/video-streaming-101.mdx
 *   v2/gateways/run-a-gateway/gateway-operator-opportunities.mdx
 *   v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx
 *   v2/gateways/run-a-gateway/requirements/setup.mdx
 *   v2/gateways/using-gateways/choosing-a-gateway.mdx
 *   v2/gateways/using-gateways/gateway-providers/cloud-spe-gateway.mdx
 *   v2/gateways/using-gateways/gateway-providers/daydream-gateway.mdx
 *   v2/gateways/using-gateways/gateway-providers/livepeer-studio-gateway.mdx
 *   v2/lpt/delegation/getting-started.mdx, v2/orchestrators/advanced-setup/hosting-models.mdx
 *   v2/orchestrators/earnings.mdx, v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} [variant="default"] - Variant used by the component.
 * @param {string} [padding="1rem"] - Padding used by the component.
 * @param {string} [borderRadius="8px"] - Border radius used by the component.
 * @param {object} [style={}] - Style used by the component.
 *
 * @example
 * <BorderedBox>Example</BorderedBox>
 */
export const BorderedBox = ({
  children,
  variant = "default",
  padding = "1rem",
  borderRadius = "8px",
  style = {},
}) => {
  if (children == null) {
    console.warn("[BorderedBox] Missing children");
    return null;
  }

  const variants = {
    default: {
      border: "1px solid var(--border)",
      backgroundColor: "var(--card-background)",
    },
    accent: {
      border: "1px solid var(--accent)",
      backgroundColor: "var(--card-background)",
    },
    muted: {
      border: "1px solid var(--border)",
      backgroundColor: "transparent",
    },
  };

  return (
    <div
      style={{
        ...variants[variant],
        padding: padding,
        borderRadius: borderRadius,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * CenteredContainer - Centered content container component
 *
 * @description
 * Provides a centered container without requiring inline styles in MDX files.
 *
 * @param {React.ReactNode} children - Content to display
 * @param {string} [maxWidth="800px"] - Maximum width (CSS value)
 * @param {string} [padding="0"] - Internal padding (CSS value)
 * @param {object} [style={}] - Additional inline styles
 *
 * @example
 * <CenteredContainer maxWidth="600px">
 *   Centered content here
 * </CenteredContainer>
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component CenteredContainer
 * @category layout
 * @tier composite
 * @status stable
 * @description Provides a centered container without requiring inline styles in MDX files
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies FullWidthContainer, TabsContainer
 * @usedIn v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} [maxWidth="800px"] - Max width used by the component.
 * @param {string} [padding="0"] - Padding used by the component.
 * @param {object} [style={}] - Style used by the component.
 *
 * @example
 * <CenteredContainer>Example</CenteredContainer>
 */
export const CenteredContainer = ({
  children,
  maxWidth = "800px",
  padding = "0",
  style = {},
}) => {
  return (
    <div
      style={{
        maxWidth: maxWidth,
        margin: "0 auto",
        padding: padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * FullWidthContainer - Full-width breakout container component
 *
 * @description
 * Provides a full-width container that breaks out of parent padding.
 * Useful for hero sections, full-width images, etc.
 *
 * @param {React.ReactNode} children - Content to display
 * @param {string} [backgroundColor] - Background color (CSS value or CSS variable)
 * @param {object} [style={}] - Additional inline styles
 *
 * @example
 * <FullWidthContainer backgroundColor="var(--accent)">
 *   Full-width hero content
 * </FullWidthContainer>
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component FullWidthContainer
 * @category layout
 * @tier composite
 * @status stable
 * @description Provides a full-width container that breaks out of parent padding. Useful for hero
 *   sections, full-width images, etc
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies CardContentContainer, TabsContainer
 * @usedIn v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} backgroundColor - Background color used by the component.
 * @param {object} [style={}] - Style used by the component.
 *
 * @example
 * <FullWidthContainer backgroundColor="value" />
 */
export const FullWidthContainer = ({
  children,
  backgroundColor,
  style = {},
}) => {
  if (children == null) {
    console.warn("[FullWidthContainer] Missing children");
    return null;
  }

  return (
    <div
      style={{
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        ...(backgroundColor && { backgroundColor: backgroundColor }),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * TabsContainer - Bordered wrapper for Mintlify tabs
 *
 * @description
 * Provides a consistent bordered container around a Tabs block so tab groups can
 * be embedded inside callouts and docs sections without repeating inline styles.
 *
 * @param {React.ReactNode} children - Tab content to render inside the container
 *
 * @example
 * <TabsContainer>
 *   <Tab title="Example">Content</Tab>
 * </TabsContainer>
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component TabsContainer
 * @category layout
 * @tier composite
 * @status stable
 * @description Provides a consistent bordered container around a Tabs block so tab groups can be
 *   embedded inside callouts and docs sections without repeating inline styles
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies CalloutContainer, CardContentContainer
 * @usedIn none
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <TabsContainer>Example</TabsContainer>
 */
export const TabsContainer = ({ children }) =>
  children == null ? null : (
    <div
      style={{
        border: "1px solid var(--accent)",
        borderRadius: "12px",
        padding: "1rem",
      }}
    >
      <Tabs>{children}</Tabs>
    </div>
  );

/**
 * CardContentContainer - Vertical flex container for card body content
 *
 * @description
 * Stacks child content vertically with configurable spacing and optional
 * alignment controls for card layouts.
 *
 * @param {React.ReactNode} children - Content to render inside the container
 * @param {string} [align] - Optional CSS align-items value
 * @param {string} [justify] - Optional CSS justify-content value
 * @param {string} [gap="1rem"] - Gap between child items
 *
 * @example
 * <CardContentContainer gap="1.5rem">
 *   <p>Body content</p>
 * </CardContentContainer>
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component CardContentContainer
 * @category layout
 * @tier composite
 * @status stable
 * @description Stacks child content vertically with configurable spacing and optional alignment
 *   controls for card layouts
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies CalloutContainer
 * @usedIn none
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} align - Align used by the component.
 * @param {string} justify - Justify used by the component.
 * @param {string} [gap="1rem"] - Gap used by the component.
 *
 * @example
 * <CardContentContainer align="value" justify="value" />
 */
export const CardContentContainer = ({
  children,
  align,
  justify,
  gap = "1rem",
}) =>
  children == null ? null : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: gap,
        ...(align ? { alignItems: align } : {}),
        ...(justify ? { justifyContent: justify } : {}),
      }}
    >
      {children}
    </div>
  );

/**
 * CalloutContainer - Flex wrapper for grouped callout content
 *
 * @description
 * Wraps one or more callouts in a vertical flex container with configurable
 * width and alignment for media-kit and resource pages.
 *
 * @param {React.ReactNode} children - Callout content to render
 * @param {string} [width="fit-content"] - Container width
 * @param {string} [align="center"] - CSS align-items value
 *
 * @example
 * <CalloutContainer align="flex-start">
 *   <Note>Example</Note>
 * </CalloutContainer>
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component CalloutContainer
 * @category layout
 * @tier composite
 * @status stable
 * @description Wraps one or more callouts in a vertical flex container with configurable width and
 *   alignment for media-kit and resource pages
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn none
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} [width="fit-content"] - Width used by the component.
 * @param {string} [align="center"] - Align used by the component.
 *
 * @example
 * <CalloutContainer>Example</CalloutContainer>
 */
export const CalloutContainer = ({
  children,
  width = "fit-content",
  align = "center",
}) =>
  children == null ? null : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: width,
        alignItems: align,
      }}
    >
      {children}
    </div>
  );

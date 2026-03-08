/**
 * CustomCallout - Customizable callout/alert box component
 *
 * @description
 * Displays a styled callout box with an icon and custom colors.
 * Automatically converts hex colors to rgba for proper opacity handling.
 *
 * @param {React.ReactNode} children - Content to display in the callout
 * @param {string} [icon="lightbulb"] - Icon name to display
 * @param {string} [color] - Primary color for icon, border, and background (defaults to theme accent)
 * @param {number} [iconSize=16] - Size of the icon in pixels
 * @param {string} [textSize="0.875rem"] - Font size for the text content
 * @param {string} [textColor] - Text color (defaults to match icon color)
 *
 * @example
 * <CustomCallout icon="info" color="#3b82f6">
 *   This is an important message!
 * </CustomCallout>
 *
 * @author Livepeer Documentation Team
 */
const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const normalizeIconName = (value, fallback) =>
  isNonEmptyString(value) ? value.trim() : fallback;

const normalizeIconSize = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getAlphaColor = (value, alpha) => {
  const resolvedValue = isNonEmptyString(value) ? value.trim() : "var(--accent)";
  const percentage = Math.max(0, Math.min(100, Math.round(alpha * 100)));
  return `color-mix(in srgb, ${resolvedValue} ${percentage}%, transparent)`;
};

/**
 * @component CustomCallout
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Renders the custom callout component
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies BlinkingIcon, BlinkingTerminal, DoubleIconLink, GotoCard, GotoLink, LinkArrow,
 *   TipWithArrow
 * @usedIn v2/gateways/run-a-gateway/connect/connect-with-offerings.mdx
 *   v2/gateways/run-a-gateway/publish/connect-with-offerings.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 *   v2/resources/documentation-guide/snippets-inventory.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} [icon="lightbulb"] - Icon configuration used by the component.
 * @param {string} color - Color used by the component.
 * @param {number} [iconSize=16] - Icon configuration used by the component.
 * @param {string} [textSize="0.875rem"] - Text size used by the component.
 * @param {string} textColor - Text color used by the component.
 *
 * @example
 * <CustomCallout color="value" textColor="value" />
 */
const CustomCallout = ({
  children,
  icon = "lightbulb",
  color,
  iconSize = 16,
  textSize = "0.875rem",
  textColor,
}) => {
  const resolvedColor = isNonEmptyString(color) ? color.trim() : "var(--accent)";
  const resolvedTextColor = isNonEmptyString(textColor)
    ? textColor.trim()
    : resolvedColor;
  const resolvedIcon = normalizeIconName(icon, "lightbulb");
  const resolvedIconSize = normalizeIconSize(iconSize, 16);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "16px 20px",
          borderRadius: "16px",
          border: `1px solid ${getAlphaColor(resolvedColor, 0.2)}`,
          backgroundColor: getAlphaColor(resolvedColor, 0.1),
          marginTop: "16px",
          marginBottom: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{ marginTop: "2px", width: resolvedIconSize, flexShrink: 0 }}
        >
          <Icon
            icon={resolvedIcon}
            size={resolvedIconSize}
            color={resolvedColor}
          />
        </div>
        <div
          style={{
            fontSize: textSize,
            color: resolvedTextColor,
            minWidth: 0,
            width: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

/**
 * BlinkingIcon - Animated blinking icon component
 *
 * @description
 * Displays an icon with a smooth blinking animation (fades between full and 30% opacity).
 * Animation cycles every 3 seconds.
 *
 * @param {string} [icon="terminal"] - Icon name to display
 * @param {number} [size=16] - Size of the icon in pixels
 * @param {string} [color] - Color of the icon (defaults to theme accent)
 *
 * @example
 * <BlinkingIcon icon="circle" color="#ff0000" size={20} />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component BlinkingIcon
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Displays an icon with a smooth blinking animation (fades between full and 30%
 *   opacity). Animation cycles every 3 seconds
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies BlinkingTerminal, DoubleIconLink
 * @usedIn v2/about/portal.mdx, v2/community/community-portal.mdx, v2/developers/portal.mdx
 *   v2/gateways/gateways-portal.mdx, v2/gateways/run-a-gateway/configure/ai-configuration.mdx
 *   v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx, v2/home/mission-control.mdx
 *   v2/lpt/token-portal.mdx, v2/orchestrators/orchestrators-portal.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx, v2/solutions/portal.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates BlinkingTerminal
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {string} [icon="terminal"] - Icon configuration used by the component.
 * @param {number} [size=16] - Size used by the component.
 * @param {string} color - Color used by the component.
 *
 * @example
 * <BlinkingIcon color="value" />
 */
const BlinkingIcon = ({ icon = "terminal", size = 16, color }) => {
  const resolvedColor = color || "var(--accent)";
  const resolvedIcon = normalizeIconName(icon, "terminal");
  const resolvedSize = normalizeIconSize(size, 16);

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
      <span
        style={{
          display: "inline-flex",
          animation: "blink 3s ease-in-out infinite",
        }}
      >
        <Icon icon={resolvedIcon} size={resolvedSize} color={resolvedColor} />
      </span>
    </>
  );
};

/**
 * BlinkingTerminal - Alias for BlinkingIcon (backwards compatibility)
 *
 * @description
 * Legacy alias for BlinkingIcon component. Use BlinkingIcon instead.
 *
 * @deprecated Use BlinkingIcon instead
 * @author Livepeer Documentation Team
 */
/**
 * @component BlinkingTerminal
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Legacy alias for BlinkingIcon component. Use BlinkingIcon instead
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies BlinkingIcon, CustomCallout, DoubleIconLink, GotoCard, GotoLink, LinkArrow,
 *   TipWithArrow
 * @usedIn v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates BlinkingIcon
 * @lastMeaningfulChange 2026-03-08
 *
 * @example
 * <BlinkingTerminal />
 */
const BlinkingTerminal = BlinkingIcon;

/**
 * DoubleIconLink - Link component with icons on both sides
 *
 * @description
 * Displays a link with an icon on the left and right, plus optional text prefix.
 * Commonly used for external links (e.g., GitHub links with external link indicator).
 *
 * @param {string} [label=""] - Link text/label
 * @param {string} [href="#"] - Link URL
 * @param {string} [text=""] - Optional text to display before the link
 * @param {string} [iconLeft="github"] - Icon to display on the left
 * @param {string} [iconRight="arrow-up-right"] - Icon to display on the right
 *
 * @example
 * <DoubleIconLink
 *   label="View on GitHub"
 *   href="https://github.com/livepeer/go-livepeer"
 *   iconLeft="github"
 *   iconRight="arrow-up-right"
 * />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component DoubleIconLink
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Displays a link with an icon on the left and right, plus optional text prefix.
 *   Commonly used for external links (e.g., GitHub links with external link indicator)
 * @contentAffinity how_to
 * @owner @livepeer/docs-team
 * @dependencies GotoCard, GotoLink, TipWithArrow
 * @usedIn v2/gateways/_contextData_/docker-install.mdx, v2/gateways/about/architecture.mdx
 *   v2/gateways/quickstart/gateway-setup.mdx, v2/gateways/references/configuration-flags.mdx
 *   v2/gateways/run-a-gateway/configure/ai-configuration.mdx
 *   v2/gateways/run-a-gateway/configure/dual-configuration.mdx
 *   v2/gateways/run-a-gateway/configure/video-configuration-view.mdx
 *   v2/gateways/run-a-gateway/configure/video-configuration.mdx
 *   v2/gateways/run-a-gateway/install/docker-install.mdx
 *   v2/gateways/run-a-gateway/install/install-overview.mdx
 *   v2/gateways/run-a-gateway/monitor/monitor-and-optimise.mdx
 *   v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx
 *   v2/gateways/run-a-gateway/requirements/setup.mdx
 *   v2/gateways/using-gateways/choosing-a-gateway.mdx
 *   v2/gateways/using-gateways/gateway-providers/daydream-gateway.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/x-deprecated/gateways/references/configuration-flags-old.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {string} [label=""] - Label text rendered by the component.
 * @param {string} [href="#"] - Destination URL used by the component.
 * @param {string} [text=""] - Primary content rendered by the component.
 * @param {string} [iconLeft="github"] - Icon configuration used by the component.
 * @param {string} [iconRight="arrow-up-right"] - Icon configuration used by the component.
 *
 * @example
 * <DoubleIconLink />
 */
const DoubleIconLink = ({
  label = "",
  href = "#",
  text = "",
  iconLeft = "github",
  iconRight = "arrow-up-right",
}) => {
  return (
    <>
      <span
        style={{
          whiteSpace: "nowrap",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25rem",
          marginLeft: "0.3rem",
        }}
      >
        {text && <span style={{ marginRight: 8 }}>{text}</span>}
        <Icon icon={iconLeft} />
        <a href={href}>{label}</a>
        <Icon icon={iconRight} size={12} color="var(--accent)" />
      </span>
    </>
  );
};

/**
 * GotoLink - Simple navigation link with icon
 *
 * @description
 * Displays a link with an icon, typically used for internal navigation.
 *
 * @param {string} label - Link text/label
 * @param {string} relativePath - Relative URL path
 * @param {string} [text=""] - Optional text to display before the link
 * @param {string} [icon="arrow-turn-down-right"] - Icon to display
 *
 * @example
 * <GotoLink
 *   label="Getting Started"
 *   relativePath="/guides/getting-started"
 *   icon="arrow-right"
 * />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component GotoLink
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Displays a link with an icon, typically used for internal navigation
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies BlinkingIcon, BlinkingTerminal, CustomCallout, DoubleIconLink, GotoCard, LinkArrow,
 *   TipWithArrow
 * @usedIn v2/about/livepeer-network/interfaces.mdx, v2/about/livepeer-network/marketplace.mdx
 *   v2/about/livepeer-network/technical-architecture.mdx
 *   v2/about/livepeer-protocol/technical-architecture.mdx
 *   v2/developers/ai-inference-on-livepeer/overview.mdx
 *   v2/developers/ai-inference-on-livepeer/workload-fit.mdx, v2/developers/ai-pipelines/byoc.mdx
 *   v2/developers/ai-pipelines/workload-fit.mdx, v2/developers/developer-platforms/builder-hub.mdx
 *   v2/gateways/about/quickstart.mdx, v2/gateways/gateway-tools/explorer.mdx
 *   v2/gateways/run-a-gateway/install/community-projects.mdx
 *   v2/gateways/run-a-gateway/install/install-overview.mdx
 *   v2/gateways/run-a-gateway/run-a-gateway.mdx, v2/gateways/using-gateways/gateway-providers.mdx
 *   v2/home/about-livepeer/vision.mdx, v2/home/primer.mdx
 *   v2/orchestrators/advanced-setup/hosting-models.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx, v2/solutions/product-hub.mdx
 *   v2/solutions/x-deprecated/developer-platforms/builder-hub.mdx
 *   v2/x-deprecated/about-livepeer/moved/livepeer-overview.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} label - Label text rendered by the component.
 * @param {string} relativePath - Relative path used by the component.
 * @param {string} [text=""] - Primary content rendered by the component.
 * @param {string} [icon="arrow-turn-down-right"] - Icon configuration used by the component.
 *
 * @example
 * <GotoLink label="Example" relativePath="value" />
 */
const GotoLink = ({
  label,
  relativePath,
  text = "",
  icon = "arrow-turn-down-right",
}) => {
  return (
    <span>
      <p style={{ marginRight: 8 }}>{text}</p>
      <Icon icon={icon} />
      <a href={relativePath} style={{ marginLeft: 6 }}>
        {label}
      </a>
    </span>
  );
};

/**
 * GotoCard - Card component for navigation
 *
 * @description
 * Wraps content in a Card component with a link, icon, and optional CTA.
 *
 * @param {string} label - Card title
 * @param {string} relativePath - Relative URL path
 * @param {string} [icon] - Icon to display (defaults to "arrow-turn-down-right")
 * @param {React.ReactNode} text - Card content
 * @param {string} [cta=""] - Call-to-action button text
 *
 * @example
 * <GotoCard
 *   label="API Reference"
 *   relativePath="/api/reference"
 *   icon="book"
 *   text="Complete API documentation"
 *   cta="View Docs"
 * />
 *
 * @author Livepeer Documentation Team
 *
 * Kind of an irrelevant component - just use card?
 */
/**
 * @component GotoCard
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Wraps content in a Card component with a link, icon, and optional CTA
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies TipWithArrow
 * @usedIn v2/about/livepeer-network/marketplace.mdx
 *   v2/about/livepeer-network/technical-architecture.mdx
 *   v2/about/livepeer-protocol/technical-architecture.mdx
 *   v2/developers/ai-inference-on-livepeer/overview.mdx
 *   v2/developers/ai-inference-on-livepeer/workload-fit.mdx, v2/developers/ai-pipelines/byoc.mdx
 *   v2/developers/ai-pipelines/model-support.mdx, v2/developers/ai-pipelines/workload-fit.mdx
 *   v2/developers/builder-opportunities/grants-and-programmes.mdx
 *   v2/developers/builder-opportunities/overview.mdx
 *   v2/developers/guides-and-tools/developer-guides.mdx
 *   v2/developers/guides-and-tools/developer-help.mdx, v2/developers/guides-and-tools/resources.mdx
 *   v2/gateways/about/explainer.mdx, v2/gateways/gateway-tools/explorer.mdx
 *   v2/gateways/gateway-tools/livepeer-tools.mdx
 *   v2/gateways/run-a-gateway/install/community-projects.mdx, v2/home/about-livepeer/vision.mdx
 *   v2/home/primer.mdx, v2/orchestrators/advanced-setup/hosting-models.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 *   v2/resources/documentation-guide/snippets-inventory.mdx
 *   v2/resources/documentation-guide/style-guide.mdx
 *   v2/x-deprecated/about-livepeer/moved/livepeer-overview.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} label - Label text rendered by the component.
 * @param {string} relativePath - Relative path used by the component.
 * @param {string} icon - Icon configuration used by the component.
 * @param {React.ReactNode} text - Primary content rendered by the component.
 * @param {string} [cta=""] - Cta used by the component.
 *
 * @example
 * <GotoCard label="Example" relativePath="value" icon="sparkles" />
 */
const GotoCard = ({ label, relativePath, icon, text, cta = "", ...props }) => {
  icon = icon ? icon : "arrow-turn-down-right";
  return (
    <Card title={label} icon={icon} href={relativePath} cta={cta} {...props}>
      {text}
    </Card>
  );
};

/**
 * TipWithArrow - Callout box with an arrow indicator
 *
 * @description
 * Similar to CustomCallout but includes an arrow icon in the top-right corner.
 * Useful for tips that point to related content or actions.
 *
 * @param {React.ReactNode} children - Content to display in the tip
 * @param {string} [icon="lightbulb"] - Main icon to display on the left
 * @param {string} [arrowIcon="arrow-up-right"] - Arrow icon to display in top-right
 * @param {string} [color] - Primary color for icons, border, and background (defaults to theme accent)
 * @param {number} [iconSize=16] - Size of the main icon in pixels
 * @param {number} [arrowSize=16] - Size of the arrow icon in pixels
 *
 * @example
 * <TipWithArrow icon="info" arrowIcon="arrow-right" color="#3b82f6">
 *   Check out the related documentation for more details!
 * </TipWithArrow>
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component TipWithArrow
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Similar to CustomCallout but includes an arrow icon in the top-right corner. Useful
 *   for tips that point to related content or actions
 * @contentAffinity how_to
 * @owner @livepeer/docs-team
 * @dependencies BlinkingIcon, BlinkingTerminal, CustomCallout, DoubleIconLink, GotoCard, GotoLink,
 *   LinkArrow
 * @usedIn v2/gateways/quickstart/gateway-setup.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} [icon="lightbulb"] - Icon configuration used by the component.
 * @param {string} [arrowIcon="arrow-up-right"] - Arrow icon used by the component.
 * @param {string} color - Color used by the component.
 * @param {number} [iconSize=16] - Icon configuration used by the component.
 * @param {number} [arrowSize=16] - Arrow size used by the component.
 *
 * @example
 * <TipWithArrow color="value" />
 */
const TipWithArrow = ({
  children,
  icon = "lightbulb",
  arrowIcon = "arrow-up-right",
  color,
  iconSize = 16,
  arrowSize = 16,
}) => {
  const resolvedColor = isNonEmptyString(color) ? color.trim() : "var(--accent)";
  const resolvedIcon = normalizeIconName(icon, "lightbulb");
  const resolvedArrowIcon = normalizeIconName(arrowIcon, "arrow-up-right");
  const resolvedIconSize = normalizeIconSize(iconSize, 16);
  const resolvedArrowSize = normalizeIconSize(arrowSize, 16);

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "16px 20px",
          paddingRight: "48px", // Extra space for the arrow
          borderRadius: "16px",
          border: `1px solid ${getAlphaColor(resolvedColor, 0.2)}`,
          backgroundColor: getAlphaColor(resolvedColor, 0.1),
          marginTop: "16px",
          marginBottom: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{ marginTop: "2px", width: resolvedIconSize, flexShrink: 0 }}
        >
          <Icon
            icon={resolvedIcon}
            size={resolvedIconSize}
            color={resolvedColor}
          />
        </div>
        <div
          style={{
            fontSize: "0.875rem",
            color: resolvedColor,
            minWidth: 0,
            width: "100%",
          }}
        >
          {children}
        </div>
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            opacity: 0.6,
          }}
        >
          <Icon
            icon={resolvedArrowIcon}
            size={resolvedArrowSize}
            color={resolvedColor}
          />
        </div>
      </div>
    </>
  );
};

/**
 * @component LinkArrow
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Renders the link arrow component
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies BlinkingIcon, BlinkingTerminal, CustomCallout, DoubleIconLink, GotoCard, GotoLink,
 *   TipWithArrow
 * @usedIn v2/about/livepeer-overview.mdx, v2/about/livepeer-protocol/governance-model.mdx
 *   v2/about/livepeer-protocol/livepeer-token.mdx, v2/about/livepeer-protocol/overview.mdx
 *   v2/about/resources/blockchain-contracts.mdx
 *   v2/community/livepeer-community/trending-topics.mdx
 *   v2/community/livepeer-connect/events-and-community-streams.mdx
 *   v2/developers/guides-and-resources/contribution-guide.mdx
 *   v2/developers/guides-and-tools/contribution-guide.mdx
 *   v2/gateways/using-gateways/gateway-providers.mdx, v2/home/about-livepeer/benefits.mdx
 *   v2/home/about-livepeer/ecosystem.mdx, v2/home/about-livepeer/evolution.mdx
 *   v2/home/about-livepeer/vision.mdx, v2/home/get-started.mdx, v2/home/solutions/landscape.mdx
 *   v2/home/solutions/showcase.mdx, v2/home/trending.mdx
 *   v2/orchestrators/about-orchestrators/overview.mdx, v2/orchestrators/quickstart/join-a-pool.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {string} href - Destination URL used by the component.
 * @param {React.ReactNode} label - Label text rendered by the component.
 * @param {React.ReactNode} description - Primary content rendered by the component.
 * @param {boolean} [newline=true] - Boolean flag that controls component behaviour.
 * @param {string} borderColor - Border color used by the component.
 *
 * @example
 * <LinkArrow href="/example" label="Example" description="Example" />
 */
const LinkArrow = ({
  href,
  label,
  description,
  newline = true,
  borderColor,
}) => {
  if (!href || !label) {
    console.warn("[LinkArrow] Missing required props: href and label");
    return null;
  }

  const linkArrowStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.25rem",
    width: "fit-content",
    ...(borderColor && { borderColor }),
  };
  return (
    <>
      {newline && <br />}
      <span style={linkArrowStyle}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
        <Icon icon="arrow-up-right" size={14} color="var(--accent)" />
      </span>
      {description && description}
      {description && <div style={{ height: "0.75rem" }} />}
    </>
  );
};

export {
  CustomCallout,
  BlinkingIcon,
  BlinkingTerminal,
  DoubleIconLink,
  GotoLink,
  GotoCard,
  TipWithArrow,
  LinkArrow,
};

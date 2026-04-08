/**
 * @component BorderedBox
 * @category wrappers
 * @subcategory containers
 * @status stable
 * @description Bordered container with configurable radius and background.
  * @aiDiscoverability none
 * @param {any} children - children prop.
 * @param {string} [variant="default"] - variant prop.
 * @param {string} [padding="var(--lp-spacing-4)"] - padding prop.
 * @param {string} [borderRadius="8px"] - border Radius prop.
 * @param {string} [accentBar=""] - Optional accent border token applied to the left edge.
 * @param {object} [style={}] - style prop.
  * @param {string} [className=''] - Optional CSS class override.
 */
export const BorderedBox = ({
  children,
  variant = "default",
  padding = "var(--lp-spacing-4)",
  borderRadius = "8px",
  accentBar = "",
  style = {},
  className = "",
  ...rest
}) => {
  const variants = {
    default: {
      border: "1px solid var(--lp-color-border-default)",
      backgroundColor: "var(--lp-color-bg-card)",
    },
    accent: {
      border: "1px solid var(--lp-color-accent)",
      backgroundColor: "var(--lp-color-bg-card)",
    },
    muted: {
      border: "1px solid var(--lp-color-border-default)",
      backgroundColor: "transparent",
    },
  };
  const accentBarColors = {
    accent: "var(--lp-color-accent)",
    positive: "var(--green-9)",
  };

  return (
    <div
      data-docs-bordered-box=""
      data-accent-bar={accentBarColors[accentBar] ? "" : undefined}
      className={className}
      style={{
        ...variants[variant],
        padding: padding,
        borderRadius: borderRadius,
        ...(accentBarColors[accentBar]
          ? { position: "relative", '--accent-bar-color': accentBarColors[accentBar] }
          : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * @component CenteredContainer
 * @category wrappers
 * @subcategory containers
 * @status stable
 * @description Horizontally centred container with configurable max-width.
  * @aiDiscoverability none
 * @param {any} children - children prop.
 * @param {string} [maxWidth="800px"] - max Width prop.
 * @param {string} [padding="0"] - padding prop.
 * @param {string} [preset="default"] - Named width/layout preset for common documentation patterns.
 * @param {string} [width=""] - Explicit width override.
 * @param {string} [minWidth=""] - Explicit min-width override.
 * @param {string} [marginRight=""] - Optional right margin override.
 * @param {string} [marginBottom=""] - Optional bottom margin override.
 * @param {string} [textAlign=""] - Optional text alignment override.
 * @param {object} [style={}] - style prop.
  * @param {string} [className=''] - Optional CSS class override.
 */
export const CenteredContainer = ({
  children,
  maxWidth = "800px",
  padding = "0",
  preset = "default",
  width = "",
  minWidth = "",
  marginRight = "",
  marginBottom = "",
  textAlign = "",
  style = {},
  className = "",
  ...rest
}) => {
  const presets = {
    default: {},
    fitContent: {
      width: "fit-content",
      minWidth: "fit-content",
    },
    readable70: {
      width: "70%",
      minWidth: "fit-content",
    },
    readable80: {
      width: "80%",
      minWidth: "fit-content",
    },
    readable90: {
      width: "90%",
    },
    wide900: {
      maxWidth: "900px",
    },
  };
  const presetStyle = presets[preset] || presets.default;

  return (
    <div
      className={className}
      style={{
        maxWidth: presetStyle.maxWidth || maxWidth,
        margin: "0 auto",
        padding: padding,
        ...(presetStyle.width ? { width: presetStyle.width } : {}),
        ...(presetStyle.minWidth ? { minWidth: presetStyle.minWidth } : {}),
        ...(width ? { width } : {}),
        ...(minWidth ? { minWidth } : {}),
        ...(marginRight ? { marginRight } : {}),
        ...(marginBottom ? { marginBottom } : {}),
        ...(textAlign ? { textAlign } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * @component FullWidthContainer
 * @category wrappers
 * @subcategory containers
 * @status stable
 * @description Full-viewport-width container that breaks out of parent padding.
  * @aiDiscoverability none
 * @param {any} children - children prop.
 * @param {any} backgroundColor - background Color prop.
 * @param {object} [style={}] - style prop.
  * @param {string} [className=''] - Optional CSS class override.
 */
export const FullWidthContainer = ({
  children,
  backgroundColor,
  style = {},
  className = "",
  ...rest
}) => {
  return (
    <div
      className={className}
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
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * @component FlexContainer
 * @category wrappers
 * @subcategory containers
 * @status stable
 * @description Flexbox container with configurable direction, gap, and alignment.
 * @aiDiscoverability none
 * @param {any} children - children prop.
 * @param {string} [direction="row"] - direction prop.
 * @param {string} [gap="var(--lp-spacing-4)"] - gap prop.
 * @param {string} [align="flex-start"] - align prop.
 * @param {string} [justify="flex-start"] - justify prop.
 * @param {boolean} [wrap=false] - wrap prop.
 * @param {string} [marginTop=""] - Optional top margin override.
 * @param {string} [marginBottom=""] - Optional bottom margin override.
 * @param {object} [style={}] - style prop.
 * @param {string} [className=''] - Optional CSS class override.
 */
export const FlexContainer = ({
  children,
  direction = "row",
  gap = "var(--lp-spacing-4)",
  align = "flex-start",
  justify = "flex-start",
  wrap = false,
  marginTop = "",
  marginBottom = "",
  style = {},
  className = "",
  ...rest
}) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: direction,
        gap: gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        ...(marginTop ? { marginTop } : {}),
        ...(marginBottom ? { marginBottom } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * @component GridContainer
 * @category wrappers
 * @subcategory containers
 * @status stable
 * @description CSS Grid container with configurable columns and gap.
 * @aiDiscoverability none
 * @param {any} children - children prop.
 * @param {any} columns - columns prop.
 * @param {string} [gap="var(--lp-spacing-4)"] - gap prop.
 * @param {object} [style={}] - style prop.
 * @param {string} [className=''] - Optional CSS class override.
 */
export const GridContainer = ({
  children,
  columns,
  gap = "var(--lp-spacing-4)",
  style = {},
  className = "",
  ...rest
}) => {
  const gridTemplateColumns = columns
    ? typeof columns === "number"
      ? `repeat(${columns}, 1fr)`
      : columns
    : "1fr";

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: gridTemplateColumns,
        gap: gap,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * @component CalloutWrapper
 * @category wrappers
 * @subcategory containers
 * @status stable
 * @description Wraps Mintlify callout types (Tip, Info, Warning, Note, Check) with a styled header and description.
 * @aiDiscoverability props-extracted
 * @param {string} [type="tip"] - Mintlify callout type: "tip", "info", "warning", "note", "check"
 * @param {string} header - Bold header text displayed at the top of the callout
 * @param {React.ReactNode} children - Description content below the header
 * @param {string} [headerColor="var(--lp-color-text-primary)"] - Header text colour
 * @param {string} [headerSize="0.9rem"] - Header font size
 * @param {string} [className=""] - CSS class name
 * @param {object} [style={}] - Inline style overrides
 * @example
 * <CalloutWrapper type="tip" header="Are you a Solution Provider?">
 *   Submit a PR to add your solution here!
 * </CalloutWrapper>
 */
export const CalloutWrapper = ({
  type = "tip",
  header = "",
  children,
  headerColor = "var(--lp-color-text-primary)",
  headerSize = "0.9rem",
  className = "",
  style = {},
  ...rest
}) => {
  const headerEl = header ? (
    <div style={{ color: headerColor, fontSize: headerSize, fontWeight: 700, marginBottom: "0.2rem" }}>
      {header}
    </div>
  ) : null;

  const bodyEl = children ? (
    <span style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--lp-spacing-1)" }}>
      {children}
    </span>
  ) : null;

  const content = (
    <>
      {headerEl}
      {bodyEl}
    </>
  );

  const types = {
    tip: Tip,
    info: Info,
    warning: Warning,
    note: Note,
    check: Check,
  };

  const Component = types[type] || Tip;

  return (
    <Component className={className} style={style} {...rest}>
      {content}
    </Component>
  );
};


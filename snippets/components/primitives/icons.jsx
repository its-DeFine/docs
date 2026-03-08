/**
 * @component LivepeerSVG
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Renders the Livepeer logo as an inline SVG element. Uses em units for responsive
 *   sizing
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies LivepeerIconFlipped, LivepeerIconOld
 * @usedIn v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 *   v2/resources/documentation-guide/snippets-inventory.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {number} [size=24] - Size used by the component.
 * @param {string} [fill="var(--lp-color-white)"] - Fill used by the component.
 *
 * @example
 * <LivepeerSVG />
 */
export const LivepeerSVG = ({
  size = 24,
  fill = "var(--lp-color-white)",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      {...props}
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M.017.377v71.028h71.027V.377H.017Zm130.355 82.72v71.028H201.4V83.097h-71.028Zm130.6 153.28v-71.028H332v71.028h-71.028Zm-130.6 12.185v71.028H201.4v-71.028h-71.028ZM.017 402.31v-71.027h71.027v71.027H.017Zm0-236.492v71.028h71.027v-71.028H.017Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

/**
 * LivepeerIconOld - Legacy Livepeer icon component
 *
 * @description
 * Displays the Livepeer logo using the light symbol SVG file.
 * This is the older version of the icon component.
 *
 * @param {Object} props - Icon component props
 *
 * @example
 * <LivepeerIconOld size={20} />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component LivepeerIconOld
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Displays the Livepeer logo using the light symbol SVG file. This is the older
 *   version of the icon component
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies LivepeerIcon, LivepeerIconFlipped
 * @usedIn v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @example
 * <LivepeerIconOld />
 */
export const LivepeerIconOld = ({ ...props }) => {
  const iconProps = props && typeof props === "object" ? props : {};

  return (
    <Icon
      icon="/snippets/assets/logos/Livepeer-Logo-Symbol-Light.svg"
      {...iconProps}
    />
  );
};

/**
 * LivepeerIconFlipped - Horizontally flipped Livepeer icon
 *
 * @description
 * Displays the Livepeer logo flipped horizontally using CSS transform.
 * Useful for decorative purposes or directional indicators.
 *
 * @param {Object} props - Icon component props
 *
 * @example
 * <LivepeerIconFlipped size={20} />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component LivepeerIconFlipped
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Displays the Livepeer logo flipped horizontally using CSS transform. Useful for
 *   decorative purposes or directional indicators
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies LivepeerIcon
 * @usedIn v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @example
 * <LivepeerIconFlipped />
 */
export const LivepeerIconFlipped = ({ ...props }) => {
  const iconProps = props && typeof props === "object" ? props : {};

  return (
    <span style={{ display: "inline-block", transform: "scaleX(-1)" }}>
      <Icon
        icon="/snippets/assets/logos/Livepeer-Logo-Symbol-Light.svg"
        {...iconProps}
      />
    </span>
  );
};

/**
 * LivepeerIcon - Theme-aware Livepeer icon component
 *
 * @description
 * Displays the Livepeer logo with automatic color adaptation for light/dark themes.
 * Uses CSS custom properties for theme-aware coloring.
 *
 * @param {number} [size=16] - Size of the icon in pixels
 * @param {string} [color] - Custom color override (defaults to theme-aware color)
 * @param {Object} props - Additional Icon component props
 *
 * @example
 * <LivepeerIcon size={24} />
 * <LivepeerIcon size={20} color="#ff0000" />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component LivepeerIcon
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Displays the Livepeer logo with automatic color adaptation for light/dark themes.
 *   Uses CSS custom properties for theme-aware coloring
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/home/mission-control.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {number} [size=16] - Size used by the component.
 * @param {string} color - Color used by the component.
 *
 * @example
 * <LivepeerIcon color="value" />
 */
export const LivepeerIcon = ({ size = 16, color, ...props }) => {
  const resolvedColor =
    typeof color === "string" && color.trim()
      ? color.trim()
      : "var(--livepeer-icon-color, var(--lp-color-icon-muted))";

  return (
    <span
      style={{
        display: "inline-flex",
        color: resolvedColor,
      }}
      className="livepeer-icon"
    >
      <Icon
        icon="/snippets/assets/logos/Livepeer-Logo-Symbol.svg"
        size={size}
        {...props}
      />
      <style>{`
        :root {
          --livepeer-icon-color: var(--muted-text);
        }
        .dark {
          --livepeer-icon-color: var(--lp-color-icon-muted);
        }
        @media (prefers-color-scheme: dark) {
          :root:not(.light) {
            --livepeer-icon-color: var(--lp-color-icon-muted);
          }
        }
      `}</style>
    </span>
  );
};

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
 * @component Spacer
 * @category wrappers
 * @subcategory containers
 * @status stable
 * @description Spacer element with configurable size.
  * @aiDiscoverability none
 * @param {string} [size="var(--lp-spacing-4)"] - size prop.
 * @param {string} [direction="vertical"] - direction prop.
  * @param {string} [className=''] - Optional CSS class override.
  * @param {object} [style={}] - Optional inline style override.
 */
export const Spacer = ({ size = "var(--lp-spacing-4)", direction = "vertical", className = "", style = {}, ...rest }) => {
  return (
    <div
      className={className}
      style={{
        ...(direction === "vertical"
          ? { height: size, width: "100%" }
          : { width: size, height: "100%" }),
        ...style,
      }}
      {...rest}
    />
  );
};

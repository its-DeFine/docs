/**
 * @component FlexContainer
 * @category layout
 * @tier composite
 * @status stable
 * @description Provides flexbox layout without requiring inline styles in MDX files. All styling
 *   uses CSS Custom Properties for theme awareness
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies GridContainer
 * @usedIn v2/community/livepeer-community/community-guidelines.mdx
 *   v2/developers/ai-inference-on-livepeer/overview.mdx
 *   v2/developers/ai-inference-on-livepeer/workload-fit.mdx
 *   v2/developers/ai-pipelines/workload-fit.mdx, v2/gateways/quickstart/gateway-setup.mdx
 *   v2/gateways/run-a-gateway/run-a-gateway.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} [direction="row"] - Direction used by the component.
 * @param {string} [gap="1rem"] - Gap used by the component.
 * @param {string} [align="flex-start"] - Align used by the component.
 * @param {string} [justify="flex-start"] - Justify used by the component.
 * @param {boolean} [wrap=false] - Boolean flag that controls component behaviour.
 * @param {object} [style={}] - Style used by the component.
 *
 * @example
 * <FlexContainer>Example</FlexContainer>
 */
export const FlexContainer = ({
  children,
  direction = "row",
  gap = "1rem",
  align = "flex-start",
  justify = "flex-start",
  wrap = false,
  style = {},
}) => {
  if (children == null) {
    console.warn("[FlexContainer] Missing children");
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap: gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * GridContainer - CSS Grid container component for MDX files
 *
 * @description
 * Provides grid layout without requiring inline styles in MDX files.
 * All styling uses CSS Custom Properties for theme awareness.
 *
 * @param {React.ReactNode} children - Content to display
 * @param {string|number} [columns] - Number of columns or CSS grid-template-columns value
 * @param {string} [gap="1rem"] - Gap between items (CSS value)
 * @param {object} [style={}] - Additional inline styles
 *
 * @example
 * <GridContainer columns={3} gap="2rem">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </GridContainer>
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component GridContainer
 * @category layout
 * @tier composite
 * @status stable
 * @description Provides grid layout without requiring inline styles in MDX files. All styling uses
 *   CSS Custom Properties for theme awareness
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {Array} columns - Collection data rendered by the component.
 * @param {string} [gap="1rem"] - Gap used by the component.
 * @param {object} [style={}] - Style used by the component.
 *
 * @example
 * <GridContainer columns={[]} />
 */
export const GridContainer = ({
  children,
  columns,
  gap = "1rem",
  style = {},
}) => {
  if (children == null) {
    console.warn("[GridContainer] Missing children");
    return null;
  }

  const gridTemplateColumns = columns
    ? typeof columns === "number"
      ? `repeat(${columns}, 1fr)`
      : columns
    : "1fr";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: gridTemplateColumns,
        gap: gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

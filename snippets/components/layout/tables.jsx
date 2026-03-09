/**
 * @component StyledTable
 * @category layout
 * @tier pattern
 * @status stable
 * @description Provides table styling without requiring inline styles in MDX files. All styling
 *   uses CSS Custom Properties for theme awareness
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies TableCell, TableRow
 * @usedIn v2/developers/ai-pipelines/overview.mdx
 *   v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/video-streaming-101.mdx
 *   v2/developers/quickstart/video/video-streaming-101.mdx
 *   v2/gateways/references/api-reference/AI-API/ai.mdx
 *   v2/gateways/run-a-gateway/gateway-operator-opportunities.mdx
 *   v2/gateways/run-a-gateway/requirements/setup.mdx
 *   v2/gateways/using-gateways/choosing-a-gateway.mdx
 *   v2/gateways/using-gateways/gateway-providers/livepeer-studio-gateway.mdx
 *   v2/internal/rfp/report.mdx, v2/lpt/delegation/getting-started.mdx
 *   v2/orchestrators/earnings.mdx, v2/orchestrators/quickstart/orchestrator-setup.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} [variant="default"] - Variant used by the component.
 * @param {object} [style={}] - Style used by the component.
 *
 * @example
 * <StyledTable>Example</StyledTable>
 */
export const StyledTable = ({ children, variant = "default", style = {} }) => {
  if (children == null) {
    console.warn("[StyledTable] Missing children");
    return null;
  }

  const variants = {
    default: {
      border: "1px solid var(--border)",
      backgroundColor: "var(--card-background)",
    },
    bordered: {
      border: "2px solid var(--accent)",
      backgroundColor: "var(--background)",
    },
    minimal: {
      border: "none",
      backgroundColor: "transparent",
    },
  };

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </table>
  );
};

/**
 * TableRow - Theme-aware table row component
 *
 * @description
 * Provides table row styling with optional hover effects.
 *
 * @param {React.ReactNode} children - Table cells
 * @param {boolean} [header=false] - Is this a header row?
 * @param {boolean} [hover=false] - Enable hover effect
 * @param {object} [style={}] - Additional inline styles
 *
 * @example
 * <TableRow header>
 *   <TableCell>Header</TableCell>
 * </TableRow>
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component TableRow
 * @category layout
 * @tier composite
 * @status stable
 * @description Provides table row styling with optional hover effects
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies TableCell
 * @usedIn v2/developers/ai-pipelines/overview.mdx
 *   v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/video-streaming-101.mdx
 *   v2/developers/quickstart/video/video-streaming-101.mdx
 *   v2/gateways/references/api-reference/AI-API/ai.mdx
 *   v2/gateways/run-a-gateway/gateway-operator-opportunities.mdx
 *   v2/gateways/run-a-gateway/requirements/setup.mdx
 *   v2/gateways/using-gateways/choosing-a-gateway.mdx
 *   v2/gateways/using-gateways/gateway-providers/livepeer-studio-gateway.mdx
 *   v2/internal/rfp/report.mdx, v2/lpt/delegation/getting-started.mdx
 *   v2/orchestrators/earnings.mdx, v2/orchestrators/quickstart/orchestrator-setup.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {boolean} [header=false] - Boolean flag that controls component behaviour.
 * @param {boolean} [hover=false] - Boolean flag that controls component behaviour.
 * @param {object} [style={}] - Style used by the component.
 *
 * @example
 * <TableRow>Example</TableRow>
 */
export const TableRow = ({
  children,
  header = false,
  hover = false,
  style = {},
}) => {
  const rowId = `table-row-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      {hover && (
        <style>{`
          #${rowId}:hover {
            background-color: var(--card-background);
          }
        `}</style>
      )}
      <tr
        id={rowId}
        style={{
          ...(header && {
            backgroundColor: "var(--accent-dark)",
            color: "var(--button-text)",
            fontWeight: "bold",
          }),
          ...style,
        }}
      >
        {children}
      </tr>
    </>
  );
};

/**
 * TableCell - Theme-aware table cell component
 *
 * @description
 * Provides table cell styling with alignment options.
 *
 * @param {React.ReactNode} children - Cell content
 * @param {string} [align="left"] - Text alignment: "left" | "center" | "right"
 * @param {boolean} [header=false] - Is this a header cell?
 * @param {object} [style={}] - Additional inline styles
 *
 * @example
 * <TableCell align="center" header>Header</TableCell>
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component TableCell
 * @category layout
 * @tier composite
 * @status stable
 * @description Provides table cell styling with alignment options
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/developers/ai-pipelines/overview.mdx
 *   v2/developers/livepeer-real-time-video/video-streaming-on-livepeer/video-streaming-101.mdx
 *   v2/developers/quickstart/video/video-streaming-101.mdx
 *   v2/gateways/references/api-reference/AI-API/ai.mdx
 *   v2/gateways/run-a-gateway/gateway-operator-opportunities.mdx
 *   v2/gateways/run-a-gateway/requirements/setup.mdx
 *   v2/gateways/using-gateways/choosing-a-gateway.mdx
 *   v2/gateways/using-gateways/gateway-providers/livepeer-studio-gateway.mdx
 *   v2/internal/rfp/report.mdx, v2/lpt/delegation/getting-started.mdx
 *   v2/orchestrators/earnings.mdx, v2/orchestrators/quickstart/orchestrator-setup.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} [align="left"] - Align used by the component.
 * @param {boolean} [header=false] - Boolean flag that controls component behaviour.
 * @param {object} [style={}] - Style used by the component.
 *
 * @example
 * <TableCell>Example</TableCell>
 */
export const TableCell = ({
  children,
  align = "left",
  header = false,
  style = {},
}) => {
  const Component = header ? "th" : "td";

  return (
    <Component
      style={{
        padding: "0.75rem 1rem",
        textAlign: align,
        border: header ? "none" : "1px solid var(--border)",
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

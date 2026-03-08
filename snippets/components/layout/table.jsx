/**
 * @component DynamicTable
 * @category layout
 * @tier pattern
 * @status stable
 * @description DynamicTable - A reusable table component with site-consistent styling
 * @contentAffinity concept
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/about/livepeer-network/interfaces.mdx, v2/about/livepeer-network/job-lifecycle.mdx
 *   v2/about/livepeer-network/marketplace.mdx, v2/about/livepeer-network/technical-architecture.mdx
 *   v2/about/livepeer-protocol/core-mechanisms.mdx, v2/about/livepeer-protocol/livepeer-token.mdx
 *   v2/about/livepeer-protocol/overview.mdx, v2/about/livepeer-protocol/technical-architecture.mdx
 *   v2/about/livepeer-protocol/treasury.mdx, v2/developers/ai-inference-on-livepeer/overview.mdx
 *   v2/developers/ai-inference-on-livepeer/workload-fit.mdx, v2/developers/ai-pipelines/byoc.mdx
 *   v2/developers/ai-pipelines/comfystream.mdx, v2/developers/ai-pipelines/model-support.mdx
 *   v2/developers/ai-pipelines/workload-fit.mdx
 *   v2/gateways/guides-and-resources/gateway-job-pipelines/overview.mdx
 *   v2/gateways/run-a-gateway/configure/pricing-configuration.mdx
 *   v2/gateways/run-a-gateway/configure/video-configuration-view.mdx
 *   v2/gateways/run-a-gateway/configure/video-configuration.mdx
 *   v2/orchestrators/advanced-setup/hosting-models.mdx, v2/orchestrators/quickstart/join-a-pool.mdx
 *   v2/orchestrators/setting-up-an-orchestrator/hardware-requirements.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/layout.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} [tableTitle=null] - Table title used by the component.
 * @param {Array} [headerList=[]] - Collection data rendered by the component.
 * @param {Array} [itemsList=[]] - Collection data rendered by the component.
 * @param {Array} [monospaceColumns=[]] - Collection data rendered by the component.
 * @param {string} margin - Margin used by the component.
 *
 * @example
 * <DynamicTable margin="value" />
 */
export const DynamicTable = ({
  tableTitle = null,
  headerList = [],
  itemsList = [],
  monospaceColumns = [],
  margin,
}) => {
  if (!headerList.length) {
    return <div>No headers provided</div>;
  }

  return (
    <>
      {tableTitle && (
        <div style={{ fontStyle: "italic", margin: 0 }}>
          <strong>{tableTitle}</strong>
        </div>
      )}
      <div
        style={{ overflowX: "auto", ...(margin != null && { margin }) }}
        role="region"
        tabIndex={0}
        aria-label={tableTitle ? `Scrollable table: ${tableTitle}` : "Scrollable table"}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
            marginTop: 0,
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--lp-color-white)",
              }}
            >
              {headerList.map((header, index) => (
                <th
                  key={index}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontWeight: "600",
                    borderBottom: "2px solid var(--accent)",
                    color: "var(--lp-color-white)",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {itemsList.map((item, rowIndex) => (
              item?.__separator ? (
                <tr
                  key={rowIndex}
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--lp-color-white)",
                    borderBottom: "1px solid var(--accent)",
                  }}
                >
                  <td
                    colSpan={headerList.length}
                    style={{
                      padding: "8px 16px",
                      fontWeight: "700",
                      color: "var(--lp-color-white)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item[headerList[0]] ?? item.Category ?? "Category"}
                  </td>
                </tr>
              ) : (
                <tr
                  key={rowIndex}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  {headerList.map((header, colIndex) => {
                    const value =
                      item[header] ?? item[header.toLowerCase()] ?? "-";
                    const isMonospace = monospaceColumns.includes(colIndex);

                    return (
                      <td
                        key={colIndex}
                        style={{
                          padding: "10px 16px",
                          fontFamily: isMonospace ? "monospace" : "inherit",
                        }}
                      >
                        {isMonospace ? <code>{value}</code> : value}
                      </td>
                    );
                  })}
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

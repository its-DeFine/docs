/**
 * @component MathInline
 * @category content
 * @tier composite
 * @status stable
 * @description Renders the math inline component
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies MathBlock
 * @usedIn v2/lpt/about/mechanics.mdx, v2/lpt/about/overview.mdx, v2/lpt/about/tokenomics.mdx
 *   v2/lpt/delegation/about-delegators.mdx, v2/lpt/delegation/delegation-guide.mdx
 *   v2/lpt/delegation/overview.mdx, v2/lpt/governance/model.mdx, v2/lpt/governance/overview.mdx
 *   v2/lpt/governance/processes.mdx, v2/lpt/treasury/allocations.mdx, v2/lpt/treasury/overview.mdx
 *   v2/lpt/treasury/proposals.mdx, v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-03
 *
 * @param {string} latex - Latex used by the component.
 * @param {string} [className=""] - Class name used by the component.
 * @param {React.ReactNode} ariaLabel - Aria label used by the component.
 *
 * @example
 * <MathInline latex="value" ariaLabel="value" />
 */
export const MathInline = ({ latex, className = "", ariaLabel }) => {
  const value = latex === null || latex === undefined ? "" : String(latex);
  if (!value) return null;

  return (
    <span className={className} aria-label={ariaLabel || "Math expression"}>
      {`$${value}$`}
    </span>
  );
};

/**
 * @component MathBlock
 * @category content
 * @tier composite
 * @status stable
 * @description Renders the math block component
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/lpt/about/mechanics.mdx, v2/lpt/about/overview.mdx, v2/lpt/about/tokenomics.mdx
 *   v2/lpt/delegation/about-delegators.mdx, v2/lpt/delegation/delegation-guide.mdx
 *   v2/lpt/delegation/overview.mdx, v2/lpt/governance/model.mdx, v2/lpt/governance/overview.mdx
 *   v2/lpt/governance/processes.mdx, v2/lpt/treasury/allocations.mdx, v2/lpt/treasury/overview.mdx
 *   v2/lpt/treasury/proposals.mdx, v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-03
 *
 * @param {string} latex - Latex used by the component.
 * @param {string} [className=""] - Class name used by the component.
 * @param {React.ReactNode} ariaLabel - Aria label used by the component.
 *
 * @example
 * <MathBlock latex="value" ariaLabel="value" />
 */
export const MathBlock = ({ latex, className = "", ariaLabel }) => {
  const value = latex === null || latex === undefined ? "" : String(latex);
  if (!value) return null;

  return (
    <div className={className} aria-label={ariaLabel || "Math expression"}>
      {`$$\n${value}\n$$`}
    </div>
  );
};

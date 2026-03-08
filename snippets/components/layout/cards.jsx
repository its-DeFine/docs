/**
 * @component ScrollBox
 * @category layout
 * @tier composite
 * @status stable
 * @description Provides a scrollable area with optional max height and scroll hint. Use as a child
 *   of Card to make long content scrollable
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/home/solutions/showcase.mdx, v2/home/solutions/verticals.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/layout.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {number} [maxHeight=300] - Max height used by the component.
 * @param {boolean} [showHint=true] - Boolean flag that controls component behaviour.
 * @param {string} [ariaLabel="Scrollable content"] - Aria label used by the component.
 * @param {object} style - Style used by the component.
 *
 * @example
 * <ScrollBox style={{}} />
 */
export const ScrollBox = ({
  children,
  maxHeight = 300,
  showHint = true,
  ariaLabel = "Scrollable content",
  style,
}) => {
  if (children == null) {
    console.warn("[ScrollBox] Missing children");
    return null;
  }

  const contentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const maxHeightPx =
          typeof maxHeight === "number"
            ? maxHeight
            : parseInt(maxHeight, 10) || 300;
        setIsOverflowing(contentRef.current.scrollHeight > maxHeightPx);
      }
    };
    checkOverflow();
    // Re-check on window resize
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [maxHeight, children]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={contentRef}
        role="region"
        tabIndex={0}
        aria-label={ariaLabel}
        style={{
          maxHeight:
            typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
          overflowY: "auto",
          paddingRight: 4,
          ...style,
        }}
        onScroll={(e) => {
          const el = e.target;
          const atBottom =
            el.scrollHeight - el.scrollTop <= el.clientHeight + 10;
          const hint = el.parentNode.querySelector("[data-scroll-hint]");
          if (hint) hint.style.opacity = atBottom ? "0" : "1";
        }}
      >
        {children}
      </div>
      {showHint && isOverflowing && (
        <div
          data-scroll-hint
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            marginTop: 8,
            transition: "opacity 0.2s",
          }}
        >
          Scroll for more ↓
        </div>
      )}
    </div>
  );
};

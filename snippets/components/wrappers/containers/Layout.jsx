/**
 * Layout utilities — LazyLoad and ScrollBox.
 */

// Re-exports for consumers that import these from Layout.jsx
export { FlexContainer, GridContainer } from '/snippets/components/wrappers/containers/Containers.jsx';

/**
 * @component LazyLoad
 * @category wrappers
 * @subcategory containers
 * @status stable
<<<<<<< HEAD
 * @description Defers rendering of children until the element scrolls into (or near) the viewport. Uses IntersectionObserver — fires once, then disconnects. Fades content in over 400ms to prevent layout flash from async children (embeds, fetched data).
 * @aiDiscoverability none
 * @param {React.ReactNode} children - Content to render when visible.
 * @param {string} [height="200px"] - Placeholder min-height before content loads.
 * @param {string} [offset="200px"] - rootMargin for the IntersectionObserver (how far ahead to trigger).
 * @param {number} [fadeDuration=400] - Fade-in duration in milliseconds.
 * @param {string} [className=""] - Optional CSS class override.
 * @param {object} [style={}] - Optional inline style override.
 */
'use client'

export const LazyLoad = ({ children, height = "200px", offset = "200px", fadeDuration = 400, className = "", style = {}, ...rest }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
=======
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
>>>>>>> docs-v2-dev

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: offset }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    if (!visible) return;
    const frameId = requestAnimationFrame(() => {
      setReady(true);
    });
    return () => cancelAnimationFrame(frameId);
  }, [visible]);

  const placeholder = (
=======
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
>>>>>>> docs-v2-dev
    <div
      ref={ref}
      className={className}
      style={{ minHeight: height, ...style }}
      {...rest}
    />
  );

  if (!visible) return placeholder;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: ready ? 1 : 0,
        transition: `opacity ${fadeDuration}ms ease-in`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * @component ScrollBox
 * @category wrappers
 * @subcategory containers
 * @status stable
 * @description Scrollable container with max-height, overflow hint, and accessible region role.
 * @aiDiscoverability none
 * @param {any} children - children prop.
 * @param {number} [maxHeight=300] - max Height prop.
 * @param {boolean} [showHint=true] - show Hint prop.
 * @param {string} [ariaLabel="Scrollable content"] - aria Label prop.
 * @param {any} style - style prop.
 * @param {string} [className=""] - CSS class name.
 */
export const ScrollBox = ({
  children,
  maxHeight = 300,
  showHint = true,
  ariaLabel = "Scrollable content",
  style = {},
  className = "",
  ...rest
}) => {
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
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [maxHeight, children]);

  return (
    <div className={className} style={{ position: "relative", ...style }} {...rest}>
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
            color: "var(--lp-color-text-muted)",
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

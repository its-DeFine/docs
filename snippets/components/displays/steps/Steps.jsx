// ─── Steps — all step and list-step components ─── //

import { GotoLink } from '/snippets/components/elements/links/Links.jsx'
import { InlineDivider } from '/snippets/components/elements/spacing/Divider.jsx'

/**
 * @component StyledSteps
 * @category wrappers
 * @subcategory steps
 * @status stable
 * @description Wrapper around Mintlify Steps with custom icon styling via injected CSS.
 * @aiDiscoverability none
 * @param {any} children - children prop.
 * @param {any} iconColor - icon Color prop.
 * @param {any} titleColor - title Color prop.
 * @param {any} lineColor - line Color prop.
 * @param {string} [iconSize="24px"] - icon Size prop.
 * @param {string} [className=''] - Optional CSS class override.
 * @param {object} [style={}] - Optional inline style override.
 */
export const StyledSteps = ({
  children,
  iconColor,
  titleColor,
  lineColor,
  iconSize = '24px',
  className = '',
  style = {},
  ...rest
}) => {
  const resolvedIconColor = iconColor || 'var(--accent-dark, #18794E)'
  const resolvedTitleColor = titleColor || 'var(--lp-color-accent)'
  const resolvedLineColor = lineColor || 'var(--lp-color-accent)'

  return (
    <div
      className={['docs-styled-steps', className].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    >
      <style>{`
        .docs-styled-steps .steps > div > div.absolute > div {
          background-color: ${resolvedIconColor};
        }
        .docs-styled-steps .steps > div > div.w-full > p {
          color: ${resolvedTitleColor};
        }
        .docs-styled-steps .steps > div > div.absolute.w-px {
          background-color: ${resolvedLineColor};
        }
        .docs-styled-steps .steps > div:last-child > div.absolute.w-px::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background-color: ${resolvedLineColor};
          transform: translateX(-50%) rotate(45deg);
        }
      `}</style>
      <div>
        <Steps>{children}</Steps>
      </div>
    </div>
  )
}

/**
 * @component StyledStep
 * @category wrappers
 * @subcategory steps
 * @status stable
 * @description Single step with configurable icon, size, and per-step colour overrides.
 *              When iconColor or titleColor is set, injects a scoped CSS override that
 *              takes precedence over the parent StyledSteps colours for this step only.
 *              When neither is set, behaves identically to a plain Step pass-through.
 * @aiDiscoverability none
 * @param {any} title - title prop.
 * @param {any} icon - icon prop.
 * @param {string} [titleSize="h3"] - title Size prop.
 * @param {string|null} [iconColor=null] - Per-step icon background colour override.
 * @param {string|null} [titleColor=null] - Per-step title text colour override.
 * @param {boolean} [divider=false] - Show a divider line after the step content.
 * @param {string} [dividerMargin="0.5rem 0"] - Margin for the trailing divider.
 * @param {any} children - children prop.
 * @param {string} [className=''] - Optional CSS class override.
 * @param {object} [style={}] - Optional inline style override.
 */

export const StyledStep = ({
  title,
  icon,
  titleSize = 'h3',
  iconColor = null,
  titleColor = null,
  children,
  className = '',
  style = {},
  ...rest
}) => {
  const styledTitle = titleColor ? (
    <span style={{ color: titleColor }}>{title}</span>
  ) : (
    title
  )

  return (
    <Step
      title={styledTitle}
      icon={icon}
      iconColor={iconColor || undefined}
      titleSize={titleSize}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Step>
  )
}

/**
 * @component ListSteps
 * @category wrappers
 * @subcategory lists
 * @status stable
 * @description Renders an array of step items inside Mintlify Steps component.
  * @aiDiscoverability none
 * @param {Array} listItems - Collection data rendered by the component.
 * @param {object} [stepsConfig={}] - Steps config used by the component.
 * @param {string} [className=""] - CSS class name.
 * @param {object} [style={}] - Inline style overrides.
 */
export const ListSteps = ({ listItems, stepsConfig = {}, className = "", style = {}, ...rest }) => {
  const safeItems = Array.isArray(listItems) ? listItems : [];
  if (safeItems.length === 0) {
    console.warn("[ListSteps] Missing required prop: listItems");
    return null;
  }

  return (
    <Steps className={className} style={style} {...stepsConfig} {...rest}>
      {safeItems.map(({ title, icon, children, ...props }, idx) => (
        <Step key={idx} title={title} icon={icon} {...props}>
          {children}
        </Step>
      ))}
    </Steps>
  );
};

// ─── List-based Steps (from Lists.jsx) ─── //


/**
 * @component BasicList
 * @category wrappers
 * @subcategory lists
 * @status planned
 * @description Planned list component — not yet implemented.
  * @aiDiscoverability none
 * @param {any} listItems - list Items prop.
 */
export const BasicList = ({ listItems: array }) => {
  return <></>;
};

/**
 * @component IconList
 * @category wrappers
 * @subcategory lists
 * @status planned
 * @description Planned icon list component — not yet implemented.
  * @aiDiscoverability none
 * @param {any} listItems - list Items prop.
 */
export const IconList = ({ listItems: array }) => {
  return <></>;
};

/**
 * @component StepList
 * @category wrappers
 * @subcategory lists
 * @status stable
 * @description Renders listItems as Mintlify Steps with title, icon, and content.
  * @aiDiscoverability none
 * @param {any} listItems - list Items prop.
  * @param {string} [className=''] - Optional CSS class override.
  * @param {object} [style={}] - Optional inline style override.
 */
export const StepList = ({ listItems, className = "", style = {}, ...rest }) => {
  return (
    <Steps className={className} style={style} {...rest}>
      {listItems.map(({ title, icon, content }, idx) => (
        <Step key={idx} title={title} icon={icon}>
          {content}
        </Step>
      ))}
    </Steps>
  );
};

/**
 * @component StepLinkList
 * @category wrappers
 * @subcategory lists
 * @status stable
 * @description Renders listItems as Mintlify Steps with GotoLink navigation.
  * @aiDiscoverability none
 * @param {any} listItems - list Items prop.
  * @param {string} [className=''] - Optional CSS class override.
  * @param {object} [style={}] - Optional inline style override.
 */
export const StepLinkList = ({ listItems, className = "", style = {}, ...rest }) => {
  return (
    <Steps className={className} style={style} {...rest}>
      {listItems.map(({ title, icon, content, link }, idx) => (
        <Step key={idx} title={title} icon={icon}>
          <GotoLink label={content} relativePath={link} />
        </Step>
      ))}
    </Steps>
  );
};

/**
 * @component UpdateList
 * @category wrappers
 * @subcategory lists
 * @status planned
 * @description Planned update list component — not yet implemented.
  * @aiDiscoverability none
 * @param {any} listItems - list Items prop.
 */
export const UpdateList = ({ listItems: array }) => {
  return (
    <Update label="New Users">
      <div style={{ display: "flex", flexDirection: "column" }}>
        Learn what Livepeer is and how it can benefit you
        <Icon icon="new" /> [About Livepeer](../../01_about/about-home/)
      </div>
    </Update>
  );
};

/**
 * @component UpdateLinkList
 * @category wrappers
 * @subcategory lists
 * @status stable
 * @description Renders update items as linked entries inside Mintlify Update component.
  * @aiDiscoverability none
 * @param {any} listItems - list Items prop.
 */
export const UpdateLinkList = ({ listItems: array }) => {
  return (
    <>
      {array.map(({ title, icon, content, link }, idx) => (
        <Update key={idx} label={title}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {content}
            <GotoLink label={title} relativePath={link} icon={icon} />
          </div>
        </Update>
      ))}
    </>
  );
};

<!-- GENERATED FILE — DO NOT EDIT DIRECTLY -->
<!-- Generator: operations/scripts/generators/components/library/generate-component-library.js -->
<!-- Generated: 2026-04-08T11:04:58.595Z -->
<!-- Regenerate: node operations/scripts/generators/components/library/generate-component-library.js --category wrappers -->

# Wrappers Component Library

Holds, groups, or spatially arranges other components.

**Components:** 37 | **Stable:** 32 | **Experimental:** 2 | **Deprecated:** 0

---

## other

### 🟢 AccordionGroupList

> Generates N numbered accordion sections inside an AccordionGroup.

**Import:** `import { AccordionGroupList } from "/snippets/components/displays/accordions/Accordions.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `num` | `number` | 1 | Number of placeholder accordion sections to render. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 AccordionLayout

> Vertical stack layout with small gap, designed for accordion content sections.

**Import:** `import { AccordionLayout } from "/snippets/components/displays/accordions/Accordions.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 BadgeRow

> Unified badge row with variant prop. "text" renders Badge elements from a badges array. "icon" renders icon+label tags from an items array.

**Import:** `import { BadgeRow } from "/snippets/components/wrappers/badges/Badges.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `string` | "text" | Display variant: "text" for Badge elements, "icon" for icon+label tags. |
| `badges` | `Array` | — | Array of {color, label} objects (variant="text"). |
| `items` | `Array` | — | Array of {icon, label} objects (variant="icon"). |
| `children` | `React.ReactNode` | — | Manual JSX children (variant="text" fallback). |
| `iconColor` | `string` | — | Colour applied to all icons (variant="icon"). |
| `size` | `number` | 14 | Icon size in px (variant="icon"). |
| `gap` | `string` | "0.4rem" | Gap between items. |
| `style` | `object` | {} | Inline style overrides. |
| `className` | `string` | "" | CSS class name. |

#### Usage

```jsx
<BadgeRow variant="text" badges={[{color: "blue", label: "video"}]} />
<BadgeRow variant="icon" items={[{icon: "globe", label: "Web"}]} />
```

---

### 📋 BasicList

> Planned list component — not yet implemented.

**Import:** `import { BasicList } from "/snippets/components/displays/steps/Steps.jsx";`
**Status:** planned | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `any` | — | list Items prop. |

---

### 🟢 BorderedBox

> Bordered container with configurable radius and background.

**Import:** `import { BorderedBox } from "/snippets/components/wrappers/containers/Containers.jsx";`
**Status:** stable | **Imports:** 68

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `variant` | `string` | "default" | variant prop. |
| `padding` | `string` | "1rem" | padding prop. |
| `borderRadius` | `string` | "8px" | border Radius prop. |
| `accentBar` | `string` | "" | Optional accent border token applied to the left edge. |
| `style` | `object` | {} | style prop. |
| `className` | `string` | '' | Optional CSS class override. |

---

### 🟢 CalloutWrapper

> Wraps Mintlify callout types (Tip, Info, Warning, Note, Check) with a styled header and description.

**Import:** `import { CalloutWrapper } from "/snippets/components/wrappers/containers/Containers.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | "tip" | Mintlify callout type: "tip", "info", "warning", "note", "check" |
| `header` | `string` | — | Bold header text displayed at the top of the callout |
| `children` | `React.ReactNode` | — | Description content below the header |
| `headerColor` | `string` | "var(--hero-text)" | Header text colour |
| `headerSize` | `string` | "0.9rem" | Header font size |
| `className` | `string` | "" | CSS class name |
| `style` | `object` | {} | Inline style overrides |

#### Usage

```jsx
<CalloutWrapper type="tip" header="Are you a Solution Provider?">
  Submit a PR to add your solution here!
</CalloutWrapper>
```

---

### 🟢 CardCarousel

> Paginated horizontal carousel with prev/next navigation and dot indicators.

**Import:** `import { CardCarousel } from "/snippets/components/displays/grids/Grids.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Content rendered inside the component. |
| `visibleCount` | `number` | 3 | Visible count used by the component. |
| `gap` | `string` | "1.5rem" | Gap used by the component. |
| `showDots` | `boolean` | true | Boolean flag that controls component behaviour. |
| `style` | `object` | — | Style used by the component. |
| `className` | `string` | "" | CSS class name. |

---

### 🟢 CenteredContainer

> Horizontally centred container with configurable max-width.

**Import:** `import { CenteredContainer } from "/snippets/components/wrappers/containers/Containers.jsx";`
**Status:** stable | **Imports:** 50

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `maxWidth` | `string` | "800px" | max Width prop. |
| `padding` | `string` | "0" | padding prop. |
| `preset` | `string` | "default" | Named width/layout preset for common documentation patterns. |
| `width` | `string` | "" | Explicit width override. |
| `minWidth` | `string` | "" | Explicit min-width override. |
| `marginRight` | `string` | "" | Optional right margin override. |
| `marginBottom` | `string` | "" | Optional bottom margin override. |
| `textAlign` | `string` | "" | Optional text alignment override. |
| `style` | `object` | {} | style prop. |
| `className` | `string` | '' | Optional CSS class override. |

---

### 🟢 DataWrap

> Transparent wrapper that renders a data value inline. Used to surface pipeline-generated values (e.g. lastVerified dates) in MDX without additional markup.

**Import:** `import { DataWrap } from "/snippets/components/elements/text/DataWrap.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string\|number` | — | The data value to render. |

---

### 🟢 DisplayCard

> Card with icon, custom title row, and body content.

**Import:** `import { DisplayCard } from "/snippets/components/displays/cards/Cards.jsx";`
**Status:** stable | **Imports:** 10

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `string` | — | Icon configuration used by the component. |
| `title` | `React.ReactNode` | — | Title text rendered by the component. |
| `style` | `object` | — | Style used by the component. |
| `background` | `string` | 'var(--card-background)' | Background used by the component. |
| `children` | `React.ReactNode` | — | Content rendered inside the component. |
| `className` | `string` | "" | CSS class name. |

---

### 🟢 DynamicTable

> Renders structured data as a scrollable table with section separators and accessible region.

**Import:** `import { DynamicTable } from "/snippets/components/displays/tables/Tables.jsx";`
**Status:** stable | **Imports:** 27

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tableTitle` | `any` | null | table Title prop. |
| `headerList` | `Array` | [ | ] - header List prop. |
| `itemsList` | `Array` | [ | ] - items List prop. |
| `monospaceColumns` | `Array` | [ | ] - monospace Columns prop. |
| `contentFitColumns` | `Array` | [ | ] - Column names that should size to their contents. |
| `margin` | `any` | — | margin prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🧪 DynamicTableV2

> Renders structured data as a scrollable table with separator rows and intrinsic-width support for fit-to-content columns.

**Import:** `import { DynamicTableV2 } from "/snippets/components/displays/tables/Tables.jsx";`
**Status:** experimental | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tableTitle` | `any` | null | table Title prop. |
| `headerList` | `Array` | [ | ] - header List prop. |
| `itemsList` | `Array` | [ | ] - items List prop. |
| `monospaceColumns` | `Array` | [ | ] - monospace Columns prop. |
| `columnWidths` | `object` | {} | Preferred minimum widths keyed by header. |
| `columnConfig` | `object` | {} | Per-column layout flags keyed by header. |
| `margin` | `any` | — | margin prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 FlexContainer

> Flexbox container with configurable direction, gap, and alignment.

**Import:** `import { FlexContainer } from "/snippets/components/wrappers/containers/Containers.jsx";`
**Status:** stable | **Imports:** 5

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `direction` | `string` | "row" | direction prop. |
| `gap` | `string` | "1rem" | gap prop. |
| `align` | `string` | "flex-start" | align prop. |
| `justify` | `string` | "flex-start" | justify prop. |
| `wrap` | `boolean` | false | wrap prop. |
| `marginTop` | `string` | "" | Optional top margin override. |
| `marginBottom` | `string` | "" | Optional bottom margin override. |
| `style` | `object` | {} | style prop. |
| `className` | `string` | '' | Optional CSS class override. |

---

### 🟢 FullWidthContainer

> Full-viewport-width container that breaks out of parent padding.

**Import:** `import { FullWidthContainer } from "/snippets/components/wrappers/containers/Containers.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `backgroundColor` | `any` | — | background Color prop. |
| `style` | `object` | {} | style prop. |
| `className` | `string` | '' | Optional CSS class override. |

---

### 🟢 GridContainer

> CSS Grid container with configurable columns and gap.

**Import:** `import { GridContainer } from "/snippets/components/wrappers/containers/Containers.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `columns` | `any` | — | columns prop. |
| `gap` | `string` | "1rem" | gap prop. |
| `style` | `object` | {} | style prop. |
| `className` | `string` | '' | Optional CSS class override. |

---

### 📋 IconList

> Planned icon list component — not yet implemented.

**Import:** `import { IconList } from "/snippets/components/displays/steps/Steps.jsx";`
**Status:** planned | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `any` | — | list Items prop. |

---

### 🟢 InlineImageCard

> Card with inline image alongside content, using negative margin breakout.

**Import:** `import { InlineImageCard } from "/snippets/components/displays/cards/Cards.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Content rendered inside the component. |
| `imgProps` | `object` | — | Img props used by the component. |
| `imgStyle` | `object` | — | Img style used by the component. |
| `cardProps` | `object` | — | Card props used by the component. |
| `style` | `object` | — | Style used by the component. |
| `className` | `string` | "" | CSS class name. |

---

### 🟢 InteractiveCard

> Single interactive card with hover effects.

**Import:** `import { InteractiveCard } from "/snippets/components/displays/cards/Cards.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `mediaSrc` | `string` | "" | media Src prop. |
| `logo` | `string` | "" | logo prop. |
| `title` | `string` | "Untitled project" | title prop. |
| `subtitle` | `string` | "" | subtitle prop. |
| `description` | `string` | "" | description prop. |
| `href` | `string` | "#" | href prop. |
| `categoryTags` | `Array` | [ | ] - category Tags prop. |
| `productTags` | `Array` | [ | ] - product Tags prop. |
| `links` | `Array` | [ | ] - links prop. |
| `style` | `any` | — | style prop. |
| `className` | `string` | "" | CSS class name. |
| `cardProps` | `any` | — | card Props prop. |

---

### 🟢 InteractiveCards

> Multi-column layout of interactive cards.

**Import:** `import { InteractiveCards } from "/snippets/components/displays/cards/Cards.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `Array` | [ | ] - items prop. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 ListSteps

> Renders an array of step items inside Mintlify Steps component.

**Import:** `import { ListSteps } from "/snippets/components/displays/steps/Steps.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `Array` | — | Collection data rendered by the component. |
| `stepsConfig` | `object` | {} | Steps config used by the component. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 QuadGrid

> 2x2 grid with centred rotating icon overlay. Respects prefers-reduced-motion.

**Import:** `import { QuadGrid } from "/snippets/components/displays/grids/Grids.jsx";`
**Status:** stable | **Imports:** 3

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Content rendered inside the component. |
| `icon` | `string` | "arrows-spin" | Icon configuration used by the component. |
| `iconSize` | `number` | 50 | Icon configuration used by the component. |
| `iconColor` | `string` | "var(--accent)" | Icon configuration used by the component. |
| `spinDuration` | `string` | "10s" | Spin duration used by the component. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 ScrollBox

> Scrollable container with max-height, overflow hint, and accessible region role.

**Import:** `import { ScrollBox } from "/snippets/components/wrappers/containers/Layout.jsx";`
**Status:** stable | **Imports:** 32

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `maxHeight` | `number` | 300 | max Height prop. |
| `showHint` | `boolean` | true | show Hint prop. |
| `ariaLabel` | `string` | "Scrollable content" | aria Label prop. |
| `style` | `any` | — | style prop. |
| `className` | `string` | "" | CSS class name. |

---

### 🟢 SearchTable

> Generic filterable table wrapper with search input, category dropdown(s), and optional separators.

**Import:** `import { SearchTable } from "/snippets/components/displays/tables/Tables.jsx";`
**Status:** stable | **Imports:** 11

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `TableComponent` | `Function` | null | Table renderer component (e.g. DynamicTable). |
| `tableTitle` | `React.ReactNode` | null | Table title. |
| `headerList` | `Array` | [ | ] - Column header names. |
| `itemsList` | `Array` | [ | ] - Row data objects. Cell values can be strings or JSX. |
| `monospaceColumns` | `Array` | [ | ] - Column indices to render in monospace. |
| `margin` | `string` | — | Margin passed to TableComponent. |
| `searchPlaceholder` | `string` | 'Search...' | Placeholder text for the search input. |
| `searchColumns` | `Array` | [ | ] - Column names to search against. Defaults to all headers. |
| `categoryColumn` | `string` | 'Category' | Field name the first dropdown filters on. |
| `filterColumns` | `Array` | [ | ] - Additional column names that get dropdown filters. Each scoped by selections above it. |
| `columnWidths` | `object` | {} | Column width overrides keyed by header name. Passed to TableComponent. |
| `contentFitColumns` | `Array` | [ | ] - Column names that should size to their contents when supported by TableComponent. |
| `columnVariant` | `object` | {} | Column display variants keyed by header name. Supported: "bold", "badge", "textIcon", "addressWrapper". |
| `categoryBadges` | `Array` | [ | ] - Array of {color, label} for "badge" variant rendering. Matched by label (case-insensitive). |
| `textIcons` | `Array` | [ | ] - Array of {label, icon} for "textIcon" variant rendering. Icon is JSX rendered inline before the label text. |
| `showSeparators` | `boolean` | false | When true, inserts category separator rows. Labels are uppercased. |
| `separatorColumn` | `string` | null | Override which column drives separators. Default: categoryColumn. |
| `boldFirstColumn` | `boolean` | true | Auto-wraps first column in <strong> if value is a plain string. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🧪 SearchTableV2

> Generic filterable table wrapper with intrinsic-width sizing for badge, icon, and primary text columns.

**Import:** `import { SearchTableV2 } from "/snippets/components/displays/tables/Tables.jsx";`
**Status:** experimental | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `TableComponent` | `Function` | null | Table renderer component (e.g. DynamicTableV2). |
| `tableTitle` | `React.ReactNode` | null | Table title. |
| `headerList` | `Array` | [ | ] - Column header names. |
| `itemsList` | `Array` | [ | ] - Row data objects. Cell values can be strings or JSX. |
| `monospaceColumns` | `Array` | [ | ] - Column indices to render in monospace. |
| `margin` | `string` | — | Margin passed to TableComponent. |
| `searchPlaceholder` | `string` | 'Search...' | Placeholder text for the search input. |
| `searchColumns` | `Array` | [ | ] - Column names to search against. Defaults to all headers. |
| `categoryColumn` | `string` | 'Category' | Field name the first dropdown filters on. |
| `filterColumns` | `Array` | [ | ] - Additional column names that get dropdown filters. Each scoped by selections above it. |
| `columnWidths` | `object` | {} | Column width overrides keyed by header name. Passed to TableComponent. |
| `columnConfig` | `object` | {} | Optional column sizing overrides merged with V2 defaults. |
| `columnVariant` | `object` | {} | Column display variants keyed by header name. Supported: "bold", "badge", "textIcon", "addressWrapper". |
| `categoryBadges` | `Array` | [ | ] - Array of {color, label} for "badge" variant rendering. Matched by label (case-insensitive). |
| `textIcons` | `Array` | [ | ] - Array of {label, icon} for "textIcon" variant rendering. |
| `showSeparators` | `boolean` | false | When true, inserts category separator rows. Labels are uppercased. |
| `separatorColumn` | `string` | null | Override which column drives separators. Default: categoryColumn. |
| `boldFirstColumn` | `boolean` | true | Auto-wraps first column in <strong> if value is a plain string. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 ShowcaseCards

> Paginated card layout with search, category, and product filtering.

**Import:** `import { ShowcaseCards } from "/snippets/components/displays/cards/Cards.jsx";`
**Status:** stable | **Imports:** 2

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `Array` | [ | ] - items prop. |
| `limit` | `any` | null | limit prop. |
| `pageSize` | `number` | 10 | page Size prop. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 SolutionCard

> Card body for Solutions Portal product cards. Accepts pre-rendered JSX slots for badges, infra tags, and social links. ScrollBox is passed as a component prop for blurb rendering.

**Import:** `import { SolutionCard } from "/snippets/components/displays/cards/Cards.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `badges` | `ReactNode` | — | Pre-rendered <BadgeWrapper badges={...} /> |
| `logoSrc` | `string` | — | Path to the product logo image. |
| `logoAlt` | `string` | — | Alt text for the logo image. |
| `subtitle` | `string` | — | Bold italic one-line product subtitle. |
| `infraTags` | `ReactNode` | — | Pre-rendered <IconBadgeWrapper items={...} iconColor="var(--accent)" size={12} /> |
| `blurb` | `string` | — | Product description text. Rendered inside ScrollBox. |
| `ScrollBox` | `Component` | — | ScrollBox component reference, passed from parent MDX. |
| `logoHeight` | `string` | — | Override logo container height (default '60px'). |
| `socialLinks` | `ReactNode` | — | Pre-rendered <SocialLinks links={...} /> |

#### Usage

```jsx
import { BadgeWrapper, IconBadgeWrapper } from '/snippets/components/wrappers/badges/Badges.jsx'
import { ScrollBox } from '/snippets/components/wrappers/containers/Layout.jsx'
import { SocialLinks } from '/snippets/components/elements/links/Links.jsx'

<SolutionCard
  badges={<BadgeWrapper badges={daydreamBadges} />}
  logoSrc="/snippets/assets/logos/products/daydream-logo-dark.svg"
  logoAlt="Daydream Logo"
  subtitle="Open-Source Toolkit For World Models and Real-time AI Video"
  infraTags={<IconBadgeWrapper items={daydreamInfra} iconColor="var(--accent)" size={12} />}
  blurb="Description here."
  ScrollBox={ScrollBox}
  socialLinks={<SocialLinks links={daydreamSocials} justify="center" style={{ marginTop: '1rem', marginBottom: '-1rem' }} />}
/>
```

---

### 🟢 SolutionItem

> Renders a solution entry with link, icon badges, and description. Designed for solution listing pages.

**Import:** `import { SolutionItem } from "/snippets/components/displays/cards/Cards.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `link` | `React.ReactNode` | — | Link element (e.g. <LinkArrow />), rendered as the heading |
| `iconWrapper` | `React.ReactNode` | null | Icon badges element (e.g. <IconBadgeWrapper />) |
| `description` | `React.ReactNode` | null | Description text or element |
| `divider` | `boolean` | true | Show bottom border divider |
| `className` | `string` | "" | CSS class name |
| `style` | `object` | {} | Inline style overrides |

#### Usage

```jsx
<SolutionItem
  link={<LinkArrow href="https://daydream.live" label="Daydream" />}
  iconWrapper={<IconBadgeWrapper items={daydreamInfra} iconColor="var(--accent)" size={12} />}
  description="Real-time AI video, world models"
  divider={true}
/>
```

---

### 🟢 StepLinkList

> Renders listItems as Mintlify Steps with GotoLink navigation.

**Import:** `import { StepLinkList } from "/snippets/components/displays/steps/Steps.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `any` | — | list Items prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 StepList

> Renders listItems as Mintlify Steps with title, icon, and content.

**Import:** `import { StepList } from "/snippets/components/displays/steps/Steps.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `any` | — | list Items prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 StyledStep

> Single step with configurable icon, size, and per-step colour overrides. When iconColor or titleColor is set, injects a scoped CSS override that takes precedence over the parent StyledSteps colours for this step only. When neither is set, behaves identically to a plain Step pass-through.

**Import:** `import { StyledStep } from "/snippets/components/displays/steps/Steps.jsx";`
**Status:** stable | **Imports:** 52

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `any` | — | title prop. |
| `icon` | `any` | — | icon prop. |
| `titleSize` | `string` | "h3" | title Size prop. |
| `iconColor` | `string\|null` | null | Per-step icon background colour override. |
| `titleColor` | `string\|null` | null | Per-step title text colour override. |
| `divider` | `boolean` | false | Show a divider line after the step content. |
| `dividerMargin` | `string` | "0.5rem 0" | Margin for the trailing divider. |
| `children` | `any` | — | children prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 StyledSteps

> Wrapper around Mintlify Steps with custom icon styling via injected CSS.

**Import:** `import { StyledSteps } from "/snippets/components/displays/steps/Steps.jsx";`
**Status:** stable | **Imports:** 52

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `iconColor` | `any` | — | icon Color prop. |
| `titleColor` | `any` | — | title Color prop. |
| `lineColor` | `any` | — | line Color prop. |
| `iconSize` | `string` | "24px" | icon Size prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 StyledTable

> Full-width table with header row styling and rounded container.

**Import:** `import { StyledTable } from "/snippets/components/displays/tables/Tables.jsx";`
**Status:** stable | **Imports:** 119

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `variant` | `string` | "default" | variant prop. |
| `style` | `object` | {} | style prop. |
| `className` | `string` | '' | Optional CSS class override. |

---

### 🟢 TableCell

> Table cell that switches between th and td based on header prop.

**Import:** `import { TableCell } from "/snippets/components/displays/tables/Tables.jsx";`
**Status:** stable | **Imports:** 118

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `align` | `string` | "left" | align prop. |
| `header` | `boolean` | false | header prop. |
| `style` | `object` | {} | style prop. |
| `className` | `string` | '' | Optional CSS class override. |

---

### 🟢 TableRow

> Table row with optional header styling and hover effect.

**Import:** `import { TableRow } from "/snippets/components/displays/tables/Tables.jsx";`
**Status:** stable | **Imports:** 118

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `header` | `boolean` | false | header prop. |
| `hover` | `boolean` | false | hover prop. |
| `style` | `object` | {} | style prop. |
| `className` | `string` | '' | Optional CSS class override. |

---

### 🟢 UpdateLinkList

> Renders update items as linked entries inside Mintlify Update component.

**Import:** `import { UpdateLinkList } from "/snippets/components/displays/steps/Steps.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `any` | — | list Items prop. |

---

### 📋 UpdateList

> Planned update list component — not yet implemented.

**Import:** `import { UpdateList } from "/snippets/components/displays/steps/Steps.jsx";`
**Status:** planned | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `any` | — | list Items prop. |

---

### 🟢 WidthCard

> Width-constrained card wrapper with configurable percentage width.

**Import:** `import { WidthCard } from "/snippets/components/displays/cards/Cards.jsx";`
**Status:** stable | **Imports:** 4

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `width` | `string` | '80%' | Width used by the component. |
| `children` | `React.ReactNode` | — | Content rendered inside the component. |
| `cardProps` | `object` | — | Forwarded Card props. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

<!-- GENERATED FILE — DO NOT EDIT DIRECTLY -->
<!-- Generator: operations/scripts/generators/components/library/generate-component-library.js -->
<!-- Generated: 2026-04-08T00:51:53.711Z -->
<!-- Regenerate: node operations/scripts/generators/components/library/generate-component-library.js --category wrappers -->

# Wrappers Component Library

Holds, groups, or spatially arranges other components.

**Components:** 31 | **Stable:** 28 | **Experimental:** 0 | **Deprecated:** 0

---

## accordions

### 🟢 AccordionGroupList

> Generates N numbered accordion sections inside an AccordionGroup.

**Import:** `import { AccordionGroupList } from "/snippets/components/wrappers/accordions/AccordionGroupList.jsx";`
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

**Import:** `import { AccordionLayout } from "/snippets/components/wrappers/accordions/AccordionLayout.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

## cards

### 🟢 DisplayCard

> Card with icon, custom title row, and body content.

**Import:** `import { DisplayCard } from "/snippets/components/wrappers/cards/CustomCards.jsx";`
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

### 🟢 InlineImageCard

> Card with inline image alongside content, using negative margin breakout.

**Import:** `import { InlineImageCard } from "/snippets/components/wrappers/cards/CustomCards.jsx";`
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

**Import:** `import { InteractiveCard } from "/snippets/components/wrappers/cards/ShowcaseCards.jsx";`
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

**Import:** `import { InteractiveCards } from "/snippets/components/wrappers/cards/ShowcaseCards.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `Array` | [ | ] - items prop. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 ShowcaseCards

> Paginated card layout with search, category, and product filtering.

**Import:** `import { ShowcaseCards } from "/snippets/components/wrappers/cards/ShowcaseCards.jsx";`
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

### 🟢 WidthCard

> Width-constrained card wrapper with configurable percentage width.

**Import:** `import { WidthCard } from "/snippets/components/wrappers/cards/CustomCards.jsx";`
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

## containers

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

### 🟢 FlexContainer

> Flexbox container with configurable direction, gap, and alignment.

**Import:** `import { FlexContainer } from "/snippets/components/wrappers/containers/Layout.jsx";`
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

**Import:** `import { GridContainer } from "/snippets/components/wrappers/containers/Layout.jsx";`
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

### 🟢 ScrollBox

> Scrollable container with max-height, overflow hint, and accessible region role.

**Import:** `import { ScrollBox } from "/snippets/components/wrappers/containers/ScrollBox.jsx";`
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

### 🟢 Spacer

> Spacer element with configurable size.

**Import:** `import { Spacer } from "/snippets/components/wrappers/containers/Layout.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `string` | "1rem" | size prop. |
| `direction` | `string` | "vertical" | direction prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

## grids

### 🟢 CardCarousel

> Paginated horizontal carousel with prev/next navigation and dot indicators.

**Import:** `import { CardCarousel } from "/snippets/components/wrappers/grids/CardCarousel.jsx";`
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

### 🟢 QuadGrid

> 2x2 grid with centred rotating icon overlay. Respects prefers-reduced-motion.

**Import:** `import { QuadGrid } from "/snippets/components/wrappers/grids/QuadGrid.jsx";`
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

## lists

### 📋 BasicList

> Planned list component — not yet implemented.

**Import:** `import { BasicList } from "/snippets/components/wrappers/lists/Lists.jsx";`
**Status:** planned | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `any` | — | list Items prop. |

---

### 📋 IconList

> Planned icon list component — not yet implemented.

**Import:** `import { IconList } from "/snippets/components/wrappers/lists/Lists.jsx";`
**Status:** planned | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `any` | — | list Items prop. |

---

### 🟢 ListSteps

> Renders an array of step items inside Mintlify Steps component.

**Import:** `import { ListSteps } from "/snippets/components/wrappers/lists/ListSteps.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `Array` | — | Collection data rendered by the component. |
| `stepsConfig` | `object` | {} | Steps config used by the component. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 StepLinkList

> Renders listItems as Mintlify Steps with GotoLink navigation.

**Import:** `import { StepLinkList } from "/snippets/components/wrappers/lists/Lists.jsx";`
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

**Import:** `import { StepList } from "/snippets/components/wrappers/lists/Lists.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `any` | — | list Items prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 UpdateLinkList

> Renders update items as linked entries inside Mintlify Update component.

**Import:** `import { UpdateLinkList } from "/snippets/components/wrappers/lists/Lists.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `any` | — | list Items prop. |

---

### 📋 UpdateList

> Planned update list component — not yet implemented.

**Import:** `import { UpdateList } from "/snippets/components/wrappers/lists/Lists.jsx";`
**Status:** planned | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `listItems` | `any` | — | list Items prop. |

---

## steps

### 🟢 StyledStep

> Single step with configurable icon, size, and colour.

**Import:** `import { StyledStep } from "/snippets/components/wrappers/steps/Steps.jsx";`
**Status:** stable | **Imports:** 52

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `any` | — | title prop. |
| `icon` | `any` | — | icon prop. |
| `titleSize` | `string` | "h3" | title Size prop. |
| `children` | `any` | — | children prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 StyledSteps

> Wrapper around Mintlify Steps with custom icon styling via injected CSS.

**Import:** `import { StyledSteps } from "/snippets/components/wrappers/steps/Steps.jsx";`
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

## tables

### 🟢 DynamicTable

> Renders structured data as a scrollable table with section separators and accessible region.

**Import:** `import { DynamicTable } from "/snippets/components/wrappers/tables/Table.jsx";`
**Status:** stable | **Imports:** 27

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tableTitle` | `any` | null | table Title prop. |
| `headerList` | `Array` | [ | ] - header List prop. |
| `itemsList` | `Array` | [ | ] - items List prop. |
| `monospaceColumns` | `Array` | [ | ] - monospace Columns prop. |
| `margin` | `any` | — | margin prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 SearchTable

> Filterable table wrapper with search input and category dropdown.

**Import:** `import { SearchTable } from "/snippets/components/wrappers/tables/SearchTable.jsx";`
**Status:** stable | **Imports:** 11

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `TableComponent` | `string` | null | Table component used by the component. |
| `tableTitle` | `React.ReactNode` | null | Table title used by the component. |
| `headerList` | `Array` | [ | ] - Collection data rendered by the component. |
| `itemsList` | `Array` | [ | ] - Collection data rendered by the component. |
| `monospaceColumns` | `Array` | [ | ] - Collection data rendered by the component. |
| `margin` | `string` | — | Margin used by the component. |
| `searchPlaceholder` | `string` | 'Search...' | Search placeholder used by the component. |
| `searchColumns` | `Array` | [ | ] - Collection data rendered by the component. |
| `categoryColumn` | `string` | 'Category' | Category column used by the component. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 StyledTable

> Full-width table with header row styling and rounded container.

**Import:** `import { StyledTable } from "/snippets/components/wrappers/tables/Tables.jsx";`
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

**Import:** `import { TableCell } from "/snippets/components/wrappers/tables/Tables.jsx";`
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

**Import:** `import { TableRow } from "/snippets/components/wrappers/tables/Tables.jsx";`
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

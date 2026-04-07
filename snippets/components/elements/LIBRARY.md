<!-- GENERATED FILE — DO NOT EDIT DIRECTLY -->
<!-- Generator: operations/scripts/generators/components/library/generate-component-library.js -->
<!-- Generated: 2026-04-07T17:24:31.274Z -->
<!-- Regenerate: node operations/scripts/generators/components/library/generate-component-library.js --category elements -->

# Elements Component Library

Smallest visual atoms — no children, no fetching, no arrangement.

**Components:** 27 | **Stable:** 27 | **Experimental:** 0 | **Deprecated:** 0

---

## a11y

### 🟢 FocusableScrollRegions

> Makes scroll regions keyboard-focusable by adding tabindex to matching selectors.

**Import:** `import { FocusableScrollRegions } from "/snippets/components/elements/a11y/A11y.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `selectors` | `any` | — | selectors prop. |

#### Usage

```jsx
<FocusableScrollRegions selectors="example" />
```

---

## buttons

### 🟢 DownloadButton

> Lazy-loaded download button with icon that renders on viewport intersection.

**Import:** `import { DownloadButton } from "/snippets/components/elements/buttons/Buttons.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | 'Download' | label prop. |
| `icon` | `string` | 'download' | icon prop. |
| `downloadLink` | `any` | — | download Link prop. |
| `rightIcon` | `string` | '' | right Icon prop. |
| `border` | `boolean` | false | border prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<DownloadButton downloadLink="example" />
```

---

## callouts

### 🟢 ComingSoonCallout

> Banner indicating a feature or page is coming soon, with links to related resources.

**Import:** `import { ComingSoonCallout } from "/snippets/components/elements/callouts/PreviewCallouts.jsx";`
**Status:** stable | **Imports:** 2

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | "page" | Type used by the component. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

#### Usage

```jsx
<ComingSoonCallout />
```

---

### 🟢 PreviewCallout

> Banner indicating content is in preview/draft state with feedback links.

**Import:** `import { PreviewCallout } from "/snippets/components/elements/callouts/PreviewCallouts.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

#### Usage

```jsx
<PreviewCallout />
```

---

### 🟢 ReviewCallout

> Banner indicating content is under review with status links.

**Import:** `import { ReviewCallout } from "/snippets/components/elements/callouts/PreviewCallouts.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

#### Usage

```jsx
<ReviewCallout />
```

---

## icons

### 🟢 LivepeerIcon

> Theme-aware Livepeer icon with CSS custom property colour adaptation.

**Import:** `import { LivepeerIcon } from "/snippets/components/elements/icons/Icons.jsx";`
**Status:** stable | **Imports:** 2

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | 16 | size prop. |
| `color` | `any` | — | color prop. |
| `props` | `any` | — | props prop. |

#### Usage

```jsx
<LivepeerIcon color="example" props="example" />
```

---

### 🟢 LivepeerSVG

> Inline Livepeer logo as SVG with currentColor fill.

**Import:** `import { LivepeerSVG } from "/snippets/components/elements/icons/Icons.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | 24 | size prop. |
| `props` | `any` | — | props prop. |

#### Usage

```jsx
<LivepeerSVG props="example" />
```

---

## images

### 🟢 Image

> Framed image with optional caption and full-width toggle.

**Import:** `import { Image } from "/snippets/components/elements/images/Image.jsx";`
**Status:** stable | **Imports:** 6

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `any` | — | src prop. |
| `alt` | `any` | — | alt prop. |
| `caption` | `any` | — | caption prop. |
| `icon` | `any` | — | icon prop. |
| `hint` | `any` | — | hint prop. |
| `fullwidth` | `boolean` | true | fullwidth prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<Image src="example" alt="example" />
```

---

### 🟢 LinkImage

> Clickable framed image that opens a URL in a new tab.

**Import:** `import { LinkImage } from "/snippets/components/elements/images/Image.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `any` | — | src prop. |
| `alt` | `any` | — | alt prop. |
| `caption` | `any` | — | caption prop. |
| `icon` | `any` | — | icon prop. |
| `hint` | `any` | — | hint prop. |
| `href` | `any` | — | href prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<LinkImage src="example" alt="example" />
```

---

## links

### 🟢 BlinkingIcon

> Animated icon with pulsing opacity. Respects prefers-reduced-motion.

**Import:** `import { BlinkingIcon } from "/snippets/components/elements/links/Links.jsx";`
**Status:** stable | **Imports:** 10

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `string` | "terminal" | Icon name to display |
| `size` | `number` | 16 | Size of the icon in pixels |
| `color` | `string` | — | Color of the icon (defaults to theme accent) |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<BlinkingIcon color="example" />
```

---

### 🟢 BlinkingTerminal

> Preset blinking terminal icon (alias for BlinkingIcon with terminal defaults).

**Import:** `import { BlinkingTerminal } from "/snippets/components/elements/links/Links.jsx";`
**Status:** stable | **Imports:** 0

#### Usage

```jsx
<BlinkingTerminal />
```

---

### 🟢 CustomCallout

> Styled callout box with icon, custom colour, and child content.

**Import:** `import { CustomCallout } from "/snippets/components/elements/links/Links.jsx";`
**Status:** stable | **Imports:** 2

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Content to display in the callout |
| `icon` | `string` | "lightbulb" | Icon name to display |
| `color` | `string` | — | Primary color for icon, border, and background (defaults to theme accent) |
| `iconSize` | `number` | 16 | Size of the icon in pixels |
| `textSize` | `string` | "0.875rem" | Font size for the text content |
| `textColor` | `string` | — | Text color (defaults to match icon color) |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<CustomCallout color="example" textColor="example">Example content</CustomCallout>
```

---

### 🟢 DoubleIconLink

> Inline link with icons on both sides.

**Import:** `import { DoubleIconLink } from "/snippets/components/elements/links/Links.jsx";`
**Status:** stable | **Imports:** 32

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | "" | Link text/label |
| `href` | `string` | "#" | Link URL |
| `text` | `string` | "" | Optional text to display before the link |
| `iconLeft` | `string` | "github" | Icon to display on the left |
| `iconRight` | `string` | "arrow-up-right" | Icon to display on the right |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<DoubleIconLink />
```

---

### 🟢 GotoCard

> Card-style navigation link wrapping Mintlify Card component.

**Import:** `import { GotoCard } from "/snippets/components/elements/links/Links.jsx";`
**Status:** stable | **Imports:** 12

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Card title |
| `relativePath` | `string` | — | Relative URL path |
| `icon` | `string` | — | Icon to display (defaults to "arrow-turn-down-right") |
| `text` | `React.ReactNode` | — | Card content |
| `cta` | `string` | "" | Call-to-action button text |
| `props` | `any` | — | props prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<GotoCard label="example" relativePath="example" />
```

---

### 🟢 GotoLink

> Inline navigation link with icon prefix and label.

**Import:** `import { GotoLink } from "/snippets/components/elements/links/Links.jsx";`
**Status:** stable | **Imports:** 9

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Link text/label |
| `relativePath` | `string` | — | Relative URL path |
| `text` | `string` | "" | Optional text to display before the link |
| `icon` | `string` | "arrow-turn-down-right" | Icon to display |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<GotoLink label="example" relativePath="example" />
```

---

### 🟢 LinkArrow

> External link with arrow icon, optional description, and line break control.

**Import:** `import { LinkArrow } from "/snippets/components/elements/links/Links.jsx";`
**Status:** stable | **Imports:** 120

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | `any` | — | href prop. |
| `label` | `any` | — | label prop. |
| `description` | `any` | — | description prop. |
| `newline` | `boolean` | true | newline prop. |
| `borderColor` | `any` | — | border Color prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<LinkArrow href="example" label="example" />
```

---

### 🟢 TipWithArrow

> Callout box with tip icon and corner arrow indicator.

**Import:** `import { TipWithArrow } from "/snippets/components/elements/links/Links.jsx";`
**Status:** stable | **Imports:** 2

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Content to display in the tip |
| `icon` | `string` | "lightbulb" | Main icon to display on the left |
| `arrowIcon` | `string` | "arrow-up-right" | Arrow icon to display in top-right |
| `color` | `string` | — | Primary color for icons, border, and background (defaults to theme accent) |
| `iconSize` | `number` | 16 | Size of the main icon in pixels |
| `arrowSize` | `number` | 16 | Size of the arrow icon in pixels |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<TipWithArrow color="example">Example content</TipWithArrow>
```

---

## math

### 🟢 MathBlock

> Renders LaTeX as a block-level math expression using KaTeX.

**Import:** `import { MathBlock } from "/snippets/components/elements/math/Math.jsx";`
**Status:** stable | **Imports:** 11

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `latex` | `any` | — | latex prop. |
| `className` | `string` | "" | class Name prop. |
| `ariaLabel` | `any` | — | aria Label prop. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<MathBlock latex="example" ariaLabel="example" />
```

---

### 🟢 MathInline

> Renders LaTeX as inline math using KaTeX.

**Import:** `import { MathInline } from "/snippets/components/elements/math/Math.jsx";`
**Status:** stable | **Imports:** 11

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `latex` | `any` | — | latex prop. |
| `className` | `string` | "" | class Name prop. |
| `ariaLabel` | `any` | — | aria Label prop. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<MathInline latex="example" ariaLabel="example" />
```

---

## social

### 🟢 SocialLinks

> Row of icon-only social media links with tooltips and aria-labels.

**Import:** `import { SocialLinks } from "/snippets/components/elements/social/SocialLinks.jsx";`
**Status:** stable | **Imports:** 11

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | 20 | Size used by the component. |
| `gap` | `string` | "0.75rem" | Gap used by the component. |
| `justify` | `string` | "center" | Justify used by the component. |
| `color` | `string` | — | Color used by the component. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

#### Usage

```jsx
<SocialLinks color="value" />
```

---

## spacing

### 🟢 CustomDivider

> Themed horizontal divider with optional centre text and Livepeer logo accents.

**Import:** `import { CustomDivider } from "/snippets/components/elements/spacing/Divider.jsx";`
**Status:** stable | **Imports:** 207

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `string` | "var(--border)" | color prop. |
| `middleText` | `string` | "" | middle Text prop. |
| `spacing` | `string` | "default" | Named spacing preset for authored page layouts. |
| `style` | `object` | {} | style prop. |
| `className` | `string` | '' | Optional CSS class override. |

#### Usage

```jsx
<CustomDivider />
```

---

### 🟢 Spacer

> Empty spacer div with configurable size and direction.

**Import:** `import { Spacer } from "/snippets/components/elements/spacing/Spacer.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `string` | "1rem" | Size used by the component. |
| `direction` | `string` | "vertical" | Direction used by the component. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<Spacer />
```

---

## text

### 🟢 AccordionTitleWithArrow

> Accordion header text with trailing arrow icon.

**Import:** `import { AccordionTitleWithArrow } from "/snippets/components/elements/text/Text.jsx";`
**Status:** stable | **Imports:** 3

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `any` | — | text prop. |
| `children` | `any` | — | children prop. |
| `color` | `string` | "var(--text)" | color prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<AccordionTitleWithArrow text="example">Example content</AccordionTitleWithArrow>
```

---

### 🟢 CardTitleTextWithArrow

> Card title with trailing arrow icon for navigation indication.

**Import:** `import { CardTitleTextWithArrow } from "/snippets/components/elements/text/Text.jsx";`
**Status:** stable | **Imports:** 6

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `cardProps` | `any` | — | card Props prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<CardTitleTextWithArrow cardProps="example">Example content</CardTitleTextWithArrow>
```

---

### 🟢 CopyText

> Text with a click-to-copy button that copies content to clipboard.

**Import:** `import { CopyText } from "/snippets/components/elements/text/Text.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `any` | — | text prop. |
| `label` | `any` | — | label prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

#### Usage

```jsx
<CopyText text="example" label="example" />
```

---

### 🟢 CustomCardTitle

> Card title row with icon and text, using flexbox alignment.

**Import:** `import { CustomCardTitle } from "/snippets/components/elements/text/CustomCardTitle.jsx";`
**Status:** stable | **Imports:** 15

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `string` | — | Icon configuration used by the component. |
| `title` | `React.ReactNode` | — | Title text rendered by the component. |
| `style` | `object` | {} | Inline style overrides. |
| `className` | `string` | "" | CSS class name. |

#### Usage

```jsx
<CustomCardTitle icon="sparkles" title="Example" style={{}} />
```

---

### 🟢 Subtitle

> Styled subtitle text with configurable colour, size, and alignment.

**Import:** `import { Subtitle } from "/snippets/components/elements/text/Text.jsx";`
**Status:** stable | **Imports:** 4

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `style` | `object` | {} | style prop. |
| `text` | `any` | — | text prop. |
| `children` | `any` | — | children prop. |
| `className` | `string` | '' | Optional CSS class override. |

#### Usage

```jsx
<Subtitle text="example">Example content</Subtitle>
```

---

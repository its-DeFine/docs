<!-- GENERATED FILE — DO NOT EDIT DIRECTLY -->
<!-- Generator: operations/scripts/generators/components/library/generate-component-library.js -->
<!-- Generated: 2026-04-08T05:36:24.934Z -->
<!-- Regenerate: node operations/scripts/generators/components/library/generate-component-library.js --category displays -->

# Displays Component Library

Renders authored content into a specific visual format.

**Components:** 20 | **Stable:** 20 | **Experimental:** 0 | **Deprecated:** 0

---

## code

### 🟢 CodeComponent

> Simple code block with title and language syntax highlighting.

**Import:** `import { CodeComponent } from "/snippets/components/displays/code/Code.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `filename` | `string` | "" | filename prop. |
| `icon` | `string` | "terminal" | icon prop. |
| `language` | `string` | "" | language prop. |
| `highlight` | `string` | "" | highlight prop. |
| `expandable` | `boolean` | false | expandable prop. |
| `wrap` | `boolean` | true | wrap prop. |
| `lines` | `boolean` | true | lines prop. |
| `codeString` | `string` | "" | code String prop. |
| `placeholderValue` | `string` | "" | placeholder Value prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 CodeSection

> Expandable code section with title header.

**Import:** `import { CodeSection } from "/snippets/components/displays/code/Code.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `fields` | `object` | {} | fields prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 ComplexCodeBlock

> Code block with both pre-note and post-note sections.

**Import:** `import { ComplexCodeBlock } from "/snippets/components/displays/code/Code.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `filename` | `any` | — | filename prop. |
| `icon` | `any` | — | icon prop. |
| `language` | `any` | — | language prop. |
| `highlight` | `any` | — | highlight prop. |
| `codeString` | `string` | "" | code String prop. |
| `placeholderValue` | `string` | "" | placeholder Value prop. |
| `wrap` | `boolean` | true | wrap prop. |
| `lines` | `boolean` | true | lines prop. |
| `preNote` | `any` | null | pre Note prop. |
| `postNote` | `any` | null | post Note prop. |

---

### 🟢 CustomCodeBlock

> Code block with optional pre/post notes and expandable wrapper.

**Import:** `import { CustomCodeBlock } from "/snippets/components/displays/code/Code.jsx";`
**Status:** stable | **Imports:** 6

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `filename` | `any` | — | filename prop. |
| `icon` | `any` | — | icon prop. |
| `language` | `any` | — | language prop. |
| `highlight` | `any` | — | highlight prop. |
| `codeString` | `string` | "" | code String prop. |
| `placeholderValue` | `string` | "" | placeholder Value prop. |
| `wrap` | `boolean` | true | wrap prop. |
| `lines` | `boolean` | true | lines prop. |
| `preNote` | `string` | "" | pre Note prop. |
| `postNote` | `string` | "" | post Note prop. |
| `output` | `string` | "" | output prop. |

---

## diagrams

### 🟢 ScrollableDiagram

> Pannable, zoomable diagram container with zoom controls and accessible buttons.

**Import:** `import { ScrollableDiagram } from "/snippets/components/displays/diagrams/ScrollableDiagram.jsx";`
**Status:** stable | **Imports:** 22

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Content rendered inside the component. |
| `title` | `string` | "" | Title text rendered by the component. |
| `maxHeight` | `string` | "500px" | Max height used by the component. |
| `minWidth` | `string` | "100%" | Min width used by the component. |
| `showControls` | `boolean` | false | Boolean flag that controls component behaviour. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

## quotes

### 🟢 FrameQuote

> Framed blockquote with optional author, source link, and image.

**Import:** `import { FrameQuote } from "/snippets/components/displays/quotes/Quote.jsx";`
**Status:** stable | **Imports:** 5

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `author` | `any` | — | author prop. |
| `source` | `any` | — | source prop. |
| `href` | `any` | — | href prop. |
| `frame` | `boolean` | true | frame prop. |
| `align` | `string` | 'right' | align prop. |
| `borderColor` | `any` | — | border Color prop. |
| `img` | `any` | — | img prop. |
| `spacing` | `boolean` | true | spacing prop. |
| `props` | `any` | — | props prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 Quote

> Styled blockquote with accent border and centred italic text.

**Import:** `import { Quote } from "/snippets/components/displays/quotes/Quote.jsx";`
**Status:** stable | **Imports:** 12

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `any` | — | children prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

## response-fields

### 🟢 CustomResponseField

> Custom-styled API response field with configurable margin.

**Import:** `import { CustomResponseField } from "/snippets/components/displays/response-fields/ResponseField.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `description` | `React.ReactNode` | — | Primary content rendered by the component. |
| `props` | `object` | — | Additional props forwarded to ResponseField. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 ResponseFieldAccordion

> Accordion-style response field with collapsible detail section.

**Import:** `import { ResponseFieldAccordion } from "/snippets/components/displays/response-fields/ResponseField.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `fields` | `object` | {} | Fields used by the component. |
| `props` | `object` | — | Additional props forwarded to Accordion. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 ResponseFieldExpandable

> Expandable response field that reveals nested content on click.

**Import:** `import { ResponseFieldExpandable } from "/snippets/components/displays/response-fields/ResponseField.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `fields` | `object` | {} | Fields used by the component. |
| `props` | `object` | — | Additional props forwarded to Expandable. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 ResponseFieldGroup

> Container for grouping multiple response fields with consistent spacing.

**Import:** `import { ResponseFieldGroup } from "/snippets/components/displays/response-fields/ResponseField.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `component` | `string` | "accordion" | Component used by the component. |
| `fields` | `object` | {} | Fields used by the component. |
| `props` | `object` | — | Additional props forwarded to the selected wrapper component. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

### 🟢 ValueResponseField

> API response field with name, type, and value display.

**Import:** `import { ValueResponseField } from "/snippets/components/displays/response-fields/ResponseField.jsx";`
**Status:** stable | **Imports:** 3

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `description` | `React.ReactNode` | — | Primary content rendered by the component. |
| `post` | `string` | null | Post used by the component. |
| `label` | `string` | "value" | Label text rendered by the component. |
| `line` | `boolean` | true | Boolean flag that controls component behaviour. |
| `children` | `React.ReactNode` | — | Content rendered inside the component. |
| `props` | `object` | — | Additional props forwarded to ResponseField. |
| `className` | `string` | "" | CSS class name. |
| `style` | `object` | {} | Inline style overrides. |

---

## video

### 🟢 CardVideo

> YouTube embed inside a Card wrapper with aspect-ratio iframe.

**Import:** `import { CardVideo } from "/snippets/components/displays/video/Video.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `embedUrl` | `any` | — | embed Url prop. |
| `title` | `any` | — | title prop. |
| `style` | `any` | — | style prop. |
| `className` | `string` | '' | Optional CSS class override. |

---

### 🟢 LinkedInEmbed

> LinkedIn post embed via responsive iframe with compact layout.

**Import:** `import { LinkedInEmbed } from "/snippets/components/displays/video/Video.jsx";`
**Status:** stable | **Imports:** 0

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `embedUrl` | `any` | — | embed Url prop. |
| `title` | `string` | "Embedded post" | title prop. |
| `hint` | `string` | "" | hint prop. |
| `caption` | `any` | — | caption prop. |
| `height` | `string` | "399" | height prop. |

---

### 🟢 ShowcaseVideo

> Full-width video with negative-margin breakout and rounded frame.

**Import:** `import { ShowcaseVideo } from "/snippets/components/displays/video/Video.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `any` | — | src prop. |
| `title` | `any` | — | title prop. |
| `subtitle` | `any` | — | subtitle prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 TitledVideo

> Auto-playing video with title/subtitle overlay. Respects prefers-reduced-motion.

**Import:** `import { TitledVideo } from "/snippets/components/displays/video/Video.jsx";`
**Status:** stable | **Imports:** 2

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `any` | — | src prop. |
| `title` | `any` | — | title prop. |
| `subtitle` | `any` | — | subtitle prop. |
| `arrow` | `boolean` | false | arrow prop. |
| `borderRadius` | `string` | "12px" | border Radius prop. |
| `style` | `object` | {} | style prop. |
| `className` | `string` | '' | Optional CSS class override. |

---

### 🟢 Video

> Basic framed video player with caption support.

**Import:** `import { Video } from "/snippets/components/displays/video/Video.jsx";`
**Status:** stable | **Imports:** 4

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `any` | — | src prop. |
| `title` | `string` | "" | title prop. |
| `author` | `string` | "" | author prop. |
| `caption` | `any` | — | caption prop. |
| `href` | `string` | "" | href prop. |
| `controls` | `boolean` | true | controls prop. |
| `autoPlay` | `boolean` | false | auto Play prop. |
| `loop` | `boolean` | false | loop prop. |
| `muted` | `boolean` | false | muted prop. |
| `children` | `any` | — | children prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 YouTubeVideo

> YouTube embed via responsive iframe with aspect-ratio preservation.

**Import:** `import { YouTubeVideo } from "/snippets/components/displays/video/Video.jsx";`
**Status:** stable | **Imports:** 21

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `embedUrl` | `any` | — | embed Url prop. |
| `title` | `string` | "" | title prop. |
| `author` | `string` | "" | author prop. |
| `hint` | `string` | "" | hint prop. |
| `caption` | `any` | — | caption prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

### 🟢 YouTubeVideoData

> Renders a columned grid of YouTubeVideo embeds from an items array.

**Import:** `import { YouTubeVideoData } from "/snippets/components/displays/video/Video.jsx";`
**Status:** stable | **Imports:** 7

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `Array` | [ | ] - items prop. |
| `limit` | `any` | — | limit prop. |
| `cols` | `number` | 2 | cols prop. |

---

### 🟢 YouTubeVideoDownload

> YouTube embed with download hint text below.

**Import:** `import { YouTubeVideoDownload } from "/snippets/components/displays/video/Video.jsx";`
**Status:** stable | **Imports:** 1

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `embedUrl` | `any` | — | embed Url prop. |
| `title` | `any` | — | title prop. |
| `hint` | `any` | — | hint prop. |
| `caption` | `string` | "" | caption prop. |
| `className` | `string` | '' | Optional CSS class override. |
| `style` | `object` | {} | Optional inline style override. |

---

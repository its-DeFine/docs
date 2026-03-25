# Mintlify Constraints Reference

> Claude MUST read this before writing any MDX page or JSX component.
> Source: derived from snippetsWiki/mintlify-behaviour.mdx, page-authoring/SKILL.md, components/README.md (2026-03-25)

---

## Top mistakes Claude makes

### 1. Importing React or hooks

```jsx
// WRONG — causes build errors
import React from 'react'
import { useState, useEffect } from 'react'

// RIGHT — hooks are globally available, no import needed
const [value, setValue] = useState(false)
```

### 2. Importing Mintlify globals

```jsx
// WRONG — these are built-in, importing breaks things
import { Card, Tabs, Accordion, Note, Steps, Columns, Icon } from 'mintlify'

// RIGHT — just use them directly in MDX
<Card title="Example">Content</Card>
```

### 3. Relative import paths

```jsx
// WRONG — relative paths don't resolve
import MyComponent from '../components/MyComponent'
import data from './data.js'

// RIGHT — absolute paths from repo root, with file extension
import MyComponent from '/snippets/components/wrappers/cards/MyComponent.jsx'
```

### 4. Missing file extensions

```jsx
// WRONG — no extension
import Foo from '/snippets/components/elements/text/Foo'

// RIGHT — always include .jsx or .js
import Foo from '/snippets/components/elements/text/Foo.jsx'
```

### 5. Cross-JSX imports (JSX file importing from another JSX file)

```jsx
// WRONG — Mintlify compiles at MDX level, not JSX level
// In MyComponent.jsx:
import { helperData } from '/snippets/data/helpers.js'

// RIGHT — define data in parent MDX, pass through component scope or props
// In page.mdx:
import helperData from '/snippets/data/helpers.js'
import MyComponent from '/snippets/components/.../MyComponent.jsx'

<MyComponent data={helperData} />
```

### 6. Inline styles and hardcoded colours

```jsx
// WRONG
<div style={{ color: '#ff0000', marginTop: '20px' }}>

// RIGHT — use CSS variables or component props
<div style={{ color: 'var(--text)', marginTop: 'var(--spacing-4)' }}>
```

### 7. Icon colour styling with CSS

```jsx
// WRONG — custom icons render as <img>, not inline SVG
// CSS color property has no effect
<Icon icon="custom-icon" style={{ color: 'red' }} />

// RIGHT — use theme-aware SVG files with internal CSS
// Or use separate dark/light icon variants
```

### 8. Server-side patterns

```jsx
// WRONG — no SSR, no Node APIs
import fs from 'fs'
import path from 'path'
export async function getStaticProps() { ... }

// RIGHT — Mintlify is client-only
// All data must be pre-compiled or fetched client-side
// Dynamic content may not be indexed for SEO
```

### 9. External package imports

```jsx
// WRONG — arbitrary npm packages not available
import lodash from 'lodash'
import axios from 'axios'

// RIGHT — only use what Mintlify bundles
// React hooks, basic React APIs, and Mintlify globals are available
// For anything else, check if it works in Mintlify first
```

### 10. ThemeData imports (deprecated)

```jsx
// WRONG — deprecated pattern
import { ThemeData } from '/snippets/...'

// RIGHT — use CSS variables for theme-aware values
// var(--background), var(--text), var(--primary), etc.
```

---

## Quick decision tree: "Should I import X?"

```
Is it React or a React hook?
  → NO import. Globally available.

Is it a Mintlify component (Card, Tabs, Accordion, Note, Steps, Columns, Icon)?
  → NO import. Built-in global.

Is it a custom component from snippets/components/?
  → YES import. Absolute path. Include .jsx extension.

Is it a data file from snippets/data/?
  → YES import in the MDX file. Pass to components via props/scope.
  → Do NOT import in JSX component files.

Is it an npm package?
  → Probably won't work. Check Mintlify docs first.

Is it a Node.js API (fs, path, process)?
  → NO. Not available. Client-only.
```

---

## Compilation model

Mintlify compiles at the **MDX file level**, not the component file level.

This means:
- MDX files can import JSX components and data files
- JSX component files CANNOT reliably import from other files
- Data and variables should be defined or imported in the parent MDX and passed down
- Child MDX files inherit parent scope with limitations

---

## What IS available without import

- `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`
- `Card`, `Tabs`, `Tab`, `Accordion`, `AccordionGroup`, `Note`, `Warning`, `Info`, `Tip`, `Check`
- `Steps`, `Step`, `Columns`, `Column`, `Icon`, `Frame`
- `CodeGroup`, `Code`, `ResponseField`, `Expandable`, `Param`, `ParamField`
- CSS variables: `var(--background)`, `var(--text)`, `var(--primary)`, etc.

---

## Canonical sources (read for full detail)

- `snippets/snippetsWiki/mintlify-behaviour.mdx` — 437 lines of detailed constraint docs
- `ai-tools/ai-skills/page-authoring/SKILL.md` — hard rules section (lines 31-44)
- `snippets/components/README.md` — global availability note

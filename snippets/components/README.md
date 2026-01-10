Components Folder Structure:

These components are organised **By Function/Purpose**

Additionally some items are organised by **Domain** where domain specific
components are extracted to their own folder. ie. code strings used on multiple
pages, or callouts to users.

| Category     | Components                                                                   |
| ------------ | ---------------------------------------------------------------------------- |
| primitives   | Button, Text, Box                                                            |
| forms        | Inputs, Select, Checkbox, Validation                                         |
| layout       | Grid, Stack, Container, Spacer                                               |
| navigation   | Tabs, Breadcrumb, Menu, Sidebar                                              |
| feedback     | Alert, Toast, Modal, Spinner                                                 |
| data-display | Table, List, Card, Badge                                                     |
| media        | Image, Video, Avatar, Icon                                                   |
| content      | Code, Embed, ExternalContent, ResponseField, ZoomableDiagram                 |
| integrations | Coingecko, Chainlist                                                         |
| domain       | Shared, Home, About, Community, Developers, Gateways, GPU, Token,References. |

```bash
components/
├── primitives/
│   ├── button.jsx
│   ├── card.jsx
│   ├── divider.jsx
│   ├── icon.jsx
│   ├── image.jsx
│   ├── link.jsx
│   ├── list.jsx
│   ├── table.jsx
│   └── video.jsx
├── layout/
│   ├── container.jsx
│   ├── grid.jsx
│   ├── stack.jsx
│   └── spacer.jsx
├── forms/
│   ├── input.jsx
│   ├── select.jsx
│   ├── checkbox.jsx
│   └── validation.jsx
├── navigation/
│   ├── tabs.jsx
│   ├── breadcrumb.jsx
│   ├── menu.jsx
│   └── sidebar.jsx
├── feedback/
│   ├── alert.jsx
│   ├── toast.jsx
│   ├── modal.jsx
│   └── spinner.jsx
├── data-display/
│   ├── table.jsx
│   ├── list.jsx
│   ├── card.jsx
│   └── badge.jsx
├── media/
│   ├── image.jsx
│   ├── video.jsx
│   ├── avatar.jsx
│   └── icon.jsx
└── content/
    ├── code.jsx
    ├── embed.jsx
    ├── external-content.jsx
    ├── response-field.jsx
    └── zoomable-diagram.jsx
```

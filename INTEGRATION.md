# 🔌 Integration Guide - BosonBrain Editor

How to integrate BosonBrain Editor into different frameworks and setups.

## 📋 Table of Contents

- [React (Vite)](#react-vite)
- [Next.js](#nextjs)
- [Create React App](#create-react-app)
- [Remix](#remix)
- [Astro](#astro)
- [TypeScript Setup](#typescript-setup)
- [Styling Options](#styling-options)
- [Advanced Configuration](#advanced-configuration)

---

## React (Vite)

### Installation

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @bosonbrain/editor
```

### Usage

```tsx
// src/App.tsx
import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function App() {
  return <BosonBrainEditor />;
}

export default App;
```

```css
/* src/index.css or App.css */
body, html, #root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
```

---

## Next.js

### App Router (Next.js 13+)

```tsx
// app/editor/page.tsx
'use client';

import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

export default function EditorPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <BosonBrainEditor />
    </div>
  );
}
```

### Pages Router (Next.js 12 and below)

```tsx
// pages/editor.tsx
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@bosonbrain/editor').then((mod) => ({
    default: mod.BosonBrainEditor,
  })),
  { ssr: false }
);

export default function EditorPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Editor />
    </div>
  );
}
```

```tsx
// _app.tsx
import '@bosonbrain/editor/styles';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### Next.js Configuration

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@bosonbrain/editor'],
  // If using webpack:
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
```

---

## Create React App

### Installation

```bash
npx create-react-app my-app --template typescript
cd my-app
npm install @bosonbrain/editor
```

### Usage

```tsx
// src/App.tsx
import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';
import './App.css';

function App() {
  return (
    <div className="App">
      <BosonBrainEditor />
    </div>
  );
}

export default App;
```

```css
/* src/App.css */
.App {
  width: 100vw;
  height: 100vh;
}

body, html, #root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
```

---

## Remix

### Installation

```bash
npx create-remix@latest my-app
cd my-app
npm install @bosonbrain/editor
```

### Usage

```tsx
// app/routes/editor.tsx
import { BosonBrainEditor } from '@bosonbrain/editor';
import editorStyles from '@bosonbrain/editor/styles';

export function links() {
  return [{ rel: 'stylesheet', href: editorStyles }];
}

export default function EditorRoute() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <BosonBrainEditor />
    </div>
  );
}
```

Or use CSS import in root:

```tsx
// app/root.tsx
import '@bosonbrain/editor/styles';
// ... rest of your root component
```

---

## Astro

### Installation

```bash
npm create astro@latest my-app
cd my-app
npm install @bosonbrain/editor
```

### Usage

```astro
---
// src/pages/editor.astro
import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';
---

<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Editor</title>
  </head>
  <body>
    <div style="width: 100vw; height: 100vh;">
      <BosonBrainEditor client:only="react" />
    </div>
  </body>
</html>

<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>
```

### Astro Configuration

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
});
```

---

## TypeScript Setup

### tsconfig.json

Ensure proper TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### Type Definitions

Types are automatically included. For additional type safety:

```tsx
import type { EditorState, ThemeMode } from '@bosonbrain/editor';

// Use types in your code
const theme: ThemeMode = 'dark';
```

---

## Styling Options

### Option 1: Import Directly (Recommended)

```tsx
import '@bosonbrain/editor/styles';
```

### Option 2: Link in HTML

```html
<link rel="stylesheet" href="/node_modules/@bosonbrain/editor/dist/style.css" />
```

### Option 3: CDN (for quick testing)

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@bosonbrain/editor@latest/dist/style.css"
/>
```

### Custom Styling

Create a custom CSS file after importing the base styles:

```tsx
import '@bosonbrain/editor/styles';
import './custom-editor-theme.css';
```

```css
/* custom-editor-theme.css */
:root {
  --accent-color: #your-color;
  --bg-primary: #your-background;
  /* ... other overrides */
}
```

---

## Advanced Configuration

### With Redux/State Management

```tsx
import { BosonBrainEditor, useEditorStore } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function EditorWrapper() {
  const dispatch = useDispatch();
  const { wordCount, characterCount } = useEditorStore();

  useEffect(() => {
    // Sync editor stats to Redux
    dispatch({ type: 'UPDATE_STATS', payload: { wordCount, characterCount } });
  }, [wordCount, characterCount, dispatch]);

  return <BosonBrainEditor />;
}
```

### Custom Container

```tsx
import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function CustomEditorLayout() {
  return (
    <div className="my-app-layout">
      <header>My App Header</header>
      <aside>Sidebar</aside>
      <main className="editor-wrapper">
        <BosonBrainEditor />
      </main>
    </div>
  );
}
```

```css
.my-app-layout {
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar main';
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  height: 100vh;
}

.editor-wrapper {
  grid-area: main;
  overflow: hidden;
}
```

### Multiple Editors

```tsx
import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function MultiEditor() {
  return (
    <div style={{ display: 'flex', gap: '20px', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <BosonBrainEditor />
      </div>
      <div style={{ flex: 1 }}>
        <BosonBrainEditor />
      </div>
    </div>
  );
}
```

**Note**: Each editor instance has its own state managed by Zustand.

### Environment-Specific Config

```tsx
// config.ts
export const editorConfig = {
  development: {
    autoSave: true,
    autoSaveInterval: 5000,
  },
  production: {
    autoSave: true,
    autoSaveInterval: 10000,
  },
};

// App.tsx
import { BosonBrainEditor } from '@bosonbrain/editor';
import { editorConfig } from './config';

const config = editorConfig[process.env.NODE_ENV];
```

---

## 🎨 Theming Examples

### Dark Mode by Default

```tsx
import { BosonBrainEditor, useEditorStore } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';
import { useEffect } from 'react';

function App() {
  const { setTheme } = useEditorStore();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return <BosonBrainEditor />;
}
```

### User Preference Detection

```tsx
import { BosonBrainEditor, useEditorStore } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';
import { useEffect } from 'react';

function App() {
  const { setTheme } = useEditorStore();

  useEffect(() => {
    // Auto-detect user preference
    setTheme('auto');

    // Or save/load preference
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | 'auto';
    if (saved) setTheme(saved);
  }, [setTheme]);

  return <BosonBrainEditor />;
}
```

---

## 🔒 Content Security Policy

If using CSP, add these directives:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    style-src 'self' 'unsafe-inline';
    script-src 'self' 'unsafe-eval';
    img-src 'self' data: https:;
    font-src 'self' data:;
  "
/>
```

---

## 📱 Mobile/Responsive Considerations

The editor is fully responsive, but for mobile apps:

```tsx
import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function MobileEditor() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100dvh', // Use dvh for mobile
        touchAction: 'none', // Prevent scroll issues
      }}
    >
      <BosonBrainEditor />
    </div>
  );
}
```

---

## 🚨 Common Issues

### "Module not found"
Make sure you've installed the package:
```bash
npm install @bosonbrain/editor
```

### "Styles not loading"
Import styles in your main component or layout:
```tsx
import '@bosonbrain/editor/styles';
```

### "Build errors in production"
Ensure peer dependencies are installed:
```bash
npm install react react-dom
```

### "TypeScript errors"
Update your tsconfig.json with proper settings (see TypeScript Setup above)

---

## 📞 Need Help?

- 📚 [Full Documentation](https://github.com/bosonbrain/editor)
- 💬 [Discussions](https://github.com/bosonbrain/editor/discussions)
- 🐛 [Issues](https://github.com/bosonbrain/editor/issues)

---

Happy Coding! 🚀

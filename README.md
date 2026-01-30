<div align="center">

# 🧠 BosonBrain Editor

### A Beautiful, Feature-Rich Text Editor for the Modern Web

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18+"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/TipTap-2.0-8B5CF6?style=for-the-badge" alt="TipTap"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License"/>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-documentation">Docs</a> •
  <a href="#-contributing">Contributing</a>
</p>

<br/>

<img src="https://raw.githubusercontent.com/bosonbrain/editor/main/.github/assets/editor-preview.png" alt="BosonBrain Editor Preview" width="100%"/>

</div>

---

## ✨ What Makes It Special?

<table>
<tr>
<td width="50%">

### 🎨 **Beautiful by Default**
Stunning UI with attention to every pixel. Dark mode, focus mode, and a writing experience that rivals the best.

</td>
<td width="50%">

### ⚡ **Lightning Fast**
Built on ProseMirror's battle-tested architecture. Handles large documents with ease.

</td>
</tr>
<tr>
<td width="50%">

### 🧩 **Feature Complete**
Everything you need out of the box: formatting, tables, code blocks, math equations, images, and more.

</td>
<td width="50%">

### 📱 **Fully Responsive**
Works beautifully on desktop, tablet, and mobile. Touch-friendly with full keyboard support.

</td>
</tr>
</table>

---

## 🎯 Features

<details open>
<summary><b>📝 Rich Text Editing</b></summary>

| Feature | Description |
|---------|-------------|
| **Formatting** | Bold, italic, underline, strikethrough, highlights, code |
| **Headings** | H1 - H6 with automatic anchor links |
| **Lists** | Ordered, unordered, and task lists with nesting |
| **Tables** | Full-featured with add/delete rows & columns |
| **Code Blocks** | 20+ languages with syntax highlighting |
| **Math** | LaTeX equations with KaTeX rendering |
| **Embeds** | Images, links with rich previews |

</details>

<details open>
<summary><b>🎨 Smart UI/UX</b></summary>

```
┌─────────────────────────────────────────────────────────────┐
│  📝 BosonBrain Editor                          🌙 ◉ 👁️  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Type / for commands...                              │   │
│  │                                                     │   │
│  │ ════════════════════════════════════════════════   │   │
│  │                                                     │   │
│  │  "The floating toolbar appears when you            │   │
│  │   select text, giving you instant access           │   │
│  │   to formatting options."                          │   │
│  │        ┌──────────────────────┐                    │   │
│  │        │ B  I  U  S  🔗  ✓  │                    │   │
│  │        └──────────────────────┘                    │   │
│  │                                                     │   │
│  │  + Click the plus button to insert blocks          │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ══════════════════════════════════════════════════════    │
│  📊 Words: 42 │ 📖 Reading: 1 min │ 🎯 Goal: 500 words     │
└─────────────────────────────────────────────────────────────┘
```

</details>

<details>
<summary><b>⌨️ Keyboard Shortcuts</b></summary>

| Shortcut | Action |
|----------|--------|
| `⌘/Ctrl + B` | Bold |
| `⌘/Ctrl + I` | Italic |
| `⌘/Ctrl + U` | Underline |
| `⌘/Ctrl + K` | Insert Link |
| `⌘/Ctrl + Shift + X` | Strikethrough |
| `⌘/Ctrl + Shift + H` | Highlight |
| `⌘/Ctrl + E` | Inline Code |
| `⌘/Ctrl + Shift + 7` | Ordered List |
| `⌘/Ctrl + Shift + 8` | Bullet List |
| `⌘/Ctrl + Shift + 9` | Task List |
| `⌘/Ctrl + Alt + C` | Code Block |
| `/` | Slash Commands |

</details>

<details>
<summary><b>🌈 Themes & Modes</b></summary>

| Mode | Description |
|------|-------------|
| 🌞 **Light Mode** | Clean, bright interface for daytime writing |
| 🌙 **Dark Mode** | Easy on the eyes for night owls |
| 👁️ **Focus Mode** | Distraction-free writing with dimmed UI |
| 🎯 **Writing Goals** | Set word count targets with progress tracking |

</details>

---

## 🚀 Quick Start

### Installation

```bash
# npm
npm install @bosonbrain/editor

# yarn
yarn add @bosonbrain/editor

# pnpm
pnpm add @bosonbrain/editor
```

### Basic Usage

```tsx
import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function App() {
  return <BosonBrainEditor />;
}
```

**That's it!** 🎉 The editor comes fully loaded and ready to use.

---

## 📖 Examples

<details>
<summary><b>🎨 Custom Theming</b></summary>

```tsx
import { BosonBrainEditor, useEditorStore } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function ThemedEditor() {
  const { theme, setTheme } = useEditorStore();

  return (
    <div data-theme={theme}>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? '🌞' : '🌙'} Toggle Theme
      </button>
      <BosonBrainEditor />
    </div>
  );
}
```

</details>

<details>
<summary><b>📊 With State Management</b></summary>

```tsx
import { BosonBrainEditor, useEditorStore } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function EditorWithStats() {
  const { wordCount, focusMode, setFocusMode } = useEditorStore();

  return (
    <div>
      <div className="stats-bar">
        <span>📝 {wordCount} words</span>
        <button onClick={() => setFocusMode(!focusMode)}>
          {focusMode ? '👁️ Exit Focus' : '🎯 Focus Mode'}
        </button>
      </div>
      <BosonBrainEditor />
    </div>
  );
}
```

</details>

<details>
<summary><b>⚛️ Next.js Integration</b></summary>

```tsx
// components/Editor.tsx
'use client';

import dynamic from 'next/dynamic';

const BosonBrainEditor = dynamic(
  () => import('@bosonbrain/editor').then(mod => mod.BosonBrainEditor),
  { ssr: false }
);

import '@bosonbrain/editor/styles';

export default function Editor() {
  return <BosonBrainEditor />;
}
```

</details>

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     BosonBrain Editor                        │
├──────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ │
│  │   Components   │  │   Extensions   │  │     Utils      │ │
│  ├────────────────┤  ├────────────────┤  ├────────────────┤ │
│  │ EditorView     │  │ MathExtension  │  │ imageUtils     │ │
│  │ FloatingToolbar│  │ CodeBlock      │  │ storage        │ │
│  │ SlashCommands  │  │ Tables         │  │ helpers        │ │
│  │ LinkBubble     │  │ TaskLists      │  │                │ │
│  │ TableControls  │  │ Typography     │  │                │ │
│  └────────────────┘  └────────────────┘  └────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    TipTap / ProseMirror                │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/bosonbrain/editor.git
cd editor

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build as npm package
npm run build:package
```

---

## 📊 Browser Support

| Browser | Version |
|---------|---------|
| <img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png" width="24"/> Chrome | 90+ |
| <img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png" width="24"/> Firefox | 88+ |
| <img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png" width="24"/> Safari | 14+ |
| <img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png" width="24"/> Edge | 90+ |

---

## 📄 License

MIT © [BosonBrain](https://github.com/bosonbrain)

---

<div align="center">

### ⭐ Star this repo if you find it useful!

<br/>

**Built with ❤️ using React, TipTap, and TypeScript**

<br/>

[Report Bug](https://github.com/bosonbrain/editor/issues) · [Request Feature](https://github.com/bosonbrain/editor/issues) · [Discussions](https://github.com/bosonbrain/editor/discussions)

</div>

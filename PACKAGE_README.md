# 🧠 BosonBrain Editor

A feature-rich, production-ready rich text editor component for React applications. Built with TipTap/ProseMirror, offering a beautiful Medium-like writing experience with advanced formatting, AI-powered features, and exceptional UI/UX.

[![NPM Version](https://img.shields.io/npm/v/@bosonbrain/editor.svg)](https://www.npmjs.com/package/@bosonbrain/editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 📝 Rich Text Editing
- **Complete formatting suite**: Bold, italic, underline, strikethrough, code, highlights
- **Advanced text structures**: Headings (H1-H6), paragraphs, blockquotes
- **Lists**: Ordered, unordered, task lists with nested support
- **Tables**: Full-featured tables with controls, row/column management
- **Code blocks**: Syntax highlighting for 20+ languages with language selector
- **Mathematical equations**: LaTeX support with KaTeX rendering
- **Smart typography**: Auto-formatting for quotes, dashes, arrows, and more

### 🎨 Advanced UI/UX
- **Floating format toolbar**: Context-sensitive formatting options
- **Slash commands**: Quick access to all features (type `/`)
- **Floating insert button**: Plus button for inserting content
- **Link previews**: Beautiful rich link cards with metadata
- **Image handling**: Drag & drop, paste, auto-compression, responsive
- **Focus mode**: Distraction-free writing
- **Dark mode**: Full dark theme support with auto-detection
- **Writing goals**: Set word count targets with visual progress
- **Keyboard shortcuts**: Comprehensive keyboard navigation
- **Auto-save**: Automatic content saving with visual indicator

### 📱 Responsive & Accessible
- Fully responsive design
- Touch-friendly interface
- Keyboard navigation
- Screen reader support
- High contrast mode support

## 🚀 Installation

```bash
npm install @bosonbrain/editor
# or
yarn add @bosonbrain/editor
# or
pnpm add @bosonbrain/editor
```

## 📖 Quick Start

### Basic Usage

```tsx
import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function App() {
  return (
    <div className="app">
      <BosonBrainEditor />
    </div>
  );
}

export default App;
```

That's it! The editor comes with all features enabled and ready to use.

## 🎯 Advanced Usage

### With Custom Styling

```tsx
import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';
import './my-custom-styles.css';

function App() {
  return (
    <div style={{ height: '100vh', background: '#f5f5f5' }}>
      <BosonBrainEditor />
    </div>
  );
}
```

### Accessing Editor State

```tsx
import { BosonBrainEditor, useEditorStore } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function MyApp() {
  const { theme, setTheme, focusMode, setFocusMode } = useEditorStore();

  return (
    <div>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
      <button onClick={() => setFocusMode(!focusMode)}>
        {focusMode ? 'Exit' : 'Enter'} Focus Mode
      </button>
      <BosonBrainEditor />
    </div>
  );
}
```

### Using with TypeScript

```tsx
import { 
  BosonBrainEditor, 
  useEditorStore, 
  type EditorState,
  type ThemeMode 
} from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function App() {
  const store: EditorState = useEditorStore();
  
  const handleThemeChange = (theme: ThemeMode) => {
    store.setTheme(theme);
  };

  return <BosonBrainEditor />;
}
```

## 🎨 Customization

### CSS Custom Properties

The editor uses CSS custom properties (CSS variables) for theming. You can override them:

```css
:root {
  /* Colors */
  --accent-color: #0066ff;
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #1a1a1a;
  --text-secondary: #6c757d;
  --border-color: #e0e0e0;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}

/* Dark theme */
.theme-dark {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --border-color: #404040;
}
```

## 📚 API Reference

### `BosonBrainEditor`

The main editor component. It's a complete, self-contained editor with all features built-in.

```tsx
<BosonBrainEditor />
```

No props needed - it's ready to use out of the box!

### `useEditorStore`

Zustand store hook for accessing and controlling editor state.

```tsx
const {
  // Theme
  theme,              // 'light' | 'dark' | 'auto'
  effectiveTheme,     // 'light' | 'dark' (computed)
  setTheme,           // (theme: ThemeMode) => void
  
  // Layout
  layoutMode,         // 'full-page' | 'book-like' | 'default'
  setLayoutMode,      // (mode: LayoutMode) => void
  
  // Focus Mode
  focusMode,          // boolean
  setFocusMode,       // (enabled: boolean) => void
  
  // UI State
  isScrolled,         // boolean
  setIsScrolled,      // (scrolled: boolean) => void
  isDirty,            // boolean
  setIsDirty,         // (dirty: boolean) => void
  
  // Statistics
  wordCount,          // number
  setWordCount,       // (count: number) => void
  characterCount,     // number
  setCharacterCount,  // (count: number) => void
  readingTime,        // number (minutes)
  setReadingTime,     // (time: number) => void
  
  // Writing Goals
  goalEnabled,        // boolean
  setGoalEnabled,     // (enabled: boolean) => void
  goalTarget,         // number
  setGoalTarget,      // (target: number) => void
  
} = useEditorStore();
```

## ⌨️ Keyboard Shortcuts

### Text Formatting
- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + U` - Underline
- `Ctrl/Cmd + Shift + X` - Strikethrough
- `Ctrl/Cmd + E` - Inline code
- `Ctrl/Cmd + H` - Highlight

### Structure & Layout
- `Ctrl/Cmd + Alt + 1-6` - Headings (H1-H6)
- `Ctrl/Cmd + Shift + 7` - Ordered list
- `Ctrl/Cmd + Shift + 8` - Bullet list
- `Ctrl/Cmd + Shift + 9` - Task list
- `Ctrl/Cmd + Shift + B` - Blockquote
- `Ctrl/Cmd + Enter` - Hard break
- `Ctrl/Cmd + Shift + -` - Horizontal rule

### Rich Content
- `Ctrl/Cmd + K` - Insert/edit link
- `Ctrl/Cmd + Shift + I` - Insert image
- `Ctrl/Cmd + Alt + C` - Code block
- `Ctrl/Cmd + Alt + M` - Math equation
- `Ctrl/Cmd + Alt + T` - Insert table

### Editor Controls
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo
- `Ctrl/Cmd + A` - Select all
- `Ctrl/Cmd + /` - Show shortcuts
- `Ctrl/Cmd + Shift + F` - Toggle focus mode

### Slash Commands
Type `/` anywhere to open the command menu with quick access to all features.

## 🎯 Features in Detail

### Slash Commands
Type `/` anywhere in the editor to access quick commands:
- `/h1` to `/h6` - Headings
- `/p` - Paragraph
- `/ul` - Bullet list
- `/ol` - Numbered list
- `/task` - Task list
- `/quote` - Blockquote
- `/code` - Code block
- `/table` - Insert table
- `/image` - Insert image
- `/link` - Insert link
- `/math` - Math equation
- `/hr` - Horizontal rule

### Link Previews
Paste any URL and get beautiful rich link cards with:
- Page title
- Description
- Featured image
- Favicon
- Clean URL display

### Image Handling
- **Drag & drop**: Drop images directly into the editor
- **Paste**: Paste images from clipboard
- **Auto-compression**: Images are automatically optimized
- **Responsive**: Images are responsive and properly sized
- **Alt text**: Add descriptions for accessibility

### Math Equations
Write mathematical equations using LaTeX syntax:
- Inline math: `$E = mc^2$`
- Block math: `$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$`

### Writing Goals
- Set daily word count targets
- Visual progress tracking
- Motivational feedback
- Persistent goal storage

### Focus Mode
- Hide all UI distractions
- Center content for better focus
- Dim background
- Easy to exit (Esc, Ctrl+Shift+F, or Exit button)

### Auto-Save
- Automatic content saving
- Visual save indicator
- IndexedDB storage
- Content persists across sessions

## 🔧 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 📦 Bundle Size

- ES Module: ~180KB (gzipped)
- UMD: ~185KB (gzipped)
- CSS: ~45KB (gzipped)

All dependencies are bundled except React and ReactDOM (peer dependencies).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © BosonBrain

## 🙏 Credits

Built with:
- [React](https://react.dev/)
- [TipTap](https://tiptap.dev/)
- [ProseMirror](https://prosemirror.net/)
- [Zustand](https://github.com/pmndrs/zustand)
- [KaTeX](https://katex.org/)

## 📞 Support

- 📧 Email: support@bosonbrain.com
- 🐛 Issues: [GitHub Issues](https://github.com/bosonbrain/editor/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/bosonbrain/editor/discussions)

---

Made with ❤️ by BosonBrain

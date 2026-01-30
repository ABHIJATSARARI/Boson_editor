# 🚀 Setup Guide - Medium Story Editor

## Quick Start (3 steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
The editor will automatically open at `http://localhost:3000`

---

## 📦 What's Included

### Core Features
✅ **TipTap WYSIWYG Editor** - Full-featured rich text editor  
✅ **Floating Insert Button (+)** - Quick content insertion  
✅ **Floating Format Toolbar** - Text formatting on selection  
✅ **Image Upload & Resize** - Client-side image optimization  
✅ **Table Editor** - MS Office-like table editing  
✅ **LaTeX Math Support** - KaTeX rendering for equations  
✅ **Adaptive Theming** - Light/Dark/Auto modes  
✅ **Autosave & Recovery** - IndexedDB persistence  
✅ **Multiple Layout Modes** - Default, Full-Page, Book-Like  

---

## 🎮 Usage Guide

### Basic Editing
1. **Click anywhere** to start typing
2. **Select text** to see the formatting toolbar appear
3. **Click on empty lines** to see the "+" insert button
4. **Use keyboard shortcuts** for faster editing (see README)

### Inserting Content

#### Images
- **Method 1**: Click the "+" button → Select "Image"
- **Method 2**: Press `Ctrl+Shift+I`
- **Method 3**: Drag & drop an image file
- **Method 4**: Paste from clipboard

#### Tables
- Click "+" → Select "Table"
- Or press `Ctrl+Shift+T`
- Right-click cells for more options
- Drag column borders to resize

#### LaTeX Math
- Click "+" → Select "LaTeX"
- Or press `Ctrl+Shift+L`
- Inline: `\( x = y \)`
- Block: `$$ E = mc^2 $$`

### Switching Layouts
Use the toolbar buttons in the top-right:
- 📄 **Default** - Standard centered layout (720px)
- 🖥️ **Full Page** - Distraction-free full viewport
- 📖 **Book** - Book-like page simulation

### Theme Switching
Click the theme button to cycle through:
- ☀️ **Light** - Light background
- 🌙 **Dark** - Dark background
- 🌓 **Auto** - Follows system preference

---

## ⚙️ Configuration

### Change Autosave Interval
Edit `src/components/EditorView.tsx` line ~95:
```typescript
const debouncedSave = debounce((content: any) => {
  saveAutosaveDraft(articleId, title, content);
}, 2000); // Change this number (milliseconds)
```

### Change Default Theme/Layout
Edit `src/stores/editorStore.ts` lines ~11-16:
```typescript
theme: 'auto',           // 'light' | 'dark' | 'auto'
layoutMode: 'default',   // 'default' | 'full-page' | 'book-like'
```

### Customize Colors
Edit `src/styles/globals.css` - CSS variables starting at line ~9:
```css
:root {
  --accent-color: #1a8917;      /* Change primary color */
  --bg-primary: #ffffff;         /* Change background */
  /* ... etc */
}
```

---

## 🔧 Troubleshooting

### Port 3000 Already in Use
```bash
# Use a different port
npm run dev -- --port 3001
```

### TypeScript Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Editor Not Loading
1. Check browser console for errors
2. Clear browser cache and localStorage
3. Try in incognito/private mode

### Image Upload Not Working
- Images are stored as base64 in IndexedDB
- For production, implement backend upload endpoint
- Max file size is 10MB (configurable in `imageUtils.ts`)

---

## 📁 File Structure Explained

```
src/
├── components/              # React UI components
│   ├── EditorView.tsx       # Main editor (TipTap integration)
│   ├── FloatingInsertButton.tsx  # "+" button component
│   └── FloatingFormatToolbar.tsx # Selection toolbar
│
├── extensions/              # Custom TipTap extensions
│   ├── MathExtension.ts     # LaTeX node definition
│   └── MathNodeView.tsx     # LaTeX rendering component
│
├── stores/                  # State management (Zustand)
│   └── editorStore.ts       # Global editor state
│
├── types/                   # TypeScript type definitions
│   └── index.ts             # All interfaces and types
│
├── utils/                   # Helper functions
│   ├── helpers.ts           # General utilities (debounce, etc.)
│   ├── imageUtils.ts        # Image processing (resize, crop)
│   └── storage.ts           # IndexedDB operations
│
├── styles/                  # CSS files
│   ├── globals.css          # Global styles & CSS variables
│   └── editor.css           # Editor-specific styles
│
├── App.tsx                  # Root component
└── main.tsx                 # Application entry point
```

---

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔐 Data Storage

### Where is data stored?
- **IndexedDB** - Article content and autosave drafts
- **LocalStorage** - Theme and layout preferences
- **No server** - Everything is local by default

### Clearing stored data
```javascript
// Open browser console and run:
indexedDB.deleteDatabase('medium-editor');
localStorage.clear();
```

---

## 🚀 Next Steps

### Add Backend Integration
1. Create API endpoints (see README "Backend Layer")
2. Update `storage.ts` to sync with server
3. Implement image upload to cloud storage

### Customize Extensions
1. Create new TipTap extensions in `src/extensions/`
2. Register them in `EditorView.tsx`
3. Add UI controls as needed

### Add Collaboration
1. Install Y.js: `npm install yjs y-prosemirror`
2. Follow TipTap collaboration guide
3. Set up WebSocket server

---

## 📚 Learning Resources

- **TipTap Docs**: https://tiptap.dev/
- **ProseMirror Guide**: https://prosemirror.net/docs/guide/
- **KaTeX**: https://katex.org/
- **Zustand**: https://zustand-demo.pmnd.rs/

---

## 💡 Tips & Tricks

### Keyboard Shortcuts Power User
- Hold `Ctrl/Cmd` while typing for shortcuts
- `Ctrl+Shift` for insert commands
- `Esc` to cancel dialogs

### Mobile Editing
- Tap empty space for insert menu
- Long-press selected text for formatting
- Pinch to zoom (browser native)

### Performance
- Large documents auto-virtualize
- Images are lazy-loaded
- Undo history limited to 1000 steps

---

## 🐛 Reporting Issues

Found a bug? Please include:
1. Browser and version
2. Steps to reproduce
3. Expected vs actual behavior
4. Console errors (if any)

---

**Happy Writing! 📝**

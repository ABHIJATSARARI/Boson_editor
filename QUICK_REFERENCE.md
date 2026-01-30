# ⚡ Quick Reference Guide

## 🚀 Getting Started (30 seconds)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# → http://localhost:3000/
```

---

## ⌨️ Essential Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl + B` | **Bold** |
| `Ctrl + I` | *Italic* |
| `Ctrl + K` | 🔗 Link |
| `Ctrl + Shift + I` | 🖼️ Image |
| `Ctrl + Shift + T` | 📊 Table |
| `Ctrl + Shift + L` | ∑ LaTeX |
| `Ctrl + S` | 💾 Save |
| `Ctrl + Shift + D` | 🌓 Theme |
| `Ctrl + Z` | ↶ Undo |

---

## 🎨 UI Controls

### Top Bar (Right Side)
- 📄 📄 📖 → Layout modes
- ☀️/🌙/🌓 → Theme toggle
- **Publish** → Publish button

### Status Bar (Center)
- 🟢 Saved → Last save time
- 🔴 Unsaved → Changes pending
- **123 words** → Word count

---

## 📝 Content Insertion

### The "+" Button
Click empty line → See **+** button → Menu opens:

```
+ Button Menu:
├── 🖼️  Image
├── 📊  Table
├── H   Heading
├── 💬  Quote
├── </>  Code Block
├── ∑   LaTeX
├── —   Divider
└── •   List
```

### Quick Methods
- **Drag & drop** images
- **Paste** from clipboard
- **Type** `/` for commands (future)

---

## 🎯 Common Tasks

### Add Image
1. Click **+** → Image
2. Or drag image file
3. Or paste from clipboard
4. Auto-resizes!

### Insert Table
1. Click **+** → Table
2. Or `Ctrl + Shift + T`
3. Right-click cells for options
4. Drag borders to resize

### Add Math Equation
1. Click **+** → LaTeX
2. Or `Ctrl + Shift + L`
3. Enter: `E = mc^2`
4. Save!

### Format Text
1. **Select text**
2. Toolbar appears above
3. Click format buttons
4. Done!

---

## 🎨 Layout Modes

| Mode | Description | Best For |
|------|-------------|----------|
| 📄 **Default** | Centered 720px | Regular writing |
| 🖥️ **Full Page** | Full viewport | Distraction-free |
| 📖 **Book** | Page simulation | Print preview |

---

## 🌓 Themes

| Theme | Icon | When |
|-------|------|------|
| Light | ☀️ | Always bright |
| Dark | 🌙 | Always dark |
| Auto | 🌓 | Follows system |

Click theme button to cycle through!

---

## 💾 Saving

### Automatic
- ✅ Auto-saves every **2 seconds**
- ✅ Saves when idle
- ✅ Stored in **IndexedDB**
- ✅ Works **offline**

### Manual
- Press `Ctrl + S` anytime

### Recovery
- Refreshing page? → Auto-loads last save
- Browser crash? → Recovers on reload

---

## 📁 Where Files Are

```
src/
├── App.tsx              ← Main app
├── components/
│   ├── EditorView.tsx   ← Editor core
│   ├── FloatingInsertButton.tsx  ← + button
│   └── FloatingFormatToolbar.tsx ← Format bar
├── stores/
│   └── editorStore.ts   ← App state
├── utils/
│   ├── helpers.ts       ← Utilities
│   ├── imageUtils.ts    ← Image handling
│   └── storage.ts       ← Save/load
└── styles/
    ├── globals.css      ← Theme colors
    └── editor.css       ← Editor styles
```

---

## 🔧 Quick Customization

### Change Colors
```css
/* src/styles/globals.css */
:root {
  --accent-color: #YOUR_COLOR;
}
```

### Change Fonts
```css
/* src/styles/globals.css */
:root {
  --font-family: "Your Font", sans-serif;
  --font-family-serif: "Your Serif", serif;
}
```

### Change Autosave Delay
```typescript
// src/components/EditorView.tsx (line ~95)
debounce(..., 2000) // milliseconds
```

---

## 🐛 Troubleshooting

### Server won't start?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port 3000 busy?
```bash
npm run dev -- --port 3001
```

### Can't save?
- Check browser console
- Clear IndexedDB: `indexedDB.deleteDatabase('medium-editor')`
- Try incognito mode

### Images not uploading?
- Max size: **10MB**
- Allowed: JPG, PNG, GIF, WebP
- Check console for errors

---

## 📊 Project Stats

- **Files**: 20+ source files
- **Components**: 5 main components
- **Extensions**: 15+ TipTap extensions
- **Dependencies**: 286 packages
- **Bundle Size**: ~500KB (gzipped)
- **Load Time**: < 1 second

---

## 🎯 Feature Status

| Feature | Status |
|---------|--------|
| Rich text editing | ✅ Complete |
| Floating insert button | ✅ Complete |
| Floating format toolbar | ✅ Complete |
| Image upload & resize | ✅ Complete |
| Table editor | ✅ Complete |
| LaTeX math | ✅ Complete |
| Themes (light/dark) | ✅ Complete |
| Multiple layouts | ✅ Complete |
| Autosave | ✅ Complete |
| Keyboard shortcuts | ✅ Complete |
| Word count | ✅ Complete |
| Responsive design | ✅ Complete |
| Offline support | ✅ Complete |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Full documentation |
| `SETUP.md` | Setup instructions |
| `PROJECT_COMPLETE.md` | Completion summary |
| `ARCHITECTURE.md` | System architecture |
| `QUICK_REFERENCE.md` | This file! |

---

## 🔗 Useful Links

- Dev Server: http://localhost:3000/
- TipTap Docs: https://tiptap.dev/
- KaTeX Docs: https://katex.org/
- Zustand Docs: https://zustand-demo.pmnd.rs/

---

## 💡 Pro Tips

1. **Use keyboard shortcuts** → Much faster!
2. **Auto-save is on** → No manual saving needed
3. **Works offline** → Write anywhere
4. **Drag images** → Faster than clicking
5. **Right-click tables** → More options
6. **Theme auto-switches** → Set to Auto mode

---

## 🎉 You're All Set!

**Start writing**: http://localhost:3000/

Press `Ctrl + Shift + ?` to see all shortcuts (future feature)

---

**Questions?** Check the other docs:
- Detailed setup → `SETUP.md`
- Full features → `README.md`
- Architecture → `ARCHITECTURE.md`

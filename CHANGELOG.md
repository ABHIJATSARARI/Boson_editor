# Changelog

All notable changes to the BosonBrain Editor will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-27

### 🎉 Initial Release

#### ✨ Features

**Rich Text Editing**
- Complete text formatting (bold, italic, underline, strikethrough, code, highlight)
- Headings (H1-H6), paragraphs, blockquotes
- Ordered lists, bullet lists, task lists with nesting
- Full-featured tables with controls
- Code blocks with syntax highlighting (20+ languages)
- Mathematical equations with LaTeX/KaTeX support
- Smart typography (auto-formatting quotes, dashes, arrows)

**Advanced UI/UX**
- Floating format toolbar (context-sensitive)
- Slash commands (type `/` for quick access)
- Floating insert button (plus button)
- Rich link previews with metadata cards
- Image handling (drag & drop, paste, auto-compression)
- Focus mode (distraction-free writing)
- Dark mode with auto-detection
- Writing goals with visual progress
- Comprehensive keyboard shortcuts
- Auto-save with visual indicator

**Editor Features**
- Multiple layout modes (full-page, book-like, default)
- Theme system (light, dark, auto)
- Statistics tracking (word count, character count, reading time)
- Responsive design
- Touch-friendly interface
- Keyboard navigation
- Screen reader support

**Developer Experience**
- TypeScript support with full type definitions
- React 18+ compatibility
- Zustand state management
- CSS custom properties for easy theming
- Tree-shakable ES modules
- UMD build for CDN usage
- Comprehensive documentation
- Usage examples for multiple frameworks

#### 📦 Package

- ES Module build
- UMD build for browsers/CDN
- TypeScript declarations included
- CSS bundle included
- Source maps for debugging
- Peer dependencies: React 18+, React-DOM 18+

#### 📚 Documentation

- Complete README with usage examples
- Integration guides for popular frameworks
- Publishing guide
- API reference
- Keyboard shortcuts guide
- TypeScript examples

### 🔧 Technical

- Built with Vite
- TipTap/ProseMirror editor core
- Zustand for state management
- KaTeX for math rendering
- IndexedDB for storage
- Pica for image compression

---

## [Unreleased]

### Planned Features
- AI writing assistant integration
- Collaborative editing (real-time)
- Version history with diff viewer
- Export to multiple formats (PDF, EPUB, LaTeX)
- Plugin system for extensibility
- Multi-document workspace
- Template system
- Voice typing support

---

## Version History

- **1.0.0** (2025-10-27) - Initial release

---

For detailed information about each release, see the [GitHub Releases](https://github.com/bosonbrain/editor/releases) page.

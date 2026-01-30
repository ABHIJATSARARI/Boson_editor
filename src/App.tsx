import { useEffect, useState } from 'react';
import { EditorView } from './components/EditorView';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { WritingGoals } from './components/WritingGoals';
import { useEditorStore } from './stores/editorStore';
import { initDB, getAutosaveDraft } from './utils/storage';
import { formatDate } from './utils/helpers';
import '@/styles/globals.css';
import '@/styles/micro-interactions.css';
import '@/styles/enhancements.css';
import '@/styles/full-page-editor.css';
import '@/styles/editor-chrome.css';
import './App.css';

function App() {
  const [articleId] = useState('demo-article-1');
  const [isLoading, setIsLoading] = useState(true);
  const [initialContent, setInitialContent] = useState<any>(null);
  const [initialTitle, setInitialTitle] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  const {
    theme,
    layoutMode,
    setTheme,
    setLayoutMode,
    lastSaved,
    isDirty,
    wordCount,
    characterCount,
    readTime,
  } = useEditorStore();

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize database and load autosaved draft
  useEffect(() => {
    const loadDraft = async () => {
      try {
        await initDB();
        const draft = await getAutosaveDraft(articleId);

        if (draft) {
          setInitialContent(draft.content);
          setInitialTitle(draft.title);
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDraft();
  }, [articleId]);

  // Initialize theme on mount
  useEffect(() => {
    // Apply initial theme to DOM
    const effectiveTheme = theme === 'auto' ?
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') :
      theme;

    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${effectiveTheme}`);
  }, [theme]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + S to save
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        console.log('Manual save triggered');
      }

      // Cmd/Ctrl + Shift + D for dark mode toggle
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'd') {
        e.preventDefault();
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }

      // Cmd/Ctrl + Shift + F for focus mode
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'f') {
        e.preventDefault();
        setFocusMode(!focusMode);
      }

      // Esc to exit focus mode
      if (e.key === 'Escape' && focusMode) {
        e.preventDefault();
        setFocusMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [theme, setTheme, focusMode]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <div className={`app ${focusMode ? 'focus-mode' : ''}`}>
      {/* Reading Progress Bar */}
      <div
        className="reading-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Top Bar */}
      <header className={`app-header ${isScrolled ? 'scrolled' : ''} ${focusMode ? 'hidden-header' : ''}`}>
        <div className="header-left">
          <h1 className="logo">BosonBrain Editor</h1>
        </div>

        <div className="header-center">
          <div className="status-bar">
            {isDirty && <span className="status-indicator unsaved">Unsaved changes</span>}
            {!isDirty && lastSaved && (
              <span className="status-indicator saved">
                Saved {formatDate(lastSaved)}
              </span>
            )}
            <span className="word-count">{wordCount} words</span>
            {wordCount > 0 && (
              <span className="reading-time" title="Estimated reading time">
                📖 {readTime} min read
              </span>
            )}
          </div>
        </div>

        <div className="header-right">
          {/* Layout Mode Selector */}
          <div className="button-group">
            <button
              className={`toolbar-btn ${layoutMode === 'default' ? 'active' : ''}`}
              onClick={() => setLayoutMode('default')}
              aria-label="Default layout"
              title="Default layout"
            >
              📄
            </button>
            <button
              className={`toolbar-btn ${layoutMode === 'full-page' ? 'active' : ''}`}
              onClick={() => setLayoutMode('full-page')}
              aria-label="Full page layout"
              title="Full page layout"
            >
              🖥️
            </button>
            <button
              className={`toolbar-btn ${layoutMode === 'book-like' ? 'active' : ''}`}
              onClick={() => setLayoutMode('book-like')}
              aria-label="Book layout"
              title="Book layout"
            >
              📖
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            className="toolbar-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'auto' : 'dark')}
            aria-label="Toggle theme"
            title={`Current: ${theme}`}
          >
            {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🌓'}
          </button>

          {/* Focus Mode Toggle */}
          <button
            className={`toolbar-btn ${focusMode ? 'active' : ''}`}
            onClick={() => setFocusMode(!focusMode)}
            aria-label="Toggle focus mode"
            title="Focus mode (Cmd+Shift+F)"
          >
            🎯
          </button>

          {/* Publish Button */}
          <button className="btn-primary">
            Publish
          </button>
        </div>
      </header>

      {/* Main Editor */}
      <main className="app-main">
        <EditorView
          articleId={articleId}
          initialContent={initialContent}
          initialTitle={initialTitle}
        />

        {/* Focus Mode Exit Button */}
        {focusMode && (
          <button
            className="exit-focus-btn"
            onClick={() => setFocusMode(false)}
            aria-label="Exit focus mode"
            title="Exit focus mode (Cmd+Shift+F or Esc)"
          >
            <span>✕</span>
            <span className="exit-focus-text">Exit Focus Mode</span>
          </button>
        )}
      </main>

      {/* Keyboard Shortcuts Panel */}
      <KeyboardShortcuts />

      {/* Writing Goals Tracker */}
      <WritingGoals />

      {/* Floating Help Button */}
      <button
        className="floating-help-btn"
        onClick={() => {
          // Trigger keyboard shortcut Cmd+/
          const event = new KeyboardEvent('keydown', {
            key: '/',
            metaKey: true,
            bubbles: true
          });
          window.dispatchEvent(event);
        }}
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts (⌘/)"
      >
        ⌨️
      </button>

      {/* Footer (optional) */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-stats">
            <div className="stat-item" title="Total words">
              <span className="stat-icon">📝</span>
              <span className="stat-value">{wordCount.toLocaleString()}</span>
              <span className="stat-label">words</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item" title="Total characters">
              <span className="stat-icon">🔤</span>
              <span className="stat-value">{characterCount.toLocaleString()}</span>
              <span className="stat-label">characters</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item" title="Estimated reading time">
              <span className="stat-icon">⏱️</span>
              <span className="stat-value">{readTime}</span>
              <span className="stat-label">min read</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item" title="Approximate page count">
              <span className="stat-icon">📄</span>
              <span className="stat-value">{(wordCount / 250).toFixed(1)}</span>
              <span className="stat-label">pages</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

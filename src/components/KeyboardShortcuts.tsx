import React, { useEffect, useState } from 'react';
import './KeyboardShortcuts.css';

interface ShortcutCategory {
  name: string;
  description?: string;
  shortcuts: {
    keys: string[];
    description: string;
  }[];
}

interface FeatureInfo {
  name: string;
  description: string;
  details: string[];
  icon?: string;
}

const editorFeatures: FeatureInfo[] = [
  {
    name: '✨ Slash Commands',
    icon: '/',
    description: 'Quick access to all formatting options',
    details: [
      'Type "/" anywhere to open the quick insert menu',
      'Instantly add headings, lists, code blocks, tables, and more',
      'Use arrow keys (↑↓) to navigate, Enter to select',
      'Fuzzy search: type "/head" to find "Heading 1"',
      'Perfect for fast, distraction-free writing',
    ],
  },
  {
    name: '🎯 Floating Toolbar',
    icon: '✏️',
    description: 'Context-aware formatting menu',
    details: [
      'Select any text to see the floating toolbar',
      'Quick access to Bold, Italic, Underline, Link, and more',
      'Click the link icon or press ⌘K to add/edit links',
      'Toolbar follows your selection for easy access',
      'Automatically positions to stay visible on screen',
    ],
  },
  {
    name: '📊 Writing Goals',
    icon: '🎯',
    description: 'Track your daily writing progress',
    details: [
      'Set daily word count goals to stay motivated',
      'Real-time progress tracking with visual indicator',
      'See word count, character count, and estimated read time',
      'Toggle with ⌘G or from the toolbar',
      'Helps build consistent writing habits',
    ],
  },
  {
    name: '🖼️ Drag & Drop Images',
    icon: '🖼️',
    description: 'Add images instantly',
    details: [
      'Simply drag and drop images into the editor',
      'Supports multiple image formats (PNG, JPG, GIF, WebP)',
      'Images are automatically embedded at cursor position',
      'Click on images to resize or delete them',
      'Or use ⌘⌥I to browse and insert images',
    ],
  },
  {
    name: '🔗 Smart Link Previews',
    icon: '🔗',
    description: 'Beautiful link cards',
    details: [
      'Paste any URL to create a rich preview card',
      'Automatically fetches title, description, and thumbnail',
      'Medium-style preview cards for better presentation',
      'Shows website favicon and domain name',
      'Makes your articles more engaging and professional',
    ],
  },
  {
    name: '🎨 Focus Mode',
    icon: '🎯',
    description: 'Distraction-free writing',
    details: [
      'Press ⌘⇧F to enter immersive writing mode',
      'Hides toolbars and distractions for deep focus',
      'Wider editor for comfortable long-form writing',
      'Exit anytime with ⌘⇧F, Esc, or the exit button',
      'Perfect for uninterrupted creative flow',
    ],
  },
  {
    name: '💾 Auto-Save',
    icon: '💾',
    description: 'Never lose your work',
    details: [
      'Automatically saves your work every few seconds',
      'Save status indicator shows last save time',
      'Manual save with ⌘S anytime',
      'Works offline with local storage',
      'Your drafts are always safe',
    ],
  },
  {
    name: '🌙 Dark Mode',
    icon: '🌙',
    description: 'Easy on the eyes',
    details: [
      'Toggle between light, dark, and auto modes',
      'Press ⌘⇧D to switch themes instantly',
      'Auto mode follows your system preference',
      'Carefully designed colors for comfortable reading',
      'Consistent across all editor elements',
    ],
  },
];

const shortcutCategories: ShortcutCategory[] = [
  {
    name: '✍️ Text Formatting',
    description: 'Make your text stand out',
    shortcuts: [
      { keys: ['⌘', 'B'], description: 'Bold text' },
      { keys: ['⌘', 'I'], description: 'Italic text' },
      { keys: ['⌘', 'U'], description: 'Underline text' },
      { keys: ['⌘', 'K'], description: 'Insert/Edit link' },
      { keys: ['⌘', '⇧', 'X'], description: 'Strikethrough' },
      { keys: ['⌘', 'E'], description: 'Inline code' },
      { keys: ['⌘', '⇧', 'H'], description: 'Highlight text' },
    ],
  },
  {
    name: '📝 Structure & Layout',
    description: 'Organize your content',
    shortcuts: [
      { keys: ['⌘', '⌥', '1'], description: 'Heading 1 (Large)' },
      { keys: ['⌘', '⌥', '2'], description: 'Heading 2 (Medium)' },
      { keys: ['⌘', '⌥', '3'], description: 'Heading 3 (Small)' },
      { keys: ['⌘', '⌥', '0'], description: 'Normal paragraph' },
      { keys: ['⌘', '⇧', '8'], description: 'Bullet list' },
      { keys: ['⌘', '⇧', '7'], description: 'Numbered list' },
      { keys: ['⌘', '⇧', 'B'], description: 'Blockquote' },
    ],
  },
  {
    name: '🎨 Rich Content',
    description: 'Insert media and code',
    shortcuts: [
      { keys: ['⌘', '⌥', 'M'], description: 'Math formula (LaTeX)' },
      { keys: ['⌘', '⌥', 'I'], description: 'Insert image' },
      { keys: ['⌘', '⌥', 'T'], description: 'Insert table' },
      { keys: ['⌘', '⌥', 'C'], description: 'Code block' },
      { keys: ['⌘', '⇧', '-'], description: 'Horizontal divider' },
    ],
  },
  {
    name: '⚙️ Editor Controls',
    description: 'Manage your workspace',
    shortcuts: [
      { keys: ['⌘', 'Z'], description: 'Undo last action' },
      { keys: ['⌘', '⇧', 'Z'], description: 'Redo action' },
      { keys: ['⌘', 'S'], description: 'Save draft' },
      { keys: ['⌘', '⇧', 'D'], description: 'Toggle dark mode' },
      { keys: ['⌘', '⇧', 'F'], description: 'Toggle focus mode' },
      { keys: ['⌘', 'G'], description: 'Toggle writing goals' },
      { keys: ['⌘', '/'], description: 'Show this help panel' },
      { keys: ['Esc'], description: 'Close dialog/menu' },
    ],
  },
];

export const KeyboardShortcuts: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'features' | 'shortcuts'>('features');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle with Cmd+/
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
      // Close with Escape
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div className="shortcuts-overlay" onClick={() => setIsVisible(false)} />
      <div className="shortcuts-panel">
        <div className="shortcuts-header">
          <h2 className="shortcuts-title">📖 Editor Guide</h2>
          <button
            className="shortcuts-close"
            onClick={() => setIsVisible(false)}
            aria-label="Close guide"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="guide-tabs">
          <button
            className={`guide-tab ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            ✨ Features
          </button>
          <button
            className={`guide-tab ${activeTab === 'shortcuts' ? 'active' : ''}`}
            onClick={() => setActiveTab('shortcuts')}
          >
            ⌨️ Shortcuts
          </button>
        </div>

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="guide-content features-content">
            <p className="guide-intro">
              Discover all the powerful features built into this editor to help you write better and faster.
            </p>
            <div className="features-grid">
              {editorFeatures.map((feature) => (
                <div key={feature.name} className="feature-card">
                  <div className="feature-header">
                    <span className="feature-icon">{feature.icon}</span>
                    <h3 className="feature-name">{feature.name}</h3>
                  </div>
                  <p className="feature-description">{feature.description}</p>
                  <ul className="feature-details">
                    {feature.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shortcuts Tab */}
        {activeTab === 'shortcuts' && (
          <div className="guide-content shortcuts-content">
            <p className="guide-intro">
              Master these keyboard shortcuts to speed up your writing workflow.
            </p>
            <div className="shortcuts-grid">
              {shortcutCategories.map((category) => (
                <div key={category.name} className="shortcuts-category">
                  <h3 className="shortcuts-category-name">{category.name}</h3>
                  {category.description && (
                    <p className="shortcuts-category-description">{category.description}</p>
                  )}
                  <div className="shortcuts-list">
                    {category.shortcuts.map((shortcut, index) => (
                      <div key={index} className="shortcut-item">
                        <div className="shortcut-keys">
                          {shortcut.keys.map((key, keyIndex) => (
                            <React.Fragment key={keyIndex}>
                              <kbd className="shortcut-key">{key}</kbd>
                              {keyIndex < shortcut.keys.length - 1 && (
                                <span className="shortcut-plus">+</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <span className="shortcut-description">{shortcut.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="shortcuts-footer">
          <p className="shortcuts-hint">
            Press <kbd className="shortcut-key">⌘</kbd> +{' '}
            <kbd className="shortcut-key">/</kbd> to toggle this panel anytime
          </p>
        </div>
      </div>
    </>
  );
};

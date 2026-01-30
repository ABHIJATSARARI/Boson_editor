import React, { useState, useRef, useEffect } from 'react';
import './InlineLinkEditor.css';

interface InlineLinkEditorProps {
  initialUrl?: string;
  initialText?: string;
  onInsert: (url: string, text?: string) => void;
  onCancel: () => void;
  position: { top: number; left: number };
  mode?: 'insert' | 'edit';
}

export const InlineLinkEditor: React.FC<InlineLinkEditorProps> = ({
  initialUrl = '',
  initialText = '',
  onInsert,
  onCancel,
  // position is not used since we use CSS centering
  mode = 'insert',
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [text, setText] = useState(initialText);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus URL field first
    urlInputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      // If text is empty or same as URL, pass undefined to trigger preview card
      const linkText = text.trim();
      onInsert(url, linkText === '' ? undefined : linkText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return str.startsWith('/') || str.startsWith('#');
    }
  };

  const urlValid = !url || isValidUrl(url);

  return (
    <div className="inline-link-editor">
      <div className="link-editor-header">
        <h3>{mode === 'edit' ? 'Edit Link' : 'Insert Link'}</h3>
        <button
          className="close-btn"
          onClick={onCancel}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="link-editor-content">
          <div className="form-field">
            <label htmlFor="link-url">URL</label>
            <input
              ref={urlInputRef}
              id="link-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com or /page or #section"
              className={`link-input ${!urlValid ? 'invalid' : ''}`}
            />
            {!urlValid && (
              <span className="error-message">Please enter a valid URL</span>
            )}
          </div>

          {mode === 'insert' && (
            <div className="form-field">
              <label htmlFor="link-text">
                Link Text (optional)
                <span style={{ fontSize: '11px', fontWeight: 'normal', marginLeft: '8px', color: 'var(--text-secondary)' }}>
                  - leave empty for preview card
                </span>
              </label>
              <input
                ref={textInputRef}
                id="link-text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Leave empty to create a preview card..."
                className="link-input"
              />
            </div>
          )}

          {url && urlValid && (
            <div className="link-preview">
              <span className="preview-label">Preview:</span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="preview-link"
                onClick={(e) => e.preventDefault()}
              >
                {text || url}
              </a>
            </div>
          )}
        </div>

        <div className="link-editor-footer">
          <div className="keyboard-hint">
            <kbd>⌘ Enter</kbd> to insert • <kbd>Esc</kbd> to cancel
          </div>
          <div className="action-buttons">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!url.trim() || !urlValid}
            >
              {mode === 'edit' ? 'Update Link' : 'Insert Link'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

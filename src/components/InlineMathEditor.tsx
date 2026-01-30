import React, { useState, useRef, useEffect } from 'react';
import './InlineMathEditor.css';

interface InlineMathEditorProps {
  initialContent?: string;
  onInsert: (latex: string) => void;
  onCancel: () => void;
  position: { top: number; left: number };
}

export const InlineMathEditor: React.FC<InlineMathEditorProps> = ({
  initialContent = '',
  onInsert,
  onCancel,
  position,
}) => {
  const [latex, setLatex] = useState(initialContent);
  const [preview, setPreview] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  useEffect(() => {
    // Update preview (simplified - in real implementation, use KaTeX)
    setPreview(latex);
  }, [latex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (latex.trim()) {
      onInsert(latex);
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

  const examples = [
    { label: 'Fraction', value: '\\frac{a}{b}' },
    { label: 'Square root', value: '\\sqrt{x}' },
    { label: 'Sum', value: '\\sum_{i=1}^{n}' },
    { label: 'Integral', value: '\\int_{a}^{b}' },
    { label: 'Greek', value: '\\alpha, \\beta, \\gamma' },
    { label: 'Matrix', value: '\\begin{matrix} a & b \\\\ c & d \\end{matrix}' },
  ];

  return (
    <div
      className="inline-math-editor"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      <div className="math-editor-header">
        <h3>Insert Math Equation</h3>
        <button
          className="close-btn"
          onClick={onCancel}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="math-editor-content">
          <label htmlFor="latex-input">LaTeX Code</label>
          <textarea
            ref={inputRef}
            id="latex-input"
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter LaTeX code... e.g., x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}"
            rows={4}
            className="latex-input"
          />

          <div className="quick-insert">
            <span className="quick-insert-label">Quick insert:</span>
            <div className="quick-insert-buttons">
              {examples.map((example) => (
                <button
                  key={example.label}
                  type="button"
                  className="quick-btn"
                  onClick={() => setLatex(latex + (latex ? ' ' : '') + example.value)}
                  title={example.value}
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>

          {latex && (
            <div className="math-preview">
              <label>Preview</label>
              <div className="preview-box">
                <code>{preview}</code>
              </div>
            </div>
          )}
        </div>

        <div className="math-editor-footer">
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
              disabled={!latex.trim()}
            >
              Insert Equation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

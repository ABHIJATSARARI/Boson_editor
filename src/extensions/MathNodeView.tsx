import React, { useEffect, useRef, useState } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathNodeViewProps extends NodeViewProps {
  // NodeViewProps already includes node, updateAttributes, etc.
}

export const MathNodeView: React.FC<MathNodeViewProps> = (props) => {
  const { node, updateAttributes, selected } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(node.attrs.content);
  const [error, setError] = useState<string | null>(null);
  const renderRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isBlock = node.type.name === 'math_block';

  useEffect(() => {
    if (!isEditing && renderRef.current && content) {
      try {
        katex.render(content, renderRef.current, {
          displayMode: isBlock,
          throwOnError: false,
          errorColor: '#d93025',
        });
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      }
    }
  }, [content, isEditing, isBlock]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    updateAttributes({ content });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(node.attrs.content);
    setIsEditing(false);
  };

  return (
    <NodeViewWrapper
      className={`math-node ${isBlock ? 'block' : 'inline'} ${selected ? 'selected' : ''}`}
    >
      {isEditing ? (
        <div className="math-editor">
          <textarea
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !isBlock) {
                e.preventDefault();
                handleSubmit();
              } else if (e.key === 'Escape') {
                e.preventDefault();
                handleCancel();
              }
            }}
            placeholder="Enter LaTeX equation..."
            rows={isBlock ? 4 : 1}
            className="math-input"
          />
          <div className="math-actions">
            <button onClick={handleSubmit} className="math-btn save">
              Save
            </button>
            <button onClick={handleCancel} className="math-btn cancel">
              Cancel
            </button>
          </div>
          {error && <div className="math-error">{error}</div>}
        </div>
      ) : (
        <div
          ref={renderRef}
          className="math-render"
          onClick={() => setIsEditing(true)}
          onDoubleClick={() => setIsEditing(true)}
          title="Click to edit"
        >
          {!content && <span className="math-placeholder">Click to add LaTeX</span>}
        </div>
      )}
    </NodeViewWrapper>
  );
};

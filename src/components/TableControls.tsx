import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import './TableControls.css';

interface TableControlsProps {
  editor: Editor | null;
}

export const TableControls: React.FC<TableControlsProps> = ({ editor }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor) return;

    const updateControls = () => {
      // Check if cursor is in a table
      const isInTable = editor.isActive('table');

      if (isInTable) {
        setIsVisible(true);
        // Position controls near the cursor or table
        const { selection } = editor.state;
        const coords = editor.view.coordsAtPos(selection.from);
        setPosition({
          top: coords.top - 50,
          left: coords.left,
        });
      } else {
        setIsVisible(false);
      }
    };

    editor.on('selectionUpdate', updateControls);
    editor.on('update', updateControls);

    return () => {
      editor.off('selectionUpdate', updateControls);
      editor.off('update', updateControls);
    };
  }, [editor]);

  if (!isVisible || !editor || !position) return null;

  return (
    <div
      ref={controlsRef}
      className="table-controls"
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
      }}
    >
      <div className="table-controls-group">
        <button
          className="table-control-btn"
          onClick={() => editor.chain().focus().addRowBefore().run()}
          title="Add row above"
          aria-label="Add row above"
        >
          ↑ Row
        </button>
        <button
          className="table-control-btn"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          title="Add row below"
          aria-label="Add row below"
        >
          ↓ Row
        </button>
        <button
          className="table-control-btn"
          onClick={() => editor.chain().focus().deleteRow().run()}
          title="Delete row"
          aria-label="Delete row"
        >
          🗑️ Row
        </button>
      </div>

      <div className="table-controls-divider"></div>

      <div className="table-controls-group">
        <button
          className="table-control-btn"
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          title="Add column left"
          aria-label="Add column left"
        >
          ← Col
        </button>
        <button
          className="table-control-btn"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          title="Add column right"
          aria-label="Add column right"
        >
          → Col
        </button>
        <button
          className="table-control-btn"
          onClick={() => editor.chain().focus().deleteColumn().run()}
          title="Delete column"
          aria-label="Delete column"
        >
          🗑️ Col
        </button>
      </div>

      <div className="table-controls-divider"></div>

      <div className="table-controls-group">
        <button
          className="table-control-btn"
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          title="Toggle header row"
          aria-label="Toggle header row"
        >
          Header
        </button>
        <button
          className="table-control-btn"
          onClick={() => editor.chain().focus().deleteTable().run()}
          title="Delete table"
          aria-label="Delete table"
        >
          🗑️ Table
        </button>
      </div>
    </div>
  );
};

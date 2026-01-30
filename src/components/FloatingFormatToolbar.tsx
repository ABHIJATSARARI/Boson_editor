import React, { useEffect, useState, useRef } from 'react';
import { Editor } from '@tiptap/react';
import { ListMenu } from './ListMenu';
import { getSelectionBoundingRect } from '@/utils/helpers';
import './FloatingFormatToolbar.css';

interface FloatingFormatToolbarProps {
  editor: Editor | null;
  onInsertLink?: () => void;
}

interface FormatButton {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  isActive: () => boolean;
}

export const FloatingFormatToolbar: React.FC<FloatingFormatToolbarProps> = ({ editor, onInsertLink }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const formatButtons: FormatButton[] = [
    {
      id: 'bold',
      label: 'Bold',
      icon: 'B',
      action: () => editor?.chain().focus().toggleBold().run(),
      isActive: () => editor?.isActive('bold') || false,
    },
    {
      id: 'italic',
      label: 'Italic',
      icon: 'I',
      action: () => editor?.chain().focus().toggleItalic().run(),
      isActive: () => editor?.isActive('italic') || false,
    },
    {
      id: 'underline',
      label: 'Underline',
      icon: 'U',
      action: () => editor?.chain().focus().toggleUnderline().run(),
      isActive: () => editor?.isActive('underline') || false,
    },
    {
      id: 'strike',
      label: 'Strikethrough',
      icon: 'S',
      action: () => editor?.chain().focus().toggleStrike().run(),
      isActive: () => editor?.isActive('strike') || false,
    },
    {
      id: 'code',
      label: 'Inline Code',
      icon: '<>',
      action: () => editor?.chain().focus().toggleCode().run(),
      isActive: () => editor?.isActive('code') || false,
    },
    {
      id: 'highlight',
      label: 'Highlight',
      icon: '⬤',
      action: () => editor?.chain().focus().toggleHighlight().run(),
      isActive: () => editor?.isActive('highlight') || false,
    },
    {
      id: 'link',
      label: 'Link',
      icon: '🔗',
      action: () => {
        if (onInsertLink) {
          onInsertLink();
        } else {
          // Fallback to prompt if no custom handler provided
          const previousUrl = editor?.getAttributes('link').href;
          const url = window.prompt('URL', previousUrl);

          if (url === null) return;

          if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
          }

          editor
            ?.chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
        }
      },
      isActive: () => editor?.isActive('link') || false,
    },
  ];

  useEffect(() => {
    if (!editor) return;

    const updateToolbar = () => {
      const { empty } = editor.state.selection;

      if (empty) {
        setIsVisible(false);
        return;
      }

      // Get selection rect
      const rect = getSelectionBoundingRect();
      if (!rect) {
        setIsVisible(false);
        return;
      }

      // Calculate toolbar position (above selection)
      const toolbarWidth = 400; // Approximate width
      const toolbarHeight = 48;
      const spacing = 8;

      let top = rect.top - toolbarHeight - spacing;
      let left = rect.left + rect.width / 2 - toolbarWidth / 2;

      // Ensure toolbar stays within viewport
      if (top < spacing) {
        top = rect.bottom + spacing; // Show below if not enough space above
      }

      if (left < spacing) {
        left = spacing;
      } else if (left + toolbarWidth > window.innerWidth - spacing) {
        left = window.innerWidth - toolbarWidth - spacing;
      }

      setPosition({ top, left });
      setIsVisible(true);
    };

    editor.on('selectionUpdate', updateToolbar);
    editor.on('update', updateToolbar);

    // Also update on scroll
    const handleScroll = () => {
      if (isVisible) {
        updateToolbar();
      }
    };

    window.addEventListener('scroll', handleScroll, true);

    return () => {
      editor.off('selectionUpdate', updateToolbar);
      editor.off('update', updateToolbar);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [editor, isVisible]);

  if (!isVisible || !position || !editor) return null;

  return (
    <div
      ref={toolbarRef}
      className="floating-format-toolbar"
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
      }}
      role="toolbar"
      aria-label="Text formatting"
    >
      <div className="toolbar-content">
        {formatButtons.map((button) => (
          <button
            key={button.id}
            className={`toolbar-btn ${button.isActive() ? 'active' : ''}`}
            onClick={button.action}
            onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
            aria-label={button.label}
            title={button.label}
          >
            <span className="toolbar-icon">{button.icon}</span>
          </button>
        ))}

        <div className="toolbar-divider" />

        {/* List Menu */}
        <ListMenu editor={editor} />
      </div>
    </div>
  );
};

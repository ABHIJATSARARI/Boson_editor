import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import './FloatingInsertButton.css';

interface FloatingInsertButtonProps {
  editor: Editor | null;
  onInsertImage: () => void;
  onInsertTable: () => void;
  onInsertMath: () => void;
  onInsertLink?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  shortcut?: string;
}

export const FloatingInsertButton: React.FC<FloatingInsertButtonProps> = ({
  editor,
  onInsertImage,
  onInsertTable,
  onInsertMath,
  onInsertLink,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Check if cursor is inside a table (to prevent nested tables)
  const isInTable = editor?.isActive('table') ?? false;

  const menuItems: MenuItem[] = [
    {
      id: 'image',
      label: 'Image',
      icon: '🖼️',
      action: () => {
        onInsertImage();
        setIsMenuOpen(false);
      },
      shortcut: 'Ctrl+Shift+I',
    },
    {
      id: 'link',
      label: 'Link',
      icon: '🔗',
      action: () => {
        if (onInsertLink) {
          onInsertLink();
        } else {
          // Fallback: insert placeholder text and link
          editor?.chain().focus().insertContent('Link text').setLink({ href: 'https://' }).run();
        }
        setIsMenuOpen(false);
      },
      shortcut: 'Ctrl+K',
    },
    {
      id: 'table',
      label: 'Table',
      icon: '📊',
      action: () => {
        // Prevent nested tables
        if (!isInTable) {
          onInsertTable();
        }
        setIsMenuOpen(false);
      },
      shortcut: 'Ctrl+Shift+T',
    },
    {
      id: 'heading',
      label: 'Heading',
      icon: 'H',
      action: () => {
        editor?.chain().focus().toggleHeading({ level: 2 }).run();
        setIsMenuOpen(false);
      },
    },
    {
      id: 'quote',
      label: 'Quote',
      icon: '💬',
      action: () => {
        editor?.chain().focus().toggleBlockquote().run();
        setIsMenuOpen(false);
      },
    },
    {
      id: 'code',
      label: 'Code Block',
      icon: '</>',
      action: () => {
        editor?.chain().focus().toggleCodeBlock().run();
        setIsMenuOpen(false);
      },
    },
    {
      id: 'math',
      label: 'LaTeX',
      icon: '∑',
      action: () => {
        onInsertMath();
        setIsMenuOpen(false);
      },
      shortcut: 'Ctrl+Shift+L',
    },
    {
      id: 'divider',
      label: 'Divider',
      icon: '—',
      action: () => {
        editor?.chain().focus().setHorizontalRule().run();
        setIsMenuOpen(false);
      },
    },
    {
      id: 'list',
      label: 'Bullet List',
      icon: '•',
      action: () => {
        setIsMenuOpen(false);
        // Ensure we focus and toggle the list
        editor?.chain().focus().toggleBulletList().run();
      },
    },
    {
      id: 'numbered',
      label: 'Numbered List',
      icon: '1.',
      action: () => {
        setIsMenuOpen(false);
        editor?.chain().focus().toggleOrderedList().run();
      },
    },
  ];

  // Update position when editor content changes
  useEffect(() => {
    if (!editor) return;

    const updatePosition = () => {
      // Show button on empty paragraphs or between blocks
      const { $from } = editor.state.selection;
      const node = $from.parent;

      if (node.type.name === 'paragraph' && node.content.size === 0) {
        // Get DOM position of empty paragraph
        const pos = editor.view.coordsAtPos($from.pos);
        setPosition({
          top: pos.top,
          left: pos.left - 60, // Position to the left of text
        });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    editor.on('selectionUpdate', updatePosition);
    editor.on('update', updatePosition);

    return () => {
      editor.off('selectionUpdate', updatePosition);
      editor.off('update', updatePosition);
    };
  }, [editor]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!isVisible || !position) return null;

  return (
    <div
      className="floating-insert-container"
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
      }}
    >
      <button
        ref={buttonRef}
        className="floating-insert-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Insert content"
        aria-expanded={isMenuOpen}
        title="Insert content (click for options)"
      >
        <span className="insert-icon">+</span>
      </button>

      {isMenuOpen && (
        <div ref={menuRef} className="insert-menu" role="menu">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              className={`insert-menu-item ${item.id === 'table' && isInTable ? 'disabled' : ''}`}
              onClick={item.action}
              role="menuitem"
              tabIndex={0}
              disabled={item.id === 'table' && isInTable}
              style={{ animationDelay: `${index * 30}ms` }}
              title={item.id === 'table' && isInTable ? 'Cannot insert table inside a table' : undefined}
            >
              <span className="menu-item-icon">{item.icon}</span>
              <span className="menu-item-label">{item.label}</span>
              {item.shortcut && (
                <span className="menu-item-shortcut">{item.shortcut}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

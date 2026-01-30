import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tiptap/react';
import './SlashCommands.css';

interface Command {
    id: string;
    title: string;
    description: string;
    icon: string;
    action: (editor: Editor) => void;
    keywords: string[];
}

interface SlashCommandsProps {
    editor: Editor;
    position: { top: number; left: number };
    onClose: () => void;
    query?: string;
}

export const SlashCommands: React.FC<SlashCommandsProps> = ({
    editor,
    position,
    onClose,
    query = '',
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const menuRef = useRef<HTMLDivElement>(null);

    const commands: Command[] = [
        {
            id: 'heading1',
            title: 'Heading 1',
            description: 'Large section heading',
            icon: 'H1',
            keywords: ['h1', 'heading', 'title'],
            action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
            id: 'heading2',
            title: 'Heading 2',
            description: 'Medium section heading',
            icon: 'H2',
            keywords: ['h2', 'heading', 'subtitle'],
            action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
            id: 'heading3',
            title: 'Heading 3',
            description: 'Small section heading',
            icon: 'H3',
            keywords: ['h3', 'heading', 'subheading'],
            action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        },
        {
            id: 'bulletlist',
            title: 'Bullet List',
            description: 'Create a bulleted list',
            icon: '•',
            keywords: ['ul', 'list', 'bullet', 'unordered'],
            action: (editor) => editor.chain().focus().toggleBulletList().run(),
        },
        {
            id: 'numberedlist',
            title: 'Numbered List',
            description: 'Create a numbered list',
            icon: '1.',
            keywords: ['ol', 'list', 'number', 'ordered'],
            action: (editor) => editor.chain().focus().toggleOrderedList().run(),
        },
        {
            id: 'quote',
            title: 'Quote',
            description: 'Insert a blockquote',
            icon: '""',
            keywords: ['quote', 'blockquote', 'citation'],
            action: (editor) => editor.chain().focus().toggleBlockquote().run(),
        },
        {
            id: 'code',
            title: 'Code Block',
            description: 'Insert a code block',
            icon: '</>',
            keywords: ['code', 'codeblock', 'pre', 'monospace'],
            action: (editor) => {
                // @ts-ignore - toggleCodeBlock exists from our custom CodeBlock extension
                editor.chain().focus().toggleCodeBlock().run();
            },
        },
        {
            id: 'divider',
            title: 'Divider',
            description: 'Insert a horizontal line',
            icon: '―',
            keywords: ['hr', 'divider', 'line', 'separator'],
            action: (editor) => editor.chain().focus().setHorizontalRule().run(),
        },
        {
            id: 'table',
            title: 'Table',
            description: 'Insert a table',
            icon: '⊞',
            keywords: ['table', 'grid', 'spreadsheet'],
            action: (editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
        },
        {
            id: 'image',
            title: 'Image',
            description: 'Upload an image',
            icon: '🖼️',
            keywords: ['image', 'img', 'picture', 'photo'],
            action: () => {
                // This will be handled by parent component
                onClose();
            },
        },
    ];

    // Filter commands based on query
    const filteredCommands = query
        ? commands.filter(
            (cmd) =>
                cmd.title.toLowerCase().includes(query.toLowerCase()) ||
                cmd.description.toLowerCase().includes(query.toLowerCase()) ||
                cmd.keywords.some((kw) => kw.includes(query.toLowerCase()))
        )
        : commands;

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredCommands[selectedIndex]) {
                    filteredCommands[selectedIndex].action(editor);
                    onClose();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, filteredCommands, editor, onClose]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    if (filteredCommands.length === 0) {
        return null;
    }

    // Adjust position to keep menu on screen
    let adjustedTop = position.top;
    let adjustedLeft = position.left;

    // Check if menu would go off bottom of screen
    if (position.top + 400 > window.innerHeight) {
        adjustedTop = position.top - 400 - 30; // Show above cursor
    }

    // Check if menu would go off right side of screen
    if (position.left + 320 > window.innerWidth) {
        adjustedLeft = window.innerWidth - 320 - 20;
    }

    // Check if menu would go off left side
    if (adjustedLeft < 20) {
        adjustedLeft = 20;
    }

    return (
        <div
            ref={menuRef}
            className="slash-commands-menu"
            style={{
                top: `${adjustedTop}px`,
                left: `${adjustedLeft}px`,
            }}
        >
            <div className="slash-commands-header">
                {query ? `Results for "${query}"` : 'Basic blocks'}
            </div>
            <div className="slash-commands-list">
                {filteredCommands.map((command, index) => (
                    <button
                        key={command.id}
                        className={`slash-command-item ${index === selectedIndex ? 'selected' : ''}`}
                        onClick={() => {
                            command.action(editor);
                            onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                    >
                        <span className="command-icon">{command.icon}</span>
                        <div className="command-content">
                            <div className="command-title">{command.title}</div>
                            <div className="command-description">{command.description}</div>
                        </div>
                    </button>
                ))}
            </div>
            <div className="slash-commands-footer">
                ↑↓ to navigate • Enter to select • Esc to close
            </div>
        </div>
    );
};

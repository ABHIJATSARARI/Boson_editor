import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import './ListMenu.css';

interface ListMenuProps {
    editor: Editor | null;
}

interface ListOption {
    id: string;
    label: string;
    icon: string;
    action: () => void;
    isActive?: boolean;
}

export const ListMenu: React.FC<ListMenuProps> = ({ editor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const listOptions: ListOption[] = [
        {
            id: 'bullet',
            label: 'Bullet List',
            icon: '•',
            action: () => {
                editor?.chain().focus().toggleBulletList().run();
                setIsOpen(false);
            },
            isActive: editor?.isActive('bulletList'),
        },
        {
            id: 'ordered',
            label: 'Numbered List',
            icon: '1.',
            action: () => {
                editor?.chain().focus().toggleOrderedList().run();
                setIsOpen(false);
            },
            isActive: editor?.isActive('orderedList'),
        },
    ];

    const activeList = listOptions.find(option => option.isActive);

    return (
        <div className="list-menu-container" ref={menuRef}>
            <button
                className={`list-menu-trigger ${activeList ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title="Lists"
            >
                <span className="list-icon">{activeList?.icon || '☰'}</span>
                <span className="list-label">Lists</span>
                <span className="chevron">▼</span>
            </button>

            {isOpen && (
                <div className="list-menu-dropdown">
                    <div className="list-menu-header">Insert List</div>
                    {listOptions.map((option) => (
                        <button
                            key={option.id}
                            className={`list-menu-item ${option.isActive ? 'active' : ''}`}
                            onClick={option.action}
                        >
                            <span className="list-option-icon">{option.icon}</span>
                            <span className="list-option-label">{option.label}</span>
                            {option.isActive && <span className="active-indicator">✓</span>}
                        </button>
                    ))}

                    <div className="list-menu-divider" />

                    <div className="list-menu-hint">
                        <span className="hint-icon">💡</span>
                        <span className="hint-text">Press Enter to continue list</span>
                    </div>
                    <div className="list-menu-hint">
                        <span className="hint-icon">⏎</span>
                        <span className="hint-text">Press Enter twice to exit list</span>
                    </div>
                </div>
            )}
        </div>
    );
};

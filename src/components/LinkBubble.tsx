import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import './LinkBubble.css';

interface LinkBubbleProps {
    editor: Editor | null;
}

export const LinkBubble: React.FC<LinkBubbleProps> = ({ editor }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [linkUrl, setLinkUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editUrl, setEditUrl] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const bubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!editor) return;

        const updateLinkBubble = () => {
            const { from } = editor.state.selection;
            const link = editor.getAttributes('link');

            if (link.href && editor.isActive('link')) {
                // Get the DOM element for the link
                const linkElement = editor.view.domAtPos(from).node as HTMLElement;
                const linkAnchor = linkElement.nodeType === Node.ELEMENT_NODE
                    ? linkElement.querySelector('a') || linkElement.closest('a')
                    : linkElement.parentElement?.closest('a');

                if (linkAnchor) {
                    const rect = linkAnchor.getBoundingClientRect();
                    setPosition({
                        top: rect.bottom + window.scrollY + 8,
                        left: rect.left + window.scrollX + (rect.width / 2),
                    });
                } else {
                    // Fallback to cursor position
                    const coords = editor.view.coordsAtPos(from);
                    setPosition({
                        top: coords.bottom + window.scrollY + 8,
                        left: coords.left + window.scrollX,
                    });
                }

                setLinkUrl(link.href);
                setEditUrl(link.href);
                setIsVisible(true);
                setIsEditing(false);
            } else {
                setIsVisible(false);
                setIsEditing(false);
            }
        };

        editor.on('selectionUpdate', updateLinkBubble);
        editor.on('transaction', updateLinkBubble);
        editor.on('focus', updateLinkBubble);

        return () => {
            editor.off('selectionUpdate', updateLinkBubble);
            editor.off('transaction', updateLinkBubble);
            editor.off('focus', updateLinkBubble);
        };
    }, [editor]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editUrl.trim()) {
            editor?.chain().focus().setLink({ href: editUrl }).run();
        }
        setIsEditing(false);
    };

    const handleRemove = () => {
        editor?.chain().focus().unsetLink().run();
        setIsVisible(false);
    };

    const handleVisit = () => {
        window.open(linkUrl, '_blank', 'noopener,noreferrer');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setEditUrl(linkUrl);
        }
    };

    const getDomain = (url: string) => {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '');
        } catch {
            return url;
        }
    };

    if (!isVisible) return null;

    return (
        <div
            ref={bubbleRef}
            className="link-bubble"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: 'translateX(-50%)',
            }}
        >
            {isEditing ? (
                <div className="link-bubble-edit">
                    <input
                        ref={inputRef}
                        type="text"
                        value={editUrl}
                        onChange={(e) => setEditUrl(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter URL..."
                        className="link-bubble-input"
                    />
                    <button
                        onClick={handleSave}
                        className="link-bubble-btn save"
                        title="Save (Enter)"
                    >
                        ✓
                    </button>
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setEditUrl(linkUrl);
                        }}
                        className="link-bubble-btn cancel"
                        title="Cancel (Esc)"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <div className="link-bubble-preview">
                    <div className="link-bubble-url">
                        <span className="link-icon">🔗</span>
                        <a
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-text"
                            onClick={(e) => e.preventDefault()}
                        >
                            {getDomain(linkUrl)}
                        </a>
                    </div>
                    <div className="link-bubble-actions">
                        <button
                            onClick={handleVisit}
                            className="link-bubble-btn"
                            title="Visit link"
                        >
                            ↗
                        </button>
                        <button
                            onClick={handleEdit}
                            className="link-bubble-btn"
                            title="Edit link"
                        >
                            ✎
                        </button>
                        <button
                            onClick={handleRemove}
                            className="link-bubble-btn remove"
                            title="Remove link"
                        >
                            🗑
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

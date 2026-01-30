import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';

import { CodeBlock } from './CodeBlock';
import { LinkPreview } from './LinkPreview';
import { LinkBubble } from './LinkBubble';
import { SlashCommands } from './SlashCommands';
import { FloatingInsertButton } from './FloatingInsertButton';
import { FloatingFormatToolbar } from './FloatingFormatToolbar';
import { TableControls } from './TableControls';
import { InlineMathEditor } from './InlineMathEditor';
import { InlineLinkEditor } from './InlineLinkEditor';
import { InlineImageUpload } from './InlineImageUpload';
import { MathInline, MathBlock } from '@/extensions/MathExtension';
import { useEditorStore } from '@/stores/editorStore';
import { debounce, countWords, calculateReadTime } from '@/utils/helpers';
import { saveAutosaveDraft } from '@/utils/storage';


import '@/styles/editor.css';
import './EditorView.css';

interface EditorViewProps {
  articleId: string;
  initialContent?: any;
  initialTitle?: string;
}

export const EditorView: React.FC<EditorViewProps> = ({
  articleId,
  initialContent,
  initialTitle = '',
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [showMathEditor, setShowMathEditor] = useState(false);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({
    top: window.innerHeight / 2,
    left: window.innerWidth / 2
  });
  const [selectedTextForLink, setSelectedTextForLink] = useState<string>('');

  // Slash commands state
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [slashQuery, setSlashQuery] = useState('');

  const { layoutMode, setDirty, setWordCount, setCharacterCount, setReadTime } = useEditorStore();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false, // Disable default code block
      }),
      CodeBlock, // Use our custom code block with language selector and copy button
      LinkPreview, // Use link preview cards
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Underline,
      Highlight,
      Placeholder.configure({
        placeholder: 'Tell your story...',
      }),
      Typography,
      MathInline,
      MathBlock,
    ],
    content: initialContent || {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg',
        style: 'outline: none !important;',
      },
      handlePaste(view, event) {
        console.log('PASTE EVENT TRIGGERED');
        // Check if pasted content is a URL
        const text = event.clipboardData?.getData('text/plain')?.trim();
        console.log('Pasted text:', text);
        console.log('Is URL?', text && (text.startsWith('http://') || text.startsWith('https://')));

        if (text && (text.startsWith('http://') || text.startsWith('https://'))) {
          try {
            new URL(text); // Validate URL
            console.log('Valid URL detected, creating preview card');

            // Prevent default paste
            event.preventDefault();

            const { state } = view;

            console.log('Schema nodes:', Object.keys(state.schema.nodes));
            console.log('linkPreview node type:', state.schema.nodes.linkPreview);

            // Create link preview node
            const linkPreviewNode = state.schema.nodes.linkPreview?.create({ href: text });

            if (linkPreviewNode) {
              console.log('LinkPreview node created:', linkPreviewNode);

              // Insert the preview card
              const tr = state.tr.replaceSelectionWith(linkPreviewNode);
              view.dispatch(tr);
              console.log('Preview card inserted!');
              return true;
            } else {
              console.error('Failed to create linkPreview node - node type not found in schema');
            }
          } catch (err) {
            console.log('Not a valid URL:', err);
          }
        }
        console.log('Returning false, using default paste');
        return false;
      },
      handleDrop(view, event) {
        // Handle image drops
        const files = Array.from(event.dataTransfer?.files || []);
        const imageFiles = files.filter((file) => file.type.startsWith('image/'));

        if (imageFiles.length > 0) {
          event.preventDefault();

          imageFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const src = e.target?.result as string;
              if (src) {
                // Get drop position
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });

                if (coordinates) {
                  // Insert image at drop position
                  const node = view.state.schema.nodes.image.create({ src });
                  const transaction = view.state.tr.insert(coordinates.pos, node);
                  view.dispatch(transaction);
                }
              }
            };
            reader.readAsDataURL(file);
          });

          return true;
        }

        return false;
      },
      handleClick(_view, _pos, event) {
        // Check if clicked on a link
        const target = event.target as HTMLElement;
        if (target.tagName === 'A' || target.closest('a')) {
          event.preventDefault();
          // The LinkBubble will handle showing the edit bubble
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      setDirty(true);

      // Update word count, character count, and read time
      const text = editor.getText();
      const words = countWords(text);
      const characters = text.length;
      const readMinutes = calculateReadTime(words);

      setWordCount(words);
      setCharacterCount(characters);
      setReadTime(readMinutes);

      // Check for slash command
      const { selection } = editor.state;
      const { $from } = selection;

      // Get text in current line before cursor
      const textBefore = $from.parent.textBetween(
        Math.max(0, $from.parentOffset - 50),
        $from.parentOffset,
        null,
        '\ufffc'
      );

      const match = textBefore.match(/\/(\w*)$/);

      if (match) {
        // Get cursor position relative to viewport
        const coords = editor.view.coordsAtPos(selection.from);

        setSlashMenuPosition({
          top: coords.bottom + 5, // 5px below cursor
          left: coords.left,
        });
        setSlashQuery(match[1] || '');
        setShowSlashMenu(true);
      } else {
        setShowSlashMenu(false);
      }

      // Autosave
      debouncedSave(editor.getJSON());
    },
    onCreate: ({ editor }) => {
      console.log('Editor created, available node types:', Object.keys(editor.schema.nodes));
      console.log('LinkPreview node exists:', !!editor.schema.nodes.linkPreview);
    },
  });

  // Debounced autosave
  const debouncedSave = debounce((content: any) => {
    saveAutosaveDraft(articleId, title, content);
    useEditorStore.getState().setLastSaved(new Date());
  }, 2000);

  // Save title changes
  useEffect(() => {
    if (title !== initialTitle) {
      setDirty(true);
      debouncedSave(editor?.getJSON());
    }
  }, [title]);

  // Handle image insertion
  const handleInsertImage = () => {
    setDialogPosition({
      top: window.innerHeight / 2,
      left: window.innerWidth / 2
    });
    setShowImageUpload(true);
  };

  const handleImageInsert = async (file: File | null, url?: string, alt?: string) => {
    if (file) {
      // Process and insert file
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        editor?.chain().focus().setImage({ src, alt }).run();
      };
      reader.readAsDataURL(file);
    } else if (url) {
      // Insert from URL
      editor?.chain().focus().setImage({ src: url, alt }).run();
    }
    setShowImageUpload(false);
  };

  // Handle table insertion
  const handleInsertTable = () => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  // Handle LaTeX insertion
  const handleInsertMath = () => {
    setDialogPosition({
      top: window.innerHeight / 2,
      left: window.innerWidth / 2
    });
    setShowMathEditor(true);
  };

  const handleMathInsert = (latex: string) => {
    editor?.chain().focus().insertContent({
      type: 'math_block',
      attrs: { content: latex },
    }).run();
    setShowMathEditor(false);
  };

  // Handle link insertion
  const handleInsertLinkFromToolbar = () => {
    if (!editor) return;

    // Get selected text if any
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, ' ');

    // Get selection coordinates
    const { view } = editor;
    const start = view.coordsAtPos(from);
    const end = view.coordsAtPos(to);

    // Calculate center position below selection
    const centerX = (start.left + end.right) / 2;
    const bottomY = Math.max(start.bottom, end.bottom);

    // Pass center position (InlineLinkEditor will center itself with transform)
    setDialogPosition({
      top: bottomY + 10,
      left: centerX
    });

    setSelectedTextForLink(selectedText);
    setShowLinkEditor(true);
  }; const handleLinkInsert = (url: string, text?: string) => {
    if (!editor) return;

    console.log('handleLinkInsert called with:', { url, text, selectedTextForLink });

    // Check if it's a full URL (for preview card) or just a link
    const isFullUrl = url.startsWith('http://') || url.startsWith('https://');

    // If there's selected text, always create an inline link
    if (selectedTextForLink) {
      console.log('Setting link on selected text');
      editor.chain().focus().setLink({ href: url }).run();
    } else if (isFullUrl && (!text || text === url)) {
      // Insert as preview card for standalone URLs
      console.log('Inserting preview card');
      editor.chain().focus().setLinkPreview({ href: url }).run();
    } else if (text) {
      // Insert new link with text
      console.log('Inserting inline link with text');
      editor.chain().focus().insertContent({
        type: 'text',
        marks: [{ type: 'link', attrs: { href: url } }],
        text: text,
      }).run();
    } else {
      // Fallback: Set link on current selection
      console.log('Setting link on selection (fallback)');
      editor.chain().focus().setLink({ href: url }).run();
    }

    setShowLinkEditor(false);
    setSelectedTextForLink('');
  };

  return (
    <div className={`editor-container layout-${layoutMode}`}>
      <div className="editor-header">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="title-input"
          aria-label="Article title"
        />
      </div>

      <div className="editor-wrapper">
        <EditorContent editor={editor} />

        <FloatingInsertButton
          editor={editor}
          onInsertImage={handleInsertImage}
          onInsertTable={handleInsertTable}
          onInsertMath={handleInsertMath}
          onInsertLink={() => {
            if (editor) {
              // Get cursor position
              const { from } = editor.state.selection;
              const coords = editor.view.coordsAtPos(from);
              setDialogPosition({
                top: coords.bottom + 10,
                left: coords.left - 250
              });
            }
            setShowLinkEditor(true);
          }}
        />

        <FloatingFormatToolbar
          editor={editor}
          onInsertLink={handleInsertLinkFromToolbar}
        />

        <TableControls editor={editor} />

        {/* Slash Commands Menu */}
        {showSlashMenu && editor && (
          <SlashCommands
            editor={editor}
            position={slashMenuPosition}
            query={slashQuery}
            onClose={() => {
              setShowSlashMenu(false);
              // Delete the "/" and query text
              const { selection } = editor.state;
              const { $from } = selection;
              const textBefore = $from.nodeBefore?.text || '';
              const match = textBefore.match(/\/(\w*)$/);
              if (match) {
                const from = selection.from - match[0].length;
                editor.chain().focus().deleteRange({ from, to: selection.from }).run();
              }
            }}
          />
        )}

        {/* Link Bubble - Medium Style Preview */}
        <LinkBubble editor={editor} />
      </div>

      {/* Inline Dialogs */}
      {(showMathEditor || showLinkEditor || showImageUpload) && (
        <div
          className="dialog-backdrop"
          onClick={() => {
            setShowMathEditor(false);
            setShowLinkEditor(false);
            setShowImageUpload(false);
          }}
        />
      )}

      {showMathEditor && (
        <InlineMathEditor
          onInsert={handleMathInsert}
          onCancel={() => setShowMathEditor(false)}
          position={dialogPosition}
        />
      )}

      {showLinkEditor && (
        <InlineLinkEditor
          initialText={selectedTextForLink}
          onInsert={handleLinkInsert}
          onCancel={() => {
            setShowLinkEditor(false);
            setSelectedTextForLink('');
          }}
          position={dialogPosition}
        />
      )}

      {showImageUpload && (
        <InlineImageUpload
          onInsert={handleImageInsert}
          onCancel={() => setShowImageUpload(false)}
          position={dialogPosition}
        />
      )}
    </div>
  );
};

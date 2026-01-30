import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { CodeBlockComponent } from './CodeBlockComponent';

export const CodeBlock = Node.create({
    name: 'codeBlock',

    group: 'block',

    content: 'text*',

    marks: '',

    code: true,

    defining: true,

    addAttributes() {
        return {
            language: {
                default: null,
                parseHTML: (element) => {
                    const classList = element.querySelector('code')?.classList;
                    if (!classList) return null;

                    for (const className of Array.from(classList)) {
                        if (className.startsWith('language-')) {
                            return className.replace('language-', '');
                        }
                    }
                    return null;
                },
                renderHTML: (attributes) => {
                    if (!attributes.language) {
                        return {};
                    }
                    return {
                        class: `language-${attributes.language}`,
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'pre',
                preserveWhitespace: 'full',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'pre',
            mergeAttributes(HTMLAttributes),
            ['code', {}, 0],
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(CodeBlockComponent);
    },

    addCommands() {
        return {
            setCodeBlock:
                (attributes) =>
                    ({ commands }) => {
                        return commands.setNode(this.name, attributes);
                    },
            toggleCodeBlock:
                (attributes) =>
                    ({ commands }) => {
                        return commands.toggleNode(this.name, 'paragraph', attributes);
                    },
        };
    },

    addKeyboardShortcuts() {
        return {
            'Mod-Alt-c': () => this.editor.commands.toggleCodeBlock(),
            Backspace: () => {
                const { empty, $anchor } = this.editor.state.selection;
                const isAtStart = $anchor.pos === 1;

                if (!empty || $anchor.parent.type.name !== this.name) {
                    return false;
                }

                if (isAtStart || !$anchor.parent.textContent.length) {
                    return this.editor.commands.clearNodes();
                }

                return false;
            },
        };
    },
});


import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { LinkPreviewCard } from './LinkPreviewCard';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linkPreview: {
            setLinkPreview: (attributes: { href: string }) => ReturnType;
        };
    }
}

export const LinkPreview = Node.create({
    name: 'linkPreview',

    group: 'block',

    atom: true,

    onCreate() {
        console.log('LinkPreview extension initialized');
    },

    addAttributes() {
        return {
            href: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-link-preview]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, { 'data-link-preview': '' }),
            ['a', { href: HTMLAttributes.href, target: '_blank', rel: 'noopener noreferrer' }, HTMLAttributes.href],
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(LinkPreviewCard);
    },

    addCommands() {
        return {
            setLinkPreview:
                (attributes: { href: string }) =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs: attributes,
                        });
                    },
        };
    },
});

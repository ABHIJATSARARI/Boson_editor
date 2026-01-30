import React, { useState, useEffect } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import './LinkPreviewCard.css';

interface LinkMetadata {
    title?: string;
    description?: string;
    image?: string;
    url: string;
    favicon?: string;
    siteName?: string;
}

export const LinkPreviewCard: React.FC<NodeViewProps> = ({ node, deleteNode }) => {
    const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const url = node.attrs.href;

    console.log('LinkPreviewCard rendered with URL:', url);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                console.log('Fetching metadata for:', url);
                setLoading(true);
                setError(false);

                // Try to fetch Open Graph metadata
                // Note: In production, you'd call your backend API to fetch this
                // For now, we'll create a mock preview based on the URL
                const urlObj = new URL(url);
                const domain = urlObj.hostname.replace('www.', '');

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 500));

                // Mock metadata (in production, fetch from og:tags)
                setMetadata({
                    url,
                    title: `Link to ${domain}`,
                    description: url,
                    siteName: domain,
                    favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
                    image: undefined, // Would come from og:image
                });

                console.log('Metadata set:', {
                    url,
                    title: `Link to ${domain}`,
                    description: url,
                    siteName: domain,
                });

                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch link metadata:', err);
                setError(true);
                setLoading(false);
            }
        };

        if (url) {
            fetchMetadata();
        }
    }, [url]);

    const handleVisit = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleRemove = () => {
        deleteNode();
    };

    const getDomain = (urlString: string) => {
        try {
            const urlObj = new URL(urlString);
            return urlObj.hostname.replace('www.', '');
        } catch {
            return urlString;
        }
    };

    if (loading) {
        return (
            <NodeViewWrapper className="link-preview-card-wrapper">
                <div className="link-preview-card loading">
                    <div className="preview-skeleton">
                        <div className="skeleton-image"></div>
                        <div className="skeleton-content">
                            <div className="skeleton-line skeleton-title"></div>
                            <div className="skeleton-line skeleton-description"></div>
                            <div className="skeleton-line skeleton-url"></div>
                        </div>
                    </div>
                </div>
            </NodeViewWrapper>
        );
    }

    if (error || !metadata) {
        return (
            <NodeViewWrapper className="link-preview-card-wrapper">
                <div className="link-preview-card error">
                    <div className="error-icon">⚠️</div>
                    <div className="error-content">
                        <div className="error-title">Unable to load preview</div>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="error-url">
                            {url}
                        </a>
                    </div>
                    <button className="card-remove-btn" onClick={handleRemove} title="Remove">
                        ✕
                    </button>
                </div>
            </NodeViewWrapper>
        );
    }

    return (
        <NodeViewWrapper className="link-preview-card-wrapper">
            <div className="link-preview-card" onClick={handleVisit}>
                {metadata.image && (
                    <div className="preview-image">
                        <img src={metadata.image} alt={metadata.title} />
                    </div>
                )}

                <div className="preview-content">
                    <div className="preview-header">
                        {metadata.favicon && (
                            <img src={metadata.favicon} alt="" className="preview-favicon" />
                        )}
                        <span className="preview-domain">{getDomain(metadata.url)}</span>
                    </div>

                    {metadata.title && (
                        <h3 className="preview-title">{metadata.title}</h3>
                    )}

                    {metadata.description && (
                        <p className="preview-description">{metadata.description}</p>
                    )}

                    <div className="preview-footer">
                        <span className="preview-url">{metadata.url}</span>
                        <div className="preview-actions">
                            <button
                                className="preview-action-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleVisit();
                                }}
                                title="Open link"
                            >
                                ↗
                            </button>
                            <button
                                className="preview-action-btn remove"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove();
                                }}
                                title="Remove preview"
                            >
                                🗑
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </NodeViewWrapper>
    );
};

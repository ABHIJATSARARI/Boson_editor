import { NodeViewWrapper, NodeViewContent, NodeViewProps } from '@tiptap/react';
import { useState, useEffect, useRef } from 'react';
import './CodeBlockComponent.css';

const LANGUAGES = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'scss', label: 'SCSS' },
    { value: 'json', label: 'JSON' },
    { value: 'xml', label: 'XML' },
    { value: 'yaml', label: 'YAML' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'sql', label: 'SQL' },
    { value: 'bash', label: 'Bash' },
    { value: 'shell', label: 'Shell' },
    { value: 'powershell', label: 'PowerShell' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'dart', label: 'Dart' },
    { value: 'scala', label: 'Scala' },
    { value: 'perl', label: 'Perl' },
    { value: 'lua', label: 'Lua' },
    { value: 'plaintext', label: 'Plain Text' },
];

export const CodeBlockComponent = ({ node, updateAttributes }: NodeViewProps) => {
    const [copied, setCopied] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        if (!showLanguageMenu) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowLanguageMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showLanguageMenu]);

    const handleCopy = async () => {
        const code = node.textContent || '';

        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    const language = node.attrs.language as string | null;
    const selectedLanguage = LANGUAGES.find(lang => lang.value === language);

    return (
        <NodeViewWrapper className="code-block-wrapper">
            <div className="code-block-header">
                <div className="code-block-language-selector" ref={menuRef}>
                    <button
                        className="language-button"
                        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                        title="Select language"
                    >
                        <span className="language-icon">🔤</span>
                        <span className="language-label">
                            {selectedLanguage?.label || 'Plain Text'}
                        </span>
                        <span className="language-chevron">▼</span>
                    </button>

                    {showLanguageMenu && (
                        <div className="language-menu">
                            <div className="language-menu-header">Select Language</div>
                            <div className="language-menu-list">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.value}
                                        className={`language-menu-item ${language === lang.value ? 'active' : ''
                                            }`}
                                        onClick={() => {
                                            // Defer both updates to avoid flushSync warning
                                            setTimeout(() => {
                                                updateAttributes({ language: lang.value });
                                                setShowLanguageMenu(false);
                                            }, 0);
                                        }}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    className="copy-button"
                    onClick={handleCopy}
                    title={copied ? 'Copied!' : 'Copy code'}
                >
                    {copied ? (
                        <>
                            <span className="copy-icon">✓</span>
                            <span className="copy-label">Copied!</span>
                        </>
                    ) : (
                        <>
                            <span className="copy-icon">📋</span>
                            <span className="copy-label">Copy</span>
                        </>
                    )}
                </button>
            </div>

            <pre className={language ? `language-${language}` : ''}>
                <NodeViewContent as="code" />
            </pre>
        </NodeViewWrapper>
    );
};

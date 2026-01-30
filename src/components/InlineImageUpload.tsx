import React, { useState, useRef } from 'react';
import './InlineImageUpload.css';

interface InlineImageUploadProps {
  onInsert: (file: File | null, url?: string, alt?: string) => void;
  onCancel: () => void;
  position: { top: number; left: number };
}

export const InlineImageUpload: React.FC<InlineImageUploadProps> = ({
  onInsert,
  onCancel,
  position,
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [preview, setPreview] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (value && (value.startsWith('http://') || value.startsWith('https://'))) {
      setPreview(value);
    }
  };

  const handleSubmit = () => {
    if (mode === 'upload' && fileInputRef.current?.files?.[0]) {
      onInsert(fileInputRef.current.files[0], undefined, alt);
    } else if (mode === 'url' && url) {
      onInsert(null, url, alt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const isValid = mode === 'upload' ? preview : url.trim();

  return (
    <div
      className="inline-image-upload"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="image-upload-header">
        <h3>Insert Image</h3>
        <button
          className="close-btn"
          onClick={onCancel}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="image-upload-content">
        <div className="mode-selector">
          <button
            type="button"
            className={`mode-btn ${mode === 'upload' ? 'active' : ''}`}
            onClick={() => setMode('upload')}
          >
            📁 Upload
          </button>
          <button
            type="button"
            className={`mode-btn ${mode === 'url' ? 'active' : ''}`}
            onClick={() => setMode('url')}
          >
            🔗 From URL
          </button>
        </div>

        {mode === 'upload' ? (
          <div
            className={`drop-zone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
            {preview ? (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image" />
                <button
                  type="button"
                  className="change-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview('');
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  Change Image
                </button>
              </div>
            ) : (
              <>
                <div className="drop-icon">📸</div>
                <p className="drop-text">
                  <strong>Click to upload</strong> or drag and drop
                </p>
                <p className="drop-hint">
                  PNG, JPG, GIF, WEBP up to 10MB
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="url-input-container">
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="url-input"
              autoFocus
            />
            {preview && (
              <div className="url-preview">
                <img src={preview} alt="Preview" onError={() => setPreview('')} />
              </div>
            )}
          </div>
        )}

        <div className="form-field">
          <label htmlFor="alt-text">Alt Text (Optional)</label>
          <input
            id="alt-text"
            type="text"
            placeholder="Describe the image for accessibility..."
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="alt-input"
          />
          <span className="field-hint">
            Good alt text improves accessibility and SEO
          </span>
        </div>
      </div>

      <div className="image-upload-footer">
        <div className="keyboard-hint">
          <kbd>Esc</kbd> to cancel
        </div>
        <div className="action-buttons">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Insert Image
          </button>
        </div>
      </div>
    </div>
  );
};

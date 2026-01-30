import React, { useEffect, useState } from 'react';
import './AutosaveIndicator.css';

interface AutosaveIndicatorProps {
  isSaving: boolean;
  lastSaved?: Date;
}

export const AutosaveIndicator: React.FC<AutosaveIndicatorProps> = ({
  isSaving,
  lastSaved,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isSaving) {
      setVisible(true);
    } else if (lastSaved) {
      // Show saved state briefly
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, lastSaved]);

  if (!visible) return null;

  return (
    <div className={`autosave-indicator ${isSaving ? 'saving' : 'saved'}`}>
      {isSaving ? (
        <>
          <div className="autosave-spinner" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <svg
            className="autosave-checkmark"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.5 4L6 11.5L2.5 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Saved</span>
        </>
      )}
    </div>
  );
};

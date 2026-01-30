// Type definitions for the editor

export type LayoutMode = 'full-page' | 'book-like' | 'default';

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ImageAttrs {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  srcset?: Array<{ src: string; w: number }>;
}

export interface TableAttrs {
  colwidth?: number[];
}

export interface MathAttrs {
  content: string;
}

export interface EditorState {
  // Theme
  theme: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;

  // Layout
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;

  // Draft management
  isDirty: boolean;
  lastSaved: Date | null;
  setDirty: (dirty: boolean) => void;
  setLastSaved: (date: Date) => void;

  // UI state
  showInsertMenu: boolean;
  insertMenuPosition: { x: number; y: number } | null;
  setShowInsertMenu: (show: boolean, position?: { x: number; y: number } | null) => void;

  showFormatToolbar: boolean;
  formatToolbarPosition: { x: number; y: number; width: number; height: number } | null;
  setShowFormatToolbar: (show: boolean, position?: { x: number; y: number; width: number; height: number } | null) => void;

  // Image editor
  editingImage: string | null;
  setEditingImage: (src: string | null) => void;

  // Word count
  wordCount: number;
  setWordCount: (count: number) => void;

  // Character count
  characterCount: number;
  setCharacterCount: (count: number) => void;

  // Read time
  readTime: number;
  setReadTime: (minutes: number) => void;
}

export interface ArticleData {
  id?: string;
  title: string;
  content: any; // ProseMirror JSON
  updatedAt: string;
}

export interface InsertMenuItem {
  id: string;
  label: string;
  icon: string;
  shortcut?: string;
  action: () => void;
}

export interface FormatOption {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  action: () => void;
}

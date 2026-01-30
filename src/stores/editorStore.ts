import { create } from 'zustand';
import { EditorState, ThemeMode, LayoutMode } from '@/types';

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useEditorStore = create<EditorState>((set) => ({
  // Theme
  theme: 'light', // Default to light theme
  effectiveTheme: 'light',
  setTheme: (theme: ThemeMode) => {
    const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
    set({ theme, effectiveTheme });

    // Update DOM
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${effectiveTheme}`);
  },

  // Layout
  layoutMode: 'default',
  setLayoutMode: (mode: LayoutMode) => set({ layoutMode: mode }),

  // Draft management
  isDirty: false,
  lastSaved: null,
  setDirty: (dirty: boolean) => set({ isDirty: dirty }),
  setLastSaved: (date: Date) => set({ lastSaved: date, isDirty: false }),

  // UI state
  showInsertMenu: false,
  insertMenuPosition: null,
  setShowInsertMenu: (show: boolean, position = null) =>
    set({ showInsertMenu: show, insertMenuPosition: position }),

  showFormatToolbar: false,
  formatToolbarPosition: null,
  setShowFormatToolbar: (show: boolean, position = null) =>
    set({ showFormatToolbar: show, formatToolbarPosition: position }),

  // Image editor
  editingImage: null,
  setEditingImage: (src: string | null) => set({ editingImage: src }),

  // Word count
  wordCount: 0,
  setWordCount: (count: number) => set({ wordCount: count }),

  // Character count
  characterCount: 0,
  setCharacterCount: (count: number) => set({ characterCount: count }),

  // Read time
  readTime: 1,
  setReadTime: (minutes: number) => set({ readTime: minutes }),
}));

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const state = useEditorStore.getState();
    if (state.theme === 'auto') {
      const effectiveTheme = e.matches ? 'dark' : 'light';
      useEditorStore.setState({ effectiveTheme });
      document.documentElement.classList.remove('theme-light', 'theme-dark');
      document.documentElement.classList.add(`theme-${effectiveTheme}`);
    }
  });
}

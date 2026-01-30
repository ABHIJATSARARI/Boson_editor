/**
 * BosonBrain Editor - A feature-rich rich text editor
 * 
 * @packageDocumentation
 */

// Main Editor Component
export { default as BosonBrainEditor } from './App';

// Stores
export { useEditorStore } from './stores/editorStore';

// Types
export type { 
  EditorState, 
  ThemeMode, 
  LayoutMode,
  ImageAttrs,
  TableAttrs,
  MathAttrs
} from './types';

// Utils
export * from './utils/storage';
export * from './utils/imageUtils';
export * from './utils/helpers';

// Styles - Users need to import this separately in their app
// import '@bosonbrain/editor/styles';

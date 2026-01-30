/**
 * With State Management Example
 * 
 * How to access and control editor state programmatically
 */

import { BosonBrainEditor, useEditorStore } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function EditorControls() {
  const {
    theme,
    setTheme,
    focusMode,
    setFocusMode,
    layoutMode,
    setLayoutMode,
    wordCount,
    characterCount,
    readingTime,
    goalEnabled,
    setGoalEnabled,
    goalTarget,
    setGoalTarget,
  } = useEditorStore();

  return (
    <div className="editor-controls">
      <div className="control-group">
        <h3>Theme</h3>
        <button onClick={() => setTheme('light')}>Light</button>
        <button onClick={() => setTheme('dark')}>Dark</button>
        <button onClick={() => setTheme('auto')}>Auto</button>
        <span>Current: {theme}</span>
      </div>

      <div className="control-group">
        <h3>Layout</h3>
        <button onClick={() => setLayoutMode('default')}>Default</button>
        <button onClick={() => setLayoutMode('full-page')}>Full Page</button>
        <button onClick={() => setLayoutMode('book-like')}>Book-like</button>
        <span>Current: {layoutMode}</span>
      </div>

      <div className="control-group">
        <h3>Focus Mode</h3>
        <button onClick={() => setFocusMode(!focusMode)}>
          {focusMode ? 'Exit' : 'Enter'} Focus Mode
        </button>
      </div>

      <div className="control-group">
        <h3>Statistics</h3>
        <p>Words: {wordCount}</p>
        <p>Characters: {characterCount}</p>
        <p>Reading time: {readingTime} min</p>
      </div>

      <div className="control-group">
        <h3>Writing Goal</h3>
        <button onClick={() => setGoalEnabled(!goalEnabled)}>
          {goalEnabled ? 'Disable' : 'Enable'} Goal
        </button>
        {goalEnabled && (
          <input
            type="number"
            value={goalTarget}
            onChange={(e) => setGoalTarget(Number(e.target.value))}
            min="100"
            max="10000"
            step="100"
          />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-with-controls">
      <aside className="sidebar">
        <EditorControls />
      </aside>
      <main className="editor-container">
        <BosonBrainEditor />
      </main>
    </div>
  );
}

export default App;

/**
 * Add this CSS:
 * 
 * .app-with-controls {
 *   display: flex;
 *   width: 100vw;
 *   height: 100vh;
 * }
 * 
 * .sidebar {
 *   width: 300px;
 *   padding: 2rem;
 *   background: #f8f9fa;
 *   border-right: 1px solid #e0e0e0;
 *   overflow-y: auto;
 * }
 * 
 * .editor-container {
 *   flex: 1;
 * }
 * 
 * .control-group {
 *   margin-bottom: 2rem;
 * }
 * 
 * .control-group h3 {
 *   margin-bottom: 0.5rem;
 * }
 * 
 * .control-group button {
 *   margin-right: 0.5rem;
 *   margin-bottom: 0.5rem;
 *   padding: 0.5rem 1rem;
 *   border: 1px solid #ddd;
 *   border-radius: 4px;
 *   background: white;
 *   cursor: pointer;
 * }
 * 
 * .control-group button:hover {
 *   background: #f0f0f0;
 * }
 */

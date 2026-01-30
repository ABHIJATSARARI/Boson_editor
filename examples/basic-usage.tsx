/**
 * Basic Usage Example
 * 
 * The simplest way to use BosonBrain Editor
 */

import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

function App() {
  return (
    <div className="app">
      <BosonBrainEditor />
    </div>
  );
}

export default App;

/**
 * Add this to your index.css or App.css:
 * 
 * .app {
 *   width: 100vw;
 *   height: 100vh;
 *   overflow: hidden;
 * }
 */

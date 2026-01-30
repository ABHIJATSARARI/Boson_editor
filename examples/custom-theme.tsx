/**
 * Custom Theme Example
 * 
 * How to customize the editor theme using CSS variables
 */

import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';
import './custom-theme.css';

function App() {
  return (
    <div className="custom-themed-app">
      <BosonBrainEditor />
    </div>
  );
}

export default App;

/**
 * Create custom-theme.css:
 * 
 * .custom-themed-app {
 *   width: 100vw;
 *   height: 100vh;
 *   
 *   // Override theme variables
 *   --accent-color: #ff6b6b;
 *   --bg-primary: #fff8f0;
 *   --bg-secondary: #ffe8d6;
 *   --text-primary: #2d3748;
 *   --text-secondary: #718096;
 *   --border-color: #ffd4b8;
 *   
 *   // Custom fonts
 *   --font-family: 'Georgia', serif;
 *   --font-size-base: 18px;
 *   --line-height-base: 1.8;
 *   
 *   // Custom spacing
 *   --spacing-xl: 3rem;
 *   
 *   // Custom border radius
 *   --radius-lg: 20px;
 * }
 * 
 * // Dark theme override
 * .custom-themed-app.theme-dark {
 *   --bg-primary: #1a1a2e;
 *   --bg-secondary: #16213e;
 *   --text-primary: #eee;
 *   --text-secondary: #a0aec0;
 *   --border-color: #2d3748;
 * }
 */

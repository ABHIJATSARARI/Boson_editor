/**
 * Next.js Integration Example
 * 
 * How to use BosonBrain Editor in a Next.js App Router application
 */

'use client';

import { BosonBrainEditor } from '@bosonbrain/editor';
import '@bosonbrain/editor/styles';

export default function EditorPage() {
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <BosonBrainEditor />
    </main>
  );
}

/**
 * Important Notes for Next.js:
 * 
 * 1. Add 'use client' directive (editor uses React hooks)
 * 2. Import styles in your layout.tsx or page.tsx
 * 3. The editor works with both Pages Router and App Router
 * 
 * For Pages Router, wrap in a dynamic import:
 * 
 * import dynamic from 'next/dynamic';
 * 
 * const Editor = dynamic(
 *   () => import('@bosonbrain/editor').then(mod => ({ default: mod.BosonBrainEditor })),
 *   { ssr: false }
 * );
 * 
 * export default function Page() {
 *   return <Editor />;
 * }
 */

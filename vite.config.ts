import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isLibMode = mode === 'production';
  const isGitHubPages = mode === 'ghpages';

  return {
    // Base path for GitHub Pages - matches repo name
    base: isGitHubPages ? '/Boson_editor/' : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    build: (isLibMode && !isGitHubPages)
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'BosonBrainEditor',
            formats: ['es', 'umd'],
            fileName: (format) => `bosonbrain-editor.${format}.js`,
          },
          rollupOptions: {
            // Externalize deps that shouldn't be bundled
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
              // Global vars for UMD build
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'jsxRuntime',
              },
              assetFileNames: (assetInfo) => {
                if (assetInfo.name === 'style.css') return 'style.css';
                return assetInfo.name || '';
              },
            },
          },
          cssCodeSplit: false,
          sourcemap: true,
          // Ensure proper output for library
          emptyOutDir: true,
        }
      : {
          // Regular app build
          outDir: 'dist',
          sourcemap: true,
        },
  };
});

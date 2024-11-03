import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  // Conditional base path for production vs. development
  base: '/react-app-test-crud-api-app',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 8192, // Set limit to 8 KB
  },
  plugins: [react()],
  resolve: {
    alias: {
      global: 'globalThis',
    },
  },
  define: {
    global: 'globalThis', // or `window`
  },
});

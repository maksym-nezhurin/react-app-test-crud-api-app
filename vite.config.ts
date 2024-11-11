// @ts-nocheck
import 'dotenv/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';  // Assuming you're using SWC for React.

const apiURL = process.env.VITE_API_URL;

export default defineConfig({
  // Use a base path for production environments, applied conditionally.
  base: '/react-app-test-crud-api-app',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 8192,  // Inline smaller assets to reduce request counts.
  },

  plugins: [
    react()
  ],

  resolve: {
    alias: {
      global: 'globalThis',  // Resolve 'global' to 'globalThis', providing consistency.
    },
  },

  define: {
    global: 'globalThis',  // Define 'global' as 'globalThis' to avoid issues in modules that rely on it.
  },

  server: {
    proxy: {
      // Proxying requests to your API and uploads without rewriting the URL path.
      '/uploads': {
        target: apiURL,  // Point to your backend server.
        changeOrigin: true,
        secure: false,
        rewrite: path => path  // Retain the full path as received.
      },
      // You can add more proxies here if needed.
    }
  }
});

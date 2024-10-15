import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  // Conditional base path for production vs. development
  base: '/',
  build: {
    outDir: 'dist'
  },
  plugins: [react()],
});

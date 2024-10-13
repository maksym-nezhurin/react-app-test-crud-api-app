import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  // Conditional base path for production vs. development
  base: '/react-app-test-crud-api-app/'
  // base: import.meta.env.VITE_NODE_ENV === 'production' 
  //   ? '/react-app-test-crud-api-app/' 
  //   : '/',
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
});

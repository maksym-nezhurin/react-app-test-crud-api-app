import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Conditional base path for production vs. development
  base: '/react-app-test-crud-api-app/'
  // base: import.meta.env.VITE_NODE_ENV === 'production' 
  //   ? '/react-app-test-crud-api-app/' 
  //   : '/',
});

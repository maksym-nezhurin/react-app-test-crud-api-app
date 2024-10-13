import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/react-app-test-crud-api-app/' : '/',
  // 'process.env': {},
  // build: {
  //   outDir: 'dist',
  // },
  plugins: [react()],
})

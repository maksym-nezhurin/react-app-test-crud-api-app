import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-app-test-crud-api-app/',  // Replace with your GitHub repository name
  // 'process.env': {},
  // build: {
  //   outDir: 'dist',
  // },
  plugins: [react()],
})

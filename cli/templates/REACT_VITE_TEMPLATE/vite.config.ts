import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
      'core': path.resolve(__dirname, '../../core'),
      'package': path.resolve(__dirname, '../../package'),
    }
  },
  css: {
    devSourcemap: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
})

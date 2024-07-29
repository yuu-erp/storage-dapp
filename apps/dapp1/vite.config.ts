import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  env.PLATFORM = process.platform
  return defineConfig({
    base: './',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@package': path.resolve(__dirname, '../../package'),
        '@core': path.resolve(__dirname, '../../core')
      }
    },
    server: {
      port: 3000
    },
    define: {
      'process.env': env
    }
  })
}

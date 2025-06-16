// https://vite.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Emulate __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@router': path.resolve(__dirname, './src/router'),
      '@providers': path.resolve(__dirname, './src/providers'),
    },
  },
  server: {
    host: true,
    allowedHosts: ['.ngrok-free.app'],
    hmr: true,
    watch: {
      usePolling: true,
      },
  }

})
// This configuration file sets up a Vite project with React and Tailwind CSS.
// It imports necessary plugins and exports a configuration object that includes these plugins.
// The `react` plugin enables React support, while the `tailwindcss` plugin integrates Tailwind CSS for styling.
// The `defineConfig` function is used to define the configuration, which can be extended with additional options as needed.
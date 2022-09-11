import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import vitePluginEslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './', 'src')
    }
  },
  plugins: [
    react(),
    vitePluginEslint({
      failOnError: false
    })
  ]
})

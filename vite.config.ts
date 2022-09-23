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
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { '@primary-color': 'rgb(0,82,240)', '@font-size': '16px' },
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    react(),
    vitePluginEslint({
      failOnError: false
    })
  ]
})

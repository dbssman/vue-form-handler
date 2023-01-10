/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.vitest': false,
  },
  test: {
    includeSource: ['test/*'],
    environment: 'happy-dom',
    reporters: 'verbose',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueFormHandler',
      fileName: 'vue-form-handler',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ]
})

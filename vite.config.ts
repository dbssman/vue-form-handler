/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    'import.meta.vitest': false,
  },
  root: mode === 'development' ? 'playground' : '',
  test: {
    includeSource: ['test/*'],
    environment: 'happy-dom',
    reporters: 'verbose',
  },
  build: {
    sourcemap: true,
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-form-handler',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['@vue/runtime-core'],
      output: {
        globals: {
          '@vue/runtime-core': 'VueRuntimeCore'
        },
        sourcemapExcludeSources: true,
      }
    }
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ]
}))

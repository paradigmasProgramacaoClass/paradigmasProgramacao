import { defineConfig } from 'vite'
import path from 'node:path'

// Config separado do Vite (build) — o Vitest não deve subir o plugin do Tailwind.
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.js'],
    // E2E é do Playwright — o Vitest não deve tentar rodar .spec.js
    exclude: ['tests/playwright/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/models/**', 'src/services/**'],
    },
  },
})

import { defineConfig, devices } from '@playwright/test'
import { loadEnv } from 'vite'

// Carrega .env.test (gitignored) sem depender de dotenv
const env = loadEnv('test', process.cwd(), '')
const BASE_URL = process.env.E2E_BASE_URL || env.E2E_BASE_URL || 'http://localhost:5173'

export default defineConfig({
  testDir: './tests/playwright',
  // Fluxo é stateful (cria/edita/conclui dados reais) -> serial, 1 worker
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'tests/playwright-report' }],
  ],
  timeout: 90_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
})

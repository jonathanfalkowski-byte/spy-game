import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  testMatch: ['opening-coverage-first.spec.ts', 'opening-cinematic.spec.ts', 'opening-arrival-regression.spec.ts'],
  outputDir: './test-results-opening-coverage',
  workers: 1,
  timeout: 120000,
  use: { baseURL: 'http://127.0.0.1:4185', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run preview -- --port 4185 --strictPort',
    url: 'http://127.0.0.1:4185',
    reuseExistingServer: false,
    timeout: 30000,
  },
});

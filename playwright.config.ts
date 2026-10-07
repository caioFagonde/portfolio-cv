import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.SITE_URL ?? 'http://127.0.0.1:4321';
const reportName = process.argv.some((argument) => argument.includes('a11y.spec')) ? 'a11y' : 'e2e';

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: {
    timeout: 8_000
  },
  fullyParallel: true,
  reporter: [
    ['list'],
    ['json', { outputFile: `artifacts/reports/${reportName}-report.json` }],
    ['html', { outputFolder: `artifacts/reports/${reportName}-html`, open: 'never' }]
  ],
  outputDir: 'artifacts/reports/playwright-results',
  use: {
    baseURL,
    trace: 'retain-on-failure'
  },
  webServer: process.env.SITE_URL
    ? undefined
    : {
        command: 'pnpm exec astro dev --host 127.0.0.1 --port 4321',
        url: baseURL,
        reuseExistingServer: false,
        timeout: 120_000
      },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});

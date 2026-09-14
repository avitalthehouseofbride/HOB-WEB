import { defineConfig, devices } from '@playwright/test';

const port = 4321;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    locale: 'he-IL',
    timezoneId: 'Asia/Jerusalem',
    // The cloud sandbox ships its own Chromium; CI installs the matching Playwright build.
    launchOptions: process.env.PW_CHROMIUM_PATH
      ? { executablePath: process.env.PW_CHROMIUM_PATH }
      : {},
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: `pnpm build && node scripts/serve-dist.mjs ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

/**
 * Capture pages at mobile and desktop widths so they can be reviewed from the cloud.
 * Usage: pnpm screenshots [--base http://127.0.0.1:4321] [--out .screenshots] / /netanya ...
 * Requires a server on the base URL, e.g. `pnpm build && node scripts/serve-dist.mjs`.
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const base = opt('base', process.env.SCREENSHOT_BASE ?? 'http://127.0.0.1:4321');
const out = opt('out', process.env.SCREENSHOT_DIR ?? '.screenshots');
const urls = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
const targets = urls.length ? urls : ['/'];
const widths = [390, 1280];

await mkdir(out, { recursive: true });
const browser = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
);
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 600 ? 844 : 800 },
    deviceScaleFactor: 1,
    locale: 'he-IL',
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  for (const url of targets) {
    await page.goto(new URL(url, base).toString(), { waitUntil: 'networkidle' });
    const name = (url.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home') + `-${width}.png`;
    await page.screenshot({ path: path.join(out, name), fullPage: true });
    console.log(`saved ${path.join(out, name)}`);
  }
  await context.close();
}
await browser.close();

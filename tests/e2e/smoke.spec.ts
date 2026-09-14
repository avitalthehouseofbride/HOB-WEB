import { expect, test } from '@playwright/test';

const pages = ['/', '/netanya', '/shoresh', '/en/'];

for (const path of pages) {
  test(`renders ${path} without horizontal overflow`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow, 'page must not scroll horizontally').toBe(false);
  });
}

test('Hebrew pages are RTL, English page is LTR', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'he');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

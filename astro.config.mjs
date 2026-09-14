// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Public pages are prerendered. Only routes that opt out with
// `export const prerender = false` (availability API, inquiry, admin) run on Vercel.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://thehouseofbrides.co.il',
  output: 'static',
  adapter: vercel(),
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/admin') })],
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});

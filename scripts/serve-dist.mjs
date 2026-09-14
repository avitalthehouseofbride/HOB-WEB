// Minimal static server for the built site (dist/). Used by Playwright and screenshots
// because `astro dev` runs as a background daemon and `astro preview` is not supported by
// the Vercel adapter. Usage: node scripts/serve-dist.mjs [port]
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const port = Number(process.argv[2] ?? process.env.PORT ?? 4321);
const root = path.resolve('dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

const resolve = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const candidates = [clean, `${clean}/index.html`, `${clean}.html`].map((c) => path.join(root, c));
  for (const c of candidates) {
    if (c.startsWith(root) && existsSync(c) && statSync(c).isFile()) return c;
  }
  return path.join(root, '404.html');
};

createServer((req, res) => {
  const file = resolve(req.url ?? '/');
  const status = file.endsWith('404.html') && !(req.url ?? '').includes('404') ? 404 : 200;
  res.writeHead(status, {
    'content-type': types[path.extname(file)] ?? 'application/octet-stream',
  });
  createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`serving ${root} at http://127.0.0.1:${port}`));

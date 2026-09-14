// Fails CI if any committed source image is larger than the web-master budget.
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = 'src/assets/images';
const limit = 800 * 1024;
const offenders = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(jpe?g|png|webp|avif)$/i.test(entry.name) && statSync(p).size > limit)
      offenders.push(p);
  }
};
try {
  walk(root);
} catch {
  /* no images yet */
}
if (offenders.length) {
  console.error(
    `Images over ${limit / 1024} KB (resize before committing):\n` + offenders.join('\n'),
  );
  process.exit(1);
}
console.log('image sizes ok');

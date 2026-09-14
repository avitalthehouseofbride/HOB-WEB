// Generates the brand SVGs from the hand-drawn logo paths (src/assets/brand/logo-paths.json).
// Text in the lock-ups is converted to outlines with opentype.js so no font is needed at render time.
// Usage: node scripts/build-logo.mjs   (needs opentype.js + @fontsource/frank-ruhl-libre resolvable; see TOOLS env)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const tools = process.env.TOOLS ?? process.cwd();
const require = createRequire(path.join(tools, 'package.json'));
const opentype = require('opentype.js');
const fontFile =
  require.resolve('@fontsource/frank-ruhl-libre/files/frank-ruhl-libre-latin-400-normal.woff');

const paths = JSON.parse(readFileSync('src/assets/brand/logo-paths.json', 'utf8'));
const out = 'src/assets/brand';
mkdirSync(out, { recursive: true });

// The mark's drawing occupies x 55..800, y 315..665 in the original 915x900 canvas.
const VB = { x: 50, y: 300, w: 750, h: 375 };
const markGroup = (
  extra = '',
) => `  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${extra}>
    <path id="line" stroke-width="${paths.widths.line}" d="${paths.line}"/>
    <path id="roof" stroke-width="${paths.widths.roof}" d="${paths.roof}"/>
    <path id="chimney" stroke-width="${paths.widths.chimney}" d="${paths.chimney}"/>
    <circle id="knob" stroke-width="${paths.widths.knob}" cx="${paths.knob.cx}" cy="${paths.knob.cy}" r="${paths.knob.r}"/>
  </g>`;

// 1. Mark alone, transparent, currentColor.
// pathLength="1" lets CSS animate the drawing with a 0..1 dash offset (see .logo-draw in global.css).
writeFileSync(
  path.join(out, 'logo-mark.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB.x} ${VB.y} ${VB.w} ${VB.h}" role="img" aria-label="The House Of Brides">
${markGroup().replace(/<(path|circle) /g, '<$1 pathLength="1" ')}
</svg>
`,
);

// 2. Wordmark outlines.
const fontBuf = readFileSync(fontFile);
const font = opentype.parse(
  fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength),
);
const text = 'The House Of Brides';
const size = 96;
const tracking = 0.06; // em
// Lay glyphs out by hand (advance + kerning + tracking): opentype.js 2.0 cannot run this font's GSUB features.
const scale = size / font.unitsPerEm;
const tp = new opentype.Path();
let x = 0;
let prev = null;
for (const ch of text) {
  const g = font.charToGlyph(ch);
  if (prev) x += font.getKerningValue(prev, g) * scale;
  const gp = g.getPath(x, 0, size);
  tp.commands.push(...gp.commands);
  x += g.advanceWidth * scale + tracking * size;
  prev = g;
}
const bb = tp.getBoundingBox();
const textW = bb.x2 - bb.x1;
const textH = bb.y2 - bb.y1;
const textD = tp.toPathData(2);

// 3. Stacked lock-up: mark above wordmark, centred.
{
  const markW = VB.w,
    markH = VB.h;
  const gap = 60;
  const W = Math.max(markW, textW) + 80;
  const H = markH + gap + textH + 80;
  const mx = (W - markW) / 2 - VB.x;
  const my = 40 - VB.y;
  const tx = (W - textW) / 2 - bb.x1;
  const ty = 40 + markH + gap - bb.y1;
  writeFileSync(
    path.join(out, 'logo-stacked.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" role="img" aria-label="The House Of Brides">
  <g transform="translate(${mx.toFixed(1)} ${my.toFixed(1)})">
${markGroup()}
  </g>
  <path fill="currentColor" transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)})" d="${textD}"/>
</svg>
`,
  );
}

// 4. Horizontal lock-up: small mark on the start side, wordmark beside it (works in RTL and LTR: it is one image).
{
  const scale = 0.32;
  const markW = VB.w * scale,
    markH = VB.h * scale;
  const gap = 28;
  const W = markW + gap + textW + 24;
  const H = Math.max(markH, textH) + 24;
  const tx = markW + gap + 12 - bb.x1;
  const ty = (H - textH) / 2 - bb.y1;
  writeFileSync(
    path.join(out, 'logo-horizontal.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" role="img" aria-label="The House Of Brides">
  <g transform="translate(12 ${((H - markH) / 2).toFixed(1)}) scale(${scale}) translate(${-VB.x} ${-VB.y})">
${markGroup()}
  </g>
  <path fill="currentColor" transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)})" d="${textD}"/>
</svg>
`,
  );
}

// 5. Favicon: mark on cream, cropped to the house only for legibility at 16-32px.
writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="290 300 420 375">
  <rect x="290" y="300" width="420" height="375" fill="#fbf3f0"/>
  <g color="#3b2a21">
${markGroup().replace(/stroke-width="(\d+)"/g, (m, w) => `stroke-width="${Math.round(Number(w) * 2.2)}"`)}
  </g>
</svg>
`,
);
console.log(
  'brand assets written: logo-mark.svg, logo-stacked.svg, logo-horizontal.svg, public/favicon.svg',
  { textW: textW.toFixed(0), textH: textH.toFixed(0) },
);

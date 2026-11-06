// Downloads Bluenxt's own images from the live bluenxt.ai site into public/brand/,
// so the new website hosts them itself. Run once:  npm run fetch-brand-assets
// (Needs Node 18+ and an internet connection. Safe to run again.)
import { mkdir, writeFile, stat } from 'node:fs/promises';

const ASSETS = {
  'hero-visual.png': 'hero-visual-BlYRseKS.png',
  'case-study-1.jpg': 'case-study-1-BtNQAlg3.jpg',
  'case-study-2.jpg': 'case-study-2-DtUhrQwH.jpg',
  'case-study-3.jpg': 'case-study-3-YW4uIZRK.jpg',
  'thought-leadership-1.jpg': 'thought-leadership-1-8HpqVWai.jpg',
  'thought-leadership-2.jpg': 'thought-leadership-2-DENbimNu.jpg',
  'podcast-1.jpg': 'podcast-1-gP3XB4KQ.jpg',
  'about-ai-bg.png': 'about-ai-bg-C5V3cdFh.png',
  'blue-book.jpg': 'blue-book-DLfPj9sc.jpg',
  'ai-agents.jpg': 'ai-agents-Y9sNnutI.jpg',
};

await mkdir('public/brand', { recursive: true });
let ok = 0;
for (const [local, remote] of Object.entries(ASSETS)) {
  const url = `https://bluenxt.ai/assets/${remote}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(`public/brand/${local}`, buf);
    const { size } = await stat(`public/brand/${local}`);
    console.log(`  saved  public/brand/${local}  (${Math.round(size / 1024)} KB)`);
    ok++;
  } catch (e) {
    console.log(`  FAILED ${local}  <-  ${url}  (${e.message})`);
  }
}
console.log(`\n${ok}/${Object.keys(ASSETS).length} images saved to public/brand/`);

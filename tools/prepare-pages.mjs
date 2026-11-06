// Prepares the built site (dist/) for GitHub Pages, which has no server rewrites.
//  - Every route in public/sitemap.xml gets its own HTML file (e.g. dist/academy.html
//    and dist/academy/index.html), so direct visits and refreshes load with a normal
//    200 status instead of GitHub's 404 page. The app then shows the right page.
//  - dist/404.html catches any other address and loads the app (it shows the site's 404).
//  - The founders' cards are also published as dist/manish.html and dist/sneha.html,
//    so /manish and /sneha open without a trailing slash or index.html.
//  - dist/.nojekyll tells GitHub not to run Jekyll over the files.
// Run automatically by `npm run build:pages`.
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const DIST = 'dist';
const CARDS = ['manish', 'sneha'];
const shell = readFileSync(join(DIST, 'index.html'), 'utf8');

const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)]
  .map((m) => m[1].replace(/\/$/, ''))
  .filter((p) => p && !CARDS.includes(p.slice(1)));

let count = 0;
for (const p of paths) {
  const flat = join(DIST, `${p}.html`);
  const nested = join(DIST, p, 'index.html');
  for (const file of [flat, nested]) {
    if (existsSync(file)) continue;
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, shell);
    count++;
  }
}

writeFileSync(join(DIST, '404.html'), shell);
for (const card of CARDS) {
  const src = join(DIST, card, 'index.html');
  if (existsSync(src)) copyFileSync(src, join(DIST, `${card}.html`));
}
writeFileSync(join(DIST, '.nojekyll'), '');

console.log(`GitHub Pages: ${paths.length} routes prepared (${count} files), 404.html, card pages, .nojekyll`);

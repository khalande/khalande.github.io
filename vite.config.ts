import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'node:fs';
import {defineConfig, type Plugin} from 'vite';

// The founders' digital business cards live in public/<name>/index.html.
// Serve them at clean URLs (/manish, /manish/) in `npm run dev` and `npm run preview`,
// so the address bar never shows index.html.
const CARD_PAGES = ['manish', 'sneha'];
function cardPages(): Plugin {
  const handler = (root: string) => (req: any, res: any, next: () => void) => {
    const pathOnly = (req.url || '').split('?')[0].replace(/\/$/, '');
    const name = pathOnly.slice(1);
    if (!CARD_PAGES.includes(name)) return next();
    const file = path.join(root, name, 'index.html');
    if (!fs.existsSync(file)) return next();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    fs.createReadStream(file).pipe(res);
  };
  return {
    name: 'bluenxt-card-pages',
    configureServer(server) {
      server.middlewares.use(handler(path.resolve(import.meta.dirname, 'public')));
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler(path.resolve(import.meta.dirname, server.config.build.outDir)));
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [cardPages(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

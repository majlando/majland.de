import { defineConfig } from 'vite';

// Absolute base ('/') so pre-rendered pages at nested URLs (e.g. /de/path/web/)
// resolve their assets correctly. This targets the domain root — your one.com
// deploy. The GitHub Pages preview overrides it with `--base=/majland.de/`.
export default defineConfig({
  base: '/',
  build: {
    target: 'es2019',
    outDir: 'dist',
    assetsDir: 'assets',
    cssMinify: true,
  },
});

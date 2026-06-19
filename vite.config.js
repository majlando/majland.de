import { defineConfig } from 'vite';

// Relative base ('./') so the built site works dropped into any web root —
// e.g. uploaded to the root of a one.com host, on GitHub Pages, or opened locally.
// The app uses hash routing, so no server rewrite rules are needed anywhere.
export default defineConfig({
  base: './',
  build: {
    target: 'es2019',
    outDir: 'dist',
    assetsDir: 'assets',
    cssMinify: true,
  },
});

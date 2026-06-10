import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages at https://rileyk2x.github.io/PersonalPortfolio
// If you rename the repo to rileyk2x.github.io, remove `base` below
// and update BASE in scripts/generate-pdf.mjs to ''.
export default defineConfig({
  site: 'https://rileyk2x.github.io',
  base: '/PersonalPortfolio',
  trailingSlash: 'ignore',
});

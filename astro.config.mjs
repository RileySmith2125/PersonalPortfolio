import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages at https://rileysmith2125.github.io/PersonalPortfolio
// If you rename the repo to rileysmith2125.github.io, remove `base` below.
export default defineConfig({
  site: 'https://rileysmith2125.github.io',
  base: '/PersonalPortfolio',
  trailingSlash: 'ignore',
});

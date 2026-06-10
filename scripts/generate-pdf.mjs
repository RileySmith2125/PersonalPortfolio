// Renders the built /resume route to resume.pdf using Puppeteer.
// Run via `npm run pdf` (which builds first). Requires `npm run build` output in dist/.
import { preview } from 'astro';
import puppeteer from 'puppeteer';

// Keep in sync with `base` in astro.config.mjs ('' if the repo is <user>.github.io).
const BASE = '/PersonalPortfolio';

const server = await preview({ root: process.cwd(), logLevel: 'error' });
const pageUrl = `http://localhost:${server.port}${BASE}/resume/`;

console.log(`Rendering ${pageUrl} ...`);

const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  const response = await page.goto(pageUrl, { waitUntil: 'networkidle0' });
  if (!response || !response.ok()) {
    throw new Error(`Failed to load ${pageUrl}: HTTP ${response?.status()}`);
  }
  await page.pdf({
    path: 'resume.pdf',
    format: 'letter',
    printBackground: true,
    preferCSSPageSize: true,
  });
} finally {
  await browser.close();
  await server.stop();
}

console.log('Wrote resume.pdf');

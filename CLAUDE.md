# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:4321/PersonalPortfolio/ (note the base path) |
| `npm run build` | Production build to `dist/` — also validates all content frontmatter via zod |
| `npm run preview` | Serve the production build locally |
| `npm run pdf` | Build + render the `/resume` route to `resume.pdf` (project root, gitignored) via Puppeteer |

There are no tests or linters. `npm run build` is the validation step — it fails on schema-invalid frontmatter or broken imports.

## Architecture

Astro 5 static site. Content is decoupled from presentation via content collections:

- **`src/content.config.ts`** defines the `projects` and `reads` collections (glob loaders over `src/content/projects/` and `src/content/reads/`, zod schemas). Adding content = dropping a `.md` file in the right folder; no code changes.
- **`src/data/site.ts`** is the single edit point for personal info (name, bio, contact, résumé-only content: `resumeSummary`, `experience`, `skills`, `education`). Every layout/component imports from it.
- **Adding a new section type** (the established pattern, also in README): folder under `src/content/` → collection in `content.config.ts` → page in `src/pages/` → nav link in `src/components/Header.astro`.

### The base-path rule (most likely thing to break)

The site deploys to GitHub Pages under `base: '/PersonalPortfolio'` (astro.config.mjs). **Never hardcode internal links as `href="/..."`** — always use the `url()` helper from `src/data/site.ts`. After changes, `grep 'href="/'` in `src/` should only match `url()`-generated or external cases. If the repo is ever renamed to `rileysmith2125.github.io`, remove `base` from astro.config.mjs AND update the `BASE` constant in `scripts/generate-pdf.mjs` to `''`.

### PDF pipeline

There are now two independent export paths — see `design_handoff_portfolio_redesign/README.md` for the full design rationale:

1. **`npm run pdf`** (unchanged, generated-file path) — `scripts/generate-pdf.mjs` uses Astro's programmatic `preview()` API to serve `dist/`, then Puppeteer renders `/resume/` with `preferCSSPageSize` (the `@page` rule lives in `src/styles/global.css`; résumé-specific typography in `src/styles/print.css`). `/resume` uses `BaseLayout` like every other page (not a bare layout) — the header, floating "Save as PDF" button, and print-document twin are all hidden via plain `@media print { [data-print-hide] { display:none } }`, which Puppeteer's `page.pdf()` applies automatically without any JS running. **Selected projects** on the résumé come from **featured** project entries; everything else comes from `site.ts`.
2. **In-browser print** (new, client-side) — every page (via `BaseLayout`) renders a hidden `PrintDocument.astro` twin (`[data-print-doc]`, `display:none` by default) containing the whole site as one letter page per section (cover, projects index, one page per project, reads, résumé). `SavePdfButton.astro` is the floating button + "turn on background graphics" confirmation modal; on "Continue" it sets `data-print-full` on `<html>`, calls `window.print()`, and clears the attribute on `afterprint`. Only when `data-print-full` is set does `[data-print-doc]` show and `<main>` hide — otherwise (including a bare Ctrl+P on `/resume`) the page's own on-screen content prints. The on-screen `/resume` page also has its own "Save résumé" button that just calls `window.print()` directly (no modal) — same underlying `@media print` rules, scoped to whatever's in `<main>`.

Both `ResumeContent.astro` (the actual résumé markup) and `.resume-*` classes in `print.css` are shared between the on-screen `/resume` page and the résumé section inside `PrintDocument.astro`, so there's one source of truth for that content's styling.

### Styling

Vanilla CSS, deliberately not Tailwind (cleaner print styles, fewer deps — decided with the user). Design tokens are CSS custom properties in `src/styles/global.css`: a single fixed "Clay" warm palette (serif `Newsreader` display type, mono `IBM Plex Mono` for labels/résumé) — no dark mode, no theme switcher. Components use Astro scoped `<style>` blocks consuming those tokens. `print.css` holds the shared résumé/paper styles (see PDF pipeline above); the print-document-twin's own section layout lives in `PrintDocument.astro`'s scoped styles.

### Content schema notes

- Projects: omitting `endDate` means "Present/ongoing"; `featured: true` surfaces on homepage + resume; `draft: true` hides everywhere (lists filter it, `[slug].astro` excludes it from `getStaticPaths`).
- Reads render their Markdown body inline on the reads page (notes), not on a detail page.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` (withastro/action) builds and deploys to https://rileysmith2125.github.io/PersonalPortfolio/. CI sets `PUPPETEER_SKIP_DOWNLOAD=1` — the PDF is generated locally, never in CI.

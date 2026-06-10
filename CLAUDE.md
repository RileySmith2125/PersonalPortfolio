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
- **`src/data/site.ts`** is the single edit point for personal info (name, bio, email, social links). Every layout/component imports from it.
- **Adding a new section type** (the established pattern, also in README): folder under `src/content/` → collection in `content.config.ts` → page in `src/pages/` → nav link in `src/components/Header.astro`.

### The base-path rule (most likely thing to break)

The site deploys to GitHub Pages under `base: '/PersonalPortfolio'` (astro.config.mjs). **Never hardcode internal links as `href="/..."`** — always use the `url()` helper from `src/data/site.ts`. After changes, `grep 'href="/'` in `src/` should only match `url()`-generated or external cases. If the repo is ever renamed to `rileysmith2125.github.io`, remove `base` from astro.config.mjs AND update the `BASE` constant in `scripts/generate-pdf.mjs` to `''`.

### PDF pipeline

`scripts/generate-pdf.mjs` uses Astro's programmatic `preview()` API to serve `dist/`, then Puppeteer renders `/resume/` with `preferCSSPageSize` (the `@page` rules live in `src/styles/print.css`). The `/resume` page uses `PrintLayout` (bare, print.css only) — not `BaseLayout` — and shows **featured** projects only (falls back to all non-drafts if none are featured). On screen it renders as a white "paper" preview card.

### Styling

Vanilla CSS, deliberately not Tailwind (cleaner print styles, fewer deps — decided with the user). Design tokens are CSS custom properties in `src/styles/global.css`: dark-first with an automatic `prefers-color-scheme: light` fallback. Components use Astro scoped `<style>` blocks consuming those tokens. `print.css` is a separate document-style sheet used only by `PrintLayout`.

### Content schema notes

- Projects: omitting `endDate` means "Present/ongoing"; `featured: true` surfaces on homepage + resume; `draft: true` hides everywhere (lists filter it, `[slug].astro` excludes it from `getStaticPaths`).
- Reads render their Markdown body inline on the reads page (notes), not on a detail page.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` (withastro/action) builds and deploys to https://rileysmith2125.github.io/PersonalPortfolio/. CI sets `PUPPETEER_SKIP_DOWNLOAD=1` — the PDF is generated locally, never in CI.

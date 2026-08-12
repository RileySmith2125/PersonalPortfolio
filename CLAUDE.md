# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:4321/PersonalPortfolio/ (note the base path) |
| `npm run build` | Production build to `dist/` — also validates all content frontmatter via zod |
| `npm run preview` | Serve the production build locally |

There are no tests or linters. `npm run build` is the validation step — it fails on schema-invalid frontmatter or broken imports.

## Architecture

Astro 5 static site. Content is decoupled from presentation via content collections:

- **`src/content.config.ts`** defines the `projects` and `reads` collections (glob loaders over `src/content/projects/` and `src/content/reads/`, zod schemas). Adding content = dropping a `.md` file in the right folder; no code changes.
- **`src/data/site.ts`** is the single edit point for personal info (name, bio, contact). Every layout/component imports from it. The résumé is *not* here — see below.
- **Adding a new section type** (the established pattern, also in README): folder under `src/content/` → collection in `content.config.ts` → page in `src/pages/` → nav link in `src/components/Header.astro`.

### The base-path rule (most likely thing to break)

The site deploys to GitHub Pages under `base: '/PersonalPortfolio'` (astro.config.mjs). **Never hardcode internal links as `href="/..."`** — always use the `url()` helper from `src/data/site.ts`. After changes, `grep 'href="/'` in `src/` should only match `url()`-generated or external cases. If the repo is ever renamed to `rileysmith2125.github.io`, remove `base` from astro.config.mjs. This applies to `public/` assets too: the résumé PDF is referenced as `url('/resume.pdf')`, never `/resume.pdf`.

### The résumé (user-supplied PDF)

The résumé is **not generated**. The user drops their own PDF at `public/resume.pdf`; Astro copies `public/` to the site root, so it is served at `<base>/resume.pdf`. `src/pages/resume.astro` renders a Clay-styled header with a Download PDF button and embeds the file in an `<object>`; the `<object>`'s fallback content (a download link) is what renders when the browser won't display PDFs inline — iOS Safari — or when the file is missing. To swap the résumé, overwrite the file. Nothing reads it at build time, so a missing file does not fail the build.

This replaced an earlier generated-résumé pipeline (`ResumeContent.astro` + `site.ts` fields + `print.css` + `scripts/generate-pdf.mjs` + Puppeteer + `npm run pdf`), all removed in favour of the uploaded PDF — decided with the user. Do not reintroduce it without asking. `design_handoff_portfolio_redesign/README.md` still describes that old pipeline; it is stale on this point only.

### Full-portfolio print export

Every page (via `BaseLayout`) renders a hidden `PrintDocument.astro` twin (`[data-print-doc]`, `display:none` by default) containing the whole site as one letter page per section: cover, projects index, one page per project, reads. **It no longer includes a résumé page** — that PDF is a separate file and can't be embedded in a print stylesheet. `SavePdfButton.astro` is the floating button + "turn on background graphics" confirmation modal; on "Continue" it sets `data-print-full` on `<html>`, calls `window.print()`, and clears the attribute on `afterprint`. Only when `data-print-full` is set does `[data-print-doc]` show and `<main>` hide — otherwise a bare Ctrl+P prints the page's own on-screen content. The `@page` rule and the shared print plumbing live in `src/styles/global.css`.

### Styling

Vanilla CSS, deliberately not Tailwind (cleaner print styles, fewer deps — decided with the user). Design tokens are CSS custom properties in `src/styles/global.css`: a single fixed "Clay" warm palette (serif `Newsreader` display type, mono `IBM Plex Mono` for labels) — no dark mode, no theme switcher. Components use Astro scoped `<style>` blocks consuming those tokens; the print-document-twin's own section layout lives in `PrintDocument.astro`'s scoped styles.

### Content schema notes

- Projects: omitting `endDate` means "Present/ongoing"; `featured: true` surfaces on the homepage; `draft: true` hides everywhere (lists filter it, `[slug].astro` excludes it from `getStaticPaths`).
- Reads render their Markdown body inline on the reads page (notes), not on a detail page.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` (withastro/action) builds and deploys to https://rileysmith2125.github.io/PersonalPortfolio/.

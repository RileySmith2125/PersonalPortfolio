---
title: Personal Portfolio
description: Astro-powered portfolio with Markdown content collections and one-command PDF resume export.
startDate: 2026-06-10
tags: [astro, typescript, css]
repoUrl: https://github.com/RileySmith2125/PersonalPortfolio
featured: true
---

This very site. Built with Astro 5 content collections so adding a project is just
dropping a Markdown file into a folder — the schema validates the frontmatter at
build time.

## Highlights

- **Content as Markdown** — projects and reads live in `src/content/`, validated by zod schemas
- **PDF export** — `npm run pdf` renders a print-styled resume route to `resume.pdf` via Puppeteer
- **Zero-JS by default** — fast loads, with Astro view transitions for polish
- **Deployed free** on GitHub Pages via GitHub Actions

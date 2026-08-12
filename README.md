# Personal Portfolio

Astro-powered portfolio. Content lives in Markdown files and the site deploys to
GitHub Pages.

## Commands

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Dev server at http://localhost:4321/PersonalPortfolio/ |
| `npm run build`   | Production build into `dist/`                     |
| `npm run preview` | Serve the production build locally                |

## Updating content

### Add a project

Create `src/content/projects/my-project.md`:

```markdown
---
title: My Project
description: One-liner shown on cards and the resume.
startDate: 2026-06-01
# endDate: 2026-08-01        # omit while ongoing
tags: [typescript, react]
repoUrl: https://github.com/you/my-project   # optional
demoUrl: https://my-project.example.com      # optional
featured: true               # show on homepage + resume
# draft: true                # hide everywhere while writing
---

Long-form writeup in Markdown. Shown on the project's detail page.
```

That's it — the build picks it up automatically and validates the frontmatter.

### Add a read

Create `src/content/reads/book-name.md`:

```markdown
---
title: Book Title
author: Author Name
type: book            # or: article
url: https://...      # optional
dateRead: 2026-06-01
rating: 4             # optional, 1-5
---

Your notes, rendered inline on the Reads page.
```

### Add a new section type (e.g. "Talks")

1. Create a folder: `src/content/talks/`
2. Define the collection in `src/content.config.ts` (copy the `reads` pattern)
3. Add a page: `src/pages/talks.astro` (copy `reads.astro`)
4. Add a nav link in `src/components/Header.astro`

### Update personal info

Everything (name, bio, email, GitHub, LinkedIn) is in `src/data/site.ts`.

## Resume

The resume is a PDF you supply, not generated content. Save it as
**`public/resume.pdf`** and commit it — Astro copies `public/` to the site root,
so it is served at `/PersonalPortfolio/resume.pdf`.

The `/resume` page embeds that file with a Download PDF button above it. To
update the resume, overwrite `public/resume.pdf` and push; nothing else changes.
Keep the filename exactly `resume.pdf`, or update the path in
`src/pages/resume.astro`.

Browsers that won't render PDFs inline (notably iOS Safari) show a download link
instead — the same fallback appears if the file is missing.

## Deploying (GitHub Pages)

One-time setup:

1. Create a GitHub repo named `PersonalPortfolio`
2. `git remote add origin https://github.com/<you>/PersonalPortfolio.git`
3. `git push -u origin main`
4. Repo **Settings → Pages → Source: GitHub Actions**

Every push to `main` then deploys automatically to
`https://<you>.github.io/PersonalPortfolio`.

> **Base path caveat:** the site is served under `/PersonalPortfolio`. Always use
> the `url()` helper from `src/data/site.ts` for internal links — never hardcode
> `href="/..."`. If you rename the repo to `<you>.github.io`, remove `base` from
> `astro.config.mjs`.

# Handoff: Personal Portfolio Redesign (Clay / Serif)

## Overview
A redesign of Riley Smith's personal portfolio: a minimal, editorial, "text floating in space" site in a warm clay/charcoal palette with serif typography. Covers About (home), Projects (index + detail), Reads, Resume, and a "Save as PDF" feature that exports the entire site — including all project detail pages — as one multi-page PDF.

## About the Design Files
The bundled file (`Portfolio.dc.html`) is a **design reference prototype** built in an internal HTML component format (custom `{{ }}` template bindings, `sc-if`/`sc-for` control-flow tags, inline styles). **It is not production code and should not be copied as-is.** Recreate this design in the target codebase's real environment — the existing Astro + Markdown-content-collections site in the attached `PersonalPortfolio` folder (Astro components/pages, `global.css` / `print.css`) — using its existing patterns (Astro layouts/components, content collections, the existing Puppeteer PDF pipeline in `scripts/generate-pdf.mjs`). Do not introduce a new framework; this codebase already has one.

To read the prototype: `{{ propName }}` is a data binding (ignore the templating syntax, look at the resulting value/text), `<sc-if value="{{ x }}">` is a conditional block, `<sc-for list="{{ arr }}" as="item">` is a loop over an array — translate these directly to Astro conditionals/`{arr.map()}`. All styling is inline in the prototype for streaming reasons; in the real codebase, port these values into `global.css` / `print.css` as classes, consistent with the existing token-based approach there.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy below are final. Recreate pixel-close using the values given.

## Screens / Views

### 1. About (Home) — replaces current hero/featured-projects home
**Purpose:** The entire home page. Extremely minimal — just an identity statement.
**Layout:** Full-height flex column, centered both axes, centered text. Max content width 48ch on the paragraph. Padding: `48px` top, `clamp(24px,6vw,40px)` sides, `96px` bottom (accounts for sticky header + floating button).
**Components:**
- **Name (H1)**: "Riley Smith". `font-size: clamp(32px, 6.4vw, 74px)`, weight 400, `letter-spacing: -0.025em`, `line-height: 1.05`, `white-space: nowrap` (must not wrap to 2 lines — reduce clamp further on very narrow viewports rather than wrap). Color: `var(--ink)`.
- **About paragraph**: "This portfolio is a chance for me to highlight interests and projects that you won't find on my resume. Machine learning, geopolitics, and football are a couple things you'll find. Enjoy!" — `font-size: 14.5px`, `line-height: 2`, color `var(--muted)`, `max-width: 48ch`, `margin-top: 32px`.
- **Nothing else on this page.** No footer, no other copy.

### 2. Header / Navigation (persists on all screens except print)
**Layout:** Sticky top (`position: sticky; top: 0`), full-bleed background matching page bg, inner content max-width `1000px` centered, nav pinned to top-right (`justify-content: flex-end`), padding `22px clamp(22px,6vw,40px)`.
**Components:** Nav items: About, Projects, Reads, Resume. Each is `font-size: 10px`, `letter-spacing: 0.2em`, uppercase. Items separated by a **thin vertical divider**: `1px` wide, `10px` tall, `background: var(--rule)`, `gap: 13px` around each divider. Active item: color `var(--accent)` (= `var(--ink)` when no accent set) with a `1px solid var(--accent)` bottom border; inactive: color `var(--muted)`, transparent border. No logo/brand text on the left — nav is the only header content.

### 3. Projects (index)
**Purpose:** Browse all projects.
**Layout:** No heading/intro text of any kind — just the grid, directly. Max-width `940px` centered, padding `clamp(56px,10vh,116px) clamp(24px,6vw,44px) 120px`.
**Grid:** CSS grid, `grid-template-columns: repeat(auto-fill, minmax(238px,1fr))`, `gap: clamp(30px,4vw,46px) clamp(22px,2.6vw,30px)` (row gap larger than column gap).
**Card component** (repeats per project — 6 in the mock data):
  - Whole card is a clickable link/button to the project detail page. Hover: background `var(--faint)` (padding `12px`, negative margin `-12px` to inset the hover without shifting layout — in a real build, use a padded hoverable wrapper instead).
  - **Image**: `aspect-ratio: 4/3`, `1px solid var(--rule)` border, placeholder fill is a diagonal hatch (`repeating-linear-gradient(135deg, var(--faint) 0, var(--faint) 1px, transparent 1px, transparent 11px)`) with the project title centered in a small uppercase label chip. **Replace with real project screenshots.**
  - **Title**: below image, `margin-top: 15px`, `font-size: 17px`, weight 500, `letter-spacing: -0.01em`.
  - **Short description**: one line, `font-size: 12px`, color `var(--muted)`, `margin-top: 5px`.

### 4. Project Detail
**Purpose:** Deep dive on one project.
**Layout:** Max-width `640px` centered, padding `clamp(52px,9vh,104px) clamp(24px,6vw,40px) 120px`.
**Components (top to bottom):**
  - "← Projects" back link — `font-size: 10px`, uppercase, `letter-spacing: 0.18em`, color `var(--muted)`.
  - Title (H1) — `font-size: clamp(30px,4.6vw,48px)`, weight 400, `margin: 20px 0 14px`.
  - Meta line — role · date · tags, `font-size: 10px`, uppercase, `letter-spacing: 0.16em`, color `var(--muted)`, `line-height: 1.9`.
  - Source/Demo links (conditional per project) — uppercase `10px`, `letter-spacing: 0.16em`, `1px solid var(--accent)` bottom border, color `var(--accent)`, `gap: 22px` between them.
  - Overview — 1-2 paragraphs, `font-size: 14px`, `line-height: 2`, `margin-bottom: 22px` each, `margin-top: clamp(36px,6vh,60px)` above the block.
  - Bullet list — no bullet glyphs; each `<li>` has an em-dash (`—`) absolutely positioned at `left: 0`, color `var(--accent)`. `font-size: 12.5px`, color `var(--muted)`, `line-height: 1.65`, `padding: 13px 0 13px 22px`, `1px solid var(--rule)` border-bottom, list wrapped in `border-top: 1px solid var(--rule)`.
  - Figure — `aspect-ratio: 16/9` placeholder (same hatch pattern as project cards) with a bracketed caption e.g. `[ Halyard — operation-log inspector ]`, plus a small "Drop a screenshot here" label below. **Replace with real screenshot.**

### 5. Reads
**Purpose:** Reading list.
**Layout:** Max-width `660px` centered, padding `clamp(52px,9vh,104px) clamp(24px,6vw,40px) 120px`.
**Components:**
  - Small eyebrow label "What I'm reading" — `10px` uppercase, `letter-spacing: 0.22em`, color `var(--muted)`.
  - H1 "Reads" — `clamp(28px,4vw,42px)`, weight 400.
  - Intro paragraph, `13px`, color `var(--muted)`, `max-width: 52ch`.
  - List of entries (5 in mock data), each with a `1px solid var(--rule)` top border: title (`15px`, weight 500) + year (`10px`, muted) on one baseline-aligned row; meta line below (author · type, plus star rating using `★`/`☆` glyphs in `var(--accent)`); note paragraph (`12.5px`, `line-height:1.85`, muted).

### 6. Resume (screen)
**Purpose:** A single résumé document, viewable on-screen and print/PDF-exportable independently of the full-site export.
**Layout:** Shell padding `clamp(28px,5vh,56px) clamp(16px,4vw,48px) 90px`, containing:
  - An on-screen-only toolbar: label "Resume · letter · print to PDF" + a **"Save résumé"** button (dark pill, `background: var(--ink)`, `color: var(--bg)`).
  - The résumé "paper": `max-width: 8.5in`, centered, white background (`#fff`) regardless of site theme, `color: #1f1c18`, monospace font (`IBM Plex Mono`) — this is the one screen that is NOT serif/themed, by design (a résumé should read as a plain, portable document). Padding `0.78in 0.74in`, subtle box-shadow for on-screen "paper" feel (removed in print).
**Résumé content sections** (all in mono, `10pt` base): Name + title + contact (right-aligned), Summary, Experience (role/org/dates + bullets), Selected projects, Skills (label/value grid), Education. Section headers: `8.5pt`, uppercase, `letter-spacing:0.2em`, `1px solid #d3ccbf` bottom border. See full copy in the source file — reuse verbatim.

## Full-Portfolio "Save as PDF" Feature
**This is the most important interaction to replicate faithfully — build it in the target codebase's existing print/PDF pipeline (there's already a Puppeteer-based `scripts/generate-pdf.mjs` and `PrintLayout.astro`/`print.css` for the résumé; extend that pattern rather than inventing a new one).**

**Trigger:** A floating pill button, fixed bottom-right (`right: 20px; bottom: 20px`) on every screen except the print output itself, `background: var(--ink)`, `color: var(--bg)`, label "Save as PDF".

**Step 1 — confirmation modal:** Clicking it does NOT print immediately. It opens a modal dialog (dimmed backdrop `rgba(31,28,24,0.32)`, click-outside-to-close) containing:
  - Eyebrow: "Before you save" (mono, `9px`, uppercase, `letter-spacing:0.22em`).
  - Heading: "Turn on background graphics" (serif, `24px`, weight 500).
  - Body copy: "In the print window, open **More settings** and tick **Background graphics**. Without it, the pages print on plain white and lose the clay tone and rules." (bold spans in `var(--ink)`, rest in `var(--muted)`).
  - A visual checkbox chip mockup (☑ + "Background graphics" label) inside a bordered/tinted box — purely illustrative, not a real checkbox.
  - Two buttons: "Cancel" (outlined, closes modal) and "Continue" (solid dark, closes modal then proceeds to print).
  - **Why this exists:** browsers don't print CSS background colors by default; this reminds users to enable it so the clay background/rules survive into the PDF.

**Step 2 — print:** On "Continue", the app switches into a "full export" print mode and calls the browser's native print (`window.print()`), which the user saves as PDF from the print dialog. After printing (or cancelling the print dialog), the mode is cleared automatically (`afterprint` event).

**What the exported PDF contains, in order, one page per section:**
  1. **Cover / About page** — centered, name + about paragraph (same copy as the on-screen About page) plus a small eyebrow "Portfolio · Riley Smith · 2026" and contact line (email · github) at the bottom. Full letter page, clay background.
  2. **Projects index page** — "Index" eyebrow + "Projects" heading, then a 2-column grid of every project (image placeholder, title, short description) — same visual language as the on-screen card grid, scaled for print.
  3. **One full page per project** (6 pages in mock data) — each reproduces the on-screen Project Detail layout: eyebrow "Project 01" (zero-padded index), title, meta line, overview paragraphs, bullet list, figure placeholder. No back-link/nav (irrelevant in print).
  4. **Reads page** — same content/layout as the on-screen Reads page.
  5. **Resume page (last)** — this page only switches to **white background** (`#fff`) and the mono/plain-document styling described above, regardless of the rest of the PDF's clay theme — it should look like a normal résumé document, not themed.

**Print mechanics to replicate:**
  - `@page { size: letter; margin: 0; }` — each "page" section owns its own full-bleed padding instead of relying on browser page margins, so the design controls the exact margin per page type.
  - Each page section forces a page break after it (`break-after: page`), except the last page.
  - Color-adjust must be forced on the printable content (`-webkit-print-color-adjust: exact; print-color-adjust: exact;`) — this is the CSS-side half of "background graphics"; the modal's job is telling the user to enable the corresponding browser setting.
  - The normal on-screen app UI (header, floating button, nav) is hidden during this export; the print-only multi-page document is shown in its place, then both are restored to normal after printing.

**Résumé-only export:** The Resume screen's own "Save résumé" button is a **separate**, simpler export — no confirmation modal, just prints only the résumé page at a normal letter-margin (`0.66in`/`0.62in`) layout matching the existing single-résumé PDF pipeline already in the codebase. Keep this working as its own independent path from the full-site export.

## Interactions & Behavior
- Client-side navigation between About/Projects/Project-detail/Reads/Resume (no full page reload in the prototype) — in Astro this is simply separate pages/routes with shared layout; that's fine and arguably preferable to the SPA behavior in the prototype.
- Card/link hover states: background tints to `var(--faint)` on project cards and project-index rows, `150-180ms ease` transition.
- Nav active-state underline switches instantly (no transition needed).
- Project-detail routing: clicking any project card/row goes to that project's unique detail view (by slug).
- Modal: backdrop click or "Cancel" closes without printing; "Continue" closes and triggers the full print flow.

## State Management
- Current route/page (About / Projects / Project detail + which project / Reads / Resume).
- Print-hint modal open/closed boolean.
- No form state, no async data fetching needed — all content is static (already modeled as Markdown content collections in the existing Astro codebase; keep using that).

## Design Tokens

**Color — Clay theme (the chosen default):**
- `--bg`: `#e2dcd2` (page background)
- `--ink`: `#3d3730` (primary text)
- `--muted`: `#7e766a` (secondary text, labels, meta)
- `--rule`: `#c8c0b4` (hairline borders/dividers)
- `--faint`: `#d7d0c5` (hover backgrounds, placeholder fill)
- `--accent`: defaults to `--ink` (no colored accent in the final direction — kept monochrome)

Two alternate tone options were explored and can be offered as theme variants if desired (not required):
- **Stone**: bg `#dcd8cf`, ink `#3a362f`, muted `#7b746a`, rule `#c4beb1`, faint `#d2cdc3`
- **Taupe**: bg `#ddd6ca`, ink `#3f382f`, muted `#7f7668`, rule `#c6beb0`, faint `#d3cbbe`

**Résumé document (always, regardless of site theme):** background `#fff`, ink `#1f1c18`, muted `#6a6155`, rule `#d3ccbf`.

**Typography:**
- Body/display font: **Newsreader** (serif), fallback `Georgia, serif`. Weights used: 400 (body/headings), 500 (emphasis/titles).
- Mono font (labels, eyebrows, nav, meta lines, and the entire résumé document): **IBM Plex Mono**, weights 400/500/700.
- Type scale used: 74px (name, largest) → 48px (project title) → 44px (cover name in print) → 42px (Reads/Projects H1s, capped) → 30px (print section headings) → 24px (modal heading) → 17px (card titles) → 15-16px (row titles) → 13-14.5px (body copy) → 10-12.5px (meta/labels/captions) → 8.5-9px (smallest eyebrow labels).
- Letter-spacing: tight/negative on large serif headings (`-0.015em` to `-0.025em`); wide/positive uppercase mono labels (`0.14em` to `0.24em`).
- Line-height: body copy is set loose (`1.85`–`2`) for the airy, "floating" feel; tighter (`1.04`–`1.2`) on large display headings.

**Spacing:** Section vertical padding uses `clamp()` for responsive breathing room, roughly `52px`–`116px` depending on viewport. Card/grid gaps `22px`–`46px`. Component-internal gaps mostly `4px`–`18px`.

**Borders:** All dividers/rules are `1px solid var(--rule)` — no heavier borders except the résumé's `2px solid` header rule (print-document convention) and the mono section rules there.

**No border-radius anywhere** — the design is intentionally square/hairline, not soft/rounded.

**Shadows:** Only two: the floating "Save as PDF" button (`0 6px 24px rgba(0,0,0,0.16)`) and the modal card (`0 18px 60px rgba(0,0,0,0.24)`) and the on-screen résumé "paper" (`0 1px 44px rgba(0,0,0,0.18)`). Nothing else has a shadow — cards, rows, and buttons are flat.

## Assets
No real images yet — all project card/figure imagery in the mock is a placeholder (diagonal hairline hatch pattern with a bracketed/labeled caption). The user intends to drop in real screenshots per project; each placeholder is labeled with its project name/caption so it's clear what to drop in where. Fonts are loaded from Google Fonts (Newsreader, IBM Plex Mono — see `<link>` tags in the source file for exact families/weights/URLs).

## Screenshots
`screenshots/` contains reference captures: `about.png`, `projects.png`, `project-detail.png`, `reads.png`, `resume.png`, `save-pdf-modal.png`.

## Files
- `Portfolio.dc.html` — the full interactive prototype (all screens, the theme logic, and the full-site PDF export), for reference. Read the inline styles and the `renderVals()`/data section at the bottom for exact copy, per-project data (title, tags, dates, source/demo URLs, overview paragraphs, bullets), reading-list entries, and résumé content — all of it should carry over into the real content collections.

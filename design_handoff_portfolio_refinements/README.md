# Handoff: Portfolio Refinements (August 2026)

## Overview
This is an **incremental** handoff, not a redesign. The Astro site in this repo already implements the
Clay/serif portfolio described in `design_handoff_portfolio_redesign/README.md` — that document is still
the canonical spec for everything not listed here. This bundle covers only what changed in the latest
design pass: a darker `--muted` token, About-page placement/measure, and a collapsible reading-note
pattern on Reads, plus two button label changes.

Everything below has been diffed against the current repo source, so each item is a real delta — nothing
here is already implemented.

## About the Design Files
`Portfolio.dc.html` is a **design reference prototype** in an internal HTML component format (`{{ }}`
bindings, `<sc-if>` / `<sc-for>` control-flow tags, inline styles). **It is not production code and must
not be copied in.** Recreate the changes in the existing Astro codebase using its established patterns:
vanilla scoped `<style>` blocks, CSS custom properties from `src/styles/global.css`, content collections
for content, and small vanilla `<script>` blocks for interactivity (as `SavePdfButton.astro` does).
Do not add a framework, a CSS library, or a client-side router.

Reading the prototype: `<sc-if value="{{ x }}">` is a conditional, `<sc-for list="{{ arr }}" as="item">`
is a loop, `{{ foo }}` is a value binding. All styling is inline for streaming reasons only.

## Fidelity
**High-fidelity.** Every number below is final and should be matched exactly.

---

## Change 1 — Darker `--muted` (site-wide contrast fix)

`src/styles/global.css`

```diff
- --muted: #7e766a;
+ --muted: #6a6155;
```

That is the only token change. `--bg #e2dcd2`, `--ink #3d3730`, `--rule #c8c0b4`, `--faint #d7d0c5`,
`--accent: var(--ink)` are unchanged. This lifts all secondary text (bio, meta lines, nav, card
descriptions, reading notes) from ~3.0:1 to ~4.6:1 against the clay background. It affects the print
document twin too, which is intended.

Note the résumé document keeps its own hardcoded `#6a6155` mutes in `print.css` — coincidentally the same
value now. Leave `print.css` alone; the résumé is deliberately not themed.

## Change 2 — About page placement and measure

`src/pages/index.astro` (scoped styles only — markup unchanged)

```diff
  .about {
    min-height: calc(100vh - 68px);
    display: flex;
    flex-direction: column;
    align-items: center;
-   justify-content: center;
+   justify-content: flex-start;
    text-align: center;
-   padding: 48px clamp(24px, 6vw, 40px) 96px;
+   padding: clamp(64px, 16vh, 170px) clamp(24px, 6vw, 40px) 96px;
  }

+ h1 { margin: 14px 0 0; }   /* added — was relying on the global h1 margin: 0 */

  .bio {
    font-size: 14.5px;
-   line-height: 2;
+   line-height: 1.8;
    color: var(--muted);
-   max-width: 48ch;
-   margin-top: 12px;
+   max-width: 66ch;
+   margin-top: 18px;
  }
```

The block is now top-anchored with a viewport-proportional top inset rather than optically centered, and
the bio runs to a 66ch measure — two lines on a desktop viewport instead of three.

**Confirm before shipping:** the `h1` clamp is `clamp(9.6px, 1.92vw, 22.2px)` in both the repo and the
prototype, so the name renders *smaller than the bio paragraph* (14.5px). This is carried over as-is and
is not part of this change set, but it reads as an accidental scale-down. Ask the designer whether it is
intended before treating it as final.

## Change 3 — Reads page: lead line and tighter top

`src/pages/reads.astro`

```diff
  <div class="page">
+   <p class="lead">Books I've read recently</p>
    <div class="list">
      {reads.map((read) => <ReadItem read={read} />)}
    </div>
  </div>

  .page {
    max-width: 660px;
    margin: 0 auto;
-   padding: clamp(52px, 9vh, 104px) clamp(24px, 6vw, 40px) 120px;
+   padding: clamp(24px, 4vh, 48px) clamp(24px, 6vw, 40px) 120px;
  }

+ .lead {
+   font-size: 13px;
+   color: var(--muted);
+   margin-bottom: 8px;
+ }
```

Serif, sentence case, no eyebrow and no `<h1>` — the page still has no heading by design. Copy is exactly
`Books I've read recently` (no trailing period).

## Change 4 — Reads: collapsible notes (the substantive one)

`src/components/ReadItem.astro`

Long reading notes now collapse to a 4-line preview with a fade-out, expandable per row. This is the only
new interactive behaviour in this pass.

**Behaviour**
- A row is collapsible when its note has **more than one paragraph** OR its flattened text is **longer
  than 230 characters**. Short single-paragraph notes render in full with no toggle at all.
- Collapsed state shows the note's paragraphs **joined into one continuous run** (not just the first
  paragraph), clipped to exactly 4 lines, with a right-edge fade and a `…`.
- Expanded state shows the real rendered Markdown paragraphs.
- Toggle label: `Show more ↓` when collapsed, `Show less ↑` when expanded. Default state is collapsed.
- Each row toggles independently; no animation on expand (instant).

**Implementation notes for Astro**
- Get the preview text from the raw body, not the rendered HTML:
  `const flat = read.body.trim().split(/\n{2,}/).join(' ')` — and
  `const hasMore = read.body.trim().split(/\n{2,}/).length > 1 || flat.length > 230;`
- Render both the preview `<div>` and the `<Content />` block, and toggle which is visible. Do not
  re-render on the client.
- An Astro component `<script>` is bundled **once**, not per instance — wire it with
  `document.querySelectorAll('[data-read-toggle]')` and toggle the closest row, rather than
  `getElementById`.
- Add a `@media print` rule that force-expands every note (show the `<Content />` block, hide the preview
  and the toggle button, drop the clamp). Otherwise a bare Ctrl+P on `/reads` prints clipped notes. The
  full-portfolio print twin in `PrintDocument.astro` is unaffected and needs **no change** — it already
  renders full notes.

**Exact styling**

```css
/* collapsed preview — 4 lines at 12.5px/1.85 = 92.5px */
.note-preview {
  position: relative;
  overflow: hidden;
  max-height: 92.5px;
  margin: 12px 0 0;
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.85;
}

.note-preview::after {
  content: '…';
  position: absolute;
  right: 0;
  bottom: 0;
  padding-left: 26px;
  color: var(--muted);
  background: linear-gradient(to right, rgba(0, 0, 0, 0), var(--bg) 62%);
}

/* expanded paragraphs (same type as the preview) */
.note :global(p)             { margin: 7px 0 0; font-size: 12.5px; color: var(--muted); line-height: 1.85; }
.note :global(p:first-child) { margin: 12px 0 0; }

.toggle {
  margin-top: 14px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--rule);
  padding: 0 0 3px;
  cursor: pointer;
  transition: color 0.18s ease;
}

.toggle:hover { color: var(--ink); }
```

The `92.5px` is deliberately exact — it is 4 × (12.5px × 1.85). If the note type scale ever changes,
recompute it rather than rounding.

Everything else about the row is unchanged: `24px 0` padding, `1px solid var(--rule)` top border, title
15px/500, year in mono 10px, meta line in mono 10px uppercase with the `★`/`☆` rating in `var(--accent)`.

## Change 5 — Two button labels

| File | Element | Was | Now |
| --- | --- | --- | --- |
| `src/components/SavePdfButton.astro` | floating pill | `Save as PDF` | `Save Portfolio as PDF` |
| `src/pages/resume.astro` | résumé toolbar button | `Save résumé` | `Save resume` |

No style changes to either button. The `title` attribute on the floating button
(`Download the whole portfolio as a multi-page PDF`) already matches the prototype.

---

## Not changed
Confirmed identical between the prototype and the repo — do not touch: `Header.astro`, `ProjectCard.astro`,
`projects/index.astro`, `projects/[slug].astro`, `PrintDocument.astro`, `ResumeContent.astro`,
`print.css`, `site.ts`, all `src/content/**` Markdown, the `@page`/print plumbing in `global.css`, and
`scripts/generate-pdf.mjs`.

## Verifying
1. `npm run build` — the validation step for this repo.
2. `npm run dev` and check: About block sits high on the page with a two-line bio; `/reads` shows both
   notes collapsed to 4 lines with a fade and a `Show more ↓`; expanding one leaves the other collapsed.
3. On `/reads`, Ctrl+P → notes should print in full, unclipped.
4. Floating button → modal → Continue → the multi-page export still renders cover, projects index, six
   project pages, reads (full notes), résumé.
5. `npm run pdf` — the résumé PDF should be unchanged by this pass.

## Files
- `Portfolio.dc.html` — the current prototype, all screens. Read its inline styles for any value not
  spelled out above.
- `design_handoff_portfolio_redesign/README.md` (already in this repo) — the full baseline spec.

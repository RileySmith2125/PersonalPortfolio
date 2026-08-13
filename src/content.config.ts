import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// To add a NEW SECTION TYPE later (e.g. "talks"):
//   1. Create a folder: src/content/talks/
//   2. Define a collection below and add it to `collections`
//   3. Add a page: src/pages/talks.astro
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(), // one-liner shown on cards and the resume
      role: z.string().default('Solo'), // shown in the detail meta line
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(), // omit while the project is ongoing
      tags: z.array(z.string()).default([]),
      repoUrl: z.string().url().optional(),
      demoUrl: z.string().url().optional(),
      image: image().optional(),
      // CSS object-position for the card thumbnail's 4:3 crop. Defaults to centred;
      // set per project to bias the crop (e.g. '50% 39%' for tall phone captures).
      imagePosition: z.string().default('50% 50%'),
      caption: z.string().optional(), // figure placeholder caption; falls back to the title
      // Screenshots shown as a grid at the bottom of the detail page. When
      // empty, the page falls back to the striped figure placeholder.
      gallery: z
        .array(
          z.object({
            src: image(),
            caption: z.string().optional(), // shown under the image; also the alt text
          }),
        )
        .default([]),
      bullets: z.array(z.string()).default([]), // highlight list on the detail page
      featured: z.boolean().default(false), // featured projects appear on the homepage and resume
      draft: z.boolean().default(false), // drafts are hidden everywhere
    }),
});

const reads = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reads' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    type: z.enum(['book', 'article', 'essay']).default('book'),
    url: z.string().url().optional(),
    dateRead: z.coerce.date(),
    rating: z.number().int().min(0).max(5).optional(),
  }),
});

export const collections = { projects, reads };

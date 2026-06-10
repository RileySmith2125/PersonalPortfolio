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
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(), // omit while the project is ongoing
      tags: z.array(z.string()).default([]),
      repoUrl: z.string().url().optional(),
      demoUrl: z.string().url().optional(),
      image: image().optional(),
      featured: z.boolean().default(false), // featured projects appear on the homepage and resume
      draft: z.boolean().default(false), // drafts are hidden everywhere
    }),
});

const reads = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reads' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    type: z.enum(['book', 'article']).default('book'),
    url: z.string().url().optional(),
    dateRead: z.coerce.date(),
    rating: z.number().int().min(1).max(5).optional(),
  }),
});

export const collections = { projects, reads };

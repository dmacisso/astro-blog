import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
  // type: 'content',
  // loader: file('src/content/blog/**/*.md'),
  loader: glob({ base: 'src/content/blog', pattern: '*.md' }),

  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    slug: z.string().optional()
  }),
});

export const collections = {
  blog: blogCollection,
};

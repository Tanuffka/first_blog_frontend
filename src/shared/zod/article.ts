import { z } from 'zod';

export const articleSchema = z.object({
  coverImage: z.string().nullable(),
  tags: z.array(z.string()).readonly(),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  content: z
    .tuple([
      z.string(),
      z.number().gt(100, 'Content must be at least 100 characters'),
    ])
    .readonly(),
});

export type ArticleSchema = z.infer<typeof articleSchema>;

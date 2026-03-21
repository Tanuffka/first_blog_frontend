import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  content: z
    .tuple([
      z.string(),
      z.number().gt(100, 'Content must be at least 100 characters'),
    ])
    .readonly(),
  tags: z.array(z.string()).readonly(),
  coverImage: z.string().nullable(),
});

export type ArticleSchema = z.infer<typeof articleSchema>;

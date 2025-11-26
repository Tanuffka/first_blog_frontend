import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  content: z.tuple([
    z.string(),
    z.number().gt(10, 'Content must be at least 10 characters'),
  ]),
  cover: z.object({
    image: z.string(),
    crop: z.object({
      x: z.number(),
      y: z.number(),
    }),
    zoom: z.number(),
  }),
});

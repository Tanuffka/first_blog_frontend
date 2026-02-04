import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  content: z
    .tuple([
      z.string(),
      z.number().gt(10, 'Content must be at least 10 characters'),
    ])
    .readonly(),
  tags: z.array(z.string()).readonly(),
  coverCroppedImage: z.object({
    fileKey: z.string(),
    fileDownloadUrl: z.string(),
  }),
  coverImage: z.object({
    fileKey: z.string(),
    fileDownloadUrl: z.string(),
    cropOptions: z.object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
      zoom: z.number(),
    }),
  }),
});

export type ArticleSchema = z.infer<typeof articleSchema>;

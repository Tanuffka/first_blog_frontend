import { z } from 'zod';

export const commentSchema = z.object({
  content: z.string().min(10, 'Comment must be at least 10 characters'),
});

import { type z } from 'zod';

import { articleSchema } from 'src/shared/zod/article';

export type ArticleTitleType = z.infer<typeof articleSchema.shape.title>;
export type ArticleContentType = z.infer<typeof articleSchema.shape.content>;
export type ArticleCoverType = z.infer<typeof articleSchema.shape.cover>;

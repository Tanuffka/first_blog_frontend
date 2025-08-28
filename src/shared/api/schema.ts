export interface UserApiResponseSchema {
  _id: string;
  firstname: string;
  lastname: string;
}

export interface ArticleApiResponseSchema {
  _id: string;
  title: string;
  content: string;
  author: UserApiResponseSchema;
  tags: string[];
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

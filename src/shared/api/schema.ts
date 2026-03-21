export interface UserApiResponseSchema {
  _id: string;
  firstname: string;
  lastname: string;
  avatarUrl?: string;
}

export interface AuthorizedUserApiSchema extends UserApiResponseSchema {
  email: string;
  bio?: string;
  avatarUrl?: string;
}

export interface ArticleApiResponseSchema {
  _id: string;
  title: string;
  content: string;
  author: UserApiResponseSchema;
  tags: { _id: string; name: string }[];
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  coverImage: string;
}

export interface CommentApiResponseSchema {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: UserApiResponseSchema;
}

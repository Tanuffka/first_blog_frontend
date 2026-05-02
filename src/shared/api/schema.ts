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
  tags?: TagSchema[];
  author: UserApiResponseSchema;
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

export interface TagSchema extends TagsApiResponseSchema {
  name: string;
  article: string;
}
export interface TagsApiResponseSchema {
  tags?: TagSchema[];
}

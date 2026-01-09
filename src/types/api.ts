// types/api.ts
export interface ApiErrorResponse {
  message: string;
  code?: string;
  description?: unknown;
}

export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Meta = {
  page: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
};

export type User = Entity<{
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'USER';
  bio: string;
  slug: string;
  avatarUrl: string;
}>;

export type Post = Entity<{
  author: User | null;
  title: string;
  content: string;
  slug: string;
  publicId: string;
  updatedAt: number;
}>;

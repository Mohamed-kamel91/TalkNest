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
};

export type User = Entity<{
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'USER';
  bio: string;
}>;

export type Post = Entity<{
  title: string;
  content: string;
  author: User;
  updatedAt: string;
}>;

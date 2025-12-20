import { primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';

export type Model = keyof typeof models;

const user = {
  id: primaryKey(nanoid),
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  bio: String,
  createdAt: Date.now,
};

const post = {
  id: primaryKey(nanoid),
  authorId: String,
  title: String,
  content: String,
  updatedAt: Date.now,
  createdAt: Date.now,
};

export const models = {
  user,
  post,
};

import { primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';

export type Model = keyof typeof models;

const userModel = {
  id: primaryKey(nanoid),
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  bio: String,
  createdAt: Date.now,
};

export const models = {
  user: userModel,
};

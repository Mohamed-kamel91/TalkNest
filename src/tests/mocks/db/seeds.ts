import { createPost, createUser } from '@/tests/data-generators';

import { db } from './db';
import { persistDb } from './db-storage';
import { hash } from '../utils';

import type { Model } from './models';

const omitId = <T extends { id: any }>(obj: T): Omit<T, 'id'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...rest } = obj;
  return rest;
};

type SeedOptions = {
  shouldPersist?: boolean;
};

const seedModel = (
  modelName: Model,
  seedCallback: (
    count: number,
    model: (typeof db)[Model],
  ) => void | Promise<void>,
) => {
  const model = db[modelName];

  if (!model) {
    throw new Error(
      `Model "${modelName}" does not exist in database`,
    );
  }

  return async (count: number = 10, options: SeedOptions = {}) => {
    const { shouldPersist = true } = options;

    if (model.count() > 0) return;

    await seedCallback(count, model);

    if (shouldPersist) {
      await persistDb(modelName);
    }
  };
};

export const seedUsers = seedModel('user', (count, model) => {
  for (let i = 0; i < count; i++) {
    const user = omitId(createUser());
    model.create({ ...user, password: hash(user.password) });
  }
});

export const seedPosts = seedModel('post', (count, model) => {
  const users = db.user.getAll();
  const authorIds = users.slice(0, 5).map((author) => author.id);

  for (let i = 0; i < count; i++) {
    const post = omitId(
      createPost({
        authorId:
          authorIds[Math.floor(Math.random() * authorIds.length)],
      }),
    );

    model.create(post);
  }
});

export const seedDb = async () => {
  await seedUsers(10);
  await seedPosts(30);
};

import { faker } from '@faker-js/faker';

import type { User } from '@/types/api';

const generateUser = () => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: 'TestPassword123!',
  role: 'USER' as User['role'],
  bio: faker.lorem.paragraph(),
  createdAt: Date.now(),
  avatarUrl:
    'https://api.dicebear.com/9.x/micah/svg?seed=Aidan&radius=50&mouth=laughing,smile',
});

export const createUser = <
  T extends Partial<ReturnType<typeof generateUser>>,
>(
  overrides?: T,
): ReturnType<typeof generateUser> => {
  return { ...generateUser(), ...overrides };
};

const generatePost = () => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

export const createPost = <
  T extends Partial<ReturnType<typeof generatePost>>,
>(
  overrides?: T | { authorId: string },
): ReturnType<typeof generatePost> => {
  return { ...generatePost(), ...overrides };
};

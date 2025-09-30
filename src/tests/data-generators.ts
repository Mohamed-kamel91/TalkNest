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
});

export const createUser = <
  T extends Partial<ReturnType<typeof generateUser>>,
>(
  overrides?: T,
): ReturnType<typeof generateUser> => {
  return { ...generateUser(), ...overrides };
};

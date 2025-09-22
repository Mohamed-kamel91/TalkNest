import { faker } from '@faker-js/faker';

const generateUser = () => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'USER',
  bio: faker.lorem.paragraph(),
  createdAt: Date.now(),
});

export const createUser = <
  T extends Partial<ReturnType<typeof generateUser>>,
>(
  overrides?: T,
) => {
  return { ...generateUser(), ...overrides };
};

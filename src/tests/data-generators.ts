import { faker } from '@faker-js/faker';

import { createAvatar } from '@/lib/utils/avatar-url';
import { generateSlugId, slugify } from '@/lib/utils/slug';

import { generateUserBaseSlug } from './mocks/handlers/auth/utils';
import { generateUniquePostSlug } from './mocks/handlers/posts/utils';
import { getRandomTopic } from './mocks/utils';

import type { User } from '@/types/api';

const generateUserSlug = (firstName: string, lastName: string) => {
  const baseSlug = generateUserBaseSlug(firstName, lastName);
  const slugId = generateSlugId(4);
  return baseSlug + slugId;
};

const generateUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    slug: generateUserSlug(firstName, lastName),
    email: faker.internet
      .email({ firstName, lastName })
      .toLowerCase(),
    password: 'TestPassword123!',
    role: 'USER' as User['role'],
    bio: faker.lorem.paragraph(),
    avatarUrl: createAvatar(),
    createdAt: Date.now(),
  };
};

export const createUser = <
  T extends Partial<ReturnType<typeof generateUser>>,
>(
  overrides?: T,
): ReturnType<typeof generateUser> => {
  return { ...generateUser(), ...overrides };
};

const generatePost = () => {
  const title = faker.lorem.sentence({ min: 3, max: 16 });
  const { slug, slugId } = generateUniquePostSlug(title);
  const topicName = getRandomTopic();

  return {
    id: faker.string.uuid(),
    title,
    content: faker.lorem.paragraph({ min: 3, max: 4 }),
    slug,
    publicId: slugId,
    topic: {
      name: topicName,
      slug: slugify(topicName),
    },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};

export const createPost = <
  T extends Partial<ReturnType<typeof generatePost>>,
>(
  overrides?: T | { authorId: string },
): ReturnType<typeof generatePost> => {
  return { ...generatePost(), ...overrides };
};

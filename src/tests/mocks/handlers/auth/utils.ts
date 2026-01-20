import { getFullName } from '@/lib/utils/name-utils';
import { generateSlugId } from '@/lib/utils/slug';

import { slugExists } from '../../utils';

export const generateUserBaseSlug = (
  firstName: string,
  lastName: string,
): string => {
  return getFullName(firstName, lastName)
    .toLowerCase()
    .split(' ')
    .join('');
};

export const generateUniqueUserSlug = (
  firstName: string,
  lastName: string,
): string => {
  const baseSlug = generateUserBaseSlug(firstName, lastName);
  let slug = baseSlug;

  while (slugExists(slug, 'user')) {
    slug += generateSlugId();
  }

  return slug;
};

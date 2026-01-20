import { generateSlugId, slugify } from '@/lib/utils/slug';

export const generateUniquePostSlug = (
  title: string,
): { slugId: string; slug: string } => {
  const baseSlug = slugify(title);
  const slugId = generateSlugId();

  return {
    slugId,
    slug: `${baseSlug}-${slugId}`,
  };
};

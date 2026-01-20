import { customAlphabet } from 'nanoid';

export const slugify = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and') // Replace & with 'and'
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
};

export const generateSlugId = customAlphabet(
  'abcdefghijklmnopqrstuvwxyz0123456789',
  6,
);

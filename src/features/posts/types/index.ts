import z from 'zod';

import { TOPIC_VALUES, type SORT_VALUES } from '../constants';

export type SortBy = (typeof SORT_VALUES)[number];

export const creatPostFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required.' })
    .max(100, { message: 'Title must be less than 100 characters.' }),

  content: z
    .string()
    .trim()
    .min(1, { message: 'Content is required.' })
    .max(5000, {
      message: 'Post content is too long (max 5000 characters).',
    }),

  topic: z
    .enum(TOPIC_VALUES, {
      message: 'Please select a valid topic from the list.',
    })
    .refine((val) => val !== '', {
      message: 'Please select a topic.',
    }),
});

export type CreatePostInput = z.infer<typeof creatPostFormSchema>;

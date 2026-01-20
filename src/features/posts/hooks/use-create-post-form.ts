import { useNavigate } from 'react-router';

import { paths } from '@/config/paths';
import {
  useZodForm,
  type UseZodFormOptions,
} from '@/lib/hooks/use-zod-form';

import { useCreatePost } from '../api/create-post';
import { creatPostFormSchema, type CreatePostInput } from '../types';

export const useCreatPostForm = (
  options: UseZodFormOptions<typeof creatPostFormSchema> = {},
) => {
  const navigate = useNavigate();

  const createPost = useCreatePost();

  const form = useZodForm(creatPostFormSchema, {
    defaultValues: {
      title: '',
      content: '',
      topic: '',
    },
    ...options,
  });

  const onSubmit = (data: CreatePostInput) => {
    createPost.mutate(data, {
      onSuccess: () => {
        navigate(paths.home.feed.latest.getHref());
      },
    });
  };

  return { createPost, ...form, onSubmit };
};

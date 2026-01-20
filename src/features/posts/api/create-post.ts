import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api/api-client';

import { postKeys } from './post-keys';

import type { CreatePostInput } from '../types';
import type { MutationConfig } from '@/lib/api/query-client';
import type { Post } from '@/types/api';

export const createPost = (data: CreatePostInput): Promise<Post> => {
  return api.post('/posts', data);
};

type UseCreatePostOptions = {
  mutationConfig?: MutationConfig<typeof createPost>;
};

export const useCreatePost = ({
  mutationConfig,
}: UseCreatePostOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.lists(),
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createPost,
  });
};

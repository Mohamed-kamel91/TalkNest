import {
  infiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { api } from '@/lib/api/api-client';

import type { SortBy } from '../types';
import type { QueryConfig } from '@/lib/api/query-client';
import type { Meta, Post } from '@/types/api';

type PostsParam = {
  sort?: SortBy;
  page?: number;
};

const getPosts = ({
  sort = 'latest',
  page = 1,
}: PostsParam): Promise<{ data: Post[]; meta: Meta }> => {
  return api.get('/posts', { params: { sort, page } });
};

export const getInfinitePostsQueryOptions = ({
  sort = 'latest',
}: Omit<PostsParam, 'page'>) => {
  return infiniteQueryOptions({
    queryKey: ['posts', { sort }],
    queryFn: ({ pageParam }) => getPosts({ sort, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasNext) return undefined;
      const nextPage = lastPage.meta.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
    staleTime: 0,
  });
};

export const useInfinitePosts = (
  { sort }: Omit<PostsParam, 'page'> = {},
  queryConfig?: Partial<
    QueryConfig<typeof getInfinitePostsQueryOptions>
  >,
) => {
  return useInfiniteQuery({
    ...getInfinitePostsQueryOptions({ sort }),
    ...(queryConfig ?? {}),
  });
};

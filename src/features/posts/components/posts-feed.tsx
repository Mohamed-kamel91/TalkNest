import { Fragment } from 'react/jsx-runtime';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/seperator';
import { Stack } from '@/components/ui/stack';

import { PostPreview } from './post-preview';
import { PostsEmpty } from './posts-empty';
import { PostsFeedSkeleton } from './posts-skeleton';
import { useInfinitePosts } from '../api/get-posts';

import type { SortBy } from '../types';

export const PostsFeed = ({ sort }: { sort: SortBy }) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfinitePosts({ sort });

  if (isLoading) {
    return <PostsFeedSkeleton />;
  }

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  if (posts.length === 0) {
    return <PostsEmpty />;
  }

  return (
    <div>
      {posts.map((post, index) => (
        <Fragment key={post.id}>
          <PostPreview post={post} />
          {index < posts.length - 1 && (
            <Separator className="my-2 max-w-2xl" />
          )}
        </Fragment>
      ))}

      {hasNextPage && (
        <Stack justify="center" align="center" className="mt-6 px-5">
          <Button
            className="w-full max-w-[100px]"
            size="lg"
            radius="circle"
            isLoading={isFetchingNextPage}
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {!isFetchingNextPage ? 'Show more' : null}
          </Button>
        </Stack>
      )}
    </div>
  );
};

import { ContentLayout } from '@/components/layouts';
import { PostsFeed } from '@/features/posts/components/posts-feed';
import { SortPosts } from '@/features/posts/components/sort-posts';
import { usePostSort } from '@/features/posts/hooks/use-post-sort';

export const Home = () => {
  const sort = usePostSort();

  return (
    <ContentLayout className="mx-auto px-0">
      <h1 hidden>Posts</h1>
      <nav className="mb-5 px-5 sm:px-0">
        <SortPosts activeSort={sort} />
      </nav>

      <PostsFeed sort={sort} />
    </ContentLayout>
  );
};

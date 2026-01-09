import { Outlet } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { SortPosts } from '@/features/posts/components/sort-posts';

export const Home = () => {
  return (
    <ContentLayout className="mx-auto px-0">
      <h1 hidden>Posts</h1>
      <nav className="mb-5 px-5 sm:px-0">
        <SortPosts />
      </nav>

      <Outlet />
    </ContentLayout>
  );
};

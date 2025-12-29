import {
  TrendingUpIcon,
  CircleArrowUpIcon,
  ClockPlusIcon,
} from 'lucide-react';
import { Outlet, useParams } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { NavLinkButton } from '@/components/ui/button';

import type { SortBy } from '@/features/posts/types';

const sortLinks = [
  { title: 'Latest', to: 'latest', icon: ClockPlusIcon },
  { title: 'Top', to: 'top', icon: CircleArrowUpIcon },
  { title: 'Trending', to: 'trending', icon: TrendingUpIcon },
];

export const sortLabels = sortLinks.map((sort) =>
  sort.title.toLowerCase(),
);

export const Home = () => {
  const { sort } = useParams<{ sort: string }>();

  const activeSort = (
    sort && sortLabels.includes(sort) ? `${sort}` : 'latest'
  ) as SortBy;

  return (
    <ContentLayout className="mx-auto">
      <h1 hidden>Posts</h1>
      <nav className="mb-4 flex gap-2">
        {sortLinks.map((sort) => (
          <NavLinkButton
            key={sort.title}
            to={sort.to}
            isActive={sort.to === activeSort}
            radius="circle"
            icon={sort.icon}
          >
            {sort.title}
          </NavLinkButton>
        ))}
      </nav>

      <Outlet />
    </ContentLayout>
  );
};

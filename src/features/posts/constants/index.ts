import {
  ClockPlusIcon,
  CircleArrowUpIcon,
  TrendingUpIcon,
} from 'lucide-react';

import { paths } from '@/config/paths';

export const SORT_OPTIONS = [
  {
    title: 'Latest',
    value: 'latest',
    to: paths.app.latest.getHref(),
    icon: ClockPlusIcon,
  },
  {
    title: 'Top',
    value: 'top',
    to: paths.app.top.getHref(),
    icon: CircleArrowUpIcon,
  },
  {
    title: 'Trending',
    value: 'trending',
    to: paths.app.trending.getHref(),
    icon: TrendingUpIcon,
  },
] as const;

export const sortLabels = SORT_OPTIONS.map((opt) => opt.value);

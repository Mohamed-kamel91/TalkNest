import { useMemo } from 'react';
import { useLocation } from 'react-router';

import { sortLabels } from '../constants';

import type { SortBy } from '../types';

export const DEFAULT_SORT: SortBy = 'latest';

export const getSortFromPathname = (pathname: string): SortBy => {
  const segments = pathname.split('/').filter(Boolean);
  const sort = segments.at(-1) as SortBy;

  return sortLabels.includes(sort) ? sort : DEFAULT_SORT;
};

export const usePostSort = () => {
  const { pathname } = useLocation();

  return useMemo(() => getSortFromPathname(pathname), [pathname]);
};

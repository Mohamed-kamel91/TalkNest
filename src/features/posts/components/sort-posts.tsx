import { NavLinkButton } from '@/components/ui/button';
import { Stack } from '@/components/ui/stack';
import { cn } from '@/lib/utils/cn';

import { SORT_OPTIONS } from '../constants';
import { usePostSort } from '../hooks/use-post-sort';

type PostSortTabsProps = React.ComponentProps<'div'>;

export const SortPosts = ({
  className,
  ...props
}: PostSortTabsProps) => {
  const activeSort = usePostSort();

  return (
    <Stack align="center" className={cn(className)} {...props}>
      {SORT_OPTIONS.map((sort) => {
        return (
          <NavLinkButton
            key={sort.title}
            to={sort.to}
            isActive={sort.value === activeSort}
            radius="circle"
            icon={sort.icon}
          >
            {sort.title}
          </NavLinkButton>
        );
      })}
    </Stack>
  );
};

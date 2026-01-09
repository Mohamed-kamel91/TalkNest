import { For, Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/cn';

export const PostsFeedSkeleton = () => {
  return (
    <For count={5} className="px-5 sm:px-0">
      <PostSkeleton className="max-w-2xl py-5" />
    </For>
  );
};

export const PostSkeleton = ({
  className,
  'aria-label': ariaLabel = 'Loading posts',
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(className)}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy="true"
      {...props}
    >
      <div className="mb-5 flex items-center space-x-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
        <div className="w-full space-y-2">
          <Skeleton className="h-3 max-w-[250px]" />
          <Skeleton className="h-3 max-w-[150px]" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="mb-5 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 max-w-[150px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
};

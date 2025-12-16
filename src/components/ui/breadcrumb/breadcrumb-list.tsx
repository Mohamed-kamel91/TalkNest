import { cn } from '@/lib/utils/cn';

export const BreadcrumbList = ({
  className,
  ...props
}: React.ComponentProps<'ol'>) => {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'flex flex-wrap items-center gap-1.5 sm:gap-2.5',
        'text-sm break-words text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
};

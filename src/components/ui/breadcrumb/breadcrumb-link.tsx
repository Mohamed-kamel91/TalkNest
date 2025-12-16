import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils/cn';

export const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        'transition-colors hover:text-foreground',
        className,
      )}
      {...props}
    />
  );
};

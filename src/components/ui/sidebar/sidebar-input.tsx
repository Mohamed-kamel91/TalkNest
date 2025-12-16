import { cn } from '@/lib/utils/cn';

import { Input } from '../form';

export const SidebarInput = ({
  className,
  ...props
}: React.ComponentProps<typeof Input>) => {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn(
        'h-8 w-full bg-background shadow-none',
        className,
      )}
      {...props}
    />
  );
};

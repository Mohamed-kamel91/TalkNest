import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/utils/cn';

export const DropdownMenuTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => {
  return (
    <DropdownMenuPrimitive.Trigger
      className={cn('cursor-pointer', className)}
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
};

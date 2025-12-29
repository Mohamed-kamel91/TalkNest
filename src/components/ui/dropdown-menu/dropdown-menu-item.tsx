import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/utils/cn';
export const DropdownMenuItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) => {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        'relative flex items-center justify-start gap-3',
        'h-10 w-full px-3 py-1.5',
        'outline-hidden cursor-pointer select-none rounded-md text-sm font-normal',
        'transition-none',
        'focus:bg-accent focus:text-accent-foreground focus-visible:ring-0',

        'data-[inset]:ps-8',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'data-[variant=destructive]:text-destructive',
        'data-[variant=destructive]:focus:bg-destructive/10',
        'data-[variant=destructive]:focus:text-destructive',
        'data-[variant=destructive]:*:[svg]:!text-destructive',
        'dark:data-[variant=destructive]:focus:bg-destructive/20',

        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-5",
        "[&_svg:not([class*='text-'])]:text-current",
        "[&_svg:not([class*='stroke-'])]:stroke-[1.5]",
        className,
      )}
      {...props}
    />
  );
};

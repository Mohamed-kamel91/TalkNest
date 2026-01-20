import * as React from 'react';

import { cn } from '@/lib/utils/cn';

export const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex',
        'h-10 w-full min-w-0 px-3 py-1',
        'text-base md:text-sm',
        'border-input dark:bg-input/30 shadow-xs rounded-md border bg-transparent outline-none',
        'transition-[color,box-shadow]',

        'placeholder:text-muted-foreground',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',

        'file:text-foreground',
        'file:inline-flex',
        'file:h-7',
        'file:border-0',
        'file:bg-transparent',
        'file:text-sm',
        'file:font-medium',

        'aria-invalid:border-destructive',
        'aria-invalid:ring-destructive/20',
        'dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
};

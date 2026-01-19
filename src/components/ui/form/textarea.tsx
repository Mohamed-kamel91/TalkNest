import * as React from 'react';

import { cn } from '@/lib/utils/cn';

export const Textarea = ({
  className,
  ...props
}: React.ComponentProps<'textarea'>) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex',
        'min-h-40 w-full px-3 py-2',
        'field-sizing-content text-base',
        'border-input dark:bg-input/30 shadow-xs rounded-md border bg-transparent outline-none',
        'transition-[color,box-shadow]',

        'placeholder:text-muted-foreground',
        'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',

        'aria-invalid:ring-destructive/20',
        'aria-invalid:border-destructive',
        'dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
};

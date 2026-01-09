import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils/cn';

export const emptyMediaVariants = tv({
  base: cn(
    'mb-2 flex shrink-0 items-center justify-center',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ),
  variants: {
    variant: {
      default: 'bg-transparent',
      icon: cn(
        'flex size-10 shrink-0 items-center justify-center',
        'bg-muted text-foreground rounded-lg',
        '[&_svg:not([class*="size-"])]:size-6',
      ),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type EmptyMediaVariants = VariantProps<
  typeof emptyMediaVariants
>;

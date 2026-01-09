import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils/cn';

const badgeVariants = tv({
  base: cn(
    'inline-flex shrink-0 items-center justify-center gap-1',
    'w-fit overflow-hidden px-2 py-0.5',
    'whitespace-nowrap rounded-full border text-xs font-medium outline-none',
    'transition-[color,box-shadow]',

    'focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',

    '[&>svg]:pointer-events-none [&>svg]:size-3',
  ),
  variants: {
    variant: {
      default:
        'bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent',
      secondary:
        'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent',
      destructive:
        'bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 border-transparent text-white',
      outline:
        'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
export type BadgeProps = React.ComponentProps<'span'> &
  BadgeVariants & { asChild?: boolean };

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

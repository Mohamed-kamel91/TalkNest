import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils/cn';

const buttonVariants = tv({
  base: cn(
    'relative inline-flex shrink-0 items-center justify-center',
    'cursor-pointer rounded-md text-sm font-medium whitespace-nowrap outline-none',
    'transition-all',
    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-5",
    '[&_svg]:stroke-[1.8]',
  ),
  variants: {
    variant: {
      primary:
        'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
      secondary:
        'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
      outline:
        'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
      destructive:
        'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
      ghost:
        'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      link: 'text-primary underline-offset-4 hover:underline',
      unstyled: 'text-primary',
    },
    size: {
      sm: 'h-8 gap-2 px-3 has-[svg]:px-2.5',
      md: 'h-10 gap-3 px-4 has-[svg]:px-3',
      lg: 'h-11 gap-4 px-6 has-[svg]:px-4',
    },
    iconOnly: { true: 'aspect-square px-0!' },
  },
  compoundVariants: [
    { iconOnly: true, size: 'sm', class: 'size-8 [&_svg]:size-4!' },
    {
      iconOnly: true,
      size: 'md',
      class: 'size-9 [&_svg]:size-5!',
    },
    { iconOnly: true, size: 'lg', class: 'size-10 [&_svg]:size-6!' },
  ],

  defaultVariants: {
    variant: 'primary',
    size: 'md',
    // iconSize: 'md',
  },
});

type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

export { buttonVariants, type ButtonVariantsProps };

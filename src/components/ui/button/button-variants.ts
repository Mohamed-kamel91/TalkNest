import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils/cn';

const buttonVariants = tv({
  base: cn(
    'group/button relative inline-flex shrink-0 items-center justify-center',
    'cursor-pointer whitespace-nowrap text-sm font-medium outline-none',
    'transition-[width,height,padding,background-color]',

    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',

    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-5",
    '[&_svg]:stroke-[1.5]',
  ),
  variants: {
    variant: {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      elevated:
        'text-elevated-foreground bg-elevated hover:bg-accent-elevated',
      outline:
        'bg-background hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 border',
      destructive:
        'bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 text-white',
      ghost:
        'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      link: 'text-primary underline-offset-4 hover:underline',
      unstyled: 'text-primary',
    },
    size: {
      sm: 'h-8 gap-1.5 px-3',
      md: 'h-10 gap-2 px-4 has-[svg]:px-3',
      lg: 'h-11 gap-3 px-6 has-[svg]:px-4',
    },
    radius: {
      sharp: 'rounded-none',
      rounded: 'rounded-md',
      circle: 'rounded-full',
    },
    iconOnly: { true: 'px-0! aspect-square rounded-full' },
  },
  compoundVariants: [
    {
      iconOnly: true,
      size: 'sm',
      class: '[&_svg]:size-4! size-8',
    },
    {
      iconOnly: true,
      size: 'md',
      class: '[&_svg]:size-5! size-10',
    },
    {
      iconOnly: true,
      size: 'lg',
      class: '[&_svg]:size-6! size-12',
    },
  ],

  defaultVariants: {
    variant: 'primary',
    size: 'md',
    radius: 'rounded',
  },
});

type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

export { buttonVariants, type ButtonVariantsProps };

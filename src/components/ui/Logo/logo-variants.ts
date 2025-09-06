import { tv, type VariantProps } from 'tailwind-variants';

const logoVariants = tv({
  slots: {
    base: 'flex items-center gap-2 font-medium',
    iconContainer: 'flex items-center justify-center rounded-md',
    icon: '',
    text: '',
  },
  variants: {
    size: {
      sm: {
        iconContainer: 'size-8',
        icon: 'size-4',
        text: 'text-sm',
      },
      md: {
        iconContainer: 'size-10',
        icon: 'size-6',
        text: 'text-base',
      },
      lg: {
        iconContainer: 'size-12',
        icon: 'size-8',
        text: 'text-lg',
      },
    },
    variant: {
      primary: {
        iconContainer: 'bg-primary text-primary-foreground',
        text: 'text-foreground',
      },
      secondary: {
        iconContainer:
          'border border-border bg-transparent text-foreground',
        text: 'text-foreground',
      },
      inverted: {
        iconContainer: 'bg-background text-foreground',
        text: 'text-background',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

type LogoVariantsProps = VariantProps<typeof logoVariants>;

export { logoVariants, type LogoVariantsProps };

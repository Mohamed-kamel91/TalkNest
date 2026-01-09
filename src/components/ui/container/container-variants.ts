import { tv, type VariantProps } from 'tailwind-variants';

const containerVariants = tv({
  base: 'px-5 sm:px-6',
  variants: {
    size: {
      '3xs': 'max-w-3xs',
      '2xs': 'max-w-2xs',
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

type containerVariantsProps = VariantProps<typeof containerVariants>;

export { containerVariants, type containerVariantsProps };

import { tv, type VariantProps } from 'tailwind-variants';

const spinnerVariants = tv({
  base: 'inline-block animate-spin rounded-full border-solid border-e-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    },
    color: {
      default: 'color-current',
      primary: 'color-primary',
      secondary: 'color-secondary',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
});

type SpinnerVariantsProps = VariantProps<typeof spinnerVariants>;

export { spinnerVariants, type SpinnerVariantsProps };

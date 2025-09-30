import { tv, type VariantProps } from 'tailwind-variants';

const spinnerVariants = tv({
  slots: {
    container: 'inline-flex items-center justify-center',
    icon: 'animate-spin rounded-full border-solid border-e-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]',
  },
  variants: {
    size: {
      sm: {
        icon: 'size-4',
      },
      md: {
        icon: 'size-5',
      },
      lg: {
        icon: 'size-6',
      },
      xl: {
        icon: 'size-7',
      },
    },
    color: {
      default: {
        icon: 'text-current',
      },
      primary: {
        icon: 'text-primary',
      },
      secondary: {
        icon: 'text-secondary',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
});

type SpinnerVariantsProps = VariantProps<typeof spinnerVariants>;

export { spinnerVariants, type SpinnerVariantsProps };

import { tv, type VariantProps } from 'tailwind-variants';

const alertVariants = tv({
  base: 'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4.5 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  variants: {
    variant: {
      default: 'bg-card text-card-foreground',
      destructive:
        'bg-card text-destructive *:data-[slot=alert-description]:text-destructive/70 *:data-[slot=alert-title]:text-destructive/90 [&>svg]:text-current',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type AlertVariants = VariantProps<typeof alertVariants>;

export { alertVariants, type AlertVariants };

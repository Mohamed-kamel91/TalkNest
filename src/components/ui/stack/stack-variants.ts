import { tv, type VariantProps } from 'tailwind-variants';

export const stackVariants = tv({
  base: 'flex w-full',
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
      stretch: 'justify-stretch',
    },
    align: {
      stretch: 'items-stretch',
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
    },
    wrap: {
      wrap: 'flex-wrap',
      noWrap: 'flex-nowrap',
      reverse: 'flex-wrap-reverse',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      20: 'gap-20',
    },
  },
  defaultVariants: {
    direction: 'row',
    justify: 'start',
    align: 'stretch',
    wrap: 'noWrap',
    gap: 4,
  },
});

export type StackVariantProps = VariantProps<typeof stackVariants>;

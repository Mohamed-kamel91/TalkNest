import * as React from 'react';

import { cn } from '@/lib/utils/cn';

import {
  stackVariants,
  type StackVariantProps,
} from './stack-variants';

type StackProps = React.ComponentProps<'div'> & StackVariantProps;

export const Stack = ({
  className,
  direction,
  justify,
  align,
  wrap,
  gap,
  ...props
}: StackProps) => {
  return (
    <div
      className={cn(
        stackVariants({
          direction,
          justify,
          align,
          wrap,
          gap,
          className,
        }),
      )}
      {...props}
    />
  );
};

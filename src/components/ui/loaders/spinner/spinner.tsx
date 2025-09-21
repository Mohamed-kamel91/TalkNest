import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import {
  spinnerVariants,
  type SpinnerVariantsProps,
} from './spinner-variants';

type SpinnerProps = SpinnerVariantsProps & {
  className?: string;
};

export const Spinner = ({
  className,
  size = 'md',
  color = 'default',
}: SpinnerProps) => {
  return (
    <Loader2Icon
      className={cn(spinnerVariants({ size, color, className }))}
    />
  );
};

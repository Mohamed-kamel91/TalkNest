import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import {
  spinnerVariants,
  type SpinnerVariantsProps,
} from './spinner-variants';

type SpinnerProps = React.ComponentProps<'div'> &
  SpinnerVariantsProps & {
    className?: string;
  };

export const Spinner = ({
  className,
  size = 'md',
  color = 'default',
  role = 'status',
  'aria-label': ariaLabel = 'Loading',
  ...props
}: SpinnerProps) => {
  const styles = spinnerVariants({ size, color });

  return (
    <div
      className={cn(styles.container({ className }))}
      role={role}
      aria-label={ariaLabel}
      {...props}
    >
      <Loader2Icon className={styles.icon()} />
    </div>
  );
};

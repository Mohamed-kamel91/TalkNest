import * as React from 'react';

import { cn } from '@/lib/utils/cn';

import { alertVariants, type AlertVariants } from './alert-variants';

type AlertProps = React.ComponentProps<'div'> & AlertVariants;

const Alert = ({ className, variant, ...props }: AlertProps) => {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    />
  );
};

const AlertTitle = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="alert-title"
      className={cn('col-start-2 font-medium', className)}
      {...props}
    />
  );
};

const AlertDescription = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  );
};

export { Alert, AlertTitle, AlertDescription };

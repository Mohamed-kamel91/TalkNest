import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/lib/utils/cn';

import {
  buttonVariants,
  type ButtonVariantsProps,
} from './button-variants';
import { Spinner } from '../loaders';

type ButtonProps = React.ComponentProps<'button'> &
  ButtonVariantsProps & {
    asChild?: boolean;
    isLoading?: boolean;
    icon?: React.JSX.Element;
  };

export function Button({
  className,
  variant,
  size,
  icon,
  isLoading = false,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="button"
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Spinner />}
      {!isLoading && icon && <span>{icon}</span>}
      {children}
    </Comp>
  );
}

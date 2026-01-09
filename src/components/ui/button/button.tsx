import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/lib/utils/cn';

import {
  buttonVariants,
  type ButtonVariantsProps,
} from './button-variants';
import { Spinner } from '../loaders';
import { Tooltip, TooltipTrigger, TooltipContent } from '../tooltip';

export type ButtonProps = React.ComponentProps<'button'> &
  ButtonVariantsProps & {
    asChild?: boolean;
    isLoading?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
    icon?: React.JSX.Element;
  };

export function Button({
  className,
  variant,
  size,
  iconOnly,
  radius,
  icon,
  tooltip,
  isLoading = false,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  const button = (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size,
          radius,
          iconOnly,
          className,
        }),
      )}
      data-slot="button"
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Spinner />}
      {!isLoading && icon && <span>{icon}</span>}
      {children}
    </Comp>
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="bottom" align="center" {...tooltip} />
    </Tooltip>
  );
}

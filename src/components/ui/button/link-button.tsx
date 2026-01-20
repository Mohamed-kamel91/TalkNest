import { Link, type LinkProps } from 'react-router';

import { cn } from '@/lib/utils/cn';

import {
  buttonVariants,
  type ButtonVariantsProps,
} from './button-variants';
import { Tooltip, TooltipTrigger, TooltipContent } from '../tooltip';

import type { ButtonProps } from './button';

type LinkButtonProps = ButtonVariantsProps &
  LinkProps & {
    icon?: React.JSX.Element;
    tooltip?: ButtonProps['tooltip'];
  };

export const LinkButton = ({
  to,
  iconOnly,
  variant,
  size,
  radius,
  tooltip,
  icon,
  className,
  children,
  ...props
}: LinkButtonProps) => {
  const link = (
    <Link
      to={to}
      className={cn(
        buttonVariants({
          variant,
          size,
          radius,
          iconOnly,
          className,
        }),
      )}
      {...props}
    >
      {icon && icon}
      {children}
    </Link>
  );

  if (!tooltip) {
    return link;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="bottom" align="center" {...tooltip} />
    </Tooltip>
  );
};

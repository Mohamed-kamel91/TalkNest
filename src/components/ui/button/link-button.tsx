import { Link, type LinkProps } from 'react-router';

import { cn } from '@/lib/utils/cn';

import {
  buttonVariants,
  type ButtonVariantsProps,
} from './button-variants';

type LinkButtonProps = ButtonVariantsProps &
  LinkProps & {
    icon?: React.JSX.Element;
  };

export const LinkButton = ({
  to,
  iconOnly,
  variant,
  size,
  radius,
  icon,
  className,
  children,
  ...props
}: LinkButtonProps) => {
  return (
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
};

import { Link, type LinkProps } from 'react-router';

import { cn } from '@/lib/utils/cn';

import {
  buttonVariants,
  type ButtonVariantsProps,
} from './button-variants';

type LinkButtonProps = ButtonVariantsProps &
  LinkProps & {
    icon?: React.JSX.Element;
    isActive?: boolean;
  };

export const LinkButton = ({
  to,
  iconOnly,
  variant,
  size,
  icon,
  className,
  isActive = false,
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
          iconOnly,
          className,
        }),
        isActive && '',
      )}
      {...props}
    >
      {icon && icon}
      {children}
    </Link>
  );
};

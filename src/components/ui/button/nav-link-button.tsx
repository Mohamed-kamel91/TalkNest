import { type LucideIcon } from 'lucide-react';
import React from 'react';
import { Link, type LinkProps } from 'react-router';

import { cn } from '@/lib/utils/cn';

import {
  buttonVariants,
  type ButtonVariantsProps,
} from './button-variants';

type IconType = React.ReactElement | LucideIcon;
type IconActiveVariant = 'fill' | 'stroke';
type IconConfig = {
  render: IconType;
  activeVariant?: IconActiveVariant;
};

type NavLinkButtonProps = ButtonVariantsProps &
  LinkProps & {
    isActive?: boolean;
    icon?: IconType | IconConfig;
  };

const isReactElement = (
  icon: IconType,
): icon is React.ReactElement => {
  return React.isValidElement(icon);
};

const isIconConfig = (
  icon: NavLinkButtonProps['icon'],
): icon is IconConfig => {
  return (
    typeof icon === 'object' &&
    icon !== null &&
    Object.hasOwn(icon, 'render') &&
    !React.isValidElement(icon)
  );
};

export const NavLinkButton = ({
  to,
  className,
  isActive = false,
  variant = 'ghost',
  size,
  radius,
  iconOnly,
  icon,
  children,
  ...props
}: NavLinkButtonProps) => {
  const renderIcon = ({
    icon,
    activeVariant = 'stroke',
  }: {
    icon: IconType;
    activeVariant?: IconActiveVariant;
  }) => {
    if (isReactElement(icon)) {
      return icon;
    }

    const IconComponent = icon;
    const activeStyle =
      activeVariant === 'fill' ? '!fill-current' : '!stroke-[2.5]';
    return <IconComponent className={cn(isActive && activeStyle)} />;
  };

  const displayIcon = () => {
    if (!icon) return null;

    if (isIconConfig(icon)) {
      return renderIcon({
        icon: icon.render,
        activeVariant: icon.activeVariant,
      });
    }

    return renderIcon({ icon });
  };

  return (
    <Link
      to={to}
      className={cn(
        buttonVariants({
          variant: isActive ? 'secondary' : variant,
          size,
          radius,
          iconOnly,
          className,
        }),
        !isActive && 'font-normal',
      )}
      {...props}
    >
      {displayIcon()}
      {children}
    </Link>
  );
};

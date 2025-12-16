import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils/cn';

import { useSidebar } from './sidebar-provider';
import { Tooltip, TooltipTrigger, TooltipContent } from '../tooltip';

export const sidebarMenuButtonVariants = tv({
  base: cn(
    'peer/menu-button flex w-full items-center justify-start gap-3',
    'overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden',
    'transition-[width,height,padding]',
    '[&>span:last-child]:truncate [&>svg]:size-5 [&>svg]:shrink-0',

    'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
    'group-data-[collapsible=icon]:size-8!',
    'group-data-[collapsible=icon]:p-2!',

    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    'focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground',
    'disabled:pointer-events-none disabled:opacity-50',

    'aria-disabled:pointer-events-none aria-disabled:opacity-50',

    'data-[active=true]:bg-sidebar-accent',
    'data-[active=true]:font-medium',
    'data-[active=true]:text-sidebar-accent-foreground',
    'data-[state=open]:hover:bg-sidebar-accent',
    'data-[state=open]:hover:text-sidebar-accent-foreground',
  ),
  variants: {
    variant: {
      primary:
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      outline: cn(
        'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))]',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      ),
    },
    size: {
      sm: 'h-8 text-xs',
      md: 'h-10 px-4',
      lg: 'h-11 group-data-[collapsible=icon]:p-0!',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type SidebarMenuButtonVariants = VariantProps<
  typeof sidebarMenuButtonVariants
>;

type SidebarMenuButtonProps = React.ComponentProps<'button'> &
  SidebarMenuButtonVariants & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  };

export const SidebarMenuButton = ({
  asChild = false,
  isActive = false,
  variant = 'primary',
  size = 'md',
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        sidebarMenuButtonVariants({ variant, size }),
        className,
      )}
      {...props}
    />
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
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
};

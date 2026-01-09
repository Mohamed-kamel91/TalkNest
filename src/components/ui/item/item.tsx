import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils/cn';

import { Separator } from '../seperator';
import {
  itemVariants,
  itemMediaVariants,
  type ItemVariants,
  type ItemMediaVariants,
} from './item-variants';

function ItemGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn('group/item-group flex flex-col', className)}
      {...props}
    />
  );
}

const ItemSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) => {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn('my-0', className)}
      {...props}
    />
  );
};

type ItemProps = React.ComponentProps<'div'> &
  ItemVariants & { asChild?: boolean };

const Item = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ItemProps) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  );
};

type ItemMediaProps = React.ComponentProps<'div'> & ItemMediaVariants;

const ItemMedia = ({
  className,
  variant = 'default',
  ...props
}: ItemMediaProps) => {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
};

const ItemContent = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="item-content"
      className={cn(
        'flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none',
        className,
      )}
      {...props}
    />
  );
};

const ItemTitle = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="item-title"
      className={cn(
        'flex w-fit items-center gap-2 text-sm font-medium leading-snug',
        className,
      )}
      {...props}
    />
  );
};

const ItemDescription = ({
  className,
  ...props
}: React.ComponentProps<'p'>) => {
  return (
    <p
      data-slot="item-description"
      className={cn(
        'text-muted-foreground line-clamp-2 text-balance text-sm font-normal leading-normal',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  );
};

const ItemActions = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="item-actions"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
};

const ItemHeader = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="item-header"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      {...props}
    />
  );
};

const ItemFooter = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      {...props}
    />
  );
};

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};

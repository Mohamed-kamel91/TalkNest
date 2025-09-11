import { cn } from '@/lib/utils';

import {
  containerVariants,
  type containerVariantsProps,
} from './container-variants';

type ContainerProps = React.ComponentProps<'div'> &
  containerVariantsProps;

export const Container = ({
  size,
  className,
  ...props
}: ContainerProps) => (
  <div
    className={cn(containerVariants({ size, className }))}
    {...props}
  />
);

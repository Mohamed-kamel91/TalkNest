import { CircleAlertIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import { Stack } from '../stack';

type FieldErrorTextProps = React.ComponentProps<typeof Stack> & {
  errorText?: string | undefined;
  withErrorIcon?: boolean;
};

export const FieldErrorText = ({
  className,
  errorText,
  withErrorIcon = true,
  ...props
}: FieldErrorTextProps) => {
  if (!errorText) return null;

  return (
    <Stack
      align="center"
      className={cn('text-destructive gap-1.5 text-xs', className)}
      role="alert"
      {...props}
    >
      {withErrorIcon && <CircleAlertIcon size={15} />}
      {errorText}
    </Stack>
  );
};

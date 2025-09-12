import { cn } from '@/lib/utils/cn';

type FieldErrorTextProps = React.ComponentProps<'div'> & {
  errorText?: string | undefined;
};

export const FieldErrorText = ({
  className,
  errorText,
  ...props
}: FieldErrorTextProps) => {
  if (!errorText) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        'text-xs text-destructive',
        className,
      )}
      role="alert"
      {...props}
    >
      <span>{errorText}</span>
    </div>
  );
};

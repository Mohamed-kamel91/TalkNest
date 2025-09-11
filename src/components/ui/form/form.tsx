import { cn } from '@/lib/utils';

export const Form = ({
  id,
  className,
  children,
  onSubmit,
}: React.ComponentProps<'form'>) => {
  return (
    <form
      id={id}
      className={cn('flex flex-col gap-6', className)}
      onSubmit={onSubmit}
      noValidate
    >
      {children}
    </form>
  );
};

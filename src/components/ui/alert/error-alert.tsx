import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from './alert';

type ErrorAlertProps = React.ComponentProps<'div'> & {
  title: string;
  description?: string;
  testId?: string;
};

export const ErrorAlert = ({
  title,
  description,
  testId,
  ...props
}: ErrorAlertProps) => {
  return (
    <Alert variant="destructive" testId={testId} {...props}>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      {description && (
        <AlertDescription>{description}</AlertDescription>
      )}
    </Alert>
  );
};

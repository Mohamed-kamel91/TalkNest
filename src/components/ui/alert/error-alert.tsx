import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from './alert';

type ErrorAlertProps = {
  title: string;
  description?: string;
};

export const ErrorAlert = ({
  title,
  description,
}: ErrorAlertProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      {description && (
        <AlertDescription>{description}</AlertDescription>
      )}
    </Alert>
  );
};

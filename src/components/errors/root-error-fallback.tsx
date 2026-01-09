import { TriangleAlertIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { getErrorMessage } from '@/lib/utils/error-utils';

import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { Stack } from '../ui/stack';

type ErrorFallbackProsp = {
  error?: Error;
  resetErrorBoundary?: (...args: any[]) => void;
};

export const RootErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProsp) => {
  const handleRetry = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        'h-screen w-screen p-5 sm:p-6',
      )}
      role="alert"
    >
      <Container
        className="flex flex-col items-center justify-center gap-2"
        size="4xl"
      >
        <Stack
          justify="center"
          align="center"
          className={cn(
            'size-10 shrink-0',
            'bg-muted text-foreground rounded-lg',
          )}
        >
          <TriangleAlertIcon className="text-destructive/80" />
        </Stack>

        <h2 className="text-center text-xl font-medium">
          {getErrorMessage(error)}
        </h2>

        <Button
          className="mt-2"
          radius="circle"
          onClick={handleRetry}
        >
          Try Again
        </Button>
      </Container>
    </div>
  );
};

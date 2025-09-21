import { cn } from '@/lib/utils/cn';
import { getErrorMessage } from '@/lib/utils/error-utils';

import { Button } from '../ui/button';
import { Container } from '../ui/container';

type ErrorFallbackProsp = {
  error?: Error;
  resetErrorBoundary?: (...args: any[]) => void;
};

export const ErrorFallback = ({
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
        'h-screen w-screen p-6 md:p-10',
      )}
      role="alert"
    >
      <Container
        size="4xl"
        className="flex flex-col items-center justify-center gap-5 px-0!"
      >
        <h2 className="text-center text-xl">
          {`${getErrorMessage(error)} Please try again.`}
        </h2>

        <Button onClick={handleRetry}>Try Again</Button>
      </Container>
    </div>
  );
};

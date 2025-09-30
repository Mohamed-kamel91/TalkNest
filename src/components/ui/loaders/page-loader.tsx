import { Spinner } from './spinner/spinner';

export const PageLoader = () => {
  return (
    <div
      className="flex h-screen w-screen items-center justify-center"
      aria-label="Page loading"
    >
      <Spinner size="xl" />
    </div>
  );
};

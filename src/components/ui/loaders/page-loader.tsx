import { Spinner } from './spinner/spinner';

export const PageLoader = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
};

import { cn } from '@/lib/utils';

import { Head } from '../seo/head';
import { Logo as AppLogo } from '../ui/Logo';

type AuthLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const AuthLayout = ({
  title,
  description,
  children,
}: AuthLayoutProps) => {
  return (
    <>
      <Head title={title} description={description} />
      <div
        className={cn(
          'flex items-center justify-center',
          'min-h-svh w-full',
        )}
      >
        <div
          className={cn(
            'flex flex-col items-center gap-4',
            'mx-auto w-full max-w-120 p-6 md:p-10',
          )}
        >
          <AppLogo />
          <div className="w-full">{children}</div>
        </div>
      </div>
    </>
  );
};

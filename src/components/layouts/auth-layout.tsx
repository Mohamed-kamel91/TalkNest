import { cn } from '@/lib/utils';

import { Head } from '../seo/head';
import { Container } from '../ui/container';
import { Logo as AppLogo } from '../ui/logo';
import { Stack } from '../ui/stack';

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
        <Container className="w-full">
          <Stack direction="col" align="center">
            <AppLogo />
            <div className="w-full">{children}</div>
          </Stack>
        </Container>
      </div>
    </>
  );
};

import { cn } from '@/lib/utils/cn';

import { Head } from '../seo/head';
import {
  Container,
  type containerVariantsProps,
} from '../ui/container';

type ContentLayoutProps = React.ComponentProps<'div'> & {
  title?: string;
  description?: string;
  size?: containerVariantsProps['size'];
  children: React.ReactNode;
};

export const ContentLayout = ({
  className,
  title,
  description,
  size = '3xl',
  children,
  ...props
}: ContentLayoutProps) => (
  <>
    <Head title={title} description={description} />

    <Container
      className={cn('w-full p-6!', className)}
      size={size}
      {...props}
    >
      {title && <h1 className="mb-4 text-xl font-bold">{title}</h1>}
      {children}
    </Container>
  </>
);

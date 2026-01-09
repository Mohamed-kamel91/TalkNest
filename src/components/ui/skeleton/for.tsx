import React from 'react';

import { cn } from '@/lib/utils/cn';

interface RepeaterProps {
  count?: number;
  className?: string;
  children: React.ReactNode;
}

export const For = ({
  className = '',
  count = 2,
  children,
}: RepeaterProps) => {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{children}</React.Fragment>
      ))}
    </div>
  );
};

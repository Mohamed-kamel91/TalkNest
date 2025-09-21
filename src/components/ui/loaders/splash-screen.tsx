import { Feather } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import { logoVariants } from '../logo';

export const SplashScreen = () => {
  const styles = logoVariants({ size: 'xl' });

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        'h-screen w-screen p-6 md:p-10',
      )}
    >
      <div className={styles.iconContainer()}>
        <Feather className={styles.icon({ size: 'lg' })} />
      </div>
    </div>
  );
};

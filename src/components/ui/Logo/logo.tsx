import { Feather } from 'lucide-react';
import { Link } from 'react-router';

import {
  logoVariants,
  type LogoVariantsProps,
} from './logo-variants';

type LogoProps = LogoVariantsProps & {
  className?: string;
  withText?: boolean;
};

export const Logo = ({
  className = '',
  size,
  variant,
  withText = false,
}: LogoProps) => {
  const styles = logoVariants({ size, variant });

  return (
    <Link to="/" className={styles.base({ className })}>
      <div className={styles.iconContainer()}>
        <Feather className={styles.icon()} />
      </div>
      {withText && <span className={styles.text()}>TalkNest</span>}
    </Link>
  );
};

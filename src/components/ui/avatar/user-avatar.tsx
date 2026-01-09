import { useEffect, useState } from 'react';

import { getInitials } from '@/lib/utils/name-utils';

import { Avatar, AvatarImage, AvatarFallback } from './avatar';

interface UserAvatarProps
  extends React.ComponentProps<typeof Avatar> {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export const UserAvatar = ({
  firstName = '',
  lastName = '',
  avatarUrl,
  className,
  ...props
}: UserAvatarProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // Prefetch img
  useEffect(() => {
    if (!avatarUrl) return;

    // reset states when imageUrl changes
    setIsLoaded(false);
    setIsError(false);

    const img = new Image();

    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsError(true);
    img.src = avatarUrl;
  }, [avatarUrl]);

  return (
    <Avatar className={className} {...props}>
      {isLoaded && (
        <AvatarImage
          src={avatarUrl}
          alt={`${firstName} ${lastName} avatar`}
        />
      )}

      {isError && (
        <AvatarFallback className="tracking-widest">
          {getInitials(firstName, lastName)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

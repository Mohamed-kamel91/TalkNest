import { cn } from '@/lib/utils/cn';
import { getInitials } from '@/lib/utils/name-utils';

import { Avatar, AvatarImage, AvatarFallback } from './avatar';

interface UserAvatarProps
  extends React.ComponentProps<typeof Avatar> {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export const UserAvatar = ({
  firstName = '',
  lastName = '',
  imageUrl,
  className,
  ...props
}: UserAvatarProps) => {
  return (
    <Avatar
      className={cn('size-10 rounded-full', className)}
      {...props}
    >
      <AvatarImage
        src={imageUrl}
        alt={`${firstName} ${lastName} avatar`}
      />
      <AvatarFallback>
        {getInitials(firstName, lastName)}
      </AvatarFallback>
    </Avatar>
  );
};

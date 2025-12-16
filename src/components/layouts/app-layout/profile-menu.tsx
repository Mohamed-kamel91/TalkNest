import {
  SettingsIcon,
  UserIcon,
  SquarePenIcon,
  FileTextIcon,
  LogOutIcon,
} from 'lucide-react';

import { UserAvatar } from '@/components/ui/avatar';
import { Button, LinkButton } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLogout, useUser } from '@/lib/api/auth';
import { cn } from '@/lib/utils/cn';
import { getFullName } from '@/lib/utils/name-utils';

import type { ButtonProps } from '@/components/ui/button/button';

const ProfileMenuHeader = ({
  firstName,
  lastName,
  email,
}: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  const fullName = getFullName(firstName, lastName);

  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <UserAvatar firstName={firstName} lastName={lastName} />
      <div
        className={cn(
          'grid flex-1',
          'text-left text-sm leading-tight',
        )}
      >
        <span className="truncate font-medium">{fullName}</span>
        <span className="truncate text-xs text-muted-foreground">
          {email}
        </span>
      </div>
    </div>
  );
};

const LogoutButton = (props: ButtonProps) => {
  const { isPending, mutate } = useLogout();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    mutate({});
  };

  return (
    <Button
      {...props}
      variant="unstyled"
      icon={<LogOutIcon />}
      isLoading={isPending}
      onClick={handleClick}
    >
      Log out
    </Button>
  );
};

export const ProfileMenu = () => {
  const user = useUser();

  if (!user?.data) return null;

  const { firstName, lastName, email } = user.data;

  return (
    <DropdownMenu>
      <Tooltip>
        <DropdownMenuTrigger className={cn('rounded-full')} asChild>
          <TooltipTrigger>
            <UserAvatar firstName={firstName} lastName={lastName} />
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <TooltipContent collisionPadding={14}>
          Profile menu
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        collisionPadding={16}
        className="min-w-3xs"
      >
        <DropdownMenuGroup>
          <ProfileMenuHeader
            firstName={firstName}
            lastName={lastName}
            email={email}
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <LinkButton
              to="/profile"
              className=""
              variant="unstyled"
              icon={<UserIcon />}
            >
              Profile
            </LinkButton>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <LinkButton
              to="/posts"
              variant="unstyled"
              icon={<FileTextIcon />}
            >
              My posts
            </LinkButton>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button variant="unstyled" icon={<SquarePenIcon />}>
              Create post
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <LinkButton
              to="/settings"
              variant="unstyled"
              icon={<SettingsIcon />}
            >
              Settings
            </LinkButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            asChild
            onSelect={(e) => e.preventDefault()}
          >
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

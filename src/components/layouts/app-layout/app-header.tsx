import { SquarePenIcon, BellIcon, SearchIcon } from 'lucide-react';
import { useLocation } from 'react-router';

import { Button, LinkButton } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Separator } from '@/components/ui/seperator/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { Stack } from '@/components/ui/stack';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/api/auth';
import { cn } from '@/lib/utils/cn';

import { AppSidebarTrigger } from './app-sidebar-trigger';
import { ProfileMenu } from './profile-menu';
import { SearchForm } from './search-form';

const LoginButton = () => {
  const location = useLocation();

  return (
    <LinkButton
      to={paths.auth.login.getHref(
        `${location.pathname}${location.search}`,
      )}
    >
      Log in
    </LinkButton>
  );
};

export function AppHeader() {
  const user = useUser();
  const { isMobile } = useSidebar();

  return (
    <header
      className={cn('sticky top-0 z-50', 'border-b bg-background')}
    >
      <Stack
        className={cn('h-(--header-height) w-full px-6')}
        align="center"
        justify="between"
        gap={2}
      >
        {/* Left */}
        <Stack className="h-full" align="center">
          <AppSidebarTrigger />
          <Separator className="me-2" orientation="vertical" />
          <Logo size="sm" withText />
        </Stack>

        {/* Center */}
        <div className="w-sm">{!isMobile && <SearchForm />}</div>

        {/* Right */}
        <Stack align="center">
          <Stack align="center" justify="end">
            {isMobile ? (
              <Button
                iconOnly
                variant="ghost"
                tooltip="Search"
                icon={<SearchIcon />}
                aria-label="Search"
              />
            ) : (
              user.data && (
                <Button
                  iconOnly
                  variant="ghost"
                  tooltip="Create post"
                  icon={<SquarePenIcon />}
                  aria-label="Create post"
                />
              )
            )}

            {user?.data ? (
              <>
                <Button
                  iconOnly
                  variant="ghost"
                  tooltip="Notifications"
                  icon={<BellIcon />}
                  aria-label="Notifications"
                />
                <ProfileMenu />
              </>
            ) : (
              <LoginButton />
            )}
          </Stack>
        </Stack>
      </Stack>
    </header>
  );
}

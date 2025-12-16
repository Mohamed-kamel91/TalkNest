import {
  HomeIcon,
  RocketIcon,
  TelescopeIcon,
  XIcon,
} from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Stack } from '@/components/ui/stack';
import { cn } from '@/lib/utils/cn';

import { NavMain } from './nav-main';

const sidebarNav = {
  main: [
    {
      title: 'Home',
      to: '/',
      icon: HomeIcon,
    },
    {
      title: 'Popular',
      to: '/popular',
      icon: RocketIcon,
    },
    {
      title: 'Explore',
      to: '/explore',
      icon: TelescopeIcon,
    },
  ],
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <Sidebar
      className={cn(
        'top-(--header-height)',
        'h-[calc(100svh-var(--header-height))]!',
      )}
      aria-label="app-sidebar"
      {...props}
    >
      {isMobile && (
        <SidebarHeader className="px-4 py-6">
          <Stack justify="between" align="center">
            <Logo size="sm" withText />
            <Button
              iconOnly
              variant="ghost"
              tooltip={{ side: 'right', children: 'Close sidebar' }}
              icon={<XIcon />}
              aria-label="Close sidebar"
              onClick={toggleSidebar}
            />
          </Stack>
        </SidebarHeader>
      )}

      <SidebarContent>
        <NavMain items={sidebarNav.main} />
      </SidebarContent>
    </Sidebar>
  );
}

import { Outlet } from 'react-router';

import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';

import { AppHeader } from './app-header';
import { AppSidebar } from './app-sidebar';

export const AppLayout = () => {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <AppHeader />

        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

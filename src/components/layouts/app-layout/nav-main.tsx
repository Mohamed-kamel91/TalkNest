import { type LucideIcon } from 'lucide-react';
import { useLocation } from 'react-router';

import { NavLinkButton } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

type navItem = {
  title: string;
  to: string;
  icon: LucideIcon;
};

type NavMainProps = {
  items: navItem[];
};

export function NavMain({ items }: NavMainProps) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLinkButton
                    to={item.to}
                    variant="ghost"
                    isActive={location.pathname === item.to}
                    icon={item.icon}
                  >
                    {item.title}
                  </NavLinkButton>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

import { type LucideIcon } from 'lucide-react';
import { useLocation } from 'react-router';

import { LinkButton } from '@/components/ui/button';
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
  isActive?: boolean;
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
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <LinkButton
                  to={item.to}
                  variant="unstyled"
                  icon={<item.icon />}
                  data-active={location.pathname === item.to}
                >
                  {item.title}
                </LinkButton>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

import { TextAlignEndIcon as SidebarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  useSidebar,
  type SidebarTrigger,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils/cn';

export const AppSidebarTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof SidebarTrigger>) => {
  const { open, openMobile, isMobile, toggleSidebar } = useSidebar();
  const isOpen = isMobile ? openMobile : open;

  const label = `${isOpen ? 'Close' : 'Open'} sidebar`;

  return (
    <Button
      className={cn(className)}
      iconOnly
      variant="ghost"
      onClick={toggleSidebar}
      tooltip={{ collisionPadding: 14, children: label }}
      icon={<SidebarIcon />}
      aria-label={label}
      {...props}
    />
  );
};

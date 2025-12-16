import { Search } from 'lucide-react';

import { Label } from '@/components/ui/form';
import { SidebarInput } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils/cn';

export function SearchForm({
  ...props
}: React.ComponentProps<'form'>) {
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Search..."
          className="h-9 pl-7"
        />
        <Search
          className={cn(
            'absolute top-1/2 left-2',
            'size-4',
            'pointer-events-none -translate-y-1/2 opacity-50 select-none',
          )}
        />
      </div>
    </form>
  );
}

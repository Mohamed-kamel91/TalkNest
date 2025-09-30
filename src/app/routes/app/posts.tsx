import { Button } from '@/components/ui/button';
import { useLogout } from '@/lib/api/auth';

export const Posts = () => {
  const logout = useLogout();
  return (
    <div className="w-scree flex h-screen justify-between px-20 py-10">
      <div>posts</div>
      <Button onClick={() => logout.mutate({})}>Logout</Button>
    </div>
  );
};

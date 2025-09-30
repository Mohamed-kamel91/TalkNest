import { Navigate, Outlet, useLocation } from 'react-router';

import { paths } from '@/config/paths';
import { useUser } from '@/lib/api/auth';

export const RestrictedRoute = () => {
  const user = useUser();
  const location = useLocation();

  const redirectTo = location.state?.from || paths.app.root.getHref();

  if (user.data) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

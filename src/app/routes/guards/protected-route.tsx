import { Navigate, Outlet, useLocation } from 'react-router';

import { paths } from '@/config/paths';
import { useUser } from '@/lib/api/auth';

export const ProtectedRoute = () => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate
        to={paths.auth.login.getHref(
          `${location.pathname}${location.search}`,
        )}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};

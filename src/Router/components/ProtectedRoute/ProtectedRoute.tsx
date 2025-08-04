import { Navigate, Outlet } from 'react-router-dom';

import { useSession } from 'src/stores/useSession';

export default function ProtectedRoute() {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
}

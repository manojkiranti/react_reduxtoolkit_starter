import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
/**
 * * code splitting
 *  This approach reduces the initial load time by loading the component only when it's needed.
 */
import { lazyImport } from '@/shared/utils/lazy/lazy-import-utils';

import { MainLayout } from '@/components/Layout';
import { Spinner } from '@/components/Elements';

/**
 * todo: should use lazyImport for code splitting
 */
import { ProfilePage } from '@/pages/profile';
import { RequireAuth } from '@/components/Auth/RequireAuth';

const { DashboardRoutes } = lazyImport(
  () => import('@/pages/dashboard'),
  'DashboardRoutes',
);

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '',
    element: <RequireAuth />,
    children: [
      {
        path: '',
        element: <App />,
        children: [
          { path: 'dashboard/*', element: <DashboardRoutes /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'dashboard/*', element: <DashboardRoutes /> },
          { path: '*', element: <Navigate to="." /> },
        ],
      },
    ],
  },
];

import { lazyImport } from '@/shared/utils/lazy/lazy-import-utils';

const { AuthRoutes } = lazyImport(() => import('@/pages/auth'), 'AuthRoutes');

export const authRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
];

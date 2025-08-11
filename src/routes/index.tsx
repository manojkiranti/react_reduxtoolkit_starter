import { useRoutes } from 'react-router-dom';

import { authRoutes } from './auth';
import { protectedRoutes } from './protected';

export const AppRoutes = () => {
  /**
   * TODO: Filter procted routes and public routes remaining.
   * TODO: create a hook to verify authenticated user
   */

  const element = useRoutes([
    ...authRoutes,
    ...protectedRoutes,
  ]);

  return <>{element}</>;
};

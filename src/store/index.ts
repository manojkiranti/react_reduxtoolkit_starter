import { configureStore } from '@reduxjs/toolkit';

//apis
import { authApi } from './apis/authApi';
import { userApi } from './apis/userApi';

import { coreAPI } from '@/store/apis/coreApi';
import { dashboardApi } from '@/pages/dashboard/apis/dashboardApi';
import { profileApi } from '@/pages/profile/api/profileApi';

import { driveApi } from './apis/driveApi';

//slices
import auth from './slices/auth/authSlice';
import common from './slices/common/commonSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [coreAPI.reducerPath]: coreAPI.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [driveApi.reducerPath]: driveApi.reducer,
    auth: auth,
    common: common,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      coreAPI.middleware,
      dashboardApi.middleware,
      profileApi.middleware,
      driveApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

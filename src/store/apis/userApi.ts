import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '@/lib/baseQuery';

import { ApiResponse, User, UserMini } from '@/shared/types';

export type ProfilePayload = {
  name: string;
  phone: string;
  designationId: number;
}
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<UserMini[]>, void>({
      query: () => ({
        url: '/v1/users',  
        method: 'GET',  
      })
    }),
    updateProfile: builder.mutation<ApiResponse<User>, Partial<ProfilePayload>>({
      query: (body) => ({
        url: '/v1/users/me/profile',
        method: 'PUT',
        body
      })
    })
  }),
});
export const {
 useGetUsersQuery,
 useUpdateProfileMutation,
} = userApi;

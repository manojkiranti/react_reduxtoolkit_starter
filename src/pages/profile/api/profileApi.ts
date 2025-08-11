import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from '@/lib/baseQuery';
import { ApiResponse } from '@/shared/types';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({

    getLeadStepData: builder.query<ApiResponse<any>, { id: string }>({
        query: ({ id }) => {
          return {
            url: `v1/users/${id}`,
            method: 'GET',
          };
        },
      }),
  }),

  
});

export const {
  useGetLeadStepDataQuery,
} = profileApi;

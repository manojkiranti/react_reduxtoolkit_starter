import { customBaseQuery } from '@/lib/baseQuery';
import { ApiResponse } from '@/shared/types';
import { Api, createApi } from '@reduxjs/toolkit/query/react';
import queryString from 'query-string';

type LookupType = 'gender' | 'titles' | 'frequency' | 'lenders'| 'designation' | 'citizenship';
interface GetLookupOptionsParams {
  types?: LookupType[];
}

export const coreAPI = createApi({
  reducerPath: 'coreAPI',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    fetchCountryByIP: builder.query<
      { data: { country: string; ip: string } },
      void
    >({
      query: () => '/api/core/user-country/',
    }),


    getSearchResults: builder.query<
      ApiResponse<any>,
      { query: string; fetchAll?: boolean }
    >({
      query: ({ query, fetchAll = false }) => {
        const searchParams = new URLSearchParams({
          searchQuery: query,
          fetchAll: fetchAll.toString(),
        });
        return {
          url: `/global-search?${searchParams.toString()}`,
        };
      },
    }),
    getOptionsList: builder.query<ApiResponse<any>, GetLookupOptionsParams>({
      query: ({ types }) => {
        const query = queryString.stringify({ types }, { arrayFormat: 'comma' });
        return {
          url: `v1/meta/lookup?${query}`
        }

      }
    }),
 


  }),
});

export const {
  useFetchCountryByIPQuery,
  useGetSearchResultsQuery,
  useGetOptionsListQuery,
} = coreAPI;

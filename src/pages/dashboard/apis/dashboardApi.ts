import { customBaseQuery } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    fetchAdminDashboardData: builder.query<any, void>({
      query: () => "/v1/online-assessment/dashboard",
    }),
  }),
});

export const {  useFetchAdminDashboardDataQuery } =
  dashboardApi;

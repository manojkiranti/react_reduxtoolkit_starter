import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Designation } from '@/shared/types';
import { SetPasswordPayload } from '@/pages/auth/types';

interface VerifyTokenRequest {
  code: string;
}

interface AuthLoginResponse {
  accessToken: string;
  email: string;
  name: string | null;
  is2FAEnabled: boolean;
  isSuperuser: boolean;
  isActive: true;
  roles: string[];
  userId: string;
  tempToken: string | null;
  phone: string | null;
  designation: Designation | null;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  fullname: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  is_2fa_enabled: boolean;
  two_factor_required: boolean;
  temp_token?: string;
  phone: string | null;
  designation: Designation | null;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    fetchGoogleAuthLink: builder.query<string, void>({
      query: () => 'v1/auth/google-auth-link',
      transformResponse: (response: ApiResponse<string>) => {
        return response.data;
      },
    }),
    verifyGoogleToken: builder.mutation<
      ApiResponse<AuthLoginResponse>,
      VerifyTokenRequest
    >({
      query: (body) => ({
        url: 'v1/auth/google-verify',
        method: 'POST',
        body,
      }),
    }),
    userLogin: builder.mutation<ApiResponse<AuthLoginResponse>, LoginRequest>({
      query: (body) => ({
        url: 'v1/auth/login',
        method: 'POST',
        body,
      }),
    }),
    userRegister: builder.mutation<
      ApiResponse<{ message: string }>,
      { body: RegisterRequest }
    >({
      query: ({ body }) => {
        return {
          url: `/v1/auth/register`,
          method: 'POST',
          body,
        };
      },
    }),

    resendRegisterEmail: builder.mutation<
      ApiResponse<{ message: string }>,
      { email: string }
    >({
      query: (body) => ({
        url: '/api/auth/resend-verification-email/',
        method: 'POST',
        body,
      }),
    }),

    setPassword: builder.mutation<
      ApiResponse<{
        message: string;
        refresh_token: string;
        access_token: string;
        fullname: string;
        email: string;
      }>,
      SetPasswordPayload
    >({
      query: (body) => ({
        url: 'api/auth/set-password/',
        method: 'POST',
        body,
      }),
    }),
    forgetPassword: builder.mutation<
      ApiResponse<{ message: string }>,
      { email: string }
    >({
      query: (body) => ({
        url: 'api/auth/forgot-password/',
        method: 'POST',
        body,
      }),
    }),
    verifyRegisterEmail: builder.query<
      ApiResponse<{
        message: string;
        refresh_token: string;
        access_token: string;
        email: string;
        fullname: string;
      }>,
      { token: string }
    >({
      query: ({ token }) => `api/auth/verify-email/${token}/`,
    }),
    verify2FA: builder.mutation<
      LoginResponse,
      { code: string | number; temp_token: string }
    >({
      query: (body) => ({
        url: 'api/auth/verify-2fa/',
        method: 'POST',
        body,
      }),
    }),
    loginWithOtp: builder.mutation<ApiResponse<any>, { phone: string }>({
      query: (body) => ({
        url: 'api/auth/login-with-phone/',
        method: 'POST',
        body,
      }),
    }),
    verifyOtpLogin: builder.mutation<
      ApiResponse<any>,
      { code: string | number; phone: string }
    >({
      query: (body) => ({
        url: 'api/auth/login-with-phone-verify-otp/',
        method: 'POST',
        body,
      }),
    }),
  }),
});
export const {
  useFetchGoogleAuthLinkQuery,
  useVerifyGoogleTokenMutation,
  useUserLoginMutation,
  useSetPasswordMutation,
  useForgetPasswordMutation,
  useUserRegisterMutation,
  useVerifyRegisterEmailQuery,
  useVerify2FAMutation,
  useResendRegisterEmailMutation,
  useLoginWithOtpMutation,
  useVerifyOtpLoginMutation,
} = authApi;

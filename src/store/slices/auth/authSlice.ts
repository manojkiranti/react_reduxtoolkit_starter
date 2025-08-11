import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser } from '@/shared/types';
import { storageUtil } from '@/shared/utils/storage/local-storage';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  userData: AuthUser | null;
  tempToken: string | null | undefined;
  clientToken: string | null;
}

const initialState: AuthState = {
  token: storageUtil.getItem<string>('auth_token'),
  refreshToken: storageUtil.getItem<string>('refresh_token'),
  isAuthenticated: !!storageUtil.getItem<string>('auth_token'),
  userData: storageUtil.getItem<AuthUser>('userData'),
  tempToken: storageUtil.getItem<string>('tempToken'),
  clientToken: storageUtil.getItem<string>('clientToken')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>,
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      storageUtil.setItem('auth_token', action.payload.token);
      storageUtil.setItem('refresh_token', action.payload.refreshToken);
    },
    clearAuthToken: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      storageUtil.removeItem('auth_token');
      storageUtil.removeItem('refresh_token');
      storageUtil.removeItem('userData');
    },
    setTempToken: (state, action: PayloadAction<{ tempToken: string }>) => {
      state.tempToken = action.payload.tempToken;
      storageUtil.setItem('tempToken', action.payload.tempToken);
    },
    clearTempToken: (state) => {
      state.tempToken = null;
      storageUtil.removeItem('tempToken');
    },
    setUserDetails: (state, action: PayloadAction<AuthUser>) => {
      state.userData = action.payload;
      storageUtil.setItem('userData', action.payload);
    },

    updateUserDetails: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (!state.userData) return;

      state.userData = {
        ...state.userData,
        ...action.payload,
      };

      storageUtil.setItem('userData', state.userData);
    },

    setClientToken:(state, action: PayloadAction<{ clientToken: string }>) => {
      state.clientToken = action.payload.clientToken;
      storageUtil.setItem('clientToken', action.payload.clientToken);
    },
    clearClientToken: (state) => {
      state.clientToken = null;
      storageUtil.removeItem('clientToken');
    }
  },
});

export const {
  setAuthToken,
  clearAuthToken,
  setUserDetails,
  setTempToken,
  clearTempToken,
  setClientToken,
  clearClientToken,
  updateUserDetails,
} = authSlice.actions;
export default authSlice.reducer;

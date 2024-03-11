import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './AuthActions';
import { RootState } from '@store/index';

interface UserInfo {
  uid: string;
  displayname: string | null | undefined;
  email: string;
}

interface AuthState {
  user: UserInfo | null;
  status: 'loading' | 'idle' | 'failed' | 'succeeded';
  error?: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoaded: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.status = 'idle';
    },
    setUserName: (state, action: PayloadAction<string | null | undefined>) => {
      if (state.user) {
        state.user.displayname = action.payload;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }),
});

export const { userLoaded, userLoggedOut, setUserName } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;

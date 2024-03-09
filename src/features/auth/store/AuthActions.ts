import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '@services/api';

interface SignUpInfo {
  email: string;
  name: string;
  password: string;
  passwordRepeat: string;
}

interface LoginUserInfo {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<
  void,
  SignUpInfo,
  {
    rejectValue: string;
  }
>('auth/register', async (user, { rejectWithValue }) => {
  try {
    await register(user.name, user.email, user.password);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    rejectWithValue('Something went wrong, please try again!');
  }
});

export const loginUser = createAsyncThunk<
  void,
  LoginUserInfo,
  {
    rejectValue: string;
  }
>('auth/login', async (user, { rejectWithValue }) => {
  try {
    await login(user.email, user.password);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    rejectWithValue('Something went wrong, please try again!');
  }
});

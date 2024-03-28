import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import { TextField, Typography, Link } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@store/index';
import { loginUser } from '../store/AuthActions';
import { selectAuth } from '../store/AuthSlice';
import AppButton from '@features/ui/AppButton';
import { AppRoutes } from '@config/routes/AppRoutes';
import { Navigate, useLocation } from 'react-router-dom';

interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const auth = useAppSelector(selectAuth);
  const { control, handleSubmit, onSubmit } = useLoginForm();
  const location = useLocation();

  if (auth.user) {
    const from = location.state?.from?.pathname || AppRoutes.dashboard;
    return <Navigate to={from} replace />;
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
      <Controller
        name="email"
        control={control}
        rules={{ required: 'Please specify your email address.' }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: 3, mt: 0 }}
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: 'Please specify your password.' }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            type="password"
            fullWidth
            id="password"
            label="Password"
            autoComplete="currentpassword"
            autoFocus
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: 3, mt: 0 }}
            {...field}
          />
        )}
      />

      <AppButton type="submit" fullwidth loading={auth.status === 'loading'} sx={{ mb: 2 }}>
        Login
      </AppButton>
      <Box display="flex" justifyContent="center">
        <Typography color="text.secondary" mr={1}>
          Become a user of Collectix
        </Typography>
        <Link href={AppRoutes.signUp} variant="body2">
          Sign Up
        </Link>
      </Box>
    </Box>
  );
}

function useLoginForm() {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      }),
    );
  };
  return { control, handleSubmit, onSubmit };
}

import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import { TextField, Typography, Link } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@store/index';
import { registerUser } from '../store/AuthActions';
import { selectAuth, setUserName } from '../store/AuthSlice';
import AppButton from '@features/ui/AppButton';
import { auth } from '@services/firebase';
import { AppRoutes } from '@config/routes/AppRoutes';
import { Navigate } from 'react-router-dom';

interface FormInput {
  email: string;
  name: string;
  password: string;
  passwordRepeat: string;
}

export default function SignUpForm() {
  const auth = useAppSelector(selectAuth);
  const { control, handleSubmit, password, onSubmit } = useSignUpForm();

  if (auth.user) {
    return <Navigate to={AppRoutes.dashboard} replace />;
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Please specify your name.' }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
            autoFocus
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: 3, mt: 0 }}
            {...field}
          />
        )}
      />

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

      <Controller
        name="passwordRepeat"
        control={control}
        rules={{
          required: 'Please confirm your password.',
          validate: (confirmpassword) => (confirmpassword != password ? 'Passwords does not match!' : undefined),
        }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            type="password"
            required
            fullWidth
            id="passwordRepeat"
            label="Password Repeat"
            autoComplete="passwordRepeat"
            autoFocus
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: 3, mt: 0 }}
            {...field}
          />
        )}
      />
      <AppButton type="submit" fullwidth loading={auth.status === 'loading'} sx={{ mb: 2 }}>
        Sign Up
      </AppButton>
      <Box display="flex" justifyContent="center">
        <Typography color="text.secondary" mr={1}>
          Do you have an account already?
        </Typography>
        <Link href={AppRoutes.login} variant="body2">
          Login.
        </Link>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography color="text.secondary" mr={1}>
          Reading as a guest!
        </Typography>
        <Link href={AppRoutes.home} variant="body2">
          Read
        </Link>
      </Box>
    </Box>
  );
}

function useSignUpForm() {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await dispatch(
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordRepeat: data.passwordRepeat,
      }),
    ).unwrap();
    dispatch(setUserName(auth.currentUser?.displayName));
  };
  return { control, handleSubmit, onSubmit, password };
}

import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { useAppDispatch } from '@store/index';
import { registerUser } from '../store/AuthActions';
import { setUserName } from '../store/AuthSlice';
import { auth } from '@services/firebase/firebase';

interface FormInput {
  email: string;
  name: string;
  password: string;
  passwordRepeat: string;
}

export default function SignUpForm() {
  const { control, handleSubmit, password, onSubmit } = useSignUpForm();
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
            id="password"
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

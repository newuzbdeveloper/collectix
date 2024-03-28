import LoginForm from '@features/auth/components/LoginForm';
import { Typography } from '@mui/material';

export default function LoginPage() {
  return (
    <div>
      <>
        <Typography textAlign="center" variant="h2" component="h1">
          Login
        </Typography>
        <Typography textAlign="center" color="text.secondary">
          Login to access your Collectix account
        </Typography>
        <LoginForm />
      </>
    </div>
  );
}

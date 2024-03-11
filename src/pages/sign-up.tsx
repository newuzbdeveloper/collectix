import SignUpForm from '@features/auth/components/SignUpForm';
import { Typography } from '@mui/material';

export default function SignUpPage() {
  return (
    <div>
      <>
        <Typography textAlign="center" variant="h2" component="h1">
          Sign Up
        </Typography>
        <Typography textAlign="center" color="text.secondary">
          Become a user of Collectix.
        </Typography>
        <SignUpForm />
      </>
    </div>
  );
}

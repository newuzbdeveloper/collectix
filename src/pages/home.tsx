import { AppRoutes } from '@config/routes/AppRoutes';
import { Box, Typography, Link } from '@mui/material';

export default function HomePage() {
  return (
    <Box mt={5} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography>Home Page of Collectix.</Typography>
      <Link href={AppRoutes.signUp}>Sign Up</Link>
      <Link href={AppRoutes.login}>Login</Link>
    </Box>
  );
}

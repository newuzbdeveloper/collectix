import AppRouter from '@config/routes/components/AppRouter';
import theme from '@config/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useAuthStateChanges } from '@services/firebase';
import { SnackbarProvider } from 'notistack';

export default function App() {
  useAuthStateChanges();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AppRouter />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

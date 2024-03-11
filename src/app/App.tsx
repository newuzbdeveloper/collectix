import AppRouter from "@config/routes/components/AppRouter";
import theme from "@config/styles/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AppRouter />;
      </SnackbarProvider>
    </ThemeProvider>
  );
}
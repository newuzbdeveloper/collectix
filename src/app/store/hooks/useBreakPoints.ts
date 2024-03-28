import theme from '@config/styles/theme';
import { useMediaQuery } from '@mui/material';

export function useBreakpoints() {
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  return { sm, md, lg, xl };
}

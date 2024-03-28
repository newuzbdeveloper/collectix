import { LoadingButton } from '@mui/lab';
import { type SxProps, type Theme } from '@mui/material';

interface Props {
  type?: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  loading?: boolean;
  sx: SxProps<Theme>;
  fullwidth?: boolean;
  onclick?: () => void;
  LinkComponent?: React.ElementType;
  href?: string;
}
export default function AppButton({
  children,
  type = 'button',
  variant = 'contained',
  loading,
  sx,
  fullwidth,
  onclick,
  LinkComponent,
  href,
}: Props) {
  return (
    <LoadingButton
      onClick={onclick}
      LinkComponent={LinkComponent}
      fullWidth={fullwidth}
      variant={variant}
      type={type}
      loading={loading}
      href={href}
      sx={{ textTransform: 'none', borderRadius: 2, ...sx }}
    >
      {children}
    </LoadingButton>
  );
}

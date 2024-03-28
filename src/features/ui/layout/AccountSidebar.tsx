import { NavLink } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar,
  Box,
  ButtonBase,
  List,
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from '@mui/material';
import { useAppSelector } from '@store/index';
import { selectUser } from '@features/auth/store/AuthSlice';
import { useBreakpoints } from '@store/hooks/useBreakPoints';
import { logout } from '@services/api';
import { ACCOUNT_LINKS } from './data';
import theme from '@config/styles/theme';
import AppButton from '../AppButton';
import { AppRoutes } from '@config/routes/AppRoutes';
import { Colors } from '@config/styles/Colors';

interface Props {
  onClose: () => void;
  isClosed?: boolean;
}

export default function AccountSidebar({ isClosed, onClose }: Props) {
  const { md } = useBreakpoints();
  const user = useAppSelector(selectUser);
  const userInitial = user?.displayName?.split(' ')[0][0];

  const onClickLink = () => {
    if (!md) {
      onClose();
    }
  };

  const onLogout = () => {
    logout();
  };

  return (
    <Stack justifyContent="space-between" sx={{ py: 3, px: 2, height: '100%' }}>
      <Box>
        <Box mb={6} display="flex" justifyContent="center">
          <Typography variant="h1">Collectix</Typography>
        </Box>
        <Stack direction="row" alignItems="center" mb={4} gap={3} justifyContent={isClosed ? 'center' : 'flex-start'}>
          <Avatar sx={{ width: 48, height: 48, background: Colors.disabled }}>{userInitial}</Avatar>
          {!isClosed && <Typography variant="body1">{user?.displayName}</Typography>}
        </Stack>
        <List>
          {ACCOUNT_LINKS.map(({ Icon, text, path }) => (
            <ListItem key={text} disablePadding>
              <NavLink to={path} style={{ width: '100%', textDecoration: 'none' }} onClick={onClickLink}>
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      px: isClosed ? 1 : 2,
                      backgroundColor: isActive ? Colors.secondaryGreen : 'transparent',
                      justifyContent: isClosed ? 'center' : 'flex-start',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: isClosed ? 'inherit' : 56,
                        color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                      }}
                    >
                      <Icon fontSize="large" />
                    </ListItemIcon>
                    {!isClosed && (
                      <Typography
                        variant={isActive ? 'body2' : 'body1'}
                        sx={{
                          color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                        }}
                      >
                        {text}
                      </Typography>
                    )}
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
        <AppButton fullwidth LinkComponent={Link} href={AppRoutes.addCollection} onclick={onClickLink} sx={{ mt: 2 }}>
          <Stack component="span" justifyContent="center" alignItems="center" direction="row" gap={1}>
            {isClosed ? '' : 'Add Collection'}
            <AddIcon />
          </Stack>
        </AppButton>
      </Box>
      <ButtonBase onClick={onLogout} sx={{ height: 51, py: 1, px: 2, width: 'fit-content', borderRadius: 2 }}>
        <LogoutIcon sx={{ color: 'text.secondary', mr: isClosed ? 0 : 4 }} />
        {!isClosed && (
          <Typography variant="body2" component="span">
            Logout
          </Typography>
        )}
      </ButtonBase>
    </Stack>
  );
}

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, type CSSObject, type Theme, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import AccountSidebar from './AccountSidebar';
import { useBreakpoints } from '@store/hooks/useBreakPoints';

const DESKTOP_DRAWER_WIDTH = 288;
const DESKTOP_MINIMIZED_DRAWER_WIDTH = 94;

const openedMixin = (theme: Theme): CSSObject => ({
  width: DESKTOP_DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: DESKTOP_MINIMIZED_DRAWER_WIDTH,
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DESKTOP_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const TOOLBAR_STYLES = { mt: 2, mb: 1 };

export default function AccountLayout() {
  const { md, xl } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(xl);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setIsOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setIsOpen(!isOpen);
    }
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Desktop Drawer */}
      {md && (
        <>
          <StyledDrawer variant="permanent" open={isOpen}>
            <AccountSidebar onClose={closeDrawer} />
          </StyledDrawer>
        </>
      )}

      {/* Mobile Drawer */}

      {!md && (
        <>
          <AppBar position="fixed" sx={{ boxShadow: 'none', backgroundColor: 'grey.100' }}>
            <Toolbar sx={{ TOOLBAR_STYLES }}>
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: 'primary.main', fontSize: 40 }} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="temporary"
            open={isOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DESKTOP_DRAWER_WIDTH,
              },
            }}
          >
            <AccountSidebar onClose={closeDrawer} />
          </Drawer>
        </>
      )}

      <Box
        component="main"
        sx={{
          width: '100%',
          bgcolor: 'grey.100',
          minHeight: '100vh',
          height: 'auto',
          px: { xs: 2, md: 7 },
          pt: { xs: 0, md: 4 },
          pb: 4,
        }}
      >
        <Toolbar sx={{ display: { md: 'none', ...TOOLBAR_STYLES } }} />
        <Outlet />
      </Box>
    </Box>
  );
}

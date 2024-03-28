import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { AppRoutes } from '@config/routes/AppRoutes';

interface AccountLinks {
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>>;
  text: string;
  path: string;
}
export const ACCOUNT_LINKS: AccountLinks[] = [
  {
    Icon: AdminPanelSettingsIcon,
    text: 'Admin',
    path: AppRoutes.home,
  },
  {
    Icon: LibraryBooksIcon,
    text: 'Collections',
    path: AppRoutes.dashboard,
  },
];

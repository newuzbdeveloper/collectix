import { Route, Routes } from 'react-router-dom';

import HomePage from '@pages/home';
import { AppRoutes } from '../AppRoutes';
import AuthLayout from '@features/ui/AuthLayout';
import SignUpPage from '@pages/sign-up';
import LoginPage from '@pages/login';
import AccountRoutes from './AccountRoutes';
import AccountLayout from '@features/ui/layout/AccountLayout';
import Dashboard from '@pages/account/dashboard';
import NotFoundPage from '@pages/not-found';
import AddCollection from '@pages/addCollection';

export default function AppRouter() {
  return (
    <Routes>
      {/*Public Pages*/}
      <Route path={AppRoutes.home} element={<HomePage />} />
      <Route element={<AuthLayout />}>
        <Route path={AppRoutes.signUp} element={<SignUpPage />} />
        <Route path={AppRoutes.login} element={<LoginPage />} />
      </Route>
      {/*Account Pages*/}
      <Route
        element={
          <AccountRoutes>
            <AccountLayout />
          </AccountRoutes>
        }
      >
        <Route path={AppRoutes.dashboard} element={<Dashboard />} />
        <Route path={AppRoutes.addCollection} element={<AddCollection/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

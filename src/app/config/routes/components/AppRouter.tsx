import { Route, Routes } from 'react-router-dom';

import HomePage from '@pages/home';
import { AppRoutes } from '../AppRoutes';
import AuthLayout from '@features/ui/AuthLayout';
import SignUpPage from '@pages/sign-up';

export default function AppRouter() {
  return (
    <Routes>
      <Route path={AppRoutes.home} element={<HomePage />}></Route>
      <Route element={<AuthLayout />}>
        <Route path={AppRoutes.signUp} element={<SignUpPage />}></Route>
      </Route>
    </Routes>
  );
}

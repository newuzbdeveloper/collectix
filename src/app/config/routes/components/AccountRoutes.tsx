import { selectAuth } from '@features/auth/store/AuthSlice';
import Loader from '@features/ui/Loader';
import { useAppSelector } from '@store/index';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export default function AccountRoutes({ children }: Props) {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();
  if (auth.status === 'idle' || auth.status === 'loading') {
    return <Loader />;
  }

  if (!auth.user) {
    <Navigate to="./login" state={{ from: location }} replace />;
  }

  return children;
}

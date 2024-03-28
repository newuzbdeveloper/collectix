import { useAppDispatch } from '@store/index';
import { auth } from '..';
import { useEffect } from 'react';
import { userLoaded, userLoggedOut } from '@features/auth/store/AuthSlice';

export function useAuthStateChanges() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          userLoaded({
            displayName: user.displayName,
            email: user.email ?? '',
            uid: user.uid,
          }),
        );
      } else {
        dispatch(userLoggedOut());
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
}

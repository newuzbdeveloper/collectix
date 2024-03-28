import { FirebaseError } from 'firebase/app';
import { mapAuthCodeToMessage } from '../firebase/helpers/mapAuthCodeToMessage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '@services/firebase/firebase';

export async function register(name: string, email: string, password: string) {
  return handleAuthError(async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
    } else {
      throw Error('Something went wrong, please try again!');
    }
  });
}

export async function login(email: string, password: string) {
  return handleAuthError(async () => {
    signInWithEmailAndPassword(auth, email, password);
  });
}

async function handleAuthError(authFunction: () => Promise<void>) {
  try {
    await authFunction();
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw Error(mapAuthCodeToMessage(error.code));
    }
    throw Error('Something went wrong,please try again!');
  }
}

export function logout() {
  return signOut(auth);
}

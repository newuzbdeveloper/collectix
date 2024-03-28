import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDXiYi_LQkQvG_bFUVYUUYngKhNhZeE0mk',
  authDomain: 'collectix-334fa.firebaseapp.com',
  projectId: 'collectix-334fa',
  storageBucket: 'collectix-334fa.appspot.com',
  messagingSenderId: '380537441741',
  appId: '1:380537441741:web:19668bb416f2d967e30884',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

// try {
//   const docRef = await addDoc(collection(db, 'users'), {
//     first: 'Ada',
//     last: 'Lovelace',
//     born: 1815,
//   });
//   console.log('Document written with ID: ', docRef.id);
// } catch (e) {
//   console.error('Error adding document: ', e);
// }

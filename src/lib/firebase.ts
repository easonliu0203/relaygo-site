import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA7ESo-vQz9eJ1ybo3qfr-H6iIhLXft-1Y',
  authDomain: 'ride-platform-f1676.firebaseapp.com',
  projectId: 'ride-platform-f1676',
  storageBucket: 'ride-platform-f1676.firebasestorage.app',
  messagingSenderId: '930299492291',
  appId: '1:930299492291:web:dd5e396635451c3a33ef76',
  measurementId: 'G-DRRT4CKRD6',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

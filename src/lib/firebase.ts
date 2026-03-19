import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB65u4NIq8HhaPs4hr9G0eoOYRP1y6z-sQ',
  authDomain: 'ride-platform-f1676.firebaseapp.com',
  projectId: 'ride-platform-f1676',
  storageBucket: 'ride-platform-f1676.firebasestorage.app',
  messagingSenderId: '930299492291',
  appId: '1:930299492291:web:e393786c0728270d33ef76',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

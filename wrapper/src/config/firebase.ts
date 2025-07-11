import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration - Set these values in your .env file
// Updated: Firebase Authentication for Micro-Frontend Wrapper
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app; 
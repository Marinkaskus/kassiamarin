
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEiImZdpXH5Y6nZjOQxzNWFQAGxd5ZsPw",
  authDomain: "kassia-marin-gallery.firebaseapp.com",
  projectId: "kassia-marin-gallery",
  storageBucket: "kassia-marin-gallery.appspot.com",
  messagingSenderId: "176834256912",
  appId: "1:176834256912:web:d0fc3ee81f3d5f47a5c7b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Authentication functions
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Current user state
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};


import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

// Firebase configuration with a placeholder API key (not used actively now)
const firebaseConfig = {
  apiKey: "placeholder-api-key",
  authDomain: "kassia-marin-gallery.firebaseapp.com",
  projectId: "kassia-marin-gallery",
  storageBucket: "kassia-marin-gallery.appspot.com",
  messagingSenderId: "176834256912",
  appId: "1:176834256912:web:d0fc3ee81f3d5f47a5c7b4"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = async (email: string, password: string) => {
  try {
    console.log('Simulating login with:', email);
    
    // Return a successful response without actual Firebase authentication
    return { 
      success: true, 
      user: { 
        email: 'kassiamarin486@gmail.com',
        uid: 'simulated-user-id'
      } 
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: 'Authentication error' };
  }
};

export const logout = async () => {
  try {
    console.log('Simulating logout');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = (): User | null => {
  return null; // Always return null as we're not using actual authentication
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  // Immediately call the callback with null to indicate no user
  setTimeout(() => callback(null), 10);
  
  // Return a dummy unsubscribe function
  return () => console.log('Auth listener unsubscribed');
};

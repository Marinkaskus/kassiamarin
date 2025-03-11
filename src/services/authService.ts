import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVJJ8RKKqo1Q2-BEjRMkPcm0mKUwn96d4",
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
    // Validate the admin credentials
    if (email !== 'kassiamarin486@gmail.com') {
      return { success: false, error: "Invalid email address" };
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    // Provide a more user-friendly error message
    let errorMessage = "Authentication failed";
    
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
      errorMessage = "Invalid email or password";
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = "No user found with this email";
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = "Too many failed login attempts. Please try again later";
    }
    
    console.error("Login error:", error.code, error.message);
    return { success: false, error: errorMessage };
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

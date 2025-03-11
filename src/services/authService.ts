import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCxvGqRyYV8VjxOQYKjdL5EoxHpqnBX8SU",
  authDomain: "kassia-marin-gallery-prod.firebaseapp.com",
  projectId: "kassia-marin-gallery-prod",
  storageBucket: "kassia-marin-gallery-prod.appspot.com",
  messagingSenderId: "176834256912",
  appId: "1:176834256912:web:d0fc3ee81f3d5f47a5c7b4"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = async (email: string, password: string) => {
  try {
    console.log('Attempting login with:', email);
    
    // Validate admin email
    if (email !== 'kassiamarin486@gmail.com') {
      console.error('Unauthorized email attempt');
      throw new Error('Unauthorized access attempt');
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Login successful:', userCredential.user.email);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error('Login error:', error);
    const errorMessage = error.message || 'Authentication failed';
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

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

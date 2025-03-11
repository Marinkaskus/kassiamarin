
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpKWeeJ-dS0OCSL9J-TGhT8-0OsmYrM94",
  authDomain: "kassia-marin-gallery.firebaseapp.com",
  projectId: "kassia-marin-gallery",
  storageBucket: "kassia-marin-gallery.appspot.com",
  messagingSenderId: "176834256912",
  appId: "1:176834256912:web:d0fc3ee81f3d5f47a5c7b4"
};

// Initialize Firebase
// Use existing app if already initialized to prevent duplicate initialization
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.warn("Firebase app already exists, using existing instance");
  const existingApps = (window as any).firebase?.apps || [];
  app = existingApps.length > 0 ? existingApps[0] : initializeApp(firebaseConfig);
}

const auth = getAuth(app);

// Maximum failed login attempts before temporary lockout
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

// Store failed login attempts
const loginAttempts = new Map<string, { count: number; timestamp: number }>();

// Authentication functions
export const login = async (email: string, password: string) => {
  try {
    // Validate the admin credentials
    if (email !== 'kassiamarin486@gmail.com') {
      return { success: false, error: "Invalid email address" };
    }

    // Check for too many failed attempts
    const attempts = loginAttempts.get(email);
    if (attempts) {
      const timeElapsed = Date.now() - attempts.timestamp;
      if (attempts.count >= MAX_LOGIN_ATTEMPTS && timeElapsed < LOCKOUT_DURATION) {
        const minutesLeft = Math.ceil((LOCKOUT_DURATION - timeElapsed) / 60000);
        return { 
          success: false, 
          error: `Too many failed attempts. Please try again in ${minutesLeft} minutes` 
        };
      } else if (timeElapsed >= LOCKOUT_DURATION) {
        // Reset attempts after lockout period
        loginAttempts.delete(email);
      }
    }
    
    console.log("Attempting Firebase login with email:", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful:", userCredential.user.email);
    
    // Clear failed attempts on successful login
    loginAttempts.delete(email);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error("Login error details:", error);
    
    // Increment failed attempts
    const attempts = loginAttempts.get(email) || { count: 0, timestamp: Date.now() };
    loginAttempts.set(email, {
      count: attempts.count + 1,
      timestamp: Date.now()
    });

    // Provide a more user-friendly error message
    let errorMessage = "Authentication failed";
    
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
      errorMessage = "Invalid email or password";
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = "No user found with this email";
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = "Too many failed login attempts. Please try again later";
    } else if (error.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
      errorMessage = "Firebase configuration error. Please contact the administrator.";
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

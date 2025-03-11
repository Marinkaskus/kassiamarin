import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, getCurrentUser } from '@/services/authService';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAdmin: false,
  isLoading: true
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("AuthContext initializing...");
    
    const cleanup = onAuthStateChange((user) => {
      console.log("Auth state changed:", user?.email);
      setCurrentUser(user);
      
      const isAdminUser = user?.email === 'kassiamarin486@gmail.com';
      setIsAdmin(isAdminUser);
      
      if (user) {
        console.log("User authenticated:", user.email, "Admin:", isAdminUser);
      }
      
      setIsLoading(false);
    });

    return () => cleanup();
  }, []);

  const value = {
    currentUser,
    isAdmin,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

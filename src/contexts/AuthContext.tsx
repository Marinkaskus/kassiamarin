
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange } from '@/services/authService';

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
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // Always set to true to bypass admin check
  const [isLoading, setIsLoading] = useState<boolean>(false); // Set initial loading to false

  useEffect(() => {
    console.log('Initializing auth context with bypass...');
    
    // Still listen for auth changes but don't enforce them
    const unsubscribe = onAuthStateChange((user) => {
      console.log('Auth state changed:', user?.email);
      setCurrentUser(user);
      setIsAdmin(true); // Always admin regardless of auth state
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Provide context with admin access by default
  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

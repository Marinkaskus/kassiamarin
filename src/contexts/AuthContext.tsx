
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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

  const contextValue: AuthContextType = {
    currentUser,
    isAdmin,
    isLoading
  };

  // Provide context with admin access by default
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

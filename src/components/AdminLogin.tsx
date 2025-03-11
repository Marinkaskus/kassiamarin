import React, { useState, useEffect } from 'react';
import { login } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Mail, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess?: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('kassiamarin486@gmail.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  // Attempt to fix the Firebase initialization timing issue
  useEffect(() => {
    // This helps ensure Firebase is properly initialized before login attempts
    const checkAuth = async () => {
      try {
        const { getAuth } = await import('firebase/auth');
        console.log("Firebase auth initialized:", !!getAuth());
      } catch (error) {
        console.error("Firebase initialization check failed:", error);
      }
    };
    
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    console.log("Attempting login with:", email);

    try {
      const result = await login(email, password);
      
      console.log("Login result:", result);
      
      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setErrorMessage(result.error || "Login failed");
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const message = error.message || "An unexpected error occurred";
      setErrorMessage(message);
      toast({
        title: "Login error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div className="p-3 bg-primary/10 rounded-full">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold">Admin Login</h2>
        <p className="mt-1 text-muted-foreground text-center">
          Please sign in to access admin features
        </p>
      </div>
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" /> Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="kassiamarin486@gmail.com"
            className="w-full"
            readOnly
          />
          <p className="text-xs text-muted-foreground">
            Email is preset to admin account
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
            <KeyRound className="h-4 w-4" /> Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full"
            autoFocus
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Authenticating..." : "Sign In"}
        </Button>
      </form>
      
      <div className="mt-4 text-xs text-center text-muted-foreground">
        <p>This login is for authorized administrators only.</p>
      </div>
    </div>
  );
};

export default AdminLogin;

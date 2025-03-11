
import React, { useState } from 'react';
import { login } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess?: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: "Login successful",
          description: "You are now logged in as admin",
        });
        if (onLoginSuccess) onLoginSuccess();
      } else {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
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
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@example.com"
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;

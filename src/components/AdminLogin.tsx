
import React, { useState } from 'react';
import { login } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lock, Mail, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess?: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email] = useState('kassiamarin486@gmail.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log('Login attempt initiated');
      const result = await login(email, password);
      
      if (result.success) {
        console.log('Login successful');
        toast({
          title: "Success",
          description: "Welcome back, admin!",
        });
        if (onLoginSuccess) onLoginSuccess();
      } else {
        console.error('Login failed:', result.error);
        setError(result.error || "Login failed");
        toast({
          title: "Authentication Error",
          description: result.error || "Login failed",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Unexpected login error:', error);
      setError("An unexpected error occurred");
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-card rounded-lg border shadow-sm">
      <div className="flex flex-col items-center space-y-2">
        <div className="p-3 rounded-full bg-primary/10">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">Admin Access</h2>
        <p className="text-sm text-muted-foreground text-center">
          Enter your credentials to access admin features
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 p-3 rounded-md flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
          <span className="text-sm text-destructive">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            readOnly
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <p className="text-xs text-muted-foreground">
            Default admin password: KassiaMarin2024!
          </p>
        </div>

        <Button 
          type="submit" 
          className="w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Authenticating..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;

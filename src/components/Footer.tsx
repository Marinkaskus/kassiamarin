
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Linkedin, Lock } from 'lucide-react';
import AdminLogin from './AdminLogin';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <footer className="py-12 border-t border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Kassia Marin</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Contemporary artist exploring the intersection of nature, identity, and modern existence through thoughtful visual narratives.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Portfolio
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Gallery
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/marinkunst?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/kassia-marin-31207934a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:kassiamarin486@gmail.com" aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Kassia Marin. All rights reserved.
          </p>
          <div className="flex space-x-6 items-center">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            {isAdmin ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 px-2 h-auto"
              >
                <Lock className="h-3 w-3" /> Logout
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setLoginModalOpen(true)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 px-2 h-auto"
              >
                <Lock className="h-3 w-3" /> Admin
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {loginModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <AdminLogin 
              onLoginSuccess={() => setLoginModalOpen(false)}
            />
            <Button 
              variant="ghost" 
              className="absolute top-6 right-6 text-white" 
              onClick={() => setLoginModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;

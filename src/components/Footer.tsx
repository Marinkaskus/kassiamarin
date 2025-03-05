import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Kassia Marin</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Contemporary artist exploring the intersection of nature, identity, and modern existence.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Gallery
              </Link>
              <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
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
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

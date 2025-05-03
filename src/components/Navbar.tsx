import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LogoDisplay from './LogoDisplay';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // List of navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Workshop', path: '/workshop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  // Check if the path is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <header 
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-background/90 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <LogoDisplay />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium hover:text-accent-foreground transition-colors ${
                  isActive(item.path)
                    ? 'text-foreground after:scale-x-100'
                    : 'text-muted-foreground'
                } relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-md p-4 border-t border-border animate-fade-in-down">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-base py-2 ${
                    isActive(item.path)
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  }`}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

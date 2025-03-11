
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  // Improved loading logic with smoother transitions
  useEffect(() => {
    // Start loading sequence
    setIsLoading(true);
    setShowContent(false);
    
    // Show loading screen for consistent duration
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      
      // Slight delay before showing content for a more seamless transition
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }, 1500);
    
    return () => clearTimeout(loadingTimer);
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <LoadingScreen isLoading={isLoading} />
      
      <div 
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ visibility: showContent ? 'visible' : 'hidden' }}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

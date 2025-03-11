
import React from 'react';
import LogoDisplay from './LogoDisplay';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="animate-pulse">
          <LogoDisplay size="medium-large" animated={true} />
        </div>
        <div className="mt-6 relative w-48 h-1 bg-accent rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-foreground animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

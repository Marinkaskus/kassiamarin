
import React, { useEffect, useRef } from 'react';

interface LogoDisplayProps {
  size?: 'small' | 'medium' | 'large' | 'x-large' | 'medium-large';
  animated?: boolean;
  colorVariant?: 'default' | 'inverted' | 'highlight';
  transparentBg?: boolean;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ 
  size = 'medium', 
  animated = false,
  colorVariant = 'default',
  transparentBg = false
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  
  // Determine size-based classes
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    'medium-large': 'w-24 h-24',
    large: 'w-32 h-32',
    'x-large': 'w-80 h-80'
  };

  // Determine color variant classes
  const colorVariantClasses = {
    default: 'bg-foreground',
    inverted: 'bg-background',
    highlight: 'bg-primary'
  };
  
  // Add hover effect
  const hoverEffect = 'hover:scale-110 transition-transform duration-300';
  
  // Add animations if animated prop is true
  useEffect(() => {
    if (animated && logoRef.current) {
      const logoElement = logoRef.current;
      
      // Floating animation
      const animateFloat = () => {
        let start: number | null = null;
        const duration = 3000; // 3 seconds per cycle
        
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = (timestamp - start) / duration;
          
          // Sine wave for gentle floating
          const y = Math.sin(progress * Math.PI * 2) * 10;
          
          if (logoElement) {
            logoElement.style.transform = `translateY(${y}px)`;
          }
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            start = null;
            window.requestAnimationFrame(step);
          }
        };
        
        window.requestAnimationFrame(step);
      };
      
      animateFloat();
      
      // Clean up animation on unmount
      return () => {
        if (logoElement) {
          logoElement.style.transform = '';
        }
      };
    }
  }, [animated]);
  
  return (
    <div 
      ref={logoRef}
      className={`relative ${animated ? 'transition-all duration-300' : ''} ${hoverEffect}`}
    >
      <div className="relative">
        <img 
          src="/lovable-uploads/824ccf0a-639d-4a60-a427-5e5c4686f385.png" 
          alt="Kassia Marin Logo"
          className={`${sizeClasses[size]} object-contain`}
        />
        
        {!transparentBg && (
          <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 bg-gradient-to-tr from-accent to-primary rounded-full"></div>
        )}
      </div>
      
      {/* Optional subtle shadow for depth - only if not transparent */}
      {!transparentBg && (
        <div className="absolute inset-0 -z-10 blur-sm opacity-30 bg-foreground transform scale-90 translate-y-1 rounded-full"></div>
      )}
    </div>
  );
};

export default LogoDisplay;

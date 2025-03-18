
import React, { useState, useEffect } from 'react';
import { Artwork } from '@/types/Artwork';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';
import { AspectRatio } from './ui/aspect-ratio';
import { logImageError } from '@/utils/imageUtils';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
  className?: string;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick, className }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  // Preload the image to check if it's valid
  useEffect(() => {
    if (!artwork.imageSrc) {
      setImageError(true);
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
      setImageError(false);
    };
    img.onerror = () => {
      logImageError(artwork.imageSrc, artwork.title);
      setImageError(true);
      setIsLoading(false);
    };
    img.src = artwork.imageSrc;
    
    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [artwork.imageSrc, artwork.title]);

  const handleImageError = () => {
    console.log(`Using fallback for artwork: ${artwork.title}`);
    logImageError(artwork.imageSrc, artwork.title);
    setImageError(true);
  };

  // Use a placeholder image when the original image fails to load
  const imageSrc = imageError 
    ? 'https://images.unsplash.com/photo-1518770660439-4636190af475' // Fallback image
    : artwork.imageSrc;
    
  // Use the alt text if available, otherwise create a descriptive one
  const altText = artwork.alt || `${artwork.title} - ${artwork.medium} artwork by Kassia Marin (${artwork.year})`;

  return (
    <div 
      className={cn(
        "group relative overflow-hidden bg-white transition-all duration-500 art-card w-full",
        className
      )}
      onClick={() => onClick(artwork)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      aria-label={`View details of artwork: ${artwork.title}`}
    >
      {/* Art frame effect */}
      <div className={cn(
        "w-full overflow-hidden relative transition-all duration-500",
        isHovered ? "shadow-lg" : "shadow-sm"
      )}>
        {imageError ? (
          <div className="w-full aspect-square flex flex-col items-center justify-center bg-muted">
            <ImageOff className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">{artwork.title}</p>
          </div>
        ) : (
          <div className="aspect-square relative flex items-center justify-center bg-secondary/10">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={imageSrc}
                alt={altText}
                className={cn(
                  "max-w-full max-h-full object-contain transition-all duration-700",
                  isLoading ? "opacity-0" : "opacity-100",
                  isHovered ? "scale-105 filter saturate-105" : "scale-100"
                )}
                loading="lazy"
                onError={handleImageError}
                onLoad={() => setIsLoading(false)}
                decoding="async"
              />
            </div>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end opacity-0 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="p-4 text-white transform translate-y-2 transition-transform duration-300 w-full text-left">
            <h3 className="text-base font-medium font-serif">{artwork.title}</h3>
            <p className="text-xs text-white/80">{artwork.year}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 text-left">
        <h3 className="text-base font-medium font-sans">{artwork.title}</h3>
        <div className="mt-1 space-y-1 text-sm text-muted-foreground">
          <p>{artwork.size}</p>
          <p>{artwork.year}</p>
          <p>{artwork.medium}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;

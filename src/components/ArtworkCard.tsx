
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
        "group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:shadow-md w-full bg-transparent shadow-none",
        className
      )}
      onClick={() => onClick(artwork)}
      role="button"
      aria-label={`View details of artwork: ${artwork.title}`}
    >
      <div className="w-full overflow-hidden rounded-lg">
        {imageError ? (
          <div className="w-full aspect-square flex flex-col items-center justify-center bg-stone-100/80 rounded-lg">
            <ImageOff className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground text-left">{artwork.title}</p>
          </div>
        ) : (
          <div className="aspect-square relative flex items-center justify-center bg-stone-100/80 rounded-lg">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-100/80 z-10 rounded-lg">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
              <img
                src={imageSrc}
                alt={altText}
                className={cn(
                  "max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105",
                  isLoading ? "opacity-0" : "opacity-100"
                )}
                loading="lazy"
                onError={handleImageError}
                onLoad={() => setIsLoading(false)}
                decoding="async"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 text-left">
        <h3 className="text-sm font-medium mb-2 text-left">{artwork.title}</h3>
        <div className="space-y-1 text-xs text-muted-foreground text-left">
          <p className="text-left">{artwork.size}</p>
          <p className="text-left">{artwork.year}</p>
          <p className="text-left">{artwork.medium}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;


import React, { useState, useEffect } from 'react';
import { Artwork } from '@/types/Artwork';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';
import { isImageUrlValid, getFallbackImageUrl } from '@/data/artworkData';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
  className?: string;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick, className }) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(artwork.imageSrc);
  const [isLoading, setIsLoading] = useState(true);

  // Validate image on mount and when the artwork changes
  useEffect(() => {
    const validateImage = async () => {
      setIsLoading(true);
      const isValid = await isImageUrlValid(artwork.imageSrc);
      
      if (!isValid) {
        console.warn(`Invalid image for artwork "${artwork.title}", using fallback`);
        setImageSrc(getFallbackImageUrl());
        setImageError(true);
      } else {
        setImageSrc(artwork.imageSrc);
        setImageError(false);
      }
      setIsLoading(false);
    };
    
    validateImage();
  }, [artwork.imageSrc, artwork.title]);

  const handleImageError = () => {
    console.warn(`Error loading image for artwork: ${artwork.title}`);
    setImageError(true);
    setImageSrc(getFallbackImageUrl());
  };
    
  // Use the alt text if available, otherwise create a descriptive one
  const altText = artwork.alt || `${artwork.title} - ${artwork.medium} artwork by Kassia Marin (${artwork.year})`;

  return (
    <div 
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-md bg-white transition-all duration-300 hover:shadow-md w-full",
        className
      )}
      onClick={() => onClick(artwork)}
      role="button"
      aria-label={`View details of artwork: ${artwork.title}`}
    >
      <div className="w-full overflow-hidden">
        {imageError ? (
          <div className="w-full aspect-square flex flex-col items-center justify-center bg-muted">
            <ImageOff className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">{artwork.title}</p>
          </div>
        ) : (
          <div className="aspect-square relative flex items-center justify-center bg-secondary/30">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={imageSrc}
                alt={altText}
                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={handleImageError}
                onLoad={() => setIsLoading(false)}
                style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
              />
            </div>
          </div>
        )}
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

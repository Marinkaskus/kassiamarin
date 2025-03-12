
import React, { useState } from 'react';
import { Artwork } from '@/types/Artwork';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
  className?: string;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick, className }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.log(`Using fallback for artwork: ${artwork.title}`);
    setImageError(true);
  };

  // Use a placeholder image when the original image fails to load
  const imageSrc = imageError 
    ? 'https://images.unsplash.com/photo-1518770660439-4636190af475' // Fallback image
    : artwork.imageSrc;

  return (
    <div 
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-md transition-all duration-300 hover:shadow-md w-full",
        className
      )}
      onClick={() => onClick(artwork)}
    >
      <div className="w-full bg-white p-3 rounded-md">
        {imageError ? (
          <div className="w-full aspect-square flex flex-col items-center justify-center bg-muted">
            <ImageOff className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">{artwork.title}</p>
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={artwork.title}
            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={handleImageError}
          />
        )}
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-medium text-white">{artwork.title}</h3>
        <p className="text-sm text-white/80">{artwork.year}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;

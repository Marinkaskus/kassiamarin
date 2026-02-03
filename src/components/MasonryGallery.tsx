import React, { useState, useEffect } from 'react';
import { Artwork } from '@/types/Artwork';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';
import { logImageError } from '@/utils/imageUtils';

interface MasonryGalleryProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}

interface MasonryItemProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
}

const MasonryItem: React.FC<MasonryItemProps> = ({ artwork, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [artwork.imageSrc, artwork.title]);

  const altText = artwork.alt || `${artwork.title} - ${artwork.medium} artwork by Kassia Marin (${artwork.year})`;

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg"
      onClick={() => onClick(artwork)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      aria-label={`View details of artwork: ${artwork.title}`}
    >
      {imageError ? (
        <div className="w-full aspect-square flex flex-col items-center justify-center bg-muted/50 rounded-lg">
          <ImageOff className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-xs text-muted-foreground">{artwork.title}</p>
        </div>
      ) : (
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10 rounded-lg min-h-[200px]">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={artwork.imageSrc}
            alt={altText}
            className={cn(
              "w-full h-auto object-cover rounded-lg transition-all duration-500",
              isLoading ? "opacity-0" : "opacity-100",
              isHovered && "scale-[1.02]"
            )}
            loading="lazy"
            onError={() => setImageError(true)}
            onLoad={() => setIsLoading(false)}
            decoding="async"
          />
          
          {/* Hover overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-lg transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <h3 className="text-white font-gotu text-lg md:text-xl mb-1 transform transition-transform duration-300"
                style={{ transform: isHovered ? 'translateY(0)' : 'translateY(10px)' }}>
              {artwork.title}
            </h3>
            <div className="space-y-0.5 text-white/80 text-sm">
              <p>{artwork.year}</p>
              <p>{artwork.medium}</p>
              <p>{artwork.size}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ artworks, onArtworkClick }) => {
  return (
    <div className="flex flex-col items-end gap-8 md:gap-12">
      {artworks.map((artwork) => (
        <div 
          key={artwork.id} 
          className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2"
        >
          <MasonryItem
            artwork={artwork}
            onClick={onArtworkClick}
          />
        </div>
      ))}
    </div>
  );
};

export default MasonryGallery;

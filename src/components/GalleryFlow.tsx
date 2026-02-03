import React, { useState, useEffect } from 'react';
import { Artwork } from '@/types/Artwork';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';
import { logImageError } from '@/utils/imageUtils';

interface GalleryFlowProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}

interface GalleryItemProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
  alignment: 'left' | 'right';
  index: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ artwork, onClick, alignment, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      className={cn(
        "relative w-full py-8 md:py-12 animate-fade-in",
        "cursor-pointer group"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onClick(artwork)}
    >
      {/* Image - full width */}
      <div className={cn(
        "flex w-full",
        alignment === 'right' ? "justify-end" : "justify-start"
      )}>
        {imageError ? (
          <div className="w-full aspect-[4/3] flex flex-col items-center justify-center bg-muted/30">
            <ImageOff className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">{artwork.title}</p>
          </div>
        ) : (
          <div className="relative w-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/30 z-10">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={artwork.imageSrc}
              alt={altText}
              className={cn(
                "w-full h-auto object-contain transition-all duration-500",
                isLoading ? "opacity-0" : "opacity-100",
                "group-hover:scale-[1.005]"
              )}
              loading="lazy"
              onError={() => setImageError(true)}
              onLoad={() => setIsLoading(false)}
              decoding="async"
            />
          </div>
        )}
      </div>

      {/* Info line - horizontal, under image, left aligned */}
      <div className="flex items-center gap-4 md:gap-8 mt-6 text-sm tracking-wide text-muted-foreground justify-start">
        <span className="font-gotu">{artwork.title}</span>
        <span className="text-border">|</span>
        <span>{artwork.year}</span>
        <span className="text-border">|</span>
        <span>{artwork.medium}</span>
        <span className="text-border">|</span>
        <span>{artwork.size}</span>
      </div>
    </div>
  );
};

const GalleryFlow: React.FC<GalleryFlowProps> = ({ artworks, onArtworkClick }) => {
  const getAlignment = (index: number): 'left' | 'right' => {
    // First image (index 0) is right-aligned, second (index 1) is left-aligned, etc.
    return index % 2 === 0 ? 'right' : 'left';
  };

  return (
    <div className="w-full mx-auto">
      {artworks.map((artwork, index) => (
        <GalleryItem
          key={artwork.id}
          artwork={artwork}
          onClick={onArtworkClick}
          alignment={getAlignment(index)}
          index={index}
        />
      ))}
    </div>
  );
};

export default GalleryFlow;
